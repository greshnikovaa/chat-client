import './App.css';
import ModulInput from './components/UI/ModulInput/ModulInput';
import React, {useState, useEffect} from 'react';
import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL



function App() {
  const [allert, setAllert] = useState(false)
  const [input, setInput] = useState('')
  const [name, setName] = useState('')
  const [chat, setChat] = useState([])
  const getChat = () =>{
    axios.get(API_URL+'api/chat/')
      .then(res=>{
        setChat(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
  }
  useEffect(()=>{
    const interval = setInterval(getChat, 1000)
    return ()=>{clearInterval(interval)} 
  }, [])

  const onSubmit = () =>{
    console.log(input)
    axios.post(API_URL+'api/chat/', {input, name})
    .then(res=>{
      setChat([...chat,res.data])
      setInput('')
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const keyDown = (e)=>{
    if(e.keyCode===13){
      onSubmit()
    }
  } 
  useEffect(()=>{
    document.addEventListener('keydown', keyDown)
    return ()=>{
      document.removeEventListener('keydown', keyDown)
    } 
  })

  

  return (
    <div className = "main">
      <div className="chat">
        <div className="list_mess">
          {chat.map((mess)=>
            mess.name===name
            ?<div key={mess._id} className='chat_mess right_mess'>
              <span>{mess.name}</span>
              <div className="item_mess my_mess">{mess.message}</div>
            </div>
            :<div key={mess._id} className='chat_mess left_mess'>
              <span>{mess.name}</span>
              <div className="item_mess your_mess">{mess.message}</div>
            </div>  
          )}
        </div>
        <div className="inputs">
          <input value={input} onChange={(e)=>{setInput(e.target.value)}} className="mess" placeholder="сообщение" />
          <button onClick={onSubmit} >отправить</button>
          <i onClick={()=>setAllert(true)} className="bi bi-gear-fill"></i>
          {allert && <ModulInput input={name} setInput={setName} setAllert={setAllert} />}
        </div>  
      </div>
    </div>
  );
}

export default App;
