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
