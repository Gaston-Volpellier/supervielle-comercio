import React from "react";
import { Container, Col, Form, Row } from "react-bootstrap";
import styles from "@/styles/pages/Error.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";

export default function Home() {
  return (
    <>
      <Container>
        <Row className={styles.formContainer}>
          <Col className="col-lg-6 offset-lg-3">
            <Form className={styles.mainForm}>
              <Form.Group className="mb-5 d-flex flex-column justify-content-center">
                <FontAwesomeIcon
                  icon={faXmarkCircle}
                  className={styles.errorIcon}
                />
              </Form.Group>

              <Form.Group className="mb-5 d-flex flex-column justify-content-center">
                <div className={`${styles.pageTitle} text-center`}>
                  No pudimos crear la solicitud
                </div>
                <div className={`${styles.descriptionPrimary} text-center`}>
                  Estamos resolviendo un error en el sistema. Por favor,
                  intentalo de nuevo más tarde.
                </div>
              </Form.Group>

              <Form.Group className="mb-4 d-flex justify-content-center">
                <Link href="/">
                  <button className="button-primary">Ir al inicio</button>
                </Link>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
