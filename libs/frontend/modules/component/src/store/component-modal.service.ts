import { ModalService } from '@codelab/frontend/shared/utils'
import { IComponent, IEntityModalService } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'
import { Component } from './component.model'

@model('@codelab/ComponentModalService')
export class ComponentModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<Component>>>(ModalService),
    {},
  )
  implements
    IEntityModalService<Ref<IComponent>, { component: Maybe<IComponent> }>
{
  @computed
  get component() {
    return this.metadata?.current
  }
}
