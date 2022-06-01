import {
  EnumTypeOGM,
  exportEnumTypeSelectionSet,
  exportInterfaceTypeSelectionSet,
  exportPrimitiveTypeSelectionSet,
  exportReactNodeTypeSelectionSet,
  exportRenderPropsTypeSelectionSet,
  InterfaceTypeOGM,
  PrimitiveTypeOGM,
  ReactNodeTypeOGM,
  RenderPropsTypeOGM,
} from '@codelab/backend'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { ITypeExport } from '@codelab/shared/abstract/core'
import { ExportTypeData } from './export-user-types'
import { sortInterfaceTypesFields } from './get-type'

export const exportSeedTypes = async (): Promise<ExportTypeData> => {
  /**
   * Export all primitive types
   */
  const PrimitiveType = await PrimitiveTypeOGM()

  const primitiveTypes = await PrimitiveType.find({
    selectionSet: exportPrimitiveTypeSelectionSet,
    options: {
      sort: [{ name: OGM_TYPES.SortDirection.Asc }],
    },
  })

  /**
   * React Node Type
   */
  const ReactNodeType = await ReactNodeTypeOGM()

  // Only 1 here
  const reactNodeTypes = await ReactNodeType.find({
    selectionSet: exportReactNodeTypeSelectionSet,
    options: {
      sort: [{ name: OGM_TYPES.SortDirection.Asc }],
    },
  })

  /**
   * Render Props Type
   */
  const RenderPropsType = await RenderPropsTypeOGM()

  // Only 1 here
  const renderPropsTypes = await RenderPropsType.find({
    selectionSet: exportRenderPropsTypeSelectionSet,
    options: {
      sort: [{ name: OGM_TYPES.SortDirection.Asc }],
    },
  })

  /**
   * Enum
   */
  const EnumType = await EnumTypeOGM()

  const enumTypes = await EnumType.find({
    selectionSet: exportEnumTypeSelectionSet,
    options: {
      sort: [{ name: OGM_TYPES.SortDirection.Asc }],
    },
  })

  /**
   * Get all interfaces that are connected to atoms, here we don't do dependent types since Ant Design atoms don't have them (at least I haven't seen any)
   *
   * We will go through dependent types for user interfaces however
   */
  const InterfaceType = await InterfaceTypeOGM()

  const interfaceTypes = await InterfaceType.find({
    where: {
      apiOfAtomsAggregate: {
        count_GT: 0,
      },
    },
    options: {
      sort: [{ name: OGM_TYPES.SortDirection.Asc }],
    },
    selectionSet: exportInterfaceTypeSelectionSet,
  })

  /**
   * Here we create the interface dependency tree order
   *
   * Further to the front are closer to the leaf.
   */
  const allTypes = [
    ...primitiveTypes,
    ...renderPropsTypes,
    ...reactNodeTypes,
    ...enumTypes,
    // Put interfaces last since they depend on primitive types when seeding
    ...sortInterfaceTypesFields(interfaceTypes),
  ] as Array<ITypeExport>

  return { types: allTypes }
}