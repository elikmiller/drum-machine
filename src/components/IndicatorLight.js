import React from "react";
import className from "classnames";
import "./IndicatorLight.scss";

const IndicatorLight = ({ isActive }) => {
  const indicatorLightClass = className({
    indicatorLight: true,
    "indicatorLight-active": isActive,
  });
  return <div className={indicatorLightClass} />;
};

export default IndicatorLight;
