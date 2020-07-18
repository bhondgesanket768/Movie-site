import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { loginUser, resetPassword } from "../actions/userActions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { useDispatch } from "react-redux";
import { notify } from "../utils";
import { increment, decrement, set, get } from "automate-redux"
import ForgotPassword from "../pages/forgotPassword";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import loginimage from "../assets/login.jpg"
import axios from "axios";

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const pendingRequests = useSelector(state => state.pendingRequests)
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)
  const [forgotPasswordForm, setForgotPasswordForm] = useState(false);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  };

  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';
  const initialpass = localStorage.getItem("password") ? localStorage.getItem("password") : '';

  const handleReset = (email, password) => {
    axios.post("/api/users/forgot", { email, password })
      .then(() => notify("success", "Success", "Password changed Successfully"))
      .catch(ex => notify("error", "Error", toString(ex)))
  }

  return (
    <div>
      <Formik
        initialValues={{
          email: initialEmail,
          password: initialpass,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            let dataToSubmit = {
              email: values.email,
              password: values.password
            };
            dispatch(increment(pendingRequests))
            dispatch(loginUser(dataToSubmit))
              .then(response => {
                if (response.payload.loginSuccess) {
                  window.localStorage.setItem('userId', response.payload.userId);
                  window.localStorage.setItem('x_auth_token', true)
                  if (rememberMe === true) {
                    window.localStorage.setItem('rememberMe', values.email);
                    window.localStorage.setItem('password', values.password);
                  } else {
                    localStorage.removeItem('rememberMe');
                  }
                  props.history.push("/movies");
                  notify("success", "Success", `Welcome ${response.payload.userName}`);
                } else {
                  setFormErrorMessage('Check out your Account or Password again')
                }
              })
              .catch(err => {
                setFormErrorMessage('Check out your Account or Password again')
                setTimeout(() => {
                  setFormErrorMessage("")
                }, 3000);
              })
              .finally(() => dispatch(decrement(pendingRequests)));
            setSubmitting(false);
          }, 500);
        }}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
          } = props;
          return (
            <div className="app">

              <Title level={2}>Log In</Title>
              <form onSubmit={handleSubmit} style={{ width: '350px' }}>

                <Form.Item required style={{ paddingTop: 12 }}>
                  <Input
                    id="email"
                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Enter your email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.email && touched.email && (
                    <div className="input-feedback" style={{ paddingTop: 12 }}>{errors.email}</div>
                  )}
                </Form.Item>

                <Form.Item required style={{ paddingTop: 12 }}>
                  <Input
                    id="password"
                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Enter your password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.password && touched.password && (
                    <div className="input-feedback" style={{ paddingTop: 12 }}>{errors.password}</div>
                  )}
                </Form.Item>

                {formErrorMessage && (
                  <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
                )}

                <Form.Item style={{ paddingTop: 12 }}>
                  <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >Remember me</Checkbox>
                  <a className="login-form-forgot" onClick={() => setForgotPasswordForm(true)} style={{ float: 'right' }}>
                    forgot password
                  </a>
                  <div style={{ paddingTop: 12 }}>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                      Log in
                </Button>
                  </div>
                  Or <a href="/register">register now!</a>
                </Form.Item>
              </form>
            </div>
          );
        }}
      </Formik>
      {forgotPasswordForm && <ForgotPassword
        handleSubmit={handleReset}
        handleCancel={() => setForgotPasswordForm(false)}
      />}
    </div>
  );
};

export default withRouter(LoginPage);