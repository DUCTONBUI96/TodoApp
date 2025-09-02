import {createToDos,getAllToDos} from "../models/ToDoModels.js";
//Standardized response function
const handleResponse = (res,status,message,data)=>{
    res.status(status).json({
        status,
        message,
        data,
    });
}

export const createToDo = async (req,res,next)=>{
    const {title}=req.body;
    try{
        const newTodo = await createToDos(title);
        handleResponse(res,201,"Create successfully",newTodo)
    }   
    catch(err){
       next(err); 
    }
}

export const AllToDo = async (req,res,next)=>{
    try{
        const allTodo = await getAllToDos();
        handleResponse(res,201,"successfully",allTodo)
    }   
    catch(err){
       next(err); 
    }
}

// export const deleteToDo = async (req,res,next)=>{
//     const {id}=req.body;
//     try{
//         const allTodo = await deleteToDos(id);
//         handleResponse(res,201,"successfully",allTodo)
//     }   
//     catch(err){
//        next(err); 
//     }
// }