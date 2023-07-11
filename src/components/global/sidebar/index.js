 import './styles.css';
import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDrawerContext } from 'context/DrawerContext';
import useClickOutside from 'utils/clickOutside';
import Logo from 'assets/svgs/Logo.svg';

const Sidebar = () => {
    const sidebarRef = useRef();
    const location = useLocation();
    const { showDrawer , setShowDrawer } = useDrawerContext();
    const [showAccMenu , setShowAccMenu] = useState(false)
    const [showSettingsDropMenu , setShowSettingsMenu] = useState(false);

    useClickOutside(sidebarRef , () => setShowDrawer(false))

    const isActive = (path , home) => {
        if (home) return location.pathname === '/' ;
        return location.pathname.split('/').includes(path);
    }

   

    return (
        <div className=''>
            {
                showDrawer && 
                <div className='fixed top-0 left-0 bg-gray-900 w-full h-screen bg-opacity-30 opacity-1 duration-300 z-10'>
                </div>
            }
            <div 
            className={`sidebar ${showDrawer ? 'show' : '' } fixed top-0 md:left-0 -left-[200%] w-[270px]  overflow-auto pb-4 h-full z-50 border-r bg-pure`} 
            ref={sidebarRef}
            >
                <div className='overflow-auto'>
                    <div className='flex h-[90px] pt-4 items-center justify-center border-b pb-4 '>
                        <Link to='/' className='text-2xl font-semibold'>
                            <img src={Logo} alt='Logo' className='w-[220px]' />                        
                        </Link>
                    </div>
                    <ul className='sideMenu-list mt-6 text-dark h-full'>
                        <li 
                        className={`${isActive('' , true) ? 'active' : ''} sideMenu-item`}
                        >
                            <Link to='/'>   
                                <i className="uil uil-apps"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('user-management') ? 'active' : ''} sideMenu-item`}
                        >
                            <Link to='/user-management/users'>   
                                <i className="uil uil-accessible-icon-alt"></i>
                                <span>User Management</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('investments') ? 'active' : ''} sideMenu-item`}
                        >
                            <Link to='/investments'>   
                                <i className="uil uil-usd-circle"></i>
                                <span>Investments</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('offers-management') ? 'active' : ''} sideMenu-item`}
                        >
                            <Link to='/offers-management/offers'>   
                                <i className="uil uil-sitemap"></i>
                                <span>Offers Management</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('companies') ? 'active' : ''} sideMenu-item`}
                        >
                            <Link to='/companies'>   
                                <i className="uil uil-building"></i>
                                <span>All Companies</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('deposits') ? 'active' : ''} sideMenu-item`}
                        >
                            <Link to='/deposits'>   
                                <i className="uil uil-usd-circle"></i>
                                <span>Deposits</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('deposit-requests') ? 'active' : ''} sideMenu-item`}
                        >
                            <Link to='/deposit-requests'>   
                                <i className="uil uil-bill"></i>
                                <span>Deposit Requests</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('withdraw-requests') ? 'active' : ''} sideMenu-item`}
                        >
                            <Link to='/withdraw-requests'>   
                                <i className="uil uil-analytics"></i>
                                <span>Withdraw Requests</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('settings') ? 'active' : ''} sideMenu-item`}
                        >
                            <div onClick={() => setShowSettingsMenu(prev => !prev)}>   
                                <i className="uil uil-setting"></i>
                                <span>Settings</span>
                            </div>
                        </li>
                         {/* DROP MENU */}
                         {
                            showSettingsDropMenu && 
                            <ul className='dropMenu'>
                                <li className={`${isActive('website-setup') ? 'drop-active' : ''}
                                dropMenu-item
                                `}>
                                    <Link to='/settings/website-setup'>
                                        <div className='dot'></div>
                                        <span>Website Setup</span>
                                    </Link>
                                </li>
                                {/* <li className={`${isActive('privacy-policy') ? 'drop-active' : ''}
                                dropMenu-item
                                `}>
                                    <Link to='/settings/privacy-policy'>
                                        <div className='dot'></div>
                                        <span>Privacy Policy</span>
                                    </Link>
                                </li>
                                <li className={`${isActive('terms-of-use') ? 'drop-active' : ''}
                                dropMenu-item
                                `}>
                                    <Link to='/settings/terms-of-use'>
                                        <div className='dot'></div>
                                        <span>Terms & Conditions</span>
                                    </Link>
                                </li> */}
                            </ul>
                        }
                        
                        <li 
                        className={`${isActive('notifications') ? 'active' : ''} sideMenu-item`}
                        >
                            <Link to='/notifications'>   
                                <i className="uil uil-pricetag-alt"></i>
                                <span>Notifications</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('accounts') ? 'active' : ''} sideMenu-item`}
                        >
                            <div className='relative' onClick={() => setShowAccMenu(prev => !prev)}>   
                                <i className="uil uil-chart-pie-alt"></i>
                                <span>Accounts</span>
                            </div>
                        </li>
                          {/* DROP MENU */}
                          {
                            showAccMenu && 
                            <ul className='dropMenu'>
                                <li className={`${isActive('binded-accounts') ? 'drop-active' : ''}
                                dropMenu-item
                                `}>
                                    <Link to='/accounts/binded-accounts'>
                                        <div className='dot'></div>
                                        <span>Binded Accounts</span>
                                    </Link>
                                </li>
                                <li className={`${isActive('bank-change-requests') ? 'drop-active' : ''}
                                dropMenu-item
                                `}>
                                    <Link to='/accounts/bank-change-requests'>
                                        <div className='dot'></div>
                                        <span>Change Requests</span>
                                    </Link>
                                </li>
                            </ul>
                        }
                        {/* <li 
                        className={`${isActive('support-chat') ? 'active' : ''} sideMenu-item`}
                        >
                            <Link to='/support-chat'>   
                                <i className="uil uil-envelope"></i>
                                <span>Support Chat</span>
                            </Link>
                        </li> */}
                       
                        <Link to='/login' 
                        className={`sideMenu-item signout`}
                        >
                            
                            <i className="uil uil-signout"></i>
                            <span>Sign Out</span>
                        </Link>
                    </ul>
                </div>
                
            </div>
        </div>
    )
}

export default Sidebar