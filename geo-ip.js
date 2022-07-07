if (self.fetch) {
  fetch("https://geo-ip.appforge.ca/api/get-store-url", {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      if (!window.location.href.includes(data.url)) {
        window.location.href = data.url;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
