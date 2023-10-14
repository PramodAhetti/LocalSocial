import React from 'react'
import { Outlet,Link} from 'react-router-dom'

export default function Nav() {
  return (

    <div className='NewPost'>

        <Link className='NewNear' to='/new'>New</Link>
        <Link className='NewNear'  to='/near'>Near</Link>

      <Outlet />
    </div>
  )
}
