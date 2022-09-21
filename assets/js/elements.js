class Elements {
  constructor() {
    // Interactive elements
    this.lineOutputElement = document.querySelector("#lineOutput");
    this.lineInputElement = document.querySelector("#lineInput");
    this.lineNumberElement = document.querySelector("#lineNumber");
    // select message display
    this.messageDisplay = document.querySelector("#displayMessage");
    // select message border
    this.messageBorder = document.querySelector("#modalBorder");
    // select the lists
    this.typeTestList = document.querySelector("#typeTestList");
    this.lineList = document.querySelector("#lineList");
    // select heading
    this.editHeading = document.querySelector("#editHeading");
    //select Areas
    this.headArea = document.querySelector("#headArea");
    this.testArea = document.querySelector("#testArea");
    this.editArea = document.querySelector("#editArea");
    // select add show forms + / icon
    this.addShowFormTypeTest = document.querySelector("#typeTestAddBtnIcon");
    this.addShowFormLineEdit = document.querySelector("#lineEdit");
    // Buttons
    this.typeTestAddBtn = document.querySelector("#typeTestAddBtn");
    this.typeTestCancelBtn = document.querySelector("#typeTestCancelBtn");
    this.addLineAddBtn = document.querySelector("#addLineAddBtn");
    this.exitEditBtn = document.querySelector("#exitEditBtn");
    //Form
    this.typeTestForm = document.querySelector("#typeTestForm");
    this.lineForm = document.querySelector("#lineForm");
    // Text Inputs
    this.textTypeTest = document.querySelector("#textTypeTest");
    this.textNewLine = document.querySelector("#textNewLine");
    // modal
    this.saveEditedNoteBtn = document.querySelector("#saveEditedNoteBtn");
    this.editNoteCloseBtn = document.querySelector("#editNoteCloseBtn");
    this.noteModalTextArea = document.querySelector("#noteModalTextArea");
  }
}
