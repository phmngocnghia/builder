import {
  AntdDesignApi,
  ServerConfig,
  serverConfig,
} from '@codelab/backend/infra'
import { SeedBaseTypesService } from '@codelab/backend/modules/type'
import { AtomType, IUser, Role } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { Command, Console } from 'nestjs-console'
import { envOption } from '../env-helper'
import { csvNameToAtomTypeMap } from './data/csvNameToAtomTypeMap'
import { AtomSeeder, TypeSeeder } from './models'
import { iterateCsvs } from './utils/iterateCsvs'

interface AtomSeed {
  id: string
  atomType: AtomType
}

@Console()
@Injectable()
export class SeederService {
  private antdDataFolder = `${process.cwd()}/data/antd/`

  private customComponentsDataFolder = `${process.cwd()}/data/customComponents/`

  /**
   * An array of future created atoms, we first build out the pipeline, then call it with input data later
   */
  private atoms: Array<AtomSeed> = []

  constructor(
    @Inject(serverConfig.KEY) private readonly _serverConfig: ServerConfig,
    private readonly seedBaseTypesService: SeedBaseTypesService,
    private readonly atomSeeder: AtomSeeder,
    private readonly typeSeeder: TypeSeeder,
  ) {}

  @Command({
    command: 'seed',
    options: [envOption],
  })
  async seed() {
    const currentUser: IUser = {
      id: '0x01',
      auth0Id: '0x01',
      roles: [Role.Admin],
    }

    /**
     * (1) Seed base types like String, Boolean, Integer so other types can use them
     */
    // await this.seedBaseTypesService.execute({ currentUser })

    /**
     * (2) Seed all Atoms
     */
    this.atoms = await this.seedAtoms(currentUser)

    /**
     * (3) Wrap all Atoms with a Component
     */

    /**
     * (3) Seed all Atoms API's that we have data for
     */
    await iterateCsvs(
      this.antdDataFolder,
      this.handleCsv.bind(this, currentUser),
    )
    await iterateCsvs(
      this.customComponentsDataFolder,
      this.handleCsv.bind(this, currentUser),
    )
  }

  private async seedAtoms(currentUser: IUser): Promise<Array<AtomSeed>> {
    await this.typeSeeder.seedBaseTypes(currentUser)

    const atoms = await this.atomSeeder.seedAtomsIfMissing(
      Object.values(AtomType),
    )

    return atoms.map((atom) => ({ id: atom.id, atomType: atom.type }))
  }

  private atomIdByAtomType() {
    return new Map(this.atoms.map(({ id, atomType }) => [atomType, id]))
  }

  private handleCsv(
    currentUser: IUser,
    data: Array<AntdDesignApi>,
    file: string,
  ) {
    const atomType = csvNameToAtomTypeMap[file.replace('.csv', '')]

    if (!atomType) {
      return
    }

    const atomId = this.atomIdByAtomType().get(atomType)

    if (!atomId) {
      return
    }

    return this.typeSeeder.seedAtomApi(atomId, data, currentUser)
  }
}