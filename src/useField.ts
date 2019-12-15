import * as React from 'react';
import {Field, Form} from "./useForm";

const useField = (form: Form, name: string, defaultValue: string = '', validators: Array<any> = []) => {

    const ref = React.useRef(null);

    React.useEffect(() => {
        form.setField(name, defaultValue);
        form.setActivity(name, true);
       /* if (validators.length) {
            form.setValidator(name, validators);
        }*/
    }, []);

/*    React.useEffect(() => {
        if (ref.current && typeof form.fields[name] !== 'undefined' && form.fields[name] != ref.current.value) {
            form.setField(name, ref.current.value);
        }
    });*/

    const field: Field = {
        name: name,
        value: form.fields[name],
        error: form.errors[name],
        onChange: form.onChange,
        setField: (value: string) => form.setField(name, value),
        reference: ref
    };

    return field;
};

export default useField;