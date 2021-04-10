import { Input, Form, Button } from 'antd';
import React, { useCallback } from 'react';
import { useLocation } from 'wouter';

import { HOME } from '~/constants/Routes';
import { Container, Card } from '~/components/common/styled';
import { authenticateUser } from '~/helpers/auth';

const EMAIL_REGEXP = /^\w+@\w+\.\w{2,3}$/;

const EMAIL_VALIDATION_RULES = [
    { required: true, message: 'This field is required' },
    { pattern: EMAIL_REGEXP, message: 'Please enter valid email' },
];

const PASSWORD_VALIDATION_RULES = [
    { required: true, message: 'This field is required' },
    { min: 6, message: 'Password must contain more than 6 symbols' },
    { min: 20, message: 'Password must contain less than 20 symbols' },
];

export const Login = () => {
    const [, setLocation] = useLocation();

    const handleSubmit = useCallback(
        async (values) => {
            await authenticateUser.run(values);

            setLocation(HOME);
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
                        rules={EMAIL_VALIDATION_RULES}
                    >
                        <Input placeholder="example@mail.com" type="text" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={PASSWORD_VALIDATION_RULES}
                    >
                        <Input placeholder="Password" type="password" />
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
