class Elements {
  constructor() {
    // Interactive elements
    this.lineOutputElement = document.querySelector("#lineOutput");
    this.lineInputElement = document.querySelector("#lineInput");
    // select message display
    this.messageDisplay = document.querySelector("#displayMessage");
    // select message border
    this.messageBorder = document.querySelector("#modalBorder");

    // select the lists
    this.typeTestList = document.querySelector("#typeTestList");
    this.lineList = document.querySelector("#lineList");
    // select headings
    // this.typeTesttHeading = document.querySelector("#typeTestHeading");
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
    // this.lineCanelBtn = document.querySelector("#lineCanelBtn");

    //Form
    this.typeTestForm = document.querySelector("#typeTestForm");
    this.lineForm = document.querySelector("#lineForm");
    // Text Inputs
    this.textTypeTest = document.querySelector("#textTypeTest");
    this.textNewLine = document.querySelector("#textNewLine");
  }
}
