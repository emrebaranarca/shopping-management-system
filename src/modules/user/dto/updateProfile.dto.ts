import { IsOptional, IsString } from "class-validator";

export class UpdateProfileDto {
    
    @IsString()
    @IsOptional()
    name: string;
    
    @IsString()
    @IsOptional()
    email: string;
    
    @IsString()
    @IsOptional()
    surname: string;

}