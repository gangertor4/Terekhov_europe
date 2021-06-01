
const placesBtn = document.querySelectorAll('.places__item');
const guide = document.querySelector('.guide');
const guideItems = guide.querySelectorAll('.guide__list-item');
const guideCards = guide.querySelectorAll('.country-card');

for (let i = 0; i < guideItems.length; i++) {
  guideItems[i].addEventListener('click', function(evt) {
    evt.preventDefault();
    guideItems.forEach(item => {
      item.classList.remove('guide__list-item--current')
    })
    guideCards.forEach(card => {
      card.classList.add('visually-hidden')
    })
    guideItems[i].classList.add('guide__list-item--current');
    guideCards[i].classList.remove('visually-hidden')
  })

  placesBtn[i].addEventListener('click', function() {
    guideItems.forEach(item => {
      item.classList.remove('guide__list-item--current')
    })
    guideCards.forEach(card => {
      card.classList.add('visually-hidden')
    })
    guideItems[i].classList.add('guide__list-item--current');
    guideCards[i].classList.remove('visually-hidden')
  })
}

const btnToggle = document.querySelector('.header__toggle');
const navMenu = document.querySelector('.header__nav-list');
const logo = document.querySelector('.header__logo')

btnToggle.addEventListener('click', function () {
  console.log("SHIT")
  if (btnToggle.classList.contains('header__toggle--burger')) {
    btnToggle.classList.remove('header__toggle--burger');
    btnToggle.classList.add('header__toggle--cross');
    navMenu.classList.remove('header__nav-list--closed');
    navMenu.classList.add('header__nav-list--opened');
    logo.classList.add('visually-hidden');
  } else {
    btnToggle.classList.remove('header__toggle--cross');
    btnToggle.classList.add('header__toggle--burger');
    navMenu.classList.remove('header__nav-list--opened');
    navMenu.classList.add('header__nav-list--closed');
    logo.classList.remove('visually-hidden');
}
})

const pricesBtn = document.querySelectorAll('.prices__tariff-button');
const cardBtn = document.querySelectorAll('.country-card__button');
const buyModal = document.querySelector('.buy-modal');
const closeModalBtn = buyModal.querySelector('.buy-modal__button');
const disabler = document.querySelector('.disabler');
const phoneInput = buyModal.querySelector('.buy-modal__input--phone');

const isEscEvent = function (evt) {
  return evt.key === ('Escape' || 'Esc');
};

const closePopUp = function() {
  buyModal.classList.add('visually-hidden');
  disabler.classList.add('visually-hidden');
}

const onPopUpEscKeydown = function (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopUp();
  }
};

const popUpAction = function (evt) {
  evt.preventDefault();
    buyModal.classList.remove('visually-hidden');
    disabler.classList.remove('visually-hidden');
    phoneInput.focus();
    document.addEventListener('keydown', onPopUpEscKeydown);
    closeModalBtn.addEventListener('click', function () {
      closePopUp();
    });
    
    disabler.addEventListener('click', function () {
      closePopUp();
    });
}

pricesBtn.forEach(btn => {
  btn.addEventListener('click', (evt) => {
    popUpAction(evt);
  })
})

cardBtn.forEach(btn => {
  btn.addEventListener('click', (evt) => {
    popUpAction(evt);
  })
})

const questPhoneInput = document.querySelector('.questions__phone');
const questEmailInput = document.querySelector('.questions__email');
const questBtnSubmit = document.querySelector('.questions__button');
const modalPhoneInput = document.querySelector('.buy-modal__input--phone');
const modalEmailInput = document.querySelector('.buy-modal__input--email');
const modalBtnSubmit = document.querySelector('.buy-modal__submit');

questBtnSubmit.addEventListener('click', function (evt) {
  evt.preventDefault();
  localStorage.setItem('q-phone', questPhoneInput.value);
  localStorage.setItem('q-email', questEmailInput.value);
})

modalBtnSubmit.addEventListener('click', function (evt) {
  evt.preventDefault();
  localStorage.setItem('m-phone', modalPhoneInput.value);
  localStorage.setItem('m-email', modalEmailInput.value);
})



