import { Formik } from 'formik';
import React from 'react'
import axios from 'axios'

type Values = {
    username: string,
    password: string
}

const SignUp = ()=> {
    
    const validate = (values : Values) => {
         const errors = {};
         if (!values.username) {
           errors.username= 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.username = 'Invalid username';
         }
         return errors;
        }, 
        onSubmit = (values : Values, { setSubmitting }) => {
         axios.post('http://localhost:5000/login', values, { withCredentials: true })
         .then((res) => {
            setSubmitting(false)
         });
       }

    return (
        <Formik 
        initialValues={{username: "", password: ""}} validate={validate} onSubmit={onSubmit} >
            {(

            )=>(
               <form onSubmit={handleSubmit}>
                <label htmlFor="name">name:</label>
                <input
                    id="name"
                    name="name"
                    type="name"
                    onChange={handleChange}
                    onBlur = {handleBlur}
                    value={values.user}
                />
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    name="username"
                    type="username"
                    onChange={handleChange}
                    onBlur = {handleBlur}
                    value={values.user}
                />
                {errors.username && touched.username && errors.username}
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    onBlur = {handleBlur}
                    value={values.password}
                    />
                    {errors.password && touched.password && errors.password}

                <button type="submit" disabled={isSubmitting} >Submit</button>
                </form> 
            )}
        </Formik>
    )
}

export default SignUp