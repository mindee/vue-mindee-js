## AnnotationViewer API

#### image

- Type : `string`
- Required : `true`

> Image URL or base64


#### shapes

- Type : `Array`
- Default : `[]`

> List of objects to display on the canvas
``` js
{
    id: string,
    coordinates: number[][]
}
```


#### options

- Type : `Object`

> Object of options to change default style and behavior
``` js
{
    backgroundColor?: string
    zoom?: {
    modifier: number
    max: number
    defaultZoom: number
}
```


#### orientation

- Type : `Number`
- Default : `0`

> Rotation in degree applied to the provided image


#### on-shape-mouse-enter

- Type : `Function`

> Return the shape on mouse enter event


#### on-shape-mouse-leave

- Type : `Function`

> Return the shape on mouse leave event


#### on-shape-click

- Type : `Function`

> Return the shape on click event


#### on-pointer-move

- Type : `Function`

> Return the pointer position { x:number, y:number } on mouse move


#### styles

- Type : `CSSProperties`

> Regular css object


#### className

- Type : `string`

## AnnotationLens

#### image

- Type : `string`
- Required : `true`

> Image URL or base64


#### shapes

- Type : `Array`
- Default : `[]`

> List of objects to display on the canvas
``` js
{
    id: string,
    coordinates: number[][]
}
```


#### options

- Type : `Object`

> Object of options to change default style and behavior
``` js
{
    backgroundColor?: string
}
```


#### orientation

- Type : `Number`
- Default : `0`

> Rotation in degree applied to the provided image


#### pointerPosition

- Type : `Object`
- Default : `null`

> Pointer position { x:number, y:number } relative to image rendered by AnnotationViewer


#### zoomLevel

- Type : `Number`
- Default : `2`

> Zoom level
#### styles

- Type : `CSSProperties`

> Regular css object


#### className

- Type : `string`

## getImageFromPDF

### Parameters

- Type : `string`
- Required: `true`

```javascript
getImagesFromPDF(file).then((images) => {
  // Do something with images pdf pages
})
```
