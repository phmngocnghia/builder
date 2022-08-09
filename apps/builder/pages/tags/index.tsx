import { auth0Instance } from '@codelab/backend'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  CreateTagButton,
  CreateTagModal,
  DeleteTagsButton,
  DeleteTagsModal,
  GetTagsTable,
  GetTagsTree,
  UpdateTagModal,
} from '@codelab/frontend/modules/tag'
import { useStore } from '@codelab/frontend/presenter/container'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import {
  adminMenuItems,
  allPagesMenuItem,
  appMenuItem,
  ContentSection,
  pageBuilderMenuItem,
  resourceMenuItem,
  storeMenuItem,
} from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  DashboardTemplateProps,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const TagPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const { tagService, userService } = useStore()

  const [, { isLoading }] = useStatefulExecutor(() => tagService.getAll(), {
    executeOnMount: true,
  })

  return (
    <>
      <Head>
        <title>Tags | Codelab</title>
      </Head>

      <CreateTagModal tagService={tagService} userService={userService} />
      <UpdateTagModal tagService={tagService} />
      <DeleteTagsModal tagService={tagService} />

      <ContentSection>
        <GetTagsTable loading={isLoading} tagService={tagService} />
      </ContentSection>
    </>
  )
})

const TagPageHeader = observer(() => {
  const store = useStore()

  const pageHeaderButtons = [
    <CreateTagButton key={0} tagService={store.tagService} />,
    <DeleteTagsButton key={1} tagService={store.tagService} />,
  ]

  return <PageHeader extra={pageHeaderButtons} ghost={false} title="Tags" />
})

export default TagPage

TagPage.Layout = observer((page) => {
  const { tagService, userService } = useStore()

  return (
    <DashboardTemplate
      ExplorerPane={() => <GetTagsTree tagService={tagService} />}
      Header={TagPageHeader}
      SidebarNavigation={() => (
        <SidebarNavigation
          primaryItems={[
            appMenuItem,
            allPagesMenuItem(userService.user?.curAppId),
            pageBuilderMenuItem(
              userService.user?.curAppId,
              userService.user?.curPageId,
            ),
            storeMenuItem(userService.user?.curAppId),
            resourceMenuItem,
          ]}
          secondaryItems={adminMenuItems}
        />
      )}
    >
      {page.children}
    </DashboardTemplate>
  )
})

export const getServerSideProps = auth0Instance.withPageAuthRequired()