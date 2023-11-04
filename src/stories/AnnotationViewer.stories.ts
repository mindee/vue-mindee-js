import type { Meta, StoryObj } from "@storybook/vue3";
import { dummyShapes } from "../../cypress/assets/shapes";
import demo from "../../cypress/assets/demo.jpg";
import { AnnotationViewer } from "@/index";

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: "AnnotationViewer",
  component: AnnotationViewer,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    data: {
      description: "The data to be displayed",
      control: {
        type: "object",
      },
    },
    options: {
      description: "The options for the viewer",
      control: {
        type: "object",
      },
    },
    style: {
      description: "The style for the viewer",
      control: {
        type: "object",
      },
    },
    id: {
      description: "The id for the viewer",
      control: {
        type: "text",
      },
    },
    getPointerPosition: {
      description: "The callback for the pointer position",
      control: {
        type: "function",
      },
    },
    getStage: {
      description: "The callback for the stage",
      control: {
        type: "function",
      },
    },
    onShapeMultiSelect: {
      description: "The callback for the shape multi select",
      control: {
        type: "function",
      },
    },
    onShapeClick: {
      description: "The callback for the shape click",
      control: {
        type: "function",
      },
    },
    onShapeMouseEnter: {
      description: "The callback for the shape mouse enter",
      control: {
        type: "function",
      },
    },
    onShapeMouseLeave: {
      description: "The callback for the shape mouse leave",
      control: {
        type: "function",
      },
    },
  },
  args: {
    data: {
      image: demo,
      shapes: dummyShapes,
    },
  }, // default value
} satisfies Meta<typeof AnnotationViewer>;

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
