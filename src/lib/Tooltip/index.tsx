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
  const position = e ? "fixed" : "initial";
  const style: React.CSSProperties = {
    background,
    color,
    left,
    top,
    position,
  };
  return (
    <div className={NAME_COMPONENT} style={style} data-testid={NAME_COMPONENT}>
      <span>
        {value} {label} - {`${percentage}%`}
      </span>
    </div>
  );
};

export default React.memo(Tooltip);
