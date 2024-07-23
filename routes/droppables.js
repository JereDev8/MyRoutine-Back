import { Router } from "express";
import User from "../models/User.js";
import { pool } from "../db.js";


const route = Router()

route.get('/users/:uid/droppables', async(req, res)=>{
    const { uid } = req.params;
    const [rows] = await pool.query(`SELECT droppables FROM users WHERE uid = '${uid}';`)
    
    res.send(rows[0].droppables)  
})

route.post('/users/:uid/droppables', async (req, res)=>{
    const { uid } = req.params
    const { drops, drags } = req.body;
    
    const updateUser = await pool.query(`UPDATE Users
        SET tasks = '${JSON.stringify(drags)}', droppables = '${JSON.stringify(drops)}'
        WHERE uid = '${uid}';
    `);

     res.send(updateUser)

    
    //user.dataValues.droppables  
 
})

export default route;