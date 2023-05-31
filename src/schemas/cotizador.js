import * as yup from "yup";

export const creditCardSchema = yup.object().shape({
  creditCard: yup.string().required("Seleccione un medio de pago"),
  cardNumber: yup
    .string()
    .transform((_value, originalValue) => {
      let newValue = "";
      if (originalValue.includes("_ ")) {
        newValue = originalValue.replace("_ ", "");
      }
      newValue = originalValue;
      return newValue;
    })
    .required("Ingrese el numero de la tarjeta.")
    .when("creditCard", {
      is: (val) => {
        return val == 1 || val == 2;
      },
      then: (schema) => schema.matches(/^4/, "Debe comenzar con un 4"),
      otherwise: (schema) => schema.matches(/^5/, "Debe comenzar con un 5"),
    })
    .length(19, "El numero es de 16 cifras."),
  cardExpiry: yup
    .string()
    .required("Ingrese fecha de vencimiento.")
    .length(5, "Ingrese formato MM/AA.")
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Formato de fecha invalido."),
});
