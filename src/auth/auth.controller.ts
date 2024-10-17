import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { LoginDto } from 'src/dto/login-dto';

@Controller('auth')
export class AuthController {

    @Get()
    @Render('auth')
    authViews(){
        
    }

    @Post('login')
    async login(@Body() req: LoginDto){
    //     const delay = (t: number) => new Promise(resolve => setTimeout(resolve, t));

    //    await delay(3000)

        return {message: "Login successful"}
    }
}
