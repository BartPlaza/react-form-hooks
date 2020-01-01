import {Field} from './useField';
import * as React from "react";
import {ExoticComponent} from "react";
import {AllowedFieldTypes} from "./useForm";

const AsFormField = (field: Field<AllowedFieldTypes>) => {
    return (Component: ExoticComponent<any>) => {
        return <Component {...field}/>
    }
};

export default AsFormField;