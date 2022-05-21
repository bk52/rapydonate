import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Menu } from 'semantic-ui-react'
import Settings from "./Settings";
import Donations from "./Donations";

const ProjectDetails = () => {
    const { id } = useParams();
    const [active, setActive] = useState("donations");
    const handleItemClick = (e, { name }) => { setActive(name) }

    useEffect(() => {
        // console.log(`/something/${id}`);
    }, []);

    return <>
        <Menu tabular style={{ 'margin': '0px' }}>
            <Menu.Item
                name='settings'
                active={active === 'settings'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name='donations'
                active={active === 'donations'}
                onClick={handleItemClick}
            />
        </Menu>
        {active === "settings" ? <Settings /> : <Donations />}
    </>
}

export default ProjectDetails;