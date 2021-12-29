import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import {
  AnnotationData,
  AnnotationLensOptions,
  AnnotationLensProps,
  AnnotationShape,
  AnnotationViewerOptions,
  AnnotationViewerProps,
  Orientation,
  PointerPosition,
} from "./common/types";
import AnnotationLens from "./components/AnnotationLens.vue";

import AnnotationViewer from "./components/AnnotationViewer.vue";
import {
  drawShapes,
  drawShape,
  toBase64,
  drawLayer,
  setShapeConfig,
} from "./utils/functions";
import getImagesFromPDF from "./utils/getImagesFromPDF";
import { dataURItoBlob } from "./utils/image";

export type {
  AnnotationLensProps,
  AnnotationViewerProps,
  Stage,
  Layer,
  AnnotationShape,
  AnnotationLensOptions,
  AnnotationViewerOptions,
  PointerPosition,
  Orientation,
  AnnotationData,
};

export {
  toBase64,
  AnnotationViewer,
  AnnotationLens,
  drawShapes,
  dataURItoBlob,
  getImagesFromPDF,
  drawShape,
  drawLayer,
  setShapeConfig,
};
