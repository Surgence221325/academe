import React from 'react';
import './components/css/Main.css'
// import logo from './logo.svg';
// import './App.css';
import Scheduler from './apps/Scheduler'
import Profile from './apps/Profile'
import VideoMain from './Video-Chat-Files/VideoMain'
import Home from "./forum-components/Home";
import Replies from "./forum-components/Replies"
import { auth, provider } from '../firebase/firebase-config.js'
import { signInWithPopup } from 'firebase/auth'

import Cookies from 'universal-cookie'
const cookies = new Cookies()

import { useAuthState } from 'react-firebase-hooks/auth'
import { useState, useEffect } from 'react'
import { useMatch, useNavigate, Routes, Route, Link } from 'react-router-dom'

function ConditionalLink({ children, condition, ...props }) {
  return !!condition && props.to ? (
    <Link {...props}>{children}</Link>
  ) : (
    <div></div>
  )
}

const LogInAndOutLink = (isLoggedIn) => {

}

const RouterMenu = ({ user }) => {
  const isLoggedIn = (user)

  console.log(isLoggedIn)

  const navEleStyle = {
    paddingRight: 5,

  }

  return (
    <div className='navbar'>
      <Link style={navEleStyle} to="/">
        Home / Sign In
      </Link>
      <Link style={navEleStyle} to="/calendar">
        Calendar
      </Link>
      <Link style={navEleStyle} to="/forum">
        Class Forum
      </Link>
      <Link style={navEleStyle} to="/profile">
        My Profile
      </Link>
      <Link style={navEleStyle} to="/video">
        Study Hall
      </Link>
    </div>
  )
}

const RouterRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/calendar" element={<Scheduler />} />
      <Route path="/profile" element={<Profile />} />
      <Route path='/forum' element={<Home />} />
      <Route exact path='/:id/replies' element={<Replies />} />
      <Route path='/video' element={<VideoMain />} />
    </Routes>
  )
}

const Hello = () => {
  return <h1>Hello World</h1>
}

// const Goodbye = () => {
//   return <h2>Goodbye World</h2>
// }

const SignIn = () => {
  const navigate = useNavigate()
  const signInWithGoogle = async () => {
    console.log(auth)
    console.log(provider)
    try {
      const res = await signInWithPopup(auth, provider)
      const user = res.user
      cookies.set('_id', user.getIdToken())
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div>
      <button className='googleButton' onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  )
}

const SignOut = () => {
  const signOut = async () => {
    await auth.signOut()
  }
  return (
    auth.currentUser && (
      <div>
        <button onClick={signOut}>Sign out</button>
      </div>
    )
  )
}

const App = () => {
  const authRes = useAuthState(auth)
  // console.log(fireBaseConfig)
  const [user, isLoading, error] = authRes
  // return <SignIn />
  return (
    <div>
      <RouterMenu isLoggedIn={user} />
      <RouterRoutes />
    </div>
  )
  // return (
  //   <div>
  //     <h1>welcome to academe</h1>
  //     {user ? <RouterMenu /> : <SignIn />}
  //     <SignOut />
  //   </div>
  // )
}

export default App
