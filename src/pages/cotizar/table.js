import { Form, Row } from "react-bootstrap";
import styles from "@/styles/pages/Cotizador.module.scss";
import Table from "react-bootstrap/Table";
import InsuranceRow from "@/components/row";
import { findSingleData, calculateMinMax, number_format } from "util/functions";

function TablaCotizador(props) {
  const { insurancePolicies, insuranceData, surface, surfaceValue } = props;

  const sum = insuranceData.reduce((accumulate, item) => {
    return accumulate + item.rate;
  }, 0);
  const mainInsurance = findSingleData(1, insuranceData).value;

  ////BUSCO LA POLITICA POR DEFECTO
  let mainPolicy = [];
  insurancePolicies.forEach(element => {
    if (element.formula == "main") mainPolicy = element;
  });

  return (
    <>
      <Form className="table-responsive">
        <Table
          responsive="md"
          id="table-main"
          className={`${styles.tableFormat} ${styles.mainTable} table `}
        >
          <thead>
            <tr>
              <th
                className={`${styles.tableHeader} ${styles.main} ${styles.colLong}`}
              >
                Coberturas
              </th>
              <th
                className={`${styles.tableHeader} ${styles.main} ${styles.colRegular} d-sm-table-cell d-none`}
              >
                Mínimo
              </th>
              <th
                className={`${styles.tableHeader} ${styles.main} ${styles.redSecondary} ${styles.colRegular}`}
              >
                Recomendado
              </th>
              <th
                className={`${styles.tableHeader} ${styles.emptyHeader} d-sm-none d-table-cell`}
              ></th>
              <th
                className={`${styles.tableHeader} ${styles.main} ${styles.colRegular} d-sm-table-cell d-none`}
              >
                Máximo
              </th>
              <th
                className={`${styles.tableHeader} ${styles.main} ${styles.colRegular} d-sm-table-cell d-none`}
              >
                SA Elegida
              </th>
              <th
                className={`${styles.tableHeader} ${styles.main} ${styles.colRegular} ${styles.bold} d-sm-table-cell d-none`}
              >
                Prima
              </th>
            </tr>
          </thead>
          <tbody>
            {insurancePolicies &&
              insurancePolicies.map((element) => (
                <InsuranceRow
                  key={`key_${element.id}`}
                  element={element}
                  amounts={calculateMinMax(
                    element,
                    mainInsurance,
                    surface,
                    surfaceValue,
                    mainPolicy
                  )}
                  currentInsurance={findSingleData(element.id, insuranceData)}
                />
              ))}
            <tr className={`${styles.emptyRow} d-sm-none`}>
              <td colSpan={6}></td>
            </tr>
            <tr className={`${styles.finalRow}`}>
              <td className={`${styles.tableHeader}`} colSpan={4}>
                Concepto
              </td>
              <td
                className={`${styles.tableHeader} text-center d-sm-table-cell d-none`}
              >
                Anual
              </td>
              <td
                className={`${styles.tableHeader} text-center d-sm-table-cell d-none`}
              >
                12 Cuotas
              </td>
            </tr>
            <tr className={styles.finalRow}>
              <td className={`${styles.noBorder}`} colSpan={4}>
                <div
                  className={`${styles.titlePrimary} h-75 justify-content-start align-items-start`}
                >
                  Premio Final
                </div>
                <div className={`${styles.descriptionSecondary} h-25`}>
                  El premio no incluye sellados provinciales que se adicionaran
                  en caso de corresponer.
                </div>
              </td>
              <td
                className={`${styles.totals} ${styles.noBorder} text-center align-middle d-sm-table-cell d-none`}
              >
                ${number_format(sum * 1.222, 2, ",", ".")}
              </td>
              <td
                className={`${styles.totals} ${styles.noBorder} text-center align-middle d-sm-table-cell d-none`}
              >
                ${number_format((sum * 1.222) / 12, 2, ",", ".")}
              </td>
            </tr>
            <tr>
              <td
                className={`${styles.tableHeader} text-center d-sm-none d-table-cell`}
              >
                Anual
              </td>
              <td
                className={`${styles.tableHeader} text-center d-sm-none d-table-cell`}
              >
                12 Cuotas
              </td>
            </tr>
            <tr>
              <td
                className={`${styles.totals} ${styles.noBorder} text-center align-middle d-sm-none d-table-cell`}
              >
                ${number_format(sum, 2, ",", ".")}
              </td>
              <td
                className={`${styles.totals} ${styles.noBorder} text-center align-middle d-sm-none d-table-cell`}
              >
                ${number_format(sum / 12, 2, ",", ".")}
              </td>
            </tr>
          </tbody>
        </Table>
      </Form>
    </>
  );
}

export default TablaCotizador;
