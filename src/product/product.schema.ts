import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Product  {
    [x: string]: any;
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

    @Prop()
    collection: string
}

export const ProductSchema = SchemaFactory.createForClass(Product)