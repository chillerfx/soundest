var app = angular.module('soundest', ['ngRoute', 'weatherFilters', 'angular-loading-bar']);
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/city-list.html',
                controller: 'CityController'
            }).
            // when('/city/:country', {
            //     templateUrl: 'city-list.html',
            //     controller: 'CityController'
            // }).
            // when('/country/:id', {
            //     templateUrl: 'country-weather.html',
            //     controller: 'WeatherDetailCtrl'
            // })
            when('/city/:id', {
                templateUrl: 'partials/city-weather.html',
                controller: 'WeatherDetailCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

app.controller('CityController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.cities = [];
        $scope.favcities = []; // localStorage.favcityID.split(",");        
        $scope.cities = $http.get('city.list.json.gz')
                .success(function(data) {                  
                    $scope.cities = data;
                })
                .error(function(data) {
                    console.log(data);
                });      
        $scope.quantity = 24;

        $scope.showFavorites = function() {           
        if  (localStorage.favcityID) {
            var arr = $scope.cities;
            var fav =  localStorage.favcityID.split(",");
            for (var i=0; i<$scope.cities.length; i++ ) {
                for(var j=0; j <fav.length; j++ ) {
                    if ($scope.cities[i]._id == fav[j]){
                        $scope.favcities.push(arr[i])        
                        }
                    }
                };                             
            }
        };
    }
]);

app.controller('WeatherDetailCtrl', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $scope.cityID = $routeParams.id       
        $scope.sunrise = null;
        $scope.sunset = null;
        $scope.weatherInfo =  $http.get('http://api.openweathermap.org/data/2.5/weather?id='+$scope.cityID + "&APPID=b49fed29e12707af98d9864573b59101")//, {params: {id : $scope.cityid}})
        .success(function (data) {
            $scope.weatherInfo = data;           
        }).error(function(data, status){
            console.log(data + " " + status);
        })
        $scope.saveFavorite = function() {
            var arr = "";            
            var store = 1;
            if (localStorage.favcityID) {
                arr = localStorage.favcityID.split(",");
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == $scope.cityID) {
                     var store = 0;
                    }
                }
            };            
            if (store == 1 && arr.length != 0) {
                localStorage.favcityID = localStorage.favcityID + "," + $scope.cityID;
            } else if (store == 1 && arr.length == 0) {
                localStorage.favcityID = $scope.cityID;
            };
        }
        
        
}]);












