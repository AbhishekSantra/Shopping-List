import React,{useState} from 'react'
import './App.css'
const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId]=useState(0);
  const handlesubmit=(e)=>{
    e.preventDefault();
    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }
    if (todo !==''){
      setTodos([{id:`${todo}-${Date.now()}`,todo}, ...todos]);
      setTodo("");
    }

  };
  const handleDelete=(id)=>{
    const delTodo=todos.filter((to)=>to.id!==id);
    setTodos([...delTodo]);

  }
  const handleCheck = event=> {
    event.currentTarget.style.color = 'green';
    
  };
  const handleEdit=(id)=>{
    const editTodo=todos.find((i)=>i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  }
  return (
    <div className='app'>
      <div className='container'>
         <h1>Shopping Master</h1>
         <hr/>
         <form className='inputBox' onSubmit={handlesubmit}>
            <input type="text" value={todo} placeholder='Add Items...'onChange={(e)=>setTodo(e.target.value)}/>
            <button type='submit'>{editId?"Edit":"Add"}</button>
         </form>
         <ul className='alltools'>
          {
            todos.map((t)=>(              
          <li className='singletool'key={t.id}>
            <span className='text'key={t.id}>{t.todo}</span>
            <i className='fas fa-check-square' onClick={handleCheck}></i>
            <i className='fas fa-trash'onClick={()=>handleDelete(t.id)}></i>
            <i className='fas fa-edit'onClick={()=>handleEdit(t.id)}></i>
          </li>
            ))
          }
          
         </ul>
      </div>
    </div>
  )
}

export default App