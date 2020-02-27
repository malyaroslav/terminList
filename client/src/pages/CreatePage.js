import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const CreatePage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [link, setLink] = useState('')
  const [time, setTime] = useState('')
  const [place, setPlace] = useState('')

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link, to: time, place: place}, {
          Authorization: `Bearer ${auth.token}`
        })
        history.push(`/detail/${data.link._id}`)
      } catch (e) {}
    }
  }

  return (
      <div className="row">
        <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
          <div className="input-field">
            <input
                placeholder="Mit wem"
                id="link"
                type="text"
                value={link}
                onChange={e => setLink(e.target.value)}
                onKeyPress={pressHandler}
            />
            <label htmlFor="link">Mit wem</label>
          </div>
          <div className="input-field">
          <input
              placeholder="Zeit"
              id="to"
              type="text"
              value={time}
              onChange={e => setTime(e.target.value)}
              onKeyPress={pressHandler}
          />
          <label htmlFor="to">Geben Sie die Zeit ein</label>
          </div>
          <div className="input-field">
            <input
                placeholder="Ort"
                id="to"
                type="text"
                value={place}
                onChange={e => setPlace(e.target.value)}
                onKeyPress={pressHandler}
            />
            <label htmlFor="to">Ort</label>
          </div>
        </div>
      </div>
  )
}
