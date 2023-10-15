'use strict';
var myApp = angular
    .module('a11yTicketApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'firebase',
        'ngAria', 
        'ngMessages', 
        'ngAnimate'
    ])
    // URL to connect to Firebase backend
    .value('fbURL', 'https://torrid-torch-2393.firebaseio.com/')

    .config(function ($routeProvider) {
        $routeProvider
            .when('/main', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                title: 'Ticket Tracker'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                title: 'Ticket Tracker Elements'
            })
            .when('/edit/:id', {
                templateUrl: 'views/edit.html',
                controller: 'EditCtrl',
                title: 'Edit Ticket'
            })
            .when('/create', {
                templateUrl: 'views/create.html',
                controller: 'CreateCtrl',
                title: 'Create a ticket'
            })
            .otherwise({
                redirectTo: '/main'
            });
    })

    .run(['$location', '$rootScope', function($location, $rootScope) {
        // Create some global variables to share data between controllers
        // Not best practice but will do for this quick app
        $rootScope.lastTicketID = "";
        $rootScope.lastForm = "";
        $rootScope.search = "";

        var history; // stores uri of last page viewed - Used to track if we should set focus to main H1
        var currentURL; // store uri of current page viewed - Used to track if we should set focus to main H1

        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            if(current.$$route) {
                currentURL = current.$$route.originalPath;
                $rootScope.title = current.$$route.title;
            }

            if(currentURL != "/main"){
                $rootScope.lastTicketID = "";
            }
            if(previous) {
                if(previous.$$route){
                    history = previous.$$route.originalPath;
                }
            }

        });

        // $rootScope.$on('$viewContentLoaded', function () {
        //     // Once the template loads set focus to the H1 to manage focus
        //     // if there is no history do not adjust focus this is the first page the user is seeing
        //     if(history) {
        //         // Default - set page focus to H1
        //         $('h1').attr("tabIndex", -1).focus();
        //         // when we cancel on the create form
        //         if ($rootScope.lastForm == "create" && currentURL == "/main"){
        //             $('#add-new-ticket').attr("tabIndex", 0).focus();
        //             $rootScope.lastForm = "";
        //         }
        //     }

        //     // If there is a flash message set focus to it - trumps all focus
        //     if($rootScope.flashMsg != ""){
        //         $('div#flash-message a').attr("tabIndex", 0).focus();
        //     }
        // });
    }]
);