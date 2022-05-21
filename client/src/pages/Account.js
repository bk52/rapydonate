import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, Form, Message, Header } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { selectCountries } from "../redux/countriesSlice";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const Account = () => {
    const COUNTRIES = useSelector(selectCountries);
    const [formErr, setFormErr] = useState(null);
    const [loading, setLoading] = useState(false);

    const personelForm = useFormik({
        initialValues: {
            first_name: 'Joe',
            last_name: 'Doe',
            email: 'joe@rapyd.net',
            mothers_name: 'Jane Doe',
            phone_code: '90',
            phone_number: '155551233',
            //identification_type: "",
            //identification_number: "",
            country: "US",
            //nationality: "",
            date_of_birth: "11/22/2000",
            line_1: "123 Lake Forest Drive",
            line_2: "",
            line_3: "",
            city: "Anytown",
            state: "NY",
            zip: "12345",
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required('Required'),
            last_name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email format').required('Required'),
            mothers_name: Yup.string().required('Required'),
            phone_code: Yup.string().required('Required'),
            phone_number: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),
            //identification_type: Yup.string().required('Required'),
            //identification_number: Yup.string().required('Required'),
            country: Yup.string().required('Required'),
            //nationality: Yup.string().required('Required'),
            date_of_birth: Yup.string().required('Required'),
            line_1: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            //state: Yup.string().required('Required'),
            zip: Yup.string().required('Required')
        }),
        onSubmit: async (values) => {
            try {
                //setLoading(true);
                console.log(values)
            }
            catch (e) {
                setFormErr(e?.message);
                setLoading(false);
            }
        },
    });

    // const phoneCodeOptions = COUNTRIES.map((item) => ({ key: item.id, value: item.phone_code, text: item.name }))

    return <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '500px', marginTop: '16px' }}>
            <Header as='h3' textAlign='center'>Personel Info</Header>
            <Form onSubmit={personelForm.handleSubmit} size={'large'} error loading={loading}>
                {formErr ? (<div><Message error content={formErr} /></div>) : null}
                <Form.Group widths='equal'>
                    <Form.Field error={personelForm.touched.first_name && personelForm.errors.first_name && { content: personelForm.errors.first_name, pointing: 'below' }} control={Input} label='First Name' id="first_name" name="first_name" placeholder='' onChange={personelForm.handleChange} value={personelForm.values.first_name} />
                    <Form.Field error={personelForm.touched.last_name && personelForm.errors.last_name && { content: personelForm.errors.last_name, pointing: 'below' }} control={Input} label='Last Name' id="last_name" name="last_name" placeholder='' onChange={personelForm.handleChange} value={personelForm.values.last_name} />
                </Form.Group>
                <Form.Field error={personelForm.touched.date_of_birth && personelForm.errors.date_of_birth && { content: personelForm.errors.date_of_birth, pointing: 'below' }} control={Input} type="date" label='Date of Birth' id="date_of_birth" name="date_of_birth" placeholder='' onChange={personelForm.handleChange} value={personelForm.values.date_of_birth} />
                <Form.Field error={personelForm.touched.email && personelForm.errors.email && { content: personelForm.errors.email, pointing: 'below' }} control={Input} label='Email' id="email" name="email" placeholder='' onChange={personelForm.handleChange} value={personelForm.values.email} />
                <Form.Field error={personelForm.touched.mothers_name && personelForm.errors.mothers_name && { content: personelForm.errors.mothers_name, pointing: 'below' }} control={Input} label={`Mother's Name`} id="mothers_name" name="mothers_name" placeholder='' onChange={personelForm.handleChange} value={personelForm.values.mothers_name} />
                <Form.Group widths='equal'>
                    <Form.Field error={personelForm.touched.phone_code && personelForm.errors.phone_code && { content: personelForm.errors.phone_code, pointing: 'below' }}>
                        <label>Phone Code</label>
                        <select id="phone_code" name="phone_code" onChange={personelForm.handleChange} value={personelForm.values.phone_code}>
                            {
                                COUNTRIES && COUNTRIES.map((item, index) => <option key={index} value={`${item.phone_code}`}>{`${item.name}`}</option>)
                            }
                        </select>
                    </Form.Field>
                    <Form.Field error={personelForm.touched.phone_number && personelForm.errors.phone_number && { content: personelForm.errors.phone_number, pointing: 'below' }} control={Input} label='Phone Number' id="phone_number" name="phone_number" placeholder='' onChange={personelForm.handleChange} value={personelForm.values.phone_number} />
                </Form.Group>
                <Form.Field error={personelForm.touched.country && personelForm.errors.country && { content: personelForm.errors.country, pointing: 'below' }}>
                    <label>Country</label>
                    <select id="country" name="country" onChange={personelForm.handleChange} value={personelForm.values.country}>
                        {
                            COUNTRIES && COUNTRIES.map((item, index) => <option key={index} value={`${item.iso_alpha2}`}>{`${item.name}`}</option>)
                        }
                    </select>
                </Form.Field>
                <Form.Field error={personelForm.touched.line_1 && personelForm.errors.line_1 && { content: personelForm.errors.line_1, pointing: 'below' }} control={Input} label='Adress' id="line_1" name="line_1" placeholder='' onChange={personelForm.handleChange} value={personelForm.values.line_1} />
                <Form.Group widths='equal'>
                    <Form.Field error={personelForm.touched.city && personelForm.errors.city && { content: personelForm.errors.city, pointing: 'below' }} control={Input} label='City' id="city" name="city" placeholder='' onChange={personelForm.handleChange} value={personelForm.values.city} />
                    <Form.Field error={personelForm.touched.state && personelForm.errors.state && { content: personelForm.errors.state, pointing: 'below' }} control={Input} label='State' id="state" name="state" placeholder='' onChange={personelForm.handleChange} value={personelForm.values.state} />
                    <Form.Field error={personelForm.touched.zip && personelForm.errors.zip && { content: personelForm.errors.zip, pointing: 'below' }} control={Input} label='Zip Code' id="zip" name="zip" placeholder='' onChange={personelForm.handleChange} value={personelForm.values.zip} />
                </Form.Group>
                <Form.Field control={Button} color='green' fluid type="submit">Save</Form.Field>
            </Form>
        </div>
    </div>
}

export default Account;