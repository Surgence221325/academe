import './App.css'
import {
  auth,
  fireBaseConfig,
  provider,
  fbStore,
} from '../firebase/firebase-config.js'
import {
  collection,
  getDocs,
  query,
  doc,
  setDoc,
  limit,
} from 'firebase/firestore/lite'
import { signInWithPopup } from 'firebase/auth'

import Cookies from 'universal-cookie'
const cookies = new Cookies()

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { onSnapshot, orderBy } from 'firebase/firestore'
import { useState, useEffect } from 'react'

const Hello = () => {
  return <h1>Hello World</h1>
}

// const Goodbye = () => {
//   return <h2>Goodbye World</h2>
// }

const SignIn = () => {
  const signInWithGoogle = async () => {
    console.log(auth)
    console.log(provider)
    try {
      const res = await signInWithPopup(auth, provider)
      const user = res.user
      cookies.set('authToken', user.getIdToken())
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

const ChatMessage = ({ message }) => {
  return (
    <div>
      <p>{message.message}</p>
    </div>
  )
}

const ChatRoom = () => {
  // console.log(fbStore)
  const messagesRef = collection(fbStore, 'messages')
  const [messages, setMessages] = useState([])
  const querySnap = query(messagesRef, orderBy('date-sent'))
  // console.log(querySnap)
  useEffect(() => {
    const allDocs = getDocs(querySnap).then((res) => {
      // setMessages(res.docs)
      let newMessages = []
      res.forEach((doc) => {
        newMessages.push({ ...doc.data(), id: doc.id })
      })
      console.log(newMessages)
      setMessages(newMessages)
    })
    // // onSnapshot(querySnap, (snapshot) => {
    // //   console.log('NEW MESSAGE')
    //   // let newMessages = []
    //   // snapshot.forEach((doc) => {
    //   //   newMessages.push({
    //   //     ...doc.data(),
    //   //     id: doc.id,
    //   //   })
    //   // })
    //   setMessages(newMessages)
    // // })
  }, [])
  // const [messages, loadingMessages, error] = useCollectionData(querySnap, { idField: 'id' })
  return (
    <div>
      {messages.map((message) => {
        return <ChatMessage key={message.id} message={message} />
      })}
    </div>
  )
}

const App = () => {
  const authRes = useAuthState(auth)
  // console.log(fireBaseConfig)
  const [user, isLoading, error] = authRes
  // return <SignIn />
  return (
    <div>
      <h1>Hello</h1>
      {user ? <ChatRoom /> : <SignIn />}
      <SignOut />
    </div>
  )
}

export default App
