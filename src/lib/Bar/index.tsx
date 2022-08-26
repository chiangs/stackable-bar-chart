import React, { useState, useEffect } from "react";
import type { BarData, BarProps } from "../__types";

type Props = BarProps;

const NAME_COMPONENT = "stackable-bar";

const Bar: React.FC<Props> = ({
  value = 0,
  label = "",
  color = undefined,
  background = undefined,
  portion = 0,
  renderPortion = 0,
  mode = "stacked",
  showPercentage = false,
  showTooltip = false,
  revealTooltipHandler = (data: BarData | null) => data,
}) => {
  const displayValue = showPercentage ? `${portion}%` : `${value}`;
  const valueWidth = mode === "stacked" ? renderPortion : portion;
  const tooltip = showTooltip ? "tooltip" : "";
  const transitionAnimation = "width .2s ease-out";

  // Default internal width
  const [barWidth, setBarWidth] = useState(0);
  // On load, update width
  useEffect(() => {
    setBarWidth(valueWidth);
  }, []);

  // Bar style
  const width = `${barWidth}%`;
  const styleBar = {
    width,
    background: color,
  };

  // Animation style
  const animatedStyle = {
    ...styleBar,
    transition: transitionAnimation,
  };

  // Set bar style
  const styleContainer = mode === "stacked" ? animatedStyle : styleBar;

  // Set bar text styles
  const styleText = {
    color: background,
  };
  // Create bar content: Stacked
  let barContent = (
    <span className="bar-value-text" style={styleText}>
      {value}
    </span>
  );

  if (mode === "linear") {
    barContent = (
      <div className="stacked-content" style={styleText}>
        <div className="bar-value-text">
          <h3>{displayValue}</h3>
        </div>
        <div className="bar-label-text">
          <p>
            {label}
            {showPercentage ? <span>&nbsp;-&nbsp;{value}</span> : null}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${NAME_COMPONENT} ${mode} ${tooltip}`}
      style={styleContainer}
      data-testid={NAME_COMPONENT}
      onMouseOver={() =>
        revealTooltipHandler({
          label,
          value,
          color: background,
          background: color,
          percentage: portion,
        })
      }
      onMouseOut={() => revealTooltipHandler(null)}
    >
      <div className="bar-value" style={styleContainer}>
        {barContent}
      </div>
    </div>
  );
};

export default Bar;
