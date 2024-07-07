const mongoose=require("mongoose");
const validator=require("validator");
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");
const keysecret="abqwertyuioplkjhgfdsazxcvbnmkloi"
const providerSchema=new mongoose.Schema({
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
    business_address:{
        type:String,
        required:true,
        unique:true
    },
    user_name:{
        type:String,
        required:true,
        unique:true
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
    tokens:[
        {
            token:{
                type:String,
                required:true,
            }
        }
    ] 
});

providerSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isModified('cpassword')) {
        this.password = await bcryptjs.hash(this.password, 10);
        this.cpassword = await bcryptjs.hash(this.cpassword,10); 
    }
    next();
});

providerSchema.methods.generateAuthtoken =async function(){
    try{
        let token=jwt.sign({_id:this._id},keysecret,{
            expiresIn:"1d"
        });
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(e){
        res.status(422).json(error);
    }
}

const Provider=new mongoose.model('provider',providerSchema);
module.exports=Provider; 