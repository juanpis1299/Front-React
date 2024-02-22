import React from 'react'
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography, circularProgressClasses,} from '@mui/material'
import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import TaskList from './TaskList'

function TaskForm() {

    const[task, setTask] = useState ({
        title: '',
        description: ''
    })

    const [loading, setloading] = useState(false);
    const [editing, setEditing] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setloading(true)

        if(editing){
            await fetch('http://localhost:4000/tasks/${params.id}',{
                method:'POST',
                mode: 'no-cors',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });
            const data = await response.json();
            console.log(data);
        }else{
                await fetch('http://localhost:4000/tasks',{
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(task),
                headers: {'Content-Type': 'application/json'},
                
            });
            setloading(false);
            navigate('/');

        }
        /*console.log(task);*/
        setloading(false);
        navigate('/')
    }

    const handleChange = (e) => 
        setTask({ ...task,[e.target.name]:e.target.value });
    
    const loadTasks =  async(id) =>{
        const res = await fetch ('http://localhost:4000/tasks/${id}')
        const data = await res.json()
        setTask({title: data.title, description: data.description})
        setEditing(true)
        
    };

    useEffect(() =>{
        if(params.id){
            loadTasks(params.id);
        }
    },[params.id])


  return (
   <Grid container direction= 'column' alignItems='center' justifyContent='center'>
    <Grid item xs ={3}>
        <Card sx={{mt:5}} style={{
            background:'#1e272e',
            padding: '1rem'}}>
            <Typography variant='5' color={'white'}>
            {editing? 'Edit task' : 'Añadir tarea'} 
            </Typography>

            <CardContent>
                <form onSubmit={handleSubmit}>
                     <TextField variant='filled' label='Escribe tu titulo'
                     sx={{
                        display: 'block',
                        margin:'1rem 0'
                     }}
                     inputProps={{style:{color:'white'}}}
                     InputLabelProps={{style:{color:'white'}}}
                     name="title"
                     onChange={handleChange}
                     />

                     <TextField variatnt= 'filled' label='Escribe la descripcion' 
                     sx={{
                        display:'block',
                        margin:'4rem 0'
                    }} 
                     inputProps={{style:{color:'white'}}}
                     InputLabelProps={{style:{color:'white'}}}
                     name="description"
                     onChange={handleChange}
                     />

                     <Button variant='contained' color='primary' type='submit'disabled = {
                        !task.title || TaskList.description }>
                        {loading ?<CircularProgress
                        color='inherit'
                        size={24}
                        
                        /> : 'Save'}
                     </Button>
                </form>
            </CardContent>

        </Card>
    </Grid>
   </Grid>
  )
}

export default TaskForm
