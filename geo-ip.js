import {html, css, LitElement} from 'https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module';

const privateOpen = Symbol('open');

var minireset = css`/*! minireset.css v0.0.7 | MIT License | github.com/jgthms/minireset.css */html,body,p,ol,ul,li,dl,dt,dd,blockquote,figure,fieldset,legend,textarea,pre,iframe,hr,h1,h2,h3,h4,h5,h6{margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}ul{list-style:none}button,input,select{margin:0}html{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}img,video{height:auto;max-width:100%}iframe{border:0}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}`;

class OneDialog extends LitElement {

  static get properties() {
    return { 
      open: { type: Boolean, attribute: 'open', reflect: true },
      countryTo: {type: String, attribute: 'countryTo', reflect: true},
      countryFrom: {type: String, attribute: 'countryFrom', reflect: true},
      countryCurrent: {type: String, attribute: 'countryCurrent', reflect: true},
      flag: {type: String, attribute: 'flag', reflect: true},
    };
  }
  
  static get styles() {
    return [
      minireset,
      css`
        .wrapper {
          opacity: 0;
          transition: visibility 0s, opacity 0.25s ease-in;
        }
        .wrapper:not(.open) {
          visibility: hidden;
        }
        .wrapper.open {
          align-items: center;
          display: flex;
          justify-content: center;
          height: 100vh;
          position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          opacity: 1;
          visibility: visible;
        }
        .overlay {
          background: rgba(0, 0, 0, 0.8);
          height: 100%;
          position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
          width: 100%;
        }
        .dialog {
          background: #000;
          max-width: 600px;
          padding: 1rem;
          position: fixed;
        }

        /* Jony css start */
        .main-div {
          font-family: 'Roboto';
          font-size: 14px;
          color:white; 
          text-align: center; 
          width:550px; 
          margin:8px; 
          display: flex; 
          flex-direction: column;
          padding-top: 20px;
        }
        .div-padding {
            padding-top: 18px;
        }
        .div-padding-buttons {
            padding-top: 24px;
        }
        .button-yes {
            padding: 10px 10px;
            font-size: 12px;
            text-transform: uppercase;
            color: #000;
            background-color: #fff;
            border: none;
            border-radius: 8px;
            outline: none;
            text-decoration: none;
        }
        .button-yes:hover {
            background-color: #0329d3;
            box-shadow: 0px 15px 20px rgba(88, 125, 243, 0.4);
            color: #fff;
            xtransform: translateY(-7px);
        }
        .button-stay {
            padding: 10px 10px;
            font-size: 12px;
            text-transform: uppercase;
            color: #fff;
            background-color: #000;
            border: none;
            border-radius: 8px;
            outline: none;
            text-decoration: none;
        }
        .button-stay:hover {
            background-color: #0329d3;
            box-shadow: 0px 15px 20px rgba(88, 125, 243, 0.4);
            color: #fff;
            xtransform: translateY(-7px);
        }
        .flex-center {
            display:flex; 
            flex-direction: row;
            justify-content: center;
        }
        .flex-around{
            display:flex; 
            flex-direction: row;
            justify-content: space-around;
        }`];
  }
  
  firstUpdated() {
    this._watchEscape = this._watchEscape.bind(this);
  }
  
