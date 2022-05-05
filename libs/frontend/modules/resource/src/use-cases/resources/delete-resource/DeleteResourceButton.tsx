import { DeleteOutlined } from '@ant-design/icons'
import { RESOURCE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { resourceRef } from '../../../store'

export type DeleteResourceButton = DeleteButtonProps &
  WithServices<RESOURCE_SERVICE>

export const DeleteResourceButton = observer<DeleteResourceButton>(
  ({ disabled, ids, resourceService }) => (
    <Button
      danger
      disabled={disabled}
      icon={<DeleteOutlined />}
      onClick={() => resourceService.deleteModal.open(resourceRef(ids[0]))}
      size="small"
    />
  ),
)