import { DgraphEntityType, DgraphQueryBuilder } from '@codelab/backend'

export const getLambdaQuery = () =>
  new DgraphQueryBuilder()
    .addTypeFilterDirective(DgraphEntityType.Lambda)
    .addExpandAll()
    .addFields(`id: uid`)