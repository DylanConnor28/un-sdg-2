import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
export class UnSdg extends DDDSuper(LitElement) {

  static get tag() {
    return "un-sdg";
  }

  constructor() {
    super();
    this.goal = "circle"; // Default to SDG logo
    this.width = 200; // Referenced in render() to define CSS property --width
    this.colorOnly = false;
  }

  static get properties() {
    return {
      goal: { type: String }, // Accepts values like 1-17, 'all', 'circle'
      label: { type: String }, // Alt text and div label for accessibility
      width: { type: Number }, // Used for div and img width, in pixels
      colorOnly: { type: Boolean },
    };
  }
  
  static get styles() {
    return [super.styles,
    css`
      :host {
        /* SDG colors */
        --un-sdg-color-1: rgb(235, 28, 44);
        --un-sdg-color-2: rgb(210, 160, 42);
        --un-sdg-color-3: rgb(44, 155, 72);
        --un-sdg-color-4: rgb(194, 31, 51);
        --un-sdg-color-5: rgb(239, 64, 42);
        --un-sdg-color-6: rgb(0, 173, 216);
        --un-sdg-color-7: rgb(253, 183, 19);
        --un-sdg-color-8: rgb(143, 23, 55);
        --un-sdg-color-9: rgb(243, 109, 36);
        --un-sdg-color-10: rgb(224, 21, 131);
        --un-sdg-color-11: rgb(249, 157, 37);
        --un-sdg-color-12: rgb(207, 141, 42);
        --un-sdg-color-13: rgb(72, 119, 61);
        --un-sdg-color-14: rgb(0, 125, 187);
        --un-sdg-color-15: rgb(63, 175, 73);
        --un-sdg-color-16: rgb(1, 85, 138);
        --un-sdg-color-17: rgb(25, 54, 103);
        --un-sdg-color-circle: rgb(255, 255, 255);
        --un-sdg-color-all: rgb(255, 255, 255);
        display: block;
      }

      img,
      .wrapper {
        width: var(--width, 200px); /* Defaults to 200px if --width unsupported */
        background-color: var(--goal-color, white); /* Dynamic goal color */
        display: block; /* Remove margin for inline images */
      }

      .color.wrapper {
        height: var(--width, 200px); /* Ensures square dimensions */
      }

      div {
        padding: 0;
        margin: 0;
      }
    `];
  }

  // Returns the label based on the current goal
  getLabel() {
    if (!this.label) { 
      const goal = Number(this.goal); // Parse goal as a number
      if (Number.isInteger(goal)) {
        const sdgTitles = [
          "No Poverty", "Zero Hunger", "Good Health and Well-being", "Quality Education", 
          "Gender Equality", "Clean Water and Sanitation", "Affordable and Clean Energy", 
          "Decent Work and Economic Growth", "Industry, Innovation, and Infrastructure", 
          "Reduced Inequalities", "Sustainable Cities and Communities", 
          "Responsible Consumption and Production", "Climate Action", 
          "Life Below Water", "Life on Land", "Peace, Justice, and Strong Institutions", 
          "Partnerships for the Goals"
        ];
        return sdgTitles[goal - 1];
      }
      return this.goal === "all" ? "UN Sustainable Development Goals" : "UN Sustainable Development Goals Logo";
    } 
    return this.label;
  }

  // Returns the image source URL based on the current goal
  getImgSrc() {
    return new URL(`../lib/svg/${this.goal}.svg`, import.meta.url).href;
  }

  render() {
    return html`
      ${this.colorOnly ? html`
        <!-- Color-only rendering for SDG block -->
        <div class="color wrapper" style="--width: ${this.width}px; --goal-color: var(--un-sdg-color-${this.goal})" label="${this.getLabel()} color only"></div>
      ` : html`
        <!-- Full SVG rendering for SDG -->
        <div class="svg wrapper" style="--width: ${this.width}px; --goal-color: var(--un-sdg-color-${this.goal})">
          <img src="${this.getImgSrc()}" alt="${this.getLabel()}" loading="lazy" fetchpriority="low" width="${this.width}">
        </div>
      `}
    `;
  }

  /**
   * HAX properties integration via external file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(UnSdg.tag, UnSdg);
