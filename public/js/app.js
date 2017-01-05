var routerApp = angular.module('routerApp', ['ui.router']);
routerApp.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider

  // HOME STATES AND NESTED VIEWS ========================================
    .state('home', {
      url: '/home',
      templateUrl: 'views/partial-home.html'
    })

    // nested list with custom controller
    .state('home.list', {
      url: '/list',
      templateUrl: 'views/partial-home-list.html',
      controller: function ($scope) {
        $scope.dogs = ['Doga', 'Dogb', 'Dogc'];
      }
    })

    .state('home.pipeline', {
      url:'/pipeline',
      templateUrl: 'views/pipeline.html',
      controller: function ($scope) {
        var data = {
          "records": [{
            "Name": "Alfreds Futterkiste",
            "City": "Berlin",
            "Country": "Germany"
          }, {
            "Name": "Ana Trujillo Emparedados y helados",
            "City": "México D.F.",
            "Country": "Mexico"
          }, {"Name": "Antonio Moreno Taquería", "City": "México D.F.", "Country": "Mexico"}, {
            "Name": "Around the Horn",
            "City": "London",
            "Country": "UK"
          }, {"Name": "B's Beverages", "City": "London", "Country": "UK"}, {
            "Name": "Berglunds snabbköp",
            "City": "Luleå",
            "Country": "Sweden"
          }, {
            "Name": "Blauer See Delikatessen",
            "City": "Mannheim",
            "Country": "Germany"
          }, {
            "Name": "Blondel père et fils",
            "City": "Strasbourg",
            "Country": "France"
          }, {"Name": "Bólido Comidas preparadas", "City": "Madrid", "Country": "Spain"}, {
            "Name": "Bon app'",
            "City": "Marseille",
            "Country": "France"
          }, {
            "Name": "Bottom-Dollar Marketse",
            "City": "Tsawassen",
            "Country": "Canada"
          }, {
            "Name": "Cactus Comidas para llevar",
            "City": "Buenos Aires",
            "Country": "Argentina"
          }, {
            "Name": "Centro comercial Moctezuma",
            "City": "México D.F.",
            "Country": "Mexico"
          }, {"Name": "Chop-suey Chinese", "City": "Bern", "Country": "Switzerland"}]
        };
        $scope.data = data.records;


        //分页总数
        $scope.pageSize = 2;
        $scope.pages = Math.ceil($scope.data.length / $scope.pageSize); //分页数
        $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = 1;
        //设置表格数据源(分页)
        $scope.setData = function () {
          $scope.items = $scope.data.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));//通过当前页数筛选出表格当前显示数据
        };
        $scope.items = $scope.data.slice(0, $scope.pageSize);
        //分页要repeat的数组
        for (var i = 0; i < $scope.newPages; i++) {
          $scope.pageList.push(i + 1);
        }
        //打印当前选中页索引
        $scope.selectPage = function (page) {
          //不能小于1大于最大
          if (page < 1 || page > $scope.pages) return;
          //最多显示分页数5
          if (page > 2) {
            //因为只显示5个页数，大于2页开始分页转换
            var newpageList = [];
            for (var i = (page - 3) ; i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)) ; i++) {
              newpageList.push(i + 1);
            }
            $scope.pageList = newpageList;
          }
          $scope.selPage = page;
          $scope.setData();
          $scope.isActivePage(page);
          console.log("选择的页：" + page);
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
          return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function () {
          $scope.selectPage($scope.selPage - 1);
        }
        //下一页
        $scope.Next = function () {
          $scope.selectPage($scope.selPage + 1);
        };


      }

    })

    // nested list with just some random string data
    .state('home.paragraph', {
      url: '/paragraph',
      template: 'I could sure use a drink right now.'
    })

    // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
    .state('about', {
      url: '/about',
      views: {
        // the main template will be placed here (relatively named)
        '': {templateUrl: 'views/partial-about.html'},

        // the child views will be defined here (absolutely named)
        'columnOne@about': {
          template: 'Look I am a column!'
        },

        // for column two, we'll define a separate controller
        'columnTwo@about': {
          templateUrl: 'views/table-data.html',
          controller: 'scotchController'
        }
      }
    })
});// closes $routerApp.config()

// let's define the scotch controller that we call up in the about state
routerApp.controller('scotchController', function ($scope) {
  $scope.message = 'test';
  $scope.scotches = [
    {
      name: 'Nme 1',
      price: 50
    },
    {
      name: 'Nme 2',
      price: 100000
    },
    {
      name: 'Nme 3',
      price: 20000
    }
  ];
});