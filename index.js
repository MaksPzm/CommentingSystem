"use strict";
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
