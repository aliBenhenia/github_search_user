import React from 'react'
import { useState, useEffect } from 'react'
import { Skeleton } from 'antd';

export default function User() {
  const [theme, setTheme] = useState('light')
  const [user, setTUser] = useState({})
  const [val, setVal] = useState('')
  
  // for first render
  useEffect(()=>{
      if (user)
      {
        fetch(`https://api.github.com/users/aliBenhenia`)
        .then((res) => res.json())
        .then((req)=>{
          setTUser(req)
        })
      }
  },[])
  const handleTheme = ()=>{
    if (theme === "light")
    {
      setTheme("dark")
    }
    else
    setTheme("light")
  }
  const getUser = ()=>{
    fetch(`https://api.github.com/users/${val}`)
    .then((res) => res.json())
    .then((req)=>{
      setTUser(req)
    })
    console.log(user)
  }
  const hnadleValue = (event)=>
  {
    setVal(event.target.value)
  }

  return (
    <div className = {theme === "light" ? "whito" : "dark"}>
          <div className='user container'>
            <div className='head'>
                <div className='devinder'>
                    <h5>devfinder</h5>
                </div>
                <div className='mode'>
                    <h5 onClick={handleTheme}>
                      {theme}
                    </h5>
                   {
                        theme === "light" ?
                        <span className="material-symbols-outlined">
                               backlight_high
                        </span>
                        :
                        <span className="material-symbols-outlined">
                                sleep
                        </span>
                   }
                </div>
            </div>
              <div className='search_user shadow-lg'>
              <span className="material-symbols-outlined " id='srch_icon'>
                  person_search
                  </span>
                  <input
                  value={val} onChange={hnadleValue} type='text' placeholder='Search github Username...'
                  />
                 <button
                 onClick={getUser}
                 className='btn btn-primary'>Serach</button>
              </div>
              <div className='shadow-lg mt-3 profile p-4 rounded'>
              
                {
                  user.login ?  <div className='container'>
                  <div className=''>
                      <img id='avt' src = {user.avatar_url}/>
                  </div>
                  <div className='mt-4'>
                      <h5>
                        {user.name}
                      </h5>
                    <a className='link-info' href = {user.html_url}>
                        @{user.login}
                    </a>
                    <p id='bio'>{user.bio}</p>
                    <div className='p-3 shadow-lg row text-center data'>
                          <div className='col-4'>
                                <p className='info'>Repos</p>
                                <h5 className='h3 info2'>{user.public_repos}</h5>
                          </div>
                          <div className='col-4'>
                                <p className='info'>Followers</p>
                                <h5 className='h3 info2'>{user.followers}</h5>
                          </div>
                          <div className='col-4'>
                                <p className='info'>Following</p>
                                <h5 className='h3 info2'>{user.following }</h5>
                          </div>
                    </div>
                    <div className='mt-5 data row'>
                      <div className='col-4'>
                          <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/marker.png" alt="marker"/>
                          <h5 className='h3 h6 mt-3 '>{user.location ? user.location : "not availbe"}</h5>
                      </div>
                      <div className='col-4'>
                      <img width="30" height="30" src="https://img.icons8.com/material-rounded/24/twitter.png" alt="twitter"/>
                          <h5 className='h3 h6 mt-3 '>{user.twitter_username ? user.twitter_username : "not availbe"}</h5>
                      </div>
                      <div className='col-4'>
                      <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/client-company.png" alt="client-company"/>
                          <h5 className='h3 h6 mt-3 '>{user.company ? user.company : "not availbe"}</h5>
                      </div>
                    </div>
                  </div>
           </div>
           : 
              <Skeleton
                    avatar
                    paragraph={{
                      rows: 4,
                    }}
                />
                }
              </div>
          </div>
    </div>
  )
}
