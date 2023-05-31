import { Policy } from "models/Policy";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  try {
    const { policyId } = req.body.data;

    if (policyId > 0) {
      await Policy.update({ emitted: 1 }, { where: { id: policyId } });
      return res.status(200).json({ id: policyId });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
