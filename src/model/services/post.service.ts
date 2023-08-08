import { BadRequestException, ForbiddenException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Logger } from '@nestjs/common';
import * as _ from 'lodash';

import { ConfigService } from '@nestjs/config';

import { query } from 'express';
import axios from 'axios';
import { PostDTO } from '../entities/post.dto';
import { Post } from '../entities/post.entity';
import { Changes } from '../entities/changes.entity';


@Injectable()
export class PostService {

    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        @InjectRepository(Changes)
        private changesRepository: Repository<Changes>,

    ) { }

    async updatePost(body: PostDTO) {
        const changes = []
        try {
            const post = await this.postRepository.findOneById(body.id)
            if (!post) {
                throw new NotFoundException("Post not found")
            }

            if (post.username != body.username) {
                changes.push(`User id changed from ${post.username} to ${body.username}`)
                post.username = body.username
            }

            if (post.content != body.content) {
                post.content = body.content
                changes.push("Content has been updated.")
            }

            // Update the changes table
            let logResp = await this.changesRepository.findOne({ where: { postId: body.id } })

            let changeLog;
            let n = 0;

            if (!logResp) {
                logResp = new Changes()
                logResp.postId = post.id
                logResp.username = post.username
                changeLog = []
            } else {
                changeLog = JSON.parse(logResp.changes)
                console.log(changeLog)
                n = changeLog.length
            }

            if (changes.length == 0) {
                changeLog.push({
                    id: n + 1,
                    timestamp: new Date(),
                    changes: ["Post has been created"],
                    username: body.username
                })
            } else {
                changeLog.push({
                    timestamp: new Date(),
                    changes: changes,
                    username: body.username,
                    id: n + 1
                })
            }

            logResp.changes = JSON.stringify(changeLog)
            await this.changesRepository.save(logResp)
            return await this.postRepository.save(post)

        } catch (err) {
            console.log("Error occurred")
            console.log(err)
            throw new InternalServerErrorException(err.message)
        }

    }

    async getPost() {
        return await this.postRepository.findOneById(1)
    }

    async getChangeLog() {
        const data = await this.changesRepository.findOne({ where: { postId: 1 } })
        data.changes = (JSON.parse(data.changes)).reverse()
        return data
    }

}
