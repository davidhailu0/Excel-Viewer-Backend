import { DataTypes, Model } from "sequelize"
import {sequelize} from "../db"
import ItemInterface from "./itemInterface"

const Item = sequelize.define("Item",{
  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
  },
  Item_NO:{
    type: DataTypes.STRING,
    allowNull: true
  },
  Description:{
    type: DataTypes.TEXT,
    allowNull: true
  },
  Rate:{
    type:DataTypes.DOUBLE,
    allowNull:true
  },
  Quantity:{
    type:DataTypes.INTEGER,
    allowNull:true
  },
  Amount:{
    type:DataTypes.DOUBLE,
    allowNull:true
  }
})

async function syncItems(){
  await Item.sync({force:true})
}

syncItems()

async function fetchAllItems(){
  return await Item.findAll()
} 

async function fetchItem(id:number){
  return await Item.findByPk(id)
}

async function createItems(newItems:ItemInterface[]){
  await Item.destroy({where:{},truncate:true})
  for(let it of newItems){
      await Item.create({Item_NO:it.Item_NO,Description:it.Description,Rate:it.Rate,Quantity:it.Quantity,Amount:it.Amount})
  }
  return await Item.findAll()
}

async function updateItem(id:number,updateBody:ItemInterface){
  const updateItem = await Item.findByPk(id)
  updateItem?.set({Item_NO:updateBody.Item_NO,Description:updateBody.Description,Rate:updateBody.Rate,Quantity:updateBody.Quantity,Amount:updateBody.Amount})
  await updateItem?.save()
  return updateItem?.toJSON()
}

async function deleteItem(id:number){
  await Item.destroy({where:{
    id:id
  }})
}

export {fetchAllItems,fetchItem,createItems,updateItem,deleteItem}