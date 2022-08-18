export type Mode = "stacked" | "linear";

export interface BarProps {
  value: number;
  label: string;
  width?: number;
  color?: string;
  mode?: Mode;
}

export interface ChartProps {
  data?: BarProps[];
  mode: Mode;
}
