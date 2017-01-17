$(document).ready(function(){

	window.MPiC = function(){

	};

	MPiC.prototype = $.extend({}, MPiC.prototype, {
		init: function(){
			this.getSets();
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
		}
	});


	MPiC.init();
});