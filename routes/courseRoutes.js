import express from "express";
import courseRecord from "../models/courseModel.js";
import mongoose from "mongoose";
import {createCourse,readCourse,readSpecific,updateSpecific,deleteSpecific} from "../controllers/courseControllers.js"

const routerCourse = express.Router();

routerCourse.post('/',createCourse)

routerCourse.get('/',readCourse)

routerCourse.get('/:courseId',readSpecific)

routerCourse.put('/:courseId',updateSpecific)

routerCourse.delete('/:courseId',deleteSpecific)

export default routerCourse