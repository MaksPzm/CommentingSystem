// замена стрелки в фильтре
const filter: HTMLSelectElement = <HTMLSelectElement>document.querySelector("#filter");
const filterList: HTMLDivElement = <HTMLDivElement>document.querySelector(".main__comments_filter_form_list");
const imgLike: NodeListOf<Element> = filterList.querySelectorAll(".main__comments_filter_form_list_img");

filterList.addEventListener("click", showArrow);

function showArrow(): void {
    imgLike.forEach(img => {
        if(img.classList.contains('hidden')) {
            img.classList.remove('hidden');
        } else {
            img.classList.add('hidden');
        }
    })
}

function createFilter():void {
    const listDiv: string = `
        <div class="main__comments_filter_form_list_listBlock hidden">
        <ul class="main__comments_filter_form_list_listBlock_list">
        <li class="main__comments_filter_form_list_listBlock_list_item">По дате</li>
        <li class="main__comments_filter_form_list_listBlock_list_item active">По количеству оценок</li>
        <li class="main__comments_filter_form_list_listBlock_list_item">По актуальности</li>
        <li class="main__comments_filter_form_list_listBlock_list_item">По количеству ответов</li>
        </ul>
    </div>`
    filterList.insertAdjacentHTML("afterbegin", listDiv);
}

createFilter()

filterList.addEventListener('click', showFilter);

function showFilter(): void {
    const newListDiv: HTMLDivElement | null  = document.querySelector(".main__comments_filter_form_list_listBlock");
    if (newListDiv == null) return;
    if (newListDiv.classList.contains('hidden')) {
        newListDiv.classList.remove('hidden')
    } else {
        newListDiv.classList.add('hidden')
    }
}

function selectFilter(): void {
    const listFilterSelect: HTMLUListElement | null = document.querySelector(".main__comments_filter_form_list_listBlock_list");
    const listFilterItem: NodeListOf<Element> | undefined = listFilterSelect?.querySelectorAll(".main__comments_filter_form_list_listBlock_list_item");
    if (listFilterSelect == null) return;
    if (listFilterItem == undefined) return;
    listFilterItem.forEach((item, index) => {
        item.addEventListener('click', (event) => {
            event.stopPropagation()
            showFilter()
            showArrow() 
            filter.options[index].selected = true;
            listFilterItem.forEach(elem => elem.classList.remove('active'));
            item.classList.add('active');
            filter.options[index].selected = true;
        })
    })
}
selectFilter()

// функция для увеличения высоты textarea



const textAreaHeight = (() => {
    function textInput(el: HTMLTextAreaElement): void {
        el.style.height = '5px';
        el.style.height = el.scrollHeight + 'px';
    }

    const textForm: HTMLTextAreaElement | null = document.querySelector('#inp-text');

    if (textForm != null) {
        textForm.addEventListener("input", function() {
            textInput(this)
        });
    }
})()

// interface formsComment  {
//     img: HTMLImageElement | null,
//     name: string,
//     data: string,
//     text: string,
//     like: number,
//     nameAnswer?: string
// }
// let answerElement: any = [];
// console.log('answerElement: ', answerElement);

// class formsComments {
//     constructor(img: formsComment, name: formsComment, data: formsComment, text: formsComment, like: formsComment, nameAnswer?: formsComment) {
//         this.img = img;
//         this.name = name;
//         this.data = data;
//         this.text = text
//         this.like = like;
//         this.nameAnswer = nameAnswer;
//     }
    
