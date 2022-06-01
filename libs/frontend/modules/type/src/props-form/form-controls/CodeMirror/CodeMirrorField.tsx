import {
  CodeMirrorInput,
  contextCompletionOptions,
  typeCompletionOptions,
} from '@codelab/frontend/view/components'
import { Controller } from 'react-hook-form'
import { FieldProps } from '../Field'

export const CodeMirrorField = ({ field, form, context }: FieldProps) => (
  <Controller
    control={form.control}
    name={field.key}
    render={(control) => (
      <CodeMirrorInput
        defaultCompletionOptions={typeCompletionOptions(field.type.current)}
        onBlur={control.field.onBlur}
        onChange={control.field.onChange}
        templateCompletionOptions={contextCompletionOptions(
          context?.autocomplete || {},
        )}
        value={control.field.value}
      />
    )}
  />
)