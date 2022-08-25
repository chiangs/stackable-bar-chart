export type Mode = "stacked" | "linear";

export type Rounding = "nearest" | "up" | "down";

export type Position = "none" | "top" | "bottom" | "left" | "right";

export type SortProperty = "none" | "largest" | "smallest";

export interface BarData {
  label: string;
  value: number;
  percentage?: number;
  color?: string;
  background?: string;
}

export interface BarProps {
  value: number;
  label: string;
  portion?: number;
  renderPortion?: number;
  color?: string;
  background?: string;
  mode?: Mode;
  showPercentage?: boolean;
  showTooltip?: boolean;
  revealTooltipHandler?: (data: BarData | null) => void;
}

export interface ChartProps {
  data?: BarProps[];
  mode?: Mode;
  rounding?: Rounding;
  sortLinear?: SortProperty;
  showTooltip?: boolean;
  colorBackground?: string;
  showPercentage?: boolean;
  titlePosition?: Position;
  children?: any;
}
