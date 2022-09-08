if (self.fetch) {
  const shouldOpen = sessionStorage.getItem("redirect-popup-open") || 'open';
  const isAdmin = window.location.href.includes("/admin");
  const isRootUrl = window.location.href.includes("myshopify.com");
  const isPreview = window.location.href.includes("shopifypreview");
  const previewBar = document.getElementById("preview-bar-iframe"); // some previews don't have myshopify.com or shopifypreview on the url, but have the preview bar added by Shopify

  if (!isPreview && !isAdmin && !isRootUrl && !previewBar && shouldOpen === 'open') {
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
      else if(window.location.href.includes('https://ma.stlthvape.com')){
        currentSiteCountry = 'MOROCCO'
      }
      let urlTo = "https://stlthvape.com";
      let countryTo = "CANADA";
      if(response.continent_code === 'SA' && response.country_iso_code !== 'BR'){
        urlTo = "https://pe.stlthvape.com";
        countryTo = "PERU";
      }
      else{
        switch (response.country_iso_code) {
          case "UA":
            urlTo = "https://ua.stlthvape.com";
            countryTo = "UKRAINE";
            break;
          case "MA":
            urlTo = "https://ma.stlthvape.com";
            countryTo = "MOROCCO";
            break;
        }
      }
      const isTheRightOne = window.location.href.includes(urlTo);
      if (!isTheRightOne) {
        var myDiv = document.createElement("div");
        myDiv.innerHTML = '<redirect-popup></redirect-popup>';
        document.body.appendChild(myDiv);

        document.querySelector('redirect-popup').flag = response.country_iso_code.toLowerCase()
        document.querySelector('redirect-popup').countryFrom = currentSiteCountry
        document.querySelector('redirect-popup').countryTo = countryTo
        document.querySelector('redirect-popup').urlTo = urlTo
        document.querySelector('redirect-popup').countryCurrent = response.country_name.toUpperCase()
        document.querySelector('redirect-popup').open = shouldOpen === 'open';
        sessionStorage.setItem("redirect-popup-open", 'close');
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }
}