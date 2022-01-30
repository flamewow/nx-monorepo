import { HashModule } from '@flamewow.inc/hash';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HashModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
