const seed = document.querySelector('select[name="seed"]')
const plantName = document.querySelector('input[name="plant_name"]')
const variety = document.querySelector('input[name="variety"]')
const seedLabel = document.querySelector('.validate')
const submitBtn = document.querySelector('input[type=submit]')

seed.addEventListener('change', () => {
  const text = seed.options[seed.selectedIndex].text
  // TODO:  refine split to get all text except for last split
  plantName.value = text.split(' ')[0]
  console.log(plantName)
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
