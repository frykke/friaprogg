###
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since  
###

View = require('./supers/View')
ShowsModel = require('../models/ShowsModel')
DocModel = require('../models/DocModel')
template = require('./templates/ShowsTemplate')

module.exports = class ShowsView extends View

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
	initialize: =>
		@render = _.bind( @render, @ )
		@shows = new ShowsModel()
		@shows.on('change', @newData);
	#
   	# @private
	#
	render: ->
		@$el.html( @template( @getRenderData() ) )
		return @

	newData: () =>
		console.log 'new Data'
		console.log @shows
		@render()
	#
   	# @private
	#
	getRenderData: =>
		console.log '@shows.toJSON()'
		console.log @shows.toJSON()
		return @shows.toJSON()

	###//--------------------------------------
	//+ PUBLIC METHODS / GETTERS / SETTERS
	//--------------------------------------###

	###//--------------------------------------
	//+ EVENT HANDLERS
	//--------------------------------------###

	###//--------------------------------------
	//+ PRIVATE AND PROTECTED METHODS
	//--------------------------------------###
