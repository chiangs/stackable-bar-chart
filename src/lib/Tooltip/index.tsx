import * as React from "react";
import { BarData } from "../__types";

type Props = BarData;

const NAME_COMPONENT = "tooltip-container";

const Tooltip: React.FC<Props> = ({
  label,
  value,
  color,
  background,
  percentage,
  e,
}) => {
  const left = e ? e.clientX + 15 : 0;
  const top = e?.clientY || 0;
  const style = {
    background,
    color,
    left,
    top,
  };
  return (
    <div className={NAME_COMPONENT} style={style}>
      <span>
        {value} {label} - {`${percentage}%`}
      </span>
    </div>
  );
};

export default Tooltip;
