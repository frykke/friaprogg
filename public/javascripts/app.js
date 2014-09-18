(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("Application", function(exports, require, module) {

/*//CoffeeScript///////////////////////////////////////////////////////////////////
// 
// Copyright 2012 
// 
/////////////////////////////////////////////////////////////////////////////////
 */

/*
 * Application Bootstrapper
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var Application;

Application = {

  /*//--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------
   */
  docUrl: 'https://docs.google.com/spreadsheets/d/1ytHnb6c_QYz5Xb_EZDwRlw7JsxEa5e_nQllqz9HvBT8/pubhtml',

  /*//--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------
   */
  initialize: function() {
    var HistoryView, HomeView, MenuView, Router;
    HomeView = require('views/HomeView');
    MenuView = require('views/MenuView');
    HistoryView = require('views/HistoryView');
    Router = require('routers/Router');
    this.homeView = new HomeView();
    this.menuView = new MenuView();
    this.historyView = new HistoryView();
    this.router = new Router();
    return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
  }
};

module.exports = Application;
});

;require.register("config/ApplicationConfig", function(exports, require, module) {

/*
 * Application Configuration
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var ApplicationConfig;

ApplicationConfig = (function() {
  function ApplicationConfig() {}

  ApplicationConfig.BASE_URL = "/";

  return ApplicationConfig;

})();

module.exports = ApplicationConfig;
});

;require.register("events/ApplicationEvents", function(exports, require, module) {

/*
 * Application Events
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var ApplicationEvents;

ApplicationEvents = (function() {
  function ApplicationEvents() {}

  ApplicationEvents.APPLICATION_INITIALIZED = "onApplicationInitialized";

  return ApplicationEvents;

})();

module.exports = ApplicationConfig;
});

;require.register("helpers/ViewHelper", function(exports, require, module) {

/*
 * Handlebars Template Helpers
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */

/*//--------------------------------------
//+ PUBLIC PROPERTIES / CONSTANTS
//--------------------------------------
 */

/*//--------------------------------------
//+ PUBLIC METHODS / GETTERS / SETTERS
//--------------------------------------
 */
Handlebars.registerHelper('link', function(text, url) {
  var result;
  text = Handlebars.Utils.escapeExpression(text);
  url = Handlebars.Utils.escapeExpression(url);
  result = '<a href="' + url + '">' + text + '</a>';
  return new Handlebars.SafeString(result);
});
});

