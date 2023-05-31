import { Locality } from "models/Locality";

export default async function handler(req, res) {
  try {
    const response = await Locality.findAll({
      where: { province: req.query.locality, status: 1 },
    });
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
