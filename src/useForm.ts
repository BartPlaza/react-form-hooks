import * as React from 'react';
import _omit from 'lodash.omit';


export type Field = {
    name: string
    value: string | boolean
    error: string
    onChange: Function
    setField: Function
    reference: React.Ref<HTMLElement>
}

type Fields = {
    [key: string]: string | boolean
}

type Errors = {
    [key: string]: string
}

type Activity = {
    [key: string]: boolean
}


export type Form = {
    fields: Fields
    errors: Errors
    activity: Activity
    isSending: boolean
    setField(key: string, value: string): void
    // setValidator(key: string, value: Array<any>): void
    setError(key: string, value: string): void
    setActivity(key: string, value: boolean): void
    onChange(event: React.FormEvent): void
    onSubmit(event: React.FormEvent): void
}

type useFormProps = {
    submitAction: Function
}


const useForm = (props: useFormProps) => {

    const {submitAction} = props;

    const [fields, setFields] = React.useState<Fields>({});
    const [errors, setErrors] = React.useState<Errors>({});
    const [activity, setActivates] = React.useState<Activity>({});
    // const [validators, setValidators] = React.useState<object>({});
    const [isSending, setIsSending] = React.useState<boolean>(false);

    const setField = (key:string, value: string | boolean) => {
        setFields((prevFields: object) => ({...prevFields, [key]: value}));
    };

    /*const setValidator = (key: string, array: Array<any>) => {
        setValidators((prevValidators: object) => ({...prevValidators, [key]: array}));
    };*/

    const setError = (key: string, error: string) => {
        setErrors((prevErrors: object) => ({...prevErrors, [key]: error}));
    };

    const setActivity = (key: string, isActive: boolean) => {
        setActivates((prevActivities: object) => ({...prevActivities, [key]: isActive}));
    };

    const onChange = (event: React.FormEvent) => {
        const target = event.target as HTMLInputElement;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setField(target.name, value);
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        const activeFields = _omit(fields, getInactiveKeys());
        /*const isValid = Object.keys(validators).length === 0 || checkIsValid();
        if (isValid) {*/
            setIsSending(true);
            submitAction(activeFields);
        //}
    };

    const clearErrors = () => setErrors({});

    /*const checkIsValid = () => {
        const activeValidators = _omit(validators, getInactiveKeys());
        let isValid = true;
        Object.keys(activeValidators).forEach((key) => {
            const rules = activeValidators[key];
            rules.forEach((rule: Function) => {
                const error = rule(fields[key]);
                if (error) {
                    isValid = false;
                    setError(key, error);
                }
            });
        });
        return isValid;
    };*/

    const getInactiveKeys = () => {
        return Object.keys(fields).filter((key) => !activity[key]);
    };

    const form: Form = {
        fields: fields,
        errors: errors,
        activity: activity,
        isSending: isSending,
        setField: setField,
        // setValidator: setValidator,
        setError: setError,
        setActivity: setActivity,
        onChange: onChange,
        onSubmit: onSubmit,
    };

    return form;
};

export default useForm;