import {
  ElementCssEditor,
  ElementHookSection,
  UpdateElementPropsForm,
} from '@codelab/frontend/modules/element'
import { IElementVertex } from '@codelab/shared/abstract/core'
import styled from '@emotion/styled'
import { Tabs } from 'antd'
import { Resizable } from 're-resizable'
import React from 'react'
import tw from 'twin.macro'
import { useBuilderSelection } from '../containers/builderState'
import { PropsInspectorTab } from './PropsInspectorTab'

const FormsGrid = ({ children }: React.PropsWithChildren<unknown>) => (
  <div
    tw="grid grid-cols-2 grid-rows-2 gap-4"
    style={{ gridTemplateRows: '1fr auto' }}
  >
    {children}
  </div>
)

const TabContainer = styled.div`
  height: 100%;
  display: flex;

  .ant-layout-sider-children,
  .ant-tabs,
  .ant-tabs-content,
  .ant-tabs-content-holder,
  .ant-tabs-tabpane,
  .tab-panel {
    ${tw`flex flex-col flex-grow min-h-0 overflow-visible`}
  }

  .tab-panel {
    ${tw`px-4 py-2 `}
  }

  .tab-panel,
  .ant-tabs-content {
    overflow: auto;
  }
`

export interface MetaPaneBuilderProps {
  renderUpdateElementContent: (element: IElementVertex) => React.ReactNode
}

export const MetaPaneBuilder = ({
  renderUpdateElementContent,
}: MetaPaneBuilderProps) => {
  const {
    state: { selectedElement },
  } = useBuilderSelection()

  if (!selectedElement) {
    return null
  }

  // Transform it, because we have the node in the state
  return (
    <Resizable
      enable={{ top: true }}
      maxHeight={400}
      defaultSize={{
        width: '100%',
        height: 320,
      }}
    >
      <TabContainer>
        <Tabs defaultActiveKey={selectedElement.id + '_tab1'}>
          <Tabs.TabPane tab="Element" key={selectedElement.id + '_tab1'}>
            <FormsGrid>{renderUpdateElementContent(selectedElement)}</FormsGrid>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Props" key={selectedElement.id + '_tab2'}>
            {selectedElement.atom ? (
              <UpdateElementPropsForm
                elementId={selectedElement.id}
                key={selectedElement.id}
              />
            ) : (
              `Add an atom to this element to edit its props`
            )}
          </Tabs.TabPane>

          <Tabs.TabPane
            style={{ overflow: 'visible' }}
            tab="CSS"
            key={selectedElement.id + '_tab3'}
          >
            {selectedElement.atom ? (
              <ElementCssEditor
                key={selectedElement.id}
                elementId={selectedElement.id}
              />
            ) : (
              `Add an atom to this page element to edit its CSS`
            )}
          </Tabs.TabPane>

          <Tabs.TabPane
            style={{ overflow: 'visible' }}
            tab="Hooks"
            key={selectedElement.id + '_tab4'}
          >
            {selectedElement.atom ? (
              <ElementHookSection
                key={selectedElement.id}
                elementId={selectedElement.id}
              />
            ) : (
              `Add an atom to this page element to edit its hooks`
            )}
          </Tabs.TabPane>

          <Tabs.TabPane
            style={{ overflow: 'visible' }}
            tab="Props Inspector"
            key={selectedElement.id + '_tab5'}
          >
            <PropsInspectorTab
              key={selectedElement.id}
              elementId={selectedElement.id}
            />
          </Tabs.TabPane>
        </Tabs>
      </TabContainer>
    </Resizable>
  )
}