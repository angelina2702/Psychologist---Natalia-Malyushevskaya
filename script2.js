// Совместимый JS (ES3/ES5, без ошибок)
var carousel = document.getElementById("carousel");
var slides = document.getElementsByClassName("slide");
var prevBtn = document.getElementById("prev");
var nextBtn = document.getElementById("next");
var dotsContainer = document.getElementById("dots");
var modal = document.getElementById("modal");
var modalImg = document.getElementById("modal-img");
var closeBtn = document.getElementById("close");

var totalSlides = slides.length;
var currentIndex = 0;

// Создание точек
var i;
for (i = 0; i < totalSlides; i++) {
	var dot = document.createElement("div");
	dot.className = "dot";
	if (i === 0) {
		dot.className = "dot active";
	}
	(function (index) {
		dot.onclick = function () {
			goToSlide(index);
		};
	})(i);
	dotsContainer.appendChild(dot);
}

// Перейти к слайду
function goToSlide(index) {
	currentIndex = index;
	carousel.style.transform = "translateX(" + -currentIndex * 106 + "%)";

	// Обновить точки
	var dots = document.getElementsByClassName("dot");
	for (var j = 0; j < dots.length; j++) {
		if (j === currentIndex) {
			dots[j].className = "dot active";
		} else {
			dots[j].className = "dot";
		}
	}
}

// Следующий
function nextSlide() {
	currentIndex = (currentIndex + 1) % totalSlides;
	goToSlide(currentIndex);
}

// Предыдущий
function prevSlide() {
	currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
	goToSlide(currentIndex);
}

// Привязка кнопок
if (prevBtn.attachEvent) {
	prevBtn.attachEvent("onclick", prevSlide);
} else {
	prevBtn.onclick = prevSlide;
}

if (nextBtn.attachEvent) {
	nextBtn.attachEvent("onclick", nextSlide);
} else {
	nextBtn.onclick = nextSlide;
}

// Автопрокрутка
setInterval(nextSlide, 6000);

// Открытие модалки при клике на изображение
function handleCarouselClick(e) {
	e = e || window.event;
	var target = e.target || e.srcElement;
	if (target.tagName === "IMG") {
		modalImg.src = target.src;
		modal.className = "modal open";
	}
}

if (carousel.attachEvent) {
	carousel.attachEvent("onclick", handleCarouselClick);
} else {
	carousel.onclick = handleCarouselClick;
}

// Закрытие модалки
function closeModal() {
	modal.className = "modal";
}

if (closeBtn.attachEvent) {
	closeBtn.attachEvent("onclick", closeModal);
} else {
	closeBtn.onclick = closeModal;
}

if (modal.attachEvent) {
	modal.attachEvent("onclick", function (e) {
		e = e || window.event;
		var target = e.target || e.srcElement;
		if (target === modal) closeModal();
	});
} else {
	modal.onclick = function (e) {
		if (e.target === modal) closeModal();
	};
}

// Клавиатура
function handleKeyDown(e) {
	e = e || window.event;
	var key = e.key || e.keyCode;

	var isOpen = modal.className.indexOf("open") !== -1;

	if (isOpen) {
		if (key === "Escape" || key === 27) {
			closeModal();
		}
	} else {
		if (key === "ArrowRight" || key === 39) {
			nextSlide();
		} else if (key === "ArrowLeft" || key === 37) {
			prevSlide();
		}
	}
}

if (document.attachEvent) {
	document.attachEvent("onkeydown", handleKeyDown);
} else {
	document.onkeydown = handleKeyDown;
}

const menuBtn = document.getElementById("img2");
const dropdown = document.getElementById("dropdownMenu");

menuBtn.addEventListener("click", function (event) {
	event.stopPropagation();
	dropdown.classList.toggle("open");
});

// Закрыть меню при клике вне его
document.addEventListener("click", function (event) {
	if (!dropdown.contains(event.target) && event.target !== menuBtn) {
		dropdown.classList.remove("open");
	}
});
