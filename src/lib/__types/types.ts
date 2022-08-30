export type Mode = "stacked" | "linear";

export type Rounding = "nearest" | "up" | "down";

export type Position =
  | "none"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "default ";

export type SortProperty = "none" | "largest" | "smallest";

export interface BarData {
  color?: string;
  background?: string;
  label: string;
  value: number;
  percentage?: number;
  e?: React.MouseEvent<HTMLDivElement, MouseEvent>;
  k?: React.KeyboardEvent<HTMLDivElement>;
}

export interface BarProps {
  label: string;
  color?: string;
  background?: string;
  mode?: Mode;
  value: number;
  portion?: number;
  renderPortion?: number;
  showPercentage?: boolean;
  showTooltip?: boolean;
  revealTooltipHandler?: (data: BarData | null) => void;
  barClickHandler?: (d: Partial<BarData>) => Partial<BarData> | null;
}

export interface ChartProps {
  data?: BarProps[];
  mode?: Mode;
  roundTo?: Rounding;
  sortBy?: SortProperty;
  colorBackground?: string;
  titlePosition?: Position;
  showTooltip?: boolean;
  showPercentage?: boolean;
  clickHandler?: (d: Partial<BarData>) => any | null;
  children?: any;
}
