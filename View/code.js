angular.module('myApp',[])
  .controller('mailCtrl',function($scope,$http){

	$scope.mailid ="mahesh.verma1983@gmail.com";
	$scope.body ="message";



	$scope.onSubmit = function(){
	$scope.result = 'clicked...';
    var mailgunUrl = "sandboxf4ff2b4f746940e7a56be1226eef1700.mailgun.org";
    var mailgunApiKey = window.btoa("api:key-96139b2b17a6ff763cf44a96f7e59ed5");
	
    var requestHeaders = {
    "Authorization": "Basic " + mailgunApiKey,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
    "Access-Control-Allow-Methods":"GET, POST, PUT, DELETE, OPTIONS"
    }
    
    console.log($scope.mailid);
	$http({
	    method: 'POST',
	    url: '/mail',
	    data: {
	    	'from':'postmaster@sandboxf4ff2b4f746940e7a56be1226eef1700.mailgun.org',
	    	'to': $scope.mailid,
	    	'msg': $scope.body,
	    	text:'OK'
	    },
		headers: requestHeaders

    }).then(function (data) {
        $scope.result = 'success';
    }).catch(function (error) {
        $scope.result = error.message;
    });

	}
}).controller('Ctrl2',function($scope,$http){
	$scope.Button2 = function(){
		$http({
			method: 'POST',
			url: '/mail',
			data: JSON.stringify({
				mail:'mahesh.verma1983@gmail.com'
			})
		});
	}
});