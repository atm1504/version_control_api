import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { ModelsModule } from 'src/model/models.module';


@Module({
    imports: [ModelsModule],
    providers: [],
    controllers: [PostController],
})
export class PostModule { }
