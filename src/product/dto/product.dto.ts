import { IsNotEmpty, IsString } from "class-validator"

export class ProductDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsNotEmpty()
    readonly description: number

    @IsNotEmpty()
    readonly price: number

    readonly discount: number

    readonly volume: number
}
