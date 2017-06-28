debugger;
application_file.controller("myfileController", function ($scope, dataFactory) {

    dataFactory.getData(document.getElementById('hdn1').value).then(function (result) {
        debugger;
        $scope.getDataResultresult.data
        var fff= result.data;
    });
})