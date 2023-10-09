// dimensions
const COLS = 26;
const ROWS = 100;

// constants
const transparent = "transparent";
const transparentBlue = "#ddddff";
const arrMatrix = 'arrMatrix';

// table components
const tHeadRow = document.getElementById("table-heading-row");
const tBody = document.getElementById("table-body");
const currentCellHeading = document.getElementById("current-cell");
const sheetNo = document.getElementById('sheet-no');
const buttonContainer = document.getElementById('button-container');

// excel buttons
const boldBtn = document.getElementById("bold-btn");
const italicsBtn = document.getElementById("italics-btn");
const underlineBtn = document.getElementById("underline-btn");
const leftBtn = document.getElementById("left-btn");
const centerBtn = document.getElementById("center-btn");
const rightBtn = document.getElementById("right-btn");
const cutBtn = document.getElementById('cut-btn');
const copyBtn = document.getElementById('copy-btn');
const pasteBtn = document.getElementById('paste-btn');
const uploadInput = document.getElementById('upload-input');
const addSheetBtn = document.getElementById('add-sheet-btn');
const saveSheetBtn = document.getElementById('save-sheet-btn');

// dropdown
const fontStyleDropdown = document.getElementById("font-style-dropdown");
const fontSizeDropdown = document.getElementById("font-size-dropdown");

// input tags
const bgColorInput = document.getElementById("bgColor");
const fontColorInput = document.getElementById("fontColor");

// cache
let currentCell;
let previousCell;
let cutCell; // this cutCell will store my cell data;
let lastPressBtn;
let matrix = new Array(ROWS);
let numSheets=1; // size
let currentSheet = 1; // index
let prevSheet;

function createNewMatrix() {
  for (let row = 0; row < ROWS; row++) {
    matrix[row] = new Array(COLS);
    // matrix[0] -> 1st
    // matrix[1] -> 2nd
    // matrix[row] -> matrix[0]-> matrix[99]
    for (let col = 0; col < COLS; col++) {
      matrix[row][col] = {};
    }
  }
}
// this is creating matrix for the first time
createNewMatrix();

function colGen(typeOfCell, tableRow, isInnerText, rowNumber) {
  for (let col = 0; col < COLS; col++) {
    const cell = document.createElement(typeOfCell);
    //   A,B,C,D
    // 0 -> 'A'
    // 0 -> 65 -> ascii char of 65
    //   fromCharCode will conver my dec to char
    // refer -> https://www.commfront.com/pages/ascii-chart
    if (isInnerText) {
      cell.innerText = String.fromCharCode(col + 65);
      cell.setAttribute("id", String.fromCharCode(col + 65));
    } else {
      // COL -> A,B,C,D
      cell.setAttribute("id", `${String.fromCharCode(col + 65)}${rowNumber}`);
      cell.setAttribute("contenteditable", true);
      cell.addEventListener('input',updateObjectInMatrix);
      //   event.target is my currentCell
      cell.addEventListener("focus", (event) => focusHandler(event.target));
    }
    tableRow.append(cell);
  }
}
// this is for heading
colGen("th", tHeadRow, true);

// colRow -> row,col
// A1 -> 0,0
// A2 -> 1,0
function updateObjectInMatrix() {
  // console.log(matrix[0][0]);
  let id = currentCell.id;
  // id[0] -> 'A' -> 'A'.charCodeAt(0) -> 65
  let col = id[0].charCodeAt(0) - 65;
  let row = id.substring(1) - 1;
  matrix[row][col] = {
    text: currentCell.innerText,
    style: currentCell.style.cssText,
    id: id, // why we are storing ids, we will see that later
  };
}

function setHeaderColor(colId, rowId, color) {
  const colHead = document.getElementById(colId);
  const rowHead = document.getElementById(rowId);
  colHead.style.backgroundColor = color;
  rowHead.style.backgroundColor = color;
}

function downloadMatrix() {
  // 2d matrix into a memory that's accessible outside
  const matrixString = JSON.stringify(matrix);
  // matrixString -> into a blob
  const blob = new Blob([matrixString],{ type: 'application/json'});
  console.log(blob);
  const link = document.createElement('a');
  // createObjectURL converts my blob to link
  link.href = URL.createObjectURL(blob);
  link.download = 'table.json';
  link.click();
}

function uploadMatrix(event) {
  const file = event.target.files[0];
  // FileReader helps me to read my blod
  if(file){
    const reader = new FileReader();
    reader.readAsText(file);
    // readAsText will trigger onload method
    // of reader instance
    reader.onload = function(event){
      const fileContent=JSON.parse(event.target.result);
      // console.log(fileContent);
      // update virtual memory
      matrix = fileContent;
      renderMatrix();
    }
  }
}

