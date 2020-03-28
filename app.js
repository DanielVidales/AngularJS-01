(function () {
'use strict';

angular.module('myFirstApp', [])

.controller('MyFirstController', function ($scope) {
  $scope.name = "Daniel";
  $scope.message= "Por validar";
  $scope.items;
  var itemsFound = 0;
    console.log($scope.items);
  $scope.sayHello = function () {
    return "Hello Coursera!";
  };
  $scope.createMessage = function(ref,operator,flags){
  var message = "";
    var operatorFoo = {
    '<' : function(val, ref) {
        return val < ref;
    },
    '>' : function(val, ref) {
        return val > ref;
    },
    '=' : function(val, ref) {
        return val === ref;
    }
  };
  try{

    $scope.items.split(',').forEach(function (value, key){
      /*  Small patch to always retrieve exception message right below, as when $scope.items
          receives valid dat once, it is no longer undefined, as when left blank again, split
          as $scope items is now not undefined but still retrieves an empty or undefined 1 item array*/
      if ($scope.items[0] === undefined)message = "No numbers provided for validation";

      if(operatorFoo[operator](value, ref)){
        if (flags[0]){ //one item match found
          if(key === 0){
          message += (key+1) + "st";
        }
          else{
        message += (key+1) + "th";
      }
        flags[0] = false;
        flags[2] = (key+1) + "th";
      }else{
        message += ", " + (key+1) + "th";
        flags[1] = true; //item matches at least twice
        flags[2] = (key+1) + "th"; //last concatenated field reference
      }
    };
    });
    if (message !== "" && message != "No numbers provided for validation"){
      if (operator === '>')
    message = "Too much on: " + message;
    else if (operator == '=')
    message = "Empty values found on: " + message;
    if (flags[1]){
      message = message.replace(", "+ flags[2], " and " + flags[2] + " fields.");
    }else {
    message = message + " field.";
      }
    }
    return message;
  }catch(error){
    console.log(error.message);
    if (error.message === "Cannot read property 'split' of undefined")
    message = "No numbers provided for validation";
    return  message;
  }
}



    $scope.printName = function(quantities){ //can also omit param and use $scope.items directly

try{
      var flags = [true,false, ""]; //initial condition to add comas after more than one time has ocurred
                              //flag[1] value indicates remains false when invalid cond. only occured once, otherwise true
                             //flag[2] will store the last invalid field to later replace it as addequate
      var message = $scope.createMessage(3, '>', flags);
      //console.log(message);
      if (message === ""){ //1st validation ok
      flags = [true,false, ""];
       message = $scope.createMessage("", '=', flags); //attempt 2nd validation
      console.log(message);
    }

    //on second validation
    if (message === ""){ message = 'Enjoy';}// Passed 3 validations
    $scope.message = message;

    }catch(error){
      console.log(error.message);
      }
    }

});

})();
