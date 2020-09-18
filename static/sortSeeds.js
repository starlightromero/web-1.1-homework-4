const items = document.querySelector('.items')
const cards = document.querySelectorAll('.card')
const sortBy = document.querySelector('select[name="sort"]')
const sortDirection = document.querySelector('.sort-direction')

const seedArr = []

for (const card of cards) {
  seedArr.push(card)
}

const sort = sortFunc => {
  sortFunc()
  for (const seed of seedArr) {
    items.appendChild(seed)
  }
  sortDirection.innerHTML = '↓'
}

const sortByName = () => {
  seedArr.sort((a, b) => {
    a = a.querySelector('.card-content').childNodes[1].innerHTML
    b = b.querySelector('.card-content').childNodes[1].innerHTML
    return a === b ? 0 : (a > b ? 1 : -1)
  })
}

const sortByDateAquired = () => {
  seedArr.sort((a, b) => {
    a = a.querySelector('.card-content').childNodes[1].dataset.date
    b = b.querySelector('.card-content').childNodes[1].dataset.date
    return new Date(a) - new Date(b)
  })
}

sortBy.addEventListener('change', () => {
  const index = sortBy.selectedIndex
  if (sortBy[index].value === 'by_name') {
    sort(sortByName)
  } else if (sortBy[index].value === 'by_date_aquired') {
    sort(sortByDateAquired)
  }
})

sortDirection.addEventListener('click', () => {
  if (sortDirection.innerHTML !== '-') {
    if (sortDirection.innerHTML === '↑') {
      sortDirection.innerHTML = '↓'
    } else if (sortDirection.innerHTML === '↓') {
      sortDirection.innerHTML = '↑'
    }
    seedArr.reverse()
    for (const seed of seedArr) {
      items.appendChild(seed)
    }
  }
})
