Model = require('./supers/Model')

module.exports = class ShowsModel extends Model

	defaults: 
		content: "Kommande spelningar....",
		shows: [{
			performer: "Fria Progg + Mats Drougge"
			event: "Club Probation"
			place: "Snövit, Ringvägen 147, 116 61 Stockholm, 08-640 54 44 "
			time: "19:e september kl 21:30"
		},
		{
			performer: "Fria Progg m fl"
			event: "Släcka Bränder"
			place: "Upstairs Bar by Clarion Hotel, Stockholm"
			time: "26:e september kl 21:00"
		}]
	