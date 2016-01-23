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

              // set default background images
                var imgcount = Object.keys(backgroundImages).length;
                var num = Math.floor(Math.random() * ((imgcount -1) + 1));
                var imageField = $scope.feeds[key];
                //imageField.img = '/app/assets/images/backgrounds/'+ backgroundImages[num];
                imageField.watermark = true;
                // if feed has an image use it instead
                var content = document.createElement('div');
                content.innerHTML = value.content;
                var imgs = $(content).find('img');
                $(imgs).each(function(index){
                  if($(imgs[index]).attr('src').indexOf('feedblitz') == -1 && $(imgs[index]).attr('src').indexOf('feedburner') == -1 ) {
                    console.log($(imgs[index]).attr('src').indexOf('feedblitz') + ' supposed to not be feed ' + $(imgs[index]).attr('src'));
                      var imageField = $scope.feeds[key];
                      imageField.img = $(imgs[index]).attr('src');
                      imageField.watermark = false;
                    return false;
                  }
                });
            });
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
})();