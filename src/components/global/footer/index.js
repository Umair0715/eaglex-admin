import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div className='flex items-center justify-between sm:px-8 px-2 py-4 sm:text-sm text-xs text-grayText'>
            <div>
                copyright © 2022, GhairMulki
            </div>
            <div className='flex items-center gap-6'>
                <Link to='/profile'>
                    Profile
                </Link>
                <Link to='/'>
                    <div className="-translate-y-0.5">
                        <i className="uil uil-home text-xl "></i>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Footer