import { ElementTreeGraphql } from '@codelab/frontend/modules/element'
import { RenderContext } from '@codelab/frontend/presenter/container'
import { mergeProps } from '@codelab/shared/utils'
import * as _ from 'lodash'
import React from 'react'

export const transformPropsToComponent = (
  props: Record<string, any>,
  context: RenderContext<ElementTreeGraphql>,
  isRender = false,
  allProps: Record<string, any>,
) => {
  return _.mapValues(props, (value) => {
    const componentId = value?.id

    if (!componentId) {
      return
    }

    const component = context.tree.getComponentById(componentId)

    if (!component) {
      console.warn(
        'transformPropsToComponent',
        `Cant find component id ${componentId}`,
      )

      return
    }

    const rootElement = context.tree.getComponentRootElement(component.id)

    const RenderedPropsComponent = (...spreadComponentProps: Array<any>) => {
      const componentProps = mergeProps(allProps, ...spreadComponentProps)

      const result = context.renderFactory(component, {
        ...context,
        extraElementProps: mergeProps(context.extraElementProps, {
          [rootElement.id]: componentProps,
        }),
      })

      return <>{result}</>
    }

    if (!isRender) {
      return RenderedPropsComponent
    } else {
      return <RenderedPropsComponent />
    }
  })
}