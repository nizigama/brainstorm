import { Body, Controller, Get, Post, Render, Session } from '@nestjs/common';
import { LoginDto } from 'src/dto/login-dto';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/dto/register-dto';

@Controller('auth')
export class AuthController {

    constructor(protected readonly service: AuthService) { }

    @Get()
    @Render('auth')
    authViews() {

    }

    @Post('login')
    async login(@Body() req: LoginDto, @Session() session: Record<string, any>) {

        const userId = await this.service.login(req)

        session.isAuthenticated = "yes"
        session.userId = userId

        return { message: "Login successful" }
    }

    @Post('register')
    async register(@Body() req: RegisterDto, @Session() session: Record<string, any>) {
        const userId = await this.service.register(req)

        session.isAuthenticated = "yes"
        session.userId = userId

        return { message: "Registration successful" }
    }
}