  render() {
    return html`
    <div class="wrapper ${this.open ? 'open' : ''}" aria-hidden="${!this.open}">
      <div class="overlay" @click="${this.close}"></div>
      <div class="dialog" role="dialog" aria-labelledby="title" aria-describedby="content">
        <div id="content" class="content">
          <div class="main-div">
            <div style="font-size: 36px;">
            <img src="https://cdn.shopify.com/s/files/1/0003/6192/2624/files/stlthlogo_white_160x160.png?v=1662582043" alt="" data-mce-src="https://cdn.shopify.com/s/files/1/0003/6192/2624/files/stlthlogo_white_160x160.png?v=1662582043">
            </div>
            <div class="div-padding">IT SEEMS LIKE YOU ARE SEARCHING FROM</div>
            <div class="div-padding flex-center">
              <span slot="country-content" style="align-items: center; display: flex;">
                <img src="https://flagcdn.com/w40/${this.flag}.png" alt="${this.countryCurrent}" style="width: 40px; height: 28px;">
                <span style="font-size: 36px;margin-left: 14px;">${this.countryCurrent}</span>
              </span>
            </div>
            <div class="div-padding">WOULD YOU LIKE TO VISIT THE ${this.countryTo} SITE?</div>
            <div class="div-padding-buttons flex-around">
              <a href="#" class="button-stay">
                NO STAY ON THE ${this.countryFrom} SITE
              </a>
              <a href="#" class="button-yes">
                YES, TAKE ME TO THE ${this.countryTo} SITE
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }
  get open() { return this[privateOpen]; }

  set open(isOpen) {
    this[privateOpen] = isOpen;
    const { activeElement } = document;
    if (isOpen) {
      if (activeElement) {
        this._wasFocused = activeElement;
      }
      document.addEventListener('keydown', this._watchEscape);
    } else {
      this._wasFocused && this._wasFocused.focus && this._wasFocused.focus();
      document.removeEventListener('keydown', this._watchEscape);
    }
  }

  close() {
    this.open = false
    const closeEvent = new CustomEvent('dialog-closed');
    this.dispatchEvent(closeEvent);
  }

  _watchEscape(event) {
    if (event.key === 'Escape') {
        this.close();   
    }
  }
}

customElements.define('one-dialog', OneDialog);

document.addEventListener("DOMContentLoaded", function(event) {
  if (self.fetch) {
    const isAdmin = window.location.href.includes("/admin");
    const isRootUrl = window.location.href.includes("myshopify.com");
    const isPreview = false; //window.location.href.includes("shopifypreview");
    const previewBar = false; //document.getElementById("preview-bar-iframe"); // some previews don't have myshopify.com or shopifypreview on the url, but have the preview bar added by Shopify

    // Authorization: ApiKey YOUR_API_KEY
    if (!isPreview && !isAdmin && !isRootUrl && !previewBar) {
      fetch("https://geoip.appforge.ca/country/", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => resp.json())
      .then(function (response) {
        let currentSiteCountry = 'CANADA'
        if(window.location.href.includes('https://ua.stlthvape.com')){
          currentSiteCountry = 'UKRAINE'
        }
        else if(window.location.href.includes('https://pe.stlthvape.com')){
          currentSiteCountry = 'PERU'
        }
        else if(window.location.href.includes('https://pe.stlthvape.com')){
          currentSiteCountry = 'MORROCO'
        }
        let url = "https://stlthvape.com";
        let countryTo = "CANADA";
        if(response.continent_code === 'SA'){ // && response.country_iso_code !== 'BR'){
          url = "https://pe.stlthvape.com";
          countryTo = "PERU";
        }
        else{
          switch (response.country_iso_code) {
            case "UA":
              url = "https://ua.stlthvape.com";
              countryTo = "UKRAINE";
              break;
            case "MA":
              url = "https://ma.stlthvape.com";
              countryTo = "MORROCO";
              break;
          }
        }
        const isTheRightOne = window.location.href.includes(url);
        if (!isTheRightOne) {

          document.querySelector('one-dialog').flag = response.country_iso_code.toLowerCase()
          document.querySelector('one-dialog').countryFrom = currentSiteCountry
          document.querySelector('one-dialog').countryTo = countryTo
          document.querySelector('one-dialog').countryCurrent = response.country_name

          var myDiv = document.createElement("div");
          myDiv.id = 'one-dialog-popup';
          myDiv.innerHTML = '<one-dialog></one-dialog>';
          document.body.appendChild(myDiv);
          document.querySelector('one-dialog').open = true;
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    }
  }
});

