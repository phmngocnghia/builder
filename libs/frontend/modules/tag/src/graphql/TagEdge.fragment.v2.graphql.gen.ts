import * as Types from '@codelab/shared/abstract/codegen-v2'

import { gql } from '@apollo/client'
export type TagEdgeFragment = { source: string; target: string }

export const TagEdgeFragmentDoc = gql`
  fragment TagEdge on TagEdge {
    source
    target
  }
`
