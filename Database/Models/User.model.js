import mongoose, { Schema, model } from "mongoose";



const userSchema = new Schema({
    name:{
        type: String,
        minlength: 3, 
        maxlength: 10
    },
    email: {
        type: String,
        unique: true
    }, 
    password: {
        type: String,
        required: true 
    },
     phone:{
        type:String
    },
     address:{
        type:String
    },

    isConfirmed: {
        type: Boolean,
        default: false
    },
    role:{
            type:String,
            enum:["customer","seller","admin"],
            default:"customer"
    },

    isActive: {
        type: Boolean,
        default: true
    },

    isRestricted: {
        type: Boolean,
        default: false
    }
   

    // wishlist:[
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:"Product"
    //     }
    // ],

},{
    timestamps: true, 
    versionKey: false 
})

const userModel = model("User", userSchema);

export default userModel