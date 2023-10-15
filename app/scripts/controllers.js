'use strict';
angular.module('a11yTicketApp')
  .controller('HeaderController', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  })
  .controller('MainCtrl', function ($scope, $rootScope, Tickets, Flash, $timeout) {
    $scope.flash = Flash;
    $scope.tickets = Tickets;
    $scope.search = $rootScope.search;
    $scope.toggleTicketDetails = function (e, index) {
      if ($scope.index == index) {
        delete $scope.index;
      } else {
        $scope.index = index;
      }
      e.preventDefault();
        $timeout(function() {
          $('#ticket-'+ index + " h4").first().attr("tabIndex",-1).focus()
        }, 0);
      };
    $scope.remove = function (id) {
      Flash.setMessage("Record Deleted!");
      Tickets.$remove(id);
    };
    $scope.$watch("search", function(newValue, oldValue) {
      $rootScope.search = $scope.search;
    });
  })
  .controller('EditCtrl', function ($scope, $rootScope ,$location, $routeParams, $firebase, fbURL, WcagscService, SeverityLevelService, Flash) {
    var ticketURL = new Firebase(fbURL + $routeParams.id);
    var ticketsObject = $firebase(ticketURL).$asObject();
    $scope.tickets = ticketsObject;
    $rootScope.lastTicketID = $scope.tickets.$id;
    ticketsObject.$loaded().then(function(object) {
        $rootScope.title = $rootScope.title + " - " + object.summary;
        $rootScope.lastTicketID = object.$id;
    });
    $scope.wcagSCList = WcagscService.wcagSCList;
    $scope.severityList = SeverityLevelService.severityList;

    Flash.setMessage("");
    $scope.edit = function (inValid) { // invalid is passed from angulars form processing
      if (inValid) {
        $('#error-bucket').show().attr("tabIndex", -1).focus();
        $scope.submitted = true;
      } else {
        var edit = $scope.tickets.$save();
        if (edit) {
          Flash.setMessage("Record saved!");
          $location.path("main");
        } else {
          alert('something went wrong');
        }
      }
    };
    $scope.go = function (path) {
      $rootScope.lastForm = "edit";
      $location.path(path);
    };
  })
  .controller('CreateCtrl', function ($scope, $rootScope, Tickets, $location, $routeParams, $firebase, fbURL, WcagscService, SeverityLevelService, Flash) {
    $scope.wcagSCList = WcagscService.wcagSCList;
    $scope.severityList = SeverityLevelService.severityList;
    Flash.setMessage("");
    $scope.add = function (inValid) {
      if(!$scope.resolved){
        $scope.resolved = false;
      }
      if (inValid) {
        $('#error-bucket').show().attr("tabIndex", -1).focus();
        $scope.submitted = true;
      } else {
        var save = Tickets.$add({
          summary: $scope.summary,
          description: $scope.description,
          wcagSC: $scope.wcagSC,
          severity: $scope.severity,
          fix: $scope.fix,
          resolved: $scope.resolved
        });
        if (save) {
          $rootScope.search = "";
          Flash.setMessage("Ticket Created!");
          $location.path("main");
        } else {
          alert('something went wrong');
        }
      }
    };
    $scope.go = function (path) {
      $rootScope.lastForm = "create";
      $location.path(path);
    };
  })
  .controller('AboutCtrl', function ($scope, $rootScope) {
    $rootScope.search = "";
    var vm = this;
    $(this).find("#myInput").focus();
    vm.angularVersion = angular.version.full;
    vm.lessonTitle = 'How to use the ngAria module';
  });