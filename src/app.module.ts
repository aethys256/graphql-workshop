import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphQLError, GraphQLFormattedError } from 'graphql'

import { RecipeModule } from './recipes/module'
import { DateScalar } from './common/scalars/date.scalar'
import { AuthorModule } from './author/module'

@Module({
  imports: [
    GraphQLModule.forRoot({
      cors: false,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.graphql',
      playground: {
        settings: {
          'request.credentials': 'same-origin',
        },
      },
      formatError: (err: GraphQLError): GraphQLFormattedError => {
        console.error(JSON.parse(JSON.stringify(err)))

        return err
      },
    }),
    AuthorModule,
    RecipeModule,
  ],
  providers: [DateScalar],
})
export class ApplicationModule {}
