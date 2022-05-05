import * as Types from '@codelab/shared/abstract/codegen'

import {
  ElementGraphFragment,
  ElementFragment,
} from '../../../../../shared/abstract/core/src/domain/element/element.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import {
  ElementGraphFragmentDoc,
  ElementFragmentDoc,
} from '../../../../../shared/abstract/core/src/domain/element/element.fragment.graphql.gen'
export type GetElementGraphQueryVariables = Types.Exact<{
  input: Types.ElementGraphInput
}>

export type GetElementGraphQuery = { elementGraph: ElementGraphFragment }

export type CreateElementsMutationVariables = Types.Exact<{
  input: Array<Types.ElementCreateInput> | Types.ElementCreateInput
}>

export type CreateElementsMutation = {
  createElements: { elements: Array<ElementFragment> }
}

export type DeleteElementsMutationVariables = Types.Exact<{
  where: Types.ElementWhere
}>

export type DeleteElementsMutation = {
  deleteElements: { nodesDeleted: number }
}

export type UpdateElementsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ElementWhere>
  update?: Types.InputMaybe<Types.ElementUpdateInput>
}>

export type UpdateElementsMutation = {
  updateElements: { elements: Array<ElementFragment> }
}

export type MoveElementsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ElementWhere>
  update?: Types.InputMaybe<Types.ElementUpdateInput>
}>

export type MoveElementsMutation = {
  updateElements: { elements: Array<ElementFragment> }
}

export type GetElementsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ElementOptions>
  where?: Types.InputMaybe<Types.ElementWhere>
}>

export type GetElementsQuery = { elements: Array<ElementFragment> }

export const GetElementGraphDocument = gql`
  query GetElementGraph($input: ElementGraphInput!) {
    elementGraph(input: $input) {
      ...ElementGraph
    }
  }
  ${ElementGraphFragmentDoc}
`
export const CreateElementsDocument = gql`
  mutation CreateElements($input: [ElementCreateInput!]!) {
    createElements(input: $input) {
      elements {
        ...Element
      }
    }
  }
  ${ElementFragmentDoc}
`
export const DeleteElementsDocument = gql`
  mutation DeleteElements($where: ElementWhere!) {
    deleteElements(where: $where) {
      nodesDeleted
    }
  }
`
export const UpdateElementsDocument = gql`
  mutation UpdateElements($where: ElementWhere, $update: ElementUpdateInput) {
    updateElements(where: $where, update: $update) {
      elements {
        ...Element
      }
    }
  }
  ${ElementFragmentDoc}
`
export const MoveElementsDocument = gql`
  mutation MoveElements($where: ElementWhere, $update: ElementUpdateInput) {
    updateElements(where: $where, update: $update) {
      elements {
        ...Element
      }
    }
  }
  ${ElementFragmentDoc}
`
export const GetElementsDocument = gql`
  query GetElements($options: ElementOptions, $where: ElementWhere) {
    elements: elements(options: $options, where: $where) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    GetElementGraph(
      variables: GetElementGraphQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetElementGraphQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetElementGraphQuery>(
            GetElementGraphDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetElementGraph',
        'query',
      )
    },
    CreateElements(
      variables: CreateElementsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateElementsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateElementsMutation>(
            CreateElementsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateElements',
        'mutation',
      )
    },
    DeleteElements(
      variables: DeleteElementsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteElementsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteElementsMutation>(
            DeleteElementsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteElements',
        'mutation',
      )
    },
    UpdateElements(
      variables?: UpdateElementsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateElementsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateElementsMutation>(
            UpdateElementsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateElements',
        'mutation',
      )
    },
    MoveElements(
      variables?: MoveElementsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<MoveElementsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<MoveElementsMutation>(
            MoveElementsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'MoveElements',
        'mutation',
      )
    },
    GetElements(
      variables?: GetElementsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetElementsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetElementsQuery>(GetElementsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetElements',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>