<script setup lang="ts">
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import {
  ref,
  computed,
  CSSProperties,
  onMounted,
  onUnmounted,
  watch,
} from "vue";
import { v4 as uuidv4 } from "uuid";
import { Key } from "ts-key-enum";

import type {
  AnnotationData,
  AnnotationLayers,
  AnnotationShape,
  AnnotationViewerOptions,
  ImageBoundingBox,
  ImageData,
  PointerPosition,
} from "@/common/types";

import {
  DEFAULT_ANNOTATION_VIEWER_OPTIONS,
  DEFAULT_DATA,
  DEFAULT_STYLE,
  KONVA_REFS,
} from "@/common/constants";

import { handleResizeImage } from "@/utils/image";
import { rotateImage } from "@/utils/orientation";
import { mapShapesToPolygons, getMousePosition } from "@/utils/canvas";
import { handleStageZoom } from "@/utils/zoom";
import {
  onSelectionStart,
  onSelectionMove,
  onSelectionEnd,
  createSelectionRect,
} from "@/utils/selection";
import { clearLayers } from "@/utils/layer";
import { Stage } from "..";

// types
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

// props
const props = withDefaults(defineProps<AnnotationViewerProps>(), {
  id: uuidv4(),
  options: () => ({} as AnnotationViewerOptions),
  style: () => ({} as CSSProperties),
  data: () => DEFAULT_DATA,
});

const style = computed(() => ({ ...DEFAULT_STYLE, ...props.style }));
const options = computed(() => ({
  ...DEFAULT_ANNOTATION_VIEWER_OPTIONS,
  ...props.options,
}));

// state
const annotationData = ref(DEFAULT_DATA);
const imageBoundingBoxObject = ref<ImageBoundingBox | null>(null);
const imageDataObject = ref<ImageData>({
  element: new Image(),
  shape: new Konva.Image({ image: new Image() }),
});
const containerRef = ref<HTMLDivElement | null>(null);
const stageObject = ref<null | Konva.Stage>(null);
const layersObject = ref<AnnotationLayers>({
  shapes: new Konva.Layer({ id: KONVA_REFS.shapesLayer }),
  image: new Konva.Layer(),
});

const selectionRectObject = ref(createSelectionRect(options.value));
const isSelectionActiveRef = ref(false);

// lifecyle
onMounted(() => {
  const { getPointerPosition, onShapeMultiSelect, id } = props;
  stageObject.value = new Konva.Stage({ container: id as string });
  stageObject.value.add(
    layersObject.value.image as Konva.Layer,
    layersObject.value.shapes as Konva.Layer
  );
  layersObject.value.image.add(imageDataObject.value.shape as Konva.Image);
  stageObject.value.on("wheel", onZoom as any);
  getPointerPosition &&
    stageObject.value.on("mousemove", () => {
      const mousePointTo = getMousePosition(
        stageObject.value as Konva.Stage | null,
        imageBoundingBoxObject.value
      );
      mousePointTo && getPointerPosition(mousePointTo);
    });
  if (options.value.enableSelection && onShapeMultiSelect) {
    stageObject.value.on("mousedown touchstart", (event) =>
      onSelectionStart(
        event,
        layersObject.value.shapes as Konva.Layer,
        selectionRectObject.value as Konva.Rect,
        isSelectionActiveRef.value
      )
    );
    stageObject.value.on("mousemove touchmove", () =>
      onSelectionMove(
        layersObject.value.shapes as Konva.Layer,
        selectionRectObject.value as Konva.Rect
      )
    );
    stageObject.value.on("mouseup touchend", () =>
      onSelectionEnd(
        layersObject.value.shapes as Konva.Layer,
        selectionRectObject.value as Konva.Rect,
        onShapeMultiSelect
      )
    );
  }
  props.getStage?.(stageObject.value as Stage);
  containerRef.value = document.getElementById(props.id) as HTMLDivElement;
  window.addEventListener("resize", resizeImage);
  window.addEventListener("keydown", onKeyDownSelection);
  window.addEventListener("keyup", onKeyUpSelection);
  handleAnnotationDataEffect();
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeImage);
  window.removeEventListener("keydown", onKeyDownSelection);
  window.removeEventListener("keyup", onKeyUpSelection);
});

const handleAnnotationDataEffect = () => {
  if (!props.data.image) {
    clearLayers(layersObject.value as AnnotationLayers);
    imageDataObject.value.element = new Image();
    imageDataObject.value.shape.image(imageDataObject.value.element);
    annotationData.value = props.data;
    return;
  }
  if (
    annotationData.value.image !== props.data.image ||
    props.data.orientation !== annotationData.value.orientation
  ) {
    annotationData.value = props.data;
    loadImage();
  } else {
    annotationData.value = props.data;
    drawShapes();
  }
};
watch(
  () => props.data,
  () => {
    handleAnnotationDataEffect();
  }
);

const loadImage = async () => {
  imageDataObject.value.element.onload = () => {
    imageDataObject.value.shape?.image(imageDataObject.value.element);
    resizeImage();
  };
  if (annotationData.value.orientation) {
    try {
      const image = await rotateImage(annotationData.value);
      imageDataObject.value.element.src = image;
    } catch (error) {
      console.error(error);
    }
  } else {
    imageDataObject.value.element.src = annotationData.value.image!;
  }
};

const drawShapes = () => {
  const { onShapeMouseEnter, onShapeClick, onShapeMouseLeave, data } = props;
  layersObject.value.shapes.destroyChildren();
  if (!data.shapes) {
    return;
  }
  if (options.value.enableSelection) {
    layersObject.value.shapes.add(selectionRectObject.value as Konva.Rect);
  }
  mapShapesToPolygons(
    layersObject.value.shapes as Konva.Layer,
    annotationData.value.shapes,
    true,
    imageBoundingBoxObject.value,
    options.value,
    onShapeClick,
    onShapeMouseEnter,
    onShapeMouseLeave
  );
  layersObject.value.shapes.batchDraw();
};

const resizeImage = () => {
  const imageBoundingBox = handleResizeImage(
    stageObject.value as Konva.Stage | null,
    containerRef.value,
    imageDataObject.value as ImageData
  );

  if (imageBoundingBox) {
    imageBoundingBoxObject.value = imageBoundingBox;
    layersObject.value.image.batchDraw();
    drawShapes();
  }
};

const onZoom = (event: KonvaEventObject<Konva.Stage>) => {
  handleStageZoom(
    stageObject.value as Konva.Stage | null,
    imageBoundingBoxObject.value,
    event,
    options.value
  );
};

const onKeyDownSelection = (event: KeyboardEvent) => {
  event.stopPropagation();
  switch (event.key) {
    case Key.Control:
      stageObject.value?.draggable(false);
      isSelectionActiveRef.value = true;
      break;
    default:
      break;
  }
};

const onKeyUpSelection = (event: KeyboardEvent) => {
  event.stopPropagation();
  switch (event.key) {
    case Key.Control:
      stageObject.value?.draggable(true);
      isSelectionActiveRef.value = false;
      break;
    default:
      break;
  }
};
</script>

<template>
  <div :id="props.id" :style="style"></div>
</template>

<style scoped></style>
