import { Controller, UseGuards, Get, Param, Request, Req, Post, Logger, InternalServerErrorException, Body, Query, DefaultValuePipe, ParseIntPipe, Patch, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as _ from 'lodash';
import axios from 'axios';
import { PostDTO } from 'src/model/entities/post.dto';
import { PostService } from 'src/model/services/post.service';

@Controller('api')
export class PostController {
    constructor(
        private config: ConfigService,
        private postService: PostService

    ) { }

    @Post('/post')
    async updatePost(@Body() postDTO: PostDTO): Promise<any> {
        console.log("we are here")
        return await this.postService.updatePost(postDTO)
    }

    @Get('/post')
    async getPosts(): Promise<any> {
        return await this.postService.getPost()
    }

    @Get('/changes')
    async getChangeLogs(): Promise<any> {
        return await this.postService.getChangeLog()
    }
}
