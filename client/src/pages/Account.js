import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Button, Input, Form, Header } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { selectCountries } from "../redux/countriesSlice";
import { SetAccountSettings, GetAccountSettings } from "../api/account";
import { useSnackbar } from 'notistack';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const Account = () => {
    const COUNTRIES = useSelector(selectCountries);
    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

    const personelForm = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            phone_code_by_id: '',
            phone_number: '',
            date_of_birth: "",
            line_1: "",
            city: "",
            state: "",
            zip: "",
            country_by_id: ""
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required('Required'),
            last_name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email format').required('Required'),
            phone_code_by_id: Yup.string().required('Required'),
            phone_number: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),
            country_by_id: Yup.string().required('Required'),
            date_of_birth: Yup.string().required('Required'),
            line_1: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            state: Yup.string().required('Required'),
            zip: Yup.string().required('Required')
        }),
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const accountInfo = { ...values };
                accountInfo.phone_code = COUNTRIES.filter(x => x.id == accountInfo.phone_code_by_id)[0].phone_code;
                accountInfo.country = COUNTRIES.filter(x => x.id == accountInfo.country_by_id)[0].iso_alpha2;
                const birthDate = new Date(accountInfo.date_of_birth);
                accountInfo.date_of_birth = `${birthDate.getMonth() + 1}/${birthDate.getDate()}/${birthDate.getFullYear()}`
                await SetAccountSettings(accountInfo);
                enqueueSnackbar('Account saved', { anchorOrigin: { vertical: 'top', horizontal: 'center', }, variant: 'success', autoHideDuration: 2000 });
                setLoading(false);
            }
            catch (e) {
                enqueueSnackbar('Error occured', { anchorOrigin: { vertical: 'top', horizontal: 'center', }, variant: 'error', autoHideDuration: 2000 });
                console.log(e?.message)
                setLoading(false);
            }
        },
    });

    useEffect(() => {
        const GetFormData = async () => {
            try {
                const response = await GetAccountSettings();
                const data = { ...response?.data?.contact };
                const birthDate = data.date_of_birth && new Date(data.date_of_birth);
                const birthDateStr = `${birthDate.getFullYear()}-${(birthDate.getMonth() + 1).toString().padStart(2, '0')}-${(birthDate.getDate()).toString().padStart(2, '0')}`
                delete data.date_of_birth;
                personelForm.setFieldValue('date_of_birth', birthDateStr)
                Object.entries(data).forEach(([key, value]) => personelForm.setFieldValue(key, value))
            }
            catch (e) {
                console.error(e)
            }
            setLoading(false)
        }
        GetFormData();
    }, [])


    // const phoneCodeOptions = COUNTRIES.map((item) => ({ key: item.id, value: item.phone_code, text: item.name }))

    return <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '500px', marginTop: '16px' }}>
            <Header as='h3' textAlign='center'>Personel Info</Header>
            <Form onSubmit={personelForm.handleSubmit} size={'large'} error loading={loading}>
                <Form.Group widths='equal'>
                    <Form.Field error={personelForm.touched.first_name && personelForm.errors.first_name && { content: personelForm.errors.first_name, pointing: 'below' }} control={Input} label='First Name' id="first_name" name="first_name" placeholder='' onChange={personelForm.handleChange} value={personelForm.values.first_name} />
                    <Form.Field error={personelForm.touched.last_name && personelForm.errors.last_name && { content: personelForm.errors.last_name, pointing: 'below' }} control={Input} label='Last Name' id="last_name" name="last_name" placeholder='' onChange={personelForm.handleChange} value={personelForm.values.last_name} />
                </Form.Group>
                <Form.Field error={personelForm.touched.date_of_birth && personelForm.errors.date_of_birth && { content: personelForm.errors.date_of_birth, pointing: 'below' }} control={Input} type="date" label='Date of Birth' id="date_of_birth" name="date_of_birth" placeholder='' onChange={personelForm.handleChange} value={personelForm.values.date_of_birth} />
                <Form.Field error={personelForm.touched.email && personelForm.errors.email && { content: personelForm.errors.email, pointing: 'below' }} control={Input} label='Email' id="email" name="email" placeholder='' onChange={personelForm.handleChange} value={personelForm.values.email} />
                <Form.Group widths='equal'>
                    <Form.Field error={personelForm.touched.phone_code_by_id && personelForm.errors.phone_code_by_id && { content: personelForm.errors.phone_code_by_id, pointing: 'below' }}>
                        <label>Phone Code</label>
                        <select id="phone_code_by_id" name="phone_code_by_id" onChange={personelForm.handleChange} value={personelForm.values.phone_code_by_id}>
                            {
                                COUNTRIES && COUNTRIES.map((item, index) => <option key={index} value={`${item.id}`}>{`${item.name}`}</option>)
                            }
                        </select>
                    </Form.Field>
                    <Form.Field error={personelForm.touched.phone_number && personelForm.errors.phone_number && { content: personelForm.errors.phone_number, pointing: 'below' }} control={Input} label='Phone Number' id="phone_number" name="phone_number" placeholder='' onChange={personelForm.handleChange} value={personelForm.values.phone_number} />
                </Form.Group>
                <Form.Field error={personelForm.touched.line_1 && personelForm.errors.line_1 && { content: personelForm.errors.line_1, pointing: 'below' }} control={Input} label='Adress' id="line_1" name="line_1" placeholder='' onChange={personelForm.handleChange} value={personelForm.values.line_1} />
                <Form.Group widths='equal'>
                    <Form.Field error={personelForm.touched.country_by_id && personelForm.errors.country_by_id && { content: personelForm.errors.country_by_id, pointing: 'below' }}>
                        <label>Country</label>
                        <select id="country_by_id" name="country_by_id" onChange={personelForm.handleChange} value={personelForm.values.country_by_id}>
                            {
                                COUNTRIES && COUNTRIES.map((item, index) => <option key={index} value={`${item.id}`}>{`${item.name}`}</option>)
                            }
                        </select>
                    </Form.Field>
                    <Form.Field error={personelForm.touched.city && personelForm.errors.city && { content: personelForm.errors.city, pointing: 'below' }} control={Input} label='City' id="city" name="city" placeholder='' onChange={personelForm.handleChange} value={personelForm.values.city} />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field error={personelForm.touched.state && personelForm.errors.state && { content: personelForm.errors.state, pointing: 'below' }} control={Input} label='State' id="state" name="state" placeholder='' onChange={personelForm.handleChange} value={personelForm.values.state} />
                    <Form.Field error={personelForm.touched.zip && personelForm.errors.zip && { content: personelForm.errors.zip, pointing: 'below' }} control={Input} label='Zip Code' id="zip" name="zip" placeholder='' onChange={personelForm.handleChange} value={personelForm.values.zip} />
                </Form.Group>
                <Form.Field control={Button} color='green' fluid type="submit">Save</Form.Field>
            </Form>
        </div>
    </div>
}

export default Account;