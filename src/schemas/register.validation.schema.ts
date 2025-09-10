import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Campo Requerido'),
  phone: Yup.string()
    .min(10, 'Numero inválido')
    .max(10, 'Numero inválido')
    .required('Campo requerido'),
  email: Yup.string().email('Correo no válido').required('Campo requerido'),
  password: Yup.string()
    .min(8, 'El password debe contener al menos 8 caracteres')
    .max(15, 'El password debe contener como máximo 15 caracteres')
    .matches(/[A-Z]/, 'El password debe contener al menos una letra mayúscula')
    .matches(/[a-z]/, 'El password debe contener al menos una letra minúscula')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'El password debe contener al menos un carácter especial',
    )
    .required('Campo requerido'),
  customer_id: Yup.string().required('Campo requerido'),
});

export default RegisterSchema;
