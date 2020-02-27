import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
      <nav>
        <div className="nav-wrapper green darken-3" style={{ padding: '0 25rem' }}>
          <span className="brand-logo">Termin-list</span>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to="/create">Schaffen</NavLink></li>
            <li><NavLink to="/links">Terminen</NavLink></li>
            <li><a href="/" onClick={logoutHandler}>Austieg</a></li>
          </ul>
        </div>
      </nav>
  )
}
