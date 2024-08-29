import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/common/HomePage";



export const routes = [
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '/products',
                element: <h1>Products</h1>
            },
            // {
            //     path: '/login',
            //     element: <LoginPage />
            // },
            // {
            //     path: '/signup',
            //     element: <SignupPage />
            // },
        ]
    }
]