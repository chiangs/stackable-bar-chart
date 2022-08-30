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
  revealTooltipHandler = (data: any | null) => data,
  barClickHandler = () => null,
}) => {
  const displayValue = showPercentage ? `${portion}%` : `${value}`;
  const valueWidth = mode === "stacked" ? renderPortion : portion;
  const tooltip = showTooltip ? "tooltip" : "";
  const transitionAnimation = "width .2s ease-out";
  const percentage = portion;

  // Events
  const onKey = (k: React.KeyboardEvent<HTMLDivElement>) => {
    if (k.key === "Tab") {
      revealTooltipHandler({
        label,
        value,
        color: background,
        background: color,
        percentage,
        k,
      });
    }
  };

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

  const onRevealTooltip = ({
    label,
    value,
    color,
    background,
    percentage,
    e,
    k,
  }: BarData) =>
    revealTooltipHandler({
      label,
      value,
      color: background,
      background: color,
      percentage,
      e,
    });

  return (
    <div
      className={`${NAME_COMPONENT} ${mode} ${tooltip}`}
      style={styleContainer}
      data-testid={NAME_COMPONENT}
      onMouseOver={(e) =>
        onRevealTooltip({
          label,
          value,
          color: background,
          background: color,
          percentage,
          e,
        })
      }
      onMouseOut={() => revealTooltipHandler(null)}
      onClick={() => barClickHandler({ value, label, percentage })}
      onKeyUp={(e) => onKey(e)}
      tabIndex={0}
    >
      <div className="bar-value" style={styleContainer}>
        {barContent}
      </div>
    </div>
  );
};

export default Bar;
