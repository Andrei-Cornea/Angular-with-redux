
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
