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
