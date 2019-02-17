import React, {useState, useCallback, useEffect} from 'react';
import _omit from 'lodash.omit';

const useForm = (submitAction) => {
    const [fields, setFields] = useState({});
    const [validators, setValidators] = useState({});
    const [errors, setErrors] = useState({});
    const [activity, setActivates] = useState({});
    const [isSending, setIsSending] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(()=>{
        console.log('is initialized');
    },[isInitialized]);

    const setField = (key, value) => {
        setFields((prevFields) => ({...prevFields, [key]: value}));
    };

    const setValidator = (key, array) => {
        setValidators((prevValidators) => ({...prevValidators, [key]: array}));
    };

    const setError = (key, error) => {
        setErrors((prevErrors) => ({...prevErrors, [key]: error}));
    };

    const setActivity = (key, isActive) => {
        setActivates((prevActivities) => ({...prevActivities, [key]: isActive}));
    };

    const onChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setField(target.name, value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        clearErrors();
        const activeFields = _omit(fields, getInactiveKeys());
        const isValid = Object.keys(validators).length === 0 || checkIsValid();
        if (isValid) {
            setIsSending(true);
            submitAction(activeFields);
        }
    };

    const clearErrors = () => setErrors({});

    const checkIsValid = () => {
        const activeValidators = _omit(validators, getInactiveKeys());
        let isValid = true;
        Object.keys(activeValidators).forEach((key) => {
            const rules = activeValidators[key];
            rules.forEach((rule) => {
                const error = rule(fields[key]);
                if(error){
                    isValid = false;
                    setError(key, error);
                }
            });
        });
        return isValid;
    };

    const getInactiveKeys = () => {
        return Object.keys(fields).filter((key) => activity[key] === false);
    };

    return {
        fields: fields,
        errors: errors,
        activity: activity,
        isSending: isSending,
        setField: setField,
        setValidator: setValidator,
        setError: setError,
        setActivity: setActivity,
        onChange: onChange,
        onSubmit: onSubmit,
        isInitialized: isInitialized,
        setIsInitialized: setIsInitialized
    };
};

export default useForm;