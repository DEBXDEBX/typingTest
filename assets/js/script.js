"use strict";
const TYPE_TEST_STORAGE_KEY = "typeTest9292020DEBX";
let arrayOfTypeTests;
let currentLine = "David is great.";
let currentArray = [];
let currentArrayIndex = 0;
let testIndex = -243;
let skipTest = false;
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
//The start of program exicution.
window.onload = function () {
  startUp();
};

//Start Up
function startUp() {
  // loadFakeData();
  arrayOfTypeTests = typeTestStorage.getArrayFromLS();
  //check for empty array
  if (arrayOfTypeTests.length === 0) {
    arrayOfTypeTests = getDefaultData();
  }
  renderTests();
}

// addEventListeners #############################################################
document.addEventListener("keyup", (e) => {
  if (skipTest) {
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
    cancelAudio.play();
  }
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
    let tabList = document.getElementsByClassName("typeTest");
    // create an array from an array like object
    let newArray = Array.from(tabList);
    newArray.forEach((item) => {
      item.classList.remove("active");
    });
    // add active class
    e.target.classList.add("active");

    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);
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
    // testIndex = index;
    // arrayOfTabs.splice(testIndex, 1);
    arrayOfTypeTests[testIndex].arrayOfStrings.splice(index, 1);
    // arrayOfTypeTests.splice(testIndex, 1);
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
  clickAudio.play();
  display.showAddTestForm();
  textTypeTest.focus();
}); //End

// When you click on the edit icon +
el.addShowFormLineEdit.addEventListener("click", (e) => {
  skipTest = true;
  el.lineInputElement.value = "";
  clickAudio.play();
  display.paintEditList(currentArray);
  display.showEditSection();
  textNewLine.focus();
}); //End

el.typeTestAddBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const testName = el.textTypeTest.value.trim();

  if (!testName) {
    wrongAudio.play();
    display.showAlert("Please enter a name for the Typing test!", "error");
    return;
  }

  let newTest = new TypeTest(testName);
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
  setTimeout(function () {
    skipTest = false;
  }, 10000);
}); //End

el.typeTestCancelBtn.addEventListener("click", (e) => {
  clickAudio.play();
  this.textTypeTest.value = "";
  renderTests();
  skipTest = false;
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
  skipTest = false;
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
  // el.lineOutputElement.textContent = currentLine;
  display.writeLine(currentLine);
  display.writeLineNumber(
    `Line ${currentArrayIndex + 1} of ${currentArray.length}`
  );
}; //End loadTestData()
const getDefaultData = () => {
  let array = [];
  const defaultArrayOne = [
    "I never thought you'd hurt me",
    "I guess you live and learn",
    "That when you're playin' with fire you're bound to get burned",
    "I've been mistreated, I've been used before",
    "I get kicked in the face still I come back for more",
    "But I won't cry no more 'cause the tears are all in vain",
    "We can pick up the pieces and start it all again",
    "Let's just get back to the way it was before",
    "Oh, girl I can't take anymore",
    "Baby, don't treat me bad",
  ];
  const defaultArrayTwo = [
    "git init",
    "git status",
    "git add .",
    'git commit -m "first commit"',
    "git log",
    "git branch -d newTestBranch",
    "git checkout newTestBranch",
    "git checkout master",
    "git merge newTestBranch",
    "git --version",
  ];
  const nameOne = "Don't treat me bad";
  const nameTwo = "git";
  let defaultOne = new TypeTest(nameOne, defaultArrayOne);
  let defaultTwo = new TypeTest(nameTwo, defaultArrayTwo);

  array.push(defaultOne);
  array.push(defaultTwo);
  return array;
}; // End getDefaultData()

// create a new array with only the items name
function mapNamesOut(array) {
  let mapedArray = array.map((item) => {
    return item.name;
  });
  return mapedArray;
} // End mapNamesOut(array)

// Sort an array by it's name
function sortArrayByName(array) {
  array.sort(function (a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
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
    // el.lineOutputElement.textContent = currentLine;
    display.writeLine(currentLine);
    display.writeLineNumber(
      `Line ${currentArrayIndex + 1} of ${currentArray.length}`
    );
    el.lineInputElement.value = "";
    display.showAlert("Great Job! Restarting test.", "success", 2000);
  } else {
    currentArrayIndex++;
    currentLine = currentArray[currentArrayIndex];
    // el.lineOutputElement.textContent = currentLine;
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
