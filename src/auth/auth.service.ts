import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/dto/login-dto';
import { User } from 'src/entities/user';
import { EntityManager } from 'typeorm';
import * as bcrypt from "bcrypt";
import { RegisterDto } from 'src/dto/register-dto';

@Injectable()
export class AuthService {

    constructor(protected readonly db: EntityManager) { }

    async login(payload: LoginDto): Promise<void> {
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
    }

    async register(payload: RegisterDto): Promise<void> {

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
    }
}
