import { Injectable } from '@nestjs/common'
import faker from 'faker/locale/fr'

import { getRandomInt } from '../util/random'

import { RecipeCreateInput, RecipeFindManyArgs } from './types'
import { Recipe } from './model'

@Injectable()
export class RecipeService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */
  private recipes: Recipe[] = [...new Array(20)].map((_, index) => ({
    id: index,
    title: faker.lorem.words(),
    description: Math.random() > 0.5 ? faker.lorem.sentences() : undefined,
    creationDate: new Date(),
    ingredients: [...new Array(5)].map(() => faker.lorem.word()),
    authorId: getRandomInt(0, 10),
  }))

  create(input: RecipeCreateInput): Promise<Recipe> {
    const recipe = { id: this.recipes.length, creationDate: new Date(), ...input }
    this.recipes.push(recipe)

    return Promise.resolve(recipe)
  }

  findOneById(id: number): Promise<Recipe> {
    return Promise.resolve(this.recipes.find((recipe) => recipe.id === id))
  }

  findAll(args: RecipeFindManyArgs): Promise<Recipe[]> {
    const { skip, take } = args

    return Promise.resolve(this.recipes.slice(skip, take))
  }

  remove(id: number): Promise<boolean> {
    return Promise.resolve(true)
  }
}
