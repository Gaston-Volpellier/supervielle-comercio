import React from "react";
import { Container, Col, Form, Row, Button, Spinner } from "react-bootstrap";
import styles from "@/styles/pages/Feedback.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { usePolicy } from "util/policy-provider";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { policyId } = usePolicy();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const submitForm = async () => {
    setIsSubmitting(true);
    window.open(`/pdf/${policyId}`, "_blank");
    setIsSubmitting(false);
  };

  return (
    <>
      <Container>
        <Row className={styles.formContainer}>
          <Col className="col-lg-6 offset-lg-3">
            <Form className={styles.mainForm}>
              <Form.Group className="mb-5 d-flex flex-column justify-content-center">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className={styles.successIcon}
                />
              </Form.Group>

              <Form.Group className="mb-5 d-flex flex-column justify-content-center">
                <div className={`${styles.pageTitle} text-center`}>¡Listo!</div>
                <div className={`${styles.descriptionPrimary} text-center`}>
                  Se completo la solicitud de adhesión para el comercio.
                </div>
              </Form.Group>

              <Form.Group className="mb-4 d-flex justify-content-center">
                <Button
                  className="button-primary"
                  type="button"
                  onClick={() => submitForm()}
                >
                  {isSubmitting ? (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden"></span>
                    </Spinner>
                  ) : (
                    "Imprimir solicitud"
                  )}
                </Button>
              </Form.Group>
              <Form.Group className="d-flex justify-content-center">
                <Link href="/">
                  <button className="button-secondary" type="button">
                    Ir al inicio
                  </button>
                </Link>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
