if (self.fetch) {
  fetch("https://geo-ip.appforge.ca/api/get-store-url", {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      const isPreview = window.location.href.includes("shopifypreview");
      const isTheRightOne = window.location.href.includes(data.url);
      const isAdmin = window.location.href.includes("/admin");
      const isRootUrl = window.location.href.includes("myshopify.com");

      if (!isPreview && !isAdmin && !isRootUrl && !isTheRightOne) {
        window.location.href = "https://" + data.url;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
