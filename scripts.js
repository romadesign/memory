
const capture_content_div = document.getElementById('content')
const capture_img1 = document.getElementsByClassName('img-1')
const capture_img2 = document.getElementsByClassName('img-2')


let addData = []
let addDatacorrect = []

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
        <img onclick='onClickImgOne(${item.relation}, ${item.id})' class="img-1" id='${item.id}'  src="${item.image1}"/>
        <img class="img-2 d-none " id='${item.id}'  src="${item.image2}"/>
        `
    })
  })
  .catch(error => {
    console.log(error, 'entro') // "oh, no!"
  })

function onClickImgOne(relation, id) {
  console.log(addDatacorrect)

  for (let index = 0; index < capture_img2.length; index++) {
    const element2 = capture_img2[index]
    var element_atributo_id_img2 = element2.getAttribute('id')

    if (id == element_atributo_id_img2) {
      element2.classList.remove('d-none')
      for (let index = 0; index < capture_img1.length; index++) {
        const element1 = capture_img1[index];
        var element_atributo_id_img1 = element1.getAttribute('id')

        if (id == element_atributo_id_img1) {
          element1.classList.add('d-none')
          addDataNewArray(relation)
        }
      }
    }
  }
}


function addDataNewArray(relation) {
  addData.push(relation)
  if (addData.length == 2) {
    if (addData[0] == addData[1]) {
      addDatacorrect.push(relation)
      showDataCorrect(addDatacorrect)
      addData = []
      console.log(addData)
    } else {
      console.log('no es igual')
      addData = []
      for (let index = 0; index < capture_img2.length; index++) {
        const element2 = capture_img2[index];
        element2.getAttribute('id')
        element2.classList.add('d-none')

        for (let index = 0; index < capture_img1.length; index++) {
          const element1 = capture_img1[index];
          element1.getAttribute('id')
          element1.classList.remove('d-none')
        }
      }
    }
  } else {
    console.log('no')
  }
}

function showDataCorrect(data) {
  let noRepeats = [...new Set(data)];
  console.log("Sin repetidos es:", noRepeats);
  for (let index = 0; index < noRepeats.length; index++) {
    const elementNotRepeat = noRepeats[index];

    console.log(elementNotRepeat, 'qauii')


    for (let index = 0; index < capture_img1.length; index++) {
      const element1 = capture_img1[index];
      console.log(element1, '0asd')

    }
  }
}


// function onClickImgTwo (relation, id) {
//   for (let index = 0; index < capture_img2.length; index++) {
//     const element2 = capture_img2[index]
//       var element_atributo_id_img2 = element2.getAttribute('id')

//       if (id == element_atributo_id_img2) {
//         var element_atributo_class = element2.classList.add('d-none')

//         for (let index = 0; index < capture_img1.length; index++) {
//           const element = capture_img1[index];
//           var element_atributo_id_img1 = element.getAttribute('id')

//           if (id == element_atributo_id_img1){
//             var element_atributo_class = element.classList.remove('d-none')
//           }
//         }
//       }

//   }
// }


