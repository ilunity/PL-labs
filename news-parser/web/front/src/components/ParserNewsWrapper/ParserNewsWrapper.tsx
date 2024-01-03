import React from 'react';
import {ParserNewsWrapperProps} from './ParserNewsWrapper.types';
import {Flex} from "antd";
import {NEWS_TYPES} from "../../utils/api.types.ts";
import {NewsList} from "../NewsList";

export const ParserNewsWrapper: React.FC<ParserNewsWrapperProps> = ({news}) => {
    return (
        <Flex
            gap={30}
            justify={'space-between'}
        >
            {Object.values(NEWS_TYPES).map(newsType => (
                <NewsList key={newsType} news={news} newsType={newsType}/>
            ))}
        </Flex>
    );
};
