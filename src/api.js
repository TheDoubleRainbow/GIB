axios.get('https://api.github.com/repos/TheDoubleRainbow/GIB/issues')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
