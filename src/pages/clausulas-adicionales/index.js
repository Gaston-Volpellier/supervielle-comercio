import Link from "next/link";
import React from "react";
import {
  Button,
  Col,
  Form,
  FormSelect,
  Container,
  Image,
  Row,
  Card,
} from "react-bootstrap";
import styles from "@/styles/pages/PasoAdicional.module.scss";

const Clausulas = () => {
  return (
    <Container>
      <Col className="col-lg-8 offset-lg-2">
        <Row className={`${styles.mainForm} ${styles.extraHeader} m-2`}>
        <div className={styles.pageTitle}>Cláusulas adicionales</div>
            <div className={styles.descriptionPrimary}>
              Se detallan las principales cláusulas adicionales, no siendo estas
              las únicas.
            </div>
        </Row>
      </Col>
      <Col className="col-lg-8 offset-lg-2 mb-3">
        <Card className={styles.descriptionCard}>
          <div className="m-1 p-1">
            <div className={styles.cardTitle}>Coberturas</div>
          </div>
          <div className="m-1">
            <div className={styles.titleSecondary}>Primer Riesgo Absoluto*</div>
            <p className={`${styles.descriptionSecondary} `}>
              Este seguro se efectúa a primer riesgo absoluto y en consecuencia
              el Asegurador indemnizará el daño hasta el límite de la suma
              asegurada indicada en las Condiciones Particulares, sin tener en
              cuenta la proporción que exista entre esta suma y el valor
              asegurable.
            </p>
          </div>
          <div className="m-1">
            <div className={styles.titleSecondary}>
              Medidas Mínimas de Seguridad
            </div>
            <p className={`${styles.descriptionSecondary} `}>
              El local donde se hallen los bienes asegurados deberá contar en
              todas las puertas de acceso con cerraduras tipo doble paletas o
              bidimensionales, estar provisto de rejas de protección de hierro
              colocadas en todos los tragaluces y en cualquier abertura con
              panel de vidrio, que permitiera el ingreso al local, no tener
              techo construido total o parcialmente de fibrocemento, cartón,
              plástico, vidrio o materiales similares, no lindar con terreno
              baldío, obra en construcción, o edificio abandonado.
            </p>
          </div>
          <div className="m-1">
            <div className={styles.titleSecondary}>
              Dinero en Cajón Mostrador(4)
            </div>
            <p className={`${styles.descriptionSecondary} `}>
              Se deja constancia que se cubre el dinero en caja registradora y/o
              cajón mostrador durante el horario habitual de tareas.
            </p>
          </div>
          <div className="m-1">
            <div className={styles.titleSecondary}>
              Protección de Cortina de Hierro de Malla
            </div>
            <p className={`${styles.descriptionSecondary} `}>
              Este seguro se contrata en virtud de que la totalidad de las
              vidrieras o escaparates y puertas con panel de vidrio del local
              que dan al exterior, se encuentran protegidas por cortinas de
              hierro de malla.
            </p>
          </div>
          <div className="m-1">
            <div className={styles.titleSecondary}>Protección de Alarma</div>
            <p className={`${styles.descriptionSecondary} `}>
              Este seguro se contrata en virtud de que en el local donde se
              hallan los bienes asegurados se encuentra instalado un sistema
              automático de seguridad cuya alarma emite sonido al exterior.
            </p>
          </div>
          <div className="m-1">
            <div className={styles.titleSecondary}>
              Protección de Rejas Movibles
            </div>
            <p className={`${styles.descriptionSecondary} `}>
              Este seguro se contrata en virtud de que la totalidad de las
              vidrieras o escaparates y puertas con panel de vidrio del local
              que dan al exterior, se encuentran protegidas por rejas movibles.
            </p>
          </div>
          <div className="m-1">
            <div className={styles.titleSecondary}>
              Seguro Técnico - Cobertura de Todo Riesgo
            </div>
            <p className={`${styles.descriptionSecondary} `}>
              Se cubren los daños materiales para Seguros de Equipos
              Electrónicos, excluyéndose la cobertura de hurto.
            </p>
          </div>
          <div className="m-1">
            <div className={styles.titleSecondary}>
              Seguro Técnico - Cobertura de Robo e Incendio
            </div>
            <p className={`${styles.descriptionSecondary} `}>
              La presente póliza cubre, exclusivamente daños materiales a
              consecuencia de robo e incendio que sufran los equipos
              electrónicos.
            </p>
          </div>
          <div className="m-1">
            <div className={styles.titleSecondary}>
              Seguro Técnico - Estabilizador de Tensión
            </div>
            <p className={`${styles.descriptionSecondary} `}>
              La presente cobertura se otorga en razón de que los equipos
              electrónicos asegurados tienen conectado, en forma permanente,
              estabilizador de corriente destinado a evitar los efectos de las
              variaciones de tensión y/o frecuencia en el suministro de energía
              eléctrica.
            </p>
          </div>
          <div className="m-1">
            <div className={styles.titleSecondary}>
              Responsabilidad Civil - Incendio, Rayo, Explosión, Descargas
              Eléctricas y Escapes de Gas
            </div>
            <p className={`${styles.descriptionSecondary} `}>
              El Asegurador se obliga a mantener indemne al Asegurado por cuanto
              deba a un tercero como consecuencia de la responsabilidad civil
              que surge de la acción directa o indirecta del fuego, rayo,
              explosión, descargas eléctricas y escapes de gas.
            </p>
          </div>
          <div className="m-1">
            <div className={styles.titleSecondary}>
              Responsabilidad Civil - Carteles y/o Letreros y/u Objetos Afines
            </div>
            <p className={`${styles.descriptionSecondary} `}>
              El Asegurador cubre la responsabilidad civil del Asegurado por los
              daños ocasionados a terceros por la instalación, uso,
              mantenimiento, reparación y desmantelamiento del o de los carteles
              y/o letreros y/u objetos afines y sus partes complementarias.
            </p>
          </div>
          <div className="m-1">
            <div className={styles.titleSecondary}>
              Responsabilidad Civil - Ascensores y Montacargas
            </div>
            <p className={`${styles.descriptionSecondary} `}>
              El Asegurador cubre los daños por el uso de ascensores y/o
              montacargas.
            </p>
          </div>
          <div className="m-1">
            <div className={styles.titleSecondary}>
              Responsabilidad Civil - Guarda y/o Depósito de Vehículos a Título
              no Oneroso
            </div>
            <p className={`${styles.descriptionSecondary} `}>
              El Asegurador cubre la responsabilidad civil del Asegurado como
              consecuencia de Incendio, Explosión, Robo y/o Hurto de vehículos
              automotores guardados a título no oneroso con exclusión de los
              bienes que se encuentren dentro o sobre dichos vehículos.
            </p>
          </div>
          <div className="m-1">
            <div className={styles.titleSecondary}>
              Responsabilidad Civil - Instalaciones a Vapor, Agua Caliente o
              Aceite Caliente
            </div>
            <p className={`${styles.descriptionSecondary} `}>
              El Asegurador se obliga a mantener indemne al Asegurado por cuando
              deba a un tercero en razón de Responsabilidad Civil
              Extracontractual en que incurrirá como propietario de la o las
              instalaciones destinadas a producir, transportar, o utilizar vapor
              y/o agua caliente, ya sea con un fin industrial, de servicios o
              confort o de aceite caliente para calefacción de procesos,
              incluidas las fuentes generadoras de calor y sistemas de válvulas
              y colectores hasta la conexión de los mismos con el sistema de
              distribución y circulación de líquidos y fluidos.
            </p>
          </div>
          <div className="m-1">
            <div className={styles.titleSecondary}>
              Responsabilidad Civil - Suministro de Alimentos
            </div>
            <p className={`${styles.descriptionSecondary} `}>
              El Asegurador cubre la Responsabilidad Civil Contractual emergente
              de lesiones o muerte a consecuencia del suministro de comidas y
              bebidas correspondientes a su servicio.
            </p>
          </div>
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

export default Clausulas;
