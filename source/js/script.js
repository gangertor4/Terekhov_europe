const placesBtn = document.querySelectorAll('.places__button');
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
