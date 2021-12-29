import Konva from "konva";
import { ShapeConfig } from "konva/lib/Shape";
import { RectConfig } from "konva/lib/shapes/Rect";
import { CSSProperties } from "vue";

export interface AnnotationShape {
  id: string;
  coordinates: number[][];
  [key: string]: any;
  config?: ShapeConfig;
}

export type Orientation = 0 | 90 | 180 | 270;

export type BaseOptions = {
  shapeConfig?: ShapeConfig;
};

export type AnnotationLensOptions = BaseOptions;

export type AnnotationViewerOptions = BaseOptions & {
  selectionRectConfig?: RectConfig;
  enableSelection?: boolean;
  onMouseEnter?: (polygon: Konva.Line) => void;
  onMouseLeave?: (polygon: Konva.Line) => void;
  onClick?: (polygon: Konva.Line) => void;
  zoom?: {
    modifier: number;
    max: number;
    defaultZoom: number;
  };
};

export interface ImageBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
}

export type PointerPosition = {
  x: number;
  y: number;
};

export type AnnotationData = {
  image?: string | null;
  shapes?: AnnotationShape[];
  orientation?: Orientation;
};

export type AnnotationLayers = {
  shapes: Konva.Layer;
  image: Konva.Layer;
};
export type ImageData = {
  element: HTMLImageElement;
  shape: Konva.Image;
};

export type AnnotationLensProps = {
  id?: string;
  data?: AnnotationData;
  pointerPosition?: PointerPosition;
  zoomLevel?: number;
  getStage?: (stage: Konva.Stage) => void;
  options?: AnnotationLensOptions;
  style?: CSSProperties;
};

export type AnnotationViewerProps = {
  id?: string;
  getPointerPosition?: (data: PointerPosition) => void;
  data?: AnnotationData;
  getStage?: (stage: Konva.Stage) => void;
  onShapeMultiSelect?: (shapes: AnnotationShape[]) => void;
  onShapeClick?: (shape: AnnotationShape) => void;
  onShapeMouseEnter?: (shape: AnnotationShape) => void;
  onShapeMouseLeave?: (shape: AnnotationShape) => void;
  options?: AnnotationViewerOptions;
  style?: CSSProperties;
};
