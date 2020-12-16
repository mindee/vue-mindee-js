<template>
  <annotation-lens
    :style="_styles"
    :zoom-level="zoomLevel"
    :orientation="orientation"
    :shapes="_shapes"
    :image="image"
    :class="className"
    :options="_options"
    :pointer-position="_pointerPosition"
  ></annotation-lens>
</template>

<script>
const defaultStyles = {
  display: "flex",
  width: "300px",
  height: "300px"
};
export default {
  name: "AnnotationLensWrapper",
  props: {
    image: String,
    orientation: Number,
    shapes: Array,
    className: String,
    options: Object,
    pointerPosition: Object,
    zoomLevel: Number,
    styles: Object
  },
  computed: {
    _shapes: function() {
      return this.shapes && JSON.stringify(this.shapes);
    },
    _options: function() {
      return this.options && JSON.stringify(this.options);
    },
    _pointerPosition: function() {
      return this.pointerPosition && JSON.stringify(this.pointerPosition);
    },
    _styles: function() {
      return { ...defaultStyles, ...this.styles };
    }
  }
};
</script>
