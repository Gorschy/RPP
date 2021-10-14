import Register from '../pages/register';
import ConfirmSignUp from '../pages/confirmSignUp';
import Login from '../pages/login';
import ContactUs from '../pages/contactUs';
import Dashboard from '../pages/dashboard';
import Projects from '../pages/projects/projects';
import Account from '../pages/account';
import Calculator from '../pages/calculator';
import Solutions from '../pages/solutions';
import ForgotPassword from '../pages/forgotPassword';
import ForgotPasswordAuth from '../pages/forgotPasswordAuth';
import admin from '../pages/admin';
import details from '../pages/details';
import Profile from '../pages/profile';

const path = {
    register: Register,
    confirmSignUp: ConfirmSignUp,
    login: Login,
    forgotPassword: ForgotPassword,
    forgotPasswordAuth: ForgotPasswordAuth,
    contactUs: ContactUs,
    dashboard: Dashboard,
    projects: Projects,
    account: Account,
    calculator: Calculator,
    solutions: Solutions,
    admin:admin,
    details: details,
    profile: Profile
}

export default path;