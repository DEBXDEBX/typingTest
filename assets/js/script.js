"use strict";
const TYPE_TEST_STORAGE_KEY = "typeTest9292020DEBX";
const skipValue = "skipTheTest12481632641282565161032";
let arrayOfTypeTests;
let currentLine = "David is great.";
let currentArray = [];
let currentArrayIndex = 0;
let testIndex = -243;

// Create elements object
const el = new Elements();
// Pass elements to display
const display = new Display(el, $);
// Create storage
const typeTestStorage = new ArrayStorageLS(TYPE_TEST_STORAGE_KEY);
// Select audio
const cancelAudio = document.querySelector("#cancelAudio");
const correctAudio = document.querySelector("#correctAudio");
const tabAudio = document.querySelector("#tabAudio");
const deleteAudio = document.querySelector("#deleteAudio");
const wrongAudio = document.querySelector("#wrongAudio");
const addTestAudio = document.querySelector("#addTestAudio");
const clickAudio = document.querySelector("#clickAudio");
const restartAudio = document.querySelector("#restartAudio");

//This enables JQuery ToolTips
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
//The start of program exicution.
window.onload = function () {
  startUp();
};

//Start Up
function startUp() {
  arrayOfTypeTests = typeTestStorage.getArrayFromLS();
  //check for empty array
  if (arrayOfTypeTests.length === 0) {
    arrayOfTypeTests = getDefaultData();
    saveAllTests();
  }
  renderTests();
}

// addEventListeners #############################################################
document.addEventListener("keyup", (e) => {
  //skip the test if true
  if (el.lineInputElement.value === skipValue) {
    return;
  }
  const lineInputValue = el.lineInputElement.value;
  const key = e.key;

  // Click the enter key when finished with the line
  if (key === "Enter") {
    if (currentLine === lineInputValue) {
      //You typed the whole line right!!!!
      correctAudio.play();
      getNewLine();
      return;
    } else {
      //Try again
      wrongAudio.play();
      return;
    }
  }
  // check if input is equal to sliced current line
  const length = lineInputValue.length;
  const editedText = currentLine.slice(0, length);
  if (lineInputValue !== editedText) {
    // You hit the wrong key
    el.lineInputElement.style.color = "red";
    cancelAudio.play();
    return;
  }
  el.lineInputElement.style.color = "black";
}); //End

el.typeTestList.addEventListener("click", (e) => {
  //check if control was down, if so delete
  if (e.ctrlKey) {
    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);
    if (isNaN(index)) {
      return;
    }
    testIndex = index;
    // arrayOfTabs.splice(testIndex, 1);
    arrayOfTypeTests.splice(testIndex, 1);
    deleteAudio.play();
    display.showAlert("A test was deleted", "success", 1500);
    // save
    saveAllTests();

    if (arrayOfTypeTests.length === 0) {
      typeTestStorage.clearFileFromLocalStorage();
      startUp();
      saveAllTests();
      return;
    }
    renderTests();
    return;
  }

  // event delegation
  if (e.target.classList.contains("typeTest")) {
    const element = document.querySelector(".typeTest.active");
    if (element) {
      element.classList.remove("active");
    }

    // add active class
    e.target.classList.add("active");

    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);
    if (isNaN(index)) {
      return;
    }
    testIndex = index;
    tabAudio.play();

    display.displayTestArea();
    loadTestData();
  }
}); //End

el.lineList.addEventListener("click", (e) => {
  if (!e.ctrlKey) {
    display.showAlert(
      "Hold down the control key and click the trash can to delete!",
      "error",
      2500
    );
    wrongAudio.play();
    return;
  }
  //check if control was down, if so delete
  if (e.ctrlKey) {
    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);
    if (isNaN(index)) {
      return;
    }

    arrayOfTypeTests[testIndex].arrayOfStrings.splice(index, 1);
    deleteAudio.play();
    display.showAlert("A line was deleted", "success", 1500);
    // save
    saveAllTests();

    if (arrayOfTypeTests[testIndex].arrayOfStrings.length === 0) {
      // typeTestStorage.clearFileFromLocalStorage();
      // startUp();
      arrayOfTypeTests[testIndex].arrayOfStrings.push(
        arrayOfTypeTests[testIndex].name
      );
      saveAllTests();
    }
    currentArray = arrayOfTypeTests[testIndex].arrayOfStrings;
    display.paintEditList(currentArray);
  }
}); //End

// When you click on the add test icon +
el.addShowFormTypeTest.addEventListener("click", (e) => {
  setSkipTestValue();
  clickAudio.play();
  display.showAddTestForm();
  textTypeTest.focus();
}); //End

// When you click on the edit icon +
el.addShowFormLineEdit.addEventListener("click", (e) => {
  setSkipTestValue();
  // el.lineInputElement.value = "";
  clickAudio.play();
  display.paintEditList(currentArray);
  display.showEditSection();
  textNewLine.focus();
}); //Endg

