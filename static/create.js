const seed = document.querySelector('select[name="seed"]')
const plantName = document.querySelector('input[name="plant_name"]')
const variety = document.querySelector('input[name="variety"]')
const seedLabel = document.querySelector('.validate')
const submitBtn = document.querySelector('input[type=submit]')

seed.addEventListener('change', () => {
  if (seedLabel.style.display === 'block') {
    seedLabel.style.display = 'none'
  }
  const text = seed.options[seed.selectedIndex].text
  plantName.value = text.substring(0, text.indexOf('('))
  variety.value = text.match(/\((.*)\)/).pop()
})

const validate = () => {
  const plantNameValue = plantName.value
  const varietyValue = variety.value
  if (!plantNameValue || !varietyValue) {
    seedLabel.style.display = 'block'
    return false
  }
}

submitBtn.onclick = validate