;require.register("initialize", function(exports, require, module) {

/*
 * Application Initializer
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var application, _compareHelper;

application = require('Application');

$(function() {
  application.initialize();
  Backbone.history.start();
  return application.navigate("home", {
    trigger: true
  });
});

_compareHelper = function(lvalue, operator, rvalue, options) {
  var operators, result;
  if (arguments.length < 3) {
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
  }
  if (options === void 0) {
    options = rvalue;
    rvalue = operator;
    operator = "==";
  }
  operators = {
    '==': (function(_this) {
      return function(l, r) {
        return l === r;
      };
    })(this),
    '!=': (function(_this) {
      return function(l, r) {
        return l !== r;
      };
    })(this),
    '<': (function(_this) {
      return function(l, r) {
        return l < r;
      };
    })(this),
    '>': (function(_this) {
      return function(l, r) {
        return l > r;
      };
    })(this),
    '<=': (function(_this) {
      return function(l, r) {
        return l <= r;
      };
    })(this),
    '>=': (function(_this) {
      return function(l, r) {
        return l >= r;
      };
    })(this),
    'typeof': (function(_this) {
      return function(l, r) {
        return typeof l === r;
      };
    })(this)
  };
  if (!operators[operator]) {
    throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
  }
  result = operators[operator](lvalue, rvalue);
  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};

Handlebars.registerHelper('compare', _compareHelper);
});

;require.register("models/CitatModel", function(exports, require, module) {
var CitatModel, Model,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./supers/Model');

module.exports = CitatModel = (function(_super) {
  __extends(CitatModel, _super);

  function CitatModel() {
    this.initialize = __bind(this.initialize, this);
    this.success = __bind(this.success, this);
    return CitatModel.__super__.constructor.apply(this, arguments);
  }

  CitatModel.prototype.docUrl = 'https://docs.google.com/spreadsheets/d/1ytHnb6c_QYz5Xb_EZDwRlw7JsxEa5e_nQllqz9HvBT8/pubhtml';

  CitatModel.prototype.success = function(data, tabletop) {
    return this.set({
      "quotes": tabletop.sheets('quotes').elements
    });
  };

  CitatModel.prototype.initialize = function() {
    return Tabletop.init({
      key: this.docUrl,
      callback: this.success,
      simpleSheet: false
    });
  };

  return CitatModel;

})(Model);
});

;require.register("models/ContactModel", function(exports, require, module) {
var ContactModel, Model,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./supers/Model');

module.exports = ContactModel = (function(_super) {
  __extends(ContactModel, _super);

  function ContactModel() {
    this.initialize = __bind(this.initialize, this);
    this.success = __bind(this.success, this);
    return ContactModel.__super__.constructor.apply(this, arguments);
  }

  ContactModel.prototype.docUrl = 'https://docs.google.com/spreadsheets/d/1ytHnb6c_QYz5Xb_EZDwRlw7JsxEa5e_nQllqz9HvBT8/pubhtml';

  ContactModel.prototype.success = function(data, tabletop) {
    console.log(tabletop);
    console.log(data);
    return this.set({
      "content": "Kontakta Fria Progg...",
      "contacts": tabletop.sheets('contacts').elements
    });
  };

  ContactModel.prototype.initialize = function() {
    return Tabletop.init({
      key: this.docUrl,
      callback: this.success,
      simpleSheet: false
    });
  };

  return ContactModel;

})(Model);
});

;require.register("models/DocModel", function(exports, require, module) {
var DocModel, Model,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./supers/Model');

module.exports = DocModel = (function(_super) {
  __extends(DocModel, _super);

  function DocModel() {
    this.initialize = __bind(this.initialize, this);
    this.success = __bind(this.success, this);
    return DocModel.__super__.constructor.apply(this, arguments);
  }

  DocModel.prototype.docUrl = 'https://docs.google.com/spreadsheets/d/1ytHnb6c_QYz5Xb_EZDwRlw7JsxEa5e_nQllqz9HvBT8/pubhtml';

  DocModel.prototype.success = function(data, tabletop) {
    console.log('got it');
    console.log(data);
    return this.set({
      "content": "Kommande spelningar....",
      "shows": data
    });
  };

  DocModel.prototype.initialize = function() {
    return Tabletop.init({
      key: this.docUrl,
      callback: this.success,
      simpleSheet: true
    });
  };

  DocModel.prototype.idAttribute = 'name';

  return DocModel;

})(Model);
});

;require.register("models/HistoryModel", function(exports, require, module) {
var HistoryModel, Model,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./supers/Model');

module.exports = HistoryModel = (function(_super) {
  __extends(HistoryModel, _super);

  function HistoryModel() {
    this.initialize = __bind(this.initialize, this);
    this.success = __bind(this.success, this);
    return HistoryModel.__super__.constructor.apply(this, arguments);
  }

  HistoryModel.prototype.docUrl = 'https://docs.google.com/spreadsheets/d/1ytHnb6c_QYz5Xb_EZDwRlw7JsxEa5e_nQllqz9HvBT8/pubhtml';

  HistoryModel.prototype.success = function(data, tabletop) {
    console.log(tabletop);
    console.log(data);
    return this.set({
      "content": "Om Fria Progg....",
      "histories": tabletop.sheets('history').elements
    });
  };

  HistoryModel.prototype.initialize = function() {
    return Tabletop.init({
      key: this.docUrl,
      callback: this.success,
      simpleSheet: false
    });
  };

  return HistoryModel;

})(Model);
});

;require.register("models/PicturesModel", function(exports, require, module) {
var Model, PicturesModel,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./supers/Model');

module.exports = PicturesModel = (function(_super) {
  __extends(PicturesModel, _super);

  function PicturesModel() {
    this.initialize = __bind(this.initialize, this);
    this.success = __bind(this.success, this);
    return PicturesModel.__super__.constructor.apply(this, arguments);
  }

  PicturesModel.prototype.docUrl = 'https://docs.google.com/spreadsheets/d/1ytHnb6c_QYz5Xb_EZDwRlw7JsxEa5e_nQllqz9HvBT8/pubhtml';

  PicturesModel.prototype.success = function(data, tabletop) {
    console.log(tabletop);
    console.log(data);
    return this.set({
      "content": "Några bilder",
      "images": tabletop.sheets('images').elements
    });
  };

  PicturesModel.prototype.initialize = function() {
    return Tabletop.init({
      key: this.docUrl,
      callback: this.success,
      simpleSheet: false
    });
  };

  return PicturesModel;

})(Model);
});

;require.register("models/ShowsModel", function(exports, require, module) {
var Model, ShowsModel,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./supers/Model');

module.exports = ShowsModel = (function(_super) {
  __extends(ShowsModel, _super);

  function ShowsModel() {
    this.initialize = __bind(this.initialize, this);
    this.success = __bind(this.success, this);
    return ShowsModel.__super__.constructor.apply(this, arguments);
  }

  ShowsModel.prototype.docUrl = 'https://docs.google.com/spreadsheets/d/1ytHnb6c_QYz5Xb_EZDwRlw7JsxEa5e_nQllqz9HvBT8/pubhtml';

  ShowsModel.prototype.success = function(data, tabletop) {
    console.log(tabletop);
    console.log(data);
    return this.set({
      "content": "Kommande spelningar....",
      "shows": tabletop.sheets('Events').elements
    });
  };

  ShowsModel.prototype.initialize = function() {
    return Tabletop.init({
      key: this.docUrl,
      callback: this.success,
      simpleSheet: false
    });
  };

  return ShowsModel;

})(Model);
});

;require.register("models/SoundsModel", function(exports, require, module) {
var Model, SoundsModel,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./supers/Model');

module.exports = SoundsModel = (function(_super) {
  __extends(SoundsModel, _super);

  function SoundsModel() {
    this.initialize = __bind(this.initialize, this);
    this.success = __bind(this.success, this);
    return SoundsModel.__super__.constructor.apply(this, arguments);
  }

  SoundsModel.prototype.docUrl = 'https://docs.google.com/spreadsheets/d/1ytHnb6c_QYz5Xb_EZDwRlw7JsxEa5e_nQllqz9HvBT8/pubhtml';

  SoundsModel.prototype.success = function(data, tabletop) {
    return this.set({
      "content": "Lyssna på fria progg....",
      "sounds": tabletop.sheets('sounds').elements
    });
  };

  SoundsModel.prototype.initialize = function() {
    return Tabletop.init({
      key: this.docUrl,
      callback: this.success,
      simpleSheet: false
    });
  };

  return SoundsModel;

})(Model);
});

;require.register("models/supers/Collection", function(exports, require, module) {

/*
 * Base Class for all Backbone Collections
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var Collection,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = Collection = (function(_super) {

  /*//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------
   */

  /*//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------
   */

  /*//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
   */

  /*//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
   */

  /*//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
   */
  __extends(Collection, _super);

  function Collection() {
    return Collection.__super__.constructor.apply(this, arguments);
  }

  return Collection;

})(Backbone.Collection);
});

