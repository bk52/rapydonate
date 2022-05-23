import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Icon, Table, Label, Placeholder, Modal, Form, Input } from 'semantic-ui-react'
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GetProjects, CreateProject, DeleteProject } from '../api/projects';

const ProjectModal = ({ open, onClose, onSave }) => {

    const formik = useFormik({
        initialValues: {
            title: '',
            description: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            onSave(values.title, values.description)
        },
    });

    return <Modal basic size="small" open={open}>
        <Modal.Header>New Project</Modal.Header>
        <Modal.Content >
            <Form onSubmit={formik.handleSubmit} size={'large'} error>
                <Form.Field
                    control={Input}
                    label=''
                    id="title"
                    name="title"
                    placeholder='Title'
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    error={formik.touched.title && formik.errors.title && { content: formik.errors.title, pointing: 'below' }}
                />
                <Form.Field
                    control={Input}
                    label=''
                    id="description"
                    name="description"
                    placeholder='Description'
                    onChange={formik.handleChange}
                    value={formik.values.description}
                />
                <Form.Group widths='equal'>
                    <Form.Field control={Button} fluid color='green' type="submit">Save</Form.Field>
                    <Form.Field control={Button} fluid color='red' onClick={onClose}>Close</Form.Field>
                </Form.Group>
            </Form>
        </Modal.Content>
    </Modal>
}

const ProjectStatus = (status) => status === "active" ? <Label color='green'>Active</Label> : <Label color='yellow'>Pause</Label>

const ProjectList = ({ projectList, onRemoveProject }) => {
    const navigate = useNavigate();

    return <Table basic='very'>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell width={2} textAlign='center'>Status</Table.HeaderCell>
                <Table.HeaderCell width={1}></Table.HeaderCell>
                <Table.HeaderCell width={1}></Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {
                projectList && projectList.map((item, ind) =>
                    <Table.Row key={item._id}>
                        <Table.Cell>{item.title}</Table.Cell>
                        <Table.Cell>{item.description}</Table.Cell>
                        <Table.Cell textAlign='center'>{ProjectStatus(item.status)}</Table.Cell>
                        <Table.Cell textAlign='center'> <Button style={{ backgroundColor: 'white' }} onClick={(e) => onRemoveProject(item._id)} circular icon='trash alternate' /></Table.Cell>
                        <Table.Cell textAlign='right'> <Button style={{ backgroundColor: 'white' }} onClick={(e) => navigate(`/projects/${item._id}`, { replace: false })} circular icon='angle double right' /></Table.Cell>
                    </Table.Row>)
            }
        </Table.Body>
    </Table>
}

const Projects = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [projects, setProjects] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const GetData = async () => {
        setLoading(true);
        try {
            const projectList = await GetProjects();
            setProjects(projectList?.data?.data);
        }
        catch (e) {
            enqueueSnackbar('Error occured', { anchorOrigin: { vertical: 'top', horizontal: 'center', }, variant: 'error', autoHideDuration: 2000 });
            console.error(e)
        }
        setLoading(false);
    }

    const onSave = async (title, description) => {
        setLoading(true);
        try {
            setModalOpen(false)
            await CreateProject(title, description);
            GetData();
        }
        catch (e) {
            enqueueSnackbar('Error occured', { anchorOrigin: { vertical: 'top', horizontal: 'center', }, variant: 'error', autoHideDuration: 2000 });
            console.error(e)
        }
        setLoading(false);
    }

    const onRemoveProject = async (projectId) => {
        setLoading(true);
        try {
            await DeleteProject(projectId);
            GetData();
        }
        catch (e) {
            enqueueSnackbar('Error occured', { anchorOrigin: { vertical: 'top', horizontal: 'center', }, variant: 'error', autoHideDuration: 2000 });
            console.error(e)
        }
        setLoading(false);
    }

    useEffect(() => { GetData() }, [])

    return <div className="projectsPage">
        <ProjectModal open={modalOpen} onSave={onSave} onClose={() => setModalOpen(false)} />
        <div style={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
            <Button disabled={projects && projects.length > 0} color='green' onClick={(e) => setModalOpen(true)}><Icon name='plus' /> New Project</Button>
        </div>
        {
            loading ? <Placeholder fluid>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
            </Placeholder> : <ProjectList projectList={projects} onRemoveProject={onRemoveProject} />
        }
    </div>
}

export default Projects;