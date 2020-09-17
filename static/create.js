const seedName = document.querySelector('select[name="seed_name"]')
const plantName = document.querySelector('input[name="plant_name"]')
const variety = document.querySelector('input[name="variety"]')

seedName.addEventListener('change', () => {
  plantName.value = seedName.value
  const seedText = seedName.options[seedName.selectedIndex].text
  variety.value = seedText.match(/\((.*)\)/).pop()
})
