const seed = document.querySelector('select[name="seed"]')
const plantName = document.querySelector('input[name="plant_name"]')
const variety = document.querySelector('input[name="variety"]')

seed.addEventListener('change', () => {
  const text = seed.options[seed.selectedIndex].text
  // TODO:  refine split to get all text except for last split
  plantName.value = text.split(' ')[0]
  console.log(plantName)
  variety.value = text.match(/\((.*)\)/).pop()
})
