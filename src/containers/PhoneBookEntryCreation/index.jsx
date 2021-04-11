import { Button, Form, Input, message, Typography } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import React, { useCallback } from 'react';
import { useLocation } from 'wouter';

import { PHONEBOOK } from '~/constants/Routes';
import { createPhoneBookEntry } from '~/helpers/phoneBook';

export const PhoneBookEntryCreation = () => {
    const [, setLocation] = useLocation();

    const handleSubmit = useCallback(async (values) => {
        const result = await createPhoneBookEntry.run(values);

        if (!result.error) {
            message.success('PhoneBook entry was successfully created!');
            setLocation(PHONEBOOK);
        } else {
            message.error("Couldn't create PhoneBook entry");
        }
    }, []);

    return (
        <div style={{ width: 600 }}>
            <Typography.Title level={2}>
                PhoneBook entry creation
            </Typography.Title>
            <Form
                size="large"
                layout="vertical"
                validateTrigger="onBlur"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Entry name"
                    rules={[{ required: true }, { min: 3 }]}
                    name="name"
                    required
                >
                    <Input placeholder="Name" />
                </Form.Item>
                <Form.Item
                    label="Phone number"
                    rules={[
                        { required: true },
                        {
                            pattern: /\+\d \(\d{3}\) \d{3}-\d\d-\d\d/,
                            message: 'Please enter valid phone number',
                        },
                    ]}
                    name="telephone"
                >
                    <MaskedInput
                        mask="+7 (111) 111-11-11"
                        placeholder="+7 (999) 123-45-67"
                    />
                </Form.Item>
                <Form.Item
                    label="Address"
                    required
                    rules={[{ required: true }, { min: 3 }]}
                    name="address"
                >
                    <Input placeholder="Some address" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
