import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Product {
    @Prop()
    name: string

    @Prop()
    description: string

    @Prop()
    price: number

    @Prop()
    discount: number

    @Prop()
    rating: number

    @Prop()
    volume: number
}

export const ProductSchema = SchemaFactory.createForClass(Product)