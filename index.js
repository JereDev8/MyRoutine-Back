import express from 'express'
import cors from 'cors'
//rutas
import routeUsers from './routes/users.js';
import routeTasks from './routes/tasks.js'
import routeDroppables from './routes/droppables.js'

import dotenv from 'dotenv'
import {Sequelize} from 'sequelize'
import User from './models/User.js';



dotenv.config()


const server = express();

server.use(cors({
    origin: 'https://my-routine-two.vercel.app', 
  }))
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use('/', routeUsers)
server.use('/', routeTasks)
server.use('/', routeDroppables) 

server.get('/', (req, res)=>{
  res.send('Checkpoint funcionando!')
})


server.listen(3000, ()=>console.log('Server on http://localhost:3000'))

