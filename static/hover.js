const body = document.querySelector('body')
const cards = document.querySelectorAll('.card')
const items = document.getElementById('items')

const isHover = e => e.parentElement.querySelector(':hover') === e

const checkHover = () => {
  let currentlyHovered = false
  for (const c of cards) {
    const hovered = isHover(c)
    if (hovered) {
      currentlyHovered = true
      const src = c.querySelector('img').getAttribute('src')
      body.style.backgroundImage = `url(${src})`
    }
  }
  if (!currentlyHovered) {
    body.style.backgroundImage = "url('')"
  }
}

items.addEventListener('mousemove', checkHover)
