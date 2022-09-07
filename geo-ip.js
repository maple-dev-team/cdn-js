if (self.fetch) {
  const isAdmin = window.location.href.includes("/admin");
  const isRootUrl = window.location.href.includes("myshopify.com");
  const isPreview = window.location.href.includes("shopifypreview");
  const previewBar = document.getElementById("preview-bar-iframe"); // some previews don't have myshopify.com or shopifypreview on the url, but have the preview bar added by Shopify

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
        let url = "https://stlthvape.com";
        if(response.continent_code === 'SA' && response.country_iso_code !== 'BR'){
          url = "https://pe.stlthvape.com";
        }
        else{
          switch (response.country_iso_code) {
            case "UA":
              url = "https://ua.stlthvape.com";
              break;
            case "MA":
              url = "https://ma.stlthvape.com";
              break;
          }
        }
        const isTheRightOne = window.location.href.includes(url);
        if (!isTheRightOne) {
          window.location.href = url;
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
}
