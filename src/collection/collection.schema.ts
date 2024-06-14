import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose"
import { Product } from "src/product/product.schema"

@Schema({
    timestamps: true
})
export class Collection extends Document {
    @Prop()
    name: string

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    })
    productsId: Product[]
}

export const CollectionSchema = SchemaFactory.createForClass(Collection)