import * as yup from 'yup';

export const createEmployeeSchema = yup.object().shape({
  email: yup.string().default('').trim().required('Please enter this field!'),
  phoneNumber: yup.string().default('').trim().required('Please enter this field!'),
});

export type CreateEmployeeInput = yup.InferType<typeof createEmployeeSchema>;
