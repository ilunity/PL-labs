import React from 'react';
import {PasswordsListProps} from './PasswordsList.types';
import {Button, Flex, Typography} from "antd";
import {PasswordItem} from "../PasswordItem";

export const PasswordsList: React.FC<PasswordsListProps> = ({passwords, goBack}) => {
    return (
        <Flex
            vertical
            gap={10}
            style={{
                width: 400,
                marginTop: 20
            }}
        >
            <Typography.Title level={2}>
                Сгенерированные пароли:
            </Typography.Title>
            <Button
                type={'primary'}
                onClick={goBack}
                style={{marginBottom: 10}}
            >
                Вернуться назад
            </Button>
            {passwords.map((password, index) => (<PasswordItem key={index} password={password}/>))}
        </Flex>
    );
};