el.typeTestAddBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const testName = el.textTypeTest.value.trim();

  if (!testName) {
    wrongAudio.play();
    display.showAlert("Please enter a name for the Typing test!", "error");
    return;
  }

  const newTest = new TypeTest(testName);
  newTest.arrayOfStrings.push(newTest.name);
  arrayOfTypeTests.push(newTest);

  addTestAudio.play();
  // sort
  sortArrayByName(arrayOfTypeTests);
  // save
  saveAllTests();
  el.typeTestForm.reset();
  display.showAlert("A new typing test was added", "success", 1500);
  renderTests();
}); //End

el.typeTestCancelBtn.addEventListener("click", (e) => {
  clickAudio.play();
  this.textTypeTest.value = "";
  renderTests();
}); //End

el.addLineAddBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const newLine = el.textNewLine.value.trim();

  if (!newLine) {
    wrongAudio.play();
    display.showAlert(
      "Please enter a line of text for the Typing test!",
      "error"
    );
    return;
  }

  arrayOfTypeTests[testIndex].arrayOfStrings.push(newLine);

  addTestAudio.play();
  // save
  saveAllTests();
  el.lineForm.reset();
  display.showAlert(
    "A new line was added to the typing test.",
    "success",
    1500
  );
  display.paintEditList(currentArray);
}); //End

el.exitEditBtn.addEventListener("click", (e) => {
  this.textNewLine.value = "";
  loadTestData();
  clickAudio.play();
  display.hideEditSection();
}); //End

//Helper Functions ###########################################################
const saveAllTests = () => {
  typeTestStorage.saveArrayToLS(arrayOfTypeTests);
}; //End saveAllTests()
const loadTestData = () => {
  el.lineInputElement.value = "";
  currentArray = arrayOfTypeTests[testIndex].arrayOfStrings;
  currentArrayIndex = 0;
  currentLine = currentArray[currentArrayIndex];
  display.writeLine(currentLine);
  display.writeLineNumber(
    `Line ${currentArrayIndex + 1} of ${currentArray.length}`
  );
}; //End loadTestData()
const getDefaultData = () => {
  display.showAlert("Loading default data.", "success", 2000);
  const array = [];
  const defaultArrayOne = [
    "I never thought you'd hurt me.",
    "I guess you live and learn.",
    "That when you're playin' with fire you're bound to get burned.",
    "I've been mistreated, I've been used before.",
    "I get kicked in the face still I come back for more.",
    "But I won't cry no more 'cause the tears are all in vain.",
    "We can pick up the pieces and start it all again.",
    "Let's just get back to the way it was before.",
    "Oh, girl I can't take anymore.",
    "Baby, don't treat me bad.",
  ];
  const defaultArrayTwo = [
    "git init",
    "git status",
    "git add .",
    'git commit -m "first commit"',
    "git log",
    "git branch newTestBranch",
    "git checkout newTestBranch",
    'git commit -m "new branch commit"',
    "git checkout master",
    "git merge newTestBranch",
    "git branch -d newTestBranch",
    "git --version",
  ];
  const nameOne = "Don't treat me bad";
  const nameTwo = "git";
  const defaultOne = new TypeTest(nameOne, defaultArrayOne);
  const defaultTwo = new TypeTest(nameTwo, defaultArrayTwo);

  array.push(defaultOne);
  array.push(defaultTwo);
  return array;
}; // End getDefaultData()

// create a new array with only the items name
function mapNamesOut(array) {
  const mapedArray = array.map((item) => item.name);
  return mapedArray;
} // End mapNamesOut(array)

// Sort an array by it's name
function sortArrayByName(array) {
  array.sort(function (a, b) {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be eimagePathual
    return 0;
  }); //End sort function
} // End sortArrayByName(array)

const getNewLine = () => {
  // Function to set new line and clear input
  if (currentArrayIndex === currentArray.length - 1) {
    currentArrayIndex = 0;
    currentLine = currentArray[currentArrayIndex];
    display.writeLine(currentLine);
    display.writeLineNumber(
      `Line ${currentArrayIndex + 1} of ${currentArray.length}`
    );
    el.lineInputElement.value = "";
    restartAudio.play();
    display.showAlert("Great Job! Restarting test.", "success", 2000);
  } else {
    currentArrayIndex++;
    currentLine = currentArray[currentArrayIndex];
    display.writeLine(currentLine);
    display.writeLineNumber(
      `Line ${currentArrayIndex + 1} of ${currentArray.length}`
    );
    el.lineInputElement.value = "";
  }
}; //End getNewLine()

// Paint tests
const renderTests = () => {
  display.paintTypeTests(mapNamesOut(arrayOfTypeTests));
};

const setSkipTestValue = () => {
  el.lineInputElement.value = skipValue;
};
