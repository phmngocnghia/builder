import { RESOURCE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DisplayIfField, ModalForm } from '@codelab/frontend/view/components'
import { IUpdateResourceDTO, ResourceType } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { updateResourceSchema } from './updateResourceSchema'

export const UpdateResourceModal = observer<WithServices<RESOURCE_SERVICE>>(
  ({ resourceService }) => {
    const updateResource = resourceService.updateModal.resource
    const closeModal = () => resourceService.updateModal.close()

    const onSubmit = async (data: IUpdateResourceDTO) => {
      if (!updateResource) {
        throw new Error('Updated resource is not set')
      }

      return resourceService.update(updateResource, data)
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while updating resource',
    })

    const model = updateResource
      ? {
          name: updateResource.name,
          config: updateResource.config,
          type: updateResource.type,
        }
      : {}

    return (
      <ModalForm.Modal
        okText="Update Resource"
        onCancel={closeModal}
        visible={resourceService.updateModal.isOpen}
      >
        <ModalForm.Form
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={updateResourceSchema}
        >
          <AutoFields omitFields={['config']} />

          {/**
           *
           *  GraphQL Resource Config Form
           *
           */}
          <DisplayIfField<IUpdateResourceDTO>
            condition={(c) => c.model.type === ResourceType.GraphQL}
          >
            <AutoField name="config.url" />
            <AutoField name="config.headers" />
            <AutoField name="config.cookies" />
          </DisplayIfField>

          {/**
           *
           *  Rest Resource Config Form
           *
           */}
          <DisplayIfField<IUpdateResourceDTO>
            condition={(c) => c.model.type === ResourceType.Rest}
          >
            <AutoField name="config.url" />
            <AutoField name="config.headers" />
            <AutoField name="config.cookies" />
          </DisplayIfField>
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)