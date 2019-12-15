import useField from "./useField";
import {Form} from "./useForm";

const useTextField = (form: Form, name: string, defaultValue: string = '') => {
    return useField(form, name, defaultValue);
};

export default useTextField;