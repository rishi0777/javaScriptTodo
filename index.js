let form = document.getElementById("form");
let noteTitle = document.getElementById("title");
let description = document.getElementById("description");
let notes = document.getElementById("notesBody");
let row = document.getElementById("row0");
let data = [];
let id = 0;

//what will happen when user clicks on addNote button of form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

//for resetting the values of form to empty after note is added successfully
let resetForm = () => {
  noteTitle.value = "";
  description.value = "";
};

//for validating the form
const formValidation = () => {
  if (noteTitle.value === "") {
    alert("Please fill the title it should not ne kept blank");
    // console.log("failure");
  } else {
    // console.log("successs");
    acceptData();
  }
};

//adding the new note in local storage
const acceptData = () => {
  const newNote = {
    id: id++,
    text: noteTitle.value,
    note: description.value,
    date: new Date().toLocaleString(),
  };
  data.push(newNote);
  localStorage.setItem("data", JSON.stringify(data));
  displayNotes(data);
};

//for displaying all the notes that are present in local storage in noteBody section of html
const displayNotes = (data, editFlag = false) => {
  //first making the noteBody empty if data has something inside it else
  //assigning it the value add notes to see them
  data.length > 0
    ? (notes.innerHTML = "")
    : (notes.innerHTML = "Add notes to see them");

  // then fetching all the notes from localStorage and appending these notes
  // as child elements of noteBody section of html
  data.map((x, idx) => {
    let rowClass = "row" + parseInt(idx / 4);
    // console.log("index " + idx + " row " + rowClass);
    row = document.getElementById(`${rowClass}`);

    if (idx % 4 == 0) {
      return (notes.innerHTML += `
      <div class="rowOfNotes" id=row${idx / 4}>
        <div class="singleNote" id=${x.id}>
          <div class="noteTitle">${x.text}</div>
          <div class="noteDescription">${x.note}</div>
          <div class="noteDate">Date: ${x.date}</div>
          <br/>
          <div class="buttonOptions">
            <button  onClick= "deleteNote(${
              x.id
            })"  class="btn btn-danger">Delete</button>
            <button  onClick= "editNote(${
              x.id
            })" class="btn btn-success">Edit</button>
          </div>
        </div>
       </div>`);
    } else {
      return (row.innerHTML += `
      <div class="singleNote" id=${x.id}>
        <div class="noteTitle">${x.text}</div>
        <div class="noteDescription">${x.note}</div>
        <div class="noteDate">Date: ${x.date}</div>
        <br/>
        <div class="buttonOptions">
          <button  onClick= "deleteNote(${x.id})"  class="btn btn-danger">Delete</button>
          <button  onClick= "editNote(${x.id})" class="btn btn-success">Edit</button>
        </div>
      </div>`);
    }
  });

  if (editFlag == false) {
    resetForm();
  }
};

//to delete a note from localStorage
const deleteNote = (id, editFlag = false) => {
  let modifiedData = data.filter((obj) => id !== obj.id);
  localStorage.setItem("data", JSON.stringify(modifiedData));
  data = modifiedData;
  displayNotes(data, editFlag);
};

//to edit a note of localStorage
const editNote = (id) => {
  let editObj = data.filter((obj) => id === obj.id);
  editObj = editObj[0];
  // console.log(editObj);
  noteTitle.value = editObj.text;
  description.value = editObj.note;
  //here we have passed editFlag as true so that the content which we have
  //set in notes does not get reset to empty
  deleteNote(id, true);
};

//display content initially--> this function will be invoked automatically
//when html and css of page gets loaded
(() => {
  // parse converts json to javascript object
  // localStorage.removeItem("data");
  data = JSON.parse(localStorage.getItem("data")) || [];

  //inorder to make sure id always start from last id value of all notes
  // present in local storage
  for (x of data) {
    if (id <= x.id) id = x.id + 1;
  }

  displayNotes(data);
})();
