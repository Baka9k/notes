/******/ (function(modules) {
/******/
/******/ 	var installedModules = {};

/******/
/******/ 	function __webpack_require__(moduleId) {

/******/
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/
/******/ 		module.loaded = true;

/******/
/******/ 		return module.exports;
/******/ 	}

/******/
/******/ 	__webpack_require__.m = modules;

/******/
/******/ 	__webpack_require__.c = installedModules;

/******/
/******/ 	__webpack_require__.p = "build/";

/******/
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var _Utilities = __webpack_require__(9);

	var _Notes = __webpack_require__(10);

	var _Notes2 = _interopRequireDefault(_Notes);

	var _SearchBar = __webpack_require__(11);

	var _SearchBar2 = _interopRequireDefault(_SearchBar);

	var _NoteCreator = __webpack_require__(14);

	var _NoteCreator2 = _interopRequireDefault(_NoteCreator);

	var _NoteView = __webpack_require__(15);

	var _NoteView2 = _interopRequireDefault(_NoteView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	document.body.className = '';

	var notes = new _Notes2.default(window.localStorage);

	var noteViews = {};

	window.notes = notes;

	function updateVisibility(shownNoteItems) {
	  var shownIds = new Set(shownNoteItems.map(function (item) {
	    return item.id;
	  }));
	  console.log('shownIds', shownIds);
	  Object.keys(noteViews).forEach(function (id) {
	    console.log(id, shownIds.has(id));
	    noteViews[id].setVisibility(shownIds.has(id));
	  });
	}

	function createNoteView(item) {
	  return new _NoteView2.default(item.text, item.tags, item.id, function onUpdateComplete(id, text, tags) {
	    notes.update(id, text, tags);
	  }, function onDelete(id) {
	    notes.remove(id);
	    delete noteViews[id];
	  }, function onTagClick(id, tag) {
	    searchBar.addTag(tag);
	  });
	}

	var searchBar = new _SearchBar2.default((0, _Utilities.$)('#filter-edit')[0], (0, _Utilities.$)('#searchb')[0], (0, _Utilities.$)('#clearb')[0], function onTagUpdate(tags) {
	  if (Object.keys(tags).length === 0) {
	    notes.clearFilter();
	  } else {
	    notes.filter(tags);
	  }
	  updateVisibility(notes.get());
	});

	new _NoteCreator2.default((0, _Utilities.$)('.list-elem:nth-child(1) > .action-create')[0], (0, _Utilities.$)('.list-elem:nth-child(1) > .list-text')[0], (0, _Utilities.$)('.list-elem:nth-child(1) > .list-tags')[0], function onNewNote(noteText, noteTags) {
	  console.log('New note created:', noteText, noteTags);

	  var item = notes.add(noteText, noteTags);
	  var note = createNoteView(item);

	  note.renderToList(noteListDOM, (0, _Utilities.$)('.list-elem:nth-child(1)')[0]);
	  noteViews[item.id] = note;
	});

	var noteListDOM = (0, _Utilities.$)('#todolist-root > .list')[0];

	notes.get().forEach(function (item) {

	  var note = createNoteView(item);

	  note.renderToList(noteListDOM);
	  noteViews[item.id] = note;
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];

	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;

	if(false) {

		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./todolist.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./todolist.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}

		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();

	exports.push([module.id, "/* ========= CSS Reset ========= */\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nol, ul {\n  list-style: none; }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: '';\n  content: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\n/* =========== APP ============ */\n/* fonts */\n@font-face {\n  font-family: 'Material Icons';\n  font-style: normal;\n  font-weight: 400;\n  src: url(" + __webpack_require__(4) + ");\n  /* For IE6-8 */\n  src: local(\"Material Icons\"), local(\"MaterialIcons-Regular\"), url(" + __webpack_require__(5) + ") format(\"woff2\"), url(" + __webpack_require__(6) + ") format(\"woff\"), url(" + __webpack_require__(7) + ") format(\"truetype\"); }\n\n.material-icons {\n  font-family: 'Material Icons';\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  /* Preferred icon size */\n  display: inline-block;\n  line-height: 1;\n  text-transform: none;\n  letter-spacing: normal;\n  word-wrap: normal;\n  white-space: nowrap;\n  direction: ltr;\n  /* Support for all WebKit browsers. */\n  -webkit-font-smoothing: antialiased;\n  /* Support for Safari and Chrome. */\n  text-rendering: optimizeLegibility;\n  /* Support for Firefox. */\n  -moz-osx-font-smoothing: grayscale;\n  /* Support for IE. */\n  font-feature-settings: 'liga'; }\n\n/* Custom app style */\nbody {\n  font-family: 'Roboto', sans-serif;\n  color: rgba(0, 0, 0, 0.87);\n  font-size: 16px;\n  background-color: #EEEEEE; }\n\n#todolist-root {\n  padding: 0px; }\n\n#filter {\n  margin-left: auto;\n  margin-right: auto;\n  border-radius: 4px;\n  width: 710px;\n  height: 30px;\n  background-color: rgba(255, 255, 255, 0.75); }\n\n#filter-edit {\n  float: left;\n  max-width: 600px;\n  min-width: 320px;\n  font-size: 20px;\n  padding-top: 4px;\n  padding-left: 3px;\n  height: 30px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  outline: none;\n  outline-style: none;\n  outline-width: 0px;\n  -webkit-tap-highlight-color: transparent; }\n\n#filter-edit:focus {\n  outline: none;\n  outline-style: none;\n  outline-width: 0px;\n  -webkit-tap-highlight-color: transparent; }\n\n[contenteditable=true]:empty:before {\n  content: attr(placeholder);\n  display: block;\n  /* For Firefox */\n  color: #aaaaaa; }\n\n#filter [contenteditable=true]:empty:before {\n  color: #F9A825;\n  font-weight: 300; }\n\n#searchb, #clearb {\n  font-size: 24px;\n  color: #999;\n  border-radius: 4px;\n  padding: 3px;\n  background-color: transparent;\n  float: left; }\n\n#clearb {\n  float: right;\n  cursor: pointer; }\n\n.top-stripe {\n  background-color: #ffbb00;\n  height: 45px;\n  width: 100%;\n  padding-top: 15px;\n  -webkit-box-shadow: 0px 3px 4px -4px rgba(0, 0, 0, 0.75);\n  -moz-box-shadow: 0px 3px 4px -4px rgba(0, 0, 0, 0.75);\n  box-shadow: 0px 3px 4px -4px rgba(0, 0, 0, 0.75); }\n\n.list {\n  width: 720px;\n  padding: 6px 6px 1px 6px;\n  margin-left: auto;\n  margin-right: auto; }\n\n.list hr {\n  border: 0;\n  height: 1px;\n  background: #ddd;\n  margin-left: -14px;\n  margin-right: -14px;\n  width: inherit; }\n\n.list > .list-elem {\n  background-color: #FFFFFF;\n  color: rgba(0, 0, 0, 0.87);\n  display: block;\n  -webkit-font-smoothing: antialiased;\n  overflow-x: hidden;\n  overflow-y: auto;\n  border-radius: 2px;\n  -webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);\n  min-width: 320px;\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 12px;\n  margin-top: 10px;\n  padding: 14px;\n  min-height: 32px; }\n\n.list-text {\n  word-wrap: break-word;\n  -webkit-line-break: after-white-space;\n  outline: none;\n  outline-style: none;\n  outline-width: 0px;\n  -webkit-tap-highlight-color: transparent;\n  margin-top: 4px;\n  margin-left: 0px;\n  font-size: 18px;\n  padding: 2px;\n  border-radius: 2px;\n  margin-bottom: 24px; }\n\n.list-tags {\n  margin-top: 4px;\n  margin-left: 2px;\n  font-size: 18px;\n  margin: 0;\n  padding: 10px 0 1px 0;\n  width: 60%;\n  position: relative;\n  float: left;\n  word-wrap: break-word;\n  -webkit-user-select: none;\n  user-select: none; }\n\n.tags-label {\n  width: 50px;\n  position: relative;\n  float: left;\n  padding: 10px 0 1px 0;\n  font-weight: 500;\n  color: #494949; }\n\n.utag {\n  background-color: #CCFF90;\n  padding: 3px;\n  padding-top: 1px;\n  border-radius: 3px;\n  -webkit-transition: all 0.45s;\n  -moz-transition: all 0.45s;\n  -o-transition: all 0.45s;\n  transition: all 0.45s; }\n\n.list-tags .utag:hover {\n  background-color: #B2FF59;\n  cursor: pointer; }\n\n.list-icon {\n  width: 26px;\n  height: 26px;\n  font-style: bold;\n  padding-top: 2px;\n  text-align: center;\n  display: inline-block;\n  margin-right: 2px;\n  -webkit-transition: all 0.45s;\n  -moz-transition: all 0.45s;\n  -o-transition: all 0.45s;\n  transition: all 0.45s; }\n\n.list-elem input {\n  height: 24px;\n  font-size: 18px;\n  flex: 3; }\n\n.action-create {\n  width: 100px;\n  position: relative;\n  float: right;\n  padding-top: 8px;\n  padding-bottom: 8px;\n  -webkit-user-select: none;\n  /* Chrome all / Safari all */\n  -moz-user-select: none;\n  /* Firefox all */\n  -ms-user-select: none;\n  /* IE 10+ */\n  user-select: none;\n  /* Likely future */\n  cursor: pointer;\n  outline: none;\n  outline-style: none;\n  outline-width: 0px;\n  -webkit-tap-highlight-color: transparent;\n  background-color: #4285f4;\n  border: none;\n  overflow: hidden;\n  -webkit-border-radius: 3px;\n  border-radius: 3px;\n  font-family: 'Roboto', sans-serif;\n  color: #fff;\n  font-size: 14px;\n  font-weight: 500;\n  text-transform: uppercase;\n  display: inline-block;\n  text-align: center;\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2); }\n\n.action-edit, .action-remove {\n  -webkit-user-select: none;\n  /* Chrome all / Safari all */\n  -moz-user-select: none;\n  /* Firefox all */\n  -ms-user-select: none;\n  /* IE 10+ */\n  user-select: none;\n  /* Likely future */\n  cursor: pointer;\n  background-color: transparent;\n  font-size: 24px;\n  color: #999;\n  border-radius: 4px;\n  padding: 3px;\n  float: right; }\n\n.action-edit:hover, .action-remove:hover {\n  background: rgba(0, 0, 0, 0.1); }\n", ""]);

/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http:
		Author Tobias Koppers @sokra
	*/

	module.exports = function() {
		var list = [];


		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};


		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];

				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "e79bfd88537def476913f3ed52f4f4b3.eot";

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "570eb83859dc23dd0eec423a49e147fe.woff2";

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "012cf6a10129e2275d79d6adac7f3b02.woff";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "a37b0c01c0baf1888ca812cc0508f6e2.ttf";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http:
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};

		if (typeof options.singleton === "undefined") options.singleton = isOldIE();


		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {

			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.$ = $;
	exports.hasProps = hasProps;
	exports.removeChildren = removeChildren;
	function $() {
	    if (arguments[0] && typeof arguments[0] !== 'string' && typeof arguments[1] === 'string') {
	        var args = Array.prototype.slice.call(arguments);
	        var node = args.shift();
	        return node.querySelectorAll.apply(node, args);
	    } else {
	        return document.querySelectorAll.apply(document, arguments);
	    }
	}

	function hasProps(objSrc, objTest) {
	    var ret = true;
	    Object.keys(objSrc).forEach(function (prop) {
	        ret = ret && objTest.hasOwnProperty(prop);
	    });
	    return ret;
	}

	function removeChildren(domTarget) {
	    while (domTarget.firstChild) {
	        domTarget.removeChild(domTarget.firstChild);
	    }
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utilities = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Notes = function () {
	  function Notes(storageObj) {
	    var storageKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '__todolist_data';

	    _classCallCheck(this, Notes);

	    this.storage = storageObj;
	    this.storageKey = storageKey;
	    this.items = [];
	    this.id = 0;

	    if (this.storage) {
	      var _json = this.storage.getItem(this.storageKey);
	      var data;
	      try {
	        data = JSON.parse(_json);
	      } catch (e) {
	        console.log('Data loading error:', e);
	      }
	      if (data && data.hasOwnProperty('id') && data.items) {
	        Object.assign(this, data);
	        console.log('Loaded', data.items.length, 'notes from storage');
	      } else {
	        console.log('No data in storage');
	      }
	    }
	  }

	  _createClass(Notes, [{
	    key: 'save',
	    value: function save() {
	      if (this.storage) {
	        var data = { id: this.id, items: this.items };
	        this.storage.setItem(this.storageKey, JSON.stringify(data));
	        console.log('Saved', data.items.length, 'notes to storage');
	      }
	    }
	  }, {
	    key: 'add',
	    value: function add(text) {
	      var tags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var nextId = (this.id++).toString();
	      var item = { text: text, tags: tags, id: nextId };
	      this.items.unshift(item);
	      console.log('Notes:', this.items);
	      this.save();
	      return item;
	    }
	  }, {
	    key: 'update',
	    value: function update(id, text, tags) {
	      var item = this.findById(id);
	      console.log('Update item id:', id, 'with text:', text, 'tags:', tags, 'item found:', item);
	      if (item) {
	        item.text = text;
	        item.tags = tags;
	        this.save();
	      }
	    }
	  }, {
	    key: 'remove',
	    value: function remove(id) {
	      var filterFn = function filterFn(item) {
	        return item.id !== id;
	      };
	      this.items = this.items.filter(filterFn);
	      this.save();
	    }
	  }, {
	    key: 'findById',
	    value: function findById(id) {
	      for (var i = 0; i < this.items.length; i++) {
	        if (this.items[i].id === id) return this.items[i];
	      }
	    }
	  }, {
	    key: 'findByTags',
	    value: function findByTags(tags) {
	      return this.items.filter(function (item) {
	        return (0, _Utilities.hasProps)(tags, item.tags);
	      });
	    }
	  }, {
	    key: 'filter',
	    value: function filter(tags) {
	      this.filtered = this.findByTags(tags);
	      console.log('Filtering by', tags, 'result:', this.filtered);
	    }
	  }, {
	    key: 'clearFilter',
	    value: function clearFilter() {
	      this.filtered = false;
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      if (this.filtered) return this.filtered;else return this.items;
	    }
	  }]);

	  return Notes;
	}();

	exports.default = Notes;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _DivEditor = __webpack_require__(12);

	var _DivEditor2 = _interopRequireDefault(_DivEditor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var tagRE = /\#[\w\dа-я]+/ig;

	var SearchBar = function () {
	  function SearchBar(domDiv, domSearchB, domClearB, onTagUpdate) {
	    var _this = this;

	    _classCallCheck(this, SearchBar);

	    this.editable = domDiv;
	    this.clearB = domClearB;
	    this.tags = {};
	    this.onTagUpdate = onTagUpdate;

	    var that = this;

	    this.editor = new _DivEditor2.default({
	      domNode: domDiv,
	      transformText: function transformText(text) {

	        that.tags = {};
	        var tagsHTML = text.replace(tagRE, function (tag) {
	          that.tags[tag] = true;
	          return '<span class="utag">' + tag + '</span>';
	        });
	        that.onTagUpdate && that.onTagUpdate(that.tags);
	        return tagsHTML;
	      }
	    });

	    domClearB.onclick = function () {
	      _this.tags = {};
	      _this.editable.innerHTML = '';
	      _this.onTagUpdate && _this.onTagUpdate(_this.tags);
	    };

	    this.editable.onclick = function (event) {
	      if (event.target && event.target.className === 'utag') {
	        that.editable.removeChild(event.target);
	        that.editor.triggerTransform();
	      }
	    };
	  }

	  _createClass(SearchBar, [{
	    key: 'addTag',
	    value: function addTag(tag) {
	      if (!this.tags[tag]) {
	        this.tags[tag] = true;
	        if (this.editable.innerHTML.length) {
	          this.editable.innerHTML += '&nbsp';
	        }
	        this.editable.innerHTML += '<span class="utag">' + tag + '</span>';
	        this.editor.triggerTransform();
	      }
	    }
	  }]);

	  return SearchBar;
	}();

	exports.default = SearchBar;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _DomHelpers = __webpack_require__(13);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DivEditor = function () {
	  function DivEditor(config) {
	    _classCallCheck(this, DivEditor);

	    this.node = config.domNode;
	    this.onedit = config.onEdit;

	    this.node.setAttribute('contenteditable', 'true');
	    this.node.setAttribute('spellcheck', 'false');

	    var that = this;

	    this.transformText = config.transformText;
	    this.awaitingTransform = false;
	    this.transformLatency = 50;
	    this.lastText = '';

	    this.oneditCb = function (event) {
	      that.onEdit && that.onEdit.call(that, that.node.textContent);

	      if (that.transformText && !that.awaitingTransform) {
	        that.awaitingTransform = true;
	        that.timeout = setTimeout(function () {
	          var text = that.node.textContent;
	          if (text != that.lastText) {
	            var offset = (0, _DomHelpers.getCaretCharacterOffsetWithin)(that.node);
	            var ret = that.transformText(text);
	            if (ret !== undefined) {
	              that.node.innerHTML = ret;
	            }
	            try {
	              (0, _DomHelpers.setCaretPosition)(that.node, offset);
	            } catch (e) {
	              console.log(e);
	            }
	            that.lastText = text;
	            that.awaitingTransform = false;
	          }
	        }, that.transformLatency);
	      }
	    };

	    this.node.addEventListener('input', this.oneditCb);

	    this.detachOnBlur = config.detachOnBlur;

	    if (this.detachOnBlur) {
	      this.node.onblur = function () {
	        that.timeout && clearTimeout(that.timeout);
	        var text = that.node.textContent;
	        that.detach();
	        that.detachOnBlur.call(that.node, text);
	      };
	    }
	  }

	  _createClass(DivEditor, [{
	    key: 'triggerTransform',
	    value: function triggerTransform() {
	      this.oneditCb();
	    }
	  }, {
	    key: 'getText',
	    value: function getText() {
	      return this.node.textContent;
	    }
	  }, {
	    key: 'clearText',
	    value: function clearText() {
	      this.node.innerHTML = '';
	    }
	  }, {
	    key: 'detach',
	    value: function detach() {
	      this.node.removeEventListener('input', this.oneditCb);
	      this.node.setAttribute('contenteditable', 'false');
	      this.interval && clearInterval(this.interval);
	    }
	  }]);

	  return DivEditor;
	}();

	exports.default = DivEditor;
	;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getCaretCharacterOffsetWithin = getCaretCharacterOffsetWithin;
	exports.setCaretPosition = setCaretPosition;
	function getCaretCharacterOffsetWithin(element) {
	  var caretOffset = 0;
	  var doc = element.ownerDocument || element.document || document;
	  var win = doc.defaultView || doc.parentWindow || window;
	  var sel;
	  if (typeof win.getSelection != "undefined") {
	    sel = win.getSelection();
	    if (sel.rangeCount > 0) {
	      var range = win.getSelection().getRangeAt(0);
	      var preCaretRange = range.cloneRange();
	      preCaretRange.selectNodeContents(element);
	      preCaretRange.setEnd(range.endContainer, range.endOffset);
	      caretOffset = preCaretRange.toString().length;
	    }
	  } else if ((sel = doc.selection) && sel.type != "Control") {
	    var textRange = sel.createRange();
	    var preCaretTextRange = doc.body.createTextRange();
	    preCaretTextRange.moveToElementText(element);
	    preCaretTextRange.setEndPoint("EndToEnd", textRange);
	    caretOffset = preCaretTextRange.text.length;
	  }
	  return caretOffset;
	};

	function setCaretPosition(element, offset) {
	  var range = document.createRange();
	  var sel = window.getSelection();

	  var currentNode = null;
	  var previousNode = null;

	  for (var i = 0; i < element.childNodes.length; i++) {

	    previousNode = currentNode;

	    currentNode = element.childNodes[i];

	    while (currentNode.childNodes.length > 0) {
	      currentNode = currentNode.childNodes[0];
	    }

	    if (previousNode != null) {
	      offset -= previousNode.length;
	    }

	    if (offset <= currentNode.length) {
	      break;
	    }
	  }

	  if (currentNode != null) {
	    range.setStart(currentNode, offset);
	    range.collapse(true);
	    sel.removeAllRanges();
	    sel.addRange(range);
	  }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _DivEditor = __webpack_require__(12);

	var _DivEditor2 = _interopRequireDefault(_DivEditor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var tagRE = /\#[\w\dа-я]+/ig;

	function renderTags(tags) {
	  return Object.keys(tags).map(function (t) {
	    return '<span class="utag">' + t + '</span>';
	  }).join(' ');
	}

	var NoteCreator = function NoteCreator(domCreateB, domText, domTags, onNewNote) {
	  _classCallCheck(this, NoteCreator);

	  this.tags = {};
	  this.domTags = domTags;
	  this.onNewNote = onNewNote;
	  var that = this;

	  this.editor = new _DivEditor2.default({
	    domNode: domText,
	    transformText: function transformText(text) {
	      that.tags = {};
	      var tagsHTML = text.replace(tagRE, function (tag) {
	        that.tags[tag] = true;
	        return '<span class="utag">' + tag + '</span>';
	      });
	      that.domTags.innerHTML = renderTags(that.tags);
	      return tagsHTML;
	    }
	  });

	  domCreateB.onclick = function () {
	    var text = that.editor.getText().trim();
	    if (text) {
	      that.editor.clearText();
	      that.domTags.innerHTML = '';
	      that.onNewNote && that.onNewNote(text, that.tags);
	    }
	  };
	};

	exports.default = NoteCreator;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utilities = __webpack_require__(9);

	var _DomHelpers = __webpack_require__(13);

	var _DivEditor = __webpack_require__(12);

	var _DivEditor2 = _interopRequireDefault(_DivEditor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function noteTemplate(text, tags) {
	  return '<div class="list-icon action-remove"><i class="material-icons">&#xE92B;</i></div>\n        <div class="list-icon action-edit"><i class="material-icons">&#xE254;</i></div>\n        <div class="list-text">' + text + '</div>\n        <div class="list-tags">' + tags + '</div>';
	}

	var tagRE = /\#[\w\dа-я]+/ig;

	function renderTags(tags) {
	  return Object.keys(tags).map(function (t) {
	    return '<span class="utag">' + t + '</span>';
	  }).join(' ');
	}

	function iterateRE(str, re, onmatch) {
	  var result;
	  while ((result = re.exec(str)) !== null) {
	    if (onmatch) {
	      onmatch(result[0], result);
	    }
	  }
	}

	var NoteView = function () {
	  function NoteView(text, tags, id, onUpdateComplete, onDelete, onTagClick) {
	    _classCallCheck(this, NoteView);

	    this.text = text;
	    this.tags = tags;
	    this.id = id;
	    this.onUpdateComplete = onUpdateComplete;
	    this.onDelete = onDelete;
	    this.onTagClick = onTagClick;
	  }

	  _createClass(NoteView, [{
	    key: 'renderToList',
	    value: function renderToList(domList, insertAfterDOM) {
	      var domNode = document.createElement('div');
	      this.domNode = domNode;
	      this.domList = domList;

	      domNode.className = 'list-elem';
	      domNode.innerHTML = noteTemplate(this.text.replace(tagRE, function (tag) {
	        return '<span class="utag">' + tag + '</span>';
	      }), renderTags(this.tags));

	      this.domText = (0, _Utilities.$)(domNode, '.list-text')[0];

	      this.domTags = (0, _Utilities.$)(domNode, '.list-tags')[0];

	      var that = this;

	      (0, _Utilities.$)(domNode, '.action-remove')[0].onclick = function () {
	        that.domNode && that.domList.removeChild(that.domNode);
	        that.onDelete && that.onDelete(that.id);
	      };

	      (0, _Utilities.$)(domNode, '.action-edit')[0].onclick = function () {
	        if (!that.editor) {
	          that.editor = new _DivEditor2.default({
	            domNode: that.domText,
	            transformText: function transformText(text) {
	              that.tags = {};
	              var tagsHTML = text.replace(tagRE, function (tag) {
	                that.tags[tag] = true;
	                return '<span class="utag">' + tag + '</span>';
	              });
	              that.domTags.innerHTML = renderTags(that.tags);
	              return tagsHTML;
	            },
	            detachOnBlur: function detachOnBlur(text) {
	              that.tags = {};
	              iterateRE(text, tagRE, function (tag) {
	                that.tags[tag] = true;
	              });
	              console.log('NoteView finished editing, tags:', that.tags);
	              that.onUpdateComplete && that.onUpdateComplete(that.id, text, that.tags);
	              delete that.editor;
	            }
	          });
	        }
	        setTimeout(function () {
	          that.domText.focus();(0, _DomHelpers.setCaretPosition)(that.domText, 0);
	        }, 10);
	      };

	      (0, _Utilities.$)(domNode, '.list-tags')[0].onclick = function (event) {
	        if (event.target && event.target.className === 'utag') {
	          that.onTagClick && that.onTagClick(that.id, event.target.innerHTML);
	        }
	      };

	      if (insertAfterDOM) {
	        domList.insertBefore(domNode, insertAfterDOM.nextSibling);
	      } else {
	        domList.appendChild(domNode);
	      }
	    }
	  }, {
	    key: 'setVisibility',
	    value: function setVisibility(bool) {
	      this.domNode && (this.domNode.style.display = bool ? 'block' : 'none');
	    }
	  }]);

	  return NoteView;
	}();

	exports.default = NoteView;

/***/ }
/******/ ]);