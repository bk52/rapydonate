import React from "react";


const Error = ({ title = 'Bad things happened.', description, onContinueClick }) => {
    return <div class="flex flex-col w-full h-full items-center justify-center">
        <div class="animate-pulse w-14 h-14 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Sad</title><circle cx="184" cy="232" r="24" fill="currentColor" /><path d="M256 288c45.42 0 83.62 29.53 95.71 69.83a8 8 0 01-7.87 10.17H168.15a8 8 0 01-7.82-10.17C172.32 317.53 210.53 288 256 288z" fill="currentColor" /><circle cx="328" cy="232" r="24" fill="currentColor" /><circle cx="256" cy="256" r="208" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" /></svg>
        </div>
        <span class="animate-pulse w-full text-lg text-center mt-6 text-gray-400">{title}</span>
        {description && <span class="w-full text-lg text-center mt-2 text-gray-400">{description}</span>}
        <div onClick={(e) => onContinueClick()} className="w-24 p-2 text-center cursor-pointer bg-white shadow-md rounded-sm mt-4 text-gray-400 hover:text-gray-600">Continue</div>
    </div>
}

export default Error;