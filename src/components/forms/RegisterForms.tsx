import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AxiosResponse } from "axios";

import { register } from "../../services/authService";

const RegisterForm = () => {

    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirm: "",
        age: 18
    }

    // Yup Validation Schema
    const registerSchema = Yup.object().shape(
        {
            name: Yup.string()
                .min(6, "Username must have 6 letters minimum")
                .max(12, "Username must have 6 letters maximum")
                .required("Username is required"),
            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),
            password: Yup.string()
                .min(8, "Password must have 8 characters minimum")
                .required("Password is required"),
            confirm: Yup.string()
                .when("password", {
                    is: (value:string) => (value && value.length > 0 ? true : false),
                    then: Yup.string().oneOf(
                        [Yup.ref("password")], "Password must match"
                    )
                }).required("You must confirm your password"),
            age: Yup.number()
                .min(18, "You must be over 18 years old")
                .required("Age is required"),
        }
    );

    return (
        <div>
            <h4>Register as a new user</h4>
            {/* Formik wrapper */}
            <Formik
                initialValues={initialValues}
                validationSchema={registerSchema}
                onSubmit={ async(values) => {
                    register(values.name, values.email, values.password, values.age).then((response: AxiosResponse) => {
                        if (response.status == 201) {
                            console.log("User registered correctly");
                            console.log(response.data);
                            alert("User registered correctly");
                        } else {
                            throw new Error("Error in registry")
                        }

                    }).catch((error: any) => {
                        console.log(`[REGISTER ERROR]: Something went wrong: ${error}`)
                    })

                }}
            >

                {
                    ({values, touched, errors, isSubmitting, handleChange, handleBlur}) => 
                    (
                        <Form>
                            {/* Name Field */}
                            <label htmlFor="name">Name</label>
                            <Field id="name" type="text" name="name" placeholder="Your name" />
                            
                            {/* Name Errors */}
                            {
                                errors.name && touched.name && (
                                    <ErrorMessage name="name" component="div"></ErrorMessage>
                                )
                            }

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
                            <Field id="password" type="password" name="password" placeholder="Password" />
                            
                            {/* Password Errors */}
                            {
                                errors.password && touched.password && (
                                    <ErrorMessage name="password" component="div"></ErrorMessage>
                                )
                            }

                            {/* Confirm Field */}
                            <label htmlFor="confirm">Confirm Password</label>
                            <Field id="confirm" type="password" name="confirm" placeholder="Confirm your password" />
                            
                            {/* Confirm Errors */}
                            {
                                errors.confirm && touched.confirm && (
                                    <ErrorMessage name="confirm" component="div"></ErrorMessage>
                                )
                            }

                            {/* Age Field */}
                            <label htmlFor="age">Confirm Password</label>
                            <Field id="age" type="number" name="age" placeholder="Confirm your password" />
                            
                            {/* Age Errors */}
                            {
                                errors.age && touched.age && (
                                    <ErrorMessage name="confirm" component="div"></ErrorMessage>
                                )
                            }

                            {/* SUBMIT FORM */}
                            <button type="submit">Register</button>

                            {/* Message if the form is submitting */}
                            {
                                isSubmitting ? 
                                (<p>Sending data to registry...</p>)
                                :null
                            }
                        </Form>
                    )
                }

            </Formik>

        </div>
    )

}

export default RegisterForm;
