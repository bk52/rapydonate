import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Icon, Table, Label, Placeholder } from 'semantic-ui-react'
import { useSnackbar } from 'notistack';

const ProjectStatus = (status) => status === "active" ? <Label color='green'>Active</Label> : <Label color='yellow'>Pause</Label>

const ProjectList = ({ projectList }) => {
    const navigate = useNavigate();

    return <Table basic='very'>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell width={2} textAlign='center'>Status</Table.HeaderCell>
                <Table.HeaderCell width={1}></Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {
                projectList && projectList.map((item, ind) =>
                    <Table.Row key={item._id}>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell>{item.description}</Table.Cell>
                        <Table.Cell textAlign='center'>{ProjectStatus(item.status)}</Table.Cell>
                        <Table.Cell textAlign='right'> <Button style={{ backgroundColor: 'white' }} onClick={(e) => navigate(`/projects/${item._id}`, { replace: false })} circular icon='angle double right' /></Table.Cell>
                    </Table.Row>)
            }
        </Table.Body>
    </Table>
}

const Projects = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [projects, setProjects] = useState(null);
    useEffect(() => {
        setProjects([
            {
                _id: 1,
                name: "Gamer BK",
                description: "This is donation project for my channel",
                status: "active"
            }
        ])
    }, [])

    const onNewProject = (e) => { enqueueSnackbar('Not allowed in demo version', { anchorOrigin: { vertical: 'top', horizontal: 'center', }, variant: 'warning', autoHideDuration: 2000 }); }

    return <div className="projectsPage">
        <div style={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
            <Button color='green' onClick={onNewProject}><Icon name='plus' /> New Project</Button>
        </div>
        {
            projects ? <ProjectList projectList={projects} /> : <Placeholder fluid>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
            </Placeholder>
        }
    </div>
}

export default Projects;