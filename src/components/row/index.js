import {
  faChevronDown,
  faChevronRight,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Col, Collapse, Form, Row } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import styles from "@/styles/pages/Cotizador.module.scss";
import { maskSaElegida } from "@/masks/cotizar";
import { number_format } from "util/functions";
import CotizadorMobile from "../drawer/drawer-mobile";
import { usePolicy } from "util/policy-provider";

function InsuranceRow(props) {
  const { element, amounts, currentInsurance } = props;
  const { name, rate, description, required, id } = element;

  const { handleInsuranceData, removeInsuranceData } = usePolicy();

  const [collapsable, setCollapsable] = useState(false);
  const [checkbox, setCheckbox] = useState(currentInsurance !== 0);
  const [showMobile, setShowMobile] = useState(false);

  const handleCheckbox = () => {
    checkbox && removeInsuranceData(id);
    setCheckbox(!checkbox);
    if (!checkbox){
      handleInsuranceData(
        id,
        parseInt(0),
        parseFloat(0),
        true
      );
    }
  };

  const handleCheckboxMobile = (value) => {
    !value ? (setCheckbox(false), removeInsuranceData(id)) : setCheckbox(true);
  };

  return (
    <tr>
      <td>
        <Row>
          <div className="d-flex">
            <Col className="col-11">
              <Form.Group>
                <Form.Check
                  required
                  label={name}
                  id={`check_${id}`}
                  checked={required ? true : checkbox}
                  onChange={(e) => handleCheckbox(e)}
                  disabled={required}
                  className={
                    required ? styles.disabledCheck : styles.checkboxStyle
                  }
                />
              </Form.Group>
            </Col>
            <Col className="col-1 align-content-center d-sm-flex d-none justify-content-end">
              <FontAwesomeIcon
                icon={!collapsable ? faChevronDown : faChevronUp}
                onClick={() => setCollapsable(!collapsable)}
                aria-controls={`collapse_${id}`}
                aria-expanded={collapsable}
                className={styles.iconStyleSmall}
              />
            </Col>
          </div>
        </Row>
        <Collapse in={collapsable}>
          <div
            className={`${styles.descriptionSecondary} p-2`}
            id={`collapse_${id}`}
          >
            {description}
          </div>
        </Collapse>
      </td>
      <td className={` text-center align-middle d-sm-table-cell d-none`}>
        <div>
          $
          {!required && !checkbox
            ? 0
            : number_format(amounts.minimum, 0, ",", ".")}
        </div>
      </td>
      <td className={`${styles.redSecondary} text-center align-middle`}>
        <div>
          $
          {!required && !checkbox
            ? 0
            : number_format(amounts.ideal, 0, ",", ".")}
        </div>
      </td>
      <td className="text-center align-middle d-sm-none d-table-cell">
        <div>
          <FontAwesomeIcon
            icon={faChevronRight}
            onClick={() => setShowMobile(true)}
            aria-controls={`collapse_${id}`}
            aria-expanded={collapsable}
            className={styles.iconStyleSmall}
          />
        </div>
      </td>
      <td className="text-center align-middle d-sm-table-cell d-none">
        <div>
          $
          {!required && !checkbox
            ? 0
            : number_format(amounts.maximum, 0, ",", ".")}
        </div>
      </td>
      <td className="text-center align-middle d-sm-table-cell d-none">
        <div>
          <Form.Group>
            <NumericFormat
              className={`${styles.inputSize} text-center align-middle form-control ${currentInsurance.error ? 'is-invalid' : ''}`}
              required
              value={currentInsurance.value ? currentInsurance.value * 1 : 0}
              onValueChange={(values) => {
                let v = parseInt(values.value);
                handleInsuranceData(
                  id,
                  parseInt(values.value),
                  parseFloat(((values.value * rate) / 1000).toFixed(2)),
                  !(v >= amounts.minimum && v <= amounts.maximum)
                );
              }}
              disabled={required ? false : !checkbox}
              {...maskSaElegida}
            />
          </Form.Group>
        </div>
        {currentInsurance.error === true && <small className="text-danger">Valor fuera del rango</small>}
      </td>
      <td
        className={`${styles.bold} text-center align-middle d-sm-table-cell d-none`}
      >
        <div>${number_format(currentInsurance.rate, 2, ",", ".")}</div>
      </td>
      <CotizadorMobile
        showMobile={showMobile}
        closeMobile={() => setShowMobile(false)}
        handleCheckboxMobile={handleCheckboxMobile}
        id={id}
        policyName={name}
        policyDescription={description}
        policyRate={rate}
        currentValue={currentInsurance.value}
        currentRate={currentInsurance.rate}
        currentError={currentInsurance.error}
        minimum={amounts.minimum}
        ideal={amounts.ideal}
        maximum={amounts.maximum}
      />
    </tr>
  );
}

export default InsuranceRow;
