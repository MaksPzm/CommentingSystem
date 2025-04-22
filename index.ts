// замена стрелки в фильтре
const filter: HTMLSelectElement = <HTMLSelectElement>document.querySelector("#filter");
const filterList: HTMLDivElement = <HTMLDivElement>document.querySelector(".main__comments_filter_form_list");
const imgLike: NodeListOf<Element> = filterList.querySelectorAll(".main__comments_filter_form_list_img");

filterList.addEventListener("click", showArrow);

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
        <li class="main__comments_filter_form_list_listBlock_list_item">По дате</li>
        <li class="main__comments_filter_form_list_listBlock_list_item active">По количеству оценок</li>
        <li class="main__comments_filter_form_list_listBlock_list_item">По актуальности</li>
        <li class="main__comments_filter_form_list_listBlock_list_item">По количеству ответов</li>
        </ul>
    </div>`
    filterList.insertAdjacentHTML("afterbegin", listDiv);
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
    const listFilterItem: NodeListOf<Element> | undefined = listFilterSelect?.querySelectorAll(".main__comments_filter_form_list_listBlock_list_item");
    if (listFilterSelect == null) return;
    if (listFilterItem == undefined) return;
    listFilterItem.forEach((item, index) => {
        item.addEventListener('click', (event) => {
            event.stopPropagation()
            showFilter()
            showArrow() 
            filter.options[index].selected = true;
            listFilterItem.forEach(elem => elem.classList.remove('active'));
            item.classList.add('active');
            filter.options[index].selected = true;
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