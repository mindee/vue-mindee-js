import { mount } from "@cypress/vue";
import AnnotationLensTester from "../helpers/AnnotationLensTester.vue";
import { Key } from "ts-key-enum";
import { dummyShapes } from "assets/shapes";

const containerId = "annotationLens";

describe("AnnotationLens", () => {
  const componentId = "annotationLens";
  it("mount correctly", () => {
    mount(AnnotationLensTester, {
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
          cy.wrap(canvasWidth).should("equal", 300);
          cy.wrap(canvasHeight).should("equal", 300);
        });
      cy.get(`#${componentId}`).matchImageSnapshot(componentId + ".default");
      cy.get('[data-cy="movePointer"]')
        .click()
        .then(() => {
          cy.get(`#${componentId}`).matchImageSnapshot(
            componentId + ".pointer-move.1"
          );
        });

      cy.get('[data-cy="movePointer"]')
        .click()
        .then(() => {
          cy.get(`#${componentId}`).matchImageSnapshot(
            componentId + ".pointer-move.2"
          );
        });
      cy.get('[data-cy="movePointer"]')
        .click()
        .then(() => {
          cy.get(`#${componentId}`).matchImageSnapshot(
            componentId + ".pointer-move.3"
          );
        });
    });
  });

  it("support state changes", () => {
    mount(AnnotationLensTester, {
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
