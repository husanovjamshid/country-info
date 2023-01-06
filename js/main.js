let elBody = document.querySelector('body');
let elModeBtn = document.querySelector('.dark-mode');


elModeBtn.addEventListener('click', function () {
	elBody.classList.toggle('dark');
	
});

// FETCH API
let elTemplate = document.querySelector('.js-template').content;
let elList = document.querySelector('.js-list')


let fetchFunc = async () => {
	let response = await fetch('https://restcountries.com/v3.1/all')
	let data = await response.json()

	
	data.forEach(item => {
		let newTemplate = elTemplate.cloneNode(true)
		newTemplate.querySelector('.country-img').src = item.flags.svg
		newTemplate.querySelector('.card-title').textContent = item.name.common
		newTemplate.querySelector('.population').innerHTML = `<strong>Population: </strong>  ${item.population}`
		newTemplate.querySelector('.region').innerHTML =`<strong>Region: </strong>  ${item.region}`
		newTemplate.querySelector('.capital').innerHTML =`<strong>Capital: </strong>  ${item.capital}`
		elList.appendChild(newTemplate)
	});
}

fetchFunc()