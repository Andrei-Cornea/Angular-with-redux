// (function(){
  // var app = angular.module("carStore",['ui.bootstrap']);

  app.controller("StoreController",["$http","dataService","$uibModal","$log","$document",function($http, dataService, $uibModal,  $log, $document){
    var vm = this;
    vm.cart = [];
    vm.itemsInCart = null;

    dataService.getData().then(function(data){
      vm.cars = data;
        console.log(vm.cars);
    })

    vm.addToCart = function(val){
        var add = true;
        vm.cart.forEach(function(item){
              if(item.model === val.model) {
                  add=false;
              }
        })
        vm.cars.models.forEach(function(item) {
              if(item.id === val.id) {
                item.selected = true;
              }
        })

        if(add) {
           vm.cart.push(val);
           vm.itemsInCart = vm.cart.length;
           console.log("added");
        }
        console.log("Cart -", vm.cart);
        console.log("Cars -", vm.cars);
    }

    vm.removeCartItem = function(item) {
      console.log(item.id);
      vm.cars.models.forEach(function(model) {
            if(model.id === item.id){
               model.selected = false;
            }
      })
      vm.cart.splice(item,1);
      vm.itemsInCart = vm.cart.length;
      console.log("removed!");
      console.log("Cart -",vm.cart);
      console.log("Cars -",vm.cars);
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
          vm.itemsInCart = null;
          vm.cars.models.forEach(function(item) {
                if(item.selected == true) {
                  item.selected = false;
                }
          })
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());

          });
    }
  }])

  app.controller("PanelController",function(){
    var vm = this;
    vm.tab = 1;

    vm.selectTab = function(val){
      vm.tab= val;
    }
    vm.isSelected = function(selectedTab){
      return vm.tab === selectedTab;
    }
  })

angular.module('carStore')
       .controller('ModalInstanceCtrl', ['$window', '$uibModalInstance', 'cart', function ($window, $uibModalInstance, cart) {

    var vm = this;
    vm.cart = cart;
    vm.itemsInCart = vm.cart.length;

    vm.storeOrder = function () {

      console.log(vm.cart);
      console.log(vm.user);

      vm.finalOrder = [
        customerName = vm.user.name,
        customerEmail = vm.user.mail,
        customerReview = vm.user.review,
        orderDescription = vm.cart
      ]

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



// })()
// app.factory("dataService",function(){
//   return{
//     processingData: function(){
//       var data = {};
//       data.models=[];
//       data.name=[];
//
//       input.makes.forEach(function(entry){
//
//         data.name.push(entry.name);
//         entry.models.forEach(function(model){
//           data.models.push({name:model.name,make:entry.name});
//         });
//
//       })
//       // console.log(data);
//
//       return data;
//     }
//   }
// })



// vm.getmodels= function(make){
//   vm.cars.makes.filter(function(car){
//     if(car.name === make){
//       vm.models = car.models;
//     }
//   })
// }
