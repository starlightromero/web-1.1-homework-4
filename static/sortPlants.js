const items = document.querySelector('.items')
const cards = document.querySelectorAll('.card')
const sortBy = document.querySelector('select[name="sort"]')
const sortDirection = document.querySelector('.sort-direction')
const sortAction = document.querySelector('.sort-action')

const plantArr = []

for (const card of cards) {
  plantArr.push(card)
}

const sort = sortFunc => {
  sortFunc()
  for (const plant of plantArr) {
    items.appendChild(plant)
  }
  sortDirection.innerHTML = '↓'
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
    a = parseInt(a.querySelector('.card-content').childNodes[1].dataset.harvest)
    b = parseInt(b.querySelector('.card-content').childNodes[1].dataset.harvest)
    return a === b ? 0 : (a > b ? 1 : -1)
  })
}

sortBy.addEventListener('change', () => {
  if (sortAction.style.display === 'block') {
    sortAction.style.display = 'none'
  }
  const index = sortBy.selectedIndex
  if (sortBy[index].value === 'by_name') {
    sort(sortByName)
  } else if (sortBy[index].value === 'by_date_planted') {
    sort(sortByDatePlanted)
  } else if (sortBy[index].value === 'by_harvest_amount') {
    sort(sortByHarvestAmount)
  }
})

sortDirection.addEventListener('click', () => {
  if (sortDirection.innerHTML === '-') {
    sortAction.style.display = 'block'
  } else {
    if (sortDirection.innerHTML === '↑') {
      sortDirection.innerHTML = '↓'
    } else if (sortDirection.innerHTML === '↓') {
      sortDirection.innerHTML = '↑'
    }
    plantArr.reverse()
    for (const plant of plantArr) {
      items.appendChild(plant)
    }
  }
})
