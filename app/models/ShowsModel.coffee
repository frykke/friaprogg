Model = require('./supers/Model')

module.exports = class ShowsModel extends Model
	docUrl: 'https://docs.google.com/spreadsheets/d/1ytHnb6c_QYz5Xb_EZDwRlw7JsxEa5e_nQllqz9HvBT8/pubhtml'
	success: (data, tabletop) =>
		@set({ "content": "Kommande spelningar....", "shows": tabletop.sheets('Events').elements})
	initialize: =>
		Tabletop.init({key: @docUrl, callback: @success, simpleSheet: false})
	