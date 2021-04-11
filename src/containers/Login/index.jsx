import { Button, Form, Input, Typography } from 'antd';
import React, { useCallback, useState } from 'react';
import { useLocation } from 'wouter';

import { Card, Container } from '~/components/common/styled';
import { PHONEBOOK } from '~/constants/Routes';
import { authenticateUser } from '~/helpers/auth';

const EMAIL_REGEXP = /^\w+@\w+\.\w{2,3}$/;

const EMAIL_VALIDATION_RULES = [
    { required: true, message: 'This field is required' },
    { pattern: EMAIL_REGEXP, message: 'Please enter valid email' },
];

const PASSWORD_VALIDATION_RULES = [
    { required: true, message: 'This field is required' },
    { min: 6, message: 'Password must contain more than 6 symbols' },
    { max: 20, message: 'Password must contain less than 20 symbols' },
];

export const Login = () => {
    const [, setLocation] = useLocation();
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = useCallback(
        async (values) => {
            setEmailError('');
            setPasswordError('');

            const result = await authenticateUser.run(values);
            if (result.error) {
                if (result.message.includes('email')) {
                    setEmailError(result.message);
                }
                if (result.message.includes('password')) {
                    setPasswordError(result.message);
                }
                return;
            }
            setLocation(PHONEBOOK);
        },
        [setLocation],
    );

    return (
        <Container>
            <Card>
                <Form
                    size="large"
                    layout="vertical"
                    name="loginForm"
                    validateTrigger="onBlur"
                    requiredMark={false}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        extra={
                            emailError && (
                                <Typography.Text type="danger">
                                    {emailError}
                                </Typography.Text>
                            )
                        }
                        rules={EMAIL_VALIDATION_RULES}
                    >
                        <Input placeholder="example@mail.com" type="text" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        extra={
                            passwordError && (
                                <Typography.Text type="danger">
                                    {passwordError}
                                </Typography.Text>
                            )
                        }
                        rules={PASSWORD_VALIDATION_RULES}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Container>
    );
};