;require.register("models/supers/Model", function(exports, require, module) {

/*
 * Base Class for all Backbone Models
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var Model,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = Model = (function(_super) {

  /*//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------
   */

  /*//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------
   */

  /*//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
   */

  /*//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
   */

  /*//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
   */
  __extends(Model, _super);

  function Model() {
    return Model.__super__.constructor.apply(this, arguments);
  }

  return Model;

})(Backbone.Model);
});

;require.register("routers/Router", function(exports, require, module) {

/*
 * Backbone Primary Router
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var CitatView, ContactView, HomeView, NewsView, PicturesView, Router, ShowsView, SoundsView, VideosView, application,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

application = require('Application');

ShowsView = require('../views/ShowsView');

ContactView = require('../views/ContactView');

PicturesView = require('../views/PicturesView');

VideosView = require('../views/VideosView');

NewsView = require('../views/NewsView');

SoundsView = require('../views/SoundsView');

CitatView = require('../views/CitatView');

HomeView = require('../views/HomeView');

module.exports = Router = (function(_super) {
  __extends(Router, _super);

  function Router() {
    return Router.__super__.constructor.apply(this, arguments);
  }


  /*//--------------------------------------
  	//+ Routes
  	//--------------------------------------
   */

  Router.prototype.routes = {
    '': 'home',
    'home': 'home',
    'history': 'history',
    'shows': 'shows',
    'contact': 'contact',
    'pictures': 'pictures',
    'videos': 'videos',
    'news': 'news',
    'sound': 'sounds',
    'citat': 'citat',
    'doc': 'doc'
  };


  /*//--------------------------------------
  	//+ Route Handlers
  	//--------------------------------------
   */

  Router.prototype.home = function() {
    application.menuView.setSelectedItem('home');
    $('#menu-container').html(application.menuView.render().el);
    return $('#main-container').html((new HomeView()).render().el);
  };

  Router.prototype.history = function() {
    application.menuView.setSelectedItem('history');
    $('#menu-container').html(application.menuView.render().el);
    return $('#main-container').html(application.historyView.render().el);
  };

  Router.prototype.shows = function() {
    application.menuView.setSelectedItem('shows');
    $('#menu-container').html(application.menuView.render().el);
    return $('#main-container').html((new ShowsView()).el);
  };

  Router.prototype.contact = function() {
    application.menuView.setSelectedItem('contact');
    $('#menu-container').html(application.menuView.render().el);
    return $('#main-container').html((new ContactView()).render().el);
  };

  Router.prototype.pictures = function() {
    application.menuView.setSelectedItem('pictures');
    $('#menu-container').html(application.menuView.render().el);
    return $('#main-container').html((new PicturesView()).render().el);
  };

  Router.prototype.videos = function() {
    application.menuView.setSelectedItem('videos');
    $('#menu-container').html(application.menuView.render().el);
    return $('#main-container').html((new VideosView()).render().el);
  };

  Router.prototype.news = function() {
    application.menuView.setSelectedItem('news');
    $('#menu-container').html(application.menuView.render().el);
    return $('#main-container').html((new NewsView()).render().el);
  };

  Router.prototype.sounds = function() {
    application.menuView.setSelectedItem('sound');
    $('#menu-container').html(application.menuView.render().el);
    return $('#main-container').html((new SoundsView()).render().el);
  };

  return Router;

})(Backbone.Router);
});

