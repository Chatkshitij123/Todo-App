import React, { useEffect, useState } from 'react'
import Header from './partials/Header.jsx';
import Todo from './partials/Todo.jsx';
import AddTodoModal from './partials/AddTodoModal.jsx';
import {getTodoListApi, getToken } from '../services/api.js';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
function Home() {
  const navigation=useNavigate();

  const[list,setList]= useState([]);
  const[refreshList,setRefreshList]= useState();
  useEffect(() => {
    if(!getToken()){
      navigation('/login');
    }
    fetchTodoList()
  } ,[refreshList])

  async function fetchTodoList(){
    const result=await getTodoListApi()
    console.log('todolist',result);
    if(result.status===200 && result.data.status===200){
      setList(result.data.data.todos.reverse());
    }
  }
  return (
    <div>
      <Header/>
      <ToastContainer/>
      <div className="container">
        <div className="row justify-content-md-center mt-4">
          {
            list.map((todo) => <Todo todo={todo} key={todo._id} />)
          }
          
        </div>
      </div>
      <div className="" style={{position: 'fixed', right:50, bottom:50,zIndex:1030 }}>
        <button type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        className="btn btn-outline-light">
            Add
        </button>
      </div>
    <AddTodoModal setRefreshList={setRefreshList}/>
    </div>
  )
}

export default Home;
