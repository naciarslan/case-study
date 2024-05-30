import { useState } from "react";

const useFormValidation = (initialState, validationRules) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validate = () => {
    let newErrors = {};
    for (const key in validationRules) {
      if (validationRules.hasOwnProperty(key)) {
        const rules = validationRules[key];
        for (const rule of rules) {
          if (rule.validate(values[key]) !== true) {
            newErrors[key] = rule.message;
            break;
          }
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    values,
    errors,
    handleChange,
    validate,
  };
};

export default useFormValidation;
