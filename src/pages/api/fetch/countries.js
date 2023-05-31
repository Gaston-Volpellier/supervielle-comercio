import { Country } from "models/Country";

export default async function handler(req, res) {
  try {
    const data = await Country.findAll({ where: { status: 1 } });
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
