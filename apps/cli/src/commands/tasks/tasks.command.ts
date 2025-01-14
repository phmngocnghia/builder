import { generateOgmTypes } from '@codelab/backend/infra/adapter/neo4j'
import { spawn } from 'child_process'
import execa from 'execa'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import gitChangedFiles from 'git-changed-files'
import isPortReachable from 'is-port-reachable'
import path from 'path'
import { CommandModule } from 'yargs'
import { getEnvOptions } from '../../shared/command'
import { Env } from '../../shared/utils/env'
import { Tasks } from '../../shared/utils/tasks'

/**
 * We require this since execCommand creates a new process and any env set before that doesn't apply
 */
const NX_TEST = 'npx env-cmd -f .env.test nx'

export const execCommand = (command: string) => {
  try {
    execa.commandSync(command, {
      stdio: 'inherit',
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

export const tasksCommand: CommandModule<unknown, unknown> = {
  command: 'tasks',
  describe: 'Run tasks',
  builder: (yargv) =>
    yargv
      .options(getEnvOptions([Env.Dev, Env.Test, Env.CI]))
      .command(
        Tasks.Build,
        'Build projects',
        (argv) => argv,
        ({ env }) => {
          if (env === Env.Test) {
            // Added since many times can't find production build of next during push
            // Maybe related? https://github.com/nrwl/nx/issues/2839
            execCommand(`${NX_TEST} build builder -c test`)
          }

          if (env === Env.CI) {
            execCommand(`nx build builder -c ci`)
          }
        },
      )
      .command(
        Tasks.Unit,
        'Run unit tests',
        (argv) => argv,
        ({ env }) => {
          if (env === Env.Test) {
            // Added since many times can't find production build of next during push
            // Maybe related? https://github.com/nrwl/nx/issues/2839
            // execCommand(`${NX_TEST} build builder -c test`)
            execCommand(
              `${NX_TEST} affected --target=test --testPathPattern="[^i].spec.ts" --memoryLimit=8192 --color`,
            )
          }

          if (env === Env.CI) {
            execCommand(
              'npx nx affected --target=test --testPathPattern="[^i].spec.ts" --color --parallel=3 --verbose',
            )
          }
        },
      )
      .command(
        Tasks.Int,
        'Run integration tests',
        (argv) => argv,
        ({ env }) => {
          if (env === Env.Test) {
            const startServer = `${NX_TEST} serve-test builder -c test`
            const runSpecs = `npx wait-on 'http://127.0.0.1:3001' && ${NX_TEST} test builder -c test`

            const runSpecsChildProcess = spawn(runSpecs, {
              stdio: 'inherit',
              // Need shell to access yarn/npx etc
              shell: true,
              detached: true,
            })

            const startServerChildProcess = spawn(startServer, {
              stdio: 'inherit',
              /**
               * The next.js server will spawn it's own set of child processes, setting detached to true means these sub processes won't be attached to the main process, but rather to a detached group.
               *
               * Issue prior was that shutting down this process didn't kill the sub processes
               */
              shell: true,
              detached: true,
            })

            runSpecsChildProcess.on('exit', (code: number, signal) => {
              // console.log('specs process exit!', code, signal)

              /**
               * SIGINT - requested by user
               * SIGKILL - right away
               *
               * If a child process in Node.js spawn their own child processes, kill() method will not kill the child process’s own child processes.
               */
              if (startServerChildProcess.pid) {
                // Please note - before pid. This converts a pid to a group of pids for process kill() method.
                try {
                  process.kill(-startServerChildProcess.pid, 'SIGINT')
                } catch (e) {
                  //
                }
              }

              process.exit(code)

              // Child process will exit by itself
              // if (runSpecsChildProcess.pid) {
              //   process.kill(-runSpecsChildProcess.pid)
              // }
            })
          }

          if (env === Env.CI) {
            const startServer = `nx serve-test builder -c ci`
            const runSpecs = `npx wait-on 'http://127.0.0.1:3000' && nx test builder -c ci --verbose`

            const runSpecsChildProcess = spawn(runSpecs, {
              stdio: 'inherit',
              shell: true,
              detached: true,
            })

            const startServerChildProcess = spawn(startServer, {
              stdio: 'inherit',
              shell: true,
              detached: true,
            })

            runSpecsChildProcess.on('exit', async (code: number) => {
              if (startServerChildProcess.pid) {
                try {
                  process.kill(-startServerChildProcess.pid, 'SIGINT')
                } catch (e) {
                  //
                }
              }

              process.exit(code)
            })
          }
        },
      )
      .command(
        Tasks.Codegen,
        'Run codegen',
        (argv) => argv.fail((msg, err) => console.log(msg, err)),
        async ({ env }) => {
          if (env === Env.Dev) {
            if (!(await isPortReachable(3000, { host: '127.0.0.1' }))) {
              console.error('Please start server!')
              process.exit(0)
            }

            execCommand('yarn graphql-codegen')
            await generateOgmTypes()

            process.exit(0)
          }

          if (env === Env.CI) {
            const startServer = `nx serve-test builder -c ci`
            const runSpecs = `npx wait-on 'http://127.0.0.1:3000' && yarn graphql-codegen && exit 0`

            const runSpecsChildProcess = spawn(runSpecs, {
              stdio: 'inherit',
              shell: true,
              detached: true,
            })

            const startServerChildProcess = spawn(startServer, {
              stdio: 'inherit',
              shell: true,
              detached: true,
            })

            runSpecsChildProcess.on('exit', async (code: number) => {
              if (startServerChildProcess.pid) {
                await generateOgmTypes()

                try {
                  process.kill(-startServerChildProcess.pid, 'SIGINT')
                } catch (e) {
                  console.error(e)
                }
              }

              const { unCommittedFiles } = await gitChangedFiles()

              console.log('Un-committed files', unCommittedFiles)

              const containsGeneratedFiles = unCommittedFiles.reduce(
                (_matches: boolean, file: string) => {
                  const filename = path.basename(file)

                  return (
                    _matches ||
                    filename.includes('.gen.ts') ||
                    filename === 'schema.api.graphql'
                  )
                },
                false,
              )

              if (containsGeneratedFiles) {
                console.error('Please run codegen!')
                process.exit(1)
              }
            })
          }
        },
      )
      .command(
        Tasks.E2e,
        'Run e2e tests',
        (argv) => argv,
        ({ env }) => {
          if (env === Env.Test) {
            execCommand(`${NX_TEST} run builder-e2e:e2e:test --verbose`)
          }

          if (env === Env.CI) {
            execCommand(`npx nx run builder-e2e:currents:ci --verbose`)
          }
        },
      )
      .command(
        Tasks.Lint,
        'Lint projects',
        (argv) => argv,
        ({ env }) => {
          if (env === Env.Test) {
            execCommand(`yarn cross-env TIMING=1 lint-staged --verbose`)
            execCommand(`npx ls-lint`)
          }

          if (env === Env.CI) {
            execCommand(`npx nx affected --target=lint --parallel=3`)
            execCommand(`npx prettier --check ./**/*.{graphql,yaml,json}`)
            execCommand(
              `yarn madge --circular apps libs --extensions ts,tsx,js,jsx`,
            )
            execCommand(`npx ls-lint`)
          }
        },
      )
      .command(
        `${Tasks.Commitlint} [edit]`,
        'Commitlint projects',
        (argv) => argv,
        ({ env, edit }) => {
          if (env === Env.Test) {
            execCommand(`npx --no-install commitlint --edit ${edit}`)
          }

          if (env === Env.CI) {
            execCommand(`./scripts/lint/commitlint-ci.sh`)
          }
        },
      )

      .demandCommand(1, 'Please provide a task'),
  handler: () => {
    //
  },
}
