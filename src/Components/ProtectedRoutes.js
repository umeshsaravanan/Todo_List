import React, {useEffect, useState} from 'react'
import { auth } from './FirebaseConfig'
import { Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import Home from '../Routes/Home';
const ProtectedRoutes = () => {

    const [isAuth, SetIsAuth] = useState(true)
    const a = auth
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(a, (user) => {
        if (user) {
          SetIsAuth(true)
        } else {
          SetIsAuth(false)
        }
      });
  
      return () => {
        unsubscribe();
      };
    }, [a]);

    return isAuth ? <Outlet /> : <Home />
}

export default ProtectedRoutes
