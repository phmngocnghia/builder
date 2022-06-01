import { IPropData, TypedValue } from '@codelab/shared/abstract/core'
import { isPlainObject } from 'lodash'

export const isTypedValue = (props: IPropData): props is TypedValue<any> => {
  if (!props) {
    return false
  }

  return (
    isPlainObject(props) &&
    'type' in props &&
    typeof (props as any).type === 'string'
  )
}