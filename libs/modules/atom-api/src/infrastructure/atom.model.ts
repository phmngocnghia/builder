import { InterfaceType } from '@codelab/modules/type-api'
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { AtomType, AtomTypeEnum } from './atom-type.model'

registerEnumType(AtomTypeEnum, {
  name: 'AtomType',
})

@ObjectType()
export class Atom {
  @Field(() => ID)
  declare id: string

  @Field(() => AtomTypeEnum)
  declare type: AtomType

  @Field()
  declare name: string

  @Field(() => InterfaceType)
  /** Optional because the field resolver can get it */
  declare api?: InterfaceType

  constructor({ id, type, name, api }: Atom) {
    this.id = id
    this.type = type
    this.name = name
    this.api = api
  }
}