import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { riesgoSchema } from "@/schemas/datos-riesgo";
import { NumericFormat, PatternFormat } from "react-number-format";
import {
  Col,
  Form,
  Container,
  Row,
  Image,
  Button,
  Spinner,
} from "react-bootstrap";
import styles from "@/styles/pages/DatosTomador.module.scss";
import axios from "axios";
import { usePolicy } from "util/policy-provider";
import Select from 'react-select'

const DatosRiesgo = ({ provinces: { data: provinces }, activities }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [localidades, setLocalidades] = useState([]);
  const [exclusionMSG, setExclusionMSG] = useState();
  const router = useRouter();
  const actividadesComerciales = activities.data;

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
    handleRiskAddress,
    handleRiskLocality,
    handleRiskProvince,
    handleCP,
    handleActivity,
    handleSurface,
  } = usePolicy();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    control,
    setValue,
    trigger,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(riesgoSchema),
  });

  useEffect(() => {
    const id = getValues("provincia");
    const fetchLocalities = async (id) => {
      try {
        const { data } = await axios.get(`/api/fetch/localities/${id}`);
        setLocalidades(data.response);
        setValue("localidad", riskLocality);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchLocalities(id);
    }else if (riskProvince){
      fetchLocalities(riskProvince);
    }
  }, [watch("provincia")]);

  useEffect(() => {
    const id = getValues("actividadComercial");
    const fetchExclusion = async (id) => {
      try {
        const { data } = await axios.get(`/api/fetch/activities`);
        setExclusionMSG(data.data[id - 1].exclusion);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchExclusion(id);
    }
  }, [watch("actividadComercial")]);

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
        .then((response) => console.log("Response: ", response));
      router.push("/cotizar");
    } catch (error) {
      console.log("Error submitting: ", error);
      setIsSubmitting(false);
    }
  };

  const onError = (errors, e) => {
    console.log("Error! ", errors, e);
  };

  React.useEffect(() => {
    setValue("cp", CP);
    setValue("metros", surface);
    setValue("actividadComercial", activity);
  }, []);

  return (
    <Container>
      <Row className={styles.formContainer}>
        <Form
          className={styles.mainForm}
          onSubmit={handleSubmit(submitForm, onError)}
        >
          <Form.Group className={styles.formGroup}>
            <div className={styles.pageTitle}>Datos del riesgo</div>
            <div className={styles.descriptionPrimary}>
              Completá los datos del lugar de riesgo a asegurar.
            </div>
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Domicilio</Form.Label>
            <Form.Control
              className={styles.formItem}
              placeholder="Ingresa domicilio a asegurar"
              type="text"
              isInvalid={errors.domicilio}
              value={riskAddress}
              {...register("domicilio", {
                onChange: (e) => {
                  handleRiskAddress(e);
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.domicilio?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <div className={styles.formGroup}>
            <Row>
              <Col lg={6} className={`${styles.left}`}>
                <Form.Group>
                  <Form.Label className={styles.formLabel}>
                    Provincia
                  </Form.Label>
                  <Select 
                    options={provinces} 
                    getOptionLabel ={(option)=>option.name}
                    getOptionValue ={(option)=>option.id}
                    className={`${styles.formItem} ${errors.provincia ? 'is-invalid' : ''} react-select-st`}
                    placeholder="Selecciona"
                    id="provincia"
                    name="provincia"
                    value = {provinces.filter(option => option.id === riskProvince)}
                    {...register("provincia")}
                    onChange = {(e) => {
                      handleRiskProvince(e);
                      setValue('provincia', e.id);
                      trigger('provincia');
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.provincia?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group>
                  <Form.Label className={styles.formLabel}>CP</Form.Label>
                  <Controller
                    name="cp"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <PatternFormat
                        onChange={onChange}
                        className={`${styles.formItem} form-control ${
                          errors.cp ? "is-invalid" : ""
                        }`}
                        format="####"
                        mask="_ "
                        placeholder="Ingresa"
                        value={CP}
                        onValueChange={(values) => {
                          handleCP(values.value);
                        }}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cp?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </div>
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
              value = {localidades.filter(option => option.id === riskLocality)}
              {...register("localidad")}
              onChange = {(e) => {
                handleRiskLocality(e);
                setValue('localidad', e.id);
                trigger('localidad');
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.localidad?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>
              Actividad comercial*
            </Form.Label>
            <Select 
              options={actividadesComerciales} 
              getOptionLabel ={(option)=>option.description}
              getOptionValue ={(option)=>option.id}
              className={`styles.formItem ${errors.actividadComercial ? 'is-invalid' : ''} react-select-st`}
              placeholder="Selecciona"
              id="actividadComercial"
              name="actividadComercial"
              value = {actividadesComerciales.filter(option => option.id === activity)}
              {...register("actividadComercial")}
              onChange = {(e) => {
                handleActivity(e);
                setValue('actividadComercial', e.id);
                trigger('actividadComercial');
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.actividadComercial?.message}
            </Form.Control.Feedback>
            <div className={styles.descriptionSecondary}>{exclusionMSG}</div>
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>
              Metros cuadrados*
            </Form.Label>
            <Controller
              name="metros"
              control={control}
              render={({ field: { onChange } }) => (
                <NumericFormat
                  onChange={onChange}
                  className={`${styles.formItem} form-control ${
                    errors.metros ? "is-invalid" : ""
                  }`}
                  mask="_ "
                  value={surface}
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={0}
                  placeholder="Ingresa"
                  onValueChange={(values) => {
                    handleSurface(values.value);
                  }}
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              {errors.metros?.message}
            </Form.Control.Feedback>
            <div className={styles.descriptionSecondary}>
              Entre 10 y 600 metros cuadrados.
            </div>
          </Form.Group>

          <div className={`${styles.formGroup} d-flex`}>
            <Image
              src="/speaker.png"
              alt="speaker"
              className={styles.infoIcon}
            />
            <div
              className={`${styles.descriptionSecondary} ${styles.black} mt-0`}
            >
              Art. 5 de la ley N°17.418: Toda declaración falsa o toda
              reticencia de circunstancias por el Asegurado, aún hechas de buena
              fe, que a juicio de peritos hubiese impedido o modificado sus
              condiciones si el Asegurado hubiese sido cerciorado del verdadero
              estado del riesgo, hace nulo el contrato.
            </div>
          </div>

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

export default DatosRiesgo;

export async function getServerSideProps() {
  const { data: provinces } = await axios.get(
    `${process.env.BASE_URL}/api/fetch/provinces`
  );
  const { data: activities } = await axios.get(
    `${process.env.BASE_URL}/api/fetch/activities`
  );
  return {
    props: {
      activities,
      provinces,
    },
  };
}
