const formComments = document.querySelector(".main__comments_all_form");
const textField = formComments.querySelector("#inp-text.main__comments_all_form_comment_send_inp-text");
const btnSend = formComments.querySelector("#inp-submit.main__comments_all_form_comment_send_inp-submit");
class CreateComments {
    constructor(img, name, date, content, like, answer, number) {
        this.img = img;
        this.name = name;
        this.date = date;
        this.content = content;
        this.like = like;
        this.answer = answer;
        this.number = number;
    }
    createComment() {
        const newComment = `
            <div id="comment-${this.number}" class="main__comments_all-comments_content main__comments_all-comments_content-new">
                <div class="main__comments_all-comments_content-new_block">
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
                            <button class="main__comments_all-comments_content_menu_answer"><img src="images/svg/answer.svg" alt="стрелка ответа" class="main__comments_all-comments_content_menu_img">Ответить</button>
                            <button class="main__comments_all-comments_content_menu_like-Favorites"><img src="images/svg/likeFavorit.svg" alt="избранное" class="main__comments_all-comments_content_menu_img">В избранном</button>
                            <div class="main__comments_all-comments_content_menu_like"><div class="main__comments_all-comments_content_menu_like_minus"><span>-</span></div>${this.like}<div class="main__comments_all-comments_content_menu_like_plus"><span>+</span></div></div>
                        </div>
                    </div>
                </div>    
            </div>
        `;
        formComments.insertAdjacentHTML('afterend', newComment);
    }
    createAnswer(elementComment) {
        const newAnswer = `
            <div class="main__comments_all-comments_answers new_style">
                <div class="main__comments_all_form_photo">${this.img}</div>
                <div class="main__comments_all_form_comment">
                    <div class="main__comments_all_form_comment-block">   
                        <span class="main__comments_all_form_comment_name">${this.name}</span>
                        <div class="main__comments_all-comments_content_menu_answer"><img src="images/svg/answer.svg" alt="стрелка ответа" class="main__comments_all-comments_content_menu_img">${this.answer}</div>
                        <span class="main__comments_all-comments_content-block_data">${this.date}</span>
                    </div>     
                    <div class="main__comments_all-comments_content_text">
                        <p class="main__comments_all-comments_content_text-block main__comments_all-comments_answers_text">
                        ${this.content}
                        </p>
                    </div>
                    <div class="main__comments_all-comments_content_menu">
                        <div class="main__comments_all-comments_content_menu_like-Favorites"><img src="images/svg/likeP.svg" alt="избранное" class="main__comments_all-comments_content_menu_img">В избранное</div>
                        <div class="main__comments_all-comments_content_menu_like"><div class="main__comments_all-comments_content_menu_like_minus"><span>-</span></div>${this.like}<div class="main__comments_all-comments_content_menu_like_plus"><span>+</span></div></div>
                    </div>
                </div>
            </div>
        `;
        elementComment.insertAdjacentHTML('afterend', newAnswer);
    }
}
let comments = [];
let commentsLoad = [];
let answers = [];
let answersLoad = [];
// localStorage.clear()
function saveComments() {
    localStorage.setItem("comments", JSON.stringify(commentsLoad));
    localStorage.setItem("answers", JSON.stringify(answersLoad));
}
function showComments() {
    let comm = "";
    for (let comment of comments) {
        console.log('comment: ', comment);
        comm = new CreateComments(comment.img, comment.name, comment.date, comment.content, comment.like, comment.answer, comment.number);
        comm.createComment();
    }
}
function showCommentsLoad() {
    let comm = "";
    for (let comment of commentsLoad) {
        comm = new CreateComments(comment.img, comment.name, comment.date, comment.content, comment.like, comment.answer, comment.number);
        comm.createComment();
    }
}
function showCommentsAnswers() {
    let comm = "";
    for (let comment of answers) {
        let topBlockComment = document.querySelector(`#${comment.id}`);
        const elementComment = topBlockComment.querySelector(".main__comments_all-comments_content-new_block");
        comm = new CreateComments(comment.img, comment.name, comment.date, comment.content, comment.like, comment.answer);
        comm.createAnswer(elementComment);
    }
}
function showCommentsAnswersLoad() {
    let comm = "";
    for (let comment of answersLoad) {
        let topBlockComment = document.querySelector(`#${comment.id}`);
        const elementComment = topBlockComment.querySelector(".main__comments_all-comments_content-new_block");
        comm = new CreateComments(comment.img, comment.name, comment.date, comment.content, comment.like, comment.answer);
        comm.createAnswer(elementComment);
    }
}
function loadComments() {
    if (localStorage.getItem('comments'))
        commentsLoad = JSON.parse(localStorage.getItem('comments'));
    if (localStorage.getItem('answers'))
        answersLoad = JSON.parse(localStorage.getItem('answers'));
    showCommentsLoad();
    showCommentsAnswersLoad();
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
let like = 0;
loadComments();
let click = [];
function createComments() {
    btnSend.addEventListener('click', () => {
        for (let i = 0; i <= commentsLoad.length; i++) {
            click.push(i);
            localStorage.setItem('click', JSON.stringify(click));
        }
        sendNewComment(click[click.length - 1]);
    });
    textField.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            btnSend.click();
        }
    });
}
createComments();
function sendNewComment(i) {
    let content = textField.value;
    if ((content.trim()) == "")
        return; // метод trim() удаляет пробелы, тем самым мы проверяем пустую строку и что бы не было пробелов;
    const comment = {
        img: img,
        name: Name,
        date: date,
        content: content,
        like: like,
        answer: '0',
        number: i
    };
    comments.push(comment);
    commentsLoad.push(comment);
    showComments();
    textField.value = " ";
    saveComments();
    comments = [];
    textField.placeholder = "Введите текст сообщения...";
    location.reload();
}
function answersComments() {
    const commentField = document.querySelector(".main__comments_all");
    const btnAnswer = commentField.querySelectorAll(".main__comments_all-comments_content_menu_answer");
    const answerComment = (() => {
        btnAnswer.forEach(btnA => {
            btnA.addEventListener('click', (event) => {
                let { target } = event;
                const commentDivBlock = target.closest(".main__comments_all-comments_content");
                const nameCommentator = commentDivBlock.querySelector(".main__comments_all_form_comment_name").textContent;
                const buttonClickAnswer = (() => {
                    const commentsAss = commentDivBlock.querySelector(".main__comments_all-comments_ass.active");
                    console.log('commentsAss: ', commentsAss);
                    const mainCommentBlock = commentDivBlock.querySelector(".main__comments_all-comments_content-new_block");
                    let createsAnswer = `
                        <div class="main__comments_all-comments_ass active">
                            <form class="main__comments_all_form main__comments_all-comments_answers new_style">
                                <div class="main__comments_all_form_photo"><img src="images/png/photo.png" alt="аватар"></div>
                                <div class="main__comments_all_form_comment new_style">
                                    <span class="main__comments_all_form_comment_name">Максим Авдеенко</span>
                                    <span class="main__comments_all_form_comment_symbols new_style">Макс. 1000 символов</span>
                                    <div class="main__comments_all_form_comment_send new_style">
                                        <textarea id="inp-text" class="main__comments_all_form_comment_send_inp-text new_style" maxlength="1000" placeholder="Введите текст сообщения..." name="comment" rows="1"></textarea>
                                        <button type="button" id="inp-submit" class="main__comments_all_form_comment_send_inp-submit new_style" placeholder="Отправить">Отправить</button>
                                    </div>
                                </div>
                            </form>
                        </div>    
                    `;
                    if (commentsAss == null) {
                        mainCommentBlock.insertAdjacentHTML("afterend", createsAnswer);
                    }
                })();
                btnAnswerSend();
                function btnAnswerSend() {
                    const send = document.querySelectorAll(".main__comments_all_form_comment_send_inp-submit.new_style");
                    if (send == null)
                        return;
                    send.forEach(btn => {
                        btn.addEventListener('click', (event) => {
                            let { target } = event;
                            const answerDivBlock = target.closest(".main__comments_all-comments_content-new");
                            const textContentAnswer = answerDivBlock.querySelector(".main__comments_all_form_comment_send_inp-text.new_style").value;
                            answersPush(textContentAnswer);
                            showCommentsAnswers();
                            answers = [];
                            const formAns = answerDivBlock.querySelector(".main__comments_all-comments_ass");
                            formAns.remove();
                            function answersPush(textContentAnswer) {
                                const answer = {
                                    img: img,
                                    name: Name,
                                    date: date,
                                    content: textContentAnswer,
                                    like: like,
                                    answer: nameCommentator,
                                    elementComment: commentDivBlock,
                                    id: `${answerDivBlock.id}`
                                };
                                answers.push(answer);
                                answersLoad.push(answer);
                                saveComments();
                            }
                        });
                    });
                }
            });
        });
    })();
}
answersComments();
// фильтрация объектов
function filterComments() {
    const formFilter = document.querySelector(".main__comments_filter_form_list");
    const parse = JSON.parse(localStorage.getItem('comments'));
    console.log('parse: ', parse);
    formFilter.addEventListener('click', () => {
        const filter = Array.from(document.querySelectorAll(".main__comments_filter_form_list_listBlock_list_item"));
        // if (filter[0].classList.contains("active")) 
        date;
        console.log('date: ', date);
    });
    let pdate = parse[0].date;
    console.log('parse[0].date: ', parse[0].date);
}
filterComments();
