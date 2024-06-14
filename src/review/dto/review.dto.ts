import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class ReviewDTO {
    @IsNotEmpty()
    @MinLength(2)
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string
    
    @IsNotEmpty()
    body: string

    @IsNotEmpty()
    productId: string
}