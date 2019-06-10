import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Parent, Query, ResolveProperty, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'apollo-server-express'

import { Author } from '../author/model'
import { AuthorService } from '../author/service'

import { RecipeCreateInput, RecipeFindManyArgs } from './types'
import { Recipe } from './model'
import { RecipeService } from './service'

const pubSub = new PubSub()

@Resolver((of) => Recipe)
export class RecipeResolver {
  constructor(private readonly recipeService: RecipeService, private readonly authorService: AuthorService) {}

  @Query((returns) => Recipe)
  async recipe(@Args('id') id: number): Promise<Recipe> {
    const recipe = await this.recipeService.findOneById(id)
    if (!recipe) throw new NotFoundException(id)

    return recipe
  }

  @ResolveProperty((returns) => Author)
  async author(@Parent() recipe: Recipe): Promise<Author> {
    const { authorId } = recipe
    const author = await this.authorService.findOneById(authorId)
    if (!author) throw new NotFoundException(authorId)

    return author
  }

  @Query((returns) => [Recipe])
  recipes(@Args() args: RecipeFindManyArgs): Promise<Recipe[]> {
    return this.recipeService.findAll(args)
  }

  @Mutation((returns) => Recipe)
  async createRecipe(@Args('input') input: RecipeCreateInput): Promise<Recipe> {
    const recipe = await this.recipeService.create(input)
    pubSub.publish('recipeAdded', { recipeAdded: recipe })

    return recipe
  }

  @Mutation((returns) => Boolean)
  deleteRecipe(@Args('id') id: number) {
    return this.recipeService.remove(id)
  }

  @Subscription((returns) => Recipe)
  recipeAdded() {
    return pubSub.asyncIterator('recipeAdded')
  }
}
