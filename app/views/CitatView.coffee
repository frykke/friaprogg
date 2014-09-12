###
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since  
 ###

View = require('./supers/View')
Model = require('../models/CitatModel')
DocModel = require('../models/DocModel')
template = require('./templates/QuotesTemplate')

module.exports = class CitatView extends View

	###//--------------------------------------
	//+ PUBLIC PROPERTIES / CONSTANTS
	//--------------------------------------###

	#
	# @private
	#
	id: 'citat-view'
	class: 'row'
	#
	# @private
	#
	template: template

	###//--------------------------------------
	//+ INHERITED / OVERRIDES
	//--------------------------------------###

	quoteIx: 0
	
	#
	# @private
	#
	initialize: ->
		@model = new Model()
		@quotes = @model.get('quotes')
		console.log 'quotes'
		console.log @quotes
		setTimeout(@_newQuote, 5000)

	#
	# @private
	#
	render: =>
		@$el.html( @template( @getRenderData() ) )

		return @

	#
	# @private
	#
	_getQuote: =>
		return {
			quote0: if @quoteIx == 0 then @quotes[@quotes.length-1].quote else @quotes[@quoteIx-1].quote
			quote1: @quotes[@quoteIx].quote
			quote2: if (@quoteIx == @quotes.length-1) then @quotes[0].quote else @quotes[@quoteIx+1].quote
		}

	_newQuote: =>
		@_nextQuoteIx()
		@render()
		setTimeout(@_newQuote, 8000)

	_nextQuoteIx: =>
		@quoteIx++
		if @quoteIx == @quotes.length then @quoteIx = 0


	getRenderData: ->
		console.log @_getQuote()
		return @_getQuote()

	###//--------------------------------------
	//+ PUBLIC METHODS / GETTERS / SETTERS
	//--------------------------------------###
		
	###//--------------------------------------
	//+ EVENT HANDLERS
	//--------------------------------------###

	###//--------------------------------------
	//+ PRIVATE AND PROTECTED METHODS
	//--------------------------------------###