;require.register("utils/BackboneView", function(exports, require, module) {

/*
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var BackboneView, View, template,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./supers/View');

template = require('templates/HomeViewTemplate');

module.exports = BackboneView = (function(_super) {
  __extends(BackboneView, _super);

  function BackboneView() {
    return BackboneView.__super__.constructor.apply(this, arguments);
  }


  /*//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------
   */

  BackboneView.prototype.id = 'view';

  BackboneView.prototype.template = template;


  /*//--------------------------------------
   	//+ INHERITED / OVERRIDES
   	//--------------------------------------
   */

  BackboneView.prototype.initialize = function() {
    return this.render = _.bind(this.render, this);
  };

  BackboneView.prototype.render = function() {
    this.$el.html(this.template(this.getRenderData()));
    return this;
  };

  BackboneView.prototype.getRenderData = function() {
    return {
      content: "View Content"
    };
  };


  /*//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
   */

  return BackboneView;

})(View);
});

;require.register("views/CitatView", function(exports, require, module) {

/*
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var CitatView, Model, View, template,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./supers/View');

Model = require('../models/CitatModel');

template = require('./templates/QuotesTemplate');

module.exports = CitatView = (function(_super) {
  __extends(CitatView, _super);

  function CitatView() {
    this._nextQuoteIx = __bind(this._nextQuoteIx, this);
    this._newQuote = __bind(this._newQuote, this);
    this._getQuote = __bind(this._getQuote, this);
    this.render = __bind(this.render, this);
    return CitatView.__super__.constructor.apply(this, arguments);
  }


  /*//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------
   */

  CitatView.prototype.id = 'citat-view';

  CitatView.prototype["class"] = 'row';

  CitatView.prototype.template = template;


  /*//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------
   */

  CitatView.prototype.quoteIx = 0;

  CitatView.prototype.initialize = function() {
    this.quotes = new Model();
    return this.quotes.on('change', this._newQuote);
  };

  CitatView.prototype.render = function() {
    this.$el.html(this.template(this.getRenderData()));
    return this;
  };

  CitatView.prototype._getQuote = function() {
    var quotes;
    quotes = this.quotes.get('quotes');
    return {
      quote0: this.quoteIx === 0 ? quotes[quotes.length - 1].quote : quotes[this.quoteIx - 1].quote,
      quote1: quotes[this.quoteIx].quote,
      quote2: this.quoteIx === quotes.length - 1 ? quotes[0].quote : quotes[this.quoteIx + 1].quote
    };
  };

  CitatView.prototype._newQuote = function() {
    this._nextQuoteIx();
    this.render();
    return setTimeout(this._newQuote, 8000);
  };

  CitatView.prototype._nextQuoteIx = function() {
    var quotes;
    quotes = this.quotes.get('quotes');
    this.quoteIx++;
    if (this.quoteIx === quotes.length) {
      return this.quoteIx = 0;
    }
  };

  CitatView.prototype.getRenderData = function() {
    return this._getQuote();
  };


  /*//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
   */

  return CitatView;

})(View);
});

