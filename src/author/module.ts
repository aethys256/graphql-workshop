import { Module } from '@nestjs/common'

import { AuthorService } from './service'

@Module({
  providers: [AuthorService],
  exports: [AuthorService],
})
export class AuthorModule {}
