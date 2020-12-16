## Lens helper

> AnnotationLens takes the pointer position relative to AnnotationViewer canvas as an argument and apply the zoom level specified by zoomLevel props (default : 2)

```js
<template>
  <div :style="{ position: 'relative' }">
    <AnnotationViewer
      @on-pointer-move="handlePointerPositionChange"
      :image="image"
      :shapes="shapes"
    />
    <AnnotationLens
      :pointerPosition="pointerPosition"
      :image="image"
      :shapes="shapes"
      :styles="{ position: 'absolute', bottom: 0, right: 0 }"
      :zoomLevel="zoomLevel"
    />
  </div>
</template>

<script>
import { AnnotationLens, AnnotationViewer } from "vue-mindee-js";
import dummyImage from 'assets/image.jpg'

const dummyShapes = [
  {
    id: 1,
    coordinates: [
      [0.479, 0.172],
      [0.611, 0.172],
      [0.611, 0.196],
      [0.479, 0.196],
    ],
  },
  {
    id: 2,
    coordinates: [
      [0.394, 0.068],
      [0.477, 0.068],
      [0.477, 0.087],
      [0.394, 0.087],
    ],
  },
  ...
]

export default {
  name: "Example",
  components: {
    AnnotationViewer,
    AnnotationLens
  },
  data() {
    return {
      image: dummyImage,
      shapes: dummyShapes,
      zoomLevel: 2,
      pointerPosition: null
    };
  },
  methods: {
    handlePointerPositionChange(pointerPosition) {
      this.pointerPosition = pointerPosition;
    }
  }
};
</script>
```
## Use PDF file

> getImagesFromPDF helper help you extract pages from pdf file. They can be used later as any other image with AnnotationViewer

```js
<template>
  <div :style="{ position: 'relative' }">
    <AnnotationViewer :image="currentImage" />
    <div class="page-container">
      <img
        v-for="(item, key) in pages"
        :key="key"
        v-on:click="index = key"
        :src="item"
      />
    </div>
  </div>
</template>

<script>
import dummyPDF from "./pdf.pdf";
import { AnnotationViewer, getImagesFromPDF } from "test-test-20";
export default {
  name: "HelloWorld",
  components: {
    AnnotationViewer,
  },
  data() {
    return {
      index: 0,
      pages: [],
    };
  },
  computed: {
    currentImage: function () {
      return this.pages[this.index];
    },
  },
  created() {
    getImagesFromPDF(dummyPDF).then((images) => {
      this.pages = images;
    });
  },
};
</script>
<style scoped>
.page-container {
  padding: 10;
  position: absolute;
  width: 50;
  max-height: 500;
  overflow-y: auto;
  top: 0;
  left: 0;
}
img {
  width: 100%;
  height: 50px;
  cursor: pointer;
}
</style>
```