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
                path : '/verify-email/:token',
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
    }
]