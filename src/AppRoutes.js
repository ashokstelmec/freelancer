import { createBrowserRouter, RouterProvider } from "react-router-dom";

const AppRoutes = () => {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <SignUp />,
        },
        {
          path: "/signin",
          element: <SignIn />,
        },
    ]);


  return (
    <div>
        
       <RouterProvider router={router} />
       
    </div>
  )
}

export default AppRoutes
