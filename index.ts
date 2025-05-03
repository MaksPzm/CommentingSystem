// замена стрелки в фильтре
const filter: HTMLSelectElement = <HTMLSelectElement>document.querySelector("#filter");
const filterList: HTMLDivElement = <HTMLDivElement>document.querySelector(".main__comments_filter_form_list");
const imgLike: NodeListOf<Element> = filterList.querySelectorAll(".main__comments_filter_form_list_img");

filterList.addEventListener("click", showArrow);

const select = ((): void => {
    
    let localSelect: string | null = localStorage.getItem("selectOptions");
    let selectOp = 'По дате';
    if (localSelect !== null) selectOp = localSelect; 
    const options = `
        <option value="По дате">${selectOp}</option>
        <option value="По количеству оценок">По количеству оценок</option>
        <option value="По актуальности">По актуальности</option>
        <option value="По количеству ответов">По количеству ответов</option>
    `;
    filter.insertAdjacentHTML("afterbegin", options);
})()

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
        <li class="main__comments_filter_form_list_listBlock_list_item active">По дате</li>
        <li class="main__comments_filter_form_list_listBlock_list_item">По количеству оценок</li>
        <li class="main__comments_filter_form_list_listBlock_list_item">По актуальности</li>
        <li class="main__comments_filter_form_list_listBlock_list_item">По количеству ответов</li>
        </ul>
    </div>` 
    const listLocal: string | null = localStorage.getItem("filter");
    if (listLocal == null) {
        filterList.insertAdjacentHTML("afterbegin", listDiv)
    } else {
        filterList.insertAdjacentHTML("afterbegin", listLocal);
    };
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
    const listFilterItem: Element[] | undefined = Array.from(listFilterSelect?.querySelectorAll(".main__comments_filter_form_list_listBlock_list_item"));
   
    if (listFilterSelect == null) return;
    if (listFilterItem == undefined) return;
    listFilterItem.forEach((item, index) => {
        item.addEventListener('click', (event) => {
            JSON.stringify(localStorage.setItem("selectOptions", item.textContent));
            event.stopPropagation()
            showFilter()
            showArrow()
            filter.options[index].selected = true;
            listFilterItem.forEach(elem => elem.classList.remove('active'));
            item.classList.add('active');
            filter.options[index].selected = true;
            let filterLocal: string = document.querySelector(".main__comments_filter_form_list_listBlock").outerHTML;
            JSON.stringify(localStorage.setItem("filter", filterLocal)); 
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

// делаем отображение колличество комментариев
const quantityComments = ((): void => {
    const blockComments = document.querySelectorAll(".main__comments_all-comments_content");
    const lengthBlockComments = blockComments.length;
    const btnComment: HTMLButtonElement = document.querySelector("#comment");
    let valueTextContent = `Комментарии (${lengthBlockComments})`;
    btnComment.innerText = valueTextContent;
})()

// функция счётчик отображения колличества символов в текстовом поле;
function textareaSymbol(): void {
    const ta: HTMLTextAreaElement = document.querySelector("#inp-text"); // textarea
    const counter: HTMLSpanElement = document.querySelector(".main__comments_all_form_comment_symbols"); // счётчик
    const text = `
        <div class="main__comments_all_form_comment_symbols_text">Слишком длинное сообщение</div>
    `;
    const buttonComment = document.querySelector("#inp-submit");
    ta.addEventListener('input', (event: any) => {
        const length = event.target.value.length;
        counter.textContent = `${length}/1000`;
        if (length > 0) {
            ta.style.opacity = "100%";
        } else {
            ta.style.opacity = "40%";
        }
        if (length >= 1000) {
            counter.style.color = "rgba(255, 0, 0, 1)";
            counter.style.opacity = "100%";
            formComments.insertAdjacentHTML("beforeend", text);
            buttonComment.setAttribute("disabled", '');
        } else {
            counter.style.color = "rgba(0, 0, 0, 1)";
            counter.style.opacity = "40%";
            const text = document.querySelector(".main__comments_all_form_comment_symbols_text").remove();
            buttonComment.removeAttribute("disabled");
        }
    })
}

textareaSymbol()


// доделать колличество символов у ответов