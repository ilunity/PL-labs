import React from 'react';
import {PasswordItemProps} from './PasswordItem.types';
import {Typography} from "antd";

export const PasswordItem: React.FC<PasswordItemProps> = ({password}) => {
    return (
        <Typography.Title
            level={5}
            style={{
                padding:5,
                border: '1px solid black',
                borderRadius: 5,
                textAlign: 'center',
                margin: 0,
            }}
        >
            {password}
        </Typography.Title>
    );
};