;require.register("views/ContactView", function(exports, require, module) {

/*
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var ContactModel, ContactView, View, template,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./supers/View');

ContactModel = require('../models/ContactModel');

template = require('./templates/ContactTemplate');

module.exports = ContactView = (function(_super) {
  __extends(ContactView, _super);

  function ContactView() {
    this.getRenderData = __bind(this.getRenderData, this);
    this.newData = __bind(this.newData, this);
    return ContactView.__super__.constructor.apply(this, arguments);
  }


  /*//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------
   */

  ContactView.prototype.id = 'contact-view';

  ContactView.prototype.template = template;


  /*//--------------------------------------
   	//+ INHERITED / OVERRIDES
   	//--------------------------------------
   */

  ContactView.prototype.initialize = function() {
    this.render = _.bind(this.render, this);
    this.model = new ContactModel();
    return this.model.on('change', this.newData);
  };

  ContactView.prototype.render = function() {
    this.$el.html(this.template(this.getRenderData()));
    return this;
  };

  ContactView.prototype.newData = function() {
    console.log('new Data');
    console.log(this.model);
    return this.render();
  };

  ContactView.prototype.getRenderData = function() {
    console.log('@model.toJSON()');
    console.log(this.model.toJSON());
    return this.model.toJSON();
  };


  /*//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
   */

  return ContactView;

})(View);
});

;require.register("views/EventsView", function(exports, require, module) {

/*
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var EventsModel, EventsView, View, template,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./supers/View');

EventsModel = require('../models/EventsModel');

template = require('./templates/ShowsTemplate');

module.exports = EventsView = (function(_super) {
  __extends(EventsView, _super);

  function EventsView() {
    return EventsView.__super__.constructor.apply(this, arguments);
  }


  /*//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------
   */

  EventsView.prototype.id = 'shows-view';

  EventsView.prototype.template = template;


  /*//--------------------------------------
   	//+ INHERITED / OVERRIDES
   	//--------------------------------------
   */

  EventsView.prototype.initialize = function() {
    this.render = _.bind(this.render, this);
    this.shows = new EventsModel();
    return this.shows.on('all', this.newData);
  };

  EventsView.prototype.render = function() {
    this.$el.html(this.template(this.getRenderData()));
    return this;
  };

  EventsView.prototype.newData = function(event) {
    console.log('Got event');
    return console.log(event);
  };

  EventsView.prototype.getRenderData = function() {
    console.log(this.shows.toJSON());
    return this.shows.toJSON();
  };


  /*//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
   */

  return EventsView;

})(View);
});

