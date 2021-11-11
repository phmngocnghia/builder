import { ReactElement } from 'react'
import { RenderPipe } from '../types/RenderPipe'

/**
 * Renders the elements children, this should be the last pipe
 */
export const renderChildrenPipe: RenderPipe = (element, context, props) => {
  const childVertices = context.tree.getChildren(element.id)

  if (!childVertices || childVertices?.length === 0) {
    // Allow for a 'children' prop, but only if we have no regular children
    if (typeof props.children === 'string' && childVertices?.length === 0) {
      return props.children
    }

    // It's important to be undefined if we have no children to display,
    // since void components like input will throw an error if their children prop isn't undefined
    return undefined
  }

  const rendered = childVertices
    .map((child) => context.renderFactory(child, context))
    .filter((c): c is ReactElement => !!c)

  if (!rendered?.length) {
    return undefined
  }

  // If we have only one children, just return it.
  // Ant Design doesn't handle array children well in some cases, like Forms
  if (rendered.length === 1) {
    return rendered[0]
  }

  return rendered
}