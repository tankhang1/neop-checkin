import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().default('').trim().required('Please enter this field!'),
  password: yup.string().default('').trim().required('Please enter this field!'),
});

export type LoginInput = yup.InferType<typeof loginSchema>;
