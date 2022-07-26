if (self.fetch) {
  const isAdmin = window.location.href.includes("/admin");
  const isRootUrl = window.location.href.includes("myshopify.com");
  const isPreview = window.location.href.includes("shopifypreview");

  if (!isPreview && !isAdmin && !isRootUrl) {
    fetch("https://ipapi.co/json/")
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
