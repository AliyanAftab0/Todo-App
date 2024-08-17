import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from'react-icons/ai'; 
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState()

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
   setshowFinished(!showFinished) 
  }
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS()
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS()
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    console.log(e, e.target);
    let id = e.target.name
    console.log(`The id is ${id}`);
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    console.log(index);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="md:container mx-3 md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[90vh] md:min-h-[80vh] md:w-[35%] ">
      <h1 className='font-bold text-center text-3xl'>My-Task - Manage Your Todos At One Place</h1>
        <div className="addTodo flex flex-col  gap-3">
          <h1 className='text-2xl font-bold my-5'>Add a Todo</h1>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-8 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className=' bg-violet-800 hover:bg-violet-950 mx-2 p-4 py-2 rounded-md text-white disabled:bg-violet-700 text-sm font-bold'>Add</button>
          </div>
        </div>
        <input className='my-4' onChange={toggleFinished} id='show' type="checkbox" checked={showFinished} />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] my-2 mx-auto'></div>
        <h2 className='text-2xl font-bold my-5'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos To Display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) &&  <div key={item.id} className="todo flex my-3 justify-between">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 rounded-md text-white text-sm font-bold mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 rounded-md text-white text-sm font-bold mx-1'><AiFillDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
