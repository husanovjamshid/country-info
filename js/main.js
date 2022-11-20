var elBody = document.querySelector('body');
var elModeBtn = document.querySelector('.dark-mode');


elModeBtn.addEventListener('click', function () {
	elBody.classList.toggle('dark');
	
});

