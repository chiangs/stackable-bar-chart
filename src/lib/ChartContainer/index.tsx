type Props = {
  children: any;
};

const NAME_COMPONENT = "chart-container";

const ChartContainer = ({ children }: Props) => (
  <div className={NAME_COMPONENT} data-testid={NAME_COMPONENT}>
    {children}
  </div>
);

export default ChartContainer;