uploadInput.addEventListener('input',uploadMatrix);

// button -> boldbtn,italicsbtn
// styleProperty -> fontWeight, textdecoration
// style -> 'bold,italics
// if (currentCell.style.fontWeight === "bold") {
//   boldBtn.style.backgroundColor = transparentBlue;
// } else {
//   boldBtn.style.backgroundColor = transparent;
// }

function buttonHighlighter(button, styleProperty, style) {
  if (currentCell.style[styleProperty] === style) {
    button.style.backgroundColor = transparentBlue;
  } else {
    button.style.backgroundColor = transparent;
  }
}

function focusHandler(cell) {
  // console.log(cell.style);
  currentCell = cell;
  if (previousCell) {
    // set header colors as transparent
    setHeaderColor(
      previousCell.id[0],
      previousCell.id.substring(1),
      transparent
    );
  }
  // setting bold button according to cell font weight
  // if (currentCell.style.fontWeight === "bold") {
  //   boldBtn.style.backgroundColor = transparentBlue;
  // } else {
  //   boldBtn.style.backgroundColor = transparent;
  // }
  // function buttonHighlighter(button, styleProperty, style)
  buttonHighlighter(boldBtn, "fontWeight", "bold");
  buttonHighlighter(italicsBtn, "fontStyle", "italic");
  buttonHighlighter(underlineBtn, "textDecoration", "underline");
  // setting italics button according to cell font style
  // if (currentCell.style.fontStyle === "italic") {
  //   italicsBtn.style.backgroundColor = transparentBlue;
  // } else {
  //   italicsBtn.style.backgroundColor = transparent;
  // }
  // if (currentCell.style.textDecoration === "underline") {
  //   underlineBtn.style.backgroundColor = transparentBlue;
  // } else {
  //   underlineBtn.style.backgroundColor = transparent;
  // }

  //   A1 ->
  // A-> cell.id[0];
  // 11 -> cell.id[0].substring(1)
  setHeaderColor(cell.id[0], cell.id.substring(1), transparentBlue);
  currentCellHeading.innerText = cell.id + " " + "selected";
  previousCell = currentCell;
}

function tableBodyGen(){
  // cleanup my table body
  tBody.innerHTML='';
  for (let row = 1; row <= ROWS; row++) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.innerText = row;
    th.setAttribute("id", row);
    tr.append(th);
    //   for (let col = 0; col < COLS; col++) {
    //     const td = document.createElement("td");
    //     tr.append(td);
    //   }
    //   this is for empty cell
    colGen("td", tr, false, row);
    tBody.append(tr);
  }
}
// creating table for the first time
tableBodyGen();


if(localStorage.getItem(arrMatrix)){
  matrix=JSON.parse(localStorage.getItem(arrMatrix))[0];
  renderMatrix();
}

// once you click on any cell
// headers get highlighted
// and when you click on any other cell
// the previous headers color should go away

boldBtn.addEventListener("click", () => {
  if (currentCell.style.fontWeight === "bold") {
    currentCell.style.fontWeight = "normal";
    boldBtn.style.backgroundColor = transparent;
  } else {
    currentCell.style.fontWeight = "bold";
    boldBtn.style.backgroundColor = transparentBlue;
  }
  updateObjectInMatrix();
});

italicsBtn.addEventListener("click", () => {
  if (currentCell.style.fontStyle === "italic") {
    currentCell.style.fontStyle = "normal";
    italicsBtn.style.backgroundColor = transparent;
  } else {
    currentCell.style.fontStyle = "italic";
    italicsBtn.style.backgroundColor = transparentBlue;
  }
  updateObjectInMatrix();
});

underlineBtn.addEventListener("click", () => {
  if (currentCell.style.textDecoration === "underline") {
    currentCell.style.textDecoration = "none";
    underlineBtn.style.backgroundColor = transparent;
  } else {
    currentCell.style.textDecoration = "underline";
    underlineBtn.style.backgroundColor = transparentBlue;
  }
  updateObjectInMatrix();
});

// homework, make these three EventListeners more readable or use a common function for
// all the style buttons

leftBtn.addEventListener("click", () => {
  currentCell.style.textAlign = "left";
  updateObjectInMatrix();
});

rightBtn.addEventListener("click", () => {
  currentCell.style.textAlign = "right";
  updateObjectInMatrix();
});

centerBtn.addEventListener("click", () => {
  currentCell.style.textAlign = "center";
  updateObjectInMatrix();
});

// Q -> can we use buttonHighlighter for left, right and center?
// if yes please do
fontStyleDropdown.addEventListener("change", () => {
  // event.target ?????? -> fontStyleDropdown
  currentCell.style.fontFamily = fontStyleDropdown.value;
  updateObjectInMatrix();
});

