import HomeLayout from '../layouts/HomeLayout';
import HomePage from '../pages/common/HomePage';
import SignUpPage from '../pages/common/SignUpPage';
import TermsAndConditions from '../components/common/info-pages/TermsAndConditions';
import PrivacyPolicy from '../components/common/info-pages/PrivacyPolicy';
import ShippingAndReturn from '../components/common/info-pages/ShippingAndReturn';
import CustomerSupport from '../components/common/info-pages/CustomerSupport';
import Faq from '../components/common/info-pages/Faq';
import EmailSentpage from '../pages/common/EmailSentpage';
import EmailVerification from '../components/common/auth/EmailVerification';
import SignInPage from '../pages/common/SignInPage';
import AdminLayout from '../layouts/AdminLayout';
import UserLayout from '../layouts/UserLayout';
import ProtectedRoute from '../protected-route/ProtectRoute';
import Unauthorized from '../protected-route/Unauthorized';
import AuthChecker from '../protected-route/AuthChecker';
import UserDashboardPage from '../pages/user/UserDashboardPage';



export const routes = [
    {
        path: '/',
        element: <AuthChecker><HomeLayout /></AuthChecker>,
        // element:<HomeLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '/products',
                element: <h1>Products</h1>
            },
            {
                path: '/login',
                element: <SignInPage />
            },
            {
                path: '/signup',
                element: <SignUpPage />
            },
            {
                path: '/email-sent',
                element: <EmailSentpage />
            },
            {
                path: '/verify-email/:token',
                element: <EmailVerification />

            },
            {
                path: '/terms-and-conditions',
                element: <TermsAndConditions />
            },
            {
                path: '/privacy-policy',
                element: <PrivacyPolicy />
            },
            {
                path: '/customer-support',
                element: <CustomerSupport />
            },
            {
                path: '/shipping-returns',
                element: <ShippingAndReturn />
            },
            {
                path: '/faq',
                element: <Faq />
            }
        ]
    },


    //admin routes
    {
        element: <ProtectedRoute requiredRole="admin"><AdminLayout /> </ProtectedRoute>,
        children: [
            {
                path: '/admin-dashboard',
                element: <h1> admin Dashboard</h1>
            }
        ]
    },

    //user routes
    {
        element: <ProtectedRoute requiredRole="user"><UserLayout /> </ProtectedRoute>,
        children: [
            {
                path: '/user-dashboard',
                element: <UserDashboardPage />
            }
        ]
    },



    // Unauthorized route
    {
        path: '/unauthorized',
        element: <Unauthorized />
    }

]