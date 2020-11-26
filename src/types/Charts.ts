export interface ChartOptions {
  background?: string;
  type: string;
  height: number;
  stacked?: boolean;
}

export interface StrokeOptions {
  curve: string;
}

export interface LabelsOptions {
  enabled: boolean;
}

export interface TitleOptions {
  text?: string;
  align?: string;
}

export interface HoverOptions {
  sizeOffset: number;
}

export interface MarkerOptions {
  hover: HoverOptions;
}

export interface ChartLegend {
  position?: string;
  horizontalAlign?: string;
  labels?: any;
}

export interface ChartFill {
  colors?: Array<any>;
  hover?: HoverOptions;
  type?: string;
  gradient?: {
    shade?: string;
    opacityFrom?: number;
    opacityTo?: number;
    shadeIntensity?: number;
    stops?: Array<any>;
  };
}

export interface OptionInterface {
  chart?: ChartOptions;
  stroke?: StrokeOptions;
  dataLabels?: LabelsOptions;
  title?: TitleOptions;
  markers?: MarkerOptions;
  colors?: string[];
  xaxis?: axisInterface;
  yaxis?: axisInterface;
  legend?: ChartLegend;
  fill?: ChartFill;
  grid?: GridInterface;
  tooltip?: tooltipInterface;
  theme?: themeInterface;
}

export interface themeInterface {
  mode?: string;
}

export interface SeriesInterface {
  name?: string;
  data?: number[] | TimeSeries[];
}

export interface GridInterface {
  show?: boolean;
  borderColor?: string;
  strokeDashArray?: number;
  position?: string;
  padding?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  xaxis?: {
    lines?: {
      show?: boolean;
    };
  };
  yaxis?: {
    lines?: {
      show?: boolean;
    };
  };
  row?: {
    colors?: string[];
    opacity?: number;
  };
  column?: {
    colors?: string[];
    opacity?: number;
  };
}

export interface tooltipInterface {
  enabled?: boolean;
  enabledOnSeries?: boolean;
  shared?: boolean;
  followCursor?: boolean;
  intersect?: boolean;
  inverseOrder?: boolean;
  fillSeriesColor?: boolean;
  theme?: string;
  style?: {
    fontSize?: string;
    fontFamily?: string;
  };
  onDatasetHover?: {
    highlightDataSeries?: boolean;
  };
  x?: {
    show?: boolean;
    format?: string;
  };
  y?: {
    title?: string;
  };
  z?: {
    formatter?: undefined;
    title?: string;
  };
  marker?: {
    show?: boolean;
  };
  items?: {
    display?: any;
  };
  fixed?: {
    enabled?: boolean;
    position?: string;
    offsetX?: number;
    offsetY?: number;
  };
}

export interface axisInterface {
  type?: string;
  categories?: any[];
  logarithmic?: boolean;
  min?: number;
  max?: number;
  labels?: {
    show?: boolean;
    rotate?: number;
    rotateAlways?: boolean;
    style?: {
      colors?: string[] | string;
      fontSize?: string;
      fontFamily?: string;
      fontWeight?: number;
      cssClass?: string;
    };
    offsetX?: number;
    offsetY?: number;
    format?: string;
    formatter?: any;
  };
  axisBorder?: {
    show?: boolean;
    color?: string;
    height?: number;
    width?: string;
  };
  axisTicks?: {
    show?: boolean;
    borderType?: string;
    color?: string;
    height?: number;
  };
  title?: {
    text?: string;
    style?: {
      color?: string;
      fontSize?: string;
      fontFamily?: string;
      fontWeight?: number;
    };
  };
  crosshairs?: {
    show?: boolean;
    width?: number;
    position?: string;
    opacity?: number;
    stroke?: {
      color?: string;
      width?: number;
      dashArray?: number;
    };
    dropShadow?: {
      enabled?: boolean;
      top?: number;
      left?: number;
      blur?: number;
      opacity?: number;
    };
  };
  tooltip?: {
    enabled?: boolean;
    theme?: string;
    style?: {
      fontSize?: number;
      fontFamily?: number;
    };
  };
}

export interface TimeSeries {
  x: number;
  y: number;
}
