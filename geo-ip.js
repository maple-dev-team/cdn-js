if (self.fetch) {
  const isAdmin = window.location.href.includes("/admin");
  const isRootUrl = window.location.href.includes("myshopify.com");
  const isPreview = window.location.href.includes("shopifypreview");

  // Authorization: ApiKey YOUR_API_KEY
  if (!isPreview && !isAdmin && !isRootUrl) {
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
        switch (response.country_iso_code) {
          case "UA":
            url = "https://ua.stlthvape.com";
            break;
          case "PE":
            url = "https://pe.stlthvape.com";
            break;
        }
        const isTheRightOne = window.location.href.includes(url);
        if (!isTheRightOne) {
          window.location.href = "https://" + url;
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
}
