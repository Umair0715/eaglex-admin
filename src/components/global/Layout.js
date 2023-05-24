import React from 'react'
import Header from './header'

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className='sm:px-8 px-2 py-6 pb-10'>
                {children}
            </div>
        </div>
    )
}

export default Layout