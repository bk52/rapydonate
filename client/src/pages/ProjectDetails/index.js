import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Menu } from 'semantic-ui-react'
import Settings from "./Settings";
import Donations from "./Donations";
import { GetProjects } from "../../api/projects";
import { GetDonations } from "../../api/donations";

const ProjectDetails = () => {
    const { id } = useParams();
    const [active, setActive] = useState("donations");
    const handleItemClick = (e, { name }) => { setActive(name) }
    const [projectId, setProjectId] = useState("");
    const [settings, setSettings] = useState({});
    const [donateList, setDonateList] = useState(null);

    useEffect(() => {
        const GetSettings = async (id) => {
            try {
                const response = await GetProjects(id);
                const donates = await GetDonations(id);
                setDonateList(donates?.data)
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
        {active === "settings" ? <Settings projectId={projectId} settings={settings} /> : <Donations donateList={donateList} projectId={projectId} />}
    </>
}

export default ProjectDetails;