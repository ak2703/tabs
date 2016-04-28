angular.module('starter.controllers', [])
.controller('DashCtrl', function($scope, $rootScope, $http, $ionicPopup, $state) {
  //$rootScope.value = 1;
  if($rootScope.user){
  
    var url = 'http://'+$rootScope.user.ip  ; 
    
    console.log(url);

    $http.get(url).success(function(data){

    console.log(data[0].Data);    
    $scope.unfilled = 100-data[0].Data*100/17+ '%';
    
    $scope.filled = data[0].Data*100/17;
  
    if(parseInt(data[1].Data)<parseInt(data[0].Data)){
      console.log("show pass");
       var f =function(){

                 var alertPopup = $ionicPopup.alert({
                   title: 'Congrats',
                   template: 'Password for this wifi is abcd'
                 });

               alertPopup.then(function(res) {
                
             });
               
           };
      
           setTimeout(f, 3000);
    }

  }
 
  );

  }

  $scope.click = function(){
    $state.go('tab.chats');
  }

})

.controller('ChatsCtrl', function($scope,$rootScope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('ConfigCtrl', function($rootScope, $scope, $state){

  $scope.begin = function(user){
    $rootScope.user = user;
    $state.go('tab.dash')
  }

  $scope.showMap = function(){
    console.log('show');
    $state.go('map');
  }

})
  .controller('MapCtrl', function(NgMap, $scope) {

  $scope.vm = {};
  $scope.vm.positions =[
    {pos:[22.8248611, 75.84888888888888]},
    {pos:[22.8240833, 75.84975]},
    {pos:[22.8241389, 75.84869444444443]}
    
  ];
  $scope.vm.addMarker = function(event) {
    var ll = event.latLng;
    $scope.vm.positions.push({pos:[ll.lat(), ll.lng()]});
  }





 NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });



     });