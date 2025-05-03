const formComments = document.querySelector(".main__comments_all_form");
const textField = formComments.querySelector("#inp-text.main__comments_all_form_comment_send_inp-text");
const btnSend = formComments.querySelector("#inp-submit.main__comments_all_form_comment_send_inp-submit");
const newFavourite = `<img src="images/svg/likeFavorit.svg" alt="избранное" class="main__comments_all-comments_content_menu_img">В избранном`;
const Favourite = `<img src="images/svg/likeP.svg" alt="избранное" class="main__comments_all-comments_content_menu_img">В избранное`;
let comments = [];
let commentsLoad = [];
let answers = [];
let answersLoad = [];
loadComments();
// localStorage.clear()
function likes() {
    const comment = document.querySelectorAll(".main__comments_all-comments_content-new_block");
    const answer = document.querySelectorAll(".main__comments_all-comments_answers.new_style");
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
    });
    answer.forEach((ans) => {
        const addLike = ans.querySelector(".main__comments_all-comments_content_menu_like_plus");
        const removeLike = ans.querySelector(".main__comments_all-comments_content_menu_like_minus");
        addLike.addEventListener("click", (event) => {
            event.preventDefault();
            setLikeAnswer(event, 1);
            colorLikeAnswers();
        });
        removeLike.addEventListener("click", (event) => {
            event.preventDefault();
            setLikeAnswer(event, -1);
            colorLikeAnswers();
        });
    });
}
function colorLike() {
    let likes = document.querySelectorAll(".main__comments_all-comments_content_menu_like_num");
    likes.forEach((like) => {
        if (Number(like.innerText) >= 0) {
            like.style.color = "rgba(138, 197, 64, 1)";
        }
        else {
            like.style.color = "rgba(255, 0, 0, 1)";
        }
    });
}
function colorLikeAnswers() {
    let likesAnswer = document.querySelectorAll(".main__comments_all-comments_content_menu_like_num-answer");
    likesAnswer.forEach((value) => {
        if (Number(value.innerText) >= 0) {
            value.style.color = "rgba(138, 197, 64, 1)";
        }
        else {
            value.style.color = "rgba(255, 0, 0, 1)";
        }
    });
}
function setLike(event, num) {
    const { target } = event;
    const parent = target.closest(".main__comments_all-comments_content_menu_like");
    let parentLike = parent.querySelector(".main__comments_all-comments_content_menu_like_num");
    parentLike.innerText = +parentLike.innerText + num;
    saveLike(target, parentLike);
}
function setLikeAnswer(event, num) {
    const { target } = event;
    const parent = target.closest(".main__comments_all-comments_content_menu_like");
    let parentLikeAnswer = parent.querySelector(".main__comments_all-comments_content_menu_like_num-answer");
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
    const index = comment.getAttribute("indexAnswer");
    json[index].like = parentLike.innerText;
    localStorage.setItem("answers", JSON.stringify(json));
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
let click = [];
function createComments() {
    btnSend.addEventListener('click', () => {
        for (let i = 0; i <= commentsLoad.length; i++) {
            click.push(i);
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
        answer: 0,
        favourites: 0,
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
                    send.forEach((btn) => {
                        btn.addEventListener('click', (event) => {
                            for (let i = 0; i <= answersLoad.length; i++) {
                                answerBtnClick.push(i);
                            }
                            let { target } = event;
                            const answerDivBlock = target.closest(".main__comments_all-comments_content-new");
                            const contentAnswer = answerDivBlock.querySelector(".main__comments_all_form_comment_send_inp-text.new_style");
                            const textContentAnswer = contentAnswer.value;
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
                                    favourites: 0,
                                    number: i
                                };
                                answers.push(answer);
                                answersLoad.push(answer);
                                saveComments();
                            }
                        });
                        const textFieldAnswers = document.querySelector(".main__comments_all_form_comment_send_inp-text.new_style");
                        if (textFieldAnswers !== null) {
                            textFieldAnswers.addEventListener('keydown', (event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();
                                    btn.click();
                                }
                            });
                        }
                    });
                }
            });
        });
    })();
}
answersComments();
colorLike();
colorLikeAnswers();
likes();
function favourites() {
    const btnFavourite = document.querySelectorAll(".main__comments_all-comments_content_menu_like-Favorites.comment");
    btnFavourite.forEach(value => {
        value.addEventListener("click", (event) => {
            event.preventDefault();
            let { target } = event;
            let json = JSON.parse(localStorage.getItem("comments"));
            console.log('json: ', json);
            const comment = target.closest(".main__comments_all-comments_content.main__comments_all-comments_content-new");
            const index = comment.getAttribute("index");
            console.log('index: ', index);
            if (json[index].favourites == 0) {
                json[index].favourites = 1;
                target.innerHTML = newFavourite;
            }
            else {
                json[index].favourites = 0;
                target.innerHTML = Favourite;
            }
            localStorage.setItem("comments", JSON.stringify(json));
            // location.reload()
        });
    });
}
function FavoritesAnswer() {
    const btnFavourite = document.querySelectorAll(".main__comments_all-comments_content_menu_like-Favorites.answer");
    btnFavourite.forEach(value => {
        value.addEventListener("click", (event) => {
            event.preventDefault();
            let { target } = event;
            let json = JSON.parse(localStorage.getItem("answers"));
            const comment = target.closest(".main__comments_all-comments_answers.new_style");
            const index = comment.getAttribute("indexanswer");
            if (json[index].favourites == 0) {
                json[index].favourites = 1;
                target.innerHTML = newFavourite;
            }
            else {
                json[index].favourites = 0;
                target.innerHTML = Favourite;
            }
            localStorage.setItem("answers", JSON.stringify(json));
        });
    });
}
filterAdd();
const loadCommentsFavourite = (() => {
    commentsLoad.forEach((value, index) => {
        const comments = document.querySelector(`#comment-${index}`);
        const comment = comments.querySelector(".main__comments_all-comments_content-new_block");
        const favorites = comment.querySelector(".main__comments_all-comments_content_menu_like-Favorites.comment");
        if (commentsLoad[index].favourites == 1) {
            favorites.innerHTML = newFavourite;
        }
        else {
            favorites.innerHTML = Favourite;
        }
    });
})();
const loadAnswersFavourite = (() => {
    answersLoad.forEach((value, index) => {
        const answer = document.querySelector(`[indexAnswer="${index}"]`);
        const favorite = answer.querySelector(".main__comments_all-comments_content_menu_like-Favorites.answer");
        if (answersLoad[index].favourites == 1) {
            favorite.innerHTML = newFavourite;
        }
        else {
            favorite.innerHTML = Favourite;
        }
    });
})();
function filterAdd() {
    const blockFilter = document.querySelector(".main__comments_filter_form_list");
    blockFilter.addEventListener('click', () => {
        const listFilter = document.querySelector(".main__comments_filter_form_list_listBlock_list");
        if (listFilter == null)
            return;
        const itemList = listFilter.querySelectorAll(".main__comments_filter_form_list_listBlock_list_item");
        const jsonComment = JSON.parse(localStorage.getItem("comments"));
        itemList[1].addEventListener("click", (event) => {
            event.preventDefault();
            let sortJsonComment = jsonComment.sort((a, b) => parseFloat(a.like) - parseFloat(b.like)); // сортируем что бы поменять местами элементы массива, от min к max;
            localStorage.setItem("comments", JSON.stringify(sortJsonComment));
            location.reload();
        });
        itemList[0].addEventListener("click", (event) => {
            event.preventDefault();
            jsonComment.forEach((value, index) => {
                // let newdate = jsonComment[index].date;
                // jsonComment[index].date = newdate.replace(/\W|_/g, ''); удаляем все символы кроме цифр
                // let sortJsonComment = jsonComment.sort((a: any, b: any) => parseFloat(a.date) - parseFloat(b.date)); // сортируем что бы поменять местами элементы массива, от min к max;
                // let newJsonComment = jsonComment[index].date.replace(/(\d{1,2})(\d{2})(\d{2})(\d{2})/g, '$1:$2 $3:$4'); // втавляем все символы наместо;
                // localStorage.setItem("comments", JSON.stringify(sortJsonComment));
                // jsonComment[index].date = newJsonComment;
                // localStorage.setItem("comments", JSON.stringify(jsonComment));
                // location.reload()
                let sortJsonComment = jsonComment.sort((a, b) => parseFloat(a.number) - parseFloat(b.number));
                localStorage.setItem("comments", JSON.stringify(sortJsonComment));
                location.reload();
            });
        });
        itemList[2].addEventListener("click", (event) => {
            event.preventDefault();
            let sortJsonComment = jsonComment.sort((a, b) => parseFloat(a.favourites) - parseFloat(b.favourites));
            localStorage.setItem("comments", JSON.stringify(sortJsonComment));
            location.reload();
        });
        itemList[3].addEventListener("click", (event) => {
            event.preventDefault();
            let sortJsonComment = jsonComment.sort((a, b) => parseFloat(a.answer) - parseFloat(b.answer));
            localStorage.setItem("comments", JSON.stringify(sortJsonComment));
            location.reload();
        });
    });
}
function numberResponses() {
    const commentBlock = document.querySelectorAll(".main__comments_all-comments_content.main__comments_all-comments_content-new");
    const json = JSON.parse(localStorage.getItem("comments"));
    commentBlock.forEach((comment, index) => {
        const answer = comment.querySelectorAll(".main__comments_all-comments_answers.new_style");
        let numRespons = answer.length;
        const commentIndex = comment.getAttribute("index");
        json[commentIndex].answer = numRespons;
        localStorage.setItem("comments", JSON.stringify(json));
    });
}
numberResponses();
function favoritesShow() {
    const json = JSON.parse(localStorage.getItem("comments"));
    json.forEach((value, index) => {
        const indexNum = json[index].number;
        const commentBloc = document.querySelector(`#comment-${indexNum}`);
        const comment = commentBloc.querySelector(".main__comments_all-comments_content-new_block");
        const favouritesBtn = comment.querySelector(".main__comments_all-comments_content_menu_like-Favorites.comment");
        if (json[index].favourites == 1) {
            favouritesBtn.innerHTML = newFavourite;
        }
        else {
            favouritesBtn.innerHTML = Favourite;
        }
    });
}
favourites();
FavoritesAnswer();
favoritesShow();
