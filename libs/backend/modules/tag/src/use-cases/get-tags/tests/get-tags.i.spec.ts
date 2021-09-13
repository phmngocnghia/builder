import { domainRequest } from '@codelab/backend/infra'
import { setupTestModule, teardownTestModule } from '@codelab/backend/nestjs'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../../tag.module'
import { CreateTagInput } from '../../create-tag'
import {
  TestCreateTagGql,
  TestCreateTagMutation,
} from '../../create-tag/tests/create-tag.api.graphql.gen'
import { SeedTagTreeService } from '../../seed-tag-tree'
import { TestGetTagsGql, TestGetTagsQuery } from './get-tags.api.graphql.gen'

describe('GetTagsUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication

  const tagA: CreateTagInput = {
    name: 'Tag A',
  }

  const tagB: CreateTagInput = {
    name: 'Tag B',
  }

  beforeAll(async () => {
    guestApp = await setupTestModule([TagModule], { role: Role.Guest })
    userApp = await setupTestModule([TagModule], { role: Role.User })

    await domainRequest<CreateTagInput, TestCreateTagMutation>(
      userApp,
      TestCreateTagGql,
      tagA,
    )
    await domainRequest<CreateTagInput, TestCreateTagMutation>(
      userApp,
      TestCreateTagGql,
      tagB,
    )
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create a Tag', async () => {
      await domainRequest<unknown, TestGetTagsQuery>(
        guestApp,
        TestGetTagsGql,
        {},
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should get Tags', async () => {
      const { getTags } = await domainRequest<unknown, TestGetTagsQuery>(
        userApp,
        TestGetTagsGql,
      )

      expect(getTags).toMatchObject([
        { name: SeedTagTreeService.__TAG_ROOT },
        tagA,
        tagB,
      ])
    })
  })
})
