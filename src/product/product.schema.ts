import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

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

    @Prop()
    collectionId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection'}]
}

export const ProductSchema = SchemaFactory.createForClass(Product)