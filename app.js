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
  //time to reeplace actual body with parameters in terms of flags
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
      /*  Small patch to always retrieve this exception message, as when $scope.items
          gets defined permanently as array and no longer enters into exception
          but retrieves message of 1st field left blank instead   */
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

      console.log("hola Mundo");//);
     //$scope.message = 'Enjoy!';
     try{
       //array is implicitely expected as items is passed as argument
       //and its previously linked through ng-model on template's <input>
       //var keepGoing = true; can be replaced with same updated
       var emptyItemsFound = false;

       var keepGoing = false;
       var lastInvalid;
       /*
    $scope.items.split(',').forEach(function (value, key){

          if (value > 3){
        $scope.message = "too much of " + (key+1) + "th field.";
          }
          if (value ===  "" ){
            if (!emptyItemsFound){
           $scope.message = "not a number provided for "+ (key+1)+ "th";
           emptyItemsFound = true;
           itemsFound += 1;

         }else {
           lastInvalid = ", "+ (key+1)+ "th";
           $scope.message += lastInvalid;
           itemsFound += 1;


         }
        }

      });
      */
      var flags = [true,false, ""]; //initial condition to add comas after more than one time has ocurred
                              //flag[1] value indicates remains false when invalid cond. only occured once, otherwise true
                             //flag[2] will store the last invalid field to later replace it as addequate
      var message = $scope.createMessage(3, '>', flags);
      //console.log(message);
      if (message === ""){
      /*message = "Too much on: " + message;
      if (flags[1]){
        message = message.replace(", "+ flags[2], " and " + flags[2] + " fields.");
      }else {
      message = message + " field.";
    }
    */

      /*message = "Too much on: " + message;
      if (flags[1]){
        message = message.replace(", "+ flags[2], " and " + flags[2] + " fields.");
      }else {
      message = message + " field.";
    }
    */
      flags = [true,false, ""];
       message = $scope.createMessage("", '=', flags);
      console.log(message);
    }

    //on second validation
    if (message === ""){ message = 'Enjoy';}// Passed 3 validations
    $scope.message = message;
    //No empty message implies an expection ocurred due empty numbers during validation


      //console.log ("items found is:" + itemsFound);
    /*if (emptyItemsFound){
      if(itemsFound > 1){
        $scope.message = $scope.message.replace(lastInvalid, " and " + lastInvalid.replace(", ", "") + " fields.");
      }else{
        $scope.message += " field."
        }

      } */
    }catch(error){
      console.log(error.message);
    }
      /*if ($scope.message !== "Too much" && $scope.message !== "Provide valid numbers only"){
          $scope.message = "Enjoy";}*/

    }

});

})();
