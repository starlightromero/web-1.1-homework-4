const items = document.querySelector('.items')
const cards = document.querySelectorAll('.card')
const sortBy = document.querySelector('select[name="sort"]')

const plantArr = []

for (const card of cards) {
  plantArr.push(card)
}

const sort = sortFunc => {
  sortFunc()

  for (const plant of plantArr) {
    items.appendChild(plant)
  }
}

const sortByName = () => {
  plantArr.sort((a, b) => {
    a = a.querySelector('.card-content').childNodes[1].innerHTML
    b = b.querySelector('.card-content').childNodes[1].innerHTML
    return a === b ? 0 : (a > b ? 1 : -1)
  })
}

const sortByDatePlanted = () => {
  plantArr.sort((a, b) => {
    a = a.querySelector('.card-content').childNodes[1].dataset.date
    b = b.querySelector('.card-content').childNodes[1].dataset.date
    return new Date(a) - new Date(b)
  })
}

const sortByHarvestAmount = () => {
  plantArr.sort((a, b) => {
    a = a.querySelector('.card-content').childNodes[1].dataset.harvests
    b = b.querySelector('.card-content').childNodes[1].dataset.harvests
    return a === b ? 0 : (a > b ? 1 : -1)
  })
}

sortBy.addEventListener('change', () => {
  const index = sortBy.selectedIndex
  if (sortBy[index].value === 'by_name') {
    sort(sortByName)
  } else if (sortBy[index].value === 'by_date_planted') {
    sort(sortByDatePlanted)
  } else if (sortBy[index].value === 'by_harvest_amount') {
    sort(sortByHarvestAmount)
  }
})
