// import React from 'react';
import FilterButton from './components/FilterButton';
import Form from './components/Form';
import Todo from "./components/todo";
import React,{ useState, useEffect } from 'react';
import { nanoid } from "nanoid";
const FILTER_MAP = {
  All: ()=> true,
  Waiting: task => !task.completed,
  Completed: task => task.completed,
}
const LOCAL_KEY = 'key.storage'

const FILTER_NAMES =Object.keys(FILTER_MAP);

function App(props) {
  
  // set filter
  const [filter,setFilter]= useState("All");
  

  // set tasks array state
  const [tasks, setTasks] = useState(props.tasks);

  //edit value
  function addTask(name){
    const newTask = { id: "todo-" + nanoid(), name : name, completed:false}
    setTasks([...tasks, newTask])
  }
  // render tasks
  const tasklist= tasks
    .filter(FILTER_MAP[filter])
    .map(task => 
    (<Todo 
      id={task.id} 
      name ={task.name} 
      completed={task.completed}
      toggleTaskComplete={toggleTaskComplete}
      key={task.id}
      deleteTask={deleteTask}
      editTask={editTask}
      />
    ))
  
    const filterList = FILTER_NAMES.map( (name) => {
      return <FilterButton 
      key={name} 
      name={name}
      isPressed = {name===filter}
      setFilter= {setFilter}
      />
  })

    // check persist of local object
    useEffect(()=>{
      const localpersist = JSON.parse(localStorage.getItem(LOCAL_KEY))
      if (localpersist) {setTasks(localpersist)}
    }, [])

    //add to local storage
    useEffect(()=>{
      localStorage.setItem(LOCAL_KEY, JSON.stringify(tasks))
    },[tasks])



    // delete task
    function deleteTask(id){

      const deletetask = tasks.filter((task)=>{
        return id!== task.id
      })
      setTasks(deletetask);
    }
    
    // Edit task
    function editTask(id, newName){

      const editedTask =tasks.map( task => {
        if (id=== task.id){
          return {...task, name: newName}
        }
        return task
      })
      setTasks(editedTask);

    }

    // check the task is complete
    function toggleTaskComplete(id){
      const updateTasks =tasks.map( task =>{
        if (id=== task.id){
          return {...task, completed:!task.completed}
        }
        return task
      })
      setTasks(updateTasks)
    }

  const headingText = `${tasklist.length} remaining`;
  
  
    return (
    <div className="todoapp stack-large">
      <h1>Todo List</h1>
      <Form addTask ={addTask} />
      <div className="filters btn-group stack-exception">
      {filterList}
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul 
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {tasklist}
      </ul>
    </div>
  );
}
export default App;
