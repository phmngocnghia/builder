import { PlusOutlined } from '@ant-design/icons'
import {
  IActionService,
  IInterfaceType,
  IStore,
  IStoreService,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { InterfaceDefaultsButton, typeRef } from '@codelab/frontend/domain/type'
import {
  EditorPaneHeader,
  useResizable,
} from '@codelab/frontend/view/components'
import { Button, Row } from 'antd'
import { motion } from 'framer-motion'
import { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React, { PropsWithChildren } from 'react'
import tw from 'twin.macro'
import { GetActionsList, GetStateList } from '../use-cases'

export interface StoreEditorPaneProps {
  typeService: ITypeService
  actionService: IActionService
  storeService: IStoreService
  appStore: IStore
}

const ResizableColumn = ({ children }: PropsWithChildren) => {
  const resizable = useResizable({
    width: { default: 240, max: 460, min: 240 },
  })

  return (
    <motion.div
      css={tw`h-full  flex flex-row w-4/12`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...resizable.containerProps}
    >
      <div css={tw`flex-1 overflow-y-auto`}>{children}</div>
      <motion.div
        css={[tw`bg-gray-200 h-full z-10`, `width: 2px`]}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...resizable.xDragHandleProps}
      />
    </motion.div>
  )
}

export const StoreEditorPane = observer<StoreEditorPaneProps>(
  ({ typeService, actionService, appStore, storeService }) => {
    const createStateFieldButton = (
      <Button
        icon={<PlusOutlined />}
        onClick={(event: React.MouseEvent) => {
          typeService.fieldCreateModal.open(
            typeRef(appStore.api.id) as Ref<IInterfaceType>,
          )
        }}
        size="small"
        title="Add Field"
        type="primary"
      />
    )

    const editDefaultStateButton = (
      <InterfaceDefaultsButton
        interfaceId={appStore.api.id}
        typeService={typeService}
      />
    )

    const createActionButton = (
      <Button
        icon={<PlusOutlined />}
        onClick={(event: React.MouseEvent) => {
          actionService.createModal.open()
        }}
        size="small"
        title="Add Field"
        type="primary"
      />
    )

    return (
      <Row css={tw`h-full`} wrap={false}>
        <ResizableColumn>
          <EditorPaneHeader
            extra={[editDefaultStateButton, ' ', createStateFieldButton]}
          >
            State
          </EditorPaneHeader>
          <GetStateList store={appStore} typeService={typeService} />
        </ResizableColumn>

        <motion.div css={tw`flex-1  h-full`}>
          <EditorPaneHeader extra={createActionButton}>
            Actions
          </EditorPaneHeader>
          <GetActionsList actionService={actionService} store={appStore} />
        </motion.div>
      </Row>
    )
  },
)