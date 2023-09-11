import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get("https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users")
      const data = response.data
      setUsers(data)
    }
    getUsers()
  }, [])

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get("https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/posts")
      const data = response.data
      setPosts(data)
    }
    getPosts()
  }, [])

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/posts">Posts</Link>
      </nav>
    </>
  )
}

export default App
