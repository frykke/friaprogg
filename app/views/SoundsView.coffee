###
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since  
 ###

View = require('./supers/View')
SoundsModel = require('../models/SoundsModel')
template = require('./templates/SoundsTemplate')

module.exports = class SoundsView extends View

	###//--------------------------------------
	//+ PUBLIC PROPERTIES / CONSTANTS
	//--------------------------------------###

  	#
   	# @private
	#
	id: 'shows-view'
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
		@model = new SoundsModel()
		@model.on('change', @newData);

	#
   	# @private
	#
	render: ->
		@$el.html( @template( @getRenderData() ) )
		return @

	newData: () =>
		console.log 'new Data'
		console.log @model
		@render()
	#
   	# @private
	#
	getRenderData: =>
		console.log '@shows.toJSON()'
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
