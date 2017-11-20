    //********************************
    // ici tu fais un injection simple de dépendances
    //********************************
app.controller("addCtrl", function($scope, $rootScope, usersFactory, $window) {


    //********************************
    // what is this ?
    //********************************
    $scope.users = new usersFactory();

    $scope.addUser = function(user) {
        console.log(user);
        user.$save();

        //********************************
        // sale^ ! (juste comme ça : et pourquoi revenir a la liste ? reset user pour laisser les inputs prets a l'emploi et au pire affiche un message de succès ou une notif, si jamais tu veux en ajouter deux ou trois de suite, c'est chiant^^)
        //********************************
        $window.location.href = '/';

    };
});