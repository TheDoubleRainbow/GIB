<<<<<<< HEAD
require('./lib/axios/axios.js');

=======
>>>>>>> 0caf68a16eba85286fae5b0958db875b56adb68a
axios.get('https://api.github.com/repos/TheDoubleRainbow/GIB/issues')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
