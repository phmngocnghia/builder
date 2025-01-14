import { IAtomType } from '@codelab/shared/abstract/core'
import dynamic from 'next/dynamic'
import { AtomsRecord } from '../types'

export const antdAtoms: AtomsRecord = {
  [IAtomType.AntDesignGridRow]: dynamic(() => import('antd/lib/grid/row')),
  [IAtomType.AntDesignIcon]: dynamic(() =>
    import('@codelab/frontend/platform/atoms').then((mod) => mod.AntdIcon),
  ),
  [IAtomType.AntDesignMenu]: dynamic(() => import('antd/lib/menu')),
  [IAtomType.AntDesignMenuItem]: dynamic(
    () => import('antd/lib/menu/MenuItem'),
  ),
  [IAtomType.AntDesignMenuItemGroup]: dynamic(() =>
    import('antd/lib/menu').then((mod) => mod.default.ItemGroup),
  ),
  [IAtomType.AntDesignMenuSubMenu]: dynamic(
    () => import('antd/lib/menu/SubMenu'),
  ),
  [IAtomType.AntDesignGridCol]: dynamic(() => import('antd/lib/grid/col')),
  [IAtomType.AntDesignCard]: dynamic(() => import('antd/lib/card')),
  [IAtomType.AntDesignCardGrid]: dynamic(() => import('antd/lib/card/Grid')),
  [IAtomType.AntDesignCardMeta]: dynamic(() => import('antd/lib/card/Meta')),
  [IAtomType.AntDesignTypography]: dynamic(() => import('antd/lib/typography')),
  [IAtomType.AntDesignTypographyTitle]: dynamic(
    () => import('antd/lib/typography/Title'),
  ),
  [IAtomType.AntDesignTypographyText]: dynamic(
    () => import('antd/lib/typography/Text'),
  ),
  [IAtomType.AntDesignTypographyParagraph]: dynamic(
    () => import('antd/lib/typography/Paragraph'),
  ),
  [IAtomType.AntDesignAlert]: dynamic(() => import('antd/lib/alert')),
  [IAtomType.AntDesignAffix]: dynamic(() => import('antd/lib/affix')),
  [IAtomType.AntDesignAutoComplete]: dynamic(
    () => import('antd/lib/auto-complete'),
  ),
  [IAtomType.AntDesignCascader]: dynamic(() => import('antd/lib/cascader')),
  [IAtomType.AntDesignButton]: dynamic(() => import('antd/lib/button')),
  [IAtomType.AntDesignBreadcrumb]: dynamic(() => import('antd/lib/breadcrumb')),
  [IAtomType.AntDesignBreadcrumbItem]: dynamic(() =>
    import('antd/lib/breadcrumb').then((mod) => mod.default.Item),
  ),
  [IAtomType.AntDesignDropdown]: dynamic(() => import('antd/lib/dropdown')),
  [IAtomType.AntDesignDropdownButton]: dynamic(
    () => import('antd/lib/dropdown'),
  ),
  [IAtomType.AntDesignForm]: dynamic(() => import('antd/lib/form')),
  [IAtomType.AntDesignFormItem]: dynamic(
    () => import('antd/lib/form/FormItem'),
  ),
  [IAtomType.AntDesignFormList]: dynamic(
    () => import('antd/lib/form/FormList'),
  ),
  [IAtomType.AntDesignFormErrorList]: dynamic(
    () => import('antd/lib/form/ErrorList'),
  ),
  [IAtomType.AntDesignFormProvider]: dynamic(
    () => import('antd/lib/form/context') as never,
  ),
  [IAtomType.AntDesignCheckbox]: dynamic(() => import('antd/lib/checkbox')),
  [IAtomType.AntDesignCheckboxGroup]: dynamic(() =>
    import('antd/lib/checkbox').then((mod) => mod.default.Group),
  ),
  [IAtomType.AntDesignInput]: dynamic(() => import('antd/lib/input')),
  [IAtomType.AntDesignInputNumber]: dynamic(
    () => import('antd/lib/input-number'),
  ),
  [IAtomType.AntDesignSelect]: dynamic(() => import('antd/lib/select')),
  [IAtomType.AntDesignSelectOption]: dynamic(() =>
    import('antd/lib/select').then((mod) => mod.default.Option),
  ),
  [IAtomType.AntDesignRglContainer]: dynamic(() => import('react-grid-layout')),
  [IAtomType.AntDesignRglResponsiveContainer]: dynamic(
    () => import('react-grid-layout'),
  ),
  [IAtomType.AntDesignModal]: dynamic(() => import('antd/lib/modal')),
  [IAtomType.AntDesignNotification]: dynamic(
    () => import('antd/lib/notification') as never,
  ),
  [IAtomType.AntDesignRadioGroup]: dynamic(
    () => import('antd/lib/radio/group'),
  ),
  [IAtomType.AntDesignRadio]: dynamic(() => import('antd/lib/radio')),
  [IAtomType.AntDesignRate]: dynamic(() => import('antd/lib/rate')),
  [IAtomType.AntDesignSlider]: dynamic(
    () => import('antd/lib/slider') as never,
  ),
  [IAtomType.AntDesignSwitch]: dynamic(() => import('antd/lib/switch')),
  [IAtomType.AntDesignSpace]: dynamic(() => import('antd/lib/space')),
  [IAtomType.AntDesignDatePicker]: dynamic(
    () => import('antd/lib/date-picker'),
  ),
  [IAtomType.AntDesignDivider]: dynamic(() => import('antd/lib/divider')),
  [IAtomType.AntDesignPagination]: dynamic(() => import('antd/lib/pagination')),
  [IAtomType.AntDesignPageHeader]: dynamic(
    () => import('antd/lib/page-header'),
  ),
  [IAtomType.AntDesignBadge]: dynamic(() => import('antd/lib/badge')),
  [IAtomType.AntDesignAvatar]: dynamic(() => import('antd/lib/avatar')),
  [IAtomType.AntDesignComment]: dynamic(() => import('antd/lib/comment')),
  [IAtomType.AntDesignCalendar]: dynamic(() => import('antd/lib/calendar')),
  [IAtomType.AntDesignDescriptions]: dynamic(
    () => import('antd/lib/descriptions'),
  ),
  [IAtomType.AntDesignDescriptionsItem]: dynamic(
    () => import('antd/lib/descriptions/Item'),
  ),
  [IAtomType.AntDesignEmpty]: dynamic(() => import('antd/lib/empty')),
  [IAtomType.AntDesignTimeline]: dynamic(() => import('antd/lib/timeline')),
  [IAtomType.AntDesignTimelineItem]: dynamic(
    () => import('antd/lib/timeline/TimelineItem'),
  ),
  [IAtomType.AntDesignTabs]: dynamic(() => import('antd/lib/tabs')),
  [IAtomType.AntDesignTabsTabPane]: dynamic(() =>
    import('antd/lib/tabs').then((mod) => mod.default.TabPane),
  ),
  [IAtomType.AntDesignStatistic]: dynamic(() => import('antd/lib/statistic')),
  [IAtomType.AntDesignTooltip]: dynamic(() => import('antd/lib/tooltip')),
  [IAtomType.AntDesignTag]: dynamic(() => import('antd/lib/tag')),
  [IAtomType.AntDesignTree]: dynamic(() => import('antd/lib/tree')),
  [IAtomType.AntDesignDrawer]: dynamic(() => import('antd/lib/drawer')),
  [IAtomType.AntDesignMessage]: dynamic(
    () => import('antd/lib/message') as never,
  ),
  [IAtomType.AntDesignProgress]: dynamic(() => import('antd/lib/progress')),
  [IAtomType.AntDesignResult]: dynamic(() => import('antd/lib/result')),
  [IAtomType.AntDesignSpin]: dynamic(() => import('antd/lib/spin')),
  [IAtomType.AntDesignSkeleton]: dynamic(() => import('antd/lib/skeleton')),
  [IAtomType.AntDesignAnchor]: dynamic(() => import('antd/lib/anchor')),
  [IAtomType.AntDesignAnchorLink]: dynamic(
    () => import('antd/lib/anchor/AnchorLink'),
  ),
  [IAtomType.AntDesignBackTop]: dynamic(() => import('antd/lib/back-top')),
  [IAtomType.AntDesignConfigProvider]: dynamic(
    () => import('antd/lib/config-provider'),
  ),
  [IAtomType.AntDesignPopconfirm]: dynamic(() => import('antd/lib/popconfirm')),
  [IAtomType.AntDesignTreeSelect]: dynamic(
    () => import('antd/lib/tree-select'),
  ),
  [IAtomType.AntDesignTreeNode]: dynamic(() =>
    import('antd/lib/tree-select').then((mod) => mod.default.TreeNode),
  ),
  [IAtomType.AntDesignTimePicker]: dynamic(
    () => import('antd/lib/time-picker'),
  ),
  [IAtomType.AntDesignTransfer]: dynamic(
    () => import('antd/lib/transfer') as never,
  ),
  [IAtomType.AntDesignUpload]: dynamic(() => import('antd/lib/upload')),
  [IAtomType.AntDesignSteps]: dynamic(() => import('antd/lib/steps')),
  [IAtomType.AntDesignStepsStep]: dynamic(() =>
    import('antd/lib/steps').then((mod) => mod.default.Step),
  ),
  [IAtomType.AntDesignCollapse]: dynamic(() => import('antd/lib/collapse')),
  [IAtomType.AntDesignCollapsePanel]: dynamic(
    () => import('antd/lib/collapse/CollapsePanel'),
  ),
  [IAtomType.AntDesignCarousel]: dynamic(() => import('antd/lib/carousel')),
  [IAtomType.AntDesignList]: dynamic(() => import('antd/lib/list')),
  [IAtomType.AntDesignListItem]: dynamic(() => import('antd/lib/list/Item')),
  [IAtomType.AntDesignListItemMeta]: dynamic(() =>
    import('antd/lib/list/Item').then((mod) => mod.default.Meta),
  ),
  [IAtomType.AntDesignMentions]: dynamic(() => import('antd/lib/mentions')),
  [IAtomType.AntDesignMentionsOption]: dynamic(() =>
    import('antd/lib/mentions').then((mod) => mod.Option),
  ),
  [IAtomType.AntDesignLayout]: dynamic(() => import('antd/lib/layout')),
  [IAtomType.AntDesignLayoutHeader]: dynamic(() =>
    import('antd/lib/layout').then((mod) => mod.default.Header),
  ),
  [IAtomType.AntDesignLayoutSider]: dynamic(
    () => import('antd/lib/layout/Sider'),
  ),
  [IAtomType.AntDesignLayoutContent]: dynamic(() =>
    import('antd/lib/layout').then((mod) => mod.default.Content),
  ),
  [IAtomType.AntDesignLayoutFooter]: dynamic(() =>
    import('antd/lib/layout').then((mod) => mod.default.Footer),
  ),
  [IAtomType.AntDesignPopover]: dynamic(() => import('antd/lib/popover')),
  [IAtomType.AntDesignSegmented]: dynamic(() => import('antd/lib/segmented')),
  [IAtomType.AntDesignTable]: dynamic(() => import('antd/lib/table')),
  [IAtomType.AntDesignImage]: dynamic(() => import('antd/lib/image')),
}
