const mongoose=require("mongoose");
const postSchema=mongoose.Schema({
content:{type:String},
user:{type:mongoose.Types.ObjectId,ref:"User",required:true},
likes:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
],
replies:[
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        
        },
        content:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    },
    
],
createdAt:{
    type:Date,
    default:Date.now
}

});
const Post=mongoose.model("post",postSchema);

module.exports=Post;