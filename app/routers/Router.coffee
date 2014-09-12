###
 * Backbone Primary Router
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since  
 ###

application = require( 'Application' )
ShowsView = require( '../views/ShowsView' )
ContactView = require( '../views/ContactView' )
PicturesView = require( '../views/PicturesView' )
VideosView = require( '../views/VideosView' )
NewsView = require( '../views/NewsView' )
SoundsView = require( '../views/SoundsView' )
CitatView = require( '../views/CitatView' )
HomeView = require( '../views/HomeView' )
module.exports = class Router extends Backbone.Router

	###//--------------------------------------
	//+ Routes
	//--------------------------------------###
	
	routes:
			'' : 'home'
			'home' : 'home'
			'history' : 'history'
			'shows' :'shows'
			'contact' :'contact'
			'pictures' :'pictures'
			'videos' :'videos'
			'news' :'news'
			'sound' :'sounds'
			'citat' :'citat'

		
	###//--------------------------------------
	//+ Route Handlers
	//--------------------------------------###

	home: ->
		application.menuView.setSelectedItem('')
		$( '#menu-container' ).html( application.menuView.render().el )
		$( '#main-container' ).html( (new HomeView()).render().el  )
		#$( '#main-container' ).append( (new CitatView()).render().el )
	history: ->
		application.menuView.setSelectedItem('history')
		$( '#menu-container' ).html( application.menuView.render().el )
		$( '#main-container' ).html( application.historyView.render().el )
	shows: ->
		application.menuView.setSelectedItem('shows')
		$( '#menu-container' ).html( application.menuView.render().el )
		$( '#main-container' ).html( (new ShowsView()).render().el )
	contact: ->
		application.menuView.setSelectedItem('contact')
		$( '#menu-container' ).html( application.menuView.render().el )
		$( '#main-container' ).html( (new ContactView()).render().el )
	pictures: ->
		application.menuView.setSelectedItem('pictures')
		$( '#menu-container' ).html( application.menuView.render().el )
		$( '#main-container' ).html( (new PicturesView()).render().el )
	videos: ->
		application.menuView.setSelectedItem('videos')
		$( '#menu-container' ).html( application.menuView.render().el )
		$( '#main-container' ).html( (new VideosView()).render().el )
	news: ->
		application.menuView.setSelectedItem('news')
		$( '#menu-container' ).html( application.menuView.render().el )
		$( '#main-container' ).html( (new NewsView()).render().el )
	sounds: ->
		application.menuView.setSelectedItem('sound')
		$( '#menu-container' ).html( application.menuView.render().el )
		$( '#main-container' ).html( (new SoundsView()).render().el )