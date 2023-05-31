import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Col, Collapse, Form, Row } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import styles from "@/styles/pages/Cotizador.module.scss";
import { maskSaElegida } from "@/masks/cotizar";
import { number_format } from "util/functions";

function coverageRow(props) {
  return (
    <tr>
      <td>
        <Row>
          <p className={styles.titleSecondary}>{e.name}</p>
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
      <td>
        <div className={`${styles.descriptionSecondary} text-nowrap`}>
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
      </td>
    </tr>
  );
}

export default coverageRow;
