import { Policy } from "models/Policy";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  try {
    const {
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
      insuranceData,
    } = req.body.data;

    if (policyId === 0) {
      const currentPolicy = await Policy.create({
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
        insuranceData,
      });

      const newId = currentPolicy.id;
      return res.status(200).json({ id: newId });
    } else if (policyId > 0) {
      const updatedPolicy = await Policy.update(
        {
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
          insuranceData,
        },
        { where: { id: policyId } }
      );
      return res.status(200).json({ id: policyId });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
