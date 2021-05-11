(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/users/Users.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/users/Users.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ \"./node_modules/core-js/modules/es.number.constructor.js\");\n/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _UsersData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UsersData */ \"./src/views/users/UsersData.js\");\n\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Users',\n  data: function data() {\n    return {\n      items: _UsersData__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n      fields: [{\n        key: 'username',\n        label: 'Name',\n        _classes: 'font-weight-bold'\n      }, {\n        key: 'registered'\n      }, {\n        key: 'role'\n      }, {\n        key: 'status'\n      }],\n      activePage: 1\n    };\n  },\n  watch: {\n    $route: {\n      immediate: true,\n      handler: function handler(route) {\n        if (route.query && route.query.page) {\n          this.activePage = Number(route.query.page);\n        }\n      }\n    }\n  },\n  methods: {\n    getBadge: function getBadge(status) {\n      switch (status) {\n        case 'Active':\n          return 'success';\n\n        case 'Inactive':\n          return 'secondary';\n\n        case 'Pending':\n          return 'warning';\n\n        case 'Banned':\n          return 'danger';\n\n        default:\n          'primary';\n      }\n    },\n    rowClicked: function rowClicked(item, index) {\n      this.$router.push({\n        path: \"users/\".concat(index + 1)\n      });\n    },\n    pageChange: function pageChange(val) {\n      this.$router.push({\n        query: {\n          page: val\n        }\n      });\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/views/users/Users.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5ee874f8-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/users/Users.vue?vue&type=template&id=bc6b9b12&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5ee874f8-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/users/Users.vue?vue&type=template&id=bc6b9b12& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"CRow\",\n    [\n      _c(\n        \"CCol\",\n        { attrs: { col: \"12\", xl: \"8\" } },\n        [\n          _c(\n            \"CCard\",\n            [\n              _c(\"CCardHeader\", [_vm._v(\" Users \")]),\n              _c(\n                \"CCardBody\",\n                [\n                  _c(\"CDataTable\", {\n                    attrs: {\n                      hover: \"\",\n                      striped: \"\",\n                      items: _vm.items,\n                      fields: _vm.fields,\n                      \"items-per-page\": 5,\n                      \"clickable-rows\": \"\",\n                      \"active-page\": _vm.activePage,\n                      pagination: { doubleArrows: false, align: \"center\" }\n                    },\n                    on: {\n                      \"row-clicked\": _vm.rowClicked,\n                      \"page-change\": _vm.pageChange\n                    },\n                    scopedSlots: _vm._u([\n                      {\n                        key: \"status\",\n                        fn: function(data) {\n                          return [\n                            _c(\n                              \"td\",\n                              [\n                                _c(\n                                  \"CBadge\",\n                                  {\n                                    attrs: {\n                                      color: _vm.getBadge(data.item.status)\n                                    }\n                                  },\n                                  [_vm._v(\" \" + _vm._s(data.item.status) + \" \")]\n                                )\n                              ],\n                              1\n                            )\n                          ]\n                        }\n                      }\n                    ])\n                  })\n                ],\n                1\n              )\n            ],\n            1\n          )\n        ],\n        1\n      )\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/views/users/Users.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%225ee874f8-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/views/users/Users.vue":
/*!***********************************!*\
  !*** ./src/views/users/Users.vue ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_vue_vue_type_template_id_bc6b9b12___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Users.vue?vue&type=template&id=bc6b9b12& */ \"./src/views/users/Users.vue?vue&type=template&id=bc6b9b12&\");\n/* harmony import */ var _Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Users.vue?vue&type=script&lang=js& */ \"./src/views/users/Users.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Users_vue_vue_type_template_id_bc6b9b12___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Users_vue_vue_type_template_id_bc6b9b12___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/views/users/Users.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/views/users/Users.vue?");

/***/ }),

/***/ "./src/views/users/Users.vue?vue&type=script&lang=js&":
/*!************************************************************!*\
  !*** ./src/views/users/Users.vue?vue&type=script&lang=js& ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../../node_modules/babel-loader/lib!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Users.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/users/Users.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/views/users/Users.vue?");

/***/ }),

