###
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since  
 ###

View = require('./supers/View')
PicturesModel = require('../models/PicturesModel')
template = require('./templates/PicturesTemplate')

module.exports = class PicturesView extends View

	###//--------------------------------------
	//+ PUBLIC PROPERTIES / CONSTANTS
	//--------------------------------------###

  	#
   	# @private
	#
	id: 'pictures-view'
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
		@model = new PicturesModel()
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
