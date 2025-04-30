const formComments = document.querySelector(".main__comments_all_form");
const textField = formComments.querySelector("#inp-text.main__comments_all_form_comment_send_inp-text");
const btnSend = formComments.querySelector("#inp-submit.main__comments_all_form_comment_send_inp-submit");
let comments = [];
let commentsLoad = [];
let answers = [];
let answersLoad = [];
// localStorage.clear()
function likes() {
    const comment = document.querySelectorAll(".main__comments_all-comments_content-new_block");
    const answer = document.querySelectorAll(".main__comments_all-comments_answers.new_style");
    console.log('answer: ', answer);
    comment.forEach((value) => {
        const addLike = value.querySelector(".main__comments_all-comments_content_menu_like_plus");
        const removeLike = value.querySelector(".main__comments_all-comments_content_menu_like_minus");
        addLike.addEventListener("click", (event) => {
            setLike(event, 1);
            colorLike();
        });
        removeLike.addEventListener("click", (event) => {
            setLike(event, -1);
            colorLike();
        });
        answer.forEach((value) => {
            const addLike = value.querySelector(".main__comments_all-comments_content_menu_like_plus");
            const removeLike = value.querySelector(".main__comments_all-comments_content_menu_like_minus");
            addLike.addEventListener("click", (event) => {
                setLikeAnswer(event, 1);
                colorLike();
            });
            removeLike.addEventListener("click", (event) => {
                setLikeAnswer(event, -1);
                colorLike();
            });
        });
    });
}
function colorLike() {
    let like = document.querySelector(".main__comments_all-comments_content_menu_like_num");
    let likeAnswer = document.querySelector(".main__comments_all-comments_content_menu_like_num-answer");
    if (Number(like.innerText) >= 0 && like != null) {
        like.style.color = "rgba(138, 197, 64, 1)";
    }
    else {
        like.style.color = "rgba(255, 0, 0, 1)";
    }
    if (Number(likeAnswer.innerText) >= 0 && likeAnswer != null) {
        likeAnswer.style.color = "rgba(138, 197, 64, 1)";
    }
    else {
        likeAnswer.style.color = "rgba(255, 0, 0, 1)";
    }
}
function setLike(event, num) {
    event.preventDefault();
    const { target } = event;
    const parent = target.closest(".main__comments_all-comments_content_menu_like");
    let parentLike = parent.querySelector(".main__comments_all-comments_content_menu_like_num");
    parentLike.innerText = +parentLike.innerText + num;
    saveLike(target, parentLike);
}
function setLikeAnswer(event, num) {
    event.preventDefault();
    const { target } = event;
    const parent = target.closest(".main__comments_all-comments_content_menu_like");
    let parentLikeAnswer = parent.querySelector(".main__comments_all-comments_content_menu_like_num-answer");
    console.log('parentLikeAnswer: ', parentLikeAnswer);
    parentLikeAnswer.innerText = +parentLikeAnswer.innerText + num;
    saveLikeAnswer(target, parentLikeAnswer);
}
function saveLike(target, parentLike) {
    let json = JSON.parse(localStorage.getItem("comments"));
    const comment = target.closest(".main__comments_all-comments_content.main__comments_all-comments_content-new");
    const index = comment.getAttribute("index");
    json[index].like = parentLike.innerText;
    localStorage.setItem("comments", JSON.stringify(json));
}
function saveLikeAnswer(target, parentLike) {
    let json = JSON.parse(localStorage.getItem("answers"));
    const comment = target.closest(".main__comments_all-comments_answers.new_style");
    if (comment == null)
        return;
    console.log('comment: ', comment);
    const index = comment.getAttribute("indexAnswer");
    console.log('indexA: ', index);
    json[index].like = parentLike.innerText;
    localStorage.setItem("answers", JSON.stringify(json));
    // по идексу найди комментарий и добавь ему лайки
}
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
        comm = new CreateComments(comment.img, comment.name, comment.date, comment.content, comment.like, comment.answer, comment.number);
        comm.createAnswer(elementComment);
    }
}
function showCommentsAnswersLoad() {
    let comm = "";
    for (let comment of answersLoad) {
        let topBlockComment = document.querySelector(`#${comment.id}`);
        const elementComment = topBlockComment.querySelector(".main__comments_all-comments_content-new_block");
        comm = new CreateComments(comment.img, comment.name, comment.date, comment.content, comment.like, comment.answer, comment.number);
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
                    const answersForm = Array.from(document.querySelectorAll(".main__comments_all-comments_ass.active"));
                    if (answersForm.length !== 0)
                        answersForm[0].remove();
                    console.log('answersForm: ', answersForm);
                    if (commentsAss == null) {
                        mainCommentBlock.insertAdjacentHTML("afterend", createsAnswer);
                    }
                })();
                btnAnswerSend();
                let answerBtnClick = [];
                function btnAnswerSend() {
                    const send = document.querySelectorAll(".main__comments_all_form_comment_send_inp-submit.new_style");
                    if (send == null)
                        return;
                    send.forEach(btn => {
                        btn.addEventListener('click', (event) => {
                            for (let i = 0; i <= answersLoad.length; i++) {
                                answerBtnClick.push(i);
                                localStorage.setItem('answerBtnClick', JSON.stringify(answerBtnClick));
                            }
                            let { target } = event;
                            const answerDivBlock = target.closest(".main__comments_all-comments_content-new");
                            console.log('answerDivBlock: ', answerDivBlock);
                            const textContentAnswer = answerDivBlock.querySelector(".main__comments_all_form_comment_send_inp-text.new_style").value;
                            answersPush(textContentAnswer, answerBtnClick[answerBtnClick.length - 1]);
                            showCommentsAnswers();
                            answers = [];
                            const formAns = answerDivBlock.querySelector(".main__comments_all-comments_ass");
                            formAns.remove();
                            function answersPush(textContentAnswer, i) {
                                const answer = {
                                    img: img,
                                    name: Name,
                                    date: date,
                                    content: textContentAnswer,
                                    like: like,
                                    answer: nameCommentator,
                                    elementComment: commentDivBlock,
                                    id: `${answerDivBlock.id}`,
                                    number: i
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
colorLike();
likes();
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
    let arrayDate = [];
    for (let i = 0; i < parse.length; i++) {
        let newArrayDate = parse[i].date.replace(/\W|_/g, '');
        console.log('newArrayDate: ', newArrayDate);
        arrayDate.push(newArrayDate);
    }
    console.log('arrayDate: ', arrayDate);
    let pdate = parse[0].date;
    const result = pdate.replace(/\W|_/g, ''); // регулярное выражение удаления ненужных символов
    console.log('result: ', result);
    console.log('parse[0].date: ', parse[0].date);
}
// filterComments()
