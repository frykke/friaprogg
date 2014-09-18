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
require.register("views/templates/ContactTemplate", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n		<div class='box one twelfth white'>\r\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.contact), {hash:{},inverse:self.program(7, program7, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	</div>    \r\n	";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n			<a class='noicon' href=\"";
  if (helper = helpers.contact) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.contact); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.image), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n			</a>\r\n		";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n				<img src=\"";
  if (helper = helpers.image) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.image); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"";
  if (helper = helpers.text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n			";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n				";
  if (helper = helpers.text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n			";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n			";
  if (helper = helpers.text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n		";
  return buffer;
  }

  buffer += "<div class='row'>\r\n		<div class='one whole box white'>\r\n			<div class='row'>\r\n		  		<div class=\"one tenth list-group-item active\">\r\n						<img src='/images/v-small.jpg' alt='v sign' />\r\n				</div>\r\n				<div class=\"nine tenth list-group-item active\">\r\n					<h4>";
  if (helper = helpers.content) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.content); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n				</div>\r\n			</div>\r\n			\r\n		</div>\r\n	</div>\r\n<div class='row' id='contact-list'>\r\n	<div class='one whole padded'>\r\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.contacts), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	</div>S\r\n</div>";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/HistoryTemplate", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n		";
  stack1 = (helper = helpers.compare || (depth0 && depth0.compare),options={hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.header), "==", "Medlemmar", options) : helperMissing.call(depth0, "compare", (depth0 && depth0.header), "==", "Medlemmar", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		";
  stack1 = (helper = helpers.compare || (depth0 && depth0.compare),options={hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.header), "!=", "Medlemmar", options) : helperMissing.call(depth0, "compare", (depth0 && depth0.header), "!=", "Medlemmar", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n			<div class='one half orange box'>\r\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.header), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				<div class='three sixth padded'>\r\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.subheader), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				<div class=\"list-group-item\">\r\n					";
  if (helper = helpers.text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				</div>\r\n				\r\n			</div>\r\n			</div>\r\n		";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n					<h3 class=\"black list-group-item-heading\">";
  if (helper = helpers.header) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.header); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n				";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n					<h4 class=\"black list-group-item-heading\">";
  if (helper = helpers.subheader) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.subheader); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n				";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n			<div class='one whole orange box'>\r\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.header), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.subheader), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				<div>\r\n					";
  if (helper = helpers.text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				</div>\r\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.image), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n			</div>\r\n		";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n					<h4 class=\"red list-group-item-heading\">";
  if (helper = helpers.subheader) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.subheader); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n				";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n					<img src=\"";
  if (helper = helpers.image) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.image); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n				";
  return buffer;
  }

  buffer += "<!--\r\n	Author: \r\n	Date: \r\n\r\n	Description: Template Description\r\n-->\r\n<div class='row'>\r\n	<div class='box orange' id=\"content\">\r\n	  <div id=\"name\">";
  if (helper = helpers.content) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.content); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n	</div>\r\n</div>\r\n<div class='row' id='history-list'>\r\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.histories), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>\r\n\r\n";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/HomeViewTemplate", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<!--\r\n	Author: \r\n	Date: \r\n\r\n	Description: Template Description\r\n-->\r\n\r\n<div class='container'>\r\n	<div class='row'>\r\n  		\r\n	</div>\r\n\r\n	<div class='row' id='home-view'>\r\n		\r\n	</div>\r\n	<div class='row'>\r\n  		<div class=\"one third\">\r\n			\r\n		</div>\r\n  		<div class=\"one third\">\r\n			\r\n			<img src='/images/dendarmusiken.png' alt='Den där musiken' />\r\n			<img src='/images/FriaLogo2-sm.png' alt='logo' />\r\n		</div>\r\n		\r\n	</div>\r\n\r\n</div>\r\n\r\n\r\n\r\n";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/Menu", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n        <li ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.itemSelected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><a class=\"noicon\" href=\"#";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></li>\r\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " class='selected-menu-item'";
  }

  buffer += "<div class='row'>\r\n<div class='one whole'>\r\n<nav role=\"navigation\" class=\"nav nocollapse black\">\r\n  <ul role=\"menubar\">\r\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.MenuItem), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n  </li>\r\n</ul>\r\n</nav>\r\n</div>\r\n</div>\r\n\r\n\r\n";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/NewsTemplate", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\r\n<!--\r\n	Author: \r\n	Date: \r\n\r\n	Description: Template Description\r\n-->\r\n\r\n<div class='row' id='news-container'>\r\n	<div class='one whole box white'>\r\n		<div class='row'>\r\n			<div class=\"nine tenth list-group-item active\">\r\n				<h4>";
  if (helper = helpers.content) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.content); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/PicturesTemplate", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n		<div class=\"one fourth three-up-small-tablet two-up-mobile padded align-center\">\r\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.image), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	    </div>\r\n	";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n			<img src=\"";
  if (helper = helpers.image) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.image); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"";
  if (helper = helpers.text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n		";
  return buffer;
  }

  buffer += "<!--\r\n	Author: \r\n	Date: \r\n\r\n	Description: Template Description\r\n-->\r\n<div class='row'>\r\n	<div class='box orange' id=\"content\">\r\n	  <div id=\"name\">";
  if (helper = helpers.content) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.content); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n	</div>\r\n</div>\r\n<div class='row' id='pictures-list'>\r\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.images), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/QuotesTemplate", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n<div class='box black one fourth fadeOutLeftBig animated'>\r\n";
  if (helper = helpers.quote0) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.quote0); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n</div>\r\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n<div class='box black one whole bounceInUp animated'>\r\n<h4 align='center' class='orange'>...";
  if (helper = helpers.quote1) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.quote1); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "...</h4>\r\n</div>\r\n";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n<div class='box one fourth fadeInRightBig animated'>\r\n";
  if (helper = helpers.quote2) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.quote2); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n</div>\r\n";
  return buffer;
  }

  buffer += "<div class='row'>\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.quote10), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.quote1), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.quote5), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/ShowsTemplate", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n		";
  stack1 = (helper = helpers.compare || (depth0 && depth0.compare),options={hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "==", "event", options) : helperMissing.call(depth0, "compare", (depth0 && depth0.type), "==", "event", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n			<div class='three sixth padded bounceInUp animated'>\r\n				<div class='orange box'>\r\n					<div class=\"list-group-item active\">\r\n						<h4 class=\"black list-group-item-heading\">";
  if (helper = helpers.performer) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.performer); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n					</div>\r\n					";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.event), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n					<div class=\"list-group-item\">\r\n						";
  if (helper = helpers.place) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.place); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n					</div>\r\n					<div class=\"list-group-item\">\r\n						";
  if (helper = helpers.time) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.time); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n					</div>\r\n				</div>\r\n			</div>\r\n		";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n					<div class=\"list-group-item\">\r\n						";
  if (helper = helpers.event) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.event); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n					</div>\r\n					";
  return buffer;
  }

  buffer += "<!--\r\n	Author: \r\n	Date: \r\n\r\n	Description: Template Description\r\n\r\n-->\r\n	<div class='row'>\r\n		<div class='one whole box white'>\r\n			<div class='row'>\r\n		  		<div class=\"one tenth list-group-item active\">\r\n						<img src='/images/v-small.jpg' alt='v sign' />\r\n				</div>\r\n				<div class=\"nine tenth list-group-item active\">\r\n					<h4>";
  if (helper = helpers.content) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.content); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n				</div>\r\n			</div>\r\n			\r\n		</div>\r\n	</div>\r\n  	<div class='row' id='shows-list'>\r\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.shows), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	</div>\r\n	<div class='row'>\r\n		<div class=\"one sixth three-up-small-tablet two-up-mobile padded \">\r\n			<div class='orange box rotateIn animated'>\r\n				<div class=\"block yellow\">\r\n					<img src='/images/affisch-sm-y.jpg' alt='Affisch'/>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	\r\n\r\n";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/SoundsTemplate", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n	  		<div class='one half padded animated bounceInLeft'>\r\n	  			";
  if (helper = helpers.iframe) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.iframe); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	  		</div>\r\n	  	";
  return buffer;
  }

  buffer += "<!--\r\n	Author: \r\n	Date: \r\n\r\n	Description: Template Description\r\n-->\r\n\r\n<div class='row' id=\"content\">\r\n	\r\n	<div class=\"panel panel-default\">\r\n	  <div class=\"box white\">\r\n	    <div class='row'>\r\n		  		<div class=\"one tenth list-group-item active\">\r\n						<img src='/images/v-small.jpg' alt='v sign' />\r\n				</div>\r\n				<div class=\"nine tenth list-group-item active\">\r\n					<h4>";
  if (helper = helpers.content) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.content); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n				</div>\r\n			</div>\r\n			\r\n	  </div>\r\n	  <div class=\"panel-body\">\r\n	  	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.sounds), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	  </div>\r\n	</div>\r\n\r\n  	\r\n</div>\r\n\r\n";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;
//# sourceMappingURL=templates.js.map