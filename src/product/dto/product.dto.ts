import { IsNotEmpty, IsString, IsUrl } from "class-validator"

export class ProductDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsNotEmpty()
    readonly description: number

    @IsNotEmpty()
    readonly price: number

    @IsNotEmpty()
    @IsUrl()
    readonly imageUrl: string

    readonly discount: number

    readonly volume: number

    @IsNotEmpty()
    readonly collection: string
}
