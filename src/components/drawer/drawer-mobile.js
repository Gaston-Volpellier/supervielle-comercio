import {
  faCheck,
  faChevronDown,
  faChevronUp,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Collapse, Container, Form, Row } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import styles from "@/styles/pages/Cotizador.module.scss";
import { number_format } from "util/functions";
import { NumericFormat } from "react-number-format";
import { maskSaElegida } from "@/masks/cotizar";
import { usePolicy } from "util/policy-provider";

function CotizadorMobile(props) {
  const {
    handleCheckboxMobile,
    showMobile,
    closeMobile,
    id,
    policyName,
    policyDescription,
    policyRate,
    currentValue,
    currentRate,
    currentError,
    minimum,
    ideal,
    maximum,
  } = props;
  const [open, setOpen] = useState(false);

  const { handleInsuranceData } = usePolicy();
  const saveAndClose = () => {
    currentValue ? handleCheckboxMobile(true) : handleCheckboxMobile(false);
    closeMobile();
  };

  return (
    <>
      <Offcanvas
        placement="bottom"
        className={`${styles.drawerMobile} h-75`}
        show={showMobile}
        onHide={saveAndClose}
      >
        <Offcanvas.Header className="">
          <Offcanvas.Title className={styles.drawerTitle}>
            Cotizador
          </Offcanvas.Title>
          <button
            className={`${styles.drawerButton} button-secondary ms-auto`}
            type="button"
            onClick={() => handleInsuranceData(id, 0, 0, true)}
          >
            Limpiar
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-4 pt-0">
          <Container>
            <hr />
            <div className="d-flex flex-row gap-2 mb-2 align-items-center">
              <span className={`${styles.iconStack} fa-layers fa-fw"`}>
                <FontAwesomeIcon
                  icon={faCheck}
                  className={`${styles.frontIcon} ${styles.marginRight} `}
                />
                <FontAwesomeIcon icon={faCircle} className={styles.bgIcon} />
              </span>
              <div
                className={`${styles.pageTitle} ${styles.mobileDawerTitle} `}
              >
                {policyName}
              </div>
              <div className="ms-auto">
                <FontAwesomeIcon
                  icon={!open ? faChevronDown : faChevronUp}
                  onClick={() => setOpen(!open)}
                  aria-controls="collapse-description"
                  aria-expanded={open}
                  className={`${styles.iconStyleLarge} me-3`}
                />
              </div>
            </div>
            <Collapse in={open}>
              <div
                className={`${styles.descriptionPrimary} p-2`}
                id="collapse-description"
              >
                {policyDescription}
              </div>
            </Collapse>
            <hr />
            <div className={`${styles.drawerTitleItem} d-flex mb-2`}>
              <p className="m-0">Mínimo</p>
              <p className="m-0 ms-auto ">
                ${number_format(minimum, 0, ",", ".")}
              </p>
            </div>
            <div
              className={`${styles.drawerTitleItem} ${styles.red} d-flex mb-2`}
            >
              <p className="m-0">Recomendado</p>
              <p className="m-0 ms-auto ">
                ${number_format(ideal, 0, ",", ".")}
              </p>
            </div>
            <div className={`${styles.drawerTitleItem} d-flex mb-3`}>
              <p className="m-0">Máximo</p>
              <p className="m-0 ms-auto ">
                ${number_format(maximum, 0, ",", ".")}
              </p>
            </div>
            <div
              className={`${styles.drawerTitleItem} ${styles.bold} d-flex mb-2`}
            >
              <p className="m-0">SA Elegida</p>
            </div>
            <Form.Group>
              <NumericFormat
                className={` ${styles.mobileInputHeight} text-center align-middle form-control ${currentError ? 'is-invalid' : ''}`}
                required
                placeholder={0}
                value={currentValue}
                onValueChange={(values) => {
                  let v = parseInt(values.value);
                  handleInsuranceData(
                    id,
                    parseInt(values.value),
                    parseFloat(((values.value * policyRate) / 1000).toFixed(2)),
                    !(v >= minimum && v <= maximum)
                  );
                }}
                {...maskSaElegida}
              />
              {currentError === true && <small className="text-danger">Valor fuera del rango</small>}
            </Form.Group>
            <hr />
            <div
              className={`${styles.drawerTitleItem} ${styles.bold} d-flex flex-row`}
            >
              <p className="m-0">Prima</p>
              <p className="m-0 ms-auto">
                ${number_format(currentRate, 0, ",", ".")}
              </p>
            </div>
            <hr />
            <div className="mt-auto">
              <button
                className="button-primary w-100 mb-3"
                type="button"
                disabled={currentError}
                onClick={saveAndClose}
              >
                Aplicar
              </button>
              <button
                className="button-secondary w-100"
                type="button"
                onClick={() => {
                  handleCheckboxMobile(false);
                  closeMobile();
                }}
              >
                Cancelar
              </button>
            </div>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CotizadorMobile;
