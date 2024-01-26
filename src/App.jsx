import './App.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authservice from './appwrite/auth.js'
import {Header,Footer} from './Component/index'
import {login,logout} from './store/authSlice'

function App() {

  const [loader, setLoder]=useState(true)
  const Dispatch= useDispatch()


  useEffect (()=>{
    authservice.getCurrentUser().then((userData)=>{
       if(userData){
        Dispatch(login({userData}))
       }
       else{
        logout()
       }
    })
    .finally(()=>{
       setLoder(false)
    })
  },[])

  return !loader ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  
        </main>
        <Footer />
      </div>
    </div>
  ) : <div>not loading</div>
}

export default App
