import { React, useState, useEffect } from 'react'
import {auth} from './FirebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes , FaSignOutAlt} from 'react-icons/fa'
const Navbar = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [click, setClick] = useState(false)

  const a = auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(a, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [a]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('Signed out');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  const toogle = () => {
    setClick(!click)
  }

  return (
    <div className='navbar'>
        <div className='navbar_left'>
          <h1>Todo List</h1>
        </div>
        <div>
          <ul className={click ? "navbar_right active" : "navbar_right"}>
            <li>
              <Link to='/list'>Todo_List</Link>
            </li>
            <li>
              <Link to='/add'>Add</Link>
            </li>
            {
              isAuthenticated && <li>
                <Link to='/' onClick={handleLogout}>Logout  <FaSignOutAlt /></Link>
              </li>
            }
          </ul>
          <div className='menu'>
            {!click ? <FaBars onClick={toogle} size={25} color='white' /> : <FaTimes onClick={toogle} size={25} color='white'/>}
          </div>
        </div>
    </div>
  )
}

export default Navbar
