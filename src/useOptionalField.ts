import {useEffect} from 'react';
import useField, {Field} from './useField';
import {AllowedFieldTypes, Form} from "./useForm";

const useOptionalField = (form: Form, name: string, defaultValue: AllowedFieldTypes): Field<AllowedFieldTypes> => {

    const field = useField(form, name, defaultValue);

    useEffect(() => {
        const currentRef: HTMLElement | null = field.reference && field.reference.current;
        const isActive = form.activity[field.name];
        if (currentRef === null && isActive) {
            form.setActivity(field.name, false);
        } else if (currentRef !== null && !isActive) {
            form.setActivity(field.name, true);
        }
    });
    return field;
};

export default useOptionalField;