import React from 'react'
import { GetPageGql } from '../../../../../libs/generated/src/graphql.generated'
import { AddChildVertexInputSchema } from '../../../../../libs/generated/src/json-schema.generated'
import { ApolloForm } from '@codelab/frontend'
import {
  AddChildVertexInput,
  UpdateVertexMutationVariables,
  VertexFragmentsFragment,
  useAddChildVertexMutation,
} from '@codelab/generated'

export interface AddChildVertexFormProps {
  vertex: VertexFragmentsFragment
  parentVertexId: string
  pageId: string
}

export const AddChildVertexForm = ({
  pageId,
  vertex,
  parentVertexId,
  ...props
}: AddChildVertexFormProps) => {
  const [mutate] = useAddChildVertexMutation({
    refetchQueries: [
      {
        query: GetPageGql,
        variables: {
          input: {
            pageId,
          },
        },
      },
    ],
  })

  return (
    <ApolloForm<AddChildVertexInput, UpdateVertexMutationVariables>
      hideSubmitButton
      mutate={mutate}
      schema={AddChildVertexInputSchema}
      initialFormData={{
        parentVertexId,
        vertex: { type: 'ReactAffix', props: {} },
      }}
      rjsfFormProps={{
        uiSchema: {
          parentVertexId: {
            'ui:disabled': 'parentVertexId',
          },
        },
      }}
      {...props}
    />
  )
}