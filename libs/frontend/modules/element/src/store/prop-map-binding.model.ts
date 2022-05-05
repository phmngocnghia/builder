import { BINDING_WILDCARD } from '@codelab/frontend/abstract/core'
import {
  IPropData,
  IPropMapBinding,
  IPropMapBindingDTO,
} from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { get, isObjectLike, set } from 'lodash'
import { idProp, Model, model, modelAction, prop, Ref } from 'mobx-keystone'
import type { Element } from './element.model'
import { elementRef } from './element.ref'

const hydrate = (fragment: IPropMapBindingDTO) => {
  return new PropMapBinding({
    id: fragment.id,
    targetElement: fragment.targetElement
      ? elementRef(fragment.targetElement.id)
      : null,
    sourceKey: fragment.sourceKey,
    targetKey: fragment.targetKey,
  })
}

@model('@codelab/PropMapBinding')
export class PropMapBinding
  extends Model({
    id: idProp,
    // if null -> target is current element
    targetElement: prop<Nullable<Ref<Element>>>(),
    // '*' binds all incoming props
    sourceKey: prop<string>(),
    // '*' spreads all props
    targetKey: prop<string>(),
  })
  implements IPropMapBinding
{
  @modelAction
  updateCache(fragment: IPropMapBindingDTO) {
    this.id = fragment.id
    this.sourceKey = fragment.sourceKey
    this.targetKey = fragment.targetKey
    this.targetElement = fragment.targetElement
      ? elementRef(fragment.targetElement.id)
      : null
  }

  applyBindings(sourceProps: IPropData): IPropData {
    const value =
      this.sourceKey === BINDING_WILDCARD
        ? sourceProps
        : get(sourceProps, this.sourceKey)

    if (
      this.targetKey === BINDING_WILDCARD &&
      (value === null || isObjectLike(value))
    ) {
      return { ...value }
    }

    const newProps = {}

    set(newProps, this.targetKey, value)

    return newProps
  }

  public static hydrate = hydrate
}