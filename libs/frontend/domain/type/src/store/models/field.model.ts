import type {
  IAnyType,
  IField,
  IFieldProps,
  IProp,
  IValidationRules,
} from '@codelab/frontend/abstract/core'
import { propRef } from '@codelab/frontend/domain/prop'
import type { Nullish } from '@codelab/shared/abstract/types'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'
import { typeRef } from './union-type.model'

const hydrate = (data: IFieldProps) => {
  const {
    id,
    key,
    name,
    description,
    fieldType,
    validationRules: schemaStr,
    defaultValues,
  } = data

  const validationRules = JSON.parse(schemaStr || '{}')

  return new Field({
    id,
    name,
    description,
    key,
    type: typeRef(fieldType.id),
    validationRules,
    defaultValues: propRef(defaultValues?.id ?? ''),
  })
}

@model('@codelab/Field')
export class Field
  extends Model(() => ({
    // this is a 'local' id, we don't use it in the backend. It's generated from the interfaceId + the key
    id: idProp,
    name: prop<Nullish<string>>(),
    description: prop<Nullish<string>>(),
    key: prop<string>(),
    type: prop<Ref<IAnyType>>(),
    validationRules: prop<Nullish<IValidationRules>>(),
    defaultValues: prop<Ref<IProp>>(),
  }))
  implements IField
{
  @modelAction
  writeCache(fragment: IFieldProps) {
    this.id = fragment.id
    this.name = fragment.name
    this.description = fragment.description
    this.key = fragment.key
    this.type = typeRef(fragment.fieldType.id)
    this.validationRules = JSON.parse(fragment.validationRules || '{}')
    this.defaultValues = propRef(fragment.defaultValues?.id ?? '')

    return this
  }

  @modelAction
  static hydrate = hydrate

  toString(options?: { withData?: boolean }) {
    return `\n{ ${this.key}: ${this.type.current.toString()} }`
  }
}

export const fieldRef = rootRef<IField>('@codelab/FieldRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})