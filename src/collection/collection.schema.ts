import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose"
import { Product } from "src/product/product.schema"

@Schema({
    timestamps: true
})
export class Collection extends Document {
    @Prop()
    name: string
}

export const CollectionSchema = SchemaFactory.createForClass(Collection)