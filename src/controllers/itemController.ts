import express,{ Router,Request,Response } from "express";
import { fetchAllItems, fetchItem,createItems, updateItem, deleteItem } from "../models/Item/itemModel";

const router:Router = express.Router()

router.get("/",async(req:Request,res:Response)=>{
    const allItems = await fetchAllItems()
    return res.status(200).json({status:"success",data:allItems})
})

router.get("/:id",async(req:Request,res:Response)=>{
    const {id} = req.params
    const fetchedItem = await fetchItem(parseInt(id))
    return res.status(200).json({status:"success",data:fetchedItem})
})

router.post("/create",async(req:Request,res:Response)=>{
    const createdItems = await createItems(req.body)
    return res.status(201).json({status:"success",data:createdItems})
})

router.put("/:id",async(req:Request,res:Response)=>{
    const {id} = req.params
    const updatedItem = await updateItem(parseInt(id),req.body)
    return res.status(200).json({status:"success",data:updatedItem})
})

router.delete("/:id",async(req:Request,res:Response)=>{
    const {id} = req.params
    await deleteItem(parseInt(id))
    return res.status(204).json({status:"success",data:[]})
})

export default router