import { Specialist } from "models/Specialist";

export default async function handler(req, res) {
  try {
    const data = await Specialist.findAll({ where: { status: 1 } });
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
