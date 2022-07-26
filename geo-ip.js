if (self.fetch) {
  fetch("http://ip-api.com/json/", {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((resp) => resp.json())
    .then(function (response) {
      let url = "stlthvape.com";
      switch (response.data.countryCode) {
        case "UA":
          url = "ua.stlthvape.com";
          break;
        case "PE":
          url = "pe.stlthvape.com";
          break;
      }

      const isPreview = window.location.href.includes("shopifypreview");
      const isTheRightOne = window.location.href.includes(url);
      const isAdmin = window.location.href.includes("/admin");
      const isRootUrl = window.location.href.includes("myshopify.com");

      if (!isPreview && !isAdmin && !isRootUrl && !isTheRightOne) {
        window.location.href = "https://" + url;
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