/***/ "./src/views/users/Users.vue?vue&type=template&id=bc6b9b12&":
/*!******************************************************************!*\
  !*** ./src/views/users/Users.vue?vue&type=template&id=bc6b9b12& ***!
  \******************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5ee874f8_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_bc6b9b12___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5ee874f8-vue-loader-template\"}!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Users.vue?vue&type=template&id=bc6b9b12& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"5ee874f8-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/users/Users.vue?vue&type=template&id=bc6b9b12&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5ee874f8_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_bc6b9b12___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5ee874f8_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_bc6b9b12___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/views/users/Users.vue?");

/***/ }),

/***/ "./src/views/users/UsersData.js":
/*!**************************************!*\
  !*** ./src/views/users/UsersData.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar usersData = [{\n  username: 'Samppa Nori',\n  registered: '2012/01/01',\n  role: 'Member',\n  status: 'Active'\n}, {\n  username: 'Estavan Lykos',\n  registered: '2012/02/01',\n  role: 'Staff',\n  status: 'Banned'\n}, {\n  username: 'Chetan Mohamed',\n  registered: '2012/02/01',\n  role: 'Admin',\n  status: 'Inactive'\n}, {\n  username: 'Derick Maximinus',\n  registered: '2012/03/01',\n  role: 'Member',\n  status: 'Pending'\n}, {\n  username: 'Friderik Dávid',\n  registered: '2012/01/21',\n  role: 'Staff',\n  status: 'Active'\n}, {\n  username: 'Yiorgos Avraamu',\n  registered: '2012/01/01',\n  role: 'Member',\n  status: 'Active'\n}, {\n  username: 'Avram Tarasios',\n  registered: '2012/02/01',\n  role: 'Staff',\n  status: 'Banned',\n  _classes: 'table-success'\n}, {\n  username: 'Quintin Ed',\n  registered: '2012/02/01',\n  role: 'Admin',\n  status: 'Inactive'\n}, {\n  username: 'Enéas Kwadwo',\n  registered: '2012/03/01',\n  role: 'Member',\n  status: 'Pending'\n}, {\n  username: 'Agapetus Tadeáš',\n  registered: '2012/01/21',\n  role: 'Staff',\n  status: 'Active'\n}, {\n  username: 'Carwyn Fachtna',\n  registered: '2012/01/01',\n  role: 'Member',\n  status: 'Active',\n  _classes: 'table-success'\n}, {\n  username: 'Nehemiah Tatius',\n  registered: '2012/02/01',\n  role: 'Staff',\n  status: 'Banned'\n}, {\n  username: 'Ebbe Gemariah',\n  registered: '2012/02/01',\n  role: 'Admin',\n  status: 'Inactive'\n}, {\n  username: 'Eustorgios Amulius',\n  registered: '2012/03/01',\n  role: 'Member',\n  status: 'Pending'\n}, {\n  username: 'Leopold Gáspár',\n  registered: '2012/01/21',\n  role: 'Staff',\n  status: 'Active'\n}, {\n  username: 'Pompeius René',\n  registered: '2012/01/01',\n  role: 'Member',\n  status: 'Active'\n}, {\n  username: 'Paĉjo Jadon',\n  registered: '2012/02/01',\n  role: 'Staff',\n  status: 'Banned'\n}, {\n  username: 'Micheal Mercurius',\n  registered: '2012/02/01',\n  role: 'Admin',\n  status: 'Inactive'\n}, {\n  username: 'Ganesha Dubhghall',\n  registered: '2012/03/01',\n  role: 'Member',\n  status: 'Pending'\n}, {\n  username: 'Hiroto Šimun',\n  registered: '2012/01/21',\n  role: 'Staff',\n  status: 'Active'\n}, {\n  username: 'Vishnu Serghei',\n  registered: '2012/01/01',\n  role: 'Member',\n  status: 'Active'\n}, {\n  username: 'Zbyněk Phoibos',\n  registered: '2012/02/01',\n  role: 'Staff',\n  status: 'Banned'\n}, {\n  username: 'Einar Randall',\n  registered: '2012/02/01',\n  role: 'Admin',\n  status: 'Inactive',\n  _classes: 'table-danger'\n}, {\n  username: 'Félix Troels',\n  registered: '2012/03/21',\n  role: 'Staff',\n  status: 'Active'\n}, {\n  username: 'Aulus Agmundr',\n  registered: '2012/01/01',\n  role: 'Member',\n  status: 'Pending'\n}];\n/* harmony default export */ __webpack_exports__[\"default\"] = (usersData);\n\n//# sourceURL=webpack:///./src/views/users/UsersData.js?");

/***/ })

}]);