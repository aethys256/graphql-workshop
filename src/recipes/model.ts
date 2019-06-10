import { Field, ID, ObjectType } from 'type-graphql'

import { Author } from '../author/model'

@ObjectType()
export class Recipe {
  @Field((type) => ID)
  id: number

  @Field()
  title: string

  @Field({ nullable: true })
  description?: string

  @Field()
  creationDate: Date

  @Field((type) => [String])
  ingredients: string[]

  authorId: number

  @Field((type) => Author, { nullable: true })
  author?: Author
}
