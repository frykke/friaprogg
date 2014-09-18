Model = require('./supers/Model')

module.exports = class SoundsModel extends Model
	docUrl: 'https://docs.google.com/spreadsheets/d/1ytHnb6c_QYz5Xb_EZDwRlw7JsxEa5e_nQllqz9HvBT8/pubhtml'
	success: (data, tabletop) =>
		@set({ "content": "Lyssna på fria progg....", "sounds": tabletop.sheets('sounds').elements})
	initialize: =>
		Tabletop.init({key: @docUrl, callback: @success, simpleSheet: false})