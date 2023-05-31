import * as yup from "yup";
const errMess = {
  req: "Debe completar este campo",
};

export const homeSchema = yup.object().shape({
  oficial: yup.string().required("Seleccione un oficial"),
  sucursal: yup.string().required("Seleccione una sucursal"),
  especialista: yup.string().required("Seleccione un especialista"),
});
