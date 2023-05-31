import Link from "next/link";
import React from "react";
import { Col, Form, Container, Row, Card, ListGroup } from "react-bootstrap";
import styles from "@/styles/pages/PasoAdicional.module.scss";
import axios from "axios";
import { usePolicy } from "util/policy-provider";
import { findSingleData, number_format } from "util/functions";

const Coberturas = ({ data }) => {
  const coverages = data.data;

  const { insuranceData } = usePolicy();

  const mainInsurance = findSingleData(1, insuranceData).value;

  return (
    <Container>
      <Col className="col-lg-8 offset-lg-2">
        <Row className={`${styles.mainForm} ${styles.extraHeader} m-2`}>
            <div className={styles.pageTitle}>Coberturas Extras</div>
            <div className={styles.descriptionPrimary}>
              Las mismas se encuentran contenidas dentro de las coberturas
              principales.
            </div>
        </Row>
      </Col>
      <Col className="col-lg-8 offset-lg-2 mb-3">
        <Card className={styles.descriptionCard}>
          <ListGroup variant="flush">
            <div className="ms-3 p-1">
              <div className={styles.cardTitle}>Coberturas Extras</div>
            </div>
            {coverages.map((e) => (
              <ListGroup.Item key={e.id}>
                <div className="d-flex flex-row justify-content-between">
                  <div className={`${styles.descriptionContainer} me-1`}>
                    <div className={styles.titleSecondary}>{e.name}</div>
                    <p className={`${styles.descriptionSecondary} `}>
                      {e.description}
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <div
                      className={`${styles.descriptionSecondary} text-nowrap`}
                    >
                      $
                      {e.formula === "rate"
                        ? number_format(mainInsurance * e.rate, 2, ",", ".")
                        : number_format(
                            findSingleData(3, insuranceData).value,
                            2,
                            ",",
                            "."
                          )}
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </Col>
      <Form.Group className="mb-2 d-flex justify-content-center">
        <Link href="/cotizar" scroll={false}>
          <button className="button-primary" type="button">
            Volver
          </button>
        </Link>
      </Form.Group>
    </Container>
  );
};

export default Coberturas;

export async function getServerSideProps() {
  const { data } = await axios.get(
    `${process.env.BASE_URL}/api/fetch/coverages`
  );

  return {
    props: {
      data,
    },
  };
}
