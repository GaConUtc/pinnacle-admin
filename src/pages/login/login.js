import { Card, Row, Form, Input, Button, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ACCESS_TOKEN } from '../../constants/common';
import { login } from '../../services/apis/LoginApi';
import './Login.scss';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);

    const onFinish = async () => {
        try {
            const response = await login({ email: email, password: password });
            localStorage.setItem(ACCESS_TOKEN, response?.data?.token);
            navigate('/');
        } catch (error) {
            message.error(error?.message);
        }
    };
    return (
        <div className="login">
            <Row align={'middle'} justify={'center'} style={{ height: '100vh' }} className="login_row">
                <Card style={{ width: 800 }} className="login_card">
                    <div className="login_card__header">
                        <div className="login_card__header_logo">
                            <img src="/logo/login_header.png" alt="" />
                        </div>
                        <div className="login_card__header_title">
                            <h1>Welcome</h1>
                            <p>Please enter your contact details to connect</p>
                        </div>
                    </div>
                    <div className="login_form">
                        <Form name="LoginForm" layout="vertical" autoComplete="on" onFinish={onFinish}>
                            <Form.Item
                                name="Username"
                                label="Username"
                                rules={[{ required: true, message: 'Please enter account information' }]}
                                className="login_form__item"
                            >
                                <Input
                                    placeholder="Enter your email"
                                    autoComplete="false"
                                    value={email}
                                    onChange={onChangeEmail}
                                />
                            </Form.Item>

                            <Form.Item
                                name="Password"
                                label="Password"
                                rules={[{ required: true, message: 'Please enter account information' }]}
                                className="login_form__item"
                            >
                                <Input.Password
                                    placeholder="Enter your password"
                                    autoComplete="false"
                                    value={password}
                                    onChange={onChangePassword}
                                />
                            </Form.Item>

                            <Form.Item style={{ textAlign: 'end' }}>
                                <p>Forgot password</p>
                            </Form.Item>

                            <Form.Item className="login_form__item">
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    style={{
                                        width: '100%',
                                        height: 50,
                                        backgroundColor: '#002060',
                                        borderRadius: 12,
                                        fontSize: 18,
                                    }}
                                >
                                    Sign in
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="login_card__footer">
                        <div className="login_card__footer_logo">
                            <img src="/logo/login_footer.png" alt="" />
                        </div>
                        <div className="login_card__footer_title">
                            <p>Copyright PinnacleQM 2014 - 2022. All Rights Reserved</p>
                        </div>
                    </div>
                </Card>
            </Row>
        </div>
    );
}

export default Login;
