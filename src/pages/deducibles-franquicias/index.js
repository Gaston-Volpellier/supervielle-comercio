import Link from "next/link";
import React from "react";
import { Col, Form, Container, Row, Card, Table } from "react-bootstrap";
import styles from "@/styles/pages/PasoAdicional.module.scss";
import axios from "axios";

const Coberturas = ({ deduciblesFranquicias }) => {
  return (
    <Container>
      <Col className="col-lg-8 offset-lg-2">
        <Row className={`${styles.mainForm} ${styles.extraHeader} m-2`}>
            <div className={styles.pageTitle}>Deducibles y Franquicias</div>
            <div className={styles.descriptionPrimary}>
              Resumen final de la cotización
            </div>
        </Row>
      </Col>
      <Col className="col-lg-8 offset-lg-2 mb-3">
        <Card className={styles.descriptionCard}>
          <Table className={`${styles.smallTableFormat}`}>
            <thead>
              <tr>
                <th className={styles.cardTitle}>Coberturas extras</th>
                <th className={styles.cardTitle}>Mínimo</th>
                <th className={styles.cardTitle}>%</th>
              </tr>
            </thead>
            <tbody>
              {deduciblesFranquicias.map((e) => (
                <tr key={e.id} className={styles.titleSecondary}>
                  <td>{e.title}</td>
                  <td>$ {e.amount}</td>
                  <td>{e.percentage * 100}%</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Col>
      <Form.Group className="mb-4 d-flex justify-content-center">
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
  const { data: dataDeducibles } = await axios.get(
    `${process.env.BASE_URL}/api/fetch/deductibles`
  );
  const deduciblesFranquicias = dataDeducibles.data;

  return {
    props: {
      deduciblesFranquicias,
    },
  };
}