;require.register("views/HistoryView", function(exports, require, module) {

/*
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var HistoryModel, HistoryView, View, template,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./supers/View');

HistoryModel = require('../models/HistoryModel');

template = require('./templates/HistoryTemplate');

module.exports = HistoryView = (function(_super) {
  __extends(HistoryView, _super);

  function HistoryView() {
    this.getRenderData = __bind(this.getRenderData, this);
    this.newData = __bind(this.newData, this);
    return HistoryView.__super__.constructor.apply(this, arguments);
  }


  /*//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------
   */

  HistoryView.prototype.id = 'history-view';

  HistoryView.prototype.template = template;


  /*//--------------------------------------
   	//+ INHERITED / OVERRIDES
   	//--------------------------------------
   */

  HistoryView.prototype.initialize = function() {
    this.render = _.bind(this.render, this);
    this.model = new HistoryModel();
    return this.model.on('change', this.newData);
  };

  HistoryView.prototype.render = function() {
    this.$el.html(this.template(this.getRenderData()));
    return this;
  };

  HistoryView.prototype.newData = function() {
    console.log('new Data');
    console.log(this.model);
    return this.render();
  };

  HistoryView.prototype.getRenderData = function() {
    console.log('@model.toJSON()');
    console.log(this.model.toJSON());
    return this.model.toJSON();
  };


  /*//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
   */

  return HistoryView;

})(View);
});

;require.register("views/HomeView", function(exports, require, module) {

/*
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var CitatView, HomeView, View, template,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./supers/View');

CitatView = require('./CitatView');

template = require('./templates/HomeViewTemplate');

module.exports = HomeView = (function(_super) {
  __extends(HomeView, _super);

  function HomeView() {
    return HomeView.__super__.constructor.apply(this, arguments);
  }


  /*//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------
   */

  HomeView.prototype.id = 'home-view';

  HomeView.prototype.template = template;


  /*//--------------------------------------
   	//+ INHERITED / OVERRIDES
   	//--------------------------------------
   */

  HomeView.prototype.initialize = function() {
    return this.render = _.bind(this.render, this);
  };

  HomeView.prototype.render = function() {
    this.$el.html(this.template(this.getRenderData()));
    console.log(this.el);
    return this;
  };

  HomeView.prototype.getRenderData = function() {
    return {
      content: "Välkommen hem till..."
    };
  };


  /*//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
   */

  return HomeView;

})(View);
});

;require.register("views/MenuView", function(exports, require, module) {

/*
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var MenuView, View, template,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./supers/View');

template = require('./templates/Menu');

module.exports = MenuView = (function(_super) {
  __extends(MenuView, _super);

  function MenuView() {
    this.setSelectedItem = __bind(this.setSelectedItem, this);
    return MenuView.__super__.constructor.apply(this, arguments);
  }


  /*//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------
   */

  MenuView.prototype.id = 'menu-view';

  MenuView.prototype.template = template;


  /*//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------
   */

  MenuView.prototype.initialize = function() {
    return this.render = _.bind(this.render, this);
  };

  MenuView.prototype.render = function() {
    this.$el.html(this.template(this.getRenderData()));
    return this;
  };

  MenuView.prototype.menuItems = [
    {
      url: 'home',
      text: 'fria progg presenterar:',
      itemSelected: true
    }, {
      url: 'news',
      text: 'Nyheter'
    }, {
      url: 'shows',
      text: 'Spelningar'
    }, {
      url: 'history',
      text: 'Historia'
    }, {
      url: 'contact',
      text: 'Kontakt'
    }, {
      url: 'pictures',
      text: 'Bilder'
    }, {
      url: 'sound',
      text: 'Musik'
    }
  ];

  MenuView.prototype.getRenderData = function() {
    return {
      content: "Välkommen",
      selectedItem: this.selectedItem,
      MenuItem: this.menuItems
    };
  };


  /*//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
   */

  MenuView.prototype.selectedItem = 'Not set';

  MenuView.prototype.setSelectedItem = function(id) {
    var item, _i, _len, _ref, _results;
    _ref = this.menuItems;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      _results.push(item.itemSelected = item.url === id);
    }
    return _results;
  };


  /*//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
   */

  return MenuView;

})(View);
});

