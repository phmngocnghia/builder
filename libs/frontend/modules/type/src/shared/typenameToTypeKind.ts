import { TypeKind } from '@codelab/shared/abstract/core'
import { TypeModels } from './TypeModels'

export const typenameToTypeKind = (typename: string) => {
  switch (typename) {
    case TypeModels.InterfaceType:
      return TypeKind.InterfaceType
    case TypeModels.PrimitiveType:
      return TypeKind.PrimitiveType
    case TypeModels.ArrayType:
      return TypeKind.ArrayType
    case TypeModels.EnumType:
      return TypeKind.EnumType
    case TypeModels.LambdaType:
      return TypeKind.LambdaType
    case TypeModels.UnionType:
      return TypeKind.UnionType
  }

  throw new Error("Can't recognize typename of type")
}