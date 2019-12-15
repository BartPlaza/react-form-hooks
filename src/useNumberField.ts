import useField from "./useField";
import {Form} from "./useForm";

const useNumberField = (form: Form, name: string, defaultValue: number = 0) => {
    return useField(form, name, defaultValue);
};

export default useNumberField;