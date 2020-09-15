/*  global
    confirm
*/

const confirmDelete = () => {
  return confirm('Are you sure you want to delete?')
}

const deleteForm = document.getElementById('delete-form')

deleteForm.addEventListener('submit', confirmDelete)
