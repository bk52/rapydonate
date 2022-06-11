import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, Form, Message } from 'semantic-ui-react';
import { Navigate, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import isLogin from "../common/isLogin";
import { Encryption } from '../common/encryption';
import { fetchSignIn } from "../redux/authSlice";
import Logo from "../assets/img/heartOn.png"

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginErr, setLoginErr] = useState(null);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: 'GamerKing',
            password: 'Pr@.1252'
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                const encPass = Encryption(values.password, "23A45BC678D90123")
                setLoading(true);
                await dispatch(fetchSignIn({ username: values.email, password: encPass })).unwrap();
                navigate("/projects", { replace: true })
            }
            catch (e) {
                setLoginErr(e?.message);
                setLoading(false);
            }
        },
    });

    return (
        isLogin() ? <Navigate to="/home" replace={true} /> : <div className='loginPage'>
            <div className='logo'>
                <img src={Logo} />
            </div>
            <h2>Rapydonate</h2>
            <Form style={{ 'marginTop': '16px' }} onSubmit={formik.handleSubmit} size={'large'} error loading={loading}>
                {loginErr ? (<div><Message error content={loginErr} /></div>) : null}
                <Form.Field
                    control={Input}
                    label='Email'
                    id="email"
                    name="email"
                    placeholder='Email'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (<div><Message error content={formik.errors.email} /></div>) : null}
                <Form.Field
                    control={Input}
                    label='Password'
                    id="password"
                    name="password"
                    placeholder='Password'
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (<div><Message error content={formik.errors.password} /></div>) : null}
                <Form.Field control={Button} fluid color='blue' type="submit">Sign In</Form.Field>
            </Form>
        </div>
    );
}

export default Login;
