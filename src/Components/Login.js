import { React, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import './Login.css'
const Login = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isLogedin, setIsLogedin] = useState(true)
  const [error, setError] = useState(null)

  const auth = getAuth()
  const handleSignin = (e) => {
    e.preventDefault();
    const ema = email
    const pass = password
    createUserWithEmailAndPassword(auth, ema, pass)
      .then(() => {
        setIsLogedin(true)
        setEmail('')
        setPassword('')
      })
      .catch(err => setError(err.message))
  }

  const handleLogin = (e) => {
    e.preventDefault();

    const ema = email
    const pass = password

    signInWithEmailAndPassword(auth, ema, pass)
      .then(() => {
        navigate('/list')
      })
      .catch(err => {
        setError(err.message)
        setEmail('')
        setPassword('')
      })
  }
  const handleClick = () => {
    setIsLogedin(true)
    setError(null)
  }
  const handleCreateClick = () => {
    setIsLogedin(false)
    setError(null)
  }
  onAuthStateChanged(auth, user => {
    console.log(user)
  })

  return (
    <div className='login'>
      {!isLogedin && <form className='sign_in' onSubmit={handleSignin}>
      <div className='input-container'>
          <label className='input-label' htmlFor='username'>Username</label>
          <input className="input-field" type='username' value={username} name='password' onChange={e => setUsername(e.target.value)} />
        </div>
        <div className='input-container'>
          <label className='input-label' htmlFor='email'>Email</label>
          <input className="input-field" type='email' value={email} name='email' onChange={e => setEmail(e.target.value)} />
        </div>
        <div className='input-container'>
          <label className='input-label' htmlFor='password'>Password</label>
          <input className="input-field" type='password' value={password} name='password' onChange={e => setPassword(e.target.value)} />
        </div>
        <button className='submit-button'>sign in</button>
        <p>Already have an account? <span onClick={handleClick}>click here</span></p>
        {error && <p style={{ color: 'red', fontSize: '20px' }}>{error}</p>}
      </form>}
      {isLogedin && <form onSubmit={handleLogin} className='log_in'>
        <div className='input-container'>
          <label className='input-label' htmlFor='email'>Email</label>
          <input className="input-field" type='email' value={email} name='email' onChange={e => setEmail(e.target.value)} />
        </div>
        <div className='input-container'>
          <label className='input-label' htmlFor='password'>Password</label>
          <input className="input-field" type='password' value={password} name='password' onChange={e => setPassword(e.target.value)} />
        </div>
        <button className='submit-button' onSubmit={() => handleLogin()}>Log in</button>
        <p>Don't have an account? <span onClick={handleCreateClick}>Create Now</span></p>
        {error && <p style={{ color: 'red', fontSize: '20px' }}>{error}</p>}
      </form>}
      

    </div>
  )

}

export default Login
