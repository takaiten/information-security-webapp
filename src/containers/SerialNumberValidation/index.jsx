import { Button, Form, Typography } from 'antd';
import MaskedInput from 'antd-mask-input';
import React, { useCallback, useState } from 'react';
import { useLocation } from 'wouter';

import { Card, Container } from '~/components/common/styled';
import { LOGIN } from '~/constants/Routes';
import { validateSerialNumber } from '~/helpers/serialNumber';

const SERIAL_NUMBER_VALIDATION_RULES = [
    { required: true, message: 'This field is required' },
    {
        pattern: /^(\w{4}-){3}\w+$/,
        message: 'Serial number must contain exactly 16 alphanumeric symbols',
    },
];

export const SerialNumberValidation = () => {
    const [, setLocation] = useLocation();
    const [apiError, setApiError] = useState('');

    const handleSubmit = useCallback(
        async (values) => {
            setApiError('');
            const result = await validateSerialNumber.run({
                serialNumber: values['serialNumber'].replace(/-/g, ''),
            });
            if (result.error) {
                setApiError(result.message);
                return;
            }
            setLocation(LOGIN);
        },
        [setLocation],
    );

    return (
        <Container>
            <Card>
                <Form
                    size="large"
                    layout="vertical"
                    name="serialNumberForm"
                    validateTrigger="onBlur"
                    requiredMark={false}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="serialNumber"
                        label="Please enter serial number"
                        tooltip="Unique key composed of 16 symbols"
                        rules={SERIAL_NUMBER_VALIDATION_RULES}
                        extra={
                            apiError && (
                                <Typography.Text type="danger">
                                    {apiError}
                                </Typography.Text>
                            )
                        }
                    >
                        <MaskedInput
                            mask="####-####-####-####"
                            placeholder="ABCD-EFGH-KLMN-OPQR"
                        />
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
