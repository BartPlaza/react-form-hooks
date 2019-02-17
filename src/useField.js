import React, {useEffect, useRef, useLayoutEffect} from 'react';

const useField = (form, name, defaultValue = '', validators = []) => {

    const ref = useRef(null);

    useEffect(() => {
        console.log('field initialized');
        form.setField(name, defaultValue);
        form.setActivity(name, true);
        if (validators.length) {
            form.setValidator(name, validators);
        }
    }, []);

    useEffect(() => {
        if(ref.current && typeof form.fields[name] !== 'undefined' && form.fields[name] != ref.current.value){
            form.setField(name, ref.current.value);
        }
    });

    return {
        name: name,
        value: form.fields[name],
        error: form.errors[name],
        onChange: form.onChange,
        ref: ref
    };
};

export default useField;