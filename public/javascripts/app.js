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
var application;

application = require('Application');

$(function() {
  application.initialize();
  return Backbone.history.start();
});
});

;require.register("models/CitatModel", function(exports, require, module) {
var CitatModel, Model,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./supers/Model');

module.exports = CitatModel = (function(_super) {
  __extends(CitatModel, _super);

  function CitatModel() {
    return CitatModel.__super__.constructor.apply(this, arguments);
  }

  CitatModel.prototype.defaults = {
    quotes: [
      {
        quote: 'friska typer i övre medelåldern'
      }, {
        quote: 'vår andra pubertet'
      }, {
        quote: 'alla vill va helvilda litegrann'
      }, {
        quote: 'borde vi klä oss i läder'
      }, {
        quote: 'då vet ni hur brudarna e mot oss'
      }, {
        quote: 'poet, kock, flyttkarl, Mohammat Kadaffi'
      }, {
        quote: 'stanna här, var alltid som du är'
      }, {
        quote: 'vackra tjejer rika killar'
      }, {
        quote: 'jag önska jag kom hem, alla mådde bra'
      }, {
        quote: 'man är fem mil utanför'
      }, {
        quote: 'ingen stämsång, inget perverterat samförstånd'
      }
    ]
  };

  return CitatModel;

})(Model);
});

;require.register("models/DocModel", function(exports, require, module) {
var Model, ShowsModel,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./supers/Model');

module.exports = ShowsModel = (function(_super) {
  __extends(ShowsModel, _super);

  function ShowsModel() {
    this.initialize = __bind(this.initialize, this);
    return ShowsModel.__super__.constructor.apply(this, arguments);
  }

  ShowsModel.prototype.docUrl = 'https://docs.google.com/spreadsheets/d/1ytHnb6c_QYz5Xb_EZDwRlw7JsxEa5e_nQllqz9HvBT8/edit?usp=sharing';

  ShowsModel.prototype.initialize = function() {
    return this.storage = Tabletop.init({
      key: this.docUrl,
      wait: true
    });
  };

  ShowsModel.prototype.idAttribute = 'name';

  ShowsModel.prototype.tabletop = {
    instance: storage,
    sheet: 'Events'
  };

  ShowsModel.prototype.sync = Backbone.tabletopSync;

  return ShowsModel;

})(Model);
});

;require.register("models/ShowsModel", function(exports, require, module) {
var Model, ShowsModel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./supers/Model');

module.exports = ShowsModel = (function(_super) {
  __extends(ShowsModel, _super);

  function ShowsModel() {
    return ShowsModel.__super__.constructor.apply(this, arguments);
  }

  ShowsModel.prototype.defaults = {
    content: "Kommande spelningar....",
    shows: [
      {
        performer: "Fria Progg + Mats Drougge",
        event: "Club Probation",
        place: "Snövit, Ringvägen 147, 116 61 Stockholm, 08-640 54 44 ",
        time: "19:e september kl 21:30"
      }, {
        performer: "Fria Progg m fl",
        event: "Släcka Bränder",
        place: "Upstairs Bar by Clarion Hotel, Stockholm",
        time: "26:e september kl 21:00"
      }
    ]
  };

  return ShowsModel;

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
    'citat': 'citat'
  };


  /*//--------------------------------------
  	//+ Route Handlers
  	//--------------------------------------
   */

  Router.prototype.home = function() {
    application.menuView.setSelectedItem('');
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
    return $('#main-container').html((new ShowsView()).render().el);
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
var CitatView, DocModel, Model, View, template,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./supers/View');

Model = require('../models/CitatModel');

DocModel = require('../models/DocModel');

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
    this.model = new Model();
    this.quotes = this.model.get('quotes');
    console.log('quotes');
    console.log(this.quotes);
    return setTimeout(this._newQuote, 5000);
  };

  CitatView.prototype.render = function() {
    this.$el.html(this.template(this.getRenderData()));
    return this;
  };

  CitatView.prototype._getQuote = function() {
    return {
      quote0: this.quoteIx === 0 ? this.quotes[this.quotes.length - 1].quote : this.quotes[this.quoteIx - 1].quote,
      quote1: this.quotes[this.quoteIx].quote,
      quote2: this.quoteIx === this.quotes.length - 1 ? this.quotes[0].quote : this.quotes[this.quoteIx + 1].quote
    };
  };

  CitatView.prototype._newQuote = function() {
    this._nextQuoteIx();
    this.render();
    return setTimeout(this._newQuote, 8000);
  };

  CitatView.prototype._nextQuoteIx = function() {
    this.quoteIx++;
    if (this.quoteIx === this.quotes.length) {
      return this.quoteIx = 0;
    }
  };

  CitatView.prototype.getRenderData = function() {
    console.log(this._getQuote());
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
      content: "Kontakt...."
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

;require.register("views/HistoryView", function(exports, require, module) {

/*
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var HistoryView, View, template,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./supers/View');

template = require('./templates/HistoryTemplate');

module.exports = HistoryView = (function(_super) {
  __extends(HistoryView, _super);

  function HistoryView() {
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
    return this.render = _.bind(this.render, this);
  };

  HistoryView.prototype.render = function() {
    this.$el.html(this.template(this.getRenderData()));
    return this;
  };

  HistoryView.prototype.getRenderData = function() {
    return {
      content: "Fria progg kommer från...."
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
    this.$el.append((new CitatView()).render().el);
    return this;
  };

  HomeView.prototype.getRenderData = function() {
    return {
      content: "Välkommen hem till fria progg"
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
      url: 'videos',
      text: 'Video'
    }, {
      url: 'sound',
      text: 'Ljud'
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

template = require('./templates/ShowsTemplate');

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
    this.$el.append((new CitatView()).render().el);
    return this;
  };

  ShowsView.prototype.getRenderData = function() {
    return {
      content: "Nyheter...."
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
      content: "Foto...."
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
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./supers/View');

ShowsModel = require('../models/ShowsModel');

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
    this.render = _.bind(this.render, this);
    return this.shows = new ShowsModel();
  };

  ShowsView.prototype.render = function() {
    this.$el.html(this.template(this.getRenderData()));
    return this;
  };

  ShowsView.prototype.getRenderData = function() {
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
var ShowsView, View, template,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./supers/View');

template = require('./templates/SoundsTemplate');

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
      content: "Musik musik...."
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