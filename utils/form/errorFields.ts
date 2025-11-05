import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { IError } from "@/store/types";

const setErrorsFields = <F extends FieldValues>(
  form: UseFormReturn<F>,
  { errors }: IError,
  prefix?: string
) => {
  Object.entries(errors).forEach(([key, value]) => {
    const fieldName = prefix ? `${prefix}.${key}` : key;
    form.setError(fieldName as FieldPath<F>, { message: value[0] });
  });
};

export { setErrorsFields };
