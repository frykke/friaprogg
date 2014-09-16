###//CoffeeScript///////////////////////////////////////////////////////////////////
// 
// Copyright 2012 
// 
/////////////////////////////////////////////////////////////////////////////////###

###
 * Application Bootstrapper
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since  
 ###

Application = 

    ###//--------------------------------------
    //+ PUBLIC PROPERTIES / CONSTANTS
    //--------------------------------------###
    docUrl: 'https://docs.google.com/spreadsheets/d/1ytHnb6c_QYz5Xb_EZDwRlw7JsxEa5e_nQllqz9HvBT8/pubhtml'

    ###//--------------------------------------
    //+ INHERITED / OVERRIDES
    //--------------------------------------###

    initialize: ->

        # Import views
        HomeView = require('views/HomeView')
        MenuView = require('views/MenuView')
        HistoryView = require('views/HistoryView')
        Router = require('routers/Router')

        # Initialize views
        @homeView = new HomeView()
        @menuView = new MenuView()
        @historyView = new HistoryView()
        @router = new Router()

        Object.freeze? this

module.exports = Application
