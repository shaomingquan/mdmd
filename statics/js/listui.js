var items = document.querySelectorAll('.item');
function filter (value) {
  items.forEach(function (item) {
    if(item.innerHTML.indexOf(value) > -1) {
      item.style.display = 'block'
    } else {
      item.style.display = 'none'
    }
  })
}
var input = document.querySelectorAll('input')[0];
input.oninput = function (e) { filter(e.target.value) }
