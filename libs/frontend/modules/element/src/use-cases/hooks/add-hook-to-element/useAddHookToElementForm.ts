import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useHookDispatch } from '../../../hooks/useHookDispatch'
import { useAddHookToElementMutation } from '../../../store'
import {
  AddHookToElementSchema,
  mapDataToInput,
} from './addHookToElementSchema'

export const useAddHookToElementForm = (elementId: string) => {
  const { resetModal } = useHookDispatch()

  const [mutate, state] = useAddHookToElementMutation({
    selectFromResult: (r) => ({
      hook: r.data?.addHookToElement,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    (submitData: AddHookToElementSchema) => {
      const input = mapDataToInput(elementId, submitData)

      return mutate({ variables: { input } })
    },
    [mutate, elementId],
  )

  return {
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while creating hook',
      }),
      onSubmitSuccess: () => resetModal(),
    },
    state,
    reset: resetModal,
  }
}