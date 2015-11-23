(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (Buffer){
(function(ns){
var NODE_CLIENT=0;
ns.wrapper=function(goog,wd){
var COMPILED = false;
var goog = goog || {};
goog.global = this;
goog.global.CLOSURE_UNCOMPILED_DEFINES;
goog.global.CLOSURE_DEFINES;
goog.isDef = function(val) {
  return val !== void 0;
};
goog.exportPath_ = function(name, opt_object, opt_objectToExportTo) {
  var parts = name.split(".");
  var cur = opt_objectToExportTo || goog.global;
  if (!(parts[0] in cur) && cur.execScript) {
    cur.execScript("var " + parts[0]);
  }
  for (var part;parts.length && (part = parts.shift());) {
    if (!parts.length && goog.isDef(opt_object)) {
      cur[part] = opt_object;
    } else {
      if (cur[part]) {
        cur = cur[part];
      } else {
        cur = cur[part] = {};
      }
    }
  }
};
goog.define = function(name, defaultValue) {
  var value = defaultValue;
  if (!COMPILED) {
    if (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, name)) {
      value = goog.global.CLOSURE_UNCOMPILED_DEFINES[name];
    } else {
      if (goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, name)) {
        value = goog.global.CLOSURE_DEFINES[name];
      }
    }
  }
  goog.exportPath_(name, value);
};
goog.define("goog.DEBUG", true);
goog.define("goog.LOCALE", "en");
goog.define("goog.TRUSTED_SITE", true);
goog.define("goog.STRICT_MODE_COMPATIBLE", false);
goog.define("goog.DISALLOW_TEST_ONLY_CODE", COMPILED && !goog.DEBUG);
goog.define("goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING", false);
goog.provide = function(name) {
  if (!COMPILED) {
    if (goog.isProvided_(name)) {
      throw Error('Namespace "' + name + '" already declared.');
    }
  }
  goog.constructNamespace_(name);
};
goog.constructNamespace_ = function(name, opt_obj) {
  if (!COMPILED) {
    delete goog.implicitNamespaces_[name];
    var namespace = name;
    while (namespace = namespace.substring(0, namespace.lastIndexOf("."))) {
      if (goog.getObjectByName(namespace)) {
        break;
      }
      goog.implicitNamespaces_[namespace] = true;
    }
  }
  goog.exportPath_(name, opt_obj);
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function(name) {
  if (!goog.isString(name) || !name || name.search(goog.VALID_MODULE_RE_) == -1) {
    throw Error("Invalid module identifier");
  }
  if (!goog.isInModuleLoader_()) {
    throw Error("Module " + name + " has been loaded incorrectly.");
  }
  if (goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module may only be called once per module.");
  }
  goog.moduleLoaderState_.moduleName = name;
  if (!COMPILED) {
    if (goog.isProvided_(name)) {
      throw Error('Namespace "' + name + '" already declared.');
    }
    delete goog.implicitNamespaces_[name];
  }
};
goog.module.get = function(name) {
  return goog.module.getInternal_(name);
};
goog.module.getInternal_ = function(name) {
  if (!COMPILED) {
    if (goog.isProvided_(name)) {
      return name in goog.loadedModules_ ? goog.loadedModules_[name] : goog.getObjectByName(name);
    } else {
      return null;
    }
  }
};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
  return goog.moduleLoaderState_ != null;
};
goog.module.declareTestMethods = function() {
  if (!goog.isInModuleLoader_()) {
    throw new Error("goog.module.declareTestMethods must be called from " + "within a goog.module");
  }
  goog.moduleLoaderState_.declareTestMethods = true;
};
goog.module.declareLegacyNamespace = function() {
  if (!COMPILED && !goog.isInModuleLoader_()) {
    throw new Error("goog.module.declareLegacyNamespace must be called from " + "within a goog.module");
  }
  if (!COMPILED && !goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module must be called prior to " + "goog.module.declareLegacyNamespace.");
  }
  goog.moduleLoaderState_.declareLegacyNamespace = true;
};
goog.setTestOnly = function(opt_message) {
  if (goog.DISALLOW_TEST_ONLY_CODE) {
    opt_message = opt_message || "";
    throw Error("Importing test-only code into non-debug environment" + (opt_message ? ": " + opt_message : "."));
  }
};
goog.forwardDeclare = function(name) {
};
if (!COMPILED) {
  goog.isProvided_ = function(name) {
    return name in goog.loadedModules_ || !goog.implicitNamespaces_[name] && goog.isDefAndNotNull(goog.getObjectByName(name));
  };
  goog.implicitNamespaces_ = {"goog.module":true};
}
goog.getObjectByName = function(name, opt_obj) {
  var parts = name.split(".");
  var cur = opt_obj || goog.global;
  for (var part;part = parts.shift();) {
    if (goog.isDefAndNotNull(cur[part])) {
      cur = cur[part];
    } else {
      return null;
    }
  }
  return cur;
};
goog.globalize = function(obj, opt_global) {
  var global = opt_global || goog.global;
  for (var x in obj) {
    global[x] = obj[x];
  }
};
goog.addDependency = function(relPath, provides, requires, opt_isModule) {
  if (goog.DEPENDENCIES_ENABLED) {
    var provide, require;
    var path = relPath.replace(/\\/g, "/");
    var deps = goog.dependencies_;
    for (var i = 0;provide = provides[i];i++) {
      deps.nameToPath[provide] = path;
      deps.pathIsModule[path] = !!opt_isModule;
    }
    for (var j = 0;require = requires[j];j++) {
      if (!(path in deps.requires)) {
        deps.requires[path] = {};
      }
      deps.requires[path][require] = true;
    }
  }
};
goog.define("goog.ENABLE_DEBUG_LOADER", true);
goog.logToConsole_ = function(msg) {
  if (goog.global.console) {
    goog.global.console["error"](msg);
  }
};
goog.require = function(name) {
  if (!COMPILED) {
    if (goog.ENABLE_DEBUG_LOADER && goog.IS_OLD_IE_) {
      goog.maybeProcessDeferredDep_(name);
    }
    if (goog.isProvided_(name)) {
      if (goog.isInModuleLoader_()) {
        return goog.module.getInternal_(name);
      } else {
        return null;
      }
    }
    if (goog.ENABLE_DEBUG_LOADER) {
      var path = goog.getPathFromDeps_(name);
      if (path) {
        goog.included_[path] = true;
        goog.writeScripts_();
        return null;
      }
    }
    var errorMessage = "goog.require could not find: " + name;
    goog.logToConsole_(errorMessage);
    throw Error(errorMessage);
  }
};
goog.basePath = "";
goog.global.CLOSURE_BASE_PATH;
goog.global.CLOSURE_NO_DEPS;
goog.global.CLOSURE_IMPORT_SCRIPT;
goog.nullFunction = function() {
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(ctor) {
  ctor.getInstance = function() {
    if (ctor.instance_) {
      return ctor.instance_;
    }
    if (goog.DEBUG) {
      goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = ctor;
    }
    return ctor.instance_ = new ctor;
  };
};
goog.instantiatedSingletons_ = [];
goog.define("goog.LOAD_MODULE_USING_EVAL", true);
goog.define("goog.SEAL_MODULE_EXPORTS", goog.DEBUG);
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
if (goog.DEPENDENCIES_ENABLED) {
  goog.included_ = {};
  goog.dependencies_ = {pathIsModule:{}, nameToPath:{}, requires:{}, visited:{}, written:{}, deferred:{}};
  goog.inHtmlDocument_ = function() {
    var doc = goog.global.document;
    return typeof doc != "undefined" && "write" in doc;
  };
  goog.findBasePath_ = function() {
    if (goog.global.CLOSURE_BASE_PATH) {
      goog.basePath = goog.global.CLOSURE_BASE_PATH;
      return;
    } else {
      if (!goog.inHtmlDocument_()) {
        return;
      }
    }
    var doc = goog.global.document;
    var scripts = doc.getElementsByTagName("SCRIPT");
    for (var i = scripts.length - 1;i >= 0;--i) {
      var script = (scripts[i]);
      var src = script.src;
      var qmark = src.lastIndexOf("?");
      var l = qmark == -1 ? src.length : qmark;
      if (src.substr(l - 7, 7) == "base.js") {
        goog.basePath = src.substr(0, l - 7);
        return;
      }
    }
  };
  goog.importScript_ = function(src, opt_sourceText) {
    var importScript = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
    if (importScript(src, opt_sourceText)) {
      goog.dependencies_.written[src] = true;
    }
  };
  goog.IS_OLD_IE_ = !goog.global.atob && goog.global.document && goog.global.document.all;
  goog.importModule_ = function(src) {
    var bootstrap = 'goog.retrieveAndExecModule_("' + src + '");';
    if (goog.importScript_("", bootstrap)) {
      goog.dependencies_.written[src] = true;
    }
  };
  goog.queuedModules_ = [];
  goog.wrapModule_ = function(srcUrl, scriptText) {
    if (!goog.LOAD_MODULE_USING_EVAL || !goog.isDef(goog.global.JSON)) {
      return "" + "goog.loadModule(function(exports) {" + '"use strict";' + scriptText + "\n" + ";return exports" + "});" + "\n//# sourceURL=" + srcUrl + "\n";
    } else {
      return "" + "goog.loadModule(" + goog.global.JSON.stringify(scriptText + "\n//# sourceURL=" + srcUrl + "\n") + ");";
    }
  };
  goog.loadQueuedModules_ = function() {
    var count = goog.queuedModules_.length;
    if (count > 0) {
      var queue = goog.queuedModules_;
      goog.queuedModules_ = [];
      for (var i = 0;i < count;i++) {
        var path = queue[i];
        goog.maybeProcessDeferredPath_(path);
      }
    }
  };
  goog.maybeProcessDeferredDep_ = function(name) {
    if (goog.isDeferredModule_(name) && goog.allDepsAreAvailable_(name)) {
      var path = goog.getPathFromDeps_(name);
      goog.maybeProcessDeferredPath_(goog.basePath + path);
    }
  };
  goog.isDeferredModule_ = function(name) {
    var path = goog.getPathFromDeps_(name);
    if (path && goog.dependencies_.pathIsModule[path]) {
      var abspath = goog.basePath + path;
      return abspath in goog.dependencies_.deferred;
    }
    return false;
  };
  goog.allDepsAreAvailable_ = function(name) {
    var path = goog.getPathFromDeps_(name);
    if (path && path in goog.dependencies_.requires) {
      for (var requireName in goog.dependencies_.requires[path]) {
        if (!goog.isProvided_(requireName) && !goog.isDeferredModule_(requireName)) {
          return false;
        }
      }
    }
    return true;
  };
  goog.maybeProcessDeferredPath_ = function(abspath) {
    if (abspath in goog.dependencies_.deferred) {
      var src = goog.dependencies_.deferred[abspath];
      delete goog.dependencies_.deferred[abspath];
      goog.globalEval(src);
    }
  };
  goog.loadModule = function(moduleDef) {
    var previousState = goog.moduleLoaderState_;
    try {
      goog.moduleLoaderState_ = {moduleName:undefined, declareTestMethods:false};
      var exports;
      if (goog.isFunction(moduleDef)) {
        exports = moduleDef.call(goog.global, {});
      } else {
        if (goog.isString(moduleDef)) {
          exports = goog.loadModuleFromSource_.call(goog.global, moduleDef);
        } else {
          throw Error("Invalid module definition");
        }
      }
      var moduleName = goog.moduleLoaderState_.moduleName;
      if (!goog.isString(moduleName) || !moduleName) {
        throw Error('Invalid module name "' + moduleName + '"');
      }
      if (goog.moduleLoaderState_.declareLegacyNamespace) {
        goog.constructNamespace_(moduleName, exports);
      } else {
        if (goog.SEAL_MODULE_EXPORTS && Object.seal) {
          Object.seal(exports);
        }
      }
      goog.loadedModules_[moduleName] = exports;
      if (goog.moduleLoaderState_.declareTestMethods) {
        for (var entry in exports) {
          if (entry.indexOf("test", 0) === 0 || entry == "tearDown" || entry == "setUp" || entry == "setUpPage" || entry == "tearDownPage") {
            goog.global[entry] = exports[entry];
          }
        }
      }
    } finally {
      goog.moduleLoaderState_ = previousState;
    }
  };
  goog.loadModuleFromSource_ = function(source) {
    var exports = {};
    eval(arguments[0]);
    return exports;
  };
  goog.writeScriptSrcNode_ = function(src) {
    goog.global.document.write('<script type="text/javascript" src="' + src + '"></' + "script>");
  };
  goog.appendScriptSrcNode_ = function(src) {
    var doc = goog.global.document;
    var scriptEl = doc.createElement("script");
    scriptEl.type = "text/javascript";
    scriptEl.src = src;
    scriptEl.defer = false;
    scriptEl.async = false;
    doc.head.appendChild(scriptEl);
  };
  goog.writeScriptTag_ = function(src, opt_sourceText) {
    if (goog.inHtmlDocument_()) {
      var doc = goog.global.document;
      if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && doc.readyState == "complete") {
        var isDeps = /\bdeps.js$/.test(src);
        if (isDeps) {
          return false;
        } else {
          throw Error('Cannot write "' + src + '" after document load');
        }
      }
      var isOldIE = goog.IS_OLD_IE_;
      if (opt_sourceText === undefined) {
        if (!isOldIE) {
          if (goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING) {
            goog.appendScriptSrcNode_(src);
          } else {
            goog.writeScriptSrcNode_(src);
          }
        } else {
          var state = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ";
          doc.write('<script type="text/javascript" src="' + src + '"' + state + "></" + "script>");
        }
      } else {
        doc.write('<script type="text/javascript">' + opt_sourceText + "</" + "script>");
      }
      return true;
    } else {
      return false;
    }
  };
  goog.lastNonModuleScriptIndex_ = 0;
  goog.onScriptLoad_ = function(script, scriptIndex) {
    if (script.readyState == "complete" && goog.lastNonModuleScriptIndex_ == scriptIndex) {
      goog.loadQueuedModules_();
    }
    return true;
  };
  goog.writeScripts_ = function() {
    var scripts = [];
    var seenScript = {};
    var deps = goog.dependencies_;
    function visitNode(path) {
      if (path in deps.written) {
        return;
      }
      if (path in deps.visited) {
        if (!(path in seenScript)) {
          seenScript[path] = true;
          scripts.push(path);
        }
        return;
      }
      deps.visited[path] = true;
      if (path in deps.requires) {
        for (var requireName in deps.requires[path]) {
          if (!goog.isProvided_(requireName)) {
            if (requireName in deps.nameToPath) {
              visitNode(deps.nameToPath[requireName]);
            } else {
              throw Error("Undefined nameToPath for " + requireName);
            }
          }
        }
      }
      if (!(path in seenScript)) {
        seenScript[path] = true;
        scripts.push(path);
      }
    }
    for (var path in goog.included_) {
      if (!deps.written[path]) {
        visitNode(path);
      }
    }
    for (var i = 0;i < scripts.length;i++) {
      var path = scripts[i];
      goog.dependencies_.written[path] = true;
    }
    var moduleState = goog.moduleLoaderState_;
    goog.moduleLoaderState_ = null;
    var loadingModule = false;
    for (var i = 0;i < scripts.length;i++) {
      var path = scripts[i];
      if (path) {
        if (!deps.pathIsModule[path]) {
          goog.importScript_(goog.basePath + path);
        } else {
          loadingModule = true;
          goog.importModule_(goog.basePath + path);
        }
      } else {
        goog.moduleLoaderState_ = moduleState;
        throw Error("Undefined script input");
      }
    }
    goog.moduleLoaderState_ = moduleState;
  };
  goog.getPathFromDeps_ = function(rule) {
    if (rule in goog.dependencies_.nameToPath) {
      return goog.dependencies_.nameToPath[rule];
    } else {
      return null;
    }
  };
  goog.findBasePath_();
  if (!goog.global.CLOSURE_NO_DEPS) {
    goog.importScript_(goog.basePath + "deps.js");
  }
}
goog.normalizePath_ = function(path) {
  var components = path.split("/");
  var i = 0;
  while (i < components.length) {
    if (components[i] == ".") {
      components.splice(i, 1);
    } else {
      if (i && components[i] == ".." && components[i - 1] && components[i - 1] != "..") {
        components.splice(--i, 2);
      } else {
        i++;
      }
    }
  }
  return components.join("/");
};
goog.loadFileSync_ = function(src) {
  if (goog.global.CLOSURE_LOAD_FILE_SYNC) {
    return goog.global.CLOSURE_LOAD_FILE_SYNC(src);
  } else {
    var xhr = new goog.global["XMLHttpRequest"];
    xhr.open("get", src, false);
    xhr.send();
    return xhr.responseText;
  }
};
goog.retrieveAndExecModule_ = function(src) {
  if (!COMPILED) {
    var originalPath = src;
    src = goog.normalizePath_(src);
    var importScript = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
    var scriptText = goog.loadFileSync_(src);
    if (scriptText != null) {
      var execModuleScript = goog.wrapModule_(src, scriptText);
      var isOldIE = goog.IS_OLD_IE_;
      if (isOldIE) {
        goog.dependencies_.deferred[originalPath] = execModuleScript;
        goog.queuedModules_.push(originalPath);
      } else {
        importScript(src, execModuleScript);
      }
    } else {
      throw new Error("load of " + src + "failed");
    }
  }
};
goog.typeOf = function(value) {
  var s = typeof value;
  if (s == "object") {
    if (value) {
      if (value instanceof Array) {
        return "array";
      } else {
        if (value instanceof Object) {
          return s;
        }
      }
      var className = Object.prototype.toString.call((value));
      if (className == "[object Window]") {
        return "object";
      }
      if (className == "[object Array]" || typeof value.length == "number" && typeof value.splice != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("splice")) {
        return "array";
      }
      if (className == "[object Function]" || typeof value.call != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("call")) {
        return "function";
      }
    } else {
      return "null";
    }
  } else {
    if (s == "function" && typeof value.call == "undefined") {
      return "object";
    }
  }
  return s;
};
goog.isNull = function(val) {
  return val === null;
};
goog.isDefAndNotNull = function(val) {
  return val != null;
};
goog.isArray = function(val) {
  return goog.typeOf(val) == "array";
};
goog.isArrayLike = function(val) {
  var type = goog.typeOf(val);
  return type == "array" || type == "object" && typeof val.length == "number";
};
goog.isDateLike = function(val) {
  return goog.isObject(val) && typeof val.getFullYear == "function";
};
goog.isString = function(val) {
  return typeof val == "string";
};
goog.isBoolean = function(val) {
  return typeof val == "boolean";
};
goog.isNumber = function(val) {
  return typeof val == "number";
};
goog.isFunction = function(val) {
  return goog.typeOf(val) == "function";
};
goog.isObject = function(val) {
  var type = typeof val;
  return type == "object" && val != null || type == "function";
};
goog.getUid = function(obj) {
  return obj[goog.UID_PROPERTY_] || (obj[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.hasUid = function(obj) {
  return !!obj[goog.UID_PROPERTY_];
};
goog.removeUid = function(obj) {
  if ("removeAttribute" in obj) {
    obj.removeAttribute(goog.UID_PROPERTY_);
  }
  try {
    delete obj[goog.UID_PROPERTY_];
  } catch (ex) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (Math.random() * 1E9 >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(obj) {
  var type = goog.typeOf(obj);
  if (type == "object" || type == "array") {
    if (obj.clone) {
      return obj.clone();
    }
    var clone = type == "array" ? [] : {};
    for (var key in obj) {
      clone[key] = goog.cloneObject(obj[key]);
    }
    return clone;
  }
  return obj;
};
goog.bindNative_ = function(fn, selfObj, var_args) {
  return (fn.call.apply(fn.bind, arguments));
};
goog.bindJs_ = function(fn, selfObj, var_args) {
  if (!fn) {
    throw new Error;
  }
  if (arguments.length > 2) {
    var boundArgs = Array.prototype.slice.call(arguments, 2);
    return function() {
      var newArgs = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(newArgs, boundArgs);
      return fn.apply(selfObj, newArgs);
    };
  } else {
    return function() {
      return fn.apply(selfObj, arguments);
    };
  }
};
goog.bind = function(fn, selfObj, var_args) {
  if (Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1) {
    goog.bind = goog.bindNative_;
  } else {
    goog.bind = goog.bindJs_;
  }
  return goog.bind.apply(null, arguments);
};
goog.partial = function(fn, var_args) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var newArgs = args.slice();
    newArgs.push.apply(newArgs, arguments);
    return fn.apply(this, newArgs);
  };
};
goog.mixin = function(target, source) {
  for (var x in source) {
    target[x] = source[x];
  }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
  return +new Date;
};
goog.globalEval = function(script) {
  if (goog.global.execScript) {
    goog.global.execScript(script, "JavaScript");
  } else {
    if (goog.global.eval) {
      if (goog.evalWorksForGlobals_ == null) {
        goog.global.eval("var _et_ = 1;");
        if (typeof goog.global["_et_"] != "undefined") {
          delete goog.global["_et_"];
          goog.evalWorksForGlobals_ = true;
        } else {
          goog.evalWorksForGlobals_ = false;
        }
      }
      if (goog.evalWorksForGlobals_) {
        goog.global.eval(script);
      } else {
        var doc = goog.global.document;
        var scriptElt = doc.createElement("SCRIPT");
        scriptElt.type = "text/javascript";
        scriptElt.defer = false;
        scriptElt.appendChild(doc.createTextNode(script));
        doc.body.appendChild(scriptElt);
        doc.body.removeChild(scriptElt);
      }
    } else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.cssNameMapping_;
goog.cssNameMappingStyle_;
goog.getCssName = function(className, opt_modifier) {
  var getMapping = function(cssName) {
    return goog.cssNameMapping_[cssName] || cssName;
  };
  var renameByParts = function(cssName) {
    var parts = cssName.split("-");
    var mapped = [];
    for (var i = 0;i < parts.length;i++) {
      mapped.push(getMapping(parts[i]));
    }
    return mapped.join("-");
  };
  var rename;
  if (goog.cssNameMapping_) {
    rename = goog.cssNameMappingStyle_ == "BY_WHOLE" ? getMapping : renameByParts;
  } else {
    rename = function(a) {
      return a;
    };
  }
  if (opt_modifier) {
    return className + "-" + rename(opt_modifier);
  } else {
    return rename(className);
  }
};
goog.setCssNameMapping = function(mapping, opt_style) {
  goog.cssNameMapping_ = mapping;
  goog.cssNameMappingStyle_ = opt_style;
};
goog.global.CLOSURE_CSS_NAME_MAPPING;
if (!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING) {
  goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING;
}
goog.getMsg = function(str, opt_values) {
  if (opt_values) {
    str = str.replace(/\{\$([^}]+)}/g, function(match, key) {
      return key in opt_values ? opt_values[key] : match;
    });
  }
  return str;
};
goog.getMsgWithFallback = function(a, b) {
  return a;
};
goog.exportSymbol = function(publicPath, object, opt_objectToExportTo) {
  goog.exportPath_(publicPath, object, opt_objectToExportTo);
};
goog.exportProperty = function(object, publicName, symbol) {
  object[publicName] = symbol;
};
goog.inherits = function(childCtor, parentCtor) {
  function tempCtor() {
  }
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor;
  childCtor.prototype.constructor = childCtor;
  childCtor.base = function(me, methodName, var_args) {
    var args = new Array(arguments.length - 2);
    for (var i = 2;i < arguments.length;i++) {
      args[i - 2] = arguments[i];
    }
    return parentCtor.prototype[methodName].apply(me, args);
  };
};
goog.base = function(me, opt_methodName, var_args) {
  var caller = arguments.callee.caller;
  if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !caller) {
    throw Error("arguments.caller not defined.  goog.base() cannot be used " + "with strict mode code. See " + "http://www.ecma-international.org/ecma-262/5.1/#sec-C");
  }
  if (caller.superClass_) {
    var ctorArgs = new Array(arguments.length - 1);
    for (var i = 1;i < arguments.length;i++) {
      ctorArgs[i - 1] = arguments[i];
    }
    return caller.superClass_.constructor.apply(me, ctorArgs);
  }
  var args = new Array(arguments.length - 2);
  for (var i = 2;i < arguments.length;i++) {
    args[i - 2] = arguments[i];
  }
  var foundCaller = false;
  for (var ctor = me.constructor;ctor;ctor = ctor.superClass_ && ctor.superClass_.constructor) {
    if (ctor.prototype[opt_methodName] === caller) {
      foundCaller = true;
    } else {
      if (foundCaller) {
        return ctor.prototype[opt_methodName].apply(me, args);
      }
    }
  }
  if (me[opt_methodName] === caller) {
    return me.constructor.prototype[opt_methodName].apply(me, args);
  } else {
    throw Error("goog.base called from a method of one name " + "to a method of a different name");
  }
};
goog.scope = function(fn) {
  fn.call(goog.global);
};
if (!COMPILED) {
  goog.global["COMPILED"] = COMPILED;
}
goog.defineClass = function(superClass, def) {
  var constructor = def.constructor;
  var statics = def.statics;
  if (!constructor || constructor == Object.prototype.constructor) {
    constructor = function() {
      throw Error("cannot instantiate an interface (no constructor defined).");
    };
  }
  var cls = goog.defineClass.createSealingConstructor_(constructor, superClass);
  if (superClass) {
    goog.inherits(cls, superClass);
  }
  delete def.constructor;
  delete def.statics;
  goog.defineClass.applyProperties_(cls.prototype, def);
  if (statics != null) {
    if (statics instanceof Function) {
      statics(cls);
    } else {
      goog.defineClass.applyProperties_(cls, statics);
    }
  }
  return cls;
};
goog.defineClass.ClassDescriptor;
goog.define("goog.defineClass.SEAL_CLASS_INSTANCES", goog.DEBUG);
goog.defineClass.createSealingConstructor_ = function(ctr, superClass) {
  if (goog.defineClass.SEAL_CLASS_INSTANCES && Object.seal instanceof Function) {
    if (superClass && superClass.prototype && superClass.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]) {
      return ctr;
    }
    var wrappedCtr = function() {
      var instance = ctr.apply(this, arguments) || this;
      instance[goog.UID_PROPERTY_] = instance[goog.UID_PROPERTY_];
      if (this.constructor === wrappedCtr) {
        Object.seal(instance);
      }
      return instance;
    };
    return wrappedCtr;
  }
  return ctr;
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
goog.defineClass.applyProperties_ = function(target, source) {
  var key;
  for (key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }
  for (var i = 0;i < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length;i++) {
    key = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[i];
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }
};
goog.tagUnsealableClass = function(ctr) {
  if (!COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES) {
    ctr.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = true;
  }
};
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
goog.provide("wd.core.view.EventQueue");
wd.core.view.EventQueue = function() {
  this.eventLists_ = [];
  this.recursionDepth_ = 0;
};
wd.core.view.EventQueue.prototype.queueEvents = function(eventDataList) {
  var currList = null;
  for (var i = 0;i < eventDataList.length;i++) {
    var eventData = eventDataList[i];
    var eventPath = eventData.getPath();
    if (currList !== null && !eventPath.equals(currList.getPath())) {
      this.eventLists_.push(currList);
      currList = null;
    }
    if (currList === null) {
      currList = new wd.core.view.EventList(eventPath);
    }
    currList.add(eventData);
  }
  if (currList) {
    this.eventLists_.push(currList);
  }
};
wd.core.view.EventQueue.prototype.raiseEventsAtPath = function(path, eventDataList) {
  this.queueEvents(eventDataList);
  this.raiseQueuedEventsMatchingPredicate_(function(eventPath) {
    return eventPath.equals(path);
  });
};
wd.core.view.EventQueue.prototype.raiseEventsForChangedPath = function(changedPath, eventDataList) {
  this.queueEvents(eventDataList);
  this.raiseQueuedEventsMatchingPredicate_(function(eventPath) {
    return eventPath.contains(changedPath) || changedPath.contains(eventPath);
  });
};
wd.core.view.EventQueue.prototype.raiseQueuedEventsMatchingPredicate_ = function(predicate) {
  this.recursionDepth_++;
  var sentAll = true;
  for (var i = 0;i < this.eventLists_.length;i++) {
    var eventList = this.eventLists_[i];
    if (eventList) {
      var eventPath = eventList.getPath();
      if (predicate(eventPath)) {
        this.eventLists_[i].raise();
        this.eventLists_[i] = null;
      } else {
        sentAll = false;
      }
    }
  }
  if (sentAll) {
    this.eventLists_ = [];
  }
  this.recursionDepth_--;
};
wd.core.view.EventList = function(path) {
  this.path_ = path;
  this.events_ = [];
};
wd.core.view.EventList.prototype.add = function(eventData) {
  this.events_.push(eventData);
};
wd.core.view.EventList.prototype.raise = function() {
  for (var i = 0;i < this.events_.length;i++) {
    var eventData = this.events_[i];
    if (eventData !== null) {
      this.events_[i] = null;
      var eventFn = eventData.getEventRunner();
      if (wd.core.util.logger) {
        wd.core.util.log("event: " + eventData.toString());
      }
      wd.core.util.exceptionGuard(eventFn);
    }
  }
};
wd.core.view.EventList.prototype.getPath = function() {
  return this.path_;
};
goog.provide("goog.string");
goog.provide("goog.string.Unicode");
goog.define("goog.string.DETECT_DOUBLE_ESCAPING", false);
goog.define("goog.string.FORCE_NON_DOM_HTML_UNESCAPING", false);
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(str, prefix) {
  return str.lastIndexOf(prefix, 0) == 0;
};
goog.string.endsWith = function(str, suffix) {
  var l = str.length - suffix.length;
  return l >= 0 && str.indexOf(suffix, l) == l;
};
goog.string.caseInsensitiveStartsWith = function(str, prefix) {
  return goog.string.caseInsensitiveCompare(prefix, str.substr(0, prefix.length)) == 0;
};
goog.string.caseInsensitiveEndsWith = function(str, suffix) {
  return goog.string.caseInsensitiveCompare(suffix, str.substr(str.length - suffix.length, suffix.length)) == 0;
};
goog.string.caseInsensitiveEquals = function(str1, str2) {
  return str1.toLowerCase() == str2.toLowerCase();
};
goog.string.subs = function(str, var_args) {
  var splitParts = str.split("%s");
  var returnString = "";
  var subsArguments = Array.prototype.slice.call(arguments, 1);
  while (subsArguments.length && splitParts.length > 1) {
    returnString += splitParts.shift() + subsArguments.shift();
  }
  return returnString + splitParts.join("%s");
};
goog.string.collapseWhitespace = function(str) {
  return str.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
};
goog.string.isEmptyOrWhitespace = function(str) {
  return /^[\s\xa0]*$/.test(str);
};
goog.string.isEmptyString = function(str) {
  return str.length == 0;
};
goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
goog.string.isEmptyOrWhitespaceSafe = function(str) {
  return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(str));
};
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
goog.string.isBreakingWhitespace = function(str) {
  return !/[^\t\n\r ]/.test(str);
};
goog.string.isAlpha = function(str) {
  return !/[^a-zA-Z]/.test(str);
};
goog.string.isNumeric = function(str) {
  return !/[^0-9]/.test(str);
};
goog.string.isAlphaNumeric = function(str) {
  return !/[^a-zA-Z0-9]/.test(str);
};
goog.string.isSpace = function(ch) {
  return ch == " ";
};
goog.string.isUnicodeChar = function(ch) {
  return ch.length == 1 && ch >= " " && ch <= "~" || ch >= "\u0080" && ch <= "\ufffd";
};
goog.string.stripNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)+/g, " ");
};
goog.string.canonicalizeNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)/g, "\n");
};
goog.string.normalizeWhitespace = function(str) {
  return str.replace(/\xa0|\s/g, " ");
};
goog.string.normalizeSpaces = function(str) {
  return str.replace(/\xa0|[ \t]+/g, " ");
};
goog.string.collapseBreakingSpaces = function(str) {
  return str.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
};
goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function(str) {
  return str.trim();
} : function(str) {
  return str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
};
goog.string.trimLeft = function(str) {
  return str.replace(/^[\s\xa0]+/, "");
};
goog.string.trimRight = function(str) {
  return str.replace(/[\s\xa0]+$/, "");
};
goog.string.caseInsensitiveCompare = function(str1, str2) {
  var test1 = String(str1).toLowerCase();
  var test2 = String(str2).toLowerCase();
  if (test1 < test2) {
    return -1;
  } else {
    if (test1 == test2) {
      return 0;
    } else {
      return 1;
    }
  }
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(str1, str2) {
  if (str1 == str2) {
    return 0;
  }
  if (!str1) {
    return -1;
  }
  if (!str2) {
    return 1;
  }
  var tokens1 = str1.toLowerCase().match(goog.string.numerateCompareRegExp_);
  var tokens2 = str2.toLowerCase().match(goog.string.numerateCompareRegExp_);
  var count = Math.min(tokens1.length, tokens2.length);
  for (var i = 0;i < count;i++) {
    var a = tokens1[i];
    var b = tokens2[i];
    if (a != b) {
      var num1 = parseInt(a, 10);
      if (!isNaN(num1)) {
        var num2 = parseInt(b, 10);
        if (!isNaN(num2) && num1 - num2) {
          return num1 - num2;
        }
      }
      return a < b ? -1 : 1;
    }
  }
  if (tokens1.length != tokens2.length) {
    return tokens1.length - tokens2.length;
  }
  return str1 < str2 ? -1 : 1;
};
goog.string.urlEncode = function(str) {
  return encodeURIComponent(String(str));
};
goog.string.urlDecode = function(str) {
  return decodeURIComponent(str.replace(/\+/g, " "));
};
goog.string.newLineToBr = function(str, opt_xml) {
  return str.replace(/(\r\n|\r|\n)/g, opt_xml ? "<br />" : "<br>");
};
goog.string.htmlEscape = function(str, opt_isLikelyToContainHtmlChars) {
  if (opt_isLikelyToContainHtmlChars) {
    str = str.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;");
    if (goog.string.DETECT_DOUBLE_ESCAPING) {
      str = str.replace(goog.string.E_RE_, "&#101;");
    }
    return str;
  } else {
    if (!goog.string.ALL_RE_.test(str)) {
      return str;
    }
    if (str.indexOf("&") != -1) {
      str = str.replace(goog.string.AMP_RE_, "&amp;");
    }
    if (str.indexOf("<") != -1) {
      str = str.replace(goog.string.LT_RE_, "&lt;");
    }
    if (str.indexOf(">") != -1) {
      str = str.replace(goog.string.GT_RE_, "&gt;");
    }
    if (str.indexOf('"') != -1) {
      str = str.replace(goog.string.QUOT_RE_, "&quot;");
    }
    if (str.indexOf("'") != -1) {
      str = str.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;");
    }
    if (str.indexOf("\x00") != -1) {
      str = str.replace(goog.string.NULL_RE_, "&#0;");
    }
    if (goog.string.DETECT_DOUBLE_ESCAPING && str.indexOf("e") != -1) {
      str = str.replace(goog.string.E_RE_, "&#101;");
    }
    return str;
  }
};
goog.string.AMP_RE_ = /&/g;
goog.string.LT_RE_ = /</g;
goog.string.GT_RE_ = />/g;
goog.string.QUOT_RE_ = /"/g;
goog.string.SINGLE_QUOTE_RE_ = /'/g;
goog.string.NULL_RE_ = /\x00/g;
goog.string.E_RE_ = /e/g;
goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
goog.string.unescapeEntities = function(str) {
  if (goog.string.contains(str, "&")) {
    if (!goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global) {
      return goog.string.unescapeEntitiesUsingDom_(str);
    } else {
      return goog.string.unescapePureXmlEntities_(str);
    }
  }
  return str;
};
goog.string.unescapeEntitiesWithDocument = function(str, document) {
  if (goog.string.contains(str, "&")) {
    return goog.string.unescapeEntitiesUsingDom_(str, document);
  }
  return str;
};
goog.string.unescapeEntitiesUsingDom_ = function(str, opt_document) {
  var seen = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'};
  var div;
  if (opt_document) {
    div = opt_document.createElement("div");
  } else {
    div = goog.global.document.createElement("div");
  }
  return str.replace(goog.string.HTML_ENTITY_PATTERN_, function(s, entity) {
    var value = seen[s];
    if (value) {
      return value;
    }
    if (entity.charAt(0) == "#") {
      var n = Number("0" + entity.substr(1));
      if (!isNaN(n)) {
        value = String.fromCharCode(n);
      }
    }
    if (!value) {
      div.innerHTML = s + " ";
      value = div.firstChild.nodeValue.slice(0, -1);
    }
    return seen[s] = value;
  });
};
goog.string.unescapePureXmlEntities_ = function(str) {
  return str.replace(/&([^;]+);/g, function(s, entity) {
    switch(entity) {
      case "amp":
        return "&";
      case "lt":
        return "<";
      case "gt":
        return ">";
      case "quot":
        return '"';
      default:
        if (entity.charAt(0) == "#") {
          var n = Number("0" + entity.substr(1));
          if (!isNaN(n)) {
            return String.fromCharCode(n);
          }
        }
        return s;
    }
  });
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(str, opt_xml) {
  return goog.string.newLineToBr(str.replace(/  /g, " &#160;"), opt_xml);
};
goog.string.preserveSpaces = function(str) {
  return str.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP);
};
goog.string.stripQuotes = function(str, quoteChars) {
  var length = quoteChars.length;
  for (var i = 0;i < length;i++) {
    var quoteChar = length == 1 ? quoteChars : quoteChars.charAt(i);
    if (str.charAt(0) == quoteChar && str.charAt(str.length - 1) == quoteChar) {
      return str.substring(1, str.length - 1);
    }
  }
  return str;
};
goog.string.truncate = function(str, chars, opt_protectEscapedCharacters) {
  if (opt_protectEscapedCharacters) {
    str = goog.string.unescapeEntities(str);
  }
  if (str.length > chars) {
    str = str.substring(0, chars - 3) + "...";
  }
  if (opt_protectEscapedCharacters) {
    str = goog.string.htmlEscape(str);
  }
  return str;
};
goog.string.truncateMiddle = function(str, chars, opt_protectEscapedCharacters, opt_trailingChars) {
  if (opt_protectEscapedCharacters) {
    str = goog.string.unescapeEntities(str);
  }
  if (opt_trailingChars && str.length > chars) {
    if (opt_trailingChars > chars) {
      opt_trailingChars = chars;
    }
    var endPoint = str.length - opt_trailingChars;
    var startPoint = chars - opt_trailingChars;
    str = str.substring(0, startPoint) + "..." + str.substring(endPoint);
  } else {
    if (str.length > chars) {
      var half = Math.floor(chars / 2);
      var endPos = str.length - half;
      half += chars % 2;
      str = str.substring(0, half) + "..." + str.substring(endPos);
    }
  }
  if (opt_protectEscapedCharacters) {
    str = goog.string.htmlEscape(str);
  }
  return str;
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(s) {
  s = String(s);
  if (s.quote) {
    return s.quote();
  } else {
    var sb = ['"'];
    for (var i = 0;i < s.length;i++) {
      var ch = s.charAt(i);
      var cc = ch.charCodeAt(0);
      sb[i + 1] = goog.string.specialEscapeChars_[ch] || (cc > 31 && cc < 127 ? ch : goog.string.escapeChar(ch));
    }
    sb.push('"');
    return sb.join("");
  }
};
goog.string.escapeString = function(str) {
  var sb = [];
  for (var i = 0;i < str.length;i++) {
    sb[i] = goog.string.escapeChar(str.charAt(i));
  }
  return sb.join("");
};
goog.string.escapeChar = function(c) {
  if (c in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[c];
  }
  if (c in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[c] = goog.string.specialEscapeChars_[c];
  }
  var rv = c;
  var cc = c.charCodeAt(0);
  if (cc > 31 && cc < 127) {
    rv = c;
  } else {
    if (cc < 256) {
      rv = "\\x";
      if (cc < 16 || cc > 256) {
        rv += "0";
      }
    } else {
      rv = "\\u";
      if (cc < 4096) {
        rv += "0";
      }
    }
    rv += cc.toString(16).toUpperCase();
  }
  return goog.string.jsEscapeCache_[c] = rv;
};
goog.string.contains = function(str, subString) {
  return str.indexOf(subString) != -1;
};
goog.string.caseInsensitiveContains = function(str, subString) {
  return goog.string.contains(str.toLowerCase(), subString.toLowerCase());
};
goog.string.countOf = function(s, ss) {
  return s && ss ? s.split(ss).length - 1 : 0;
};
goog.string.removeAt = function(s, index, stringLength) {
  var resultStr = s;
  if (index >= 0 && index < s.length && stringLength > 0) {
    resultStr = s.substr(0, index) + s.substr(index + stringLength, s.length - index - stringLength);
  }
  return resultStr;
};
goog.string.remove = function(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "");
  return s.replace(re, "");
};
goog.string.removeAll = function(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "g");
  return s.replace(re, "");
};
goog.string.regExpEscape = function(s) {
  return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
};
goog.string.repeat = function(string, length) {
  return (new Array(length + 1)).join(string);
};
goog.string.padNumber = function(num, length, opt_precision) {
  var s = goog.isDef(opt_precision) ? num.toFixed(opt_precision) : String(num);
  var index = s.indexOf(".");
  if (index == -1) {
    index = s.length;
  }
  return goog.string.repeat("0", Math.max(0, length - index)) + s;
};
goog.string.makeSafe = function(obj) {
  return obj == null ? "" : String(obj);
};
goog.string.buildString = function(var_args) {
  return Array.prototype.join.call(arguments, "");
};
goog.string.getRandomString = function() {
  var x = 2147483648;
  return Math.floor(Math.random() * x).toString(36) + Math.abs(Math.floor(Math.random() * x) ^ goog.now()).toString(36);
};
goog.string.compareVersions = function(version1, version2) {
  var order = 0;
  var v1Subs = goog.string.trim(String(version1)).split(".");
  var v2Subs = goog.string.trim(String(version2)).split(".");
  var subCount = Math.max(v1Subs.length, v2Subs.length);
  for (var subIdx = 0;order == 0 && subIdx < subCount;subIdx++) {
    var v1Sub = v1Subs[subIdx] || "";
    var v2Sub = v2Subs[subIdx] || "";
    var v1CompParser = new RegExp("(\\d*)(\\D*)", "g");
    var v2CompParser = new RegExp("(\\d*)(\\D*)", "g");
    do {
      var v1Comp = v1CompParser.exec(v1Sub) || ["", "", ""];
      var v2Comp = v2CompParser.exec(v2Sub) || ["", "", ""];
      if (v1Comp[0].length == 0 && v2Comp[0].length == 0) {
        break;
      }
      var v1CompNum = v1Comp[1].length == 0 ? 0 : parseInt(v1Comp[1], 10);
      var v2CompNum = v2Comp[1].length == 0 ? 0 : parseInt(v2Comp[1], 10);
      order = goog.string.compareElements_(v1CompNum, v2CompNum) || goog.string.compareElements_(v1Comp[2].length == 0, v2Comp[2].length == 0) || goog.string.compareElements_(v1Comp[2], v2Comp[2]);
    } while (order == 0);
  }
  return order;
};
goog.string.compareElements_ = function(left, right) {
  if (left < right) {
    return -1;
  } else {
    if (left > right) {
      return 1;
    }
  }
  return 0;
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(str) {
  var result = 0;
  for (var i = 0;i < str.length;++i) {
    result = 31 * result + str.charCodeAt(i);
    result %= goog.string.HASHCODE_MAX_;
  }
  return result;
};
goog.string.uniqueStringCounter_ = Math.random() * 2147483648 | 0;
goog.string.createUniqueString = function() {
  return "goog_" + goog.string.uniqueStringCounter_++;
};
goog.string.toNumber = function(str) {
  var num = Number(str);
  if (num == 0 && goog.string.isEmptyOrWhitespace(str)) {
    return NaN;
  }
  return num;
};
goog.string.isLowerCamelCase = function(str) {
  return /^[a-z]+([A-Z][a-z]*)*$/.test(str);
};
goog.string.isUpperCamelCase = function(str) {
  return /^([A-Z][a-z]*)+$/.test(str);
};
goog.string.toCamelCase = function(str) {
  return String(str).replace(/\-([a-z])/g, function(all, match) {
    return match.toUpperCase();
  });
};
goog.string.toSelectorCase = function(str) {
  return String(str).replace(/([A-Z])/g, "-$1").toLowerCase();
};
goog.string.toTitleCase = function(str, opt_delimiters) {
  var delimiters = goog.isString(opt_delimiters) ? goog.string.regExpEscape(opt_delimiters) : "\\s";
  delimiters = delimiters ? "|[" + delimiters + "]+" : "";
  var regexp = new RegExp("(^" + delimiters + ")([a-z])", "g");
  return str.replace(regexp, function(all, p1, p2) {
    return p1 + p2.toUpperCase();
  });
};
goog.string.capitalize = function(str) {
  return String(str.charAt(0)).toUpperCase() + String(str.substr(1)).toLowerCase();
};
goog.string.parseInt = function(value) {
  if (isFinite(value)) {
    value = String(value);
  }
  if (goog.isString(value)) {
    return /^\s*-?0x/i.test(value) ? parseInt(value, 16) : parseInt(value, 10);
  }
  return NaN;
};
goog.string.splitLimit = function(str, separator, limit) {
  var parts = str.split(separator);
  var returnVal = [];
  while (limit > 0 && parts.length) {
    returnVal.push(parts.shift());
    limit--;
  }
  if (parts.length) {
    returnVal.push(parts.join(separator));
  }
  return returnVal;
};
goog.string.editDistance = function(a, b) {
  var v0 = [];
  var v1 = [];
  if (a == b) {
    return 0;
  }
  if (!a.length || !b.length) {
    return Math.max(a.length, b.length);
  }
  for (var i = 0;i < b.length + 1;i++) {
    v0[i] = i;
  }
  for (var i = 0;i < a.length;i++) {
    v1[0] = i + 1;
    for (var j = 0;j < b.length;j++) {
      var cost = a[i] != b[j];
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }
    for (var j = 0;j < v0.length;j++) {
      v0[j] = v1[j];
    }
  }
  return v1[b.length];
};
goog.provide("wd.core.util.ServerValues");
wd.core.util.ServerValues.generateWithValues = function(values) {
  values = values || {};
  values["timestamp"] = values["timestamp"] || (new Date).getTime();
  return values;
};
wd.core.util.ServerValues.resolveDeferredValue = function(value, serverValues) {
  if (!value || typeof value !== "object") {
    return value;
  } else {
    wd.core.util.assert(".sv" in value, "Unexpected leaf node or priority contents");
    return serverValues[value[".sv"]];
  }
};
wd.core.util.ServerValues.resolveDeferredValueTree = function(tree, serverValues) {
  var resolvedTree = new wd.core.SparseSnapshotTree;
  tree.forEachTree(new wd.core.util.Path(""), function(path, node) {
    resolvedTree.remember(path, wd.core.util.ServerValues.resolveDeferredValueSnapshot(node, serverValues));
  });
  return resolvedTree;
};
wd.core.util.ServerValues.resolveDeferredValueSnapshot = function(node, serverValues) {
  var rawPri = node.getPriority().val(), priority = wd.core.util.ServerValues.resolveDeferredValue(rawPri, serverValues), newNode;
  if (node.isLeafNode()) {
    var leafNode = node;
    var value = wd.core.util.ServerValues.resolveDeferredValue(leafNode.getValue(), serverValues);
    if (value !== leafNode.getValue() || priority !== leafNode.getPriority().val()) {
      return new wd.core.snap.LeafNode(value, wd.core.snap.NodeFromJSON(priority));
    } else {
      return node;
    }
  } else {
    var childrenNode = node;
    newNode = childrenNode;
    if (priority !== childrenNode.getPriority().val()) {
      newNode = newNode.updatePriority(new wd.core.snap.LeafNode(priority));
    }
    childrenNode.forEachChild(wd.core.snap.PriorityIndex, function(childName, childNode) {
      var newChildNode = wd.core.util.ServerValues.resolveDeferredValueSnapshot(childNode, serverValues);
      if (newChildNode !== childNode) {
        newNode = newNode.updateImmediateChild(childName, newChildNode);
      }
    });
    return newNode;
  }
};
goog.provide("goog.dom.NodeType");
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.provide("goog.debug.Error");
goog.debug.Error = function(opt_msg) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, goog.debug.Error);
  } else {
    var stack = (new Error).stack;
    if (stack) {
      this.stack = stack;
    }
  }
  if (opt_msg) {
    this.message = String(opt_msg);
  }
  this.reportErrorToServer = true;
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.provide("goog.asserts");
goog.provide("goog.asserts.AssertionError");
goog.require("goog.debug.Error");
goog.require("goog.dom.NodeType");
goog.require("goog.string");
goog.define("goog.asserts.ENABLE_ASSERTS", goog.DEBUG);
goog.asserts.AssertionError = function(messagePattern, messageArgs) {
  messageArgs.unshift(messagePattern);
  goog.debug.Error.call(this, goog.string.subs.apply(null, messageArgs));
  messageArgs.shift();
  this.messagePattern = messagePattern;
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.DEFAULT_ERROR_HANDLER = function(e) {
  throw e;
};
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.doAssertFailure_ = function(defaultMessage, defaultArgs, givenMessage, givenArgs) {
  var message = "Assertion failed";
  if (givenMessage) {
    message += ": " + givenMessage;
    var args = givenArgs;
  } else {
    if (defaultMessage) {
      message += ": " + defaultMessage;
      args = defaultArgs;
    }
  }
  var e = new goog.asserts.AssertionError("" + message, args || []);
  goog.asserts.errorHandler_(e);
};
goog.asserts.setErrorHandler = function(errorHandler) {
  if (goog.asserts.ENABLE_ASSERTS) {
    goog.asserts.errorHandler_ = errorHandler;
  }
};
goog.asserts.assert = function(condition, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !condition) {
    goog.asserts.doAssertFailure_("", null, opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return condition;
};
goog.asserts.fail = function(opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS) {
    goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (opt_message ? ": " + opt_message : ""), Array.prototype.slice.call(arguments, 1)));
  }
};
goog.asserts.assertNumber = function(value, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !goog.isNumber(value)) {
    goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return (value);
};
goog.asserts.assertString = function(value, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !goog.isString(value)) {
    goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return (value);
};
goog.asserts.assertFunction = function(value, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !goog.isFunction(value)) {
    goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return (value);
};
goog.asserts.assertObject = function(value, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !goog.isObject(value)) {
    goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return (value);
};
goog.asserts.assertArray = function(value, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !goog.isArray(value)) {
    goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return (value);
};
goog.asserts.assertBoolean = function(value, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(value)) {
    goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return (value);
};
goog.asserts.assertElement = function(value, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && (!goog.isObject(value) || value.nodeType != goog.dom.NodeType.ELEMENT)) {
    goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return (value);
};
goog.asserts.assertInstanceof = function(value, type, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !(value instanceof type)) {
    goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(type), goog.asserts.getType_(value)], opt_message, Array.prototype.slice.call(arguments, 3));
  }
  return value;
};
goog.asserts.assertObjectPrototypeIsIntact = function() {
  for (var key in Object.prototype) {
    goog.asserts.fail(key + " should not be enumerable in Object.prototype.");
  }
};
goog.asserts.getType_ = function(value) {
  if (value instanceof Function) {
    return value.displayName || value.name || "unknown type name";
  } else {
    if (value instanceof Object) {
      return value.constructor.displayName || value.constructor.name || Object.prototype.toString.call(value);
    } else {
      return value === null ? "null" : typeof value;
    }
  }
};
goog.provide("goog.array");
goog.provide("goog.array.ArrayLike");
goog.require("goog.asserts");
goog.define("goog.NATIVE_ARRAY_PROTOTYPES", goog.TRUSTED_SITE);
goog.define("goog.array.ASSUME_NATIVE_FUNCTIONS", false);
goog.array.ArrayLike;
goog.array.peek = function(array) {
  return array[array.length - 1];
};
goog.array.last = goog.array.peek;
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.indexOf) ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(arr, obj, opt_fromIndex);
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = opt_fromIndex == null ? 0 : opt_fromIndex < 0 ? Math.max(0, arr.length + opt_fromIndex) : opt_fromIndex;
  if (goog.isString(arr)) {
    if (!goog.isString(obj) || obj.length != 1) {
      return -1;
    }
    return arr.indexOf(obj, fromIndex);
  }
  for (var i = fromIndex;i < arr.length;i++) {
    if (i in arr && arr[i] === obj) {
      return i;
    }
  }
  return -1;
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.lastIndexOf) ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(arr.length != null);
  var fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(arr, obj, fromIndex);
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;
  if (fromIndex < 0) {
    fromIndex = Math.max(0, arr.length + fromIndex);
  }
  if (goog.isString(arr)) {
    if (!goog.isString(obj) || obj.length != 1) {
      return -1;
    }
    return arr.lastIndexOf(obj, fromIndex);
  }
  for (var i = fromIndex;i >= 0;i--) {
    if (i in arr && arr[i] === obj) {
      return i;
    }
  }
  return -1;
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.forEach) ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = 0;i < l;i++) {
    if (i in arr2) {
      f.call(opt_obj, arr2[i], i, arr);
    }
  }
};
goog.array.forEachRight = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = l - 1;i >= 0;--i) {
    if (i in arr2) {
      f.call(opt_obj, arr2[i], i, arr);
    }
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.filter) ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var res = [];
  var resLength = 0;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = 0;i < l;i++) {
    if (i in arr2) {
      var val = arr2[i];
      if (f.call(opt_obj, val, i, arr)) {
        res[resLength++] = val;
      }
    }
  }
  return res;
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.map) ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.map.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var res = new Array(l);
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = 0;i < l;i++) {
    if (i in arr2) {
      res[i] = f.call(opt_obj, arr2[i], i, arr);
    }
  }
  return res;
};
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.reduce) ? function(arr, f, val, opt_obj) {
  goog.asserts.assert(arr.length != null);
  if (opt_obj) {
    f = goog.bind(f, opt_obj);
  }
  return goog.array.ARRAY_PROTOTYPE_.reduce.call(arr, f, val);
} : function(arr, f, val, opt_obj) {
  var rval = val;
  goog.array.forEach(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr);
  });
  return rval;
};
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.reduceRight) ? function(arr, f, val, opt_obj) {
  goog.asserts.assert(arr.length != null);
  if (opt_obj) {
    f = goog.bind(f, opt_obj);
  }
  return goog.array.ARRAY_PROTOTYPE_.reduceRight.call(arr, f, val);
} : function(arr, f, val, opt_obj) {
  var rval = val;
  goog.array.forEachRight(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr);
  });
  return rval;
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.some) ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.some.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = 0;i < l;i++) {
    if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return true;
    }
  }
  return false;
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.every) ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.every.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = 0;i < l;i++) {
    if (i in arr2 && !f.call(opt_obj, arr2[i], i, arr)) {
      return false;
    }
  }
  return true;
};
goog.array.count = function(arr, f, opt_obj) {
  var count = 0;
  goog.array.forEach(arr, function(element, index, arr) {
    if (f.call(opt_obj, element, index, arr)) {
      ++count;
    }
  }, opt_obj);
  return count;
};
goog.array.find = function(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  return i < 0 ? null : goog.isString(arr) ? arr.charAt(i) : arr[i];
};
goog.array.findIndex = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = 0;i < l;i++) {
    if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i;
    }
  }
  return -1;
};
goog.array.findRight = function(arr, f, opt_obj) {
  var i = goog.array.findIndexRight(arr, f, opt_obj);
  return i < 0 ? null : goog.isString(arr) ? arr.charAt(i) : arr[i];
};
goog.array.findIndexRight = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = l - 1;i >= 0;i--) {
    if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i;
    }
  }
  return -1;
};
goog.array.contains = function(arr, obj) {
  return goog.array.indexOf(arr, obj) >= 0;
};
goog.array.isEmpty = function(arr) {
  return arr.length == 0;
};
goog.array.clear = function(arr) {
  if (!goog.isArray(arr)) {
    for (var i = arr.length - 1;i >= 0;i--) {
      delete arr[i];
    }
  }
  arr.length = 0;
};
goog.array.insert = function(arr, obj) {
  if (!goog.array.contains(arr, obj)) {
    arr.push(obj);
  }
};
goog.array.insertAt = function(arr, obj, opt_i) {
  goog.array.splice(arr, opt_i, 0, obj);
};
goog.array.insertArrayAt = function(arr, elementsToAdd, opt_i) {
  goog.partial(goog.array.splice, arr, opt_i, 0).apply(null, elementsToAdd);
};
goog.array.insertBefore = function(arr, obj, opt_obj2) {
  var i;
  if (arguments.length == 2 || (i = goog.array.indexOf(arr, opt_obj2)) < 0) {
    arr.push(obj);
  } else {
    goog.array.insertAt(arr, obj, i);
  }
};
goog.array.remove = function(arr, obj) {
  var i = goog.array.indexOf(arr, obj);
  var rv;
  if (rv = i >= 0) {
    goog.array.removeAt(arr, i);
  }
  return rv;
};
goog.array.removeAt = function(arr, i) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.splice.call(arr, i, 1).length == 1;
};
goog.array.removeIf = function(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  if (i >= 0) {
    goog.array.removeAt(arr, i);
    return true;
  }
  return false;
};
goog.array.removeAllIf = function(arr, f, opt_obj) {
  var removedCount = 0;
  goog.array.forEachRight(arr, function(val, index) {
    if (f.call(opt_obj, val, index, arr)) {
      if (goog.array.removeAt(arr, index)) {
        removedCount++;
      }
    }
  });
  return removedCount;
};
goog.array.concat = function(var_args) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments);
};
goog.array.join = function(var_args) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments);
};
goog.array.toArray = function(object) {
  var length = object.length;
  if (length > 0) {
    var rv = new Array(length);
    for (var i = 0;i < length;i++) {
      rv[i] = object[i];
    }
    return rv;
  }
  return [];
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(arr1, var_args) {
  for (var i = 1;i < arguments.length;i++) {
    var arr2 = arguments[i];
    if (goog.isArrayLike(arr2)) {
      var len1 = arr1.length || 0;
      var len2 = arr2.length || 0;
      arr1.length = len1 + len2;
      for (var j = 0;j < len2;j++) {
        arr1[len1 + j] = arr2[j];
      }
    } else {
      arr1.push(arr2);
    }
  }
};
goog.array.splice = function(arr, index, howMany, var_args) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(arr, goog.array.slice(arguments, 1));
};
goog.array.slice = function(arr, start, opt_end) {
  goog.asserts.assert(arr.length != null);
  if (arguments.length <= 2) {
    return goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start);
  } else {
    return goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start, opt_end);
  }
};
goog.array.removeDuplicates = function(arr, opt_rv, opt_hashFn) {
  var returnArray = opt_rv || arr;
  var defaultHashFn = function(item) {
    return goog.isObject(current) ? "o" + goog.getUid(current) : (typeof current).charAt(0) + current;
  };
  var hashFn = opt_hashFn || defaultHashFn;
  var seen = {}, cursorInsert = 0, cursorRead = 0;
  while (cursorRead < arr.length) {
    var current = arr[cursorRead++];
    var key = hashFn(current);
    if (!Object.prototype.hasOwnProperty.call(seen, key)) {
      seen[key] = true;
      returnArray[cursorInsert++] = current;
    }
  }
  returnArray.length = cursorInsert;
};
goog.array.binarySearch = function(arr, target, opt_compareFn) {
  return goog.array.binarySearch_(arr, opt_compareFn || goog.array.defaultCompare, false, target);
};
goog.array.binarySelect = function(arr, evaluator, opt_obj) {
  return goog.array.binarySearch_(arr, evaluator, true, undefined, opt_obj);
};
goog.array.binarySearch_ = function(arr, compareFn, isEvaluator, opt_target, opt_selfObj) {
  var left = 0;
  var right = arr.length;
  var found;
  while (left < right) {
    var middle = left + right >> 1;
    var compareResult;
    if (isEvaluator) {
      compareResult = compareFn.call(opt_selfObj, arr[middle], middle, arr);
    } else {
      compareResult = compareFn(opt_target, arr[middle]);
    }
    if (compareResult > 0) {
      left = middle + 1;
    } else {
      right = middle;
      found = !compareResult;
    }
  }
  return found ? left : ~left;
};
goog.array.sort = function(arr, opt_compareFn) {
  arr.sort(opt_compareFn || goog.array.defaultCompare);
};
goog.array.stableSort = function(arr, opt_compareFn) {
  for (var i = 0;i < arr.length;i++) {
    arr[i] = {index:i, value:arr[i]};
  }
  var valueCompareFn = opt_compareFn || goog.array.defaultCompare;
  function stableCompareFn(obj1, obj2) {
    return valueCompareFn(obj1.value, obj2.value) || obj1.index - obj2.index;
  }
  goog.array.sort(arr, stableCompareFn);
  for (var i = 0;i < arr.length;i++) {
    arr[i] = arr[i].value;
  }
};
goog.array.sortByKey = function(arr, keyFn, opt_compareFn) {
  var keyCompareFn = opt_compareFn || goog.array.defaultCompare;
  goog.array.sort(arr, function(a, b) {
    return keyCompareFn(keyFn(a), keyFn(b));
  });
};
goog.array.sortObjectsByKey = function(arr, key, opt_compareFn) {
  goog.array.sortByKey(arr, function(obj) {
    return obj[key];
  }, opt_compareFn);
};
goog.array.isSorted = function(arr, opt_compareFn, opt_strict) {
  var compare = opt_compareFn || goog.array.defaultCompare;
  for (var i = 1;i < arr.length;i++) {
    var compareResult = compare(arr[i - 1], arr[i]);
    if (compareResult > 0 || compareResult == 0 && opt_strict) {
      return false;
    }
  }
  return true;
};
goog.array.equals = function(arr1, arr2, opt_equalsFn) {
  if (!goog.isArrayLike(arr1) || !goog.isArrayLike(arr2) || arr1.length != arr2.length) {
    return false;
  }
  var l = arr1.length;
  var equalsFn = opt_equalsFn || goog.array.defaultCompareEquality;
  for (var i = 0;i < l;i++) {
    if (!equalsFn(arr1[i], arr2[i])) {
      return false;
    }
  }
  return true;
};
goog.array.compare3 = function(arr1, arr2, opt_compareFn) {
  var compare = opt_compareFn || goog.array.defaultCompare;
  var l = Math.min(arr1.length, arr2.length);
  for (var i = 0;i < l;i++) {
    var result = compare(arr1[i], arr2[i]);
    if (result != 0) {
      return result;
    }
  }
  return goog.array.defaultCompare(arr1.length, arr2.length);
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
};
goog.array.inverseDefaultCompare = function(a, b) {
  return -goog.array.defaultCompare(a, b);
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b;
};
goog.array.binaryInsert = function(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  if (index < 0) {
    goog.array.insertAt(array, value, -(index + 1));
    return true;
  }
  return false;
};
goog.array.binaryRemove = function(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  return index >= 0 ? goog.array.removeAt(array, index) : false;
};
goog.array.bucket = function(array, sorter, opt_obj) {
  var buckets = {};
  for (var i = 0;i < array.length;i++) {
    var value = array[i];
    var key = sorter.call(opt_obj, value, i, array);
    if (goog.isDef(key)) {
      var bucket = buckets[key] || (buckets[key] = []);
      bucket.push(value);
    }
  }
  return buckets;
};
goog.array.toObject = function(arr, keyFunc, opt_obj) {
  var ret = {};
  goog.array.forEach(arr, function(element, index) {
    ret[keyFunc.call(opt_obj, element, index, arr)] = element;
  });
  return ret;
};
goog.array.range = function(startOrEnd, opt_end, opt_step) {
  var array = [];
  var start = 0;
  var end = startOrEnd;
  var step = opt_step || 1;
  if (opt_end !== undefined) {
    start = startOrEnd;
    end = opt_end;
  }
  if (step * (end - start) < 0) {
    return [];
  }
  if (step > 0) {
    for (var i = start;i < end;i += step) {
      array.push(i);
    }
  } else {
    for (var i = start;i > end;i += step) {
      array.push(i);
    }
  }
  return array;
};
goog.array.repeat = function(value, n) {
  var array = [];
  for (var i = 0;i < n;i++) {
    array[i] = value;
  }
  return array;
};
goog.array.flatten = function(var_args) {
  var CHUNK_SIZE = 8192;
  var result = [];
  for (var i = 0;i < arguments.length;i++) {
    var element = arguments[i];
    if (goog.isArray(element)) {
      for (var c = 0;c < element.length;c += CHUNK_SIZE) {
        var chunk = goog.array.slice(element, c, c + CHUNK_SIZE);
        var recurseResult = goog.array.flatten.apply(null, chunk);
        for (var r = 0;r < recurseResult.length;r++) {
          result.push(recurseResult[r]);
        }
      }
    } else {
      result.push(element);
    }
  }
  return result;
};
goog.array.rotate = function(array, n) {
  goog.asserts.assert(array.length != null);
  if (array.length) {
    n %= array.length;
    if (n > 0) {
      goog.array.ARRAY_PROTOTYPE_.unshift.apply(array, array.splice(-n, n));
    } else {
      if (n < 0) {
        goog.array.ARRAY_PROTOTYPE_.push.apply(array, array.splice(0, -n));
      }
    }
  }
  return array;
};
goog.array.moveItem = function(arr, fromIndex, toIndex) {
  goog.asserts.assert(fromIndex >= 0 && fromIndex < arr.length);
  goog.asserts.assert(toIndex >= 0 && toIndex < arr.length);
  var removedItems = goog.array.ARRAY_PROTOTYPE_.splice.call(arr, fromIndex, 1);
  goog.array.ARRAY_PROTOTYPE_.splice.call(arr, toIndex, 0, removedItems[0]);
};
goog.array.zip = function(var_args) {
  if (!arguments.length) {
    return [];
  }
  var result = [];
  for (var i = 0;true;i++) {
    var value = [];
    for (var j = 0;j < arguments.length;j++) {
      var arr = arguments[j];
      if (i >= arr.length) {
        return result;
      }
      value.push(arr[i]);
    }
    result.push(value);
  }
};
goog.array.shuffle = function(arr, opt_randFn) {
  var randFn = opt_randFn || Math.random;
  for (var i = arr.length - 1;i > 0;i--) {
    var j = Math.floor(randFn() * (i + 1));
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
};
goog.array.copyByIndex = function(arr, index_arr) {
  var result = [];
  goog.array.forEach(index_arr, function(index) {
    result.push(arr[index]);
  });
  return result;
};
goog.provide("goog.object");
goog.object.forEach = function(obj, f, opt_obj) {
  for (var key in obj) {
    f.call(opt_obj, obj[key], key, obj);
  }
};
goog.object.filter = function(obj, f, opt_obj) {
  var res = {};
  for (var key in obj) {
    if (f.call(opt_obj, obj[key], key, obj)) {
      res[key] = obj[key];
    }
  }
  return res;
};
goog.object.map = function(obj, f, opt_obj) {
  var res = {};
  for (var key in obj) {
    res[key] = f.call(opt_obj, obj[key], key, obj);
  }
  return res;
};
goog.object.some = function(obj, f, opt_obj) {
  for (var key in obj) {
    if (f.call(opt_obj, obj[key], key, obj)) {
      return true;
    }
  }
  return false;
};
goog.object.every = function(obj, f, opt_obj) {
  for (var key in obj) {
    if (!f.call(opt_obj, obj[key], key, obj)) {
      return false;
    }
  }
  return true;
};
goog.object.getCount = function(obj) {
  var rv = 0;
  for (var key in obj) {
    rv++;
  }
  return rv;
};
goog.object.getAnyKey = function(obj) {
  for (var key in obj) {
    return key;
  }
};
goog.object.getAnyValue = function(obj) {
  for (var key in obj) {
    return obj[key];
  }
};
goog.object.contains = function(obj, val) {
  return goog.object.containsValue(obj, val);
};
goog.object.getValues = function(obj) {
  var res = [];
  var i = 0;
  for (var key in obj) {
    res[i++] = obj[key];
  }
  return res;
};
goog.object.getKeys = function(obj) {
  var res = [];
  var i = 0;
  for (var key in obj) {
    res[i++] = key;
  }
  return res;
};
goog.object.getValueByKeys = function(obj, var_args) {
  var isArrayLike = goog.isArrayLike(var_args);
  var keys = isArrayLike ? var_args : arguments;
  for (var i = isArrayLike ? 0 : 1;i < keys.length;i++) {
    obj = obj[keys[i]];
    if (!goog.isDef(obj)) {
      break;
    }
  }
  return obj;
};
goog.object.containsKey = function(obj, key) {
  return key in obj;
};
goog.object.containsValue = function(obj, val) {
  for (var key in obj) {
    if (obj[key] == val) {
      return true;
    }
  }
  return false;
};
goog.object.findKey = function(obj, f, opt_this) {
  for (var key in obj) {
    if (f.call(opt_this, obj[key], key, obj)) {
      return key;
    }
  }
  return undefined;
};
goog.object.findValue = function(obj, f, opt_this) {
  var key = goog.object.findKey(obj, f, opt_this);
  return key && obj[key];
};
goog.object.isEmpty = function(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
};
goog.object.clear = function(obj) {
  for (var i in obj) {
    delete obj[i];
  }
};
goog.object.remove = function(obj, key) {
  var rv;
  if (rv = key in obj) {
    delete obj[key];
  }
  return rv;
};
goog.object.add = function(obj, key, val) {
  if (key in obj) {
    throw Error('The object already contains the key "' + key + '"');
  }
  goog.object.set(obj, key, val);
};
goog.object.get = function(obj, key, opt_val) {
  if (key in obj) {
    return obj[key];
  }
  return opt_val;
};
goog.object.set = function(obj, key, value) {
  obj[key] = value;
};
goog.object.setIfUndefined = function(obj, key, value) {
  return key in obj ? obj[key] : obj[key] = value;
};
goog.object.setWithReturnValueIfNotSet = function(obj, key, f) {
  if (key in obj) {
    return obj[key];
  }
  var val = f();
  obj[key] = val;
  return val;
};
goog.object.equals = function(a, b) {
  for (var k in a) {
    if (!(k in b) || a[k] !== b[k]) {
      return false;
    }
  }
  for (var k in b) {
    if (!(k in a)) {
      return false;
    }
  }
  return true;
};
goog.object.clone = function(obj) {
  var res = {};
  for (var key in obj) {
    res[key] = obj[key];
  }
  return res;
};
goog.object.unsafeClone = function(obj) {
  var type = goog.typeOf(obj);
  if (type == "object" || type == "array") {
    if (obj.clone) {
      return obj.clone();
    }
    var clone = type == "array" ? [] : {};
    for (var key in obj) {
      clone[key] = goog.object.unsafeClone(obj[key]);
    }
    return clone;
  }
  return obj;
};
goog.object.transpose = function(obj) {
  var transposed = {};
  for (var key in obj) {
    transposed[obj[key]] = key;
  }
  return transposed;
};
goog.object.PROTOTYPE_FIELDS_ = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
goog.object.extend = function(target, var_args) {
  var key, source;
  for (var i = 1;i < arguments.length;i++) {
    source = arguments[i];
    for (key in source) {
      target[key] = source[key];
    }
    for (var j = 0;j < goog.object.PROTOTYPE_FIELDS_.length;j++) {
      key = goog.object.PROTOTYPE_FIELDS_[j];
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
};
goog.object.create = function(var_args) {
  var argLength = arguments.length;
  if (argLength == 1 && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0]);
  }
  if (argLength % 2) {
    throw Error("Uneven number of arguments");
  }
  var rv = {};
  for (var i = 0;i < argLength;i += 2) {
    rv[arguments[i]] = arguments[i + 1];
  }
  return rv;
};
goog.object.createSet = function(var_args) {
  var argLength = arguments.length;
  if (argLength == 1 && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0]);
  }
  var rv = {};
  for (var i = 0;i < argLength;i++) {
    rv[arguments[i]] = true;
  }
  return rv;
};
goog.object.createImmutableView = function(obj) {
  var result = obj;
  if (Object.isFrozen && !Object.isFrozen(obj)) {
    result = Object.create(obj);
    Object.freeze(result);
  }
  return result;
};
goog.object.isImmutableView = function(obj) {
  return !!Object.isFrozen && Object.isFrozen(obj);
};
goog.provide("wd.util.obj");
wd.util.obj.contains = function(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
};
wd.util.obj.get = function(obj, key) {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key];
  }
};
wd.util.obj.foreach = function(obj, fn) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      fn(key, obj[key]);
    }
  }
};
wd.util.obj.clone = function(obj) {
  var clone = {};
  wd.util.obj.foreach(obj, function(key, value) {
    clone[key] = value;
  });
  return clone;
};
goog.provide("wd.core.stats.StatsCollection");
goog.require("wd.util.obj");
goog.require("goog.array");
goog.require("goog.object");
wd.core.stats.StatsCollection = function() {
  this.counters_ = {};
};
wd.core.stats.StatsCollection.prototype.incrementCounter = function(name, amount) {
  if (!goog.isDef(amount)) {
    amount = 1;
  }
  if (!wd.util.obj.contains(this.counters_, name)) {
    this.counters_[name] = 0;
  }
  this.counters_[name] += amount;
};
wd.core.stats.StatsCollection.prototype.get = function() {
  return goog.object.clone(this.counters_);
};
goog.provide("wd.core.stats.StatsListener");
wd.core.stats.StatsListener = function(collection) {
  this.collection_ = collection;
  this.last_ = null;
};
wd.core.stats.StatsListener.prototype.get = function() {
  var newStats = this.collection_.get();
  var delta = goog.object.clone(newStats);
  if (this.last_) {
    for (var stat in this.last_) {
      delta[stat] = delta[stat] - this.last_[stat];
    }
  }
  this.last_ = newStats;
  return delta;
};
goog.provide("wd.core.stats.StatsReporter");
var FIRST_STATS_MIN_TIME = 10 * 1E3;
var FIRST_STATS_MAX_TIME = 30 * 1E3;
var REPORT_STATS_INTERVAL = 5 * 60 * 1E3;
wd.core.stats.StatsReporter = function(collection, connection) {
  this.statsToReport_ = {};
  this.statsListener_ = new wd.core.stats.StatsListener(collection);
  this.server_ = connection;
  var timeout = FIRST_STATS_MIN_TIME + (FIRST_STATS_MAX_TIME - FIRST_STATS_MIN_TIME) * Math.random();
  setTimeout(goog.bind(this.reportStats_, this), Math.floor(timeout));
};
wd.core.stats.StatsReporter.prototype.includeStat = function(stat) {
  this.statsToReport_[stat] = true;
};
wd.core.stats.StatsReporter.prototype.reportStats_ = function() {
  var stats = this.statsListener_.get();
  var reportedStats = {};
  var haveStatsToReport = false;
  for (var stat in stats) {
    if (stats[stat] > 0 && wd.util.obj.contains(this.statsToReport_, stat)) {
      reportedStats[stat] = stats[stat];
      haveStatsToReport = true;
    }
  }
  if (haveStatsToReport) {
    this.server_.reportStats(reportedStats);
  }
  setTimeout(goog.bind(this.reportStats_, this), Math.floor(Math.random() * 2 * REPORT_STATS_INTERVAL));
};
goog.provide("wd.core.stats.StatsManager");
goog.require("wd.core.stats.StatsCollection");
goog.require("wd.core.stats.StatsListener");
goog.require("wd.core.stats.StatsReporter");
wd.core.stats.StatsManager = {};
wd.core.stats.StatsManager.collections_ = {};
wd.core.stats.StatsManager.reporters_ = {};
wd.core.stats.StatsManager.getCollection = function(repoInfo) {
  var hashString = repoInfo.toString();
  if (!wd.core.stats.StatsManager.collections_[hashString]) {
    wd.core.stats.StatsManager.collections_[hashString] = new wd.core.stats.StatsCollection;
  }
  return wd.core.stats.StatsManager.collections_[hashString];
};
wd.core.stats.StatsManager.getOrCreateReporter = function(repoInfo, creatorFunction) {
  var hashString = repoInfo.toString();
  if (!wd.core.stats.StatsManager.reporters_[hashString]) {
    wd.core.stats.StatsManager.reporters_[hashString] = creatorFunction();
  }
  return wd.core.stats.StatsManager.reporters_[hashString];
};
goog.provide("wd.core.storage.DOMStorageWrapper");
goog.require("wd.util.obj");
goog.scope(function() {
  wd.core.storage.DOMStorageWrapper = function(domStorage) {
    this.domStorage_ = domStorage;
    this.prefix_ = "wilddog:";
  };
  var DOMStorageWrapper = wd.core.storage.DOMStorageWrapper;
  DOMStorageWrapper.prototype.set = function(key, value) {
    if (value == null) {
      this.domStorage_.removeItem(this.prefixedName_(key));
    } else {
      this.domStorage_.setItem(this.prefixedName_(key), wd.util.json.stringify(value));
    }
  };
  DOMStorageWrapper.prototype.get = function(key) {
    var storedVal = this.domStorage_.getItem(this.prefixedName_(key));
    if (storedVal == null) {
      return null;
    } else {
      return wd.util.json.eval(storedVal);
    }
  };
  DOMStorageWrapper.prototype.remove = function(key) {
    this.domStorage_.removeItem(this.prefixedName_(key));
  };
  DOMStorageWrapper.prototype.isInMemoryStorage = false;
  DOMStorageWrapper.prototype.prefixedName_ = function(name) {
    return this.prefix_ + name;
  };
  DOMStorageWrapper.prototype.toString = function() {
    return this.domStorage_.toString();
  };
});
goog.provide("wd.core.storage.MemoryStorage");
goog.require("wd.util.obj");
goog.scope(function() {
  var obj = wd.util.obj;
  wd.core.storage.MemoryStorage = function() {
    this.cache_ = {};
  };
  var MemoryStorage = wd.core.storage.MemoryStorage;
  MemoryStorage.prototype.set = function(key, value) {
    if (value == null) {
      delete this.cache_[key];
    } else {
      this.cache_[key] = value;
    }
  };
  MemoryStorage.prototype.get = function(key) {
    if (obj.contains(this.cache_, key)) {
      return this.cache_[key];
    }
    return null;
  };
  MemoryStorage.prototype.remove = function(key) {
    delete this.cache_[key];
  };
  MemoryStorage.prototype.isInMemoryStorage = true;
});
goog.provide("wd.core.storage");
goog.require("wd.core.storage.DOMStorageWrapper");
goog.require("wd.core.storage.MemoryStorage");
wd.core.storage.createStoragefor = function(domStorageName) {
  try {
    if (typeof window !== "undefined" && typeof window[domStorageName] !== "undefined") {
      var domStorage = window[domStorageName];
      domStorage.setItem("wilddog:sentinel", "cache");
      domStorage.removeItem("wilddog:sentinel");
      return new wd.core.storage.DOMStorageWrapper(domStorage);
    }
  } catch (e) {
  }
  return new wd.core.storage.MemoryStorage;
};
wd.core.storage.PersistentStorage = wd.core.storage.createStoragefor("localStorage");
wd.core.storage.SessionStorage = wd.core.storage.createStoragefor("sessionStorage");
goog.provide("wd.core.RepoInfo");
goog.require("wd.core.storage");
wd.core.RepoInfo = function(host, secure, namespace, webSocketOnly, persistenceKey) {
  this.host = host.toLowerCase();
  this.domain = this.host.substr(this.host.indexOf(".") + 1);
  this.secure = secure;
  this.namespace = namespace;
  this.webSocketOnly = webSocketOnly;
  this.persistenceKey = persistenceKey || "";
  this.internalHost = wd.core.storage.PersistentStorage.get("host:" + host) || this.host;
};
wd.core.RepoInfo.prototype.needsQueryParam = function() {
  return this.host !== this.internalHost;
};
wd.core.RepoInfo.prototype.isCacheableHost = function() {
  return this.internalHost.substr(0, 2) === "s-";
};
wd.core.RepoInfo.prototype.isDemoHost = function() {
  return this.domain === "wilddogio-demo.com";
};
wd.core.RepoInfo.prototype.isCustomHost = function() {
  return this.domain !== "wilddogio.com" && this.domain !== "wilddogio-demo.com";
};
wd.core.RepoInfo.prototype.updateHost = function(newHost) {
  if (newHost == null) {
    this.internalHost = this.host;
    if (this.isCacheableHost()) {
      wd.core.storage.PersistentStorage.remove("host:" + this.host);
    }
  } else {
    if (newHost !== this.internalHost) {
      this.internalHost = newHost;
      if (this.isCacheableHost()) {
        wd.core.storage.PersistentStorage.set("host:" + this.host, this.internalHost);
      }
    }
  }
};
wd.core.RepoInfo.prototype.toString = function() {
  var str = (this.secure ? "https://" : "http://") + this.host;
  if (this.persistenceKey) {
    str += "<" + this.persistenceKey + ">";
  }
  return str;
};
goog.provide("goog.crypt.Hash");
goog.crypt.Hash = function() {
  this.blockSize = -1;
};
goog.crypt.Hash.prototype.reset = goog.abstractMethod;
goog.crypt.Hash.prototype.update = goog.abstractMethod;
goog.crypt.Hash.prototype.digest = goog.abstractMethod;
goog.provide("goog.crypt.Sha1");
goog.require("goog.crypt.Hash");
goog.crypt.Sha1 = function() {
  goog.crypt.Sha1.base(this, "constructor");
  this.blockSize = 512 / 8;
  this.chain_ = [];
  this.buf_ = [];
  this.W_ = [];
  this.pad_ = [];
  this.pad_[0] = 128;
  for (var i = 1;i < this.blockSize;++i) {
    this.pad_[i] = 0;
  }
  this.inbuf_ = 0;
  this.total_ = 0;
  this.reset();
};
goog.inherits(goog.crypt.Sha1, goog.crypt.Hash);
goog.crypt.Sha1.prototype.reset = function() {
  this.chain_[0] = 1732584193;
  this.chain_[1] = 4023233417;
  this.chain_[2] = 2562383102;
  this.chain_[3] = 271733878;
  this.chain_[4] = 3285377520;
  this.inbuf_ = 0;
  this.total_ = 0;
};
goog.crypt.Sha1.prototype.compress_ = function(buf, opt_offset) {
  if (!opt_offset) {
    opt_offset = 0;
  }
  var W = this.W_;
  if (goog.isString(buf)) {
    for (var i = 0;i < 16;i++) {
      W[i] = buf.charCodeAt(opt_offset) << 24 | buf.charCodeAt(opt_offset + 1) << 16 | buf.charCodeAt(opt_offset + 2) << 8 | buf.charCodeAt(opt_offset + 3);
      opt_offset += 4;
    }
  } else {
    for (var i = 0;i < 16;i++) {
      W[i] = buf[opt_offset] << 24 | buf[opt_offset + 1] << 16 | buf[opt_offset + 2] << 8 | buf[opt_offset + 3];
      opt_offset += 4;
    }
  }
  for (var i = 16;i < 80;i++) {
    var t = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
    W[i] = (t << 1 | t >>> 31) & 4294967295;
  }
  var a = this.chain_[0];
  var b = this.chain_[1];
  var c = this.chain_[2];
  var d = this.chain_[3];
  var e = this.chain_[4];
  var f, k;
  for (var i = 0;i < 80;i++) {
    if (i < 40) {
      if (i < 20) {
        f = d ^ b & (c ^ d);
        k = 1518500249;
      } else {
        f = b ^ c ^ d;
        k = 1859775393;
      }
    } else {
      if (i < 60) {
        f = b & c | d & (b | c);
        k = 2400959708;
      } else {
        f = b ^ c ^ d;
        k = 3395469782;
      }
    }
    var t = (a << 5 | a >>> 27) + f + e + k + W[i] & 4294967295;
    e = d;
    d = c;
    c = (b << 30 | b >>> 2) & 4294967295;
    b = a;
    a = t;
  }
  this.chain_[0] = this.chain_[0] + a & 4294967295;
  this.chain_[1] = this.chain_[1] + b & 4294967295;
  this.chain_[2] = this.chain_[2] + c & 4294967295;
  this.chain_[3] = this.chain_[3] + d & 4294967295;
  this.chain_[4] = this.chain_[4] + e & 4294967295;
};
goog.crypt.Sha1.prototype.update = function(bytes, opt_length) {
  if (bytes == null) {
    return;
  }
  if (!goog.isDef(opt_length)) {
    opt_length = bytes.length;
  }
  var lengthMinusBlock = opt_length - this.blockSize;
  var n = 0;
  var buf = this.buf_;
  var inbuf = this.inbuf_;
  while (n < opt_length) {
    if (inbuf == 0) {
      while (n <= lengthMinusBlock) {
        this.compress_(bytes, n);
        n += this.blockSize;
      }
    }
    if (goog.isString(bytes)) {
      while (n < opt_length) {
        buf[inbuf] = bytes.charCodeAt(n);
        ++inbuf;
        ++n;
        if (inbuf == this.blockSize) {
          this.compress_(buf);
          inbuf = 0;
          break;
        }
      }
    } else {
      while (n < opt_length) {
        buf[inbuf] = bytes[n];
        ++inbuf;
        ++n;
        if (inbuf == this.blockSize) {
          this.compress_(buf);
          inbuf = 0;
          break;
        }
      }
    }
  }
  this.inbuf_ = inbuf;
  this.total_ += opt_length;
};
goog.crypt.Sha1.prototype.digest = function() {
  var digest = [];
  var totalBits = this.total_ * 8;
  if (this.inbuf_ < 56) {
    this.update(this.pad_, 56 - this.inbuf_);
  } else {
    this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
  }
  for (var i = this.blockSize - 1;i >= 56;i--) {
    this.buf_[i] = totalBits & 255;
    totalBits /= 256;
  }
  this.compress_(this.buf_);
  var n = 0;
  for (var i = 0;i < 5;i++) {
    for (var j = 24;j >= 0;j -= 8) {
      digest[n] = this.chain_[i] >> j & 255;
      ++n;
    }
  }
  return digest;
};
goog.provide("wd.constants");
var CLIENT_VERSION = "0.4.9";
goog.provide("goog.json");
goog.provide("goog.json.Replacer");
goog.provide("goog.json.Reviver");
goog.provide("goog.json.Serializer");
goog.define("goog.json.USE_NATIVE_JSON", false);
goog.json.isValid = function(s) {
  if (/^\s*$/.test(s)) {
    return false;
  }
  var backslashesRe = /\\["\\\/bfnrtu]/g;
  var simpleValuesRe = /"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  var openBracketsRe = /(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g;
  var remainderRe = /^[\],:{}\s\u2028\u2029]*$/;
  return remainderRe.test(s.replace(backslashesRe, "@").replace(simpleValuesRe, "]").replace(openBracketsRe, ""));
};
goog.json.parse = goog.json.USE_NATIVE_JSON ? (goog.global["JSON"]["parse"]) : function(s) {
  var o = String(s);
  if (goog.json.isValid(o)) {
    try {
      return (eval("(" + o + ")"));
    } catch (ex) {
    }
  }
  throw Error("Invalid JSON string: " + o);
};
goog.json.unsafeParse = goog.json.USE_NATIVE_JSON ? (goog.global["JSON"]["parse"]) : function(s) {
  return (eval("(" + s + ")"));
};
goog.json.Replacer;
goog.json.Reviver;
goog.json.serialize = goog.json.USE_NATIVE_JSON ? (goog.global["JSON"]["stringify"]) : function(object, opt_replacer) {
  return (new goog.json.Serializer(opt_replacer)).serialize(object);
};
goog.json.Serializer = function(opt_replacer) {
  this.replacer_ = opt_replacer;
};
goog.json.Serializer.prototype.serialize = function(object) {
  var sb = [];
  this.serializeInternal(object, sb);
  return sb.join("");
};
goog.json.Serializer.prototype.serializeInternal = function(object, sb) {
  if (object == null) {
    sb.push("null");
    return;
  }
  if (typeof object == "object") {
    if (goog.isArray(object)) {
      this.serializeArray((object), sb);
      return;
    } else {
      if (object instanceof String || object instanceof Number || object instanceof Boolean) {
        object = object.valueOf();
      } else {
        this.serializeObject_((object), sb);
        return;
      }
    }
  }
  switch(typeof object) {
    case "string":
      this.serializeString_((object), sb);
      break;
    case "number":
      this.serializeNumber_((object), sb);
      break;
    case "boolean":
      sb.push(object);
      break;
    case "function":
      break;
    default:
      throw Error("Unknown type: " + typeof object);;
  }
};
goog.json.Serializer.charToJsonCharCache_ = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\u000b"};
goog.json.Serializer.charsToReplace_ = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
goog.json.Serializer.prototype.serializeString_ = function(s, sb) {
  sb.push('"', s.replace(goog.json.Serializer.charsToReplace_, function(c) {
    var rv = goog.json.Serializer.charToJsonCharCache_[c];
    if (!rv) {
      rv = "\\u" + (c.charCodeAt(0) | 65536).toString(16).substr(1);
      goog.json.Serializer.charToJsonCharCache_[c] = rv;
    }
    return rv;
  }), '"');
};
goog.json.Serializer.prototype.serializeNumber_ = function(n, sb) {
  sb.push(isFinite(n) && !isNaN(n) ? n : "null");
};
goog.json.Serializer.prototype.serializeArray = function(arr, sb) {
  var l = arr.length;
  sb.push("[");
  var sep = "";
  for (var i = 0;i < l;i++) {
    sb.push(sep);
    var value = arr[i];
    this.serializeInternal(this.replacer_ ? this.replacer_.call(arr, String(i), value) : value, sb);
    sep = ",";
  }
  sb.push("]");
};
goog.json.Serializer.prototype.serializeObject_ = function(obj, sb) {
  sb.push("{");
  var sep = "";
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var value = obj[key];
      if (typeof value != "function") {
        sb.push(sep);
        this.serializeString_(key, sb);
        sb.push(":");
        this.serializeInternal(this.replacer_ ? this.replacer_.call(obj, key, value) : value, sb);
        sep = ",";
      }
    }
  }
  sb.push("}");
};
goog.provide("wd.util");
goog.require("wd.util.obj");
wd.util.querystring = function(querystringParams) {
  var params = [];
  wd.util.obj.foreach(querystringParams, function(key, value) {
    if (goog.isArray(value)) {
      goog.array.forEach(value, function(arrayVal) {
        params.push(encodeURIComponent(key) + "=" + encodeURIComponent(arrayVal));
      });
    } else {
      params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
    }
  });
  return params.length ? "&" + params.join("&") : "";
};
wd.util.querystringDecode = function(querystring) {
  var obj = {};
  var tokens = querystring.replace(/^\?/, "").split("&");
  goog.array.forEach(tokens, function(token) {
    if (token) {
      var key = token.split("=");
      obj[key[0]] = key[1];
    }
  });
  return obj;
};
goog.provide("wd.util.json");
goog.require("goog.json");
wd.util.json.eval = function(str) {
  if (typeof JSON !== "undefined" && goog.isDef(JSON.parse)) {
    return JSON.parse(str);
  } else {
    return goog.json.parse(str);
  }
};
wd.util.json.stringify = function(data) {
  if (typeof JSON !== "undefined" && goog.isDef(JSON.stringify)) {
    return JSON.stringify(data);
  } else {
    return goog.json.serialize(data);
  }
};
goog.provide("wd.core.SnapshotHolder");
wd.core.SnapshotHolder = function() {
  this.rootNode_ = wd.core.snap.EMPTY_NODE;
};
wd.core.SnapshotHolder.prototype.getNode = function(path) {
  return this.rootNode_.getChild(path);
};
wd.core.SnapshotHolder.prototype.updateSnapshot = function(path, newSnapshotNode) {
  this.rootNode_ = this.rootNode_.updateChild(path, newSnapshotNode);
};
if (goog.DEBUG) {
  wd.core.SnapshotHolder.prototype.toString = function() {
    return this.rootNode_.toString();
  };
}
;goog.provide("goog.crypt");
goog.require("goog.array");
goog.require("goog.asserts");
goog.crypt.stringToByteArray = function(str) {
  var output = [], p = 0;
  for (var i = 0;i < str.length;i++) {
    var c = str.charCodeAt(i);
    while (c > 255) {
      output[p++] = c & 255;
      c >>= 8;
    }
    output[p++] = c;
  }
  return output;
};
goog.crypt.byteArrayToString = function(bytes) {
  var CHUNK_SIZE = 8192;
  if (bytes.length < CHUNK_SIZE) {
    return String.fromCharCode.apply(null, bytes);
  }
  var str = "";
  for (var i = 0;i < bytes.length;i += CHUNK_SIZE) {
    var chunk = goog.array.slice(bytes, i, i + CHUNK_SIZE);
    str += String.fromCharCode.apply(null, chunk);
  }
  return str;
};
goog.crypt.byteArrayToHex = function(array) {
  return goog.array.map(array, function(numByte) {
    var hexByte = numByte.toString(16);
    return hexByte.length > 1 ? hexByte : "0" + hexByte;
  }).join("");
};
goog.crypt.hexToByteArray = function(hexString) {
  goog.asserts.assert(hexString.length % 2 == 0, "Key string length must be multiple of 2");
  var arr = [];
  for (var i = 0;i < hexString.length;i += 2) {
    arr.push(parseInt(hexString.substring(i, i + 2), 16));
  }
  return arr;
};
goog.crypt.stringToUtf8ByteArray = function(str) {
  str = str.replace(/\r\n/g, "\n");
  var out = [], p = 0;
  for (var i = 0;i < str.length;i++) {
    var c = str.charCodeAt(i);
    if (c < 128) {
      out[p++] = c;
    } else {
      if (c < 2048) {
        out[p++] = c >> 6 | 192;
        out[p++] = c & 63 | 128;
      } else {
        out[p++] = c >> 12 | 224;
        out[p++] = c >> 6 & 63 | 128;
        out[p++] = c & 63 | 128;
      }
    }
  }
  return out;
};
goog.crypt.utf8ByteArrayToString = function(bytes) {
  var out = [], pos = 0, c = 0;
  while (pos < bytes.length) {
    var c1 = bytes[pos++];
    if (c1 < 128) {
      out[c++] = String.fromCharCode(c1);
    } else {
      if (c1 > 191 && c1 < 224) {
        var c2 = bytes[pos++];
        out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
      } else {
        var c2 = bytes[pos++];
        var c3 = bytes[pos++];
        out[c++] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
      }
    }
  }
  return out.join("");
};
goog.crypt.xorByteArray = function(bytes1, bytes2) {
  goog.asserts.assert(bytes1.length == bytes2.length, "XOR array lengths must match");
  var result = [];
  for (var i = 0;i < bytes1.length;i++) {
    result.push(bytes1[i] ^ bytes2[i]);
  }
  return result;
};
goog.provide("goog.labs.userAgent.util");
goog.require("goog.string");
goog.labs.userAgent.util.getNativeUserAgentString_ = function() {
  var navigator = goog.labs.userAgent.util.getNavigator_();
  if (navigator) {
    var userAgent = navigator.userAgent;
    if (userAgent) {
      return userAgent;
    }
  }
  return "";
};
goog.labs.userAgent.util.getNavigator_ = function() {
  return goog.global.navigator;
};
goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
goog.labs.userAgent.util.setUserAgent = function(opt_userAgent) {
  goog.labs.userAgent.util.userAgent_ = opt_userAgent || goog.labs.userAgent.util.getNativeUserAgentString_();
};
goog.labs.userAgent.util.getUserAgent = function() {
  return goog.labs.userAgent.util.userAgent_;
};
goog.labs.userAgent.util.matchUserAgent = function(str) {
  var userAgent = goog.labs.userAgent.util.getUserAgent();
  return goog.string.contains(userAgent, str);
};
goog.labs.userAgent.util.matchUserAgentIgnoreCase = function(str) {
  var userAgent = goog.labs.userAgent.util.getUserAgent();
  return goog.string.caseInsensitiveContains(userAgent, str);
};
goog.labs.userAgent.util.extractVersionTuples = function(userAgent) {
  var versionRegExp = new RegExp("(\\w[\\w ]+)" + "/" + "([^\\s]+)" + "\\s*" + "(?:\\((.*?)\\))?", "g");
  var data = [];
  var match;
  while (match = versionRegExp.exec(userAgent)) {
    data.push([match[1], match[2], match[3] || undefined]);
  }
  return data;
};
goog.provide("goog.labs.userAgent.platform");
goog.require("goog.labs.userAgent.util");
goog.require("goog.string");
goog.labs.userAgent.platform.isAndroid = function() {
  return goog.labs.userAgent.util.matchUserAgent("Android");
};
goog.labs.userAgent.platform.isIpod = function() {
  return goog.labs.userAgent.util.matchUserAgent("iPod");
};
goog.labs.userAgent.platform.isIphone = function() {
  return goog.labs.userAgent.util.matchUserAgent("iPhone") && !goog.labs.userAgent.util.matchUserAgent("iPod") && !goog.labs.userAgent.util.matchUserAgent("iPad");
};
goog.labs.userAgent.platform.isIpad = function() {
  return goog.labs.userAgent.util.matchUserAgent("iPad");
};
goog.labs.userAgent.platform.isIos = function() {
  return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpad() || goog.labs.userAgent.platform.isIpod();
};
goog.labs.userAgent.platform.isMacintosh = function() {
  return goog.labs.userAgent.util.matchUserAgent("Macintosh");
};
goog.labs.userAgent.platform.isLinux = function() {
  return goog.labs.userAgent.util.matchUserAgent("Linux");
};
goog.labs.userAgent.platform.isWindows = function() {
  return goog.labs.userAgent.util.matchUserAgent("Windows");
};
goog.labs.userAgent.platform.isChromeOS = function() {
  return goog.labs.userAgent.util.matchUserAgent("CrOS");
};
goog.labs.userAgent.platform.getVersion = function() {
  var userAgentString = goog.labs.userAgent.util.getUserAgent();
  var version = "", re;
  if (goog.labs.userAgent.platform.isWindows()) {
    re = /Windows (?:NT|Phone) ([0-9.]+)/;
    var match = re.exec(userAgentString);
    if (match) {
      version = match[1];
    } else {
      version = "0.0";
    }
  } else {
    if (goog.labs.userAgent.platform.isIos()) {
      re = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/;
      var match = re.exec(userAgentString);
      version = match && match[1].replace(/_/g, ".");
    } else {
      if (goog.labs.userAgent.platform.isMacintosh()) {
        re = /Mac OS X ([0-9_.]+)/;
        var match = re.exec(userAgentString);
        version = match ? match[1].replace(/_/g, ".") : "10";
      } else {
        if (goog.labs.userAgent.platform.isAndroid()) {
          re = /Android\s+([^\);]+)(\)|;)/;
          var match = re.exec(userAgentString);
          version = match && match[1];
        } else {
          if (goog.labs.userAgent.platform.isChromeOS()) {
            re = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/;
            var match = re.exec(userAgentString);
            version = match && match[1];
          }
        }
      }
    }
  }
  return version || "";
};
goog.labs.userAgent.platform.isVersionOrHigher = function(version) {
  return goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(), version) >= 0;
};
goog.provide("goog.labs.userAgent.browser");
goog.require("goog.array");
goog.require("goog.labs.userAgent.util");
goog.require("goog.object");
goog.require("goog.string");
goog.labs.userAgent.browser.matchOpera_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Opera") || goog.labs.userAgent.util.matchUserAgent("OPR");
};
goog.labs.userAgent.browser.matchIE_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Edge") || goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.browser.matchFirefox_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Firefox");
};
goog.labs.userAgent.browser.matchSafari_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchIE_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"));
};
goog.labs.userAgent.browser.matchCoast_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Coast");
};
goog.labs.userAgent.browser.matchIosWebview_ = function() {
  return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit");
};
goog.labs.userAgent.browser.matchChrome_ = function() {
  return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchOpera_() && !goog.labs.userAgent.browser.matchIE_();
};
goog.labs.userAgent.browser.matchAndroidBrowser_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk());
};
goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_;
goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;
goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_;
goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_;
goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_;
goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_;
goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_;
goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_;
goog.labs.userAgent.browser.isSilk = function() {
  return goog.labs.userAgent.util.matchUserAgent("Silk");
};
goog.labs.userAgent.browser.getVersion = function() {
  var userAgentString = goog.labs.userAgent.util.getUserAgent();
  if (goog.labs.userAgent.browser.isIE()) {
    return goog.labs.userAgent.browser.getIEVersion_(userAgentString);
  }
  var versionTuples = goog.labs.userAgent.util.extractVersionTuples(userAgentString);
  var versionMap = {};
  goog.array.forEach(versionTuples, function(tuple) {
    var key = tuple[0];
    var value = tuple[1];
    versionMap[key] = value;
  });
  var versionMapHasKey = goog.partial(goog.object.containsKey, versionMap);
  function lookUpValueWithKeys(keys) {
    var key = goog.array.find(keys, versionMapHasKey);
    return versionMap[key] || "";
  }
  if (goog.labs.userAgent.browser.isOpera()) {
    return lookUpValueWithKeys(["Version", "Opera", "OPR"]);
  }
  if (goog.labs.userAgent.browser.isChrome()) {
    return lookUpValueWithKeys(["Chrome", "CriOS"]);
  }
  var tuple = versionTuples[2];
  return tuple && tuple[1] || "";
};
goog.labs.userAgent.browser.isVersionOrHigher = function(version) {
  return goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), version) >= 0;
};
goog.labs.userAgent.browser.getIEVersion_ = function(userAgent) {
  var rv = /rv: *([\d\.]*)/.exec(userAgent);
  if (rv && rv[1]) {
    return rv[1];
  }
  var edge = /Edge\/([\d\.]+)/.exec(userAgent);
  if (edge) {
    return edge[1];
  }
  var version = "";
  var msie = /MSIE +([\d\.]+)/.exec(userAgent);
  if (msie && msie[1]) {
    var tridentVersion = /Trident\/(\d.\d)/.exec(userAgent);
    if (msie[1] == "7.0") {
      if (tridentVersion && tridentVersion[1]) {
        switch(tridentVersion[1]) {
          case "4.0":
            version = "8.0";
            break;
          case "5.0":
            version = "9.0";
            break;
          case "6.0":
            version = "10.0";
            break;
          case "7.0":
            version = "11.0";
            break;
        }
      } else {
        version = "7.0";
      }
    } else {
      version = msie[1];
    }
  }
  return version;
};
goog.provide("goog.labs.userAgent.engine");
goog.require("goog.array");
goog.require("goog.labs.userAgent.util");
goog.require("goog.string");
goog.labs.userAgent.engine.isPresto = function() {
  return goog.labs.userAgent.util.matchUserAgent("Presto");
};
goog.labs.userAgent.engine.isTrident = function() {
  return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.engine.isEdge = function() {
  return goog.labs.userAgent.util.matchUserAgent("Edge");
};
goog.labs.userAgent.engine.isWebKit = function() {
  return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge();
};
goog.labs.userAgent.engine.isGecko = function() {
  return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge();
};
goog.labs.userAgent.engine.getVersion = function() {
  var userAgentString = goog.labs.userAgent.util.getUserAgent();
  if (userAgentString) {
    var tuples = goog.labs.userAgent.util.extractVersionTuples(userAgentString);
    var engineTuple = goog.labs.userAgent.engine.getEngineTuple_(tuples);
    if (engineTuple) {
      if (engineTuple[0] == "Gecko") {
        return goog.labs.userAgent.engine.getVersionForKey_(tuples, "Firefox");
      }
      return engineTuple[1];
    }
    var browserTuple = tuples[0];
    var info;
    if (browserTuple && (info = browserTuple[2])) {
      var match = /Trident\/([^\s;]+)/.exec(info);
      if (match) {
        return match[1];
      }
    }
  }
  return "";
};
goog.labs.userAgent.engine.getEngineTuple_ = function(tuples) {
  if (!goog.labs.userAgent.engine.isEdge()) {
    return tuples[1];
  }
  for (var i = 0;i < tuples.length;i++) {
    var tuple = tuples[i];
    if (tuple[0] == "Edge") {
      return tuple;
    }
  }
};
goog.labs.userAgent.engine.isVersionOrHigher = function(version) {
  return goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), version) >= 0;
};
goog.labs.userAgent.engine.getVersionForKey_ = function(tuples, key) {
  var pair = goog.array.find(tuples, function(pair) {
    return key == pair[0];
  });
  return pair && pair[1] || "";
};
goog.provide("goog.userAgent");
goog.require("goog.labs.userAgent.browser");
goog.require("goog.labs.userAgent.engine");
goog.require("goog.labs.userAgent.platform");
goog.require("goog.labs.userAgent.util");
goog.require("goog.string");
goog.define("goog.userAgent.ASSUME_IE", false);
goog.define("goog.userAgent.ASSUME_GECKO", false);
goog.define("goog.userAgent.ASSUME_WEBKIT", false);
goog.define("goog.userAgent.ASSUME_MOBILE_WEBKIT", false);
goog.define("goog.userAgent.ASSUME_OPERA", false);
goog.define("goog.userAgent.ASSUME_ANY_VERSION", false);
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
  return goog.labs.userAgent.util.getUserAgent();
};
goog.userAgent.getNavigator = function() {
  return goog.global["navigator"] || null;
};
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera();
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE();
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko();
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit();
goog.userAgent.isMobile_ = function() {
  return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile");
};
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_();
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
  var navigator = goog.userAgent.getNavigator();
  return navigator && navigator.platform || "";
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.define("goog.userAgent.ASSUME_MAC", false);
goog.define("goog.userAgent.ASSUME_WINDOWS", false);
goog.define("goog.userAgent.ASSUME_LINUX", false);
goog.define("goog.userAgent.ASSUME_X11", false);
goog.define("goog.userAgent.ASSUME_ANDROID", false);
goog.define("goog.userAgent.ASSUME_IPHONE", false);
goog.define("goog.userAgent.ASSUME_IPAD", false);
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD;
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh();
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows();
goog.userAgent.isLegacyLinux_ = function() {
  return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS();
};
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_();
goog.userAgent.isX11_ = function() {
  var navigator = goog.userAgent.getNavigator();
  return !!navigator && goog.string.contains(navigator["appVersion"] || "", "X11");
};
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_();
goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid();
goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone();
goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
goog.userAgent.determineVersion_ = function() {
  if (goog.userAgent.OPERA && goog.global["opera"]) {
    var operaVersion = goog.global["opera"].version;
    return goog.isFunction(operaVersion) ? operaVersion() : operaVersion;
  }
  var version = "";
  var arr = goog.userAgent.getVersionRegexResult_();
  if (arr) {
    version = arr ? arr[1] : "";
  }
  if (goog.userAgent.IE && !goog.labs.userAgent.engine.isEdge()) {
    var docMode = goog.userAgent.getDocumentMode_();
    if (docMode > parseFloat(version)) {
      return String(docMode);
    }
  }
  return version;
};
goog.userAgent.getVersionRegexResult_ = function() {
  var userAgent = goog.userAgent.getUserAgentString();
  if (goog.userAgent.GECKO) {
    return /rv\:([^\);]+)(\)|;)/.exec(userAgent);
  }
  if (goog.userAgent.IE && goog.labs.userAgent.engine.isEdge()) {
    return /Edge\/([\d\.]+)/.exec(userAgent);
  }
  if (goog.userAgent.IE) {
    return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(userAgent);
  }
  if (goog.userAgent.WEBKIT) {
    return /WebKit\/(\S+)/.exec(userAgent);
  }
};
goog.userAgent.getDocumentMode_ = function() {
  var doc = goog.global["document"];
  return doc ? doc["documentMode"] : undefined;
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(v1, v2) {
  return goog.string.compareVersions(v1, v2);
};
goog.userAgent.isVersionOrHigherCache_ = {};
goog.userAgent.isVersionOrHigher = function(version) {
  return goog.userAgent.ASSUME_ANY_VERSION || goog.userAgent.isVersionOrHigherCache_[version] || (goog.userAgent.isVersionOrHigherCache_[version] = goog.string.compareVersions(goog.userAgent.VERSION, version) >= 0);
};
goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher;
goog.userAgent.isDocumentModeOrHigher = function(documentMode) {
  return goog.userAgent.IE && (goog.labs.userAgent.engine.isEdge() || goog.userAgent.DOCUMENT_MODE >= documentMode);
};
goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher;
goog.userAgent.DOCUMENT_MODE = function() {
  var doc = goog.global["document"];
  var mode = goog.userAgent.getDocumentMode_();
  if (!doc || !goog.userAgent.IE || !mode && goog.labs.userAgent.engine.isEdge()) {
    return undefined;
  }
  return mode || (doc["compatMode"] == "CSS1Compat" ? parseInt(goog.userAgent.VERSION, 10) : 5);
}();
goog.provide("goog.crypt.base64");
goog.require("goog.crypt");
goog.require("goog.userAgent");
goog.crypt.base64.byteToCharMap_ = null;
goog.crypt.base64.charToByteMap_ = null;
goog.crypt.base64.byteToCharMapWebSafe_ = null;
goog.crypt.base64.charToByteMapWebSafe_ = null;
goog.crypt.base64.ENCODED_VALS_BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz" + "0123456789";
goog.crypt.base64.ENCODED_VALS = goog.crypt.base64.ENCODED_VALS_BASE + "+/=";
goog.crypt.base64.ENCODED_VALS_WEBSAFE = goog.crypt.base64.ENCODED_VALS_BASE + "-_.";
goog.crypt.base64.HAS_NATIVE_SUPPORT = goog.userAgent.GECKO || goog.userAgent.WEBKIT || goog.userAgent.OPERA || typeof goog.global.atob == "function";
goog.crypt.base64.encodeByteArray = function(input, opt_webSafe) {
  if (!goog.isArrayLike(input)) {
    throw Error("encodeByteArray takes an array as a parameter");
  }
  goog.crypt.base64.init_();
  var byteToCharMap = opt_webSafe ? goog.crypt.base64.byteToCharMapWebSafe_ : goog.crypt.base64.byteToCharMap_;
  var output = [];
  for (var i = 0;i < input.length;i += 3) {
    var byte1 = input[i];
    var haveByte2 = i + 1 < input.length;
    var byte2 = haveByte2 ? input[i + 1] : 0;
    var haveByte3 = i + 2 < input.length;
    var byte3 = haveByte3 ? input[i + 2] : 0;
    var outByte1 = byte1 >> 2;
    var outByte2 = (byte1 & 3) << 4 | byte2 >> 4;
    var outByte3 = (byte2 & 15) << 2 | byte3 >> 6;
    var outByte4 = byte3 & 63;
    if (!haveByte3) {
      outByte4 = 64;
      if (!haveByte2) {
        outByte3 = 64;
      }
    }
    output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
  }
  return output.join("");
};
goog.crypt.base64.encodeString = function(input, opt_webSafe) {
  if (goog.crypt.base64.HAS_NATIVE_SUPPORT && !opt_webSafe) {
    return goog.global.btoa(input);
  }
  return goog.crypt.base64.encodeByteArray(goog.crypt.stringToByteArray(input), opt_webSafe);
};
goog.crypt.base64.decodeString = function(input, opt_webSafe) {
  if (goog.crypt.base64.HAS_NATIVE_SUPPORT && !opt_webSafe) {
    return goog.global.atob(input);
  }
  return goog.crypt.byteArrayToString(goog.crypt.base64.decodeStringToByteArray(input, opt_webSafe));
};
goog.crypt.base64.decodeStringToByteArray = function(input, opt_webSafe) {
  goog.crypt.base64.init_();
  var charToByteMap = opt_webSafe ? goog.crypt.base64.charToByteMapWebSafe_ : goog.crypt.base64.charToByteMap_;
  var output = [];
  for (var i = 0;i < input.length;) {
    var byte1 = charToByteMap[input.charAt(i++)];
    var haveByte2 = i < input.length;
    var byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
    ++i;
    var haveByte3 = i < input.length;
    var byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
    ++i;
    var haveByte4 = i < input.length;
    var byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
    ++i;
    if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
      throw Error();
    }
    var outByte1 = byte1 << 2 | byte2 >> 4;
    output.push(outByte1);
    if (byte3 != 64) {
      var outByte2 = byte2 << 4 & 240 | byte3 >> 2;
      output.push(outByte2);
      if (byte4 != 64) {
        var outByte3 = byte3 << 6 & 192 | byte4;
        output.push(outByte3);
      }
    }
  }
  return output;
};
goog.crypt.base64.init_ = function() {
  if (!goog.crypt.base64.byteToCharMap_) {
    goog.crypt.base64.byteToCharMap_ = {};
    goog.crypt.base64.charToByteMap_ = {};
    goog.crypt.base64.byteToCharMapWebSafe_ = {};
    goog.crypt.base64.charToByteMapWebSafe_ = {};
    for (var i = 0;i < goog.crypt.base64.ENCODED_VALS.length;i++) {
      goog.crypt.base64.byteToCharMap_[i] = goog.crypt.base64.ENCODED_VALS.charAt(i);
      goog.crypt.base64.charToByteMap_[goog.crypt.base64.byteToCharMap_[i]] = i;
      goog.crypt.base64.byteToCharMapWebSafe_[i] = goog.crypt.base64.ENCODED_VALS_WEBSAFE.charAt(i);
      goog.crypt.base64.charToByteMapWebSafe_[goog.crypt.base64.byteToCharMapWebSafe_[i]] = i;
      if (i >= goog.crypt.base64.ENCODED_VALS_BASE.length) {
        goog.crypt.base64.charToByteMap_[goog.crypt.base64.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
        goog.crypt.base64.charToByteMapWebSafe_[goog.crypt.base64.ENCODED_VALS.charAt(i)] = i;
      }
    }
  }
};
goog.provide("wd.core.util");
goog.require("wd.constants");
goog.require("wd.core.RepoInfo");
goog.require("wd.core.storage");
goog.require("wd.util.json");
goog.require("goog.crypt.Sha1");
goog.require("goog.crypt.base64");
goog.require("goog.object");
goog.require("goog.string");
wd.core.util.LUIDGenerator = function() {
  var id = 1;
  return function() {
    return id++;
  };
}();
wd.core.util.assert = function(assertion, message) {
  if (!assertion) {
    throw wd.core.util.assertionError(message);
  }
};
wd.core.util.assertionError = function(message) {
  return new Error("Wilddog (" + Wilddog.SDK_VERSION + ") INTERNAL ASSERT FAILED: " + message);
};
wd.core.util.assertWeak = function(assertion, message) {
  if (!assertion) {
    wd.core.util.error(message);
  }
};
wd.core.util.base64Encode = function(str) {
  var utf8Bytes = wd.util.utf8.stringToByteArray(str);
  return goog.crypt.base64.encodeByteArray(utf8Bytes, true);
};
wd.core.util.base64Decode = function(str) {
  try {
    if (NODE_CLIENT) {
      return (new Buffer(str, "base64")).toString("utf8");
    } else {
      if (typeof atob !== "undefined") {
        return atob(str);
      } else {
        return goog.crypt.base64.decodeString(str, true);
      }
    }
  } catch (e) {
    wd.core.util.log("base64Decode failed: ", e);
  }
  return null;
};
wd.core.util.sha1 = function(str) {
  var utf8Bytes = wd.util.utf8.stringToByteArray(str);
  var sha1 = new goog.crypt.Sha1;
  sha1.update(utf8Bytes);
  var sha1Bytes = sha1.digest();
  return goog.crypt.base64.encodeByteArray(sha1Bytes);
};
wd.core.util.buildLogMessage_ = function(var_args) {
  var message = "";
  for (var i = 0;i < arguments.length;i++) {
    if (goog.isArrayLike(arguments[i])) {
      message += wd.core.util.buildLogMessage_.apply(null, arguments[i]);
    } else {
      if (typeof arguments[i] === "object") {
        message += wd.util.json.stringify(arguments[i]);
      } else {
        message += arguments[i];
      }
    }
    message += " ";
  }
  return message;
};
wd.core.util.logger = null;
wd.core.util.firstLog_ = true;
wd.core.util.log = function(var_args) {
  if (wd.core.util.firstLog_ === true) {
    wd.core.util.firstLog_ = false;
    if (wd.core.util.logger === null && wd.core.storage.SessionStorage.get("logging_enabled") === true) {
      Wilddog.enableLogging(true);
    }
  }
  if (wd.core.util.logger) {
    var message = wd.core.util.buildLogMessage_.apply(null, arguments);
    wd.core.util.logger(message);
  }
};
wd.core.util.logWrapper = function(prefix) {
  return function() {
    wd.core.util.log(prefix, arguments);
  };
};
wd.core.util.error = function(var_args) {
  if (typeof console !== "undefined") {
    var message = "WILDDOG INTERNAL ERROR: " + wd.core.util.buildLogMessage_.apply(null, arguments);
    if (typeof console.error !== "undefined") {
      console.error(message);
    } else {
      console.log(message);
    }
  }
};
wd.core.util.fatal = function(var_args) {
  var message = wd.core.util.buildLogMessage_.apply(null, arguments);
  throw new Error("WILDDOG FATAL ERROR: " + message);
};
wd.core.util.warn = function(var_args) {
  if (typeof console !== "undefined") {
    var message = "WILDDOG WARNING: " + wd.core.util.buildLogMessage_.apply(null, arguments);
    if (typeof console.warn !== "undefined") {
      console.warn(message);
    } else {
      console.log(message);
    }
  }
};
wd.core.util.warnIfPageIsSecure = function() {
  if (typeof window !== "undefined" && window.location && window.location.protocol && window.location.protocol.indexOf("https:") !== -1) {
    wd.core.util.warn("Insecure Wilddog access from a secure page. " + "Please use https in calls to new Wilddog().");
  }
};
wd.core.util.warnAboutUnsupportedMethod = function(methodName) {
  wd.core.util.warn(methodName + " is unsupported and will likely change soon.  " + "Please do not use.");
};
wd.core.util.parseRepoInfo = function(dataURL) {
  var parsedUrl = wd.core.util.parseURL(dataURL), namespace = parsedUrl.subdomain;
  if (parsedUrl.domain === "wilddog") {
    wd.core.util.fatal(parsedUrl.host + " is no longer supported. " + "Please use <YOUR WILDDOG>.wilddogio.com instead");
  }
  if (!namespace) {
    wd.core.util.fatal("Cannot parse Wilddog url. " + "Please use https://<YOUR WILDDOG>.wilddogio.com");
  }
  if (!parsedUrl.secure) {
    wd.core.util.warnIfPageIsSecure();
  }
  var webSocketOnly = parsedUrl.scheme === "ws" || parsedUrl.scheme === "wss";
  return {repoInfo:new wd.core.RepoInfo(parsedUrl.host, parsedUrl.secure, namespace, webSocketOnly), path:new wd.core.util.Path(parsedUrl.pathString)};
};
wd.core.util.parseURL = function(dataURL) {
  var host = "", domain = "", subdomain = "", pathString = "";
  var secure = true, scheme = "https", port = 443;
  if (goog.isString(dataURL)) {
    var colonInd = dataURL.indexOf("//");
    if (colonInd >= 0) {
      scheme = dataURL.substring(0, colonInd - 1);
      dataURL = dataURL.substring(colonInd + 2);
    }
    var slashInd = dataURL.indexOf("/");
    if (slashInd === -1) {
      slashInd = dataURL.length;
    }
    host = dataURL.substring(0, slashInd);
    pathString = wd.core.util.decodePath(dataURL.substring(slashInd));
    var parts = host.split(".");
    if (parts.length === 3) {
      domain = parts[1];
      subdomain = parts[0].toLowerCase();
    } else {
      if (parts.length === 2) {
        domain = parts[0];
      }
    }
    colonInd = host.indexOf(":");
    if (colonInd >= 0) {
      secure = scheme === "https" || scheme === "wss";
      port = goog.string.parseInt(host.substring(colonInd + 1));
    }
  }
  return {host:host, port:port, domain:domain, subdomain:subdomain, secure:secure, scheme:scheme, pathString:pathString};
};
wd.core.util.decodePath = function(pathString) {
  var pathStringDecoded = "";
  var pieces = pathString.split("/");
  for (var i = 0;i < pieces.length;i++) {
    if (pieces[i].length > 0) {
      var piece = pieces[i];
      try {
        piece = goog.string.urlDecode(piece);
      } catch (e) {
      }
      pathStringDecoded += "/" + piece;
    }
  }
  return pathStringDecoded;
};
wd.core.util.isInvalidJSONNumber = function(data) {
  return goog.isNumber(data) && (data != data || data == Number.POSITIVE_INFINITY || data == Number.NEGATIVE_INFINITY);
};
wd.core.util.executeWhenDOMReady = function(fn) {
  if (NODE_CLIENT || document.readyState === "complete") {
    fn();
  } else {
    var called = false;
    var wrappedFn = function() {
      if (!document.body) {
        setTimeout(wrappedFn, Math.floor(10));
        return;
      }
      if (!called) {
        called = true;
        fn();
      }
    };
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", wrappedFn, false);
      window.addEventListener("load", wrappedFn, false);
    } else {
      if (document.attachEvent) {
        document.attachEvent("onreadystatechange", function() {
          if (document.readyState === "complete") {
            wrappedFn();
          }
        });
        window.attachEvent("onload", wrappedFn);
      }
    }
  }
};
wd.core.util.MIN_NAME = "[MIN_NAME]";
wd.core.util.MAX_NAME = "[MAX_NAME]";
wd.core.util.nameCompare = function(a, b) {
  if (a === b) {
    return 0;
  } else {
    if (a === wd.core.util.MIN_NAME || b === wd.core.util.MAX_NAME) {
      return -1;
    } else {
      if (b === wd.core.util.MIN_NAME || a === wd.core.util.MAX_NAME) {
        return 1;
      } else {
        var aAsInt = wd.core.util.tryParseInt(a), bAsInt = wd.core.util.tryParseInt(b);
        if (aAsInt !== null) {
          if (bAsInt !== null) {
            return aAsInt - bAsInt == 0 ? a.length - b.length : aAsInt - bAsInt;
          } else {
            return -1;
          }
        } else {
          if (bAsInt !== null) {
            return 1;
          } else {
            return a < b ? -1 : 1;
          }
        }
      }
    }
  }
};
wd.core.util.stringCompare = function(a, b) {
  if (a === b) {
    return 0;
  } else {
    if (a < b) {
      return -1;
    } else {
      return 1;
    }
  }
};
wd.core.util.requireKey = function(key, obj) {
  if (obj && key in obj) {
    return obj[key];
  } else {
    throw new Error("Missing required key (" + key + ") in object: " + wd.util.json.stringify(obj));
  }
};
wd.core.util.ObjectToUniqueKey = function(obj) {
  if (typeof obj !== "object" || obj === null) {
    return wd.util.json.stringify(obj);
  }
  var keys = [];
  for (var k in obj) {
    keys.push(k);
  }
  keys.sort();
  var key = "{";
  for (var i = 0;i < keys.length;i++) {
    if (i !== 0) {
      key += ",";
    }
    key += wd.util.json.stringify(keys[i]);
    key += ":";
    key += wd.core.util.ObjectToUniqueKey(obj[keys[i]]);
  }
  key += "}";
  return key;
};
wd.core.util.splitStringBySize = function(str, segsize) {
  if (str.length <= segsize) {
    return [str];
  }
  var dataSegs = [];
  for (var c = 0;c < str.length;c += segsize) {
    if (c + segsize > str) {
      dataSegs.push(str.substring(c, str.length));
    } else {
      dataSegs.push(str.substring(c, c + segsize));
    }
  }
  return dataSegs;
};
wd.core.util.each = function(obj, fn) {
  if (goog.isArray(obj)) {
    for (var i = 0;i < obj.length;++i) {
      fn(i, obj[i]);
    }
  } else {
    goog.object.forEach(obj, fn);
  }
};
wd.core.util.bindCallback = function(callback, opt_context) {
  return opt_context ? goog.bind(callback, opt_context) : callback;
};
wd.core.util.doubleToIEEE754String = function(v) {
  wd.core.util.assert(!wd.core.util.isInvalidJSONNumber(v), "Invalid JSON number");
  var ebits = 11, fbits = 52;
  var bias = (1 << ebits - 1) - 1, s, e, f, ln, i, bits, str, bytes;
  if (v === 0) {
    e = 0;
    f = 0;
    s = 1 / v === -Infinity ? 1 : 0;
  } else {
    s = v < 0;
    v = Math.abs(v);
    if (v >= Math.pow(2, 1 - bias)) {
      ln = Math.min(Math.floor(Math.log(v) / Math.LN2), bias);
      e = ln + bias;
      f = Math.round(v * Math.pow(2, fbits - ln) - Math.pow(2, fbits));
    } else {
      e = 0;
      f = Math.round(v / Math.pow(2, 1 - bias - fbits));
    }
  }
  bits = [];
  for (i = fbits;i;i -= 1) {
    bits.push(f % 2 ? 1 : 0);
    f = Math.floor(f / 2);
  }
  for (i = ebits;i;i -= 1) {
    bits.push(e % 2 ? 1 : 0);
    e = Math.floor(e / 2);
  }
  bits.push(s ? 1 : 0);
  bits.reverse();
  str = bits.join("");
  var hexByteString = "";
  for (i = 0;i < 64;i += 8) {
    var hexByte = parseInt(str.substr(i, 8), 2).toString(16);
    if (hexByte.length === 1) {
      hexByte = "0" + hexByte;
    }
    hexByteString = hexByteString + hexByte;
  }
  return hexByteString.toLowerCase();
};
wd.core.util.isChromeExtensionContentScript = function() {
  return !!(typeof window === "object" && window["chrome"] && window["chrome"]["extension"] && !/^chrome/.test(window.location.href));
};
wd.core.util.isWindowsStoreApp = function() {
  return typeof Windows === "object" && typeof Windows.UI === "object";
};
wd.core.util.errorForServerCode = function(code) {
  var reason = "Unknown Error";
  if (code === "too_big") {
    reason = "The data requested exceeds the maximum size " + "that can be accessed with a single request.";
  } else {
    if (code == "permission_denied") {
      reason = "Client doesn't have permission to access the desired data.";
    } else {
      if (code == "unavailable") {
        reason = "The service is unavailable";
      }
    }
  }
  var error = new Error(code + ": " + reason);
  error.code = code.toUpperCase();
  return error;
};
wd.core.util.INTEGER_REGEXP_ = new RegExp("^-?\\d{1,10}$");
wd.core.util.tryParseInt = function(str) {
  if (wd.core.util.INTEGER_REGEXP_.test(str)) {
    var intVal = Number(str);
    if (intVal >= -2147483648 && intVal <= 2147483647) {
      return intVal;
    }
  }
  return null;
};
wd.core.util.exceptionGuard = function(fn) {
  try {
    fn();
  } catch (e) {
    setTimeout(function() {
      var stack = e.stack || "";
      wd.core.util.warn("Exception was thrown by user callback.", stack);
      throw e;
    }, Math.floor(0));
  }
};
wd.core.util.callUserCallback = function(opt_callback, var_args) {
  if (goog.isFunction(opt_callback)) {
    var args = Array.prototype.slice.call(arguments, 1);
    var newArgs = args.slice();
    wd.core.util.exceptionGuard(function() {
      opt_callback.apply(null, newArgs);
    });
  }
};
wd.core.util.beingCrawled = function() {
  var userAgent = typeof window === "object" && window["navigator"] && window["navigator"]["userAgent"] || "";
  return userAgent.search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) >= 0;
};
goog.provide("wd.util.jwt");
goog.require("wd.core.util");
goog.require("wd.util.json");
goog.require("wd.util.obj");
goog.require("goog.crypt.base64");
goog.require("goog.json");
wd.util.jwt.decode = function(token) {
  var header = {}, claims = {}, data = {}, signature = "";
  try {
    var parts = token.split(".");
    header = wd.util.json.eval(wd.core.util.base64Decode(parts[0]) || "");
    claims = wd.util.json.eval(wd.core.util.base64Decode(parts[1]) || "");
    signature = parts[2];
    data = claims["d"] || {};
    delete claims["d"];
  } catch (e) {
  }
  return {header:header, claims:claims, data:data, signature:signature};
};
wd.util.jwt.isValidTimestamp = function(token) {
  var claims = wd.util.jwt.decode(token).claims, now = Math.floor((new Date).getTime() / 1E3), validSince, validUntil;
  if (typeof claims === "object") {
    if (claims.hasOwnProperty("nbf")) {
      validSince = wd.util.obj.get(claims, "nbf");
    } else {
      if (claims.hasOwnProperty("iat")) {
        validSince = wd.util.obj.get(claims, "iat");
      }
    }
    if (claims.hasOwnProperty("exp")) {
      validUntil = wd.util.obj.get(claims, "exp");
    } else {
      validUntil = validSince + 86400;
    }
  }
  return now && validSince && validUntil && now >= validSince && now <= validUntil;
};
wd.util.jwt.issuedAtTime = function(token) {
  var claims = wd.util.jwt.decode(token).claims;
  if (typeof claims === "object" && claims.hasOwnProperty("iat")) {
    return wd.util.obj.get(claims, "iat");
  }
  return null;
};
wd.util.jwt.isValidFormat = function(token) {
  return true;
  var decoded = wd.util.jwt.decode(token), claims = decoded.claims;
  return !!decoded.signature && !!claims && typeof claims === "object" && claims.hasOwnProperty("iat");
};
wd.util.jwt.isAdmin = function(token) {
  var claims = wd.util.jwt.decode(token).claims;
  return typeof claims === "object" && wd.util.obj.get(claims, "admin") === true;
};
goog.provide("wd.core.ReadonlyRestClient");
goog.require("wd.core.util");
goog.require("wd.util");
goog.require("wd.util.json");
goog.require("wd.util.jwt");
goog.require("wd.util.obj");
wd.core.ReadonlyRestClient = goog.defineClass(null, {constructor:function(repoInfo, onDataUpdate) {
  this.log_ = wd.core.util.logWrapper("p:rest:");
  this.repoInfo_ = repoInfo;
  this.onDataUpdate_ = onDataUpdate;
  this.credential_ = null;
  this.listens_ = {};
}, listen:function(query, currentHashFn, tag, onComplete) {
  var pathString = query.path.toString();
  this.log_("Listen called for " + pathString + " " + query.queryIdentifier());
  var listenId = wd.core.ReadonlyRestClient.getListenId_(query, tag);
  var thisListen = new Object;
  this.listens_[listenId] = thisListen;
  var queryStringParamaters = query.getQueryParams().toRestQueryStringParameters();
  var self = this;
  this.restRequest_(pathString + ".json", queryStringParamaters, function(error, result) {
    var data = result;
    if (error === 404) {
      data = null;
      error = null;
    }
    if (error === null) {
      self.onDataUpdate_(pathString, data, false, tag);
    }
    if (wd.util.obj.get(self.listens_, listenId) === thisListen) {
      var status;
      if (!error) {
        status = "ok";
      } else {
        if (error == 401) {
          status = "permission_denied";
        } else {
          status = "rest_error:" + error;
        }
      }
      onComplete(status, null);
    }
  });
}, unlisten:function(query, tag) {
  var listenId = wd.core.ReadonlyRestClient.getListenId_(query, tag);
  delete this.listens_[listenId];
}, auth:function(cred, opt_callback, opt_cancelCallback) {
  this.credential_ = cred;
  var res = wd.util.jwt.decode(cred);
  var auth = res.data;
  var expires = res.claims && res.claims["exp"];
  if (opt_callback) {
    opt_callback("ok", {"auth":auth, "expires":expires});
  }
}, unauth:function(onComplete) {
  this.credential_ = null;
  onComplete("ok", null);
}, onDisconnectPut:function(pathString, data, opt_onComplete) {
}, onDisconnectMerge:function(pathString, data, opt_onComplete) {
}, onDisconnectCancel:function(pathString, opt_onComplete) {
}, put:function(pathString, data, opt_onComplete, opt_hash) {
}, merge:function(pathString, data, onComplete, opt_hash) {
}, reportStats:function(stats) {
}, restRequest_:function(pathString, queryStringParameters, callback) {
  queryStringParameters = queryStringParameters || {};
  queryStringParameters["format"] = "export";
  if (this.credential_) {
    queryStringParameters["auth"] = this.credential_;
  }
  var url = (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host + pathString + "?" + wd.util.querystring(queryStringParameters);
  this.log_("Sending REST request for " + url);
  var xhr = new XMLHttpRequest;
  var self = this;
  xhr.onreadystatechange = function() {
    if (callback && xhr.readyState === 4) {
      self.log_("REST Response for " + url + " received. status:", xhr.status, "response:", xhr.responseText);
      var res = null;
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          res = wd.util.json.eval(xhr.responseText);
        } catch (e) {
          wd.core.util.warn("Failed to parse JSON response for " + url + ": " + xhr.responseText);
        }
        callback(null, res);
      } else {
        if (xhr.status !== 401 && xhr.status !== 404) {
          wd.core.util.warn("Got unsuccessful REST response for " + url + " Status: " + xhr.status);
        }
        callback(xhr.status);
      }
      callback = null;
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}, statics:{getListenId_:function(query, opt_tag) {
  if (goog.isDef(opt_tag)) {
    return "tag$" + opt_tag;
  } else {
    wd.core.util.assert(query.getQueryParams().isDefault(), "should have a tag if it's not a default query.");
    return query.path.toString();
  }
}}});
goog.provide("wd.core.util.SortedMap");
goog.require("goog.array");
wd.Comparator;
wd.core.util.SortedMap = goog.defineClass(null, {constructor:function(comparator, opt_root) {
  this.comparator_ = comparator;
  this.root_ = opt_root ? opt_root : wd.core.util.SortedMap.EMPTY_NODE_;
}, insert:function(key, value) {
  return new wd.core.util.SortedMap(this.comparator_, this.root_.insert(key, value, this.comparator_).copy(null, null, wd.LLRBNode.BLACK, null, null));
}, remove:function(key) {
  return new wd.core.util.SortedMap(this.comparator_, this.root_.remove(key, this.comparator_).copy(null, null, wd.LLRBNode.BLACK, null, null));
}, get:function(key) {
  var cmp;
  var node = this.root_;
  while (!node.isEmpty()) {
    cmp = this.comparator_(key, node.key);
    if (cmp === 0) {
      return node.value;
    } else {
      if (cmp < 0) {
        node = node.left;
      } else {
        if (cmp > 0) {
          node = node.right;
        }
      }
    }
  }
  return null;
}, getPredecessorKey:function(key) {
  var cmp, node = this.root_, rightParent = null;
  while (!node.isEmpty()) {
    cmp = this.comparator_(key, node.key);
    if (cmp === 0) {
      if (!node.left.isEmpty()) {
        node = node.left;
        while (!node.right.isEmpty()) {
          node = node.right;
        }
        return node.key;
      } else {
        if (rightParent) {
          return rightParent.key;
        } else {
          return null;
        }
      }
    } else {
      if (cmp < 0) {
        node = node.left;
      } else {
        if (cmp > 0) {
          rightParent = node;
          node = node.right;
        }
      }
    }
  }
  throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?");
}, isEmpty:function() {
  return this.root_.isEmpty();
}, count:function() {
  return this.root_.count();
}, minKey:function() {
  return this.root_.minKey();
}, maxKey:function() {
  return this.root_.maxKey();
}, inorderTraversal:function(action) {
  return this.root_.inorderTraversal(action);
}, reverseTraversal:function(action) {
  return this.root_.reverseTraversal(action);
}, getIterator:function(opt_resultGenerator) {
  return new wd.core.util.SortedMapIterator(this.root_, null, this.comparator_, false, opt_resultGenerator);
}, getIteratorFrom:function(key, opt_resultGenerator) {
  return new wd.core.util.SortedMapIterator(this.root_, key, this.comparator_, false, opt_resultGenerator);
}, getReverseIteratorFrom:function(key, opt_resultGenerator) {
  return new wd.core.util.SortedMapIterator(this.root_, key, this.comparator_, true, opt_resultGenerator);
}, getReverseIterator:function(opt_resultGenerator) {
  return new wd.core.util.SortedMapIterator(this.root_, null, this.comparator_, true, opt_resultGenerator);
}});
wd.core.util.SortedMapIterator = goog.defineClass(null, {constructor:function(node, startKey, comparator, isReverse, opt_resultGenerator) {
  this.resultGenerator_ = opt_resultGenerator || null;
  this.isReverse_ = isReverse;
  this.nodeStack_ = [];
  var cmp = 1;
  while (!node.isEmpty()) {
    cmp = startKey ? comparator(node.key, startKey) : 1;
    if (isReverse) {
      cmp *= -1;
    }
    if (cmp < 0) {
      if (this.isReverse_) {
        node = node.left;
      } else {
        node = node.right;
      }
    } else {
      if (cmp === 0) {
        this.nodeStack_.push(node);
        break;
      } else {
        this.nodeStack_.push(node);
        if (this.isReverse_) {
          node = node.right;
        } else {
          node = node.left;
        }
      }
    }
  }
}, getNext:function() {
  if (this.nodeStack_.length === 0) {
    return null;
  }
  var node = this.nodeStack_.pop(), result;
  if (this.resultGenerator_) {
    result = this.resultGenerator_(node.key, node.value);
  } else {
    result = {key:node.key, value:node.value};
  }
  if (this.isReverse_) {
    node = node.left;
    while (!node.isEmpty()) {
      this.nodeStack_.push(node);
      node = node.right;
    }
  } else {
    node = node.right;
    while (!node.isEmpty()) {
      this.nodeStack_.push(node);
      node = node.left;
    }
  }
  return result;
}, hasNext:function() {
  return this.nodeStack_.length > 0;
}, peek:function() {
  if (this.nodeStack_.length === 0) {
    return null;
  }
  var node = goog.array.peek(this.nodeStack_);
  if (this.resultGenerator_) {
    return this.resultGenerator_(node.key, node.value);
  } else {
    return {key:node.key, value:node.value};
  }
}});
wd.LLRBNode = goog.defineClass(null, {constructor:function(key, value, color, opt_left, opt_right) {
  this.key = key;
  this.value = value;
  this.color = color != null ? color : wd.LLRBNode.RED;
  this.left = opt_left != null ? opt_left : wd.core.util.SortedMap.EMPTY_NODE_;
  this.right = opt_right != null ? opt_right : wd.core.util.SortedMap.EMPTY_NODE_;
}, statics:{RED:true, BLACK:false}, copy:function(key, value, color, left, right) {
  return new wd.LLRBNode(key != null ? key : this.key, value != null ? value : this.value, color != null ? color : this.color, left != null ? left : this.left, right != null ? right : this.right);
}, count:function() {
  return this.left.count() + 1 + this.right.count();
}, isEmpty:function() {
  return false;
}, inorderTraversal:function(action) {
  return this.left.inorderTraversal(action) || action(this.key, this.value) || this.right.inorderTraversal(action);
}, reverseTraversal:function(action) {
  return this.right.reverseTraversal(action) || action(this.key, this.value) || this.left.reverseTraversal(action);
}, min_:function() {
  if (this.left.isEmpty()) {
    return this;
  } else {
    return this.left.min_();
  }
}, minKey:function() {
  return this.min_().key;
}, maxKey:function() {
  if (this.right.isEmpty()) {
    return this.key;
  } else {
    return this.right.maxKey();
  }
}, insert:function(key, value, comparator) {
  var cmp, n;
  n = this;
  cmp = comparator(key, n.key);
  if (cmp < 0) {
    n = n.copy(null, null, null, n.left.insert(key, value, comparator), null);
  } else {
    if (cmp === 0) {
      n = n.copy(null, value, null, null, null);
    } else {
      n = n.copy(null, null, null, null, n.right.insert(key, value, comparator));
    }
  }
  return n.fixUp_();
}, removeMin_:function() {
  var n;
  if (this.left.isEmpty()) {
    return wd.core.util.SortedMap.EMPTY_NODE_;
  }
  n = this;
  if (!n.left.isRed_() && !n.left.left.isRed_()) {
    n = n.moveRedLeft_();
  }
  n = n.copy(null, null, null, n.left.removeMin_(), null);
  return n.fixUp_();
}, remove:function(key, comparator) {
  var n, smallest;
  n = this;
  if (comparator(key, n.key) < 0) {
    if (!n.left.isEmpty() && !n.left.isRed_() && !n.left.left.isRed_()) {
      n = n.moveRedLeft_();
    }
    n = n.copy(null, null, null, n.left.remove(key, comparator), null);
  } else {
    if (n.left.isRed_()) {
      n = n.rotateRight_();
    }
    if (!n.right.isEmpty() && !n.right.isRed_() && !n.right.left.isRed_()) {
      n = n.moveRedRight_();
    }
    if (comparator(key, n.key) === 0) {
      if (n.right.isEmpty()) {
        return wd.core.util.SortedMap.EMPTY_NODE_;
      } else {
        smallest = n.right.min_();
        n = n.copy(smallest.key, smallest.value, null, null, n.right.removeMin_());
      }
    }
    n = n.copy(null, null, null, null, n.right.remove(key, comparator));
  }
  return n.fixUp_();
}, isRed_:function() {
  return this.color;
}, fixUp_:function() {
  var n = this;
  if (n.right.isRed_() && !n.left.isRed_()) {
    n = n.rotateLeft_();
  }
  if (n.left.isRed_() && n.left.left.isRed_()) {
    n = n.rotateRight_();
  }
  if (n.left.isRed_() && n.right.isRed_()) {
    n = n.colorFlip_();
  }
  return n;
}, moveRedLeft_:function() {
  var n = this.colorFlip_();
  if (n.right.left.isRed_()) {
    n = n.copy(null, null, null, null, n.right.rotateRight_());
    n = n.rotateLeft_();
    n = n.colorFlip_();
  }
  return n;
}, moveRedRight_:function() {
  var n = this.colorFlip_();
  if (n.left.left.isRed_()) {
    n = n.rotateRight_();
    n = n.colorFlip_();
  }
  return n;
}, rotateLeft_:function() {
  var nl;
  nl = this.copy(null, null, wd.LLRBNode.RED, null, this.right.left);
  return this.right.copy(null, null, this.color, nl, null);
}, rotateRight_:function() {
  var nr;
  nr = this.copy(null, null, wd.LLRBNode.RED, this.left.right, null);
  return this.left.copy(null, null, this.color, null, nr);
}, colorFlip_:function() {
  var left, right;
  left = this.left.copy(null, null, !this.left.color, null, null);
  right = this.right.copy(null, null, !this.right.color, null, null);
  return this.copy(null, null, !this.color, left, right);
}, checkMaxDepth_:function() {
  var blackDepth;
  blackDepth = this.check_();
  if (Math.pow(2, blackDepth) <= this.count() + 1) {
    return true;
  } else {
    return false;
  }
}, check_:function() {
  var blackDepth;
  if (this.isRed_() && this.left.isRed_()) {
    throw new Error("Red node has red child(" + this.key + "," + this.value + ")");
  }
  if (this.right.isRed_()) {
    throw new Error("Right child of (" + this.key + "," + this.value + ") is red");
  }
  blackDepth = this.left.check_();
  if (blackDepth !== this.right.check_()) {
    throw new Error("Black depths differ");
  } else {
    return blackDepth + (this.isRed_() ? 0 : 1);
  }
}});
wd.LLRBEmptyNode = goog.defineClass(null, {constructor:function() {
}, copy:function() {
  return this;
}, insert:function(key, value, comparator) {
  return new wd.LLRBNode(key, value, null);
}, remove:function(key, comparator) {
  return this;
}, count:function() {
  return 0;
}, isEmpty:function() {
  return true;
}, inorderTraversal:function(action) {
  return false;
}, reverseTraversal:function(action) {
  return false;
}, minKey:function() {
  return null;
}, maxKey:function() {
  return null;
}, check_:function() {
  return 0;
}, isRed_:function() {
  return false;
}});
wd.core.util.SortedMap.EMPTY_NODE_ = new wd.LLRBEmptyNode;
goog.provide("wd.core.snap.comparators");
wd.core.snap.NAME_ONLY_COMPARATOR = function(left, right) {
  return wd.core.util.nameCompare(left.name, right.name);
};
wd.core.snap.NAME_COMPARATOR = function(left, right) {
  return wd.core.util.nameCompare(left, right);
};
goog.provide("wd.core.snap.Index");
goog.provide("wd.core.snap.PriorityIndex");
goog.provide("wd.core.snap.SubKeyIndex");
goog.require("wd.core.snap.comparators");
goog.require("wd.core.util");
wd.core.snap.Index = function() {
};
wd.core.snap.Index.FallbackType;
wd.core.snap.Index.Fallback = {};
wd.core.snap.Index.prototype.compare = goog.abstractMethod;
wd.core.snap.Index.prototype.isDefinedOn = goog.abstractMethod;
wd.core.snap.Index.prototype.getCompare = function() {
  return goog.bind(this.compare, this);
};
wd.core.snap.Index.prototype.indexedValueChanged = function(oldNode, newNode) {
  var oldWrapped = new wd.core.snap.NamedNode(wd.core.util.MIN_NAME, oldNode);
  var newWrapped = new wd.core.snap.NamedNode(wd.core.util.MIN_NAME, newNode);
  return this.compare(oldWrapped, newWrapped) !== 0;
};
wd.core.snap.Index.prototype.minPost = function() {
  return wd.core.snap.NamedNode.MIN;
};
wd.core.snap.Index.prototype.maxPost = goog.abstractMethod;
wd.core.snap.Index.prototype.makePost = goog.abstractMethod;
wd.core.snap.Index.prototype.toString = goog.abstractMethod;
wd.core.snap.SubKeyIndex = function(indexKey) {
  wd.core.snap.Index.call(this);
  this.indexKey_ = indexKey;
};
goog.inherits(wd.core.snap.SubKeyIndex, wd.core.snap.Index);
wd.core.snap.SubKeyIndex.prototype.extractChild = function(snap) {
  return snap.getImmediateChild(this.indexKey_);
};
wd.core.snap.SubKeyIndex.prototype.isDefinedOn = function(node) {
  return !node.getImmediateChild(this.indexKey_).isEmpty();
};
wd.core.snap.SubKeyIndex.prototype.compare = function(a, b) {
  var aChild = this.extractChild(a.node);
  var bChild = this.extractChild(b.node);
  var indexCmp = aChild.compareTo(bChild);
  if (indexCmp === 0) {
    return wd.core.util.nameCompare(a.name, b.name);
  } else {
    return indexCmp;
  }
};
wd.core.snap.SubKeyIndex.prototype.makePost = function(indexValue, name) {
  var valueNode = wd.core.snap.NodeFromJSON(indexValue);
  var node = wd.core.snap.EMPTY_NODE.updateImmediateChild(this.indexKey_, valueNode);
  return new wd.core.snap.NamedNode(name, node);
};
wd.core.snap.SubKeyIndex.prototype.maxPost = function() {
  var node = wd.core.snap.EMPTY_NODE.updateImmediateChild(this.indexKey_, wd.core.snap.MAX_NODE);
  return new wd.core.snap.NamedNode(wd.core.util.MAX_NAME, node);
};
wd.core.snap.SubKeyIndex.prototype.toString = function() {
  return this.indexKey_;
};
wd.core.snap.PriorityIndex_ = function() {
  wd.core.snap.Index.call(this);
};
goog.inherits(wd.core.snap.PriorityIndex_, wd.core.snap.Index);
wd.core.snap.PriorityIndex_.prototype.compare = function(a, b) {
  var aPriority = a.node.getPriority();
  var bPriority = b.node.getPriority();
  var indexCmp = aPriority.compareTo(bPriority);
  if (indexCmp === 0) {
    return wd.core.util.nameCompare(a.name, b.name);
  } else {
    return indexCmp;
  }
};
wd.core.snap.PriorityIndex_.prototype.isDefinedOn = function(node) {
  return !node.getPriority().isEmpty();
};
wd.core.snap.PriorityIndex_.prototype.indexedValueChanged = function(oldNode, newNode) {
  return !oldNode.getPriority().equals(newNode.getPriority());
};
wd.core.snap.PriorityIndex_.prototype.minPost = function() {
  return wd.core.snap.NamedNode.MIN;
};
wd.core.snap.PriorityIndex_.prototype.maxPost = function() {
  return new wd.core.snap.NamedNode(wd.core.util.MAX_NAME, new wd.core.snap.LeafNode("[PRIORITY-POST]", wd.core.snap.MAX_NODE));
};
wd.core.snap.PriorityIndex_.prototype.makePost = function(indexValue, name) {
  var priorityNode = wd.core.snap.NodeFromJSON(indexValue);
  return new wd.core.snap.NamedNode(name, new wd.core.snap.LeafNode("[PRIORITY-POST]", priorityNode));
};
wd.core.snap.PriorityIndex_.prototype.toString = function() {
  return ".priority";
};
wd.core.snap.PriorityIndex = new wd.core.snap.PriorityIndex_;
wd.core.snap.KeyIndex_ = function() {
  wd.core.snap.Index.call(this);
};
goog.inherits(wd.core.snap.KeyIndex_, wd.core.snap.Index);
wd.core.snap.KeyIndex_.prototype.compare = function(a, b) {
  return wd.core.util.nameCompare(a.name, b.name);
};
wd.core.snap.KeyIndex_.prototype.isDefinedOn = function(node) {
  throw wd.core.util.assertionError("KeyIndex.isDefinedOn not expected to be called.");
};
wd.core.snap.KeyIndex_.prototype.indexedValueChanged = function(oldNode, newNode) {
  return false;
};
wd.core.snap.KeyIndex_.prototype.minPost = function() {
  return wd.core.snap.NamedNode.MIN;
};
wd.core.snap.KeyIndex_.prototype.maxPost = function() {
  return new wd.core.snap.NamedNode(wd.core.util.MAX_NAME, wd.core.snap.EMPTY_NODE);
};
wd.core.snap.KeyIndex_.prototype.makePost = function(indexValue, name) {
  wd.core.util.assert(goog.isString(indexValue), "KeyIndex indexValue must always be a string.");
  return new wd.core.snap.NamedNode(indexValue, wd.core.snap.EMPTY_NODE);
};
wd.core.snap.KeyIndex_.prototype.toString = function() {
  return ".key";
};
wd.core.snap.KeyIndex = new wd.core.snap.KeyIndex_;
wd.core.snap.ValueIndex_ = function() {
  wd.core.snap.Index.call(this);
};
goog.inherits(wd.core.snap.ValueIndex_, wd.core.snap.Index);
wd.core.snap.ValueIndex_.prototype.compare = function(a, b) {
  var indexCmp = a.node.compareTo(b.node);
  if (indexCmp === 0) {
    return wd.core.util.nameCompare(a.name, b.name);
  } else {
    return indexCmp;
  }
};
wd.core.snap.ValueIndex_.prototype.isDefinedOn = function(node) {
  return true;
};
wd.core.snap.ValueIndex_.prototype.indexedValueChanged = function(oldNode, newNode) {
  return !oldNode.equals(newNode);
};
wd.core.snap.ValueIndex_.prototype.minPost = function() {
  return wd.core.snap.NamedNode.MIN;
};
wd.core.snap.ValueIndex_.prototype.maxPost = function() {
  return wd.core.snap.NamedNode.MAX;
};
wd.core.snap.ValueIndex_.prototype.makePost = function(indexValue, name) {
  var valueNode = wd.core.snap.NodeFromJSON(indexValue);
  return new wd.core.snap.NamedNode(name, valueNode);
};
wd.core.snap.ValueIndex_.prototype.toString = function() {
  return ".value";
};
wd.core.snap.ValueIndex = new wd.core.snap.ValueIndex_;
goog.provide("wd.core.snap.Node");
goog.provide("wd.core.snap.NamedNode");
wd.core.snap.Node = function() {
};
wd.core.snap.Node.prototype.isLeafNode;
wd.core.snap.Node.prototype.getPriority;
wd.core.snap.Node.prototype.updatePriority;
wd.core.snap.Node.prototype.getImmediateChild;
wd.core.snap.Node.prototype.getChild;
wd.core.snap.Node.prototype.getPredecessorChildName;
wd.core.snap.Node.prototype.updateImmediateChild;
wd.core.snap.Node.prototype.updateChild;
wd.core.snap.Node.prototype.hasChild;
wd.core.snap.Node.prototype.isEmpty;
wd.core.snap.Node.prototype.numChildren;
wd.core.snap.Node.prototype.val;
wd.core.snap.Node.prototype.hash;
wd.core.snap.Node.prototype.compareTo;
wd.core.snap.Node.prototype.equals;
wd.core.snap.Node.prototype.withIndex;
wd.core.snap.Node.prototype.isIndexed;
wd.core.snap.NamedNode = function(name, node) {
  this.name = name;
  this.node = node;
};
wd.core.snap.NamedNode.Wrap = function(name, node) {
  return new wd.core.snap.NamedNode(name, node);
};
goog.provide("wd.core.snap.IndexMap");
goog.require("wd.core.snap.Index");
goog.require("wd.core.util");
wd.core.snap.IndexMap = function(indexes, indexSet) {
  this.indexes_ = indexes;
  this.indexSet_ = indexSet;
};
wd.core.snap.IndexMap.prototype.get = function(indexKey) {
  var sortedMap = wd.util.obj.get(this.indexes_, indexKey);
  if (!sortedMap) {
    throw new Error("No index defined for " + indexKey);
  }
  if (sortedMap === wd.core.snap.Index.Fallback) {
    return null;
  } else {
    return sortedMap;
  }
};
wd.core.snap.IndexMap.prototype.hasIndex = function(indexDefinition) {
  return goog.object.contains(this.indexSet_, indexDefinition.toString());
};
wd.core.snap.IndexMap.prototype.addIndex = function(indexDefinition, existingChildren) {
  wd.core.util.assert(indexDefinition !== wd.core.snap.KeyIndex, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
  var childList = [];
  var sawIndexedValue = false;
  var iter = existingChildren.getIterator(wd.core.snap.NamedNode.Wrap);
  var next = iter.getNext();
  while (next) {
    sawIndexedValue = sawIndexedValue || indexDefinition.isDefinedOn(next.node);
    childList.push(next);
    next = iter.getNext();
  }
  var newIndex;
  if (sawIndexedValue) {
    newIndex = wd.core.snap.buildChildSet(childList, indexDefinition.getCompare());
  } else {
    newIndex = wd.core.snap.Index.Fallback;
  }
  var indexName = indexDefinition.toString();
  var newIndexSet = goog.object.clone(this.indexSet_);
  newIndexSet[indexName] = indexDefinition;
  var newIndexes = goog.object.clone(this.indexes_);
  newIndexes[indexName] = newIndex;
  return new wd.core.snap.IndexMap(newIndexes, newIndexSet);
};
wd.core.snap.IndexMap.prototype.addToIndexes = function(namedNode, existingChildren) {
  var self = this;
  var newIndexes = goog.object.map(this.indexes_, function(indexedChildren, indexName) {
    var index = wd.util.obj.get(self.indexSet_, indexName);
    wd.core.util.assert(index, "Missing index implementation for " + indexName);
    if (indexedChildren === wd.core.snap.Index.Fallback) {
      if (index.isDefinedOn(namedNode.node)) {
        var childList = [];
        var iter = existingChildren.getIterator(wd.core.snap.NamedNode.Wrap);
        var next = iter.getNext();
        while (next) {
          if (next.name != namedNode.name) {
            childList.push(next);
          }
          next = iter.getNext();
        }
        childList.push(namedNode);
        return wd.core.snap.buildChildSet(childList, index.getCompare());
      } else {
        return wd.core.snap.Index.Fallback;
      }
    } else {
      var existingSnap = existingChildren.get(namedNode.name);
      var newChildren = indexedChildren;
      if (existingSnap) {
        newChildren = newChildren.remove(new wd.core.snap.NamedNode(namedNode.name, existingSnap));
      }
      return newChildren.insert(namedNode, namedNode.node);
    }
  });
  return new wd.core.snap.IndexMap(newIndexes, this.indexSet_);
};
wd.core.snap.IndexMap.prototype.removeFromIndexes = function(namedNode, existingChildren) {
  var newIndexes = goog.object.map(this.indexes_, function(indexedChildren) {
    if (indexedChildren === wd.core.snap.Index.Fallback) {
      return indexedChildren;
    } else {
      var existingSnap = existingChildren.get(namedNode.name);
      if (existingSnap) {
        return indexedChildren.remove(new wd.core.snap.NamedNode(namedNode.name, existingSnap));
      } else {
        return indexedChildren;
      }
    }
  });
  return new wd.core.snap.IndexMap(newIndexes, this.indexSet_);
};
wd.core.snap.IndexMap.Default = new wd.core.snap.IndexMap({".priority":wd.core.snap.Index.Fallback}, {".priority":wd.core.snap.PriorityIndex});
goog.provide("wd.core.snap.LeafNode");
goog.require("wd.core.snap.Node");
goog.require("wd.core.util");
wd.core.snap.LeafNode = function(value, opt_priorityNode) {
  this.value_ = value;
  wd.core.util.assert(goog.isDef(this.value_) && this.value_ !== null, "LeafNode shouldn't be created with null/undefined value.");
  this.priorityNode_ = opt_priorityNode || wd.core.snap.EMPTY_NODE;
  wd.core.snap.validatePriorityNode(this.priorityNode_);
  this.lazyHash_ = null;
};
wd.core.snap.LeafNode.prototype.isLeafNode = function() {
  return true;
};
wd.core.snap.LeafNode.prototype.getPriority = function() {
  return this.priorityNode_;
};
wd.core.snap.LeafNode.prototype.updatePriority = function(newPriorityNode) {
  return new wd.core.snap.LeafNode(this.value_, newPriorityNode);
};
wd.core.snap.LeafNode.prototype.getImmediateChild = function(childName) {
  if (childName === ".priority") {
    return this.priorityNode_;
  } else {
    return wd.core.snap.EMPTY_NODE;
  }
};
wd.core.snap.LeafNode.prototype.getChild = function(path) {
  if (path.isEmpty()) {
    return this;
  } else {
    if (path.getFront() === ".priority") {
      return this.priorityNode_;
    } else {
      return wd.core.snap.EMPTY_NODE;
    }
  }
};
wd.core.snap.LeafNode.prototype.hasChild = function() {
  return false;
};
wd.core.snap.LeafNode.prototype.getPredecessorChildName = function(childName, childNode) {
  return null;
};
wd.core.snap.LeafNode.prototype.updateImmediateChild = function(childName, newChildNode) {
  if (childName === ".priority") {
    return this.updatePriority(newChildNode);
  } else {
    if (newChildNode.isEmpty() && childName !== ".priority") {
      return this;
    } else {
      return wd.core.snap.EMPTY_NODE.updateImmediateChild(childName, newChildNode).updatePriority(this.priorityNode_);
    }
  }
};
wd.core.snap.LeafNode.prototype.updateChild = function(path, newChildNode) {
  var front = path.getFront();
  if (front === null) {
    return newChildNode;
  } else {
    if (newChildNode.isEmpty() && front !== ".priority") {
      return this;
    } else {
      wd.core.util.assert(front !== ".priority" || path.getLength() === 1, ".priority must be the last token in a path");
      return this.updateImmediateChild(front, wd.core.snap.EMPTY_NODE.updateChild(path.popFront(), newChildNode));
    }
  }
};
wd.core.snap.LeafNode.prototype.isEmpty = function() {
  return false;
};
wd.core.snap.LeafNode.prototype.numChildren = function() {
  return 0;
};
wd.core.snap.LeafNode.prototype.val = function(opt_exportFormat) {
  if (opt_exportFormat && !this.getPriority().isEmpty()) {
    return {".value":this.getValue(), ".priority":this.getPriority().val()};
  } else {
    return this.getValue();
  }
};
wd.core.snap.LeafNode.prototype.hash = function() {
  if (this.lazyHash_ === null) {
    var toHash = "";
    if (!this.priorityNode_.isEmpty()) {
      toHash += "priority:" + wd.core.snap.priorityHashText(this.priorityNode_.val()) + ":";
    }
    var type = typeof this.value_;
    toHash += type + ":";
    if (type === "number") {
      toHash += wd.core.util.doubleToIEEE754String(this.value_);
    } else {
      toHash += this.value_;
    }
    this.lazyHash_ = wd.core.util.sha1(toHash);
  }
  return this.lazyHash_;
};
wd.core.snap.LeafNode.prototype.getValue = function() {
  return this.value_;
};
wd.core.snap.LeafNode.prototype.compareTo = function(other) {
  if (other === wd.core.snap.EMPTY_NODE) {
    return 1;
  } else {
    if (other instanceof wd.core.snap.ChildrenNode) {
      return -1;
    } else {
      wd.core.util.assert(other.isLeafNode(), "Unknown node type");
      return this.compareToLeafNode_(other);
    }
  }
};
wd.core.snap.LeafNode.VALUE_TYPE_ORDER = ["object", "boolean", "number", "string"];
wd.core.snap.LeafNode.prototype.compareToLeafNode_ = function(otherLeaf) {
  var otherLeafType = typeof otherLeaf.value_;
  var thisLeafType = typeof this.value_;
  var otherIndex = goog.array.indexOf(wd.core.snap.LeafNode.VALUE_TYPE_ORDER, otherLeafType);
  var thisIndex = goog.array.indexOf(wd.core.snap.LeafNode.VALUE_TYPE_ORDER, thisLeafType);
  wd.core.util.assert(otherIndex >= 0, "Unknown leaf type: " + otherLeafType);
  wd.core.util.assert(thisIndex >= 0, "Unknown leaf type: " + thisLeafType);
  if (otherIndex === thisIndex) {
    if (thisLeafType === "object") {
      return 0;
    } else {
      if (this.value_ < otherLeaf.value_) {
        return -1;
      } else {
        if (this.value_ === otherLeaf.value_) {
          return 0;
        } else {
          return 1;
        }
      }
    }
  } else {
    return thisIndex - otherIndex;
  }
};
wd.core.snap.LeafNode.prototype.withIndex = function() {
  return this;
};
wd.core.snap.LeafNode.prototype.isIndexed = function() {
  return true;
};
wd.core.snap.LeafNode.prototype.equals = function(other) {
  if (other === this) {
    return true;
  } else {
    if (other.isLeafNode()) {
      var otherLeaf = other;
      return this.value_ === otherLeaf.value_ && this.priorityNode_.equals(otherLeaf.priorityNode_);
    } else {
      return false;
    }
  }
};
if (goog.DEBUG) {
  wd.core.snap.LeafNode.prototype.toString = function() {
    return wd.util.json.stringify(this.val(true));
  };
}
;goog.provide("wd.core.snap.ChildrenNode");
goog.require("wd.core.snap.IndexMap");
goog.require("wd.core.snap.LeafNode");
goog.require("wd.core.snap.NamedNode");
goog.require("wd.core.snap.Node");
goog.require("wd.core.snap.PriorityIndex");
goog.require("wd.core.snap.comparators");
goog.require("wd.core.util");
goog.require("wd.core.util.SortedMap");
wd.core.snap.ChildrenNode = function(children, priorityNode, indexMap) {
  this.children_ = children;
  this.priorityNode_ = priorityNode;
  if (this.priorityNode_) {
    wd.core.snap.validatePriorityNode(this.priorityNode_);
  }
  if (children.isEmpty()) {
    wd.core.util.assert(!this.priorityNode_ || this.priorityNode_.isEmpty(), "An empty node cannot have a priority");
  }
  this.indexMap_ = indexMap;
  this.lazyHash_ = null;
};
wd.core.snap.ChildrenNode.prototype.isLeafNode = function() {
  return false;
};
wd.core.snap.ChildrenNode.prototype.getPriority = function() {
  return this.priorityNode_ || wd.core.snap.EMPTY_NODE;
};
wd.core.snap.ChildrenNode.prototype.updatePriority = function(newPriorityNode) {
  if (this.children_.isEmpty()) {
    return this;
  } else {
    return new wd.core.snap.ChildrenNode(this.children_, newPriorityNode, this.indexMap_);
  }
};
wd.core.snap.ChildrenNode.prototype.getImmediateChild = function(childName) {
  if (childName === ".priority") {
    return this.getPriority();
  } else {
    var child = this.children_.get(childName);
    return child === null ? wd.core.snap.EMPTY_NODE : child;
  }
};
wd.core.snap.ChildrenNode.prototype.getChild = function(path) {
  var front = path.getFront();
  if (front === null) {
    return this;
  }
  return this.getImmediateChild(front).getChild(path.popFront());
};
wd.core.snap.ChildrenNode.prototype.hasChild = function(childName) {
  return this.children_.get(childName) !== null;
};
wd.core.snap.ChildrenNode.prototype.updateImmediateChild = function(childName, newChildNode) {
  wd.core.util.assert(newChildNode, "We should always be passing snapshot nodes");
  if (childName === ".priority") {
    return this.updatePriority(newChildNode);
  } else {
    var namedNode = new wd.core.snap.NamedNode(childName, newChildNode);
    var newChildren, newIndexMap, newPriority;
    if (newChildNode.isEmpty()) {
      newChildren = this.children_.remove(childName);
      newIndexMap = this.indexMap_.removeFromIndexes(namedNode, this.children_);
    } else {
      newChildren = this.children_.insert(childName, newChildNode);
      newIndexMap = this.indexMap_.addToIndexes(namedNode, this.children_);
    }
    newPriority = newChildren.isEmpty() ? wd.core.snap.EMPTY_NODE : this.priorityNode_;
    return new wd.core.snap.ChildrenNode(newChildren, newPriority, newIndexMap);
  }
};
wd.core.snap.ChildrenNode.prototype.updateChild = function(path, newChildNode) {
  var front = path.getFront();
  if (front === null) {
    return newChildNode;
  } else {
    wd.core.util.assert(path.getFront() !== ".priority" || path.getLength() === 1, ".priority must be the last token in a path");
    var newImmediateChild = this.getImmediateChild(front).updateChild(path.popFront(), newChildNode);
    return this.updateImmediateChild(front, newImmediateChild);
  }
};
wd.core.snap.ChildrenNode.prototype.isEmpty = function() {
  return this.children_.isEmpty();
};
wd.core.snap.ChildrenNode.prototype.numChildren = function() {
  return this.children_.count();
};
wd.core.snap.ChildrenNode.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/;
wd.core.snap.ChildrenNode.prototype.val = function(opt_exportFormat) {
  if (this.isEmpty()) {
    return null;
  }
  var obj = {};
  var numKeys = 0, maxKey = 0, allIntegerKeys = true;
  this.forEachChild(wd.core.snap.PriorityIndex, function(key, childNode) {
    obj[key] = childNode.val(opt_exportFormat);
    numKeys++;
    if (allIntegerKeys && wd.core.snap.ChildrenNode.INTEGER_REGEXP_.test(key)) {
      maxKey = Math.max(maxKey, Number(key));
    } else {
      allIntegerKeys = false;
    }
  });
  if (!opt_exportFormat && allIntegerKeys && maxKey < 2 * numKeys) {
    var array = [];
    for (var key in obj) {
      array[key] = obj[key];
    }
    return array;
  } else {
    if (opt_exportFormat && !this.getPriority().isEmpty()) {
      obj[".priority"] = this.getPriority().val();
    }
    return obj;
  }
};
wd.core.snap.ChildrenNode.prototype.hash = function() {
  if (this.lazyHash_ === null) {
    var toHash = "";
    if (!this.getPriority().isEmpty()) {
      toHash += "priority:" + wd.core.snap.priorityHashText(this.getPriority().val()) + ":";
    }
    this.forEachChild(wd.core.snap.PriorityIndex, function(key, childNode) {
      var childHash = childNode.hash();
      if (childHash !== "") {
        toHash += ":" + key + ":" + childHash;
      }
    });
    this.lazyHash_ = toHash === "" ? "" : wd.core.util.sha1(toHash);
  }
  return this.lazyHash_;
};
wd.core.snap.ChildrenNode.prototype.getPredecessorChildName = function(childName, childNode, index) {
  var idx = this.resolveIndex_(index);
  if (idx) {
    var predecessor = idx.getPredecessorKey(new wd.core.snap.NamedNode(childName, childNode));
    return predecessor ? predecessor.name : null;
  } else {
    return this.children_.getPredecessorKey(childName);
  }
};
wd.core.snap.ChildrenNode.prototype.getFirstChildName = function(indexDefinition) {
  var idx = this.resolveIndex_(indexDefinition);
  if (idx) {
    var minKey = idx.minKey();
    return minKey && minKey.name;
  } else {
    return this.children_.minKey();
  }
};
wd.core.snap.ChildrenNode.prototype.getFirstChild = function(indexDefinition) {
  var minKey = this.getFirstChildName(indexDefinition);
  if (minKey) {
    return new wd.core.snap.NamedNode(minKey, this.children_.get(minKey));
  } else {
    return null;
  }
};
wd.core.snap.ChildrenNode.prototype.getLastChildName = function(indexDefinition) {
  var idx = this.resolveIndex_(indexDefinition);
  if (idx) {
    var maxKey = idx.maxKey();
    return maxKey && maxKey.name;
  } else {
    return this.children_.maxKey();
  }
};
wd.core.snap.ChildrenNode.prototype.getLastChild = function(indexDefinition) {
  var maxKey = this.getLastChildName(indexDefinition);
  if (maxKey) {
    return new wd.core.snap.NamedNode(maxKey, this.children_.get(maxKey));
  } else {
    return null;
  }
};
wd.core.snap.ChildrenNode.prototype.forEachChild = function(index, action) {
  var idx = this.resolveIndex_(index);
  if (idx) {
    return idx.inorderTraversal(function(wrappedNode) {
      return action(wrappedNode.name, wrappedNode.node);
    });
  } else {
    return this.children_.inorderTraversal(action);
  }
};
wd.core.snap.ChildrenNode.prototype.getIterator = function(indexDefinition) {
  return this.getIteratorFrom(indexDefinition.minPost(), indexDefinition);
};
wd.core.snap.ChildrenNode.prototype.getIteratorFrom = function(startPost, indexDefinition) {
  var idx = this.resolveIndex_(indexDefinition);
  if (idx) {
    return idx.getIteratorFrom(startPost, function(key) {
      return key;
    });
  } else {
    var iterator = this.children_.getIteratorFrom(startPost.name, wd.core.snap.NamedNode.Wrap);
    var next = iterator.peek();
    while (next != null && indexDefinition.compare(next, startPost) < 0) {
      iterator.getNext();
      next = iterator.peek();
    }
    return iterator;
  }
};
wd.core.snap.ChildrenNode.prototype.getReverseIterator = function(indexDefinition) {
  return this.getReverseIteratorFrom(indexDefinition.maxPost(), indexDefinition);
};
wd.core.snap.ChildrenNode.prototype.getReverseIteratorFrom = function(endPost, indexDefinition) {
  var idx = this.resolveIndex_(indexDefinition);
  if (idx) {
    return idx.getReverseIteratorFrom(endPost, function(key) {
      return key;
    });
  } else {
    var iterator = this.children_.getReverseIteratorFrom(endPost.name, wd.core.snap.NamedNode.Wrap);
    var next = iterator.peek();
    while (next != null && indexDefinition.compare(next, endPost) > 0) {
      iterator.getNext();
      next = iterator.peek();
    }
    return iterator;
  }
};
wd.core.snap.ChildrenNode.prototype.compareTo = function(other) {
  if (this.isEmpty()) {
    if (other.isEmpty()) {
      return 0;
    } else {
      return -1;
    }
  } else {
    if (other.isLeafNode() || other.isEmpty()) {
      return 1;
    } else {
      if (other === wd.core.snap.MAX_NODE) {
        return -1;
      } else {
        return 0;
      }
    }
  }
};
wd.core.snap.ChildrenNode.prototype.withIndex = function(indexDefinition) {
  if (indexDefinition === wd.core.snap.KeyIndex || this.indexMap_.hasIndex(indexDefinition)) {
    return this;
  } else {
    var newIndexMap = this.indexMap_.addIndex(indexDefinition, this.children_);
    return new wd.core.snap.ChildrenNode(this.children_, this.priorityNode_, newIndexMap);
  }
};
wd.core.snap.ChildrenNode.prototype.isIndexed = function(index) {
  return index === wd.core.snap.KeyIndex || this.indexMap_.hasIndex(index);
};
wd.core.snap.ChildrenNode.prototype.equals = function(other) {
  if (other === this) {
    return true;
  } else {
    if (other.isLeafNode()) {
      return false;
    } else {
      var otherChildrenNode = other;
      if (!this.getPriority().equals(otherChildrenNode.getPriority())) {
        return false;
      } else {
        if (this.children_.count() === otherChildrenNode.children_.count()) {
          var thisIter = this.getIterator(wd.core.snap.PriorityIndex);
          var otherIter = otherChildrenNode.getIterator(wd.core.snap.PriorityIndex);
          var thisCurrent = thisIter.getNext();
          var otherCurrent = otherIter.getNext();
          while (thisCurrent && otherCurrent) {
            if (thisCurrent.name !== otherCurrent.name || !thisCurrent.node.equals(otherCurrent.node)) {
              return false;
            }
            thisCurrent = thisIter.getNext();
            otherCurrent = otherIter.getNext();
          }
          return thisCurrent === null && otherCurrent === null;
        } else {
          return false;
        }
      }
    }
  }
};
wd.core.snap.ChildrenNode.prototype.resolveIndex_ = function(indexDefinition) {
  if (indexDefinition === wd.core.snap.KeyIndex) {
    return null;
  } else {
    return this.indexMap_.get(indexDefinition.toString());
  }
};
if (goog.DEBUG) {
  wd.core.snap.ChildrenNode.prototype.toString = function() {
    return wd.util.json.stringify(this.val(true));
  };
}
;goog.provide("wd.core.snap");
goog.require("wd.core.snap.ChildrenNode");
goog.require("wd.core.snap.IndexMap");
goog.require("wd.core.snap.LeafNode");
goog.require("wd.core.util");
var USE_HINZE = true;
wd.core.snap.NodeFromJSON = function(json, opt_priority) {
  if (json === null) {
    return wd.core.snap.EMPTY_NODE;
  }
  var priority = null;
  if (typeof json === "object" && ".priority" in json) {
    priority = json[".priority"];
  } else {
    if (typeof opt_priority !== "undefined") {
      priority = opt_priority;
    }
  }
  wd.core.util.assert(priority === null || typeof priority === "string" || typeof priority === "number" || typeof priority === "object" && ".sv" in priority, "Invalid priority type found: " + typeof priority);
  if (typeof json === "object" && ".value" in json && json[".value"] !== null) {
    json = json[".value"];
  }
  if (typeof json !== "object" || ".sv" in json) {
    var jsonLeaf = json;
    return new wd.core.snap.LeafNode(jsonLeaf, wd.core.snap.NodeFromJSON(priority));
  }
  if (!(json instanceof Array) && USE_HINZE) {
    var children = [];
    var childrenHavePriority = false;
    var hinzeJsonObj = json;
    wd.util.obj.foreach(hinzeJsonObj, function(key, child) {
      if (typeof key !== "string" || key.substring(0, 1) !== ".") {
        var childNode = wd.core.snap.NodeFromJSON(hinzeJsonObj[key]);
        if (!childNode.isEmpty()) {
          childrenHavePriority = childrenHavePriority || !childNode.getPriority().isEmpty();
          children.push(new wd.core.snap.NamedNode(key, childNode));
        }
      }
    });
    if (children.length == 0) {
      return wd.core.snap.EMPTY_NODE;
    }
    var childSet = wd.core.snap.buildChildSet(children, wd.core.snap.NAME_ONLY_COMPARATOR, function(namedNode) {
      return namedNode.name;
    }, wd.core.snap.NAME_COMPARATOR);
    if (childrenHavePriority) {
      var sortedChildSet = wd.core.snap.buildChildSet(children, wd.core.snap.PriorityIndex.getCompare());
      return new wd.core.snap.ChildrenNode(childSet, wd.core.snap.NodeFromJSON(priority), new wd.core.snap.IndexMap({".priority":sortedChildSet}, {".priority":wd.core.snap.PriorityIndex}));
    } else {
      return new wd.core.snap.ChildrenNode(childSet, wd.core.snap.NodeFromJSON(priority), wd.core.snap.IndexMap.Default);
    }
  } else {
    var node = wd.core.snap.EMPTY_NODE;
    var jsonObj = json;
    goog.object.forEach(jsonObj, function(childData, key) {
      if (wd.util.obj.contains(jsonObj, key)) {
        if (key.substring(0, 1) !== ".") {
          var childNode = wd.core.snap.NodeFromJSON(childData);
          if (childNode.isLeafNode() || !childNode.isEmpty()) {
            node = node.updateImmediateChild(key, childNode);
          }
        }
      }
    });
    return node.updatePriority(wd.core.snap.NodeFromJSON(priority));
  }
};
var LOG_2 = Math.log(2);
wd.core.snap.Base12Num = function(length) {
  var logBase2 = function(num) {
    return parseInt(Math.log(num) / LOG_2, 10);
  };
  var bitMask = function(bits) {
    return parseInt(Array(bits + 1).join("1"), 2);
  };
  this.count = logBase2(length + 1);
  this.current_ = this.count - 1;
  var mask = bitMask(this.count);
  this.bits_ = length + 1 & mask;
};
wd.core.snap.Base12Num.prototype.nextBitIsOne = function() {
  var result = !(this.bits_ & 1 << this.current_);
  this.current_--;
  return result;
};
wd.core.snap.buildChildSet = function(childList, cmp, keyFn, mapSortFn) {
  childList.sort(cmp);
  var buildBalancedTree = function(low, high) {
    var length = high - low;
    if (length == 0) {
      return null;
    } else {
      if (length == 1) {
        var namedNode = childList[low];
        var key = keyFn ? keyFn(namedNode) : namedNode;
        return new wd.LLRBNode(key, namedNode.node, wd.LLRBNode.BLACK, null, null);
      } else {
        var middle = parseInt(length / 2, 10) + low;
        var left = buildBalancedTree(low, middle);
        var right = buildBalancedTree(middle + 1, high);
        namedNode = childList[middle];
        key = keyFn ? keyFn(namedNode) : namedNode;
        return new wd.LLRBNode(key, namedNode.node, wd.LLRBNode.BLACK, left, right);
      }
    }
  };
  var buildFrom12Array = function(base12) {
    var node = null;
    var root = null;
    var index = childList.length;
    var buildPennant = function(chunkSize, color) {
      var low = index - chunkSize;
      var high = index;
      index -= chunkSize;
      var childTree = buildBalancedTree(low + 1, high);
      var namedNode = childList[low];
      var key = keyFn ? keyFn(namedNode) : namedNode;
      attachPennant(new wd.LLRBNode(key, namedNode.node, color, null, childTree));
    };
    var attachPennant = function(pennant) {
      if (node) {
        node.left = pennant;
        node = pennant;
      } else {
        root = pennant;
        node = pennant;
      }
    };
    for (var i = 0;i < base12.count;++i) {
      var isOne = base12.nextBitIsOne();
      var chunkSize = Math.pow(2, base12.count - (i + 1));
      if (isOne) {
        buildPennant(chunkSize, wd.LLRBNode.BLACK);
      } else {
        buildPennant(chunkSize, wd.LLRBNode.BLACK);
        buildPennant(chunkSize, wd.LLRBNode.RED);
      }
    }
    return root;
  };
  var base12 = new wd.core.snap.Base12Num(childList.length);
  var root = buildFrom12Array(base12);
  if (root !== null) {
    return new wd.core.util.SortedMap(mapSortFn || cmp, root);
  } else {
    return new wd.core.util.SortedMap(mapSortFn || cmp);
  }
};
wd.core.snap.priorityHashText = function(priority) {
  if (typeof priority === "number") {
    return "number:" + wd.core.util.doubleToIEEE754String(priority);
  } else {
    return "string:" + priority;
  }
};
wd.core.snap.validatePriorityNode = function(priorityNode) {
  if (priorityNode.isLeafNode()) {
    var val = priorityNode.val();
    wd.core.util.assert(typeof val === "string" || typeof val === "number" || typeof val === "object" && wd.util.obj.contains(val, ".sv"), "Priority must be a string or number.");
  } else {
    wd.core.util.assert(priorityNode === wd.core.snap.MAX_NODE || priorityNode.isEmpty(), "priority of unexpected type.");
  }
  wd.core.util.assert(priorityNode === wd.core.snap.MAX_NODE || priorityNode.getPriority().isEmpty(), "Priority nodes can't have a priority of their own.");
};
wd.core.snap.EMPTY_NODE = new wd.core.snap.ChildrenNode(new wd.core.util.SortedMap(wd.core.snap.NAME_COMPARATOR), null, wd.core.snap.IndexMap.Default);
wd.core.snap.MAX_NODE_ = function() {
  wd.core.snap.ChildrenNode.call(this, new wd.core.util.SortedMap(wd.core.snap.NAME_COMPARATOR), wd.core.snap.EMPTY_NODE, wd.core.snap.IndexMap.Default);
};
goog.inherits(wd.core.snap.MAX_NODE_, wd.core.snap.ChildrenNode);
wd.core.snap.MAX_NODE_.prototype.compareTo = function(other) {
  if (other === this) {
    return 0;
  } else {
    return 1;
  }
};
wd.core.snap.MAX_NODE_.prototype.equals = function(other) {
  return other === this;
};
wd.core.snap.MAX_NODE_.prototype.getPriority = function() {
  return this;
};
wd.core.snap.MAX_NODE_.prototype.getImmediateChild = function(childName) {
  return wd.core.snap.EMPTY_NODE;
};
wd.core.snap.MAX_NODE_.prototype.isEmpty = function() {
  return false;
};
wd.core.snap.MAX_NODE = new wd.core.snap.MAX_NODE_;
wd.core.snap.NamedNode.MIN = new wd.core.snap.NamedNode(wd.core.util.MIN_NAME, wd.core.snap.EMPTY_NODE);
wd.core.snap.NamedNode.MAX = new wd.core.snap.NamedNode(wd.core.util.MAX_NAME, wd.core.snap.MAX_NODE);
goog.provide("wd.core.util.Path");
goog.provide("wd.core.util.ValidationPath");
wd.core.util.Path = goog.defineClass(null, {constructor:function(pathOrString, opt_pieceNum) {
  if (arguments.length == 1) {
    this.pieces_ = pathOrString.split("/");
    var copyTo = 0;
    for (var i = 0;i < this.pieces_.length;i++) {
      if (this.pieces_[i].length > 0) {
        this.pieces_[copyTo] = this.pieces_[i];
        copyTo++;
      }
    }
    this.pieces_.length = copyTo;
    this.pieceNum_ = 0;
  } else {
    this.pieces_ = pathOrString;
    this.pieceNum_ = opt_pieceNum;
  }
}, getFront:function() {
  if (this.pieceNum_ >= this.pieces_.length) {
    return null;
  }
  return this.pieces_[this.pieceNum_];
}, getLength:function() {
  return this.pieces_.length - this.pieceNum_;
}, popFront:function() {
  var pieceNum = this.pieceNum_;
  if (pieceNum < this.pieces_.length) {
    pieceNum++;
  }
  return new wd.core.util.Path(this.pieces_, pieceNum);
}, getBack:function() {
  if (this.pieceNum_ < this.pieces_.length) {
    return this.pieces_[this.pieces_.length - 1];
  }
  return null;
}, toString:function() {
  var pathString = "";
  for (var i = this.pieceNum_;i < this.pieces_.length;i++) {
    if (this.pieces_[i] !== "") {
      pathString += "/" + this.pieces_[i];
    }
  }
  return pathString || "/";
}, toUrlEncodedString:function() {
  var pathString = "";
  for (var i = this.pieceNum_;i < this.pieces_.length;i++) {
    if (this.pieces_[i] !== "") {
      pathString += "/" + goog.string.urlEncode(this.pieces_[i]);
    }
  }
  return pathString || "/";
}, slice:function(opt_begin) {
  var begin = opt_begin || 0;
  return this.pieces_.slice(this.pieceNum_ + begin);
}, parent:function() {
  if (this.pieceNum_ >= this.pieces_.length) {
    return null;
  }
  var pieces = [];
  for (var i = this.pieceNum_;i < this.pieces_.length - 1;i++) {
    pieces.push(this.pieces_[i]);
  }
  return new wd.core.util.Path(pieces, 0);
}, child:function(childPathObj) {
  var pieces = [];
  for (var i = this.pieceNum_;i < this.pieces_.length;i++) {
    pieces.push(this.pieces_[i]);
  }
  if (childPathObj instanceof wd.core.util.Path) {
    for (i = childPathObj.pieceNum_;i < childPathObj.pieces_.length;i++) {
      pieces.push(childPathObj.pieces_[i]);
    }
  } else {
    var childPieces = childPathObj.split("/");
    for (i = 0;i < childPieces.length;i++) {
      if (childPieces[i].length > 0) {
        pieces.push(childPieces[i]);
      }
    }
  }
  return new wd.core.util.Path(pieces, 0);
}, isEmpty:function() {
  return this.pieceNum_ >= this.pieces_.length;
}, statics:{relativePath:function(outerPath, innerPath) {
  var outer = outerPath.getFront(), inner = innerPath.getFront();
  if (outer === null) {
    return innerPath;
  } else {
    if (outer === inner) {
      return wd.core.util.Path.relativePath(outerPath.popFront(), innerPath.popFront());
    } else {
      throw new Error("INTERNAL ERROR: innerPath (" + innerPath + ") is not within " + "outerPath (" + outerPath + ")");
    }
  }
}}, equals:function(other) {
  if (this.getLength() !== other.getLength()) {
    return false;
  }
  for (var i = this.pieceNum_, j = other.pieceNum_;i <= this.pieces_.length;i++, j++) {
    if (this.pieces_[i] !== other.pieces_[j]) {
      return false;
    }
  }
  return true;
}, contains:function(other) {
  var i = this.pieceNum_;
  var j = other.pieceNum_;
  if (this.getLength() > other.getLength()) {
    return false;
  }
  while (i < this.pieces_.length) {
    if (this.pieces_[i] !== other.pieces_[j]) {
      return false;
    }
    ++i;
    ++j;
  }
  return true;
}});
wd.core.util.Path.Empty = new wd.core.util.Path("");
wd.core.util.ValidationPath = goog.defineClass(null, {constructor:function(path, errorPrefix) {
  this.parts_ = path.slice();
  this.byteLength_ = Math.max(1, this.parts_.length);
  this.errorPrefix_ = errorPrefix;
  for (var i = 0;i < this.parts_.length;i++) {
    this.byteLength_ += wd.util.utf8.stringLength(this.parts_[i]);
  }
  this.checkValid_();
}, statics:{MAX_PATH_DEPTH:32, MAX_PATH_LENGTH_BYTES:768}, push:function(child) {
  if (this.parts_.length > 0) {
    this.byteLength_ += 1;
  }
  this.parts_.push(child);
  this.byteLength_ += wd.util.utf8.stringLength(child);
  this.checkValid_();
}, pop:function() {
  var last = this.parts_.pop();
  this.byteLength_ -= wd.util.utf8.stringLength(last);
  if (this.parts_.length > 0) {
    this.byteLength_ -= 1;
  }
}, checkValid_:function() {
  if (this.byteLength_ > wd.core.util.ValidationPath.MAX_PATH_LENGTH_BYTES) {
    throw new Error(this.errorPrefix_ + "has a key path longer than " + wd.core.util.ValidationPath.MAX_PATH_LENGTH_BYTES + " bytes (" + this.byteLength_ + ").");
  }
  if (this.parts_.length > wd.core.util.ValidationPath.MAX_PATH_DEPTH) {
    throw new Error(this.errorPrefix_ + "path specified exceeds the maximum depth that can be written (" + wd.core.util.ValidationPath.MAX_PATH_DEPTH + ") or object contains a cycle " + this.toErrorString());
  }
}, toErrorString:function() {
  if (this.parts_.length == 0) {
    return "";
  }
  return "in property '" + this.parts_.join(".") + "'";
}});
goog.provide("wd.util.utf8");
goog.require("wd.core.util");
wd.util.utf8.stringToByteArray = function(str) {
  var out = [], p = 0;
  for (var i = 0;i < str.length;i++) {
    var c = str.charCodeAt(i);
    if (c >= 55296 && c <= 56319) {
      var high = c - 55296;
      i++;
      wd.core.util.assert(i < str.length, "Surrogate pair missing trail surrogate.");
      var low = str.charCodeAt(i) - 56320;
      c = 65536 + (high << 10) + low;
    }
    if (c < 128) {
      out[p++] = c;
    } else {
      if (c < 2048) {
        out[p++] = c >> 6 | 192;
        out[p++] = c & 63 | 128;
      } else {
        if (c < 65536) {
          out[p++] = c >> 12 | 224;
          out[p++] = c >> 6 & 63 | 128;
          out[p++] = c & 63 | 128;
        } else {
          out[p++] = c >> 18 | 240;
          out[p++] = c >> 12 & 63 | 128;
          out[p++] = c >> 6 & 63 | 128;
          out[p++] = c & 63 | 128;
        }
      }
    }
  }
  return out;
};
wd.util.utf8.stringLength = function(str) {
  var p = 0;
  for (var i = 0;i < str.length;i++) {
    var c = str.charCodeAt(i);
    if (c < 128) {
      p++;
    } else {
      if (c < 2048) {
        p += 2;
      } else {
        if (c >= 55296 && c <= 56319) {
          p += 4;
          i++;
        } else {
          p += 3;
        }
      }
    }
  }
  return p;
};
goog.provide("wd.util.validation");
wd.util.validation.validateArgCount = function(fnName, minCount, maxCount, argCount) {
  var argError;
  if (argCount < minCount) {
    argError = "at least " + minCount;
  } else {
    if (argCount > maxCount) {
      argError = maxCount === 0 ? "none" : "no more than " + maxCount;
    }
  }
  if (argError) {
    var error = fnName + " failed: Was called with " + argCount + (argCount === 1 ? " argument." : " arguments.") + " Expects " + argError + ".";
    throw new Error(error);
  }
};
wd.util.validation.errorPrefix = function(fnName, argumentNumber, optional) {
  var argName = "";
  switch(argumentNumber) {
    case 1:
      argName = optional ? "first" : "First";
      break;
    case 2:
      argName = optional ? "second" : "Second";
      break;
    case 3:
      argName = optional ? "third" : "Third";
      break;
    case 4:
      argName = optional ? "fourth" : "Fourth";
      break;
    default:
      throw new Error("errorPrefix called with argumentNumber > 4.  Need to update it?");;
  }
  var error = fnName + " failed: ";
  error += argName + " argument ";
  return error;
};
wd.util.validation.validateNamespace = function(fnName, argumentNumber, namespace, optional) {
  if (optional && !goog.isDef(namespace)) {
    return;
  }
  if (!goog.isString(namespace)) {
    throw new Error(wd.util.validation.errorPrefix(fnName, argumentNumber, optional) + "must be a valid wilddog namespace.");
  }
};
wd.util.validation.validateCallback = function(fnName, argumentNumber, callback, optional) {
  if (optional && !goog.isDef(callback)) {
    return;
  }
  if (!goog.isFunction(callback)) {
    throw new Error(wd.util.validation.errorPrefix(fnName, argumentNumber, optional) + "must be a valid function.");
  }
};
wd.util.validation.validateContextObject = function(fnName, argumentNumber, context, optional) {
  if (optional && !goog.isDef(context)) {
    return;
  }
  if (!goog.isObject(context) || context === null) {
    throw new Error(wd.util.validation.errorPrefix(fnName, argumentNumber, optional) + "must be a valid context object.");
  }
};
goog.provide("wd.core.util.validation");
goog.require("wd.core.util");
goog.require("wd.core.util.Path");
goog.require("wd.core.util.ValidationPath");
goog.require("wd.util.obj");
goog.require("wd.util.utf8");
goog.require("wd.util.validation");
wd.core.util.validation = {INVALID_KEY_REGEX_:/[\[\].#$\/\u0000-\u001F\u007F]/, INVALID_PATH_REGEX_:/[\[\].#$\u0000-\u001F\u007F]/, MAX_LEAF_SIZE_:10 * 1024 * 1024, isValidKey:function(key) {
  return goog.isString(key) && key.length !== 0 && !wd.core.util.validation.INVALID_KEY_REGEX_.test(key);
}, isValidPathString:function(pathString) {
  return goog.isString(pathString) && pathString.length !== 0 && !wd.core.util.validation.INVALID_PATH_REGEX_.test(pathString);
}, isValidRootPathString:function(pathString) {
  if (pathString) {
    pathString = pathString.replace(/^\/*\.info(\/|$)/, "/");
  }
  return wd.core.util.validation.isValidPathString(pathString);
}, isValidPriority:function(priority) {
  return priority === null || goog.isString(priority) || goog.isNumber(priority) && !wd.core.util.isInvalidJSONNumber(priority) || goog.isObject(priority) && wd.util.obj.contains(priority, ".sv");
}, validateWilddogDataArg:function(fnName, argumentNumber, data, path, optional) {
  if (optional && !goog.isDef(data)) {
    return;
  }
  wd.core.util.validation.validateWilddogData(wd.util.validation.errorPrefix(fnName, argumentNumber, optional), data, path);
}, validateWilddogData:function(errorPrefix, data, path) {
  if (path instanceof wd.core.util.Path) {
    path = new wd.core.util.ValidationPath(path, errorPrefix);
  }
  if (!goog.isDef(data)) {
    throw new Error(errorPrefix + "contains undefined " + path.toErrorString());
  }
  if (goog.isFunction(data)) {
    throw new Error(errorPrefix + "contains a function " + path.toErrorString() + " with contents: " + data.toString());
  }
  if (wd.core.util.isInvalidJSONNumber(data)) {
    throw new Error(errorPrefix + "contains " + data.toString() + " " + path.toErrorString());
  }
  if (goog.isString(data) && data.length > wd.core.util.validation.MAX_LEAF_SIZE_ / 3 && wd.util.utf8.stringLength(data) > wd.core.util.validation.MAX_LEAF_SIZE_) {
    throw new Error(errorPrefix + "contains a string greater than " + wd.core.util.validation.MAX_LEAF_SIZE_ + " utf8 bytes " + path.toErrorString() + " ('" + data.substring(0, 50) + "...')");
  }
  if (goog.isObject(data)) {
    var hasDotValue = false, hasActualChild = false;
    wd.util.obj.foreach(data, function(key, value) {
      if (key === ".value") {
        hasDotValue = true;
      } else {
        if (key !== ".priority" && key !== ".sv") {
          hasActualChild = true;
          if (!wd.core.util.validation.isValidKey(key)) {
            throw new Error(errorPrefix + " contains an invalid key (" + key + ") " + path.toErrorString() + ".  Keys must be non-empty strings " + 'and can\'t contain ".", "#", "$", "/", "[", or "]"');
          }
        }
      }
      path.push(key);
      wd.core.util.validation.validateWilddogData(errorPrefix, value, path);
      path.pop();
    });
    if (hasDotValue && hasActualChild) {
      throw new Error(errorPrefix + ' contains ".value" child ' + path.toErrorString() + " in addition to actual children.");
    }
  }
}, validateWilddogMergeDataArg:function(fnName, argumentNumber, data, path, optional) {
  if (optional && !goog.isDef(data)) {
    return;
  }
  if (!goog.isObject(data) || goog.isArray(data)) {
    throw new Error(wd.util.validation.errorPrefix(fnName, argumentNumber, optional) + " must be an Object containing " + "the children to replace.");
  }
  if (wd.util.obj.contains(data, ".value")) {
    throw new Error(wd.util.validation.errorPrefix(fnName, argumentNumber, optional) + ' must not contain ".value".  ' + "To overwrite with a leaf value, just use .set() instead.");
  }
  wd.core.util.validation.validateWilddogDataArg(fnName, argumentNumber, data, path, optional);
}, validatePriority:function(fnName, argumentNumber, priority, optional) {
  if (optional && !goog.isDef(priority)) {
    return;
  }
  if (wd.core.util.isInvalidJSONNumber(priority)) {
    throw new Error(wd.util.validation.errorPrefix(fnName, argumentNumber, optional) + "is " + priority.toString() + ", but must be a valid Wilddog priority (a string, finite number, " + "server value, or null).");
  }
  if (!wd.core.util.validation.isValidPriority(priority)) {
    throw new Error(wd.util.validation.errorPrefix(fnName, argumentNumber, optional) + "must be a valid Wilddog priority " + "(a string, finite number, server value, or null).");
  }
}, validateEventType:function(fnName, argumentNumber, eventType, optional) {
  if (optional && !goog.isDef(eventType)) {
    return;
  }
  switch(eventType) {
    case "value":
    ;
    case "child_added":
    ;
    case "child_removed":
    ;
    case "child_changed":
    ;
    case "child_moved":
      break;
    default:
      throw new Error(wd.util.validation.errorPrefix(fnName, argumentNumber, optional) + 'must be a valid event type: "value", "child_added", "child_removed", ' + '"child_changed", or "child_moved".');;
  }
}, validateKey:function(fnName, argumentNumber, key, optional) {
  if (optional && !goog.isDef(key)) {
    return;
  }
  if (!wd.core.util.validation.isValidKey(key)) {
    throw new Error(wd.util.validation.errorPrefix(fnName, argumentNumber, optional) + 'was an invalid key: "' + key + '".  Wilddog keys must be non-empty strings and ' + 'can\'t contain ".", "#", "$", "/", "[", or "]").');
  }
}, validatePathString:function(fnName, argumentNumber, pathString, optional) {
  if (optional && !goog.isDef(pathString)) {
    return;
  }
  if (!wd.core.util.validation.isValidPathString(pathString)) {
    throw new Error(wd.util.validation.errorPrefix(fnName, argumentNumber, optional) + 'was an invalid path: "' + pathString + '". Paths must be non-empty strings and ' + 'can\'t contain ".", "#", "$", "[", or "]"');
  }
}, validateRootPathString:function(fnName, argumentNumber, pathString, optional) {
  if (pathString) {
    pathString = pathString.replace(/^\/*\.info(\/|$)/, "/");
  }
  wd.core.util.validation.validatePathString(fnName, argumentNumber, pathString, optional);
}, validateWritablePath:function(fnName, path) {
  if (path.getFront() === ".info") {
    throw new Error(fnName + " failed: Can't modify data under /.info/");
  }
}, validateUrl:function(fnName, argumentNumber, parsedUrl) {
  var pathString = parsedUrl.path.toString();
  if (!goog.isString(parsedUrl.repoInfo.host) || parsedUrl.repoInfo.host.length === 0 || !wd.core.util.validation.isValidKey(parsedUrl.repoInfo.namespace) || pathString.length !== 0 && !wd.core.util.validation.isValidRootPathString(pathString)) {
    throw new Error(wd.util.validation.errorPrefix(fnName, argumentNumber, false) + "must be a valid wilddog URL and " + 'the path can\'t contain ".", "#", "$", "[", or "]".');
  }
}, validateCredential:function(fnName, argumentNumber, cred, optional) {
  if (optional && !goog.isDef(cred)) {
    return;
  }
  if (!goog.isString(cred)) {
    throw new Error(wd.util.validation.errorPrefix(fnName, argumentNumber, optional) + "must be a valid credential (a string).");
  }
}, validateBoolean:function(fnName, argumentNumber, bool, optional) {
  if (optional && !goog.isDef(bool)) {
    return;
  }
  if (!goog.isBoolean(bool)) {
    throw new Error(wd.util.validation.errorPrefix(fnName, argumentNumber, optional) + "must be a boolean.");
  }
}, validateString:function(fnName, argumentNumber, string, optional) {
  if (optional && !goog.isDef(string)) {
    return;
  }
  if (!goog.isString(string)) {
    throw new Error(wd.util.validation.errorPrefix(fnName, argumentNumber, optional) + "must be a valid string.");
  }
}, validateObject:function(fnName, argumentNumber, obj, optional) {
  if (optional && !goog.isDef(obj)) {
    return;
  }
  if (!goog.isObject(obj) || obj === null) {
    throw new Error(wd.util.validation.errorPrefix(fnName, argumentNumber, optional) + "must be a valid object.");
  }
}, validateObjectContainsKey:function(fnName, argumentNumber, obj, key, optional, opt_type) {
  if (optional && !goog.isDef(obj)) {
    return;
  }
  if (!goog.isObject(obj) || obj === null || !wd.util.obj.contains(obj, key)) {
    throw new Error(wd.util.validation.errorPrefix(fnName, argumentNumber, optional) + 'must contain the key "' + key + '"');
  }
  if (opt_type) {
    var val = wd.util.obj.get(obj, key);
    if (opt_type === "string" && !goog.isString(val) || opt_type === "boolean" && !goog.isBoolean(val) || opt_type === "function" && !goog.isFunction(val) || opt_type === "object" && !goog.isObject(val)) {
      throw new Error(wd.util.validation.errorPrefix(fnName, argumentNumber, optional) + 'must contain the key "' + key + '" with type "' + opt_type + '"');
    }
  }
}};
goog.provide("wd.api.DataSnapshot");
goog.require("wd.core.snap");
goog.require("wd.core.util.SortedMap");
goog.require("wd.core.util.validation");
wd.api.DataSnapshot = function(node, ref, index) {
  this.node_ = node;
  this.query_ = ref;
  this.index_ = index;
};
wd.api.DataSnapshot.prototype.val = function() {
  wd.util.validation.validateArgCount("Wilddog.DataSnapshot.val", 0, 0, arguments.length);
  return this.node_.val();
};
goog.exportProperty(wd.api.DataSnapshot.prototype, "val", wd.api.DataSnapshot.prototype.val);
wd.api.DataSnapshot.prototype.exportVal = function() {
  wd.util.validation.validateArgCount("Wilddog.DataSnapshot.exportVal", 0, 0, arguments.length);
  return this.node_.val(true);
};
goog.exportProperty(wd.api.DataSnapshot.prototype, "exportVal", wd.api.DataSnapshot.prototype.exportVal);
wd.api.DataSnapshot.prototype.exists = function() {
  wd.util.validation.validateArgCount("Wilddog.DataSnapshot.exists", 0, 0, arguments.length);
  return !this.node_.isEmpty();
};
goog.exportProperty(wd.api.DataSnapshot.prototype, "exists", wd.api.DataSnapshot.prototype.exists);
wd.api.DataSnapshot.prototype.child = function(childPathString) {
  wd.util.validation.validateArgCount("Wilddog.DataSnapshot.child", 0, 1, arguments.length);
  if (goog.isNumber(childPathString)) {
    childPathString = String(childPathString);
  }
  wd.core.util.validation.validatePathString("Wilddog.DataSnapshot.child", 1, childPathString, false);
  var childPath = new wd.core.util.Path(childPathString);
  var childRef = this.query_.child(childPath);
  return new wd.api.DataSnapshot(this.node_.getChild(childPath), childRef, wd.core.snap.PriorityIndex);
};
goog.exportProperty(wd.api.DataSnapshot.prototype, "child", wd.api.DataSnapshot.prototype.child);
wd.api.DataSnapshot.prototype.hasChild = function(childPathString) {
  wd.util.validation.validateArgCount("Wilddog.DataSnapshot.hasChild", 1, 1, arguments.length);
  wd.core.util.validation.validatePathString("Wilddog.DataSnapshot.hasChild", 1, childPathString, false);
  var childPath = new wd.core.util.Path(childPathString);
  return !this.node_.getChild(childPath).isEmpty();
};
goog.exportProperty(wd.api.DataSnapshot.prototype, "hasChild", wd.api.DataSnapshot.prototype.hasChild);
wd.api.DataSnapshot.prototype.getPriority = function() {
  wd.util.validation.validateArgCount("Wilddog.DataSnapshot.getPriority", 0, 0, arguments.length);
  return this.node_.getPriority().val();
};
goog.exportProperty(wd.api.DataSnapshot.prototype, "getPriority", wd.api.DataSnapshot.prototype.getPriority);
wd.api.DataSnapshot.prototype.forEach = function(action) {
  wd.util.validation.validateArgCount("Wilddog.DataSnapshot.forEach", 1, 1, arguments.length);
  wd.util.validation.validateCallback("Wilddog.DataSnapshot.forEach", 1, action, false);
  if (this.node_.isLeafNode()) {
    return false;
  }
  var childrenNode = this.node_;
  var self = this;
  return !!childrenNode.forEachChild(this.index_, function(key, node) {
    return action(new wd.api.DataSnapshot(node, self.query_.child(key), wd.core.snap.PriorityIndex));
  });
};
goog.exportProperty(wd.api.DataSnapshot.prototype, "forEach", wd.api.DataSnapshot.prototype.forEach);
wd.api.DataSnapshot.prototype.hasChildren = function() {
  wd.util.validation.validateArgCount("Wilddog.DataSnapshot.hasChildren", 0, 0, arguments.length);
  if (this.node_.isLeafNode()) {
    return false;
  } else {
    return !this.node_.isEmpty();
  }
};
goog.exportProperty(wd.api.DataSnapshot.prototype, "hasChildren", wd.api.DataSnapshot.prototype.hasChildren);
wd.api.DataSnapshot.prototype.name = function() {
  wd.core.util.warn("Wilddog.DataSnapshot.name() being deprecated. " + "Please use Wilddog.DataSnapshot.key() instead.");
  wd.util.validation.validateArgCount("Wilddog.DataSnapshot.name", 0, 0, arguments.length);
  return this.key();
};
goog.exportProperty(wd.api.DataSnapshot.prototype, "name", wd.api.DataSnapshot.prototype.name);
wd.api.DataSnapshot.prototype.key = function() {
  wd.util.validation.validateArgCount("Wilddog.DataSnapshot.key", 0, 0, arguments.length);
  return this.query_.key();
};
goog.exportProperty(wd.api.DataSnapshot.prototype, "key", wd.api.DataSnapshot.prototype.key);
wd.api.DataSnapshot.prototype.numChildren = function() {
  wd.util.validation.validateArgCount("Wilddog.DataSnapshot.numChildren", 0, 0, arguments.length);
  return this.node_.numChildren();
};
goog.exportProperty(wd.api.DataSnapshot.prototype, "numChildren", wd.api.DataSnapshot.prototype.numChildren);
wd.api.DataSnapshot.prototype.ref = function() {
  wd.util.validation.validateArgCount("Wilddog.DataSnapshot.ref", 0, 0, arguments.length);
  return this.query_;
};
goog.exportProperty(wd.api.DataSnapshot.prototype, "ref", wd.api.DataSnapshot.prototype.ref);
goog.provide("wd.login.Constants");
wd.login.Constants = {SESSION_PERSISTENCE_KEY_PREFIX:"session", DEFAULT_SERVER_HOST:"auth.wilddog.com", SERVER_HOST:"auth.wilddog.com", API_VERSION:"v1", POPUP_PATH_TO_CHANNEL:"/auth/channel", POPUP_RELAY_FRAME_NAME:"__winchan_relay_frame", POPUP_CLOSE_CMD:"die", JSONP_CALLBACK_NAMESPACE:"__wilddog_auth_jsonp", REDIR_REQUEST_ID_KEY:"redirect_request_id", REDIR_REQUEST_COMPLETION_KEY:"__wilddog_request_key", REDIR_CLIENT_OPTIONS_KEY:"redirect_client_options", INTERNAL_REDIRECT_SENTINAL_PATH:"/blank/page.html", 
CLIENT_OPTION_SESSION_PERSISTENCE:"remember", CLIENT_OPTION_REDIRECT_TO:"redirectTo"};
goog.provide("wd.login.RequestInfo");
goog.require("wd.login.Constants");
wd.login.RequestInfo = function(opt_clientOptions, opt_transportOptions, opt_serverParams) {
  this.clientOptions = opt_clientOptions || {};
  this.transportOptions = opt_transportOptions || {};
  this.serverParams = opt_serverParams || {};
  if (!this.clientOptions[wd.login.Constants.CLIENT_OPTION_SESSION_PERSISTENCE]) {
    this.clientOptions[wd.login.Constants.CLIENT_OPTION_SESSION_PERSISTENCE] = "default";
  }
};
wd.login.RequestInfo.CLIENT_OPTIONS = [wd.login.Constants.CLIENT_OPTION_SESSION_PERSISTENCE, wd.login.Constants.CLIENT_OPTION_REDIRECT_TO];
wd.login.RequestInfo.fromParams = function(opt_params) {
  var clientOptions = {}, serverParams = {};
  wd.util.obj.foreach(opt_params || {}, function(param, value) {
    if (goog.array.contains(wd.login.RequestInfo.CLIENT_OPTIONS, param)) {
      clientOptions[param] = value;
    } else {
      serverParams[param] = value;
    }
  });
  return new wd.login.RequestInfo(clientOptions, {}, serverParams);
};
goog.provide("wd.login.transports.util");
goog.require("wd.login.Constants");
goog.require("wd.util");
wd.login.transports.util.findRelay = function() {
  var loc = window["location"], frames = window["opener"]["frames"], i;
  for (i = frames.length - 1;i >= 0;i--) {
    try {
      if (frames[i]["location"]["protocol"] === window["location"]["protocol"] && frames[i]["location"]["host"] === window["location"]["host"] && frames[i]["name"] === wd.login.Constants.POPUP_RELAY_FRAME_NAME) {
        return frames[i];
      }
    } catch (e) {
    }
  }
  return null;
};
wd.login.transports.util.addListener = function(target, event, cb) {
  if (target["attachEvent"]) {
    target["attachEvent"]("on" + event, cb);
  } else {
    if (target["addEventListener"]) {
      target["addEventListener"](event, cb, false);
    }
  }
};
wd.login.transports.util.removeListener = function(target, event, cb) {
  if (target["detachEvent"]) {
    target["detachEvent"]("on" + event, cb);
  } else {
    if (target["removeEventListener"]) {
      target["removeEventListener"](event, cb, false);
    }
  }
};
wd.login.transports.util.extractOrigin = function(url) {
  if (!/^https?:\/\//.test(url)) {
    url = window["location"]["href"];
  }
  var m = /^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(url);
  if (m) {
    return m[1];
  }
  return url;
};
wd.login.transports.util.extractRedirectCompletionHash = function(hashStr) {
  var hash = "";
  try {
    hashStr = hashStr.replace("#", "");
    var hashObj = wd.util.querystringDecode(hashStr);
    if (hashObj && wd.util.obj.contains(hashObj, wd.login.Constants.REDIR_REQUEST_COMPLETION_KEY)) {
      hash = wd.util.obj.get(hashObj, wd.login.Constants.REDIR_REQUEST_COMPLETION_KEY);
    }
  } catch (e) {
  }
  return hash;
};
wd.login.transports.util.replaceRedirectCompletionHash = function() {
  try {
    var exp = new RegExp("&" + wd.login.Constants.REDIR_REQUEST_COMPLETION_KEY + "=([a-zA-z0-9]*)");
    document.location.hash = document.location.hash.replace(exp, "");
  } catch (e) {
  }
};
wd.login.transports.util.getBaseUrl = function() {
  var parsedUrl = wd.core.util.parseURL(wd.login.Constants.SERVER_HOST);
  return parsedUrl.scheme + "://" + parsedUrl.host + "/" + wd.login.Constants.API_VERSION;
};
wd.login.transports.util.getPopupChannelUrl = function(namespace) {
  return wd.login.transports.util.getBaseUrl() + "/" + namespace + wd.login.Constants.POPUP_PATH_TO_CHANNEL;
};
goog.provide("wd.login.Transport");
wd.login.Transport = function(options) {
};
wd.login.Transport.isAvailable = function() {
};
wd.login.Transport.prototype.open = function(url, params, onComplete) {
};
wd.login.Transport.prototype.classification = function() {
};
goog.provide("wd.login.transports.Redirect");
goog.require("wd.constants");
goog.require("wd.core.storage");
goog.require("wd.login.Transport");
goog.require("wd.login.transports.util");
goog.require("wd.util");
wd.login.transports.Redirect = function(options) {
  this.requestId_ = goog.string.getRandomString() + goog.string.getRandomString() + goog.string.getRandomString();
  this.options_ = options;
};
wd.login.transports.Redirect.prototype.open = function(url, params, cb) {
  wd.core.storage.SessionStorage.set(wd.login.Constants.REDIR_REQUEST_ID_KEY, this.requestId_);
  wd.core.storage.SessionStorage.set(wd.login.Constants.REDIR_REQUEST_ID_KEY, this.requestId_);
  params["requestId"] = this.requestId_;
  params["redirectTo"] = params["redirectTo"] || window["location"]["href"];
  url += (/\?/.test(url) ? "" : "?") + wd.util.querystring(params);
  window["location"] = url;
};
wd.login.transports.Redirect["isAvailable"] = function() {
  return !NODE_CLIENT && !wd.login.util.environment.isLocalFile() && !wd.login.util.environment.isMobileCordova();
};
wd.login.transports.Redirect.prototype.classification = function() {
  return "redirect";
};
goog.provide("wd.login.util.environment");
wd.login.util.environment.isMobileWrapper = function() {
  return wd.login.util.environment.isMobileCordova() || wd.login.util.environment.isMobileWindows() || wd.login.util.environment.isIosWebview();
};
wd.login.util.environment.isMobileCordova = function() {
  return typeof window !== "undefined" && !!(window["cordova"] || window["phonegap"] || window["PhoneGap"]) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(navigator["userAgent"]);
};
wd.login.util.environment.isMobileWindows = function() {
  return typeof navigator !== "undefined" && (!!navigator["userAgent"].match(/Windows Phone/) || !!window["Windows"] && /^ms-appx:/.test(location.href));
};
wd.login.util.environment.isMobileFirefox = function() {
  return typeof navigator !== "undefined" && (navigator["userAgent"].indexOf("Fennec/") !== -1 || navigator["userAgent"].indexOf("Firefox/") !== -1 && navigator["userAgent"].indexOf("Android") !== -1);
};
wd.login.util.environment.isIosWebview = function() {
  return typeof navigator !== "undefined" && typeof window !== "undefined" && !!(navigator["userAgent"].match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i) || navigator["userAgent"].match(/CriOS/) || navigator["userAgent"].match(/Twitter for iPhone/) || navigator["userAgent"].match(/FBAN\/FBIOS/) || window["navigator"]["standalone"]);
};
wd.login.util.environment.isHeadlessBrowser = function() {
  return typeof navigator !== "undefined" && !!navigator["userAgent"].match(/PhantomJS/);
};
wd.login.util.environment.isLocalFile = function() {
  return typeof location !== "undefined" && /^file:\//.test(location.href);
};
wd.login.util.environment.isIE = function() {
  return typeof navigator !== "undefined" && !!(navigator["userAgent"].match(/MSIE/) || navigator["userAgent"].match(/Trident/));
};
wd.login.util.environment.isModernIE = function() {
  if (typeof navigator === "undefined") {
    return false;
  }
  var ua = navigator["userAgent"], match;
  if (navigator["appName"] === "Microsoft Internet Explorer") {
    match = ua.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/);
    if (match && match.length > 1) {
      return parseFloat(match[1]) >= 8;
    }
  } else {
    if (ua.indexOf("Trident") > -1) {
      match = ua.match(/rv:([0-9]{2,2}[\.0-9]{0,})/);
      if (match && match.length > 1) {
        return parseFloat(match[1]) >= 8;
      }
    }
  }
  return false;
};
goog.provide("wd.login.Errors");
var errors = {"NETWORK_ERROR":"Unable to contact the Wilddog server.", "SERVER_ERROR":"An unknown server error occurred.", "TRANSPORT_UNAVAILABLE":"There are no login transports available for the requested method.", "REQUEST_INTERRUPTED":"The browser redirected the page before the login request could complete.", "USER_CANCELLED":"The user cancelled authentication."};
wd.login.Errors.get = function(code) {
  var msg = wd.util.obj.get(errors, code);
  var e = new Error(msg, code);
  e["code"] = code;
  return e;
};
goog.provide("wd.login.transports.NodeHttp");
goog.require("wd.login.Constants");
goog.require("wd.login.Errors");
goog.require("wd.login.Transport");
goog.require("wd.login.transports.util");
goog.require("wd.login.util.environment");
goog.require("wd.util");
goog.require("wd.util.json");
wd.login.transports.NodeHttp = function(options) {
  if (!options["method"]) {
    options["method"] = "GET";
  }
  if (!options["headers"]) {
    options["headers"] = {};
  }
  if (!options["headers"]["content_type"]) {
    options["headers"]["content_type"] = "application/json";
  }
  options["headers"]["content_type"] = options["headers"]["content_type"].toLowerCase();
  this.options = options;
};
wd.login.transports.NodeHttp.prototype.open = function(url, params, cb) {
  var self = this, parsedUrl = wd.core.util.parseURL(url), http = parsedUrl.scheme === "http" ? require("http") : require("https"), method = this.options["method"], payload;
  var headers = {"Accept":"application/json;text/plain"};
  goog.object.extend(headers, this.options["headers"]);
  var requestOpts = {"host":parsedUrl.host.split(":")[0], "port":parsedUrl.port, "path":parsedUrl.pathString, "method":this.options["method"].toUpperCase()};
  if (method === "GET") {
    requestOpts["path"] += (/\?/.test(requestOpts["path"]) ? "" : "?") + wd.util.querystring(params);
    payload = null;
  } else {
    var contentType = this.options["headers"]["content_type"];
    if (contentType === "application/json") {
      payload = wd.util.json.stringify(params);
    }
    if (contentType === "application/x-www-form-urlencoded") {
      payload = wd.util.querystring(params);
    }
    headers["Content-Length"] = Buffer["byteLength"](payload, "utf8");
  }
  requestOpts["headers"] = headers;
  var req = http["request"](requestOpts, function(response) {
    var res = "";
    response["setEncoding"]("utf8");
    response["on"]("data", function(d) {
      res += d;
    });
    response["on"]("end", function() {
      try {
        res = wd.util.json.eval(res + "");
      } catch (e) {
      }
      if (cb) {
        cb(null, res);
        cb = null;
      }
    });
  });
  if (method !== "GET") {
    req["write"](payload);
  }
  req["on"]("error", function(e) {
    if (e && e["code"] && (e["code"] === "ENOTFOUND" || e["code"] === "ENETDOWN")) {
      cb(wd.login.Errors.get("NETWORK_ERROR"));
    } else {
      cb(wd.login.Errors.get("SERVER_ERROR"));
    }
    cb = null;
  });
  req["end"]();
};
wd.login.transports.NodeHttp["isAvailable"] = function() {
  return NODE_CLIENT;
};
wd.login.transports.NodeHttp.prototype.classification = function() {
  return "json";
};
goog.provide("wd.login.SessionManager");
goog.require("wd.core.storage");
goog.require("wd.login.Constants");
goog.require("wd.util.json");
goog.require("wd.util.jwt");
wd.login.SessionManager = function(repoInfo, stores) {
  this.persistenceKey_ = [wd.login.Constants.SESSION_PERSISTENCE_KEY_PREFIX, repoInfo.persistenceKey, repoInfo.namespace].join(":");
  this.stores_ = stores;
};
wd.login.SessionManager.prototype.set = function(data, store) {
  if (!store) {
    if (this.stores_.length) {
      store = this.stores_[0];
    } else {
      throw new Error("wd.login.SessionManager : No storage options available!");
    }
  }
  store.set(this.persistenceKey_, data);
};
wd.login.SessionManager.prototype.get = function() {
  var sessions = goog.array.map(this.stores_, goog.bind(this.getFromStore_, this));
  sessions = goog.array.filter(sessions, function(session) {
    return session !== null;
  });
  goog.array.sort(sessions, function(a, b) {
    return wd.util.jwt.issuedAtTime(b["token"]) - wd.util.jwt.issuedAtTime(a["token"]);
  });
  if (sessions.length > 0) {
    return sessions.shift();
  }
  return null;
};
wd.login.SessionManager.prototype.getFromStore_ = function(store) {
  try {
    var session = store.get(this.persistenceKey_);
    if (session && session["token"]) {
      return session;
    }
  } catch (e) {
  }
  return null;
};
wd.login.SessionManager.prototype.clear = function(store) {
  var stores = store ? [store] : this.stores_, self = this;
  goog.array.forEach(this.stores_, function(store) {
    store.remove(self.persistenceKey_);
  });
};
goog.provide("wd.login.transports.Popup");
goog.require("wd.core.util");
goog.require("wd.login.Constants");
goog.require("wd.login.Errors");
goog.require("wd.login.Transport");
goog.require("wd.login.transports.util");
goog.require("wd.login.util.environment");
goog.require("wd.util");
goog.require("wd.util.json");
wd.login.transports.Popup = function(options) {
  if (!options["window_features"] || wd.login.util.environment.isMobileFirefox()) {
    options["window_features"] = undefined;
  }
  if (!options["window_name"]) {
    options["window_name"] = "_blank";
  }
  this.options = options;
};
wd.login.transports.Popup.prototype.open = function(url, params, cb) {
  var self = this, isIE = wd.login.util.environment.isModernIE(), iframe, messageTarget;
  if (!this.options["relay_url"]) {
    return cb(new Error("invalid arguments: origin of url and relay_url must match"));
  }
  var origin = wd.login.transports.util.extractOrigin(url);
  if (origin !== wd.login.transports.util.extractOrigin(self.options["relay_url"])) {
    if (cb) {
      setTimeout(function() {
        cb(new Error("invalid arguments: origin of url and relay_url must match"));
      }, 0);
    }
    return;
  }
  if (isIE) {
    iframe = document.createElement("iframe");
    iframe["setAttribute"]("src", self.options["relay_url"]);
    iframe["style"]["display"] = "none";
    iframe["setAttribute"]("name", wd.login.Constants.POPUP_RELAY_FRAME_NAME);
    document["body"]["appendChild"](iframe);
    messageTarget = iframe["contentWindow"];
  }
  url += (/\?/.test(url) ? "" : "?") + wd.util.querystring(params);
  var popup = window.open(url, self.options["window_name"], self.options["window_features"]);
  if (!messageTarget) {
    messageTarget = popup;
  }
  var closeInterval = setInterval(function() {
    if (popup && popup["closed"]) {
      cleanup(false);
      if (cb) {
        cb(wd.login.Errors.get("USER_CANCELLED"));
        cb = null;
      }
      return;
    }
  }, 500);
  var req = wd.util.json.stringify({"a":"request", "d":params});
  function cleanup(forceKeepWindowOpen) {
    if (iframe) {
      document["body"]["removeChild"](iframe);
      iframe = undefined;
    }
    if (closeInterval) {
      closeInterval = clearInterval(closeInterval);
    }
    wd.login.transports.util.removeListener(window, "message", onMessage);
    wd.login.transports.util.removeListener(window, "unload", cleanup);
    if (popup && !forceKeepWindowOpen) {
      try {
        popup["close"]();
      } catch (securityViolation) {
        messageTarget["postMessage"](wd.login.Constants.POPUP_CLOSE_CMD, origin);
      }
    }
    popup = messageTarget = undefined;
  }
  wd.login.transports.util.addListener(window, "unload", cleanup);
  function onMessage(e) {
    if (e["origin"] !== origin) {
      return;
    }
    try {
      var d = wd.util.json.eval(e["data"]);
      if (d["a"] === "ready") {
        messageTarget["postMessage"](req, origin);
      } else {
        if (d["a"] === "error") {
          cleanup(false);
          if (cb) {
            cb(d["d"]);
            cb = null;
          }
        } else {
          if (d["a"] === "response") {
            cleanup(d["forceKeepWindowOpen"]);
            if (cb) {
              cb(null, d["d"]);
              cb = null;
            }
          }
        }
      }
    } catch (err) {
    }
  }
  wd.login.transports.util.addListener(window, "message", onMessage);
};
wd.login.transports.Popup["isAvailable"] = function() {
  return !NODE_CLIENT && "postMessage" in window && !wd.login.util.environment.isLocalFile() && !wd.login.util.environment.isMobileWrapper() && !wd.login.util.environment.isHeadlessBrowser();
};
wd.login.transports.Popup.prototype.classification = function() {
  return "popup";
};
goog.provide("wd.login.transports.JSONP");
goog.require("wd.login.Constants");
goog.require("wd.login.Errors");
goog.require("wd.login.Transport");
goog.require("wd.login.transports.util");
goog.require("wd.util");
goog.require("wd.util.json");
wd.login.transports.JSONP = function(options) {
  if (!options["callback_parameter"]) {
    options["callback_parameter"] = "callback";
  }
  this.options = options;
  window[wd.login.Constants.JSONP_CALLBACK_NAMESPACE] = window[wd.login.Constants.JSONP_CALLBACK_NAMESPACE] || {};
};
wd.login.transports.JSONP.prototype.open = function(url, params, cb) {
  var id = "fn" + (new Date).getTime() + Math.floor(Math.random() * 99999);
  params[this.options["callback_parameter"]] = wd.login.Constants.JSONP_CALLBACK_NAMESPACE + "." + id;
  url += (/\?/.test(url) ? "" : "?") + wd.util.querystring(params);
  function handleInterrupt_(e) {
    if (cb) {
      cb(wd.login.Errors.get("REQUEST_INTERRUPTED"));
      cb = null;
    }
  }
  wd.login.transports.util.addListener(window, "beforeunload", handleInterrupt_);
  function cleanup_() {
    setTimeout(function() {
      window[wd.login.Constants.JSONP_CALLBACK_NAMESPACE][id] = undefined;
      if (goog.object.isEmpty(window[wd.login.Constants.JSONP_CALLBACK_NAMESPACE])) {
        window[wd.login.Constants.JSONP_CALLBACK_NAMESPACE] = undefined;
      }
      try {
        var el = document.getElementById(id);
        if (el) {
          el.parentNode.removeChild(el);
        }
      } catch (e) {
      }
    }, 1);
    wd.login.transports.util.removeListener(window, "beforeunload", handleInterrupt_);
  }
  function onload_(res) {
    if (cb) {
      cb(null, res);
      cb = null;
    }
    cleanup_();
  }
  window[wd.login.Constants.JSONP_CALLBACK_NAMESPACE][id] = onload_;
  this.writeScriptTag_(id, url, cb);
};
wd.login.transports.JSONP.prototype.writeScriptTag_ = function(id, url, cb) {
  setTimeout(function() {
    try {
      var js = document.createElement("script");
      js.type = "text/javascript";
      js.id = id;
      js.async = true;
      js.src = url;
      js.onerror = function() {
        var el = document.getElementById(id);
        if (el !== null) {
          el.parentNode.removeChild(el);
        }
        if (cb) {
          cb(wd.login.Errors.get("NETWORK_ERROR"));
        }
      };
      var ref;
      var headElements = document.getElementsByTagName("head");
      if (!headElements || goog.array.isEmpty(headElements)) {
        ref = document.documentElement;
      } else {
        ref = headElements[0];
      }
      ref.appendChild(js);
    } catch (e) {
      if (cb) {
        cb(wd.login.Errors.get("NETWORK_ERROR"));
      }
    }
  }, 0);
};
wd.login.transports.JSONP["isAvailable"] = function() {
  return !NODE_CLIENT;
};
wd.login.transports.JSONP.prototype.classification = function() {
  return "json";
};
goog.provide("wd.core.util.EventEmitter");
goog.require("wd.core.util");
goog.require("goog.array");
wd.core.util.EventEmitter = goog.defineClass(null, {constructor:function(allowedEvents) {
  wd.core.util.assert(goog.isArray(allowedEvents) && allowedEvents.length > 0, "Requires a non-empty array");
  this.allowedEvents_ = allowedEvents;
  this.listeners_ = {};
}, getInitialEvent:goog.abstractMethod, trigger:function(eventType, var_args) {
  var listeners = this.listeners_[eventType] || [];
  for (var i = 0;i < listeners.length;i++) {
    listeners[i].callback.apply(listeners[i].context, Array.prototype.slice.call(arguments, 1));
  }
}, on:function(eventType, callback, context) {
  this.validateEventType_(eventType);
  this.listeners_[eventType] = this.listeners_[eventType] || [];
  this.listeners_[eventType].push({callback:callback, context:context});
  var eventData = this.getInitialEvent(eventType);
  if (eventData) {
    callback.apply(context, eventData);
  }
}, off:function(eventType, callback, context) {
  this.validateEventType_(eventType);
  var listeners = this.listeners_[eventType] || [];
  for (var i = 0;i < listeners.length;i++) {
    if (listeners[i].callback === callback && (!context || context === listeners[i].context)) {
      listeners.splice(i, 1);
      return;
    }
  }
}, validateEventType_:function(eventType) {
  wd.core.util.assert(goog.array.find(this.allowedEvents_, function(et) {
    return et === eventType;
  }), "Unknown event: " + eventType);
}});
goog.provide("wd.login.transports.XHR");
goog.require("wd.login.Constants");
goog.require("wd.login.Errors");
goog.require("wd.login.Transport");
goog.require("wd.login.transports.util");
goog.require("wd.login.util.environment");
goog.require("wd.util");
goog.require("wd.util.json");
wd.login.transports.XHR = function(options) {
  if (!options["method"]) {
    options["method"] = "GET";
  }
  if (!options["headers"]) {
    options["headers"] = {};
  }
  if (!options["headers"]["content_type"]) {
    options["headers"]["content_type"] = "application/json";
  }
  options["headers"]["content_type"] = options["headers"]["content_type"].toLowerCase();
  this.options = options;
};
wd.login.transports.XHR.prototype.open = function(url, params, cb) {
  var self = this;
  var xhr = new XMLHttpRequest, method = this.options["method"].toUpperCase(), payload;
  function handleInterrupt_(e) {
    if (cb) {
      cb(wd.login.Errors.get("REQUEST_INTERRUPTED"));
      cb = null;
    }
  }
  wd.login.transports.util.addListener(window, "beforeunload", handleInterrupt_);
  xhr.onreadystatechange = function() {
    if (cb && xhr.readyState === 4) {
      var res;
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          res = wd.util.json.eval(xhr.responseText);
        } catch (e) {
        }
        cb(null, res);
      } else {
        if (xhr.status >= 500 && xhr.status < 600) {
          cb(wd.login.Errors.get("SERVER_ERROR"));
        } else {
          cb(wd.login.Errors.get("NETWORK_ERROR"));
        }
      }
      cb = null;
      wd.login.transports.util.removeListener(window, "beforeunload", handleInterrupt_);
    }
  };
  if (method === "GET") {
    url += (/\?/.test(url) ? "" : "?") + wd.util.querystring(params);
    payload = null;
  } else {
    var contentType = this.options["headers"]["content_type"];
    if (contentType === "application/json") {
      payload = wd.util.json.stringify(params);
    }
    if (contentType === "application/x-www-form-urlencoded") {
      payload = wd.util.querystring(params);
    }
  }
  xhr.open(method, url, true);
  var headers = {"X-Requested-With":"XMLHttpRequest", "Accept":"application/json;text/plain"};
  goog.object.extend(headers, this.options["headers"]);
  for (var header in headers) {
    xhr.setRequestHeader(header, headers[header]);
  }
  xhr.send(payload);
};
wd.login.transports.XHR["isAvailable"] = function() {
  return !NODE_CLIENT && !!window["XMLHttpRequest"] && (!wd.login.util.environment.isIE() || wd.login.util.environment.isModernIE());
};
wd.login.transports.XHR.prototype.classification = function() {
  return "json";
};
goog.provide("wd.login.transports.CordovaInAppBrowser");
goog.require("wd.core.util");
goog.require("wd.login.Constants");
goog.require("wd.login.Errors");
goog.require("wd.login.RequestInfo");
goog.require("wd.login.Transport");
goog.require("wd.login.transports.XHR");
goog.require("wd.login.transports.util");
goog.require("wd.login.util.environment");
goog.require("wd.util");
goog.require("wd.util.json");
wd.login.transports.CordovaInAppBrowser = function(options) {
  this.requestId_ = goog.string.getRandomString() + goog.string.getRandomString() + goog.string.getRandomString();
  this.options_ = options;
};
wd.login.transports.CordovaInAppBrowser.prototype.open = function(url, params, cb) {
  var self = this, parsedUrl = wd.core.util.parseURL(wd.login.Constants.SERVER_HOST), windowRef;
  function isSentinelPathMatch(url) {
    try {
      var a = document.createElement("a");
      a["href"] = url;
      return a["host"] === parsedUrl.host && a["pathname"] === wd.login.Constants.INTERNAL_REDIRECT_SENTINAL_PATH;
    } catch (e) {
    }
    return false;
  }
  function onClose_(e) {
    if (cb) {
      cb(wd.login.Errors.get("USER_CANCELLED"));
      cb = null;
    }
  }
  params["requestId"] = this.requestId_;
  params[wd.login.Constants.CLIENT_OPTION_REDIRECT_TO] = parsedUrl.scheme + "://" + parsedUrl.host + wd.login.Constants.INTERNAL_REDIRECT_SENTINAL_PATH;
  url += /\?/.test(url) ? "" : "?";
  url += wd.util.querystring(params);
  windowRef = window.open(url, "_blank", "location=no");
  if (!windowRef || !goog.isFunction(windowRef.addEventListener)) {
    cb(wd.login.Errors.get("TRANSPORT_UNAVAILABLE"));
    return;
  }
  windowRef.addEventListener("loadstart", function(e) {
    if (!e || !e["url"] || !isSentinelPathMatch(e["url"])) {
      return;
    }
    var reqKey = wd.login.transports.util.extractRedirectCompletionHash(e["url"]);
    windowRef.removeEventListener("exit", onClose_);
    windowRef.close();
    var path = "/auth/session";
    var requestInfo = new wd.login.RequestInfo(null, null, {"requestId":self.requestId_, "requestKey":reqKey});
    self.options_["requestWithCredential"](path, requestInfo, cb);
    cb = null;
  });
  windowRef.addEventListener("exit", onClose_);
};
wd.login.transports.CordovaInAppBrowser["isAvailable"] = function() {
  return !NODE_CLIENT && wd.login.util.environment.isMobileCordova();
};
wd.login.transports.CordovaInAppBrowser.prototype.classification = function() {
  return "redirect";
};
goog.provide("wd.login.AuthenticationManager");
goog.require("wd.constants");
goog.require("wd.core.storage");
goog.require("wd.core.util");
goog.require("wd.core.util.EventEmitter");
goog.require("wd.login.Constants");
goog.require("wd.login.Errors");
goog.require("wd.login.RequestInfo");
goog.require("wd.login.SessionManager");
goog.require("wd.login.transports.CordovaInAppBrowser");
goog.require("wd.login.transports.JSONP");
goog.require("wd.login.transports.NodeHttp");
goog.require("wd.login.transports.Popup");
goog.require("wd.login.transports.Redirect");
goog.require("wd.login.transports.XHR");
wd.login.AuthenticationManager = goog.defineClass(wd.core.util.EventEmitter, {constructor:function(repoInfo, auth, unauth, onAuthStatus) {
  wd.core.util.EventEmitter.call(this, ["auth_status"]);
  this.repoInfo_ = repoInfo;
  this.authConn_ = auth;
  this.unauthConn_ = unauth;
  this.onAuthStatus_ = onAuthStatus;
  this.sessionManager_ = new wd.login.SessionManager(repoInfo, [wd.core.storage.PersistentStorage, wd.core.storage.SessionStorage]);
  this.authData_ = null;
  this.redirectRestart_ = false;
  this.resumeSession();
}});
wd.login.AuthenticationManager.prototype.getAuth = function() {
  return this.authData_ || null;
};
wd.login.AuthenticationManager.prototype.resumeSession = function() {
  var redirectRequestId = wd.core.storage.SessionStorage.get(wd.login.Constants.REDIR_REQUEST_ID_KEY), self = this;
  if (redirectRequestId) {
    this.finishOAuthRedirectLogin_();
  }
  var session = this.sessionManager_.get();
  if (session && session["token"]) {
    this.updateAuthStatus_(session);
    this.authConn_(session["token"], function(status, data) {
      self.authOnComplete_(status, data, false, session["token"], session);
    }, function(cancelStatus, cancelReason) {
      self.authOnCancel_("resumeSession()", cancelStatus, cancelReason);
    });
  } else {
    this.updateAuthStatus_(null);
  }
};
wd.login.AuthenticationManager.prototype.authenticate = function(cred, userProfile, clientOptions, opt_onComplete, opt_onCancel) {
  if (this.repoInfo_.isDemoHost()) {
    wd.core.util.warn("Wilddog authentication is not supported on demo Wilddogs (*.wilddogio-demo.com). " + "To secure your Wilddog, create a production Wilddog at https://www.wilddog.com.");
  }
  var self = this;
  this.authConn_(cred, function(status, data) {
    self.authOnComplete_(status, data, true, cred, userProfile, clientOptions || {}, opt_onComplete);
  }, function(cancelStatus, cancelReason) {
    self.authOnCancel_("auth()", cancelStatus, cancelReason, opt_onCancel);
  });
};
wd.login.AuthenticationManager.prototype.unauthenticate = function(opt_onComplete) {
  var self = this;
  this.sessionManager_.clear();
  self.updateAuthStatus_(null);
  this.unauthConn_(function(status, errorReason) {
    if (status === "ok") {
      wd.core.util.callUserCallback(opt_onComplete, null);
    } else {
      var code = (status || "error").toUpperCase();
      var message = code;
      if (errorReason) {
        message += ": " + errorReason;
      }
      var error = new Error(message);
      error["code"] = code;
      wd.core.util.callUserCallback(opt_onComplete, error);
    }
  });
};
wd.login.AuthenticationManager.prototype.authOnComplete_ = function(status, authConnResult, newSession, cred, authData, opt_clientOptions, opt_onComplete) {
  if (status === "ok") {
    if (newSession) {
      var tokenPayload = authConnResult["auth"];
      authData["auth"] = tokenPayload;
      authData["expires"] = authConnResult["expires"];
      authData["token"] = wd.util.jwt.isValidFormat(cred) ? cred : "";
      var uid = null;
      if (tokenPayload && wd.util.obj.contains(tokenPayload, "uid")) {
        uid = wd.util.obj.get(tokenPayload, "uid");
      } else {
        if (wd.util.obj.contains(authData, "uid")) {
          uid = wd.util.obj.get(authData, "uid");
        }
      }
      authData["uid"] = uid;
      var provider = "custom";
      if (tokenPayload && wd.util.obj.contains(tokenPayload, "provider")) {
        provider = wd.util.obj.get(tokenPayload, "provider");
      } else {
        if (wd.util.obj.contains(authData, "provider")) {
          provider = wd.util.obj.get(authData, "provider");
        }
      }
      authData["provider"] = provider;
      this.sessionManager_.clear();
      if (wd.util.jwt.isValidFormat(cred)) {
        opt_clientOptions = opt_clientOptions || {};
        var store = wd.core.storage.PersistentStorage;
        if (opt_clientOptions[wd.login.Constants.CLIENT_OPTION_SESSION_PERSISTENCE] === "sessionOnly") {
          store = wd.core.storage.SessionStorage;
        }
        if (opt_clientOptions[wd.login.Constants.CLIENT_OPTION_SESSION_PERSISTENCE] !== "none") {
          this.sessionManager_.set(authData, store);
        }
      }
      this.updateAuthStatus_(authData);
    }
    wd.core.util.callUserCallback(opt_onComplete, null, authData);
    return;
  }
  this.handleBadAuthStatus_();
  var code = (status || "error").toUpperCase();
  var message = code;
  if (authConnResult) {
    message += ": " + authConnResult;
  }
  var error = new Error(message);
  error["code"] = code;
  wd.core.util.callUserCallback(opt_onComplete, error);
};
wd.login.AuthenticationManager.prototype.authOnCancel_ = function(fromFunction, cancelStatus, cancelReason, opt_onCancel) {
  wd.core.util.warn(fromFunction + " was canceled: " + cancelReason);
  this.handleBadAuthStatus_();
  var err = new Error(cancelReason);
  err["code"] = cancelStatus.toUpperCase();
  wd.core.util.callUserCallback(opt_onCancel, err);
};
wd.login.AuthenticationManager.prototype.handleBadAuthStatus_ = function() {
  this.sessionManager_.clear();
  this.updateAuthStatus_(null);
};
wd.login.AuthenticationManager.prototype.authWithCredential = function(provider, opt_params, opt_options, opt_onComplete) {
  this.checkServerSettingsOrThrow();
  var requestInfo = new wd.login.RequestInfo(opt_options || {}, {}, opt_params || {});
  var transports;
  if (NODE_CLIENT) {
    transports = [wd.login.transports.NodeHttp];
  } else {
    transports = [wd.login.transports.XHR, wd.login.transports.JSONP];
  }
  this.authWithTransports_(transports, "/auth/" + provider, requestInfo, opt_onComplete);
};
wd.login.AuthenticationManager.prototype.authWithPopup = function(provider, opt_params, opt_onComplete) {
  this.checkServerSettingsOrThrow();
  var transports = [wd.login.transports.Popup, wd.login.transports.CordovaInAppBrowser], requestInfo = wd.login.RequestInfo.fromParams(opt_params), width = 625, height = 625;
  if (provider === "anonymous" || provider === "password") {
    setTimeout(function() {
      wd.core.util.callUserCallback(opt_onComplete, wd.login.Errors.get("TRANSPORT_UNAVAILABLE"));
    }, 0);
    return;
  }
  requestInfo.transportOptions["window_features"] = "" + "menubar=yes," + "modal=yes," + "alwaysRaised=yes" + "location=yes," + "resizable=yes," + "scrollbars=yes," + "status=yes," + "height=" + height + "," + "width=" + width + "," + "top=" + (typeof screen === "object" ? (screen["height"] - height) * .5 : 0) + "," + "left=" + (typeof screen === "object" ? (screen["width"] - width) * .5 : 0);
  requestInfo.transportOptions["relay_url"] = wd.login.transports.util.getPopupChannelUrl(this.repoInfo_.namespace);
  requestInfo.transportOptions["requestWithCredential"] = goog.bind(this.requestWithCredential, this);
  this.authWithTransports_(transports, "/auth/" + provider, requestInfo, opt_onComplete);
};
wd.login.AuthenticationManager.prototype.authWithRedirect = function(provider, opt_params, opt_onErr) {
  this.checkServerSettingsOrThrow();
  var transports = [wd.login.transports.Redirect], requestInfo = wd.login.RequestInfo.fromParams(opt_params);
  if (provider === "anonymous" || provider === "wilddog") {
    wd.core.util.callUserCallback(opt_onErr, wd.login.Errors.get("TRANSPORT_UNAVAILABLE"));
    return;
  }
  wd.core.storage.SessionStorage.set(wd.login.Constants.REDIR_CLIENT_OPTIONS_KEY, requestInfo.clientOptions);
  this.authWithTransports_(transports, "/auth/" + provider, requestInfo, opt_onErr);
};
wd.login.AuthenticationManager.prototype.finishOAuthRedirectLogin_ = function() {
  var redirectRequestId = wd.core.storage.SessionStorage.get(wd.login.Constants.REDIR_REQUEST_ID_KEY);
  if (redirectRequestId) {
    var clientOptions = wd.core.storage.SessionStorage.get(wd.login.Constants.REDIR_CLIENT_OPTIONS_KEY);
    wd.core.storage.SessionStorage.remove(wd.login.Constants.REDIR_REQUEST_ID_KEY);
    wd.core.storage.SessionStorage.remove(wd.login.Constants.REDIR_CLIENT_OPTIONS_KEY);
    var transports = [wd.login.transports.XHR, wd.login.transports.JSONP], serverParams = {"requestId":redirectRequestId, "requestKey":wd.login.transports.util.extractRedirectCompletionHash(document.location.hash)}, transportOptions = {}, requestInfo = new wd.login.RequestInfo(clientOptions, transportOptions, serverParams);
    this.redirectRestart_ = true;
    wd.login.transports.util.replaceRedirectCompletionHash();
    this.authWithTransports_(transports, "/auth/session", requestInfo, function(error) {
      this.redirectRestart_ = false;
    }.bind(this));
  }
};
wd.login.AuthenticationManager.prototype.createUser = function(params, opt_onComplete) {
  this.checkServerSettingsOrThrow();
  var path = "/users";
  var requestInfo = wd.login.RequestInfo.fromParams(params);
  requestInfo.serverParams["_method"] = "POST";
  this.requestWithCredential(path, requestInfo, function(err, res) {
    if (err) {
      wd.core.util.callUserCallback(opt_onComplete, err);
    } else {
      wd.core.util.callUserCallback(opt_onComplete, err, res);
    }
  });
};
wd.login.AuthenticationManager.prototype.removeUser = function(params, opt_onComplete) {
  var self = this;
  this.checkServerSettingsOrThrow();
  var path = "/users/" + encodeURIComponent(params["email"]);
  var requestInfo = wd.login.RequestInfo.fromParams(params);
  requestInfo.serverParams["_method"] = "DELETE";
  this.requestWithCredential(path, requestInfo, function(err, res) {
    if (!err && res && res["uid"]) {
      if (self.authData_ && self.authData_["uid"] && self.authData_["uid"] === res["uid"]) {
        self.unauthenticate();
      }
    }
    wd.core.util.callUserCallback(opt_onComplete, err);
  });
};
wd.login.AuthenticationManager.prototype.changePassword = function(params, opt_onComplete) {
  this.checkServerSettingsOrThrow();
  var path = "/users/" + encodeURIComponent(params["email"]) + "/password";
  var requestInfo = wd.login.RequestInfo.fromParams(params);
  requestInfo.serverParams["_method"] = "PUT";
  requestInfo.serverParams["password"] = params["newPassword"];
  this.requestWithCredential(path, requestInfo, function(err, res) {
    wd.core.util.callUserCallback(opt_onComplete, err);
  });
};
wd.login.AuthenticationManager.prototype.changeEmail = function(params, opt_onComplete) {
  this.checkServerSettingsOrThrow();
  var path = "/users/" + encodeURIComponent(params["oldEmail"]) + "/email";
  var requestInfo = wd.login.RequestInfo.fromParams(params);
  requestInfo.serverParams["_method"] = "PUT";
  requestInfo.serverParams["email"] = params["newEmail"];
  requestInfo.serverParams["password"] = params["password"];
  this.requestWithCredential(path, requestInfo, function(err, res) {
    wd.core.util.callUserCallback(opt_onComplete, err);
  });
};
wd.login.AuthenticationManager.prototype.resetPassword = function(params, opt_onComplete) {
  this.checkServerSettingsOrThrow();
  var path = "/users/" + encodeURIComponent(params["email"]) + "/password";
  var requestInfo = wd.login.RequestInfo.fromParams(params);
  requestInfo.serverParams["_method"] = "POST";
  this.requestWithCredential(path, requestInfo, function(err, res) {
    wd.core.util.callUserCallback(opt_onComplete, err);
  });
};
wd.login.AuthenticationManager.prototype.requestWithCredential = function(path, requestInfo, opt_onComplete) {
  var transports;
  if (NODE_CLIENT) {
    transports = [wd.login.transports.NodeHttp];
  } else {
    transports = [wd.login.transports.XHR, wd.login.transports.JSONP];
  }
  this.requestWithTransports_(transports, path, requestInfo, opt_onComplete);
};
wd.login.AuthenticationManager.prototype.authWithTransports_ = function(transports, path, requestInfo, opt_onComplete) {
  var self = this;
  this.requestWithTransports_(transports, path, requestInfo, function onLoginReturned(err, res) {
    if (err || !(res && res["token"] && res["uid"])) {
      wd.core.util.callUserCallback(opt_onComplete, err || wd.login.Errors.get("UNKNOWN_ERROR"));
    } else {
      res = res;
      self.authenticate(res["token"], res, requestInfo.clientOptions, function(err, authData) {
        if (err) {
          wd.core.util.callUserCallback(opt_onComplete, err);
        } else {
          wd.core.util.callUserCallback(opt_onComplete, null, authData);
        }
      });
    }
  });
};
wd.login.AuthenticationManager.prototype.requestWithTransports_ = function(transports, path, requestInfo, opt_onComplete) {
  var availableTransports = goog.array.filter(transports, function(transport) {
    return typeof transport["isAvailable"] === "function" && transport["isAvailable"]();
  });
  if (availableTransports.length === 0) {
    setTimeout(function() {
      wd.core.util.callUserCallback(opt_onComplete, wd.login.Errors.get("TRANSPORT_UNAVAILABLE"));
    }, 0);
    return;
  }
  var transport = availableTransports.shift();
  var transportObj = new transport(requestInfo.transportOptions);
  var request = wd.util.obj.clone(requestInfo.serverParams);
  request["v"] = this.versionString();
  request["transport"] = transportObj.classification();
  request["suppress_status_codes"] = true;
  var url = wd.login.transports.util.getBaseUrl() + "/" + this.repoInfo_.namespace + path;
  transportObj.open(url, request, function onTransportReturned(err, res) {
    if (err) {
      wd.core.util.callUserCallback(opt_onComplete, err);
    } else {
      if (res && res["error"]) {
        var e = new Error(res["error"]["message"]);
        e["code"] = res["error"]["code"];
        e["details"] = res["error"]["details"];
        wd.core.util.callUserCallback(opt_onComplete, e);
      } else {
        wd.core.util.callUserCallback(opt_onComplete, null, res);
      }
    }
  });
};
wd.login.AuthenticationManager.prototype.updateAuthStatus_ = function(authData) {
  var stateChanged = this.authData_ !== null || authData !== null;
  this.authData_ = authData;
  if (stateChanged) {
    this.trigger("auth_status", authData);
  }
  this.onAuthStatus_(authData !== null);
};
wd.login.AuthenticationManager.prototype.getInitialEvent = function(event) {
  wd.core.util.assert(event === "auth_status", 'initial event must be of type "auth_status"');
  if (this.redirectRestart_) {
    return null;
  }
  return [this.authData_];
};
wd.login.AuthenticationManager.prototype.versionString = function() {
  return (NODE_CLIENT ? "node-" : "js-") + CLIENT_VERSION;
};
wd.login.AuthenticationManager.prototype.checkServerSettingsOrThrow = function() {
  if (this.repoInfo_.isCustomHost() && wd.login.Constants.SERVER_HOST === wd.login.Constants.DEFAULT_SERVER_HOST) {
    throw new Error("This custom Wilddog server ('" + this.repoInfo_.domain + "') does not support delegated login.");
  }
};
goog.provide("wd.core.operation.Merge");
goog.require("wd.core.util");
wd.core.operation.Merge = function(source, path, children) {
  this.type = wd.core.OperationType.MERGE;
  this.source = source;
  this.path = path;
  this.children = children;
};
wd.core.operation.Merge.prototype.operationForChild = function(childName) {
  if (this.path.isEmpty()) {
    var childTree = this.children.subtree(new wd.core.util.Path(childName));
    if (childTree.isEmpty()) {
      return null;
    } else {
      if (childTree.value) {
        return new wd.core.operation.Overwrite(this.source, wd.core.util.Path.Empty, childTree.value);
      } else {
        return new wd.core.operation.Merge(this.source, wd.core.util.Path.Empty, childTree);
      }
    }
  } else {
    wd.core.util.assert(this.path.getFront() === childName, "Can't get a merge for a child not on the path of the operation");
    return new wd.core.operation.Merge(this.source, this.path.popFront(), this.children);
  }
};
if (goog.DEBUG) {
  wd.core.operation.Merge.prototype.toString = function() {
    return "Operation(" + this.path + ": " + this.source.toString() + " merge: " + this.children.toString() + ")";
  };
}
;goog.provide("wd.core.operation.AckUserWrite");
wd.core.operation.AckUserWrite = function(path, revert) {
  this.type = wd.core.OperationType.ACK_USER_WRITE;
  this.source = wd.core.OperationSource.User;
  this.path = path;
  this.revert = revert;
};
wd.core.operation.AckUserWrite.prototype.operationForChild = function(childName) {
  if (!this.path.isEmpty()) {
    return new wd.core.operation.AckUserWrite(this.path.popFront(), this.revert);
  } else {
    return this;
  }
};
if (goog.DEBUG) {
  wd.core.operation.AckUserWrite.prototype.toString = function() {
    return "Operation(" + this.path + ": " + this.source.toString() + " ack write revert=" + this.revert + ")";
  };
}
;goog.provide("wd.core.operation.ListenComplete");
wd.core.operation.ListenComplete = function(source, path) {
  this.type = wd.core.OperationType.LISTEN_COMPLETE;
  this.source = source;
  this.path = path;
};
wd.core.operation.ListenComplete.prototype.operationForChild = function(childName) {
  if (this.path.isEmpty()) {
    return new wd.core.operation.ListenComplete(this.source, wd.core.util.Path.Empty);
  } else {
    return new wd.core.operation.ListenComplete(this.source, this.path.popFront());
  }
};
if (goog.DEBUG) {
  wd.core.operation.ListenComplete.prototype.toString = function() {
    return "Operation(" + this.path + ": " + this.source.toString() + " listen_complete)";
  };
}
;goog.provide("wd.core.operation.Overwrite");
wd.core.operation.Overwrite = function(source, path, snap) {
  this.type = wd.core.OperationType.OVERWRITE;
  this.source = source;
  this.path = path;
  this.snap = snap;
};
wd.core.operation.Overwrite.prototype.operationForChild = function(childName) {
  if (this.path.isEmpty()) {
    return new wd.core.operation.Overwrite(this.source, wd.core.util.Path.Empty, this.snap.getImmediateChild(childName));
  } else {
    return new wd.core.operation.Overwrite(this.source, this.path.popFront(), this.snap);
  }
};
if (goog.DEBUG) {
  wd.core.operation.Overwrite.prototype.toString = function() {
    return "Operation(" + this.path + ": " + this.source.toString() + " overwrite: " + this.snap.toString() + ")";
  };
}
;goog.provide("wd.core.Operation");
goog.require("wd.core.operation.AckUserWrite");
goog.require("wd.core.operation.Merge");
goog.require("wd.core.operation.Overwrite");
goog.require("wd.core.operation.ListenComplete");
goog.require("wd.core.util");
wd.core.OperationType = {OVERWRITE:0, MERGE:1, ACK_USER_WRITE:2, LISTEN_COMPLETE:3};
wd.core.Operation = function() {
};
wd.core.Operation.prototype.source;
wd.core.Operation.prototype.type;
wd.core.Operation.prototype.path;
wd.core.Operation.prototype.operationForChild = goog.abstractMethod;
wd.core.OperationSource = function(fromUser, fromServer, queryId, tagged) {
  this.fromUser = fromUser;
  this.fromServer = fromServer;
  this.queryId = queryId;
  this.tagged = tagged;
  wd.core.util.assert(!tagged || fromServer, "Tagged queries must be from server.");
};
wd.core.OperationSource.User = new wd.core.OperationSource(true, false, null, false);
wd.core.OperationSource.Server = new wd.core.OperationSource(false, true, null, false);
wd.core.OperationSource.forServerTaggedQuery = function(queryId) {
  return new wd.core.OperationSource(false, true, queryId, true);
};
if (goog.DEBUG) {
  wd.core.OperationSource.prototype.toString = function() {
    return this.fromUser ? "user" : this.tagged ? "server(queryID=" + this.queryId + ")" : "server";
  };
}
;goog.provide("wd.core.view.CacheNode");
wd.core.view.CacheNode = function(node, fullyInitialized, filtered) {
  this.node_ = node;
  this.fullyInitialized_ = fullyInitialized;
  this.filtered_ = filtered;
};
wd.core.view.CacheNode.prototype.isFullyInitialized = function() {
  return this.fullyInitialized_;
};
wd.core.view.CacheNode.prototype.isFiltered = function() {
  return this.filtered_;
};
wd.core.view.CacheNode.prototype.isCompleteForPath = function(path) {
  if (path.isEmpty()) {
    return this.isFullyInitialized() && !this.filtered_;
  } else {
    var childKey = path.getFront();
    return this.isCompleteForChild(childKey);
  }
};
wd.core.view.CacheNode.prototype.isCompleteForChild = function(key) {
  return this.isFullyInitialized() && !this.filtered_ || this.node_.hasChild(key);
};
wd.core.view.CacheNode.prototype.getNode = function() {
  return this.node_;
};
goog.provide("wd.core.view.ViewCache");
goog.require("wd.core.view.CacheNode");
goog.require("wd.core.snap");
wd.core.view.ViewCache = function(eventCache, serverCache) {
  this.eventCache_ = eventCache;
  this.serverCache_ = serverCache;
};
wd.core.view.ViewCache.Empty = new wd.core.view.ViewCache(new wd.core.view.CacheNode(wd.core.snap.EMPTY_NODE, false, false), new wd.core.view.CacheNode(wd.core.snap.EMPTY_NODE, false, false));
wd.core.view.ViewCache.prototype.updateEventSnap = function(eventSnap, complete, filtered) {
  return new wd.core.view.ViewCache(new wd.core.view.CacheNode(eventSnap, complete, filtered), this.serverCache_);
};
wd.core.view.ViewCache.prototype.updateServerSnap = function(serverSnap, complete, filtered) {
  return new wd.core.view.ViewCache(this.eventCache_, new wd.core.view.CacheNode(serverSnap, complete, filtered));
};
wd.core.view.ViewCache.prototype.getEventCache = function() {
  return this.eventCache_;
};
wd.core.view.ViewCache.prototype.getCompleteEventSnap = function() {
  return this.eventCache_.isFullyInitialized() ? this.eventCache_.getNode() : null;
};
wd.core.view.ViewCache.prototype.getServerCache = function() {
  return this.serverCache_;
};
wd.core.view.ViewCache.prototype.getCompleteServerSnap = function() {
  return this.serverCache_.isFullyInitialized() ? this.serverCache_.getNode() : null;
};
goog.provide("wd.core.view.Event");
wd.core.view.Event = function() {
};
wd.core.view.Event.prototype.getPath;
wd.core.view.Event.prototype.getEventType;
wd.core.view.Event.prototype.getEventRunner;
wd.core.view.Event.prototype.toString;
wd.core.view.DataEvent = function(eventType, eventRegistration, snapshot, prevName) {
  this.eventRegistration = eventRegistration;
  this.snapshot = snapshot;
  this.prevName = prevName;
  this.eventType = eventType;
};
wd.core.view.DataEvent.prototype.getPath = function() {
  var ref = this.snapshot.ref();
  if (this.eventType === "value") {
    return ref.path;
  } else {
    return ref.parent().path;
  }
};
wd.core.view.DataEvent.prototype.getEventType = function() {
  return this.eventType;
};
wd.core.view.DataEvent.prototype.getEventRunner = function() {
  return this.eventRegistration.getEventRunner(this);
};
wd.core.view.DataEvent.prototype.toString = function() {
  return this.getPath().toString() + ":" + this.eventType + ":" + wd.util.json.stringify(this.snapshot.exportVal());
};
wd.core.view.CancelEvent = function(eventRegistration, error, path) {
  this.eventRegistration = eventRegistration;
  this.error = error;
  this.path = path;
};
wd.core.view.CancelEvent.prototype.getPath = function() {
  return this.path;
};
wd.core.view.CancelEvent.prototype.getEventType = function() {
  return "cancel";
};
wd.core.view.CancelEvent.prototype.getEventRunner = function() {
  return this.eventRegistration.getEventRunner(this);
};
wd.core.view.CancelEvent.prototype.toString = function() {
  return this.path.toString() + ":cancel";
};
goog.provide("wd.core.view.Change");
wd.core.view.Change = function(type, snapshotNode, childName, oldSnap, prevName) {
  this.type = type;
  this.snapshotNode = snapshotNode;
  this.childName = childName;
  this.oldSnap = oldSnap;
  this.prevName = prevName;
};
wd.core.view.Change.valueChange = function(snapshot) {
  return new wd.core.view.Change(wd.core.view.Change.VALUE, snapshot);
};
wd.core.view.Change.childAddedChange = function(childKey, snapshot) {
  return new wd.core.view.Change(wd.core.view.Change.CHILD_ADDED, snapshot, childKey);
};
wd.core.view.Change.childRemovedChange = function(childKey, snapshot) {
  return new wd.core.view.Change(wd.core.view.Change.CHILD_REMOVED, snapshot, childKey);
};
wd.core.view.Change.childChangedChange = function(childKey, newSnapshot, oldSnapshot) {
  return new wd.core.view.Change(wd.core.view.Change.CHILD_CHANGED, newSnapshot, childKey, oldSnapshot);
};
wd.core.view.Change.childMovedChange = function(childKey, snapshot) {
  return new wd.core.view.Change(wd.core.view.Change.CHILD_MOVED, snapshot, childKey);
};
wd.core.view.Change.prototype.changeWithPrevName = function(prevName) {
  return new wd.core.view.Change(this.type, this.snapshotNode, this.childName, this.oldSnap, prevName);
};
wd.core.view.Change.CHILD_ADDED = "child_added";
wd.core.view.Change.CHILD_REMOVED = "child_removed";
wd.core.view.Change.CHILD_CHANGED = "child_changed";
wd.core.view.Change.CHILD_MOVED = "child_moved";
wd.core.view.Change.VALUE = "value";
goog.provide("wd.core.view.EventRegistration");
goog.require("wd.core.view.Change");
goog.require("wd.core.view.Event");
goog.require("wd.core.util");
wd.core.view.EventRegistration = function() {
};
wd.core.view.EventRegistration.prototype.respondsTo;
wd.core.view.EventRegistration.prototype.createEvent;
wd.core.view.EventRegistration.prototype.getEventRunner;
wd.core.view.EventRegistration.prototype.createCancelEvent;
wd.core.view.EventRegistration.prototype.matches;
wd.core.view.EventRegistration.prototype.hasAnyCallback;
wd.core.view.ValueEventRegistration = function(callback, cancelCallback, context) {
  this.callback_ = callback;
  this.cancelCallback_ = cancelCallback;
  this.context_ = context || null;
};
wd.core.view.ValueEventRegistration.prototype.respondsTo = function(eventType) {
  return eventType === "value";
};
wd.core.view.ValueEventRegistration.prototype.createEvent = function(change, query) {
  var index = query.getQueryParams().getIndex();
  return new wd.core.view.DataEvent("value", this, new wd.api.DataSnapshot(change.snapshotNode, query.ref(), index));
};
wd.core.view.ValueEventRegistration.prototype.getEventRunner = function(eventData) {
  var ctx = this.context_;
  if (eventData.getEventType() === "cancel") {
    wd.core.util.assert(this.cancelCallback_, "Raising a cancel event on a listener with no cancel callback");
    var cancelCB = this.cancelCallback_;
    return function() {
      cancelCB.call(ctx, eventData.error);
    };
  } else {
    var cb = this.callback_;
    return function() {
      cb.call(ctx, eventData.snapshot);
    };
  }
};
wd.core.view.ValueEventRegistration.prototype.createCancelEvent = function(error, path) {
  if (this.cancelCallback_) {
    return new wd.core.view.CancelEvent(this, error, path);
  } else {
    return null;
  }
};
wd.core.view.ValueEventRegistration.prototype.matches = function(other) {
  if (!(other instanceof wd.core.view.ValueEventRegistration)) {
    return false;
  } else {
    if (!other.callback_ || !this.callback_) {
      return true;
    } else {
      return other.callback_ === this.callback_ && other.context_ === this.context_;
    }
  }
};
wd.core.view.ValueEventRegistration.prototype.hasAnyCallback = function() {
  return this.callback_ !== null;
};
wd.core.view.ChildEventRegistration = function(callbacks, cancelCallback, context) {
  this.callbacks_ = callbacks;
  this.cancelCallback_ = cancelCallback;
  this.context_ = context;
};
wd.core.view.ChildEventRegistration.prototype.respondsTo = function(eventType) {
  var eventToCheck = eventType === "children_added" ? "child_added" : eventType;
  eventToCheck = eventToCheck === "children_removed" ? "child_removed" : eventToCheck;
  return goog.object.containsKey(this.callbacks_, eventToCheck);
};
wd.core.view.ChildEventRegistration.prototype.createCancelEvent = function(error, path) {
  if (this.cancelCallback_) {
    return new wd.core.view.CancelEvent(this, error, path);
  } else {
    return null;
  }
};
wd.core.view.ChildEventRegistration.prototype.createEvent = function(change, query) {
  wd.core.util.assert(change.childName != null, "Child events should have a childName.");
  var ref = query.ref().child(change.childName);
  var index = query.getQueryParams().getIndex();
  return new wd.core.view.DataEvent(change.type, this, new wd.api.DataSnapshot(change.snapshotNode, ref, index), change.prevName);
};
wd.core.view.ChildEventRegistration.prototype.getEventRunner = function(eventData) {
  var ctx = this.context_;
  if (eventData.getEventType() === "cancel") {
    wd.core.util.assert(this.cancelCallback_, "Raising a cancel event on a listener with no cancel callback");
    var cancelCB = this.cancelCallback_;
    return function() {
      cancelCB.call(ctx, eventData.error);
    };
  } else {
    var cb = this.callbacks_[eventData.eventType];
    return function() {
      cb.call(ctx, eventData.snapshot, eventData.prevName);
    };
  }
};
wd.core.view.ChildEventRegistration.prototype.matches = function(other) {
  if (other instanceof wd.core.view.ChildEventRegistration) {
    if (!this.callbacks_ || !other.callbacks_) {
      return true;
    } else {
      if (this.context_ === other.context_) {
        var otherCount = goog.object.getCount(other.callbacks_);
        var thisCount = goog.object.getCount(this.callbacks_);
        if (otherCount === thisCount) {
          if (otherCount === 1) {
            var otherKey = goog.object.getAnyKey(other.callbacks_);
            var thisKey = goog.object.getAnyKey(this.callbacks_);
            return thisKey === otherKey && (!other.callbacks_[otherKey] || !this.callbacks_[thisKey] || other.callbacks_[otherKey] === this.callbacks_[thisKey]);
          } else {
            return goog.object.every(this.callbacks_, function(cb, eventType) {
              return other.callbacks_[eventType] === cb;
            });
          }
        }
      }
    }
  }
  return false;
};
wd.core.view.ChildEventRegistration.prototype.hasAnyCallback = function() {
  return this.callbacks_ !== null;
};
goog.provide("wd.core.view.EventGenerator");
goog.require("wd.core.snap.NamedNode");
goog.require("wd.core.util");
wd.core.view.EventGenerator = function(query) {
  this.query_ = query;
  this.index_ = query.getQueryParams().getIndex();
};
wd.core.view.EventGenerator.prototype.generateEventsForChanges = function(changes, eventCache, eventRegistrations) {
  var events = [], self = this;
  var moves = [];
  goog.array.forEach(changes, function(change) {
    if (change.type === wd.core.view.Change.CHILD_CHANGED && self.index_.indexedValueChanged(change.oldSnap, change.snapshotNode)) {
      moves.push(wd.core.view.Change.childMovedChange(change.childName, change.snapshotNode));
    }
  });
  this.generateEventsForType_(events, wd.core.view.Change.CHILD_REMOVED, changes, eventRegistrations, eventCache);
  this.generateEventsForType_(events, wd.core.view.Change.CHILD_ADDED, changes, eventRegistrations, eventCache);
  this.generateEventsForType_(events, wd.core.view.Change.CHILD_MOVED, moves, eventRegistrations, eventCache);
  this.generateEventsForType_(events, wd.core.view.Change.CHILD_CHANGED, changes, eventRegistrations, eventCache);
  this.generateEventsForType_(events, wd.core.view.Change.VALUE, changes, eventRegistrations, eventCache);
  return events;
};
wd.core.view.EventGenerator.prototype.generateEventsForType_ = function(events, eventType, changes, registrations, eventCache) {
  var filteredChanges = goog.array.filter(changes, function(change) {
    return change.type === eventType;
  });
  var self = this;
  goog.array.sort(filteredChanges, goog.bind(this.compareChanges_, this));
  goog.array.forEach(filteredChanges, function(change) {
    var materializedChange = self.materializeSingleChange_(change, eventCache);
    goog.array.forEach(registrations, function(registration) {
      if (registration.respondsTo(change.type)) {
        events.push(registration.createEvent(materializedChange, self.query_));
      }
    });
  });
};
wd.core.view.EventGenerator.prototype.materializeSingleChange_ = function(change, eventCache) {
  if (change.type === "value" || change.type === "child_removed") {
    return change;
  } else {
    change.prevName = eventCache.getPredecessorChildName(change.childName, change.snapshotNode, this.index_);
    return change;
  }
};
wd.core.view.EventGenerator.prototype.compareChanges_ = function(a, b) {
  if (a.childName == null || b.childName == null) {
    throw wd.core.util.assertionError("Should only compare child_ events.");
  }
  var aWrapped = new wd.core.snap.NamedNode(a.childName, a.snapshotNode);
  var bWrapped = new wd.core.snap.NamedNode(b.childName, b.snapshotNode);
  return this.index_.compare(aWrapped, bWrapped);
};
goog.provide("wd.core.view.CompleteChildSource");
wd.core.view.CompleteChildSource = function() {
};
wd.core.view.CompleteChildSource.prototype.getCompleteChild = function(childKey) {
};
wd.core.view.CompleteChildSource.prototype.getChildAfterChild = function(index, child, reverse) {
};
wd.core.view.NoCompleteChildSource_ = function() {
};
wd.core.view.NoCompleteChildSource_.prototype.getCompleteChild = function() {
  return null;
};
wd.core.view.NoCompleteChildSource_.prototype.getChildAfterChild = function() {
  return null;
};
wd.core.view.NO_COMPLETE_CHILD_SOURCE = new wd.core.view.NoCompleteChildSource_;
wd.core.view.WriteTreeCompleteChildSource = function(writes, viewCache, optCompleteServerCache) {
  this.writes_ = writes;
  this.viewCache_ = viewCache;
  this.optCompleteServerCache_ = optCompleteServerCache;
};
wd.core.view.WriteTreeCompleteChildSource.prototype.getCompleteChild = function(childKey) {
  var node = this.viewCache_.getEventCache();
  if (node.isCompleteForChild(childKey)) {
    return node.getNode().getImmediateChild(childKey);
  } else {
    var serverNode = this.optCompleteServerCache_ != null ? new wd.core.view.CacheNode(this.optCompleteServerCache_, true, false) : this.viewCache_.getServerCache();
    return this.writes_.calcCompleteChild(childKey, serverNode);
  }
};
wd.core.view.WriteTreeCompleteChildSource.prototype.getChildAfterChild = function(index, child, reverse) {
  var completeServerData = this.optCompleteServerCache_ != null ? this.optCompleteServerCache_ : this.viewCache_.getCompleteServerSnap();
  var nodes = this.writes_.calcIndexedSlice(completeServerData, child, 1, reverse, index);
  if (nodes.length === 0) {
    return null;
  } else {
    return nodes[0];
  }
};
goog.provide("wd.core.view.ViewProcessor");
goog.require("wd.core.view.CompleteChildSource");
goog.require("wd.core.util");
wd.core.view.ProcessorResult = function(viewCache, changes) {
  this.viewCache = viewCache;
  this.changes = changes;
};
wd.core.view.ViewProcessor = function(filter) {
  this.filter_ = filter;
};
wd.core.view.ViewProcessor.prototype.assertIndexed = function(viewCache) {
  wd.core.util.assert(viewCache.getEventCache().getNode().isIndexed(this.filter_.getIndex()), "Event snap not indexed");
  wd.core.util.assert(viewCache.getServerCache().getNode().isIndexed(this.filter_.getIndex()), "Server snap not indexed");
};
wd.core.view.ViewProcessor.prototype.applyOperation = function(oldViewCache, operation, writesCache, optCompleteCache) {
  var accumulator = new wd.core.view.ChildChangeAccumulator;
  var newViewCache, constrainNode;
  if (operation.type === wd.core.OperationType.OVERWRITE) {
    var overwrite = operation;
    if (overwrite.source.fromUser) {
      newViewCache = this.applyUserOverwrite_(oldViewCache, overwrite.path, overwrite.snap, writesCache, optCompleteCache, accumulator);
    } else {
      wd.core.util.assert(overwrite.source.fromServer, "Unknown source.");
      constrainNode = overwrite.source.tagged;
      newViewCache = this.applyServerOverwrite_(oldViewCache, overwrite.path, overwrite.snap, writesCache, optCompleteCache, constrainNode, accumulator);
    }
  } else {
    if (operation.type === wd.core.OperationType.MERGE) {
      var merge = operation;
      if (merge.source.fromUser) {
        newViewCache = this.applyUserMerge_(oldViewCache, merge.path, merge.children, writesCache, optCompleteCache, accumulator);
      } else {
        wd.core.util.assert(merge.source.fromServer, "Unknown source.");
        constrainNode = merge.source.tagged;
        newViewCache = this.applyServerMerge_(oldViewCache, merge.path, merge.children, writesCache, optCompleteCache, constrainNode, accumulator);
      }
    } else {
      if (operation.type === wd.core.OperationType.ACK_USER_WRITE) {
        var ackUserWrite = operation;
        if (!ackUserWrite.revert) {
          newViewCache = this.ackUserWrite_(oldViewCache, ackUserWrite.path, writesCache, optCompleteCache, accumulator);
        } else {
          newViewCache = this.revertUserWrite_(oldViewCache, ackUserWrite.path, writesCache, optCompleteCache, accumulator);
        }
      } else {
        if (operation.type === wd.core.OperationType.LISTEN_COMPLETE) {
          newViewCache = this.listenComplete_(oldViewCache, operation.path, writesCache, optCompleteCache, accumulator);
        } else {
          throw wd.core.util.assertionError("Unknown operation type: " + operation.type);
        }
      }
    }
  }
  var changes = accumulator.getChanges();
  this.maybeAddValueEvent_(oldViewCache, newViewCache, changes);
  return new wd.core.view.ProcessorResult(newViewCache, changes);
};
wd.core.view.ViewProcessor.prototype.maybeAddValueEvent_ = function(oldViewCache, newViewCache, accumulator) {
  var eventSnap = newViewCache.getEventCache();
  if (eventSnap.isFullyInitialized()) {
    var isLeafOrEmpty = eventSnap.getNode().isLeafNode() || eventSnap.getNode().isEmpty();
    var oldCompleteSnap = oldViewCache.getCompleteEventSnap();
    if (accumulator.length > 0 || !oldViewCache.getEventCache().isFullyInitialized() || isLeafOrEmpty && !eventSnap.getNode().equals(oldCompleteSnap) || !eventSnap.getNode().getPriority().equals(oldCompleteSnap.getPriority())) {
      accumulator.push(wd.core.view.Change.valueChange(newViewCache.getCompleteEventSnap()));
    }
  }
};
wd.core.view.ViewProcessor.prototype.generateEventCacheAfterServerEvent_ = function(viewCache, changePath, writesCache, source, accumulator) {
  var oldEventSnap = viewCache.getEventCache();
  if (writesCache.shadowingWrite(changePath) != null) {
    return viewCache;
  } else {
    var newEventCache, serverNode;
    if (changePath.isEmpty()) {
      wd.core.util.assert(viewCache.getServerCache().isFullyInitialized(), "If change path is empty, we must have complete server data");
      if (viewCache.getServerCache().isFiltered()) {
        var serverCache = viewCache.getCompleteServerSnap();
        var completeChildren = serverCache instanceof wd.core.snap.ChildrenNode ? serverCache : wd.core.snap.EMPTY_NODE;
        var completeEventChildren = writesCache.calcCompleteEventChildren(completeChildren);
        newEventCache = this.filter_.updateFullNode(viewCache.getEventCache().getNode(), completeEventChildren, accumulator);
      } else {
        var completeNode = writesCache.calcCompleteEventCache(viewCache.getCompleteServerSnap());
        newEventCache = this.filter_.updateFullNode(viewCache.getEventCache().getNode(), completeNode, accumulator);
      }
    } else {
      var childKey = changePath.getFront();
      if (childKey == ".priority") {
        wd.core.util.assert(changePath.getLength() == 1, "Can't have a priority with additional path components");
        var oldEventNode = oldEventSnap.getNode();
        serverNode = viewCache.getServerCache().getNode();
        var updatedPriority = writesCache.calcEventCacheAfterServerOverwrite(changePath, oldEventNode, serverNode);
        if (updatedPriority != null) {
          newEventCache = this.filter_.updatePriority(oldEventNode, updatedPriority);
        } else {
          newEventCache = oldEventSnap.getNode();
        }
      } else {
        var childChangePath = changePath.popFront();
        var newEventChild;
        if (oldEventSnap.isCompleteForChild(childKey)) {
          serverNode = viewCache.getServerCache().getNode();
          var eventChildUpdate = writesCache.calcEventCacheAfterServerOverwrite(changePath, oldEventSnap.getNode(), serverNode);
          if (eventChildUpdate != null) {
            newEventChild = oldEventSnap.getNode().getImmediateChild(childKey).updateChild(childChangePath, eventChildUpdate);
          } else {
            newEventChild = oldEventSnap.getNode().getImmediateChild(childKey);
          }
        } else {
          newEventChild = writesCache.calcCompleteChild(childKey, viewCache.getServerCache());
        }
        if (newEventChild != null) {
          newEventCache = this.filter_.updateChild(oldEventSnap.getNode(), childKey, newEventChild, source, accumulator);
        } else {
          newEventCache = oldEventSnap.getNode();
        }
      }
    }
    return viewCache.updateEventSnap(newEventCache, oldEventSnap.isFullyInitialized() || changePath.isEmpty(), this.filter_.filtersNodes());
  }
};
wd.core.view.ViewProcessor.prototype.applyServerOverwrite_ = function(oldViewCache, changePath, changedSnap, writesCache, optCompleteCache, constrainServerNode, accumulator) {
  var oldServerSnap = oldViewCache.getServerCache();
  var newServerCache;
  var serverFilter = constrainServerNode ? this.filter_ : this.filter_.getIndexedFilter();
  if (changePath.isEmpty()) {
    newServerCache = serverFilter.updateFullNode(oldServerSnap.getNode(), changedSnap, null);
  } else {
    if (serverFilter.filtersNodes() && !oldServerSnap.isFiltered()) {
      var newServerNode = oldServerSnap.getNode().updateChild(changePath, changedSnap);
      newServerCache = serverFilter.updateFullNode(oldServerSnap.getNode(), newServerNode, null);
    } else {
      var childKey = changePath.getFront();
      if (!oldServerSnap.isCompleteForPath(changePath) && changePath.getLength() > 1) {
        return oldViewCache;
      }
      var childNode = oldServerSnap.getNode().getImmediateChild(childKey);
      var newChildNode = childNode.updateChild(changePath.popFront(), changedSnap);
      if (childKey == ".priority") {
        newServerCache = serverFilter.updatePriority(oldServerSnap.getNode(), newChildNode);
      } else {
        newServerCache = serverFilter.updateChild(oldServerSnap.getNode(), childKey, newChildNode, wd.core.view.NO_COMPLETE_CHILD_SOURCE, null);
      }
    }
  }
  var newViewCache = oldViewCache.updateServerSnap(newServerCache, oldServerSnap.isFullyInitialized() || changePath.isEmpty(), serverFilter.filtersNodes());
  var source = new wd.core.view.WriteTreeCompleteChildSource(writesCache, newViewCache, optCompleteCache);
  return this.generateEventCacheAfterServerEvent_(newViewCache, changePath, writesCache, source, accumulator);
};
wd.core.view.ViewProcessor.prototype.applyUserOverwrite_ = function(oldViewCache, changePath, changedSnap, writesCache, optCompleteCache, accumulator) {
  var oldEventSnap = oldViewCache.getEventCache();
  var newViewCache, newEventCache;
  var source = new wd.core.view.WriteTreeCompleteChildSource(writesCache, oldViewCache, optCompleteCache);
  if (changePath.isEmpty()) {
    newEventCache = this.filter_.updateFullNode(oldViewCache.getEventCache().getNode(), changedSnap, accumulator);
    newViewCache = oldViewCache.updateEventSnap(newEventCache, true, this.filter_.filtersNodes());
  } else {
    var childKey = changePath.getFront();
    if (childKey === ".priority") {
      newEventCache = this.filter_.updatePriority(oldViewCache.getEventCache().getNode(), changedSnap);
      newViewCache = oldViewCache.updateEventSnap(newEventCache, oldEventSnap.isFullyInitialized(), oldEventSnap.isFiltered());
    } else {
      var childChangePath = changePath.popFront();
      var oldChild = oldEventSnap.getNode().getImmediateChild(childKey);
      var newChild;
      if (childChangePath.isEmpty()) {
        newChild = changedSnap;
      } else {
        var childNode = source.getCompleteChild(childKey);
        if (childNode != null) {
          if (childChangePath.getBack() === ".priority" && childNode.getChild(childChangePath.parent()).isEmpty()) {
            newChild = childNode;
          } else {
            newChild = childNode.updateChild(childChangePath, changedSnap);
          }
        } else {
          newChild = wd.core.snap.EMPTY_NODE;
        }
      }
      if (!oldChild.equals(newChild)) {
        var newEventSnap = this.filter_.updateChild(oldEventSnap.getNode(), childKey, newChild, source, accumulator);
        newViewCache = oldViewCache.updateEventSnap(newEventSnap, oldEventSnap.isFullyInitialized(), this.filter_.filtersNodes());
      } else {
        newViewCache = oldViewCache;
      }
    }
  }
  return newViewCache;
};
wd.core.view.ViewProcessor.cacheHasChild_ = function(viewCache, childKey) {
  return viewCache.getEventCache().isCompleteForChild(childKey);
};
wd.core.view.ViewProcessor.prototype.applyUserMerge_ = function(viewCache, path, changedChildren, writesCache, serverCache, accumulator) {
  var self = this;
  var curViewCache = viewCache;
  changedChildren.foreach(function(relativePath, childNode) {
    var writePath = path.child(relativePath);
    if (wd.core.view.ViewProcessor.cacheHasChild_(viewCache, writePath.getFront())) {
      curViewCache = self.applyUserOverwrite_(curViewCache, writePath, childNode, writesCache, serverCache, accumulator);
    }
  });
  changedChildren.foreach(function(relativePath, childNode) {
    var writePath = path.child(relativePath);
    if (!wd.core.view.ViewProcessor.cacheHasChild_(viewCache, writePath.getFront())) {
      curViewCache = self.applyUserOverwrite_(curViewCache, writePath, childNode, writesCache, serverCache, accumulator);
    }
  });
  return curViewCache;
};
wd.core.view.ViewProcessor.prototype.applyMerge_ = function(node, merge) {
  merge.foreach(function(relativePath, childNode) {
    node = node.updateChild(relativePath, childNode);
  });
  return node;
};
wd.core.view.ViewProcessor.prototype.applyServerMerge_ = function(viewCache, path, changedChildren, writesCache, serverCache, constrainServerNode, accumulator) {
  if (viewCache.getServerCache().getNode().isEmpty() && !viewCache.getServerCache().isFullyInitialized()) {
    return viewCache;
  }
  var curViewCache = viewCache;
  var viewMergeTree;
  if (path.isEmpty()) {
    viewMergeTree = changedChildren;
  } else {
    viewMergeTree = wd.core.util.ImmutableTree.Empty.setTree(path, changedChildren);
  }
  var serverNode = viewCache.getServerCache().getNode();
  var self = this;
  viewMergeTree.children.inorderTraversal(function(childKey, childTree) {
    if (serverNode.hasChild(childKey)) {
      var serverChild = viewCache.getServerCache().getNode().getImmediateChild(childKey);
      var newChild = self.applyMerge_(serverChild, childTree);
      curViewCache = self.applyServerOverwrite_(curViewCache, new wd.core.util.Path(childKey), newChild, writesCache, serverCache, constrainServerNode, accumulator);
    }
  });
  viewMergeTree.children.inorderTraversal(function(childKey, childMergeTree) {
    var isUnknownDeepMerge = !viewCache.getServerCache().isFullyInitialized() && childMergeTree.value == null;
    if (!serverNode.hasChild(childKey) && !isUnknownDeepMerge) {
      var serverChild = viewCache.getServerCache().getNode().getImmediateChild(childKey);
      var newChild = self.applyMerge_(serverChild, childMergeTree);
      curViewCache = self.applyServerOverwrite_(curViewCache, new wd.core.util.Path(childKey), newChild, writesCache, serverCache, constrainServerNode, accumulator);
    }
  });
  return curViewCache;
};
wd.core.view.ViewProcessor.prototype.ackUserWrite_ = function(viewCache, ackPath, writesCache, optCompleteCache, accumulator) {
  if (writesCache.shadowingWrite(ackPath) != null) {
    return viewCache;
  } else {
    var source = new wd.core.view.WriteTreeCompleteChildSource(writesCache, viewCache, optCompleteCache);
    var oldEventCache = viewCache.getEventCache().getNode();
    var newEventCache = oldEventCache;
    var eventCacheComplete;
    if (viewCache.getServerCache().isFullyInitialized()) {
      if (ackPath.isEmpty()) {
        var update = writesCache.calcCompleteEventCache(viewCache.getCompleteServerSnap());
        newEventCache = this.filter_.updateFullNode(viewCache.getEventCache().getNode(), update, accumulator);
      } else {
        if (ackPath.getFront() === ".priority") {
          var updatedPriority = writesCache.calcCompleteChild(ackPath.getFront(), viewCache.getServerCache());
          if (updatedPriority != null && !oldEventCache.isEmpty() && !oldEventCache.getPriority().equals(updatedPriority)) {
            newEventCache = this.filter_.updatePriority(oldEventCache, updatedPriority);
          }
        } else {
          var childKey = ackPath.getFront();
          var updatedChild = writesCache.calcCompleteChild(childKey, viewCache.getServerCache());
          if (updatedChild != null) {
            newEventCache = this.filter_.updateChild(viewCache.getEventCache().getNode(), childKey, updatedChild, source, accumulator);
          }
        }
      }
      eventCacheComplete = true;
    } else {
      if (viewCache.getEventCache().isFullyInitialized() || ackPath.isEmpty()) {
        newEventCache = oldEventCache;
        var completeEventSnap = viewCache.getEventCache().getNode();
        if (!completeEventSnap.isLeafNode()) {
          var self = this;
          completeEventSnap = completeEventSnap;
          completeEventSnap.forEachChild(wd.core.snap.PriorityIndex, function(key, childNode) {
            var completeChild = writesCache.calcCompleteChild(key, viewCache.getServerCache());
            if (completeChild != null) {
              newEventCache = self.filter_.updateChild(newEventCache, key, completeChild, source, accumulator);
            }
          });
        }
        eventCacheComplete = viewCache.getEventCache().isFullyInitialized();
      } else {
        var childKey = ackPath.getFront();
        if (ackPath.getLength() == 1 || viewCache.getEventCache().isCompleteForChild(childKey)) {
          var completeChild = writesCache.calcCompleteChild(childKey, viewCache.getServerCache());
          if (completeChild != null) {
            newEventCache = this.filter_.updateChild(oldEventCache, childKey, completeChild, source, accumulator);
          }
        }
        eventCacheComplete = false;
      }
    }
    return viewCache.updateEventSnap(newEventCache, eventCacheComplete, this.filter_.filtersNodes());
  }
};
wd.core.view.ViewProcessor.prototype.revertUserWrite_ = function(viewCache, path, writesCache, optCompleteServerCache, accumulator) {
  var complete;
  if (writesCache.shadowingWrite(path) != null) {
    return viewCache;
  } else {
    var source = new wd.core.view.WriteTreeCompleteChildSource(writesCache, viewCache, optCompleteServerCache);
    var oldEventCache = viewCache.getEventCache().getNode();
    var newEventCache;
    if (path.isEmpty() || path.getFront() === ".priority") {
      var newNode;
      if (viewCache.getServerCache().isFullyInitialized()) {
        newNode = writesCache.calcCompleteEventCache(viewCache.getCompleteServerSnap());
      } else {
        var serverChildren = viewCache.getServerCache().getNode();
        wd.core.util.assert(serverChildren instanceof wd.core.snap.ChildrenNode, "serverChildren would be complete if leaf node");
        newNode = writesCache.calcCompleteEventChildren(serverChildren);
      }
      newNode = newNode;
      newEventCache = this.filter_.updateFullNode(oldEventCache, newNode, accumulator);
    } else {
      var childKey = path.getFront();
      var newChild = writesCache.calcCompleteChild(childKey, viewCache.getServerCache());
      if (newChild == null && viewCache.getServerCache().isCompleteForChild(childKey)) {
        newChild = oldEventCache.getImmediateChild(childKey);
      }
      if (newChild != null) {
        newEventCache = this.filter_.updateChild(oldEventCache, childKey, newChild, source, accumulator);
      } else {
        if (viewCache.getEventCache().getNode().hasChild(childKey)) {
          newEventCache = this.filter_.updateChild(oldEventCache, childKey, wd.core.snap.EMPTY_NODE, source, accumulator);
        } else {
          newEventCache = oldEventCache;
        }
      }
      if (newEventCache.isEmpty() && viewCache.getServerCache().isFullyInitialized()) {
        complete = writesCache.calcCompleteEventCache(viewCache.getCompleteServerSnap());
        if (complete.isLeafNode()) {
          newEventCache = this.filter_.updateFullNode(newEventCache, complete, accumulator);
        }
      }
    }
    complete = viewCache.getServerCache().isFullyInitialized() || writesCache.shadowingWrite(wd.core.util.Path.Empty) != null;
    return viewCache.updateEventSnap(newEventCache, complete, this.filter_.filtersNodes());
  }
};
wd.core.view.ViewProcessor.prototype.listenComplete_ = function(viewCache, path, writesCache, serverCache, accumulator) {
  var oldServerNode = viewCache.getServerCache();
  var newViewCache = viewCache.updateServerSnap(oldServerNode.getNode(), oldServerNode.isFullyInitialized() || path.isEmpty(), oldServerNode.isFiltered());
  return this.generateEventCacheAfterServerEvent_(newViewCache, path, writesCache, wd.core.view.NO_COMPLETE_CHILD_SOURCE, accumulator);
};
goog.provide("wd.core.view.View");
goog.require("wd.core.view.EventGenerator");
goog.require("wd.core.view.ViewCache");
goog.require("wd.core.view.ViewProcessor");
goog.require("wd.core.util");
wd.core.view.View = function(query, initialViewCache) {
  this.query_ = query;
  var params = query.getQueryParams();
  var indexFilter = new wd.core.view.filter.IndexedFilter(params.getIndex());
  var filter = params.getNodeFilter();
  this.processor_ = new wd.core.view.ViewProcessor(filter);
  var initialServerCache = initialViewCache.getServerCache();
  var initialEventCache = initialViewCache.getEventCache();
  var serverSnap = indexFilter.updateFullNode(wd.core.snap.EMPTY_NODE, initialServerCache.getNode(), null);
  var eventSnap = filter.updateFullNode(wd.core.snap.EMPTY_NODE, initialEventCache.getNode(), null);
  var newServerCache = new wd.core.view.CacheNode(serverSnap, initialServerCache.isFullyInitialized(), indexFilter.filtersNodes());
  var newEventCache = new wd.core.view.CacheNode(eventSnap, initialEventCache.isFullyInitialized(), filter.filtersNodes());
  this.viewCache_ = new wd.core.view.ViewCache(newEventCache, newServerCache);
  this.eventRegistrations_ = [];
  this.eventGenerator_ = new wd.core.view.EventGenerator(query);
};
wd.core.view.View.prototype.getQuery = function() {
  return this.query_;
};
wd.core.view.View.prototype.getServerCache = function() {
  return this.viewCache_.getServerCache().getNode();
};
wd.core.view.View.prototype.getCompleteServerCache = function(path) {
  var cache = this.viewCache_.getCompleteServerSnap();
  if (cache) {
    if (this.query_.getQueryParams().loadsAllData() || !path.isEmpty() && !cache.getImmediateChild(path.getFront()).isEmpty()) {
      return cache.getChild(path);
    }
  }
  return null;
};
wd.core.view.View.prototype.isEmpty = function() {
  return this.eventRegistrations_.length === 0;
};
wd.core.view.View.prototype.addEventRegistration = function(eventRegistration) {
  this.eventRegistrations_.push(eventRegistration);
};
wd.core.view.View.prototype.removeEventRegistration = function(eventRegistration, cancelError) {
  var cancelEvents = [];
  if (cancelError) {
    wd.core.util.assert(eventRegistration == null, "A cancel should cancel all event registrations.");
    var path = this.query_.path;
    goog.array.forEach(this.eventRegistrations_, function(registration) {
      cancelError = cancelError;
      var maybeEvent = registration.createCancelEvent(cancelError, path);
      if (maybeEvent) {
        cancelEvents.push(maybeEvent);
      }
    });
  }
  if (eventRegistration) {
    var remaining = [];
    for (var i = 0;i < this.eventRegistrations_.length;++i) {
      var existing = this.eventRegistrations_[i];
      if (!existing.matches(eventRegistration)) {
        remaining.push(existing);
      } else {
        if (eventRegistration.hasAnyCallback()) {
          remaining = remaining.concat(this.eventRegistrations_.slice(i + 1));
          break;
        }
      }
    }
    this.eventRegistrations_ = remaining;
  } else {
    this.eventRegistrations_ = [];
  }
  return cancelEvents;
};
wd.core.view.View.prototype.applyOperation = function(operation, writesCache, optCompleteServerCache) {
  if (operation.type === wd.core.OperationType.MERGE && operation.source.queryId !== null) {
    wd.core.util.assert(this.viewCache_.getCompleteServerSnap(), "We should always have a full cache before handling merges");
    wd.core.util.assert(this.viewCache_.getCompleteEventSnap(), "Missing event cache, even though we have a server cache");
  }
  var oldViewCache = this.viewCache_;
  var result = this.processor_.applyOperation(oldViewCache, operation, writesCache, optCompleteServerCache);
  this.processor_.assertIndexed(result.viewCache);
  wd.core.util.assert(result.viewCache.getServerCache().isFullyInitialized() || !oldViewCache.getServerCache().isFullyInitialized(), "Once a server snap is complete, it should never go back");
  this.viewCache_ = result.viewCache;
  return this.generateEventsForChanges_(result.changes, result.viewCache.getEventCache().getNode(), null);
};
wd.core.view.View.prototype.getInitialEvents = function(registration) {
  var eventSnap = this.viewCache_.getEventCache();
  var initialChanges = [];
  if (!eventSnap.getNode().isLeafNode()) {
    var eventNode = eventSnap.getNode();
    eventNode.forEachChild(wd.core.snap.PriorityIndex, function(key, childNode) {
      initialChanges.push(wd.core.view.Change.childAddedChange(key, childNode));
    });
  }
  if (eventSnap.isFullyInitialized()) {
    initialChanges.push(wd.core.view.Change.valueChange(eventSnap.getNode()));
  }
  return this.generateEventsForChanges_(initialChanges, eventSnap.getNode(), registration);
};
wd.core.view.View.prototype.generateEventsForChanges_ = function(changes, eventCache, opt_eventRegistration) {
  var registrations = opt_eventRegistration ? [opt_eventRegistration] : this.eventRegistrations_;
  return this.eventGenerator_.generateEventsForChanges(changes, eventCache, registrations);
};
goog.provide("wd.core.util.ImmutableTree");
goog.require("wd.core.util");
goog.require("wd.core.util.Path");
goog.require("wd.core.util.SortedMap");
goog.require("wd.util.json");
goog.require("wd.util.obj");
goog.require("goog.object");
wd.core.util.ImmutableTree = goog.defineClass(null, {constructor:function(value, opt_children) {
  this.value = value;
  this.children = opt_children || wd.core.util.ImmutableTree.EmptyChildren_;
}, statics:{EmptyChildren_:new wd.core.util.SortedMap(wd.core.util.stringCompare), fromObject:function(obj) {
  var tree = wd.core.util.ImmutableTree.Empty;
  goog.object.forEach(obj, function(childSnap, childPath) {
    tree = tree.set(new wd.core.util.Path(childPath), childSnap);
  });
  return tree;
}}, isEmpty:function() {
  return this.value === null && this.children.isEmpty();
}, findRootMostMatchingPathAndValue:function(relativePath, predicate) {
  if (this.value != null && predicate(this.value)) {
    return {path:wd.core.util.Path.Empty, value:this.value};
  } else {
    if (relativePath.isEmpty()) {
      return null;
    } else {
      var front = relativePath.getFront();
      var child = this.children.get(front);
      if (child !== null) {
        var childExistingPathAndValue = child.findRootMostMatchingPathAndValue(relativePath.popFront(), predicate);
        if (childExistingPathAndValue != null) {
          var fullPath = (new wd.core.util.Path(front)).child(childExistingPathAndValue.path);
          return {path:fullPath, value:childExistingPathAndValue.value};
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  }
}, findRootMostValueAndPath:function(relativePath) {
  return this.findRootMostMatchingPathAndValue(relativePath, function() {
    return true;
  });
}, subtree:function(relativePath) {
  if (relativePath.isEmpty()) {
    return this;
  } else {
    var front = relativePath.getFront();
    var childTree = this.children.get(front);
    if (childTree !== null) {
      return childTree.subtree(relativePath.popFront());
    } else {
      return wd.core.util.ImmutableTree.Empty;
    }
  }
}, set:function(relativePath, toSet) {
  if (relativePath.isEmpty()) {
    return new wd.core.util.ImmutableTree(toSet, this.children);
  } else {
    var front = relativePath.getFront();
    var child = this.children.get(front) || wd.core.util.ImmutableTree.Empty;
    var newChild = child.set(relativePath.popFront(), toSet);
    var newChildren = this.children.insert(front, newChild);
    return new wd.core.util.ImmutableTree(this.value, newChildren);
  }
}, remove:function(relativePath) {
  if (relativePath.isEmpty()) {
    if (this.children.isEmpty()) {
      return wd.core.util.ImmutableTree.Empty;
    } else {
      return new wd.core.util.ImmutableTree(null, this.children);
    }
  } else {
    var front = relativePath.getFront();
    var child = this.children.get(front);
    if (child) {
      var newChild = child.remove(relativePath.popFront());
      var newChildren;
      if (newChild.isEmpty()) {
        newChildren = this.children.remove(front);
      } else {
        newChildren = this.children.insert(front, newChild);
      }
      if (this.value === null && newChildren.isEmpty()) {
        return wd.core.util.ImmutableTree.Empty;
      } else {
        return new wd.core.util.ImmutableTree(this.value, newChildren);
      }
    } else {
      return this;
    }
  }
}, get:function(relativePath) {
  if (relativePath.isEmpty()) {
    return this.value;
  } else {
    var front = relativePath.getFront();
    var child = this.children.get(front);
    if (child) {
      return child.get(relativePath.popFront());
    } else {
      return null;
    }
  }
}, setTree:function(relativePath, newTree) {
  if (relativePath.isEmpty()) {
    return newTree;
  } else {
    var front = relativePath.getFront();
    var child = this.children.get(front) || wd.core.util.ImmutableTree.Empty;
    var newChild = child.setTree(relativePath.popFront(), newTree);
    var newChildren;
    if (newChild.isEmpty()) {
      newChildren = this.children.remove(front);
    } else {
      newChildren = this.children.insert(front, newChild);
    }
    return new wd.core.util.ImmutableTree(this.value, newChildren);
  }
}, fold:function(fn) {
  return this.fold_(wd.core.util.Path.Empty, fn);
}, fold_:function(pathSoFar, fn) {
  var accum = {};
  this.children.inorderTraversal(function(childKey, childTree) {
    accum[childKey] = childTree.fold_(pathSoFar.child(childKey), fn);
  });
  return fn(pathSoFar, this.value, accum);
}, findOnPath:function(path, f) {
  return this.findOnPath_(path, wd.core.util.Path.Empty, f);
}, findOnPath_:function(pathToFollow, pathSoFar, f) {
  var result = this.value ? f(pathSoFar, this.value) : false;
  if (result) {
    return result;
  } else {
    if (pathToFollow.isEmpty()) {
      return null;
    } else {
      var front = pathToFollow.getFront();
      var nextChild = this.children.get(front);
      if (nextChild) {
        return nextChild.findOnPath_(pathToFollow.popFront(), pathSoFar.child(front), f);
      } else {
        return null;
      }
    }
  }
}, foreachOnPathWhile:function(path, f) {
  return this.foreachOnPathWhile_(path, wd.core.util.Path.Empty, f);
}, foreachOnPathWhile_:function(pathToFollow, currentRelativePath, f) {
  if (pathToFollow.isEmpty()) {
    return currentRelativePath;
  } else {
    var shouldContinue = true;
    if (this.value) {
      shouldContinue = f(currentRelativePath, this.value);
    }
    if (shouldContinue === true) {
      var front = pathToFollow.getFront();
      var nextChild = this.children.get(front);
      if (nextChild) {
        return nextChild.foreachOnPath_(pathToFollow.popFront(), currentRelativePath.child(front), f);
      } else {
        return currentRelativePath;
      }
    } else {
      return currentRelativePath;
    }
  }
}, foreachOnPath:function(path, f) {
  return this.foreachOnPath_(path, wd.core.util.Path.Empty, f);
}, foreachOnPath_:function(pathToFollow, currentRelativePath, f) {
  if (pathToFollow.isEmpty()) {
    return this;
  } else {
    if (this.value) {
      f(currentRelativePath, this.value);
    }
    var front = pathToFollow.getFront();
    var nextChild = this.children.get(front);
    if (nextChild) {
      return nextChild.foreachOnPath_(pathToFollow.popFront(), currentRelativePath.child(front), f);
    } else {
      return wd.core.util.ImmutableTree.Empty;
    }
  }
}, foreach:function(f) {
  this.foreach_(wd.core.util.Path.Empty, f);
}, foreach_:function(currentRelativePath, f) {
  this.children.inorderTraversal(function(childName, childTree) {
    childTree.foreach_(currentRelativePath.child(childName), f);
  });
  if (this.value) {
    f(currentRelativePath, this.value);
  }
}, foreachChild:function(f) {
  this.children.inorderTraversal(function(childName, childTree) {
    if (childTree.value) {
      f(childName, childTree.value);
    }
  });
}});
wd.core.util.ImmutableTree.Empty = new wd.core.util.ImmutableTree(null);
if (goog.DEBUG) {
  wd.core.util.ImmutableTree.prototype.toString = function() {
    var json = {};
    this.foreach(function(relativePath, value) {
      var pathString = relativePath.toString();
      json[pathString] = value.toString();
    });
    return wd.util.json.stringify(json);
  };
}
;goog.provide("wd.core.SyncPoint");
goog.require("wd.core.util");
goog.require("wd.core.util.ImmutableTree");
goog.require("wd.core.view.ViewCache");
goog.require("wd.core.view.EventRegistration");
goog.require("wd.core.view.View");
goog.require("goog.array");
wd.core.SyncPoint = function() {
  this.views_ = {};
};
wd.core.SyncPoint.prototype.isEmpty = function() {
  return goog.object.isEmpty(this.views_);
};
wd.core.SyncPoint.prototype.applyOperation = function(operation, writesCache, optCompleteServerCache) {
  var queryId = operation.source.queryId;
  if (queryId !== null) {
    var view = wd.util.obj.get(this.views_, queryId);
    wd.core.util.assert(view != null, "SyncTree gave us an op for an invalid query.");
    return view.applyOperation(operation, writesCache, optCompleteServerCache);
  } else {
    var events = [];
    goog.object.forEach(this.views_, function(view) {
      events = events.concat(view.applyOperation(operation, writesCache, optCompleteServerCache));
    });
    return events;
  }
};
wd.core.SyncPoint.prototype.addEventRegistration = function(query, eventRegistration, writesCache, serverCache, serverCacheComplete) {
  var queryId = query.queryIdentifier();
  var view = wd.util.obj.get(this.views_, queryId);
  if (!view) {
    var eventCache = writesCache.calcCompleteEventCache(serverCacheComplete ? serverCache : null);
    var eventCacheComplete = false;
    if (eventCache) {
      eventCacheComplete = true;
    } else {
      if (serverCache instanceof wd.core.snap.ChildrenNode) {
        eventCache = writesCache.calcCompleteEventChildren(serverCache);
        eventCacheComplete = false;
      } else {
        eventCache = wd.core.snap.EMPTY_NODE;
        eventCacheComplete = false;
      }
    }
    var viewCache = new wd.core.view.ViewCache(new wd.core.view.CacheNode(eventCache, eventCacheComplete, false), new wd.core.view.CacheNode(serverCache, serverCacheComplete, false));
    view = new wd.core.view.View(query, viewCache);
    this.views_[queryId] = view;
  }
  view.addEventRegistration(eventRegistration);
  return view.getInitialEvents(eventRegistration);
};
wd.core.SyncPoint.prototype.removeEventRegistration = function(query, eventRegistration, cancelError) {
  var queryId = query.queryIdentifier();
  var removed = [];
  var cancelEvents = [];
  var hadCompleteView = this.hasCompleteView();
  if (queryId === "default") {
    var self = this;
    goog.object.forEach(this.views_, function(view, viewQueryId) {
      cancelEvents = cancelEvents.concat(view.removeEventRegistration(eventRegistration, cancelError));
      if (view.isEmpty()) {
        delete self.views_[viewQueryId];
        if (!view.getQuery().getQueryParams().loadsAllData()) {
          removed.push(view.getQuery());
        }
      }
    });
  } else {
    var view = wd.util.obj.get(this.views_, queryId);
    if (view) {
      cancelEvents = cancelEvents.concat(view.removeEventRegistration(eventRegistration, cancelError));
      if (view.isEmpty()) {
        delete this.views_[queryId];
        if (!view.getQuery().getQueryParams().loadsAllData()) {
          removed.push(view.getQuery());
        }
      }
    }
  }
  if (hadCompleteView && !this.hasCompleteView()) {
    removed.push(new Wilddog(query.repo, query.path));
  }
  return {removed:removed, events:cancelEvents};
};
wd.core.SyncPoint.prototype.getQueryViews = function() {
  return goog.array.filter(goog.object.getValues(this.views_), function(view) {
    return !view.getQuery().getQueryParams().loadsAllData();
  });
};
wd.core.SyncPoint.prototype.getCompleteServerCache = function(path) {
  var serverCache = null;
  goog.object.forEach(this.views_, function(view) {
    serverCache = serverCache || view.getCompleteServerCache(path);
  });
  return serverCache;
};
wd.core.SyncPoint.prototype.viewForQuery = function(query) {
  var params = query.getQueryParams();
  if (params.loadsAllData()) {
    return this.getCompleteView();
  } else {
    var queryId = query.queryIdentifier();
    return wd.util.obj.get(this.views_, queryId);
  }
};
wd.core.SyncPoint.prototype.viewExistsForQuery = function(query) {
  return this.viewForQuery(query) != null;
};
wd.core.SyncPoint.prototype.hasCompleteView = function() {
  return this.getCompleteView() != null;
};
wd.core.SyncPoint.prototype.getCompleteView = function() {
  var completeView = goog.object.findValue(this.views_, function(view) {
    return view.getQuery().getQueryParams().loadsAllData();
  });
  return completeView || null;
};
goog.provide("wd.core.CompoundWrite");
goog.require("wd.core.snap.Node");
goog.require("wd.core.util");
goog.require("wd.core.util.ImmutableTree");
wd.core.CompoundWrite = function(writeTree) {
  this.writeTree_ = writeTree;
};
wd.core.CompoundWrite.Empty = new wd.core.CompoundWrite(new wd.core.util.ImmutableTree(null));
wd.core.CompoundWrite.prototype.addWrite = function(path, node) {
  if (path.isEmpty()) {
    return new wd.core.CompoundWrite(new wd.core.util.ImmutableTree(node));
  } else {
    var rootmost = this.writeTree_.findRootMostValueAndPath(path);
    if (rootmost != null) {
      var rootMostPath = rootmost.path, value = rootmost.value;
      var relativePath = wd.core.util.Path.relativePath(rootMostPath, path);
      value = value.updateChild(relativePath, node);
      return new wd.core.CompoundWrite(this.writeTree_.set(rootMostPath, value));
    } else {
      var subtree = new wd.core.util.ImmutableTree(node);
      var newWriteTree = this.writeTree_.setTree(path, subtree);
      return new wd.core.CompoundWrite(newWriteTree);
    }
  }
};
wd.core.CompoundWrite.prototype.addWrites = function(path, updates) {
  var newWrite = this;
  wd.util.obj.foreach(updates, function(childKey, node) {
    newWrite = newWrite.addWrite(path.child(childKey), node);
  });
  return newWrite;
};
wd.core.CompoundWrite.prototype.removeWrite = function(path) {
  if (path.isEmpty()) {
    return wd.core.CompoundWrite.Empty;
  } else {
    var newWriteTree = this.writeTree_.setTree(path, wd.core.util.ImmutableTree.Empty);
    return new wd.core.CompoundWrite(newWriteTree);
  }
};
wd.core.CompoundWrite.prototype.hasCompleteWrite = function(path) {
  return this.getCompleteNode(path) != null;
};
wd.core.CompoundWrite.prototype.getCompleteNode = function(path) {
  var rootmost = this.writeTree_.findRootMostValueAndPath(path);
  if (rootmost != null) {
    return this.writeTree_.get(rootmost.path).getChild(wd.core.util.Path.relativePath(rootmost.path, path));
  } else {
    return null;
  }
};
wd.core.CompoundWrite.prototype.getCompleteChildren = function() {
  var children = [];
  var node = this.writeTree_.value;
  if (node != null) {
    if (!node.isLeafNode()) {
      node = node;
      node.forEachChild(wd.core.snap.PriorityIndex, function(childName, childNode) {
        children.push(new wd.core.snap.NamedNode(childName, childNode));
      });
    }
  } else {
    this.writeTree_.children.inorderTraversal(function(childName, childTree) {
      if (childTree.value != null) {
        children.push(new wd.core.snap.NamedNode(childName, childTree.value));
      }
    });
  }
  return children;
};
wd.core.CompoundWrite.prototype.childCompoundWrite = function(path) {
  if (path.isEmpty()) {
    return this;
  } else {
    var shadowingNode = this.getCompleteNode(path);
    if (shadowingNode != null) {
      return new wd.core.CompoundWrite(new wd.core.util.ImmutableTree(shadowingNode));
    } else {
      return new wd.core.CompoundWrite(this.writeTree_.subtree(path));
    }
  }
};
wd.core.CompoundWrite.prototype.isEmpty = function() {
  return this.writeTree_.isEmpty();
};
wd.core.CompoundWrite.prototype.apply = function(node) {
  return wd.core.CompoundWrite.applySubtreeWrite_(wd.core.util.Path.Empty, this.writeTree_, node);
};
wd.core.CompoundWrite.applySubtreeWrite_ = function(relativePath, writeTree, node) {
  if (writeTree.value != null) {
    return node.updateChild(relativePath, writeTree.value);
  } else {
    var priorityWrite = null;
    writeTree.children.inorderTraversal(function(childKey, childTree) {
      if (childKey === ".priority") {
        wd.core.util.assert(childTree.value !== null, "Priority writes must always be leaf nodes");
        priorityWrite = childTree.value;
      } else {
        node = wd.core.CompoundWrite.applySubtreeWrite_(relativePath.child(childKey), childTree, node);
      }
    });
    if (!node.getChild(relativePath).isEmpty() && priorityWrite !== null) {
      node = node.updateChild(relativePath.child(".priority"), priorityWrite);
    }
    return node;
  }
};
goog.provide("wd.core.WriteTree");
goog.require("wd.core.CompoundWrite");
goog.require("wd.core.util");
goog.require("wd.core.view.CacheNode");
wd.core.WriteRecord;
wd.core.WriteTree = function() {
  this.visibleWrites_ = wd.core.CompoundWrite.Empty;
  this.allWrites_ = [];
  this.lastWriteId_ = -1;
};
wd.core.WriteTree.prototype.childWrites = function(path) {
  return new wd.core.WriteTreeRef(path, this);
};
wd.core.WriteTree.prototype.addOverwrite = function(path, snap, writeId, visible) {
  wd.core.util.assert(writeId > this.lastWriteId_, "Stacking an older write on top of newer ones");
  if (!goog.isDef(visible)) {
    visible = true;
  }
  this.allWrites_.push({path:path, snap:snap, writeId:writeId, visible:visible});
  if (visible) {
    this.visibleWrites_ = this.visibleWrites_.addWrite(path, snap);
  }
  this.lastWriteId_ = writeId;
};
wd.core.WriteTree.prototype.addMerge = function(path, changedChildren, writeId) {
  wd.core.util.assert(writeId > this.lastWriteId_, "Stacking an older merge on top of newer ones");
  this.allWrites_.push({path:path, children:changedChildren, writeId:writeId, visible:true});
  this.visibleWrites_ = this.visibleWrites_.addWrites(path, changedChildren);
  this.lastWriteId_ = writeId;
};
wd.core.WriteTree.prototype.removeWrite = function(writeId) {
  var idx = goog.array.findIndex(this.allWrites_, function(s) {
    return s.writeId === writeId;
  });
  wd.core.util.assert(idx >= 0, "removeWrite called with nonexistent writeId.");
  var writeToRemove = this.allWrites_[idx];
  this.allWrites_.splice(idx, 1);
  var removedWriteWasVisible = writeToRemove.visible;
  var removedWriteOverlapsWithOtherWrites = false;
  var i = this.allWrites_.length - 1;
  while (removedWriteWasVisible && i >= 0) {
    var currentWrite = this.allWrites_[i];
    if (currentWrite.visible) {
      if (i >= idx && this.recordContainsPath_(currentWrite, writeToRemove.path)) {
        removedWriteWasVisible = false;
      } else {
        if (writeToRemove.path.contains(currentWrite.path)) {
          removedWriteOverlapsWithOtherWrites = true;
        }
      }
    }
    i--;
  }
  if (!removedWriteWasVisible) {
    return null;
  } else {
    if (removedWriteOverlapsWithOtherWrites) {
      this.resetTree_();
      return writeToRemove.path;
    } else {
      if (writeToRemove.snap) {
        this.visibleWrites_ = this.visibleWrites_.removeWrite(writeToRemove.path);
      } else {
        var children = writeToRemove.children;
        var self = this;
        goog.object.forEach(children, function(childSnap, childName) {
          self.visibleWrites_ = self.visibleWrites_.removeWrite(writeToRemove.path.child(childName));
        });
      }
      return writeToRemove.path;
    }
  }
};
wd.core.WriteTree.prototype.getCompleteWriteData = function(path) {
  return this.visibleWrites_.getCompleteNode(path);
};
wd.core.WriteTree.prototype.calcCompleteEventCache = function(treePath, completeServerCache, writeIdsToExclude, includeHiddenWrites) {
  if (!writeIdsToExclude && !includeHiddenWrites) {
    var shadowingNode = this.visibleWrites_.getCompleteNode(treePath);
    if (shadowingNode != null) {
      return shadowingNode;
    } else {
      var subMerge = this.visibleWrites_.childCompoundWrite(treePath);
      if (subMerge.isEmpty()) {
        return completeServerCache;
      } else {
        if (completeServerCache == null && !subMerge.hasCompleteWrite(wd.core.util.Path.Empty)) {
          return null;
        } else {
          var layeredCache = completeServerCache || wd.core.snap.EMPTY_NODE;
          return subMerge.apply(layeredCache);
        }
      }
    }
  } else {
    var merge = this.visibleWrites_.childCompoundWrite(treePath);
    if (!includeHiddenWrites && merge.isEmpty()) {
      return completeServerCache;
    } else {
      if (!includeHiddenWrites && completeServerCache == null && !merge.hasCompleteWrite(wd.core.util.Path.Empty)) {
        return null;
      } else {
        var filter = function(write) {
          return (write.visible || includeHiddenWrites) && (!writeIdsToExclude || !goog.array.contains(writeIdsToExclude, write.writeId)) && (write.path.contains(treePath) || treePath.contains(write.path));
        };
        var mergeAtPath = wd.core.WriteTree.layerTree_(this.allWrites_, filter, treePath);
        layeredCache = completeServerCache || wd.core.snap.EMPTY_NODE;
        return mergeAtPath.apply(layeredCache);
      }
    }
  }
};
wd.core.WriteTree.prototype.calcCompleteEventChildren = function(treePath, completeServerChildren) {
  var completeChildren = wd.core.snap.EMPTY_NODE;
  var topLevelSet = this.visibleWrites_.getCompleteNode(treePath);
  if (topLevelSet) {
    if (!topLevelSet.isLeafNode()) {
      topLevelSet.forEachChild(wd.core.snap.PriorityIndex, function(childName, childSnap) {
        completeChildren = completeChildren.updateImmediateChild(childName, childSnap);
      });
    }
    return completeChildren;
  } else {
    if (completeServerChildren) {
      var merge = this.visibleWrites_.childCompoundWrite(treePath);
      completeServerChildren.forEachChild(wd.core.snap.PriorityIndex, function(childName, childNode) {
        var node = merge.childCompoundWrite(new wd.core.util.Path(childName)).apply(childNode);
        completeChildren = completeChildren.updateImmediateChild(childName, node);
      });
      goog.array.forEach(merge.getCompleteChildren(), function(namedNode) {
        completeChildren = completeChildren.updateImmediateChild(namedNode.name, namedNode.node);
      });
      return completeChildren;
    } else {
      merge = this.visibleWrites_.childCompoundWrite(treePath);
      goog.array.forEach(merge.getCompleteChildren(), function(namedNode) {
        completeChildren = completeChildren.updateImmediateChild(namedNode.name, namedNode.node);
      });
      return completeChildren;
    }
  }
};
wd.core.WriteTree.prototype.calcEventCacheAfterServerOverwrite = function(treePath, childPath, existingEventSnap, existingServerSnap) {
  wd.core.util.assert(existingEventSnap || existingServerSnap, "Either existingEventSnap or existingServerSnap must exist");
  var path = treePath.child(childPath);
  if (this.visibleWrites_.hasCompleteWrite(path)) {
    return null;
  } else {
    var childMerge = this.visibleWrites_.childCompoundWrite(path);
    if (childMerge.isEmpty()) {
      return existingServerSnap.getChild(childPath);
    } else {
      return childMerge.apply(existingServerSnap.getChild(childPath));
    }
  }
};
wd.core.WriteTree.prototype.calcCompleteChild = function(treePath, childKey, existingServerSnap) {
  var path = treePath.child(childKey);
  var shadowingNode = this.visibleWrites_.getCompleteNode(path);
  if (shadowingNode != null) {
    return shadowingNode;
  } else {
    if (existingServerSnap.isCompleteForChild(childKey)) {
      var childMerge = this.visibleWrites_.childCompoundWrite(path);
      return childMerge.apply(existingServerSnap.getNode().getImmediateChild(childKey));
    } else {
      return null;
    }
  }
};
wd.core.WriteTree.prototype.shadowingWrite = function(path) {
  return this.visibleWrites_.getCompleteNode(path);
};
wd.core.WriteTree.prototype.calcIndexedSlice = function(treePath, completeServerData, startPost, count, reverse, index) {
  var toIterate;
  var merge = this.visibleWrites_.childCompoundWrite(treePath);
  var shadowingNode = merge.getCompleteNode(wd.core.util.Path.Empty);
  if (shadowingNode != null) {
    toIterate = shadowingNode;
  } else {
    if (completeServerData != null) {
      toIterate = merge.apply(completeServerData);
    } else {
      return [];
    }
  }
  toIterate = toIterate.withIndex(index);
  if (!toIterate.isEmpty() && !toIterate.isLeafNode()) {
    var nodes = [];
    var cmp = index.getCompare();
    var iter = reverse ? toIterate.getReverseIteratorFrom(startPost, index) : toIterate.getIteratorFrom(startPost, index);
    var next = iter.getNext();
    while (next && nodes.length < count) {
      if (cmp(next, startPost) !== 0) {
        nodes.push(next);
      }
      next = iter.getNext();
    }
    return nodes;
  } else {
    return [];
  }
};
wd.core.WriteTree.prototype.recordContainsPath_ = function(writeRecord, path) {
  if (writeRecord.snap) {
    return writeRecord.path.contains(path);
  } else {
    return !!goog.object.findKey(writeRecord.children, function(childSnap, childName) {
      return writeRecord.path.child(childName).contains(path);
    });
  }
};
wd.core.WriteTree.prototype.resetTree_ = function() {
  this.visibleWrites_ = wd.core.WriteTree.layerTree_(this.allWrites_, wd.core.WriteTree.DefaultFilter_, wd.core.util.Path.Empty);
  if (this.allWrites_.length > 0) {
    this.lastWriteId_ = this.allWrites_[this.allWrites_.length - 1].writeId;
  } else {
    this.lastWriteId_ = -1;
  }
};
wd.core.WriteTree.DefaultFilter_ = function(write) {
  return write.visible;
};
wd.core.WriteTree.layerTree_ = function(writes, filter, treeRoot) {
  var compoundWrite = wd.core.CompoundWrite.Empty;
  for (var i = 0;i < writes.length;++i) {
    var write = writes[i];
    if (filter(write)) {
      var writePath = write.path;
      var relativePath;
      if (write.snap) {
        if (treeRoot.contains(writePath)) {
          relativePath = wd.core.util.Path.relativePath(treeRoot, writePath);
          compoundWrite = compoundWrite.addWrite(relativePath, write.snap);
        } else {
          if (writePath.contains(treeRoot)) {
            relativePath = wd.core.util.Path.relativePath(writePath, treeRoot);
            compoundWrite = compoundWrite.addWrite(wd.core.util.Path.Empty, write.snap.getChild(relativePath));
          } else {
          }
        }
      } else {
        if (write.children) {
          if (treeRoot.contains(writePath)) {
            relativePath = wd.core.util.Path.relativePath(treeRoot, writePath);
            compoundWrite = compoundWrite.addWrites(relativePath, write.children);
          } else {
            if (writePath.contains(treeRoot)) {
              relativePath = wd.core.util.Path.relativePath(writePath, treeRoot);
              if (relativePath.isEmpty()) {
                compoundWrite = compoundWrite.addWrites(wd.core.util.Path.Empty, write.children);
              } else {
                var child = wd.util.obj.get(write.children, relativePath.getFront());
                if (child) {
                  var deepNode = child.getChild(relativePath.popFront());
                  compoundWrite = compoundWrite.addWrite(wd.core.util.Path.Empty, deepNode);
                }
              }
            } else {
            }
          }
        } else {
          throw wd.core.util.assertionError("WriteRecord should have .snap or .children");
        }
      }
    }
  }
  return compoundWrite;
};
wd.core.WriteTreeRef = function(path, writeTree) {
  this.treePath_ = path;
  this.writeTree_ = writeTree;
};
wd.core.WriteTreeRef.prototype.calcCompleteEventCache = function(completeServerCache, writeIdsToExclude, includeHiddenWrites) {
  return this.writeTree_.calcCompleteEventCache(this.treePath_, completeServerCache, writeIdsToExclude, includeHiddenWrites);
};
wd.core.WriteTreeRef.prototype.calcCompleteEventChildren = function(completeServerChildren) {
  return this.writeTree_.calcCompleteEventChildren(this.treePath_, completeServerChildren);
};
wd.core.WriteTreeRef.prototype.calcEventCacheAfterServerOverwrite = function(path, existingEventSnap, existingServerSnap) {
  return this.writeTree_.calcEventCacheAfterServerOverwrite(this.treePath_, path, existingEventSnap, existingServerSnap);
};
wd.core.WriteTreeRef.prototype.shadowingWrite = function(path) {
  return this.writeTree_.shadowingWrite(this.treePath_.child(path));
};
wd.core.WriteTreeRef.prototype.calcIndexedSlice = function(completeServerData, startPost, count, reverse, index) {
  return this.writeTree_.calcIndexedSlice(this.treePath_, completeServerData, startPost, count, reverse, index);
};
wd.core.WriteTreeRef.prototype.calcCompleteChild = function(childKey, existingServerCache) {
  return this.writeTree_.calcCompleteChild(this.treePath_, childKey, existingServerCache);
};
wd.core.WriteTreeRef.prototype.child = function(childName) {
  return new wd.core.WriteTreeRef(this.treePath_.child(childName), this.writeTree_);
};
goog.provide("wd.core.SyncTree");
goog.require("wd.core.Operation");
goog.require("wd.core.SyncPoint");
goog.require("wd.core.WriteTree");
goog.require("wd.core.util");
wd.core.ListenProvider;
wd.core.SyncTree = function(listenProvider) {
  this.syncPointTree_ = wd.core.util.ImmutableTree.Empty;
  this.pendingWriteTree_ = new wd.core.WriteTree;
  this.tagToQueryMap_ = {};
  this.queryToTagMap_ = {};
  this.listenProvider_ = listenProvider;
};
wd.core.SyncTree.prototype.applyUserOverwrite = function(path, newData, writeId, visible) {
  this.pendingWriteTree_.addOverwrite(path, newData, writeId, visible);
  if (!visible) {
    return [];
  } else {
    return this.applyOperationToSyncPoints_(new wd.core.operation.Overwrite(wd.core.OperationSource.User, path, newData));
  }
};
wd.core.SyncTree.prototype.applyUserMerge = function(path, changedChildren, writeId) {
  this.pendingWriteTree_.addMerge(path, changedChildren, writeId);
  var changeTree = wd.core.util.ImmutableTree.fromObject(changedChildren);
  return this.applyOperationToSyncPoints_(new wd.core.operation.Merge(wd.core.OperationSource.User, path, changeTree));
};
wd.core.SyncTree.prototype.ackUserWrite = function(writeId, revert) {
  revert = revert || false;
  var pathToReevaluate = this.pendingWriteTree_.removeWrite(writeId);
  if (pathToReevaluate == null) {
    return [];
  } else {
    return this.applyOperationToSyncPoints_(new wd.core.operation.AckUserWrite(pathToReevaluate, revert));
  }
};
wd.core.SyncTree.prototype.applyServerOverwrite = function(path, newData) {
  return this.applyOperationToSyncPoints_(new wd.core.operation.Overwrite(wd.core.OperationSource.Server, path, newData));
};
wd.core.SyncTree.prototype.applyServerMerge = function(path, changedChildren) {
  var changeTree = wd.core.util.ImmutableTree.fromObject(changedChildren);
  return this.applyOperationToSyncPoints_(new wd.core.operation.Merge(wd.core.OperationSource.Server, path, changeTree));
};
wd.core.SyncTree.prototype.applyListenComplete = function(path) {
  return this.applyOperationToSyncPoints_(new wd.core.operation.ListenComplete(wd.core.OperationSource.Server, path));
};
wd.core.SyncTree.prototype.applyTaggedQueryOverwrite = function(path, snap, tag) {
  var queryKey = this.queryKeyForTag_(tag);
  if (queryKey != null) {
    var r = this.parseQueryKey_(queryKey);
    var queryPath = r.path, queryId = r.queryId;
    var relativePath = wd.core.util.Path.relativePath(queryPath, path);
    var op = new wd.core.operation.Overwrite(wd.core.OperationSource.forServerTaggedQuery(queryId), relativePath, snap);
    return this.applyTaggedOperation_(queryPath, queryId, op);
  } else {
    return [];
  }
};
wd.core.SyncTree.prototype.applyTaggedQueryMerge = function(path, changedChildren, tag) {
  var queryKey = this.queryKeyForTag_(tag);
  if (queryKey) {
    var r = this.parseQueryKey_(queryKey);
    var queryPath = r.path, queryId = r.queryId;
    var relativePath = wd.core.util.Path.relativePath(queryPath, path);
    var changeTree = wd.core.util.ImmutableTree.fromObject(changedChildren);
    var op = new wd.core.operation.Merge(wd.core.OperationSource.forServerTaggedQuery(queryId), relativePath, changeTree);
    return this.applyTaggedOperation_(queryPath, queryId, op);
  } else {
    return [];
  }
};
wd.core.SyncTree.prototype.applyTaggedListenComplete = function(path, tag) {
  var queryKey = this.queryKeyForTag_(tag);
  if (queryKey) {
    var r = this.parseQueryKey_(queryKey);
    var queryPath = r.path, queryId = r.queryId;
    var relativePath = wd.core.util.Path.relativePath(queryPath, path);
    var op = new wd.core.operation.ListenComplete(wd.core.OperationSource.forServerTaggedQuery(queryId), relativePath);
    return this.applyTaggedOperation_(queryPath, queryId, op);
  } else {
    return [];
  }
};
wd.core.SyncTree.prototype.addEventRegistration = function(query, eventRegistration) {
  var path = query.path;
  var serverCache = null;
  var foundAncestorDefaultView = false;
  this.syncPointTree_.foreachOnPathWhile(path, function(pathToSyncPoint, sp) {
    var relativePath = wd.core.util.Path.relativePath(pathToSyncPoint, path);
    serverCache = sp.getCompleteServerCache(relativePath);
    foundAncestorDefaultView = foundAncestorDefaultView || sp.hasCompleteView();
    return !serverCache;
  });
  var syncPoint = this.syncPointTree_.get(path);
  if (!syncPoint) {
    syncPoint = new wd.core.SyncPoint;
    this.syncPointTree_ = this.syncPointTree_.set(path, syncPoint);
  } else {
    foundAncestorDefaultView = foundAncestorDefaultView || syncPoint.hasCompleteView();
    serverCache = serverCache || syncPoint.getCompleteServerCache(wd.core.util.Path.Empty);
  }
  var serverCacheComplete;
  if (serverCache != null) {
    serverCacheComplete = true;
  } else {
    serverCacheComplete = false;
    serverCache = wd.core.snap.EMPTY_NODE;
    var subtree = this.syncPointTree_.subtree(path);
    subtree.foreachChild(function(childName, childSyncPoint) {
      var completeCache = childSyncPoint.getCompleteServerCache(wd.core.util.Path.Empty);
      if (completeCache) {
        serverCache = serverCache.updateImmediateChild(childName, completeCache);
      }
    });
  }
  var viewAlreadyExists = syncPoint.viewExistsForQuery(query);
  if (!viewAlreadyExists && !query.getQueryParams().loadsAllData()) {
    var queryKey = this.makeQueryKey_(query);
    wd.core.util.assert(!goog.object.containsKey(this.queryToTagMap_, queryKey), "View does not exist, but we have a tag");
    var tag = wd.core.SyncTree.getNextQueryTag_();
    this.queryToTagMap_[queryKey] = tag;
    this.tagToQueryMap_["_" + tag] = queryKey;
  }
  var writesCache = this.pendingWriteTree_.childWrites(path);
  var events = syncPoint.addEventRegistration(query, eventRegistration, writesCache, serverCache, serverCacheComplete);
  if (!viewAlreadyExists && !foundAncestorDefaultView) {
    var view = syncPoint.viewForQuery(query);
    events = events.concat(this.setupListener_(query, view));
  }
  return events;
};
wd.core.SyncTree.prototype.removeEventRegistration = function(query, eventRegistration, cancelError) {
  var path = query.path;
  var maybeSyncPoint = this.syncPointTree_.get(path);
  var cancelEvents = [];
  if (maybeSyncPoint && (query.queryIdentifier() === "default" || maybeSyncPoint.viewExistsForQuery(query))) {
    var removedAndEvents = maybeSyncPoint.removeEventRegistration(query, eventRegistration, cancelError);
    if (maybeSyncPoint.isEmpty()) {
      this.syncPointTree_ = this.syncPointTree_.remove(path);
    }
    var removed = removedAndEvents.removed;
    cancelEvents = removedAndEvents.events;
    var removingDefault = -1 !== goog.array.findIndex(removed, function(query) {
      return query.getQueryParams().loadsAllData();
    });
    var covered = this.syncPointTree_.findOnPath(path, function(relativePath, parentSyncPoint) {
      return parentSyncPoint.hasCompleteView();
    });
    if (removingDefault && !covered) {
      var subtree = this.syncPointTree_.subtree(path);
      if (!subtree.isEmpty()) {
        var newViews = this.collectDistinctViewsForSubTree_(subtree);
        for (var i = 0;i < newViews.length;++i) {
          var view = newViews[i], newQuery = view.getQuery();
          var listener = this.createListenerForView_(view);
          this.listenProvider_.startListening(newQuery, this.tagForQuery_(newQuery), listener.hashFn, listener.onComplete);
        }
      } else {
      }
    }
    if (!covered && removed.length > 0 && !cancelError) {
      if (removingDefault) {
        var defaultTag = null;
        this.listenProvider_.stopListening(query, defaultTag);
      } else {
        var self = this;
        goog.array.forEach(removed, function(queryToRemove) {
          var queryIdToRemove = queryToRemove.queryIdentifier();
          var tagToRemove = self.queryToTagMap_[self.makeQueryKey_(queryToRemove)];
          self.listenProvider_.stopListening(queryToRemove, tagToRemove);
        });
      }
    }
    this.removeTags_(removed);
  } else {
  }
  return cancelEvents;
};
wd.core.SyncTree.prototype.calcCompleteEventCache = function(path, writeIdsToExclude) {
  var includeHiddenSets = true;
  var writeTree = this.pendingWriteTree_;
  var serverCache = this.syncPointTree_.findOnPath(path, function(pathSoFar, syncPoint) {
    var relativePath = wd.core.util.Path.relativePath(pathSoFar, path);
    var serverCache = syncPoint.getCompleteServerCache(relativePath);
    if (serverCache) {
      return serverCache;
    }
  });
  return writeTree.calcCompleteEventCache(path, serverCache, writeIdsToExclude, includeHiddenSets);
};
wd.core.SyncTree.prototype.collectDistinctViewsForSubTree_ = function(subtree) {
  return subtree.fold(function(relativePath, maybeChildSyncPoint, childMap) {
    if (maybeChildSyncPoint && maybeChildSyncPoint.hasCompleteView()) {
      var completeView = maybeChildSyncPoint.getCompleteView();
      return [completeView];
    } else {
      var views = [];
      if (maybeChildSyncPoint) {
        views = maybeChildSyncPoint.getQueryViews();
      }
      goog.object.forEach(childMap, function(childViews) {
        views = views.concat(childViews);
      });
      return views;
    }
  });
};
wd.core.SyncTree.prototype.removeTags_ = function(queries) {
  for (var j = 0;j < queries.length;++j) {
    var removedQuery = queries[j];
    if (!removedQuery.getQueryParams().loadsAllData()) {
      var removedQueryKey = this.makeQueryKey_(removedQuery);
      var removedQueryTag = this.queryToTagMap_[removedQueryKey];
      delete this.queryToTagMap_[removedQueryKey];
      delete this.tagToQueryMap_["_" + removedQueryTag];
    }
  }
};
wd.core.SyncTree.prototype.setupListener_ = function(query, view) {
  var path = query.path;
  var tag = this.tagForQuery_(query);
  var listener = this.createListenerForView_(view);
  var events = this.listenProvider_.startListening(query, tag, listener.hashFn, listener.onComplete);
  var subtree = this.syncPointTree_.subtree(path);
  if (tag) {
    wd.core.util.assert(!subtree.value.hasCompleteView(), "If we're adding a query, it shouldn't be shadowed");
  } else {
    var queriesToStop = subtree.fold(function(relativePath, maybeChildSyncPoint, childMap) {
      if (!relativePath.isEmpty() && maybeChildSyncPoint && maybeChildSyncPoint.hasCompleteView()) {
        return [maybeChildSyncPoint.getCompleteView().getQuery()];
      } else {
        var queries = [];
        if (maybeChildSyncPoint) {
          queries = queries.concat(goog.array.map(maybeChildSyncPoint.getQueryViews(), function(view) {
            return view.getQuery();
          }));
        }
        goog.object.forEach(childMap, function(childQueries) {
          queries = queries.concat(childQueries);
        });
        return queries;
      }
    });
    for (var i = 0;i < queriesToStop.length;++i) {
      var queryToStop = queriesToStop[i];
      this.listenProvider_.stopListening(queryToStop, this.tagForQuery_(queryToStop));
    }
  }
  return events;
};
wd.core.SyncTree.prototype.createListenerForView_ = function(view) {
  var self = this;
  var query = view.getQuery();
  var tag = this.tagForQuery_(query);
  return {hashFn:function() {
    var cache = view.getServerCache() || wd.core.snap.EMPTY_NODE;
    return cache.hash();
  }, onComplete:function(status, data) {
    if (status === "ok") {
      if (tag) {
        return self.applyTaggedListenComplete(query.path, tag);
      } else {
        return self.applyListenComplete(query.path);
      }
    } else {
      var error = wd.core.util.errorForServerCode(status);
      return self.removeEventRegistration(query, null, error);
    }
  }};
};
wd.core.SyncTree.prototype.makeQueryKey_ = function(query) {
  return query.path.toString() + "$" + query.queryIdentifier();
};
wd.core.SyncTree.prototype.parseQueryKey_ = function(queryKey) {
  var splitIndex = queryKey.indexOf("$");
  wd.core.util.assert(splitIndex !== -1 && splitIndex < queryKey.length - 1, "Bad queryKey.");
  return {queryId:queryKey.substr(splitIndex + 1), path:new wd.core.util.Path(queryKey.substr(0, splitIndex))};
};
wd.core.SyncTree.prototype.queryKeyForTag_ = function(tag) {
  return goog.object.get(this.tagToQueryMap_, "_" + tag);
};
wd.core.SyncTree.prototype.tagForQuery_ = function(query) {
  var queryKey = this.makeQueryKey_(query);
  return wd.util.obj.get(this.queryToTagMap_, queryKey);
};
wd.core.SyncTree.nextQueryTag_ = 1;
wd.core.SyncTree.getNextQueryTag_ = function() {
  return wd.core.SyncTree.nextQueryTag_++;
};
wd.core.SyncTree.prototype.applyTaggedOperation_ = function(queryPath, queryId, operation) {
  var syncPoint = this.syncPointTree_.get(queryPath);
  wd.core.util.assert(syncPoint, "Missing sync point for query tag that we're tracking");
  var writesCache = this.pendingWriteTree_.childWrites(queryPath);
  return syncPoint.applyOperation(operation, writesCache, null);
};
wd.core.SyncTree.prototype.applyOperationToSyncPoints_ = function(operation) {
  return this.applyOperationHelper_(operation, this.syncPointTree_, null, this.pendingWriteTree_.childWrites(wd.core.util.Path.Empty));
};
wd.core.SyncTree.prototype.applyOperationHelper_ = function(operation, syncPointTree, serverCache, writesCache) {
  if (operation.path.isEmpty()) {
    return this.applyOperationDescendantsHelper_(operation, syncPointTree, serverCache, writesCache);
  } else {
    var syncPoint = syncPointTree.get(wd.core.util.Path.Empty);
    if (serverCache == null && syncPoint != null) {
      serverCache = syncPoint.getCompleteServerCache(wd.core.util.Path.Empty);
    }
    var events = [];
    var childName = operation.path.getFront();
    var childOperation = operation.operationForChild(childName);
    var childTree = syncPointTree.children.get(childName);
    if (childTree && childOperation) {
      var childServerCache = serverCache ? serverCache.getImmediateChild(childName) : null;
      var childWritesCache = writesCache.child(childName);
      events = events.concat(this.applyOperationHelper_(childOperation, childTree, childServerCache, childWritesCache));
    }
    if (syncPoint) {
      events = events.concat(syncPoint.applyOperation(operation, writesCache, serverCache));
    }
    return events;
  }
};
wd.core.SyncTree.prototype.applyOperationDescendantsHelper_ = function(operation, syncPointTree, serverCache, writesCache) {
  var syncPoint = syncPointTree.get(wd.core.util.Path.Empty);
  if (serverCache == null && syncPoint != null) {
    serverCache = syncPoint.getCompleteServerCache(wd.core.util.Path.Empty);
  }
  var events = [];
  var self = this;
  syncPointTree.children.inorderTraversal(function(childName, childTree) {
    var childServerCache = serverCache ? serverCache.getImmediateChild(childName) : null;
    var childWritesCache = writesCache.child(childName);
    var childOperation = operation.operationForChild(childName);
    if (childOperation) {
      events = events.concat(self.applyOperationDescendantsHelper_(childOperation, childTree, childServerCache, childWritesCache));
    }
  });
  if (syncPoint) {
    events = events.concat(syncPoint.applyOperation(operation, writesCache, serverCache));
  }
  return events;
};
goog.provide("wd.core.util.CountedSet");
goog.require("wd.core.util");
goog.require("wd.util.obj");
goog.require("goog.object");
wd.core.util.CountedSet = goog.defineClass(null, {constructor:function() {
  this.set = {};
}, add:function(item, val) {
  this.set[item] = val !== null ? val : true;
}, contains:function(key) {
  return wd.util.obj.contains(this.set, key);
}, get:function(item) {
  return this.contains(item) ? this.set[item] : undefined;
}, remove:function(item) {
  delete this.set[item];
}, clear:function() {
  this.set = {};
}, isEmpty:function() {
  return goog.object.isEmpty(this.set);
}, count:function() {
  return goog.object.getCount(this.set);
}, each:function(fn) {
  goog.object.forEach(this.set, function(v, k) {
    fn(k, v);
  });
}, keys:function() {
  var keys = [];
  goog.object.forEach(this.set, function(v, k) {
    keys.push(k);
  });
  return keys;
}});
goog.provide("wd.core.SparseSnapshotTree");
goog.require("wd.core.snap.Node");
goog.require("wd.core.snap.PriorityIndex");
goog.require("wd.core.util.CountedSet");
goog.require("wd.core.util.Path");
wd.core.SparseSnapshotTree = function() {
  this.value_ = null;
  this.children_ = null;
};
wd.core.SparseSnapshotTree.prototype.find = function(path) {
  if (this.value_ != null) {
    return this.value_.getChild(path);
  } else {
    if (!path.isEmpty() && this.children_ != null) {
      var childKey = path.getFront();
      path = path.popFront();
      if (this.children_.contains(childKey)) {
        var childTree = this.children_.get(childKey);
        return childTree.find(path);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
};
wd.core.SparseSnapshotTree.prototype.remember = function(path, data) {
  if (path.isEmpty()) {
    this.value_ = data;
    this.children_ = null;
  } else {
    if (this.value_ !== null) {
      this.value_ = this.value_.updateChild(path, data);
    } else {
      if (this.children_ == null) {
        this.children_ = new wd.core.util.CountedSet;
      }
      var childKey = path.getFront();
      if (!this.children_.contains(childKey)) {
        this.children_.add(childKey, new wd.core.SparseSnapshotTree);
      }
      var child = this.children_.get(childKey);
      path = path.popFront();
      child.remember(path, data);
    }
  }
};
wd.core.SparseSnapshotTree.prototype.forget = function(path) {
  if (path.isEmpty()) {
    this.value_ = null;
    this.children_ = null;
    return true;
  } else {
    if (this.value_ !== null) {
      if (this.value_.isLeafNode()) {
        return false;
      } else {
        var value = this.value_;
        this.value_ = null;
        var self = this;
        value.forEachChild(wd.core.snap.PriorityIndex, function(key, tree) {
          self.remember(new wd.core.util.Path(key), tree);
        });
        return this.forget(path);
      }
    } else {
      if (this.children_ !== null) {
        var childKey = path.getFront();
        path = path.popFront();
        if (this.children_.contains(childKey)) {
          var safeToRemove = this.children_.get(childKey).forget(path);
          if (safeToRemove) {
            this.children_.remove(childKey);
          }
        }
        if (this.children_.isEmpty()) {
          this.children_ = null;
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
  }
};
wd.core.SparseSnapshotTree.prototype.forEachTree = function(prefixPath, func) {
  if (this.value_ !== null) {
    func(prefixPath, this.value_);
  } else {
    this.forEachChild(function(key, tree) {
      var path = new wd.core.util.Path(prefixPath.toString() + "/" + key);
      tree.forEachTree(path, func);
    });
  }
};
wd.core.SparseSnapshotTree.prototype.forEachChild = function(func) {
  if (this.children_ !== null) {
    this.children_.each(function(key, tree) {
      func(key, tree);
    });
  }
};
goog.provide("wd.realtime.Constants");
wd.realtime.Constants = {PROTOCOL_VERSION:"1.0", VERSION_PARAM:"v", SESSION_PARAM:"s", REFERER_PARAM:"r", FORGE_REF:"f", FORGE_DOMAIN:"wilddogio.com"};
goog.provide("wd.realtime.SocketIo");
wd.realtime.SocketIo = require("socket.io-client");
goog.provide("wd.realtime.SocketIoConnection");
goog.require("wd.constants");
goog.require("wd.core.stats.StatsManager");
goog.require("wd.core.storage");
goog.require("wd.core.util");
goog.require("wd.realtime.Constants");
goog.require("wd.realtime.SocketIo");
goog.require("wd.util.json");
var WEBSOCKET_KEEPALIVE_INTERVAL = 45E3;
wd.realtime.SocketIoConnection = function(connId, repoInfo, sessionId, transports) {
  this.connId = connId;
  this.log_ = wd.core.util.logWrapper(this.connId);
  this.keepaliveTimer = null;
  this.frames = null;
  this.totalFrames = 0;
  this.bytesSent = 0;
  this.bytesReceived = 0;
  this.repoInfo = repoInfo;
  this.stats_ = wd.core.stats.StatsManager.getCollection(repoInfo);
  this.transports = [];
  this.websocket_success = wd.core.storage.PersistentStorage.get("previous_websocket_failure") == false;
  if (this.websocket_success || NODE_CLIENT) {
    this.transports.push("websocket");
  } else {
    this.transports.push("polling");
    this.transports.push("websocket");
  }
  this.connURL = (repoInfo.secure ? "https://" : "http://") + repoInfo.internalHost + "?" + wd.realtime.Constants.VERSION_PARAM + "=" + wd.realtime.Constants.PROTOCOL_VERSION;
  if (!NODE_CLIENT && typeof location !== "undefined" && location.href && location.href.indexOf(wd.realtime.Constants.FORGE_DOMAIN) !== -1) {
    this.connURL = this.connURL + "&" + wd.realtime.Constants.REFERER_PARAM + "=" + wd.realtime.Constants.FORGE_REF;
  }
  if (repoInfo.needsQueryParam()) {
    this.connURL = this.connURL + "&ns=" + repoInfo.namespace;
  }
  if (sessionId) {
    this.connURL = this.connURL + "&" + wd.realtime.Constants.SESSION_PARAM + "=" + sessionId;
  }
};
wd.realtime.SocketIoConnection.prototype.open = function(onMess, onDisconn) {
  this.onDisconnect = onDisconn;
  this.onMessage = onMess;
  this.log_("Websocket connecting to " + this.connURL);
  this.everConnected_ = false;
  try {
    this.mySock = wd.realtime.SocketIo(this.connURL, {path:"/.ws", "multiplex":"false", "force new connection":true, "transports":this.transports});
  } catch (e) {
    this.log_("Error instantiating socket.io ");
    var error = e.message || e.data;
    if (error) {
      this.log_(error);
      wd.core.storage.PersistentStorage.set("previous_websocket_failure", true);
    }
    this.onClosed_();
    return;
  }
  var self = this;
  this.mySock["on"]("connect", function() {
    self.log_("Websocket connected.");
    self.everConnected_ = true;
    if (self.mySock != null && self.mySock["io"] != null && self.mySock["io"]["engine"] != null) {
      self.mySock["io"]["engine"]["on"]("upgrade", function() {
        wd.core.storage.PersistentStorage.set("previous_websocket_failure", false);
      });
    }
  });
  this.mySock["on"]("disconnect", function() {
    self.log_("Socketio connection was disconnected.");
    self.mySock = null;
    self.onClosed_();
  });
  this.mySock["on"]("wd", function(m) {
    self.handleIncomingMessage(m);
  });
  this.mySock["on"]("connect_error", function(e) {
    self.log_("Socketio error.  Closing connection.");
    var error = e.message || e.data;
    if (error) {
      self.log_(error);
    }
    self.repoInfo.updateHost(null);
    wd.core.storage.PersistentStorage.set("previous_websocket_failure", true);
    self.onClosed_();
  });
};
wd.realtime.SocketIoConnection.prototype.start = function() {
};
wd.realtime.SocketIoConnection.forceDisallow = function() {
  wd.realtime.SocketIoConnection.forceDisallow_ = true;
};
wd.realtime.SocketIoConnection["isAvailable"] = function() {
  return true;
};
wd.realtime.SocketIoConnection.previouslyFailed = function() {
  return wd.core.storage.PersistentStorage.isInMemoryStorage || wd.core.storage.PersistentStorage.get("previous_websocket_failure") === true;
};
wd.realtime.SocketIoConnection.prototype.markConnectionHealthy = function() {
  wd.core.storage.PersistentStorage.remove("previous_websocket_failure");
};
wd.realtime.SocketIoConnection.prototype.handleIncomingMessage = function(mess) {
  if (this.mySock === null) {
    return;
  }
  this.onMessage(mess);
};
wd.realtime.SocketIoConnection.prototype.send = function(data) {
  this.mySock["emit"]("wd", data);
};
wd.realtime.SocketIoConnection.prototype.shutdown_ = function() {
  this.isClosed_ = true;
  if (this.mySock != null) {
    this.mySock["disconnect"]();
  }
};
wd.realtime.SocketIoConnection.prototype.onClosed_ = function() {
  if (!this.isClosed_) {
    this.log_("WebSocket is closing itself");
    this.shutdown_();
    if (this.onDisconnect) {
      this.onDisconnect(this.everConnected_);
      this.onDisconnect = null;
    }
  }
};
wd.realtime.SocketIoConnection.prototype.close = function() {
  if (!this.isClosed_) {
    this.log_("WebSocket is being closed");
    this.shutdown_();
  }
};
wd.realtime.SocketIoConnection.prototype.resetKeepAlive = function() {
  var self = this;
  clearInterval(this.keepaliveTimer);
  this.keepaliveTimer = setInterval(function() {
    if (self.mySock) {
      self.mySock["send"]("0");
    }
    self.resetKeepAlive();
  }, Math.floor(WEBSOCKET_KEEPALIVE_INTERVAL));
};
goog.provide("wd.realtime.TransportManager");
goog.require("wd.constants");
goog.require("wd.realtime.SocketIoConnection");
wd.realtime.TransportManager = function(repoInfo) {
  this.initTransports_(repoInfo);
};
wd.realtime.TransportManager.ALL_TRANSPORTS = [wd.realtime.SocketIoConnection];
wd.realtime.TransportManager.prototype.initTransports_ = function(repoInfo) {
  var transports = this.transports_ = [];
  wd.core.util.each(wd.realtime.TransportManager.ALL_TRANSPORTS, function(i, transport) {
    if (transport && transport["isAvailable"]()) {
      transports.push(transport);
    }
  });
};
wd.realtime.TransportManager.prototype.initialTransport = function() {
  if (this.transports_.length > 0) {
    return this.transports_[0];
  } else {
    throw new Error("No transports available");
  }
};
wd.realtime.TransportManager.prototype.upgradeTransport = function() {
  if (this.transports_.length > 1) {
    return this.transports_[1];
  } else {
    return null;
  }
};
goog.provide("wd.realtime.Connection");
goog.require("wd.core.storage");
goog.require("wd.core.util");
goog.require("wd.realtime.Constants");
goog.require("wd.realtime.TransportManager");
var UPGRADE_TIMEOUT = 6E4;
var DELAY_BEFORE_SENDING_EXTRA_REQUESTS = 5E3;
var BYTES_SENT_HEALTHY_OVERRIDE = 10 * 1024;
var BYTES_RECEIVED_HEALTHY_OVERRIDE = 100 * 1024;
var REALTIME_STATE_CONNECTING = 0;
var REALTIME_STATE_CONNECTED = 1;
var REALTIME_STATE_DISCONNECTED = 2;
var MESSAGE_TYPE = "t";
var MESSAGE_DATA = "d";
var CONTROL_SHUTDOWN = "s";
var CONTROL_RESET = "r";
var CONTROL_ERROR = "e";
var CONTROL_PONG = "o";
var SWITCH_ACK = "a";
var END_TRANSMISSION = "n";
var PING = "p";
var SERVER_HELLO = "h";
wd.realtime.Connection = function(connId, repoInfo, onMessage, onReady, onDisconnect, onKill) {
  this.id = connId;
  this.log_ = wd.core.util.logWrapper("c:" + this.id + ":");
  this.onMessage_ = onMessage;
  this.onReady_ = onReady;
  this.onDisconnect_ = onDisconnect;
  this.onKill_ = onKill;
  this.repoInfo_ = repoInfo;
  this.pendingDataMessages = [];
  this.connectionCount = 0;
  this.transportManager_ = new wd.realtime.TransportManager(repoInfo);
  this.state_ = REALTIME_STATE_CONNECTING;
  this.log_("Connection created");
  this.start_();
};
wd.realtime.Connection.prototype.start_ = function() {
  var conn = this.transportManager_.initialTransport();
  this.conn_ = new conn(this.nextTransportId_(), this.repoInfo_);
  this.primaryResponsesRequired_ = conn["responsesRequiredToBeHealthy"] || 0;
  var onMessageReceived = this.connReceiver_(this.conn_);
  var onConnectionLost = this.disconnReceiver_(this.conn_);
  this.tx_ = this.conn_;
  this.rx_ = this.conn_;
  this.secondaryConn_ = null;
  this.isHealthy_ = false;
  var self = this;
  setTimeout(function() {
    self.conn_ && self.conn_.open(onMessageReceived, onConnectionLost);
  }, Math.floor(0));
  var healthyTimeout_ms = conn["healthyTimeout"] || 0;
  if (healthyTimeout_ms > 0) {
    this.healthyTimeout_ = setTimeout(function() {
      self.healthyTimeout_ = null;
      if (!self.isHealthy_) {
        if (self.conn_ && self.conn_.bytesReceived > BYTES_RECEIVED_HEALTHY_OVERRIDE) {
          self.log_("Connection exceeded healthy timeout but has received " + self.conn_.bytesReceived + " bytes.  Marking connection healthy.");
          self.isHealthy_ = true;
          self.conn_.markConnectionHealthy();
        } else {
          if (self.conn_ && self.conn_.bytesSent > BYTES_SENT_HEALTHY_OVERRIDE) {
            self.log_("Connection exceeded healthy timeout but has sent " + self.conn_.bytesSent + " bytes.  Leaving connection alive.");
          } else {
            self.log_("Closing unhealthy connection after timeout.");
            self.close();
          }
        }
      }
    }, Math.floor(healthyTimeout_ms));
  }
};
wd.realtime.Connection.prototype.nextTransportId_ = function() {
  return "c:" + this.id + ":" + this.connectionCount++;
};
wd.realtime.Connection.prototype.disconnReceiver_ = function(conn) {
  var self = this;
  return function(everConnected) {
    if (conn === self.conn_) {
      self.onConnectionLost_(everConnected);
    } else {
      if (conn === self.secondaryConn_) {
        self.log_("Secondary connection lost.");
        self.onSecondaryConnectionLost_();
      } else {
        self.log_("closing an old connection");
      }
    }
  };
};
wd.realtime.Connection.prototype.connReceiver_ = function(conn) {
  var self = this;
  return function(message) {
    if (self.state_ != REALTIME_STATE_DISCONNECTED) {
      if (conn === self.rx_) {
        self.onPrimaryMessageReceived_(message);
      } else {
        if (conn === self.secondaryConn_) {
          self.onSecondaryMessageReceived_(message);
        } else {
          self.log_("message on old connection");
        }
      }
    }
  };
};
wd.realtime.Connection.prototype.sendRequest = function(dataMsg) {
  var msg = {"t":"d", "d":dataMsg};
  this.sendData_(msg);
};
wd.realtime.Connection.prototype.tryCleanupConnection = function() {
  if (this.tx_ === this.secondaryConn_ && this.rx_ === this.secondaryConn_) {
    this.log_("cleaning up and promoting a connection: " + this.secondaryConn_.connId);
    this.conn_ = this.secondaryConn_;
    this.secondaryConn_ = null;
  }
};
wd.realtime.Connection.prototype.onSecondaryControl_ = function(controlData) {
  if (MESSAGE_TYPE in controlData) {
    var cmd = controlData[MESSAGE_TYPE];
    if (cmd === SWITCH_ACK) {
      this.upgradeIfSecondaryHealthy_();
    } else {
      if (cmd === CONTROL_RESET) {
        this.log_("Got a reset on secondary, closing it");
        this.secondaryConn_.close();
        if (this.tx_ === this.secondaryConn_ || this.rx_ === this.secondaryConn_) {
          this.close();
        }
      } else {
        if (cmd === CONTROL_PONG) {
          this.log_("got pong on secondary.");
          this.secondaryResponsesRequired_--;
          this.upgradeIfSecondaryHealthy_();
        }
      }
    }
  }
};
wd.realtime.Connection.prototype.onSecondaryMessageReceived_ = function(parsedData) {
  var layer = wd.core.util.requireKey("t", parsedData);
  var data = wd.core.util.requireKey("d", parsedData);
  if (layer == "c") {
    this.onSecondaryControl_(data);
  } else {
    if (layer == "d") {
      this.pendingDataMessages.push(data);
    } else {
      throw new Error("Unknown protocol layer: " + layer);
    }
  }
};
wd.realtime.Connection.prototype.upgradeIfSecondaryHealthy_ = function() {
  if (this.secondaryResponsesRequired_ <= 0) {
    this.log_("Secondary connection is healthy.");
    this.isHealthy_ = true;
    this.secondaryConn_.markConnectionHealthy();
    this.proceedWithUpgrade_();
  } else {
    this.log_("sending ping on secondary.");
    this.secondaryConn_.send({"t":"c", "d":{"t":PING, "d":{}}});
  }
};
wd.realtime.Connection.prototype.proceedWithUpgrade_ = function() {
  this.secondaryConn_.start();
  this.log_("sending client ack on secondary");
  this.secondaryConn_.send({"t":"c", "d":{"t":SWITCH_ACK, "d":{}}});
  this.log_("Ending transmission on primary");
  this.conn_.send({"t":"c", "d":{"t":END_TRANSMISSION, "d":{}}});
  this.tx_ = this.secondaryConn_;
  this.tryCleanupConnection();
};
wd.realtime.Connection.prototype.onPrimaryMessageReceived_ = function(parsedData) {
  var layer = wd.core.util.requireKey("t", parsedData);
  var data = wd.core.util.requireKey("d", parsedData);
  if (layer == "c") {
    this.onControl_(data);
  } else {
    if (layer == "d") {
      this.onDataMessage_(data);
    }
  }
};
wd.realtime.Connection.prototype.onDataMessage_ = function(message) {
  this.onPrimaryResponse_();
  this.onMessage_(message);
};
wd.realtime.Connection.prototype.onPrimaryResponse_ = function() {
  if (!this.isHealthy_) {
    this.primaryResponsesRequired_--;
    if (this.primaryResponsesRequired_ <= 0) {
      this.log_("Primary connection is healthy.");
      this.isHealthy_ = true;
      this.conn_.markConnectionHealthy();
    }
  }
};
wd.realtime.Connection.prototype.onControl_ = function(controlData) {
  var cmd = wd.core.util.requireKey(MESSAGE_TYPE, controlData);
  if (MESSAGE_DATA in controlData) {
    var payload = controlData[MESSAGE_DATA];
    if (cmd === SERVER_HELLO) {
      this.onHandshake_(payload);
    } else {
      if (cmd === END_TRANSMISSION) {
        this.log_("recvd end transmission on primary");
        this.rx_ = this.secondaryConn_;
        for (var i = 0;i < this.pendingDataMessages.length;++i) {
          this.onDataMessage_(this.pendingDataMessages[i]);
        }
        this.pendingDataMessages = [];
        this.tryCleanupConnection();
      } else {
        if (cmd === CONTROL_SHUTDOWN) {
          this.onConnectionShutdown_(payload);
        } else {
          if (cmd === CONTROL_RESET) {
            this.onReset_(payload);
          } else {
            if (cmd === CONTROL_ERROR) {
              wd.core.util.error("Server Error: " + payload);
            } else {
              if (cmd === CONTROL_PONG) {
                this.log_("got pong on primary.");
                this.onPrimaryResponse_();
                this.sendPingOnPrimaryIfNecessary_();
              } else {
                wd.core.util.error("Unknown control packet command: " + cmd);
              }
            }
          }
        }
      }
    }
  }
};
wd.realtime.Connection.prototype.onHandshake_ = function(handshake) {
  var timestamp = handshake["ts"];
  var version = handshake["v"];
  var host = handshake["h"];
  this.sessionId = handshake["s"];
  this.repoInfo_.updateHost(host);
  if (this.state_ == REALTIME_STATE_CONNECTING) {
    this.conn_.start();
    this.onConnectionEstablished_(this.conn_, timestamp);
    if (wd.realtime.Constants.PROTOCOL_VERSION !== version) {
      wd.core.util.warn("Protocol version mismatch detected");
    }
    this.tryStartUpgrade_();
  }
};
wd.realtime.Connection.prototype.tryStartUpgrade_ = function() {
  var conn = this.transportManager_.upgradeTransport();
  if (conn) {
    this.startUpgrade_(conn);
  }
};
wd.realtime.Connection.prototype.startUpgrade_ = function(conn) {
  this.secondaryConn_ = new conn(this.nextTransportId_(), this.repoInfo_, this.sessionId);
  this.secondaryResponsesRequired_ = conn["responsesRequiredToBeHealthy"] || 0;
  var onMessage = this.connReceiver_(this.secondaryConn_);
  var onDisconnect = this.disconnReceiver_(this.secondaryConn_);
  this.secondaryConn_.open(onMessage, onDisconnect);
  var self = this;
  setTimeout(function() {
    if (self.secondaryConn_) {
      self.log_("Timed out trying to upgrade.");
      self.secondaryConn_.close();
    }
  }, Math.floor(UPGRADE_TIMEOUT));
};
wd.realtime.Connection.prototype.onReset_ = function(host) {
  this.log_("Reset packet received.  New host: " + host);
  this.repoInfo_.updateHost(host);
  if (this.state_ === REALTIME_STATE_CONNECTED) {
    this.close();
  } else {
    this.closeConnections_();
    this.start_();
  }
};
wd.realtime.Connection.prototype.onConnectionEstablished_ = function(conn, timestamp) {
  this.log_("Realtime connection established.");
  this.conn_ = conn;
  this.state_ = REALTIME_STATE_CONNECTED;
  if (this.onReady_) {
    this.onReady_(timestamp);
    this.onReady_ = null;
  }
  var self = this;
  if (this.primaryResponsesRequired_ === 0) {
    this.log_("Primary connection is healthy.");
    this.isHealthy_ = true;
  } else {
    setTimeout(function() {
      self.sendPingOnPrimaryIfNecessary_();
    }, Math.floor(DELAY_BEFORE_SENDING_EXTRA_REQUESTS));
  }
};
wd.realtime.Connection.prototype.sendPingOnPrimaryIfNecessary_ = function() {
  if (!this.isHealthy_ && this.state_ === REALTIME_STATE_CONNECTED) {
    this.log_("sending ping on primary.");
    this.sendData_({"t":"c", "d":{"t":PING, "d":{}}});
  }
};
wd.realtime.Connection.prototype.onSecondaryConnectionLost_ = function() {
  var conn = this.secondaryConn_;
  this.secondaryConn_ = null;
  if (this.tx_ === conn || this.rx_ === conn) {
    this.close();
  }
};
wd.realtime.Connection.prototype.onConnectionLost_ = function(everConnected) {
  this.conn_ = null;
  if (!everConnected && this.state_ === REALTIME_STATE_CONNECTING) {
    this.log_("Realtime connection failed.");
    if (this.repoInfo_.isCacheableHost()) {
      wd.core.storage.PersistentStorage.remove("host:" + this.repoInfo_.host);
      this.repoInfo_.internalHost = this.repoInfo_.host;
    }
  } else {
    if (this.state_ === REALTIME_STATE_CONNECTED) {
      this.log_("Realtime connection lost.");
    }
  }
  this.close();
};
wd.realtime.Connection.prototype.onConnectionShutdown_ = function(reason) {
  this.log_("Connection shutdown command received. Shutting down...");
  if (this.onKill_) {
    this.onKill_(reason);
    this.onKill_ = null;
  }
  this.onDisconnect_ = null;
  this.close();
};
wd.realtime.Connection.prototype.sendData_ = function(data) {
  if (this.state_ !== REALTIME_STATE_CONNECTED) {
    throw "Connection is not connected";
  } else {
    this.tx_.send(data);
  }
};
wd.realtime.Connection.prototype.close = function() {
  if (this.state_ !== REALTIME_STATE_DISCONNECTED) {
    this.log_("Closing realtime connection.");
    this.state_ = REALTIME_STATE_DISCONNECTED;
    this.closeConnections_();
    if (this.onDisconnect_) {
      this.onDisconnect_();
      this.onDisconnect_ = null;
    }
  }
};
wd.realtime.Connection.prototype.closeConnections_ = function() {
  this.log_("Shutting down all connections");
  if (this.conn_) {
    this.conn_.close();
    this.conn_ = null;
  }
  if (this.secondaryConn_) {
    this.secondaryConn_.close();
    this.secondaryConn_ = null;
  }
  if (this.healthyTimeout_) {
    clearTimeout(this.healthyTimeout_);
    this.healthyTimeout_ = null;
  }
};
goog.provide("wd.core.util.VisibilityMonitor");
goog.require("wd.core.util");
goog.require("wd.core.util.EventEmitter");
wd.core.util.VisibilityMonitor = goog.defineClass(wd.core.util.EventEmitter, {constructor:function() {
  wd.core.util.EventEmitter.call(this, ["visible"]);
  var hidden, visibilityChange;
  if (typeof document !== "undefined" && typeof document.addEventListener !== "undefined") {
    if (typeof document["hidden"] !== "undefined") {
      visibilityChange = "visibilitychange";
      hidden = "hidden";
    } else {
      if (typeof document["mozHidden"] !== "undefined") {
        visibilityChange = "mozvisibilitychange";
        hidden = "mozHidden";
      } else {
        if (typeof document["msHidden"] !== "undefined") {
          visibilityChange = "msvisibilitychange";
          hidden = "msHidden";
        } else {
          if (typeof document["webkitHidden"] !== "undefined") {
            visibilityChange = "webkitvisibilitychange";
            hidden = "webkitHidden";
          }
        }
      }
    }
  }
  this.visible_ = true;
  if (visibilityChange) {
    var self = this;
    document.addEventListener(visibilityChange, function() {
      var visible = !document[hidden];
      if (visible !== self.visible_) {
        self.visible_ = visible;
        self.trigger("visible", visible);
      }
    }, false);
  }
}, getInitialEvent:function(eventType) {
  wd.core.util.assert(eventType === "visible", "Unknown event type: " + eventType);
  return [this.visible_];
}});
goog.addSingletonGetter(wd.core.util.VisibilityMonitor);
goog.provide("wd.core.ServerActions");
goog.provide("wd.core.util.OnlineMonitor");
goog.require("wd.core.util");
goog.require("wd.core.util.EventEmitter");
wd.core.util.OnlineMonitor = goog.defineClass(wd.core.util.EventEmitter, {constructor:function() {
  wd.core.util.EventEmitter.call(this, ["online"]);
  this.online_ = true;
  if (typeof window !== "undefined" && typeof window.addEventListener !== "undefined") {
    var self = this;
    window.addEventListener("online", function() {
      if (!self.online_) {
        self.online_ = true;
        self.trigger("online", true);
      }
    }, false);
    window.addEventListener("offline", function() {
      if (self.online_) {
        self.online_ = false;
        self.trigger("online", false);
      }
    }, false);
  }
}, getInitialEvent:function(eventType) {
  wd.core.util.assert(eventType === "online", "Unknown event type: " + eventType);
  return [this.online_];
}, currentlyOnline:function() {
  return this.online_;
}});
goog.addSingletonGetter(wd.core.util.OnlineMonitor);
goog.provide("wd.core.PersistentConnection");
goog.require("wd.core.ServerActions");
goog.require("wd.core.util");
goog.require("wd.core.util.OnlineMonitor");
goog.require("wd.core.util.VisibilityMonitor");
goog.require("wd.login.util.environment");
goog.require("wd.realtime.Connection");
goog.require("wd.util.json");
goog.require("wd.util.jwt");
var RECONNECT_MIN_DELAY = 1E3;
var RECONNECT_MAX_DELAY_DEFAULT = 60 * 5 * 1E3;
var RECONNECT_MAX_DELAY_FOR_ADMINS = 30 * 1E3;
var RECONNECT_DELAY_MULTIPLIER = 1.3;
var RECONNECT_DELAY_RESET_TIMEOUT = 3E4;
wd.core.PersistentConnection = function(repoInfo, onDataUpdate, onConnectStatus, onServerInfoUpdate) {
  this.id = wd.core.PersistentConnection.nextPersistentConnectionId_++;
  this.log_ = wd.core.util.logWrapper("p:" + this.id + ":");
  this.interrupted_ = false;
  this.killed_ = false;
  this.listens_ = {};
  this.outstandingPuts_ = [];
  this.outstandingPutCount_ = 0;
  this.onDisconnectRequestQueue_ = [];
  this.connected_ = false;
  this.reconnectDelay_ = RECONNECT_MIN_DELAY;
  this.maxReconnectDelay_ = RECONNECT_MAX_DELAY_DEFAULT;
  this.onDataUpdate_ = onDataUpdate;
  this.onConnectStatus_ = onConnectStatus;
  this.onServerInfoUpdate_ = onServerInfoUpdate;
  this.repoInfo_ = repoInfo;
  this.securityDebugCallback_ = null;
  this.requestCBHash_ = {};
  this.requestNumber_ = 0;
  this.firstConnection_ = true;
  this.lastConnectionAttemptTime_ = null;
  this.lastConnectionEstablishedTime_ = null;
  this.scheduleConnect_(0);
  wd.core.util.VisibilityMonitor.getInstance().on("visible", this.onVisible_, this);
  if (repoInfo.host.indexOf("wd.ocal") === -1) {
    wd.core.util.OnlineMonitor.getInstance().on("online", this.onOnline_, this);
  }
};
wd.core.PersistentConnection.nextPersistentConnectionId_ = 0;
wd.core.PersistentConnection.nextConnectionId_ = 0;
wd.core.PersistentConnection.prototype.sendRequest = function(action, body, onResponse) {
  var curReqNum = ++this.requestNumber_;
  var msg = {"r":curReqNum, "a":action, "b":body};
  this.log_(wd.util.json.stringify(msg));
  wd.core.util.assert(this.connected_, "sendRequest call when we're not connected not allowed.");
  this.realtime_.sendRequest(msg);
  if (onResponse) {
    this.requestCBHash_[curReqNum] = onResponse;
  }
};
wd.core.PersistentConnection.prototype.listen = function(query, currentHashFn, tag, onComplete) {
  var queryId = query.queryIdentifier();
  var pathString = query.path.toString();
  this.log_("Listen called for " + pathString + " " + queryId);
  this.listens_[pathString] = this.listens_[pathString] || {};
  wd.core.util.assert(!this.listens_[pathString][queryId], "listen() called twice for same path/queryId.");
  var listenSpec = {onComplete:onComplete, hashFn:currentHashFn, query:query, tag:tag};
  this.listens_[pathString][queryId] = listenSpec;
  if (this.connected_) {
    this.sendListen_(listenSpec);
  }
};
wd.core.PersistentConnection.prototype.sendListen_ = function(listenSpec) {
  var query = listenSpec.query;
  var pathString = query.path.toString();
  var queryId = query.queryIdentifier();
  var self = this;
  this.log_("Listen on " + pathString + " for " + queryId);
  var req = {"p":pathString};
  var action = "q";
  if (listenSpec.tag) {
    req["q"] = query.queryObject();
    req["t"] = listenSpec.tag;
  }
  req["h"] = listenSpec.hashFn();
  this.sendRequest(action, req, function(message) {
    var payload = message["d"];
    var status = message["s"];
    self.warnOnListenWarnings_(payload, query);
    var currentListenSpec = self.listens_[pathString] && self.listens_[pathString][queryId];
    if (currentListenSpec === listenSpec) {
      self.log_("listen response", message);
      if (status !== "ok") {
        self.removeListen_(pathString, queryId);
      }
      if (listenSpec.onComplete) {
        listenSpec.onComplete(status, payload);
      }
    }
  });
};
wd.core.PersistentConnection.prototype.warnOnListenWarnings_ = function(payload, query) {
  if (payload && typeof payload === "object" && wd.util.obj.contains(payload, "w")) {
    var warnings = wd.util.obj.get(payload, "w");
    if (goog.isArray(warnings) && goog.array.contains(warnings, "no_index")) {
      var indexSpec = '".indexOn": "' + query.getQueryParams().getIndex().toString() + '"';
      var indexPath = query.path.toString();
      wd.core.util.warn("Using an unspecified index. Consider adding " + indexSpec + " at " + indexPath + " to your security rules for better performance");
    }
  }
};
wd.core.PersistentConnection.prototype.auth = function(cred, opt_callback, opt_cancelCallback) {
  this.credential_ = {cred:cred, firstRequestSent:false, callback:opt_callback, cancelCallback:opt_cancelCallback};
  this.log_("Authenticating using credential: " + cred);
  this.tryAuth();
  this.reduceReconnectDelayIfAdminCredential_(cred);
};
wd.core.PersistentConnection.prototype.reduceReconnectDelayIfAdminCredential_ = function(credential) {
  var isFirebaseSecret = credential.length == 40;
  if (isFirebaseSecret || wd.util.jwt.isAdmin(credential)) {
    this.log_("Admin auth credential detected.  Reducing max reconnect time.");
    this.maxReconnectDelay_ = RECONNECT_MAX_DELAY_FOR_ADMINS;
  }
};
wd.core.PersistentConnection.prototype.unauth = function(onComplete) {
  delete this.credential_;
  if (this.connected_) {
    this.sendRequest("unauth", {}, function(result) {
      var status = result["s"];
      var errorReason = result["d"];
      onComplete(status, errorReason);
    });
  }
};
wd.core.PersistentConnection.prototype.tryAuth = function() {
  var authdata = this.credential_;
  var self = this;
  if (this.connected_ && authdata) {
    var requestData = {"cred":authdata.cred};
    this.sendRequest("auth", requestData, function(res) {
      var status = res["s"];
      var data = res["d"] || "error";
      if (status !== "ok" && self.credential_ === authdata) {
        delete self.credential_;
      }
      if (!authdata.firstRequestSent) {
        authdata.firstRequestSent = true;
        if (authdata.callback) {
          authdata.callback(status, data);
        }
      } else {
        if (status !== "ok" && authdata.cancelCallback) {
          authdata.cancelCallback(status, data);
        }
      }
    });
  }
};
wd.core.PersistentConnection.prototype.unlisten = function(query, tag) {
  var pathString = query.path.toString();
  var queryId = query.queryIdentifier();
  this.log_("Unlisten called for " + pathString + " " + queryId);
  var listen = this.removeListen_(pathString, queryId);
  if (listen && this.connected_) {
    this.sendUnlisten_(pathString, queryId, query.queryObject(), tag);
  }
};
wd.core.PersistentConnection.prototype.sendUnlisten_ = function(pathString, queryId, queryObj, tag) {
  this.log_("Unlisten on " + pathString + " for " + queryId);
  var self = this;
  var req = {"p":pathString};
  var action = "n";
  if (tag) {
    req["q"] = queryObj;
    req["t"] = tag;
  }
  this.sendRequest(action, req);
};
wd.core.PersistentConnection.prototype.onDisconnectPut = function(pathString, data, opt_onComplete) {
  if (this.connected_) {
    this.sendOnDisconnect_("o", pathString, data, opt_onComplete);
  } else {
    this.onDisconnectRequestQueue_.push({pathString:pathString, action:"o", data:data, onComplete:opt_onComplete});
  }
};
wd.core.PersistentConnection.prototype.onDisconnectMerge = function(pathString, data, opt_onComplete) {
  if (this.connected_) {
    this.sendOnDisconnect_("om", pathString, data, opt_onComplete);
  } else {
    this.onDisconnectRequestQueue_.push({pathString:pathString, action:"om", data:data, onComplete:opt_onComplete});
  }
};
wd.core.PersistentConnection.prototype.onDisconnectCancel = function(pathString, opt_onComplete) {
  if (this.connected_) {
    this.sendOnDisconnect_("oc", pathString, null, opt_onComplete);
  } else {
    this.onDisconnectRequestQueue_.push({pathString:pathString, action:"oc", data:null, onComplete:opt_onComplete});
  }
};
wd.core.PersistentConnection.prototype.sendOnDisconnect_ = function(action, pathString, data, opt_onComplete) {
  var self = this;
  var request = {"p":pathString, "d":data};
  self.log_("onDisconnect " + action, request);
  this.sendRequest(action, request, function(response) {
    if (opt_onComplete) {
      setTimeout(function() {
        opt_onComplete(response["s"], response["d"]);
      }, Math.floor(0));
    }
  });
};
wd.core.PersistentConnection.prototype.put = function(pathString, data, opt_onComplete, opt_hash) {
  this.putInternal("p", pathString, data, opt_onComplete, opt_hash);
};
wd.core.PersistentConnection.prototype.merge = function(pathString, data, onComplete, opt_hash) {
  this.putInternal("m", pathString, data, onComplete, opt_hash);
};
wd.core.PersistentConnection.prototype.putInternal = function(action, pathString, data, opt_onComplete, opt_hash) {
  var request = {"p":pathString, "d":data};
  if (goog.isDef(opt_hash)) {
    request["h"] = opt_hash;
  }
  this.outstandingPuts_.push({action:action, request:request, onComplete:opt_onComplete});
  this.outstandingPutCount_++;
  var index = this.outstandingPuts_.length - 1;
  if (this.connected_) {
    this.sendPut_(index);
  } else {
    this.log_("Buffering put: " + pathString);
  }
};
wd.core.PersistentConnection.prototype.sendPut_ = function(index) {
  var self = this;
  var action = this.outstandingPuts_[index].action;
  var request = this.outstandingPuts_[index].request;
  var onComplete = this.outstandingPuts_[index].onComplete;
  this.outstandingPuts_[index].queued = this.connected_;
  this.sendRequest(action, request, function(message) {
    self.log_(action + " response", message);
    delete self.outstandingPuts_[index];
    self.outstandingPutCount_--;
    if (self.outstandingPutCount_ === 0) {
      self.outstandingPuts_ = [];
    }
    if (onComplete) {
      onComplete(message["s"], message["d"]);
    }
  });
};
wd.core.PersistentConnection.prototype.reportStats = function(stats) {
  if (this.connected_) {
    var request = {"c":stats};
    this.log_("reportStats", request);
    var self = this;
    this.sendRequest("s", request, function(result) {
      var status = result["s"];
      if (status !== "ok") {
        var errorReason = result["d"];
        self.log_("reportStats", "Error sending stats: " + errorReason);
      }
    });
  }
};
wd.core.PersistentConnection.prototype.onDataMessage_ = function(message) {
  if ("r" in message) {
    this.log_("from server: " + wd.util.json.stringify(message));
    var reqNum = message["r"];
    var onResponse = this.requestCBHash_[reqNum];
    if (onResponse) {
      delete this.requestCBHash_[reqNum];
      onResponse(message["b"]);
    }
  } else {
    if ("error" in message) {
      throw "A server-side error has occurred: " + message["error"];
    } else {
      if ("a" in message) {
        this.onDataPush_(message["a"], message["b"]);
      }
    }
  }
};
wd.core.PersistentConnection.prototype.onDataPush_ = function(action, body) {
  this.log_("handleServerMessage", action, body);
  if (action === "d") {
    this.onDataUpdate_(body["p"], body["d"], false, body["t"]);
  } else {
    if (action === "m") {
      this.onDataUpdate_(body["p"], body["d"], true, body["t"]);
    } else {
      if (action === "c") {
        this.onListenRevoked_(body["p"], body["q"]);
      } else {
        if (action === "ac") {
          this.onAuthRevoked_(body["s"], body["d"]);
        } else {
          if (action === "sd") {
            this.onSecurityDebugPacket_(body);
          } else {
            wd.core.util.error("Unrecognized action received from server: " + wd.util.json.stringify(action) + "\nAre you using the latest client?");
          }
        }
      }
    }
  }
};
wd.core.PersistentConnection.prototype.onReady_ = function(timestamp) {
  this.log_("connection ready");
  this.connected_ = true;
  this.lastConnectionEstablishedTime_ = (new Date).getTime();
  this.handleTimestamp_(timestamp);
  if (this.firstConnection_) {
    this.sendConnectStats_();
  }
  this.restoreState_();
  this.firstConnection_ = false;
  this.onConnectStatus_(true);
};
wd.core.PersistentConnection.prototype.scheduleConnect_ = function(timeout) {
  wd.core.util.assert(!this.realtime_, "Scheduling a connect when we're already connected/ing?");
  if (this.establishConnectionTimer_) {
    clearTimeout(this.establishConnectionTimer_);
  }
  var self = this;
  this.establishConnectionTimer_ = setTimeout(function() {
    self.establishConnectionTimer_ = null;
    self.establishConnection_();
  }, Math.floor(timeout));
};
wd.core.PersistentConnection.prototype.onVisible_ = function(visible) {
  if (visible && !this.visible_ && this.reconnectDelay_ === this.maxReconnectDelay_) {
    this.log_("Window became visible.  Reducing delay.");
    this.reconnectDelay_ = RECONNECT_MIN_DELAY;
    if (!this.realtime_) {
      this.scheduleConnect_(0);
    }
  }
  this.visible_ = visible;
};
wd.core.PersistentConnection.prototype.onOnline_ = function(online) {
  if (online) {
    this.log_("Browser went online.");
    this.reconnectDelay_ = RECONNECT_MIN_DELAY;
    if (!this.realtime_) {
      this.scheduleConnect_(0);
    }
  } else {
    this.log_("Browser went offline.  Killing connection.");
    if (this.realtime_) {
      this.realtime_.close();
    }
  }
};
wd.core.PersistentConnection.prototype.onRealtimeDisconnect_ = function() {
  this.log_("data client disconnected");
  this.connected_ = false;
  this.realtime_ = null;
  this.cancelSentTransactions_();
  this.requestCBHash_ = {};
  if (this.shouldReconnect_()) {
    if (!this.visible_) {
      this.log_("Window isn't visible.  Delaying reconnect.");
      this.reconnectDelay_ = this.maxReconnectDelay_;
      this.lastConnectionAttemptTime_ = (new Date).getTime();
    } else {
      if (this.lastConnectionEstablishedTime_) {
        var timeSinceLastConnectSucceeded = (new Date).getTime() - this.lastConnectionEstablishedTime_;
        if (timeSinceLastConnectSucceeded > RECONNECT_DELAY_RESET_TIMEOUT) {
          this.reconnectDelay_ = RECONNECT_MIN_DELAY;
        }
        this.lastConnectionEstablishedTime_ = null;
      }
    }
    var timeSinceLastConnectAttempt = (new Date).getTime() - this.lastConnectionAttemptTime_;
    var reconnectDelay = Math.max(0, this.reconnectDelay_ - timeSinceLastConnectAttempt);
    reconnectDelay = Math.random() * reconnectDelay;
    this.log_("Trying to reconnect in " + reconnectDelay + "ms");
    this.scheduleConnect_(reconnectDelay);
    this.reconnectDelay_ = Math.min(this.maxReconnectDelay_, this.reconnectDelay_ * RECONNECT_DELAY_MULTIPLIER);
  }
  this.onConnectStatus_(false);
};
wd.core.PersistentConnection.prototype.establishConnection_ = function() {
  if (this.shouldReconnect_()) {
    this.log_("Making a connection attempt");
    this.lastConnectionAttemptTime_ = (new Date).getTime();
    this.lastConnectionEstablishedTime_ = null;
    var onDataMessage = goog.bind(this.onDataMessage_, this);
    var onReady = goog.bind(this.onReady_, this);
    var onDisconnect = goog.bind(this.onRealtimeDisconnect_, this);
    var connId = this.id + ":" + wd.core.PersistentConnection.nextConnectionId_++;
    var self = this;
    this.realtime_ = new wd.realtime.Connection(connId, this.repoInfo_, onDataMessage, onReady, onDisconnect, function(reason) {
      wd.core.util.warn(reason + " (" + self.repoInfo_.toString() + ")");
      self.killed_ = true;
    });
  }
};
wd.core.PersistentConnection.prototype.interrupt = function() {
  this.interrupted_ = true;
  if (this.realtime_) {
    this.realtime_.close();
  } else {
    if (this.establishConnectionTimer_) {
      clearTimeout(this.establishConnectionTimer_);
      this.establishConnectionTimer_ = null;
    }
    if (this.connected_) {
      this.onRealtimeDisconnect_();
    }
  }
};
wd.core.PersistentConnection.prototype.resume = function() {
  this.interrupted_ = false;
  this.reconnectDelay_ = RECONNECT_MIN_DELAY;
  if (!this.realtime_) {
    this.scheduleConnect_(0);
  }
};
wd.core.PersistentConnection.prototype.handleTimestamp_ = function(timestamp) {
  var delta = timestamp - (new Date).getTime();
  this.onServerInfoUpdate_({"serverTimeOffset":delta});
};
wd.core.PersistentConnection.prototype.cancelSentTransactions_ = function() {
  for (var i = 0;i < this.outstandingPuts_.length;i++) {
    var put = this.outstandingPuts_[i];
    if (put && "h" in put.request && put.queued) {
      if (put.onComplete) {
        put.onComplete("disconnect");
      }
      delete this.outstandingPuts_[i];
      this.outstandingPutCount_--;
    }
  }
  if (this.outstandingPutCount_ === 0) {
    this.outstandingPuts_ = [];
  }
};
wd.core.PersistentConnection.prototype.onListenRevoked_ = function(pathString, opt_query) {
  var queryId;
  if (!opt_query) {
    queryId = "default";
  } else {
    queryId = goog.array.map(opt_query, function(q) {
      return wd.core.util.ObjectToUniqueKey(q);
    }).join("$");
  }
  var listen = this.removeListen_(pathString, queryId);
  if (listen && listen.onComplete) {
    listen.onComplete("permission_denied");
  }
};
wd.core.PersistentConnection.prototype.removeListen_ = function(pathString, queryId) {
  var normalizedPathString = (new wd.core.util.Path(pathString)).toString();
  var listen;
  if (goog.isDef(this.listens_[normalizedPathString])) {
    listen = this.listens_[normalizedPathString][queryId];
    delete this.listens_[normalizedPathString][queryId];
    if (goog.object.getCount(this.listens_[normalizedPathString]) === 0) {
      delete this.listens_[normalizedPathString];
    }
  } else {
    listen = undefined;
  }
  return listen;
};
wd.core.PersistentConnection.prototype.onAuthRevoked_ = function(statusCode, explanation) {
  var cred = this.credential_;
  delete this.credential_;
  if (cred && cred.cancelCallback) {
    cred.cancelCallback(statusCode, explanation);
  }
};
wd.core.PersistentConnection.prototype.onSecurityDebugPacket_ = function(body) {
  if (this.securityDebugCallback_) {
    this.securityDebugCallback_(body);
  } else {
    if ("msg" in body && typeof console !== "undefined") {
      console.log("WILDDOG: " + body["msg"].replace("\n", "\nWILDDOG: "));
    }
  }
};
wd.core.PersistentConnection.prototype.restoreState_ = function() {
  this.tryAuth();
  var self = this;
  goog.object.forEach(this.listens_, function(queries, pathString) {
    goog.object.forEach(queries, function(listenSpec) {
      self.sendListen_(listenSpec);
    });
  });
  for (var i = 0;i < this.outstandingPuts_.length;i++) {
    if (this.outstandingPuts_[i]) {
      this.sendPut_(i);
    }
  }
  while (this.onDisconnectRequestQueue_.length) {
    var request = this.onDisconnectRequestQueue_.shift();
    this.sendOnDisconnect_(request.action, request.pathString, request.data, request.onComplete);
  }
};
wd.core.PersistentConnection.prototype.sendConnectStats_ = function() {
  var stats = {};
  stats["sdk.js." + CLIENT_VERSION.replace(/\./g, "-")] = 1;
  if (wd.login.util.environment.isMobileCordova()) {
    stats["framework.cordova"] = 1;
  }
  this.reportStats(stats);
};
wd.core.PersistentConnection.prototype.shouldReconnect_ = function() {
  var online = wd.core.util.OnlineMonitor.getInstance().currentlyOnline();
  return !this.killed_ && !this.interrupted_ && online;
};
goog.provide("wd.core.util.Tree");
goog.require("wd.core.util");
goog.require("wd.core.util.Path");
goog.require("wd.util.obj");
goog.require("goog.object");
wd.core.util.TreeNode = goog.defineClass(null, {constructor:function() {
  this.children = {};
  this.childCount = 0;
  this.value = null;
}});
wd.core.util.Tree = goog.defineClass(null, {constructor:function(opt_name, opt_parent, opt_node) {
  this.name_ = opt_name ? opt_name : "";
  this.parent_ = opt_parent ? opt_parent : null;
  this.node_ = opt_node ? opt_node : new wd.core.util.TreeNode;
}, subTree:function(pathObj) {
  var path = pathObj instanceof wd.core.util.Path ? pathObj : new wd.core.util.Path(pathObj);
  var child = this, next;
  while ((next = path.getFront()) !== null) {
    var childNode = wd.util.obj.get(child.node_.children, next) || new wd.core.util.TreeNode;
    child = new wd.core.util.Tree(next, child, childNode);
    path = path.popFront();
  }
  return child;
}, getValue:function() {
  return this.node_.value;
}, setValue:function(value) {
  wd.core.util.assert(typeof value !== "undefined", "Cannot set value to undefined");
  this.node_.value = value;
  this.updateParents_();
}, clear:function() {
  this.node_.value = null;
  this.node_.children = {};
  this.node_.childCount = 0;
  this.updateParents_();
}, hasChildren:function() {
  return this.node_.childCount > 0;
}, isEmpty:function() {
  return this.getValue() === null && !this.hasChildren();
}, forEachChild:function(action) {
  var self = this;
  goog.object.forEach(this.node_.children, function(childTree, child) {
    action(new wd.core.util.Tree(child, self, childTree));
  });
}, forEachDescendant:function(action, opt_includeSelf, opt_childrenFirst) {
  if (opt_includeSelf && !opt_childrenFirst) {
    action(this);
  }
  this.forEachChild(function(child) {
    child.forEachDescendant(action, true, opt_childrenFirst);
  });
  if (opt_includeSelf && opt_childrenFirst) {
    action(this);
  }
}, forEachAncestor:function(action, opt_includeSelf) {
  var node = opt_includeSelf ? this : this.parent();
  while (node !== null) {
    if (action(node)) {
      return true;
    }
    node = node.parent();
  }
  return false;
}, forEachImmediateDescendantWithValue:function(action) {
  this.forEachChild(function(child) {
    if (child.getValue() !== null) {
      action(child);
    } else {
      child.forEachImmediateDescendantWithValue(action);
    }
  });
}, path:function() {
  return new wd.core.util.Path(this.parent_ === null ? this.name_ : this.parent_.path() + "/" + this.name_);
}, name:function() {
  return this.name_;
}, parent:function() {
  return this.parent_;
}, updateParents_:function() {
  if (this.parent_ !== null) {
    this.parent_.updateChild_(this.name_, this);
  }
}, updateChild_:function(childName, child) {
  var childEmpty = child.isEmpty();
  var childExists = wd.util.obj.contains(this.node_.children, childName);
  if (childEmpty && childExists) {
    delete this.node_.children[childName];
    this.node_.childCount--;
    this.updateParents_();
  } else {
    if (!childEmpty && !childExists) {
      this.node_.children[childName] = child.node_;
      this.node_.childCount++;
      this.updateParents_();
    }
  }
}});
goog.provide("wd.core.Repo");
goog.require("wd.api.DataSnapshot");
goog.require("wd.core.PersistentConnection");
goog.require("wd.core.ReadonlyRestClient");
goog.require("wd.core.SnapshotHolder");
goog.require("wd.core.SparseSnapshotTree");
goog.require("wd.core.SyncTree");
goog.require("wd.core.stats.StatsCollection");
goog.require("wd.core.stats.StatsListener");
goog.require("wd.core.stats.StatsManager");
goog.require("wd.core.stats.StatsReporter");
goog.require("wd.core.util");
goog.require("wd.core.util.ServerValues");
goog.require("wd.core.util.Tree");
goog.require("wd.core.view.EventQueue");
goog.require("wd.login.AuthenticationManager");
goog.require("wd.util.json");
goog.require("wd.util.jwt");
goog.require("goog.string");
wd.core.Repo = function(repoInfo, forceRestClient) {
  this.repoInfo_ = repoInfo;
  this.stats_ = wd.core.stats.StatsManager.getCollection(repoInfo);
  this.eventQueue_ = new wd.core.view.EventQueue;
  this.nextWriteId_ = 1;
  this.persistentConnection_ = null;
  this.server_;
  if (forceRestClient || wd.core.util.beingCrawled()) {
    this.server_ = new wd.core.ReadonlyRestClient(this.repoInfo_, goog.bind(this.onDataUpdate_, this));
    setTimeout(goog.bind(this.onConnectStatus_, this, true), 0);
  } else {
    this.persistentConnection_ = new wd.core.PersistentConnection(this.repoInfo_, goog.bind(this.onDataUpdate_, this), goog.bind(this.onConnectStatus_, this), goog.bind(this.onServerInfoUpdate_, this));
    this.server_ = this.persistentConnection_;
  }
  this.statsReporter_ = wd.core.stats.StatsManager.getOrCreateReporter(repoInfo, goog.bind(function() {
    return new wd.core.stats.StatsReporter(this.stats_, this.server_);
  }, this));
  this.transactions_init_();
  this.infoData_ = new wd.core.SnapshotHolder;
  var self = this;
  this.infoSyncTree_ = new wd.core.SyncTree({startListening:function(query, tag, currentHashFn, onComplete) {
    var infoEvents = [];
    var node = self.infoData_.getNode(query.path);
    if (!node.isEmpty()) {
      infoEvents = self.infoSyncTree_.applyServerOverwrite(query.path, node);
      setTimeout(function() {
        onComplete("ok");
      }, 0);
    }
    return infoEvents;
  }, stopListening:goog.nullFunction});
  this.updateInfo_("connected", false);
  this.onDisconnect_ = new wd.core.SparseSnapshotTree;
  this.auth = new wd.login.AuthenticationManager(repoInfo, goog.bind(this.server_.auth, this.server_), goog.bind(this.server_.unauth, this.server_), goog.bind(this.onAuthStatus_, this));
  this.dataUpdateCount = 0;
  this.interceptServerDataCallback_ = null;
  this.serverSyncTree_ = new wd.core.SyncTree({startListening:function(query, tag, currentHashFn, onComplete) {
    self.server_.listen(query, currentHashFn, tag, function(status, data) {
      var events = onComplete(status, data);
      self.eventQueue_.raiseEventsForChangedPath(query.path, events);
    });
    return [];
  }, stopListening:function(query, tag) {
    self.server_.unlisten(query, tag);
  }});
};
wd.core.Repo.prototype.toString = function() {
  return (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host;
};
wd.core.Repo.prototype.name = function() {
  return this.repoInfo_.namespace;
};
wd.core.Repo.prototype.serverTime = function() {
  var offsetNode = this.infoData_.getNode(new wd.core.util.Path(".info/serverTimeOffset"));
  var offset = offsetNode.val() || 0;
  return (new Date).getTime() + offset;
};
wd.core.Repo.prototype.generateServerValues = function() {
  return wd.core.util.ServerValues.generateWithValues({"timestamp":this.serverTime()});
};
wd.core.Repo.prototype.onDataUpdate_ = function(pathString, data, isMerge, tag) {
  this.dataUpdateCount++;
  var path = new wd.core.util.Path(pathString);
  data = this.interceptServerDataCallback_ ? this.interceptServerDataCallback_(pathString, data) : data;
  var events = [];
  if (tag) {
    if (isMerge) {
      var taggedChildren = goog.object.map(data, function(raw) {
        return wd.core.snap.NodeFromJSON(raw);
      });
      events = this.serverSyncTree_.applyTaggedQueryMerge(path, taggedChildren, tag);
    } else {
      var taggedSnap = wd.core.snap.NodeFromJSON(data);
      events = this.serverSyncTree_.applyTaggedQueryOverwrite(path, taggedSnap, tag);
    }
  } else {
    if (isMerge) {
      var changedChildren = goog.object.map(data, function(raw) {
        return wd.core.snap.NodeFromJSON(raw);
      });
      events = this.serverSyncTree_.applyServerMerge(path, changedChildren);
    } else {
      var snap = wd.core.snap.NodeFromJSON(data);
      events = this.serverSyncTree_.applyServerOverwrite(path, snap);
    }
  }
  var affectedPath = path;
  if (events.length > 0) {
    affectedPath = this.rerunTransactions_(path);
  }
  this.eventQueue_.raiseEventsForChangedPath(affectedPath, events);
};
wd.core.Repo.prototype.interceptServerData_ = function(callback) {
  this.interceptServerDataCallback_ = callback;
};
wd.core.Repo.prototype.onConnectStatus_ = function(connectStatus) {
  this.updateInfo_("connected", connectStatus);
  if (connectStatus === false) {
    this.runOnDisconnectEvents_();
  }
};
wd.core.Repo.prototype.onServerInfoUpdate_ = function(updates) {
  var self = this;
  wd.core.util.each(updates, function(value, key) {
    self.updateInfo_(key, value);
  });
};
wd.core.Repo.prototype.onAuthStatus_ = function(authStatus) {
  this.updateInfo_("authenticated", authStatus);
};
wd.core.Repo.prototype.updateInfo_ = function(pathString, value) {
  var path = new wd.core.util.Path("/.info/" + pathString);
  var newNode = wd.core.snap.NodeFromJSON(value);
  this.infoData_.updateSnapshot(path, newNode);
  var events = this.infoSyncTree_.applyServerOverwrite(path, newNode);
  this.eventQueue_.raiseEventsForChangedPath(path, events);
};
wd.core.Repo.prototype.getNextWriteId_ = function() {
  return this.nextWriteId_++;
};
wd.core.Repo.prototype.setWithPriority = function(path, newVal, newPriority, onComplete) {
  this.log_("set", {path:path.toString(), value:newVal, priority:newPriority});
  var serverValues = this.generateServerValues();
  var newNodeUnresolved = wd.core.snap.NodeFromJSON(newVal, newPriority);
  var newNode = wd.core.util.ServerValues.resolveDeferredValueSnapshot(newNodeUnresolved, serverValues);
  var writeId = this.getNextWriteId_();
  var events = this.serverSyncTree_.applyUserOverwrite(path, newNode, writeId, true);
  this.eventQueue_.queueEvents(events);
  var self = this;
  this.server_.put(path.toString(), newNodeUnresolved.val(true), function(status, errorReason) {
    var success = status === "ok";
    if (!success) {
      wd.core.util.warn("set at " + path + " failed: " + status);
    }
    var clearEvents = self.serverSyncTree_.ackUserWrite(writeId, !success);
    self.eventQueue_.raiseEventsForChangedPath(path, clearEvents);
    self.callOnCompleteCallback(onComplete, status, errorReason);
  });
  var affectedPath = this.abortTransactions_(path);
  this.rerunTransactions_(affectedPath);
  this.eventQueue_.raiseEventsForChangedPath(affectedPath, []);
};
wd.core.Repo.prototype.update = function(path, childrenToMerge, onComplete) {
  this.log_("update", {path:path.toString(), value:childrenToMerge});
  var empty = true;
  var serverValues = this.generateServerValues();
  var changedChildren = {};
  goog.object.forEach(childrenToMerge, function(changedValue, changedKey) {
    empty = false;
    var newNodeUnresolved = wd.core.snap.NodeFromJSON(changedValue);
    changedChildren[changedKey] = wd.core.util.ServerValues.resolveDeferredValueSnapshot(newNodeUnresolved, serverValues);
  });
  if (!empty) {
    var writeId = this.getNextWriteId_();
    var events = this.serverSyncTree_.applyUserMerge(path, changedChildren, writeId);
    this.eventQueue_.queueEvents(events);
    var self = this;
    this.server_.merge(path.toString(), childrenToMerge, function(status, errorReason) {
      var success = status === "ok";
      if (!success) {
        wd.core.util.warn("update at " + path + " failed: " + status);
      }
      var clearEvents = self.serverSyncTree_.ackUserWrite(writeId, !success);
      var affectedPath = path;
      if (clearEvents.length > 0) {
        affectedPath = self.rerunTransactions_(path);
      }
      self.eventQueue_.raiseEventsForChangedPath(affectedPath, clearEvents);
      self.callOnCompleteCallback(onComplete, status, errorReason);
    });
    var affectedPath = this.abortTransactions_(path);
    this.rerunTransactions_(affectedPath);
    this.eventQueue_.raiseEventsForChangedPath(path, []);
  } else {
    wd.core.util.log("update() called with empty data.  Don't do anything.");
    this.callOnCompleteCallback(onComplete, "ok");
  }
};
wd.core.Repo.prototype.runOnDisconnectEvents_ = function() {
  this.log_("onDisconnectEvents");
  var self = this;
  var serverValues = this.generateServerValues();
  var resolvedOnDisconnectTree = wd.core.util.ServerValues.resolveDeferredValueTree(this.onDisconnect_, serverValues);
  var events = [];
  resolvedOnDisconnectTree.forEachTree(wd.core.util.Path.Empty, function(path, snap) {
    events = events.concat(self.serverSyncTree_.applyServerOverwrite(path, snap));
    var affectedPath = self.abortTransactions_(path);
    self.rerunTransactions_(affectedPath);
  });
  this.onDisconnect_ = new wd.core.SparseSnapshotTree;
  this.eventQueue_.raiseEventsForChangedPath(wd.core.util.Path.Empty, events);
};
wd.core.Repo.prototype.onDisconnectCancel = function(path, onComplete) {
  var self = this;
  this.server_.onDisconnectCancel(path.toString(), function(status, errorReason) {
    if (status === "ok") {
      self.onDisconnect_.forget(path);
    }
    self.callOnCompleteCallback(onComplete, status, errorReason);
  });
};
wd.core.Repo.prototype.onDisconnectSet = function(path, value, onComplete) {
  var self = this;
  var newNode = wd.core.snap.NodeFromJSON(value);
  this.server_.onDisconnectPut(path.toString(), newNode.val(true), function(status, errorReason) {
    if (status === "ok") {
      self.onDisconnect_.remember(path, newNode);
    }
    self.callOnCompleteCallback(onComplete, status, errorReason);
  });
};
wd.core.Repo.prototype.onDisconnectSetWithPriority = function(path, value, priority, onComplete) {
  var self = this;
  var newNode = wd.core.snap.NodeFromJSON(value, priority);
  this.server_.onDisconnectPut(path.toString(), newNode.val(true), function(status, errorReason) {
    if (status === "ok") {
      self.onDisconnect_.remember(path, newNode);
    }
    self.callOnCompleteCallback(onComplete, status, errorReason);
  });
};
wd.core.Repo.prototype.onDisconnectUpdate = function(path, childrenToMerge, onComplete) {
  var empty = true;
  for (var childName in childrenToMerge) {
    empty = false;
  }
  if (empty) {
    wd.core.util.log("onDisconnect().update() called with empty data.  Don't do anything.");
    this.callOnCompleteCallback(onComplete, "ok");
    return;
  }
  var self = this;
  this.server_.onDisconnectMerge(path.toString(), childrenToMerge, function(status, errorReason) {
    if (status === "ok") {
      for (var childName in childrenToMerge) {
        var newChildNode = wd.core.snap.NodeFromJSON(childrenToMerge[childName]);
        self.onDisconnect_.remember(path.child(childName), newChildNode);
      }
    }
    self.callOnCompleteCallback(onComplete, status, errorReason);
  });
};
wd.core.Repo.prototype.addEventCallbackForQuery = function(query, eventRegistration) {
  var events;
  if (query.path.getFront() === ".info") {
    events = this.infoSyncTree_.addEventRegistration(query, eventRegistration);
  } else {
    events = this.serverSyncTree_.addEventRegistration(query, eventRegistration);
  }
  this.eventQueue_.raiseEventsAtPath(query.path, events);
};
wd.core.Repo.prototype.removeEventCallbackForQuery = function(query, eventRegistration) {
  var events;
  if (query.path.getFront() === ".info") {
    events = this.infoSyncTree_.removeEventRegistration(query, eventRegistration);
  } else {
    events = this.serverSyncTree_.removeEventRegistration(query, eventRegistration);
  }
  this.eventQueue_.raiseEventsAtPath(query.path, events);
};
wd.core.Repo.prototype.interrupt = function() {
  if (this.persistentConnection_) {
    this.persistentConnection_.interrupt();
  }
};
wd.core.Repo.prototype.resume = function() {
  if (this.persistentConnection_) {
    this.persistentConnection_.resume();
  }
};
wd.core.Repo.prototype.stats = function(showDelta) {
  if (typeof console === "undefined") {
    return;
  }
  var stats;
  if (showDelta) {
    if (!this.statsListener_) {
      this.statsListener_ = new wd.core.stats.StatsListener(this.stats_);
    }
    stats = this.statsListener_.get();
  } else {
    stats = this.stats_.get();
  }
  var longestName = goog.array.reduce(goog.object.getKeys(stats), function(previousValue, currentValue, index, array) {
    return Math.max(currentValue.length, previousValue);
  }, 0);
  for (var stat in stats) {
    var value = stats[stat];
    for (var i = stat.length;i < longestName + 2;i++) {
      stat += " ";
    }
    console.log(stat + value);
  }
};
wd.core.Repo.prototype.statsIncrementCounter = function(metric) {
  this.stats_.incrementCounter(metric);
  this.statsReporter_.includeStat(metric);
};
wd.core.Repo.prototype.log_ = function(var_args) {
  var prefix = "";
  if (this.persistentConnection_) {
    prefix = this.persistentConnection_.id + ":";
  }
  wd.core.util.log(prefix, arguments);
};
wd.core.Repo.prototype.callOnCompleteCallback = function(callback, status, errorReason) {
  if (callback) {
    wd.core.util.exceptionGuard(function() {
      if (status == "ok") {
        callback(null);
      } else {
        var code = (status || "error").toUpperCase();
        var message = code;
        if (errorReason) {
          message += ": " + errorReason;
        }
        var error = new Error(message);
        error.code = code;
        callback(error);
      }
    });
  }
};
goog.provide("wd.api.TEST_ACCESS");
goog.require("wd.core.PersistentConnection");
wd.api.TEST_ACCESS.DataConnection = wd.core.PersistentConnection;
goog.exportProperty(wd.api.TEST_ACCESS, "DataConnection", wd.api.TEST_ACCESS.DataConnection);
wd.core.PersistentConnection.prototype.simpleListen = function(pathString, onComplete) {
  this.sendRequest("q", {"p":pathString}, onComplete);
};
goog.exportProperty(wd.api.TEST_ACCESS.DataConnection.prototype, "simpleListen", wd.api.TEST_ACCESS.DataConnection.prototype.simpleListen);
wd.core.PersistentConnection.prototype.echo = function(data, onEcho) {
  this.sendRequest("echo", {"d":data}, onEcho);
};
goog.exportProperty(wd.api.TEST_ACCESS.DataConnection.prototype, "echo", wd.api.TEST_ACCESS.DataConnection.prototype.echo);
goog.exportProperty(wd.core.PersistentConnection.prototype, "interrupt", wd.core.PersistentConnection.prototype.interrupt);
wd.api.TEST_ACCESS.RealTimeConnection = wd.realtime.Connection;
goog.exportProperty(wd.api.TEST_ACCESS, "RealTimeConnection", wd.api.TEST_ACCESS.RealTimeConnection);
goog.exportProperty(wd.realtime.Connection.prototype, "sendRequest", wd.realtime.Connection.prototype.sendRequest);
goog.exportProperty(wd.realtime.Connection.prototype, "close", wd.realtime.Connection.prototype.close);
wd.api.TEST_ACCESS.hijackHash = function(newHash) {
  var oldPut = wd.core.PersistentConnection.prototype.put;
  wd.core.PersistentConnection.prototype.put = function(pathString, data, opt_onComplete, opt_hash) {
    if (goog.isDef(opt_hash)) {
      opt_hash = newHash();
    }
    oldPut.call(this, pathString, data, opt_onComplete, opt_hash);
  };
  return function() {
    wd.core.PersistentConnection.prototype.put = oldPut;
  };
};
goog.exportProperty(wd.api.TEST_ACCESS, "hijackHash", wd.api.TEST_ACCESS.hijackHash);
wd.api.TEST_ACCESS.ConnectionTarget = wd.core.RepoInfo;
goog.exportProperty(wd.api.TEST_ACCESS, "ConnectionTarget", wd.api.TEST_ACCESS.ConnectionTarget);
wd.api.TEST_ACCESS.queryIdentifier = function(query) {
  return query.queryIdentifier();
};
goog.exportProperty(wd.api.TEST_ACCESS, "queryIdentifier", wd.api.TEST_ACCESS.queryIdentifier);
wd.api.TEST_ACCESS.listens = function(firebaseRef) {
  return firebaseRef.repo.persistentConnection_.listens_;
};
goog.exportProperty(wd.api.TEST_ACCESS, "listens", wd.api.TEST_ACCESS.listens);
wd.api.TEST_ACCESS.forceRestClient = function(repoManager) {
  repoManager.forceRestClient();
};
goog.exportProperty(wd.api.TEST_ACCESS, "forceRestClient", wd.api.TEST_ACCESS.forceRestClient);
goog.provide("wd.core.Repo_transaction");
goog.require("wd.core.Repo");
goog.require("wd.core.snap.PriorityIndex");
goog.require("wd.core.util");
wd.core.TransactionStatus = {RUN:1, SENT:2, COMPLETED:3, SENT_NEEDS_ABORT:4, NEEDS_ABORT:5};
wd.core.Repo.MAX_TRANSACTION_RETRIES_ = 25;
wd.core.Transaction;
wd.core.Repo.prototype.transactions_init_ = function() {
  this.transactionQueueTree_ = new wd.core.util.Tree;
};
wd.core.Repo.prototype.startTransaction = function(path, transactionUpdate, onComplete, applyLocally) {
  this.log_("transaction on " + path);
  var valueCallback = function() {
  };
  var watchRef = new Wilddog(this, path);
  watchRef.on("value", valueCallback);
  var unwatcher = function() {
    watchRef.off("value", valueCallback);
  };
  var transaction = {path:path, update:transactionUpdate, onComplete:onComplete, status:null, order:wd.core.util.LUIDGenerator(), applyLocally:applyLocally, retryCount:0, unwatcher:unwatcher, abortReason:null, currentWriteId:null, currentInputSnapshot:null, currentOutputSnapshotRaw:null, currentOutputSnapshotResolved:null};
  var currentState = this.getLatestState_(path);
  transaction.currentInputSnapshot = currentState;
  var newVal = transaction.update(currentState.val());
  if (!goog.isDef(newVal)) {
    transaction.unwatcher();
    transaction.currentOutputSnapshotRaw = null;
    transaction.currentOutputSnapshotResolved = null;
    if (transaction.onComplete) {
      var snapshot = new wd.api.DataSnapshot(transaction.currentInputSnapshot, new Wilddog(this, transaction.path), wd.core.snap.PriorityIndex);
      transaction.onComplete(null, false, snapshot);
    }
  } else {
    wd.core.util.validation.validateWilddogData("transaction failed: Data returned ", newVal, transaction.path);
    transaction.status = wd.core.TransactionStatus.RUN;
    var queueNode = this.transactionQueueTree_.subTree(path);
    var nodeQueue = queueNode.getValue() || [];
    nodeQueue.push(transaction);
    queueNode.setValue(nodeQueue);
    var priorityForNode;
    if (typeof newVal === "object" && newVal !== null && wd.util.obj.contains(newVal, ".priority")) {
      priorityForNode = wd.util.obj.get(newVal, ".priority");
      wd.core.util.assert(wd.core.util.validation.isValidPriority(priorityForNode), "Invalid priority returned by transaction. " + "Priority must be a valid string, finite number, server value, or null.");
    } else {
      var currentNode = this.serverSyncTree_.calcCompleteEventCache(path) || wd.core.snap.EMPTY_NODE;
      priorityForNode = currentNode.getPriority().val();
    }
    priorityForNode = priorityForNode;
    var serverValues = this.generateServerValues();
    var newNodeUnresolved = wd.core.snap.NodeFromJSON(newVal, priorityForNode);
    var newNode = wd.core.util.ServerValues.resolveDeferredValueSnapshot(newNodeUnresolved, serverValues);
    transaction.currentOutputSnapshotRaw = newNodeUnresolved;
    transaction.currentOutputSnapshotResolved = newNode;
    transaction.currentWriteId = this.getNextWriteId_();
    var events = this.serverSyncTree_.applyUserOverwrite(path, newNode, transaction.currentWriteId, transaction.applyLocally);
    this.eventQueue_.raiseEventsForChangedPath(path, events);
    this.sendReadyTransactions_();
  }
};
wd.core.Repo.prototype.getLatestState_ = function(path, excludeSets) {
  return this.serverSyncTree_.calcCompleteEventCache(path, excludeSets) || wd.core.snap.EMPTY_NODE;
};
wd.core.Repo.prototype.sendReadyTransactions_ = function(opt_node) {
  var node = opt_node || this.transactionQueueTree_;
  if (!opt_node) {
    this.pruneCompletedTransactionsBelowNode_(node);
  }
  if (node.getValue() !== null) {
    var queue = this.buildTransactionQueue_(node);
    wd.core.util.assert(queue.length > 0, "Sending zero length transaction queue");
    var allRun = goog.array.every(queue, function(transaction) {
      return transaction.status === wd.core.TransactionStatus.RUN;
    });
    if (allRun) {
      this.sendTransactionQueue_(node.path(), queue);
    }
  } else {
    if (node.hasChildren()) {
      var self = this;
      node.forEachChild(function(childNode) {
        self.sendReadyTransactions_(childNode);
      });
    }
  }
};
wd.core.Repo.prototype.sendTransactionQueue_ = function(path, queue) {
  var setsToIgnore = goog.array.map(queue, function(txn) {
    return txn.currentWriteId;
  });
  var latestState = this.getLatestState_(path, setsToIgnore);
  var snapToSend = latestState;
  var latestHash = latestState.hash();
  for (var i = 0;i < queue.length;i++) {
    var txn = queue[i];
    wd.core.util.assert(txn.status === wd.core.TransactionStatus.RUN, "tryToSendTransactionQueue_: items in queue should all be run.");
    txn.status = wd.core.TransactionStatus.SENT;
    txn.retryCount++;
    var relativePath = wd.core.util.Path.relativePath(path, txn.path);
    snapToSend = snapToSend.updateChild(relativePath, txn.currentOutputSnapshotRaw);
  }
  var dataToSend = snapToSend.val(true);
  var pathToSend = path;
  var self = this;
  this.server_.put(pathToSend.toString(), dataToSend, function(status) {
    self.log_("transaction put response", {path:pathToSend.toString(), status:status});
    var events = [];
    if (status === "ok") {
      var callbacks = [];
      for (i = 0;i < queue.length;i++) {
        queue[i].status = wd.core.TransactionStatus.COMPLETED;
        events = events.concat(self.serverSyncTree_.ackUserWrite(queue[i].currentWriteId));
        if (queue[i].onComplete) {
          var node = queue[i].currentOutputSnapshotResolved;
          var ref = new Wilddog(self, queue[i].path);
          var snapshot = new wd.api.DataSnapshot(node, ref, wd.core.snap.PriorityIndex);
          callbacks.push(goog.bind(queue[i].onComplete, null, null, true, snapshot));
        }
        queue[i].unwatcher();
      }
      self.pruneCompletedTransactionsBelowNode_(self.transactionQueueTree_.subTree(path));
      self.sendReadyTransactions_();
      self.eventQueue_.raiseEventsForChangedPath(path, events);
      for (i = 0;i < callbacks.length;i++) {
        wd.core.util.exceptionGuard(callbacks[i]);
      }
    } else {
      if (status === "datastale") {
        for (i = 0;i < queue.length;i++) {
          if (queue[i].status === wd.core.TransactionStatus.SENT_NEEDS_ABORT) {
            queue[i].status = wd.core.TransactionStatus.NEEDS_ABORT;
          } else {
            queue[i].status = wd.core.TransactionStatus.RUN;
          }
        }
      } else {
        wd.core.util.warn("transaction at " + pathToSend.toString() + " failed: " + status);
        for (i = 0;i < queue.length;i++) {
          queue[i].status = wd.core.TransactionStatus.NEEDS_ABORT;
          queue[i].abortReason = status;
        }
      }
      self.rerunTransactions_(path);
    }
  }, latestHash);
};
wd.core.Repo.prototype.rerunTransactions_ = function(changedPath) {
  var rootMostTransactionNode = this.getAncestorTransactionNode_(changedPath);
  var path = rootMostTransactionNode.path();
  var queue = this.buildTransactionQueue_(rootMostTransactionNode);
  this.rerunTransactionQueue_(queue, path);
  return path;
};
wd.core.Repo.prototype.rerunTransactionQueue_ = function(queue, path) {
  if (queue.length === 0) {
    return;
  }
  var callbacks = [];
  var events = [];
  var setsToIgnore = goog.array.map(queue, function(q) {
    return q.currentWriteId;
  });
  for (var i = 0;i < queue.length;i++) {
    var transaction = queue[i];
    var relativePath = wd.core.util.Path.relativePath(path, transaction.path);
    var abortTransaction = false, abortReason;
    wd.core.util.assert(relativePath !== null, "rerunTransactionsUnderNode_: relativePath should not be null.");
    if (transaction.status === wd.core.TransactionStatus.NEEDS_ABORT) {
      abortTransaction = true;
      abortReason = transaction.abortReason;
      events = events.concat(this.serverSyncTree_.ackUserWrite(transaction.currentWriteId, true));
    } else {
      if (transaction.status === wd.core.TransactionStatus.RUN) {
        if (transaction.retryCount >= wd.core.Repo.MAX_TRANSACTION_RETRIES_) {
          abortTransaction = true;
          abortReason = "maxretry";
          events = events.concat(this.serverSyncTree_.ackUserWrite(transaction.currentWriteId, true));
        } else {
          var currentNode = this.getLatestState_(transaction.path, setsToIgnore);
          transaction.currentInputSnapshot = currentNode;
          var newData = queue[i].update(currentNode.val());
          if (goog.isDef(newData)) {
            wd.core.util.validation.validateWilddogData("transaction failed: Data returned ", newData, transaction.path);
            var newDataNode = wd.core.snap.NodeFromJSON(newData);
            var hasExplicitPriority = typeof newData === "object" && newData != null && wd.util.obj.contains(newData, ".priority");
            if (!hasExplicitPriority) {
              newDataNode = newDataNode.updatePriority(currentNode.getPriority());
            }
            var oldWriteId = transaction.currentWriteId;
            var serverValues = this.generateServerValues();
            var newNodeResolved = wd.core.util.ServerValues.resolveDeferredValueSnapshot(newDataNode, serverValues);
            transaction.currentOutputSnapshotRaw = newDataNode;
            transaction.currentOutputSnapshotResolved = newNodeResolved;
            transaction.currentWriteId = this.getNextWriteId_();
            goog.array.remove(setsToIgnore, oldWriteId);
            events = events.concat(this.serverSyncTree_.applyUserOverwrite(transaction.path, newNodeResolved, transaction.currentWriteId, transaction.applyLocally));
            events = events.concat(this.serverSyncTree_.ackUserWrite(oldWriteId, true));
          } else {
            abortTransaction = true;
            abortReason = "nodata";
            events = events.concat(this.serverSyncTree_.ackUserWrite(transaction.currentWriteId, true));
          }
        }
      }
    }
    this.eventQueue_.raiseEventsForChangedPath(path, events);
    events = [];
    if (abortTransaction) {
      queue[i].status = wd.core.TransactionStatus.COMPLETED;
      (function(unwatcher) {
        setTimeout(unwatcher, Math.floor(0));
      })(queue[i].unwatcher);
      if (queue[i].onComplete) {
        if (abortReason === "nodata") {
          var ref = new Wilddog(this, queue[i].path);
          var lastInput = queue[i].currentInputSnapshot;
          var snapshot = new wd.api.DataSnapshot(lastInput, ref, wd.core.snap.PriorityIndex);
          callbacks.push(goog.bind(queue[i].onComplete, null, null, false, snapshot));
        } else {
          callbacks.push(goog.bind(queue[i].onComplete, null, new Error(abortReason), false, null));
        }
      }
    }
  }
  this.pruneCompletedTransactionsBelowNode_(this.transactionQueueTree_);
  for (i = 0;i < callbacks.length;i++) {
    wd.core.util.exceptionGuard(callbacks[i]);
  }
  this.sendReadyTransactions_();
};
wd.core.Repo.prototype.getAncestorTransactionNode_ = function(path) {
  var front;
  var transactionNode = this.transactionQueueTree_;
  while ((front = path.getFront()) !== null && transactionNode.getValue() === null) {
    transactionNode = transactionNode.subTree(front);
    path = path.popFront();
  }
  return transactionNode;
};
wd.core.Repo.prototype.buildTransactionQueue_ = function(transactionNode) {
  var transactionQueue = [];
  this.aggregateTransactionQueuesForNode_(transactionNode, transactionQueue);
  transactionQueue.sort(function(a, b) {
    return a.order - b.order;
  });
  return transactionQueue;
};
wd.core.Repo.prototype.aggregateTransactionQueuesForNode_ = function(node, queue) {
  var nodeQueue = node.getValue();
  if (nodeQueue !== null) {
    for (var i = 0;i < nodeQueue.length;i++) {
      queue.push(nodeQueue[i]);
    }
  }
  var self = this;
  node.forEachChild(function(child) {
    self.aggregateTransactionQueuesForNode_(child, queue);
  });
};
wd.core.Repo.prototype.pruneCompletedTransactionsBelowNode_ = function(node) {
  var queue = node.getValue();
  if (queue) {
    var to = 0;
    for (var from = 0;from < queue.length;from++) {
      if (queue[from].status !== wd.core.TransactionStatus.COMPLETED) {
        queue[to] = queue[from];
        to++;
      }
    }
    queue.length = to;
    node.setValue(queue.length > 0 ? queue : null);
  }
  var self = this;
  node.forEachChild(function(childNode) {
    self.pruneCompletedTransactionsBelowNode_(childNode);
  });
};
wd.core.Repo.prototype.abortTransactions_ = function(path) {
  var affectedPath = this.getAncestorTransactionNode_(path).path();
  var transactionNode = this.transactionQueueTree_.subTree(path);
  var self = this;
  transactionNode.forEachAncestor(function(node) {
    self.abortTransactionsOnNode_(node);
  });
  this.abortTransactionsOnNode_(transactionNode);
  transactionNode.forEachDescendant(function(node) {
    self.abortTransactionsOnNode_(node);
  });
  return affectedPath;
};
wd.core.Repo.prototype.abortTransactionsOnNode_ = function(node) {
  var queue = node.getValue();
  if (queue !== null) {
    var callbacks = [];
    var events = [];
    var lastSent = -1;
    for (var i = 0;i < queue.length;i++) {
      if (queue[i].status === wd.core.TransactionStatus.SENT_NEEDS_ABORT) {
      } else {
        if (queue[i].status === wd.core.TransactionStatus.SENT) {
          wd.core.util.assert(lastSent === i - 1, "All SENT items should be at beginning of queue.");
          lastSent = i;
          queue[i].status = wd.core.TransactionStatus.SENT_NEEDS_ABORT;
          queue[i].abortReason = "set";
        } else {
          wd.core.util.assert(queue[i].status === wd.core.TransactionStatus.RUN, "Unexpected transaction status in abort");
          queue[i].unwatcher();
          events = events.concat(this.serverSyncTree_.ackUserWrite(queue[i].currentWriteId, true));
          if (queue[i].onComplete) {
            var snapshot = null;
            callbacks.push(goog.bind(queue[i].onComplete, null, new Error("set"), false, snapshot));
          }
        }
      }
    }
    if (lastSent === -1) {
      node.setValue(null);
    } else {
      queue.length = lastSent + 1;
    }
    this.eventQueue_.raiseEventsForChangedPath(node.path(), events);
    for (i = 0;i < callbacks.length;i++) {
      wd.core.util.exceptionGuard(callbacks[i]);
    }
  }
};
goog.provide("wd.core.RepoManager");
goog.require("wd.core.Repo");
goog.require("wd.core.Repo_transaction");
goog.require("wd.util.obj");
wd.core.RepoManager = function() {
  this.repos_ = {};
  this.useRestClient_ = false;
};
goog.addSingletonGetter(wd.core.RepoManager);
wd.core.RepoManager.prototype.interrupt = function() {
  for (var repo in this.repos_) {
    this.repos_[repo].interrupt();
  }
};
goog.exportProperty(wd.core.RepoManager.prototype, "interrupt", wd.core.RepoManager.prototype.interrupt);
wd.core.RepoManager.prototype.resume = function() {
  for (var repo in this.repos_) {
    this.repos_[repo].resume();
  }
};
goog.exportProperty(wd.core.RepoManager.prototype, "resume", wd.core.RepoManager.prototype.resume);
wd.core.RepoManager.prototype.getRepo = function(repoInfo) {
  var repoHashString = repoInfo.toString();
  var repo = wd.util.obj.get(this.repos_, repoHashString);
  if (!repo) {
    repo = new wd.core.Repo(repoInfo, this.useRestClient_);
    this.repos_[repoHashString] = repo;
  }
  return repo;
};
wd.core.RepoManager.prototype.forceRestClient = function() {
  this.useRestClient_ = true;
};
goog.provide("wd.core.util.nextPushId");
goog.require("wd.core.util");
wd.core.util.nextPushId = function() {
  var PUSH_CHARS = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
  var lastPushTime = 0;
  var lastRandChars = [];
  return function(now) {
    var duplicateTime = now === lastPushTime;
    lastPushTime = now;
    var timeStampChars = new Array(8);
    for (var i = 7;i >= 0;i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      now = Math.floor(now / 64);
    }
    wd.core.util.assert(now === 0, "Cannot push at time == 0");
    var id = timeStampChars.join("");
    if (!duplicateTime) {
      for (i = 0;i < 12;i++) {
        lastRandChars[i] = Math.floor(Math.random() * 64);
      }
    } else {
      for (i = 11;i >= 0 && lastRandChars[i] === 63;i--) {
        lastRandChars[i] = 0;
      }
      lastRandChars[i]++;
    }
    for (i = 0;i < 12;i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }
    wd.core.util.assert(id.length === 20, "nextPushId: Length should be 20.");
    return id;
  };
}();
goog.provide("wd.core.view.filter.IndexedFilter");
goog.require("wd.core.util");
wd.core.view.filter.IndexedFilter = function(index) {
  this.index_ = index;
};
wd.core.view.filter.IndexedFilter.prototype.updateChild = function(snap, key, newChild, source, optChangeAccumulator) {
  var Change = wd.core.view.Change;
  wd.core.util.assert(snap.isIndexed(this.index_), "A node must be indexed if only a child is updated");
  var oldChild = snap.getImmediateChild(key);
  if (oldChild.equals(newChild)) {
    return snap;
  }
  if (optChangeAccumulator != null) {
    if (newChild.isEmpty()) {
      if (snap.hasChild(key)) {
        optChangeAccumulator.trackChildChange(Change.childRemovedChange(key, oldChild));
      } else {
        wd.core.util.assert(snap.isLeafNode(), "A child remove without an old child only makes sense on a leaf node");
      }
    } else {
      if (oldChild.isEmpty()) {
        optChangeAccumulator.trackChildChange(Change.childAddedChange(key, newChild));
      } else {
        optChangeAccumulator.trackChildChange(Change.childChangedChange(key, newChild, oldChild));
      }
    }
  }
  if (snap.isLeafNode() && newChild.isEmpty()) {
    return snap;
  } else {
    return snap.updateImmediateChild(key, newChild).withIndex(this.index_);
  }
};
wd.core.view.filter.IndexedFilter.prototype.updateFullNode = function(oldSnap, newSnap, optChangeAccumulator) {
  var Change = wd.core.view.Change;
  if (optChangeAccumulator != null) {
    if (!oldSnap.isLeafNode()) {
      oldSnap.forEachChild(wd.core.snap.PriorityIndex, function(key, childNode) {
        if (!newSnap.hasChild(key)) {
          optChangeAccumulator.trackChildChange(Change.childRemovedChange(key, childNode));
        }
      });
    }
    if (!newSnap.isLeafNode()) {
      newSnap.forEachChild(wd.core.snap.PriorityIndex, function(key, childNode) {
        if (oldSnap.hasChild(key)) {
          var oldChild = oldSnap.getImmediateChild(key);
          if (!oldChild.equals(childNode)) {
            optChangeAccumulator.trackChildChange(Change.childChangedChange(key, childNode, oldChild));
          }
        } else {
          optChangeAccumulator.trackChildChange(Change.childAddedChange(key, childNode));
        }
      });
    }
  }
  return newSnap.withIndex(this.index_);
};
wd.core.view.filter.IndexedFilter.prototype.updatePriority = function(oldSnap, newPriority) {
  if (oldSnap.isEmpty()) {
    return wd.core.snap.EMPTY_NODE;
  } else {
    return oldSnap.updatePriority(newPriority);
  }
};
wd.core.view.filter.IndexedFilter.prototype.filtersNodes = function() {
  return false;
};
wd.core.view.filter.IndexedFilter.prototype.getIndexedFilter = function() {
  return this;
};
wd.core.view.filter.IndexedFilter.prototype.getIndex = function() {
  return this.index_;
};
goog.provide("wd.core.view.filter.RangedFilter");
goog.require("wd.core.view.filter.IndexedFilter");
wd.core.view.filter.RangedFilter = function(params) {
  this.indexedFilter_ = new wd.core.view.filter.IndexedFilter(params.getIndex());
  this.index_ = params.getIndex();
  this.startPost_ = this.getStartPost_(params);
  this.endPost_ = this.getEndPost_(params);
};
wd.core.view.filter.RangedFilter.prototype.getStartPost = function() {
  return this.startPost_;
};
wd.core.view.filter.RangedFilter.prototype.getEndPost = function() {
  return this.endPost_;
};
wd.core.view.filter.RangedFilter.prototype.matches = function(node) {
  return this.index_.compare(this.getStartPost(), node) <= 0 && this.index_.compare(node, this.getEndPost()) <= 0;
};
wd.core.view.filter.RangedFilter.prototype.updateChild = function(snap, key, newChild, source, optChangeAccumulator) {
  if (!this.matches(new wd.core.snap.NamedNode(key, newChild))) {
    newChild = wd.core.snap.EMPTY_NODE;
  }
  return this.indexedFilter_.updateChild(snap, key, newChild, source, optChangeAccumulator);
};
wd.core.view.filter.RangedFilter.prototype.updateFullNode = function(oldSnap, newSnap, optChangeAccumulator) {
  if (newSnap.isLeafNode()) {
    newSnap = wd.core.snap.EMPTY_NODE;
  }
  var filtered = newSnap.withIndex(this.index_);
  filtered = filtered.updatePriority(wd.core.snap.EMPTY_NODE);
  var self = this;
  newSnap.forEachChild(wd.core.snap.PriorityIndex, function(key, childNode) {
    if (!self.matches(new wd.core.snap.NamedNode(key, childNode))) {
      filtered = filtered.updateImmediateChild(key, wd.core.snap.EMPTY_NODE);
    }
  });
  return this.indexedFilter_.updateFullNode(oldSnap, filtered, optChangeAccumulator);
};
wd.core.view.filter.RangedFilter.prototype.updatePriority = function(oldSnap, newPriority) {
  return oldSnap;
};
wd.core.view.filter.RangedFilter.prototype.filtersNodes = function() {
  return true;
};
wd.core.view.filter.RangedFilter.prototype.getIndexedFilter = function() {
  return this.indexedFilter_;
};
wd.core.view.filter.RangedFilter.prototype.getIndex = function() {
  return this.index_;
};
wd.core.view.filter.RangedFilter.prototype.getStartPost_ = function(params) {
  if (params.hasStart()) {
    var startName = params.getIndexStartName();
    return params.getIndex().makePost(params.getIndexStartValue(), startName);
  } else {
    return params.getIndex().minPost();
  }
};
wd.core.view.filter.RangedFilter.prototype.getEndPost_ = function(params) {
  if (params.hasEnd()) {
    var endName = params.getIndexEndName();
    return params.getIndex().makePost(params.getIndexEndValue(), endName);
  } else {
    return params.getIndex().maxPost();
  }
};
goog.provide("wd.core.view.filter.LimitedFilter");
goog.require("wd.core.snap.NamedNode");
goog.require("wd.core.view.filter.RangedFilter");
goog.require("wd.core.util");
wd.core.view.filter.LimitedFilter = function(params) {
  this.rangedFilter_ = new wd.core.view.filter.RangedFilter(params);
  this.index_ = params.getIndex();
  this.limit_ = params.getLimit();
  this.reverse_ = !params.isViewFromLeft();
};
wd.core.view.filter.LimitedFilter.prototype.updateChild = function(snap, key, newChild, source, optChangeAccumulator) {
  if (!this.rangedFilter_.matches(new wd.core.snap.NamedNode(key, newChild))) {
    newChild = wd.core.snap.EMPTY_NODE;
  }
  if (snap.getImmediateChild(key).equals(newChild)) {
    return snap;
  } else {
    if (snap.numChildren() < this.limit_) {
      return this.rangedFilter_.getIndexedFilter().updateChild(snap, key, newChild, source, optChangeAccumulator);
    } else {
      return this.fullLimitUpdateChild_(snap, key, newChild, source, optChangeAccumulator);
    }
  }
};
wd.core.view.filter.LimitedFilter.prototype.updateFullNode = function(oldSnap, newSnap, optChangeAccumulator) {
  var filtered;
  if (newSnap.isLeafNode() || newSnap.isEmpty()) {
    filtered = wd.core.snap.EMPTY_NODE.withIndex(this.index_);
  } else {
    if (this.limit_ * 2 < newSnap.numChildren() && newSnap.isIndexed(this.index_)) {
      filtered = wd.core.snap.EMPTY_NODE.withIndex(this.index_);
      var iterator;
      newSnap = newSnap;
      if (this.reverse_) {
        iterator = newSnap.getReverseIteratorFrom(this.rangedFilter_.getEndPost(), this.index_);
      } else {
        iterator = newSnap.getIteratorFrom(this.rangedFilter_.getStartPost(), this.index_);
      }
      var count = 0;
      while (iterator.hasNext() && count < this.limit_) {
        var next = iterator.getNext();
        var inRange;
        if (this.reverse_) {
          inRange = this.index_.compare(this.rangedFilter_.getStartPost(), next) <= 0;
        } else {
          inRange = this.index_.compare(next, this.rangedFilter_.getEndPost()) <= 0;
        }
        if (inRange) {
          filtered = filtered.updateImmediateChild(next.name, next.node);
          count++;
        } else {
          break;
        }
      }
    } else {
      filtered = newSnap.withIndex(this.index_);
      filtered = filtered.updatePriority(wd.core.snap.EMPTY_NODE);
      var startPost;
      var endPost;
      var cmp;
      if (this.reverse_) {
        iterator = filtered.getReverseIterator(this.index_);
        startPost = this.rangedFilter_.getEndPost();
        endPost = this.rangedFilter_.getStartPost();
        var indexCompare = this.index_.getCompare();
        cmp = function(a, b) {
          return indexCompare(b, a);
        };
      } else {
        iterator = filtered.getIterator(this.index_);
        startPost = this.rangedFilter_.getStartPost();
        endPost = this.rangedFilter_.getEndPost();
        cmp = this.index_.getCompare();
      }
      count = 0;
      var foundStartPost = false;
      while (iterator.hasNext()) {
        next = iterator.getNext();
        if (!foundStartPost && cmp(startPost, next) <= 0) {
          foundStartPost = true;
        }
        inRange = foundStartPost && count < this.limit_ && cmp(next, endPost) <= 0;
        if (inRange) {
          count++;
        } else {
          filtered = filtered.updateImmediateChild(next.name, wd.core.snap.EMPTY_NODE);
        }
      }
    }
  }
  return this.rangedFilter_.getIndexedFilter().updateFullNode(oldSnap, filtered, optChangeAccumulator);
};
wd.core.view.filter.LimitedFilter.prototype.updatePriority = function(oldSnap, newPriority) {
  return oldSnap;
};
wd.core.view.filter.LimitedFilter.prototype.filtersNodes = function() {
  return true;
};
wd.core.view.filter.LimitedFilter.prototype.getIndexedFilter = function() {
  return this.rangedFilter_.getIndexedFilter();
};
wd.core.view.filter.LimitedFilter.prototype.getIndex = function() {
  return this.index_;
};
wd.core.view.filter.LimitedFilter.prototype.fullLimitUpdateChild_ = function(snap, childKey, childSnap, source, optChangeAccumulator) {
  var Change = wd.core.view.Change;
  var cmp;
  if (this.reverse_) {
    var indexCmp = this.index_.getCompare();
    cmp = function(a, b) {
      return indexCmp(b, a);
    };
  } else {
    cmp = this.index_.getCompare();
  }
  var oldEventCache = snap;
  wd.core.util.assert(oldEventCache.numChildren() == this.limit_, "");
  var newChildNamedNode = new wd.core.snap.NamedNode(childKey, childSnap);
  var windowBoundary = this.reverse_ ? oldEventCache.getFirstChild(this.index_) : oldEventCache.getLastChild(this.index_);
  var inRange = this.rangedFilter_.matches(newChildNamedNode);
  if (oldEventCache.hasChild(childKey)) {
    var oldChildSnap = oldEventCache.getImmediateChild(childKey);
    var nextChild = source.getChildAfterChild(this.index_, windowBoundary, this.reverse_);
    if (nextChild != null && nextChild.name == childKey) {
      nextChild = source.getChildAfterChild(this.index_, nextChild, this.reverse_);
    }
    var compareNext = nextChild == null ? 1 : cmp(nextChild, newChildNamedNode);
    var remainsInWindow = inRange && !childSnap.isEmpty() && compareNext >= 0;
    if (remainsInWindow) {
      if (optChangeAccumulator != null) {
        optChangeAccumulator.trackChildChange(Change.childChangedChange(childKey, childSnap, oldChildSnap));
      }
      return oldEventCache.updateImmediateChild(childKey, childSnap);
    } else {
      if (optChangeAccumulator != null) {
        optChangeAccumulator.trackChildChange(Change.childRemovedChange(childKey, oldChildSnap));
      }
      var newEventCache = oldEventCache.updateImmediateChild(childKey, wd.core.snap.EMPTY_NODE);
      var nextChildInRange = nextChild != null && this.rangedFilter_.matches(nextChild);
      if (nextChildInRange) {
        if (optChangeAccumulator != null) {
          optChangeAccumulator.trackChildChange(Change.childAddedChange(nextChild.name, nextChild.node));
        }
        return newEventCache.updateImmediateChild(nextChild.name, nextChild.node);
      } else {
        return newEventCache;
      }
    }
  } else {
    if (childSnap.isEmpty()) {
      return snap;
    } else {
      if (inRange) {
        if (cmp(windowBoundary, newChildNamedNode) >= 0) {
          if (optChangeAccumulator != null) {
            optChangeAccumulator.trackChildChange(Change.childRemovedChange(windowBoundary.name, windowBoundary.node));
            optChangeAccumulator.trackChildChange(Change.childAddedChange(childKey, childSnap));
          }
          return oldEventCache.updateImmediateChild(childKey, childSnap).updateImmediateChild(windowBoundary.name, wd.core.snap.EMPTY_NODE);
        } else {
          return snap;
        }
      } else {
        return snap;
      }
    }
  }
};
goog.provide("wd.core.view.ChildChangeAccumulator");
goog.require("wd.core.util");
wd.core.view.ChildChangeAccumulator = function() {
  this.changeMap_ = {};
};
wd.core.view.ChildChangeAccumulator.prototype.trackChildChange = function(change) {
  var Change = wd.core.view.Change;
  var type = change.type;
  var childKey = change.childName;
  wd.core.util.assert(type == wd.core.view.Change.CHILD_ADDED || type == wd.core.view.Change.CHILD_CHANGED || type == wd.core.view.Change.CHILD_REMOVED, "Only child changes supported for tracking");
  wd.core.util.assert(childKey !== ".priority", "Only non-priority child changes can be tracked.");
  var oldChange = wd.util.obj.get(this.changeMap_, childKey);
  if (oldChange) {
    var oldType = oldChange.type;
    if (type == Change.CHILD_ADDED && oldType == Change.CHILD_REMOVED) {
      this.changeMap_[childKey] = Change.childChangedChange(childKey, change.snapshotNode, oldChange.snapshotNode);
    } else {
      if (type == Change.CHILD_REMOVED && oldType == Change.CHILD_ADDED) {
        delete this.changeMap_[childKey];
      } else {
        if (type == Change.CHILD_REMOVED && oldType == Change.CHILD_CHANGED) {
          this.changeMap_[childKey] = Change.childRemovedChange(childKey, oldChange.oldSnap);
        } else {
          if (type == Change.CHILD_CHANGED && oldType == Change.CHILD_ADDED) {
            this.changeMap_[childKey] = Change.childAddedChange(childKey, change.snapshotNode);
          } else {
            if (type == Change.CHILD_CHANGED && oldType == Change.CHILD_CHANGED) {
              this.changeMap_[childKey] = Change.childChangedChange(childKey, change.snapshotNode, oldChange.oldSnap);
            } else {
              throw wd.core.util.assertionError("Illegal combination of changes: " + change + " occurred after " + oldChange);
            }
          }
        }
      }
    }
  } else {
    this.changeMap_[childKey] = change;
  }
};
wd.core.view.ChildChangeAccumulator.prototype.getChanges = function() {
  return goog.object.getValues(this.changeMap_);
};
goog.provide("wd.core.view.filter.NodeFilter");
goog.require("wd.core.view.ChildChangeAccumulator");
goog.require("wd.core.view.CompleteChildSource");
wd.core.view.filter.NodeFilter = function() {
};
wd.core.view.filter.NodeFilter.prototype.updateChild = function(snap, key, newChild, source, optChangeAccumulator) {
};
wd.core.view.filter.NodeFilter.prototype.updateFullNode = function(oldSnap, newSnap, optChangeAccumulator) {
};
wd.core.view.filter.NodeFilter.prototype.updatePriority = function(oldSnap, newPriority) {
};
wd.core.view.filter.NodeFilter.prototype.filtersNodes = function() {
};
wd.core.view.filter.NodeFilter.prototype.getIndexedFilter = function() {
};
wd.core.view.filter.NodeFilter.prototype.getIndex = function() {
};
goog.provide("wd.core.view.QueryParams");
goog.require("wd.core.snap.Index");
goog.require("wd.core.snap.PriorityIndex");
goog.require("wd.core.util");
goog.require("wd.core.view.filter.IndexedFilter");
goog.require("wd.core.view.filter.LimitedFilter");
goog.require("wd.core.view.filter.NodeFilter");
goog.require("wd.core.view.filter.RangedFilter");
wd.core.view.QueryParams = function() {
  this.limitSet_ = false;
  this.startSet_ = false;
  this.startNameSet_ = false;
  this.endSet_ = false;
  this.endNameSet_ = false;
  this.limit_ = 0;
  this.viewFrom_ = "";
  this.indexStartValue_ = null;
  this.indexStartName_ = "";
  this.indexEndValue_ = null;
  this.indexEndName_ = "";
  this.index_ = wd.core.snap.PriorityIndex;
};
wd.core.view.QueryParams.WIRE_PROTOCOL_CONSTANTS_ = {INDEX_START_VALUE:"sp", INDEX_START_NAME:"sn", INDEX_END_VALUE:"ep", INDEX_END_NAME:"en", LIMIT:"l", VIEW_FROM:"vf", VIEW_FROM_LEFT:"l", VIEW_FROM_RIGHT:"r", INDEX:"i"};
wd.core.view.QueryParams.REST_QUERY_CONSTANTS_ = {ORDER_BY:"orderBy", PRIORITY_INDEX:"$priority", VALUE_INDEX:"$value", KEY_INDEX:"$key", START_AT:"startAt", END_AT:"endAt", LIMIT_TO_FIRST:"limitToFirst", LIMIT_TO_LAST:"limitToLast"};
wd.core.view.QueryParams.DEFAULT = new wd.core.view.QueryParams;
wd.core.view.QueryParams.prototype.hasStart = function() {
  return this.startSet_;
};
wd.core.view.QueryParams.prototype.isViewFromLeft = function() {
  if (this.viewFrom_ === "") {
    return this.startSet_;
  } else {
    return this.viewFrom_ === wd.core.view.QueryParams.WIRE_PROTOCOL_CONSTANTS_.VIEW_FROM_LEFT;
  }
};
wd.core.view.QueryParams.prototype.getIndexStartValue = function() {
  wd.core.util.assert(this.startSet_, "Only valid if start has been set");
  return this.indexStartValue_;
};
wd.core.view.QueryParams.prototype.getIndexStartName = function() {
  wd.core.util.assert(this.startSet_, "Only valid if start has been set");
  if (this.startNameSet_) {
    return this.indexStartName_;
  } else {
    return wd.core.util.MIN_NAME;
  }
};
wd.core.view.QueryParams.prototype.hasEnd = function() {
  return this.endSet_;
};
wd.core.view.QueryParams.prototype.getIndexEndValue = function() {
  wd.core.util.assert(this.endSet_, "Only valid if end has been set");
  return this.indexEndValue_;
};
wd.core.view.QueryParams.prototype.getIndexEndName = function() {
  wd.core.util.assert(this.endSet_, "Only valid if end has been set");
  if (this.endNameSet_) {
    return this.indexEndName_;
  } else {
    return wd.core.util.MAX_NAME;
  }
};
wd.core.view.QueryParams.prototype.hasLimit = function() {
  return this.limitSet_;
};
wd.core.view.QueryParams.prototype.hasAnchoredLimit = function() {
  return this.limitSet_ && this.viewFrom_ !== "";
};
wd.core.view.QueryParams.prototype.getLimit = function() {
  wd.core.util.assert(this.limitSet_, "Only valid if limit has been set");
  return this.limit_;
};
wd.core.view.QueryParams.prototype.getIndex = function() {
  return this.index_;
};
wd.core.view.QueryParams.prototype.copy_ = function() {
  var copy = new wd.core.view.QueryParams;
  copy.limitSet_ = this.limitSet_;
  copy.limit_ = this.limit_;
  copy.startSet_ = this.startSet_;
  copy.indexStartValue_ = this.indexStartValue_;
  copy.startNameSet_ = this.startNameSet_;
  copy.indexStartName_ = this.indexStartName_;
  copy.endSet_ = this.endSet_;
  copy.indexEndValue_ = this.indexEndValue_;
  copy.endNameSet_ = this.endNameSet_;
  copy.indexEndName_ = this.indexEndName_;
  copy.index_ = this.index_;
  return copy;
};
wd.core.view.QueryParams.prototype.limit = function(newLimit) {
  var newParams = this.copy_();
  newParams.limitSet_ = true;
  newParams.limit_ = newLimit;
  newParams.viewFrom_ = "";
  return newParams;
};
wd.core.view.QueryParams.prototype.limitToFirst = function(newLimit) {
  var newParams = this.copy_();
  newParams.limitSet_ = true;
  newParams.limit_ = newLimit;
  newParams.viewFrom_ = wd.core.view.QueryParams.WIRE_PROTOCOL_CONSTANTS_.VIEW_FROM_LEFT;
  return newParams;
};
wd.core.view.QueryParams.prototype.limitToLast = function(newLimit) {
  var newParams = this.copy_();
  newParams.limitSet_ = true;
  newParams.limit_ = newLimit;
  newParams.viewFrom_ = wd.core.view.QueryParams.WIRE_PROTOCOL_CONSTANTS_.VIEW_FROM_RIGHT;
  return newParams;
};
wd.core.view.QueryParams.prototype.startAt = function(indexValue, key) {
  var newParams = this.copy_();
  newParams.startSet_ = true;
  if (!goog.isDef(indexValue)) {
    indexValue = null;
  }
  newParams.indexStartValue_ = indexValue;
  if (key != null) {
    newParams.startNameSet_ = true;
    newParams.indexStartName_ = key;
  } else {
    newParams.startNameSet_ = false;
    newParams.indexStartName_ = "";
  }
  return newParams;
};
wd.core.view.QueryParams.prototype.endAt = function(indexValue, key) {
  var newParams = this.copy_();
  newParams.endSet_ = true;
  if (!goog.isDef(indexValue)) {
    indexValue = null;
  }
  newParams.indexEndValue_ = indexValue;
  if (goog.isDef(key)) {
    newParams.endNameSet_ = true;
    newParams.indexEndName_ = key;
  } else {
    newParams.startEndSet_ = false;
    newParams.indexEndName_ = "";
  }
  return newParams;
};
wd.core.view.QueryParams.prototype.orderBy = function(index) {
  var newParams = this.copy_();
  newParams.index_ = index;
  return newParams;
};
wd.core.view.QueryParams.prototype.getQueryObject = function() {
  var WIRE_PROTOCOL_CONSTANTS = wd.core.view.QueryParams.WIRE_PROTOCOL_CONSTANTS_;
  var obj = {};
  if (this.startSet_) {
    obj[WIRE_PROTOCOL_CONSTANTS.INDEX_START_VALUE] = this.indexStartValue_;
    if (this.startNameSet_) {
      obj[WIRE_PROTOCOL_CONSTANTS.INDEX_START_NAME] = this.indexStartName_;
    }
  }
  if (this.endSet_) {
    obj[WIRE_PROTOCOL_CONSTANTS.INDEX_END_VALUE] = this.indexEndValue_;
    if (this.endNameSet_) {
      obj[WIRE_PROTOCOL_CONSTANTS.INDEX_END_NAME] = this.indexEndName_;
    }
  }
  if (this.limitSet_) {
    obj[WIRE_PROTOCOL_CONSTANTS.LIMIT] = this.limit_;
    var viewFrom = this.viewFrom_;
    if (viewFrom === "") {
      if (this.isViewFromLeft()) {
        viewFrom = WIRE_PROTOCOL_CONSTANTS.VIEW_FROM_LEFT;
      } else {
        viewFrom = WIRE_PROTOCOL_CONSTANTS.VIEW_FROM_RIGHT;
      }
    }
    obj[WIRE_PROTOCOL_CONSTANTS.VIEW_FROM] = viewFrom;
  }
  if (this.index_ !== wd.core.snap.PriorityIndex) {
    obj[WIRE_PROTOCOL_CONSTANTS.INDEX] = this.index_.toString();
  }
  return obj;
};
wd.core.view.QueryParams.prototype.loadsAllData = function() {
  return !(this.startSet_ || this.endSet_ || this.limitSet_);
};
wd.core.view.QueryParams.prototype.isDefault = function() {
  return this.loadsAllData() && this.index_ == wd.core.snap.PriorityIndex;
};
wd.core.view.QueryParams.prototype.getNodeFilter = function() {
  if (this.loadsAllData()) {
    return new wd.core.view.filter.IndexedFilter(this.getIndex());
  } else {
    if (this.hasLimit()) {
      return new wd.core.view.filter.LimitedFilter(this);
    } else {
      return new wd.core.view.filter.RangedFilter(this);
    }
  }
};
wd.core.view.QueryParams.prototype.toRestQueryStringParameters = function() {
  var REST_CONSTANTS = wd.core.view.QueryParams.REST_QUERY_CONSTANTS_;
  var qs = {};
  if (this.isDefault()) {
    return qs;
  }
  var orderBy;
  if (this.index_ === wd.core.snap.PriorityIndex) {
    orderBy = REST_CONSTANTS.PRIORITY_INDEX;
  } else {
    if (this.index_ === wd.core.snap.ValueIndex) {
      orderBy = REST_CONSTANTS.VALUE_INDEX;
    } else {
      if (this.index_ === wd.core.snap.KeyIndex) {
        orderBy = REST_CONSTANTS.KEY_INDEX;
      } else {
        wd.core.util.assert(this.index_ instanceof wd.core.snap.SubKeyIndex, "Unrecognized index type!");
        orderBy = this.index_.toString();
      }
    }
  }
  qs[REST_CONSTANTS.ORDER_BY] = wd.util.json.stringify(orderBy);
  if (this.startSet_) {
    qs[REST_CONSTANTS.START_AT] = wd.util.json.stringify(this.indexStartValue_);
    if (this.startNameSet_) {
      qs[REST_CONSTANTS.START_AT] += "," + wd.util.json.stringify(this.indexStartName_);
    }
  }
  if (this.endSet_) {
    qs[REST_CONSTANTS.END_AT] = wd.util.json.stringify(this.indexEndValue_);
    if (this.endNameSet_) {
      qs[REST_CONSTANTS.END_AT] += "," + wd.util.json.stringify(this.indexEndName_);
    }
  }
  if (this.limitSet_) {
    if (this.isViewFromLeft()) {
      qs[REST_CONSTANTS.LIMIT_TO_FIRST] = this.limit_;
    } else {
      qs[REST_CONSTANTS.LIMIT_TO_LAST] = this.limit_;
    }
  }
  return qs;
};
if (goog.DEBUG) {
  wd.core.view.QueryParams.prototype.toString = function() {
    return wd.util.json.stringify(this.getQueryObject());
  };
}
;goog.provide("wd.api.Query");
goog.require("wd.api.DataSnapshot");
goog.require("wd.core.snap");
goog.require("wd.core.util");
goog.require("wd.core.util.validation");
goog.require("wd.core.view.EventRegistration");
goog.require("wd.core.view.QueryParams");
goog.require("wd.util.json");
goog.require("wd.util.validation");
wd.api.Query = function(repo, path, queryParams, orderByCalled) {
  this.repo = repo;
  this.path = path;
  this.queryParams_ = queryParams;
  this.orderByCalled_ = orderByCalled;
};
wd.api.Query.prototype.validateQueryEndpoints_ = function(params) {
  var startNode = null;
  var endNode = null;
  if (params.hasStart()) {
    startNode = params.getIndexStartValue();
  }
  if (params.hasEnd()) {
    endNode = params.getIndexEndValue();
  }
  if (params.getIndex() === wd.core.snap.KeyIndex) {
    var tooManyArgsError = "Query: When ordering by key, you may only pass one argument to " + "startAt(), endAt(), or equalTo().";
    var wrongArgTypeError = "Query: When ordering by key, the argument passed to startAt(), endAt()," + "or equalTo() must be a string.";
    if (params.hasStart()) {
      var startName = params.getIndexStartName();
      if (startName != wd.core.util.MIN_NAME) {
        throw new Error(tooManyArgsError);
      } else {
        if (typeof startNode !== "string") {
          throw new Error(wrongArgTypeError);
        }
      }
    }
    if (params.hasEnd()) {
      var endName = params.getIndexEndName();
      if (endName != wd.core.util.MAX_NAME) {
        throw new Error(tooManyArgsError);
      } else {
        if (typeof endNode !== "string") {
          throw new Error(wrongArgTypeError);
        }
      }
    }
  } else {
    if (params.getIndex() === wd.core.snap.PriorityIndex) {
      if (startNode != null && !wd.core.util.validation.isValidPriority(startNode) || endNode != null && !wd.core.util.validation.isValidPriority(endNode)) {
        throw new Error("Query: When ordering by priority, the first argument passed to startAt(), " + "endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");
      }
    } else {
      wd.core.util.assert(params.getIndex() instanceof wd.core.snap.SubKeyIndex || params.getIndex() === wd.core.snap.ValueIndex, "unknown index type.");
      if (startNode != null && typeof startNode === "object" || endNode != null && typeof endNode === "object") {
        throw new Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be " + "an object.");
      }
    }
  }
};
wd.api.Query.prototype.validateLimit_ = function(params) {
  if (params.hasStart() && params.hasEnd() && params.hasLimit() && !params.hasAnchoredLimit()) {
    throw new Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");
  }
};
wd.api.Query.prototype.validateNoPreviousOrderByCall_ = function(fnName) {
  if (this.orderByCalled_ === true) {
    throw new Error(fnName + ": You can't combine multiple orderBy calls.");
  }
};
wd.api.Query.prototype.getQueryParams = function() {
  return this.queryParams_;
};
wd.api.Query.prototype.ref = function() {
  wd.util.validation.validateArgCount("Query.ref", 0, 0, arguments.length);
  return new Wilddog(this.repo, this.path);
};
goog.exportProperty(wd.api.Query.prototype, "ref", wd.api.Query.prototype.ref);
wd.api.Query.prototype.on = function(eventType, callback, cancelCallbackOrContext, context) {
  wd.util.validation.validateArgCount("Query.on", 2, 4, arguments.length);
  wd.core.util.validation.validateEventType("Query.on", 1, eventType, false);
  wd.util.validation.validateCallback("Query.on", 2, callback, false);
  var ret = this.getCancelAndContextArgs_("Query.on", cancelCallbackOrContext, context);
  if (eventType === "value") {
    this.onValueEvent(callback, ret.cancel, ret.context);
  } else {
    var callbacks = {};
    callbacks[eventType] = callback;
    this.onChildEvent(callbacks, ret.cancel, ret.context);
  }
  return callback;
};
goog.exportProperty(wd.api.Query.prototype, "on", wd.api.Query.prototype.on);
wd.api.Query.prototype.onValueEvent = function(callback, cancelCallback, context) {
  var container = new wd.core.view.ValueEventRegistration(callback, cancelCallback || null, context || null);
  this.repo.addEventCallbackForQuery(this, container);
};
wd.api.Query.prototype.onChildEvent = function(callbacks, cancelCallback, context) {
  var container = new wd.core.view.ChildEventRegistration(callbacks, cancelCallback, context);
  this.repo.addEventCallbackForQuery(this, container);
};
wd.api.Query.prototype.off = function(eventType, callback, opt_context) {
  wd.util.validation.validateArgCount("Query.off", 0, 3, arguments.length);
  wd.core.util.validation.validateEventType("Query.off", 1, eventType, true);
  wd.util.validation.validateCallback("Query.off", 2, callback, true);
  wd.util.validation.validateContextObject("Query.off", 3, opt_context, true);
  var container = null;
  var callbacks = null;
  if (eventType === "value") {
    var valueCallback = callback || null;
    container = new wd.core.view.ValueEventRegistration(valueCallback, null, opt_context || null);
  } else {
    if (eventType) {
      if (callback) {
        callbacks = {};
        callbacks[eventType] = callback;
      }
      container = new wd.core.view.ChildEventRegistration(callbacks, null, opt_context || null);
    }
  }
  this.repo.removeEventCallbackForQuery(this, container);
};
goog.exportProperty(wd.api.Query.prototype, "off", wd.api.Query.prototype.off);
wd.api.Query.prototype.once = function(eventType, userCallback) {
  wd.util.validation.validateArgCount("Query.once", 2, 4, arguments.length);
  wd.core.util.validation.validateEventType("Query.once", 1, eventType, false);
  wd.util.validation.validateCallback("Query.once", 2, userCallback, false);
  var ret = this.getCancelAndContextArgs_("Query.once", arguments[2], arguments[3]);
  var self = this, firstCall = true;
  var onceCallback = function(snapshot) {
    if (firstCall) {
      firstCall = false;
      self.off(eventType, onceCallback);
      goog.bind(userCallback, ret.context)(snapshot);
    }
  };
  this.on(eventType, onceCallback, function(err) {
    self.off(eventType, onceCallback);
    if (ret.cancel) {
      goog.bind(ret.cancel, ret.context)(err);
    }
  });
};
goog.exportProperty(wd.api.Query.prototype, "once", wd.api.Query.prototype.once);
wd.api.Query.prototype.limit = function(limit) {
  wd.core.util.warn("Query.limit() being deprecated. " + "Please use Query.limitToFirst() or Query.limitToLast() instead.");
  wd.util.validation.validateArgCount("Query.limit", 1, 1, arguments.length);
  if (!goog.isNumber(limit) || Math.floor(limit) !== limit || limit <= 0) {
    throw new Error("Query.limit: First argument must be a positive integer.");
  }
  if (this.queryParams_.hasLimit()) {
    throw new Error("Query.limit: Limit was already set (by another call to limit, limitToFirst, or" + "limitToLast.");
  }
  var newParams = this.queryParams_.limit(limit);
  this.validateLimit_(newParams);
  return new wd.api.Query(this.repo, this.path, newParams, this.orderByCalled_);
};
goog.exportProperty(wd.api.Query.prototype, "limit", wd.api.Query.prototype.limit);
wd.api.Query.prototype.limitToFirst = function(limit) {
  wd.util.validation.validateArgCount("Query.limitToFirst", 1, 1, arguments.length);
  if (!goog.isNumber(limit) || Math.floor(limit) !== limit || limit <= 0) {
    throw new Error("Query.limitToFirst: First argument must be a positive integer.");
  }
  if (this.queryParams_.hasLimit()) {
    throw new Error("Query.limitToFirst: Limit was already set (by another call to limit, " + "limitToFirst, or limitToLast).");
  }
  return new wd.api.Query(this.repo, this.path, this.queryParams_.limitToFirst(limit), this.orderByCalled_);
};
goog.exportProperty(wd.api.Query.prototype, "limitToFirst", wd.api.Query.prototype.limitToFirst);
wd.api.Query.prototype.limitToLast = function(limit) {
  wd.util.validation.validateArgCount("Query.limitToLast", 1, 1, arguments.length);
  if (!goog.isNumber(limit) || Math.floor(limit) !== limit || limit <= 0) {
    throw new Error("Query.limitToLast: First argument must be a positive integer.");
  }
  if (this.queryParams_.hasLimit()) {
    throw new Error("Query.limitToLast: Limit was already set (by another call to limit, " + "limitToFirst, or limitToLast).");
  }
  return new wd.api.Query(this.repo, this.path, this.queryParams_.limitToLast(limit), this.orderByCalled_);
};
goog.exportProperty(wd.api.Query.prototype, "limitToLast", wd.api.Query.prototype.limitToLast);
wd.api.Query.prototype.orderByChild = function(key) {
  wd.util.validation.validateArgCount("Query.orderByChild", 1, 1, arguments.length);
  if (key === "$key") {
    throw new Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');
  } else {
    if (key === "$priority") {
      throw new Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');
    } else {
      if (key === "$value") {
        throw new Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');
      }
    }
  }
  wd.core.util.validation.validateKey("Query.orderByChild", 1, key, false);
  this.validateNoPreviousOrderByCall_("Query.orderByChild");
  var index = new wd.core.snap.SubKeyIndex(key);
  var newParams = this.queryParams_.orderBy(index);
  this.validateQueryEndpoints_(newParams);
  return new wd.api.Query(this.repo, this.path, newParams, true);
};
goog.exportProperty(wd.api.Query.prototype, "orderByChild", wd.api.Query.prototype.orderByChild);
wd.api.Query.prototype.orderByKey = function() {
  wd.util.validation.validateArgCount("Query.orderByKey", 0, 0, arguments.length);
  this.validateNoPreviousOrderByCall_("Query.orderByKey");
  var newParams = this.queryParams_.orderBy(wd.core.snap.KeyIndex);
  this.validateQueryEndpoints_(newParams);
  return new wd.api.Query(this.repo, this.path, newParams, true);
};
goog.exportProperty(wd.api.Query.prototype, "orderByKey", wd.api.Query.prototype.orderByKey);
wd.api.Query.prototype.orderByPriority = function() {
  wd.util.validation.validateArgCount("Query.orderByPriority", 0, 0, arguments.length);
  this.validateNoPreviousOrderByCall_("Query.orderByPriority");
  var newParams = this.queryParams_.orderBy(wd.core.snap.PriorityIndex);
  this.validateQueryEndpoints_(newParams);
  return new wd.api.Query(this.repo, this.path, newParams, true);
};
goog.exportProperty(wd.api.Query.prototype, "orderByPriority", wd.api.Query.prototype.orderByPriority);
wd.api.Query.prototype.orderByValue = function() {
  wd.util.validation.validateArgCount("Query.orderByValue", 0, 0, arguments.length);
  this.validateNoPreviousOrderByCall_("Query.orderByValue");
  var newParams = this.queryParams_.orderBy(wd.core.snap.ValueIndex);
  this.validateQueryEndpoints_(newParams);
  return new wd.api.Query(this.repo, this.path, newParams, true);
};
goog.exportProperty(wd.api.Query.prototype, "orderByValue", wd.api.Query.prototype.orderByValue);
wd.api.Query.prototype.startAt = function(value, name) {
  wd.util.validation.validateArgCount("Query.startAt", 0, 2, arguments.length);
  wd.core.util.validation.validateWilddogDataArg("Query.startAt", 1, value, this.path, true);
  wd.core.util.validation.validateKey("Query.startAt", 2, name, true);
  var newParams = this.queryParams_.startAt(value, name);
  this.validateLimit_(newParams);
  this.validateQueryEndpoints_(newParams);
  if (this.queryParams_.hasStart()) {
    throw new Error("Query.startAt: Starting point was already set (by another call to startAt " + "or equalTo).");
  }
  if (!goog.isDef(value)) {
    value = null;
    name = null;
  }
  return new wd.api.Query(this.repo, this.path, newParams, this.orderByCalled_);
};
goog.exportProperty(wd.api.Query.prototype, "startAt", wd.api.Query.prototype.startAt);
wd.api.Query.prototype.endAt = function(value, name) {
  wd.util.validation.validateArgCount("Query.endAt", 0, 2, arguments.length);
  wd.core.util.validation.validateWilddogDataArg("Query.endAt", 1, value, this.path, true);
  wd.core.util.validation.validateKey("Query.endAt", 2, name, true);
  var newParams = this.queryParams_.endAt(value, name);
  this.validateLimit_(newParams);
  this.validateQueryEndpoints_(newParams);
  if (this.queryParams_.hasEnd()) {
    throw new Error("Query.endAt: Ending point was already set (by another call to endAt or " + "equalTo).");
  }
  return new wd.api.Query(this.repo, this.path, newParams, this.orderByCalled_);
};
goog.exportProperty(wd.api.Query.prototype, "endAt", wd.api.Query.prototype.endAt);
wd.api.Query.prototype.equalTo = function(value, name) {
  wd.util.validation.validateArgCount("Query.equalTo", 1, 2, arguments.length);
  wd.core.util.validation.validateWilddogDataArg("Query.equalTo", 1, value, this.path, false);
  wd.core.util.validation.validateKey("Query.equalTo", 2, name, true);
  if (this.queryParams_.hasStart()) {
    throw new Error("Query.equalTo: Starting point was already set (by another call to endAt or " + "equalTo).");
  }
  if (this.queryParams_.hasEnd()) {
    throw new Error("Query.equalTo: Ending point was already set (by another call to endAt or " + "equalTo).");
  }
  return this.startAt(value, name).endAt(value, name);
};
goog.exportProperty(wd.api.Query.prototype, "equalTo", wd.api.Query.prototype.equalTo);
wd.api.Query.prototype.toString = function() {
  wd.util.validation.validateArgCount("Query.toString", 0, 0, arguments.length);
  return this.repo.toString() + this.path.toUrlEncodedString();
};
goog.exportProperty(wd.api.Query.prototype, "toString", wd.api.Query.prototype.toString);
wd.api.Query.prototype.queryObject = function() {
  return this.queryParams_.getQueryObject();
};
wd.api.Query.prototype.queryIdentifier = function() {
  var obj = this.queryObject();
  var id = wd.core.util.ObjectToUniqueKey(obj);
  return id === "{}" ? "default" : id;
};
wd.api.Query.prototype.getCancelAndContextArgs_ = function(fnName, cancelOrContext, context) {
  var ret = {cancel:null, context:null};
  if (cancelOrContext && context) {
    ret.cancel = cancelOrContext;
    wd.util.validation.validateCallback(fnName, 3, ret.cancel, true);
    ret.context = context;
    wd.util.validation.validateContextObject(fnName, 4, ret.context, true);
  } else {
    if (cancelOrContext) {
      if (typeof cancelOrContext === "object" && cancelOrContext !== null) {
        ret.context = cancelOrContext;
      } else {
        if (typeof cancelOrContext === "function") {
          ret.cancel = cancelOrContext;
        } else {
          throw new Error(wd.util.validation.errorPrefix(fnName, 3, true) + " must either be a cancel callback or a context object.");
        }
      }
    }
  }
  return ret;
};
goog.provide("wd.api.OnDisconnect");
goog.require("wd.constants");
goog.require("wd.core.Repo");
goog.require("wd.core.util.validation");
goog.require("wd.util.validation");
wd.api.OnDisconnect = function(repo, path) {
  this.repo_ = repo;
  this.path_ = path;
};
wd.api.OnDisconnect.prototype.cancel = function(opt_onComplete) {
  wd.util.validation.validateArgCount("Wilddog.onDisconnect().cancel", 0, 1, arguments.length);
  wd.util.validation.validateCallback("Wilddog.onDisconnect().cancel", 1, opt_onComplete, true);
  this.repo_.onDisconnectCancel(this.path_, opt_onComplete || null);
};
goog.exportProperty(wd.api.OnDisconnect.prototype, "cancel", wd.api.OnDisconnect.prototype.cancel);
wd.api.OnDisconnect.prototype.remove = function(opt_onComplete) {
  wd.util.validation.validateArgCount("Wilddog.onDisconnect().remove", 0, 1, arguments.length);
  wd.core.util.validation.validateWritablePath("Wilddog.onDisconnect().remove", this.path_);
  wd.util.validation.validateCallback("Wilddog.onDisconnect().remove", 1, opt_onComplete, true);
  this.repo_.onDisconnectSet(this.path_, null, opt_onComplete);
};
goog.exportProperty(wd.api.OnDisconnect.prototype, "remove", wd.api.OnDisconnect.prototype.remove);
wd.api.OnDisconnect.prototype.set = function(value, opt_onComplete) {
  wd.util.validation.validateArgCount("Wilddog.onDisconnect().set", 1, 2, arguments.length);
  wd.core.util.validation.validateWritablePath("Wilddog.onDisconnect().set", this.path_);
  wd.core.util.validation.validateWilddogDataArg("Wilddog.onDisconnect().set", 1, value, this.path_, false);
  wd.util.validation.validateCallback("Wilddog.onDisconnect().set", 2, opt_onComplete, true);
  this.repo_.onDisconnectSet(this.path_, value, opt_onComplete);
};
goog.exportProperty(wd.api.OnDisconnect.prototype, "set", wd.api.OnDisconnect.prototype.set);
wd.api.OnDisconnect.prototype.setWithPriority = function(value, priority, opt_onComplete) {
  wd.util.validation.validateArgCount("Wilddog.onDisconnect().setWithPriority", 2, 3, arguments.length);
  wd.core.util.validation.validateWritablePath("Wilddog.onDisconnect().setWithPriority", this.path_);
  wd.core.util.validation.validateWilddogDataArg("Wilddog.onDisconnect().setWithPriority", 1, value, this.path_, false);
  wd.core.util.validation.validatePriority("Wilddog.onDisconnect().setWithPriority", 2, priority, false);
  wd.util.validation.validateCallback("Wilddog.onDisconnect().setWithPriority", 3, opt_onComplete, true);
  this.repo_.onDisconnectSetWithPriority(this.path_, value, priority, opt_onComplete);
};
goog.exportProperty(wd.api.OnDisconnect.prototype, "setWithPriority", wd.api.OnDisconnect.prototype.setWithPriority);
wd.api.OnDisconnect.prototype.update = function(objectToMerge, opt_onComplete) {
  wd.util.validation.validateArgCount("Wilddog.onDisconnect().update", 1, 2, arguments.length);
  wd.core.util.validation.validateWritablePath("Wilddog.onDisconnect().update", this.path_);
  if (goog.isArray(objectToMerge)) {
    var newObjectToMerge = {};
    for (var i = 0;i < objectToMerge.length;++i) {
      newObjectToMerge["" + i] = objectToMerge[i];
    }
    objectToMerge = newObjectToMerge;
    wd.core.util.warn("Passing an Array to Wilddog.onDisconnect().update() is deprecated. Use set() if you want to overwrite the " + "existing data, or an Object with integer keys if you really do want to only update some of the children.");
  }
  wd.core.util.validation.validateWilddogMergeDataArg("Wilddog.onDisconnect().update", 1, objectToMerge, this.path_, false);
  wd.util.validation.validateCallback("Wilddog.onDisconnect().update", 2, opt_onComplete, true);
  this.repo_.onDisconnectUpdate(this.path_, objectToMerge, opt_onComplete);
};
goog.exportProperty(wd.api.OnDisconnect.prototype, "update", wd.api.OnDisconnect.prototype.update);
goog.provide("wd.login.transports.PopupReceiver");
goog.require("wd.login.Constants");
goog.require("wd.login.Transport");
goog.require("wd.login.transports.util");
goog.require("wd.login.util.environment");
goog.require("wd.util.json");
wd.login.transports.PopupReceiver = function(cb) {
  var self = this;
  this.cb = cb;
  this.targetOrigin = "*";
  if (wd.login.util.environment.isModernIE()) {
    this.messageTarget = this.inboundTarget = wd.login.transports.util.findRelay();
  } else {
    this.messageTarget = window["opener"];
    this.inboundTarget = window;
  }
  if (!self.messageTarget) {
    throw "Unable to find relay frame";
  }
  wd.login.transports.util.addListener(this.inboundTarget, "message", goog.bind(this.onMessage_, this));
  wd.login.transports.util.addListener(this.inboundTarget, "message", goog.bind(this.onDie_, this));
  try {
    this.doPost_({"a":"ready"});
  } catch (e) {
    wd.login.transports.util.addListener(this.messageTarget, "load", function(e) {
      self.doPost_({"a":"ready"});
    });
  }
  wd.login.transports.util.addListener(window, "unload", goog.bind(this.onUnload_, this));
};
wd.login.transports.PopupReceiver.prototype.doPost_ = function(msg) {
  msg = wd.util.json.stringify(msg);
  if (wd.login.util.environment.isModernIE()) {
    this.messageTarget["doPost"](msg, this.targetOrigin);
  } else {
    this.messageTarget["postMessage"](msg, this.targetOrigin);
  }
};
wd.login.transports.PopupReceiver.prototype.onMessage_ = function(e) {
  var self = this, d;
  try {
    d = wd.util.json.eval(e["data"]);
  } catch (err) {
  }
  if (!d || d["a"] !== "request") {
    return;
  }
  wd.login.transports.util.removeListener(window, "message", this.onMessage_);
  this.targetOrigin = e["origin"];
  if (this.cb) {
    setTimeout(function() {
      self.cb(self.targetOrigin, d["d"], function(response, forceKeepWindowOpen) {
        self.autoClose = !forceKeepWindowOpen;
        self.cb = undefined;
        self.doPost_({"a":"response", "d":response, "forceKeepWindowOpen":forceKeepWindowOpen});
      });
    }, 0);
  }
};
wd.login.transports.PopupReceiver.prototype.onUnload_ = function() {
  try {
    wd.login.transports.util.removeListener(this.inboundTarget, "message", this.onDie_);
  } catch (err) {
  }
  if (this.cb) {
    this.doPost_({"a":"error", "d":"unknown closed window"});
    this.cb = undefined;
  }
  try {
    window.close();
  } catch (err) {
  }
};
wd.login.transports.PopupReceiver.prototype.onDie_ = function(e) {
  if (this.autoClose && e["data"] === wd.login.Constants.POPUP_CLOSE_CMD) {
    try {
      window.close();
    } catch (err) {
    }
  }
};
goog.provide("wd.api.INTERNAL");
goog.require("wd.core.PersistentConnection");
goog.require("wd.login.transports.PopupReceiver");
goog.require("wd.login.Constants");
wd.api.INTERNAL = {};
wd.api.INTERNAL.forceLongPolling = function() {
  wd.realtime.WebSocketConnection.forceDisallow();
  wd.realtime.BrowserPollConnection.forceAllow();
};
goog.exportProperty(wd.api.INTERNAL, "forceLongPolling", wd.api.INTERNAL.forceLongPolling);
wd.api.INTERNAL.forceWebSockets = function() {
  wd.realtime.BrowserPollConnection.forceDisallow();
};
goog.exportProperty(wd.api.INTERNAL, "forceWebSockets", wd.api.INTERNAL.forceWebSockets);
wd.api.INTERNAL.setSecurityDebugCallback = function(ref, callback) {
  ref.repo.persistentConnection_.securityDebugCallback_ = callback;
};
goog.exportProperty(wd.api.INTERNAL, "setSecurityDebugCallback", wd.api.INTERNAL.setSecurityDebugCallback);
wd.api.INTERNAL.stats = function(ref, showDelta) {
  ref.repo.stats(showDelta);
};
goog.exportProperty(wd.api.INTERNAL, "stats", wd.api.INTERNAL.stats);
wd.api.INTERNAL.statsIncrementCounter = function(ref, metric) {
  ref.repo.statsIncrementCounter(metric);
};
goog.exportProperty(wd.api.INTERNAL, "statsIncrementCounter", wd.api.INTERNAL.statsIncrementCounter);
wd.api.INTERNAL.dataUpdateCount = function(ref) {
  return ref.repo.dataUpdateCount;
};
goog.exportProperty(wd.api.INTERNAL, "dataUpdateCount", wd.api.INTERNAL.dataUpdateCount);
wd.api.INTERNAL.interceptServerData = function(ref, callback) {
  return ref.repo.interceptServerData_(callback);
};
goog.exportProperty(wd.api.INTERNAL, "interceptServerData", wd.api.INTERNAL.interceptServerData);
wd.api.INTERNAL.onLoginPopupOpen = function(callback) {
  new wd.login.transports.PopupReceiver(callback);
};
goog.exportProperty(wd.api.INTERNAL, "onPopupOpen", wd.api.INTERNAL.onLoginPopupOpen);
wd.api.INTERNAL.setAuthenticationServer = function(host) {
  wd.login.Constants.SERVER_HOST = host;
};
goog.exportProperty(wd.api.INTERNAL, "setAuthenticationServer", wd.api.INTERNAL.setAuthenticationServer);
goog.provide("Wilddog");
goog.require("wd.api.INTERNAL");
goog.require("wd.api.OnDisconnect");
goog.require("wd.api.Query");
goog.require("wd.api.TEST_ACCESS");
goog.require("wd.constants");
goog.require("wd.core.Repo");
goog.require("wd.core.RepoManager");
goog.require("wd.core.storage");
goog.require("wd.core.util");
goog.require("wd.core.util.nextPushId");
goog.require("wd.core.util.validation");
goog.require("goog.string");
Wilddog = function(urlOrRepo, pathOrContext) {
  var repo, path, repoManager;
  if (urlOrRepo instanceof wd.core.Repo) {
    repo = urlOrRepo;
    path = pathOrContext;
  } else {
    wd.util.validation.validateArgCount("new Wilddog", 1, 2, arguments.length);
    var parsedUrl = wd.core.util.parseRepoInfo(arguments[0]), repoInfo = parsedUrl.repoInfo;
    wd.core.util.validation.validateUrl("new Wilddog", 1, parsedUrl);
    if (pathOrContext) {
      if (pathOrContext instanceof wd.core.RepoManager) {
        repoManager = pathOrContext;
      } else {
        if (goog.isString(pathOrContext)) {
          repoManager = wd.core.RepoManager.getInstance();
          repoInfo.persistenceKey = pathOrContext;
        } else {
          throw new Error("Expected a valid Wilddog.Context for second argument to new Wilddog()");
        }
      }
    } else {
      repoManager = wd.core.RepoManager.getInstance();
    }
    repo = repoManager.getRepo(repoInfo);
    path = parsedUrl.path;
  }
  wd.api.Query.call(this, repo, path, wd.core.view.QueryParams.DEFAULT, false);
};
goog.inherits(Wilddog, wd.api.Query);
if (NODE_CLIENT) {
  module["exports"] = Wilddog;
}
Wilddog.prototype.name = function() {
  wd.core.util.warn("Wilddog.name() being deprecated. Please use Wilddog.key() instead.");
  wd.util.validation.validateArgCount("Wilddog.name", 0, 0, arguments.length);
  return this.key();
};
Wilddog.prototype.key = function() {
  wd.util.validation.validateArgCount("Wilddog.key", 0, 0, arguments.length);
  if (this.path.isEmpty()) {
    return null;
  } else {
    return this.path.getBack();
  }
};
Wilddog.prototype.child = function(pathString) {
  wd.util.validation.validateArgCount("Wilddog.child", 1, 1, arguments.length);
  if (goog.isNumber(pathString)) {
    pathString = String(pathString);
  } else {
    if (!(pathString instanceof wd.core.util.Path)) {
      if (this.path.getFront() === null) {
        wd.core.util.validation.validateRootPathString("Wilddog.child", 1, pathString, false);
      } else {
        wd.core.util.validation.validatePathString("Wilddog.child", 1, pathString, false);
      }
    }
  }
  return new Wilddog(this.repo, this.path.child(pathString));
};
Wilddog.prototype.parent = function() {
  wd.util.validation.validateArgCount("Wilddog.parent", 0, 0, arguments.length);
  var parentPath = this.path.parent();
  return parentPath === null ? null : new Wilddog(this.repo, parentPath);
};
Wilddog.prototype.root = function() {
  wd.util.validation.validateArgCount("Wilddog.ref", 0, 0, arguments.length);
  var ref = this;
  while (ref.parent() !== null) {
    ref = ref.parent();
  }
  return ref;
};
Wilddog.prototype.set = function(newVal, onComplete) {
  wd.util.validation.validateArgCount("Wilddog.set", 1, 2, arguments.length);
  wd.core.util.validation.validateWritablePath("Wilddog.set", this.path);
  wd.core.util.validation.validateWilddogDataArg("Wilddog.set", 1, newVal, this.path, false);
  wd.util.validation.validateCallback("Wilddog.set", 2, onComplete, true);
  this.repo.setWithPriority(this.path, newVal, null, onComplete || null);
};
Wilddog.prototype.update = function(objectToMerge, onComplete) {
  wd.util.validation.validateArgCount("Wilddog.update", 1, 2, arguments.length);
  wd.core.util.validation.validateWritablePath("Wilddog.update", this.path);
  if (goog.isArray(objectToMerge)) {
    var newObjectToMerge = {};
    for (var i = 0;i < objectToMerge.length;++i) {
      newObjectToMerge["" + i] = objectToMerge[i];
    }
    objectToMerge = newObjectToMerge;
    wd.core.util.warn("Passing an Array to Wilddog.update() is deprecated. Use set() if you want to overwrite the existing data, or " + "an Object with integer keys if you really do want to only update some of the children.");
  }
  wd.core.util.validation.validateWilddogMergeDataArg("Wilddog.update", 1, objectToMerge, this.path, false);
  wd.util.validation.validateCallback("Wilddog.update", 2, onComplete, true);
  this.repo.update(this.path, objectToMerge, onComplete || null);
};
Wilddog.prototype.setWithPriority = function(newVal, newPriority, onComplete) {
  wd.util.validation.validateArgCount("Wilddog.setWithPriority", 2, 3, arguments.length);
  wd.core.util.validation.validateWritablePath("Wilddog.setWithPriority", this.path);
  wd.core.util.validation.validateWilddogDataArg("Wilddog.setWithPriority", 1, newVal, this.path, false);
  wd.core.util.validation.validatePriority("Wilddog.setWithPriority", 2, newPriority, false);
  wd.util.validation.validateCallback("Wilddog.setWithPriority", 3, onComplete, true);
  if (this.key() === ".length" || this.key() === ".keys") {
    throw "Wilddog.setWithPriority failed: " + this.key() + " is a read-only object.";
  }
  this.repo.setWithPriority(this.path, newVal, newPriority, onComplete || null);
};
Wilddog.prototype.remove = function(onComplete) {
  wd.util.validation.validateArgCount("Wilddog.remove", 0, 1, arguments.length);
  wd.core.util.validation.validateWritablePath("Wilddog.remove", this.path);
  wd.util.validation.validateCallback("Wilddog.remove", 1, onComplete, true);
  this.set(null, onComplete);
};
Wilddog.prototype.transaction = function(transactionUpdate, onComplete, applyLocally) {
  wd.util.validation.validateArgCount("Wilddog.transaction", 1, 3, arguments.length);
  wd.core.util.validation.validateWritablePath("Wilddog.transaction", this.path);
  wd.util.validation.validateCallback("Wilddog.transaction", 1, transactionUpdate, false);
  wd.util.validation.validateCallback("Wilddog.transaction", 2, onComplete, true);
  wd.core.util.validation.validateBoolean("Wilddog.transaction", 3, applyLocally, true);
  if (this.key() === ".length" || this.key() === ".keys") {
    throw "Wilddog.transaction failed: " + this.key() + " is a read-only object.";
  }
  if (typeof applyLocally === "undefined") {
    applyLocally = true;
  }
  this.repo.startTransaction(this.path, transactionUpdate, onComplete || null, applyLocally);
};
Wilddog.prototype.setPriority = function(priority, opt_onComplete) {
  wd.util.validation.validateArgCount("Wilddog.setPriority", 1, 2, arguments.length);
  wd.core.util.validation.validateWritablePath("Wilddog.setPriority", this.path);
  wd.core.util.validation.validatePriority("Wilddog.setPriority", 1, priority, false);
  wd.util.validation.validateCallback("Wilddog.setPriority", 2, opt_onComplete, true);
  this.repo.setWithPriority(this.path.child(".priority"), priority, null, opt_onComplete);
};
Wilddog.prototype.push = function(value, onComplete) {
  wd.util.validation.validateArgCount("Wilddog.push", 0, 2, arguments.length);
  wd.core.util.validation.validateWritablePath("Wilddog.push", this.path);
  wd.core.util.validation.validateWilddogDataArg("Wilddog.push", 1, value, this.path, true);
  wd.util.validation.validateCallback("Wilddog.push", 2, onComplete, true);
  var now = this.repo.serverTime();
  var name = wd.core.util.nextPushId(now);
  var pushedRef = this.child(name);
  if (typeof value !== "undefined" && value !== null) {
    pushedRef.set(value, onComplete);
  }
  return pushedRef;
};
Wilddog.prototype.onDisconnect = function() {
  wd.core.util.validation.validateWritablePath("Wilddog.onDisconnect", this.path);
  return new wd.api.OnDisconnect(this.repo, this.path);
};
Wilddog.prototype.auth = function(cred, opt_onComplete, opt_onCancel) {
  wd.core.util.warn("WilddogRef.auth() being deprecated. " + "Please use WilddogRef.authWithCustomToken() instead.");
  wd.util.validation.validateArgCount("Wilddog.auth", 1, 3, arguments.length);
  wd.core.util.validation.validateCredential("Wilddog.auth", 1, cred, false);
  wd.util.validation.validateCallback("Wilddog.auth", 2, opt_onComplete, true);
  wd.util.validation.validateCallback("Wilddog.auth", 3, opt_onComplete, true);
  var clientOptions = {};
  clientOptions[wd.login.Constants.CLIENT_OPTION_SESSION_PERSISTENCE] = "none";
  this.repo.auth.authenticate(cred, {}, clientOptions, opt_onComplete, opt_onCancel);
};
Wilddog.prototype.unauth = function(opt_onComplete) {
  wd.util.validation.validateArgCount("Wilddog.unauth", 0, 1, arguments.length);
  wd.util.validation.validateCallback("Wilddog.unauth", 1, opt_onComplete, true);
  this.repo.auth.unauthenticate(opt_onComplete);
};
Wilddog.prototype.getAuth = function() {
  wd.util.validation.validateArgCount("Wilddog.getAuth", 0, 0, arguments.length);
  return this.repo.auth.getAuth();
};
Wilddog.prototype.onAuth = function(callback, opt_context) {
  wd.util.validation.validateArgCount("Wilddog.onAuth", 1, 2, arguments.length);
  wd.util.validation.validateCallback("Wilddog.onAuth", 1, callback, false);
  wd.util.validation.validateContextObject("Wilddog.onAuth", 2, opt_context, true);
  this.repo.auth.on("auth_status", callback, opt_context);
};
Wilddog.prototype.offAuth = function(callback, opt_context) {
  wd.util.validation.validateArgCount("Wilddog.offAuth", 1, 2, arguments.length);
  wd.util.validation.validateCallback("Wilddog.offAuth", 1, callback, false);
  wd.util.validation.validateContextObject("Wilddog.offAuth", 2, opt_context, true);
  this.repo.auth.off("auth_status", callback, opt_context);
};
Wilddog.prototype.authWithCustomToken = function(token, onComplete, opt_options) {
  wd.util.validation.validateArgCount("Wilddog.authWithCustomToken", 2, 3, arguments.length);
  wd.core.util.validation.validateCredential("Wilddog.authWithCustomToken", 1, token, false);
  wd.util.validation.validateCallback("Wilddog.authWithCustomToken", 2, onComplete, false);
  wd.core.util.validation.validateObject("Wilddog.authWithCustomToken", 3, opt_options, true);
  this.repo.auth.authenticate(token, {}, opt_options || {}, onComplete);
};
Wilddog.prototype.authWithOAuthPopup = function(provider, onComplete, opt_options) {
  wd.util.validation.validateArgCount("Wilddog.authWithOAuthPopup", 2, 3, arguments.length);
  wd.core.util.validation.validateString("Wilddog.authWithOAuthPopup", 1, provider, false);
  wd.util.validation.validateCallback("Wilddog.authWithOAuthPopup", 2, onComplete, false);
  wd.core.util.validation.validateObject("Wilddog.authWithOAuthPopup", 3, opt_options, true);
  this.repo.auth.authWithPopup(provider, opt_options, onComplete);
};
Wilddog.prototype.authWithOAuthRedirect = function(provider, onErr, opt_options) {
  wd.util.validation.validateArgCount("Wilddog.authWithOAuthRedirect", 2, 3, arguments.length);
  wd.core.util.validation.validateString("Wilddog.authWithOAuthRedirect", 1, provider, false);
  wd.util.validation.validateCallback("Wilddog.authWithOAuthRedirect", 2, onErr, false);
  wd.core.util.validation.validateObject("Wilddog.authWithOAuthRedirect", 3, opt_options, true);
  this.repo.auth.authWithRedirect(provider, opt_options, onErr);
};
Wilddog.prototype.authWithOAuthToken = function(provider, params, onComplete, opt_options) {
  wd.util.validation.validateArgCount("Wilddog.authWithOAuthToken", 3, 4, arguments.length);
  wd.core.util.validation.validateString("Wilddog.authWithOAuthToken", 1, provider, false);
  wd.util.validation.validateCallback("Wilddog.authWithOAuthToken", 3, onComplete, false);
  wd.core.util.validation.validateObject("Wilddog.authWithOAuthToken", 4, opt_options, true);
  if (goog.isString(params)) {
    wd.core.util.validation.validateString("Wilddog.authWithOAuthToken", 2, params, false);
    this.repo.auth.authWithCredential(provider + "/token", {"access_token":params}, opt_options, onComplete);
  } else {
    wd.core.util.validation.validateObject("Wilddog.authWithOAuthToken", 2, params, false);
    this.repo.auth.authWithCredential(provider + "/token", params, opt_options, onComplete);
  }
};
Wilddog.prototype.authAnonymously = function(onComplete, opt_options) {
  wd.util.validation.validateArgCount("Wilddog.authAnonymously", 1, 2, arguments.length);
  wd.util.validation.validateCallback("Wilddog.authAnonymously", 1, onComplete, false);
  wd.core.util.validation.validateObject("Wilddog.authAnonymously", 2, opt_options, true);
  this.repo.auth.authWithCredential("anonymous", {}, opt_options, onComplete);
};
Wilddog.prototype.authWithPassword = function(params, onComplete, opt_options) {
  wd.util.validation.validateArgCount("Wilddog.authWithPassword", 2, 3, arguments.length);
  wd.core.util.validation.validateObject("Wilddog.authWithPassword", 1, params, false);
  wd.core.util.validation.validateObjectContainsKey("Wilddog.authWithPassword", 1, params, "email", false, "string");
  wd.core.util.validation.validateObjectContainsKey("Wilddog.authWithPassword", 1, params, "password", false, "string");
  wd.util.validation.validateCallback("Wilddog.authAnonymously", 2, onComplete, false);
  wd.core.util.validation.validateObject("Wilddog.authAnonymously", 3, opt_options, true);
  this.repo.auth.authWithCredential("password", params, opt_options, onComplete);
};
Wilddog.prototype.createUser = function(params, onComplete) {
  wd.util.validation.validateArgCount("Wilddog.createUser", 2, 2, arguments.length);
  wd.core.util.validation.validateObject("Wilddog.createUser", 1, params, false);
  wd.core.util.validation.validateObjectContainsKey("Wilddog.createUser", 1, params, "email", false, "string");
  wd.core.util.validation.validateObjectContainsKey("Wilddog.createUser", 1, params, "password", false, "string");
  wd.util.validation.validateCallback("Wilddog.createUser", 2, onComplete, false);
  this.repo.auth.createUser(params, onComplete);
};
Wilddog.prototype.removeUser = function(params, onComplete) {
  wd.util.validation.validateArgCount("Wilddog.removeUser", 2, 2, arguments.length);
  wd.core.util.validation.validateObject("Wilddog.removeUser", 1, params, false);
  wd.core.util.validation.validateObjectContainsKey("Wilddog.removeUser", 1, params, "email", false, "string");
  wd.core.util.validation.validateObjectContainsKey("Wilddog.removeUser", 1, params, "password", false, "string");
  wd.util.validation.validateCallback("Wilddog.removeUser", 2, onComplete, false);
  this.repo.auth.removeUser(params, onComplete);
};
Wilddog.prototype.changePassword = function(params, onComplete) {
  wd.util.validation.validateArgCount("Wilddog.changePassword", 2, 2, arguments.length);
  wd.core.util.validation.validateObject("Wilddog.changePassword", 1, params, false);
  wd.core.util.validation.validateObjectContainsKey("Wilddog.changePassword", 1, params, "email", false, "string");
  wd.core.util.validation.validateObjectContainsKey("Wilddog.changePassword", 1, params, "oldPassword", false, "string");
  wd.core.util.validation.validateObjectContainsKey("Wilddog.changePassword", 1, params, "newPassword", false, "string");
  wd.util.validation.validateCallback("Wilddog.changePassword", 2, onComplete, false);
  this.repo.auth.changePassword(params, onComplete);
};
Wilddog.prototype.changeEmail = function(params, onComplete) {
  wd.util.validation.validateArgCount("Wilddog.changeEmail", 2, 2, arguments.length);
  wd.core.util.validation.validateObject("Wilddog.changeEmail", 1, params, false);
  wd.core.util.validation.validateObjectContainsKey("Wilddog.changeEmail", 1, params, "oldEmail", false, "string");
  wd.core.util.validation.validateObjectContainsKey("Wilddog.changeEmail", 1, params, "newEmail", false, "string");
  wd.core.util.validation.validateObjectContainsKey("Wilddog.changeEmail", 1, params, "password", false, "string");
  wd.util.validation.validateCallback("Wilddog.changeEmail", 2, onComplete, false);
  this.repo.auth.changeEmail(params, onComplete);
};
Wilddog.prototype.resetPassword = function(params, onComplete) {
  wd.util.validation.validateArgCount("Wilddog.resetPassword", 2, 2, arguments.length);
  wd.core.util.validation.validateObject("Wilddog.resetPassword", 1, params, false);
  wd.core.util.validation.validateObjectContainsKey("Wilddog.resetPassword", 1, params, "email", false, "string");
  wd.util.validation.validateCallback("Wilddog.resetPassword", 2, onComplete, false);
  this.repo.auth.resetPassword(params, onComplete);
};
Wilddog.goOffline = function() {
  wd.util.validation.validateArgCount("Wilddog.goOffline", 0, 0, arguments.length);
  wd.core.RepoManager.getInstance().interrupt();
};
Wilddog.goOnline = function() {
  wd.util.validation.validateArgCount("Wilddog.goOnline", 0, 0, arguments.length);
  wd.core.RepoManager.getInstance().resume();
};
Wilddog.enableLogging = function(logger, persistent) {
  wd.core.util.assert(!persistent || (logger === true || logger === false), "Can't turn on custom loggers persistently.");
  if (logger === true) {
    if (typeof console !== "undefined") {
      if (typeof console.log === "function") {
        wd.core.util.logger = goog.bind(console.log, console);
      } else {
        if (typeof console.log === "object") {
          wd.core.util.logger = function(message) {
            console.log(message);
          };
        }
      }
    }
    if (persistent) {
      wd.core.storage.SessionStorage.set("logging_enabled", true);
    }
  } else {
    if (logger) {
      wd.core.util.logger = logger;
    } else {
      wd.core.util.logger = null;
      wd.core.storage.SessionStorage.remove("logging_enabled");
    }
  }
};
Wilddog.ServerValue = {"TIMESTAMP":{".sv":"timestamp"}};
Wilddog.SDK_VERSION = CLIENT_VERSION;
Wilddog.INTERNAL = wd.api.INTERNAL;
Wilddog.Context = wd.core.RepoManager;
Wilddog.TEST_ACCESS = wd.api.TEST_ACCESS;
if (typeof window != "undefined") {
  window["Wilddog"] = Wilddog;
}
Wilddog.prototype["name"] = Wilddog.prototype.name;
Wilddog.prototype["key"] = Wilddog.prototype.key;
Wilddog.prototype["child"] = Wilddog.prototype.child;
Wilddog.prototype["parent"] = Wilddog.prototype.parent;
Wilddog.prototype["root"] = Wilddog.prototype.root;
Wilddog.prototype["set"] = Wilddog.prototype.set;
Wilddog.prototype["update"] = Wilddog.prototype.update;
Wilddog.prototype["setPriority"] = Wilddog.prototype.setPriority;
Wilddog.prototype["setWithPriority"] = Wilddog.prototype.setWithPriority;
Wilddog.prototype["remove"] = Wilddog.prototype.remove;
Wilddog.prototype["transaction"] = Wilddog.prototype.transaction;
Wilddog.prototype["push"] = Wilddog.prototype.push;
Wilddog.prototype["onDisconnect"] = Wilddog.prototype.onDisconnect;
Wilddog.prototype["auth"] = Wilddog.prototype.auth;
Wilddog.prototype["unauth"] = Wilddog.prototype.unauth;
Wilddog.prototype["getAuth"] = Wilddog.prototype.getAuth;
Wilddog.prototype["onAuth"] = Wilddog.prototype.onAuth;
Wilddog.prototype["offAuth"] = Wilddog.prototype.offAuth;
Wilddog.prototype["authWithCustomToken"] = Wilddog.prototype.authWithCustomToken;
Wilddog.prototype["authWithOAuthPopup"] = Wilddog.prototype.authWithOAuthPopup;
Wilddog.prototype["authWithOAuthRedirect"] = Wilddog.prototype.authWithOAuthRedirect;
Wilddog.prototype["authWithOAuthToken"] = Wilddog.prototype.authWithOAuthToken;
Wilddog.prototype["authAnonymously"] = Wilddog.prototype.authAnonymously;
Wilddog.prototype["authWithPassword"] = Wilddog.prototype.authWithPassword;
Wilddog.prototype["createUser"] = Wilddog.prototype.createUser;
Wilddog.prototype["removeUser"] = Wilddog.prototype.removeUser;
Wilddog.prototype["changeEmail"] = Wilddog.prototype.changeEmail;
Wilddog.prototype["changePassword"] = Wilddog.prototype.changePassword;
Wilddog.prototype["resetPassword"] = Wilddog.prototype.resetPassword;
Wilddog["goOnline"] = Wilddog.goOnline;
Wilddog["goOffline"] = Wilddog.goOffline;
Wilddog["ServerValue"] = Wilddog.ServerValue;
Wilddog["INTERNAL"] = Wilddog.INTERNAL;

}
ns.wrapper(ns.goog, ns.wd);
})({goog:{}, wd:{}});
Wilddog.SDK_VERSION = '0.4.8';

}).call(this,require("buffer").Buffer)
},{"buffer":53,"http":58,"https":62,"socket.io-client":2}],2:[function(require,module,exports){

module.exports = require('./lib/');

},{"./lib/":3}],3:[function(require,module,exports){

/**
 * Module dependencies.
 */

var url = require('./url');
var parser = require('socket.io-parser');
var Manager = require('./manager');
var debug = require('debug')('socket.io-client');

/**
 * Module exports.
 */

module.exports = exports = lookup;

/**
 * Managers cache.
 */

var cache = exports.managers = {};

/**
 * Looks up an existing `Manager` for multiplexing.
 * If the user summons:
 *
 *   `io('http://localhost/a');`
 *   `io('http://localhost/b');`
 *
 * We reuse the existing instance based on same scheme/port/host,
 * and we initialize sockets for each namespace.
 *
 * @api public
 */

function lookup(uri, opts) {
  if (typeof uri == 'object') {
    opts = uri;
    uri = undefined;
  }

  opts = opts || {};

  var parsed = url(uri);
  var source = parsed.source;
  var id = parsed.id;
  var io;

  if (opts.forceNew || opts['force new connection'] || false === opts.multiplex) {
    debug('ignoring socket cache for %s', source);
    io = Manager(source, opts);
  } else {
    if (!cache[id]) {
      debug('new io instance for %s', source);
      cache[id] = Manager(source, opts);
    }
    io = cache[id];
  }

  return io.socket(parsed.path);
}

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = parser.protocol;

/**
 * `connect`.
 *
 * @param {String} uri
 * @api public
 */

exports.connect = lookup;

/**
 * Expose constructors for standalone build.
 *
 * @api public
 */

exports.Manager = require('./manager');
exports.Socket = require('./socket');

},{"./manager":4,"./socket":6,"./url":7,"debug":11,"socket.io-parser":47}],4:[function(require,module,exports){

/**
 * Module dependencies.
 */

var url = require('./url');
var eio = require('engine.io-client');
var Socket = require('./socket');
var Emitter = require('component-emitter');
var parser = require('socket.io-parser');
var on = require('./on');
var bind = require('component-bind');
var object = require('object-component');
var debug = require('debug')('socket.io-client:manager');
var indexOf = require('indexof');
var Backoff = require('backo2');

/**
 * Module exports
 */

module.exports = Manager;

/**
 * `Manager` constructor.
 *
 * @param {String} engine instance or engine uri/opts
 * @param {Object} options
 * @api public
 */

function Manager(uri, opts){
  if (!(this instanceof Manager)) return new Manager(uri, opts);
  if (uri && ('object' == typeof uri)) {
    opts = uri;
    uri = undefined;
  }
  opts = opts || {};

  opts.path = opts.path || '/socket.io';
  this.nsps = {};
  this.subs = [];
  this.opts = opts;
  this.reconnection(opts.reconnection !== false);
  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
  this.reconnectionDelay(opts.reconnectionDelay || 1000);
  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
  this.randomizationFactor(opts.randomizationFactor || 0.5);
  this.backoff = new Backoff({
    min: this.reconnectionDelay(),
    max: this.reconnectionDelayMax(),
    jitter: this.randomizationFactor()
  });
  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
  this.readyState = 'closed';
  this.uri = uri;
  this.connected = [];
  this.encoding = false;
  this.packetBuffer = [];
  this.encoder = new parser.Encoder();
  this.decoder = new parser.Decoder();
  this.autoConnect = opts.autoConnect !== false;
  if (this.autoConnect) this.open();
}

/**
 * Propagate given event to sockets and emit on `this`
 *
 * @api private
 */

Manager.prototype.emitAll = function() {
  this.emit.apply(this, arguments);
  for (var nsp in this.nsps) {
    this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
  }
};

/**
 * Update `socket.id` of all sockets
 *
 * @api private
 */

Manager.prototype.updateSocketIds = function(){
  for (var nsp in this.nsps) {
    this.nsps[nsp].id = this.engine.id;
  }
};

/**
 * Mix in `Emitter`.
 */

Emitter(Manager.prototype);

/**
 * Sets the `reconnection` config.
 *
 * @param {Boolean} true/false if it should automatically reconnect
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnection = function(v){
  if (!arguments.length) return this._reconnection;
  this._reconnection = !!v;
  return this;
};

/**
 * Sets the reconnection attempts config.
 *
 * @param {Number} max reconnection attempts before giving up
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionAttempts = function(v){
  if (!arguments.length) return this._reconnectionAttempts;
  this._reconnectionAttempts = v;
  return this;
};

/**
 * Sets the delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelay = function(v){
  if (!arguments.length) return this._reconnectionDelay;
  this._reconnectionDelay = v;
  this.backoff && this.backoff.setMin(v);
  return this;
};

Manager.prototype.randomizationFactor = function(v){
  if (!arguments.length) return this._randomizationFactor;
  this._randomizationFactor = v;
  this.backoff && this.backoff.setJitter(v);
  return this;
};

/**
 * Sets the maximum delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelayMax = function(v){
  if (!arguments.length) return this._reconnectionDelayMax;
  this._reconnectionDelayMax = v;
  this.backoff && this.backoff.setMax(v);
  return this;
};

/**
 * Sets the connection timeout. `false` to disable
 *
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.timeout = function(v){
  if (!arguments.length) return this._timeout;
  this._timeout = v;
  return this;
};

/**
 * Starts trying to reconnect if reconnection is enabled and we have not
 * started reconnecting yet
 *
 * @api private
 */

Manager.prototype.maybeReconnectOnOpen = function() {
  // Only try to reconnect if it's the first time we're connecting
  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
    // keeps reconnection from firing twice for the same reconnection loop
    this.reconnect();
  }
};


/**
 * Sets the current transport `socket`.
 *
 * @param {Function} optional, callback
 * @return {Manager} self
 * @api public
 */

Manager.prototype.open =
Manager.prototype.connect = function(fn){
  debug('readyState %s', this.readyState);
  if (~this.readyState.indexOf('open')) return this;

  debug('opening %s', this.uri);
  this.engine = eio(this.uri, this.opts);
  var socket = this.engine;
  var self = this;
  this.readyState = 'opening';
  this.skipReconnect = false;

  // emit `open`
  var openSub = on(socket, 'open', function() {
    self.onopen();
    fn && fn();
  });

  // emit `connect_error`
  var errorSub = on(socket, 'error', function(data){
    debug('connect_error');
    self.cleanup();
    self.readyState = 'closed';
    self.emitAll('connect_error', data);
    if (fn) {
      var err = new Error('Connection error');
      err.data = data;
      fn(err);
    } else {
      // Only do this if there is no fn to handle the error
      self.maybeReconnectOnOpen();
    }
  });

  // emit `connect_timeout`
  if (false !== this._timeout) {
    var timeout = this._timeout;
    debug('connect attempt will timeout after %d', timeout);

    // set timer
    var timer = setTimeout(function(){
      debug('connect attempt timed out after %d', timeout);
      openSub.destroy();
      socket.close();
      socket.emit('error', 'timeout');
      self.emitAll('connect_timeout', timeout);
    }, timeout);

    this.subs.push({
      destroy: function(){
        clearTimeout(timer);
      }
    });
  }

  this.subs.push(openSub);
  this.subs.push(errorSub);

  return this;
};

/**
 * Called upon transport open.
 *
 * @api private
 */

Manager.prototype.onopen = function(){
  debug('open');

  // clear old subs
  this.cleanup();

  // mark as open
  this.readyState = 'open';
  this.emit('open');

  // add new subs
  var socket = this.engine;
  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
};

/**
 * Called with data.
 *
 * @api private
 */

Manager.prototype.ondata = function(data){
  this.decoder.add(data);
};

/**
 * Called when parser fully decodes a packet.
 *
 * @api private
 */

Manager.prototype.ondecoded = function(packet) {
  this.emit('packet', packet);
};

/**
 * Called upon socket error.
 *
 * @api private
 */

Manager.prototype.onerror = function(err){
  debug('error', err);
  this.emitAll('error', err);
};

/**
 * Creates a new socket for the given `nsp`.
 *
 * @return {Socket}
 * @api public
 */

Manager.prototype.socket = function(nsp){
  var socket = this.nsps[nsp];
  if (!socket) {
    socket = new Socket(this, nsp);
    this.nsps[nsp] = socket;
    var self = this;
    socket.on('connect', function(){
      socket.id = self.engine.id;
      if (!~indexOf(self.connected, socket)) {
        self.connected.push(socket);
      }
    });
  }
  return socket;
};

/**
 * Called upon a socket close.
 *
 * @param {Socket} socket
 */

Manager.prototype.destroy = function(socket){
  var index = indexOf(this.connected, socket);
  if (~index) this.connected.splice(index, 1);
  if (this.connected.length) return;

  this.close();
};

/**
 * Writes a packet.
 *
 * @param {Object} packet
 * @api private
 */

Manager.prototype.packet = function(packet){
  debug('writing packet %j', packet);
  var self = this;

  if (!self.encoding) {
    // encode, then write to engine with result
    self.encoding = true;
    this.encoder.encode(packet, function(encodedPackets) {
      for (var i = 0; i < encodedPackets.length; i++) {
        self.engine.write(encodedPackets[i]);
      }
      self.encoding = false;
      self.processPacketQueue();
    });
  } else { // add packet to the queue
    self.packetBuffer.push(packet);
  }
};

/**
 * If packet buffer is non-empty, begins encoding the
 * next packet in line.
 *
 * @api private
 */

Manager.prototype.processPacketQueue = function() {
  if (this.packetBuffer.length > 0 && !this.encoding) {
    var pack = this.packetBuffer.shift();
    this.packet(pack);
  }
};

/**
 * Clean up transport subscriptions and packet buffer.
 *
 * @api private
 */

Manager.prototype.cleanup = function(){
  var sub;
  while (sub = this.subs.shift()) sub.destroy();

  this.packetBuffer = [];
  this.encoding = false;

  this.decoder.destroy();
};

/**
 * Close the current socket.
 *
 * @api private
 */

Manager.prototype.close =
Manager.prototype.disconnect = function(){
  this.skipReconnect = true;
  this.backoff.reset();
  this.readyState = 'closed';
  this.engine && this.engine.close();
};

/**
 * Called upon engine close.
 *
 * @api private
 */

Manager.prototype.onclose = function(reason){
  debug('close');
  this.cleanup();
  this.backoff.reset();
  this.readyState = 'closed';
  this.emit('close', reason);
  if (this._reconnection && !this.skipReconnect) {
    this.reconnect();
  }
};

/**
 * Attempt a reconnection.
 *
 * @api private
 */

Manager.prototype.reconnect = function(){
  if (this.reconnecting || this.skipReconnect) return this;

  var self = this;

  if (this.backoff.attempts >= this._reconnectionAttempts) {
    debug('reconnect failed');
    this.backoff.reset();
    this.emitAll('reconnect_failed');
    this.reconnecting = false;
  } else {
    var delay = this.backoff.duration();
    debug('will wait %dms before reconnect attempt', delay);

    this.reconnecting = true;
    var timer = setTimeout(function(){
      if (self.skipReconnect) return;

      debug('attempting reconnect');
      self.emitAll('reconnect_attempt', self.backoff.attempts);
      self.emitAll('reconnecting', self.backoff.attempts);

      // check again for the case socket closed in above events
      if (self.skipReconnect) return;

      self.open(function(err){
        if (err) {
          debug('reconnect attempt error');
          self.reconnecting = false;
          self.reconnect();
          self.emitAll('reconnect_error', err.data);
        } else {
          debug('reconnect success');
          self.onreconnect();
        }
      });
    }, delay);

    this.subs.push({
      destroy: function(){
        clearTimeout(timer);
      }
    });
  }
};

/**
 * Called upon successful reconnect.
 *
 * @api private
 */

Manager.prototype.onreconnect = function(){
  var attempt = this.backoff.attempts;
  this.reconnecting = false;
  this.backoff.reset();
  this.updateSocketIds();
  this.emitAll('reconnect', attempt);
};

},{"./on":5,"./socket":6,"./url":7,"backo2":8,"component-bind":9,"component-emitter":10,"debug":11,"engine.io-client":12,"indexof":43,"object-component":44,"socket.io-parser":47}],5:[function(require,module,exports){

/**
 * Module exports.
 */

module.exports = on;

/**
 * Helper for subscriptions.
 *
 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
 * @param {String} event name
 * @param {Function} callback
 * @api public
 */

function on(obj, ev, fn) {
  obj.on(ev, fn);
  return {
    destroy: function(){
      obj.removeListener(ev, fn);
    }
  };
}

},{}],6:[function(require,module,exports){

/**
 * Module dependencies.
 */

var parser = require('socket.io-parser');
var Emitter = require('component-emitter');
var toArray = require('to-array');
var on = require('./on');
var bind = require('component-bind');
var debug = require('debug')('socket.io-client:socket');
var hasBin = require('has-binary');

/**
 * Module exports.
 */

module.exports = exports = Socket;

/**
 * Internal events (blacklisted).
 * These events can't be emitted by the user.
 *
 * @api private
 */

var events = {
  connect: 1,
  connect_error: 1,
  connect_timeout: 1,
  disconnect: 1,
  error: 1,
  reconnect: 1,
  reconnect_attempt: 1,
  reconnect_failed: 1,
  reconnect_error: 1,
  reconnecting: 1
};

/**
 * Shortcut to `Emitter#emit`.
 */

var emit = Emitter.prototype.emit;

/**
 * `Socket` constructor.
 *
 * @api public
 */

function Socket(io, nsp){
  this.io = io;
  this.nsp = nsp;
  this.json = this; // compat
  this.ids = 0;
  this.acks = {};
  if (this.io.autoConnect) this.open();
  this.receiveBuffer = [];
  this.sendBuffer = [];
  this.connected = false;
  this.disconnected = true;
}

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Subscribe to open, close and packet events
 *
 * @api private
 */

Socket.prototype.subEvents = function() {
  if (this.subs) return;

  var io = this.io;
  this.subs = [
    on(io, 'open', bind(this, 'onopen')),
    on(io, 'packet', bind(this, 'onpacket')),
    on(io, 'close', bind(this, 'onclose'))
  ];
};

/**
 * "Opens" the socket.
 *
 * @api public
 */

Socket.prototype.open =
Socket.prototype.connect = function(){
  if (this.connected) return this;

  this.subEvents();
  this.io.open(); // ensure open
  if ('open' == this.io.readyState) this.onopen();
  return this;
};

/**
 * Sends a `message` event.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.send = function(){
  var args = toArray(arguments);
  args.unshift('message');
  this.emit.apply(this, args);
  return this;
};

/**
 * Override `emit`.
 * If the event is in `events`, it's emitted normally.
 *
 * @param {String} event name
 * @return {Socket} self
 * @api public
 */

Socket.prototype.emit = function(ev){
  if (events.hasOwnProperty(ev)) {
    emit.apply(this, arguments);
    return this;
  }

  var args = toArray(arguments);
  var parserType = parser.EVENT; // default
  if (hasBin(args)) { parserType = parser.BINARY_EVENT; } // binary
  var packet = { type: parserType, data: args };

  // event ack callback
  if ('function' == typeof args[args.length - 1]) {
    debug('emitting packet with ack id %d', this.ids);
    this.acks[this.ids] = args.pop();
    packet.id = this.ids++;
  }

  if (this.connected) {
    this.packet(packet);
  } else {
    this.sendBuffer.push(packet);
  }

  return this;
};

/**
 * Sends a packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.packet = function(packet){
  packet.nsp = this.nsp;
  this.io.packet(packet);
};

/**
 * Called upon engine `open`.
 *
 * @api private
 */

Socket.prototype.onopen = function(){
  debug('transport is open - connecting');

  // write connect packet if necessary
  if ('/' != this.nsp) {
    this.packet({ type: parser.CONNECT });
  }
};

/**
 * Called upon engine `close`.
 *
 * @param {String} reason
 * @api private
 */

Socket.prototype.onclose = function(reason){
  debug('close (%s)', reason);
  this.connected = false;
  this.disconnected = true;
  delete this.id;
  this.emit('disconnect', reason);
};

/**
 * Called with socket packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onpacket = function(packet){
  if (packet.nsp != this.nsp) return;

  switch (packet.type) {
    case parser.CONNECT:
      this.onconnect();
      break;

    case parser.EVENT:
      this.onevent(packet);
      break;

    case parser.BINARY_EVENT:
      this.onevent(packet);
      break;

    case parser.ACK:
      this.onack(packet);
      break;

    case parser.BINARY_ACK:
      this.onack(packet);
      break;

    case parser.DISCONNECT:
      this.ondisconnect();
      break;

    case parser.ERROR:
      this.emit('error', packet.data);
      break;
  }
};

/**
 * Called upon a server event.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onevent = function(packet){
  var args = packet.data || [];
  debug('emitting event %j', args);

  if (null != packet.id) {
    debug('attaching ack callback to event');
    args.push(this.ack(packet.id));
  }

  if (this.connected) {
    emit.apply(this, args);
  } else {
    this.receiveBuffer.push(args);
  }
};

/**
 * Produces an ack callback to emit with an event.
 *
 * @api private
 */

Socket.prototype.ack = function(id){
  var self = this;
  var sent = false;
  return function(){
    // prevent double callbacks
    if (sent) return;
    sent = true;
    var args = toArray(arguments);
    debug('sending ack %j', args);

    var type = hasBin(args) ? parser.BINARY_ACK : parser.ACK;
    self.packet({
      type: type,
      id: id,
      data: args
    });
  };
};

/**
 * Called upon a server acknowlegement.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onack = function(packet){
  debug('calling ack %s with %j', packet.id, packet.data);
  var fn = this.acks[packet.id];
  fn.apply(this, packet.data);
  delete this.acks[packet.id];
};

/**
 * Called upon server connect.
 *
 * @api private
 */

Socket.prototype.onconnect = function(){
  this.connected = true;
  this.disconnected = false;
  this.emit('connect');
  this.emitBuffered();
};

/**
 * Emit buffered events (received and emitted).
 *
 * @api private
 */

Socket.prototype.emitBuffered = function(){
  var i;
  for (i = 0; i < this.receiveBuffer.length; i++) {
    emit.apply(this, this.receiveBuffer[i]);
  }
  this.receiveBuffer = [];

  for (i = 0; i < this.sendBuffer.length; i++) {
    this.packet(this.sendBuffer[i]);
  }
  this.sendBuffer = [];
};

/**
 * Called upon server disconnect.
 *
 * @api private
 */

Socket.prototype.ondisconnect = function(){
  debug('server disconnect (%s)', this.nsp);
  this.destroy();
  this.onclose('io server disconnect');
};

/**
 * Called upon forced client/server side disconnections,
 * this method ensures the manager stops tracking us and
 * that reconnections don't get triggered for this.
 *
 * @api private.
 */

Socket.prototype.destroy = function(){
  if (this.subs) {
    // clean subscriptions to avoid reconnections
    for (var i = 0; i < this.subs.length; i++) {
      this.subs[i].destroy();
    }
    this.subs = null;
  }

  this.io.destroy(this);
};

/**
 * Disconnects the socket manually.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.close =
Socket.prototype.disconnect = function(){
  if (this.connected) {
    debug('performing disconnect (%s)', this.nsp);
    this.packet({ type: parser.DISCONNECT });
  }

  // remove socket from pool
  this.destroy();

  if (this.connected) {
    // fire events
    this.onclose('io client disconnect');
  }
  return this;
};

},{"./on":5,"component-bind":9,"component-emitter":10,"debug":11,"has-binary":41,"socket.io-parser":47,"to-array":51}],7:[function(require,module,exports){
(function (global){

/**
 * Module dependencies.
 */

var parseuri = require('parseuri');
var debug = require('debug')('socket.io-client:url');

/**
 * Module exports.
 */

module.exports = url;

/**
 * URL parser.
 *
 * @param {String} url
 * @param {Object} An object meant to mimic window.location.
 *                 Defaults to window.location.
 * @api public
 */

function url(uri, loc){
  var obj = uri;

  // default to window.location
  var loc = loc || global.location;
  if (null == uri) uri = loc.protocol + '//' + loc.host;

  // relative path support
  if ('string' == typeof uri) {
    if ('/' == uri.charAt(0)) {
      if ('/' == uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.hostname + uri;
      }
    }

    if (!/^(https?|wss?):\/\//.test(uri)) {
      debug('protocol-less url %s', uri);
      if ('undefined' != typeof loc) {
        uri = loc.protocol + '//' + uri;
      } else {
        uri = 'https://' + uri;
      }
    }

    // parse
    debug('parse %s', uri);
    obj = parseuri(uri);
  }

  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = '80';
    }
    else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = '443';
    }
  }

  obj.path = obj.path || '/';

  // define unique id
  obj.id = obj.protocol + '://' + obj.host + ':' + obj.port;
  // define href
  obj.href = obj.protocol + '://' + obj.host + (loc && loc.port == obj.port ? '' : (':' + obj.port));

  return obj;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"debug":11,"parseuri":45}],8:[function(require,module,exports){

/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function(){
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand =  Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function(){
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function(min){
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function(max){
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function(jitter){
  this.jitter = jitter;
};


},{}],9:[function(require,module,exports){
/**
 * Slice reference.
 */

var slice = [].slice;

/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

module.exports = function(obj, fn){
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function(){
    return fn.apply(obj, args.concat(slice.call(arguments)));
  }
};

},{}],10:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],11:[function(require,module,exports){

/**
 * Expose `debug()` as the module.
 */

module.exports = debug;

/**
 * Create a debugger with the given `name`.
 *
 * @param {String} name
 * @return {Type}
 * @api public
 */

function debug(name) {
  if (!debug.enabled(name)) return function(){};

  return function(fmt){
    fmt = coerce(fmt);

    var curr = new Date;
    var ms = curr - (debug[name] || curr);
    debug[name] = curr;

    fmt = name
      + ' '
      + fmt
      + ' +' + debug.humanize(ms);

    // This hackery is required for IE8
    // where `console.log` doesn't have 'apply'
    window.console
      && console.log
      && Function.prototype.apply.call(console.log, console, arguments);
  }
}

/**
 * The currently active debug mode names.
 */

debug.names = [];
debug.skips = [];

/**
 * Enables a debug mode by name. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} name
 * @api public
 */

debug.enable = function(name) {
  try {
    localStorage.debug = name;
  } catch(e){}

  var split = (name || '').split(/[\s,]+/)
    , len = split.length;

  for (var i = 0; i < len; i++) {
    name = split[i].replace('*', '.*?');
    if (name[0] === '-') {
      debug.skips.push(new RegExp('^' + name.substr(1) + '$'));
    }
    else {
      debug.names.push(new RegExp('^' + name + '$'));
    }
  }
};

/**
 * Disable debug output.
 *
 * @api public
 */

debug.disable = function(){
  debug.enable('');
};

/**
 * Humanize the given `ms`.
 *
 * @param {Number} m
 * @return {String}
 * @api private
 */

debug.humanize = function(ms) {
  var sec = 1000
    , min = 60 * 1000
    , hour = 60 * min;

  if (ms >= hour) return (ms / hour).toFixed(1) + 'h';
  if (ms >= min) return (ms / min).toFixed(1) + 'm';
  if (ms >= sec) return (ms / sec | 0) + 's';
  return ms + 'ms';
};

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

debug.enabled = function(name) {
  for (var i = 0, len = debug.skips.length; i < len; i++) {
    if (debug.skips[i].test(name)) {
      return false;
    }
  }
  for (var i = 0, len = debug.names.length; i < len; i++) {
    if (debug.names[i].test(name)) {
      return true;
    }
  }
  return false;
};

/**
 * Coerce `val`.
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

// persist

try {
  if (window.localStorage) debug.enable(localStorage.debug);
} catch(e){}

},{}],12:[function(require,module,exports){

module.exports =  require('./lib/');

},{"./lib/":13}],13:[function(require,module,exports){

module.exports = require('./socket');

/**
 * Exports parser
 *
 * @api public
 *
 */
module.exports.parser = require('engine.io-parser');

},{"./socket":14,"engine.io-parser":26}],14:[function(require,module,exports){
(function (global){
/**
 * Module dependencies.
 */

var transports = require('./transports');
var Emitter = require('component-emitter');
var debug = require('debug')('engine.io-client:socket');
var index = require('indexof');
var parser = require('engine.io-parser');
var parseuri = require('parseuri');
var parsejson = require('parsejson');
var parseqs = require('parseqs');

/**
 * Module exports.
 */

module.exports = Socket;

/**
 * Noop function.
 *
 * @api private
 */

function noop(){}

/**
 * Socket constructor.
 *
 * @param {String|Object} uri or options
 * @param {Object} options
 * @api public
 */

function Socket(uri, opts){
  if (!(this instanceof Socket)) return new Socket(uri, opts);

  opts = opts || {};

  if (uri && 'object' == typeof uri) {
    opts = uri;
    uri = null;
  }

  if (uri) {
    uri = parseuri(uri);
    opts.host = uri.host;
    opts.secure = uri.protocol == 'https' || uri.protocol == 'wss';
    opts.port = uri.port;
    if (uri.query) opts.query = uri.query;
  }

  this.secure = null != opts.secure ? opts.secure :
    (global.location && 'https:' == location.protocol);

  if (opts.host) {
    var pieces = opts.host.split(':');
    opts.hostname = pieces.shift();
    if (pieces.length) {
      opts.port = pieces.pop();
    } else if (!opts.port) {
      // if no port is specified manually, use the protocol default
      opts.port = this.secure ? '443' : '80';
    }
  }

  this.agent = opts.agent || false;
  this.hostname = opts.hostname ||
    (global.location ? location.hostname : 'localhost');
  this.port = opts.port || (global.location && location.port ?
       location.port :
       (this.secure ? 443 : 80));
  this.query = opts.query || {};
  if ('string' == typeof this.query) this.query = parseqs.decode(this.query);
  this.upgrade = false !== opts.upgrade;
  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
  this.forceJSONP = !!opts.forceJSONP;
  this.jsonp = false !== opts.jsonp;
  this.forceBase64 = !!opts.forceBase64;
  this.enablesXDR = !!opts.enablesXDR;
  this.timestampParam = opts.timestampParam || 't';
  this.timestampRequests = opts.timestampRequests;
  this.transports = opts.transports || ['polling', 'websocket'];
  this.readyState = '';
  this.writeBuffer = [];
  this.callbackBuffer = [];
  this.policyPort = opts.policyPort || 843;
  this.rememberUpgrade = opts.rememberUpgrade || false;
  this.binaryType = null;
  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;

  // SSL options for Node.js client
  this.pfx = opts.pfx || null;
  this.key = opts.key || null;
  this.passphrase = opts.passphrase || null;
  this.cert = opts.cert || null;
  this.ca = opts.ca || null;
  this.ciphers = opts.ciphers || null;
  this.rejectUnauthorized = opts.rejectUnauthorized || null;

  this.open();
}

Socket.priorWebsocketSuccess = false;

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = parser.protocol; // this is an int

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

Socket.Socket = Socket;
Socket.Transport = require('./transport');
Socket.transports = require('./transports');
Socket.parser = require('engine.io-parser');

/**
 * Creates transport of the given type.
 *
 * @param {String} transport name
 * @return {Transport}
 * @api private
 */

Socket.prototype.createTransport = function (name) {
  debug('creating transport "%s"', name);
  var query = clone(this.query);

  // append engine.io protocol identifier
  query.EIO = parser.protocol;

  // transport name
  query.transport = name;

  // session id if we already have one
  if (this.id) query.sid = this.id;

  var transport = new transports[name]({
    agent: this.agent,
    hostname: this.hostname,
    port: this.port,
    secure: this.secure,
    path: this.path,
    query: query,
    forceJSONP: this.forceJSONP,
    jsonp: this.jsonp,
    forceBase64: this.forceBase64,
    enablesXDR: this.enablesXDR,
    timestampRequests: this.timestampRequests,
    timestampParam: this.timestampParam,
    policyPort: this.policyPort,
    socket: this,
    pfx: this.pfx,
    key: this.key,
    passphrase: this.passphrase,
    cert: this.cert,
    ca: this.ca,
    ciphers: this.ciphers,
    rejectUnauthorized: this.rejectUnauthorized
  });

  return transport;
};

function clone (obj) {
  var o = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

/**
 * Initializes transport to use and starts probe.
 *
 * @api private
 */
Socket.prototype.open = function () {
  var transport;
  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') != -1) {
    transport = 'websocket';
  } else if (0 == this.transports.length) {
    // Emit error on next tick so it can be listened to
    var self = this;
    setTimeout(function() {
      self.emit('error', 'No transports available');
    }, 0);
    return;
  } else {
    transport = this.transports[0];
  }
  this.readyState = 'opening';

  // Retry with the next transport if the transport is disabled (jsonp: false)
  var transport;
  try {
    transport = this.createTransport(transport);
  } catch (e) {
    this.transports.shift();
    this.open();
    return;
  }

  transport.open();
  this.setTransport(transport);
};

/**
 * Sets the current transport. Disables the existing one (if any).
 *
 * @api private
 */

Socket.prototype.setTransport = function(transport){
  debug('setting transport %s', transport.name);
  var self = this;

  if (this.transport) {
    debug('clearing existing transport %s', this.transport.name);
    this.transport.removeAllListeners();
  }

  // set up transport
  this.transport = transport;

  // set up transport listeners
  transport
  .on('drain', function(){
    self.onDrain();
  })
  .on('packet', function(packet){
    self.onPacket(packet);
  })
  .on('error', function(e){
    self.onError(e);
  })
  .on('close', function(){
    self.onClose('transport close');
  });
};

/**
 * Probes a transport.
 *
 * @param {String} transport name
 * @api private
 */

Socket.prototype.probe = function (name) {
  debug('probing transport "%s"', name);
  var transport = this.createTransport(name, { probe: 1 })
    , failed = false
    , self = this;

  Socket.priorWebsocketSuccess = false;

  function onTransportOpen(){
    if (self.onlyBinaryUpgrades) {
      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
      failed = failed || upgradeLosesBinary;
    }
    if (failed) return;

    debug('probe transport "%s" opened', name);
    transport.send([{ type: 'ping', data: 'probe' }]);
    transport.once('packet', function (msg) {
      if (failed) return;
      if ('pong' == msg.type && 'probe' == msg.data) {
        debug('probe transport "%s" pong', name);
        self.upgrading = true;
        self.emit('upgrading', transport);
        if (!transport) return;
        Socket.priorWebsocketSuccess = 'websocket' == transport.name;

        debug('pausing current transport "%s"', self.transport.name);
        self.transport.pause(function () {
          if (failed) return;
          if ('closed' == self.readyState) return;
          debug('changing transport and sending upgrade packet');

          cleanup();

          self.setTransport(transport);
          transport.send([{ type: 'upgrade' }]);
          self.emit('upgrade', transport);
          transport = null;
          self.upgrading = false;
          self.flush();
        });
      } else {
        debug('probe transport "%s" failed', name);
        var err = new Error('probe error');
        err.transport = transport.name;
        self.emit('upgradeError', err);
      }
    });
  }

  function freezeTransport() {
    if (failed) return;

    // Any callback called by transport should be ignored since now
    failed = true;

    cleanup();

    transport.close();
    transport = null;
  }

  //Handle any error that happens while probing
  function onerror(err) {
    var error = new Error('probe error: ' + err);
    error.transport = transport.name;

    freezeTransport();

    debug('probe transport "%s" failed because of error: %s', name, err);

    self.emit('upgradeError', error);
  }

  function onTransportClose(){
    onerror("transport closed");
  }

  //When the socket is closed while we're probing
  function onclose(){
    onerror("socket closed");
  }

  //When the socket is upgraded while we're probing
  function onupgrade(to){
    if (transport && to.name != transport.name) {
      debug('"%s" works - aborting "%s"', to.name, transport.name);
      freezeTransport();
    }
  }

  //Remove all listeners on the transport and on self
  function cleanup(){
    transport.removeListener('open', onTransportOpen);
    transport.removeListener('error', onerror);
    transport.removeListener('close', onTransportClose);
    self.removeListener('close', onclose);
    self.removeListener('upgrading', onupgrade);
  }

  transport.once('open', onTransportOpen);
  transport.once('error', onerror);
  transport.once('close', onTransportClose);

  this.once('close', onclose);
  this.once('upgrading', onupgrade);

  transport.open();

};

/**
 * Called when connection is deemed open.
 *
 * @api public
 */

Socket.prototype.onOpen = function () {
  debug('socket open');
  this.readyState = 'open';
  Socket.priorWebsocketSuccess = 'websocket' == this.transport.name;
  this.emit('open');
  this.flush();

  // we check for `readyState` in case an `open`
  // listener already closed the socket
  if ('open' == this.readyState && this.upgrade && this.transport.pause) {
    debug('starting upgrade probes');
    for (var i = 0, l = this.upgrades.length; i < l; i++) {
      this.probe(this.upgrades[i]);
    }
  }
};

/**
 * Handles a packet.
 *
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('opening' == this.readyState || 'open' == this.readyState) {
    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

    this.emit('packet', packet);

    // Socket is live - any packet counts
    this.emit('heartbeat');

    switch (packet.type) {
      case 'open':
        this.onHandshake(parsejson(packet.data));
        break;

      case 'pong':
        this.setPing();
        break;

      case 'error':
        var err = new Error('server error');
        err.code = packet.data;
        this.emit('error', err);
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug('packet received with socket readyState "%s"', this.readyState);
  }
};

/**
 * Called upon handshake completion.
 *
 * @param {Object} handshake obj
 * @api private
 */

Socket.prototype.onHandshake = function (data) {
  this.emit('handshake', data);
  this.id = data.sid;
  this.transport.query.sid = data.sid;
  this.upgrades = this.filterUpgrades(data.upgrades);
  this.pingInterval = data.pingInterval;
  this.pingTimeout = data.pingTimeout;
  this.onOpen();
  // In case open handler closes socket
  if  ('closed' == this.readyState) return;
  this.setPing();

  // Prolong liveness of socket on heartbeat
  this.removeListener('heartbeat', this.onHeartbeat);
  this.on('heartbeat', this.onHeartbeat);
};

/**
 * Resets ping timeout.
 *
 * @api private
 */

Socket.prototype.onHeartbeat = function (timeout) {
  clearTimeout(this.pingTimeoutTimer);
  var self = this;
  self.pingTimeoutTimer = setTimeout(function () {
    if ('closed' == self.readyState) return;
    self.onClose('ping timeout');
  }, timeout || (self.pingInterval + self.pingTimeout));
};

/**
 * Pings server every `this.pingInterval` and expects response
 * within `this.pingTimeout` or closes connection.
 *
 * @api private
 */

Socket.prototype.setPing = function () {
  var self = this;
  clearTimeout(self.pingIntervalTimer);
  self.pingIntervalTimer = setTimeout(function () {
    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
    self.ping();
    self.onHeartbeat(self.pingTimeout);
  }, self.pingInterval);
};

/**
* Sends a ping packet.
*
* @api public
*/

Socket.prototype.ping = function () {
  this.sendPacket('ping');
};

/**
 * Called on `drain` event
 *
 * @api private
 */

Socket.prototype.onDrain = function() {
  for (var i = 0; i < this.prevBufferLen; i++) {
    if (this.callbackBuffer[i]) {
      this.callbackBuffer[i]();
    }
  }

  this.writeBuffer.splice(0, this.prevBufferLen);
  this.callbackBuffer.splice(0, this.prevBufferLen);

  // setting prevBufferLen = 0 is very important
  // for example, when upgrading, upgrade packet is sent over,
  // and a nonzero prevBufferLen could cause problems on `drain`
  this.prevBufferLen = 0;

  if (this.writeBuffer.length == 0) {
    this.emit('drain');
  } else {
    this.flush();
  }
};

/**
 * Flush write buffers.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' != this.readyState && this.transport.writable &&
    !this.upgrading && this.writeBuffer.length) {
    debug('flushing %d packets in socket', this.writeBuffer.length);
    this.transport.send(this.writeBuffer);
    // keep track of current length of writeBuffer
    // splice writeBuffer and callbackBuffer on `drain`
    this.prevBufferLen = this.writeBuffer.length;
    this.emit('flush');
  }
};

/**
 * Sends a message.
 *
 * @param {String} message.
 * @param {Function} callback function.
 * @return {Socket} for chaining.
 * @api public
 */

Socket.prototype.write =
Socket.prototype.send = function (msg, fn) {
  this.sendPacket('message', msg, fn);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type.
 * @param {String} data.
 * @param {Function} callback function.
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, fn) {
  if ('closing' == this.readyState || 'closed' == this.readyState) {
    return;
  }

  var packet = { type: type, data: data };
  this.emit('packetCreate', packet);
  this.writeBuffer.push(packet);
  this.callbackBuffer.push(fn);
  this.flush();
};

/**
 * Closes the connection.
 *
 * @api private
 */

Socket.prototype.close = function () {
  if ('opening' == this.readyState || 'open' == this.readyState) {
    this.readyState = 'closing';

    var self = this;

    function close() {
      self.onClose('forced close');
      debug('socket closing - telling transport to close');
      self.transport.close();
    }

    function cleanupAndClose() {
      self.removeListener('upgrade', cleanupAndClose);
      self.removeListener('upgradeError', cleanupAndClose);
      close();
    }

    function waitForUpgrade() {
      // wait for upgrade to finish since we can't send packets while pausing a transport
      self.once('upgrade', cleanupAndClose);
      self.once('upgradeError', cleanupAndClose);
    }

    if (this.writeBuffer.length) {
      this.once('drain', function() {
        if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      });
    } else if (this.upgrading) {
      waitForUpgrade();
    } else {
      close();
    }
  }

  return this;
};

/**
 * Called upon transport error
 *
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug('socket error %j', err);
  Socket.priorWebsocketSuccess = false;
  this.emit('error', err);
  this.onClose('transport error', err);
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Socket.prototype.onClose = function (reason, desc) {
  if ('opening' == this.readyState || 'open' == this.readyState || 'closing' == this.readyState) {
    debug('socket close with reason: "%s"', reason);
    var self = this;

    // clear timers
    clearTimeout(this.pingIntervalTimer);
    clearTimeout(this.pingTimeoutTimer);

    // clean buffers in next tick, so developers can still
    // grab the buffers on `close` event
    setTimeout(function() {
      self.writeBuffer = [];
      self.callbackBuffer = [];
      self.prevBufferLen = 0;
    }, 0);

    // stop event from firing again for transport
    this.transport.removeAllListeners('close');

    // ensure transport won't stay open
    this.transport.close();

    // ignore further transport communication
    this.transport.removeAllListeners();

    // set ready state
    this.readyState = 'closed';

    // clear session id
    this.id = null;

    // emit close event
    this.emit('close', reason, desc);
  }
};

/**
 * Filters upgrades, returning only those matching client transports.
 *
 * @param {Array} server upgrades
 * @api private
 *
 */

Socket.prototype.filterUpgrades = function (upgrades) {
  var filteredUpgrades = [];
  for (var i = 0, j = upgrades.length; i<j; i++) {
    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
  }
  return filteredUpgrades;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./transport":15,"./transports":16,"component-emitter":10,"debug":23,"engine.io-parser":26,"indexof":43,"parsejson":37,"parseqs":38,"parseuri":39}],15:[function(require,module,exports){
/**
 * Module dependencies.
 */

var parser = require('engine.io-parser');
var Emitter = require('component-emitter');

/**
 * Module exports.
 */

module.exports = Transport;

/**
 * Transport abstract constructor.
 *
 * @param {Object} options.
 * @api private
 */

function Transport (opts) {
  this.path = opts.path;
  this.hostname = opts.hostname;
  this.port = opts.port;
  this.secure = opts.secure;
  this.query = opts.query;
  this.timestampParam = opts.timestampParam;
  this.timestampRequests = opts.timestampRequests;
  this.readyState = '';
  this.agent = opts.agent || false;
  this.socket = opts.socket;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;
}

/**
 * Mix in `Emitter`.
 */

Emitter(Transport.prototype);

/**
 * A counter used to prevent collisions in the timestamps used
 * for cache busting.
 */

Transport.timestamps = 0;

/**
 * Emits an error.
 *
 * @param {String} str
 * @return {Transport} for chaining
 * @api public
 */

Transport.prototype.onError = function (msg, desc) {
  var err = new Error(msg);
  err.type = 'TransportError';
  err.description = desc;
  this.emit('error', err);
  return this;
};

/**
 * Opens the transport.
 *
 * @api public
 */

Transport.prototype.open = function () {
  if ('closed' == this.readyState || '' == this.readyState) {
    this.readyState = 'opening';
    this.doOpen();
  }

  return this;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function () {
  if ('opening' == this.readyState || 'open' == this.readyState) {
    this.doClose();
    this.onClose();
  }

  return this;
};

/**
 * Sends multiple packets.
 *
 * @param {Array} packets
 * @api private
 */

Transport.prototype.send = function(packets){
  if ('open' == this.readyState) {
    this.write(packets);
  } else {
    throw new Error('Transport not open');
  }
};

/**
 * Called upon open
 *
 * @api private
 */

Transport.prototype.onOpen = function () {
  this.readyState = 'open';
  this.writable = true;
  this.emit('open');
};

/**
 * Called with data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function(data){
  var packet = parser.decodePacket(data, this.socket.binaryType);
  this.onPacket(packet);
};

/**
 * Called with a decoded packet.
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};

},{"component-emitter":10,"engine.io-parser":26}],16:[function(require,module,exports){
(function (global){
/**
 * Module dependencies
 */

var XMLHttpRequest = require('xmlhttprequest');
var XHR = require('./polling-xhr');
var JSONP = require('./polling-jsonp');
var websocket = require('./websocket');

/**
 * Export transports.
 */

exports.polling = polling;
exports.websocket = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling(opts){
  var xhr;
  var xd = false;
  var xs = false;
  var jsonp = false !== opts.jsonp;

  if (global.location) {
    var isSSL = 'https:' == location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname != location.hostname || port != opts.port;
    xs = opts.secure != isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new XMLHttpRequest(opts);

  if ('open' in xhr && !opts.forceJSONP) {
    return new XHR(opts);
  } else {
    if (!jsonp) throw new Error('JSONP disabled');
    return new JSONP(opts);
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./polling-jsonp":17,"./polling-xhr":18,"./websocket":20,"xmlhttprequest":21}],17:[function(require,module,exports){
(function (global){

/**
 * Module requirements.
 */

var Polling = require('./polling');
var inherit = require('component-inherit');

/**
 * Module exports.
 */

module.exports = JSONPPolling;

/**
 * Cached regular expressions.
 */

var rNewline = /\n/g;
var rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

var callbacks;

/**
 * Callbacks count.
 */

var index = 0;

/**
 * Noop.
 */

function empty () { }

/**
 * JSONP Polling constructor.
 *
 * @param {Object} opts.
 * @api public
 */

function JSONPPolling (opts) {
  Polling.call(this, opts);

  this.query = this.query || {};

  // define global callbacks array if not present
  // we do this here (lazily) to avoid unneeded global pollution
  if (!callbacks) {
    // we need to consider multiple engines in the same page
    if (!global.___eio) global.___eio = [];
    callbacks = global.___eio;
  }

  // callback identifier
  this.index = callbacks.length;

  // add callback to jsonp global
  var self = this;
  callbacks.push(function (msg) {
    self.onData(msg);
  });

  // append to query string
  this.query.j = this.index;

  // prevent spurious errors from being emitted when the window is unloaded
  if (global.document && global.addEventListener) {
    global.addEventListener('beforeunload', function () {
      if (self.script) self.script.onerror = empty;
    }, false);
  }
}

/**
 * Inherits from Polling.
 */

inherit(JSONPPolling, Polling);

/*
 * JSONP only supports binary as base64 encoded strings
 */

JSONPPolling.prototype.supportsBinary = false;

/**
 * Closes the socket.
 *
 * @api private
 */

JSONPPolling.prototype.doClose = function () {
  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  if (this.form) {
    this.form.parentNode.removeChild(this.form);
    this.form = null;
    this.iframe = null;
  }

  Polling.prototype.doClose.call(this);
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

JSONPPolling.prototype.doPoll = function () {
  var self = this;
  var script = document.createElement('script');

  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  script.async = true;
  script.src = this.uri();
  script.onerror = function(e){
    self.onError('jsonp poll error',e);
  };

  var insertAt = document.getElementsByTagName('script')[0];
  insertAt.parentNode.insertBefore(script, insertAt);
  this.script = script;

  var isUAgecko = 'undefined' != typeof navigator && /gecko/i.test(navigator.userAgent);
  
  if (isUAgecko) {
    setTimeout(function () {
      var iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      document.body.removeChild(iframe);
    }, 100);
  }
};

/**
 * Writes with a hidden iframe.
 *
 * @param {String} data to send
 * @param {Function} called upon flush.
 * @api private
 */

JSONPPolling.prototype.doWrite = function (data, fn) {
  var self = this;

  if (!this.form) {
    var form = document.createElement('form');
    var area = document.createElement('textarea');
    var id = this.iframeId = 'eio_iframe_' + this.index;
    var iframe;

    form.className = 'socketio';
    form.style.position = 'absolute';
    form.style.top = '-1000px';
    form.style.left = '-1000px';
    form.target = id;
    form.method = 'POST';
    form.setAttribute('accept-charset', 'utf-8');
    area.name = 'd';
    form.appendChild(area);
    document.body.appendChild(form);

    this.form = form;
    this.area = area;
  }

  this.form.action = this.uri();

  function complete () {
    initIframe();
    fn();
  }

  function initIframe () {
    if (self.iframe) {
      try {
        self.form.removeChild(self.iframe);
      } catch (e) {
        self.onError('jsonp polling iframe removal error', e);
      }
    }

    try {
      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
      var html = '<iframe src="javascript:0" name="'+ self.iframeId +'">';
      iframe = document.createElement(html);
    } catch (e) {
      iframe = document.createElement('iframe');
      iframe.name = self.iframeId;
      iframe.src = 'javascript:0';
    }

    iframe.id = self.iframeId;

    self.form.appendChild(iframe);
    self.iframe = iframe;
  }

  initIframe();

  // escape \n to prevent it from being converted into \r\n by some UAs
  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
  data = data.replace(rEscapedNewline, '\\\n');
  this.area.value = data.replace(rNewline, '\\n');

  try {
    this.form.submit();
  } catch(e) {}

  if (this.iframe.attachEvent) {
    this.iframe.onreadystatechange = function(){
      if (self.iframe.readyState == 'complete') {
        complete();
      }
    };
  } else {
    this.iframe.onload = complete;
  }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./polling":19,"component-inherit":22}],18:[function(require,module,exports){
(function (global){
/**
 * Module requirements.
 */

var XMLHttpRequest = require('xmlhttprequest');
var Polling = require('./polling');
var Emitter = require('component-emitter');
var inherit = require('component-inherit');
var debug = require('debug')('engine.io-client:polling-xhr');

/**
 * Module exports.
 */

module.exports = XHR;
module.exports.Request = Request;

/**
 * Empty function
 */

function empty(){}

/**
 * XHR Polling constructor.
 *
 * @param {Object} opts
 * @api public
 */

function XHR(opts){
  Polling.call(this, opts);

  if (global.location) {
    var isSSL = 'https:' == location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    this.xd = opts.hostname != global.location.hostname ||
      port != opts.port;
    this.xs = opts.secure != isSSL;
  }
}

/**
 * Inherits from Polling.
 */

inherit(XHR, Polling);

/**
 * XHR supports binary
 */

XHR.prototype.supportsBinary = true;

/**
 * Creates a request.
 *
 * @param {String} method
 * @api private
 */

XHR.prototype.request = function(opts){
  opts = opts || {};
  opts.uri = this.uri();
  opts.xd = this.xd;
  opts.xs = this.xs;
  opts.agent = this.agent || false;
  opts.supportsBinary = this.supportsBinary;
  opts.enablesXDR = this.enablesXDR;

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  return new Request(opts);
};

/**
 * Sends data.
 *
 * @param {String} data to send.
 * @param {Function} called upon flush.
 * @api private
 */

XHR.prototype.doWrite = function(data, fn){
  var isBinary = typeof data !== 'string' && data !== undefined;
  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
  var self = this;
  req.on('success', fn);
  req.on('error', function(err){
    self.onError('xhr post error', err);
  });
  this.sendXhr = req;
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

XHR.prototype.doPoll = function(){
  debug('xhr poll');
  var req = this.request();
  var self = this;
  req.on('data', function(data){
    self.onData(data);
  });
  req.on('error', function(err){
    self.onError('xhr poll error', err);
  });
  this.pollXhr = req;
};

/**
 * Request constructor
 *
 * @param {Object} options
 * @api public
 */

function Request(opts){
  this.method = opts.method || 'GET';
  this.uri = opts.uri;
  this.xd = !!opts.xd;
  this.xs = !!opts.xs;
  this.async = false !== opts.async;
  this.data = undefined != opts.data ? opts.data : null;
  this.agent = opts.agent;
  this.isBinary = opts.isBinary;
  this.supportsBinary = opts.supportsBinary;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  this.create();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Creates the XHR object and sends the request.
 *
 * @api private
 */

Request.prototype.create = function(){
  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  var xhr = this.xhr = new XMLHttpRequest(opts);
  var self = this;

  try {
    debug('xhr open %s: %s', this.method, this.uri);
    xhr.open(this.method, this.uri, this.async);
    if (this.supportsBinary) {
      // This has to be done after open because Firefox is stupid
      // http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
      xhr.responseType = 'arraybuffer';
    }

    if ('POST' == this.method) {
      try {
        if (this.isBinary) {
          xhr.setRequestHeader('Content-type', 'application/octet-stream');
        } else {
          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        }
      } catch (e) {}
    }

    // ie6 check
    if ('withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    if (this.hasXDR()) {
      xhr.onload = function(){
        self.onLoad();
      };
      xhr.onerror = function(){
        self.onError(xhr.responseText);
      };
    } else {
      xhr.onreadystatechange = function(){
        if (4 != xhr.readyState) return;
        if (200 == xhr.status || 1223 == xhr.status) {
          self.onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          setTimeout(function(){
            self.onError(xhr.status);
          }, 0);
        }
      };
    }

    debug('xhr data %s', this.data);
    xhr.send(this.data);
  } catch (e) {
    // Need to defer since .create() is called directly fhrom the constructor
    // and thus the 'error' event can only be only bound *after* this exception
    // occurs.  Therefore, also, we cannot throw here at all.
    setTimeout(function() {
      self.onError(e);
    }, 0);
    return;
  }

  if (global.document) {
    this.index = Request.requestsCount++;
    Request.requests[this.index] = this;
  }
};

/**
 * Called upon successful response.
 *
 * @api private
 */

Request.prototype.onSuccess = function(){
  this.emit('success');
  this.cleanup();
};

/**
 * Called if we have data.
 *
 * @api private
 */

Request.prototype.onData = function(data){
  this.emit('data', data);
  this.onSuccess();
};

/**
 * Called upon error.
 *
 * @api private
 */

Request.prototype.onError = function(err){
  this.emit('error', err);
  this.cleanup(true);
};

/**
 * Cleans up house.
 *
 * @api private
 */

Request.prototype.cleanup = function(fromError){
  if ('undefined' == typeof this.xhr || null === this.xhr) {
    return;
  }
  // xmlhttprequest
  if (this.hasXDR()) {
    this.xhr.onload = this.xhr.onerror = empty;
  } else {
    this.xhr.onreadystatechange = empty;
  }

  if (fromError) {
    try {
      this.xhr.abort();
    } catch(e) {}
  }

  if (global.document) {
    delete Request.requests[this.index];
  }

  this.xhr = null;
};

/**
 * Called upon load.
 *
 * @api private
 */

Request.prototype.onLoad = function(){
  var data;
  try {
    var contentType;
    try {
      contentType = this.xhr.getResponseHeader('Content-Type').split(';')[0];
    } catch (e) {}
    if (contentType === 'application/octet-stream') {
      data = this.xhr.response;
    } else {
      if (!this.supportsBinary) {
        data = this.xhr.responseText;
      } else {
        data = 'ok';
      }
    }
  } catch (e) {
    this.onError(e);
  }
  if (null != data) {
    this.onData(data);
  }
};

/**
 * Check if it has XDomainRequest.
 *
 * @api private
 */

Request.prototype.hasXDR = function(){
  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
};

/**
 * Aborts the request.
 *
 * @api public
 */

Request.prototype.abort = function(){
  this.cleanup();
};

/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

if (global.document) {
  Request.requestsCount = 0;
  Request.requests = {};
  if (global.attachEvent) {
    global.attachEvent('onunload', unloadHandler);
  } else if (global.addEventListener) {
    global.addEventListener('beforeunload', unloadHandler, false);
  }
}

function unloadHandler() {
  for (var i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./polling":19,"component-emitter":10,"component-inherit":22,"debug":23,"xmlhttprequest":21}],19:[function(require,module,exports){
/**
 * Module dependencies.
 */

var Transport = require('../transport');
var parseqs = require('parseqs');
var parser = require('engine.io-parser');
var inherit = require('component-inherit');
var debug = require('debug')('engine.io-client:polling');

/**
 * Module exports.
 */

module.exports = Polling;

/**
 * Is XHR2 supported?
 */

var hasXHR2 = (function() {
  var XMLHttpRequest = require('xmlhttprequest');
  var xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
})();

/**
 * Polling interface.
 *
 * @param {Object} opts
 * @api private
 */

function Polling(opts){
  var forceBase64 = (opts && opts.forceBase64);
  if (!hasXHR2 || forceBase64) {
    this.supportsBinary = false;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(Polling, Transport);

/**
 * Transport name.
 */

Polling.prototype.name = 'polling';

/**
 * Opens the socket (triggers polling). We write a PING message to determine
 * when the transport is open.
 *
 * @api private
 */

Polling.prototype.doOpen = function(){
  this.poll();
};

/**
 * Pauses polling.
 *
 * @param {Function} callback upon buffers are flushed and transport is paused
 * @api private
 */

Polling.prototype.pause = function(onPause){
  var pending = 0;
  var self = this;

  this.readyState = 'pausing';

  function pause(){
    debug('paused');
    self.readyState = 'paused';
    onPause();
  }

  if (this.polling || !this.writable) {
    var total = 0;

    if (this.polling) {
      debug('we are currently polling - waiting to pause');
      total++;
      this.once('pollComplete', function(){
        debug('pre-pause polling complete');
        --total || pause();
      });
    }

    if (!this.writable) {
      debug('we are currently writing - waiting to pause');
      total++;
      this.once('drain', function(){
        debug('pre-pause writing complete');
        --total || pause();
      });
    }
  } else {
    pause();
  }
};

/**
 * Starts polling cycle.
 *
 * @api public
 */

Polling.prototype.poll = function(){
  debug('polling');
  this.polling = true;
  this.doPoll();
  this.emit('poll');
};

/**
 * Overloads onData to detect payloads.
 *
 * @api private
 */

Polling.prototype.onData = function(data){
  var self = this;
  debug('polling got data %s', data);
  var callback = function(packet, index, total) {
    // if its the first message we consider the transport open
    if ('opening' == self.readyState) {
      self.onOpen();
    }

    // if its a close packet, we close the ongoing requests
    if ('close' == packet.type) {
      self.onClose();
      return false;
    }

    // otherwise bypass onData and handle the message
    self.onPacket(packet);
  };

  // decode payload
  parser.decodePayload(data, this.socket.binaryType, callback);

  // if an event did not trigger closing
  if ('closed' != this.readyState) {
    // if we got data we're not polling
    this.polling = false;
    this.emit('pollComplete');

    if ('open' == this.readyState) {
      this.poll();
    } else {
      debug('ignoring poll - transport state "%s"', this.readyState);
    }
  }
};

/**
 * For polling, send a close packet.
 *
 * @api private
 */

Polling.prototype.doClose = function(){
  var self = this;

  function close(){
    debug('writing close packet');
    self.write([{ type: 'close' }]);
  }

  if ('open' == this.readyState) {
    debug('transport open - closing');
    close();
  } else {
    // in case we're trying to close while
    // handshaking is in progress (GH-164)
    debug('transport not open - deferring close');
    this.once('open', close);
  }
};

/**
 * Writes a packets payload.
 *
 * @param {Array} data packets
 * @param {Function} drain callback
 * @api private
 */

Polling.prototype.write = function(packets){
  var self = this;
  this.writable = false;
  var callbackfn = function() {
    self.writable = true;
    self.emit('drain');
  };

  var self = this;
  parser.encodePayload(packets, this.supportsBinary, function(data) {
    self.doWrite(data, callbackfn);
  });
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

Polling.prototype.uri = function(){
  var query = this.query || {};
  var schema = this.secure ? 'https' : 'http';
  var port = '';

  // cache busting is forced
  if (false !== this.timestampRequests) {
    query[this.timestampParam] = +new Date + '-' + Transport.timestamps++;
  }

  if (!this.supportsBinary && !query.sid) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // avoid port if default for schema
  if (this.port && (('https' == schema && this.port != 443) ||
     ('http' == schema && this.port != 80))) {
    port = ':' + this.port;
  }

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  return schema + '://' + this.hostname + port + this.path + query;
};

},{"../transport":15,"component-inherit":22,"debug":23,"engine.io-parser":26,"parseqs":38,"xmlhttprequest":21}],20:[function(require,module,exports){
/**
 * Module dependencies.
 */

var Transport = require('../transport');
var parser = require('engine.io-parser');
var parseqs = require('parseqs');
var inherit = require('component-inherit');
var debug = require('debug')('engine.io-client:websocket');

/**
 * `ws` exposes a WebSocket-compatible interface in
 * Node, or the `WebSocket` or `MozWebSocket` globals
 * in the browser.
 */

var WebSocket = require('ws');

/**
 * Module exports.
 */

module.exports = WS;

/**
 * WebSocket transport constructor.
 *
 * @api {Object} connection options
 * @api public
 */

function WS(opts){
  var forceBase64 = (opts && opts.forceBase64);
  if (forceBase64) {
    this.supportsBinary = false;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(WS, Transport);

/**
 * Transport name.
 *
 * @api public
 */

WS.prototype.name = 'websocket';

/*
 * WebSockets support binary
 */

WS.prototype.supportsBinary = true;

/**
 * Opens socket.
 *
 * @api private
 */

WS.prototype.doOpen = function(){
  if (!this.check()) {
    // let probe timeout
    return;
  }

  var self = this;
  var uri = this.uri();
  var protocols = void(0);
  var opts = { agent: this.agent };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  this.ws = new WebSocket(uri, protocols, opts);

  if (this.ws.binaryType === undefined) {
    this.supportsBinary = false;
  }

  this.ws.binaryType = 'arraybuffer';
  this.addEventListeners();
};

/**
 * Adds event listeners to the socket
 *
 * @api private
 */

WS.prototype.addEventListeners = function(){
  var self = this;

  this.ws.onopen = function(){
    self.onOpen();
  };
  this.ws.onclose = function(){
    self.onClose();
  };
  this.ws.onmessage = function(ev){
    self.onData(ev.data);
  };
  this.ws.onerror = function(e){
    self.onError('websocket error', e);
  };
};

/**
 * Override `onData` to use a timer on iOS.
 * See: https://gist.github.com/mloughran/2052006
 *
 * @api private
 */

if ('undefined' != typeof navigator
  && /iPad|iPhone|iPod/i.test(navigator.userAgent)) {
  WS.prototype.onData = function(data){
    var self = this;
    setTimeout(function(){
      Transport.prototype.onData.call(self, data);
    }, 0);
  };
}

/**
 * Writes data to socket.
 *
 * @param {Array} array of packets.
 * @api private
 */

WS.prototype.write = function(packets){
  var self = this;
  this.writable = false;
  // encodePacket efficient as it uses WS framing
  // no need for encodePayload
  for (var i = 0, l = packets.length; i < l; i++) {
    parser.encodePacket(packets[i], this.supportsBinary, function(data) {
      //Sometimes the websocket has already been closed but the browser didn't
      //have a chance of informing us about it yet, in that case send will
      //throw an error
      try {
        self.ws.send(data);
      } catch (e){
        debug('websocket closed before onclose event');
      }
    });
  }

  function ondrain() {
    self.writable = true;
    self.emit('drain');
  }
  // fake drain
  // defer to next tick to allow Socket to clear writeBuffer
  setTimeout(ondrain, 0);
};

/**
 * Called upon close
 *
 * @api private
 */

WS.prototype.onClose = function(){
  Transport.prototype.onClose.call(this);
};

/**
 * Closes socket.
 *
 * @api private
 */

WS.prototype.doClose = function(){
  if (typeof this.ws !== 'undefined') {
    this.ws.close();
  }
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

WS.prototype.uri = function(){
  var query = this.query || {};
  var schema = this.secure ? 'wss' : 'ws';
  var port = '';

  // avoid port if default for schema
  if (this.port && (('wss' == schema && this.port != 443)
    || ('ws' == schema && this.port != 80))) {
    port = ':' + this.port;
  }

  // append timestamp to URI
  if (this.timestampRequests) {
    query[this.timestampParam] = +new Date;
  }

  // communicate binary support capabilities
  if (!this.supportsBinary) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  return schema + '://' + this.hostname + port + this.path + query;
};

/**
 * Feature detection for WebSocket.
 *
 * @return {Boolean} whether this transport is available.
 * @api public
 */

WS.prototype.check = function(){
  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
};

},{"../transport":15,"component-inherit":22,"debug":23,"engine.io-parser":26,"parseqs":38,"ws":40}],21:[function(require,module,exports){
// browser shim for xmlhttprequest module
var hasCORS = require('has-cors');

module.exports = function(opts) {
  var xdomain = opts.xdomain;

  // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
  var xscheme = opts.xscheme;

  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217
  var enablesXDR = opts.enablesXDR;

  // XMLHttpRequest can be disabled on IE
  try {
    if ('undefined' != typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) { }

  // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example
  try {
    if ('undefined' != typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) { }

  if (!xdomain) {
    try {
      return new ActiveXObject('Microsoft.XMLHTTP');
    } catch(e) { }
  }
}

},{"has-cors":35}],22:[function(require,module,exports){

module.exports = function(a, b){
  var fn = function(){};
  fn.prototype = b.prototype;
  a.prototype = new fn;
  a.prototype.constructor = a;
};
},{}],23:[function(require,module,exports){

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return ('WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  return JSON.stringify(v);
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // This hackery is required for IE8,
  // where the `console.log` function doesn't have 'apply'
  return 'object' == typeof console
    && 'function' == typeof console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      localStorage.removeItem('debug');
    } else {
      localStorage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = localStorage.debug;
  } catch(e) {}
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

},{"./debug":24}],24:[function(require,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":25}],25:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options){
  options = options || {};
  if ('string' == typeof val) return parse(val);
  return options.long
    ? long(val)
    : short(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  var match = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(str);
  if (!match) return;
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 's':
      return n * s;
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function short(ms) {
  if (ms >= d) return Math.round(ms / d) + 'd';
  if (ms >= h) return Math.round(ms / h) + 'h';
  if (ms >= m) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function long(ms) {
  return plural(ms, d, 'day')
    || plural(ms, h, 'hour')
    || plural(ms, m, 'minute')
    || plural(ms, s, 'second')
    || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],26:[function(require,module,exports){
(function (global){
/**
 * Module dependencies.
 */

var keys = require('./keys');
var hasBinary = require('has-binary');
var sliceBuffer = require('arraybuffer.slice');
var base64encoder = require('base64-arraybuffer');
var after = require('after');
var utf8 = require('utf8');

/**
 * Check if we are running an android browser. That requires us to use
 * ArrayBuffer with polling transports...
 *
 * http://ghinda.net/jpeg-blob-ajax-android/
 */

var isAndroid = navigator.userAgent.match(/Android/i);

/**
 * Check if we are running in PhantomJS.
 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
 * https://github.com/ariya/phantomjs/issues/11395
 * @type boolean
 */
var isPhantomJS = /PhantomJS/i.test(navigator.userAgent);

/**
 * When true, avoids using Blobs to encode payloads.
 * @type boolean
 */
var dontSendBlobs = isAndroid || isPhantomJS;

/**
 * Current protocol version.
 */

exports.protocol = 3;

/**
 * Packet types.
 */

var packets = exports.packets = {
    open:     0    // non-ws
  , close:    1    // non-ws
  , ping:     2
  , pong:     3
  , message:  4
  , upgrade:  5
  , noop:     6
};

var packetslist = keys(packets);

/**
 * Premade error packet.
 */

var err = { type: 'error', data: 'parser error' };

/**
 * Create a blob api even for blob builder when vendor prefixes exist
 */

var Blob = require('blob');

/**
 * Encodes a packet.
 *
 *     <packet type id> [ <data> ]
 *
 * Example:
 *
 *     5hello world
 *     3
 *     4
 *
 * Binary is encoded in an identical principle
 *
 * @api private
 */

exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
  if ('function' == typeof supportsBinary) {
    callback = supportsBinary;
    supportsBinary = false;
  }

  if ('function' == typeof utf8encode) {
    callback = utf8encode;
    utf8encode = null;
  }

  var data = (packet.data === undefined)
    ? undefined
    : packet.data.buffer || packet.data;

  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
    return encodeArrayBuffer(packet, supportsBinary, callback);
  } else if (Blob && data instanceof global.Blob) {
    return encodeBlob(packet, supportsBinary, callback);
  }

  // might be an object with { base64: true, data: dataAsBase64String }
  if (data && data.base64) {
    return encodeBase64Object(packet, callback);
  }

  // Sending data as a utf-8 string
  var encoded = packets[packet.type];

  // data fragment is optional
  if (undefined !== packet.data) {
    encoded += utf8encode ? utf8.encode(String(packet.data)) : String(packet.data);
  }

  return callback('' + encoded);

};

function encodeBase64Object(packet, callback) {
  // packet data is an object { base64: true, data: dataAsBase64String }
  var message = 'b' + exports.packets[packet.type] + packet.data.data;
  return callback(message);
}

/**
 * Encode packet helpers for binary types
 */

function encodeArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var data = packet.data;
  var contentArray = new Uint8Array(data);
  var resultBuffer = new Uint8Array(1 + data.byteLength);

  resultBuffer[0] = packets[packet.type];
  for (var i = 0; i < contentArray.length; i++) {
    resultBuffer[i+1] = contentArray[i];
  }

  return callback(resultBuffer.buffer);
}

function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var fr = new FileReader();
  fr.onload = function() {
    packet.data = fr.result;
    exports.encodePacket(packet, supportsBinary, true, callback);
  };
  return fr.readAsArrayBuffer(packet.data);
}

function encodeBlob(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  if (dontSendBlobs) {
    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
  }

  var length = new Uint8Array(1);
  length[0] = packets[packet.type];
  var blob = new Blob([length.buffer, packet.data]);

  return callback(blob);
}

/**
 * Encodes a packet with binary data in a base64 string
 *
 * @param {Object} packet, has `type` and `data`
 * @return {String} base64 encoded message
 */

exports.encodeBase64Packet = function(packet, callback) {
  var message = 'b' + exports.packets[packet.type];
  if (Blob && packet.data instanceof Blob) {
    var fr = new FileReader();
    fr.onload = function() {
      var b64 = fr.result.split(',')[1];
      callback(message + b64);
    };
    return fr.readAsDataURL(packet.data);
  }

  var b64data;
  try {
    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
  } catch (e) {
    // iPhone Safari doesn't let you apply with typed arrays
    var typed = new Uint8Array(packet.data);
    var basic = new Array(typed.length);
    for (var i = 0; i < typed.length; i++) {
      basic[i] = typed[i];
    }
    b64data = String.fromCharCode.apply(null, basic);
  }
  message += global.btoa(b64data);
  return callback(message);
};

/**
 * Decodes a packet. Changes format to Blob if requested.
 *
 * @return {Object} with `type` and `data` (if any)
 * @api private
 */

exports.decodePacket = function (data, binaryType, utf8decode) {
  // String data
  if (typeof data == 'string' || data === undefined) {
    if (data.charAt(0) == 'b') {
      return exports.decodeBase64Packet(data.substr(1), binaryType);
    }

    if (utf8decode) {
      try {
        data = utf8.decode(data);
      } catch (e) {
        return err;
      }
    }
    var type = data.charAt(0);

    if (Number(type) != type || !packetslist[type]) {
      return err;
    }

    if (data.length > 1) {
      return { type: packetslist[type], data: data.substring(1) };
    } else {
      return { type: packetslist[type] };
    }
  }

  var asArray = new Uint8Array(data);
  var type = asArray[0];
  var rest = sliceBuffer(data, 1);
  if (Blob && binaryType === 'blob') {
    rest = new Blob([rest]);
  }
  return { type: packetslist[type], data: rest };
};

/**
 * Decodes a packet encoded in a base64 string
 *
 * @param {String} base64 encoded message
 * @return {Object} with `type` and `data` (if any)
 */

exports.decodeBase64Packet = function(msg, binaryType) {
  var type = packetslist[msg.charAt(0)];
  if (!global.ArrayBuffer) {
    return { type: type, data: { base64: true, data: msg.substr(1) } };
  }

  var data = base64encoder.decode(msg.substr(1));

  if (binaryType === 'blob' && Blob) {
    data = new Blob([data]);
  }

  return { type: type, data: data };
};

/**
 * Encodes multiple messages (payload).
 *
 *     <length>:data
 *
 * Example:
 *
 *     11:hello world2:hi
 *
 * If any contents are binary, they will be encoded as base64 strings. Base64
 * encoded strings are marked with a b before the length specifier
 *
 * @param {Array} packets
 * @api private
 */

exports.encodePayload = function (packets, supportsBinary, callback) {
  if (typeof supportsBinary == 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  var isBinary = hasBinary(packets);

  if (supportsBinary && isBinary) {
    if (Blob && !dontSendBlobs) {
      return exports.encodePayloadAsBlob(packets, callback);
    }

    return exports.encodePayloadAsArrayBuffer(packets, callback);
  }

  if (!packets.length) {
    return callback('0:');
  }

  function setLengthHeader(message) {
    return message.length + ':' + message;
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, !isBinary ? false : supportsBinary, true, function(message) {
      doneCallback(null, setLengthHeader(message));
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(results.join(''));
  });
};

/**
 * Async array map using after
 */

function map(ary, each, done) {
  var result = new Array(ary.length);
  var next = after(ary.length, done);

  var eachWithIndex = function(i, el, cb) {
    each(el, function(error, msg) {
      result[i] = msg;
      cb(error, result);
    });
  };

  for (var i = 0; i < ary.length; i++) {
    eachWithIndex(i, ary[i], next);
  }
}

/*
 * Decodes data when a payload is maybe expected. Possible binary contents are
 * decoded from their base64 representation
 *
 * @param {String} data, callback method
 * @api public
 */

exports.decodePayload = function (data, binaryType, callback) {
  if (typeof data != 'string') {
    return exports.decodePayloadAsBinary(data, binaryType, callback);
  }

  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var packet;
  if (data == '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

  var length = ''
    , n, msg;

  for (var i = 0, l = data.length; i < l; i++) {
    var chr = data.charAt(i);

    if (':' != chr) {
      length += chr;
    } else {
      if ('' == length || (length != (n = Number(length)))) {
        // parser error - ignoring payload
        return callback(err, 0, 1);
      }

      msg = data.substr(i + 1, n);

      if (length != msg.length) {
        // parser error - ignoring payload
        return callback(err, 0, 1);
      }

      if (msg.length) {
        packet = exports.decodePacket(msg, binaryType, true);

        if (err.type == packet.type && err.data == packet.data) {
          // parser error in individual packet - ignoring payload
          return callback(err, 0, 1);
        }

        var ret = callback(packet, i + n, l);
        if (false === ret) return;
      }

      // advance cursor
      i += n;
      length = '';
    }
  }

  if (length != '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

};

/**
 * Encodes multiple messages (payload) as binary.
 *
 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
 * 255><data>
 *
 * Example:
 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
 *
 * @param {Array} packets
 * @return {ArrayBuffer} encoded payload
 * @api private
 */

exports.encodePayloadAsArrayBuffer = function(packets, callback) {
  if (!packets.length) {
    return callback(new ArrayBuffer(0));
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(data) {
      return doneCallback(null, data);
    });
  }

  map(packets, encodeOne, function(err, encodedPackets) {
    var totalLength = encodedPackets.reduce(function(acc, p) {
      var len;
      if (typeof p === 'string'){
        len = p.length;
      } else {
        len = p.byteLength;
      }
      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
    }, 0);

    var resultArray = new Uint8Array(totalLength);

    var bufferIndex = 0;
    encodedPackets.forEach(function(p) {
      var isString = typeof p === 'string';
      var ab = p;
      if (isString) {
        var view = new Uint8Array(p.length);
        for (var i = 0; i < p.length; i++) {
          view[i] = p.charCodeAt(i);
        }
        ab = view.buffer;
      }

      if (isString) { // not true binary
        resultArray[bufferIndex++] = 0;
      } else { // true binary
        resultArray[bufferIndex++] = 1;
      }

      var lenStr = ab.byteLength.toString();
      for (var i = 0; i < lenStr.length; i++) {
        resultArray[bufferIndex++] = parseInt(lenStr[i]);
      }
      resultArray[bufferIndex++] = 255;

      var view = new Uint8Array(ab);
      for (var i = 0; i < view.length; i++) {
        resultArray[bufferIndex++] = view[i];
      }
    });

    return callback(resultArray.buffer);
  });
};

/**
 * Encode as Blob
 */

exports.encodePayloadAsBlob = function(packets, callback) {
  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(encoded) {
      var binaryIdentifier = new Uint8Array(1);
      binaryIdentifier[0] = 1;
      if (typeof encoded === 'string') {
        var view = new Uint8Array(encoded.length);
        for (var i = 0; i < encoded.length; i++) {
          view[i] = encoded.charCodeAt(i);
        }
        encoded = view.buffer;
        binaryIdentifier[0] = 0;
      }

      var len = (encoded instanceof ArrayBuffer)
        ? encoded.byteLength
        : encoded.size;

      var lenStr = len.toString();
      var lengthAry = new Uint8Array(lenStr.length + 1);
      for (var i = 0; i < lenStr.length; i++) {
        lengthAry[i] = parseInt(lenStr[i]);
      }
      lengthAry[lenStr.length] = 255;

      if (Blob) {
        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
        doneCallback(null, blob);
      }
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(new Blob(results));
  });
};

/*
 * Decodes data when a payload is maybe expected. Strings are decoded by
 * interpreting each byte as a key code for entries marked to start with 0. See
 * description of encodePayloadAsBinary
 *
 * @param {ArrayBuffer} data, callback method
 * @api public
 */

exports.decodePayloadAsBinary = function (data, binaryType, callback) {
  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var bufferTail = data;
  var buffers = [];

  var numberTooLong = false;
  while (bufferTail.byteLength > 0) {
    var tailArray = new Uint8Array(bufferTail);
    var isString = tailArray[0] === 0;
    var msgLength = '';

    for (var i = 1; ; i++) {
      if (tailArray[i] == 255) break;

      if (msgLength.length > 310) {
        numberTooLong = true;
        break;
      }

      msgLength += tailArray[i];
    }

    if(numberTooLong) return callback(err, 0, 1);

    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
    msgLength = parseInt(msgLength);

    var msg = sliceBuffer(bufferTail, 0, msgLength);
    if (isString) {
      try {
        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
      } catch (e) {
        // iPhone Safari doesn't let you apply to typed arrays
        var typed = new Uint8Array(msg);
        msg = '';
        for (var i = 0; i < typed.length; i++) {
          msg += String.fromCharCode(typed[i]);
        }
      }
    }

    buffers.push(msg);
    bufferTail = sliceBuffer(bufferTail, msgLength);
  }

  var total = buffers.length;
  buffers.forEach(function(buffer, i) {
    callback(exports.decodePacket(buffer, binaryType, true), i, total);
  });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./keys":27,"after":28,"arraybuffer.slice":29,"base64-arraybuffer":30,"blob":31,"has-binary":32,"utf8":34}],27:[function(require,module,exports){

/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */

module.exports = Object.keys || function keys (obj){
  var arr = [];
  var has = Object.prototype.hasOwnProperty;

  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push(i);
    }
  }
  return arr;
};

},{}],28:[function(require,module,exports){
module.exports = after

function after(count, callback, err_cb) {
    var bail = false
    err_cb = err_cb || noop
    proxy.count = count

    return (count === 0) ? callback() : proxy

    function proxy(err, result) {
        if (proxy.count <= 0) {
            throw new Error('after called too many times')
        }
        --proxy.count

        // after first error, rest are passed to err_cb
        if (err) {
            bail = true
            callback(err)
            // future error callbacks will go to error handler
            callback = err_cb
        } else if (proxy.count === 0 && !bail) {
            callback(null, result)
        }
    }
}

function noop() {}

},{}],29:[function(require,module,exports){
/**
 * An abstraction for slicing an arraybuffer even when
 * ArrayBuffer.prototype.slice is not supported
 *
 * @api public
 */

module.exports = function(arraybuffer, start, end) {
  var bytes = arraybuffer.byteLength;
  start = start || 0;
  end = end || bytes;

  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }

  if (start < 0) { start += bytes; }
  if (end < 0) { end += bytes; }
  if (end > bytes) { end = bytes; }

  if (start >= bytes || start >= end || bytes === 0) {
    return new ArrayBuffer(0);
  }

  var abv = new Uint8Array(arraybuffer);
  var result = new Uint8Array(end - start);
  for (var i = start, ii = 0; i < end; i++, ii++) {
    result[ii] = abv[i];
  }
  return result.buffer;
};

},{}],30:[function(require,module,exports){
/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function(chars){
  "use strict";

  exports.encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
    i, len = bytes.length, base64 = "";

    for (i = 0; i < len; i+=3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode =  function(base64) {
    var bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i+=4) {
      encoded1 = chars.indexOf(base64[i]);
      encoded2 = chars.indexOf(base64[i+1]);
      encoded3 = chars.indexOf(base64[i+2]);
      encoded4 = chars.indexOf(base64[i+3]);

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  };
})("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");

},{}],31:[function(require,module,exports){
(function (global){
/**
 * Create a blob builder even when vendor prefixes exist
 */

var BlobBuilder = global.BlobBuilder
  || global.WebKitBlobBuilder
  || global.MSBlobBuilder
  || global.MozBlobBuilder;

/**
 * Check if Blob constructor is supported
 */

var blobSupported = (function() {
  try {
    var b = new Blob(['hi']);
    return b.size == 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if BlobBuilder is supported
 */

var blobBuilderSupported = BlobBuilder
  && BlobBuilder.prototype.append
  && BlobBuilder.prototype.getBlob;

function BlobBuilderConstructor(ary, options) {
  options = options || {};

  var bb = new BlobBuilder();
  for (var i = 0; i < ary.length; i++) {
    bb.append(ary[i]);
  }
  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
};

module.exports = (function() {
  if (blobSupported) {
    return global.Blob;
  } else if (blobBuilderSupported) {
    return BlobBuilderConstructor;
  } else {
    return undefined;
  }
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],32:[function(require,module,exports){
(function (global){

/*
 * Module requirements.
 */

var isArray = require('isarray');

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Right now only Buffer and ArrayBuffer are supported..
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary(data) {

  function _hasBinary(obj) {
    if (!obj) return false;

    if ( (global.Buffer && global.Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
         (global.Blob && obj instanceof Blob) ||
         (global.File && obj instanceof File)
        ) {
      return true;
    }

    if (isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
          if (_hasBinary(obj[i])) {
              return true;
          }
      }
    } else if (obj && 'object' == typeof obj) {
      if (obj.toJSON) {
        obj = obj.toJSON();
      }

      for (var key in obj) {
        if (obj.hasOwnProperty(key) && _hasBinary(obj[key])) {
          return true;
        }
      }
    }

    return false;
  }

  return _hasBinary(data);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"isarray":33}],33:[function(require,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],34:[function(require,module,exports){
(function (global){
/*! http://mths.be/utf8js v2.0.0 by @mathias */
;(function(root) {

	// Detect free variables `exports`
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	// Taken from http://mths.be/punycode
	function ucs2decode(string) {
		var output = [];
		var counter = 0;
		var length = string.length;
		var value;
		var extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	// Taken from http://mths.be/punycode
	function ucs2encode(array) {
		var length = array.length;
		var index = -1;
		var value;
		var output = '';
		while (++index < length) {
			value = array[index];
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
		}
		return output;
	}

	/*--------------------------------------------------------------------------*/

	function createByte(codePoint, shift) {
		return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
	}

	function encodeCodePoint(codePoint) {
		if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
			return stringFromCharCode(codePoint);
		}
		var symbol = '';
		if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
			symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
		}
		else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
			symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
			symbol += createByte(codePoint, 6);
		}
		else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
			symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
			symbol += createByte(codePoint, 12);
			symbol += createByte(codePoint, 6);
		}
		symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
		return symbol;
	}

	function utf8encode(string) {
		var codePoints = ucs2decode(string);

		// console.log(JSON.stringify(codePoints.map(function(x) {
		// 	return 'U+' + x.toString(16).toUpperCase();
		// })));

		var length = codePoints.length;
		var index = -1;
		var codePoint;
		var byteString = '';
		while (++index < length) {
			codePoint = codePoints[index];
			byteString += encodeCodePoint(codePoint);
		}
		return byteString;
	}

	/*--------------------------------------------------------------------------*/

	function readContinuationByte() {
		if (byteIndex >= byteCount) {
			throw Error('Invalid byte index');
		}

		var continuationByte = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		if ((continuationByte & 0xC0) == 0x80) {
			return continuationByte & 0x3F;
		}

		// If we end up here, it’s not a continuation byte
		throw Error('Invalid continuation byte');
	}

	function decodeSymbol() {
		var byte1;
		var byte2;
		var byte3;
		var byte4;
		var codePoint;

		if (byteIndex > byteCount) {
			throw Error('Invalid byte index');
		}

		if (byteIndex == byteCount) {
			return false;
		}

		// Read first byte
		byte1 = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		// 1-byte sequence (no continuation bytes)
		if ((byte1 & 0x80) == 0) {
			return byte1;
		}

		// 2-byte sequence
		if ((byte1 & 0xE0) == 0xC0) {
			var byte2 = readContinuationByte();
			codePoint = ((byte1 & 0x1F) << 6) | byte2;
			if (codePoint >= 0x80) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 3-byte sequence (may include unpaired surrogates)
		if ((byte1 & 0xF0) == 0xE0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
			if (codePoint >= 0x0800) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 4-byte sequence
		if ((byte1 & 0xF8) == 0xF0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			byte4 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 0x12) | (byte2 << 0x0C) |
				(byte3 << 0x06) | byte4;
			if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
				return codePoint;
			}
		}

		throw Error('Invalid UTF-8 detected');
	}

	var byteArray;
	var byteCount;
	var byteIndex;
	function utf8decode(byteString) {
		byteArray = ucs2decode(byteString);
		byteCount = byteArray.length;
		byteIndex = 0;
		var codePoints = [];
		var tmp;
		while ((tmp = decodeSymbol()) !== false) {
			codePoints.push(tmp);
		}
		return ucs2encode(codePoints);
	}

	/*--------------------------------------------------------------------------*/

	var utf8 = {
		'version': '2.0.0',
		'encode': utf8encode,
		'decode': utf8decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
		//
	// Check exports first, in case of loading a browserfied library in AMD style,
	// should use exports instead of define a AMD module
	if (freeExports && !freeExports.nodeType) {
   		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = utf8;
		} else { // in Narwhal or RingoJS v0.7.0-
			var object = {};
			var hasOwnProperty = object.hasOwnProperty;
			for (var key in utf8) {
				hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
			}
		}
	}
	else if(
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	){
		define(function() {
			return utf8;
		});
	}
	else { // in Rhino or a web browser
		root.utf8 = utf8;
	}

}(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],35:[function(require,module,exports){

/**
 * Module dependencies.
 */

var global = require('global');

/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = 'XMLHttpRequest' in global &&
    'withCredentials' in new global.XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}

},{"global":36}],36:[function(require,module,exports){

/**
 * Returns `this`. Execute this without a "context" (i.e. without it being
 * attached to an object of the left-hand side), and `this` points to the
 * "global" scope of the current JS execution.
 */

module.exports = (function () { return this; })();

},{}],37:[function(require,module,exports){
(function (global){
/**
 * JSON parse.
 *
 * @see Based on jQuery#parseJSON (MIT) and JSON2
 * @api private
 */

var rvalidchars = /^[\],:{}\s]*$/;
var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
var rtrimLeft = /^\s+/;
var rtrimRight = /\s+$/;

module.exports = function parsejson(data) {
  if ('string' != typeof data || !data) {
    return null;
  }

  data = data.replace(rtrimLeft, '').replace(rtrimRight, '');

  // Attempt to parse using the native JSON parser first
  if (global.JSON && JSON.parse) {
    return JSON.parse(data);
  }

  if (rvalidchars.test(data.replace(rvalidescape, '@')
      .replace(rvalidtokens, ']')
      .replace(rvalidbraces, ''))) {
    return (new Function('return ' + data))();
  }
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],38:[function(require,module,exports){
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};

},{}],39:[function(require,module,exports){
/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    return uri;
};

},{}],40:[function(require,module,exports){

/**
 * Module dependencies.
 */

var global = (function() { return this; })();

/**
 * WebSocket constructor.
 */

var WebSocket = global.WebSocket || global.MozWebSocket;

/**
 * Module exports.
 */

module.exports = WebSocket ? ws : null;

/**
 * WebSocket constructor.
 *
 * The third `opts` options object gets ignored in web browsers, since it's
 * non-standard, and throws a TypeError if passed to the constructor.
 * See: https://github.com/einaros/ws/issues/227
 *
 * @param {String} uri
 * @param {Array} protocols (optional)
 * @param {Object) opts (optional)
 * @api public
 */

function ws(uri, protocols, opts) {
  var instance;
  if (protocols) {
    instance = new WebSocket(uri, protocols);
  } else {
    instance = new WebSocket(uri);
  }
  return instance;
}

if (WebSocket) ws.prototype = WebSocket.prototype;

},{}],41:[function(require,module,exports){
(function (global){

/*
 * Module requirements.
 */

var isArray = require('isarray');

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Right now only Buffer and ArrayBuffer are supported..
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary(data) {

  function _hasBinary(obj) {
    if (!obj) return false;

    if ( (global.Buffer && global.Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
         (global.Blob && obj instanceof Blob) ||
         (global.File && obj instanceof File)
        ) {
      return true;
    }

    if (isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
          if (_hasBinary(obj[i])) {
              return true;
          }
      }
    } else if (obj && 'object' == typeof obj) {
      if (obj.toJSON) {
        obj = obj.toJSON();
      }

      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
          return true;
        }
      }
    }

    return false;
  }

  return _hasBinary(data);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"isarray":42}],42:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"dup":33}],43:[function(require,module,exports){

var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
},{}],44:[function(require,module,exports){

/**
 * HOP ref.
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Return own keys in `obj`.
 *
 * @param {Object} obj
 * @return {Array}
 * @api public
 */

exports.keys = Object.keys || function(obj){
  var keys = [];
  for (var key in obj) {
    if (has.call(obj, key)) {
      keys.push(key);
    }
  }
  return keys;
};

/**
 * Return own values in `obj`.
 *
 * @param {Object} obj
 * @return {Array}
 * @api public
 */

exports.values = function(obj){
  var vals = [];
  for (var key in obj) {
    if (has.call(obj, key)) {
      vals.push(obj[key]);
    }
  }
  return vals;
};

/**
 * Merge `b` into `a`.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api public
 */

exports.merge = function(a, b){
  for (var key in b) {
    if (has.call(b, key)) {
      a[key] = b[key];
    }
  }
  return a;
};

/**
 * Return length of `obj`.
 *
 * @param {Object} obj
 * @return {Number}
 * @api public
 */

exports.length = function(obj){
  return exports.keys(obj).length;
};

/**
 * Check if `obj` is empty.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api public
 */

exports.isEmpty = function(obj){
  return 0 == exports.length(obj);
};
},{}],45:[function(require,module,exports){
/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host'
  , 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
  var m = re.exec(str || '')
    , uri = {}
    , i = 14;

  while (i--) {
    uri[parts[i]] = m[i] || '';
  }

  return uri;
};

},{}],46:[function(require,module,exports){
(function (global){
/*global Blob,File*/

/**
 * Module requirements
 */

var isArray = require('isarray');
var isBuf = require('./is-buffer');

/**
 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
 * Anything with blobs or files should be fed through removeBlobs before coming
 * here.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @api public
 */

exports.deconstructPacket = function(packet){
  var buffers = [];
  var packetData = packet.data;

  function _deconstructPacket(data) {
    if (!data) return data;

    if (isBuf(data)) {
      var placeholder = { _placeholder: true, num: buffers.length };
      buffers.push(data);
      return placeholder;
    } else if (isArray(data)) {
      var newData = new Array(data.length);
      for (var i = 0; i < data.length; i++) {
        newData[i] = _deconstructPacket(data[i]);
      }
      return newData;
    } else if ('object' == typeof data && !(data instanceof Date)) {
      var newData = {};
      for (var key in data) {
        newData[key] = _deconstructPacket(data[key]);
      }
      return newData;
    }
    return data;
  }

  var pack = packet;
  pack.data = _deconstructPacket(packetData);
  pack.attachments = buffers.length; // number of binary 'attachments'
  return {packet: pack, buffers: buffers};
};

/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @api public
 */

exports.reconstructPacket = function(packet, buffers) {
  var curPlaceHolder = 0;

  function _reconstructPacket(data) {
    if (data && data._placeholder) {
      var buf = buffers[data.num]; // appropriate buffer (should be natural order anyway)
      return buf;
    } else if (isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        data[i] = _reconstructPacket(data[i]);
      }
      return data;
    } else if (data && 'object' == typeof data) {
      for (var key in data) {
        data[key] = _reconstructPacket(data[key]);
      }
      return data;
    }
    return data;
  }

  packet.data = _reconstructPacket(packet.data);
  packet.attachments = undefined; // no longer useful
  return packet;
};

/**
 * Asynchronously removes Blobs or Files from data via
 * FileReader's readAsArrayBuffer method. Used before encoding
 * data as msgpack. Calls callback with the blobless data.
 *
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

exports.removeBlobs = function(data, callback) {
  function _removeBlobs(obj, curKey, containingObject) {
    if (!obj) return obj;

    // convert any blob
    if ((global.Blob && obj instanceof Blob) ||
        (global.File && obj instanceof File)) {
      pendingBlobs++;

      // async filereader
      var fileReader = new FileReader();
      fileReader.onload = function() { // this.result == arraybuffer
        if (containingObject) {
          containingObject[curKey] = this.result;
        }
        else {
          bloblessData = this.result;
        }

        // if nothing pending its callback time
        if(! --pendingBlobs) {
          callback(bloblessData);
        }
      };

      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
    } else if (isArray(obj)) { // handle array
      for (var i = 0; i < obj.length; i++) {
        _removeBlobs(obj[i], i, obj);
      }
    } else if (obj && 'object' == typeof obj && !isBuf(obj)) { // and object
      for (var key in obj) {
        _removeBlobs(obj[key], key, obj);
      }
    }
  }

  var pendingBlobs = 0;
  var bloblessData = data;
  _removeBlobs(bloblessData);
  if (!pendingBlobs) {
    callback(bloblessData);
  }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./is-buffer":48,"isarray":49}],47:[function(require,module,exports){

/**
 * Module dependencies.
 */

var debug = require('debug')('socket.io-parser');
var json = require('json3');
var isArray = require('isarray');
var Emitter = require('component-emitter');
var binary = require('./binary');
var isBuf = require('./is-buffer');

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = 4;

/**
 * Packet types.
 *
 * @api public
 */

exports.types = [
  'CONNECT',
  'DISCONNECT',
  'EVENT',
  'BINARY_EVENT',
  'ACK',
  'BINARY_ACK',
  'ERROR'
];

/**
 * Packet type `connect`.
 *
 * @api public
 */

exports.CONNECT = 0;

/**
 * Packet type `disconnect`.
 *
 * @api public
 */

exports.DISCONNECT = 1;

/**
 * Packet type `event`.
 *
 * @api public
 */

exports.EVENT = 2;

/**
 * Packet type `ack`.
 *
 * @api public
 */

exports.ACK = 3;

/**
 * Packet type `error`.
 *
 * @api public
 */

exports.ERROR = 4;

/**
 * Packet type 'binary event'
 *
 * @api public
 */

exports.BINARY_EVENT = 5;

/**
 * Packet type `binary ack`. For acks with binary arguments.
 *
 * @api public
 */

exports.BINARY_ACK = 6;

/**
 * Encoder constructor.
 *
 * @api public
 */

exports.Encoder = Encoder;

/**
 * Decoder constructor.
 *
 * @api public
 */

exports.Decoder = Decoder;

/**
 * A socket.io Encoder instance
 *
 * @api public
 */

function Encoder() {}

/**
 * Encode a packet as a single string if non-binary, or as a
 * buffer sequence, depending on packet type.
 *
 * @param {Object} obj - packet object
 * @param {Function} callback - function to handle encodings (likely engine.write)
 * @return Calls callback with Array of encodings
 * @api public
 */

Encoder.prototype.encode = function(obj, callback){
  debug('encoding packet %j', obj);

  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
    encodeAsBinary(obj, callback);
  }
  else {
    var encoding = encodeAsString(obj);
    callback([encoding]);
  }
};

/**
 * Encode packet as string.
 *
 * @param {Object} packet
 * @return {String} encoded
 * @api private
 */

function encodeAsString(obj) {
  var str = '';
  var nsp = false;

  // first is type
  str += obj.type;

  // attachments if we have them
  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
    str += obj.attachments;
    str += '-';
  }

  // if we have a namespace other than `/`
  // we append it followed by a comma `,`
  if (obj.nsp && '/' != obj.nsp) {
    nsp = true;
    str += obj.nsp;
  }

  // immediately followed by the id
  if (null != obj.id) {
    if (nsp) {
      str += ',';
      nsp = false;
    }
    str += obj.id;
  }

  // json data
  if (null != obj.data) {
    if (nsp) str += ',';
    str += json.stringify(obj.data);
  }

  debug('encoded %j as %s', obj, str);
  return str;
}

/**
 * Encode packet as 'buffer sequence' by removing blobs, and
 * deconstructing packet into object with placeholders and
 * a list of buffers.
 *
 * @param {Object} packet
 * @return {Buffer} encoded
 * @api private
 */

function encodeAsBinary(obj, callback) {

  function writeEncoding(bloblessData) {
    var deconstruction = binary.deconstructPacket(bloblessData);
    var pack = encodeAsString(deconstruction.packet);
    var buffers = deconstruction.buffers;

    buffers.unshift(pack); // add packet info to beginning of data list
    callback(buffers); // write all the buffers
  }

  binary.removeBlobs(obj, writeEncoding);
}

/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 * @api public
 */

function Decoder() {
  this.reconstructor = null;
}

/**
 * Mix in `Emitter` with Decoder.
 */

Emitter(Decoder.prototype);

/**
 * Decodes an ecoded packet string into packet JSON.
 *
 * @param {String} obj - encoded packet
 * @return {Object} packet
 * @api public
 */

Decoder.prototype.add = function(obj) {
  var packet;
  if ('string' == typeof obj) {
    packet = decodeString(obj);
    if (exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type) { // binary packet's json
      this.reconstructor = new BinaryReconstructor(packet);

      // no attachments, labeled binary but no binary data to follow
      if (this.reconstructor.reconPack.attachments === 0) {
        this.emit('decoded', packet);
      }
    } else { // non-binary full packet
      this.emit('decoded', packet);
    }
  }
  else if (isBuf(obj) || obj.base64) { // raw binary data
    if (!this.reconstructor) {
      throw new Error('got binary data when not reconstructing a packet');
    } else {
      packet = this.reconstructor.takeBinaryData(obj);
      if (packet) { // received final buffer
        this.reconstructor = null;
        this.emit('decoded', packet);
      }
    }
  }
  else {
    throw new Error('Unknown type: ' + obj);
  }
};

/**
 * Decode a packet String (JSON data)
 *
 * @param {String} str
 * @return {Object} packet
 * @api private
 */

function decodeString(str) {
  var p = {};
  var i = 0;

  // look up type
  p.type = Number(str.charAt(0));
  if (null == exports.types[p.type]) return error();

  // look up attachments if type binary
  if (exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type) {
    var buf = '';
    while (str.charAt(++i) != '-') {
      buf += str.charAt(i);
      if (i == str.length) break;
    }
    if (buf != Number(buf) || str.charAt(i) != '-') {
      throw new Error('Illegal attachments');
    }
    p.attachments = Number(buf);
  }

  // look up namespace (if any)
  if ('/' == str.charAt(i + 1)) {
    p.nsp = '';
    while (++i) {
      var c = str.charAt(i);
      if (',' == c) break;
      p.nsp += c;
      if (i == str.length) break;
    }
  } else {
    p.nsp = '/';
  }

  // look up id
  var next = str.charAt(i + 1);
  if ('' !== next && Number(next) == next) {
    p.id = '';
    while (++i) {
      var c = str.charAt(i);
      if (null == c || Number(c) != c) {
        --i;
        break;
      }
      p.id += str.charAt(i);
      if (i == str.length) break;
    }
    p.id = Number(p.id);
  }

  // look up json data
  if (str.charAt(++i)) {
    try {
      p.data = json.parse(str.substr(i));
    } catch(e){
      return error();
    }
  }

  debug('decoded %s as %j', str, p);
  return p;
}

/**
 * Deallocates a parser's resources
 *
 * @api public
 */

Decoder.prototype.destroy = function() {
  if (this.reconstructor) {
    this.reconstructor.finishedReconstruction();
  }
};

/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 * @api private
 */

function BinaryReconstructor(packet) {
  this.reconPack = packet;
  this.buffers = [];
}

/**
 * Method to be called when binary data received from connection
 * after a BINARY_EVENT packet.
 *
 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
 * @return {null | Object} returns null if more binary data is expected or
 *   a reconstructed packet object if all buffers have been received.
 * @api private
 */

BinaryReconstructor.prototype.takeBinaryData = function(binData) {
  this.buffers.push(binData);
  if (this.buffers.length == this.reconPack.attachments) { // done with buffer list
    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
    this.finishedReconstruction();
    return packet;
  }
  return null;
};

/**
 * Cleans up binary packet reconstruction variables.
 *
 * @api private
 */

BinaryReconstructor.prototype.finishedReconstruction = function() {
  this.reconPack = null;
  this.buffers = [];
};

function error(data){
  return {
    type: exports.ERROR,
    data: 'parser error'
  };
}

},{"./binary":46,"./is-buffer":48,"component-emitter":10,"debug":11,"isarray":49,"json3":50}],48:[function(require,module,exports){
(function (global){

module.exports = isBuf;

/**
 * Returns true if obj is a buffer or an arraybuffer.
 *
 * @api private
 */

function isBuf(obj) {
  return (global.Buffer && global.Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && obj instanceof ArrayBuffer);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],49:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"dup":33}],50:[function(require,module,exports){
/*! JSON v3.2.6 | http://bestiejs.github.io/json3 | Copyright 2012-2013, Kit Cambridge | http://kit.mit-license.org */
;(function (window) {
  // Convenience aliases.
  var getClass = {}.toString, isProperty, forEach, undef;

  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = typeof define === "function" && define.amd;

  // Detect native implementations.
  var nativeJSON = typeof JSON == "object" && JSON;

  // Set up the JSON 3 namespace, preferring the CommonJS `exports` object if
  // available.
  var JSON3 = typeof exports == "object" && exports && !exports.nodeType && exports;

  if (JSON3 && nativeJSON) {
    // Explicitly delegate to the native `stringify` and `parse`
    // implementations in CommonJS environments.
    JSON3.stringify = nativeJSON.stringify;
    JSON3.parse = nativeJSON.parse;
  } else {
    // Export for web browsers, JavaScript engines, and asynchronous module
    // loaders, using the global `JSON` object if available.
    JSON3 = window.JSON = nativeJSON || {};
  }

  // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
  var isExtended = new Date(-3509827334573292);
  try {
    // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
    // results for certain dates in Opera >= 10.53.
    isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
      // Safari < 2.0.2 stores the internal millisecond time value correctly,
      // but clips the values returned by the date methods to the range of
      // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
      isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
  } catch (exception) {}

  // Internal: Determines whether the native `JSON.stringify` and `parse`
  // implementations are spec-compliant. Based on work by Ken Snyder.
  function has(name) {
    if (has[name] !== undef) {
      // Return cached feature test result.
      return has[name];
    }

    var isSupported;
    if (name == "bug-string-char-index") {
      // IE <= 7 doesn't support accessing string characters using square
      // bracket notation. IE 8 only supports this for primitives.
      isSupported = "a"[0] != "a";
    } else if (name == "json") {
      // Indicates whether both `JSON.stringify` and `JSON.parse` are
      // supported.
      isSupported = has("json-stringify") && has("json-parse");
    } else {
      var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
      // Test `JSON.stringify`.
      if (name == "json-stringify") {
        var stringify = JSON3.stringify, stringifySupported = typeof stringify == "function" && isExtended;
        if (stringifySupported) {
          // A test function object with a custom `toJSON` method.
          (value = function () {
            return 1;
          }).toJSON = value;
          try {
            stringifySupported =
              // Firefox 3.1b1 and b2 serialize string, number, and boolean
              // primitives as object literals.
              stringify(0) === "0" &&
              // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
              // literals.
              stringify(new Number()) === "0" &&
              stringify(new String()) == '""' &&
              // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
              // does not define a canonical JSON representation (this applies to
              // objects with `toJSON` properties as well, *unless* they are nested
              // within an object or array).
              stringify(getClass) === undef &&
              // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
              // FF 3.1b3 pass this test.
              stringify(undef) === undef &&
              // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
              // respectively, if the value is omitted entirely.
              stringify() === undef &&
              // FF 3.1b1, 2 throw an error if the given value is not a number,
              // string, array, object, Boolean, or `null` literal. This applies to
              // objects with custom `toJSON` methods as well, unless they are nested
              // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
              // methods entirely.
              stringify(value) === "1" &&
              stringify([value]) == "[1]" &&
              // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
              // `"[null]"`.
              stringify([undef]) == "[null]" &&
              // YUI 3.0.0b1 fails to serialize `null` literals.
              stringify(null) == "null" &&
              // FF 3.1b1, 2 halts serialization if an array contains a function:
              // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
              // elides non-JSON values from objects and arrays, unless they
              // define custom `toJSON` methods.
              stringify([undef, getClass, null]) == "[null,null,null]" &&
              // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
              // where character escape codes are expected (e.g., `\b` => `\u0008`).
              stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
              // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
              stringify(null, value) === "1" &&
              stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
              // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
              // serialize extended years.
              stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
              // The milliseconds are optional in ES 5, but required in 5.1.
              stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
              // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
              // four-digit years instead of six-digit years. Credits: @Yaffle.
              stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
              // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
              // values less than 1000. Credits: @Yaffle.
              stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
          } catch (exception) {
            stringifySupported = false;
          }
        }
        isSupported = stringifySupported;
      }
      // Test `JSON.parse`.
      if (name == "json-parse") {
        var parse = JSON3.parse;
        if (typeof parse == "function") {
          try {
            // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
            // Conforming implementations should also coerce the initial argument to
            // a string prior to parsing.
            if (parse("0") === 0 && !parse(false)) {
              // Simple parsing test.
              value = parse(serialized);
              var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
              if (parseSupported) {
                try {
                  // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                  parseSupported = !parse('"\t"');
                } catch (exception) {}
                if (parseSupported) {
                  try {
                    // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                    // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                    // certain octal literals.
                    parseSupported = parse("01") !== 1;
                  } catch (exception) {}
                }
                if (parseSupported) {
                  try {
                    // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                    // points. These environments, along with FF 3.1b1 and 2,
                    // also allow trailing commas in JSON objects and arrays.
                    parseSupported = parse("1.") !== 1;
                  } catch (exception) {}
                }
              }
            }
          } catch (exception) {
            parseSupported = false;
          }
        }
        isSupported = parseSupported;
      }
    }
    return has[name] = !!isSupported;
  }

  if (!has("json")) {
    // Common `[[Class]]` name aliases.
    var functionClass = "[object Function]";
    var dateClass = "[object Date]";
    var numberClass = "[object Number]";
    var stringClass = "[object String]";
    var arrayClass = "[object Array]";
    var booleanClass = "[object Boolean]";

    // Detect incomplete support for accessing string characters by index.
    var charIndexBuggy = has("bug-string-char-index");

    // Define additional utility methods if the `Date` methods are buggy.
    if (!isExtended) {
      var floor = Math.floor;
      // A mapping between the months of the year and the number of days between
      // January 1st and the first of the respective month.
      var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
      // Internal: Calculates the number of days between the Unix epoch and the
      // first day of the given month.
      var getDay = function (year, month) {
        return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
      };
    }

    // Internal: Determines if a property is a direct property of the given
    // object. Delegates to the native `Object#hasOwnProperty` method.
    if (!(isProperty = {}.hasOwnProperty)) {
      isProperty = function (property) {
        var members = {}, constructor;
        if ((members.__proto__ = null, members.__proto__ = {
          // The *proto* property cannot be set multiple times in recent
          // versions of Firefox and SeaMonkey.
          "toString": 1
        }, members).toString != getClass) {
          // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
          // supports the mutable *proto* property.
          isProperty = function (property) {
            // Capture and break the object's prototype chain (see section 8.6.2
            // of the ES 5.1 spec). The parenthesized expression prevents an
            // unsafe transformation by the Closure Compiler.
            var original = this.__proto__, result = property in (this.__proto__ = null, this);
            // Restore the original prototype chain.
            this.__proto__ = original;
            return result;
          };
        } else {
          // Capture a reference to the top-level `Object` constructor.
          constructor = members.constructor;
          // Use the `constructor` property to simulate `Object#hasOwnProperty` in
          // other environments.
          isProperty = function (property) {
            var parent = (this.constructor || constructor).prototype;
            return property in this && !(property in parent && this[property] === parent[property]);
          };
        }
        members = null;
        return isProperty.call(this, property);
      };
    }

    // Internal: A set of primitive types used by `isHostType`.
    var PrimitiveTypes = {
      'boolean': 1,
      'number': 1,
      'string': 1,
      'undefined': 1
    };

    // Internal: Determines if the given object `property` value is a
    // non-primitive.
    var isHostType = function (object, property) {
      var type = typeof object[property];
      return type == 'object' ? !!object[property] : !PrimitiveTypes[type];
    };

    // Internal: Normalizes the `for...in` iteration algorithm across
    // environments. Each enumerated key is yielded to a `callback` function.
    forEach = function (object, callback) {
      var size = 0, Properties, members, property;

      // Tests for bugs in the current environment's `for...in` algorithm. The
      // `valueOf` property inherits the non-enumerable flag from
      // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
      (Properties = function () {
        this.valueOf = 0;
      }).prototype.valueOf = 0;

      // Iterate over a new instance of the `Properties` class.
      members = new Properties();
      for (property in members) {
        // Ignore all properties inherited from `Object.prototype`.
        if (isProperty.call(members, property)) {
          size++;
        }
      }
      Properties = members = null;

      // Normalize the iteration algorithm.
      if (!size) {
        // A list of non-enumerable properties inherited from `Object.prototype`.
        members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
        // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
        // properties.
        forEach = function (object, callback) {
          var isFunction = getClass.call(object) == functionClass, property, length;
          var hasProperty = !isFunction && typeof object.constructor != 'function' && isHostType(object, 'hasOwnProperty') ? object.hasOwnProperty : isProperty;
          for (property in object) {
            // Gecko <= 1.0 enumerates the `prototype` property of functions under
            // certain conditions; IE does not.
            if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
              callback(property);
            }
          }
          // Manually invoke the callback for each non-enumerable property.
          for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
        };
      } else if (size == 2) {
        // Safari <= 2.0.4 enumerates shadowed properties twice.
        forEach = function (object, callback) {
          // Create a set of iterated properties.
          var members = {}, isFunction = getClass.call(object) == functionClass, property;
          for (property in object) {
            // Store each property name to prevent double enumeration. The
            // `prototype` property of functions is not enumerated due to cross-
            // environment inconsistencies.
            if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
              callback(property);
            }
          }
        };
      } else {
        // No bugs detected; use the standard `for...in` algorithm.
        forEach = function (object, callback) {
          var isFunction = getClass.call(object) == functionClass, property, isConstructor;
          for (property in object) {
            if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
              callback(property);
            }
          }
          // Manually invoke the callback for the `constructor` property due to
          // cross-environment inconsistencies.
          if (isConstructor || isProperty.call(object, (property = "constructor"))) {
            callback(property);
          }
        };
      }
      return forEach(object, callback);
    };

    // Public: Serializes a JavaScript `value` as a JSON string. The optional
    // `filter` argument may specify either a function that alters how object and
    // array members are serialized, or an array of strings and numbers that
    // indicates which properties should be serialized. The optional `width`
    // argument may be either a string or number that specifies the indentation
    // level of the output.
    if (!has("json-stringify")) {
      // Internal: A map of control characters and their escaped equivalents.
      var Escapes = {
        92: "\\\\",
        34: '\\"',
        8: "\\b",
        12: "\\f",
        10: "\\n",
        13: "\\r",
        9: "\\t"
      };

      // Internal: Converts `value` into a zero-padded string such that its
      // length is at least equal to `width`. The `width` must be <= 6.
      var leadingZeroes = "000000";
      var toPaddedString = function (width, value) {
        // The `|| 0` expression is necessary to work around a bug in
        // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
        return (leadingZeroes + (value || 0)).slice(-width);
      };

      // Internal: Double-quotes a string `value`, replacing all ASCII control
      // characters (characters with code unit values between 0 and 31) with
      // their escaped equivalents. This is an implementation of the
      // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
      var unicodePrefix = "\\u00";
      var quote = function (value) {
        var result = '"', index = 0, length = value.length, isLarge = length > 10 && charIndexBuggy, symbols;
        if (isLarge) {
          symbols = value.split("");
        }
        for (; index < length; index++) {
          var charCode = value.charCodeAt(index);
          // If the character is a control character, append its Unicode or
          // shorthand escape sequence; otherwise, append the character as-is.
          switch (charCode) {
            case 8: case 9: case 10: case 12: case 13: case 34: case 92:
              result += Escapes[charCode];
              break;
            default:
              if (charCode < 32) {
                result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                break;
              }
              result += isLarge ? symbols[index] : charIndexBuggy ? value.charAt(index) : value[index];
          }
        }
        return result + '"';
      };

      // Internal: Recursively serializes an object. Implements the
      // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
      var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
        var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
        try {
          // Necessary for host object support.
          value = object[property];
        } catch (exception) {}
        if (typeof value == "object" && value) {
          className = getClass.call(value);
          if (className == dateClass && !isProperty.call(value, "toJSON")) {
            if (value > -1 / 0 && value < 1 / 0) {
              // Dates are serialized according to the `Date#toJSON` method
              // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
              // for the ISO 8601 date time string format.
              if (getDay) {
                // Manually compute the year, month, date, hours, minutes,
                // seconds, and milliseconds if the `getUTC*` methods are
                // buggy. Adapted from @Yaffle's `date-shim` project.
                date = floor(value / 864e5);
                for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                date = 1 + date - getDay(year, month);
                // The `time` value specifies the time within the day (see ES
                // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                // to compute `A modulo B`, as the `%` operator does not
                // correspond to the `modulo` operation for negative numbers.
                time = (value % 864e5 + 864e5) % 864e5;
                // The hours, minutes, seconds, and milliseconds are obtained by
                // decomposing the time within the day. See section 15.9.1.10.
                hours = floor(time / 36e5) % 24;
                minutes = floor(time / 6e4) % 60;
                seconds = floor(time / 1e3) % 60;
                milliseconds = time % 1e3;
              } else {
                year = value.getUTCFullYear();
                month = value.getUTCMonth();
                date = value.getUTCDate();
                hours = value.getUTCHours();
                minutes = value.getUTCMinutes();
                seconds = value.getUTCSeconds();
                milliseconds = value.getUTCMilliseconds();
              }
              // Serialize extended years correctly.
              value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                // Months, dates, hours, minutes, and seconds should have two
                // digits; milliseconds should have three.
                "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                // Milliseconds are optional in ES 5.0, but required in 5.1.
                "." + toPaddedString(3, milliseconds) + "Z";
            } else {
              value = null;
            }
          } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
            // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
            // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
            // ignores all `toJSON` methods on these objects unless they are
            // defined directly on an instance.
            value = value.toJSON(property);
          }
        }
        if (callback) {
          // If a replacement function was provided, call it to obtain the value
          // for serialization.
          value = callback.call(object, property, value);
        }
        if (value === null) {
          return "null";
        }
        className = getClass.call(value);
        if (className == booleanClass) {
          // Booleans are represented literally.
          return "" + value;
        } else if (className == numberClass) {
          // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
          // `"null"`.
          return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
        } else if (className == stringClass) {
          // Strings are double-quoted and escaped.
          return quote("" + value);
        }
        // Recursively serialize objects and arrays.
        if (typeof value == "object") {
          // Check for cyclic structures. This is a linear search; performance
          // is inversely proportional to the number of unique nested objects.
          for (length = stack.length; length--;) {
            if (stack[length] === value) {
              // Cyclic structures cannot be serialized by `JSON.stringify`.
              throw TypeError();
            }
          }
          // Add the object to the stack of traversed objects.
          stack.push(value);
          results = [];
          // Save the current indentation level and indent one additional level.
          prefix = indentation;
          indentation += whitespace;
          if (className == arrayClass) {
            // Recursively serialize array elements.
            for (index = 0, length = value.length; index < length; index++) {
              element = serialize(index, value, callback, properties, whitespace, indentation, stack);
              results.push(element === undef ? "null" : element);
            }
            result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
          } else {
            // Recursively serialize object members. Members are selected from
            // either a user-specified list of property names, or the object
            // itself.
            forEach(properties || value, function (property) {
              var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
              if (element !== undef) {
                // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                // is not the empty string, let `member` {quote(property) + ":"}
                // be the concatenation of `member` and the `space` character."
                // The "`space` character" refers to the literal space
                // character, not the `space` {width} argument provided to
                // `JSON.stringify`.
                results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
              }
            });
            result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
          }
          // Remove the object from the traversed object stack.
          stack.pop();
          return result;
        }
      };

      // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
      JSON3.stringify = function (source, filter, width) {
        var whitespace, callback, properties, className;
        if (typeof filter == "function" || typeof filter == "object" && filter) {
          if ((className = getClass.call(filter)) == functionClass) {
            callback = filter;
          } else if (className == arrayClass) {
            // Convert the property names array into a makeshift set.
            properties = {};
            for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
          }
        }
        if (width) {
          if ((className = getClass.call(width)) == numberClass) {
            // Convert the `width` to an integer and create a string containing
            // `width` number of space characters.
            if ((width -= width % 1) > 0) {
              for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
            }
          } else if (className == stringClass) {
            whitespace = width.length <= 10 ? width : width.slice(0, 10);
          }
        }
        // Opera <= 7.54u2 discards the values associated with empty string keys
        // (`""`) only if they are used directly within an object member list
        // (e.g., `!("" in { "": 1})`).
        return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
      };
    }

    // Public: Parses a JSON source string.
    if (!has("json-parse")) {
      var fromCharCode = String.fromCharCode;

      // Internal: A map of escaped control characters and their unescaped
      // equivalents.
      var Unescapes = {
        92: "\\",
        34: '"',
        47: "/",
        98: "\b",
        116: "\t",
        110: "\n",
        102: "\f",
        114: "\r"
      };

      // Internal: Stores the parser state.
      var Index, Source;

      // Internal: Resets the parser state and throws a `SyntaxError`.
      var abort = function() {
        Index = Source = null;
        throw SyntaxError();
      };

      // Internal: Returns the next token, or `"$"` if the parser has reached
      // the end of the source string. A token may be a string, number, `null`
      // literal, or Boolean literal.
      var lex = function () {
        var source = Source, length = source.length, value, begin, position, isSigned, charCode;
        while (Index < length) {
          charCode = source.charCodeAt(Index);
          switch (charCode) {
            case 9: case 10: case 13: case 32:
              // Skip whitespace tokens, including tabs, carriage returns, line
              // feeds, and space characters.
              Index++;
              break;
            case 123: case 125: case 91: case 93: case 58: case 44:
              // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
              // the current position.
              value = charIndexBuggy ? source.charAt(Index) : source[Index];
              Index++;
              return value;
            case 34:
              // `"` delimits a JSON string; advance to the next character and
              // begin parsing the string. String tokens are prefixed with the
              // sentinel `@` character to distinguish them from punctuators and
              // end-of-string tokens.
              for (value = "@", Index++; Index < length;) {
                charCode = source.charCodeAt(Index);
                if (charCode < 32) {
                  // Unescaped ASCII control characters (those with a code unit
                  // less than the space character) are not permitted.
                  abort();
                } else if (charCode == 92) {
                  // A reverse solidus (`\`) marks the beginning of an escaped
                  // control character (including `"`, `\`, and `/`) or Unicode
                  // escape sequence.
                  charCode = source.charCodeAt(++Index);
                  switch (charCode) {
                    case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                      // Revive escaped control characters.
                      value += Unescapes[charCode];
                      Index++;
                      break;
                    case 117:
                      // `\u` marks the beginning of a Unicode escape sequence.
                      // Advance to the first character and validate the
                      // four-digit code point.
                      begin = ++Index;
                      for (position = Index + 4; Index < position; Index++) {
                        charCode = source.charCodeAt(Index);
                        // A valid sequence comprises four hexdigits (case-
                        // insensitive) that form a single hexadecimal value.
                        if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                          // Invalid Unicode escape sequence.
                          abort();
                        }
                      }
                      // Revive the escaped character.
                      value += fromCharCode("0x" + source.slice(begin, Index));
                      break;
                    default:
                      // Invalid escape sequence.
                      abort();
                  }
                } else {
                  if (charCode == 34) {
                    // An unescaped double-quote character marks the end of the
                    // string.
                    break;
                  }
                  charCode = source.charCodeAt(Index);
                  begin = Index;
                  // Optimize for the common case where a string is valid.
                  while (charCode >= 32 && charCode != 92 && charCode != 34) {
                    charCode = source.charCodeAt(++Index);
                  }
                  // Append the string as-is.
                  value += source.slice(begin, Index);
                }
              }
              if (source.charCodeAt(Index) == 34) {
                // Advance to the next character and return the revived string.
                Index++;
                return value;
              }
              // Unterminated string.
              abort();
            default:
              // Parse numbers and literals.
              begin = Index;
              // Advance past the negative sign, if one is specified.
              if (charCode == 45) {
                isSigned = true;
                charCode = source.charCodeAt(++Index);
              }
              // Parse an integer or floating-point value.
              if (charCode >= 48 && charCode <= 57) {
                // Leading zeroes are interpreted as octal literals.
                if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                  // Illegal octal literal.
                  abort();
                }
                isSigned = false;
                // Parse the integer component.
                for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                // Floats cannot contain a leading decimal point; however, this
                // case is already accounted for by the parser.
                if (source.charCodeAt(Index) == 46) {
                  position = ++Index;
                  // Parse the decimal component.
                  for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                  if (position == Index) {
                    // Illegal trailing decimal.
                    abort();
                  }
                  Index = position;
                }
                // Parse exponents. The `e` denoting the exponent is
                // case-insensitive.
                charCode = source.charCodeAt(Index);
                if (charCode == 101 || charCode == 69) {
                  charCode = source.charCodeAt(++Index);
                  // Skip past the sign following the exponent, if one is
                  // specified.
                  if (charCode == 43 || charCode == 45) {
                    Index++;
                  }
                  // Parse the exponential component.
                  for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                  if (position == Index) {
                    // Illegal empty exponent.
                    abort();
                  }
                  Index = position;
                }
                // Coerce the parsed value to a JavaScript number.
                return +source.slice(begin, Index);
              }
              // A negative sign may only precede numbers.
              if (isSigned) {
                abort();
              }
              // `true`, `false`, and `null` literals.
              if (source.slice(Index, Index + 4) == "true") {
                Index += 4;
                return true;
              } else if (source.slice(Index, Index + 5) == "false") {
                Index += 5;
                return false;
              } else if (source.slice(Index, Index + 4) == "null") {
                Index += 4;
                return null;
              }
              // Unrecognized token.
              abort();
          }
        }
        // Return the sentinel `$` character if the parser has reached the end
        // of the source string.
        return "$";
      };

      // Internal: Parses a JSON `value` token.
      var get = function (value) {
        var results, hasMembers;
        if (value == "$") {
          // Unexpected end of input.
          abort();
        }
        if (typeof value == "string") {
          if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
            // Remove the sentinel `@` character.
            return value.slice(1);
          }
          // Parse object and array literals.
          if (value == "[") {
            // Parses a JSON array, returning a new JavaScript array.
            results = [];
            for (;; hasMembers || (hasMembers = true)) {
              value = lex();
              // A closing square bracket marks the end of the array literal.
              if (value == "]") {
                break;
              }
              // If the array literal contains elements, the current token
              // should be a comma separating the previous element from the
              // next.
              if (hasMembers) {
                if (value == ",") {
                  value = lex();
                  if (value == "]") {
                    // Unexpected trailing `,` in array literal.
                    abort();
                  }
                } else {
                  // A `,` must separate each array element.
                  abort();
                }
              }
              // Elisions and leading commas are not permitted.
              if (value == ",") {
                abort();
              }
              results.push(get(value));
            }
            return results;
          } else if (value == "{") {
            // Parses a JSON object, returning a new JavaScript object.
            results = {};
            for (;; hasMembers || (hasMembers = true)) {
              value = lex();
              // A closing curly brace marks the end of the object literal.
              if (value == "}") {
                break;
              }
              // If the object literal contains members, the current token
              // should be a comma separator.
              if (hasMembers) {
                if (value == ",") {
                  value = lex();
                  if (value == "}") {
                    // Unexpected trailing `,` in object literal.
                    abort();
                  }
                } else {
                  // A `,` must separate each object member.
                  abort();
                }
              }
              // Leading commas are not permitted, object property names must be
              // double-quoted strings, and a `:` must separate each property
              // name and value.
              if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                abort();
              }
              results[value.slice(1)] = get(lex());
            }
            return results;
          }
          // Unexpected token encountered.
          abort();
        }
        return value;
      };

      // Internal: Updates a traversed object member.
      var update = function(source, property, callback) {
        var element = walk(source, property, callback);
        if (element === undef) {
          delete source[property];
        } else {
          source[property] = element;
        }
      };

      // Internal: Recursively traverses a parsed JSON object, invoking the
      // `callback` function for each value. This is an implementation of the
      // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
      var walk = function (source, property, callback) {
        var value = source[property], length;
        if (typeof value == "object" && value) {
          // `forEach` can't be used to traverse an array in Opera <= 8.54
          // because its `Object#hasOwnProperty` implementation returns `false`
          // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
          if (getClass.call(value) == arrayClass) {
            for (length = value.length; length--;) {
              update(value, length, callback);
            }
          } else {
            forEach(value, function (property) {
              update(value, property, callback);
            });
          }
        }
        return callback.call(source, property, value);
      };

      // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
      JSON3.parse = function (source, callback) {
        var result, value;
        Index = 0;
        Source = "" + source;
        result = get(lex());
        // If a JSON string contains multiple tokens, it is invalid.
        if (lex() != "$") {
          abort();
        }
        // Reset the parser state.
        Index = Source = null;
        return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
      };
    }
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    define(function () {
      return JSON3;
    });
  }
}(this));

},{}],51:[function(require,module,exports){
module.exports = toArray

function toArray(list, index) {
    var array = []

    index = index || 0

    for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i]
    }

    return array
}

},{}],52:[function(require,module,exports){

},{}],53:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('is-array')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var kMaxLength = 0x3fffffff
var rootParent = {}

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Note:
 *
 * - Implementation must support adding new properties to `Uint8Array` instances.
 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *    incorrect length in some situations.
 *
 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
 * get the Object implementation, which is slower but will work correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = (function () {
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (arg) {
  if (!(this instanceof Buffer)) {
    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
    if (arguments.length > 1) return new Buffer(arg, arguments[1])
    return new Buffer(arg)
  }

  this.length = 0
  this.parent = undefined

  // Common case.
  if (typeof arg === 'number') {
    return fromNumber(this, arg)
  }

  // Slightly less common case.
  if (typeof arg === 'string') {
    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
  }

  // Unusual.
  return fromObject(this, arg)
}

function fromNumber (that, length) {
  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < length; i++) {
      that[i] = 0
    }
  }
  return that
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

  // Assumption: byteLength() return value is always < kMaxLength.
  var length = byteLength(string, encoding) | 0
  that = allocate(that, length)

  that.write(string, encoding)
  return that
}

function fromObject (that, object) {
  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

  if (isArray(object)) return fromArray(that, object)

  if (object == null) {
    throw new TypeError('must start with number, buffer, array or string')
  }

  if (typeof ArrayBuffer !== 'undefined' && object.buffer instanceof ArrayBuffer) {
    return fromTypedArray(that, object)
  }

  if (object.length) return fromArrayLike(that, object)

  return fromJsonObject(that, object)
}

function fromBuffer (that, buffer) {
  var length = checked(buffer.length) | 0
  that = allocate(that, length)
  buffer.copy(that, 0, 0, length)
  return that
}

function fromArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Duplicate of fromArray() to keep fromArray() monomorphic.
function fromTypedArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  // Truncating the elements is probably not what people expect from typed
  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
  // of the old Buffer constructor.
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayLike (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
// Returns a zero-length buffer for inputs that don't conform to the spec.
function fromJsonObject (that, object) {
  var array
  var length = 0

  if (object.type === 'Buffer' && isArray(object.data)) {
    array = object.data
    length = checked(array.length) | 0
  }
  that = allocate(that, length)

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function allocate (that, length) {
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return an object instance of the Buffer class
    that.length = length
    that._isBuffer = true
  }

  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
  if (fromPool) that.parent = rootParent

  return that
}

function checked (length) {
  // Note: cannot use `length < kMaxLength` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (subject, encoding) {
  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

  var buf = new Buffer(subject, encoding)
  delete buf.parent
  return buf
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  var i = 0
  var len = Math.min(x, y)
  while (i < len) {
    if (a[i] !== b[i]) break

    ++i
  }

  if (i !== len) {
    x = a[i]
    y = b[i]
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; i++) {
      length += list[i].length
    }
  }

  var buf = new Buffer(length)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

function byteLength (string, encoding) {
  if (typeof string !== 'string') string = String(string)

  if (string.length === 0) return 0

  switch (encoding || 'utf8') {
    case 'ascii':
    case 'binary':
    case 'raw':
      return string.length
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return string.length * 2
    case 'hex':
      return string.length >>> 1
    case 'utf8':
    case 'utf-8':
      return utf8ToBytes(string).length
    case 'base64':
      return base64ToBytes(string).length
    default:
      return string.length
  }
}
Buffer.byteLength = byteLength

// pre-set for values that may exist in the future
Buffer.prototype.length = undefined
Buffer.prototype.parent = undefined

// toString(encoding, start=0, end=buffer.length)
Buffer.prototype.toString = function toString (encoding, start, end) {
  var loweredCase = false

  start = start | 0
  end = end === undefined || end === Infinity ? this.length : end | 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return 0
  return Buffer.compare(this, b)
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
  byteOffset >>= 0

  if (this.length === 0) return -1
  if (byteOffset >= this.length) return -1

  // Negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

  if (typeof val === 'string') {
    if (val.length === 0) return -1 // special case: looking for empty string always fails
    return String.prototype.indexOf.call(this, val, byteOffset)
  }
  if (Buffer.isBuffer(val)) {
    return arrayIndexOf(this, val, byteOffset)
  }
  if (typeof val === 'number') {
    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
    }
    return arrayIndexOf(this, [ val ], byteOffset)
  }

  function arrayIndexOf (arr, val, byteOffset) {
    var foundIndex = -1
    for (var i = 0; byteOffset + i < arr.length; i++) {
      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
      } else {
        foundIndex = -1
      }
    }
    return -1
  }

  throw new TypeError('val must be string, number or Buffer')
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function get (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function set (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) throw new Error('Invalid hex string')
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    var swap = encoding
    encoding = offset
    offset = length | 0
    length = swap
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'binary':
        return binaryWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function binarySlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
  }

  if (newBuf.length) newBuf.parent = this.parent || this

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = value
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = value
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = value
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
  if (offset < 0) throw new RangeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < len; i++) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), targetStart)
  }

  return len
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function fill (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new RangeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function _augment (arr) {
  arr.constructor = Buffer
  arr._isBuffer = true

  // save reference to original Uint8Array set method before overwriting
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.indexOf = BP.indexOf
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUIntLE = BP.readUIntLE
  arr.readUIntBE = BP.readUIntBE
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readIntLE = BP.readIntLE
  arr.readIntBE = BP.readIntBE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUIntLE = BP.writeUIntLE
  arr.writeUIntBE = BP.writeUIntBE
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeIntLE = BP.writeIntLE
  arr.writeIntBE = BP.writeIntBE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

var INVALID_BASE64_RE = /[^+\/0-9A-z\-]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []
  var i = 0

  for (; i < length; i++) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (leadSurrogate) {
        // 2 leads in a row
        if (codePoint < 0xDC00) {
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          leadSurrogate = codePoint
          continue
        } else {
          // valid surrogate pair
          codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
          leadSurrogate = null
        }
      } else {
        // no lead yet

        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else {
          // valid lead
          leadSurrogate = codePoint
          continue
        }
      }
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
      leadSurrogate = null
    }

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x200000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

},{"base64-js":54,"ieee754":55,"is-array":56}],54:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)
	var PLUS_URL_SAFE = '-'.charCodeAt(0)
	var SLASH_URL_SAFE = '_'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS ||
		    code === PLUS_URL_SAFE)
			return 62 // '+'
		if (code === SLASH ||
		    code === SLASH_URL_SAFE)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],55:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],56:[function(require,module,exports){

/**
 * isArray
 */

var isArray = Array.isArray;

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * Whether or not the given `val`
 * is an array.
 *
 * example:
 *
 *        isArray([]);
 *        // > true
 *        isArray(arguments);
 *        // > false
 *        isArray('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

module.exports = isArray || function (val) {
  return !! val && '[object Array]' == str.call(val);
};

},{}],57:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],58:[function(require,module,exports){
var http = module.exports;
var EventEmitter = require('events').EventEmitter;
var Request = require('./lib/request');
var url = require('url')

http.request = function (params, cb) {
    if (typeof params === 'string') {
        params = url.parse(params)
    }
    if (!params) params = {};
    if (!params.host && !params.port) {
        params.port = parseInt(window.location.port, 10);
    }
    if (!params.host && params.hostname) {
        params.host = params.hostname;
    }

    if (!params.protocol) {
        if (params.scheme) {
            params.protocol = params.scheme + ':';
        } else {
            params.protocol = window.location.protocol;
        }
    }

    if (!params.host) {
        params.host = window.location.hostname || window.location.host;
    }
    if (/:/.test(params.host)) {
        if (!params.port) {
            params.port = params.host.split(':')[1];
        }
        params.host = params.host.split(':')[0];
    }
    if (!params.port) params.port = params.protocol == 'https:' ? 443 : 80;
    
    var req = new Request(new xhrHttp, params);
    if (cb) req.on('response', cb);
    return req;
};

http.get = function (params, cb) {
    params.method = 'GET';
    var req = http.request(params, cb);
    req.end();
    return req;
};

http.Agent = function () {};
http.Agent.defaultMaxSockets = 4;

var xhrHttp = (function () {
    if (typeof window === 'undefined') {
        throw new Error('no window object present');
    }
    else if (window.XMLHttpRequest) {
        return window.XMLHttpRequest;
    }
    else if (window.ActiveXObject) {
        var axs = [
            'Msxml2.XMLHTTP.6.0',
            'Msxml2.XMLHTTP.3.0',
            'Microsoft.XMLHTTP'
        ];
        for (var i = 0; i < axs.length; i++) {
            try {
                var ax = new(window.ActiveXObject)(axs[i]);
                return function () {
                    if (ax) {
                        var ax_ = ax;
                        ax = null;
                        return ax_;
                    }
                    else {
                        return new(window.ActiveXObject)(axs[i]);
                    }
                };
            }
            catch (e) {}
        }
        throw new Error('ajax not supported in this browser')
    }
    else {
        throw new Error('ajax not supported in this browser');
    }
})();

http.STATUS_CODES = {
    100 : 'Continue',
    101 : 'Switching Protocols',
    102 : 'Processing',                 // RFC 2518, obsoleted by RFC 4918
    200 : 'OK',
    201 : 'Created',
    202 : 'Accepted',
    203 : 'Non-Authoritative Information',
    204 : 'No Content',
    205 : 'Reset Content',
    206 : 'Partial Content',
    207 : 'Multi-Status',               // RFC 4918
    300 : 'Multiple Choices',
    301 : 'Moved Permanently',
    302 : 'Moved Temporarily',
    303 : 'See Other',
    304 : 'Not Modified',
    305 : 'Use Proxy',
    307 : 'Temporary Redirect',
    400 : 'Bad Request',
    401 : 'Unauthorized',
    402 : 'Payment Required',
    403 : 'Forbidden',
    404 : 'Not Found',
    405 : 'Method Not Allowed',
    406 : 'Not Acceptable',
    407 : 'Proxy Authentication Required',
    408 : 'Request Time-out',
    409 : 'Conflict',
    410 : 'Gone',
    411 : 'Length Required',
    412 : 'Precondition Failed',
    413 : 'Request Entity Too Large',
    414 : 'Request-URI Too Large',
    415 : 'Unsupported Media Type',
    416 : 'Requested Range Not Satisfiable',
    417 : 'Expectation Failed',
    418 : 'I\'m a teapot',              // RFC 2324
    422 : 'Unprocessable Entity',       // RFC 4918
    423 : 'Locked',                     // RFC 4918
    424 : 'Failed Dependency',          // RFC 4918
    425 : 'Unordered Collection',       // RFC 4918
    426 : 'Upgrade Required',           // RFC 2817
    428 : 'Precondition Required',      // RFC 6585
    429 : 'Too Many Requests',          // RFC 6585
    431 : 'Request Header Fields Too Large',// RFC 6585
    500 : 'Internal Server Error',
    501 : 'Not Implemented',
    502 : 'Bad Gateway',
    503 : 'Service Unavailable',
    504 : 'Gateway Time-out',
    505 : 'HTTP Version Not Supported',
    506 : 'Variant Also Negotiates',    // RFC 2295
    507 : 'Insufficient Storage',       // RFC 4918
    509 : 'Bandwidth Limit Exceeded',
    510 : 'Not Extended',               // RFC 2774
    511 : 'Network Authentication Required' // RFC 6585
};
},{"./lib/request":59,"events":57,"url":83}],59:[function(require,module,exports){
var Stream = require('stream');
var Response = require('./response');
var Base64 = require('Base64');
var inherits = require('inherits');

var Request = module.exports = function (xhr, params) {
    var self = this;
    self.writable = true;
    self.xhr = xhr;
    self.body = [];
    
    self.uri = (params.protocol || 'http:') + '//'
        + params.host
        + (params.port ? ':' + params.port : '')
        + (params.path || '/')
    ;
    
    if (typeof params.withCredentials === 'undefined') {
        params.withCredentials = true;
    }

    try { xhr.withCredentials = params.withCredentials }
    catch (e) {}
    
    if (params.responseType) try { xhr.responseType = params.responseType }
    catch (e) {}
    
    xhr.open(
        params.method || 'GET',
        self.uri,
        true
    );

    xhr.onerror = function(event) {
        self.emit('error', new Error('Network error'));
    };

    self._headers = {};
    
    if (params.headers) {
        var keys = objectKeys(params.headers);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (!self.isSafeRequestHeader(key)) continue;
            var value = params.headers[key];
            self.setHeader(key, value);
        }
    }
    
    if (params.auth) {
        //basic auth
        this.setHeader('Authorization', 'Basic ' + Base64.btoa(params.auth));
    }

    var res = new Response;
    res.on('close', function () {
        self.emit('close');
    });
    
    res.on('ready', function () {
        self.emit('response', res);
    });

    res.on('error', function (err) {
        self.emit('error', err);
    });
    
    xhr.onreadystatechange = function () {
        // Fix for IE9 bug
        // SCRIPT575: Could not complete the operation due to error c00c023f
        // It happens when a request is aborted, calling the success callback anyway with readyState === 4
        if (xhr.__aborted) return;
        res.handle(xhr);
    };
};

inherits(Request, Stream);

Request.prototype.setHeader = function (key, value) {
    this._headers[key.toLowerCase()] = value
};

Request.prototype.getHeader = function (key) {
    return this._headers[key.toLowerCase()]
};

Request.prototype.removeHeader = function (key) {
    delete this._headers[key.toLowerCase()]
};

Request.prototype.write = function (s) {
    this.body.push(s);
};

Request.prototype.destroy = function (s) {
    this.xhr.__aborted = true;
    this.xhr.abort();
    this.emit('close');
};

Request.prototype.end = function (s) {
    if (s !== undefined) this.body.push(s);

    var keys = objectKeys(this._headers);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = this._headers[key];
        if (isArray(value)) {
            for (var j = 0; j < value.length; j++) {
                this.xhr.setRequestHeader(key, value[j]);
            }
        }
        else this.xhr.setRequestHeader(key, value)
    }

    if (this.body.length === 0) {
        this.xhr.send('');
    }
    else if (typeof this.body[0] === 'string') {
        this.xhr.send(this.body.join(''));
    }
    else if (isArray(this.body[0])) {
        var body = [];
        for (var i = 0; i < this.body.length; i++) {
            body.push.apply(body, this.body[i]);
        }
        this.xhr.send(body);
    }
    else if (/Array/.test(Object.prototype.toString.call(this.body[0]))) {
        var len = 0;
        for (var i = 0; i < this.body.length; i++) {
            len += this.body[i].length;
        }
        var body = new(this.body[0].constructor)(len);
        var k = 0;
        
        for (var i = 0; i < this.body.length; i++) {
            var b = this.body[i];
            for (var j = 0; j < b.length; j++) {
                body[k++] = b[j];
            }
        }
        this.xhr.send(body);
    }
    else if (isXHR2Compatible(this.body[0])) {
        this.xhr.send(this.body[0]);
    }
    else {
        var body = '';
        for (var i = 0; i < this.body.length; i++) {
            body += this.body[i].toString();
        }
        this.xhr.send(body);
    }
};

// Taken from http://dxr.mozilla.org/mozilla/mozilla-central/content/base/src/nsXMLHttpRequest.cpp.html
Request.unsafeHeaders = [
    "accept-charset",
    "accept-encoding",
    "access-control-request-headers",
    "access-control-request-method",
    "connection",
    "content-length",
    "cookie",
    "cookie2",
    "content-transfer-encoding",
    "date",
    "expect",
    "host",
    "keep-alive",
    "origin",
    "referer",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
    "user-agent",
    "via"
];

Request.prototype.isSafeRequestHeader = function (headerName) {
    if (!headerName) return false;
    return indexOf(Request.unsafeHeaders, headerName.toLowerCase()) === -1;
};

var objectKeys = Object.keys || function (obj) {
    var keys = [];
    for (var key in obj) keys.push(key);
    return keys;
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

var indexOf = function (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0; i < xs.length; i++) {
        if (xs[i] === x) return i;
    }
    return -1;
};

var isXHR2Compatible = function (obj) {
    if (typeof Blob !== 'undefined' && obj instanceof Blob) return true;
    if (typeof ArrayBuffer !== 'undefined' && obj instanceof ArrayBuffer) return true;
    if (typeof FormData !== 'undefined' && obj instanceof FormData) return true;
};

},{"./response":60,"Base64":61,"inherits":63,"stream":81}],60:[function(require,module,exports){
var Stream = require('stream');
var util = require('util');

var Response = module.exports = function (res) {
    this.offset = 0;
    this.readable = true;
};

util.inherits(Response, Stream);

var capable = {
    streaming : true,
    status2 : true
};

function parseHeaders (res) {
    var lines = res.getAllResponseHeaders().split(/\r?\n/);
    var headers = {};
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (line === '') continue;
        
        var m = line.match(/^([^:]+):\s*(.*)/);
        if (m) {
            var key = m[1].toLowerCase(), value = m[2];
            
            if (headers[key] !== undefined) {
            
                if (isArray(headers[key])) {
                    headers[key].push(value);
                }
                else {
                    headers[key] = [ headers[key], value ];
                }
            }
            else {
                headers[key] = value;
            }
        }
        else {
            headers[line] = true;
        }
    }
    return headers;
}

Response.prototype.getResponse = function (xhr) {
    var respType = String(xhr.responseType).toLowerCase();
    if (respType === 'blob') return xhr.responseBlob || xhr.response;
    if (respType === 'arraybuffer') return xhr.response;
    return xhr.responseText;
}

Response.prototype.getHeader = function (key) {
    return this.headers[key.toLowerCase()];
};

Response.prototype.handle = function (res) {
    if (res.readyState === 2 && capable.status2) {
        try {
            this.statusCode = res.status;
            this.headers = parseHeaders(res);
        }
        catch (err) {
            capable.status2 = false;
        }
        
        if (capable.status2) {
            this.emit('ready');
        }
    }
    else if (capable.streaming && res.readyState === 3) {
        try {
            if (!this.statusCode) {
                this.statusCode = res.status;
                this.headers = parseHeaders(res);
                this.emit('ready');
            }
        }
        catch (err) {}
        
        try {
            this._emitData(res);
        }
        catch (err) {
            capable.streaming = false;
        }
    }
    else if (res.readyState === 4) {
        if (!this.statusCode) {
            this.statusCode = res.status;
            this.emit('ready');
        }
        this._emitData(res);
        
        if (res.error) {
            this.emit('error', this.getResponse(res));
        }
        else this.emit('end');
        
        this.emit('close');
    }
};

Response.prototype._emitData = function (res) {
    var respBody = this.getResponse(res);
    if (respBody.toString().match(/ArrayBuffer/)) {
        this.emit('data', new Uint8Array(respBody, this.offset));
        this.offset = respBody.byteLength;
        return;
    }
    if (respBody.length > this.offset) {
        this.emit('data', respBody.slice(this.offset));
        this.offset = respBody.length;
    }
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

},{"stream":81,"util":85}],61:[function(require,module,exports){
;(function () {

  var object = typeof exports != 'undefined' ? exports : this; // #8: web workers
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  function InvalidCharacterError(message) {
    this.message = message;
  }
  InvalidCharacterError.prototype = new Error;
  InvalidCharacterError.prototype.name = 'InvalidCharacterError';

  // encoder
  // [https://gist.github.com/999166] by [https://github.com/nignag]
  object.btoa || (
  object.btoa = function (input) {
    for (
      // initialize result and counter
      var block, charCode, idx = 0, map = chars, output = '';
      // if the next input index does not exist:
      //   change the mapping table to "="
      //   check if d has no fractional digits
      input.charAt(idx | 0) || (map = '=', idx % 1);
      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
      output += map.charAt(63 & block >> 8 - idx % 1 * 8)
    ) {
      charCode = input.charCodeAt(idx += 3/4);
      if (charCode > 0xFF) {
        throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }
      block = block << 8 | charCode;
    }
    return output;
  });

  // decoder
  // [https://gist.github.com/1020396] by [https://github.com/atk]
  object.atob || (
  object.atob = function (input) {
    input = input.replace(/=+$/, '');
    if (input.length % 4 == 1) {
      throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (
      // initialize result and counters
      var bc = 0, bs, buffer, idx = 0, output = '';
      // get next character
      buffer = input.charAt(idx++);
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  });

}());

},{}],62:[function(require,module,exports){
var http = require('http');

var https = module.exports;

for (var key in http) {
    if (http.hasOwnProperty(key)) https[key] = http[key];
};

https.request = function (params, cb) {
    if (!params) params = {};
    params.scheme = 'https';
    return http.request.call(this, params, cb);
}

},{"http":58}],63:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],64:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"dup":33}],65:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],66:[function(require,module,exports){
(function (global){
/*! https://mths.be/punycode v1.3.2 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.3.2',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],67:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],68:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],69:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":67,"./encode":68}],70:[function(require,module,exports){
module.exports = require("./lib/_stream_duplex.js")

},{"./lib/_stream_duplex.js":71}],71:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

module.exports = Duplex;

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}
/*</replacement>*/


/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

forEach(objectKeys(Writable.prototype), function(method) {
  if (!Duplex.prototype[method])
    Duplex.prototype[method] = Writable.prototype[method];
});

function Duplex(options) {
  if (!(this instanceof Duplex))
    return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false)
    this.readable = false;

  if (options && options.writable === false)
    this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false)
    this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended)
    return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  process.nextTick(this.end.bind(this));
}

function forEach (xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

}).call(this,require('_process'))
},{"./_stream_readable":73,"./_stream_writable":75,"_process":65,"core-util-is":76,"inherits":63}],72:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

module.exports = PassThrough;

var Transform = require('./_stream_transform');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough))
    return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function(chunk, encoding, cb) {
  cb(null, chunk);
};

},{"./_stream_transform":74,"core-util-is":76,"inherits":63}],73:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Readable;

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/


/*<replacement>*/
var Buffer = require('buffer').Buffer;
/*</replacement>*/

Readable.ReadableState = ReadableState;

var EE = require('events').EventEmitter;

/*<replacement>*/
if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

var Stream = require('stream');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var StringDecoder;


/*<replacement>*/
var debug = require('util');
if (debug && debug.debuglog) {
  debug = debug.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/


util.inherits(Readable, Stream);

function ReadableState(options, stream) {
  var Duplex = require('./_stream_duplex');

  options = options || {};

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  this.buffer = [];
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;


  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex)
    this.objectMode = this.objectMode || !!options.readableObjectMode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder)
      StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  var Duplex = require('./_stream_duplex');

  if (!(this instanceof Readable))
    return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  Stream.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function(chunk, encoding) {
  var state = this._readableState;

  if (util.isString(chunk) && !state.objectMode) {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = new Buffer(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function(chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (util.isNullOrUndefined(chunk)) {
    state.reading = false;
    if (!state.ended)
      onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var e = new Error('stream.unshift() after end event');
      stream.emit('error', e);
    } else {
      if (state.decoder && !addToFront && !encoding)
        chunk = state.decoder.write(chunk);

      if (!addToFront)
        state.reading = false;

      // if we want the data now, just emit it.
      if (state.flowing && state.length === 0 && !state.sync) {
        stream.emit('data', chunk);
        stream.read(0);
      } else {
        // update the buffer info.
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront)
          state.buffer.unshift(chunk);
        else
          state.buffer.push(chunk);

        if (state.needReadable)
          emitReadable(stream);
      }

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}



// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended &&
         (state.needReadable ||
          state.length < state.highWaterMark ||
          state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function(enc) {
  if (!StringDecoder)
    StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 128MB
var MAX_HWM = 0x800000;
function roundUpToNextPowerOf2(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2
    n--;
    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
    n++;
  }
  return n;
}

function howMuchToRead(n, state) {
  if (state.length === 0 && state.ended)
    return 0;

  if (state.objectMode)
    return n === 0 ? 0 : 1;

  if (isNaN(n) || util.isNull(n)) {
    // only flow one buffer at a time
    if (state.flowing && state.buffer.length)
      return state.buffer[0].length;
    else
      return state.length;
  }

  if (n <= 0)
    return 0;

  // If we're asking for more than the target buffer level,
  // then raise the water mark.  Bump up to the next highest
  // power of 2, to prevent increasing it excessively in tiny
  // amounts.
  if (n > state.highWaterMark)
    state.highWaterMark = roundUpToNextPowerOf2(n);

  // don't have that much.  return null, unless we've ended.
  if (n > state.length) {
    if (!state.ended) {
      state.needReadable = true;
      return 0;
    } else
      return state.length;
  }

  return n;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function(n) {
  debug('read', n);
  var state = this._readableState;
  var nOrig = n;

  if (!util.isNumber(n) || n > 0)
    state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 &&
      state.needReadable &&
      (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended)
      endReadable(this);
    else
      emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0)
      endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  }

  if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0)
      state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
  }

  // If _read pushed data synchronously, then `reading` will be false,
  // and we need to re-evaluate how much data we can return to the user.
  if (doRead && !state.reading)
    n = howMuchToRead(nOrig, state);

  var ret;
  if (n > 0)
    ret = fromList(n, state);
  else
    ret = null;

  if (util.isNull(ret)) {
    state.needReadable = true;
    n = 0;
  }

  state.length -= n;

  // If we have nothing in the buffer, then we want to know
  // as soon as we *do* get something into the buffer.
  if (state.length === 0 && !state.ended)
    state.needReadable = true;

  // If we tried to read() past the EOF, then emit end on the next tick.
  if (nOrig !== n && state.ended && state.length === 0)
    endReadable(this);

  if (!util.isNull(ret))
    this.emit('data', ret);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!util.isBuffer(chunk) &&
      !util.isString(chunk) &&
      !util.isNullOrUndefined(chunk) &&
      !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}


function onEofChunk(stream, state) {
  if (state.decoder && !state.ended) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync)
      process.nextTick(function() {
        emitReadable_(stream);
      });
    else
      emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}


// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    process.nextTick(function() {
      maybeReadMore_(stream, state);
    });
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended &&
         state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;
    else
      len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function(n) {
  this.emit('error', new Error('not implemented'));
};

Readable.prototype.pipe = function(dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
              dest !== process.stdout &&
              dest !== process.stderr;

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted)
    process.nextTick(endFn);
  else
    src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    debug('onunpipe');
    if (readable === src) {
      cleanup();
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);
    src.removeListener('data', ondata);

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain &&
        (!dest._writableState || dest._writableState.needDrain))
      ondrain();
  }

  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    if (false === ret) {
      debug('false write response, pause',
            src._readableState.awaitDrain);
      src._readableState.awaitDrain++;
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EE.listenerCount(dest, 'error') === 0)
      dest.emit('error', er);
  }
  // This is a brutally ugly hack to make sure that our error handler
  // is attached before any userland ones.  NEVER DO THIS.
  if (!dest._events || !dest._events.error)
    dest.on('error', onerror);
  else if (isArray(dest._events.error))
    dest._events.error.unshift(onerror);
  else
    dest._events.error = [onerror, dest._events.error];



  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function() {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain)
      state.awaitDrain--;
    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}


Readable.prototype.unpipe = function(dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0)
    return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes)
      return this;

    if (!dest)
      dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest)
      dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++)
      dests[i].emit('unpipe', this);
    return this;
  }

  // try to find the right one.
  var i = indexOf(state.pipes, dest);
  if (i === -1)
    return this;

  state.pipes.splice(i, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1)
    state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function(ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  // If listening to data, and it has not explicitly been paused,
  // then call resume to start the flow of data on the next tick.
  if (ev === 'data' && false !== this._readableState.flowing) {
    this.resume();
  }

  if (ev === 'readable' && this.readable) {
    var state = this._readableState;
    if (!state.readableListening) {
      state.readableListening = true;
      state.emittedReadable = false;
      state.needReadable = true;
      if (!state.reading) {
        var self = this;
        process.nextTick(function() {
          debug('readable nexttick read 0');
          self.read(0);
        });
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function() {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    if (!state.reading) {
      debug('resume read 0');
      this.read(0);
    }
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    process.nextTick(function() {
      resume_(stream, state);
    });
  }
}

function resume_(stream, state) {
  state.resumeScheduled = false;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading)
    stream.read(0);
}

Readable.prototype.pause = function() {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  if (state.flowing) {
    do {
      var chunk = stream.read();
    } while (null !== chunk && state.flowing);
  }
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function(stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function() {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length)
        self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function(chunk) {
    debug('wrapped data');
    if (state.decoder)
      chunk = state.decoder.write(chunk);
    if (!chunk || !state.objectMode && !chunk.length)
      return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
      this[i] = function(method) { return function() {
        return stream[method].apply(stream, arguments);
      }}(i);
    }
  }

  // proxy certain important events.
  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
  forEach(events, function(ev) {
    stream.on(ev, self.emit.bind(self, ev));
  });

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function(n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};



// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
function fromList(n, state) {
  var list = state.buffer;
  var length = state.length;
  var stringMode = !!state.decoder;
  var objectMode = !!state.objectMode;
  var ret;

  // nothing in the list, definitely empty.
  if (list.length === 0)
    return null;

  if (length === 0)
    ret = null;
  else if (objectMode)
    ret = list.shift();
  else if (!n || n >= length) {
    // read it all, truncate the array.
    if (stringMode)
      ret = list.join('');
    else
      ret = Buffer.concat(list, length);
    list.length = 0;
  } else {
    // read just some of it.
    if (n < list[0].length) {
      // just take a part of the first list item.
      // slice is the same for buffers and strings.
      var buf = list[0];
      ret = buf.slice(0, n);
      list[0] = buf.slice(n);
    } else if (n === list[0].length) {
      // first list is a perfect match
      ret = list.shift();
    } else {
      // complex case.
      // we have enough to cover it, but it spans past the first buffer.
      if (stringMode)
        ret = '';
      else
        ret = new Buffer(n);

      var c = 0;
      for (var i = 0, l = list.length; i < l && c < n; i++) {
        var buf = list[0];
        var cpy = Math.min(n - c, buf.length);

        if (stringMode)
          ret += buf.slice(0, cpy);
        else
          buf.copy(ret, c, 0, cpy);

        if (cpy < buf.length)
          list[0] = buf.slice(cpy);
        else
          list.shift();

        c += cpy;
      }
    }
  }

  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0)
    throw new Error('endReadable called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    process.nextTick(function() {
      // Check that we didn't get one last unshift.
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit('end');
      }
    });
  }
}

function forEach (xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf (xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}

}).call(this,require('_process'))
},{"./_stream_duplex":71,"_process":65,"buffer":53,"core-util-is":76,"events":57,"inherits":63,"isarray":64,"stream":81,"string_decoder/":82,"util":52}],74:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

module.exports = Transform;

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);


function TransformState(options, stream) {
  this.afterTransform = function(er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb)
    return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (!util.isNullOrUndefined(data))
    stream.push(data);

  if (cb)
    cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}


function Transform(options) {
  if (!(this instanceof Transform))
    return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(options, this);

  // when the writable side finishes, then flush out anything remaining.
  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  this.once('prefinish', function() {
    if (util.isFunction(this._flush))
      this._flush(function(er) {
        done(stream, er);
      });
    else
      done(stream);
  });
}

Transform.prototype.push = function(chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function(chunk, encoding, cb) {
  throw new Error('not implemented');
};

Transform.prototype._write = function(chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform ||
        rs.needReadable ||
        rs.length < rs.highWaterMark)
      this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function(n) {
  var ts = this._transformState;

  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};


function done(stream, er) {
  if (er)
    return stream.emit('error', er);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length)
    throw new Error('calling transform done when ws.length != 0');

  if (ts.transforming)
    throw new Error('calling transform done when still transforming');

  return stream.push(null);
}

},{"./_stream_duplex":71,"core-util-is":76,"inherits":63}],75:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, cb), and it'll handle all
// the drain event emission and buffering.

module.exports = Writable;

/*<replacement>*/
var Buffer = require('buffer').Buffer;
/*</replacement>*/

Writable.WritableState = WritableState;


/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Stream = require('stream');

util.inherits(Writable, Stream);

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
}

function WritableState(options, stream) {
  var Duplex = require('./_stream_duplex');

  options = options || {};

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex)
    this.objectMode = this.objectMode || !!options.writableObjectMode;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function(er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.buffer = [];

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;
}

function Writable(options) {
  var Duplex = require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, though they're not
  // instanceof Writable, they're instanceof Readable.
  if (!(this instanceof Writable) && !(this instanceof Duplex))
    return new Writable(options);

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function() {
  this.emit('error', new Error('Cannot pipe. Not readable.'));
};


function writeAfterEnd(stream, state, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  process.nextTick(function() {
    cb(er);
  });
}

// If we get something that is not a buffer, string, null, or undefined,
// and we're not in objectMode, then that's an error.
// Otherwise stream chunks are all considered to be of length=1, and the
// watermarks determine how many objects to keep in the buffer, rather than
// how many bytes or characters.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  if (!util.isBuffer(chunk) &&
      !util.isString(chunk) &&
      !util.isNullOrUndefined(chunk) &&
      !state.objectMode) {
    var er = new TypeError('Invalid non-string/buffer chunk');
    stream.emit('error', er);
    process.nextTick(function() {
      cb(er);
    });
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function(chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  if (util.isFunction(encoding)) {
    cb = encoding;
    encoding = null;
  }

  if (util.isBuffer(chunk))
    encoding = 'buffer';
  else if (!encoding)
    encoding = state.defaultEncoding;

  if (!util.isFunction(cb))
    cb = function() {};

  if (state.ended)
    writeAfterEnd(this, state, cb);
  else if (validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function() {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function() {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing &&
        !state.corked &&
        !state.finished &&
        !state.bufferProcessing &&
        state.buffer.length)
      clearBuffer(this, state);
  }
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode &&
      state.decodeStrings !== false &&
      util.isString(chunk)) {
    chunk = new Buffer(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding);
  if (util.isBuffer(chunk))
    encoding = 'buffer';
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret)
    state.needDrain = true;

  if (state.writing || state.corked)
    state.buffer.push(new WriteReq(chunk, encoding, cb));
  else
    doWrite(stream, state, false, len, chunk, encoding, cb);

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev)
    stream._writev(chunk, state.onwrite);
  else
    stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  if (sync)
    process.nextTick(function() {
      state.pendingcb--;
      cb(er);
    });
  else {
    state.pendingcb--;
    cb(er);
  }

  stream._writableState.errorEmitted = true;
  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er)
    onwriteError(stream, state, sync, er, cb);
  else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(stream, state);

    if (!finished &&
        !state.corked &&
        !state.bufferProcessing &&
        state.buffer.length) {
      clearBuffer(stream, state);
    }

    if (sync) {
      process.nextTick(function() {
        afterWrite(stream, state, finished, cb);
      });
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished)
    onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}


// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;

  if (stream._writev && state.buffer.length > 1) {
    // Fast case, write everything using _writev()
    var cbs = [];
    for (var c = 0; c < state.buffer.length; c++)
      cbs.push(state.buffer[c].callback);

    // count the one we are adding, as well.
    // TODO(isaacs) clean this up
    state.pendingcb++;
    doWrite(stream, state, true, state.length, state.buffer, '', function(err) {
      for (var i = 0; i < cbs.length; i++) {
        state.pendingcb--;
        cbs[i](err);
      }
    });

    // Clear buffer
    state.buffer = [];
  } else {
    // Slow case, write chunks one-by-one
    for (var c = 0; c < state.buffer.length; c++) {
      var entry = state.buffer[c];
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);

      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        c++;
        break;
      }
    }

    if (c < state.buffer.length)
      state.buffer = state.buffer.slice(c);
    else
      state.buffer.length = 0;
  }

  state.bufferProcessing = false;
}

Writable.prototype._write = function(chunk, encoding, cb) {
  cb(new Error('not implemented'));

};

Writable.prototype._writev = null;

Writable.prototype.end = function(chunk, encoding, cb) {
  var state = this._writableState;

  if (util.isFunction(chunk)) {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (util.isFunction(encoding)) {
    cb = encoding;
    encoding = null;
  }

  if (!util.isNullOrUndefined(chunk))
    this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished)
    endWritable(this, state, cb);
};


function needFinish(stream, state) {
  return (state.ending &&
          state.length === 0 &&
          !state.finished &&
          !state.writing);
}

function prefinish(stream, state) {
  if (!state.prefinished) {
    state.prefinished = true;
    stream.emit('prefinish');
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(stream, state);
  if (need) {
    if (state.pendingcb === 0) {
      prefinish(stream, state);
      state.finished = true;
      stream.emit('finish');
    } else
      prefinish(stream, state);
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished)
      process.nextTick(cb);
    else
      stream.once('finish', cb);
  }
  state.ended = true;
}

}).call(this,require('_process'))
},{"./_stream_duplex":71,"_process":65,"buffer":53,"core-util-is":76,"inherits":63,"stream":81}],76:[function(require,module,exports){
(function (Buffer){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

function isBuffer(arg) {
  return Buffer.isBuffer(arg);
}
exports.isBuffer = isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}
}).call(this,require("buffer").Buffer)
},{"buffer":53}],77:[function(require,module,exports){
module.exports = require("./lib/_stream_passthrough.js")

},{"./lib/_stream_passthrough.js":72}],78:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = require('stream');
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":71,"./lib/_stream_passthrough.js":72,"./lib/_stream_readable.js":73,"./lib/_stream_transform.js":74,"./lib/_stream_writable.js":75,"stream":81}],79:[function(require,module,exports){
module.exports = require("./lib/_stream_transform.js")

},{"./lib/_stream_transform.js":74}],80:[function(require,module,exports){
module.exports = require("./lib/_stream_writable.js")

},{"./lib/_stream_writable.js":75}],81:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/readable.js');
Stream.Writable = require('readable-stream/writable.js');
Stream.Duplex = require('readable-stream/duplex.js');
Stream.Transform = require('readable-stream/transform.js');
Stream.PassThrough = require('readable-stream/passthrough.js');

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":57,"inherits":63,"readable-stream/duplex.js":70,"readable-stream/passthrough.js":77,"readable-stream/readable.js":78,"readable-stream/transform.js":79,"readable-stream/writable.js":80}],82:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = require('buffer').Buffer;

var isBufferEncoding = Buffer.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     }


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
};


// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}

},{"buffer":53}],83:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var punycode = require('punycode');

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = require('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a puny coded representation of "domain".
      // It only converts the part of the domain name that
      // has non ASCII characters. I.e. it dosent matter if
      // you call it with a domain that already is in ASCII.
      var domainArray = this.hostname.split('.');
      var newOut = [];
      for (var i = 0; i < domainArray.length; ++i) {
        var s = domainArray[i];
        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
            'xn--' + punycode.encode(s) : s);
      }
      this.hostname = newOut.join('.');
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  Object.keys(this).forEach(function(k) {
    result[k] = this[k];
  }, this);

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    Object.keys(relative).forEach(function(k) {
      if (k !== 'protocol')
        result[k] = relative[k];
    });

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      Object.keys(relative).forEach(function(k) {
        result[k] = relative[k];
      });
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especialy happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!isNull(result.pathname) || !isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host) && (last === '.' || last === '..') ||
      last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last == '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especialy happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!isNull(result.pathname) || !isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};

function isString(arg) {
  return typeof arg === "string";
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isNull(arg) {
  return arg === null;
}
function isNullOrUndefined(arg) {
  return  arg == null;
}

},{"punycode":66,"querystring":69}],84:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],85:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":84,"_process":65,"inherits":63}]},{},[1]);
