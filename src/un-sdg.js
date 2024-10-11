import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
//ask about updated(), reflect: true, and comments
export class unSdg extends DDDSuper(LitElement) {

  static get tag() {
    return "un-sdg";
  }

  updated(){
    
  }

  constructor() {
    super();
    this.goal = "1";
    this.width = 200;
    this.colorOnly = false;  
  }

  static get properties() {
    return {
      goal: { type: String},
      label: { type: String},
      width: { type: Number},
      colorOnly: {type: Boolean},
    };
  }
  
  static get styles() {
    return [super.styles,
    css`
      :host {
        /* set color variables */
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
        --un-sdg-color-circle: rgb(255,255,255);
        --un-sdg-color-all: rgb(255,255,255);

        display: block;
      }

      /* set bg-color for when colorOnly is true, square dimensions*/
      .color.wrapper{
        background-color: var(--goal-color);
        width: var(--width, 200); 
        height: var(--width, 200); 
      }

      .svg.wrapper{
        width: var(--width, 200);
        height: auto;
      }

      img {
        width: var(--width, 200);
        display: block;
      } 

      div {
        padding: 0;
        margin: 0;
      }
    `];
  }

  // This function return label according to current this.goal 
  getLabel(){
    if (Number.isInteger(Number(this.goal))){

      const SDGLabelList = [ //list of labels that are sorted according to goal number - 1 to 17
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

      return SDGLabelList[this.goal-1]; 

    } else if(this.goal === "all"){
      return "UN Sustainable Development Goals"
    } else if (this.goal === "circle"){
      return "UN Sustainable Development Goals Logo"
    } else{
      return ""
    }
  }

  // return img path according to this.goal
  getImgSrc(){
    let imgSrc;
    if(this.goal === 'all'){
      imgSrc = new URL(`../lib/svg/all.png`, import.meta.url).href; 
    } else{
      // let path=String(`../lib/svg/${this.goal}.svg`);
      let path=String(`https://raw.githubusercontent.com/nazman-hub/IST256-UN-SDG/0c920952e501b3e21b5dcd14026aae1f5ba20d41/lib/svg/${this.goal}.svg`);
      
      imgSrc = new URL(path, import.meta.url).href; 
    }
    return imgSrc;
  }

  render() {

    return html`
      ${this.colorOnly ? html`
        <!-- if colorOnly is true, render div with class .color (for styling purposes) -->
        <!-- CSS variable --width is set according this.width -->
        <!-- CSS variable --goal-color is created and set according to the color of the current this.goal -->
        <div class="color wrapper"  style="--width: ${this.width}px; --goal-color: var(--un-sdg-color-${this.goal})" label="${this.getLabel()} color only"></div>                
      ` : html`
        <!-- if colorOnly is false, render div with class .svg, --width is set according to this.width -->
        <div class="svg wrapper"  style="--width: ${this.width}px">
          <!-- render image using URL object created earlier, 
           alt text is set according to this.goal by calling getLabel()
           image width is set according to this.width-->
          <img src=${this.getImgSrc()} alt=${this.getLabel()} loading="lazy" fetchpriority="low" width=${this.width}> 
        </div>
      `
    }`;
    
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