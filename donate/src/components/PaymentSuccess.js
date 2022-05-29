import React from "react";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'


const PaymentSuccess = ({ message, projectInfo, onContinueClick }) => {
    const { width, height } = useWindowSize()
    return <div class="flex flex-col w-full h-full items-center ">
        <Confetti width={width} height={height} />
        {projectInfo.imageURL != '' && <div className="w-full h-52"><img src={projectInfo.imageURL} className="h-full w-full object-cover" /></div>}
        <div className="w-full text-xl text-center mt-2 text-gray-800 font-bold">{projectInfo.title}</div>
        <div className="w-full text-xl text-center mt-8 text-gray-400">{message}</div>
        <div onClick={onContinueClick} className="w-24 p-2 text-center cursor-pointer bg-white shadow-md mt-6 rounded-sm text-gray-400 hover:text-gray-600">Continue</div>
    </div>
}

export default PaymentSuccess;