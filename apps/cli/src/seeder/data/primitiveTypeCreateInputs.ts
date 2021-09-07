import { CreateTypeInput } from '@codelab/backend/modules/type'
import { PrimitiveKind, TypeKind } from '@codelab/shared/abstract/core'

export const primitiveTypeCreateInputs: Array<CreateTypeInput> = [
  {
    name: PrimitiveKind.String,
    typeKind: TypeKind.PrimitiveType,
    primitiveType: { primitiveKind: PrimitiveKind.String },
  },
  {
    name: PrimitiveKind.Boolean,
    typeKind: TypeKind.PrimitiveType,
    primitiveType: { primitiveKind: PrimitiveKind.Boolean },
  },
  {
    name: PrimitiveKind.Float,
    typeKind: TypeKind.PrimitiveType,
    primitiveType: { primitiveKind: PrimitiveKind.Float },
  },
  {
    name: PrimitiveKind.Integer,
    typeKind: TypeKind.PrimitiveType,
    primitiveType: { primitiveKind: PrimitiveKind.Integer },
  },
]
