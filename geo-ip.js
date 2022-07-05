if (self.fetch) {
  fetch("http://127.0.0.1:36867/api/get-store-url")
    .then((resp) => resp.json())
    .then(function (data) {
      console.log("data: ", data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
