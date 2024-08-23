import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    courseId:{type:String,required:true},
    taskName:String,
    dueDate:Date,
    details:String
})

const taskRecord = mongoose.model("taskRecord",taskSchema);

export default taskRecord