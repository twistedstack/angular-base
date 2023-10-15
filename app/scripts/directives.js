'use strict';
angular.module('a11yTicketApp')
  .directive('ngConfirmClick',[
    function(){
      return {
        priority: -1,
        restrict: 'A',
        link: function(scope, element, attrs){
          element.bind('click', function(e){
            var message = attrs.ngConfirmClick;
            if(message && !confirm(message)){
              e.stopImmediatePropagation();
              e.preventDefault();
            }
          });
        }
      }
    }
  ])
  .directive('setLastTicketIdFocus', function($timeout, $rootScope) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        if (scope.$last === true && $rootScope.lastTicketID != "") {
          $timeout(function () {
            if($rootScope.flashMsg == "" && $rootScope.lastForm == "edit"){
              // First need to check if the edit button we clicked on still exists.
              // In 2-way binding someone could delete record before you come back to main screen.
              // By default focus will be set to H1
              if($("#" + $rootScope.lastTicketID + " .edit-btn").length){
                  // Set focus to edit button of record we are editing.
                  $("#" + $rootScope.lastTicketID + " .edit-btn").focus();
                }
              $rootScope.lastTicketID = "";
              $rootScope.lastForm = "";
            }
          });
        }
      }
    }
  })
  .directive('showAttrs', function() {
    return function(scope, el, attrs) {
      var pre = document.createElement('pre');
      el.after(pre);
      scope.$watch(function() {
        var attrs = {};
        Array.prototype.slice.call(el[0].attributes, 0).forEach(function(item) {
           if (item.name !== 'show-attrs') {
             attrs[item.name] = item.value;
           }
        });
        return attrs;
      }, function(newAttrs, oldAttrs) {
         pre.textContent = JSON.stringify(newAttrs, null, 2);
      }, true);
    }
  })
  .directive('setFocus', function ($timeout) {
    return function (scope, element, attrs) {
      $timeout(function () {
        element[0].focus();
      }, 0);
    };
});

