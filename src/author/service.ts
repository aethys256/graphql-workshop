import { Injectable } from '@nestjs/common'
import faker from 'faker/locale/fr'

import { Author } from './model'

@Injectable()
export class AuthorService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */
  private authors: Author[] = [...new Array(10)].map((_, index) => ({
    id: index,
    name: faker.name.findName(),
    creationDate: new Date(),
  }))

  findOneById(id: number): Promise<Author> {
    return Promise.resolve(this.authors.find((author) => author.id === id))
  }
}
