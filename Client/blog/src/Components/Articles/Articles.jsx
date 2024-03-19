import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ArticleContext } from '../Context/ArticleContext';
function Articles() {
    let  [article, setArticle] = useContext(ArticleContext);
  return (
    <div id='card' className='flex items-center m-16 p-10'>
        {article.map((book,index)=>(
            <div className=' bg-gray-600 w-fit m-4 p-10' key={index} >
                <h2 key={index} className=' text-white my-6'>{book.Title}</h2>
                <NavLink state={ { state : index}} to={`/Authorprofile/Articles/article-${index}`}><button  className=" bg-sky-600 text-lg rounded-xl p-3 text-white hover:bg-sky-600" >Read</button></NavLink>

            </div>

        ))}
       
       
    </div>
  )
}

export default Articles