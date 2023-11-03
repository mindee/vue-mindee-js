import type { Meta, StoryObj } from "@storybook/vue3";
import { dummyShapes } from "../../cypress/assets/shapes";
import demo from "../../cypress/assets/another-demo.jpg";
import { AnnotationLens } from "@/index";

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: "AnnotationLens",
  component: AnnotationLens,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {},
  args: {
    data: {
      image: demo,
      shapes: dummyShapes,
    },
    pointerPosition: { x: 0, y: 0 },
  }, // default value
} satisfies Meta<typeof AnnotationLens>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {},
};
