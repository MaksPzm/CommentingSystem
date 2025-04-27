// замена стрелки в фильтре
const filter = document.querySelector("#filter");
const filterList = document.querySelector(".main__comments_filter_form_list");
const imgLike = filterList.querySelectorAll(".main__comments_filter_form_list_img");
filterList.addEventListener("click", showArrow);
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
            showArrow();
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
