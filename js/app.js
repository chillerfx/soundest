var app = angular.module('soundest', ['ngRoute']);

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
            //$scope.EndTime = data[0]['expires']*1000;
        })
        $scope.quantity = 5;
     }
]);
// app.service('CityService', function ($http) {
//     return  {   data : 
//             }
// })

app.controller('CityController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.cities = [];        
        //console.log(CityService.data());
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
        $scope.weatherInfo =  $http.get('http://api.openweathermap.org/data/2.5/weather?id='+$scope.cityID)//, {params: {id : $scope.cityid}})
        .success(function (data) {
            $scope.weatherInfo = data;
        }).error(function(data, status){
            console.log(data + " " + status);
        })
        // getWeatherInfo = $resource("http://ip-address/something/:id", {id: "@id"})
        // $scope.weatherInfo = getWeatherInfo.get({id:$scope.cityID })
  //       Something = $resource("http://ip-address/something/:id", {id: "@id"});
  // $scope.something = Something.get({id:1});
        // $scope.SKU = $routeParams.SKU;
        //     // $http.get('index.php', {params:{i :$routeParams.SKU}}).success(function(data) {
        //     //     $scope.products = data;
        //     //     $scope.EndTime = data[0]['expires'] *1000;
        //     // });
}]);












