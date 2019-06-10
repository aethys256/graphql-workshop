import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Author {
  @Field((type) => ID)
  id: number

  @Field()
  name: string

  @Field()
  creationDate: Date
}
