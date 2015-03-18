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
app.controller('CountryController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.countries = [];
        $http.get('city.list.json.gz').success(function(data) {
            $scope.cities = data;          
        })
        $scope.quantity = 5;
     }
]);

app.controller('CityController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.cities = [];        
             $scope.cities = $http.get('city.list.json.gz')
                .success(function(data) {                  
                    $scope.cities = data;
                })
                .error(function(data) {
                    console.log(data);
                })        ;      
        $scope.quantity = 25;
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
        
}]);












