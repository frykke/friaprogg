Model = require('./supers/Model')

module.exports = class HistoryModel extends Model
	docUrl: 'https://docs.google.com/spreadsheets/d/1ytHnb6c_QYz5Xb_EZDwRlw7JsxEa5e_nQllqz9HvBT8/pubhtml'
	success: (data, tabletop) =>
		console.log tabletop
		console.log data
		@set({ "content": "Om Fria Progg....", "histories": tabletop.sheets('history').elements})
	initialize: =>
		Tabletop.init({key: @docUrl, callback: @success, simpleSheet: false})