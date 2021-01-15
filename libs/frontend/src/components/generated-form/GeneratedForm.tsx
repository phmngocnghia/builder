import { Theme as AntDTheme } from '@rjsf/antd'
import { FormProps as RjsfFormProps, withTheme } from '@rjsf/core'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { JSONSchema7 } from 'json-schema'
import React, { ReactElement } from 'react'

const ThemedForm = withTheme(AntDTheme)

/** This object is used to control form submission */
export interface SubmitController {
  submit: () => void
}

/** Generic form event containg the current form values as the @property data */
export interface FormEvent<T> {
  data: T
}

const setSubmitControllerRef = (
  submitBtnRef:
    | React.MutableRefObject<SubmitController | undefined>
    | undefined,
) => (sbtn: HTMLButtonElement | null) => {
  if (!submitBtnRef) return

  // eslint-disable-next-line no-param-reassign
  submitBtnRef.current = sbtn
    ? {
        submit: () => sbtn.click(),
      }
    : undefined
}

export interface FormProps<T extends object> {
  schema: JSONSchema7
  onSubmit: (submitEvent: FormEvent<T>) => any
  onChange?: (changeEvent: FormEvent<T>) => any
  formData?: T
  /**
   * Pass false to hide the submit button inside the form.
   * It still will be rendered, so you can interact with it using the submitBtnRef (e.g. submit using submitBtnRef.click())
   */
  hideSubmitButton?: boolean
  /** Use this to be able to hide the submit button and get a controller, which can trigger form submit */
  submitControllerRef?: React.MutableRefObject<SubmitController | undefined>
  submitButtonProps?: ButtonProps
  rjsfFormProps?: Omit<RjsfFormProps<T>, keyof FormProps<T>>
}

/**
 * A form that's generated by a JSON schema
 */
const GeneratedForm = <T extends object>({
  submitControllerRef,
  hideSubmitButton,
  schema,
  onSubmit,
  formData,
  onChange,
  submitButtonProps = {},
  rjsfFormProps = {},
}: FormProps<T>): ReactElement => {
  /**
   * TODO infer form title form json schema (we could probably modify generator to give a title), ask for help on generator if needed
   */
  return (
    <ThemedForm
      schema={schema}
      onSubmit={(e) => {
        if (onSubmit) onSubmit({ data: e.formData })
      }}
      onChange={(e) => {
        if (onChange) onChange({ data: e.formData })
      }}
      formData={formData}
      {...rjsfFormProps}
    >
      {/* This button exists because by default the Form from rjsf includes a submit button.
       Since we don't want to use it and we want to submit with the modal button, we need to hide it.
       So if we add our own button and hide it with display: none, it works */}

      <Button
        htmlType="submit"
        style={hideSubmitButton ? { display: 'none' } : undefined}
        // Expose only a submit controller ref, so that we don't have to expose the whole button ref
        ref={setSubmitControllerRef(submitControllerRef)}
        {...submitButtonProps}
      >
        Submit
      </Button>
    </ThemedForm>
  )
}

export default GeneratedForm