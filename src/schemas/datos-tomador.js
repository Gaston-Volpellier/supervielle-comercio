import * as yup from "yup";
const errMess = {
  req: "Debe completar este campo",
};

export const tomadorSchema = yup.object().shape({
  destinatario: yup.string().required("Debe incluir destinatario"),
  razonSocial: yup.string().required("Debe incluir la razon social."),
  cuit: yup.string().required("Debe ingresar el numero de CUIT/CUIL/CDI"),
  iva: yup.string().required("Seleccione una opcion"),
  iibb: yup.string().required("Seleccione una opcion"),
  email: yup.string().required("Ingrese un email").email("Not an email"),
  codigoArea: yup
    .string()
    .required("Ingrese un numero de codigo de area.")
    .min(2, "El codigo de area debe ser de al menos 2 digitos.")
    .max(4, "El codigo de area debe ser de hasta 4 digitos."),
  telefono: yup
    .string()
    .required("Ingrese un numero de telefono.")
    .min(7, "El numero debe ser de al menos 6 digitos.")
    .max(9, "El numero debe ser de hasta 8 digitos."),
  domicilio: yup.string().required("Ingrese el domicilio."),
  pais: yup.string().required("Seleccione el pais."),
  localidad: yup.string().required("Seleccione la localidad."),
  provincia: yup.string().required("Seleccione la provincia."),
});
