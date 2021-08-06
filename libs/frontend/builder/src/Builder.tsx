import styled from '@emotion/styled'
import React, { MouseEventHandler } from 'react'
import tw from 'twin.macro'
import { ElementTree } from './elementTree'
import { BuilderClickOverlay, BuilderHoverOverlay } from './overlay-toolbar'
import { Renderer } from './renderer'
import { useSetBuilder } from './useBuilder'
import { useBuilderHandlers } from './useBuilderHandlers'

export interface BuilderProps {
  tree: ElementTree
}

const StyledBuilderContainer = styled.div`
  // [data-id] is a selector for all rendered elements
  [data-id]:hover {
    cursor: pointer;
  }

  [data-id] {
    // Force all pointer events to be on, because otherwise we won't be able to click to inspect
    // elements that have it disabled by design, like disabled buttons
    pointer-events: all !important;
  }
`

/**
 * Wraps around {@link Renderer} to provide element-building functionality
 */
export const Builder = ({
  tree,
  children,
}: React.PropsWithChildren<BuilderProps>) => {
  const { setSelectedElement } = useSetBuilder()
  const { ...handlers } = useBuilderHandlers(tree)
  const { reset } = useSetBuilder()

  const handleContainerClick: MouseEventHandler<HTMLDivElement> = (e) => {
    // Handle the click-to-select element here, because if we handled it at the react element props level, we won't
    // be able to capture clicks on elements like disabled antd buttons and other ones that are designed not to emit clicks

    // Go up the dom tree to find a element with a node id
    const visit = (element: HTMLElement) => {
      const nodeId = element.dataset?.id
      // Don't allow selection of elements withing a componentId
      const componentId = element.dataset?.componentId

      if (nodeId && !componentId) {
        setSelectedElement(tree.getElementById(nodeId))
        e.stopPropagation()
      } else if (element.parentElement && element.id !== 'Builder') {
        // Unless we've reached the top element, or if the next parent is the Builder container, visit the parent
        visit(element.parentElement)
      } else {
        reset()
      }
    }

    visit(e.target as HTMLElement)
  }

  return (
    <StyledBuilderContainer
      onClick={handleContainerClick}
      id="Builder"
      css={tw`relative w-full h-full`}
    >
      <Renderer
        tree={tree}
        context={{
          extraProps: {
            onMouseEnter: handlers.handleMouseEnter,
            onMouseLeave: handlers.handleMouseLeave,
          },
        }}
      />
      <BuilderHoverOverlay />
      <BuilderClickOverlay />
      {children}
    </StyledBuilderContainer>
  )
}