const textarea = document.querySelector('textarea');
let fileName = document.querySelector('.file-name input');
let selectMenu = document.querySelector('.file-save select');
let saveBtn = document.querySelector('.save-btn');

selectMenu.addEventListener('change', () => {
    let selectedOption = selectMenu.options[selectMenu.selectedIndex].text;
    saveBtn.innerText = `Save As ${selectedOption.split(" ")[0]} File`;
})

saveBtn.addEventListener('click', () => {
    const blob = new Blob([textarea.value], {type: selectMenu.value});
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = fileName.value;
    link.href = fileUrl;
    link.click();
})