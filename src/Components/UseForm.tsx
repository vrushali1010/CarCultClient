import { BaseSyntheticEvent, useState } from "react";
import validator from "validator";

export function useForm(initialValues: any) {
  const [values, setValues] = useState(initialValues);

  const handleInput = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validateMobile = (mobile: string) => {
    return validator.isMobilePhone(mobile, "en-IN");
  };
  return {
    values,
    setValues,
    handleInput,
    validateMobile,
  };
}
