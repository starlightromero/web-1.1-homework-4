const body = document.querySelector('body')
const card = document.querySelectorAll('.card')

const mouseEnter = e => {
  const src = e.target.querySelector('img').getAttribute('src')
  body.style.backgroundImage = `url(${src})`
}

const mouseLeave = e => {
  body.style.backgroundImage = 'none'
}

for (const c of card) {
  c.addEventListener('mouseenter', mouseEnter)
  c.addEventListener('mouseleave', mouseLeave)
}
