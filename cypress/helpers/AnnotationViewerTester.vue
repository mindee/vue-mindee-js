<script setup lang="ts">
import { computed, ref } from "vue";
import { AnnotationViewer } from "../../dist";
import type { AnnotationData, AnnotationViewerProps } from "../../dist";
import { dummyShapes } from "../assets/shapes";
import demo from "../assets/demo.jpg";
import anotherDemo from "../assets/another-demo.jpg";

const containerHeight = "800px";
const containerWidth = "700px";

const props = defineProps<{
  id: string;
  onShapeClick: (shape) => void;
  onShapeMouseEnter: (shape) => void;
  onShapeMouseLeave: (shape) => void;
  onShapeMultiSelect: (shapes) => void;
}>();

const data = ref<AnnotationData>({
  image: demo,
  shapes: dummyShapes,
});

const loadData = () => {
  data.value = {
    image: demo,
    shapes: dummyShapes,
  };
};

const clearData = () => {
  data.value = {
    image: null,
  };
};
const changeImage = () => {
  data.value = {
    image: anotherDemo,
    shapes: dummyShapes,
  };
};

const clearShapes = () => {
  data.value = {
    image: demo,
    shapes: [],
  };
};

const rotate = () => {
  data.value = {
    image: demo,
    shapes: dummyShapes,
    orientation: 90,
  };
};

const style = computed(() => ({
  height: containerHeight,
  width: containerWidth,
}));
</script>

<template>
  <button data-cy="clearData" @click="clearData">Clear data</button>
  <button data-cy="loadData" @click="loadData">Load data</button>
  <button data-cy="changeImage" @click="changeImage">Change image</button>
  <button data-cy="clearShapes" @click="clearShapes">Clear shapes</button>
  <button data-cy="rotate" @click="rotate">Rotate</button>
  <AnnotationViewer
    :id="props.id"
    :data="data"
    :onShapeMultiSelect="props.onShapeMultiSelect"
    :onShapeClick="props.onShapeClick"
    :onShapeMouseEnter="props.onShapeMouseEnter"
    :onShapeMouseLeave="props.onShapeMouseLeave"
    :options="{ enableSelection: true }"
    :getPointerPosition="getPointerPosition"
    :style="style"
  />
</template>

<style></style>
