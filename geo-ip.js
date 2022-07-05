if (self.fetch) {
  fetch("http://127.0.0.1:35163/api/get-store-url")
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
