import React, {useState} from 'react';
import {CreatePasswordForm} from "../CreatePasswordForm";
import {Flex, message} from "antd";
import {CreatePasswordFieldType} from "../CreatePasswordForm/CreatePasswordForm.types.ts";
import {executeRequest} from "../../utils/api/execute-request.ts";
import {passwordsService} from "../../utils/api/services/passwords.service.ts";
import {PasswordsList} from "../PasswordsList";

export const App: React.FC = () => {
    const [passwords, setPasswords] = useState<string[]>([]);

    const handleCreatePassword = async (values: CreatePasswordFieldType) => {
        const {success, data, error} = await executeRequest(() => passwordsService.generate(values));

        if (success) {
            return setPasswords(data);
        }

        message.error(error);
    }

    return (
        <Flex
            justify={'space-around'}
            align={'flex-start'}
            style={{minHeight: '100vh'}}
        >
            {passwords.length
                ? <PasswordsList
                    passwords={passwords}
                    goBack={() => setPasswords([])}
                />
                : <CreatePasswordForm onSubmit={handleCreatePassword}/>
            }
        </Flex>
    );
};
