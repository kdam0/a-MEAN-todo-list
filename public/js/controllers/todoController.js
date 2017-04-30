angular.module('todoController', [])
  .controller('mainController', ['$scope', '$http', 'Todos', function($scope, $http, Todos) {
      $scope.formData = {};
      $scope.loading = true;

      // on first visit 'refresh' the todo list
      Todos.get()
          .success(function(data) {
              $scope.todos = data;
              $scope.loading = false;
      });

      // when submitting the add form, send formdata to api
      $scope.createTodo = function() {

          // validate the formData to make sure that something is there
          if ($scope.formData.text != undefined) {
              $scope.loading = true;

              Todos.create($scope.formData)
                  .success(function(data) {         // refresh
                      $scope.loading = false;
                      $scope.formData = "";         // clear the form
                      $scope.todos = data;          // assign our new list of todo
              });
          }
      };

      // delete a todo when pressed checkbox
      $scope.deleteTodo = function(id) {
          $scope.loading = true;

          Todos.delete(id)
              .success(function(data) {             // refresh
                  $scope.loading = false;
                  $scope.todos = data;
          });
      };
  }]);
