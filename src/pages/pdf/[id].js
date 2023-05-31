import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import styles from "@/styles/pages/PDF.module.scss";
import Head from "next/head";
import axios from "axios";
import { findSingleData, number_format } from "util/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

const PDFfile = (props) => {
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [policyInfo, setPolicyInfo] = useState({
    activity: "",
    activityExclusion: "",
    branch: "",
    country: "",
    homeLocality: "",
    homeProvince: "",
    riskLocality: "",
    riskProvince: "",
    specialist: "",
  });
  const deduciblesFranquicias = props.deduciblesFranquicias;
  const clausulasAdicionales = props.clausulasAdicionales.data;
  const { policyData, insurancePolicies, coverages, creditCards, policyID } =
    props;

  const handlePolicyInfo = (response) => {
    setPolicyInfo(response);
  };

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        specialist: policyData.specialist,
        activity: policyData.activity,
        branch: policyData.branch,
        country: policyData.country,
        homeProvince: policyData.homeProvince,
        homeLocality: policyData.homeLocality,
        riskProvince: policyData.riskProvince,
        riskLocality: policyData.riskLocality,
      };

      try {
        const res = await axios.get(`/api/fetch/data`, { params });
        const response = res.data.response;
        console.log("Response", response);
        handlePolicyInfo(response);
      } catch (error) {
        console.log("Data fetch error: ", error);
      }
    };
    const today = new Date();
    setDate(
      today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()
    );
    setTime(today.toLocaleTimeString());
    fetchData();
  }, []);
  const insuranceData = JSON.parse(policyData.insuranceData);
  const sum = insuranceData.reduce((accumulate, item) => {
    return accumulate + item.rate;
  }, 0);
  const mainInsurance = findSingleData(1, insuranceData).value;

  const formattedCardNumber =
    policyData.cardNumber.substring(0, 4) +
    " " +
    policyData.cardNumber.substring(4, 8) +
    " " +
    policyData.cardNumber.substring(8, 12) +
    " " +
    policyData.cardNumber.substring(12, 16);

  console.log("policyData: ", policyData.emitted);

  return (
    <>
      <Head>
        <title>Impresion poliza - Supervielle </title>
        <meta name="description" content="" />
      </Head>
      <div className={styles.containerBody}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <h4>
              {policyData.emitted ? "Solicitud de Emisión" : "Cotización"} -
              Seguro de Integral de Comercio #{policyID}
            </h4>
            <img src="/logo_seguros_supervielle.png" alt="supervielle logo" />
          </div>
          <hr className={styles.primarySeparator} />
          <div className={styles.headerBot}>
            <div>
              <div>
                <b> Especialista: </b> {policyInfo.specialist}
              </div>
              <p>Seguro Integral de Comercio</p>
            </div>
            <div
              onClick={() => window.print()}
              className={`${styles.printIcon}`}
            >
              <FontAwesomeIcon icon={faPrint} />
            </div>
          </div>
        </div>
        <div className={styles.mainBody}>
          <div className={`${styles.sectionPrimary} ${styles.sectionFirst}`}>
            <div>
              <h4>Hola "{policyData.recipient}"</h4>
              <p>
                Por el presente solicito mi incorporación al Seguro de Integral
                de Comercio, emitido por Supervielle Seguros S.A., acepto
                expresamente las Condiciones Generales, Particulares y
                Específicas de la Póliza y en un todo de acuerdo con las
                Condiciones y Características de las coberturas listadas a
                continuación.
              </p>
              <br />
              <h5>ADVERTENCIA IMPORTANTE</h5>
              <p>
                Art. 5 de la ley N°17.418: Toda declaración falsa o toda
                reticencia de circunstancias por el Asegurado, aún hechas de
                buena fe, que a juicio de peritos hubiese impedido o modificado
                sus condiciones si el Asegurado hubiese sido cerciorado del
                verdadero estado del riesgo, hace nulo el contrato.
              </p>
            </div>
            <div className={styles.datesSection}>
              <p>
                <b> Fecha: </b>
                {date}
              </p>
              <p>
                <b> Hora: </b>
                {time}
              </p>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Datos tomador</div>
            <div className={styles.sectionPrimary}>
              <ul className={styles.detailList}>
                <li>
                  <p>Destinatario: </p>
                  {policyData.recipient}
                </li>
                <li>
                  <p>Razón Social: </p>
                  {policyData.legalName}
                </li>
                <li>
                  <p>Correo Elecrónico: </p>
                  {policyData.email}
                </li>
                <li>
                  <p>CuiT/Cuil/CDI: </p>
                  {policyData.cuit}
                </li>
                <li>
                  <p>Teléfono: </p>
                  {policyData.prefix} - {policyData.phone}
                </li>
                <li>
                  <p>Actividad comercial: </p>
                  {policyInfo.activity}
                </li>
                <li>
                  <p>Medio de pago: </p>
                  {findSingleData(policyData.payment, creditCards).name}
                </li>
                <li>
                  <p>Numero de tarjeta: </p>
                  {formattedCardNumber}
                </li>
                <li>
                  <p>Vencimiento: </p>
                  {policyData.expiration}
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Datos de Riesgo</div>
            <div className={styles.sectionPrimary}>
              <ul className={styles.detailList}>
                <li>
                  <p>Domicilio: </p>
                  {policyData.homeAddress}
                </li>
                <li>
                  <p>Localidad: </p>
                  {policyInfo.homeLocality}
                </li>
                <li>
                  <p>Provincia: </p>
                  {policyInfo.homeProvince}
                </li>
                <li>
                  <p>Actividad comercial: </p>
                  {policyInfo.activity}
                </li>
                <li>
                  <p>Metros cuadrados: </p>
                  {policyData.surface} m&sup2;
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Coberturas</div>
            <div className={styles.sectionSecondary}>
              <Table className={styles.tableFormat} borderless>
                <tbody>
                  <tr>
                    <th width="859px" className={styles.fontPrimary}>
                      Coberturas
                    </th>
                    <th width="110px" className={styles.fontPrimary}>
                      SA Elegida
                    </th>
                    <th width="110px" className={styles.fontPrimary}>
                      Prima
                    </th>
                  </tr>
                  {policyData &&
                    insuranceData.map((element) => {
                      const elementData = findSingleData(
                        element.id,
                        insurancePolicies.data
                      );
                      return (
                        <tr key={`insuranceData_${element.id}`}>
                          <td>
                            <div className={styles.fontPrimary}>
                              {elementData.name}
                            </div>
                            <p className={styles.fontSecondary}>
                              {elementData.description}
                            </p>
                          </td>
                          <td
                            className={`${styles.fontPrimary} ${styles.numerMinWidth}`}
                          >
                            $ {number_format(element.value, 0, ",", ".")}
                          </td>
                          <td
                            className={`${styles.fontTertiary} ${styles.numerMinWidth} `}
                          >
                            $ {number_format(element.rate, 2, ",", ".")}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Coberturas Extras</div>
            <div className={styles.sectionPrimary}>
              <Table className={styles.tableFormat} borderless>
                <tbody>
                  {coverages.data.map((element) => (
                    <tr key={`coverage_${element.id}`}>
                      <td className={`${styles.largeColumn}`}>
                        <div className={`${styles.fontPrimary}`}>
                          {element.name}
                        </div>
                        <p className={`${styles.fontSecondary}`}>
                          {element.description}
                        </p>
                      </td>
                      <td
                        className={`${styles.fontPrimary} ${styles.smallColumn}`}
                      >
                        $
                        {element.formula === "rate"
                          ? number_format(
                              mainInsurance * element.rate,
                              2,
                              ",",
                              "."
                            )
                          : number_format(
                              findSingleData(3, insuranceData).value,
                              2,
                              ",",
                              "."
                            )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Coberturas Adicionales</div>
            <div className={styles.sectionPrimary}>
              {clausulasAdicionales.map((e) => (
                <div
                  key={`adicional_${e.id}`}
                  className={styles.descriptionContainer}
                >
                  <div className={`${styles.fontPrimary}`}>{e.name}</div>
                  <p className={`${styles.fontSecondary}`}>{e.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Deducibles y franquicias</div>
            <div className={styles.sectionSecondary}>
              <Table className={`${styles.smallTableFormat}`} borderless>
                <thead>
                  <tr>
                    <th className={styles.cardTitle}>Coberturas extras</th>
                    <th className={styles.cardTitle}>Mínimo</th>
                    <th className={styles.cardTitle}>%</th>
                  </tr>
                </thead>
                <tbody>
                  {deduciblesFranquicias.map((e) => (
                    <tr
                      key={`franquicias_${e.id}`}
                      className={styles.titleSecondary}
                    >
                      <td>{e.title}</td>
                      <td>$ {e.amount}</td>
                      <td>{e.percentage * 100}%</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Concepto</div>
            <div className={styles.sectionSecondary}>
              <Table
                className={`${styles.smallTableFormat} ${styles.fontPrimary}`}
                borderless
              >
                <thead>
                  <tr>
                    <th className={`${styles.cardTitle} ${styles.largeColumn}`}>
                      Concepto
                    </th>
                    <th className={`${styles.cardTitle} ${styles.smallColumn}`}>
                      Porcentaje %
                    </th>
                    <th className={`${styles.cardTitle} ${styles.smallColumn}`}>
                      Anual
                    </th>
                    <th className={`${styles.cardTitle} ${styles.smallColumn}`}>
                      Mensual
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={2}>Prima Final</td>
                    <td
                      className={`${styles.fontPrimary} ${styles.black} ${styles.smallColumn}`}
                    >
                      $ {number_format(sum, 2, ",", ".")}
                    </td>
                    <td
                      className={`${styles.fontPrimary} ${styles.black} ${styles.smallColumn}`}
                    >
                      $ {number_format(sum / 12, 2, ",", ".")}
                    </td>
                  </tr>
                  <tr>
                    <td>Tasa SNN</td>
                    <td className={`${styles.smallColumn}`}>0,6%</td>
                    <td className={`${styles.smallColumn}`}>
                      $ {number_format(sum * 0.6, 2, ",", ".")}
                    </td>
                    <td className={`${styles.smallColumn}`}>
                      $ {number_format((sum / 12) * 0.6, 2, ",", ".")}
                    </td>
                  </tr>
                  <tr>
                    <td>IVA</td>
                    <td className={`${styles.smallColumn}`}>21%</td>
                    <td className={`${styles.smallColumn}`}>
                      $ {number_format(sum * 0.21, 2, ",", ".")}
                    </td>
                    <td className={`${styles.smallColumn}`}>
                      $ {number_format((sum / 12) * 0.21, 2, ",", ".")}
                    </td>
                  </tr>
                  <tr>
                    <td>Servicios sociales</td>
                    <td className={`${styles.smallColumn}`}>0,5%</td>
                    <td className={`${styles.smallColumn}`}>
                      $ {number_format(sum * 0.5, 2, ",", ".")}
                    </td>
                    <td className={`${styles.smallColumn}`}>
                      $ {number_format((sum / 12) * 0.5, 2, ",", ".")}
                    </td>
                  </tr>
                  <tr>
                    <td>Impuestos internos</td>
                    <td className={`${styles.smallColumn}`}>0,1%</td>
                    <td className={`${styles.smallColumn}`}>
                      $ {number_format(sum * 0.1, 2, ",", ".")}
                    </td>
                    <td className={`${styles.smallColumn}`}>
                      $ {number_format((sum / 12) * 0.1, 2, ",", ".")}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className={styles.titleLarge}>Premio Final</div>
                      <div className={styles.fontSecondary}>
                        El premio no incluye sellados provinciales que se
                        adicionaran en caso de corresponer.
                      </div>
                    </td>
                    <td
                      className={`${styles.fontPrimary} ${styles.black} ${styles.smallColumn}`}
                    >
                      $ {number_format(sum * 1.222, 2, ",", ".")}
                    </td>
                    <td
                      className={`${styles.fontPrimary} ${styles.black} ${styles.smallColumn}`}
                    >
                      $ {number_format((sum / 12) * 1.222, 2, ",", ".")}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sectionTitle}></div>
            <div className={styles.sectionPrimary}>
              <div className={styles.descriptionContainer} id="optional-text">
                {policyInfo.activityExclusion}
              </div>
              <div className={styles.descriptionContainer}>
                <div className={styles.fontPrimary}>Adjuntar</div>
                <p>
                  (i) Copia certificada del estatuto social actualizado. (ii)
                  Copia certificada de Actas de designación de autoridades,
                  representantes legales, apoderados y/o autorizados con uso de
                  firma social. (iii) Titularidad del capital social (registro
                  de acciones) (iv) Identificación de las personas físicas que
                  directa o indirectamente ejerzan el control real de la persona
                  jurídica.
                </p>
              </div>
              <div className={styles.descriptionContainer}>
                <div className={styles.fontPrimary}>
                  Declaración Jurada sobre Sujeto Obligado
                </div>
                <p>
                  Manifiesto con carácter de declaración jurada que me encuentro
                  □ no me encuentro □ alcanzado como Sujeto Obligado conforme el
                  artículo 20 de la Ley 25.246 y modificatorias. En caso
                  afirmativo adjuntar constancia de inscripción ante la Unidad
                  de Información Financiera. En caso de ser Sujeto Obligado
                  declaro bajo juramento que Si □ No □ cumplo con las
                  disposiciones vigentes en materia de Prevención de Lavado de
                  activos y Financiación del Terrorismo.
                </p>
              </div>
              <div className={styles.descriptionContainer}>
                <div className={styles.fontPrimary}>
                  Declaración Jurada de Origen y Licitud de Fondos
                </div>
                <p>
                  En cumplimiento de lo establecido en la Ley N° 25.246,
                  Resolución de la Unidad de Información Financiera N° 28/2018,
                  y normas complementarias y concordantes (en adelante la
                  “Normativa”) por la presente declaro bajo juramento que los
                  fondos utilizados para las operaciones que se realizan con
                  Supervielle Seguros S.A., provienen de actividades lícitas y
                  tienen su origen en el desarrollo de las actividades
                  económicas indicadas seguidamente:
                  __________________________________________________________________
                  El Cliente se compromete a aportar a pedido de Supervielle
                  Seguros toda la información/documentación tendiente a
                  acreditar su identidad, personería, domicilio y cualquier otro
                  dato necesario a criterio de Supervielle Seguros para dar
                  cumplimiento a la normativa vigente. Supervielle Seguros podrá
                  disponer el cese de todos o algunos de los productos/servicios
                  contratados por el Cliente cuando (i) en virtud de la
                  documentación/información aportada no se pudiera dar
                  cumplimiento a la identificación y conocimiento del Cliente,
                  (ii) Supervielle Seguros hubiese determinado que el hecho u
                  operación motivo de análisis mereciera la calificación de
                  “sospechoso/a”, en los términos de la normativa aplicable, y/o
                  (iii) las operaciones del Cliente no guarden razonable
                  relación con su actividad u ocupación declarada en la
                  Solicitud. Toda la información aportada por el Cliente tiene
                  carácter de declaración jurada. Asumo el compromiso de
                  informar cualquier modificación que se produzca a este
                  respecto, dentro de los treinta (30) días de ocurrida,
                  mediante la presentación de una nueva declaración jurada. Se
                  deja constancia que la información que se requiera a los fines
                  de la normativa citada, no se considera incumplimiento de lo
                  dispuesto en el artículo 21 inciso c) de la Ley Nº 25.246. Se
                  encuentran a disposición del cliente en las oficinas de la
                  Compañía el texto completo de la Resolución Nº 28/2018 de la
                  Unidad de Información Financiera; puede también en el sitio w
                  ww.uif.gov.ar. Acepto la adhesión a Póliza Digital y tomo
                  conocimiento que en cualquier momento podré solicitar un
                  ejemplar original de la documentación. Autorizo que el pago
                  del premio se debite de mi cuenta o tarjeta de crédito antes
                  consignada y acepto que el mismo quede sujeto conforme a los
                  términos y condiciones establecidos en la Cláusula de Cobranza
                  del Premio de las Condiciones Particulares de la Póliza.
                </p>
              </div>
              <div className={styles.signingSection}>
                <div className={`${styles.fontPrimary} ${styles.fontPrimary}`}>
                  <b>Agente Institorio</b> <br />
                  Banco Supervielle S.A. CUIT  33-50000517-9
                  <br />
                  Broker Supervielle Seguros S.A.
                </div>
                <hr className={styles.signLine} />
                <div className={styles.signText}>
                  <p>Firma de cliente</p>
                  <p>Aclaración de la firma</p>
                  <p>Lugar y fecha</p>
                </div>
                <div className={styles.fontSecondary}>
                  El titular de los datos personales tiene la facultad de
                  ejercer el derecho de acceso a los mismos en forma gratuita a
                  intervalos no inferiores a seis meses, salvo que se acredite
                  un interés legítimo al efecto conforme lo establecido en el
                  artículo 14, inciso 3 de la Ley Nº 25.326.- La DIRECCION
                  NACIONAL DE PROTECCION DE DATOS PERSONALES, Órgano de Control
                  de la Ley Nº 25.326, tiene la atribución de atender las
                  denuncias y reclamos que se interpongan con relación al
                  incumplimiento de las normas sobre protección de datos
                  personales.
                </div>
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sectionPrimary}>
              <hr className={styles.secondarySeparator} />
              <p>
                *Este informe es a modo informativo, su emisión no queiere decir
                que la denuncia está aprobada.
                <br />
                SUPERVIELLE SEGUROS S.A. <br />
                San Martín 344 Piso 15 | C.A.B.A - C1004AAH
                <br />
                Centro de Atención al Asegurado: 0800-345-1599
                <br />
                TEL: 5272-3305 – FAX: 5272-3389
                <br />
                I.V.A.: Responsable Inscripto
                <br />
                ING. BRUTOS: 901-265633-2 CUIT: 30-68250085-5
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PDFfile;

export async function getServerSideProps({ query }) {
  const { data: dataDeducibles } = await axios.get(
    `${process.env.BASE_URL}/api/fetch/deductibles`
  );
  const { data: clausulasAdicionales } = await axios.get(
    `${process.env.BASE_URL}/api/fetch/additionals`
  );

  const policyResponse =
    query.id !== 0
      ? await axios.get(`${process.env.BASE_URL}/api/fetch/main/${query.id}`)
      : null;
  const { data: insurancePolicies } = await axios.get(
    `${process.env.BASE_URL}/api/fetch/insurances`
  );
  const { data: coverages } = await axios.get(
    `${process.env.BASE_URL}/api/fetch/coverages`
  );
  const { data: cardsData } = await axios.get(
    `${process.env.BASE_URL}/api/fetch/credit-card`
  );

  const deduciblesFranquicias = dataDeducibles.data;
  const policyData = policyResponse.data.response[0];
  const creditCards = cardsData.data;
  const policyID = query.id;

  return {
    props: {
      deduciblesFranquicias,
      clausulasAdicionales,
      policyData,
      insurancePolicies,
      coverages,
      creditCards,
      policyID,
    },
  };
}
