import { PageType } from '@codelab/frontend/model/state/router'
import { BuilderMainPane, useBuilder } from '@codelab/frontend/modules/builder'
import {
  CreateElementButton,
  DeleteElementModal,
} from '@codelab/frontend/modules/element'
import { PageContext } from '@codelab/frontend/presenter/container'
import {
  ActionType,
  CrudModal,
  EntityType,
  useCrudModalForm,
} from '@codelab/frontend/view/components'
import { refetchGetPageQuery } from '@codelab/shared/codegen/graphql'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { CreatePageElementForm } from '../use-cases/page-element/create-page-element'

export const PageDetailMainPane = () => {
  const { tree, page, loading, pageId } = useContext(PageContext)
  const router = useRouter()
  const { reset } = useCrudModalForm(EntityType.Element)

  const {
    state: { selectedElement },
  } = useBuilder()

  const appId = router.query.appId as string

  return (
    <BuilderMainPane
      key={pageId}
      tree={tree}
      title={page.name}
      moveElementRefetchQueries={[refetchGetPageQuery({ input: { pageId } })]}
      headerProps={{
        onBack: () =>
          router.push({
            pathname: PageType.PageList,
            query: { appId },
          }),
      }}
      header={<CreateElementButton loading={loading} key={0} />}
    >
      <CrudModal
        entityType={EntityType.Element}
        actionType={ActionType.Create}
        okText={'Create'}
        renderForm={() => (
          <CreatePageElementForm
            initialData={{ parentElementId: selectedElement?.id }}
          />
        )}
      />

      <DeleteElementModal
        formProps={{
          onSubmitSuccess: () => reset(),
          refetchQueries: [refetchGetPageQuery({ input: { pageId: page.id } })],
        }}
      />
    </BuilderMainPane>
  )
}