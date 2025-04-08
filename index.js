// замена стрелки в фильтре
const filter = document.querySelector("#filter");
const filterList = document.querySelector(".main__comments_filter_form_list");
const imgLike = filterList.querySelectorAll(".main__comments_filter_form_list_img");
filterList.addEventListener("click", showArrow);
function showArrow() {
    imgLike.forEach(img => {
        if (img.classList.contains('hidden')) {
            img.classList.remove('hidden');
        }
        else {
            img.classList.add('hidden');
        }
    });
}
function createFilter() {
    const listDiv = `
        <div class="main__comments_filter_form_list_listBlock hidden">
        <ul class="main__comments_filter_form_list_listBlock_list">
        <li class="main__comments_filter_form_list_listBlock_list_item">По дате</li>
        <li class="main__comments_filter_form_list_listBlock_list_item active">По количеству оценок</li>
        <li class="main__comments_filter_form_list_listBlock_list_item">По актуальности</li>
        <li class="main__comments_filter_form_list_listBlock_list_item">По количеству ответов</li>
        </ul>
    </div>`;
    filterList.insertAdjacentHTML("afterbegin", listDiv);
}
createFilter();
filterList.addEventListener('click', showFilter);
function showFilter() {
    const newListDiv = document.querySelector(".main__comments_filter_form_list_listBlock");
    if (newListDiv == null)
        return;
    if (newListDiv.classList.contains('hidden')) {
        newListDiv.classList.remove('hidden');
    }
    else {
        newListDiv.classList.add('hidden');
    }
}
function selectFilter() {
    const listFilterSelect = document.querySelector(".main__comments_filter_form_list_listBlock_list");
    const listFilterItem = listFilterSelect === null || listFilterSelect === void 0 ? void 0 : listFilterSelect.querySelectorAll(".main__comments_filter_form_list_listBlock_list_item");
    if (listFilterSelect == null)
        return;
    if (listFilterItem == undefined)
        return;
    listFilterItem.forEach((item, index) => {
        item.addEventListener('click', (event) => {
            event.stopPropagation();
            showFilter();
            showArrow();
            filter.options[index].selected = true;
            listFilterItem.forEach(elem => elem.classList.remove('active'));
            item.classList.add('active');
            filter.options[index].selected = true;
        });
    });
}
selectFilter();
// функция для увеличения высоты textarea
const textAreaHeight = (() => {
    function textInput(el) {
        el.style.height = '5px';
        el.style.height = el.scrollHeight + 'px';
    }
    const textForm = document.querySelector('#inp-text');
    if (textForm != null) {
        textForm.addEventListener("input", function () {
            textInput(this);
        });
    }
})();
class formsComments {
    constructor(img, name, data, text, like) {
        this.img = img;
        this.name = name;
        this.data = data;
        this.text = text;
        this.like = like;
    }
    comment() {
        const blockComments = document.querySelector(".main__comments_all-comments");
        const newComment = `
            <div class="main__comments_all-comments_content main__comments_all-comments_content-new">
                <div class="main__comments_all_form_photo">${this.img}</div>
                <div class="main__comments_all_form_comment">
                    <div class="main__comments_all_form_comment-block">   
                        <span class="main__comments_all_form_comment_name">${this.name}</span>
                        <span class="main__comments_all-comments_content-block_data">15.01 13:55</span>
                    </div>     
                    <div class="main__comments_all-comments_content_text">
                        <p class="main__comments_all-comments_content_text-block">
                        ${this.text}
                        </p>
                    </div>
                    <div class="main__comments_all-comments_content_menu">
                        <div class="main__comments_all-comments_content_menu_answer"><img src="images/svg/answer.svg" alt="стрелка ответа" class="main__comments_all-comments_content_menu_img">Ответить</div>
                        <div class="main__comments_all-comments_content_menu_like-Favorites"><img src="images/svg/likeFavorit.svg" alt="избранное" class="main__comments_all-comments_content_menu_img">В избранном</div>
                        <div class="main__comments_all-comments_content_menu_like"><div class="main__comments_all-comments_content_menu_like_minus"><span>-</span></div>0<div class="main__comments_all-comments_content_menu_like_plus"><span>+</span></div></div>
                    </div>
                </div>
            </div>
            `;
        blockComments.insertAdjacentHTML("afterbegin", newComment);
        console.log("Мы здесь");
    }
}
let blockImg = document.querySelector(".main__comments_all_form_photo");
let blockName = document.querySelector(".main__comments_all_form_comment");
let textBox = document.querySelector(".main__comments_all_form_comment_send");
const img = blockImg.querySelector("img").outerHTML;
const names = blockName.querySelector(".main__comments_all_form_comment_name").innerText;
const data = "06.04.25";
const like = 0;
const submit = document.querySelector("#inp-submit");
let comments = [];
console.log('comments: ', comments);
loadComments();
submit.addEventListener('click', (event) => {
    event.preventDefault();
    let textArea = textBox.querySelector("#inp-text");
    let text = textArea.value;
    let comment = {
        img: img,
        names: names,
        data: data,
        text: text,
        like: like
    };
    comments.push(comment);
    console.log('comments: ', comments);
    textArea.value = "";
    saveComments();
    showComments();
    // comments = [ ];
});
function saveComments() {
    localStorage.setItem("comments", JSON.stringify(comments));
}
function loadComments() {
    if (localStorage.getItem('comments'))
        comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}
function showComments() {
    let comm = "";
    for (let item of comments) {
        comm = new formsComments(item.img, item.names, item.data, item.text, item.like);
        comm.comment();
    }
}
