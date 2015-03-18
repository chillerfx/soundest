angular.module('weatherFilters', [])
.filter('formatTime', function() {
  return function(input) {
	var date = new Date(input*1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
    return formattedTime;
  };
})
.filter('toCelcius', function() {
	return function(input) {
		var temp = input-273.15
		return temp.toFixed(2) + '℃'
	}
})
// filter('dateFilter', function() {
//   return function(input) {
//   	var date = new Date(input*1000);
//     var hours = date.getHours();
//     var minutes = "0" + date.getMinutes();
//     var seconds = "0" + date.getSeconds();
//     var formattedTime = hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2)
//     return formattedTime;
//   };
// });
