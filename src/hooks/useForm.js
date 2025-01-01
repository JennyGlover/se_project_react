import { useState } from "react";


function useForm(initialValues) {
    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
        // getting the name and value of the input because event.target is the input
        const { value, name } = e.target;
        // setting the value into the object using the name
        setValues({ ...values, [name]: value });
    };

    //resetting form values
    const resetForm = () => {
        setValues(initialValues);
    };

    return { values, handleChange, resetForm };
}


export default useForm;