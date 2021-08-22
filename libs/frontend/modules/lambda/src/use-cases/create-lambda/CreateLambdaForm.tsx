import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalForm,
} from '@codelab/frontend/view/components'
import {
  refetchGetLambdasQuery,
  useCreateLambdaMutation,
} from '@codelab/shared/codegen/graphql'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { AutoFields } from 'uniforms-antd'
import { lambdaState } from '../../state'
import { CreateLambdaInput, createLambdaSchema } from './createLambdaSchema'

export const CreateLambdaForm = (props: UniFormUseCaseProps<any>) => {
  const { reset, setLoading } = useCrudModalForm(EntityType.Lambda)
  // const { library } = useSelectedLibrary()
  const [, setLambdaState] = useRecoilState(lambdaState)

  const [mutate, { loading }] = useCreateLambdaMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetLambdasQuery()],
  })

  useEffect(() => {
    // Keep the loading state in recoil, so we can use it other components, like loading buttons, etc.
    setLoading(loading)
    setLambdaState((current) => ({ ...current, loading }))
  }, [loading, setLambdaState])

  const onSubmit = (submitData: CreateLambdaInput) => {
    return mutate({
      variables: {
        input: {
          name: submitData.name,
          body: submitData.body,
        },
      },
    })
  }

  return (
    <FormUniforms<CreateLambdaInput>
      onSubmit={onSubmit}
      schema={createLambdaSchema}
      onSubmitSuccess={() => reset()}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating lambda',
      })}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}