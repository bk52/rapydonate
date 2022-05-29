import React from "react";
import RapydonateLogo from '../assets/img/heartOn48.png'
import BKLogo from '../assets/img/BK.png'

const Footer = () => {
    return <div className='flex h-8 w-full items-center justify-between px-4 bg-white'>
        <div className='flex space-x-2 text-xs items-center'>
            <div>© 2022</div>
            <div className='font-medium'>Rapydonate</div>
            <img src={RapydonateLogo} className='h-6' />
            <div>All rights reserved.</div>
        </div>

        <div className='flex space-x-2 text-xs items-center'>
            <div>Created By</div>
            <a href='https://bk52.dev/' target='_blank' rel="noreferrer"><img src={BKLogo} className='h-6' /></a>
        </div>
    </div>
}

export default Footer;