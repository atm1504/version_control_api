import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Changes } from './entities/changes.entity';
import { Post } from './entities/post.entity';
import { PostService } from './services/post.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('DB_HOST'),
                port: 3306,
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: false,
                keepConnectionAlive: true,
            }),
            inject: [ConfigService],
        }),

        TypeOrmModule.forFeature([
            Changes,
            Post
        ])
    ],
    providers: [PostService
    ],
    exports: [
        PostService
    ],
})
export class ModelsModule { }