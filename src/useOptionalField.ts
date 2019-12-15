import {useEffect} from 'react';
import {Field} from './useField';
import {Form} from "./useForm";

const useOptionalField = (form: Form, field: Field) => {

    useEffect(() => {
        console.log(field.reference);
        const currentRef: HTMLElement | null = field.reference && field.reference.current;
        const isActive = form.activity[field.name];
        console.log('isActive', isActive);
        console.log('currentRef', currentRef);
        if (currentRef === null && isActive) {
            form.setActivity(field.name, false);
        } else if (currentRef !== null && !isActive) {
            form.setActivity(field.name, true);
        }
    });
    return field;
};

export default useOptionalField;