const formComments = document.querySelector(".main__comments_all_form");
const textField = formComments.querySelector("#inp-text.main__comments_all_form_comment_send_inp-text");
const btnSend = formComments.querySelector("#inp-submit.main__comments_all_form_comment_send_inp-submit");
let comments = [];
let commentsLoad = [];
// localStorage.clear()
class CreateComments {
    constructor(img, name, date, content, like) {
        this.img = img;
        this.name = name;
        this.date = date;
        this.content = content;
        this.like = like;
    }
    createComment() {
        const newComment = `
            <div class="main__comments_all-comments_content main__comments_all-comments_content-new">
                <div class="main__comments_all_form_photo">${this.img}</div>
                <div class="main__comments_all_form_comment">
                    <div class="main__comments_all_form_comment-block">   
                        <span class="main__comments_all_form_comment_name">${this.name}</span>
                        <span class="main__comments_all-comments_content-block_data">${this.date}</span>
                    </div>     
                    <div class="main__comments_all-comments_content_text">
                        <p class="main__comments_all-comments_content_text-block">${this.content}</p>
                    </div>
                    <div class="main__comments_all-comments_content_menu">
                        <div class="main__comments_all-comments_content_menu_answer"><img src="images/svg/answer.svg" alt="стрелка ответа" class="main__comments_all-comments_content_menu_img">Ответить</div>
                        <div class="main__comments_all-comments_content_menu_like-Favorites"><img src="images/svg/likeP.svg" alt="избранное" class="main__comments_all-comments_content_menu_img">В избранном</div>
                        <div class="main__comments_all-comments_content_menu_like"><div class="main__comments_all-comments_content_menu_like_minus"><span>-</span></div>${this.like}<div class="main__comments_all-comments_content_menu_like_plus"><span>+</span></div></div>
                    </div>
                </div>
            </div>
        `;
        formComments.insertAdjacentHTML('afterend', newComment);
    }
}
function saveComments() {
    localStorage.setItem("comments", JSON.stringify(commentsLoad));
}
function showComments() {
    let comm = "";
    for (let comment of comments) {
        comm = new CreateComments(comment.img, comment.name, comment.date, comment.content, comment.like);
        comm.createComment();
    }
}
function loadComments() {
    if (localStorage.getItem('comments'))
        comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}
let img;
let Name;
if (formComments !== null) {
    img = formComments.querySelector(".main__comments_all_form_photo img").outerHTML;
    Name = formComments.querySelector(".main__comments_all_form_comment_name").textContent;
}
const date = (() => {
    let dates = new Date;
    let month = '';
    let changeMonth = +dates.getMonth() + 1; //потому что показывает на один месяц меньше.
    if (changeMonth < 10) {
        month = '0';
    }
    let newDate = `${dates.getDate() + '.' + month + changeMonth + " " + dates.getHours() + ":" + dates.getMinutes()}`;
    return newDate;
})();
const like = 0;
loadComments();
function createComments() {
    if (btnSend == null)
        return;
    btnSend.addEventListener('click', sendNewComment);
}
createComments();
function sendNewComment() {
    let content = textField.value;
    const comment = {
        img: img,
        name: Name,
        date: date,
        content: content,
        like: like
    };
    comments.push(comment);
    commentsLoad.push(comment);
    showComments();
    textField.value = " ";
    saveComments();
    comments = [];
}
// Комментарии доделал теперь нужно ответы
