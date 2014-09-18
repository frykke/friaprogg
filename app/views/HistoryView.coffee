###
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since  
 ###

View = require('./supers/View')
HistoryModel = require('../models/HistoryModel')
template = require('./templates/HistoryTemplate')

module.exports = class HistoryView extends View

	###//--------------------------------------
	//+ PUBLIC PROPERTIES / CONSTANTS
	//--------------------------------------###

  	#
   	# @private
	#
	id: 'history-view'
	#
   	# @private
	#
	template: template

	###//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------###

	#
   	# @private
	#
	initialize: ->
		@render = _.bind( @render, @ )
		@model = new HistoryModel()
		@model.on('change', @newData);
	#
   	# @private
	#
	render: ->
		@$el.html( @template( @getRenderData() ) )

		return @

	#
   	# @private
	#
	newData: () =>
		console.log 'new Data'
		console.log @model
		@render()
	#
   	# @private
	#
	getRenderData: =>
		console.log '@model.toJSON()'
		console.log @model.toJSON()
		return @model.toJSON()
	###//--------------------------------------
	//+ PUBLIC METHODS / GETTERS / SETTERS
	//--------------------------------------###

	###//--------------------------------------
	//+ EVENT HANDLERS
	//--------------------------------------###

	###//--------------------------------------
	//+ PRIVATE AND PROTECTED METHODS
	//--------------------------------------###
