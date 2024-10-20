import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/dto/login-dto';
import { User } from 'src/entities/user';
import { EntityManager } from 'typeorm';
import * as bcrypt from "bcrypt";
import { RegisterDto } from 'src/dto/register-dto';
import { BrainService } from 'src/brain/brain.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AuthService {

    constructor(
        protected readonly db: EntityManager,
        protected readonly brainsService: BrainService,
        @InjectQueue('default-queue') protected readonly queue: Queue
    ) { }

    async login(payload: LoginDto): Promise<number> {
        const user = await this.db.findOne(User, {
            where: {
                username: payload.username
            }
        })

        if (user === null) {
            throw new UnauthorizedException()
        }

        const passwordIsValid = await bcrypt.compare(payload.password, user.password);

        if (!passwordIsValid) {
            throw new UnauthorizedException()
        }

        return user.id
    }

    async register(payload: RegisterDto): Promise<number> {

        if (payload.password !== payload.password_confirm) {
            throw new HttpException("Password's don't match", HttpStatus.BAD_REQUEST)
        }

        const user = await this.db.findOne(User, {
            where: {
                username: payload.username
            }
        })

        if (user !== null) {
            throw new HttpException("User already exists", HttpStatus.BAD_REQUEST)
        }

        const newUser = this.db.create(User, {
            username: payload.username,
            password: await bcrypt.hash(payload.password, 10)
        })

        await this.db.save(newUser)

        await this.queue.add('CreateUserThread', {
            userId: newUser.id
        })

        return newUser.id
    }
}
