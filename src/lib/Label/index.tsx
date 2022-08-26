import * as React from "react";

type Props = {
  children: any;
};

const NAME_COMPONENT = "stackable-bar-label";

const Label: React.FC<Props> = (props: Props) => (
  <h3 data-testid={NAME_COMPONENT}>{props.children}</h3>
);

export default Label;
