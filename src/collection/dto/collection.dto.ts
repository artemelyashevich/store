import { IsNotEmpty, MinLength } from "class-validator";

export class CollectionDto {
    @IsNotEmpty()
    @MinLength(2)
    name: string
}