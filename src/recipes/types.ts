import { IsOptional, Length, Max, MaxLength, Min } from 'class-validator'
import { ArgsType, Field, InputType, Int } from 'type-graphql'

@InputType()
export class RecipeCreateInput {
  @Field()
  @MaxLength(30)
  title: string

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  description?: string

  @Field((type) => [String])
  ingredients: string[]

  @Field((type) => Int)
  authorId: number
}

@ArgsType()
export class RecipeFindManyArgs {
  @Field((type) => Int)
  @Min(0)
  skip: number = 0

  @Field((type) => Int)
  @Min(1)
  @Max(50)
  take: number = 25
}
