// замена стрелки в фильтре
const filter = document.querySelector("#filter");
const filterList = document.querySelector(".main__comments_filter_form_list");
const imgLike = filterList.querySelectorAll(".main__comments_filter_form_list_img");
let localComments = JSON.parse(localStorage.getItem("comments"));
let numArrow = 0;
if (localStorage.getItem('numArrow'))
    numArrow = JSON.parse(localStorage.getItem('numArrow'));
loadArrow();
const select = (() => {
    let localSelect = localStorage.getItem("selectOptions");
    let selectOp = 'По дате';
    if (localSelect !== null)
        selectOp = localSelect;
    const options = `
        <option value="По дате">${selectOp}</option>
        <option value="По количеству оценок">По количеству оценок</option>
        <option value="По актуальности">По актуальности</option>
        <option value="По количеству ответов">По количеству ответов</option>
    `;
    filter.insertAdjacentHTML("afterbegin", options);
})();
function createFilter() {
    const listDiv = `
        <div class="main__comments_filter_form_list_listBlock hidden">
        <ul class="main__comments_filter_form_list_listBlock_list">
        <li class="main__comments_filter_form_list_listBlock_list_item active">По дате</li>
        <li class="main__comments_filter_form_list_listBlock_list_item">По количеству оценок</li>
        <li class="main__comments_filter_form_list_listBlock_list_item">По актуальности</li>
        <li class="main__comments_filter_form_list_listBlock_list_item">По количеству ответов</li>
        </ul>
    </div>`;
    const listLocal = localStorage.getItem("filter");
    if (listLocal == null) {
        filterList.insertAdjacentHTML("afterbegin", listDiv);
    }
    else {
        filterList.insertAdjacentHTML("afterbegin", listLocal);
    }
    ;
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
    const listFilterItem = Array.from(listFilterSelect === null || listFilterSelect === void 0 ? void 0 : listFilterSelect.querySelectorAll(".main__comments_filter_form_list_listBlock_list_item"));
    if (listFilterSelect == null)
        return;
    if (listFilterItem == undefined)
        return;
    listFilterItem.forEach((item, index) => {
        item.addEventListener('click', (event) => {
            JSON.stringify(localStorage.setItem("selectOptions", item.textContent));
            event.stopPropagation();
            showFilter();
            filter.options[index].selected = true;
            listFilterItem.forEach(elem => elem.classList.remove('active'));
            item.classList.add('active');
            filter.options[index].selected = true;
            let filterLocal = document.querySelector(".main__comments_filter_form_list_listBlock").outerHTML;
            JSON.stringify(localStorage.setItem("filter", filterLocal));
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
// делаем отображение колличество комментариев
const quantityComments = (() => {
    const blockComments = document.querySelectorAll(".main__comments_all-comments_content");
    const lengthBlockComments = blockComments.length;
    const btnComment = document.querySelector("#comment");
    let valueTextContent = `Комментарии (${lengthBlockComments})`;
    btnComment.innerText = valueTextContent;
})();
// функция счётчик отображения колличества символов в текстовом поле;
function textareaSymbol() {
    const ta = document.querySelector("#inp-text"); // textarea
    const counter = document.querySelector(".main__comments_all_form_comment_symbols"); // счётчик
    const text = `
        <div class="main__comments_all_form_comment_symbols_text">Слишком длинное сообщение</div>
    `;
    const buttonComment = document.querySelector("#inp-submit");
    const btnAnswers = Array.from(document.querySelectorAll(".main__comments_all-comments_content_menu_answer"));
    ta.addEventListener('input', textareaLength);
    btnAnswers.forEach((btn) => {
        btn.addEventListener('click', () => {
            const taAnswer = document.querySelector(".main__comments_all_form_comment_send_inp-text.new_style");
            const counterAnswer = document.querySelector(".main__comments_all_form_comment_symbols.new_style");
            const btnComAnswer = document.querySelector(".main__comments_all_form_comment_send_inp-submit.new_style");
            const formAnswer = document.querySelector(".main__comments_all-comments_ass.active");
            if (taAnswer == null)
                return;
            taAnswer.addEventListener("input", textareaLengthAnswer);
            function textareaLengthAnswer(event) {
                const length = event.target.value.length;
                counterAnswer.textContent = `${length}/1000`;
                const textSp = document.querySelector(".main__comments_all_form_comment_symbols_text");
                if (length > 0) {
                    taAnswer.style.opacity = "100%";
                }
                else {
                    taAnswer.style.opacity = "40%";
                }
                if (length >= 1000) {
                    counterAnswer.style.color = "rgba(255, 0, 0, 1)";
                    counterAnswer.style.opacity = "100%";
                    formAnswer.insertAdjacentHTML("afterbegin", text);
                    btnComAnswer.setAttribute("disabled", '');
                }
                else {
                    counterAnswer.style.color = "rgba(0, 0, 0, 1)";
                    counterAnswer.style.opacity = "40%";
                    btnComAnswer.removeAttribute("disabled");
                }
                if (length > 0 && length <= 1000) {
                    btnComAnswer.style.backgroundColor = "rgba(171, 216, 115, 1)";
                    btnComAnswer.style.color = "rgba(0, 0, 0, 1)";
                    btnComAnswer.style.opacity = "100%";
                }
                else {
                    btnComAnswer.style.opacity = "40%";
                    btnComAnswer.style.backgroundColor = "rgba(161, 161, 161, 1)";
                }
                if (textSp != null)
                    textSp.remove();
            }
        });
    });
    function textareaLength(event) {
        const length = event.target.value.length;
        console.log('length!c: ', length);
        counter.textContent = `${length}/1000`;
        if (length > 0) {
            ta.style.opacity = "100%";
        }
        else {
            ta.style.opacity = "40%";
        }
        if (length >= 1000) {
            counter.style.color = "rgba(255, 0, 0, 1)";
            counter.style.opacity = "100%";
            formComments.insertAdjacentHTML("beforeend", text);
            buttonComment.setAttribute("disabled", '');
        }
        else {
            counter.style.color = "rgba(0, 0, 0, 1)";
            counter.style.opacity = "40%";
            const text = document.querySelector(".main__comments_all_form_comment_symbols_text");
            if (text != null)
                text.remove();
            buttonComment.removeAttribute("disabled");
        }
        if (length > 0 && length <= 1000) {
            buttonComment.style.backgroundColor = "rgba(171, 216, 115, 1)";
            buttonComment.style.color = "rgba(0, 0, 0, 1)";
            buttonComment.style.opacity = "100%";
        }
        else {
            buttonComment.style.opacity = "40%";
            buttonComment.style.backgroundColor = "rgba(161, 161, 161, 1)";
        }
    }
}
textareaSymbol();
// стрелка фильтра
imgLike.forEach((img, index) => {
    img.addEventListener("click", (event) => {
        event.preventDefault();
        showArrows();
        location.reload();
    });
});
function showArrows() {
    if (numArrow == 0) {
        imgLike[1].classList.remove('hidden');
        imgLike[0].classList.add('hidden');
        localComments.reverse();
        localStorage.setItem("comments", JSON.stringify(localComments));
        let newNumArrow = 1;
        localStorage.setItem("numArrow", JSON.stringify(newNumArrow));
    }
    else {
        imgLike[0].classList.remove('hidden');
        imgLike[1].classList.add('hidden');
        localComments.reverse();
        localStorage.setItem("comments", JSON.stringify(localComments));
        let newNumArrow = 0;
        localStorage.setItem("numArrow", JSON.stringify(newNumArrow));
    }
}
function loadArrow() {
    if (numArrow == 0) {
        imgLike[1].classList.remove('hidden');
        imgLike[0].classList.add('hidden');
    }
    else {
        imgLike[0].classList.remove('hidden');
        imgLike[1].classList.add('hidden');
    }
}
