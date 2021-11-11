import * as Types from '@codelab/frontend/abstract/codegen'

import {
  Type_ArrayType_Fragment,
  Type_ComponentType_Fragment,
  Type_ElementType_Fragment,
  Type_EnumType_Fragment,
  Type_InterfaceType_Fragment,
  Type_LambdaType_Fragment,
  Type_PrimitiveType_Fragment,
  Type_ReactNodeType_Fragment,
  Type_RenderPropsType_Fragment,
  Type_UnionType_Fragment,
} from '../../graphql/Type.fragment.graphql.gen'
import { EnumTypeFragment } from '../../graphql/EnumType.fragment.graphql.gen'
import { PrimitiveTypeFragment } from '../../graphql/PrimitiveType.fragment.graphql.gen'
import { UnionTypeFragment } from '../../graphql/UnionType.fragment.graphql.gen'
import { TypeGraphFragment } from '../../graphql/TypeGraph.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TypeFragmentDoc } from '../../graphql/Type.fragment.graphql.gen'
import { EnumTypeFragmentDoc } from '../../graphql/EnumType.fragment.graphql.gen'
import { PrimitiveTypeFragmentDoc } from '../../graphql/PrimitiveType.fragment.graphql.gen'
import { UnionTypeFragmentDoc } from '../../graphql/UnionType.fragment.graphql.gen'
import { TypeGraphFragmentDoc } from '../../graphql/TypeGraph.fragment.graphql.gen'
import { api, GraphqlOperationOptions } from '@codelab/frontend/model/infra/api'
export type CreateTypeMutationVariables = Types.Exact<{
  input: Types.CreateTypeInput
}>

export type CreateTypeMutation = {
  createType:
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
}

export type DeleteTypeMutationVariables = Types.Exact<{
  input: Types.DeleteTypeInput
}>

export type DeleteTypeMutation = {
  deleteType?:
    | Type_ArrayType_Fragment
    | Type_ComponentType_Fragment
    | Type_ElementType_Fragment
    | Type_EnumType_Fragment
    | Type_InterfaceType_Fragment
    | Type_LambdaType_Fragment
    | Type_PrimitiveType_Fragment
    | Type_ReactNodeType_Fragment
    | Type_RenderPropsType_Fragment
    | Type_UnionType_Fragment
    | null
    | undefined
}

export type GetTypeQueryVariables = Types.Exact<{
  input: Types.GetTypeInput
}>

export type GetTypeQuery = {
  getType?:
    | Type_ArrayType_Fragment
    | Type_ComponentType_Fragment
    | Type_ElementType_Fragment
    | Type_EnumType_Fragment
    | Type_InterfaceType_Fragment
    | Type_LambdaType_Fragment
    | Type_PrimitiveType_Fragment
    | Type_ReactNodeType_Fragment
    | Type_RenderPropsType_Fragment
    | Type_UnionType_Fragment
    | null
    | undefined
}

export type GetTypeGraphQueryVariables = Types.Exact<{
  input: Types.GetTypeGraphInput
}>

export type GetTypeGraphQuery = {
  getTypeGraph?: TypeGraphFragment | null | undefined
}

export type GetTypesQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.GetTypesInput>
}>

export type GetTypesQuery = {
  getTypes: Array<
    | ({ __typename: 'ArrayType' } & Type_ArrayType_Fragment)
    | ({ __typename: 'ComponentType' } & Type_ComponentType_Fragment)
    | ({ __typename: 'ElementType' } & Type_ElementType_Fragment)
    | ({ __typename: 'EnumType' } & Type_EnumType_Fragment)
    | ({ __typename: 'InterfaceType' } & Type_InterfaceType_Fragment)
    | ({ __typename: 'LambdaType' } & Type_LambdaType_Fragment)
    | ({ __typename: 'PrimitiveType' } & Type_PrimitiveType_Fragment)
    | ({ __typename: 'ReactNodeType' } & Type_ReactNodeType_Fragment)
    | ({ __typename: 'RenderPropsType' } & Type_RenderPropsType_Fragment)
    | ({ __typename: 'UnionType' } & Type_UnionType_Fragment)
  >
}

export type UpdateEnumTypeMutationVariables = Types.Exact<{
  input: Types.UpdateEnumTypeInput
}>

export type UpdateEnumTypeMutation = {
  updateEnumType?: EnumTypeFragment | null | undefined
}

export type UpdateTypeMutationVariables = Types.Exact<{
  input: Types.UpdateTypeInput
}>

export type UpdateTypeMutation = {
  updateType?:
    | Type_ArrayType_Fragment
    | Type_ComponentType_Fragment
    | Type_ElementType_Fragment
    | Type_EnumType_Fragment
    | Type_InterfaceType_Fragment
    | Type_LambdaType_Fragment
    | Type_PrimitiveType_Fragment
    | Type_ReactNodeType_Fragment
    | Type_RenderPropsType_Fragment
    | Type_UnionType_Fragment
    | null
    | undefined
}

export type UpdatePrimitiveTypeMutationVariables = Types.Exact<{
  input: Types.UpdatePrimitiveTypeInput
}>

export type UpdatePrimitiveTypeMutation = {
  updatePrimitiveType?: PrimitiveTypeFragment | null | undefined
}

export type UpdateUnionTypeMutationVariables = Types.Exact<{
  input: Types.UpdateUnionTypeInput
}>

export type UpdateUnionTypeMutation = {
  updateUnionType?: UnionTypeFragment | null | undefined
}

