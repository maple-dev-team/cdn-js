if (self.fetch) {
  fetch("https://13c5-187-44-162-234.sa.ngrok.io/api/get-store-url")
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
