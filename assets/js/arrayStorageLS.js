class ArrayStorageLS {
  constructor(storageKey) {
    this.fileName = storageKey;
  } // End constructor

  //Method
  saveArrayToLS(obj) {
    let myJSON = JSON.stringify(obj);
    localStorage.setItem(this.fileName, myJSON);
  } // End saveSettings(obj)

  // Method
  getArrayFromLS() {
    //Make a variable for obj
    let obj;
    // Read file
    let textFromFile = localStorage.getItem(this.fileName);

    if (textFromFile) {
      //parse file
      obj = JSON.parse(textFromFile);
    } else {
      obj = [];
      // obj = this.getDefaultData();
    }
    // return obj
    return obj;
  } // End  getSettingsFromFile()

  //Method
  clearFileFromLocalStorage() {
    localStorage.removeItem(this.fileName);
  } // End clearFileFromLocalStorage()
} //End ReminderStorage class
