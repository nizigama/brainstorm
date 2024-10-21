import { IsString, Length } from "class-validator"

export class LoginDto {
    @IsString()
    @Length(3)
    username: string

    @IsString()
    @Length(6)
    password: string
}
