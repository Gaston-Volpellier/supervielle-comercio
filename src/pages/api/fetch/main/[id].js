import { Policy } from "models/Policy";

export default async function handler(req, res) {
  try {
    const response = await Policy.findAll({
      where: { id: req.query.id, status: 1 },
    });
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
