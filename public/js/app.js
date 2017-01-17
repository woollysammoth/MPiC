$(document).ready(function(){

	var App = function(){

	};

	App.prototype = $.extend({}, App.prototype, {
		init: function(){
			this.bindEvents();
			this.getSets();
		},
		bindEvents: function(){
			this.decreaseBtn = $("[data-id='decrease']");
			this.increaseBtn = $("[data-id='increase']");

			this.decreaseBtn.on("click", this.sendDecreasePreset);
			this.increaseBtn.on("click", this.sendIncreasePreset);
		},
		getSets: function(){
			var self = this;

			$.ajax({
				url: "/sets",
				success: function(res){
					self.renderSampleSetList(res.data);
				}
			});
		},
		renderSampleSetList: function(data){
			var $setList = $("[data-id='sets']"), html = "";
			$.each(data, function(i, val) {
				html += ['<option>', val, '</option>'].join("");
			});

			$setList.html(html);
		},
		sendIncreasePreset: function(){
			$.ajax({
				url: "/preset/increase"
			});
		},
		sendDecreasePreset: function(){
			$.ajax({
				url: "/preset/decrease"
			});
		}
	});

	window.MPiC = new App();

	MPiC.init();
});