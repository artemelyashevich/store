import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Review {
    @Prop()
    name: string

    @Prop()
    email: string

    @Prop()
    body: string

    @Prop()
    productId: string
}


export const ReviewSchema = SchemaFactory.createForClass(Review)