import React, {useEffect} from 'react';
import useField from './useField';

const useOptionalField = (form, name, defaultValue, validators = []) => {
    const field = useField(form, name, defaultValue, validators);

    useEffect(() => {
        const currentRef = field.reference.current;
        const isActive = form.activity[name];
        if (currentRef === null && isActive) {
            form.setActivity(name, false);
        } else if (currentRef !== null && !isActive) {
            form.setActivity(name, true);
        }
    });
    return field;
};

export default useOptionalField;