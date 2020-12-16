![logo_mindee](https://user-images.githubusercontent.com/41388086/68026973-7858b080-fcb1-11e9-85ff-724c8d014118.png)

#### Vue components built on top of [mindee-js](https://www.npmjs.com/package/mindee-js) SDK

> Computer vision SDK for image segmentation and document processing on top of [mindee](https://mindee.com) APIs

[![NPM](https://img.shields.io/npm/v/vue-mindee-js.svg)](https://www.npmjs.com/package/vue-mindee-js) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![ezgif com-video-to-gif (12)](https://user-images.githubusercontent.com/41388086/87852820-92045b80-c905-11ea-808e-5a971de2b29f.gif)

## Features

This SDK was made for building interfaces on top of Mindee document parsing APIs and more generally on top of
any computer vision detection APIs.

- Work with images and pdfs
- Display interactive shapes on images or pdfs with custom style
- Bind custom functions to shapes mouse events
- Create multi-pages pdfs navigation sidebar
- Zoom in and out in the canvas
- Move the image with the mouse
- Create a lens to zoom around the user's pointer

This SDK was primarily made for document processing but can be used for any type of computer vision interface:

![general_segmentation](https://user-images.githubusercontent.com/41388086/87301502-fb542b00-c50f-11ea-91f2-f7731c4e1a1b.gif)

## Compatibility

The vue SDK is compatible with `vue 2.6.0+`

## Installation

Installing with npm

```bash
npm install --save vue-mindee-js
```

installing with yarn

```
yarn add vue-mindee-js
```

## Main component

> [AnnotationViewer](https://vue-mindee-js.netlify.app/guide/apis.html#annotationviewer-api) has a set of features to draw a list of shapes on top of a given image.

```jsx
<AnnotationViewer />
```

## Usage

```js

<template>
    <AnnotationViewer
      :image="image"
      :shapes="shapes"
    />
</template>

<script>
import { AnnotationViewer } from "vue-mindee-js";
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
  components: { AnnotationViewer },
  data() {
    return {
      image: dummyImage,
      shapes: dummyShapes
    };
  },
};
</script>

```


## Helpers

> **Helpers** work hand to hand with AnnotationViewer to provide a powerful tool for different use cases

- [AnnotationLens](https://vue-mindee-js.netlify.app/guide/apis.html#annotationlens-api) component provide a closer vision to the main canvas rendered by AnnotationViewer.

- [getImagesFromPDF](https://vue-mindee-js.netlify.app/guide/apis.html#getimagefrompdf-api) a async function that takes a pdf file as an argument and return all
  pages as a list of base64 images.

## Contribute to this repo

Feel free to use github to submit issues, pull requests or general feedback.
You can also visit [our website](https://mindee.com) or drop us an [email](mailto:contact@mindee.com).

Please read our [Contributing section](https://github.com/publicMindee/vue-mindee-js/blob/HEAD/CONTRIBUTING.md) before contributing.

## License

GPLv3 © [mindee](https://mindee.com)
