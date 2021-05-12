import {
  Component,
  Method,
  Element,
  ComponentInterface,
  h,
} from "@stencil/core";
import { createAnimation, Animation } from "@ionic/core";

@Component({
  tag: "app-fly-to",
  styleUrl: "app-fly-to.css",
})
export class AppFlyTo implements ComponentInterface {
  @Element() hostElement: HTMLElement;

  @Method()
  async trigger(flyTo: HTMLElement) {
    const elementToAnimate = this.hostElement.querySelector("img");

    // First
    const first = elementToAnimate.getBoundingClientRect();
    const clone = elementToAnimate.cloneNode();

    const clonedElement: HTMLElement = this.hostElement.appendChild(
      clone
    ) as HTMLElement;

    // Last
    const flyToPosition = flyTo.getBoundingClientRect();
    clonedElement.style.cssText = `position: fixed; top: ${flyToPosition.top}px; left: ${flyToPosition.left}px; height: 50px; width: 50px;`;

    const last = clonedElement.getBoundingClientRect();

    // Invert
    const invert = {
      x: first.left - last.left,
      y: first.top - last.top,
      scaleX: first.width / last.width,
      scaleY: first.height / last.height,
    };

    // Play
    const opacityToggleAnimation: Animation = createAnimation()
      .addElement(elementToAnimate)
      .duration(200)
      .easing("ease-in")
      .fromTo("opacity", "1", "0.4");

    const flyAnimation: Animation = createAnimation()
      .addElement(clonedElement)
      .duration(500)
      .beforeStyles({
        ["transform-origin"]: "0 0",
        ["clip-path"]: "circle()",
        ["z-index"]: "10",
      })
      .easing("ease-in")
      .fromTo(
        "transform",
        `translate(${invert.x}px, ${invert.y}px) scale(${invert.scaleX}, ${invert.scaleY})`,
        "translate(0, 0) scale(1, 1)"
      )
      .fromTo("opacity", "1", "0.5");

    const pulseFlyToElementAnimation: Animation = createAnimation()
      .addElement(flyTo)
      .duration(200)
      .direction("alternate")
      .iterations(2)
      .easing("ease-in")
      .fromTo("transform", "scale(1)", "scale(1.3)");

    opacityToggleAnimation.play();

    flyAnimation.onFinish(() => {
      pulseFlyToElementAnimation.play();
      opacityToggleAnimation.direction("reverse");
      opacityToggleAnimation.play();
      clonedElement.remove();
    });

    flyAnimation.play();
  }

  render() {
    return <slot></slot>;
  }
}
