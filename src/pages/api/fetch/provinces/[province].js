import { Province } from "models/Province";

export default async function handler(req, res) {
  try {
    const response = await Province.findAll({
      where: { country: req.query.province, status: 1 },
    });
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
