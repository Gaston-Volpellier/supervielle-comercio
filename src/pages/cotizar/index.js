import React, { useState } from "react";
import Link from "next/link";
import styles from "@/styles/pages/Cotizador.module.scss";
import TablaCotizador from "./table";
import PaymentDrawer from "@/components/drawer/payment-drawer";
import {
  Col,
  Form,
  Container,
  Row,
  Card,
  Button,
  Spinner,
} from "react-bootstrap";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCheckCircle,
  faCreditCard,
} from "@fortawesome/free-regular-svg-icons";
import { usePolicy } from "util/policy-provider";
import axios from "axios";

const Cotizador = ({ creditCards, insurancePolicies }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [hasPayment, setHasPayment] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

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
    surfaceValue,
    payment,
    cardNumber,
    expiration,
    insuranceData,
    handleInsuranceData,
    removeInsuranceData,
    resetInsurance,
    insuranceError,
  } = usePolicy();

  const handleClose = () => setShowDrawer(false);
  const handleShow = () => setShowDrawer(true);

  const saveData = async (emit) => {
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
            insuranceData,
          },
        })
        .then((response) => console.log("Save response: ", response));

      emit
        ? (await axios
            .post(`/api/save/emit-policy`, {
              data: {
                policyId,
              },
            })
            .then((response) => console.log("Emit response: ", response)),
          router.push("/feedback"))
        : (window.open(`/pdf/${policyId}`, "_blank"), setIsSubmitting(false));
    } catch (error) {
      console.log("Error submitting: ", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${styles.formContainer}`}>
      <Col>
        <Container className={styles.tableContainer}>
          <div className={styles.mainForm}>
            <div className={styles.formGroup}>
              <div className={styles.pageTitle}>Cotizador</div>
              <div className={styles.descriptionPrimary}>
                Todas las coberturas descriptas están sujetas a las cláusulas y
                exclusiones de la póliza. En caso de discrepancia entre lo aquí
                descripto y la póliza regirán las condiciones de la póliza.
                Selecciona como mínimo 3 coberturas.
              </div>
            </div>
          </div>
          <div className={`${styles.selectionContainer}`}>
            <button
              className="button-secondary"
              type="button"
              onClick={() => resetInsurance()}
            >
              Borrar seleccion
            </button>
          </div>
          <Card className={styles.tableCard}>
            <TablaCotizador
              insurancePolicies={insurancePolicies.data}
              insuranceData={insuranceData}
              handleInsuranceData={handleInsuranceData}
              removeInsuranceData={removeInsuranceData}
              surface={surface}
              surfaceValue={surfaceValue}
            />
          </Card>
          <Card onClick={handleShow} className={`${styles.drawerCard} `}>
            <Container
              className={`${styles.drawerContainer} d-flex  align-items-center`}
            >
              <div className={`${styles.marginRight} `}>
                <FontAwesomeIcon
                  icon={faCreditCard}
                  className={styles.iconStyleLarge}
                />
              </div>
              <div className={`${styles.marginRight} `}>
                <div className="d-flex flex-column">
                  <p className={`${styles.titlePrimary} mb-0`}>
                    Agregar Método de pago
                  </p>
                  <p className={`${styles.descriptionPrimary} mb-0`}>
                    Recuerda ingresar el método antes de emitir.
                  </p>
                </div>
              </div>
              <div className={`${styles.marginRight} ms-auto`}>
                {hasPayment && (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={styles.checkIcon}
                  />
                )}
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className={styles.iconStyleLarge}
                />
              </div>
            </Container>
          </Card>
          <div className={styles.descriptionSpacing}>
            <p className={`${styles.descriptionPrimary} p-0 m-0`}>
              Información adicional
            </p>
          </div>
          <Row className={styles.cardContainerMain}>
            <Col className={`${styles.cardContainerSingle} col-lg-4`}>
              <Card
                className={`${styles.cardLink} d-flex flex-row align-items-center`}
                as={Link}
                href="/coberturas-extras"
              >
                <div className={`${styles.marginRight} `}>
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className={styles.iconStyleLarge}
                  />
                </div>
                <div className={`${styles.marginRight} `}>
                  <p className={`${styles.titleSecondary} m-0`}>
                    Coberturas extras
                  </p>
                </div>
                <div className="ms-auto">
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className={styles.iconStyleLarge}
                  />
                </div>
              </Card>
            </Col>
            <Col className={`${styles.cardContainerSingle} col-lg-4`}>
              <Card
                className={`${styles.cardLink} d-flex flex-row align-items-center`}
                as={Link}
                href="/clausulas-adicionales"
              >
                <div className={`${styles.marginRight} `}>
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className={styles.iconStyleLarge}
                  />
                </div>
                <div className={`${styles.marginRight} `}>
                  <p className={`${styles.titleSecondary} m-0`}>
                    Clausulas adicionales
                  </p>
                </div>
                <div className="ms-auto">
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className={styles.iconStyleLarge}
                  />
                </div>
              </Card>
            </Col>
            <Col className={`${styles.cardContainerSingle} col-lg-4`}>
              <Card
                className={`${styles.cardLink} d-flex flex-row align-items-center`}
                as={Link}
                href="/deducibles-franquicias"
              >
                <div className={`${styles.marginRight} `}>
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className={styles.iconStyleLarge}
                  />
                </div>
                <div className={`${styles.marginRight} `}>
                  <p className={`${styles.titleSecondary} m-0`}>
                    Deductibles y Franquicias
                  </p>
                </div>
                <div className="ms-auto">
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className={styles.iconStyleLarge}
                  />
                </div>
              </Card>
            </Col>
          </Row>
          <Form.Group className="mb-2 d-flex justify-content-center">
            <Button
              className="button-primary"
              type="button"
              onClick={() => saveData(1)}
              disabled={!hasPayment || insuranceError}
            >
              {isSubmitting ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden"></span>
                </Spinner>
              ) : (
                "Emitir"
              )}
            </Button>
          </Form.Group>
          <Form.Group className="d-flex justify-content-center">
            <button
              className="button-secondary"
              type="button"
              onClick={() => saveData(0)}
            >
              Imprimir Cotización
            </button>
          </Form.Group>
        </Container>
        <PaymentDrawer
          showDrawer={showDrawer}
          closeDrawer={handleClose}
          setPayment={setHasPayment}
          creditCards={creditCards}
        />
      </Col>
    </div>
  );
};

export default Cotizador;

export async function getServerSideProps() {
  const { data: insurancePolicies } = await axios.get(
    `${process.env.BASE_URL}/api/fetch/insurances`
  );
  const { data: cardsData } = await axios.get(
    `${process.env.BASE_URL}/api/fetch/credit-card`
  );
  const creditCards = cardsData.data;

  return {
    props: {
      creditCards,
      insurancePolicies,
    },
  };
}
