import { ITypeKind } from '@codelab/shared/abstract/core'
import { IBaseType } from '../base-type'

/**
 * Prop values for this type have the shape of {@see TypedValue} in order to
 * be distinguished from other element types.
 *
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it `(props) => ReactNode` value
 * - ReactNodeType: Component select box, results it `ReactNode` value
 * - ElementType: Current tree element select box, results it `ReactNode` value
 */
export interface IRenderPropsType extends IBaseType {
  kind: ITypeKind.RenderPropsType
}
