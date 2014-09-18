###
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since  
 ###

View = require('./supers/View')
template = require('./templates/NewsTemplate')
CitatView = require('./CitatView')
module.exports = class ShowsView extends View

	###//--------------------------------------
	//+ PUBLIC PROPERTIES / CONSTANTS
	//--------------------------------------###

  	#
   	# @private
	#
	id: 'news-view'
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

	#
   	# @private
	#
	render: ->
		@$el.html( @template( @getRenderData() ) )
		citatView = new CitatView()
		@$el.find("#news-container").append(citatView.el)

		return @

	#
   	# @private
	#
	getRenderData: ->
		return {
			content: "Fria Progg meddelar...."
		}

	###//--------------------------------------
	//+ PUBLIC METHODS / GETTERS / SETTERS
	//--------------------------------------###

	###//--------------------------------------
	//+ EVENT HANDLERS
	//--------------------------------------###

	###//--------------------------------------
	//+ PRIVATE AND PROTECTED METHODS
	//--------------------------------------###
