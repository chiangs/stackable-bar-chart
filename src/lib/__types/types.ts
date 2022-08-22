export type Mode = "stacked" | "linear";

export type Rounding = "nearest" | "up" | "down";

export interface BarProps {
  value: number;
  label: string;
  portion?: number;
  renderPortion?: number;
  color?: string;
  background?: string;
  mode?: Mode;
  showPercentage?: boolean;
}

export interface ChartProps {
  data?: BarProps[];
  mode?: Mode;
  rounding?: Rounding;
  sortLinear?: boolean;
  colorBackground?: string;
  showPercentage?: boolean;
}
