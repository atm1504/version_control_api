import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './modules/post/post.module';
import { ModelsModule } from './model/models.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), ModelsModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
