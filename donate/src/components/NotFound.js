import React from "react";

const NotFound = () => {
    return <div className="flex flex-col w-full h-full items-center justify-center">
        <div className="animate-pulse w-14 h-14 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Close</title><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M368 368L144 144M368 144L144 368" /></svg>
        </div>
        <span className="animate-pulse w-full text-lg text-center mt-6 text-gray-400">It seems that donate is not needed here</span>
    </div>
}

export default NotFound;