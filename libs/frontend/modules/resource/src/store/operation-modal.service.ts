import { ModalService } from '@codelab/frontend/shared/utils'
import {
  IModalService,
  IOperation,
  IOperationModalProperties,
} from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'

@model('@codelab/OperationModalService')
export class OperationModalService
  extends ExtendedModel(() => ({
    baseModel: modelClass<ModalService<Ref<IOperation>>>(ModalService),
    props: {},
  }))
  implements IModalService<Ref<IOperation>, IOperationModalProperties>
{
  @computed
  get operation() {
    return this.metadata?.current ?? null
  }
}