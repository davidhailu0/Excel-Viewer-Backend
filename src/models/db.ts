import { Sequelize } from "sequelize";

const sequelize:Sequelize = new Sequelize("item","root","12345678",{host:"localhost",dialect:"mysql"})
async function checkAuthentication():Promise<void>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export {sequelize,checkAuthentication}