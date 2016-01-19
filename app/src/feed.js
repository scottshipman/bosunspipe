'use strict';

var App = angular.module('RSSFeedApp', ['ngRoute']);

App.controller("FeedCtrl", ['$scope','FeedService', function ($scope,Feed) {
    $scope.loadButonText="Load";
    $scope.loadFeed=function(e){
        Feed.parseFeed($scope.feedSrc).then(function(res){
            $scope.loadButonText=angular.element(e.target).text();
            $scope.feeds=res.data.responseData.feed.entries;
            var findFirstImage = $scope.feeds[0].content;
            angular.forEach($scope.feeds,function(value){
              var firstImage = $(value.content).find('img').eq(0).attr('src');
              console.log(value.content);
            });
          var firstImage = $(findFirstImage).find('img').eq(0).attr('src');
          console.log(firstImage);
          $scope.firstImg = firstImage;
        });
    }
}]);

App.factory('FeedService',['$http',function($http){
    return {
        parseFeed : function(url){
            return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    }
}]);
