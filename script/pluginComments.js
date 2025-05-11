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
            <div id="comment-${this.number}" class="main__comments_all-comments_content main__comments_all-comments_content-new" index="${this.number}">
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
                            <button class="main__comments_all-comments_content_menu_like-Favorites comment"><img src="images/svg/likeP.svg" alt="избранное" class="main__comments_all-comments_content_menu_img">В избранное</button>
                            <div class="main__comments_all-comments_content_menu_like"><div class="main__comments_all-comments_content_menu_like_minus"><span>-</span></div><div class="main__comments_all-comments_content_menu_like_num">${this.like}</div><div class="main__comments_all-comments_content_menu_like_plus"><span>+</span></div></div>
                        </div>
                    </div>
                </div>    
            </div>
        `;
        formComments.insertAdjacentHTML('afterend', newComment);
    }
    createAnswer(elementComment) {
        const newAnswer = `
            <div class="main__comments_all-comments_answers new_style" indexAnswer="${this.number}">
                <div class="main__comments_all_form_photo">${this.img}</div>
                <div class="main__comments_all_form_comment">
                    <div class="main__comments_all_form_comment-block">   
                        <span class="main__comments_all_form_comment_name">${this.name}</span>
                        <div class="main__comments_all-comments_content_menu_answer mob"><img src="images/svg/answer.svg" alt="стрелка ответа" class="main__comments_all-comments_content_menu_img">${this.answer}</div>
                        <span class="main__comments_all-comments_content-block_data">${this.date}</span>
                    </div>     
                    <div class="main__comments_all-comments_content_text">
                        <p class="main__comments_all-comments_content_text-block main__comments_all-comments_answers_text">
                        ${this.content}
                        </p>
                    </div>
                    <div class="main__comments_all-comments_content_menu mob">
                        <div class="main__comments_all-comments_content_menu_like-Favorites answer"><img src="images/svg/likeP.svg" alt="избранное" class="main__comments_all-comments_content_menu_img">В избранное</div>
                        <div class="main__comments_all-comments_content_menu_like"><div class="main__comments_all-comments_content_menu_like_minus"><span>-</span></div><div class="main__comments_all-comments_content_menu_like_num-answer">${this.like}</div><div class="main__comments_all-comments_content_menu_like_plus"><span>+</span></div></div>
                    </div>
                </div>
            </div>
        `;
        elementComment.insertAdjacentHTML('afterend', newAnswer);
    }
}
