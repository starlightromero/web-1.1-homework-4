const items = document.querySelector('.items')
const cards = document.querySelectorAll('.card')
const sortBy = document.querySelector('select[name="sort"]')

const sortByName = () => {
  const plantArr = []

  for (const card of cards) {
    plantArr.push(card)
  }

  plantArr.sort((a, b) => {
    a = a.querySelector('.card-content').childNodes[1].innerHTML
    b = b.querySelector('.card-content').childNodes[1].innerHTML
    return a === b ? 0 : (a > b ? 1 : -1)
  })

  for (const plant of plantArr) {
    items.appendChild(plant)
  }
}

sortBy.addEventListener('change', () => {
  const index = sortBy.selectedIndex
  if (sortBy[index].value === 'by_name') {
    sortByName()
  }
})
