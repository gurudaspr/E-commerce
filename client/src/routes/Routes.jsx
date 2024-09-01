import HomeLayout from '../layouts/HomeLayout';
import HomePage from '../pages/common/HomePage';
import SignUpPage from '../pages/common/SignUpPage';
import TermsAndConditions from '../components/common/info-pages/TermsAndConditions';
import PrivacyPolicy from '../components/common/info-pages/PrivacyPolicy';
import ShippingAndReturn from '../components/common/info-pages/ShippingAndReturn';
import CustomerSupport from '../components/common/info-pages/CustomerSupport';
import Faq from '../components/common/info-pages/Faq';

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
            {
                path: '/signup',
                element: <SignUpPage />
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
    }
]