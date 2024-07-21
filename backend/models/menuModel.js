import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    image:{
        type:String,
        required:true
    }
});

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;