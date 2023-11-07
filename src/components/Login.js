import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { url } from '../App';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {Button} from 'react-bootstrap';


function Login() {

    let navigate = useNavigate();

    //form validation using formik
    let userSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string()
            .required("Required"),
    });

    //login function
    let handleLogin = async (values) => {
        try {
            let res = await axios.post(`${url}/login`, {
                email:values.email,
                password:values.password
            })

            if (res.status === 200) {
                sessionStorage.setItem('token', res.data.token)
                toast.success(res.data.message)
                navigate('/menu')
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }

      

    }


    return (
        <div>
            <Formik
                initialValues={{
                    email:"",
                    password:""
                }}

                validationSchema={userSchema}

                onSubmit={(values) => {
                    handleLogin(values)
                }}
            >
                {({ errors, touched }) => (
                    <div className='container-fluid login'>
                        <div className='login-form'>
                            <div className='login-header text-center text-danger'><p>Login</p></div>
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="email" className='text-white'>Email</label>
                                    <Field name="email" className="form-control" type="email" placeholder="Enter Email" />
                                    {errors.email && touched.email ? (
                                        <div style={{ color: "red" }}>{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="form-group pt-2">
                                    <label htmlFor="password" className='text-white'>Password</label>
                                    <Field name="password" className="form-control" type="password" placeholder="Enter Password" />
                                    {errors.password && touched.password ? (
                                        <div style={{ color: "red" }}>{errors.password}</div>
                                    ) : null}
                                </div>
                                <div className='log-button pt-3 d-flex justify-content-between'>
                                    <Button variant="outline-secondary" type='submit'>
                                        Login
                                    </Button>
                                    <Button variant="outline-secondary" onClick={() => navigate("/forgetPassword")}>
                                        Forget password
                                    </Button>
                                </div>
                            </Form>
                            <div className='m-2 pt-3'>
                                <h4 className=' text-warning text-center'>New user please sign up</h4>
                                <div className='d-flex justify-content-end'>
                                    <Button variant="outline-secondary" className='text-center' onClick={() => navigate("/signUp")}>
                                        Sign up
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div >
                )}
            </Formik>



        </div>
    )
}

export default Login