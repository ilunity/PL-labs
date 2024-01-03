import React from 'react';
import {NewsItemProps} from './NewsItem.types';
import {Flex, Typography} from "antd";
import Link from "antd/es/typography/Link";


export const NewsItem: React.FC<NewsItemProps> = ({newsItem}) => {
    const {title, content, url} = newsItem;

    return (
        <Flex
            vertical
            gap={10}
            style={{
                borderBottom: '1px solid black',
                padding: 5,
                paddingTop: 15,
            }}
        >
            <Typography.Title level={3}>
                {title}
            </Typography.Title>
            <Typography>
                {content}
            </Typography>
            <Link href={url} target="_blank">
                Origin
            </Link>
        </Flex>
    );
};
