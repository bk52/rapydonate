import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Info = () => {
    const { id } = useParams();

    useEffect(() => {
        console.log('project ID -> ' + id);
    }, [])

    return <div>
        Info Page
    </div>
}

export default Info;