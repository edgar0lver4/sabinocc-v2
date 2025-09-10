import * as Yup from 'yup';
const RegisterClientSchema = Yup.object().shape({
  name: Yup.string().required('Campo requerido'),
  email: Yup.string().email('Correo no válido').required('Campo requerido'),
  phone: Yup.string()
    .min(10, 'Numero inválido')
    .max(10, 'Numero inválido')
    .required('Campo requerido'),
});

export default RegisterClientSchema;
