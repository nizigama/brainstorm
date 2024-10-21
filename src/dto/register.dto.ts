import { IsString, Length } from "class-validator"

export class RegisterDto {
    @IsString()
    @Length(3)
    username: string

    @IsString()
    @Length(6)
    password: string

    @IsString()
    @Length(6)
    password_confirm: string
}
