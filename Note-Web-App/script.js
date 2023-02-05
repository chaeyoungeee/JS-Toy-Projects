const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p")
closedIcon = document.querySelector("header i"),
titleTag = document.querySelector("input"),
descTag = document.querySelector("textarea"),
addBtn = document.querySelector("button");
let isUpdate = false, updateId;

const months = ["January","February","March","April","May","June","July",
"August","September","October","November","December"];
const notes = JSON.parse(localStorage.getItem('notes') || '[]');

addBox.addEventListener('click', ()=>{
    titleTag.focus(); // title에 포커스
    popupBox.classList.add('show');
});

closedIcon.addEventListener('click', ()=>{
    isUpdate = false;
    titleTag.value = '';
    descTag.value = '';
    addBtn.innerText = "Add note";
    popupTitle.innerText = "Add a new note";
    popupBox.classList.remove('show');
});

function showNotes() {
    document.querySelectorAll('.note').forEach(note=>note.remove());
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${index},'${note.title}','${note.description}')"><i class="uil uil-pen"></i> Edit</li>
                                    <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i> Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML('afterend', liTag);
    });
}
showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add('show');
    document.addEventListener('click', e => {
        if(e.target.tagName != 'I' || e.target != elem) {
            elem.parentElement.classList.remove('show');
        }
    });
}

function updateNote(noteId, title, desc){
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update note";
    popupTitle.innerText = "Update a note";
}

function deleteNote(noteId){
    notes.splice(noteId, 1); // 선택된 노트 삭제
    localStorage.setItem('notes', JSON.stringify(notes)); // 로컬스토리지에 노트 업데이트
    showNotes();
}

addBtn.addEventListener('click', e=>{
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;

    if(noteTitle || noteDesc) {
        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day} ${year}`
        }

        if (!isUpdate) {
            notes.push(noteInfo); // 새로운 노트 추가
        }
        else {
            notes[updateId] = noteInfo; // 노트 업데이트
            isUpdate = false;
        }

        localStorage.setItem('notes', JSON.stringify(notes));
        closedIcon.click();
        showNotes();
    }
});
