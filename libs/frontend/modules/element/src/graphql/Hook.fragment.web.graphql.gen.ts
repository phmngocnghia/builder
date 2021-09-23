import * as Types from '@codelab/shared/codegen/graphql';

import { HookConfig_GraphqlHookConfig_Fragment, HookConfig_QueryHookConfig_Fragment, HookConfig_QueryPageHookConfig_Fragment, HookConfig_QueryPagesHookConfig_Fragment, HookConfig_RecoilStateHookConfig_Fragment } from './HookConfig.fragment.web.graphql.gen';
import { gql } from '@apollo/client';
import { HookConfigFragmentDoc } from './HookConfig.fragment.web.graphql.gen';
export type HookFragment = { id: string, type: Types.HookType, config: HookConfig_GraphqlHookConfig_Fragment | HookConfig_QueryHookConfig_Fragment | HookConfig_QueryPageHookConfig_Fragment | HookConfig_QueryPagesHookConfig_Fragment | HookConfig_RecoilStateHookConfig_Fragment };

export const HookFragmentDoc = gql`
    fragment Hook on Hook {
  id
  type
  config {
    ...HookConfig
  }
}
    ${HookConfigFragmentDoc}`;