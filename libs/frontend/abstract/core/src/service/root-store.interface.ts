import {
  IActionService,
  IAdminService,
  IAppService,
  IAtomService,
  IBuilderService,
  IComponentService,
  IDomainService,
  IElementService,
  IFieldService,
  IPageService,
  IRenderService,
  IResourceService,
  IStoreService,
  ITagService,
  ITypeService,
  IUserDTO,
  IUserService,
} from '../domain'

/**
 * Initial data to be injected into store
 */
export interface RootStoreData {
  user?: IUserDTO
  servicesFromSnapshot?: unknown
  init?: boolean
}

export interface IRootStore {
  // setUserService(userService: IUserService): void
  userService: IUserService
  appService: IAppService
  pageService: IPageService
  typeService: ITypeService
  fieldService: IFieldService
  atomService: IAtomService
  tagService: ITagService
  adminService: IAdminService
  componentService: IComponentService
  actionService: IActionService
  // propService: IPropService
  storeService: IStoreService
  appRenderService: IRenderService
  builderRenderService: IRenderService
  elementService: IElementService
  builderService: IBuilderService
  resourceService: IResourceService
  domainService: IDomainService
}
