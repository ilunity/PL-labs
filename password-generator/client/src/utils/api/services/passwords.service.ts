import axios from "axios";
import {GeneratePasswordArgs, GeneratePasswordResponse} from "./passwords.service.types.ts";

const SERVER_URL = import.meta.env.VITE_SERVER_URL + '/passwords';

class PasswordsService {
    generate = async (args: GeneratePasswordArgs): GeneratePasswordResponse => {
        const response = await axios.post(`${SERVER_URL}/generate`, args);
        return response;
    };
}

export const passwordsService = new PasswordsService();
