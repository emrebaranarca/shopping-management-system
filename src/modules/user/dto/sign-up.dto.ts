import { IsEmail,Matches, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator"
export class SignUpDto{

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name:string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    surname:string

    @IsEmail()
    email:string

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password is too weak',
      })
    password:string
}