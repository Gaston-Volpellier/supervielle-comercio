import { Activity } from "models/Activities";
import { Branch } from "models/Branch";
import { Country } from "models/Country";
import { Locality } from "models/Locality";
import { Province } from "models/Province";
import { Specialist } from "models/Specialist";

export default async function handler(req, res) {
  console.log("Request: ", req.query);
  const request = req.query;

  try {
    const specialist = await Specialist.findOne({
      where: { id: request.specialist },
    });

    const activity = await Activity.findOne({
      where: { id: request.activity },
    });

    const branch = await Branch.findOne({
      where: { id: request.branch },
    });

    const country = await Country.findOne({
      where: { id: request.country },
    });

    const homeProvince = await Province.findOne({
      where: { id: request.homeProvince },
    });

    const riskProvince = await Province.findOne({
      where: { id: request.riskProvince },
    });

    const homeLocality = await Locality.findOne({
      where: { id: request.homeLocality },
    });

    const riskLocality = await Locality.findOne({
      where: { id: request.riskLocality },
    });

    const response = {
      specialist: specialist.dataValues.name,
      activity: activity.dataValues.description,
      activityExclusion: activity.dataValues.exclusion,
      branch: branch.dataValues.name,
      country: country.dataValues.name,
      homeProvince: homeProvince.dataValues.name,
      homeLocality: homeLocality.dataValues.name,
      riskProvince: riskProvince.dataValues.name,
      riskLocality: riskLocality.dataValues.name,
    };

    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
