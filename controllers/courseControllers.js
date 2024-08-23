import courseRecord from "../models/courseModel.js";

export const createCourse = async(req,res)=>{
    try{
        const newCourse = await courseRecord.create(req.body);
        res.status(201).json(newCourse)
    }
    catch(e){
        res.status(500).send(e.message);
    }

}
export const readCourse = async(req,res)=>{
    try {
        const read = await courseRecord.find()
        res.status(200).json(read)
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const readSpecific = async(req,res)=>{
    try {
        const cid = req.params.courseId;
        const data = await courseRecord.find({courseId:cid})
        if(data.length>0){
            res.status(200).json(data)
        }else{
            res.status(404).json({ "message": "Course not found" });
        }
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const updateSpecific = async(req,res)=>{
    try {
        const cid = req.params.courseId;
        const updateData = req.body;
        const data = await courseRecord.findOneAndUpdate({courseId:cid},{$set:updateData},{new:true})
        if(data){
            res.status(200).json(data)
        }
        else{
            res.status(404).json({ "message": "Course not found" });
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const deleteSpecific = async (req,res) => {
    try {
        const cid = req.params.courseId;
        const data = await courseRecord.findOneAndDelete({courseId:cid})
        if(data){
            res.status(200).json({"message":"deleted successfully"})
        }else{
            res.status(404).json({ "message": "Course not found" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}