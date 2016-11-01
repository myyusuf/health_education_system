/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ApplicationData = __webpack_require__(1);

	var _NavigationBar = __webpack_require__(2);

	var _NavigationBar2 = _interopRequireDefault(_NavigationBar);

	var _Splitter = __webpack_require__(4);

	var _Splitter2 = _interopRequireDefault(_Splitter);

	var _Tree = __webpack_require__(5);

	var _Tree2 = _interopRequireDefault(_Tree);

	var _Menu = __webpack_require__(6);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _Tabs = __webpack_require__(7);

	var _Tabs2 = _interopRequireDefault(_Tabs);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _ScheduleView = __webpack_require__(9);

	var _ScheduleView2 = _interopRequireDefault(_ScheduleView);

	var _ScoreList = __webpack_require__(24);

	var _ScoreList2 = _interopRequireDefault(_ScoreList);

	var _WeeklyScheduleList = __webpack_require__(34);

	var _WeeklyScheduleList2 = _interopRequireDefault(_WeeklyScheduleList);

	var _StudentList = __webpack_require__(35);

	var _StudentList2 = _interopRequireDefault(_StudentList);

	var _HospitalList = __webpack_require__(39);

	var _HospitalList2 = _interopRequireDefault(_HospitalList);

	var _HospitalScheduleView = __webpack_require__(43);

	var _HospitalScheduleView2 = _interopRequireDefault(_HospitalScheduleView);

	var _ClinicScheduleView = __webpack_require__(46);

	var _ClinicScheduleView2 = _interopRequireDefault(_ClinicScheduleView);

	var _CostUnitReport = __webpack_require__(47);

	var _CostUnitReport2 = _interopRequireDefault(_CostUnitReport);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var splitter = new _Splitter2.default();
	splitter.render($('#content-inside'));

	var data = [{
	  label: "Jadwal",
	  expanded: true,
	  items: [{
	    id: 'jadwal_umum',
	    label: "Jadwal Umum",
	    selected: true
	  }, {
	    id: 'jadwal_mingguan',
	    label: "Jadwal Rotasi Mingguan"
	  }, {
	    id: 'jadwal_rs',
	    label: "Jadwal Rumah Sakit"
	  }, {
	    id: 'jadwal_ps',
	    label: "Jadwal Puskesmas"
	  }]
	}, {
	  label: "Siswa",
	  expanded: true,
	  items: [{
	    id: 'data_siswa',
	    label: "Data Siswa"
	  }, {
	    id: 'data_nilai',
	    label: "Data Nilai"
	  }]
	}, {
	  label: "Rumah Sakit",
	  expanded: true,
	  items: [{
	    id: 'data_rs',
	    label: "Data Rumah Sakit"
	  }]
	}, {
	  label: "Laporan",
	  expanded: true,
	  items: [{
	    id: 'cost_unit',
	    label: "Cost Unit"
	  }]
	}];

	var tree = new _Tree2.default({
	  data: data,
	  onClick: function onClick(item) {

	    if (!tabs.selectTabByTitle(item.label)) {
	      if (item.id == 'jadwal_umum') {
	        tabs.add(item.id, item.label, scheduleView);
	      } else if (item.id == 'jadwal_mingguan') {
	        tabs.add(item.id, item.label, weeklyScheduleList);
	      } else if (item.id == 'data_nilai') {
	        tabs.add(item.id, item.label, scoreList);
	      } else if (item.id == 'data_siswa') {
	        tabs.add(item.id, item.label, studentList);
	      } else if (item.id == 'jadwal_rs') {
	        tabs.add(item.id, item.label, hospitalScheduleView);
	      } else if (item.id == 'jadwal_ps') {
	        tabs.add(item.id, item.label, clinicScheduleView);
	      } else if (item.id == 'cost_unit') {
	        tabs.add(item.id, item.label, costUnitReport);
	      } else if (item.id == 'data_rs') {
	        tabs.add(item.id, item.label, hospitalList);
	      }
	    }
	  }
	});

	// var menu = new Menu({data: getMenuData()});
	// menu.render($('#top-menu'));

	var scoreList = new _ScoreList2.default();
	var weeklyScheduleList = new _WeeklyScheduleList2.default();
	var studentList = new _StudentList2.default();
	var hospitalList = new _HospitalList2.default();
	var costUnitReport = new _CostUnitReport2.default();
	var hospitalScheduleView = new _HospitalScheduleView2.default();
	var clinicScheduleView = new _ClinicScheduleView2.default();

	var navigationBar = new _NavigationBar2.default([{
	  title: 'Application',
	  content: tree
	}, {
	  title: 'Settings'
	}]);
	navigationBar.render($('#left-content'));

	var scheduleView = new _ScheduleView2.default();

	var tabs = new _Tabs2.default([{
	  id: 'jadwal_umum',
	  title: 'Jadwal Umum',
	  content: scheduleView
	}]);

	tabs.render($('#right-content'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getMenuData = getMenuData;
	function getMenuData() {
	    var data = [{
	        "id": "12",
	        "text": "Account",
	        "parentid": "-1",
	        "subMenuWidth": '250px'
	    }, {
	        "text": "Help",
	        "id": "1",
	        "parentid": "-1",
	        "subMenuWidth": '250px'
	    }, {
	        "id": "13",
	        "text": "Profile",
	        "parentid": "12"
	    }, {
	        "id": "14",
	        "text": "Logout",
	        "parentid": "12"
	    }];

	    return data;
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NavigationBar = function () {
	  function NavigationBar(items) {
	    _classCallCheck(this, NavigationBar);

	    this.id = (0, _Utils.guid)();
	    this.items = items;
	  }

	  _createClass(NavigationBar, [{
	    key: 'render',
	    value: function render(container) {
	      var navigationBarContainer = $('<div></div>');
	      navigationBarContainer.attr('id', this.id);
	      for (var i = 0; i < this.items.length; i++) {

	        var title = $('<div>' + this.items[i].title + '</div>');
	        title.appendTo(navigationBarContainer);

	        var contentContainer = $('<div></div>');
	        contentContainer.appendTo(navigationBarContainer);

	        if (this.items[i].content) {
	          this.items[i].content.render(contentContainer);
	        }
	      }
	      navigationBarContainer.appendTo(container);

	      navigationBarContainer.jqxNavigationBar({
	        theme: 'metro',
	        width: '101%',
	        height: '100%'
	      });
	    }
	  }]);

	  return NavigationBar;
	}();

	exports.default = NavigationBar;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.guid = guid;
	function guid() {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	  }
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Splitter = function () {
	  function Splitter() {
	    _classCallCheck(this, Splitter);

	    this.id = (0, _Utils.guid)();
	  }

	  _createClass(Splitter, [{
	    key: 'render',
	    value: function render(container) {
	      container.jqxSplitter({ theme: 'metro', width: '100%', height: '100%', panels: [{ size: 200 }] });
	    }
	  }]);

	  return Splitter;
	}();

	exports.default = Splitter;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Tree = function () {
	  function Tree(options) {
	    _classCallCheck(this, Tree);

	    this.id = (0, _Utils.guid)();
	    this.source = options.data;
	    this.onClick = options.onClick;
	  }

	  _createClass(Tree, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var treeContainer = $('<div></div>');
	      treeContainer.appendTo(container);
	      treeContainer.jqxTree({
	        theme: 'metro',
	        // source: this.records,
	        source: this.source,
	        width: '100%',
	        height: '100%'
	      });

	      treeContainer.on('itemClick', function (event) {
	        var args = event.args;
	        var item = treeContainer.jqxTree('getItem', args.element);
	        if (_this.onClick) {
	          _this.onClick(item);
	        }
	      });
	    }
	  }]);

	  return Tree;
	}();

	exports.default = Tree;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Menu = function () {
	  function Menu(options) {
	    _classCallCheck(this, Menu);

	    this.id = (0, _Utils.guid)();
	    this.data = options.data;
	    this.onClick = options.onClick;
	  }

	  _createClass(Menu, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var source = {
	        datatype: "json",
	        datafields: [{ name: 'id' }, { name: 'parentid' }, { name: 'text' }, { name: 'subMenuWidth' }],
	        id: 'id',
	        localdata: _this.data
	      };

	      var dataAdapter = new $.jqx.dataAdapter(source);
	      dataAdapter.dataBind();

	      var records = dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);

	      var menuContainer = $('<div></div>');
	      menuContainer.appendTo(container);
	      menuContainer.jqxMenu({
	        theme: 'metro',
	        source: records,
	        width: '100%',
	        height: '100%'
	      });

	      menuContainer.on('itemclick', function (event) {
	        var args = event.args;
	        if (_this.onClick) {
	          _this.onClick(args.id);
	        }
	      });
	    }
	  }]);

	  return Menu;
	}();

	exports.default = Menu;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Tabs = function () {
	  function Tabs(items) {
	    _classCallCheck(this, Tabs);

	    this.id = (0, _Utils.guid)();
	    this.items = items;
	  }

	  _createClass(Tabs, [{
	    key: 'render',
	    value: function render(container) {
	      var tabContainer = $('<div style="margin-top: -1px;"></div>');
	      tabContainer.appendTo(container);
	      tabContainer.attr('id', this.id);
	      var ul = $('<ul></ul>');
	      ul.appendTo(tabContainer);

	      for (var i = 0; i < this.items.length; i++) {

	        var title = $('<li>' + this.items[i].title + '</li>');
	        title.appendTo(ul);
	      }

	      var tempContainer = [];
	      for (var i = 0; i < this.items.length; i++) {

	        var contentContainer = $('<div></div>');
	        contentContainer.appendTo(tabContainer);
	        tempContainer.push(contentContainer);
	      }

	      tabContainer.jqxTabs({
	        theme: 'metro',
	        position: 'top',
	        showCloseButtons: true,
	        width: '100%',
	        height: '100.5%'
	      });

	      for (var i = 0; i < this.items.length; i++) {

	        if (this.items[i].content) {
	          this.items[i].content.render(tempContainer[i]);
	        }
	      }

	      this.component = tabContainer;
	    }
	  }, {
	    key: 'add',
	    value: function add(childTabId, title, content) {

	      var id = this.id + '_' + childTabId;
	      var _contentContainer = '<div id="' + id + '" style="height: 100%;"></div>';
	      this.component.jqxTabs('addLast', title, _contentContainer);

	      content.render($('#' + id));
	    }
	  }, {
	    key: 'selectTabByTitle',
	    value: function selectTabByTitle(title) {
	      var tabFound = false;
	      var tabsLength = this.component.jqxTabs('length');

	      for (var i = 0; i < tabsLength; i++) {
	        var tabTitle = this.component.jqxTabs('getTitleAt', i);
	        if (title == tabTitle) {
	          tabFound = true;
	          this.component.jqxTabs('select', i);
	          break;
	        }
	      }

	      return tabFound;
	    }
	  }]);

	  return Tabs;
	}();

	exports.default = Tabs;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Button = function () {
	  function Button(options) {
	    _classCallCheck(this, Button);

	    this.id = (0, _Utils.guid)();
	    this.onClick = options.onClick;

	    if (options.title) {
	      this.title = options.title;
	    } else {
	      this.title = '';
	    }

	    if (options.width) {
	      this.width = options.width;
	    }

	    if (options.height) {
	      this.height = options.height;
	    }

	    if (options.imgSrc) {
	      this.imgSrc = options.imgSrc;
	    }

	    this.template = options.template;
	    this.theme = options.theme;
	  }

	  _createClass(Button, [{
	    key: 'render',
	    value: function render(container) {
	      var _this = this;

	      var buttonContainer = $('<input type="button" value="' + this.title + '" />');
	      buttonContainer.attr('id', this.id);
	      buttonContainer.appendTo(container);

	      var buttonOptions = {
	        theme: 'light'
	      };

	      if (this.template) {
	        buttonOptions['template'] = this.template;
	      }

	      if (this.theme) {
	        buttonOptions['theme'] = this.theme;
	      }

	      if (this.width) {
	        buttonOptions['width'] = this.width;
	      }

	      if (this.height) {
	        buttonOptions['height'] = this.height;
	      }

	      if (this.imgSrc) {
	        buttonOptions['imgSrc'] = this.imgSrc;
	      }

	      buttonContainer.jqxButton(buttonOptions);

	      if (this.onClick) {
	        $('#' + this.id).on('click', function () {
	          _this.onClick();
	        });
	      }
	    }
	  }]);

	  return Button;
	}();

	exports.default = Button;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _ToggleButton = __webpack_require__(10);

	var _ToggleButton2 = _interopRequireDefault(_ToggleButton);

	var _TextBox = __webpack_require__(11);

	var _TextBox2 = _interopRequireDefault(_TextBox);

	var _ComboBox = __webpack_require__(12);

	var _ComboBox2 = _interopRequireDefault(_ComboBox);

	var _GanttChart = __webpack_require__(13);

	var _GanttChart2 = _interopRequireDefault(_GanttChart);

	var _LevelComboBox = __webpack_require__(14);

	var _LevelComboBox2 = _interopRequireDefault(_LevelComboBox);

	var _AddScheduleWindow = __webpack_require__(15);

	var _AddScheduleWindow2 = _interopRequireDefault(_AddScheduleWindow);

	var _AddScheduleLevel2Window = __webpack_require__(20);

	var _AddScheduleLevel2Window2 = _interopRequireDefault(_AddScheduleLevel2Window);

	var _EditParentScheduleWindow = __webpack_require__(21);

	var _EditParentScheduleWindow2 = _interopRequireDefault(_EditParentScheduleWindow);

	var _EditParentScheduleLevel2Window = __webpack_require__(22);

	var _EditParentScheduleLevel2Window2 = _interopRequireDefault(_EditParentScheduleLevel2Window);

	var _EditDivisionScheduleWindow = __webpack_require__(23);

	var _EditDivisionScheduleWindow2 = _interopRequireDefault(_EditDivisionScheduleWindow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ScheduleView = function () {
	  function ScheduleView(data) {
	    _classCallCheck(this, ScheduleView);

	    this.id = (0, _Utils.guid)();
	    this.source = data;
	  }

	  _createClass(ScheduleView, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      this.ganttChart = new _GanttChart2.default({
	        onTaskDblClick: function onTaskDblClick(id) {

	          var url = "/schedules/" + id;
	          $.ajax({
	            method: "GET",
	            url: url,
	            data: {}
	          }).done(function (data) {

	            if (data.schedule.tipe_jadwal == 'PR' && data.schedule.tingkat == 1) {
	              var editParentScheduleWindow = new _EditParentScheduleWindow2.default(data, function () {
	                _this.getGanttData();
	              });
	              editParentScheduleWindow.render($('#dialogWindowContainer'));
	              editParentScheduleWindow.open();
	            } else if (data.schedule.tipe_jadwal == 'PR' && data.schedule.tingkat == 2) {
	              var editParentScheduleLevel2Window = new _EditParentScheduleLevel2Window2.default(data, function () {
	                _this.getGanttData();
	              });
	              editParentScheduleLevel2Window.render($('#dialogWindowContainer'));
	              editParentScheduleLevel2Window.open();
	            } else if (data.schedule.tipe_jadwal == 'BA') {
	              var editDivisionScheduleWindow = new _EditDivisionScheduleWindow2.default(data, function () {
	                _this.getGanttData();
	              });
	              editDivisionScheduleWindow.render($('#dialogWindowContainer'));
	              editDivisionScheduleWindow.open();
	            }
	          }).fail(function () {
	            alert('Error while doing operation');
	          });
	        }
	      });
	      this.ganttChartData = { data: [] };

	      var addScheduleButton = new _Button2.default({
	        title: 'Tambah Jadwal',
	        template: 'primary',
	        onClick: function onClick() {

	          var tingkat = _this.levelCmb.getValue();
	          if (tingkat == 1) {
	            var addScheduleWindow = new _AddScheduleWindow2.default();
	            addScheduleWindow.render($('#dialogWindowContainer'));
	            addScheduleWindow.open();
	          } else if (tingkat == 2) {
	            var addScheduleLevel2Window = new _AddScheduleLevel2Window2.default();
	            addScheduleLevel2Window.render($('#dialogWindowContainer'));
	            addScheduleLevel2Window.open();
	          }
	        }
	      });

	      var showWeekButton = new _ToggleButton2.default({
	        title: 'Show Week',
	        onButtonToggled: function onButtonToggled() {
	          _this.ganttChart.useWeekScale();
	        },
	        onButtonNotToggled: function onButtonNotToggled() {
	          _this.ganttChart.useDayScale();
	        }
	      });

	      //---ComboBox---

	      this.levelCmb = new _LevelComboBox2.default({
	        onChange: function onChange(value) {
	          _this.getGanttData();
	        }
	      });
	      //---------------

	      this.searchTextBox = new _TextBox2.default({ placeHolder: 'Stambuk atau Nama', width: 250, height: 24 });
	      var searchButton = new _Button2.default({
	        onClick: function onClick() {
	          _this.getGanttData();
	        },
	        imgSrc: '/ceu_assets/images/search.png',
	        theme: 'metro', width: 30, height: 26
	      });

	      var table = $('<table style="height: 100%; width: 100%; margin: -3px; "></table>');
	      var tr = $('<tr></tr>');
	      var td = $('<td style="padding: 0; height: 40px;"></td>');
	      table.appendTo(container);
	      tr.appendTo(table);
	      td.appendTo(tr);

	      var innerTable = $('<table style="height: 100%; width: 100%;"></table>');
	      var innerTr = $('<tr></tr>');
	      var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; width: 120px; height: 100%;"></td>');
	      innerTable.appendTo(td);
	      innerTr.appendTo(innerTable);
	      innerTd.appendTo(innerTr);
	      addScheduleButton.render(innerTd);

	      innerTd = $('<td style="padding-top: 6px; height: 100%; width: 100px;"></td>');
	      innerTd.appendTo(innerTr);
	      showWeekButton.render(innerTd);

	      innerTd = $('<td style="padding-top: 6px; height: 100%; width: 86px;"></td>');
	      innerTd.appendTo(innerTr);
	      this.levelCmb.render(innerTd);

	      innerTd = $('<td style="padding-top: 6px; height: 100%; width: 250px;"></td>');
	      innerTd.appendTo(innerTr);
	      this.searchTextBox.render(innerTd);

	      innerTd = $('<td style="padding-top: 6px; height: 100%;"></td>');
	      var _tempContainer = $('<div style="margin-left: -5px;"></div>');
	      _tempContainer.appendTo(innerTd);
	      innerTd.appendTo(innerTr);
	      searchButton.render(_tempContainer);

	      tr = $('<tr></tr>');
	      td = $('<td style="padding: 0;"></td>');
	      tr.appendTo(table);
	      td.appendTo(tr);

	      this.ganttChart.render(td);
	    }
	  }, {
	    key: 'processData',
	    value: function processData(data) {

	      this.ganttChartData.data = [];

	      for (var i = 0; i < data.length; i++) {

	        if (data[i].tipe_jadwal == 'PR') {
	          this.ganttChartData.data.push({
	            "id": data[i].id,
	            "text": data[i].nama,
	            "type": "project",
	            "start_date": "",
	            "duration": "",
	            "progress": data[i].progress,
	            "open": false
	          });
	        } else if (data[i].tipe_jadwal == 'BA') {
	          this.ganttChartData.data.push({
	            "id": data[i].id,
	            "text": data[i].nama_bagian,
	            "type": "project",
	            "parent": data[i].parent_id,
	            "start_date": new Date(data[i].start_date),
	            "end_date": new Date(data[i].end_date),
	            "order": "",
	            "duration": "",
	            "progress": data[i].progress,
	            "open": false,
	            "color": data[i].color
	          });
	        } else if (data[i].tipe_jadwal == 'RS' || data[i].tipe_jadwal == 'PS') {
	          this.ganttChartData.data.push({
	            "id": data[i].id,
	            "text": data[i].label,
	            "type": "project",
	            "parent": data[i].parent_id,
	            "start_date": new Date(data[i].start_date),
	            "end_date": new Date(data[i].end_date),
	            "order": "",
	            "duration": "",
	            "progress": "",
	            "open": false,
	            "color": data[i].color
	          });
	        }
	      }

	      this.ganttChart.reloadData(this.ganttChartData);
	    }
	  }, {
	    key: 'getGanttData',
	    value: function getGanttData() {
	      var _this = this;
	      var url = "/schedules?searchTxt=" + this.searchTextBox.getValue() + "&level=" + this.levelCmb.getValue();
	      $.ajax({
	        method: "GET",
	        url: url,
	        data: {}
	      }).done(function (data) {
	        _this.processData(data);
	      }).fail(function () {
	        alert('Error while doing operation');
	      });
	    }
	  }]);

	  return ScheduleView;
	}();

	exports.default = ScheduleView;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ToggleButton = function () {
	  function ToggleButton(options) {
	    _classCallCheck(this, ToggleButton);

	    this.id = (0, _Utils.guid)();

	    if (options.title) {
	      this.title = options.title;
	    } else {
	      this.title = 'Button';
	    }

	    if (options.width) {
	      this.width = options.width;
	    }

	    if (options.height) {
	      this.height = options.height;
	    }

	    this.onButtonToggled = options.onButtonToggled;
	    this.onButtonNotToggled = options.onButtonNotToggled;
	  }

	  _createClass(ToggleButton, [{
	    key: 'render',
	    value: function render(container) {
	      var buttonContainer = $('<button>' + this.title + '</button>');
	      buttonContainer.appendTo(container);

	      var buttonOptions = {
	        theme: 'light'
	      };

	      if (this.width) {
	        buttonOptions['width'] = this.width;
	      }

	      if (this.height) {
	        buttonOptions['height'] = this.height;
	      }

	      buttonContainer.jqxToggleButton(buttonOptions);

	      var _this = this;

	      buttonContainer.on('click', function () {
	        var toggled = buttonContainer.jqxToggleButton('toggled');
	        if (toggled) {
	          if (_this.onButtonToggled) {
	            _this.onButtonToggled();
	          }
	        } else {
	          if (_this.onButtonNotToggled) {
	            _this.onButtonNotToggled();
	          }
	        }
	      });
	    }
	  }]);

	  return ToggleButton;
	}();

	exports.default = ToggleButton;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TextBox = function () {
	  function TextBox(options) {
	    _classCallCheck(this, TextBox);

	    this.id = (0, _Utils.guid)();

	    if (options.title) {
	      this.title = options.title;
	    } else {
	      this.title = 'Button';
	    }

	    if (options.width) {
	      this.width = options.width;
	    }

	    if (options.height) {
	      this.height = options.height;
	    }

	    this.placeHolder = options.placeHolder;

	    this.initialValue = options.value;
	  }

	  _createClass(TextBox, [{
	    key: 'render',
	    value: function render(container) {
	      var textBoxContainer = $('<input type="text" />');
	      textBoxContainer.attr('id', this.id);
	      textBoxContainer.appendTo(container);

	      var textBoxOptions = {
	        theme: 'metro'
	      };

	      if (this.width) {
	        textBoxOptions['width'] = this.width;
	      }

	      if (this.height) {
	        textBoxOptions['height'] = this.height;
	      }

	      if (this.placeHolder) {
	        textBoxOptions['placeHolder'] = this.placeHolder;
	      }

	      textBoxContainer.jqxInput(textBoxOptions);

	      if (this.initialValue) {
	        textBoxContainer.val(this.initialValue);
	      }

	      this.component = textBoxContainer;
	    }
	  }, {
	    key: 'getId',
	    value: function getId() {
	      return this.id;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.component.val();
	    }
	  }]);

	  return TextBox;
	}();

	exports.default = TextBox;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ComboBox = function () {
	  function ComboBox(options) {
	    _classCallCheck(this, ComboBox);

	    this.id = (0, _Utils.guid)();
	    this.localData = options.localData;
	    this.url = options.url;
	    this.dataFields = options.dataFields;
	    this.comboBoxOptions = options.comboBoxOptions;
	    this.onChange = options.onChange;
	    this.clearSelectionEnabled = options.clearSelectionEnabled;
	    this.initialValue = options.value;
	  }

	  _createClass(ComboBox, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var comboBoxContainer = $('<div></div>');
	      comboBoxContainer.appendTo(container);
	      comboBoxContainer.attr('id', this.id);

	      if (this.localData) {
	        this.comboBoxOptions['source'] = this.localData;
	      } else {
	        var source = {
	          datatype: "json",
	          datafields: this.dataFields,
	          url: _this.url,
	          data: {}
	        };
	        var dataAdapter = new $.jqx.dataAdapter(source);
	        this.comboBoxOptions['source'] = dataAdapter;
	      }

	      comboBoxContainer.jqxComboBox(this.comboBoxOptions);

	      if (this.onChange) {
	        comboBoxContainer.on('change', function (event) {
	          _this.onChange(comboBoxContainer.val());
	        });
	      }

	      if (this.clearSelectionEnabled) {
	        comboBoxContainer.on('keydown', function (event) {
	          if (event.keyCode == 8 || event.keyCode == 46) {
	            comboBoxContainer.jqxComboBox('clearSelection');
	          }
	        });
	      }

	      if (this.initialValue) {
	        if (this.localData) {
	          comboBoxContainer.val(_this.initialValue);
	        } else {
	          comboBoxContainer.on('bindingComplete', function (event) {
	            comboBoxContainer.val(_this.initialValue);
	          });
	        }
	      }

	      this.component = comboBoxContainer;
	    }
	  }, {
	    key: 'getId',
	    value: function getId() {
	      return this.id;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.component.val();
	    }
	  }]);

	  return ComboBox;
	}();

	exports.default = ComboBox;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GanttChart = function () {
	  function GanttChart(options) {
	    _classCallCheck(this, GanttChart);

	    var _this = this;

	    this.id = (0, _Utils.guid)();
	    this.data = {
	      data: []
	    };

	    gantt.config.scale_unit = "month";
	    gantt.config.step = 1;
	    gantt.config.date_scale = "%F, %Y";
	    gantt.config.min_column_width = 100;

	    gantt.config.scale_height = 90;
	    gantt.config.column_height = 50;
	    // gantt.config.start_date = new Date(2013, 03, 09);
	    // gantt.config.end_date = new Date(2017, 03, 09);

	    gantt.config.fit_tasks = true;

	    this.weekScaleTemplate = function (date) {
	      var dateToStr = gantt.date.date_to_str("%d %M");
	      var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
	      return '<div style="">' + dateToStr(date) + " - " + dateToStr(endDate) + '</div>';
	    };

	    gantt.config.subscales = [{ unit: "week", step: 1, template: this.weekScaleTemplate }, { unit: "day", step: 1, date: "%d %D" }];

	    gantt.attachEvent("onTaskDblClick", function (id, e) {
	      console.log("You've just clicked an item with id=" + id);
	      if (options.onTaskDblClick) {
	        options.onTaskDblClick(id);
	      }
	    });

	    //Weekends Color
	    gantt.templates.scale_cell_class = function (date) {
	      if (date.getDay() == 0 || date.getDay() == 6) {
	        return "weekend";
	      }
	    };
	    gantt.templates.task_cell_class = function (item, date) {
	      if (date.getDay() == 0 || date.getDay() == 6) {
	        return "weekend";
	      }
	    };
	  }

	  _createClass(GanttChart, [{
	    key: "render",
	    value: function render(container) {
	      var ganttChartContainer = $('<div style="height: 100%; width: 100%;"></div>');
	      ganttChartContainer.attr('id', this.id);
	      ganttChartContainer.appendTo(container);

	      gantt.init(this.id);
	      gantt.parse(this.data);

	      var dp = new gantt.dataProcessor("schedules");
	      dp.init(gantt);
	      dp.setTransactionMode("REST");
	    }
	  }, {
	    key: "useWeekScale",
	    value: function useWeekScale() {

	      gantt.config.subscales = [{ unit: "week", step: 1, template: this.weekScaleTemplate }];

	      this.refresh();
	    }
	  }, {
	    key: "useDayScale",
	    value: function useDayScale() {
	      gantt.config.subscales = [{ unit: "week", step: 1, template: this.weekScaleTemplate }, { unit: "day", step: 1, date: "%D" }];

	      this.refresh();
	    }
	  }, {
	    key: "refresh",
	    value: function refresh() {
	      gantt.parse(this.data);
	    }
	  }, {
	    key: "reloadData",
	    value: function reloadData(newData) {
	      this.data = newData;
	      gantt.clearAll();
	      gantt.parse(this.data);
	    }
	  }]);

	  return GanttChart;
	}();

	exports.default = GanttChart;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _ComboBox = __webpack_require__(12);

	var _ComboBox2 = _interopRequireDefault(_ComboBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LevelComboBox = function () {
	  function LevelComboBox(options) {
	    _classCallCheck(this, LevelComboBox);

	    var _this = this;

	    this.id = (0, _Utils.guid)();

	    var levelList = [{ id: 1, nama: 'Tingkat 1' }, { id: 2, nama: "Tingkat 2" }];
	    var comboBoxOptions = {
	      displayMember: "nama",
	      valueMember: "id",
	      selectedIndex: 0,
	      width: '100%',
	      height: 25,
	      theme: 'metro',
	      selectionMode: 'dropDownList'
	    };

	    this.comboBox = new _ComboBox2.default({
	      localData: levelList,
	      value: options.value,
	      comboBoxOptions: comboBoxOptions,
	      onChange: function onChange(value) {
	        if (options.onChange) {
	          options.onChange(value);
	        }
	      }
	    });
	  }

	  _createClass(LevelComboBox, [{
	    key: 'getId',
	    value: function getId() {
	      return this.comboBox.getId();
	    }
	  }, {
	    key: 'render',
	    value: function render(container) {
	      this.comboBox.render(container);
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.comboBox.getValue();
	    }
	  }]);

	  return LevelComboBox;
	}();

	exports.default = LevelComboBox;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _Form = __webpack_require__(16);

	var _Form2 = _interopRequireDefault(_Form);

	var _AddWindow = __webpack_require__(17);

	var _AddWindow2 = _interopRequireDefault(_AddWindow);

	var _DateRange = __webpack_require__(18);

	var _DateRange2 = _interopRequireDefault(_DateRange);

	var _StudentComboBox = __webpack_require__(19);

	var _StudentComboBox2 = _interopRequireDefault(_StudentComboBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AddScheduleWindow = function () {
	  function AddScheduleWindow() {
	    _classCallCheck(this, AddScheduleWindow);

	    this.id = (0, _Utils.guid)();
	    var _this = this;

	    var studentComboBox = new _StudentComboBox2.default({ studentLevel: 1 });
	    var dateRange1 = new _DateRange2.default({
	      value: { startDate: null, endDate: null },
	      width: '100%',
	      height: 25
	    });
	    var dateRange2 = new _DateRange2.default({
	      width: '100%',
	      height: 25
	    });
	    var dateRange3 = new _DateRange2.default({
	      width: '100%',
	      height: 25
	    });
	    var dateRange4 = new _DateRange2.default({
	      width: '100%',
	      height: 25
	    });
	    var dateRange5 = new _DateRange2.default({
	      width: '100%',
	      height: 25
	    });
	    var dateRange6 = new _DateRange2.default({
	      width: '100%',
	      height: 25
	    });
	    var dateRange7 = new _DateRange2.default({
	      width: '100%',
	      height: 25
	    });

	    var formItems = [{
	      name: 'student',
	      label: 'Siswa',
	      content: studentComboBox,
	      validation: {
	        type: 'COMBOBOX',
	        rule: 'required'
	      }
	    }, {
	      name: 'pediatric',
	      label: 'Anak',
	      content: dateRange1
	    }, {
	      name: 'radiology',
	      label: 'Radiologi',
	      content: dateRange2
	    }, {
	      name: 'neurology',
	      label: 'Neurologi',
	      content: dateRange3
	    }, {
	      name: 'dermatology',
	      label: 'Kulit dan Kelamin',
	      content: dateRange4
	    }, {
	      name: 'interna',
	      label: 'Interna',
	      content: dateRange5
	    }, {
	      name: 'kardiology',
	      label: 'Kardiologi',
	      content: dateRange6
	    }, {
	      name: 'psychiatrist',
	      label: 'Jiwa',
	      content: dateRange7
	    }];
	    var formOptions = {
	      items: formItems,
	      labelColumnWidth: '120px',
	      onValidationSuccess: function onValidationSuccess(formValue) {
	        $.ajax({
	          method: "POST",
	          url: "/schedules",
	          data: formValue
	        }).done(function () {
	          $("#successNotification").jqxNotification("open");
	          _this.window.close();
	          // $("#searchBtn").trigger('click');
	        }).fail(function (jqXHR, textStatus, errorThrown) {
	          var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
	          $("#errorNotification").html('<div>' + errorMessage + '</div>');
	          $("#errorNotification").jqxNotification("open");
	        });
	      }
	    };

	    var form = new _Form2.default(formOptions);

	    this.window = new _AddWindow2.default({
	      width: 330,
	      height: 360,
	      title: 'Tambah Siswa Tingkat 1',
	      content: form,
	      onSave: function onSave() {
	        form.validate();
	      },
	      onCancel: function onCancel() {
	        _this.window.close();
	      }
	    });
	  }

	  _createClass(AddScheduleWindow, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      // var table = $('<table style="height: 100%; width: 100%;"></table>');
	      // var tr = $('<tr></tr>');
	      // var td = $('<td></td>');
	      // table.appendTo(container);
	      // tr.appendTo(table);
	      // td.appendTo(tr);

	      this.window.render(container);
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      this.window.open();
	    }
	  }]);

	  return AddScheduleWindow;
	}();

	exports.default = AddScheduleWindow;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Form = function () {
	  function Form(options) {
	    _classCallCheck(this, Form);

	    this.id = (0, _Utils.guid)();
	    this.items = options.items;
	    this.onValidationSuccess = options.onValidationSuccess;
	    this.labelColumnWidth = options.labelColumnWidth;
	    this.contentColumnWidth = options.contentColumnWidth;
	  }

	  _createClass(Form, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      this.formItems = [];

	      var validationRules = [];
	      var form = $('<form></form>');
	      form.appendTo(container);
	      var table = $('<table style="width: 100%;"></table>');
	      table.appendTo(form);
	      for (var i = 0; i < this.items.length; i++) {
	        var tr = $('<tr></tr>');
	        tr.appendTo(table);

	        var td = $('<td></td>');
	        td.appendTo(tr);
	        td.css('padding-top', '5px');
	        td.css('padding-bottom', '5px');
	        if (this.labelColumnWidth) {
	          td.css('width', this.labelColumnWidth);
	        }

	        var label = $('<span>' + this.items[i].label + '</span>');
	        label.appendTo(td);

	        td = $('<td></td>');
	        td.appendTo(tr);
	        td.css('padding-top', '3px');
	        td.css('padding-bottom', '3px');
	        if (this.contentColumnWidth) {
	          td.css('width', this.contentColumnWidth);
	        }

	        this.items[i].content.render(td);
	        this.formItems.push({
	          name: this.items[i].name,
	          content: this.items[i].content
	        });

	        var content = this.items[i].content;
	        var contentId = content.getId();

	        var itemValidation = this.items[i].validation;
	        if (itemValidation) {
	          if (itemValidation.type == 'COMBOBOX') {
	            if (itemValidation.rule == 'required') {

	              //---Closure
	              (function f() {

	                var closureContent = content;
	                validationRules.push({
	                  input: '#' + contentId,
	                  message: 'Wajib diisi',
	                  action: 'select', rule: function rule(input) {
	                    var value = closureContent.getValue();
	                    if (value == null || value == '') {
	                      return false;
	                    } else {
	                      return true;
	                    }
	                  }
	                });
	              })();
	              //----------
	            }
	          } else {
	            if (itemValidation.rule == 'required') {
	              validationRules.push({ input: '#' + contentId, message: 'Wajib diisi', action: 'keyup, blur', rule: 'required' });
	            }
	          }
	        }
	      }

	      form.jqxValidator({
	        rules: validationRules
	      });

	      form.on('validationSuccess', function () {
	        if (_this.onValidationSuccess) {
	          var formValues = {};
	          for (var i = 0; i < _this.formItems.length; i++) {
	            formValues[_this.formItems[i].name] = _this.formItems[i].content.getValue();
	          }
	          _this.onValidationSuccess(formValues);
	        }
	      });

	      this.form = form;
	    }
	  }, {
	    key: 'validate',
	    value: function validate() {
	      this.form.jqxValidator('validate');
	    }
	  }]);

	  return Form;
	}();

	exports.default = Form;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AddWindow = function () {
	  function AddWindow(options) {
	    _classCallCheck(this, AddWindow);

	    this.id = (0, _Utils.guid)();
	    this.content = options.content;

	    if (options.title) {
	      this.title = options.title;
	    } else {
	      this.title = '';
	    }

	    if (options.width) {
	      this.width = options.width;
	    }

	    if (options.height) {
	      this.height = options.height;
	    }

	    if (options.buttons) {} else {
	      this.saveButton = new _Button2.default({
	        title: 'Save',
	        template: 'success',
	        onClick: function onClick() {
	          if (options.onSave) {
	            options.onSave();
	          }
	        }
	      });

	      this.cancelButton = new _Button2.default({
	        title: 'Cancel',
	        onClick: function onClick() {
	          if (options.onCancel) {
	            options.onCancel();
	          }
	        }
	      });
	    }
	  }

	  _createClass(AddWindow, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var windowContainer = $('<div></div>');
	      windowContainer.appendTo(container);

	      windowContainer.attr('id', this.id);

	      var windowTitle = $('<div>' + this.title + '</div>');
	      windowTitle.appendTo(windowContainer);

	      var windowContent = $('<div></div>');
	      windowContent.appendTo(windowContainer);

	      var windowOptions = {
	        theme: 'metro',
	        isModal: true,
	        autoOpen: false
	      };

	      if (this.width) {
	        windowOptions['width'] = this.width;
	      }

	      if (this.height) {
	        windowOptions['height'] = this.height;
	      }

	      windowContainer.jqxWindow(windowOptions);

	      windowContainer.on('close', function (event) {
	        windowContainer.jqxWindow('destroy');
	      });

	      var table = $('<table style="height: 100%; width: 100%;"></table>');
	      var tr = $('<tr></tr>');
	      var td = $('<td></td>');
	      table.appendTo(windowContent);
	      tr.appendTo(table);
	      td.appendTo(tr);
	      this.content.render(td);

	      tr = $('<tr></tr>');
	      td = $('<td></td>');
	      tr.appendTo(table);
	      td.appendTo(tr);

	      var innerTable = $('<table style="height: 100%; width: 100%;"></table>');
	      var innerTr = $('<tr></tr>');
	      var innerTd = $('<td style="width: 90%;"></td>');
	      innerTable.appendTo(td);
	      innerTr.appendTo(innerTable);
	      innerTd.appendTo(innerTr);

	      innerTd = $('<td></td>');
	      innerTd.appendTo(innerTr);
	      this.cancelButton.render(innerTd);

	      innerTd = $('<td></td>');
	      innerTd.appendTo(innerTr);
	      this.saveButton.render(innerTd);

	      this.windowContainer = windowContainer;
	    }
	  }, {
	    key: 'getId',
	    value: function getId() {
	      return this.id;
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      this.windowContainer.jqxWindow('open');
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      this.windowContainer.jqxWindow('close');
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.windowContainer.jqxWindow('destroy');
	    }
	  }]);

	  return AddWindow;
	}();

	exports.default = AddWindow;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DateRange = function () {
	  function DateRange(options) {
	    _classCallCheck(this, DateRange);

	    this.id = (0, _Utils.guid)();

	    if (options.width) {
	      this.width = options.width;
	    }

	    if (options.height) {
	      this.height = options.height;
	    }

	    this.initialValue = options.value;
	  }

	  _createClass(DateRange, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var dateRangeContainer = $('<div></div>');
	      dateRangeContainer.appendTo(container);
	      dateRangeContainer.attr('id', this.id);

	      var dateRangeOptions = {
	        theme: 'metro',
	        selectionMode: 'range'
	      };

	      if (this.width) {
	        dateRangeOptions['width'] = this.width;
	      }

	      if (this.height) {
	        dateRangeOptions['height'] = this.height;
	      }

	      dateRangeContainer.jqxDateTimeInput(dateRangeOptions);

	      if (this.initialValue) {
	        if (this.initialValue.startDate != null && this.initialValue.endDate != null) {
	          var startDate = new Date(this.initialValue.startDate);
	          var endDate = new Date(this.initialValue.endDate);
	          dateRangeContainer.jqxDateTimeInput('setRange', startDate, endDate);
	        } else {
	          dateRangeContainer.jqxDateTimeInput('setRange', null, null);
	        }
	      }

	      this.dateRangeContainer = dateRangeContainer;
	    }
	  }, {
	    key: 'getId',
	    value: function getId() {
	      return this.id;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.dateRangeContainer.jqxDateTimeInput('getRange');
	    }
	  }]);

	  return DateRange;
	}();

	exports.default = DateRange;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _ComboBox = __webpack_require__(12);

	var _ComboBox2 = _interopRequireDefault(_ComboBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StudentComboBox = function () {
	  function StudentComboBox(options) {
	    _classCallCheck(this, StudentComboBox);

	    this.id = (0, _Utils.guid)();

	    var studentLevel = options.studentLevel;

	    var comboBoxOptions = {
	      displayMember: "nama",
	      valueMember: "id",
	      placeHolder: 'Pilih Siswa',
	      width: '100%',
	      height: 25,
	      theme: 'metro'
	    };

	    var url = '/students_all';
	    if (studentLevel) {
	      url = '/students_all?level=' + studentLevel;
	    }

	    this.comboBox = new _ComboBox2.default({
	      url: url,
	      value: options.value,
	      comboBoxOptions: comboBoxOptions,
	      onChange: function onChange(value) {
	        //
	      }
	    });
	  }

	  _createClass(StudentComboBox, [{
	    key: "getId",
	    value: function getId() {
	      return this.comboBox.getId();
	    }
	  }, {
	    key: "render",
	    value: function render(container) {
	      this.comboBox.render(container);
	    }
	  }, {
	    key: "getValue",
	    value: function getValue() {
	      return this.comboBox.getValue();
	    }
	  }]);

	  return StudentComboBox;
	}();

	exports.default = StudentComboBox;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _Form = __webpack_require__(16);

	var _Form2 = _interopRequireDefault(_Form);

	var _AddWindow = __webpack_require__(17);

	var _AddWindow2 = _interopRequireDefault(_AddWindow);

	var _DateRange = __webpack_require__(18);

	var _DateRange2 = _interopRequireDefault(_DateRange);

	var _StudentComboBox = __webpack_require__(19);

	var _StudentComboBox2 = _interopRequireDefault(_StudentComboBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AddScheduleLevel2Window = function () {
	  function AddScheduleLevel2Window() {
	    _classCallCheck(this, AddScheduleLevel2Window);

	    this.id = (0, _Utils.guid)();
	    var _this = this;

	    var studentComboBox = new _StudentComboBox2.default({ studentLevel: 2 });
	    var dateRange1 = new _DateRange2.default({
	      width: '100%',
	      height: 25
	    });
	    var dateRange2 = new _DateRange2.default({
	      width: '100%',
	      height: 25
	    });
	    var dateRange3 = new _DateRange2.default({
	      width: '100%',
	      height: 25
	    });
	    var dateRange4 = new _DateRange2.default({
	      width: '100%',
	      height: 25
	    });
	    var dateRange5 = new _DateRange2.default({
	      width: '100%',
	      height: 25
	    });
	    var dateRange6 = new _DateRange2.default({
	      width: '100%',
	      height: 25
	    });
	    var dateRange7 = new _DateRange2.default({
	      width: '100%',
	      height: 25
	    });
	    var dateRange8 = new _DateRange2.default({
	      width: '100%',
	      height: 25
	    });
	    var dateRange9 = new _DateRange2.default({
	      width: '100%',
	      height: 25
	    });

	    var formItems = [{
	      name: 'student',
	      label: 'Siswa',
	      content: studentComboBox,
	      validation: {
	        type: 'COMBOBOX',
	        rule: 'required'
	      }
	    }, {
	      name: 'mata',
	      label: 'Mata',
	      content: dateRange1
	    }, {
	      name: 'tht',
	      label: 'THT',
	      content: dateRange2
	    }, {
	      name: 'anestesi',
	      label: 'Anestesi',
	      content: dateRange3
	    }, {
	      name: 'bedah',
	      label: 'Bedah',
	      content: dateRange4
	    }, {
	      name: 'ikm',
	      label: 'IKM / IKK',
	      content: dateRange5
	    }, {
	      name: 'obgin',
	      label: 'Obgin',
	      content: dateRange6
	    }, {
	      name: 'ortopedi',
	      label: 'Ortopedi',
	      content: dateRange7
	    }, {
	      name: 'kardiologi',
	      label: 'Kardiologi',
	      content: dateRange8
	    }, {
	      name: 'forensik',
	      label: 'Forensik',
	      content: dateRange9
	    }];
	    var formOptions = {
	      items: formItems,
	      labelColumnWidth: '120px',
	      onValidationSuccess: function onValidationSuccess(formValue) {
	        $.ajax({
	          method: "POST",
	          url: "/schedules_addlevel2",
	          data: formValue
	        }).done(function () {
	          $("#successNotification").jqxNotification("open");
	          _this.window.close();
	          // $("#searchBtn").trigger('click');
	        }).fail(function (jqXHR, textStatus, errorThrown) {
	          var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
	          $("#errorNotification").html('<div>' + errorMessage + '</div>');
	          $("#errorNotification").jqxNotification("open");
	        });
	      }
	    };

	    var form = new _Form2.default(formOptions);

	    this.window = new _AddWindow2.default({
	      width: 330,
	      height: 430,
	      title: 'Tambah Siswa Tingkat 2',
	      content: form,
	      onSave: function onSave() {
	        form.validate();
	      },
	      onCancel: function onCancel() {
	        _this.window.close();
	      }
	    });
	  }

	  _createClass(AddScheduleLevel2Window, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      // var table = $('<table style="height: 100%; width: 100%;"></table>');
	      // var tr = $('<tr></tr>');
	      // var td = $('<td></td>');
	      // table.appendTo(container);
	      // tr.appendTo(table);
	      // td.appendTo(tr);

	      this.window.render(container);
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      this.window.open();
	    }
	  }]);

	  return AddScheduleLevel2Window;
	}();

	exports.default = AddScheduleLevel2Window;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _Form = __webpack_require__(16);

	var _Form2 = _interopRequireDefault(_Form);

	var _AddWindow = __webpack_require__(17);

	var _AddWindow2 = _interopRequireDefault(_AddWindow);

	var _DateRange = __webpack_require__(18);

	var _DateRange2 = _interopRequireDefault(_DateRange);

	var _StudentComboBox = __webpack_require__(19);

	var _StudentComboBox2 = _interopRequireDefault(_StudentComboBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EditParentScheduleWindow = function () {
	  function EditParentScheduleWindow(data, onSaveSuccess) {
	    _classCallCheck(this, EditParentScheduleWindow);

	    this.id = (0, _Utils.guid)();
	    var _this = this;

	    var schedule = data.schedule;
	    var children = data.children;

	    var getChildrenByDivisionId = function getChildrenByDivisionId(bagianId, children) {
	      for (var i = 0; i < children.length; i++) {
	        if (children[i].bagian_id == bagianId) {
	          return children[i];
	        }
	      }

	      return null;
	    };

	    var child1 = getChildrenByDivisionId(1, children);
	    var schedule1 = {
	      startDate: child1.start_date,
	      endDate: child1.end_date
	    };

	    var child2 = getChildrenByDivisionId(2, children);
	    var schedule2 = {
	      startDate: child2.start_date,
	      endDate: child2.end_date
	    };

	    var child3 = getChildrenByDivisionId(3, children);
	    var schedule3 = {
	      startDate: child3.start_date,
	      endDate: child3.end_date
	    };
	    var child4 = getChildrenByDivisionId(4, children);
	    var schedule4 = {
	      startDate: child4.start_date,
	      endDate: child4.end_date
	    };
	    var child5 = getChildrenByDivisionId(5, children);
	    var schedule5 = {
	      startDate: child5.start_date,
	      endDate: child5.end_date
	    };
	    var child6 = getChildrenByDivisionId(6, children);
	    var schedule6 = {
	      startDate: child6.start_date,
	      endDate: child6.end_date
	    };
	    var child7 = getChildrenByDivisionId(7, children);
	    var schedule7 = {
	      startDate: child7.start_date,
	      endDate: child7.end_date
	    };

	    var studentComboBox = new _StudentComboBox2.default({
	      studentLevel: 1,
	      value: schedule.siswa_id
	    });
	    var dateRange1 = new _DateRange2.default({
	      value: schedule1,
	      width: '100%',
	      height: 25
	    });
	    var dateRange2 = new _DateRange2.default({
	      value: schedule2,
	      width: '100%',
	      height: 25
	    });
	    var dateRange3 = new _DateRange2.default({
	      value: schedule3,
	      width: '100%',
	      height: 25
	    });
	    var dateRange4 = new _DateRange2.default({
	      value: schedule4,
	      width: '100%',
	      height: 25
	    });
	    var dateRange5 = new _DateRange2.default({
	      value: schedule5,
	      width: '100%',
	      height: 25
	    });
	    var dateRange6 = new _DateRange2.default({
	      value: schedule6,
	      width: '100%',
	      height: 25
	    });
	    var dateRange7 = new _DateRange2.default({
	      value: schedule7,
	      width: '100%',
	      height: 25
	    });

	    var formItems = [{
	      name: 'student',
	      label: 'Siswa',
	      content: studentComboBox,
	      validation: {
	        type: 'COMBOBOX',
	        rule: 'required'
	      }
	    }, {
	      name: 'pediatric',
	      label: 'Anak',
	      content: dateRange1
	    }, {
	      name: 'radiology',
	      label: 'Radiologi',
	      content: dateRange2
	    }, {
	      name: 'neurology',
	      label: 'Neurologi',
	      content: dateRange3
	    }, {
	      name: 'dermatology',
	      label: 'Kulit dan Kelamin',
	      content: dateRange4
	    }, {
	      name: 'interna',
	      label: 'Interna',
	      content: dateRange5
	    }, {
	      name: 'kardiology',
	      label: 'Kardiologi',
	      content: dateRange6
	    }, {
	      name: 'psychiatrist',
	      label: 'Jiwa',
	      content: dateRange7
	    }];
	    var formOptions = {
	      items: formItems,
	      labelColumnWidth: '120px',
	      onValidationSuccess: function onValidationSuccess(formValue) {

	        formValue.pediatric['dbId'] = child1.id;
	        formValue.radiology['dbId'] = child2.id;
	        formValue.neurology['dbId'] = child3.id;
	        formValue.dermatology['dbId'] = child4.id;
	        formValue.interna['dbId'] = child5.id;
	        formValue.kardiology['dbId'] = child6.id;
	        formValue.psychiatrist['dbId'] = child7.id;

	        $.ajax({
	          method: "PUT",
	          url: "/schedules/parent_update/" + schedule.id,
	          data: formValue
	        }).done(function () {
	          $("#successNotification").jqxNotification("open");
	          _this.window.close();
	          if (onSaveSuccess) {
	            onSaveSuccess();
	          }
	        }).fail(function (jqXHR, textStatus, errorThrown) {
	          var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
	          $("#errorNotification").html('<div>' + errorMessage + '</div>');
	          $("#errorNotification").jqxNotification("open");
	        });
	      }
	    };

	    var form = new _Form2.default(formOptions);

	    this.window = new _AddWindow2.default({
	      width: 330,
	      height: 360,
	      title: 'Edit Siswa Tingkat 1',
	      content: form,
	      onSave: function onSave() {
	        form.validate();
	      },
	      onCancel: function onCancel() {
	        _this.window.close();
	      }
	    });
	  }

	  _createClass(EditParentScheduleWindow, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      // var table = $('<table style="height: 100%; width: 100%;"></table>');
	      // var tr = $('<tr></tr>');
	      // var td = $('<td></td>');
	      // table.appendTo(container);
	      // tr.appendTo(table);
	      // td.appendTo(tr);

	      this.window.render(container);
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      this.window.open();
	    }
	  }]);

	  return EditParentScheduleWindow;
	}();

	exports.default = EditParentScheduleWindow;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _Form = __webpack_require__(16);

	var _Form2 = _interopRequireDefault(_Form);

	var _AddWindow = __webpack_require__(17);

	var _AddWindow2 = _interopRequireDefault(_AddWindow);

	var _DateRange = __webpack_require__(18);

	var _DateRange2 = _interopRequireDefault(_DateRange);

	var _StudentComboBox = __webpack_require__(19);

	var _StudentComboBox2 = _interopRequireDefault(_StudentComboBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EditParentScheduleLevel2Window = function () {
	  function EditParentScheduleLevel2Window(data, onSaveSuccess) {
	    _classCallCheck(this, EditParentScheduleLevel2Window);

	    this.id = (0, _Utils.guid)();
	    var _this = this;

	    var schedule = data.schedule;
	    var children = data.children;

	    var getChildrenByDivisionId = function getChildrenByDivisionId(bagianId, children) {
	      for (var i = 0; i < children.length; i++) {
	        if (children[i].bagian_id == bagianId) {
	          return children[i];
	        }
	      }

	      return null;
	    };

	    var child1 = getChildrenByDivisionId(8, children);
	    var schedule1 = {
	      startDate: child1.start_date,
	      endDate: child1.end_date
	    };

	    var child2 = getChildrenByDivisionId(9, children);
	    var schedule2 = {
	      startDate: child2.start_date,
	      endDate: child2.end_date
	    };

	    var child3 = getChildrenByDivisionId(10, children);
	    var schedule3 = {
	      startDate: child3.start_date,
	      endDate: child3.end_date
	    };
	    var child4 = getChildrenByDivisionId(11, children);
	    var schedule4 = {
	      startDate: child4.start_date,
	      endDate: child4.end_date
	    };
	    var child5 = getChildrenByDivisionId(12, children);
	    var schedule5 = {
	      startDate: child5.start_date,
	      endDate: child5.end_date
	    };
	    var child6 = getChildrenByDivisionId(13, children);
	    var schedule6 = {
	      startDate: child6.start_date,
	      endDate: child6.end_date
	    };
	    var child7 = getChildrenByDivisionId(14, children);
	    var schedule7 = {
	      startDate: child7.start_date,
	      endDate: child7.end_date
	    };
	    var child8 = getChildrenByDivisionId(15, children);
	    var schedule8 = {
	      startDate: child8.start_date,
	      endDate: child8.end_date
	    };
	    var child9 = getChildrenByDivisionId(16, children);
	    var schedule9 = {
	      startDate: child9.start_date,
	      endDate: child9.end_date
	    };

	    var studentComboBox = new _StudentComboBox2.default({
	      studentLevel: 2,
	      value: schedule.siswa_id
	    });
	    var dateRange1 = new _DateRange2.default({
	      value: schedule1,
	      width: '100%',
	      height: 25
	    });
	    var dateRange2 = new _DateRange2.default({
	      value: schedule2,
	      width: '100%',
	      height: 25
	    });
	    var dateRange3 = new _DateRange2.default({
	      value: schedule3,
	      width: '100%',
	      height: 25
	    });
	    var dateRange4 = new _DateRange2.default({
	      value: schedule4,
	      width: '100%',
	      height: 25
	    });
	    var dateRange5 = new _DateRange2.default({
	      value: schedule5,
	      width: '100%',
	      height: 25
	    });
	    var dateRange6 = new _DateRange2.default({
	      value: schedule6,
	      width: '100%',
	      height: 25
	    });
	    var dateRange7 = new _DateRange2.default({
	      value: schedule7,
	      width: '100%',
	      height: 25
	    });
	    var dateRange8 = new _DateRange2.default({
	      value: schedule8,
	      width: '100%',
	      height: 25
	    });
	    var dateRange9 = new _DateRange2.default({
	      value: schedule9,
	      width: '100%',
	      height: 25
	    });

	    var formItems = [{
	      name: 'student',
	      label: 'Siswa',
	      content: studentComboBox,
	      validation: {
	        type: 'COMBOBOX',
	        rule: 'required'
	      }
	    }, {
	      name: 'mata',
	      label: 'Mata',
	      content: dateRange1
	    }, {
	      name: 'tht',
	      label: 'THT',
	      content: dateRange2
	    }, {
	      name: 'anestesi',
	      label: 'Anestesi',
	      content: dateRange3
	    }, {
	      name: 'bedah',
	      label: 'Bedah',
	      content: dateRange4
	    }, {
	      name: 'ikm',
	      label: 'IKM / IKK',
	      content: dateRange5
	    }, {
	      name: 'obgin',
	      label: 'Obgin',
	      content: dateRange6
	    }, {
	      name: 'ortopedi',
	      label: 'Ortopedi',
	      content: dateRange7
	    }, {
	      name: 'kardiologi',
	      label: 'Kardiologi',
	      content: dateRange8
	    }, {
	      name: 'forensik',
	      label: 'Forensik',
	      content: dateRange9
	    }];
	    var formOptions = {
	      items: formItems,
	      labelColumnWidth: '120px',
	      onValidationSuccess: function onValidationSuccess(formValue) {
	        formValue.mata['dbId'] = child1.id;
	        formValue.tht['dbId'] = child2.id;
	        formValue.anestesi['dbId'] = child3.id;
	        formValue.bedah['dbId'] = child4.id;
	        formValue.ikm['dbId'] = child5.id;
	        formValue.obgin['dbId'] = child6.id;
	        formValue.ortopedi['dbId'] = child7.id;
	        formValue.kardiologi['dbId'] = child8.id;
	        formValue.forensik['dbId'] = child9.id;

	        $.ajax({
	          method: "PUT",
	          url: "/schedules/parent_update_level_2/" + schedule.id,
	          data: formValue
	        }).done(function () {
	          $("#successNotification").jqxNotification("open");
	          _this.window.close();
	          if (onSaveSuccess) {
	            onSaveSuccess();
	          }
	        }).fail(function (jqXHR, textStatus, errorThrown) {
	          var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
	          $("#errorNotification").html('<div>' + errorMessage + '</div>');
	          $("#errorNotification").jqxNotification("open");
	        });
	      }
	    };

	    var form = new _Form2.default(formOptions);

	    this.window = new _AddWindow2.default({
	      width: 330,
	      height: 430,
	      title: 'Edit Siswa Tingkat 2',
	      content: form,
	      onSave: function onSave() {
	        form.validate();
	      },
	      onCancel: function onCancel() {
	        _this.window.close();
	      }
	    });
	  }

	  _createClass(EditParentScheduleLevel2Window, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      // var table = $('<table style="height: 100%; width: 100%;"></table>');
	      // var tr = $('<tr></tr>');
	      // var td = $('<td></td>');
	      // table.appendTo(container);
	      // tr.appendTo(table);
	      // td.appendTo(tr);

	      this.window.render(container);
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      this.window.open();
	    }
	  }]);

	  return EditParentScheduleLevel2Window;
	}();

	exports.default = EditParentScheduleLevel2Window;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _Form = __webpack_require__(16);

	var _Form2 = _interopRequireDefault(_Form);

	var _AddWindow = __webpack_require__(17);

	var _AddWindow2 = _interopRequireDefault(_AddWindow);

	var _DateRange = __webpack_require__(18);

	var _DateRange2 = _interopRequireDefault(_DateRange);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EditDivisionScheduleWindow = function () {
	  function EditDivisionScheduleWindow(data, onSaveSuccess) {
	    _classCallCheck(this, EditDivisionScheduleWindow);

	    this.id = (0, _Utils.guid)();
	    var _this = this;

	    var schedule = data.schedule;
	    var schedule1 = {
	      startDate: schedule.start_date,
	      endDate: schedule.end_date
	    };

	    var dateRange1 = new _DateRange2.default({
	      value: schedule1,
	      width: '100%',
	      height: 25
	    });

	    var formItems = [{
	      name: 'scheduleDateRange',
	      label: 'Tanggal',
	      content: dateRange1
	    }];
	    var formOptions = {
	      items: formItems,
	      labelColumnWidth: '120px',
	      onValidationSuccess: function onValidationSuccess(formValue) {
	        formValue.scheduleDateRange['dbId'] = schedule.id;
	        $.ajax({
	          method: "PUT",
	          url: "/schedules/division_update/" + schedule.id,
	          data: formValue
	        }).done(function () {
	          $("#successNotification").jqxNotification("open");
	          _this.window.close();
	          if (onSaveSuccess) {
	            onSaveSuccess();
	          }
	        }).fail(function (jqXHR, textStatus, errorThrown) {
	          var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
	          $("#errorNotification").html('<div>' + errorMessage + '</div>');
	          $("#errorNotification").jqxNotification("open");
	        });
	      }
	    };

	    var form = new _Form2.default(formOptions);

	    this.window = new _AddWindow2.default({
	      width: 330,
	      height: 120,
	      title: 'Edit Jadwal Bagian',
	      content: form,
	      onSave: function onSave() {
	        form.validate();
	      },
	      onCancel: function onCancel() {
	        _this.window.close();
	      }
	    });
	  }

	  _createClass(EditDivisionScheduleWindow, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      // var table = $('<table style="height: 100%; width: 100%;"></table>');
	      // var tr = $('<tr></tr>');
	      // var td = $('<td></td>');
	      // table.appendTo(container);
	      // tr.appendTo(table);
	      // td.appendTo(tr);

	      this.window.render(container);
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      this.window.open();
	    }
	  }]);

	  return EditDivisionScheduleWindow;
	}();

	exports.default = EditDivisionScheduleWindow;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _ToggleButton = __webpack_require__(10);

	var _ToggleButton2 = _interopRequireDefault(_ToggleButton);

	var _TextBox = __webpack_require__(11);

	var _TextBox2 = _interopRequireDefault(_TextBox);

	var _DataGrid = __webpack_require__(25);

	var _DataGrid2 = _interopRequireDefault(_DataGrid);

	var _DivisionComboBox = __webpack_require__(26);

	var _DivisionComboBox2 = _interopRequireDefault(_DivisionComboBox);

	var _EditScoreWindow = __webpack_require__(27);

	var _EditScoreWindow2 = _interopRequireDefault(_EditScoreWindow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ScoreList = function () {
	  function ScoreList() {
	    _classCallCheck(this, ScoreList);

	    this.id = (0, _Utils.guid)();
	  }

	  _createClass(ScoreList, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var url = "/scores";

	      var source = {
	        datatype: "json",
	        datafields: [{ name: 'id', type: 'int' }, { name: 'stambuk_lama', type: 'string' }, { name: 'stambuk_baru', type: 'string' }, { name: 'nama', type: 'string' }, { name: 'nama_bagian', type: 'string' }, { name: 'start_date', type: 'date', format: "yyyy-MM-ddTHH:mm:ss-HH:mm" }, { name: 'end_date', type: 'date', format: "yyyy-MM-ddTHH:mm:ss-HH:mm" }, { name: 'rumah_sakit_id', type: 'int' }, { name: 'rumah_sakit_nama', type: 'string' }, { name: 'puskesmas_id', type: 'int' }, { name: 'puskesmas_nama', type: 'string' }, { name: 'pre_test', type: 'float' }, { name: 'tugas_ilmiah', type: 'float' }, { name: 'persentase10', type: 'float' }, { name: 'persentase20', type: 'float' }, { name: 'persentase35', type: 'float' }, { name: 'persentase35b', type: 'float' }, { name: 'diskusi_mingguan', type: 'float' }, { name: 'ujian', type: 'float' }, { name: 'post_test', type: 'float' }, { name: 'nilai_akhir', type: 'float' }, { name: 'seminar', type: 'float' }, { name: 'rekomendasi_id', type: 'int' }, { name: 'rekomendasi_nama', type: 'string' }],
	        id: "id",
	        url: url
	      };

	      var onSearch = function onSearch(data) {
	        data['searchTxt'] = searchTextBox.getValue();
	        data['searchDivision'] = divisionComboBox.getValue();
	        return data;
	      };

	      var dataGridOptions = {
	        width: '100%',
	        height: '100%',
	        pageable: true,
	        groupable: true,
	        virtualmode: true,
	        rendergridrows: function rendergridrows(params) {
	          return params.data;
	        },
	        altrows: true,
	        theme: 'metro',
	        columns: [{ text: 'Stambuk Lama', datafield: 'stambuk_lama', width: 100 }, { text: 'Stambuk Baru', datafield: 'stambuk_baru', width: 100 }, { text: 'Nama', datafield: 'nama', width: 200 }, { text: 'Bagian', datafield: 'nama_bagian', width: 110 }, { text: 'Tanggal Mulai', datafield: 'start_date', cellsformat: 'dd-MM-yyyy', width: 100 }, { text: 'Tanggal Selesai', datafield: 'end_date', cellsformat: 'dd-MM-yyyy', width: 100 }, { text: 'Rumah Sakit', datafield: 'rumah_sakit_nama', width: 110 }, { text: 'Puskesmas', datafield: 'puskesmas_nama', width: 110 }, { text: 'Pre-Test', datafield: 'pre_test', cellsalign: 'right', cellsformat: 'd2', width: 60 }, { text: 'Tugas Ilmiah', datafield: 'tugas_ilmiah', cellsalign: 'right', cellsformat: 'd2', width: 80 }, { text: '10%', datafield: 'persentase10', cellsalign: 'right', cellsformat: 'd2', width: 50 }, { text: 'Diskusi Mingguan', datafield: 'diskusi_mingguan', cellsalign: 'right', cellsformat: 'd2', width: 110 }, { text: '20%', datafield: 'persentase20', cellsalign: 'right', cellsformat: 'd2', width: 50 }, { text: 'Nilai Ujian', datafield: 'ujian', cellsalign: 'right', cellsformat: 'd2', width: 70 }, { text: '35%', datafield: 'persentase35', cellsalign: 'right', cellsformat: 'd2', width: 50 }, { text: 'Post Test (CBT)', datafield: 'post_test', cellsalign: 'right', cellsformat: 'd2', width: 100 }, { text: '35%', datafield: 'persentase35b', cellsalign: 'right', cellsformat: 'd2', width: 50 }, { text: 'Nilai Akhir', datafield: 'nilai_akhir', cellsalign: 'right', cellsformat: 'd2', width: 70 }, { text: 'Seminar', datafield: 'seminar', cellsalign: 'right', cellsformat: 'd2', width: 60 }, { text: 'Rekomendasi', datafield: 'rekomendasi_nama', width: 200 }],
	        groups: []
	      };

	      this.dataGrid = new _DataGrid2.default({
	        source: source,
	        onSearch: onSearch,
	        onRowDoubleClick: function onRowDoubleClick(data) {
	          var editScoreWindow = new _EditScoreWindow2.default({
	            data: data,
	            onSaveSuccess: function onSaveSuccess() {
	              _this.dataGrid.refresh();
	            }
	          });
	          editScoreWindow.render($('#dialogWindowContainer'));
	          editScoreWindow.open();
	        },
	        dataGridOptions: dataGridOptions
	      });

	      var divisionComboBox = new _DivisionComboBox2.default();
	      var searchTextBox = new _TextBox2.default({ placeHolder: 'Stambuk atau Nama', width: 250, height: 24 });
	      var searchButton = new _Button2.default({
	        imgSrc: '/ceu_assets/images/search.png',
	        theme: 'metro',
	        width: 30,
	        height: 26,
	        onClick: function onClick() {
	          _this.dataGrid.refresh();
	        }
	      });

	      var table = $('<table style="height: 100%; width: 100%; margin: -3px; "></table>');
	      var tr = $('<tr></tr>');
	      var td = $('<td style="padding: 0; height: 40px;"></td>');
	      table.appendTo(container);
	      tr.appendTo(table);
	      td.appendTo(tr);

	      var innerTable = $('<table style="height: 100%; width: 100%;"></table>');
	      var innerTr = $('<tr></tr>');
	      var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; width: 120px; height: 100%;"></td>');
	      innerTable.appendTo(td);
	      innerTr.appendTo(innerTable);
	      innerTd.appendTo(innerTr);
	      divisionComboBox.render(innerTd);

	      var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; width: 120px; height: 100%;"></td>');
	      innerTd.appendTo(innerTr);
	      searchTextBox.render(innerTd);

	      innerTd = $('<td style="padding-top: 6px; height: 100%;"></td>');
	      var _tempContainer = $('<div style="margin-left: -5px;"></div>');
	      _tempContainer.appendTo(innerTd);
	      innerTd.appendTo(innerTr);
	      searchButton.render(_tempContainer);

	      tr = $('<tr></tr>');
	      td = $('<td style="padding: 0;"></td>');
	      tr.appendTo(table);
	      td.appendTo(tr);

	      this.dataGrid.render(td);
	    }
	  }]);

	  return ScoreList;
	}();

	exports.default = ScoreList;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DataGrid = function () {
	  function DataGrid(options) {
	    _classCallCheck(this, DataGrid);

	    this.id = (0, _Utils.guid)();
	    this.source = options.source;
	    this.onSearch = options.onSearch;
	    this.dataGridOptions = options.dataGridOptions;
	    this.onRowDoubleClick = options.onRowDoubleClick;
	  }

	  _createClass(DataGrid, [{
	    key: 'render',
	    value: function render(container) {
	      var _this = this;

	      var dataAdapter = new $.jqx.dataAdapter(this.source, {
	        formatData: function formatData(data) {
	          if (_this.onSearch) {
	            return _this.onSearch(data);
	          } else {
	            return data;
	          }
	        },
	        downloadComplete: function downloadComplete(data, status, xhr) {
	          if (!_this.source.totalRecords) {
	            _this.source.totalRecords = data.totalRecords;
	          }
	        }

	      });
	      this.dataGridOptions['source'] = dataAdapter;
	      this.dataGridOptions['altrows'] = true;
	      this.dataGridOptions['columnsresize'] = true;
	      // this.dataGridOptions['pagesizeoptions'] = ['50', '100', '500'];

	      var dataGridContainer = $('<div style="height: 100%"></div>');
	      dataGridContainer.appendTo(container);
	      dataGridContainer.jqxGrid(this.dataGridOptions);

	      if (this.onRowDoubleClick) {
	        dataGridContainer.on('rowdoubleclick', function (event) {
	          var args = event.args;
	          var rowIndex = args.rowindex;
	          var data = dataGridContainer.jqxGrid('getrowdata', rowIndex);
	          _this.onRowDoubleClick(data);
	        });
	      }

	      this.dataGridContainer = dataGridContainer;
	    }
	  }, {
	    key: 'refresh',
	    value: function refresh() {
	      this.dataGridContainer.jqxGrid('gotopage', 0);
	      this.dataGridContainer.jqxGrid('updatebounddata');
	    }
	  }, {
	    key: 'addGroup',
	    value: function addGroup(groupName) {
	      this.dataGridContainer.jqxGrid('addgroup', groupName);
	    }
	  }]);

	  return DataGrid;
	}();

	exports.default = DataGrid;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _ComboBox = __webpack_require__(12);

	var _ComboBox2 = _interopRequireDefault(_ComboBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DivisionComboBox = function () {
	  function DivisionComboBox() {
	    _classCallCheck(this, DivisionComboBox);

	    this.id = (0, _Utils.guid)();

	    var comboBoxOptions = {
	      displayMember: "nama",
	      valueMember: "id",
	      placeHolder: 'Pilih Bagian',
	      width: 200,
	      height: 25,
	      theme: 'metro'
	    };

	    this.comboBox = new _ComboBox2.default({
	      url: '/divisions_all',
	      comboBoxOptions: comboBoxOptions,
	      clearSelectionEnabled: true,
	      onChange: function onChange(value) {
	        //
	      }
	    });
	  }

	  _createClass(DivisionComboBox, [{
	    key: "getId",
	    value: function getId() {
	      return this.comboBox.getId();
	    }
	  }, {
	    key: "render",
	    value: function render(container) {
	      this.comboBox.render(container);
	    }
	  }, {
	    key: "getValue",
	    value: function getValue() {
	      return this.comboBox.getValue();
	    }
	  }]);

	  return DivisionComboBox;
	}();

	exports.default = DivisionComboBox;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _Form = __webpack_require__(16);

	var _Form2 = _interopRequireDefault(_Form);

	var _Window = __webpack_require__(28);

	var _Window2 = _interopRequireDefault(_Window);

	var _DateRange = __webpack_require__(18);

	var _DateRange2 = _interopRequireDefault(_DateRange);

	var _Label = __webpack_require__(29);

	var _Label2 = _interopRequireDefault(_Label);

	var _NumberInput = __webpack_require__(30);

	var _NumberInput2 = _interopRequireDefault(_NumberInput);

	var _HospitalComboBox = __webpack_require__(31);

	var _HospitalComboBox2 = _interopRequireDefault(_HospitalComboBox);

	var _ClinicComboBox = __webpack_require__(32);

	var _ClinicComboBox2 = _interopRequireDefault(_ClinicComboBox);

	var _RecommendationComboBox = __webpack_require__(33);

	var _RecommendationComboBox2 = _interopRequireDefault(_RecommendationComboBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EditScoreWindow = function () {
	  function EditScoreWindow(options) {
	    _classCallCheck(this, EditScoreWindow);

	    var _this = this;

	    this.id = (0, _Utils.guid)();

	    var score = options.data;
	    this.onSaveSuccess = options.onSaveSuccess;

	    var nameStr = score.nama + ' [ ' + score.stambuk_lama + ' - ' + score.stambuk_baru + ' ]';
	    var startDateStr = $.format.date(score.start_date, "dd-MM-yyyy");
	    var endDateStr = $.format.date(score.end_date, "dd-MM-yyyy");

	    var nameLabel = new _Label2.default({
	      text: nameStr,
	      bold: true
	    });

	    var divisionLabel = new _Label2.default({
	      text: score.nama_bagian,
	      bold: true
	    });

	    var kkLabel = new _Label2.default({
	      text: startDateStr + ' / ' + endDateStr,
	      bold: true
	    });

	    var hospitalComboBox = new _HospitalComboBox2.default({ value: score.rumah_sakit_id });
	    var clinicComboBox = new _ClinicComboBox2.default({ value: score.puskesmas_id });
	    var recommendationComboBox = new _RecommendationComboBox2.default({ value: score.rekomendasi_id });
	    var preTestNumberInput = new _NumberInput2.default({ value: score.pre_test, width: '100%', height: 25 });
	    var tugasIlmiahNumberInput = new _NumberInput2.default({ value: score.tugas_ilmiah, width: '100%', height: 25 });
	    var diskusiMingguanNumberInput = new _NumberInput2.default({ value: score.diskusi_mingguan, width: '100%', height: 25 });
	    var ujianNumberInput = new _NumberInput2.default({ value: score.ujian, width: '100%', height: 25 });
	    var postTestNumberInput = new _NumberInput2.default({ value: score.post_test, width: '100%', height: 25 });
	    var nilaiAkhirNumberInput = new _NumberInput2.default({ value: score.nilai_akhir, width: '100%', height: 25 });
	    var seminarNumberInput = new _NumberInput2.default({ value: score.seminar, width: '100%', height: 25 });

	    var formItems = [{
	      name: 'studentName',
	      label: 'Nama',
	      content: nameLabel
	    }, {
	      name: 'divisionName',
	      label: 'Bagian',
	      content: divisionLabel
	    }, {
	      name: 'kk',
	      label: 'Masa KK',
	      content: kkLabel
	    }, {
	      name: 'rs_id',
	      label: 'Rumah Sakit',
	      content: hospitalComboBox
	    }, {
	      name: 'puskesmas_id',
	      label: 'Puskesmas',
	      content: clinicComboBox
	    }, {
	      name: 'rekomendasi_id',
	      label: 'Rekomendasi',
	      content: recommendationComboBox
	    }, {
	      name: 'pre_test',
	      label: 'Nilai Pre-Test',
	      content: preTestNumberInput
	    }, {
	      name: 'tugas_ilmiah',
	      label: 'Tugas Ilmiah',
	      content: tugasIlmiahNumberInput
	    }, {
	      name: 'diskusi_mingguan',
	      label: 'Tugas Ilmiah',
	      content: diskusiMingguanNumberInput
	    }, {
	      name: 'ujian',
	      label: 'Ujian',
	      content: ujianNumberInput
	    }, {
	      name: 'post_test',
	      label: 'Post Test',
	      content: postTestNumberInput
	    }, {
	      name: 'nilai_akhir',
	      label: 'Nilai Akhir',
	      content: nilaiAkhirNumberInput
	    }, {
	      name: 'seminar',
	      label: 'Seminar',
	      content: seminarNumberInput
	    }];
	    var formOptions = {
	      items: formItems,
	      labelColumnWidth: '120px',
	      onValidationSuccess: function onValidationSuccess(formValue) {
	        $.ajax({
	          method: "PUT",
	          url: "/scores/" + score.id,
	          data: formValue
	        }).done(function () {
	          $("#successNotification").jqxNotification("open");
	          _this.window.close();
	          if (_this.onSaveSuccess) {
	            _this.onSaveSuccess();
	          }
	        }).fail(function (jqXHR, textStatus, errorThrown) {
	          var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
	          $("#errorNotification").html('<div>' + errorMessage + '</div>');
	          $("#errorNotification").jqxNotification("open");
	        });
	      }
	    };

	    var form = new _Form2.default(formOptions);

	    this.window = new _Window2.default({
	      width: 420,
	      height: 520,
	      title: 'Edit Nilai',
	      content: form,
	      onSave: function onSave() {
	        form.validate();
	      },
	      onCancel: function onCancel() {
	        _this.window.close();
	      }
	    });
	  }

	  _createClass(EditScoreWindow, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;
	      this.window.render(container);
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      this.window.open();
	    }
	  }]);

	  return EditScoreWindow;
	}();

	exports.default = EditScoreWindow;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Window = function () {
	  function Window(options) {
	    _classCallCheck(this, Window);

	    this.id = (0, _Utils.guid)();
	    this.content = options.content;

	    if (options.title) {
	      this.title = options.title;
	    } else {
	      this.title = '';
	    }

	    if (options.width) {
	      this.width = options.width;
	    }

	    if (options.height) {
	      this.height = options.height;
	    }

	    if (options.buttons) {} else {
	      this.saveButton = new _Button2.default({
	        title: 'Save',
	        template: 'success',
	        onClick: function onClick() {
	          if (options.onSave) {
	            options.onSave();
	          }
	        }
	      });

	      this.cancelButton = new _Button2.default({
	        title: 'Cancel',
	        onClick: function onClick() {
	          if (options.onCancel) {
	            options.onCancel();
	          }
	        }
	      });
	    }
	  }

	  _createClass(Window, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var windowContainer = $('<div></div>');
	      windowContainer.appendTo(container);

	      windowContainer.attr('id', this.id);

	      var windowTitle = $('<div>' + this.title + '</div>');
	      windowTitle.appendTo(windowContainer);

	      var windowContent = $('<div></div>');
	      windowContent.appendTo(windowContainer);

	      var windowOptions = {
	        theme: 'metro',
	        isModal: true,
	        autoOpen: false
	      };

	      if (this.width) {
	        windowOptions['width'] = this.width;
	      }

	      if (this.height) {
	        windowOptions['height'] = this.height;
	      }

	      windowContainer.jqxWindow(windowOptions);

	      windowContainer.on('close', function (event) {
	        windowContainer.jqxWindow('destroy');
	      });

	      var table = $('<table style="height: 100%; width: 100%;"></table>');
	      var tr = $('<tr></tr>');
	      var td = $('<td></td>');
	      table.appendTo(windowContent);
	      tr.appendTo(table);
	      td.appendTo(tr);
	      this.content.render(td);

	      tr = $('<tr></tr>');
	      td = $('<td></td>');
	      tr.appendTo(table);
	      td.appendTo(tr);

	      var innerTable = $('<table style="height: 100%; width: 100%;"></table>');
	      var innerTr = $('<tr></tr>');
	      var innerTd = $('<td style="width: 90%;"></td>');
	      innerTable.appendTo(td);
	      innerTr.appendTo(innerTable);
	      innerTd.appendTo(innerTr);

	      innerTd = $('<td></td>');
	      innerTd.appendTo(innerTr);
	      this.cancelButton.render(innerTd);

	      innerTd = $('<td></td>');
	      innerTd.appendTo(innerTr);
	      this.saveButton.render(innerTd);

	      this.windowContainer = windowContainer;
	    }
	  }, {
	    key: 'getId',
	    value: function getId() {
	      return this.id;
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      this.windowContainer.jqxWindow('open');
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      this.windowContainer.jqxWindow('close');
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.windowContainer.jqxWindow('destroy');
	    }
	  }]);

	  return Window;
	}();

	exports.default = Window;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Label = function () {
	  function Label(options) {
	    _classCallCheck(this, Label);

	    this.id = (0, _Utils.guid)();
	    this.text = options.text;
	    this.bold = options.bold;
	  }

	  _createClass(Label, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var labelContainer = $('<span>' + this.text + '</span>');
	      labelContainer.appendTo(container);
	      if (this.bold) {
	        labelContainer.css('font-weight', 'bold');
	      }
	    }
	  }, {
	    key: 'getId',
	    value: function getId() {
	      return this.id;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.text;
	    }
	  }]);

	  return Label;
	}();

	exports.default = Label;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NumberInput = function () {
	  function NumberInput(options) {
	    _classCallCheck(this, NumberInput);

	    this.id = (0, _Utils.guid)();

	    if (options.width) {
	      this.width = options.width;
	    }

	    if (options.height) {
	      this.height = options.height;
	    }

	    this.initialValue = options.value;
	  }

	  _createClass(NumberInput, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var numberInputContainer = $('<div></div>');
	      numberInputContainer.appendTo(container);
	      numberInputContainer.attr('id', this.id);

	      var numberInputOptions = {
	        theme: 'metro'
	      };

	      if (this.width) {
	        numberInputOptions['width'] = this.width;
	      }

	      if (this.height) {
	        numberInputOptions['height'] = this.height;
	      }
	      numberInputContainer.jqxNumberInput(numberInputOptions);

	      if (this.initialValue) {
	        numberInputContainer.val(this.initialValue);
	      }

	      this.numberInputContainer = numberInputContainer;
	    }
	  }, {
	    key: 'getId',
	    value: function getId() {
	      return this.id;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.numberInputContainer.val();
	    }
	  }]);

	  return NumberInput;
	}();

	exports.default = NumberInput;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _ComboBox = __webpack_require__(12);

	var _ComboBox2 = _interopRequireDefault(_ComboBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HospitalComboBox = function () {
	  function HospitalComboBox(options) {
	    _classCallCheck(this, HospitalComboBox);

	    this.id = (0, _Utils.guid)();

	    var comboBoxOptions = {
	      displayMember: "nama",
	      valueMember: "id",
	      placeHolder: 'Pilih Rumah Sakit',
	      width: '100%',
	      height: 25,
	      theme: 'metro'
	    };

	    this.comboBox = new _ComboBox2.default({
	      url: '/hospitals/hospitals_all',
	      value: options.value,
	      clearSelectionEnabled: true,
	      comboBoxOptions: comboBoxOptions,
	      onChange: function onChange(value) {
	        //
	      }
	    });
	  }

	  _createClass(HospitalComboBox, [{
	    key: "getId",
	    value: function getId() {
	      return this.comboBox.getId();
	    }
	  }, {
	    key: "render",
	    value: function render(container) {
	      this.comboBox.render(container);
	    }
	  }, {
	    key: "getValue",
	    value: function getValue() {
	      return this.comboBox.getValue();
	    }
	  }]);

	  return HospitalComboBox;
	}();

	exports.default = HospitalComboBox;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _ComboBox = __webpack_require__(12);

	var _ComboBox2 = _interopRequireDefault(_ComboBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ClinicComboBox = function () {
	  function ClinicComboBox(options) {
	    _classCallCheck(this, ClinicComboBox);

	    this.id = (0, _Utils.guid)();

	    var comboBoxOptions = {
	      displayMember: "nama",
	      valueMember: "id",
	      placeHolder: 'Pilih Puskesmas',
	      width: '100%',
	      height: 25,
	      theme: 'metro'
	    };

	    this.comboBox = new _ComboBox2.default({
	      url: '/hospitals/clinics_all',
	      value: options.value,
	      clearSelectionEnabled: true,
	      comboBoxOptions: comboBoxOptions,
	      onChange: function onChange(value) {
	        //
	      }
	    });
	  }

	  _createClass(ClinicComboBox, [{
	    key: "getId",
	    value: function getId() {
	      return this.comboBox.getId();
	    }
	  }, {
	    key: "render",
	    value: function render(container) {
	      this.comboBox.render(container);
	    }
	  }, {
	    key: "getValue",
	    value: function getValue() {
	      return this.comboBox.getValue();
	    }
	  }]);

	  return ClinicComboBox;
	}();

	exports.default = ClinicComboBox;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _ComboBox = __webpack_require__(12);

	var _ComboBox2 = _interopRequireDefault(_ComboBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RecommendationComboBox = function () {
	  function RecommendationComboBox(options) {
	    _classCallCheck(this, RecommendationComboBox);

	    this.id = (0, _Utils.guid)();

	    var comboBoxOptions = {
	      displayMember: "nama",
	      valueMember: "id",
	      placeHolder: 'Pilih Rekomendasi',
	      width: '100%',
	      height: 25,
	      theme: 'metro'
	    };

	    this.comboBox = new _ComboBox2.default({
	      url: '/scores/recommendations',
	      value: options.value,
	      clearSelectionEnabled: true,
	      comboBoxOptions: comboBoxOptions,
	      onChange: function onChange(value) {
	        //
	      }
	    });
	  }

	  _createClass(RecommendationComboBox, [{
	    key: "getId",
	    value: function getId() {
	      return this.comboBox.getId();
	    }
	  }, {
	    key: "render",
	    value: function render(container) {
	      this.comboBox.render(container);
	    }
	  }, {
	    key: "getValue",
	    value: function getValue() {
	      return this.comboBox.getValue();
	    }
	  }]);

	  return RecommendationComboBox;
	}();

	exports.default = RecommendationComboBox;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _ToggleButton = __webpack_require__(10);

	var _ToggleButton2 = _interopRequireDefault(_ToggleButton);

	var _TextBox = __webpack_require__(11);

	var _TextBox2 = _interopRequireDefault(_TextBox);

	var _DataGrid = __webpack_require__(25);

	var _DataGrid2 = _interopRequireDefault(_DataGrid);

	var _DivisionComboBox = __webpack_require__(26);

	var _DivisionComboBox2 = _interopRequireDefault(_DivisionComboBox);

	var _EditScoreWindow = __webpack_require__(27);

	var _EditScoreWindow2 = _interopRequireDefault(_EditScoreWindow);

	var _DateRange = __webpack_require__(18);

	var _DateRange2 = _interopRequireDefault(_DateRange);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var WeeklyScheduleList = function () {
	  function WeeklyScheduleList() {
	    _classCallCheck(this, WeeklyScheduleList);

	    this.id = (0, _Utils.guid)();
	  }

	  _createClass(WeeklyScheduleList, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var url = "/weeklyschedules";

	      var source = {
	        datatype: "json",
	        datafields: [{ name: 'id', type: 'int' }, { name: 'stambuk_lama', type: 'string' }, { name: 'stambuk_baru', type: 'string' }, { name: 'nama', type: 'string' }, { name: 'nama_bagian', type: 'string' }, { name: 'start_date', type: 'date', format: "yyyy-MM-ddTHH:mm:ss-HH:mm" }, { name: 'end_date', type: 'date', format: "yyyy-MM-ddTHH:mm:ss-HH:mm" }],
	        id: "id",
	        url: url
	      };

	      var dateRange = new _DateRange2.default({});

	      var onSearch = function onSearch(data) {
	        data['searchTxt'] = searchTextBox.getValue();
	        data['searchDivision'] = divisionComboBox.getValue();
	        data['searchDate'] = dateRange.getValue();
	        return data;
	      };

	      var dataGridOptions = {
	        width: '100%',
	        height: '100%',
	        pageable: true,
	        groupable: true,
	        virtualmode: true,
	        rendergridrows: function rendergridrows(params) {
	          return params.data;
	        },
	        altrows: true,
	        theme: 'metro',
	        columns: [{ text: 'Stambuk Lama', datafield: 'stambuk_lama', width: '15%' }, { text: 'Stambuk Baru', datafield: 'stambuk_baru', width: '15%' }, { text: 'Nama', datafield: 'nama', width: '25%' }, { text: 'Bagian', datafield: 'nama_bagian', width: '15%' }, { text: 'Tanggal Mulai', datafield: 'start_date', cellsformat: 'dd-MM-yyyy', width: '15%' }, { text: 'Tanggal Selesai', datafield: 'end_date', cellsformat: 'dd-MM-yyyy', width: '15%' }],
	        groups: []
	      };

	      this.dataGrid = new _DataGrid2.default({
	        source: source,
	        onSearch: onSearch,
	        onRowDoubleClick: function onRowDoubleClick(data) {
	          var editScoreWindow = new _EditScoreWindow2.default({
	            data: data,
	            onSaveSuccess: function onSaveSuccess() {
	              _this.dataGrid.refresh();
	            }
	          });
	          editScoreWindow.render($('#dialogWindowContainer'));
	          editScoreWindow.open();
	        },
	        dataGridOptions: dataGridOptions
	      });

	      var divisionComboBox = new _DivisionComboBox2.default();
	      var searchTextBox = new _TextBox2.default({ placeHolder: 'Stambuk atau Nama', width: 250, height: 24 });
	      var searchButton = new _Button2.default({
	        imgSrc: '/ceu_assets/images/search.png',
	        theme: 'metro',
	        width: 30,
	        height: 26,
	        onClick: function onClick() {
	          _this.dataGrid.refresh();
	        }
	      });

	      var table = $('<table style="height: 100%; width: 100%; margin: -3px; "></table>');
	      var tr = $('<tr></tr>');
	      var td = $('<td style="padding: 0; height: 40px;"></td>');
	      table.appendTo(container);
	      tr.appendTo(table);
	      td.appendTo(tr);

	      var innerTable = $('<table style="height: 100%; width: 100%;"></table>');
	      var innerTr = $('<tr></tr>');
	      var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; width: 120px; height: 100%;"></td>');
	      innerTable.appendTo(td);
	      innerTr.appendTo(innerTable);
	      innerTd.appendTo(innerTr);
	      dateRange.render(innerTd);

	      var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; width: 120px; height: 100%;"></td>');
	      innerTd.appendTo(innerTr);
	      divisionComboBox.render(innerTd);

	      var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; width: 120px; height: 100%;"></td>');
	      innerTd.appendTo(innerTr);
	      searchTextBox.render(innerTd);

	      innerTd = $('<td style="padding-top: 6px; height: 100%;"></td>');
	      var _tempContainer = $('<div style="margin-left: -5px;"></div>');
	      _tempContainer.appendTo(innerTd);
	      innerTd.appendTo(innerTr);
	      searchButton.render(_tempContainer);

	      tr = $('<tr></tr>');
	      td = $('<td style="padding: 0;"></td>');
	      tr.appendTo(table);
	      td.appendTo(tr);

	      this.dataGrid.render(td);
	    }
	  }]);

	  return WeeklyScheduleList;
	}();

	exports.default = WeeklyScheduleList;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _ToggleButton = __webpack_require__(10);

	var _ToggleButton2 = _interopRequireDefault(_ToggleButton);

	var _TextBox = __webpack_require__(11);

	var _TextBox2 = _interopRequireDefault(_TextBox);

	var _DataGrid = __webpack_require__(25);

	var _DataGrid2 = _interopRequireDefault(_DataGrid);

	var _LevelComboBox = __webpack_require__(14);

	var _LevelComboBox2 = _interopRequireDefault(_LevelComboBox);

	var _AddStudentWindow = __webpack_require__(36);

	var _AddStudentWindow2 = _interopRequireDefault(_AddStudentWindow);

	var _EditStudentWindow = __webpack_require__(37);

	var _EditStudentWindow2 = _interopRequireDefault(_EditStudentWindow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StudentList = function () {
	  function StudentList() {
	    _classCallCheck(this, StudentList);

	    this.id = (0, _Utils.guid)();
	  }

	  _createClass(StudentList, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var url = "/students";

	      var source = {
	        datatype: "json",
	        datafields: [{ name: 'id', type: 'int' }, { name: 'stambuk_lama', type: 'string' }, { name: 'stambuk_baru', type: 'string' }, { name: 'nama', type: 'string' }, { name: 'tingkat', type: 'int' }],
	        id: "id",
	        url: url
	      };

	      var onSearch = function onSearch(data) {
	        data['searchTxt'] = searchTextBox.getValue();
	        data['level'] = levelComboBox.getValue();
	        return data;
	      };

	      var dataGridOptions = {
	        width: '100%',
	        height: '100%',
	        pageable: true,
	        altrows: true,
	        theme: 'metro',
	        virtualmode: true,
	        rendergridrows: function rendergridrows(params) {
	          return params.data;
	        },
	        columns: [{ text: 'Stambuk Lama', datafield: 'stambuk_lama', width: '25%' }, { text: 'Stambuk Baru', datafield: 'stambuk_baru', width: '25%' }, { text: 'Nama', datafield: 'nama', width: '25%' }, { text: 'Tingkat', datafield: 'tingkat', width: '25%' }],
	        groups: []
	      };

	      this.dataGrid = new _DataGrid2.default({
	        source: source,
	        onSearch: onSearch,
	        onRowDoubleClick: function onRowDoubleClick(data) {
	          var editStudentWindow = new _EditStudentWindow2.default({
	            data: data,
	            onSaveSuccess: function onSaveSuccess() {
	              _this.dataGrid.refresh();
	            }
	          });
	          editStudentWindow.render($('#dialogWindowContainer'));
	          editStudentWindow.open();
	        },
	        dataGridOptions: dataGridOptions
	      });

	      var searchTextBox = new _TextBox2.default({ placeHolder: 'Stambuk atau Nama', width: 250, height: 24 });
	      var levelComboBox = new _LevelComboBox2.default({});
	      var searchButton = new _Button2.default({
	        imgSrc: '/ceu_assets/images/search.png',
	        theme: 'metro',
	        width: 30,
	        height: 26,
	        onClick: function onClick() {
	          _this.dataGrid.refresh();
	        }
	      });

	      var addStudentButton = new _Button2.default({
	        title: 'Tambah Siswa',
	        template: 'primary',
	        height: 26,
	        onClick: function onClick() {
	          var addStudentWindow = new _AddStudentWindow2.default({
	            onSaveSuccess: function onSaveSuccess() {
	              _this.dataGrid.refresh();
	            }
	          });
	          addStudentWindow.render($('#dialogWindowContainer'));
	          addStudentWindow.open();
	        }
	      });

	      var table = $('<table style="height: 100%; width: 100%; margin: -3px; "></table>');
	      var tr = $('<tr></tr>');
	      var td = $('<td style="padding: 0; height: 40px;"></td>');
	      table.appendTo(container);
	      tr.appendTo(table);
	      td.appendTo(tr);

	      var innerTable = $('<table style="height: 100%; width: 100%;"></table>');
	      var innerTr = $('<tr></tr>');
	      var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; padding-right: 8px; width: 50px; height: 100%;"></td>');
	      innerTable.appendTo(td);
	      innerTr.appendTo(innerTable);
	      innerTd.appendTo(innerTr);
	      addStudentButton.render(innerTd);

	      innerTd = $('<td style="padding-top: 6px; width: 200px; height: 100%;"></td>');
	      innerTd.appendTo(innerTr);
	      searchTextBox.render(innerTd);

	      innerTd = $('<td style="padding-top: 6px; width: 100px; height: 100%;"></td>');
	      innerTd.appendTo(innerTr);
	      levelComboBox.render(innerTd);

	      innerTd = $('<td style="padding-top: 6px; height: 100%; "></td>');
	      var _tempContainer = $('<div style="margin-left: 2px;"></div>');
	      _tempContainer.appendTo(innerTd);
	      innerTd.appendTo(innerTr);
	      searchButton.render(_tempContainer);

	      tr = $('<tr></tr>');
	      td = $('<td style="padding: 0;"></td>');
	      tr.appendTo(table);
	      td.appendTo(tr);

	      this.dataGrid.render(td);
	    }
	  }]);

	  return StudentList;
	}();

	exports.default = StudentList;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _Form = __webpack_require__(16);

	var _Form2 = _interopRequireDefault(_Form);

	var _AddWindow = __webpack_require__(17);

	var _AddWindow2 = _interopRequireDefault(_AddWindow);

	var _TextBox = __webpack_require__(11);

	var _TextBox2 = _interopRequireDefault(_TextBox);

	var _Label = __webpack_require__(29);

	var _Label2 = _interopRequireDefault(_Label);

	var _LevelComboBox = __webpack_require__(14);

	var _LevelComboBox2 = _interopRequireDefault(_LevelComboBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AddStudentWindow = function () {
	  function AddStudentWindow(options) {
	    _classCallCheck(this, AddStudentWindow);

	    var _this = this;

	    this.id = (0, _Utils.guid)();

	    var student = options.data;
	    this.onSaveSuccess = options.onSaveSuccess;

	    var levelComboBox = new _LevelComboBox2.default({});
	    var stambukLamaTextBox = new _TextBox2.default({ height: 25, width: '100%' });
	    var stambukBaruTextBox = new _TextBox2.default({ height: 25, width: '100%' });
	    var nameTextBox = new _TextBox2.default({ height: 25, width: '100%' });

	    var formItems = [{
	      name: 'stambukLama',
	      label: 'Stambuk Lama',
	      content: stambukLamaTextBox,
	      validation: {
	        type: 'TEXTBOX',
	        rule: 'required'
	      }
	    }, {
	      name: 'stambukBaru',
	      label: 'Stambuk Baru',
	      content: stambukBaruTextBox,
	      validation: {
	        type: 'TEXTBOX',
	        rule: 'required'
	      }
	    }, {
	      name: 'nama',
	      label: 'Nama',
	      content: nameTextBox,
	      validation: {
	        type: 'TEXTBOX',
	        rule: 'required'
	      }
	    }, {
	      name: 'tingkat',
	      label: 'Tingkat',
	      content: levelComboBox,
	      validation: {
	        type: 'COMBOBOX',
	        rule: 'required'
	      }
	    }];
	    var formOptions = {
	      items: formItems,
	      labelColumnWidth: '120px',
	      onValidationSuccess: function onValidationSuccess(formValue) {
	        $.ajax({
	          method: "POST",
	          url: "/students",
	          data: formValue
	        }).done(function () {
	          $("#successNotification").jqxNotification("open");
	          _this.window.close();
	          if (_this.onSaveSuccess) {
	            _this.onSaveSuccess();
	          }
	        }).fail(function (jqXHR, textStatus, errorThrown) {
	          var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
	          $("#errorNotification").html('<div>' + errorMessage + '</div>');
	          $("#errorNotification").jqxNotification("open");
	        });
	      }
	    };

	    var form = new _Form2.default(formOptions);

	    this.window = new _AddWindow2.default({
	      width: 390,
	      height: 250,
	      title: 'Tambah Siswa',
	      content: form,
	      onSave: function onSave() {
	        form.validate();
	      },
	      onCancel: function onCancel() {
	        _this.window.close();
	      }
	    });
	  }

	  _createClass(AddStudentWindow, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;
	      this.window.render(container);
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      this.window.open();
	    }
	  }]);

	  return AddStudentWindow;
	}();

	exports.default = AddStudentWindow;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _Form = __webpack_require__(16);

	var _Form2 = _interopRequireDefault(_Form);

	var _EditWindow = __webpack_require__(38);

	var _EditWindow2 = _interopRequireDefault(_EditWindow);

	var _TextBox = __webpack_require__(11);

	var _TextBox2 = _interopRequireDefault(_TextBox);

	var _Label = __webpack_require__(29);

	var _Label2 = _interopRequireDefault(_Label);

	var _LevelComboBox = __webpack_require__(14);

	var _LevelComboBox2 = _interopRequireDefault(_LevelComboBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EditStudentWindow = function () {
	  function EditStudentWindow(options) {
	    _classCallCheck(this, EditStudentWindow);

	    var _this = this;

	    this.id = (0, _Utils.guid)();

	    var student = options.data;
	    this.onSaveSuccess = options.onSaveSuccess;

	    var levelComboBox = new _LevelComboBox2.default({ value: student.tingkat });
	    var stambukLamaTextBox = new _TextBox2.default({ value: student.stambuk_lama, height: 25, width: '100%' });
	    var stambukBaruTextBox = new _TextBox2.default({ value: student.stambuk_baru, height: 25, width: '100%' });
	    var nameTextBox = new _TextBox2.default({ value: student.nama, height: 25, width: '100%' });

	    var formItems = [{
	      name: 'stambukLama',
	      label: 'Stambuk Lama',
	      content: stambukLamaTextBox,
	      validation: {
	        type: 'TEXTBOX',
	        rule: 'required'
	      }
	    }, {
	      name: 'stambukBaru',
	      label: 'Stambuk Baru',
	      content: stambukBaruTextBox,
	      validation: {
	        type: 'TEXTBOX',
	        rule: 'required'
	      }
	    }, {
	      name: 'nama',
	      label: 'Nama',
	      content: nameTextBox,
	      validation: {
	        type: 'TEXTBOX',
	        rule: 'required'
	      }
	    }, {
	      name: 'tingkat',
	      label: 'Tingkat',
	      content: levelComboBox,
	      validation: {
	        type: 'COMBOBOX',
	        rule: 'required'
	      }
	    }];
	    var formOptions = {
	      items: formItems,
	      labelColumnWidth: '120px',
	      onValidationSuccess: function onValidationSuccess(formValue) {
	        $.ajax({
	          method: "PUT",
	          url: "/students/" + student.id,
	          data: formValue
	        }).done(function () {
	          $("#successNotification").jqxNotification("open");
	          _this.window.close();
	          if (_this.onSaveSuccess) {
	            _this.onSaveSuccess();
	          }
	        }).fail(function (jqXHR, textStatus, errorThrown) {
	          var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
	          $("#errorNotification").html('<div>' + errorMessage + '</div>');
	          $("#errorNotification").jqxNotification("open");
	        });
	      }
	    };

	    var form = new _Form2.default(formOptions);

	    this.window = new _EditWindow2.default({
	      width: 390,
	      height: 250,
	      title: 'Edit Siswa',
	      content: form,
	      onSave: function onSave() {
	        form.validate();
	      },
	      onCancel: function onCancel() {
	        _this.window.close();
	      },
	      onDelete: function onDelete() {
	        var r = confirm("Proses hapus data akan dilakukan!");
	        if (r == true) {
	          $.ajax({
	            method: "DELETE",
	            url: "/students/" + student.id,
	            data: {}
	          }).done(function () {
	            $("#successNotification").jqxNotification("open");
	            _this.window.close();
	            if (_this.onSaveSuccess) {
	              _this.onSaveSuccess();
	            }
	          }).fail(function () {
	            var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
	            $("#errorNotification").html('<div>' + errorMessage + '</div>');
	            $("#errorNotification").jqxNotification("open");
	          });
	        }
	      }
	    });
	  }

	  _createClass(EditStudentWindow, [{
	    key: 'render',
	    value: function render(container) {
	      var _this = this;
	      this.window.render(container);
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      this.window.open();
	    }
	  }]);

	  return EditStudentWindow;
	}();

	exports.default = EditStudentWindow;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EditWindow = function () {
	  function EditWindow(options) {
	    _classCallCheck(this, EditWindow);

	    this.id = (0, _Utils.guid)();
	    this.content = options.content;

	    if (options.title) {
	      this.title = options.title;
	    } else {
	      this.title = '';
	    }

	    if (options.width) {
	      this.width = options.width;
	    }

	    if (options.height) {
	      this.height = options.height;
	    }

	    if (options.buttons) {} else {
	      this.deleteButton = new _Button2.default({
	        title: 'Delete',
	        template: 'danger',
	        onClick: function onClick() {
	          if (options.onDelete) {
	            options.onDelete();
	          }
	        }
	      });

	      this.saveButton = new _Button2.default({
	        title: 'Save',
	        template: 'success',
	        onClick: function onClick() {
	          if (options.onSave) {
	            options.onSave();
	          }
	        }
	      });

	      this.cancelButton = new _Button2.default({
	        title: 'Cancel',
	        onClick: function onClick() {
	          if (options.onCancel) {
	            options.onCancel();
	          }
	        }
	      });
	    }
	  }

	  _createClass(EditWindow, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var windowContainer = $('<div></div>');
	      windowContainer.appendTo(container);

	      windowContainer.attr('id', this.id);

	      var windowTitle = $('<div>' + this.title + '</div>');
	      windowTitle.appendTo(windowContainer);

	      var windowContent = $('<div></div>');
	      windowContent.appendTo(windowContainer);

	      var windowOptions = {
	        theme: 'metro',
	        isModal: true,
	        autoOpen: false
	      };

	      if (this.width) {
	        windowOptions['width'] = this.width;
	      }

	      if (this.height) {
	        windowOptions['height'] = this.height;
	      }

	      windowContainer.jqxWindow(windowOptions);

	      windowContainer.on('close', function (event) {
	        windowContainer.jqxWindow('destroy');
	      });

	      var table = $('<table style="height: 100%; width: 100%;"></table>');
	      var tr = $('<tr></tr>');
	      var td = $('<td></td>');
	      table.appendTo(windowContent);
	      tr.appendTo(table);
	      td.appendTo(tr);
	      this.content.render(td);

	      tr = $('<tr></tr>');
	      td = $('<td></td>');
	      tr.appendTo(table);
	      td.appendTo(tr);

	      var innerTable = $('<table style="height: 100%; width: 100%;"></table>');
	      var innerTr = $('<tr></tr>');
	      var innerTd = $('<td style="width: 90%;"></td>');
	      innerTable.appendTo(td);
	      innerTr.appendTo(innerTable);
	      innerTd.appendTo(innerTr);

	      innerTd = $('<td></td>');
	      innerTd.appendTo(innerTr);
	      innerTd.css('padding-right', '20px');
	      this.deleteButton.render(innerTd);

	      innerTd = $('<td></td>');
	      innerTd.appendTo(innerTr);
	      this.cancelButton.render(innerTd);

	      innerTd = $('<td></td>');
	      innerTd.appendTo(innerTr);
	      this.saveButton.render(innerTd);

	      this.windowContainer = windowContainer;
	    }
	  }, {
	    key: 'getId',
	    value: function getId() {
	      return this.id;
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      this.windowContainer.jqxWindow('open');
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      this.windowContainer.jqxWindow('close');
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.windowContainer.jqxWindow('destroy');
	    }
	  }]);

	  return EditWindow;
	}();

	exports.default = EditWindow;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _ToggleButton = __webpack_require__(10);

	var _ToggleButton2 = _interopRequireDefault(_ToggleButton);

	var _TextBox = __webpack_require__(11);

	var _TextBox2 = _interopRequireDefault(_TextBox);

	var _DataGrid = __webpack_require__(25);

	var _DataGrid2 = _interopRequireDefault(_DataGrid);

	var _AddHospitalWindow = __webpack_require__(40);

	var _AddHospitalWindow2 = _interopRequireDefault(_AddHospitalWindow);

	var _EditHospitalWindow = __webpack_require__(42);

	var _EditHospitalWindow2 = _interopRequireDefault(_EditHospitalWindow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HospitalList = function () {
	  function HospitalList() {
	    _classCallCheck(this, HospitalList);

	    this.id = (0, _Utils.guid)();
	  }

	  _createClass(HospitalList, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var url = "/hospitals";

	      var source = {
	        datatype: "json",
	        datafields: [{ name: 'id', type: 'int' }, { name: 'kode', type: 'string' }, { name: 'nama', type: 'string' }, { name: 'tipe', type: 'string' }],
	        id: "id",
	        url: url
	      };

	      var onSearch = function onSearch(data) {
	        data['searchTxt'] = searchTextBox.getValue();
	        return data;
	      };

	      var dataGridOptions = {
	        width: '100%',
	        height: '100%',
	        pageable: true,
	        altrows: true,
	        theme: 'metro',
	        virtualmode: true,
	        rendergridrows: function rendergridrows(params) {
	          return params.data;
	        },
	        columns: [{ text: 'Kode', datafield: 'kode', width: '33.33%' }, { text: 'Nama', datafield: 'nama', width: '33.33%' }, { text: 'Tipe', datafield: 'tipe', width: '33.33%',
	          cellsrenderer: function cellsrenderer(row, columnfield, value, defaulthtml, columnproperties) {
	            if (value == 1) {
	              return '<div style="margin-top: 5px;">Rumah Sakit</div>';
	            } else if (value == 2) {
	              return '<div style="margin-top: 5px;">Puskesmas</div>';
	            } else {
	              return '';
	            }
	          } }],
	        groups: []
	      };

	      this.dataGrid = new _DataGrid2.default({
	        source: source,
	        onSearch: onSearch,
	        onRowDoubleClick: function onRowDoubleClick(data) {
	          var editHospitalWindow = new _EditHospitalWindow2.default({
	            data: data,
	            onSaveSuccess: function onSaveSuccess() {
	              _this.dataGrid.refresh();
	            }
	          });
	          editHospitalWindow.render($('#dialogWindowContainer'));
	          editHospitalWindow.open();
	        },
	        dataGridOptions: dataGridOptions
	      });

	      var searchTextBox = new _TextBox2.default({ placeHolder: 'Kode atau Nama', width: 250, height: 24 });
	      var searchButton = new _Button2.default({
	        imgSrc: '/ceu_assets/images/search.png',
	        theme: 'metro',
	        width: 30,
	        height: 26,
	        onClick: function onClick() {
	          _this.dataGrid.refresh();
	        }
	      });

	      var addHospitalButton = new _Button2.default({
	        title: 'Tambah RS',
	        template: 'primary',
	        height: 26,
	        onClick: function onClick() {
	          var addHospitalWindow = new _AddHospitalWindow2.default({
	            onSaveSuccess: function onSaveSuccess() {
	              _this.dataGrid.refresh();
	            }
	          });
	          addHospitalWindow.render($('#dialogWindowContainer'));
	          addHospitalWindow.open();
	        }
	      });

	      var table = $('<table style="height: 100%; width: 100%; margin: -3px; "></table>');
	      var tr = $('<tr></tr>');
	      var td = $('<td style="padding: 0; height: 40px;"></td>');
	      table.appendTo(container);
	      tr.appendTo(table);
	      td.appendTo(tr);

	      var innerTable = $('<table style="height: 100%; width: 100%;"></table>');
	      var innerTr = $('<tr></tr>');
	      var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; padding-right: 8px; width: 50px; height: 100%;"></td>');
	      innerTable.appendTo(td);
	      innerTr.appendTo(innerTable);
	      innerTd.appendTo(innerTr);
	      addHospitalButton.render(innerTd);

	      innerTd = $('<td style="padding-top: 6px; width: 200px; height: 100%;"></td>');
	      innerTd.appendTo(innerTr);
	      searchTextBox.render(innerTd);

	      innerTd = $('<td style="padding-top: 6px; height: 100%; "></td>');
	      var _tempContainer = $('<div style="margin-left: -5px;"></div>');
	      _tempContainer.appendTo(innerTd);
	      innerTd.appendTo(innerTr);
	      searchButton.render(_tempContainer);

	      tr = $('<tr></tr>');
	      td = $('<td style="padding: 0;"></td>');
	      tr.appendTo(table);
	      td.appendTo(tr);

	      this.dataGrid.render(td);
	    }
	  }]);

	  return HospitalList;
	}();

	exports.default = HospitalList;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _Form = __webpack_require__(16);

	var _Form2 = _interopRequireDefault(_Form);

	var _AddWindow = __webpack_require__(17);

	var _AddWindow2 = _interopRequireDefault(_AddWindow);

	var _TextBox = __webpack_require__(11);

	var _TextBox2 = _interopRequireDefault(_TextBox);

	var _Label = __webpack_require__(29);

	var _Label2 = _interopRequireDefault(_Label);

	var _HospitalTypeComboBox = __webpack_require__(41);

	var _HospitalTypeComboBox2 = _interopRequireDefault(_HospitalTypeComboBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AddHospitalWindow = function () {
	  function AddHospitalWindow(options) {
	    _classCallCheck(this, AddHospitalWindow);

	    var _this = this;

	    this.id = (0, _Utils.guid)();

	    var hospital = options.data;
	    this.onSaveSuccess = options.onSaveSuccess;

	    var hospitalTypeComboBox = new _HospitalTypeComboBox2.default({});
	    var codeTextBox = new _TextBox2.default({ height: 25, width: '100%' });
	    var nameTextBox = new _TextBox2.default({ height: 25, width: '100%' });

	    var formItems = [{
	      name: 'kode',
	      label: 'Kode',
	      content: codeTextBox,
	      validation: {
	        type: 'TEXTBOX',
	        rule: 'required'
	      }
	    }, {
	      name: 'nama',
	      label: 'Nama',
	      content: nameTextBox,
	      validation: {
	        type: 'TEXTBOX',
	        rule: 'required'
	      }
	    }, {
	      name: 'tipe',
	      label: 'Tipe',
	      content: hospitalTypeComboBox,
	      validation: {
	        type: 'COMBOBOX',
	        rule: 'required'
	      }
	    }];
	    var formOptions = {
	      items: formItems,
	      labelColumnWidth: '120px',
	      onValidationSuccess: function onValidationSuccess(formValue) {
	        $.ajax({
	          method: "POST",
	          url: "/hospitals",
	          data: formValue
	        }).done(function () {
	          $("#successNotification").jqxNotification("open");
	          _this.window.close();
	          if (_this.onSaveSuccess) {
	            _this.onSaveSuccess();
	          }
	        }).fail(function (jqXHR, textStatus, errorThrown) {
	          var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
	          $("#errorNotification").html('<div>' + errorMessage + '</div>');
	          $("#errorNotification").jqxNotification("open");
	        });
	      }
	    };

	    var form = new _Form2.default(formOptions);

	    this.window = new _AddWindow2.default({
	      width: 370,
	      height: 230,
	      title: 'Tambah Rumah Sakit',
	      content: form,
	      onSave: function onSave() {
	        form.validate();
	      },
	      onCancel: function onCancel() {
	        _this.window.close();
	      }
	    });
	  }

	  _createClass(AddHospitalWindow, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;
	      this.window.render(container);
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      this.window.open();
	    }
	  }]);

	  return AddHospitalWindow;
	}();

	exports.default = AddHospitalWindow;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _ComboBox = __webpack_require__(12);

	var _ComboBox2 = _interopRequireDefault(_ComboBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HospitalTypeComboBox = function () {
	  function HospitalTypeComboBox(options) {
	    _classCallCheck(this, HospitalTypeComboBox);

	    var _this = this;

	    this.id = (0, _Utils.guid)();

	    var typeList = [{ id: '1', nama: 'Rumah Sakit' }, { id: '2', nama: "Puskesmas" }];
	    var comboBoxOptions = {
	      displayMember: "nama",
	      valueMember: "id",
	      selectedIndex: 0,
	      width: '100%',
	      height: 25,
	      theme: 'metro',
	      selectionMode: 'dropDownList'
	    };

	    this.comboBox = new _ComboBox2.default({
	      localData: typeList,
	      value: options.value,
	      comboBoxOptions: comboBoxOptions,
	      onChange: function onChange(value) {
	        if (options.onChange) {
	          options.onChange(value);
	        }
	      }
	    });
	  }

	  _createClass(HospitalTypeComboBox, [{
	    key: 'getId',
	    value: function getId() {
	      return this.comboBox.getId();
	    }
	  }, {
	    key: 'render',
	    value: function render(container) {
	      this.comboBox.render(container);
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.comboBox.getValue();
	    }
	  }]);

	  return HospitalTypeComboBox;
	}();

	exports.default = HospitalTypeComboBox;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _Form = __webpack_require__(16);

	var _Form2 = _interopRequireDefault(_Form);

	var _EditWindow = __webpack_require__(38);

	var _EditWindow2 = _interopRequireDefault(_EditWindow);

	var _TextBox = __webpack_require__(11);

	var _TextBox2 = _interopRequireDefault(_TextBox);

	var _Label = __webpack_require__(29);

	var _Label2 = _interopRequireDefault(_Label);

	var _HospitalTypeComboBox = __webpack_require__(41);

	var _HospitalTypeComboBox2 = _interopRequireDefault(_HospitalTypeComboBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EditHospitalWindow = function () {
	  function EditHospitalWindow(options) {
	    _classCallCheck(this, EditHospitalWindow);

	    var _this = this;

	    this.id = (0, _Utils.guid)();

	    var hospital = options.data;
	    this.onSaveSuccess = options.onSaveSuccess;

	    var hospitalTypeComboBox = new _HospitalTypeComboBox2.default({ value: hospital.tipe });
	    var codeTextBox = new _TextBox2.default({ value: hospital.kode, height: 25, width: '100%' });
	    var nameTextBox = new _TextBox2.default({ value: hospital.nama, height: 25, width: '100%' });

	    var formItems = [{
	      name: 'kode',
	      label: 'Kode',
	      content: codeTextBox,
	      validation: {
	        type: 'TEXTBOX',
	        rule: 'required'
	      }
	    }, {
	      name: 'nama',
	      label: 'Nama',
	      content: nameTextBox,
	      validation: {
	        type: 'TEXTBOX',
	        rule: 'required'
	      }
	    }, {
	      name: 'tipe',
	      label: 'Tipe',
	      content: hospitalTypeComboBox,
	      validation: {
	        type: 'COMBOBOX',
	        rule: 'required'
	      }
	    }];
	    var formOptions = {
	      items: formItems,
	      labelColumnWidth: '120px',
	      onValidationSuccess: function onValidationSuccess(formValue) {
	        $.ajax({
	          method: "PUT",
	          url: "/hospitals/" + hospital.id,
	          data: formValue
	        }).done(function () {
	          $("#successNotification").jqxNotification("open");
	          _this.window.close();
	          if (_this.onSaveSuccess) {
	            _this.onSaveSuccess();
	          }
	        }).fail(function (jqXHR, textStatus, errorThrown) {
	          var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
	          $("#errorNotification").html('<div>' + errorMessage + '</div>');
	          $("#errorNotification").jqxNotification("open");
	        });
	      }
	    };

	    var form = new _Form2.default(formOptions);

	    this.window = new _EditWindow2.default({
	      width: 390,
	      height: 250,
	      title: 'Edit Siswa',
	      content: form,
	      onSave: function onSave() {
	        form.validate();
	      },
	      onCancel: function onCancel() {
	        _this.window.close();
	      },
	      onDelete: function onDelete() {
	        var r = confirm("Proses hapus data akan dilakukan!");
	        if (r == true) {
	          $.ajax({
	            method: "DELETE",
	            url: "/hospitals/" + hospital.id,
	            data: {}
	          }).done(function () {
	            $("#successNotification").jqxNotification("open");
	            _this.window.close();
	            if (_this.onSaveSuccess) {
	              _this.onSaveSuccess();
	            }
	          }).fail(function () {
	            var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
	            $("#errorNotification").html('<div>' + errorMessage + '</div>');
	            $("#errorNotification").jqxNotification("open");
	          });
	        }
	      }
	    });
	  }

	  _createClass(EditHospitalWindow, [{
	    key: 'render',
	    value: function render(container) {
	      var _this = this;
	      this.window.render(container);
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      this.window.open();
	    }
	  }]);

	  return EditHospitalWindow;
	}();

	exports.default = EditHospitalWindow;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _TextBox = __webpack_require__(11);

	var _TextBox2 = _interopRequireDefault(_TextBox);

	var _Docking = __webpack_require__(44);

	var _Docking2 = _interopRequireDefault(_Docking);

	var _Window = __webpack_require__(28);

	var _Window2 = _interopRequireDefault(_Window);

	var _Label = __webpack_require__(29);

	var _Label2 = _interopRequireDefault(_Label);

	var _DateRange = __webpack_require__(18);

	var _DateRange2 = _interopRequireDefault(_DateRange);

	var _HospitalDockingGrid = __webpack_require__(45);

	var _HospitalDockingGrid2 = _interopRequireDefault(_HospitalDockingGrid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HospitalScheduleView = function () {
	  function HospitalScheduleView() {
	    _classCallCheck(this, HospitalScheduleView);

	    this.id = (0, _Utils.guid)();
	  }

	  _createClass(HospitalScheduleView, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var url = "";

	      var searchTextBox = new _TextBox2.default({ placeHolder: 'Stambuk atau Nama', width: 250, height: 24 });
	      var searchButton = new _Button2.default({
	        imgSrc: '/ceu_assets/images/search.png',
	        theme: 'metro',
	        width: 30,
	        height: 27,
	        onClick: function onClick() {

	          for (var i = 0; i < _this.dockingGrids.length; i++) {
	            _this.dockingGrids[i].reloadByDateRange(dateRange.getValue());
	          }
	        }
	      });

	      var dateRange = new _DateRange2.default({});

	      var table = $('<table style="height: 100%; width: 100%; margin: -3px; "></table>');
	      var tr = $('<tr></tr>');
	      var td = $('<td style="padding: 0; height: 40px;"></td>');
	      table.appendTo(container);
	      tr.appendTo(table);
	      td.appendTo(tr);

	      var innerTable = $('<table style="height: 100%; width: 100%;"></table>');
	      var innerTr = $('<tr></tr>');
	      var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; padding-right: 8px; width: 200px; height: 100%;"></td>');
	      innerTable.appendTo(td);
	      innerTr.appendTo(innerTable);
	      innerTd.appendTo(innerTr);
	      dateRange.render(innerTd);

	      innerTd = $('<td style="padding-top: 6px; height: 100%; "></td>');
	      var _tempContainer = $('<div style="margin-left: -5px;"></div>');
	      _tempContainer.appendTo(innerTd);
	      innerTd.appendTo(innerTr);
	      searchButton.render(_tempContainer);

	      tr = $('<tr></tr>');
	      td = $('<td style="padding: 0;"></td>');
	      tr.appendTo(table);
	      td.appendTo(tr);

	      var loadHospitals = function loadHospitals() {
	        var url = "/hospitals/hospitals_all";
	        $.ajax({
	          method: "GET",
	          url: url,
	          data: {}
	        }).done(function (data) {
	          renderHospitalList(data);
	        }).fail(function () {
	          var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
	          $("#errorNotification").html('<div>' + errorMessage + '</div>');
	          $("#errorNotification").jqxNotification("open");
	        });
	      };

	      var renderHospitalList = function renderHospitalList(hospitals) {

	        var dockingItems = [];
	        var dockingGrids = [];
	        for (var i = 0; i < hospitals.length; i++) {
	          var hospitalDockingGrid = new _HospitalDockingGrid2.default(hospitals[i].id, hospitals[i].tipe, dateRange.getValue());
	          var color = '#4A90E2';
	          if (hospitals[i].tipe == 1) {
	            color = '#4A90E2';
	          } else if (hospitals[i].tipe == 2) {
	            color = '#BB8FCE';
	          }
	          dockingItems.push({
	            title: hospitals[i].nama,
	            color: color,
	            content: hospitalDockingGrid
	          });
	          dockingGrids.push(hospitalDockingGrid);
	        }

	        var docking = new _Docking2.default({
	          items: dockingItems,
	          itemsCountPerColumn: 6
	        });

	        _this.dockingGrids = dockingGrids;
	        docking.render(td);
	      };

	      loadHospitals();
	    }
	  }]);

	  return HospitalScheduleView;
	}();

	exports.default = HospitalScheduleView;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Docking = function () {
	  function Docking(options) {
	    _classCallCheck(this, Docking);

	    this.id = (0, _Utils.guid)();
	    this.items = options.items;
	    this.itemsCountPerColumn = options.itemsCountPerColumn;

	    if (this.itemsCountPerColumn == undefined) {
	      this.itemsCountPerColumn = 3;
	    }
	  }

	  _createClass(Docking, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var dockingContainer = $('<div></div>');
	      dockingContainer.appendTo(container);

	      var innerDockingContainer = $('<div></div>');
	      innerDockingContainer.appendTo(dockingContainer);

	      for (var i = 0; i < this.items.length; i++) {
	        if (i > 0 && i % _this.itemsCountPerColumn == 0) {
	          innerDockingContainer = $('<div></div>');
	          innerDockingContainer.appendTo(dockingContainer);
	        }

	        var portletContainer = $('<div style="height: 500px; padding: 0;"></div>');
	        portletContainer.appendTo(innerDockingContainer);
	        var portletTitle = $('<div>' + this.items[i].title + '</div>');
	        portletTitle.css('font-weight', 'bold');

	        if (this.items[i].color) {
	          portletTitle.css('color', this.items[i].color);
	        }

	        portletTitle.appendTo(portletContainer);
	        var portletBody = $('<div style="overflow: hidden; padding: 0;"></div>');
	        portletBody.appendTo(portletContainer);
	        this.items[i].content.render(portletBody);
	      }

	      dockingContainer.jqxDocking({
	        theme: 'metro',
	        orientation: 'horizontal',
	        mode: 'docked',
	        width: '100%',
	        height: '100%'
	      });
	    }
	  }]);

	  return Docking;
	}();

	exports.default = Docking;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _ToggleButton = __webpack_require__(10);

	var _ToggleButton2 = _interopRequireDefault(_ToggleButton);

	var _TextBox = __webpack_require__(11);

	var _TextBox2 = _interopRequireDefault(_TextBox);

	var _DataGrid = __webpack_require__(25);

	var _DataGrid2 = _interopRequireDefault(_DataGrid);

	var _AddStudentWindow = __webpack_require__(36);

	var _AddStudentWindow2 = _interopRequireDefault(_AddStudentWindow);

	var _EditStudentWindow = __webpack_require__(37);

	var _EditStudentWindow2 = _interopRequireDefault(_EditStudentWindow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HospitalDockingGrid = function () {
	  function HospitalDockingGrid(hospitalId, hospitalType, dateRange) {
	    _classCallCheck(this, HospitalDockingGrid);

	    this.id = (0, _Utils.guid)();
	    this.hospitalId = hospitalId;
	    this.hospitalType = hospitalType;
	    this.dateRange = dateRange;
	  }

	  _createClass(HospitalDockingGrid, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var url = "/hospitals/" + this.hospitalId + "/students";

	      var source = {
	        datatype: "json",
	        datafields: [{ name: 'id', type: 'int' }, { name: 'siswa_id', type: 'int' }, { name: 'bagian_id', type: 'int' }, { name: 'nama_siswa', type: 'string' }, { name: 'nama_bagian', type: 'string' }, { name: 'tingkat', type: 'int' }],
	        id: "siswa_id",
	        url: url
	      };

	      var onSearch = function onSearch(data) {
	        data['searchDate'] = _this.dateRange;
	        data['hospitalType'] = _this.hospitalType;
	        return data;
	      };

	      var dataGridOptions = {
	        width: '100%',
	        height: '100%',
	        pageable: false,
	        altrows: true,
	        theme: 'metro',
	        columns: [{ text: 'Nama', datafield: 'nama_siswa', width: '50%' }, { text: 'Bagian', datafield: 'nama_bagian', width: '50%' }],
	        groupable: true,
	        groups: ['nama_bagian']
	      };

	      this.dataGrid = new _DataGrid2.default({
	        source: source,
	        onSearch: onSearch,
	        dataGridOptions: dataGridOptions
	      });

	      var internalContainer = $('<div></div>');
	      internalContainer.css('width', '100%');
	      internalContainer.css('height', '100%');
	      internalContainer.appendTo(container);
	      this.dataGrid.render(internalContainer);
	    }
	  }, {
	    key: 'reloadByDateRange',
	    value: function reloadByDateRange(dateRange) {
	      this.dateRange = dateRange;
	      this.dataGrid.refresh();
	      this.dataGrid.addGroup('nama_bagian');
	    }
	  }]);

	  return HospitalDockingGrid;
	}();

	exports.default = HospitalDockingGrid;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _TextBox = __webpack_require__(11);

	var _TextBox2 = _interopRequireDefault(_TextBox);

	var _Docking = __webpack_require__(44);

	var _Docking2 = _interopRequireDefault(_Docking);

	var _Window = __webpack_require__(28);

	var _Window2 = _interopRequireDefault(_Window);

	var _Label = __webpack_require__(29);

	var _Label2 = _interopRequireDefault(_Label);

	var _DateRange = __webpack_require__(18);

	var _DateRange2 = _interopRequireDefault(_DateRange);

	var _HospitalDockingGrid = __webpack_require__(45);

	var _HospitalDockingGrid2 = _interopRequireDefault(_HospitalDockingGrid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ClinicScheduleView = function () {
	  function ClinicScheduleView() {
	    _classCallCheck(this, ClinicScheduleView);

	    this.id = (0, _Utils.guid)();
	  }

	  _createClass(ClinicScheduleView, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var url = "";

	      var searchTextBox = new _TextBox2.default({ placeHolder: 'Stambuk atau Nama', width: 250, height: 24 });
	      var searchButton = new _Button2.default({
	        imgSrc: '/ceu_assets/images/search.png',
	        theme: 'metro',
	        width: 30,
	        height: 27,
	        onClick: function onClick() {

	          for (var i = 0; i < _this.dockingGrids.length; i++) {
	            _this.dockingGrids[i].reloadByDateRange(dateRange.getValue());
	          }
	        }
	      });

	      var dateRange = new _DateRange2.default({});

	      var table = $('<table style="height: 100%; width: 100%; margin: -3px; "></table>');
	      var tr = $('<tr></tr>');
	      var td = $('<td style="padding: 0; height: 40px;"></td>');
	      table.appendTo(container);
	      tr.appendTo(table);
	      td.appendTo(tr);

	      var innerTable = $('<table style="height: 100%; width: 100%;"></table>');
	      var innerTr = $('<tr></tr>');
	      var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; padding-right: 8px; width: 200px; height: 100%;"></td>');
	      innerTable.appendTo(td);
	      innerTr.appendTo(innerTable);
	      innerTd.appendTo(innerTr);
	      dateRange.render(innerTd);

	      innerTd = $('<td style="padding-top: 6px; height: 100%; "></td>');
	      var _tempContainer = $('<div style="margin-left: -5px;"></div>');
	      _tempContainer.appendTo(innerTd);
	      innerTd.appendTo(innerTr);
	      searchButton.render(_tempContainer);

	      tr = $('<tr></tr>');
	      td = $('<td style="padding: 0;"></td>');
	      tr.appendTo(table);
	      td.appendTo(tr);

	      var loadHospitals = function loadHospitals() {
	        var url = "/hospitals/clinics_all";
	        $.ajax({
	          method: "GET",
	          url: url,
	          data: {}
	        }).done(function (data) {
	          renderHospitalList(data);
	        }).fail(function () {
	          var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
	          $("#errorNotification").html('<div>' + errorMessage + '</div>');
	          $("#errorNotification").jqxNotification("open");
	        });
	      };

	      var renderHospitalList = function renderHospitalList(hospitals) {

	        var dockingItems = [];
	        var dockingGrids = [];
	        for (var i = 0; i < hospitals.length; i++) {
	          var hospitalDockingGrid = new _HospitalDockingGrid2.default(hospitals[i].id, hospitals[i].tipe, dateRange.getValue());
	          var color = '#4A90E2';
	          if (hospitals[i].tipe == 1) {
	            color = '#4A90E2';
	          } else if (hospitals[i].tipe == 2) {
	            color = '#BB8FCE';
	          }
	          dockingItems.push({
	            title: hospitals[i].nama,
	            color: color,
	            content: hospitalDockingGrid
	          });
	          dockingGrids.push(hospitalDockingGrid);
	        }

	        var docking = new _Docking2.default({
	          items: dockingItems,
	          itemsCountPerColumn: 6
	        });

	        _this.dockingGrids = dockingGrids;
	        docking.render(td);
	      };

	      loadHospitals();
	    }
	  }]);

	  return ClinicScheduleView;
	}();

	exports.default = ClinicScheduleView;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _TextBox = __webpack_require__(11);

	var _TextBox2 = _interopRequireDefault(_TextBox);

	var _DataGrid = __webpack_require__(25);

	var _DataGrid2 = _interopRequireDefault(_DataGrid);

	var _DateRange = __webpack_require__(18);

	var _DateRange2 = _interopRequireDefault(_DateRange);

	var _HospitalComboBox = __webpack_require__(31);

	var _HospitalComboBox2 = _interopRequireDefault(_HospitalComboBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CostUnitReport = function () {
	  function CostUnitReport() {
	    _classCallCheck(this, CostUnitReport);

	    this.id = (0, _Utils.guid)();
	  }

	  _createClass(CostUnitReport, [{
	    key: 'render',
	    value: function render(container) {

	      var _this = this;

	      var url = "/reporting/costunit";

	      var source = {
	        datatype: "json",
	        datafields: [{ name: 'id', type: 'int' }, { name: 'bagian_id', type: 'int' }, { name: 'nama_bagian', type: 'string' }, { name: 'nama_siswa', type: 'string' }, { name: 'lama', type: 'int' }, { name: 'fee1', type: 'float' }, { name: 'fee2', type: 'float' }, { name: 'fee3', type: 'float' }, { name: 'fee4', type: 'float' }, { name: 'fee5', type: 'float' }, { name: 'fee6', type: 'float' }, { name: 'fee7', type: 'float' }, { name: 'total', type: 'float' }],
	        id: "id",
	        url: url
	      };

	      var onSearch = function onSearch(data) {
	        data['hospital'] = hospitalComboBox.getValue();
	        data['searchDate'] = dateRange.getValue();
	        return data;
	      };

	      var _columnWidth = 100 / 11 + '%';

	      var dataGridOptions = {
	        width: '100%',
	        height: '100%',
	        pageable: true,
	        altrows: true,
	        theme: 'metro',
	        showstatusbar: true,
	        statusbarheight: 30,
	        showaggregates: true,
	        columns: [{ text: 'Bagian', datafield: 'nama_bagian', width: _columnWidth }, { text: 'Lama (MGG)', datafield: 'lama', width: _columnWidth }, { text: 'Nama', datafield: 'nama_siswa', width: _columnWidth }, { text: 'NST. Fee / MGG (75rb)', cellsalign: 'right', cellsformat: 'd2', datafield: 'fee1', aggregates: ['sum'], width: _columnWidth }, { text: 'DIR (20rb)', cellsalign: 'right', cellsformat: 'd2', datafield: 'fee2', aggregates: ['sum'], width: _columnWidth }, { text: 'BKD (20rb)', cellsalign: 'right', cellsformat: 'd2', datafield: 'fee3', aggregates: ['sum'], width: _columnWidth }, { text: 'KDI (5rb)', cellsalign: 'right', cellsformat: 'd2', datafield: 'fee4', aggregates: ['sum'], width: _columnWidth }, { text: 'DPK (50rb)', cellsalign: 'right', cellsformat: 'd2', datafield: 'fee5', aggregates: ['sum'], width: _columnWidth }, { text: 'PEMBBG (50rb)', cellsalign: 'right', cellsformat: 'd2', datafield: 'fee6', aggregates: ['sum'], width: _columnWidth }, { text: 'Penguji (100rb)', cellsalign: 'right', cellsformat: 'd2', datafield: 'fee7', aggregates: ['sum'], width: _columnWidth }, { text: 'Total', cellsalign: 'right', cellsformat: 'd2', datafield: 'total', aggregates: ['sum'], width: _columnWidth }],
	        groups: []
	      };

	      this.dataGrid = new _DataGrid2.default({
	        source: source,
	        onSearch: onSearch,
	        onRowDoubleClick: function onRowDoubleClick(data) {},
	        dataGridOptions: dataGridOptions
	      });

	      var searchTextBox = new _TextBox2.default({ placeHolder: 'Stambuk atau Nama', width: 250, height: 24 });
	      var searchButton = new _Button2.default({
	        imgSrc: '/ceu_assets/images/search.png',
	        theme: 'metro',
	        width: 30,
	        height: 27,
	        onClick: function onClick() {
	          var hospital = hospitalComboBox.getValue();
	          if (hospital) {
	            _this.dataGrid.refresh();
	          } else {
	            alert('Rumah sakit harus diisi');
	          }
	        }
	      });

	      var hospitalComboBox = new _HospitalComboBox2.default({});
	      var dateRange = new _DateRange2.default({});

	      var table = $('<table style="height: 100%; width: 100%; margin: -3px; "></table>');
	      var tr = $('<tr></tr>');
	      var td = $('<td style="padding: 0; height: 40px;"></td>');
	      table.appendTo(container);
	      tr.appendTo(table);
	      td.appendTo(tr);

	      var innerTable = $('<table style="height: 100%; width: 100%;"></table>');
	      var innerTr = $('<tr></tr>');
	      var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; padding-right: 8px; width: 200px; height: 100%;"></td>');
	      innerTable.appendTo(td);
	      innerTr.appendTo(innerTable);
	      innerTd.appendTo(innerTr);
	      hospitalComboBox.render(innerTd);

	      innerTd = $('<td style="padding-top: 6px; width: 200px; height: 100%;"></td>');
	      innerTd.appendTo(innerTr);
	      dateRange.render(innerTd);

	      innerTd = $('<td style="padding-top: 6px; height: 100%; "></td>');
	      var _tempContainer = $('<div style="margin-left: -5px;"></div>');
	      _tempContainer.appendTo(innerTd);
	      innerTd.appendTo(innerTr);
	      searchButton.render(_tempContainer);

	      tr = $('<tr></tr>');
	      td = $('<td style="padding: 0;"></td>');
	      tr.appendTo(table);
	      td.appendTo(tr);

	      this.dataGrid.render(td);
	    }
	  }]);

	  return CostUnitReport;
	}();

	exports.default = CostUnitReport;

/***/ }
/******/ ]);