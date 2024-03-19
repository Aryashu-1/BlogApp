import React, { useState } from 'react';
import { ArticleContext } from '../Context/ArticleContext';

function Articlestore({children}) {
    let [article,setArticle] = useState([])
  return (
    <ArticleContext.Provider value={[article,setArticle] }>
        {children}
        </ArticleContext.Provider >


  )
}

export default Articlestore