//     comment() {
//         const blockComments: HTMLDivElement = document.querySelector(".main__comments_all-comments");
//         const newComment = `
//             <div class="main__comments_all-comments_content main__comments_all-comments_content-new">
//                 <div class="main__comments_all_form_photo">${this.img}</div>
//                 <div class="main__comments_all_form_comment">
//                     <div class="main__comments_all_form_comment-block">   
//                         <span class="main__comments_all_form_comment_name">${this.name}</span>
//                         <span class="main__comments_all-comments_content-block_data">15.01 13:55</span>
//                     </div>     
//                     <div class="main__comments_all-comments_content_text">
//                         <p class="main__comments_all-comments_content_text-block">
//                         ${this.text}
//                         </p>
//                     </div>
//                     <div class="main__comments_all-comments_content_menu">
//                         <div class="main__comments_all-comments_content_menu_answer"><img src="images/svg/answer.svg" alt="стрелка ответа" class="main__comments_all-comments_content_menu_img">Ответить</div>
//                         <div class="main__comments_all-comments_content_menu_like-Favorites"><img src="images/svg/likeP.svg" alt="избранное" class="main__comments_all-comments_content_menu_img">В избранное</div>
//                         <div class="main__comments_all-comments_content_menu_like"><div class="main__comments_all-comments_content_menu_like_minus"><span>-</span></div>0<div class="main__comments_all-comments_content_menu_like_plus"><span>+</span></div></div>
//                     </div>
//                 </div>
//             </div>
//         `
//         blockComments.insertAdjacentHTML("afterbegin", newComment);
//     }
//     answer() {
//         const clickReply = document.getElementsByClassName('main__comments_all-comments_ass'); 
//         console.log('clickReply: ', clickReply);
//         // answerElement.push(clickReply);
//         if (clickReply === null) return;
//         const newAnswer = `
//             <div class="main__comments_all-comments_answers new_style">
//                 <div class="main__comments_all_form_photo">${this.img}</div>
//                 <div class="main__comments_all_form_comment">
//                     <div class="main__comments_all_form_comment-block">   
//                         <span class="main__comments_all_form_comment_name">${this.name}</span>
//                         <div class="main__comments_all-comments_content_menu_answer"><img src="images/svg/answer.svg" alt="стрелка ответа" class="main__comments_all-comments_content_menu_img">${this.nameAnswer}</div>
//                         <span class="main__comments_all-comments_content-block_data">15.01 13:55</span>
//                     </div>     
//                     <div class="main__comments_all-comments_content_text">
//                         <p class="main__comments_all-comments_content_text-block main__comments_all-comments_answers_text">
//                         ${this.text}
//                         </p>
//                     </div>
//                     <div class="main__comments_all-comments_content_menu">
//                         <div class="main__comments_all-comments_content_menu_like-Favorites"><img src="images/svg/likeP.svg" alt="избранное" class="main__comments_all-comments_content_menu_img">В избранное</div>
//                         <div class="main__comments_all-comments_content_menu_like"><div class="main__comments_all-comments_content_menu_like_minus"><span>-</span></div>0<div class="main__comments_all-comments_content_menu_like_plus"><span>+</span></div></div>
//                     </div>
//                 </div>
//             </div>
//         `
//         // clickReply.innerHTML = newAnswer;
//         answerElement.forEach(answer => {
//             answer.innerHTML = newAnswer;
//         })
        
//     }
// }



// let blockImg: HTMLDivElement = document.querySelector(".main__comments_all_form_photo");
// let blockName: HTMLDivElement = document.querySelector(".main__comments_all_form_comment");
// let textBox: HTMLDivElement = document.querySelector(".main__comments_all_form_comment_send");
// const img = blockImg.querySelector("img").outerHTML;

// const names: string = blockName.querySelector(".main__comments_all_form_comment_name").innerText;

// const data: string = "06.04.25";

// const like: number = 0;


// const submit: HTMLInputElement = document.querySelector("#inp-submit");

// let comments: any = [];
// let answers: any = [];
// let saveAns = [];
// console.log('saveAns: ', saveAns);
// // localStorage.clear()
// loadComments()

// submit.addEventListener('click', (event) => {
//     event.preventDefault();
//     let textArea = textBox.querySelector("#inp-text");
//     let text = textArea.value;
//     let comment = {
//     img: img,
//     names: names,
//     data: data,
//     text: text,
//     like: like
//     };
//     comments.push(comment);
    
//     textArea.value = "";
//     saveComments()
//     showComments()
//     // comments = [ ];
// })

// //сохраняем комментарии и ответы в localstorage
// function saveComments(): void {
//     localStorage.setItem("comments", JSON.stringify(comments));
//     localStorage.setItem("answers", JSON.stringify(answers));
// }

