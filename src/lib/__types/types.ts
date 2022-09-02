export type Mode = 'stacked' | 'linear';

export type Rounding = 'nearest' | 'up' | 'down';

export type Position = 'none' | 'top' | 'bottom' | 'left' | 'right' | 'default';

export type SortProperty = 'none' | 'largest' | 'smallest';

export interface ChartData {
    label: string;
    value: number;
    color?: string;
}

export interface BarData extends ChartData {
    background?: string;
    percentage?: number;
    e?: React.MouseEvent<HTMLDivElement, MouseEvent>;
    k?: React.KeyboardEvent<HTMLDivElement>;
}

export interface BarProps extends ChartData {
    background?: string;
    portion?: number;
    renderPortion?: number;
    showPercentage?: boolean;
    showTooltip?: boolean;
    mode?: Mode;
    revealTooltipHandler?: (data: BarData | null) => void;
    barClickHandler?: (d: Partial<BarData>) => Partial<BarData> | null;
}

export interface ChartProps {
    data?: ChartData[];
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
