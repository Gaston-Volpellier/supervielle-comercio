import React, { createContext, useContext, useState } from "react";

const policyContext = createContext();

export function PolicyProvider({ children }) {
  const policy = usePolicyProvider();
  return (
    <policyContext.Provider value={policy}>{children}</policyContext.Provider>
  );
}

export const usePolicy = () => {
  return useContext(policyContext);
};

function usePolicyProvider() {
  const [policyId, setPolicyId] = useState(0);
  const [oficial, setOficial] = useState();
  const [branch, setBranch] = useState();
  const [specialist, setSpecialist] = useState();
  const [recipient, setRecipient] = useState("");
  const [legalName, setLegalName] = useState("");
  const [cuit, setCuit] = useState("");
  const [IVA, setIVA] = useState();
  const [IIBB, setIIBB] = useState();
  const [email, setEmail] = useState("");
  const [prefix, setPrefix] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState();
  const [homeAddress, setHomeAddress] = useState("");
  const [riskAddress, setRiskAddress] = useState("");
  const [homeLocality, setHomeLocality] = useState();
  const [riskLocality, setRiskLocality] = useState();
  const [homeProvince, setHomeProvince] = useState();
  const [riskProvince, setRiskProvince] = useState();
  const [CP, setCP] = useState();
  const [activity, setActivity] = useState();
  const [surface, setSurface] = useState();
  const [payment, setPayment] = useState();
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [surfaceValue, setSurfaceValue] = useState(0);
  const [insuranceData, setInsuranceData] = useState([
    {
      id: 1,
      value: '',
      rate: '',
      error : true
    },
    {
      id: 2,
      value: '',
      rate: '',
      error : true
    },
  ]);
  const [insuranceError, setInsuranceError] = useState(true);

  const handleOficial = (e) => {
    setOficial(e.id);
  };
  const handleBranch = (e) => {
    setBranch(e.id);
  };
  const handleSpecialist = (e) => {
    setSpecialist(e.id);
  };
  const handleRecipient = (e) => {
    setRecipient(e.target.value);
  };
  const handleLegalName = (e) => {
    setLegalName(e.target.value);
  };
  const handleCuit = (value) => {
    setCuit(value);
  };
  const handleIVA = (e) => {
    setIVA(e.target.value);
  };
  const handleIIBB = (e) => {
    setIIBB(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePrefix = (e) => {
    setPrefix(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleCountry = (e) => {
    //setCountry(e.target.value);
    setCountry(e.id);
  };
  const handleHomeAddress = (e) => {
    setHomeAddress(e.target.value);
  };
  const handleRiskAddress = (e) => {
    setRiskAddress(e.target.value);
  };
  const handleHomeLocality = (e) => {
    //setHomeLocality(e.target.value);
    setHomeLocality(e.id);
  };
  const handleRiskLocality = (e) => {
    //setRiskLocality(e.target.value);
    setRiskLocality(e.id);
  };
  const handleHomeProvince = (e) => {
    //setHomeProvince(e.target.value);
    setHomeProvince(e.id);
  };
  const handleRiskProvince = (e) => {
    //setRiskProvince(e.target.value);
    setRiskProvince(e.id);
  };
  const handleCP = (value) => {
    setCP(value);
  };
  const handleActivity = (e) => {
    //setActivity(e.target.value);
    setActivity(e.id);
  };
  const handleSurface = (value) => {
    setSurface(value);
  };
  const handlePayment = (e) => {
    setPayment(e.target.value);
  };
  const handleCardNumber = (value) => {
    setCardNumber(value);
  };
  const handleExpiration = (value) => {
    setExpiration(value);
  };
  const handleSurfaceValue = (value) => {
    setSurfaceValue(value);
  };
  const handlePolicyId = (value) => {
    setPolicyId(value);
  };

  const handleInsuranceData = (id, value, rate, error) => {
    const found = insuranceData.findIndex((element) => element.id === id);
    const addInsurance = (id, value, rate, error) => {
      const newInsurance = { id: id, value: value, rate: rate, error : error };
      let ins = [...insuranceData, newInsurance];
      setInsuranceData(ins);
      updateInsuranceError(ins);
    };

    const updateInsurance = (id, value, rate, error) => {
      let ins = insuranceData.map((item) => {
        if (item.id === id) {
          return { ...item, value: value, rate: rate, error : error };
        } else {
          return item;
        }
      });
      setInsuranceData(ins);
      updateInsuranceError(ins);
    };

    const updateInsuranceError = (ins) => {
      setInsuranceError(false);
      ins.forEach(element => {
        if (element.error == true) {
          setInsuranceError(true);
        }
      });
    }

    if (found === -1) {
      addInsurance(id, value, rate, error);
    } else {
      updateInsurance(id, value, rate, error);
    }
  };

  const removeInsuranceData = (id) => {
    setInsuranceData(insuranceData.filter((item) => item.id !== id));
  };

  const resetInsurance = () => {
    const initialState = [
      {
        id: 1,
        value: 0,
        rate: 0,
        error : false
      },
      {
        id: 2,
        value: 0,
        rate: 0,
        error : false
      },
    ];
    setInsuranceData(initialState);
  };

  return {
    policyId,
    oficial,
    branch,
    specialist,
    recipient,
    legalName,
    cuit,
    IVA,
    IIBB,
    email,
    prefix,
    phone,
    country,
    homeAddress,
    riskAddress,
    homeLocality,
    riskLocality,
    homeProvince,
    riskProvince,
    CP,
    activity,
    surface,
    payment,
    cardNumber,
    expiration,
    surfaceValue,
    insuranceData,
    handlePolicyId,
    handleOficial,
    handleBranch,
    handleSpecialist,
    handleRecipient,
    handleLegalName,
    handleCuit,
    handleIVA,
    handleIIBB,
    handleEmail,
    handlePrefix,
    handlePhone,
    handleCountry,
    handleHomeAddress,
    handleRiskAddress,
    handleHomeLocality,
    handleRiskLocality,
    handleHomeProvince,
    handleRiskProvince,
    handleCP,
    handleActivity,
    handleSurface,
    handlePayment,
    handleCardNumber,
    handleExpiration,
    handleSurfaceValue,
    handleInsuranceData,
    removeInsuranceData,
    resetInsurance,
    insuranceError
  };
}
