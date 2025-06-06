import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Food Processing" },
    date: { type: Date, default: Date.now() },
    payment: { type: Boolean, default: false },
    //for split payment
    isSplitPayment: { type: Boolean, default: false }, // true if user chose split
    splitType: { type: String, enum: ['equal', 'custom'], default: null }, // 'equal' or 'custom'
    customAmounts: [{ type: Number }], // array of split amounts if splitType is custom
    participants: [{ type: String }] // (optional) to track who paid in split
})

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema)

export default orderModel;