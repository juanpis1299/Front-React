import React, { useEffect,useState} from 'react'
import { Card, CardContent, Typography,Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function TaskList() {

    const [tasks,setTasks] = useState([])
    const navigate = useNavigate()

    const loadTasks = async() => {
       const response = await fetch('http://localhost:4000/tasks/')
       const data =  await response.json()
       console.log(data)
       setTasks(data)
    }
    const handleDeleteTask = async (id) => {
        try {
        const res = await fetch('http://localhost:4000/tasks/${id}',{
            method: 'DELETE',
        })
        const data = await res.json();
        console.log(data)
        setTasks(tasks.fitler((task)=>task.id !== id))

    }catch(error){
        console.log(error)}
    }
    useEffect(() =>{
          loadTasks()  
     },[])

    return (
    <>
    
    {
         tasks.map((task) =>(
            <Card style={{
            marginBottom:'.7rem',
            backgroundColor:'#1e272e'}}
            key={tasks.id}>
                   <CardContent style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                   }}>
                    <div style={{color:'white'}}>
                        <Typography>{task.title}</Typography>
                         <Typography> {task.description}</Typography>
                    </div>
                    <div>
                         <Button 
                         variant='contained'
                         color= 'inherit'
                         onClick={()=> navigate ('/tasks/${task.id}/edit')}>
                            Edit
                         </Button>

                         <Button
                         variant='contained'
                         color= 'warning'
                         onClick={()=> handleDeleteTask(task.id)}
                         style={{marginLeft:'.5rem'}}>
                            Delete
                         </Button>
                    </div>
                    </CardContent> 

            </Card>

         ))
    }
    </>
  )
}

export default TaskList
