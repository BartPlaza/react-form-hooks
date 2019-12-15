import useField from "./useField";
import {Form} from "./useForm";

const useCheckboxField = (form: Form, name: string, defaultValue: boolean = true) => {
    return useField(form, name, defaultValue);
};

export default useCheckboxField;