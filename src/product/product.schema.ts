import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Collection, Document } from "mongoose";

@Schema({
    timestamps: true
})
export class Product extends Document {
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

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' })
    collectionId: Collection
}

export const ProductSchema = SchemaFactory.createForClass(Product)