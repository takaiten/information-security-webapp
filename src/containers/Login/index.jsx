import { Input, Form, Button } from 'antd';
import React, { useCallback } from 'react';
import { useLocation } from 'wouter';

import { AppStore } from '~/services/store';

import { APP } from '~/constants/Routes';
import { AUTH_TOKEN_KEY } from '~/constants/auth';
import { Container, Card } from '~/components/common/styled';

const EMAIL_REGEXP = /^\w+@\w+\.\w{2,3}$/;
const PASSWORD_REGEXP = /^(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.*(.)\1\1)[\w\W]{6,20}$/;

const EMAIL_VALIDATION_RULES = [
    { required: true, message: 'This field is required' },
    { pattern: EMAIL_REGEXP, message: 'Please enter valid email' },
];

const PASSWORD_VALIDATION_RULES = [
    { required: true, message: 'This field is required' },
    { pattern: PASSWORD_REGEXP, message: "Password isn't strong enough" },
];

const PASSWORD_TOOLTIP = `
Password must contain:
6-20 symbols;
At least one of each:
        capital letter;
        numeric number;
        special symbol (!,$,^...).
`;

export const Login = () => {
    const [, setLocation] = useLocation();

    const handleSubmit = useCallback(
        (values) => {
            console.log(values);
            localStorage.setItem(AUTH_TOKEN_KEY, values['serialNumber']);
            AppStore.update((s) => {
                s.isAuthenticated = true;
            });
            setLocation(APP);
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
                        tooltip={PASSWORD_TOOLTIP}
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
