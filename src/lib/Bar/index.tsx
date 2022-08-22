import type { BarProps } from "../__types";

type Props = BarProps;

const NAME_COMPONENT = "stackable-bar";

const Bar: React.FC<Props> = ({
  value = 0,
  label = "",
  color = undefined,
  background = undefined,
  portion = 0,
  renderPortion = 0,
  mode = "linear",
  showPercentage = false,
}) => {
  const displayValue = showPercentage ? `${portion}%` : `${value}`;
  const width = `${mode === "linear" ? renderPortion : portion}%`;
  const styleBar = { width, background: color };
  const styleText = {
    color: background,
  };
  let barContent = (
    <span className="bar-value-text" style={styleText}>
      {value}
    </span>
  );
  if (mode === "stacked") {
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
      className={`${NAME_COMPONENT} ${mode}`}
      style={styleBar}
      data-testid={NAME_COMPONENT}
    >
      <div className="bar-value" style={styleBar}>
        {barContent}
      </div>
    </div>
  );
};

export default Bar;
