import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseId:{type:String,required:true},
    courseName:{type:String,required:true},
    description:String,
    instructor:String,
    semester:String
})

const courseRecord = mongoose.model("courseRecord",courseSchema);

export default courseRecord