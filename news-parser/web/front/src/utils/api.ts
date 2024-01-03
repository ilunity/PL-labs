import axios from 'axios';
import {ParserNewsResponse} from './api.types.ts';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

class Api {
    getNews = async (): ParserNewsResponse => {
        const response = await axios.get(`${SERVER_URL}/parser/`);
        return response;
    };
}

export const api = new Api();
