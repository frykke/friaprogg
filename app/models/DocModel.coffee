Model = require('./supers/Model')

module.exports = class ShowsModel extends Model

	docUrl: 'https://docs.google.com/spreadsheets/d/1ytHnb6c_QYz5Xb_EZDwRlw7JsxEa5e_nQllqz9HvBT8/edit?usp=sharing'
	
	initialize: =>
		@storage = Tabletop.init({ 
									key: @docUrl,
									wait: true 
						})
	idAttribute: 'name',
	tabletop: {
		  instance: storage,
		  sheet: 'Events'
		}

	sync: Backbone.tabletopSync
