import { __TypeFragment } from '@codelab/shared/codegen/graphql'

/**
 * Those types make sure this enum matches the type names returned from the API
 */
type TypeModelName = __TypeFragment['__typename']

type TypeModelsType = {
  [K in TypeModelName]: K
}

export const TypeModels: TypeModelsType = {
  PrimitiveType: 'PrimitiveType',
  EnumType: 'EnumType',
  ArrayType: 'ArrayType',
  InterfaceType: 'InterfaceType',
  LambdaType: 'LambdaType',
  ElementType: 'ElementType',
  ComponentType: 'ComponentType',
}