;require.register("views/NewsView", function(exports, require, module) {

/*
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var CitatView, ShowsView, View, template,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./supers/View');

template = require('./templates/NewsTemplate');

CitatView = require('./CitatView');

module.exports = ShowsView = (function(_super) {
  __extends(ShowsView, _super);

  function ShowsView() {
    return ShowsView.__super__.constructor.apply(this, arguments);
  }


  /*//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------
   */

  ShowsView.prototype.id = 'news-view';

  ShowsView.prototype.template = template;


  /*//--------------------------------------
   	//+ INHERITED / OVERRIDES
   	//--------------------------------------
   */

  ShowsView.prototype.initialize = function() {
    return this.render = _.bind(this.render, this);
  };

  ShowsView.prototype.render = function() {
    var citatView;
    this.$el.html(this.template(this.getRenderData()));
    citatView = new CitatView();
    this.$el.find("#news-container").append(citatView.el);
    return this;
  };

  ShowsView.prototype.getRenderData = function() {
    return {
      content: "Fria Progg meddelar...."
    };
  };


  /*//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
   */

  return ShowsView;

})(View);
});

;require.register("views/PicturesView", function(exports, require, module) {

/*
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var PicturesModel, PicturesView, View, template,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./supers/View');

PicturesModel = require('../models/PicturesModel');

template = require('./templates/PicturesTemplate');

module.exports = PicturesView = (function(_super) {
  __extends(PicturesView, _super);

  function PicturesView() {
    this.getRenderData = __bind(this.getRenderData, this);
    this.newData = __bind(this.newData, this);
    return PicturesView.__super__.constructor.apply(this, arguments);
  }


  /*//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------
   */

  PicturesView.prototype.id = 'pictures-view';

  PicturesView.prototype.template = template;


  /*//--------------------------------------
   	//+ INHERITED / OVERRIDES
   	//--------------------------------------
   */

  PicturesView.prototype.initialize = function() {
    this.render = _.bind(this.render, this);
    this.model = new PicturesModel();
    return this.model.on('change', this.newData);
  };

  PicturesView.prototype.render = function() {
    this.$el.html(this.template(this.getRenderData()));
    return this;
  };

  PicturesView.prototype.newData = function() {
    console.log('new Data');
    console.log(this.model);
    return this.render();
  };

  PicturesView.prototype.getRenderData = function() {
    console.log('@model.toJSON()');
    console.log(this.model.toJSON());
    return this.model.toJSON();
  };


  /*//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
   */

  return PicturesView;

})(View);
});

