import React from 'react';
import {CreatePasswordFieldType, CreatePasswordFormProps} from './CreatePasswordForm.types';
import {Button, Flex, Form, FormRule, Input, Typography} from "antd";

const rules: FormRule[] = [{required: true, message: 'Поле необходимо заполнить'}]

export const CreatePasswordForm: React.FC<CreatePasswordFormProps> = ({onSubmit}) => {
    return (
        <Flex vertical>
            <Typography.Title
                level={1}
                style={{marginTop: 200}}
            >
                Генератор паролей
            </Typography.Title>
            <Form
                name="upload-file"
                onFinish={onSubmit}
                style={{width: 400}}
            >
                <Form.Item<CreatePasswordFieldType> name="symbols" rules={rules}>
                    <Input placeholder="Набор символов"/>
                </Form.Item>
                <Form.Item<CreatePasswordFieldType> name="length" rules={rules}>
                    <Input type={'number'} placeholder="Длина генерируемых паролей"/>
                </Form.Item>
                <Form.Item<CreatePasswordFieldType> name="count" rules={rules}>
                    <Input type={'number'} placeholder="Количество паролей"/>
                </Form.Item>
                <Form.Item<CreatePasswordFieldType>>
                    <Button block type="primary" htmlType="submit">
                        Сгенерировать
                    </Button>
                </Form.Item>
            </Form>
        </Flex>
    );
};
