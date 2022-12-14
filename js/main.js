let elBody = document.querySelector("body");
let elModeBtn = document.querySelector(".dark-mode");
let elSelect = document.querySelector(".js-select");
let elInput = document.querySelector(".js-input");
let elForm = document.querySelector(".js-form");
let elSpinner = document.querySelector(".spinner");

elModeBtn.addEventListener("click", function () {
  elBody.classList.toggle("dark");
});

// FETCH API
let elTemplate = document.querySelector(".js-template").content;
let elList = document.querySelector(".js-list");

function fetchRender(array, node) {
  elSpinner.innerHTML = "";
  elList.innerHTML = " ";
  array.forEach((item) => {
    let newTemplate = elTemplate.cloneNode(true);
    newTemplate.querySelector(".country-img").src = item.flags.svg;
    newTemplate.querySelector(".card-title").textContent = item.name.common;
    newTemplate.querySelector(
      ".population"
    ).innerHTML = `<strong>Population: </strong>  ${item.population}`;
    newTemplate.querySelector(
      ".region"
    ).innerHTML = `<strong>Region: </strong>  ${item.region}`;
    newTemplate.querySelector(
      ".capital"
    ).innerHTML = `<strong>Capital: </strong>  ${item.capital}`;
    node.appendChild(newTemplate);
  });
}

function selectFunc(array, node) {
  elSpinner.innerHTML = "";
  array.forEach((item) => {
    newSet.add(item.region);
  });

  newSet.forEach((item) => {
    let newOption = document.createElement("option");
    newOption.setAttribute("value", `${item}`);
    newOption.textContent = item;
    node.appendChild(newOption);
  });
}

function selectResult(array, node) {
  elSpinner.innerHTML = "";
  elSelect.addEventListener("change", async (evt) => {
    let responseReg = await fetch(
      `https://restcountries.com/v3.1/region/${elSelect.value}`
    );
    let dataReg = await responseReg.json();

    array.forEach((item) => {
      if (elSelect.value != "all") {
        if (item.region.includes(elSelect.value)) {
          fetchRender(dataReg, node);
        }
      } else if (elSelect.value == "all") {
        fetchRender(data, node);
      }
    });
  });
}

function inputFunc(array, node) {
  elSpinner.innerHTML = "";
  elForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    let inputResponse = await fetch(
      `https://restcountries.com/v3.1/name/${elInput.value.trim()}`
    );
    let inputReg = await inputResponse.json();

    array.forEach((item) => {
      if (
        item.name.common.toLowerCase().includes(elInput.value.trim().toLowerCase())
      ) {
        fetchRender(inputReg, node);
      } 
    });
  });
}

let newSet = new Set();

let fetchFunc = async () => {
  let response = await fetch("https://restcountries.com/v3.1/all");
  let data = await response.json();

  fetchRender(data, elList);
  selectFunc(data, elSelect);
  selectResult(data, elList);
  inputFunc(data, elList);
};

fetchFunc();
