import React from "react";

const DonateButton = ({ id, icon, tooltip, onDonateClick }) => {
    return <div title={tooltip} onClick={(e) => onDonateClick(id)} className="w-16 h-16 rounded-full bg-white shadow-md cursor-pointer flex justify-center items-center text-2xl hover:shadow-none">
        {icon}
    </div>
}

export default DonateButton;