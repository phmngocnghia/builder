import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphTag } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Tag } from '../domain/tag.model'

@Injectable()
export class TagAdapter extends BaseAdapter<DgraphTag, Tag> {
  mapItem({ name, uid }: DgraphTag): Tag {
    return new Tag({ id: uid, name })
  }
}