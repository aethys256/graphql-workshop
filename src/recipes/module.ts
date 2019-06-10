import { Module } from '@nestjs/common'

import { AuthorModule } from '../author/module'

import { RecipeResolver } from './resolver'
import { RecipeService } from './service'

@Module({
  imports: [AuthorModule],
  providers: [RecipeResolver, RecipeService],
})
export class RecipeModule {}
