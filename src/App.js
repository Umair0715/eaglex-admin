import Sidebar from "components/global/sidebar";
import BankChangeRequests from "pages/accounts/BankChangeRequests";
import BindedAccounts from "pages/accounts/BindedAccounts";
import EditBindedAccount from "pages/accounts/EditBindedAccount";
import Login from "pages/auth/Login";
import Companies from "pages/companies";
import AddCompany from "pages/companies/AddCompany";
import EditCompany from "pages/companies/EditCompany";
import Dashboard from "pages/dashboard";
import DepositRequests from "pages/depositRequests";
import DepositRequestDetails from "pages/depositRequests/DepositRequestDetails";
import Deposits from "pages/deposits";
import Investments from "pages/investments";
import InvestDetails from "pages/investments/InvestDetails";
import Notifications from "pages/notifications";
import EditNotification from "pages/notifications/EditNotification";
import SendNotification from "pages/notifications/SendNotification";
import Offers from "pages/offers";
import AddNewOffer from "pages/offers/AddNewOffer";
import EditOffer from "pages/offers/EditOffer";
import Profile from "pages/profile";
import PrivacyPolicy from "pages/settings/PrivacyPolicy";
import TermsOfUse from "pages/settings/TermsOfUse";
import WebsiteSetup from "pages/settings/WebsiteSetup";
import SupportChat from "pages/supportChat";

import Users from "pages/user";
import EditUser from "pages/user/EditUser";
import UserDetails from "pages/user/UserDetails";
import WithdrawRequests from "pages/withdrawRequests";
import WithdrawDetails from "pages/withdrawRequests/WithdrawDetails";
import { useState } from "react";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";



function App() {
    const [isLoginPage , setIsLoginPage] = useState(false);

    return (
        <div className="space">
            <ToastContainer 
                style={{fontSize: 15}}
                position="top-center"
                autoClose={3000}
                closeOnClick
                pauseOnHover
            />
            <Router>
            {!isLoginPage && <Sidebar />}
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/user-management/users' element={<Users />} />
                    <Route path='/user-management/edit-user/:id' element={<EditUser />} />
                    <Route 
                    path='/offers-management/offers' 
                    element={<Offers />} 
                    />
                    <Route 
                    path='/offers-management/add-new' 
                    element={<AddNewOffer />} 
                    />
                    <Route 
                    path='/offers-management/edit-offer/:id' 
                    element={<EditOffer />} 
                    />
                    <Route 
                    path='/companies' 
                    element={<Companies />} 
                    />
                    <Route 
                    path='/companies/add-new' 
                    element={<AddCompany />} 
                    />
                    <Route 
                    path='/companies/edit/:id' 
                    element={<EditCompany />} 
                    />
                    <Route 
                    path='/withdraw-requests' 
                    element={<WithdrawRequests />} 
                    />
                    <Route 
                    path='/withdraw-requests/update/:id' 
                    element={<WithdrawDetails />} 
                    />
                    <Route 
                    path='/settings/website-setup' 
                    element={<WebsiteSetup/>} 
                    />
                    <Route 
                    path='/settings/privacy-policy' 
                    element={<PrivacyPolicy/>} 
                    />
                    <Route 
                    path='/settings/terms-of-use' 
                    element={<TermsOfUse/>} 
                    />
                    <Route 
                    path='/notifications' 
                    element={<Notifications/>} 
                    />
                    <Route 
                    path='/notifications/send-notification' 
                    element={<SendNotification/>} 
                    />
                    <Route 
                    path='/notifications/edit-notification' 
                    element={<EditNotification/>} 
                    />
                    <Route 
                    path='/accounts/binded-accounts' 
                    element={<BindedAccounts/>} 
                    />
                    <Route 
                    path='/accounts/binded-accounts/edit/:id' 
                    element={<EditBindedAccount/>} 
                    />
                    <Route 
                    path='/support-chat'
                    element={<SupportChat />}
                    />
                    <Route 
                    path='/profile'
                    element={<Profile />}
                    />
                    <Route 
                    path='/login'
                    element={<Login setIsLoginPage={setIsLoginPage}/>}
                    />
                    <Route 
                    path='/accounts/bank-change-requests' 
                    element={<BankChangeRequests />}
                    />
                    <Route 
                    path='/user-management/users/:id' 
                    element={<UserDetails />}
                    />
                    <Route 
                    path='/deposits' 
                    element={<Deposits />}
                    />
                    <Route 
                    path='/deposit-requests' 
                    element={<DepositRequests />}
                    />
                    <Route 
                    path='/deposit-requests/details/:id' 
                    element={<DepositRequestDetails />}
                    />
                    <Route 
                    path='/investments'
                    element={<Investments />}
                    />
                    <Route 
                    path='/investments/details/:id'
                    element={<InvestDetails />}
                    />
                    
                </Routes>
            </Router>
        </div> 
    );
}

export default App;
