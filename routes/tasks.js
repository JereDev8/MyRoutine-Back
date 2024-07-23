import { Router } from "express";
import { pool } from "../db.js";


const route = Router()

route.get('/users/:uid/tasks', async (req, res)=>{
    const { uid } = req.params;

    const [rows] = await pool.query(`SELECT tasks FROM users WHERE uid = '${uid}';`);
    
    console.log('checkpoint de tasks: ', rows )
    if(rows[0]) res.send(rows[0].tasks)
    else res.send(rows) 

})    

//Creo que esto esta obsoleto
route.put('/users/:uid/tasks', async (req, res)=>{
    const { uid } = req.params;
    const { tarea } = req.body; 

    const [rows] = await pool.query(`SELECT tasks FROM users WHERE uid = '${uid}'`)

    const copyTasks = JSON.parse(rows[0].tasks);

    copyTasks.push({
        task:tarea
    })

    const tasksUpdated = await pool.query(`UPDATE users SET tasks = '${JSON.stringify(copyTasks)}' WHERE uid = '${uid}'`)

    res.send(tasksUpdated)  


    // await User.update(
    //     { tasks:JSON.stringify(copyTasks) },
    //     {
    //       where:{uid} 
    //     },
    //   );

    // await User.update({tasks:JSON.stringify(copyTasks)}, where:{ id })
    // console.log('Llego la consulta de la tarea')
    // res.send(copyTasks)

})


export default route; 