
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Addnewarticle from './Components/Addnewarticle/Addnewarticle';
import Articles from './Components/Articles/Articles';
import Authorprofile from './Components/AuthorProfile/Authorprofile';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Readarticle from './Components/ReadArticle/Readarticle';
import Root_layout from './Components/RootLayout/Rootlayout';
import Signup from './Components/Signup/Signup';
function App() {
  
  let router = createBrowserRouter([{
    path:'',
    element: <Root_layout/>,
    children:[
      {
        path:'',
        element:<Home/>
      },
      {
        path:'/Home',
        element:<Home/>
      },
      {
        path: "/SignIn",
        element: <Login/>
      },
      {
        path:'/SignUp',
        element:<Signup/>
      },
      {
        path:'/Authorprofile',
        element:<Authorprofile/>,
        children:[
          {
              path:'Addnewarticle',
              element:<Addnewarticle/>
        },
        {
            path:'Articles',
            element:<Articles/>,
            
            
        },
        {
          path:'Articles/:articleid',
          element:<Readarticle/>
        }
        
        
        
      ]
      }
    ]

  }])
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
