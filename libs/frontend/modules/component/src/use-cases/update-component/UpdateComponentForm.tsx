import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import {
  refetchGetComponentsQuery,
  useUpdateComponentMutation,
} from '@codelab/shared/codegen/graphql'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import {
  updateComponentSchema,
  UpdateComponentSchemaType,
} from './updateComponentSchema'

type UpdateComponentFormProps = UniFormUseCaseProps<UpdateComponentSchemaType>

export const UpdateComponentForm = (props: UpdateComponentFormProps) => {
  const {
    handleSubmit,
    crudModal: {
      reset,
      state: { metadata },
    },
  } = useCrudModalMutationForm({
    entityType: EntityType.Component,
    useMutationFunction: useUpdateComponentMutation,
    mutationOptions: {
      refetchQueries: [refetchGetComponentsQuery()],
    },
    mapVariables: (submitData: UpdateComponentSchemaType, state) => ({
      input: {
        componentId: state.updateId,
        updateData: { ...submitData },
      },
    }),
  })

  return (
    <FormUniforms<UpdateComponentSchemaType>
      onSubmit={handleSubmit}
      schema={updateComponentSchema}
      model={{ name: metadata?.name }}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating Component',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}