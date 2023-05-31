import React from "react";
import { Container, Col, Form, Row, Button, Spinner } from "react-bootstrap";
import styles from "@/styles/pages/Home.module.scss";
import { homeSchema } from "@/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { usePolicy } from "util/policy-provider";
import Select from 'react-select'

export default function Home({
  oficials: { data: oficials },
  branches: { data: branches },
  specialists: { data: specialists },
  surfaceValue,
}) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const router = useRouter();
  const {
    handleOficial,
    handleSpecialist,
    handleBranch,
    oficial,
    specialist,
    branch,
    handleSurfaceValue,
  } = usePolicy();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oficial: "",
      sucursal: "",
      especialista: "",
    },
    resolver: yupResolver(homeSchema),
  });

  const submitForm = async () => {
    setIsSubmitting(true);
    await handleSurfaceValue(surfaceValue);
    router.push("/datos-tomador");
  };

  React.useEffect(() => {
    setValue("sucursal", branch);
    setValue("oficial", oficial);
    setValue("especialista", specialist);
  }, []);

  return (
    <>
      <Container>
        <Row className={styles.formContainer}>
          <Form
            className={styles.mainForm}
            onSubmit={handleSubmit((data) => {
              submitForm(data);
            })}
          >
            <Form.Group className={styles.formGroup}>
              <div className={styles.pageTitle}>
                Bienvenido a Seguro de Integral de Comercio
              </div>
              <div className={styles.descriptionPrimary}>
                Completá tus datos de vendedor para iniciar el proceso de
                cotización
              </div>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <div className={styles.formLabel}>Oficial de Banco</div>
              <Select 
                options={oficials} 
                getOptionLabel ={(option)=>option.name}
                getOptionValue ={(option)=>option.id}
                className={`${styles.formItem} ${styles.small} ${errors.oficial ? 'is-invalid' : ''} react-select-st`}
                placeholder="Selecciona"
                id="oficial"
                name="oficial"
                value = {oficials.filter(option => option.id === oficial)}
                {...register("oficial")}
                onChange = {(e) => {
                  handleOficial(e);
                  setValue('oficial', e.id);
                  trigger('oficial');
                }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.oficial?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Row>
                <Col lg={6} className={`${styles.selectMiddle} ${styles.left}`}>
                  <div className={styles.formLabel}>Sucursal</div>
                  <Select 
                    options={branches} 
                    getOptionLabel ={(option)=>option.name}
                    getOptionValue ={(option)=>option.id}
                    className={`${styles.formItem} ${styles.small} ${errors.sucursal ? 'is-invalid' : ''} react-select-st`}
                    placeholder="Selecciona"
                    id="sucursal"
                    name="sucursal"
                    value = {branches.filter(option => option.id === branch)}
                    {...register("sucursal")}
                    onChange = {(e) => {
                      handleBranch(e);
                      setValue('sucursal', e.id);
                      trigger('sucursal');
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.sucursal?.message}
                  </Form.Control.Feedback>
                </Col>
                <Col lg={6} className={`${styles.selectMiddle}`}>
                  <div className={styles.formLabel}>Especialista Seguros</div>
                  <Select 
                    options={specialists} 
                    getOptionLabel ={(option)=>option.name}
                    getOptionValue ={(option)=>option.id}
                    className={`${styles.formItem} ${styles.small} ${errors.especialista ? 'is-invalid' : ''} react-select-st`}
                    placeholder="Selecciona"
                    id="especialista"
                    name="especialista"
                    value = {specialists.filter(option => option.id === specialist)}
                    {...register("especialista")}
                    onChange = {(e) => {
                      handleSpecialist(e);
                      setValue('especialista', e.id);
                      trigger('especialista');
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.especialista?.message}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-4 d-flex justify-content-center">
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
    </>
  );
}

export async function getServerSideProps() {
  const { data: surface } = await axios.get(
    `${process.env.BASE_URL}/api/fetch/surface-value`
  );
  const { data: oficials } = await axios.get(
    `${process.env.BASE_URL}/api/fetch/oficials`
  );
  const { data: specialists } = await axios.get(
    `${process.env.BASE_URL}/api/fetch/specialists`
  );
  const { data: branches } = await axios.get(
    `${process.env.BASE_URL}/api/fetch/branches`
  );
  const surfaceValue = surface.data[0].amount;

  return {
    props: {
      oficials,
      specialists,
      branches,
      surfaceValue,
    },
  };
}
