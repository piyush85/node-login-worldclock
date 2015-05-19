
function HomeController()
{
	var that = this;
	$('#btn-logout').click(function(){ that.attemptLogout(); });

// handle account deletion //
	$('.modal-confirm .submit').click(function(){ that.deleteAccount(); });

	this.listimeZone = function(callback, scope)
	{
		var that = this;
		$.ajax({
			url: '/timeZone',
			type: 'GET',
			data: { user: $('#userId').val()},
			success: function(data){
				callback.call(scope, data);
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}
	this.createtimeZone = function()
	{
		var that = this;
		$.ajax({
			url: '/timeZone/create',
			type: 'PUT',
			data: { 
					name: 'India',
					city: 'Pune',
					timeZone: 'IST'},
			success: function(data){
				that.onUpdateSuccess('timeZone created');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' : '+jqXHR.statusText);
			}
		});
	}
	this.attemptLogout = function()
	{
		var that = this;
		$.ajax({
			url: "/home",
			type: "POST",
			data: {logout : true},
			success: function(){
				window.location.href = '/';
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}


}

HomeController.prototype.onUpdateSuccess = function()
{
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-alert .modal-header h3').text('Success!');
	$('.modal-alert .modal-body p').html('Your account has been updated.');
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
}
