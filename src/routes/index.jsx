import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./../provider/authProvider";
import { ProtectedRoute } from "./../utils/ProtectedRoute";
import Login from "./../pages/auth/Login";
import NotFound from "./../pages/notfound/NotFound";
import Home from "./../pages/common/Home";
import Register from "./../pages/auth/Register";
import Consumer from "../scenes/Consumer";
import {
    Dashboard,
    Outlets,
    Team,
    Tokens,
    Invoices,
    Contacts,
    Form,
    FAQ,
} from "./../scenes";

const Routes = () => {
    const { token } = useAuth();

    const routesForPublic = [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "*",
            element: <NotFound/>,
        }
    ];

    const routesForAuthenticatedOnly = [
        {
            path: "/consumer",
            element: <Consumer />,
            children: [
                {
                    path: "/consumer/",
                    element: <Dashboard />,
                },
                {
                    path: "/consumer/mytoken",
                    element: <Tokens/>,
                },
                {
                    path: "/consumer/outlets",
                    element: <Outlets/>,
                },
                {
                    path: "/consumer/team",
                    element: <Team />,
                }
            ],
        },
    ];

    const routesForNotAuthenticatedOnly = [
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
    ];

    const notfound =  [
        {
            path: "*",
            element: <NotFound/>,
        }
    ];

    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...(token ? routesForAuthenticatedOnly : []),
    ]);

    return <RouterProvider router={router} />;
};

export default Routes;