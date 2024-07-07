const mongoose=require("mongoose");
const validator=require("validator");
const bcryptjs=require("bcryptjs");
const keysecret="abqwertyuioplkjhgfdsazxcvbnmkloi"
const userSchema=new mongoose.Schema({
    full_name:{
         type: "string",
         required: true,
         minlength: 3
    },
    email:{
        type: "string",
        required: true,
        unique:[true,"Email id already used"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    phone:{
        type:Number,
        minlength:10,
        maxlength:10,
        required:true,
        unique:true
    },
    delivery_address:{
        type:String,
        required:true,
        unique:true
    },    
    user_name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    date:{
        type:Date,
        default:Date.now    
    },
    tokens:[
        {
            token:{
                type:String,
                required:true,
            }
        }
    ] 
})

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcryptjs.hash(this.password, 10);
    }
    next();
});

userSchema.methods.generateAuthToken = async function() {
    try {
        let token = jwt.sign({ _id: this._id }, keysecret, { expiresIn: "1d" });
        this.tokens = this.tokens.concat({ token:token });
        await this.save();
        return token;
    } catch (e) {
        res.status(422).json(error);
    }
};


const User=new mongoose.model('user',userSchema);
module.exports=User; 