import { Estate } from "../../typings";
import { estateData } from "../static/estate-data";

export function getAllEstates(userEstates: Estate[]) {
  return userEstates.concat(estateData);
}
