import React, { useEffect, useState, useRef } from "react";
import styles from "@/styles/pages/DatosTomador.module.scss";
import { Col, Form, Container, Row, Button, Spinner } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { tomadorSchema } from "@/schemas/datos-tomador";
import { PatternFormat } from "react-number-format";
import axios from "axios";
import { usePolicy } from "util/policy-provider";
import Select from 'react-select'

const DatosTomador = ({ iva, countries }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [localidades, setLocalidades] = useState([]);
  const [provinces, setProvinces] = useState([]);

  const {
    policyId,
    oficial,
    branch,
    specialist,
    recipient,
    legalName,
    cuit,
    IVA,
    IIBB,
    email,
    prefix,
    phone,
    country,
    homeAddress,
    riskAddress,
    homeLocality,
    riskLocality,
    homeProvince,
    riskProvince,
    CP,
    activity,
    surface,
    payment,
    cardNumber,
    expiration,
    handlePolicyId,
    handleRecipient,
    handleLegalName,
    handleCuit,
    handleIVA,
    handleIIBB,
    handleEmail,
    handlePrefix,
    handlePhone,
    handleCountry,
    handleHomeAddress,
    handleHomeLocality,
    handleHomeProvince,
  } = usePolicy();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    control,
    formState: { errors },
    setValue,
    trigger
  } = useForm({
    resolver: yupResolver(tomadorSchema),
  });

  useEffect(() => {
    const id = getValues("provincia");
    const fetchLocalities = async (id) => {
      try {
        const { data } = await axios.get(`/api/fetch/localities/${id}`);
        setLocalidades(data.response);
        setValue("localidad", homeLocality);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchLocalities(id);
    }else if (homeProvince){
      fetchLocalities(homeProvince);
    }
  }, [watch("provincia")]);

  useEffect(() => {
    const id = getValues("pais");
    const fetchProvinces = async (id) => {
      try {
        const { data } = await axios.get(`/api/fetch/provinces/${id}`);
        setProvinces(data.response);
        setValue("provincia", homeProvince);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchProvinces(id);
    }else if (country){
      fetchProvinces(country);
    }
  }, [watch("pais")]);

  const submitForm = async (data) => {
    setIsSubmitting(true);
    try {
      await axios
        .post(`/api/save/save-policy`, {
          data: {
            policyId,
            oficial,
            branch,
            specialist,
            recipient,
            legalName,
            cuit,
            IVA,
            IIBB,
            email,
            prefix,
            phone,
            country,
            homeAddress,
            riskAddress,
            homeLocality,
            riskLocality,
            homeProvince,
            riskProvince,
            CP,
            activity,
            surface,
            payment,
            cardNumber,
            expiration,
          },
        })
        .then((response) => {
          handlePolicyId(response.data.id);
        });
      router.push("/datos-riesgo");
    } catch (error) {
      console.log("Error submitting: ", error);
      setIsSubmitting(false);
    }
  };

  const onError = (errors, e) => {
    console.log("Error! ", errors, e);
  };

  React.useEffect(() => {
    setValue("cuit", cuit);
    setValue("telefono", phone);
    setValue("pais", country);
    setValue("codigoArea", prefix);
  }, []);

  return (
    <Container>
      <Row className={styles.formContainer}>
        <Form
          className={styles.mainForm}
          onSubmit={handleSubmit(submitForm, onError)}
        >
          <Form.Group className={styles.formGroup}>
            <div className={styles.pageTitle}>Datos del tomador</div>
            <div className={styles.descriptionPrimary}>
              Completá los datos del cliente
            </div>
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Destinatario</Form.Label>
            <Form.Control
              className={styles.formItem}
              placeholder="Nombre y apellido"
              type="text"
              value={recipient}
              isInvalid={errors.destinatario}
              {...register("destinatario", {
                onChange: (e) => {
                  handleRecipient(e);
                },
              })}
            />

            <Form.Control.Feedback type="invalid">
              {errors.destinatario?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Razón social</Form.Label>
            <Form.Control
              className={styles.formItem}
              placeholder="Ingresa"
              type="text"
              isInvalid={errors.razonSocial}
              value={legalName}
              {...register("razonSocial", {
                onChange: (e) => {
                  handleLegalName(e);
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.razonSocial?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>CUIT/CUIL/CDI</Form.Label>
            <Controller
              name="cuit"
              control={control}
              render={({ field: { onChange } }) => (
                <PatternFormat
                  onChange={onChange}
                  className={`${styles.formItem} form-control ${
                    errors.cuit ? "is-invalid" : ""
                  }`}
                  format="##-##.###.###-#"
                  mask="_"
                  placeholder="Ingresa"
                  value={cuit}
                  onValueChange={(values) => {
                    handleCuit(values.floatValue);
                  }}
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              {errors.cuit?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Row>
              <Col lg={6} className={`${styles.selectMiddle} ${styles.left}`}>
                <Form.Label className={styles.formLabel}>
                  Condición de IVA
                </Form.Label>
                <Form.Select
                  className={styles.formItem}
                  placeholder="Selecciona"
                  isInvalid={errors.iva}
                  value={IVA}
                  {...register("iva", {
                    onChange: (e) => {
                      handleIVA(e);
                    },
                  })}
                >
                  <option defaultValue value="">
                    Selecciona
                  </option>
                  {iva.map((e) => (
                    <option value={e.id} key={e.id}>
                      {e.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.iva?.message}
                </Form.Control.Feedback>
              </Col>
              <Col lg={6}>
                <Form.Label className={styles.formLabel}>
                  Condición de IIBB
                </Form.Label>
                <Form.Select
                  className={styles.formItem}
                  placeholder="Selecciona"
                  isInvalid={errors.iibb}
                  value={IIBB}
                  {...register("iibb", {
                    onChange: (e) => {
                      handleIIBB(e);
                    },
                  })}
                >
                  <option defaultValue value="">
                    Selecciona
                  </option>
                  <option value="1">Si</option>
                  <option value="2">No</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.iibb?.message}
                </Form.Control.Feedback>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>
              Correo electrónico
            </Form.Label>
            <Form.Control
              className={styles.formItem}
              placeholder="Ingresa"
              type="email"
              isInvalid={errors.email}
              value={email}
              {...register("email", {
                onChange: (e) => {
                  handleEmail(e);
                },
              })}
            />
            <div className={styles.descriptionSecondary}>
              El formato debe ser ejemplo@correo.com
            </div>
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Label className={styles.formLabel}>Teléfono</Form.Label>
          <Row>
            <Col lg={2} className={`${styles.selectMiddle} ${styles.left}`}>
              <Form.Group>
                <Controller
                  defaultValue=""
                  name="codigoArea"
                  control={control}
                  isInvalid={errors.codigoArea}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <PatternFormat
                      className={`${styles.formItem} form-control ${
                        errors.codigoArea ? "is-invalid" : ""
                      }`}
                      format="####"
                      mask=""
                      placeholder="011"
                      id="codigoArea"
                      value={prefix}
                      onChange={(value) => {
                        field.onChange(value);
                        handlePrefix(value);
                      }}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.codigoArea?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col lg={10}>
              <Form.Group className={styles.formGroup}>
                <Controller
                  name="telefono"
                  control={control}
                  defaultValue=""
                  isInvalid={errors.telefono}
                  render={({ field }) => (
                    <PatternFormat
                      className={`${styles.formItem} form-control ${
                        errors.telefono ? "is-invalid" : ""
                      }`}
                      format="#### ####"
                      mask=""
                      placeholder="Ingresa"
                      id="telefono"
                      value={phone}
                      onChange={(value) => {
                        field.onChange(value);
                        handlePhone(value);
                      }}
                    />
                  )}
                />
                <div className={styles.descriptionSecondary}>
                  Tenés que ingresar entre 7 y 10 números.
                </div>
                <Form.Control.Feedback type="invalid">
                  {errors.telefono?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Domicilio</Form.Label>
            <Form.Control
              className={styles.formItem}
              placeholder="Ingresa"
              type="text"
              isInvalid={errors.domicilio}
              value={homeAddress}
              {...register("domicilio", {
                onChange: (e) => {
                  handleHomeAddress(e);
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.domicilio?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Row>
              <Col lg={6} className={`${styles.selectMiddle} ${styles.left}`}>
                <Form.Label className={styles.formLabel}>País</Form.Label>
                <Select 
                  options={countries.data} 
                  getOptionLabel ={(option)=>option.name}
                  getOptionValue ={(option)=>option.id}
                  className={`styles.formItem ${errors.pais ? 'is-invalid' : ''} react-select-st`}
                  placeholder="Selecciona"
                  id="pais"
                  name="pais"
                  value = {countries.data.filter(option => option.id === country)}
                  {...register("pais")}
                  onChange = {(e) => {
                    handleCountry(e);
                    setValue('pais', e.id);
                    trigger('pais');
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.pais?.message}
                </Form.Control.Feedback>
              </Col>
              <Col lg={6}>
                <Form.Label className={styles.formLabel}>Provincia</Form.Label>
                <Select 
                  options={provinces} 
                  getOptionLabel ={(option)=>option.name}
                  getOptionValue ={(option)=>option.id}
                  className={`styles.formItem ${errors.provincia ? 'is-invalid' : ''} react-select-st`}
                  placeholder="Selecciona"
                  id="provincia"
                  name="provincia"
                  value = {provinces.filter(option => option.id === homeProvince)}
                  {...register("provincia")}
                  onChange = {(e) => {
                    handleHomeProvince(e);
                    setValue('provincia', e.id);
                    trigger('provincia');
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.provincia?.message}
                </Form.Control.Feedback>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Localidad</Form.Label>
            <Select 
              options={localidades} 
              getOptionLabel ={(option)=>option.name}
              getOptionValue ={(option)=>option.id}
              className={`styles.formItem ${errors.localidad ? 'is-invalid' : ''} react-select-st`}
              placeholder="Selecciona"
              id="localidad"
              name="localidad"
              value = {localidades.filter(option => option.id === homeLocality)}
              {...register("localidad")}
              onChange = {(e) => {
                handleHomeLocality(e);
                setValue('localidad', e.id);
                trigger('localidad');
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.localidad?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="d-flex justify-content-center">
            <Button className="button-primary" type="submit">
              {isSubmitting ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden"></span>
                </Spinner>
              ) : (
                "Continuar"
              )}
            </Button>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
};

export default DatosTomador;

export async function getServerSideProps() {
  const { data: countries } = await axios.get(
    `${process.env.BASE_URL}/api/fetch/countries`
  );
  const { data: dataIVA } = await axios.get(
    `${process.env.BASE_URL}/api/fetch/iva`
  );
  const iva = dataIVA.data;
  return {
    props: {
      iva,
      countries,
    },
  };
}
