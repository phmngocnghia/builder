import { RightCircleOutlined } from '@ant-design/icons'
import { TYPE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { typeRef } from '../../../../store'
import { TypeRecord } from './types'

type ActionColumnProps = WithServices<TYPE_SERVICE> & {
  type: TypeRecord
}

export const ActionColumn = observer<ActionColumnProps>(
  ({ type, typeService }) => {
    return (
      <Space size="middle">
        {type.typeKind === 'InterfaceType' ? (
          <Link
            href={PageType.InterfaceDetail.replace('[interfaceId]', type.id)}
          >
            <RightCircleOutlined />
          </Link>
        ) : null}
        <ListItemEditButton
          onClick={() => typeService.updateModal.open(typeRef(type.id))}
        />
        <ListItemDeleteButton
          onClick={() => typeService.deleteModal.open(typeRef(type.id))}
        />
      </Space>
    )
  },
)