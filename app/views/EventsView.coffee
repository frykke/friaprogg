###
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since  
###

View = require('./supers/View')
EventsModel = require('../models/EventsModel')
template = require('./templates/ShowsTemplate')

module.exports = class EventsView extends View

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
		@shows = new EventsModel()
		@shows.on('all', @newData);

	#
   	# @private
	#
	render: ->
		@$el.html( @template( @getRenderData() ) )

		return @

	newData: (event) ->
		#console.log 'new Data'
		#console.log @shows
		#@render
		console.log 'Got event'
		console.log event
	#
   	# @private
	#
	getRenderData: ->
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
