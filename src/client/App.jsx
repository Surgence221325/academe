import Scheduler from './apps/Scheduler'
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

  const padding = {
    paddingRight: 5,
  }

  return (
    <div>
      <Link style={padding} to="/">
        Home
      </Link>
      <Link style={padding} to="/login">
        Sign In
      </Link>
      <Link style={padding} to="/calendar">
        Calendar
      </Link>
      <Link style={padding} to="/forum">
        Class Forum
      </Link>
      <Link style={padding} to="/profile">
        My Profile
      </Link>
      <Link style={padding} to="/video">
        Study Hall
      </Link>
    </div>
  )
}

const RouterRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Hello />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/calendar" element={<Scheduler />} />
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
      cookies.set('authToken', user.getIdToken())
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
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
