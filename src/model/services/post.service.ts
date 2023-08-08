import { BadRequestException, ForbiddenException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Logger } from '@nestjs/common';
import * as _ from 'lodash';

import { ConfigService } from '@nestjs/config';

import { query } from 'express';
import axios from 'axios';


@Injectable()
export class PostService {

    constructor(
        private readonly configService: ConfigService,
    ) { }

}