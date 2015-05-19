
$(document).ready(function(){

	var timeZoneList = function(){
		var oThis = this;
		this.hc = new HomeController();
		this.init();
		$('#timezoneCreate').on("click", function(){
			$(".modal-create").modal("show");
		})
		$('#timeZone-form').ajaxForm({
			url : "/timezone/create",
			success	: function(responseText, status, xhr, $form){
				if (status == 'success') $('.modal-create').modal('hide');
				oThis.init();
			},
			error : function(e){
			}
		});

	};

	timeZoneList.prototype = {
		init: function(){
			this.hc.listimeZone(this.populateList, this);
		},
		populateList: function(data){
			var i, tbody = $("#timezoneListContainer table tbody"), bodyDF = document.createDocumentFragment();
			for(i=0;i<data.length;i++){
				var tr = $("<tr></tr>"),
					tzOption = $("#timeZone-tz option[value='"+data[i].timeZone+"']");

				tr.append($("<td></td>").text(data[i].name));
				tr.append($("<td></td>").text(data[i].city));
				tr.append($("<td colspan='4'></td>").text(tzOption.text()));
				tr.append($("<td></td>").text(this.getCurrentDateTime(tzOption)));
				tr.append($("<td></td>").text(this.getDeltaGMT(tzOption)));

				bodyDF.appendChild(tr[0]);
			}
			tbody.html("");
			tbody[0].appendChild(bodyDF);
		},
		getDeltaGMT: function(option){
			return option.attr("gmtAdjustment");
		},
		getCurrentDateTime: function(option){
			var offset = option.attr("offset");
			var date = new Date(new Date().getTime() + offset*3600*1000);

			return  date.getDate() + "/"
					+(date.getMonth()+1) + "/"
					+date.getFullYear() + "@"
					+date.getHours() + ":"
					+date.getMinutes();
		}

	}

	newTimeZone = new timeZoneList();
})