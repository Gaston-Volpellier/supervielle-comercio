import { Deductibles } from "models/Deductibles";

export default async function handler(req, res) {
  try {
    const data = await Deductibles.findAll({ where: { status: 1 } });
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
