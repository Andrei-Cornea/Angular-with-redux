app.factory("dataService",['$http',function($http){
  var data = {};
  data.models=[];
  data.name=[];

  var getData = function(){
       return  $http.get("http://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=e6jd7d4rx7qx64r5dskzwdwc")
           .then(function(response){
             console.log(response.data);
                  var id = 0;

                   response.data.makes.forEach(function(entry){
                     data.name.push(entry.name);

                       entry.models.forEach(function(model){
                         data.models.push(
                           {
                           name:model.name,
                           make:entry.name,
                           id:model.id,
                           selected:false
                         });

                       });

                   })

                   console.log(data);
                   return data;
                 })
         }

      return{
        getData: getData
      }

}])
