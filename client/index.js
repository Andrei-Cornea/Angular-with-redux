import angular from 'angular';
import uibootstrap from 'angular-ui-bootstrap';
// var uibs = require('angular-ui-bootstrap');

// Declare Car Market Module
var carMarketApp = angular.module('carMarketApp', [uibootstrap]);

carMarketApp.factory("CarMarketService", ['$http', function($http) {
    var marketData = {};
    marketData.models = [];
    marketData.name = [];
    var getMarketData = function(){
        return $http.get("http://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=e6jd7d4rx7qx64r5dskzwdwc")
            .then(function(response) {
                var id = 0;
                response.data.makes.forEach(function(entry) {
                    marketData.name.push(entry.name);
                    entry.models.forEach(function(model) {
                        marketData.models.push({
                            id: id++,
                            name: model.name,
                            make: entry.name,
                            isSelected: false
                        });
                    });
                })
                return marketData;
            })
    }
    return {
        getMarketData: getMarketData
    }
}]);



carMarketApp.controller("StoreController", ["CarMarketService","$uibModal","$log", function(CarMarketService, $uibModal, $log) {
    var vm = this;
    vm.cart = [];

    CarMarketService.getMarketData().then(function(marketData) {
        vm.cars = marketData;
    })

    vm.addToCart = function(car) {
      console.log("drvewrdvfe",car);

      if(car.isSelected === false) {
        car.isSelected = true;
        vm.cart.push(car);

        console.log("cars after added",vm.cars);
        console.log("piked",vm.cart);

      } else {
        vm.removeCartItem(car);
        // console.log('Remaining CARS',vm.cart.filter((item) => { return item.id !== car.id;}));
      }

      vm.removeCartItem = (car) => {
        car.isSelected = false;
        vm.cart = vm.cart.filter((item) => { return item.id !== car.id;});

        // console.log('cars after removed',vm.cars.models.filter((item) => { return item.id === car.id}));
        // console.log('Remaining CARS',vm.cart.filter((item) => { return item.id !== car.id;}));
      }

      // console.log("drvewrdvfe", vm.cars.models[car.id].isSelected);
      // console.log("Cars models -", vm.cars.models);
      // console.log("Cart -", vm.cart);
      // console.log("Cars -", vm.cars);
    }

    vm.openModal = function(size) {

      var modalInstance = $uibModal.open({
        animation: "true",
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        controllerAs: 'modal',
        size: size,
        resolve: {
                itemsInCart: function(){
                  return vm.itemsInCart;
                },
                cart: function () {
                  return  vm.cart;
                }
              }
      })

      modalInstance.result.then(function (data) {
          vm.cart = [];
          vm.cars.models.forEach(function(item) {
                if(item.isSelected == true) {
                  item.isSelected = false;
                }
          })
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());

          });
    }

}]);

carMarketApp.controller('ModalInstanceCtrl', ['$window', '$uibModalInstance', 'cart','$log', function ($window, $uibModalInstance, cart, $log) {

  var vm = this;
  vm.cart = cart;
  vm.itemsInCart = vm.cart.length;

  vm.storeOrder = function () {

    console.log("Cart",vm.cart);
    console.log("user",vm.user);

    vm.finalOrder = {
      customerName : vm.user.name,
      customerEmail : vm.user.mail,
      customerReview : vm.user.review,
      orderDescription : vm.cart

    }


    console.log('finalOrder-',vm.finalOrder);
    // console.log('vm.finalOrder', vm.finalOrder);
    if (vm.user.name in $window.localStorage){
      console.log("Please choose another username!");
    } else {
      $window.localStorage.setItem(vm.user.name, vm.finalOrder)
      // $window.location.reload();
    }

    $uibModalInstance.close();


  };

  vm.validateName = function(val){
    var patt = /^(?!.*([A-Za-z0-9])\1{1})[A-Za-z0-9]{5,}$/;
    return patt.test(val);
  }

  vm.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);
