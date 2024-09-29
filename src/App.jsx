import { useState,useEffect } from 'react'

import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){

      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
       
    }
  }, [])
  
  
  const saveToLS = () => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  
  const togglefinished = (e)=>{
    setshowfinished(!showfinished)

  }


  const handleEdit = (e, id)=>{
    let t = todos.filter(i=> i.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item=>{
      return item.id !== id
    });
    
    setTodos(newTodos)
    saveToLS()

  }
  const handleDelete = (e,id)=>{
    
    let newTodos = todos.filter(item=>{
      return item.id !== id
    });
    
    setTodos(newTodos)
    saveToLS()
  }
  const handleAdd = ()=>{
    
      setTodos([...todos, {id:uuidv4(), todo, isCompleted: false}])
      
      setTodo("")
      saveToLS()
    
  }
  
  const handleChange = (e)=>{
   
    setTodo(e.target.value)
  }
  
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item =>{
      return item.id == id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  

  return (
    <>
      {/* <Navbar /> */}
      <div className="mx:3 md:container bg-blue-200 md:mx-auto my-10 rounded-xl p-5 min-h-[85vh] md:w-1/2">
      <h1 className='font-bold text-center text-3xl text-blue-950'>iTask</h1>
      <p className='text-center text-lg text-blue-950'>Manage your todos at one place</p>
      
        <div className="addTodo my-5 flex flex-col gap-4 ">
          <div className="flex ">
          <h2 className="text-xl font-bold mx-2 text-blue-950">Add a Todo</h2>
          <h6 className='py-0.5 text-blue-950'>(Minimum 3 chars)</h6>
          </div>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button  onClick={handleAdd} disabled={todo.length<3} className='bg-violet-800 hover:bg-violet-950 p-4 mx-auto disabled:bg-red-400 py-2 text-sm font-bold text-white rounded-full w-[80%]'>Save</button>

        </div>
        <input className = 'my-4' id = "show" onChange = {togglefinished} type="checkbox" checked={showfinished} /> 
        <label className = "mx-2" htmlFor="show">Show Finished</label>
        <hr />
        {/* <div className='bg-blue-950 w-10 mx-auto'></div> */}
        

        <h2 className='text-lg font-bold text-blue-950 my-3'>Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className='m-5'>NO TODOs TO DISPLAY!!! </div>}
          {todos.map(item=>{
            
            
            
            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-3/4 justify-between my-3">
            <div className='flex gap-5'>

            <input onChange={handleCheckbox} type="checkbox"  name={item.id} checked={item.isCompleted} />
            <div className= {item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e) => {handleEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 '><FaRegEdit/></button>
              <button onClick={(e) => {handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><RiDeleteBin2Fill/></button>
            </div>

          </div>
          })}
       
        </div>
        
        <button className ="bg-blue-800 w-28 h-8 text-white rounded-lg hover:font-bold hover:bg-blue-900 " onClick={() => saveToLS()}>Save last</button>
      </div>
      
    </>
  )
}

export default App
