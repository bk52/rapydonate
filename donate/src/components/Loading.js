import React from "react";

const LoadingPage = () => {
    return <div className="flex flex-col w-full h-full items-center justify-center">
        <div className="animate-spin w-14 h-14 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Aperture</title><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" /><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M360 94.59V296M443.13 212.87L296 360M417.41 360H216M299.13 443.13l-144-144M152 416V216M68.87 299.13l144-144M94.59 152H288M212.87 68.87L360 216" /></svg>
        </div>
        <span className="animate-pulse w-full text-lg text-center mt-6 text-gray-400">Loading...</span>
        <span className="w-full text-md text-center mt-6 text-gray-600">Do not close the window until the process is finished.</span>
    </div>
}

export default LoadingPage;