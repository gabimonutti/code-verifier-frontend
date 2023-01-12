import React from "react";
import { AxiosResponse } from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";

import { login } from "../../services/authService";

// Define Schema of validation with Yup
const loginSchema = Yup.object().shape(
    {
        email: Yup.string().email("Invalid Email Format").required("Email is required"),
        password: Yup.string().required("Password is required")
    }
);

// Login component
const LoginForm = () => {
    // Define initial credentials
    const initialCredential = {
        email: "",
        password: ""
    }

    let navigate = useNavigate();


    return (
        <div>
            <h4>Login Form</h4>
            {/* Formik to encapsulate a Form */}
            <Formik
                initialValues={ initialCredential }
                validationSchema={ loginSchema }
                onSubmit={ async(values) => {
                    login(values.email, values.password).then(async (response: AxiosResponse) => {
                        if (response.status == 200) {
                            if (response.data.token) {
                                await sessionStorage.setItem("sessionJWTToken", response.data.token);
                                navigate("/");
                            } else {
                                throw new Error("Error generating login token");
                            }
                        } else {
                            throw new Error("Invalid credentials");
                        }

                    }).catch((error: any) => {
                        console.log(`[LOGIN ERROR]: Something went wrong: ${error}`)
                    })

                }}
            >
                {
                    ({values, touched, errors, isSubmitting, handleChange, handleBlur}) => 
                    (
                        <Form>
                            {/* Email Field */}
                            <label htmlFor="email">Email</label>
                            <Field id="email" type="email" name="email" placeholder="example@email.com" />
                            
                            {/* Email Errors */}
                            {
                                errors.email && touched.email && (
                                    <ErrorMessage name="email" component="div"></ErrorMessage>
                                )
                            }

                            {/* Password Field */}
                            <label htmlFor="password">Password</label>
                            <Field id="password" type="password" name="password" placeholder="example" />
                            
                            {/* Password Errors */}
                            {
                                errors.password && touched.password && (
                                    <ErrorMessage name="password" component="div"></ErrorMessage>
                                )
                            }

                            {/* SUBMIT FORM */}
                            <button type="submit">Login</button>

                            {/* Message if the form is submitting */}
                            {
                                isSubmitting ? 
                                (<p>Checking credentials...</p>)
                                :null
                            }
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default LoginForm;