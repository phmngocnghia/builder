import { useRouter } from 'next/router'
import { atom, useRecoilState } from 'recoil'
import { useBuilderLayout } from '../../builder/Builder-pane--state'

type PageDetailsState = {
  pageId?: string
}

export type CrudAction = 'create' | 'update'

export const pageState = atom<PageDetailsState>({
  key: 'page',
  default: {
    pageId: undefined,
  },
})

type UsePage = {
  resetPage: Function
  createPage: Function
  pageId: string
  updatePage(pageId: string): void
} & PageDetailsState

export const usePage = (): UsePage => {
  const { query } = useRouter()
  const layout = useBuilderLayout()
  const [page, setPage] = useRecoilState(pageState)

  const createPage = () => {
    layout.setPane('detail')

    return setPage({
      pageId: undefined,
    })
  }

  const updatePage = (pageId: string) => {
    layout.setPane('detail')

    return setPage({
      pageId,
    })
  }

  const resetPage = () => {
    layout.setPane('none')
    setPage({ pageId: undefined })
  }

  return {
    createPage,
    resetPage,
    updatePage,
    pageId: `${query.pageId}`,
    ...page,
  }
}