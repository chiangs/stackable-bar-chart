import type { BarProps } from "../__types";

type Props = BarProps;

const NAME_COMPONENT = "stackable-bar";

const Bar: React.FC<Props> = ({
  value = 0,
  color = undefined,
  portion = 0,
  mode = "linear",
}) => {
  const proportion = 30;
  const style = { width: `${portion}%` };
  return (
    <div className={`${NAME_COMPONENT} ${mode}`} data-testid={NAME_COMPONENT}>
      <div className="bar-value" style={style}>
        {value}
      </div>
    </div>
  );
};

export default Bar;
