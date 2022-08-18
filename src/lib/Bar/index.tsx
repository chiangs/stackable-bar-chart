import type { BarProps } from "../__types";

type Props = BarProps;

const NAME_COMPONENT = "stackable-bar";

const Bar: React.FC<Props> = ({
  value = 0,
  color = undefined,
  background = undefined,
  renderPortion = 0,
  mode = "linear",
}) => {
  const width = `calc(${renderPortion}% + 1em)`;
  const styleBar = { width, background: color };
  const styleText = { color: background };
  return (
    <div className={`${NAME_COMPONENT} ${mode}`} data-testid={NAME_COMPONENT}>
      <div className="bar-value" style={styleBar}>
        <span className="bar-value-text" style={styleText}>
          {value}
        </span>
      </div>
    </div>
  );
};

export default Bar;