fontSizeDropdown.addEventListener("change", () => {
  currentCell.style.fontSize = fontSizeDropdown.value;
  updateObjectInMatrix();
});

// input will take your every action
bgColorInput.addEventListener("input", () => {
  currentCell.style.backgroundColor = bgColorInput.value;
  updateObjectInMatrix();
});

fontColorInput.addEventListener("input", () => {
  currentCell.style.color = fontColorInput.value;
  updateObjectInMatrix();
});

// homework
// https://stackoverflow.com/questions/2141357/editable-select-element

// Q -> can we use buttonHighlighter for left, right and center?
// if yes please do

// homework, make these three EventListeners more readable or use a common function for
// all the style buttons

//     cell1 data -> cell2 data
//      empty  -> this will be having cell1 data -> in case of cut
//      cell1data -> cell1data in case of copy

cutBtn.addEventListener('click',()=>{
  lastPressBtn='cut';
  cutCell = {
    text: currentCell.innerText,
    style: currentCell.style.cssText, // cssText is basically
    // inLine css
  }
  // deleting current cell
  currentCell.innerText='';
  currentCell.style.cssText='';
  updateObjectInMatrix();
})

copyBtn.addEventListener('click',()=>{
  lastPressBtn='copy';
  cutCell={
    text: currentCell.innerText,
    style: currentCell.style.cssText,
  }
})

pasteBtn.addEventListener('click',()=>{
  currentCell.innerText=cutCell.text;
  currentCell.style=cutCell.style;
  // currentCell.style.cssText=cutCell.style;

  // i need to cleanup my cutcell object after paste
  // 
  if (lastPressBtn === "cut") {
    cutCell = undefined;
  }
  updateObjectInMatrix();
})

// emptyObject.property -> undefined
function genNextSheetButton(){
  const btn = document.createElement('button');
  numSheets++;
  currentSheet=numSheets;
  btn.innerText=`Sheet ${currentSheet}`;
  btn.setAttribute('id',`sheet-${currentSheet}`);
  btn.setAttribute('onclick','viewSheet(event)');
  buttonContainer.append(btn);
}

addSheetBtn.addEventListener('click',()=>{
  genNextSheetButton();
  sheetNo.innerText = `Sheet No - ${currentSheet}`;
  // add nextSheetButton
  // Save Matrix -> ✅
  saveMatrix();
  // clean matrix -> ✅
  createNewMatrix();// it's creating matrix again (sort of used as cleaner fn)
  // clean html
  tableBodyGen();
})

// saveMatrix
// arrMatrix -> array for matrix
// I should keep my arrMatrix in localStorage
function saveMatrix() {
  if (localStorage.getItem(arrMatrix)) {
    // pressing add sheet not for the first time
    let tempArrMatrix = JSON.parse(localStorage.getItem(arrMatrix));
    tempArrMatrix.push(matrix);
    localStorage.setItem(arrMatrix, JSON.stringify(tempArrMatrix));
  } else {
    // pressing add sheet for the first time
    let tempArrMatrix = [matrix];
    localStorage.setItem(arrMatrix, JSON.stringify(tempArrMatrix));
  }
}

function renderMatrix() {
  matrix.forEach((row) => {
    row.forEach((cellObj) => {
      if (cellObj.id) {
        let currentCell = document.getElementById(cellObj.id);
        currentCell.innerText = cellObj.text;
        currentCell.style = cellObj.style;
      }
    });
  });
}

function viewSheet(event){
  // save prev sheet before doing anything
  prevSheet=currentSheet;
  currentSheet=event.target.id.split('-')[1];
  let matrixArr = JSON.parse(localStorage.getItem(arrMatrix));
  // save my matrix in local storage
  matrixArr[prevSheet-1] = matrix;
  localStorage.setItem(arrMatrix,JSON.stringify(matrixArr));

  // I have updated my virtual memory
  matrix = matrixArr[currentSheet-1];
  // clean my html table
  tableBodyGen();
  // render the matrix in html
  renderMatrix();
}



// you are trying to save matrix in arrMatrix

// how can you clean up matrix
// option a -> 2d iteration and clean every object
// obtion b -> make 2d matrix



// I have sheet 1, sheet 2, sheet 3 buttons
// get matrix from localStorage
// and render it

// id of button -> sheet-{number}

// [matrix1,matrix2,matrix3]
// sheet-1 -> matrix1
// sheet-2 -> matrix2
// sheet-3 -> matrix3


// arrMatrix -> [matrix1,matrix2,matrix3];

// matrix2 -> that is virtual memory of my table 2

// matrix = matrix2