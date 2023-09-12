import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useLocation, Routes, Route, useParams } from 'react-router-dom'

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
              <li key={user.id}>
                <Link to={`/users/${user.id}`}>
                {user.name}
                </Link>
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

const User = ({ users }) => {
  const params = useParams()
  const id = params.id*1

  const user = users.find(user => user.id === id)

  if(!user){
    return null;
  }

  return (
    <div>
      <h1>User Details for { user.name }</h1>
      <div>
        <h3>Username: {user.username}</h3>
        <h3>Email: {user.email}</h3>
        <h3>Phone Number: {user.phone}</h3>
        <Link to="/users">Back to User List</Link>
      </div>
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
        <Route path="/users/:id" element={ <User users={ users }/> } />
        <Route path="/posts" element={ <Posts posts={ posts }/> } />
      </Routes>
    </>
  )
}

export default App
