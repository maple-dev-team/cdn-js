if (self.fetch) {
  fetch("https://6477-187-44-162-234.sa.ngrok.io/api/get-store-url", {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      console.log("data.url: ", data.url);
      if (window.location.href !== data.url) {
        window.location.href = data.url;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
