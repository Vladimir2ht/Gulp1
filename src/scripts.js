
const body = document.querySelector("body");
const header = body.querySelector("header");
const big_popups = header.querySelectorAll(".big_popup");
let cities = [];
let select;

function Open_select(e, name) {
	big_popups.forEach(item => item.classList.add("hidden"));
	select = header.querySelector(`${name}`);
	select.classList.remove("hidden");
	
	if (name === '.sity_drop_window' && typeof cities[0] !== "string") {
		fetch("db/cities.json"//, {
	// 		method : "GET",
	// 		mode: 'no-cors',
	// 		headers: {"Access-Control-Allow-Origin": "C:/Users/Nadine/Desktop/TestLayoutJS/template/"}
	// }
	).then(res => res.json())
		.then(res => cities = res)
		.then(res => {
			Show_cities(res);
			select.querySelector(".ripple").classList.add("hidden");
		})
		.catch(err => console.error(err))};

	if (e) e.stopPropagation(); // Эта строчка нужна, убирать только с полной проверкой.
}

function Show_departments(departments) {
	departments.map(department => {
		li = document.createElement("li");
		li.innerHTML = `<div>${department[0]}</div><div class="type">${department[1]}</div>`;
		header.querySelector(".serch_drop_window ul").appendChild(li);
	})
}

function Show_cities(cities) {
	cities.map(city => {
		li = document.createElement("li");
		li.innerHTML = city;
		header.querySelector(".sity_drop_window ul").appendChild(li);
	})
}

const inputs = header.querySelectorAll("input");
const close_inputs_el = header.querySelectorAll("[src*=close]");

function Ready_reset(num) {
	if (inputs[num].value === "") {
		close_inputs_el[num].classList.add("hidden");
	} else {
		close_inputs_el[num].classList.remove("hidden");
	}
}

function Reset(num) {
	inputs[num].value = "";
	close_inputs_el[num].classList.add("hidden");
	if (num === 0) Select_City(null);
}

const cities_list = big_popups[0].querySelector("ul");

function Select_City(e) {
	Ready_reset(0);
	cities_list.innerHTML = "";
	let searched_cities = cities;
	if (e) {
		let searched_str = new RegExp(`${e.target.value}`);
		if (e.target.value) {
			searched_cities = cities.filter((city) => searched_str.test(city));
		};
	}
	Show_cities(searched_cities);
}

const big_nav_ul = header.querySelector(".big_nav > ul");
let last_li = big_nav_ul.querySelectorAll("li");
last_li = last_li[last_li.length - 1];
const arrows_conteiners = header.querySelectorAll(".big_nav > div");

header.querySelector("[src*=ArrowR]").classList.remove("hidden");

function Stop_scroll() {
	clearInterval(timer_id);
	if (+big_nav_ul.style.right.substring(0, big_nav_ul.style.right.length - 2) > 0) {
		arrows_conteiners[0].classList.add("active");
	} else {
		arrows_conteiners[0].classList.remove("active");
	}

	if (last_li.getBoundingClientRect().right <= arrows_conteiners[1].getBoundingClientRect().left) {
		arrows_conteiners[1].classList.remove("active");
	} else {
		arrows_conteiners[1].classList.add("active");
	}
}

let selected_cities = {};

function Unselect_city() {

}

// Наброска слушателей.

close_inputs_el.forEach((elem, ind) => {
	elem.addEventListener('click', () => Reset(ind));
});

const serch_variants = header.querySelector(".serch_drop_window ul");

inputs[0].addEventListener('input', (e) => Select_City(e));
inputs[1].addEventListener('input', () => {
	serch_variants.innerHTML = "";
	Ready_reset(1);
	Open_select("", ".serch_drop_window");
	fetch("db/departments.json").then(res => res.json())
		.then(res => Show_departments(res))
		.catch(err => console.error(err)); 
});

body.addEventListener('click', 
	(e) => (select && (!e.target.closest(".big_popup"))) ? select.classList.add("hidden") : null);
header.querySelector(".city_block")
	.addEventListener('click', (e) => Open_select(e, '.sity_drop_window'));

const arrows = header.querySelectorAll("[src*=Arrow]");
let timer_id;
let x = 0;

arrows.forEach((elem, ind) => {
	elem.addEventListener('mouseup', () => Stop_scroll());
	let to_right = Boolean(ind);
	elem.addEventListener('click', () => {
		if (to_right) {
			if (last_li.getBoundingClientRect().right - arrows_conteiners[1].getBoundingClientRect().left - 200 > 0) {
				x += 200;
			} else {
				x += last_li.getBoundingClientRect().right - arrows_conteiners[1].getBoundingClientRect().left;
			}
		} else {
			if (x - 200 > 0) {
				x -= 200;
			} else {
				x = 0;
			}
		}
		big_nav_ul.style.right = x + "px";
	});
	elem.addEventListener('mousedown', () => {
		timer_id = setInterval(() => {
			// Могу переписать как предыдущую.
			// Предохранитель, можно ещё перенести фцнкцию остановки на документ.
			if ( (last_li.getBoundingClientRect().right <= arrows_conteiners[1].getBoundingClientRect().left
					&& to_right)
				|| (x < 0 && !to_right)) {Stop_scroll(); return};
		big_nav_ul.style.right = to_right ? `${++x}px`: `${--x}px`;
		}, 8)
	});
});

const cities_tablo = big_popups[0].querySelector(".cities_tablo");
const save_city_b = big_popups[0].querySelector("a");

cities_list.addEventListener('click', (e) => {
	let sity = e.target.innerText;
	if (!selected_cities[sity]) {
		selected_cities[sity] = true;
		let city_el = document.createElement("div")
		city_el.innerHTML = `${sity}<img src="images/white_close.png" width="14px">`;
		cities_tablo.append(city_el);
	}
	cities_tablo.classList.remove("hidden");
	save_city_b.classList.add("active");
})

cities_tablo.addEventListener('click', (e) => {
	if (e.target.src) {
		let city = e.target.closest("div");
		delete selected_cities[city.innerText];
		setTimeout(() => city.remove(), 10);
		if (Object.keys(selected_cities).length === 0) {
			cities_tablo.classList.add("hidden");
			save_city_b.classList.remove("active");
		}
	}
})

const result_sity = header.querySelector(".city_block span");

save_city_b.addEventListener('click', () => {
	if (save_city_b.classList.contains("active")) {
		result_sity.innerText = Object.keys(selected_cities).join(', ');
		selected_cities = {};
		cities_tablo.classList.add("hidden");
		cities_tablo.innerHTML = "";
		select.classList.add("hidden");
	}
});

// Могу сделать всплытие хедера при скролле. Пока не сделано.

// window.addEventListener('scroll', () => {
	// console.log(document.documentElement.clientHeight);
// 	console.log(window.pageYOffset);
// 	if (window.pageYOffset > 140) {
// 		header.classList.add("scrolled");
// 	};
// });
