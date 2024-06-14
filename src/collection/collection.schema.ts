import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose"

@Schema({
    timestamps: true
})
export class Collection {
    @Prop()
    name: string

    @Prop()
    productsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
}

export const CollectionSchema = SchemaFactory.createForClass(Collection)