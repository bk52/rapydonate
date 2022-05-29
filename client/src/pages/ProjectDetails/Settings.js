import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle } from "react";
import { Button, Grid, Table, Input, Label, Checkbox, TextArea, Form, Message, Header, Icon, GridColumn } from 'semantic-ui-react';
import { SliderPicker } from 'react-color';
import { useSnackbar } from 'notistack';
import DONATE_TYPES from "../../common/DonateTypes";
import { UpdateProject } from "../../api/projects";

const DonationInfo = forwardRef((props, ref) => {
    const [data, setData] = useState({ title: '', description: '', imageURL: '', bgColor: '#fff' });

    useEffect(() => {
        props.info && props.info.title && setData(props.info)
    }, [props.info])

    const onChange = ({ target }) => {
        const { name, value } = target;
        setData((prevstate) => ({ ...prevstate, [name]: value }))
    }

    useImperativeHandle(ref, () => ({ GetData() { return data } }));

    return <>
        <Header as='h3' textAlign='center'>Info</Header>
        <Form style={{ padding: '8px', borderRadius: '4px' }} size={'large'}>
            <Form.Field
                control={Input}
                label='Title'
                id="title"
                name="title"
                placeholder=''
                onChange={onChange}
                value={data.title}
            />
            <Form.Field
                control={TextArea}
                label='Description'
                id="description"
                name="description"
                placeholder=''
                onChange={onChange}
                value={data.description}
            />
            <Form.Field
                control={Input}
                label='Image Url'
                id="imageURL"
                name="imageURL"
                placeholder=''
                onChange={onChange}
                value={data.imageURL} />
            <Form.Field
                control={SliderPicker}
                label='Background Color'
                id="bgColor"
                name="bgColor"
                placeholder=''
                onChangeComplete={(c) => onChange({ target: { name: 'bgColor', value: c.hex } })}
                color={data.bgColor} />
        </Form>
    </>
})

const DonationTypes = forwardRef((props, ref) => {
    const [data, setData] = useState([])
    useEffect(() => {
        props.types && props.types.length > 0 ? setData(props.types) : setData(DONATE_TYPES)
    }, [props.types])

    const onChange = (target, ind) => {
        const { name, value } = target;

        if (name === "price" && value < 0) value = 0;
        console.log(ind)
        const newData = [...data];
        //const ind = newData.findIndex(x => x.id == key);
        newData[ind][`${name}`] = value;
        setData(newData)
    }

    useImperativeHandle(ref, () => ({ GetData() { return data } }));

    return <>
        <Header as='h3' textAlign='center'>Donation Types</Header>
        <Table basic='very'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell textAlign='center'>Active</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Icon</Table.HeaderCell>
                    <Table.HeaderCell textAlign='left'>Title</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Price</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    data.map((item, index) =>
                        <Table.Row key={index}>
                            <Table.Cell textAlign='center'> <Checkbox name="active" toggle onChange={(e, data) => onChange({ name: data.name, value: data.checked }, index)} checked={item.active} /></Table.Cell>
                            <Table.Cell textAlign='center'>{item.icon}</Table.Cell>
                            <Table.Cell textAlign='left'>{item.title}</Table.Cell>
                            <Table.Cell textAlign='center'>
                                <Input onChange={(e) => onChange(e.target, index)} name="price" disabled={!item.active} type='number' min='0' value={item.price || 0} style={{ width: '60px', fontSize: '11px' }} >
                                    <input />
                                    <Label basic>$</Label>
                                </Input>
                            </Table.Cell>
                        </Table.Row>)
                }
            </Table.Body>
        </Table>
    </>
})

