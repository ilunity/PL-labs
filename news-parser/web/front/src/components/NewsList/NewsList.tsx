import React from 'react';
import {NewsListProps} from './NewsList.types';
import {Flex, Typography} from "antd";
import {NewsItem} from "../NewsItem";
import {NEWS_TYPES} from "../../utils/api.types.ts";

const newsType2Name = {
    [NEWS_TYPES.NEW_YORK_TIMES]: 'NEW YORK TIMES',
    [NEWS_TYPES.WASHINGTON_POST]: 'WASHINGTON POST',
    [NEWS_TYPES.LOS_ANGELES_POST]: 'LOS ANGELES POST',
}

export const NewsList: React.FC<NewsListProps> = ({news, newsType}) => {
    return (
        <Flex
            vertical
            style={{
                width: 400,
            }}
        >
            <Typography.Title level={2}>
                {newsType2Name[newsType]}
            </Typography.Title>
            {news[newsType].map(newsItem => (
                <NewsItem key={newsItem.url} newsItem={newsItem}/>
            ))}
        </Flex>
    );
};
