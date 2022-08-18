export type Mode = "stacked" | "linear";

export interface BarProps {
  value: number;
  label: string;
  portion?: number;
  renderPortion?: number;
  color?: string;
  background?: string;
  mode?: Mode;
}

export interface ChartProps {
  data?: BarProps[];
  mode?: Mode;
  sortLinear?: boolean;
  colorBackground?: string;
}
