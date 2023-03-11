const ENDPOINT = "https://api.coinlore.net/api/tickers/";
const TOKENS = ["BTC", "ETH", "XRP", "LTC", "BCH"]
const coinContainer = document.querySelector(".coin-boxes");
const formChar = document.querySelector("#form-characters");
const formNumb = document.querySelector("#form-numbers");
const formLower = document.querySelector("#form-lowercase");
const formUpper = document.querySelector("#form-uppercase");
const formSpecial = document.querySelector("#form-special");
const formPasswordInput = document.querySelector("#password")
const formEmailInput = document.querySelector("#email")
const emailError = document.querySelector("#email-error")
const submitButton = document.querySelector("#submit-btn");
const succesBox = document.querySelector(".successful-box");
let isEmailValid = false;
let isPasswordValid = false;

fetch(ENDPOINT).then(
	(response) => response.json())
.then((responseData) => {
	const data = responseData.data
	const filteredData = data.filter(
		(coin, index) => {
			if (TOKENS.indexOf(coin.symbol) != -1) {
				return coin;
			}
		}
	)
	let coins = "";
	filteredData.forEach(coin => {
		coins += `<div class="coin-boxes__item">
		<div class="coin-boxes__item__up">
			<img src="img/${coin.symbol}_coin.png" alt="Coin Symbol" loading="lazy">
			<h3>${coin.symbol}</h3>
			<p>${coin.name}</p>
		</div>
		<div class="coin-boxes__item__down">
			<p>${coin.price_usd}$</p>
			<p class="percentage ${+coin.percent_change_24h >= 0 ? 'up' : 'down'}"><i class="fa ${+coin.percent_change_24h >= 0 ? 'fa-chevron-circle-up' : 'fa-chevron-circle-down'}" aria-hidden="true"></i> ${coin.percent_change_24h}$%</p>
		</div>
	</div>`
	});
	coinContainer.innerHTML = coins;
});


 // check length
 function checkChar(string) {
	return string.length >= 8 && string.length <= 15;
 }

 // check for at least one number
 function checkNum(string) {
	const numberRegex = /\d/;
	return numberRegex.test(string);
 }

 // check for at least one lowercase letter
 function checkLower(string) {
	const lowercaseRegex = /[a-z]/;
	return lowercaseRegex.test(string);
 }

 // check for at least one uppercase letter
 function checkUpper(string) {
	const uppercaseRegex = /[A-Z]/;
	return uppercaseRegex.test(string);
 }

 // check for at least one special character
 function checkSpecial(string) {
	const specialRegex = /[#\[\]\(\)\@$&*!\?|,.^\/\\\+\-_]/;
	return specialRegex.test(string);
 }

 function validateEmail(string) {
	const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	if (emailRegex.test(string)) {
		emailError.className = "main-form__item__validation invalid"
		isEmailValid = true;
	} else {
		emailError.className = "main-form__item__validation invalid active"	
		isEmailValid = false;
	}
	if (isEmailValid && isPasswordValid ) {
		submitButton.disabled = 0
	} else {
		submitButton.disabled = 1
	}
 }

 function validatePassword(string) {
	if (checkChar(string)) {
		formChar.className = "main-form__item__validation valid";
		isPasswordValid = true;
	} else {
		formChar.className = "main-form__item__validation invalid";
		isPasswordValid = false;
	}
	if (checkNum(string)) {
		formNumb.className = "main-form__item__validation valid";
		isPasswordValid = true;
	} else {
		formNumb.className = "main-form__item__validation invalid";
		isPasswordValid = false;
	}
	if (checkLower(string)) {
		formLower.className = "main-form__item__validation valid";
		isPasswordValid = true;
	} else {
		formLower.className = "main-form__item__validation invalid";
		isPasswordValid = false;
	}
	if (checkUpper(string)) {
		formUpper.className = "main-form__item__validation valid";
		isPasswordValid = true;
	} else {
		formUpper.className = "main-form__item__validation invalid";
		isPasswordValid = false;
	}
	if (checkSpecial(string)) {
		formSpecial.className = "main-form__item__validation valid";
		isPasswordValid = true;
	} else {
		formSpecial.className = "main-form__item__validation invalid";
		isPasswordValid = false;
	}
	if (isEmailValid && isPasswordValid ) {
		submitButton.disabled = 0
	} else {
		submitButton.disabled = 1
	}
 }

formEmailInput.addEventListener("keyup", (event) => {
	validateEmail(event.target.value);
})

formPasswordInput.addEventListener("keyup", (event) => {
	validatePassword(event.target.value);
 })


submitButton.addEventListener("click", () => {
	succesBox.classList.add("active")
	const user = {
		email: formEmailInput.value,
		password: formPasswordInput.value
	}
	
	  console.log(user)
})




mainSwiper = new Swiper('.event-swiper', {
	speed: 400,
	spaceBetween: 70,
	breakpoints: {
		120: {
		  slidesPerView: 2,
		  spaceBetween: 20
		},
		768: {
			slidesPerView: 5,
		}
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	}
});

