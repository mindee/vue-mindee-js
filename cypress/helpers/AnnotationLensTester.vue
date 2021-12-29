<script setup lang="ts">
import { computed, ref } from "vue";
import {
  AnnotationLens,
  PointerPosition,
  AnnotationData,
  AnnotationLensProps,
} from "../../dist";
import { dummyShapes } from "../assets/shapes";
import demo from "../assets/demo.jpg";
import anotherDemo from "../assets/another-demo.jpg";

const containerHeight = "300px";
const containerWidth = "300px";

const props = defineProps<{ id: string }>();
const pointerPosition = ref<PointerPosition>({ x: 0, y: 0 });
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

const movePointerPosition = () => {
  pointerPosition.value = {
    x: pointerPosition.value.x + 0.2,
    y: pointerPosition.value.y + 0.2,
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
  <button data-cy="movePointer" @click="movePointerPosition">
    Move pointer position
  </button>
  <AnnotationLens
    :id="props.id"
    :data="data"
    :pointerPosition="pointerPosition"
    :style="style"
  />
</template>

<style></style>
