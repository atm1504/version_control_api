import { Controller, UseGuards, Get, Param, Request, Req, Post, Logger, InternalServerErrorException, Body, Query, DefaultValuePipe, ParseIntPipe, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as _ from 'lodash';
import axios from 'axios';

@Controller('post')
export class PostController {
    constructor(
        private config: ConfigService,
    ) { }
}
