import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const keysecret = "abqwertyuioplkjhgfdsazxcvbnmkloi";

const providerSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email id already used"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
    },
    phone: {
        type: Number,
        minlength: 10,
        maxlength: 10,
        required: true,
        unique: true
    },
    business_address: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 8
    },
    logo: {
        type: String,
        required: true 
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ] 
});

providerSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isModified('cpassword')) {
        this.password = await bcrypt.hash(this.password, 10);
        this.cpassword = await bcrypt.hash(this.cpassword, 10); 
    }
    next();
});

providerSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, keysecret, {
            expiresIn: "1d"
        });
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (error) {
        throw new Error(error);
    }
}

const Provider = mongoose.model('Provider', providerSchema);
export default Provider;
