import { DgraphQueryBuilder } from '@codelab/backend'

export const getElementQuery = () =>
  new DgraphQueryBuilder().addBaseFields().addRecurseDirective().addFields(`
          name
          root
          children @facets(order)
          component
          atom
          value
          elementProps
          props
          values
          booleanValue
          floatValue
          intValue
          stringValue
          type
          key
          css
          description
          fields
          field
          allowedValues
          itemType
          primitiveKind
          atomType
          api
      `)