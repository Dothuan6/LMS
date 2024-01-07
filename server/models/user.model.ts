import mongoose,{Document,Model,Schema} from "mongoose";
import bcrypt from 'bcryptjs';
import { Mode } from "fs";

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document{
    name:string;
    email: string;
    password:string;
    avatar:{
        public_id:string;
        url:string;
    },
    role:string;
    isVerified:boolean;
    courses:Array<{courseId: string}>
    comparePassword: (password:string)=>Promise<boolean>;

};

const userSchema:Schema<IUser>= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Vui lòng nhập vào tên của bạn"],
    },
    email:{
        type:String,
        required:[true,"Vui lòng nhập vào email của bạn"],
        validate:{
            validator:function(value:string){
                return emailRegexPattern.test(value);
            },
            message:"Vui lòng nhập vào email hợp lệ",
        },
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Vui lòng nhập vào mật khẩu của bạn"],
        minlength:[6,"Mật khẩu bần ít hơn 6 kí tự"],
        select:false,
    },
    avatar:{
        public_id:String,
        url:String,
    },
    role:{
        type:String,
        default:"User",
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    courses:{
        courseId: String,

    },
},
{timestamps:true});

//hash pass truoc khi save

userSchema.pre<IUser>('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password= await bcrypt.hash(this.password,10);
    next();
} )
//compare pass
userSchema.methods.comparePassword = async function(enteredPassword:string):Promise<boolean>{
    return await bcrypt.compare(enteredPassword,this.password);

}
const userModel:Model<IUser>= mongoose.model("User",userSchema);
export default userModel;