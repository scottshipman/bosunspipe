(function(){

'use strict';

var App = angular.module('RSSFeedApp', ['ngRoute']);

angular.module('myApp.filters', []).
  filter('htmlToPlaintext', function() {
    return function(text) {
      return angular.element(text).text();
    }
  }
);

App.controller("FeedCtrl", ['$scope','FeedService', function ($scope,Feed) {
    $scope.loadButonText="Load";
    $scope.loadFeed=function(e){
        Feed.parseFeed($scope.feedSrc).then(function(res){
            $scope.loadButonText=angular.element(e.target).text();
            $scope.feeds=res.data.responseData.feed.entries;
            angular.forEach($scope.feeds,function(value, key){

              var content = value.content;

              // var img = content.find('img').src;
              var doesitwork = $(content).find('img').attr('src');
              console.log(doesitwork);
              // var firstImage = $(value.content).find('img').eq(0).attr('src');
              if ('undefined' !== typeof doesitwork) {
                var imageField = $scope.feeds[key];
                imageField.img = doesitwork;
                // console.log(imageField);
              }
            });

        });
    }

    $scope.sampleImages = [
      {something: 'http://dweaay7e22a7h.cloudfront.net/dr-content_3/uploads/2015/01/Hacking2-650x360.jpg'},
      {somethingelse: 'http://bullshit.com'}
    ];
    // $scope.test = ->
    console.log($scope);
}]);

App.factory('FeedService',['$http',function($http){
    return {
        parseFeed : function(url){
            return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    }
}]);
})();
