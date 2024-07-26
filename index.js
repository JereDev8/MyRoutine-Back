import express from 'express'
import cors from 'cors'
//rutas
import routeUsers from './routes/users.js';
import routeTasks from './routes/tasks.js'
import routeDroppables from './routes/droppables.js'
import dotenv from 'dotenv'
 
dotenv.config()


const server = express();

server.use(cors({
    origin: 'http://localhost:5173', 
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

