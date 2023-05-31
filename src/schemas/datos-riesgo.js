import * as yup from "yup";
const errMess = {
  req: "Debe completar este campo",
};

export const riesgoSchema = yup.object().shape({
  cp: yup.string().transform((_value, originalValue) => {
    let newValue = "";
    if (originalValue.includes("_ ")) {
      newValue = originalValue.replace(/\_ /g, "");
    }
    newValue = originalValue;
    return newValue;
  }),
  actividadComercial: yup
    .string()
    .required("Seleccione la actividad comercial."),
  metros: yup
    .number()
    .required("Ingrese los metros cuadrados.")
    .transform((_value, originalValue) => {
      if (originalValue.includes(".")) {
        const newValue = Number(originalValue.replace(/\./g, ""));
        return newValue;
      }
      const newValue = Number(originalValue);
      return newValue;
    })
    .moreThan(9, "El mínimo son 10 metros cuadrados.")
    .lessThan(601, "El maximo son 600 metros cuadrados."),
});
