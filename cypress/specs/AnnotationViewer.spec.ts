import { mount } from "@cypress/vue";
import AnnotationViewerTester from "../helpers/AnnotationViewerTester.vue";
import { Key } from "ts-key-enum";
import { dummyShapes } from "../assets/shapes";

const containerId = "annotationViewer";

describe("AnnotationViewer", () => {
  it("mount correctly", () => {
    mount(AnnotationViewerTester, {
      log: true,
      props: {
        id: containerId,
      },
    }).then(() => {
      cy.wait(500);
      cy.get("canvas")
        .should("have.length", 2)
        .each(($canvas) => {
          const canvasWidth = $canvas.width();
          const canvasHeight = $canvas.height();
          cy.wrap(canvasWidth).should("equal", 700);
          cy.wrap(canvasHeight).should("equal", 800);
        });
      cy.get(`#${containerId}`).matchImageSnapshot("default");
    });
  });
  it("zoom correctly", () => {
    mount(AnnotationViewerTester, {
      log: true,
      props: {
        id: containerId,
      },
    }).then(() => {
      cy.get(`#${containerId}`)
        .trigger("wheel", {
          deltaY: -60,
        })
        .trigger("wheel", {
          deltaY: -60,
        })
        .trigger("wheel", {
          deltaY: -60,
        });
      cy.wait(200);
      cy.get(`#${containerId}`).matchImageSnapshot("zoomed");
    });
  });

  it("handle events correctly", () => {
    const events: any = {
      onShapeClick: (shape) => {
        console.log(shape);
      },
      onShapeMouseEnter: (shape) => {
        console.log(shape);
      },
      onShapeMouseLeave: (shape) => {
        console.log(shape);
      },
    };
    const clickSpy = cy.spy(events, "onShapeClick").withArgs(dummyShapes[1]);
    const mouseEnterSpy = cy
      .spy(events, "onShapeMouseEnter")
      .withArgs(dummyShapes[1]);
    const mouseLeaveSpy = cy
      .spy(events, "onShapeMouseLeave")
      .withArgs(dummyShapes[1]);

    mount(AnnotationViewerTester, {
      log: true,
      props: {
        id: containerId,
        ...events,
      },
    }).then(() => {
      cy.get(`#${containerId}`)
        .click(350, 50)
        .then(($container) => {
          cy.wait(200);
          cy.wrap($container).matchImageSnapshot("shapeClicked");
          expect(clickSpy).to.be.calledOnce;
        });
    });

    it("should handle click event", () => {
      cy.get(`#${containerId}`)
        .click(350, 50)
        .then(($container) => {
          cy.wait(200);
          cy.wrap($container).matchImageSnapshot("shapeClicked");
          expect(clickSpy).to.be.calledOnce;
        });
    });
    it("should handle mouse enter event", () => {
      cy.get(`#${containerId}`)
        .trigger("mouseenter", {
          clientX: 350,
          clientY: 50,
        })
        .then(($container) => {
          cy.wait(200);
          cy.wrap($container).matchImageSnapshot("shapeMouseEnter");
          expect(mouseEnterSpy).to.be.calledOnce;
        });
    });
    it("should handle mouse leave event", () => {
      cy.get(`#${containerId}`)
        .trigger("mouseleave", 350, 50)
        .then(($container) => {
          cy.wait(200);
          cy.wrap($container).matchImageSnapshot("shapeMouseLeave");
          expect(mouseLeaveSpy).to.be.calledOnce;
        });
    });
  });

  it("support multi selection", () => {
    const events: any = {
      onShapeMultiSelect: (shapes) => {
        console.log(shapes);
      },
    };
    cy.spy(events, "onShapeMultiSelect");
    mount(AnnotationViewerTester, {
      log: true,
      props: {
        id: containerId,
        ...events,
      },
    }).then(() => {
      cy.get(`#${containerId}`)
        .children()
        .trigger("keydown", { key: Key.Control })
        .trigger("mousedown", { which: 1, clientX: 10, clientY: 10 })
        .trigger("mousemove", { which: 1, clientX: 600, clientY: 300 })
        .matchImageSnapshot("multi-select");
      cy.get(`#${containerId}`)
        .trigger("mouseup")
        .trigger("keyup", { key: Key.Control })
        .then(() => {
          cy.wait(200);
          expect(events.onShapeMultiSelect).to.be.calledOnceWithExactly(
            dummyShapes.slice(0, 2)
          );
        });
    });
  });
  it("support custom options", () => {
    dummyShapes[0].config = { fill: "green", opacity: 0.2 };
    mount(AnnotationViewerTester, {
      log: true,
      props: {
        id: containerId,
      },
    }).then(() => {
      cy.get(`#${containerId}`).matchImageSnapshot("custom-options");
    });
  });

  it("support state changes", () => {
    mount(AnnotationViewerTester, {
      log: true,
      props: {
        id: containerId,
      },
    }).then(() => {
      cy.wait(500);
      cy.get('[data-cy="clearData"]').click();
      cy.wait(400);
      cy.get(`#${containerId}`).matchImageSnapshot(containerId + ".clearData");
      cy.get('[data-cy="loadData"]').click();
      cy.wait(400);
      cy.get(`#${containerId}`).matchImageSnapshot(containerId + ".loadData");
      cy.get('[data-cy="changeImage"]').click();
      cy.wait(400);
      cy.get(`#${containerId}`).matchImageSnapshot(
        containerId + ".changeImage"
      );
      cy.get('[data-cy="rotate"]').click();
      cy.wait(400);
      cy.get(`#${containerId}`).matchImageSnapshot(containerId + ".rotate");
      cy.get('[data-cy="clearShapes"]').click();
      cy.wait(400);
      cy.get(`#${containerId}`).matchImageSnapshot(
        containerId + ".clearShapes"
      );
    });
  });
});
