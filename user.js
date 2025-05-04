function user() {
    const API = `https://randomuser.me/api/`;
    fetch(API)
        .then(data => {
            return data.json();
        })
        .then(displayResult)
        .catch((error) => {
            console.error("Error!!");  
        })

}
user()

function displayResult(data) {
    let json = data;
    const formUser = document.querySelector(".main__comments_all_form");
    const picture = formUser.querySelector(".main__comments_all_form_photo img");
    const nameUser = formUser.querySelector(".main__comments_all_form_comment_name");
    picture.src = json.results[0].picture.large;
    picture.style.width = "61px";
    picture.style.height = "61px";
    picture.style.borderRadius = "50%";
    let newName = json.results[0].name.first;
    let newSubName = json.results[0].name.last;
    nameUser.textContent = `${newName} ${newSubName}`;
    
}

// const from = document.querySelector('#from');
// const to = document.querySelector('#to');
// const search = document.querySelector('#search');
// const convertBtn = document.querySelector('.wrapper_button_convert');
// const clearBtn = document.querySelector('.wrapper_button_clear');
// const result = document.querySelector('.wrapper__result_res');
// let resultFrom;
// let resultTo;
// let searchValue;
// // change срабатывает только после обновления информации value
// to.addEventListener('change', (event) => {
//     resultTo = event.target.value;
// });
// from.addEventListener('change', (event) => {
//     resultFrom = event.target.value;
// });
// search.addEventListener('change', (event) => {
//     searchValue = event.target.value;
// });
// function displayResult(currency) {
//     //.conversion_rates берем из сервера
//     let toRate = currency.conversion_rates[resultTo];
//     let conversionResult = searchValue * toRate;
//     result.innerHTML = `${conversionResult} ${resultTo}`;
// }
// function getResults() {
//     const API = `https://v6.exchangerate-api.com/v6/864451b54164f4332c1d298a/latest/${resultFrom}`;
//     fetch(API)
//         .then(data => {
//         return data.json();
//     })
//         .then(displayResult)
//         .catch((error) => {
//         console.error('Error!!!', error);
//     });
// }
// convertBtn.addEventListener('click', getResults);
// const btnFont = document.querySelector('.wrapper__fontBlock');
// btnFont.addEventListener('click', (event) => {
//     const { target } = event;
//     console.log('target: ', target);
//     const targetClassList = target.classList;
//     const classListActive = document.querySelector('.wrapper__fontBlock_btn.active');
//     const allTargetBtn = [...document.querySelectorAll('.wrapper__fontBlock_btn')];
//     const html = document.querySelector('html');
//     classListActive.classList.remove('active');
//     if (target === allTargetBtn[0]) {
//         target.classList.add('active');
//         html.style.fontSize = '7px';
//     }
//     if (target === allTargetBtn[1]) {
//         target.classList.add('active');
//         html.style.fontSize = '10px';
//     }
//     if (target === allTargetBtn[2]) {
//         target.classList.add('active');
//         html.style.fontSize = '15px';
//     }
// });