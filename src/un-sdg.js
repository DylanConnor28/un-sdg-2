import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class unSdg extends DDDSuper(LitElement) {

  static get tag() {
    return "un-sdg";
  }

  constructor() {
    super();
    this.goal = "1";
    this.width = 300;
    this.color_only = false;
    
    
  }

  static get properties() {
    return {
      goal: { type: String},
      label: { type: String},
      width: { type: Number},
      color_only: {type: Boolean},
    };
  }
  
  static get styles() {
    return [super.styles,
    css`
      :host {
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

        display: inline-block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--un-sdg-font-size, var(--ddd-font-size-s));
      }

      .color.wrapper{
        background-color: var(--goal-color);
      }

      .wrapper{
        width: var(--width);
        height: var(--width);
      }

      
      img {
        /* object-fit: contain; */
        object-fit: contain;
      } 


      div {
        padding: 0;
        margin: 0;
      }
    `];
  }

  getLabel(){
    const unSDGs = [
      "No Poverty",
      "Zero Hunger",
      "Good Health and Well-being",
      "Quality Education",
      "Gender Equality",
      "Clean Water and Sanitation",
      "Affordable and Clean Energy",
      "Decent Work and Economic Growth",
      "Industry, Innovation, and Infrastructure",
      "Reduced Inequalities",
      "Sustainable Cities and Communities",
      "Responsible Consumption and Production",
      "Climate Action",
      "Life Below Water",
      "Life on Land",
      "Peace, Justice, and Strong Institutions",
      "Partnerships for the Goals"
    ];
    return unSDGs[this.goal-1];
  }
  render() {
    let imgSrc = new URL(`../lib/svg/${this.goal}.svg`, import.meta.url).href;
    if(this.color_only){
      return html`
      <div class="color wrapper"  style="--width: ${this.width}px; --goal-color: var( --un-sdg-color-${this.goal})"></div>
      `;
    } else{
    return html`

      <div class="svg wrapper"  style="--width: ${this.width}px">
        <!-- style="background-color: var()...${this.goal} -->
        <img src=${imgSrc} alt=${this.getLabel()} loading="lazy" fetchpriority="low">
      </div>`;
    }
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(unSdg.tag, unSdg);