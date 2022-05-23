import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Menu } from 'semantic-ui-react'
import Settings from "./Settings";
import Donations from "./Donations";
import { GetProjects } from "../../api/projects";

const ProjectDetails = () => {
    const { id } = useParams();
    const [active, setActive] = useState("donations");
    const handleItemClick = (e, { name }) => { setActive(name) }
    const [projectId, setProjectId] = useState("");
    const [settings, setSettings] = useState({});

    useEffect(() => {
        const GetSettings = async (id) => {
            try {
                const response = await GetProjects(id);
                setSettings(response?.data?.data);
            }
            catch (e) {
                console.error(e);
            }
        }
        GetSettings(id);
        setProjectId(id)
    }, []);

    return <>
        <Menu tabular style={{ 'margin': '0px' }}>
            <Menu.Item name='donations' active={active === 'donations'} onClick={handleItemClick} />
            <Menu.Item name='settings' active={active === 'settings'} onClick={handleItemClick} />
        </Menu>
        {active === "settings" ? <Settings projectId={projectId} settings={settings} /> : <Donations projectId={projectId} />}
    </>
}

export default ProjectDetails;