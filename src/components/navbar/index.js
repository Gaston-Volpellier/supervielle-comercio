import React from "react";
import { Col, Image, Navbar } from "react-bootstrap";
import styles from "@/styles/components/Navbar.module.scss";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faX } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
  const router = useRouter();
  const back = router.pathname === "/" ? false : true;
  const close = router.pathname === "/" ? false : true;

  return (
    <header>
      <Navbar
        sticky="top"
        className={`${styles.topNav} justify-content-space-between`}
      >
        <Col className="col-3 d-flex justify-content-left">
          {back && (
            <div
              className={styles.back}
              onClick={() => router.back({ scroll: false })}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              <div className={`${styles.backText} d-none d-sm-block`}>
                Volver
              </div>
            </div>
          )}
        </Col>
        <Col className="col-6 d-flex justify-content-center">
          <Image
            src="/logo_seguros_supervielle.png"
            alt="Logo"
            className="d-none d-sm-block"
          ></Image>
          <Image
            src="/KITE.png"
            alt="Logo"
            className="d-sm-none d-block"
          ></Image>
        </Col>
        <Col className="col-3 d-flex justify-content-end">
          {close && (
            <>
              <button
                type="button"
                className={`${styles.closeButton} close d-none d-sm-block `}
                aria-label="Close"
              >
                Cerrar <FontAwesomeIcon className="ms-1" icon={faX} />
              </button>
              <div className={`${styles.back} d-block d-sm-none`}>
                <FontAwesomeIcon icon={faX} />
              </div>
            </>
          )}
        </Col>
      </Navbar>
    </header>
  );
};

export default Menu;
