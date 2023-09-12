import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useLocation, Routes, Route } from 'react-router-dom'

const Home = () => {
  return (
    <h1>Home</h1>
  )
}

const Users = ({ users }) => {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {
          users.map( user => {
            return (
              <li>
                {user.name}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

const Posts = ({ posts }) => {
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {
          posts.map( post => {
            return (
              <li>
                {post.title}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

function App() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const location = useLocation()
  const {pathname} = location

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
        <Link to="/" className={ pathname === "/" ? "selected": ""}>Home</Link>
        <Link to="/users" className={ pathname === "/users" ? "selected": ""}>Users ({users.length})</Link>
        <Link to="/posts" className={ pathname === "/posts" ? "selected": ""}>Posts ({posts.length})</Link>
      </nav>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/users" element={ <Users users={ users }/> } />
        <Route path="/posts" element={ <Posts posts={ posts }/> } />
      </Routes>
    </>
  )
}

export default App