const DonationURLs = forwardRef((props, ref) => {
    const [data, setData] = useState([])
    const [newURL, setNewURL] = useState(false);
    const [newItem, setNewItem] = useState({ url: '', title: '', active: true })

    const onNewItemChange = ({ target }) => {
        const { name, value } = target;
        setNewItem((prev) => ({ ...prev, [name]: value }))
    }

    const onNewItemAdd = (e) => {
        setData((prev) => ([...prev, newItem]));
        setNewItem({ url: '', title: '', active: true });
        setNewURL(false);
    }

    const onRemoveUrl = (index) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    }

    const onActiveChanged = (index) => {
        const newData = [...data];
        newData[index].active = !newData[index].active
        setData(newData);
    }

    useImperativeHandle(ref, () => ({ GetData() { return data } }));

    useEffect(() => { props.urls && setData(props.urls) }, [props.urls])
    return <>
        <Header as='h3' textAlign='center'>Donation URLs</Header>
        {newURL ? <>
            <Grid columns='four'>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Input value={newItem.title} onChange={onNewItemChange} fluid name='title' placeholder='Title' />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Input value={newItem.url} onChange={onNewItemChange} fluid name='url' placeholder='URL' />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <div style={{ display: 'flex' }}>
                            <Button onClick={onNewItemAdd} circular icon='check' />
                            <Button onClick={(e) => { setNewItem({ url: '', title: '', active: true }); setNewURL(false) }} circular icon='times' />
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </> : <Button onClick={() => setNewURL(true)} color="blue" fluid><Icon name="plus" />New URL</Button>}

        <Table basic='very'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell textAlign='center'>Active</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Name</Table.HeaderCell>
                    <Table.HeaderCell textAlign='left'>URL</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Verified</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'></Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    data.map((item, index) =>
                        <Table.Row key={index}>
                            <Table.Cell textAlign='center'> <Checkbox toggle checked={item.active} onChange={(e) => onActiveChanged(index)} /></Table.Cell>
                            <Table.Cell textAlign='center'>{item.title}</Table.Cell>
                            <Table.Cell textAlign='left'>{item.url}</Table.Cell>
                            <Table.Cell textAlign='center'>{item.verified ? <Icon name='check' /> : <Icon name='close' />}</Table.Cell>
                            <Table.Cell textAlign='center'>
                                <Button onClick={(e) => (onRemoveUrl(index))} circular icon='trash alternate' />
                            </Table.Cell>
                        </Table.Row>)
                }
            </Table.Body>
        </Table>
    </>
})

const Settings = ({ projectId, settings }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const infoRef = useRef();
    const typesRef = useRef();
    const urlsRef = useRef();
    const [info, setInfo] = useState({});
    const [donTypes, setDonTypes] = useState([]);
    const [urlList, setUrlList] = useState([]);

    const onSave = async (e) => {
        try {
            enqueueSnackbar('Not allowed in demo version.', { anchorOrigin: { vertical: 'top', horizontal: 'center', }, variant: 'warning', autoHideDuration: 2000 });
            // const response = await UpdateProject(
            //     projectId,
            //     infoRef.current.GetData(),
            //     typesRef.current.GetData(),
            //     urlsRef.current.GetData()
            // );
            // enqueueSnackbar('Saved', { anchorOrigin: { vertical: 'top', horizontal: 'center', }, variant: 'success', autoHideDuration: 2000 });
        }
        catch (err) {
            console.error(err)
            enqueueSnackbar('Error occured', { anchorOrigin: { vertical: 'top', horizontal: 'center', }, variant: 'error', autoHideDuration: 2000 });
        }
    }

    useEffect(() => {
        const { title, description, imageURL, bgColor } = settings;
        setInfo({ title, description, imageURL, bgColor });
        setDonTypes(settings?.donationTypes);
        setUrlList(settings?.urls);
    }, [settings])

    return <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="projectSettingsPage">
            <DonationInfo ref={infoRef} info={info} />
            <DonationTypes ref={typesRef} types={donTypes} />
            <DonationURLs ref={urlsRef} urls={urlList} />
            <Button onClick={onSave} color="green" fluid style={{ marginBottom: '30px' }}>Save</Button>
        </div>
    </div >

}

export default Settings;