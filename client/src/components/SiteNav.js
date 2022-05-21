import React, { useState } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";

const SiteNav = () => {
    const [activeItem, setActiveItem] = useState("projects");
    const navigate = useNavigate();
    const handleItemClick = (e, { name }) => {
        navigate(`/${name}`, { replace: true })
        setActiveItem(name);
    }
    return <Menu className='verticalMenu' icon='labeled' widths={2} fluid>
        <Menu.Item name='projects' active={activeItem === 'projects'} onClick={handleItemClick}>
            <Icon name='heart' />
            Projects
        </Menu.Item>

        <Menu.Item name='account' active={activeItem === 'account'} onClick={handleItemClick}>
            <Icon name='user circle' />
            Account
        </Menu.Item>

        {/* <Menu.Item name='settings' active={activeItem === 'settings'} onClick={handleItemClick}>
            <Icon name='setting' />
            Settings
        </Menu.Item> */}
    </Menu>

}

export default SiteNav;