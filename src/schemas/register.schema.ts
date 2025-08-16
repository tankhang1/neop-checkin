import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  fullName: yup.string().default('').trim().required('Please enter this field!'),
  email: yup.string().default('').trim().required('Please enter this field!'),
  phoneNumber: yup.string().default('').trim().required('Please enter this field!'),
  password: yup.string().default('').trim().required('Please enter this field!'),
});

export type RegisterInput = yup.InferType<typeof registerSchema>;
