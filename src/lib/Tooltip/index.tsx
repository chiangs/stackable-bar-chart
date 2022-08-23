type Props = {
  children: any;
};

const NAME_COMPONENT = "tooltip";

const Tooltip: React.FC<Props> = ({ children }) => {
  return <div className={NAME_COMPONENT}>{children}</div>;
};

export default Tooltip;
