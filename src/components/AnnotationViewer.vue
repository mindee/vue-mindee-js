<template>
  <annotation-viewer
    :style="_styles"
    :orientation="orientation"
    :shapes="_shapes"
    :image="image"
    :class="className"
    :options="_options"
    v-on:on-shape-click="$emit('on-shape-click', $event.detail.shape)"
    v-on:on-shape-mouse-enter="
      $emit('on-shape-mouse-enter', $event.detail.shape)
    "
    v-on:on-shape-mouse-leave="
      $emit('on-shape-mouse-leave', $event.detail.shape)
    "
    v-on:on-pointer-move="
      $emit('on-pointer-move', $event.detail.pointerPosition)
    "
  ></annotation-viewer>
</template>

<script>
const defaultStyles = {
  display: "flex",
  width: "100%",
  height: "600px",
};
export default {
  name: "AnnotationViewerWrapper",
  props: {
    image: String,
    orientation: Number,
    shapes: Array,
    className: String,
    options: Object,
    styles: Object,
  },
  computed: {
    _shapes: function() {
      return this.shapes && JSON.stringify(this.shapes);
    },
    _options: function() {
      return this.options && JSON.stringify(this.options);
    },
    _styles: function() {
      return { ...defaultStyles, ...this.styles };
    },
  },
};
</script>
