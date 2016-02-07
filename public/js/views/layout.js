$(function () {
	// Handle nav item highlighting
	$('.nav-item').click(function () {
		$('.nav-item').removeClass('active');
		$(this).addClass('active');
	});
});