// // показать комментарии и ответы
// function loadComments(): void {
//     if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
//     if (localStorage.getItem('answers')) answers = JSON.parse(localStorage.getItem('answers'));
//     showComments()
//     showAnswerComments();
// }

// // показать комментарии
// function showComments(): void {
//     let comm = "";
//     for (let item of comments) {
//         comm = new formsComments(item.img, item.names, item.data, item.text, item.like);
//         comm.comment()    
//     }
// }

// // показать ответ на комментарий
// function showAnswerComments(): void {
//     let comm = "";
//     for (let item of answers) {
//         console.log('item: ', item);
//         comm = new formsComments(item.img, item.names, item.data, item.text, item.like, item.nameAnswer);
//         comm.answer()    
//     }
// }


// function createAnswers() {
//     const btnAnswers: any = [...document.querySelectorAll(".main__comments_all-comments_content_menu_answer")];
//     console.log('btnAnswers: ', btnAnswers);
//     if (btnAnswers == undefined) return;
//     btnAnswers.forEach(value => {
//         value.addEventListener('click', (event: any) => {
//             // event.preventDefault()
//         let { target }  = event;
//         console.log('target: ', target);
//         const searchParentElement = target.closest(".main__comments_all-comments_content");
//         console.log('searchParentElement: ', searchParentElement);
//         let nameAnswer: HTMLSpanElement = searchParentElement.querySelector(".main__comments_all_form_comment_name").textContent;
//         const showAnswers = ((): void => {
//             let createsAnswer = `
//                 <div class="main__comments_all-comments_ass">
//                     <form class="main__comments_all_form main__comments_all-comments_answers">
//                         <div class="main__comments_all_form_photo"><img src="images/png/photo.png" alt="аватар"></div>
//                         <div class="main__comments_all_form_comment new_style">
//                             <span class="main__comments_all_form_comment_name">Максим Авдеенко</span>
//                             <span class="main__comments_all_form_comment_symbols new_style">Макс. 1000 символов</span>
//                             <div class="main__comments_all_form_comment_send new_style">
//                                 <textarea id="inp-text" class="main__comments_all_form_comment_send_inp-text new_style" maxlength="1000" placeholder="Введите текст сообщения..." name="comment" rows="1"></textarea>
//                                 <button type="button" id="inp-submit" class="main__comments_all_form_comment_send_inp-submit new_style" placeholder="Отправить">Отправить</button>
//                             </div>
//                         </div>
//                     </form>
//                 </div>    
//             `
           
//             searchParentElement.insertAdjacentHTML("afterend", createsAnswer);
//             // saveAns.push(searchParentElement)
//         })()
        
//         answerComment(nameAnswer)
        

//     })
//     })
// } 
// createAnswers()
// const textAreaAnswer = "";
// function answerComment(nameAnswer: any) {
//     const btnAnswerComment: HTMLButtonElement | null = document.querySelector("#inp-submit.main__comments_all_form_comment_send_inp-submit.new_style");
//     const textAreaAnswer: any = [...document.querySelectorAll("#inp-text.main__comments_all_form_comment_send_inp-text.new_style")];
//     console.log('textAreaAnswer: ', textAreaAnswer);
    
//     if (btnAnswerComment === null) return;
//     btnAnswerComment.addEventListener('click', btnSendAnswer);
//     // textAreaAnswer.forEach(item => {
//     //     item.addEventListener('Focus', (e) => {
//     //     let key = e.key;
//     //     console.log('key: ', key);
//     //     if (key === 13) { 
//     //         btnSendAnswer()
//     //     }
//     // })
//     // })
    
//     function btnSendAnswer(): void {
        
//         textAreaAnswer.forEach(item => {
//             let text = item.value;
//             let answer = {
//             img: img,
//             names: names,
//             data: data,
//             text: text,
//             like: like,
//             nameAnswer: nameAnswer
//             };
//             answers.push(answer);
//         })
//     answerElement = Array.from(document.querySelectorAll('.main__comments_all-comments_ass'));
    
//     textAreaAnswer.value = "";
//     saveComments()
//     showAnswerComments()
//     }

// }


