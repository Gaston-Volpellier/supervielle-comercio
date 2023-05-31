import React from "react";
import styles from "@/styles/components/Footer.module.scss";
import Link from "next/link";
import { Row, Col, Image, Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container fluid className={`${styles.footerSize} p-4`}>
        <p>
          1- La cobertura o cláusula aplica a la cobertura principal de Incendio
          Edificio. 2- La cobertura o cláusula aplica a la cobertura principal
          de Incendio Contenido. 3- La cobertura o cláusula aplica a la
          cobertura principal de Robo Contenido. 4- La cobertura o cláusula
          aplica a la cobertura principal de Robo de Valores en Caja. 5-La
          cobertura o cláusula aplica a la cobertura principal de Robo de
          Valores en Tránsito. 6-La cobertura o cláusula aplica a la cobertura
          principal de Cristales. 7-La cobertura o cláusula aplica a la
          cobertura principal de Responsabilidad Civil.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
