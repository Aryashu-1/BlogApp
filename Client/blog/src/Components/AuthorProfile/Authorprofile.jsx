import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Authorprofile() {
  return (
    <div className='m-auto w-full h-screen p-10 bg-sky-400 text-center'>
        <NavLink to={'/Authorprofile/Addnewarticle'}><button  className='bg-gray-600 mx-8 text-lg rounded-xl p-3 text-white hover:bg-sky-600 ' >Add New Article</button></NavLink>
       <NavLink to={'/Authorprofile/Articles'}><button  className='bg-gray-600 mx-8  text-lg rounded-xl p-3 text-white hover:bg-sky-600 ' >Articles</button></NavLink> 
       <Outlet/>
    </div>
  )
}

export default Authorprofile