
const formComments: Element = <Element>document.querySelector(".main__comments_all_form");
const textField: HTMLTextAreaElement | null = formComments.querySelector("#inp-text.main__comments_all_form_comment_send_inp-text");
const btnSend: HTMLButtonElement | null = formComments.querySelector("#inp-submit.main__comments_all_form_comment_send_inp-submit");

let comments: any = [];
let commentsLoad: any = [];
// localStorage.clear()


class CreateComments {
    img: HTMLImageElement | null;
    name: string;
    date: string;
    content: string;
    like: number;
    constructor(img: HTMLImageElement, name: string, date: string, content: string, like: number) {
        this.img = img;
        this.name = name;
        this.date = date;
        this.content = content;
        this.like = like;
    }
    public createComment() {
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
        `
        formComments.insertAdjacentHTML('afterend', newComment)
    }
}

function saveComments():void {
   localStorage.setItem("comments", JSON.stringify(commentsLoad));
}

function showComments(): void {
    let comm: any = "";
    for (let comment of comments) {
        comm = new CreateComments(comment.img, comment.name, comment.date, comment.content, comment.like);
        comm.createComment()
    }
    
}

function loadComments(): void {
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments()
    
}

let img: string;
let Name: string;
if (formComments !== null) {
    img = formComments.querySelector(".main__comments_all_form_photo img").outerHTML;
    Name = formComments.querySelector(".main__comments_all_form_comment_name").textContent;
}

const date = (() => {
    
    let dates = new Date;
    let month = '';
    let changeMonth = +dates.getMonth() + 1; //потому что показывает на один месяц меньше.
    if (changeMonth < 10) {
        month = '0'
    }
    
    let newDate = `${dates.getDate() + '.' + month + changeMonth + " " + dates.getHours() + ":" + dates.getMinutes()}`;
    return newDate
    
})()
const like = 0;
loadComments()

function createComments(): void {
    btnSend.addEventListener('click', sendNewComment);
    
    textField.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            btnSend.click();
        }
       
    })
}

createComments()

function sendNewComment() {
    let content: string = textField.value;
    if ((content.trim()) == "") return; // метод trim() удаляет пробелы, тем самым мы проверяем пустую строку и что бы не было пробелов;
    const comment = {
        img: img,
        name: Name,
        date: date,
        content: content,
        like: like
    };
    comments.push(comment);
    commentsLoad.push(comment);
    showComments()
    textField.value = " ";
    saveComments()
    comments = [];
    textField.placeholder = "Введите текст сообщения...";
}

// Комментарии доделал теперь нужно ответы

function answer() {

}


