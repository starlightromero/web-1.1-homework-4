const body = document.querySelector('body')
const items = document.getElementById('items')

const mouseOver = (e) => {
  if (e.target.matches('.card')) {
    const src = e.target.querySelector('img').getAttribute('src')
    body.style.backgroundImage = `url(${src})`
    console.log('over')
  }
}

items.addEventListener('mouseover', mouseOver)
