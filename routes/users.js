import { Router } from "express";
import User from "../models/User.js";
import { pool } from "../db.js"; 

const route = Router()

route.get('/users', async (req, res)=>{

    const [rows] = await pool.query(`SELECT * FROM users`)
  
    res.send(rows)
  })

  
route.post('/users', async (req, res)=>{ 
    console.log('LLega la peticion')
    const {uid, displayName, email, photoURL } = req.body;
    const createUser = await pool.query(`INSERT INTO users (username, email, tasks, droppables, uid, photoURL) 
      VALUES("${displayName}", "${email}", "${JSON.stringify([])}", '${JSON.stringify([
        {
          id: 1,
          hour: "01:00",
          isDropped: false,
          task: null
        },
        {
          id: 2,
          hour: "02:00",
          isDropped: false,
          task: null
        },
        {
          id: 3,
          hour: "03:00",
          isDropped: false,
          task: null
        },
        {
          id: 4,
          hour: "04:00",
          isDropped: false,
          task: null
        },
        {
          id: 5,
          hour: "05:00",
          isDropped: false,
          task: null
        },
      {
          id: 6,
          hour: "06:00",
          isDropped: false,
          task: null
      },
        {
        id: 7,
        hour: "07:00",
        isDropped: false,
        task: null
      },
    
      {
        id: 8,
        hour: "08:00",
        isDropped: false,
        task: null
      },
      {
        id: 9,
        hour: "09:00",
        isDropped: false,
        task: null
      },
      
      {
        id: 10,
        hour: "10:00",
        isDropped: false,
        task: null
      },
      {
        id: 11,
        hour: "11:00",
        isDropped: false,
        task: null
      },
    
      {
        id: 12,
        hour: "12:00",
        isDropped: false,
        task: null
      },
      {
        id: 13,
        hour: "13:00",
        isDropped: false,
        task: null
      },
      {
        id: 14,
        hour: "14:00",
        isDropped: false,
        task: null
      },
      {
        id: 15,
        hour: "15:00",
        isDropped: false,
        task: null
      },
      {
        id: 16,
        hour: "16:00",
        isDropped: false,
        task: null
      },
      {
        id: 17,
        hour: "17:00",
        isDropped: false,
        task: null
      },
      {
        id: 18,
        hour: "18:00",
        isDropped: false,
        task: null
      },
      {
        id: 19,
        hour: "19:00",
        isDropped: false,
        task: null
      },
      {
        id: 20,
        hour: "20:00",
        isDropped: false,
        task: null
      },
      {
        id: 21,
        hour: "21:00",
        isDropped: false,
        task: null
      },
      {
        id: 22,
        hour: "22:00",
        isDropped: false,
        task: null
      },
      {
        id: 23,
        hour: "23:00",
        isDropped: false,
        task: null
      },
      {
        id: 24,
        hour: "00:00",
        isDropped: false,
        task: null
      }
    ])}', "${uid}", "${photoURL}" )`)

    console.log('Usuario creado') 
    res.send(createUser)
  }) 
 
export default route   