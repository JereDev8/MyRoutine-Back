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
    const newId = copyTasks.length + 1;
    copyTasks.push({
        id: newId,    
        task:tarea,
        isDropped: false
    })

    const tasksUpdated = await pool.query(`UPDATE users SET tasks = '${JSON.stringify(copyTasks)}' WHERE uid = '${uid}'`)

    res.send(tasksUpdated)  

})


route.delete('/users/:uid/tasks', async (req, res)=>{
    const {uid} = req.params;
    const {id} = req.body;

    //Debo buscar la lista de tareas y la lista de droppables del usuario que tenga el uid pasado por params.
    const [rows] = await pool.query(`SELECT droppables, tasks FROM users WHERE uid = '${uid}';`);

    //A esas listas le tengo que sacar la tarea con el id que me mandan desde el front.
    const copyTasks = JSON.parse(rows[0].tasks); 
    const arraySinLaTarea = copyTasks.filter(tarea => tarea.id != id);
    // Sea donde sea que haya eliminado la tarea, la tengo que volver a armar a la lista con nuevos ids (ordenados).
    const tasksOrdenadas = arraySinLaTarea.map((tarea, index)=>{
        return {...tarea, id:index + 1}
    }) ;

    const copyDrops = JSON.parse(rows[0].droppables);
    const dropsActualizados = copyDrops.map(drop=>{
        if(drop.task){
            if(drop.task.id == id){
                return {...drop,isDropped:false, task:null}
            }
            else {
                const tareaEncontrada = tasksOrdenadas.filter(tarea=> tarea.task == drop.task.task);
                return {...drop, task:tareaEncontrada[0]}
            }
        }
        else return drop
    })

    //actualizar base de datos con nuevos valores
    await pool.query(`UPDATE users SET droppables = '${JSON.stringify(dropsActualizados)}', tasks ='${JSON.stringify(tasksOrdenadas)}' WHERE uid = '${uid}';`);

    //enviar las nuevas listas al front y que el front actualize tanto droppables como draggables. 
    res.json({newTasks: tasksOrdenadas, newDrops: dropsActualizados})
})
  
export default route;  