import React, {useEffect, useState} from 'react';
import useField from './useField';

const useOptionalField = (form, name, defaultValue) => {
    const field = useField(form, name, defaultValue);

    useEffect(() => {
        const currentRef = field.ref.current;
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