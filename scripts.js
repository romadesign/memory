const capture_content_div = document.getElementById('content')
const capture_img1 = document.getElementsByClassName('img-1')
const capture_img2 = document.getElementsByClassName('img-2')

console.log(capture_img1)
console.log(capture_img2)

const getData = () =>
  fetch('./data.json')
    .then(response => response.json())
    .then(json => {
      return json
    })

getData()
  .then(res => {
    const data = res.items
    const random_data = data.sort(function () {
      return Math.random() - 0.5
    })
    random_data.filter(item => {
      capture_content_div.innerHTML += `
        <img onclick='onClickImg(${item.relation}, ${item.id}, ${item.image2})' class="img-1" id='${item.id}'  src="${item.image1}"/>
        `
      })
      // <img onclick='onClickImg(${item.relation}, ${item.id})' class="img-2 d-none" id='${item.id}'  src="${item.image2}"/>
    })
  .catch(error => {
    console.log(error, 'entro') // "oh, no!"
  })

function onClickImg (relation, id, image2) {
  for (let index = 0; index < capture_img1.length; index++) {
    const element2 = capture_img2[index]
      var element_atributo_id_img2 = element2.getAttribute('id')
      if (id == element_atributo_id_img2) {
        var element_atributo_class = element2.classList.remove('d-none')
        // element2.setAttribute('src', `${image2}`);
      }
   
  }
}