;require.register("views/ShowsView", function(exports, require, module) {

/*
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var ShowsModel, ShowsView, View, template,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./supers/View');

ShowsModel = require('../models/ShowsModel');

template = require('./templates/ShowsTemplate');

module.exports = ShowsView = (function(_super) {
  __extends(ShowsView, _super);

  function ShowsView() {
    this.getRenderData = __bind(this.getRenderData, this);
    this.newData = __bind(this.newData, this);
    this.initialize = __bind(this.initialize, this);
    return ShowsView.__super__.constructor.apply(this, arguments);
  }


  /*//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------
   */

  ShowsView.prototype.id = 'shows-view';

  ShowsView.prototype.template = template;


  /*//--------------------------------------
   	//+ INHERITED / OVERRIDES
   	//--------------------------------------
   */

  ShowsView.prototype.initialize = function() {
    this.render = _.bind(this.render, this);
    this.shows = new ShowsModel();
    return this.shows.on('change', this.newData);
  };

  ShowsView.prototype.render = function() {
    this.$el.html(this.template(this.getRenderData()));
    return this;
  };

  ShowsView.prototype.newData = function() {
    console.log('new Data');
    console.log(this.shows);
    return this.render();
  };

  ShowsView.prototype.getRenderData = function() {
    console.log('@shows.toJSON()');
    console.log(this.shows.toJSON());
    return this.shows.toJSON();
  };


  /*//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
   */

  return ShowsView;

})(View);
});

;require.register("views/SoundsView", function(exports, require, module) {

/*
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var SoundsModel, SoundsView, View, template,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./supers/View');

SoundsModel = require('../models/SoundsModel');

template = require('./templates/SoundsTemplate');

module.exports = SoundsView = (function(_super) {
  __extends(SoundsView, _super);

  function SoundsView() {
    this.getRenderData = __bind(this.getRenderData, this);
    this.newData = __bind(this.newData, this);
    return SoundsView.__super__.constructor.apply(this, arguments);
  }


  /*//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------
   */

  SoundsView.prototype.id = 'shows-view';

  SoundsView.prototype.template = template;


  /*//--------------------------------------
   	//+ INHERITED / OVERRIDES
   	//--------------------------------------
   */

  SoundsView.prototype.initialize = function() {
    this.render = _.bind(this.render, this);
    this.model = new SoundsModel();
    return this.model.on('change', this.newData);
  };

  SoundsView.prototype.render = function() {
    this.$el.html(this.template(this.getRenderData()));
    return this;
  };

  SoundsView.prototype.newData = function() {
    console.log('new Data');
    console.log(this.model);
    return this.render();
  };

  SoundsView.prototype.getRenderData = function() {
    console.log('@shows.toJSON()');
    console.log(this.model.toJSON());
    return this.model.toJSON();
  };


  /*//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
   */

  return SoundsView;

})(View);
});

;require.register("views/VideosView", function(exports, require, module) {

/*
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var ShowsView, View, template,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./supers/View');

template = require('./templates/ShowsTemplate');

module.exports = ShowsView = (function(_super) {
  __extends(ShowsView, _super);

  function ShowsView() {
    return ShowsView.__super__.constructor.apply(this, arguments);
  }


  /*//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------
   */

  ShowsView.prototype.id = 'shows-view';

  ShowsView.prototype.template = template;


  /*//--------------------------------------
   	//+ INHERITED / OVERRIDES
   	//--------------------------------------
   */

  ShowsView.prototype.initialize = function() {
    return this.render = _.bind(this.render, this);
  };

  ShowsView.prototype.render = function() {
    this.$el.html(this.template(this.getRenderData()));
    return this;
  };

  ShowsView.prototype.getRenderData = function() {
    return {
      content: "Video...."
    };
  };


  /*//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
   */

  return ShowsView;

})(View);
});

;require.register("views/supers/View", function(exports, require, module) {

/*
 * View Base Class
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var View,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

require('helpers/ViewHelper');

module.exports = View = (function(_super) {
  __extends(View, _super);

  function View() {
    return View.__super__.constructor.apply(this, arguments);
  }


  /*//--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------
   */

  View.prototype.template = function() {};

  View.prototype.getRenderData = function() {};


  /*//--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------
   */

  View.prototype.initialize = function() {
    return this.render = _.bind(this.render, this);
  };

  View.prototype.render = function() {
    this.$el.html(this.template(this.getRenderData()));
    this.afterRender();
    return this;
  };

  View.prototype.afterRender = function() {};


  /*//--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------
   */


  /*//--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------
   */


  /*//--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------
   */

  return View;

})(Backbone.View);
});

;
//# sourceMappingURL=app.js.map