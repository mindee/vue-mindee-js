<script setup lang="ts">
import Konva from "konva";
import {
  ref,
  computed,
  CSSProperties,
  onMounted,
  onUnmounted,
  watch,
} from "vue";
import { v4 as uuidv4 } from "uuid";

import type {
  AnnotationData,
  AnnotationLayers,
  AnnotationLensOptions,
  ImageBoundingBox,
  ImageData,
  PointerPosition,
} from "@/common/types";

import {
  DEFAULT_ANNOTATION_LENS_OPTIONS,
  DEFAULT_DATA,
  DEFAULT_LENS_ZOOM_LEVEL,
  DEFAULT_POINTER_POSITION,
  DEFAULT_STYLE,
  KONVA_REFS,
} from "@/common/constants";

import { handleResizeImage } from "@/utils/image";
import { rotateImage } from "@/utils/orientation";
import { mapShapesToPolygons } from "@/utils/canvas";
import { clearLayers } from "@/utils/layer";
import { handleLensZoom } from "@/utils/zoom";
import { Stage } from "konva/lib/Stage";

// types
export type AnnotationLensProps = {
  id?: string;
  data?: AnnotationData;
  pointerPosition?: PointerPosition;
  zoomLevel?: number;
  getStage?: (stage: Konva.Stage) => void;
  options?: AnnotationLensOptions;
  style?: CSSProperties;
};
// props
const props = withDefaults(defineProps<AnnotationLensProps>(), {
  id: uuidv4(),
  options: () => ({} as AnnotationLensOptions),
  style: () => ({} as CSSProperties),
  zoomLevel: DEFAULT_LENS_ZOOM_LEVEL,
  data: () => DEFAULT_DATA,
  pointerPosition: () => DEFAULT_POINTER_POSITION,
});

const style = computed(() => ({ ...DEFAULT_STYLE, ...props.style }));
const options = computed(() => ({
  ...DEFAULT_ANNOTATION_LENS_OPTIONS,
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

// lifecyle
onMounted(() => {
  stageObject.value = new Konva.Stage({ container: props.id as string });
  stageObject.value.add(
    layersObject.value.image as Konva.Layer,
    layersObject.value.shapes as Konva.Layer
  );
  layersObject.value.image.add(imageDataObject.value.shape as Konva.Image);
  containerRef.value = document.getElementById(props.id) as HTMLDivElement;
  window.addEventListener("resize", resizeImage);
  props.getStage?.(stageObject.value as Stage);
  handleAnnotationDataEffect();
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeImage);
});

watch(
  () => props.data,
  () => {
    handleAnnotationDataEffect();
  }
);

watch(
  () => [props.zoomLevel, props.pointerPosition],
  () => {
    onZoomChange();
  }
);

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
  layersObject.value.shapes.destroyChildren();
  if (!props.data.shapes) {
    return;
  }
  mapShapesToPolygons(
    layersObject.value.shapes as Konva.Layer,
    annotationData.value.shapes,
    true,
    imageBoundingBoxObject.value,
    options.value
  );
  layersObject.value.shapes.batchDraw();
};

const onZoomChange = () => {
  handleLensZoom(
    stageObject.value as Konva.Stage | null,
    imageBoundingBoxObject.value as ImageBoundingBox | null,
    props.pointerPosition,
    props.zoomLevel
  );
};

const resizeImage = () => {
  const imageBoundingBox = handleResizeImage(
    stageObject.value as Konva.Stage | null,
    containerRef.value,
    imageDataObject.value as ImageData
  );

  if (imageBoundingBox) {
    imageBoundingBoxObject.value = imageBoundingBox;
    onZoomChange();
    drawShapes();
  }
};
</script>

<template>
  <div :id="props.id" :style="style"></div>
</template>

<style scoped></style>
