import { AiOutlineWifi } from "@react-icons/all-files/ai/AiOutlineWifi";
import { GiFireplace, GiGreenhouse, GiKitchenKnives } from "react-icons/gi";
import { BiSolidCarGarage } from "react-icons/bi";
import { TbParking } from "react-icons/tb";
import { MdOutlineLandscape } from "react-icons/md";
import { MdOutlineBalcony } from "react-icons/md";
import { LiaChessSolid, LiaMedkitSolid } from "react-icons/lia";
import {
  PiFlowerTulipLight,
  PiThermometerColdLight,
  PiThermometerHotLight,
} from "react-icons/pi";

import { TvIcon } from "@heroicons/react/24/outline";

import ClipLoader from "react-spinners/ClipLoader";

export const icons = [
  { id: "wi-fi", icon: <AiOutlineWifi className="h-5 w-5" /> },
  { id: "garage", icon: <BiSolidCarGarage className="h-5 w-5" /> },
  { id: "kitchen", icon: <GiKitchenKnives className="h-5 w-5" /> },
  { id: "parking", icon: <TbParking className="h-5 w-5" /> },
  { id: "patio", icon: <GiGreenhouse className="h-5 w-5" /> },
  { id: "garden", icon: <PiFlowerTulipLight className="h-5 w-5" /> },
  { id: "view", icon: <MdOutlineLandscape className="h-5 w-5" /> },
  { id: "medkit", icon: <LiaMedkitSolid className="h-5 w-5" /> },
  { id: "chess", icon: <LiaChessSolid className="h-5 w-5" /> },
  { id: "cold water", icon: <PiThermometerColdLight className="h-5 w-5" /> },
  { id: "tv", icon: <TvIcon className="h-5 w-5" /> },
  { id: "balcony", icon: <MdOutlineBalcony className="h-5 w-5" /> },
  { id: "fireplace", icon: <GiFireplace className="h-5 w-5" /> },
  { id: "heating", icon: <PiThermometerHotLight className="h-5 w-5" /> },
];

type Props = {
  feature: string;
};

export default function FeatureItem({ feature }: Props) {
  const featureIcon = icons.find((icon) =>
    icon.id.includes(feature.toLowerCase())
  );

  return (
    <li className="flex cursor-default items-center gap-2 dark:text-white">
      <span className="">
        {featureIcon?.icon ? (
          featureIcon?.icon
        ) : (
          <ClipLoader size={16} className="opacity-80" />
        )}
      </span>
      {feature}
    </li>
  );
}
