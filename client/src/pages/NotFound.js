import React from "react";
import ImgNotFound from '../assets/img/Error_404_PNG.png'

const NotFound = () => {
    return <div>
        <img src={ImgNotFound} className='notFound' />
    </div>
}

export default NotFound;