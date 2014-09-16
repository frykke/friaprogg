Model = require('./supers/Model')
module.exports = class DocModel extends Model

	docUrl: 'https://docs.google.com/spreadsheets/d/1ytHnb6c_QYz5Xb_EZDwRlw7JsxEa5e_nQllqz9HvBT8/pubhtml'

	success: (data, tabletop) =>
		console.log 'got it'
		console.log data
		@set({ "content": "Kommande spelningar....", "shows": data})
		
	initialize: =>
		Tabletop.init({key: @docUrl, callback: @success, simpleSheet: true})
	
	idAttribute: 'name'
	