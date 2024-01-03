import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {ParserNews} from "../../utils/api.types.ts";
import {executeRequest} from "../../utils/execute-request.ts";
import {api} from "../../utils/api.ts";
import {Layout, Typography} from "antd";
import {ParserNewsWrapper} from "../ParserNewsWrapper";


const {Header, Content} = Layout

const requestNews = async (setNews: Dispatch<SetStateAction<ParserNews | null>>) => {
    const {success, data} = await executeRequest(api.getNews);

    if (success) {
        setNews(data);
    }

    return success;
}

export const App: React.FC = () => {
    const [news, setNews] = useState<ParserNews | null>(null);

    useEffect(() => {
        requestNews(setNews);
        const interval = setInterval(async () => {
            const success = await requestNews(setNews);

            if (success) {
                return;
            }

            clearInterval(interval);
        }, 10_000);


        return () => clearInterval(interval);
    }, []);

    return (
        <Layout
            style={{
                minHeight: '100vh',
                width: '100%',
            }}
        >
            <Header
                style={{
                    backgroundColor: '#4096ff',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Typography.Title
                    level={1}
                    style={{color: '#fff', marginBottom: 0}}
                >
                    News Parser
                </Typography.Title>
            </Header>
            <Content style={{
                flex: '1 0 auto',
                padding: '40px',
            }}>
                {news &&
                    <ParserNewsWrapper news={news}/>
                }
            </Content>
        </Layout>
    );
};
