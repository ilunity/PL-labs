import {GeneratePasswordArgs} from "../../utils/api/passwords.service.types.ts";

export type CreatePasswordFieldType = GeneratePasswordArgs;

export interface CreatePasswordFormProps {
    onSubmit: (values: CreatePasswordFieldType) => void;
}
