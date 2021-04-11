import { Button, Form, Input, message, Select, Typography } from 'antd';
import React, { useCallback, useState } from 'react';
import { useLocation } from 'wouter';

import { USERS } from '~/constants/Routes';
import { EMAIL_VALIDATION_RULES } from '~/constants/validationRules';
import { createNewUser } from '~/helpers/users';

const PASSWORD_REGEXP = /^(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.*(.)\1\1)[\w\W]{6,20}$/;

const PASSWORD_VALIDATION_RULES = [
    { required: true, message: 'This field is required' },
    { pattern: PASSWORD_REGEXP, message: "Your password isn't strong enough" },
];

const ROLE_OPTIONS = [
    { label: 'Admin', value: 1 },
    { label: 'Manager', value: 2 },
    { label: 'User', value: 3 },
];

export const UsersCreation = () => {
    const [, setLocation] = useLocation();
    const [emailError, setEmailError] = useState('');

    const handleSubmit = useCallback(async (values) => {
        setEmailError('');

        const result = await createNewUser.run(values);

        if (!result.error) {
            message.success('User was successfully created!');
            setLocation(USERS);
        } else {
            if (result.message?.toLowerCase()?.includes('email')) {
                setEmailError(result.message);
            }
            message.error('Cannot create new user');
        }
    }, []);

    return (
        <div style={{ width: 600 }}>
            <Typography.Title level={2}>User creation</Typography.Title>
            <Form
                size="large"
                layout="vertical"
                validateTrigger="onBlur"
                onFinish={handleSubmit}
                initialValues={{ role_id: 3 }}
            >
                <Form.Item
                    label="User display name"
                    rules={[{ required: true }, { min: 3 }]}
                    name="name"
                    required
                >
                    <Input placeholder="Name" />
                </Form.Item>
                <Form.Item
                    label="Email"
                    required
                    rules={EMAIL_VALIDATION_RULES}
                    name="email"
                    extra={
                        emailError && (
                            <Typography.Text type="danger">
                                {emailError}
                            </Typography.Text>
                        )
                    }
                >
                    <Input placeholder="example@mail.com" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    required
                    rules={PASSWORD_VALIDATION_RULES}
                    name="password"
                >
                    <Input.Password placeholder="strong password" />
                </Form.Item>
                <Form.Item label="Role" name="role_id" required>
                    <Select
                        placeholder="Please select user role"
                        options={ROLE_OPTIONS}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
