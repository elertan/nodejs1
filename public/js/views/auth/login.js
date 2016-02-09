$(function () {
	var pendingLogin = false;

	var $loginForm = $('#loginForm');
	var $emailInput = $loginForm.find('input[type=text]');
	var $passwordInput = $loginForm.find('input[type=password]');

	$loginForm.submit(function () {

		if (pendingLogin) {
			return;
		}

		pendingLogin = true;

		socket.emit('login', {
			email: $emailInput.val(),
			password: $passwordInput.val()
		}, loginFormCallback);

	});

	function loginFormCallback(data) {
		// Delay each login attempt by 500ms
		setTimeout(function () {
			pendingLogin = false;
		}, 500);

		if (data.err) {
			swal(data.err, '', 'error');
			return;
		}

		currentUser = data.user;

		swal({
			title: 'Welcome, ' + currentUser.email,
			timer: 2000,
			type: 'success',
			showConfirmButton: false
		}, function () {

		});
	}
});