export type GetTypeKindsQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.GetTypesInput>
}>

export type GetTypeKindsQuery = {
  getTypes: Array<
    | { __typename: 'ArrayType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'ComponentType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'ElementType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'EnumType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'InterfaceType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'LambdaType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'PrimitiveType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'ReactNodeType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'RenderPropsType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'UnionType'; id: string; typeKind: Types.TypeKind }
  >
}

export const CreateTypeGql = gql`
  mutation CreateType($input: CreateTypeInput!) {
    createType(input: $input) {
      id
    }
  }
`
export const DeleteTypeGql = gql`
  mutation DeleteType($input: DeleteTypeInput!) {
    deleteType(input: $input) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
`
export const GetTypeGql = gql`
  query GetType($input: GetTypeInput!) {
    getType(input: $input) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
`
export const GetTypeGraphGql = gql`
  query GetTypeGraph($input: GetTypeGraphInput!) {
    getTypeGraph(input: $input) {
      ...TypeGraph
    }
  }
  ${TypeGraphFragmentDoc}
`
export const GetTypesGql = gql`
  query GetTypes($input: GetTypesInput) {
    getTypes(input: $input) {
      __typename
      ...Type
    }
  }
  ${TypeFragmentDoc}
`
export const UpdateEnumTypeGql = gql`
  mutation UpdateEnumType($input: UpdateEnumTypeInput!) {
    updateEnumType(input: $input) {
      ...EnumType
    }
  }
  ${EnumTypeFragmentDoc}
`
export const UpdateTypeGql = gql`
  mutation UpdateType($input: UpdateTypeInput!) {
    updateType(input: $input) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
`
export const UpdatePrimitiveTypeGql = gql`
  mutation UpdatePrimitiveType($input: UpdatePrimitiveTypeInput!) {
    updatePrimitiveType(input: $input) {
      ...PrimitiveType
    }
  }
  ${PrimitiveTypeFragmentDoc}
`
export const UpdateUnionTypeGql = gql`
  mutation UpdateUnionType($input: UpdateUnionTypeInput!) {
    updateUnionType(input: $input) {
      ...UnionType
    }
  }
  ${UnionTypeFragmentDoc}
`
export const GetTypeKindsGql = gql`
  query GetTypeKinds($input: GetTypesInput) {
    getTypes(input: $input) {
      id
      typeKind
      __typename
    }
  }
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateType: build.mutation<
      CreateTypeMutation,
      GraphqlOperationOptions<CreateTypeMutationVariables>
    >({
      query: (options) => ({
        document: CreateTypeGql,
        options: options ?? undefined,
      }),
    }),
    DeleteType: build.mutation<
      DeleteTypeMutation,
      GraphqlOperationOptions<DeleteTypeMutationVariables>
    >({
      query: (options) => ({
        document: DeleteTypeGql,
        options: options ?? undefined,
      }),
    }),
    GetType: build.query<
      GetTypeQuery,
      GraphqlOperationOptions<GetTypeQueryVariables>
    >({
      query: (options) => ({
        document: GetTypeGql,
        options: options ?? undefined,
      }),
    }),
    GetTypeGraph: build.query<
      GetTypeGraphQuery,
      GraphqlOperationOptions<GetTypeGraphQueryVariables>
    >({
      query: (options) => ({
        document: GetTypeGraphGql,
        options: options ?? undefined,
      }),
    }),
    GetTypes: build.query<
      GetTypesQuery,
      GraphqlOperationOptions<GetTypesQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetTypesGql,
        options: options ?? undefined,
      }),
    }),
    UpdateEnumType: build.mutation<
      UpdateEnumTypeMutation,
      GraphqlOperationOptions<UpdateEnumTypeMutationVariables>
    >({
      query: (options) => ({
        document: UpdateEnumTypeGql,
        options: options ?? undefined,
      }),
    }),
    UpdateType: build.mutation<
      UpdateTypeMutation,
      GraphqlOperationOptions<UpdateTypeMutationVariables>
    >({
      query: (options) => ({
        document: UpdateTypeGql,
        options: options ?? undefined,
      }),
    }),
    UpdatePrimitiveType: build.mutation<
      UpdatePrimitiveTypeMutation,
      GraphqlOperationOptions<UpdatePrimitiveTypeMutationVariables>
    >({
      query: (options) => ({
        document: UpdatePrimitiveTypeGql,
        options: options ?? undefined,
      }),
    }),
    UpdateUnionType: build.mutation<
      UpdateUnionTypeMutation,
      GraphqlOperationOptions<UpdateUnionTypeMutationVariables>
    >({
      query: (options) => ({
        document: UpdateUnionTypeGql,
        options: options ?? undefined,
      }),
    }),
    GetTypeKinds: build.query<
      GetTypeKindsQuery,
      GraphqlOperationOptions<GetTypeKindsQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetTypeKindsGql,
        options: options ?? undefined,
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useCreateTypeMutation,
  useDeleteTypeMutation,
  useGetTypeQuery,
  useLazyGetTypeQuery,
  useGetTypeGraphQuery,
  useLazyGetTypeGraphQuery,
  useGetTypesQuery,
  useLazyGetTypesQuery,
  useUpdateEnumTypeMutation,
  useUpdateTypeMutation,
  useUpdatePrimitiveTypeMutation,
  useUpdateUnionTypeMutation,
  useGetTypeKindsQuery,
  useLazyGetTypeKindsQuery,
} = injectedRtkApi