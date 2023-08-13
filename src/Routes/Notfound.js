import React from 'react'
import { Link } from 'react-router-dom'
const Notfound = () => {
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '10px', 
            textAlign: 'center', 
            justifyContent: 'center',
            marginTop : '30vh'
            }}>
            <span style={{ color: 'yellow', fontSize: '50px' }}>404</span>
            <h1 style={{ color: 'red' }}>SORRY</h1>
            <h3>Page Not Found</h3>
            <p>You are requesting for a page which does not exist</p>
            <Link to='/'> Click here to go Home</Link>
        </div>
    )
}

export default Notfound
