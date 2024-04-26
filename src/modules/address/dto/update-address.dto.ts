import { IsNotEmpty } from "class-validator";

export class UpdateAddressDto {
    @IsNotEmpty()
    address: string;
}