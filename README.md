# Check [Vue mindee documentation](https://vue-mindee-js.netlify.app) and [Storybook](https://6544f0ebd09f956e0a9f10f3-tynzmijvtv.chromatic.com) for docs, guides, API and more!

# Introduction

#### **Vue mindee** is a very opinionated JavaScript library that will help you build interactive canvas for computer vision detection use cases.

There are many powerful JavaScript frameworks and tools that can help you make an interactive canvas. But almost all of them are _low-level_. Like **[KONVA](https://konvajs.org/)** is a 2d canvas framework. It is good, it is powerful. But you may need to write a lot of code.

This library was made for building frontend interfaces on top of **[Mindee](https://mindee.com/)** document parsing APIs and more generally on top of any computer vision detection APIs.

[![NPM](https://img.shields.io/npm/v/vue-mindee-js.svg)](https://www.npmjs.com/package/vue-mindee-js/v/1.3.0) [![tests](https://github.com/mindee/vue-mindee-js/actions/workflows/cypress-workflow.yml/badge.svg?branch=new-version)](https://github.com/mindee/vue-mindee-js/actions/workflows/cypress-workflow.yml)

![ezgif com-video-to-gif (12)](https://user-images.githubusercontent.com/41388086/87852820-92045b80-c905-11ea-808e-5a971de2b29f.gif)

## Features

- Support for image and PDF files
- Interactive shapes with events binding
- Extensible styling API
- Controllable state props and modular architecture
- Zoom in and out feature out of the box
- Magnified/Zoomed view API

## Compatibility

The Vue SDK is compatible with `Vue 3+`

## Installation and dependencies

The easiest way to use vue-select is to install it from npm and build it into your app with Webpack.

```bash
npm install --save vue-mindee-js
```

or using yarn

```
pnpm install vue-mindee-js
```

## Usage

You only need an image and a list of shapes to get started.

```jsx
<script>
import { AnnotationViewer } from "vue-mindee-js";
import dummyImage from "path/to/file.jpg";

const dummyShapes = [
  {
    id: "date",
    coordinates: [
      [0.539, 0.269],
      [0.693, 0.269],
      [0.693, 0.296],
      [0.539, 0.296]
    ]
  },
  {
    id: "supplier",
    coordinates: [
      [0.267, 0.062],
      [0.572, 0.062],
      [0.572, 0.102],
      [0.267, 0.102]
    ]
  },
]

const data = {
  image: dummyImage,
  shapes: dummyShapes,
  orientation: 0,
};
</script>

<template>
  <AnnotationViewer :data="data" />
</template>

```

## Props

- **`data`** : include 3 properties. `image` file to draw in the canvas, `shapes` which expect a list of shapes and`orientation` of the provided image (default: 0)
- **`onShapeClick`** : return the shape object after a click event
- **`onShapeMouseEnter`** : return the shape object after a mouse enter event
- **`onShapeMouseLeave`** : return the shape object after a mouse leave event
- **`onShapeMultiSelect`** : return the selected shapes using (CTRL + MOUSE CLICK & MOVE)
- **`options`** : object of properties to customize default configs
- **`id`** : unique id, if not provided it will be automatically generated
- **`style`** : style object to change container css properties
- **`className`** : apply a className to the control

## Contribute to this repo

Feel free to use github to submit issues, pull requests or general feedback.
You can also visit [our website](https://mindee.com) or drop us an [email](mailto:contact@mindee.com).

Please read our [Contributing section](https://github.com/publicMindee/vue-mindee-js/blob/master/CONTRIBUTING.md) before contributing.

## License

MIT © [mindee](https://mindee.com)
