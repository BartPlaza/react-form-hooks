import * as React from 'react';
import {AllowedFieldTypes, Form} from "./useForm";
import {RefObject, useMemo} from "react";


export type Field<G extends AllowedFieldTypes> = {
    name: string
    value: G
    error: string
    onChange(event: React.FormEvent): void
    setField: Function
    reference: RefObject<HTMLInputElement>
}

const useField = (form: Form, name: string, defaultValue: AllowedFieldTypes): Field<AllowedFieldTypes> => {

    const ref = React.useRef(null);

    React.useEffect(() => {
        form.setField(name, defaultValue);
        form.setActivity(name, true);
       /* if (validators.length) {
            form.setValidator(name, validators);
        }*/
    }, []);

    const setField = (value: string) => {
        form.setField(name, value);
    };

    const field: Field<AllowedFieldTypes> = {
        name: name,
        value: form.fields[name],
        error: form.errors[name],
        onChange: form.onChange,
        setField: setField,
        reference: ref
    };

    return useMemo(() => {
        return field;
    },[form.fields[name], form.errors[name]]);
};

export default useField;