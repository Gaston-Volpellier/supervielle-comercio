import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { PatternFormat } from "react-number-format";
import styles from "@/styles/pages/Cotizador.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { creditCardSchema } from "@/schemas/cotizador";
import { usePolicy } from "util/policy-provider";

function PaymentDrawer(props) {
  const { showDrawer, closeDrawer, setPayment, creditCards } = props;

  const {
    payment,
    cardNumber,
    expiration,
    handlePayment,
    handleCardNumber,
    handleExpiration,
  } = usePolicy();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(creditCardSchema),
  });

  const submitForm = async (data) => {
    setPayment(true);
    closeDrawer();
  };

  const onError = (errors, e) => {
    console.log("Error! ", errors, e);
  };

  return (
    <>
      <Offcanvas
        show={showDrawer}
        onHide={closeDrawer}
        placement="end"
        className={styles.drawer}
      >
        <Offcanvas.Header closeButton className={styles.canvasHeader}>
          <Offcanvas.Title className={styles.titleBold}>
            Método de Pago
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={styles.canvasBody}>
          <Form className="h-100" onSubmit={handleSubmit(submitForm, onError)}>
            <Container className="d-flex flex-column h-100 p-0">
              <div className={styles.drawerGroup}>
                Para emitir necesitas ingresar los datos de Método de pago.
              </div>
              <div className={styles.drawerGroup}>
                <Col>
                  <Form.Group>
                    <Form.Label className={`${styles.titleSmallBold} `}>
                      Medio de pago
                    </Form.Label>
                    <Form.Select
                      className={`${styles.drawerSelect} form-control`}
                      isInvalid={errors.creditCard}
                      value={payment}
                      {...register("creditCard", {
                        onChange: (e) => {
                          handlePayment(e);
                        },
                      })}
                    >
                      <option defaultValue hidden value="">
                        Selecciona medio
                      </option>
                      {creditCards.map((e) => (
                        <option value={e.id} key={e.id}>
                          {e.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.creditCard?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </div>
              <div className={styles.drawerGroup}>
                <Col>
                  <Form.Group>
                    <Form.Label className={`${styles.titleSmallBold} `}>
                      Número de Tarjeta
                    </Form.Label>
                    <Controller
                      name="cardNumber"
                      control={control}
                      render={({ field: { onChange } }) => (
                        <PatternFormat
                          onChange={onChange}
                          className={`${
                            styles.drawerInutSize
                          } text-start align-middle form-control ${
                            errors.cardNumber ? "is-invalid" : ""
                          }`}
                          value={cardNumber}
                          format="#### #### #### ####"
                          mask="_ "
                          placeholder="0000 0000 0000 0000"
                          id="cardNumber"
                          onValueChange={(values) => {
                            handleCardNumber(values.value);
                          }}
                        />
                      )}
                    />
                    <div className={styles.descriptionSecondary}>
                      Ingresa los 16 números de la tarjeta.
                    </div>
                    <Form.Control.Feedback type="invalid">
                      {errors.cardNumber?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </div>
              <div className={styles.drawerGroup}>
                <Col>
                  <Form.Group>
                    <Form.Label className={`${styles.titleSmallBold} `}>
                      Fecha de expiración
                    </Form.Label>
                    <Controller
                      name="cardExpiry"
                      control={control}
                      render={({ field: { onChange } }) => (
                        <PatternFormat
                          className={`${
                            styles.drawerInutSize
                          } text-start align-middle form-control ${
                            errors.cardExpiry ? "is-invalid" : ""
                          }`}
                          format="##/##"
                          mask="_"
                          placeholder="MM/AA"
                          value={expiration}
                          onChange={onChange}
                          onValueChange={(values) => {
                            handleExpiration(values.formattedValue);
                          }}
                        />
                      )}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.cardExpiry?.message}
                    </Form.Control.Feedback>
                    <div className={styles.descriptionSecondary}>
                      Ingresa la fecha que aparece en la tarjeta.
                    </div>
                  </Form.Group>
                </Col>
              </div>
              <div
                className={`${styles.drawerGroup} mt-auto d-flex justify-content-center`}
              >
                <button className="button-primary w-100" type="submit">
                  Continuar
                </button>
              </div>
              <div
                className={`${styles.drawerGroup} d-flex justify-content-center`}
              >
                <button className="button-secondary w-100">Cancelar</button>
              </div>
            </Container>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default PaymentDrawer;
