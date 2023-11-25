$(function () {
  //Variable declarations
  var currentDayDisplay = document.querySelector("#currentDay");
  var calendarDisplay = document.querySelector("#calendar");
  var timeBlocks = document.querySelectorAll(".time-block");
  var saveButtons = document.querySelectorAll(".saveBtn");
  var clearButton = document.querySelector("#clearBtn");

  //Gets current date and hour
  var date = dayjs();
  var currentHour = dayjs().hour();

  //Displays current date on the page
  $(currentDayDisplay).text(date.format("MMMM D, YYYY"));

  //Renders colors on the calendar when the page is loaded based on current time
  setCalendarDisplay();
  //Renders description on calendar when the page is loaded
  renderDescription();

  //When save button clicked, save description to local storage
  function handleSubmit() {
    var parentID = $(this).parent().attr("id");

    var descriptionBox = $("#" + parentID).children(".description");

    var description = descriptionBox.val();

    localStorage.setItem("Description-" + parentID, description);

    setCalendarDisplay();
    renderDescription();
  }

  //Renders colors on the calendar when the page is loaded based on current time
  function setCalendarDisplay() {
    for (let i = 0; i < timeBlocks.length; i++) {
      var timeBlock = $(timeBlocks[i]);
      var timeBlockID = $(timeBlocks[i]).attr("id");
      var hour = parseInt(timeBlockID);

      if (currentHour > hour) {
        timeBlock.addClass("past");
      } else if (currentHour === hour) {
        timeBlock.addClass("present");
      } else {
        timeBlock.addClass("future");
      }
    }
  }

  //Renders description on calendar when the page is loaded
  function renderDescription() {
    for (let i = 0; i < timeBlocks.length; i++) {
      //Gets current time block
      var timeBlockID = $(timeBlocks[i]).attr("id");
      var description = $(timeBlocks[i]).children(".description");
      var timeBlockDescription = localStorage.getItem(
        "Description-" + timeBlockID
      );

      description.text(timeBlockDescription);
    }
  }

  //When clear button clicked, clear local storage
  function handleClear() {
    for (let i = 0; i < timeBlocks.length; i++) {
      var timeBlockID = $(timeBlocks[i]).attr("id");
      var clear = " ";

      localStorage.setItem("Description-" + timeBlockID, clear);
    }

    renderDescription();
  }

  //Adds listener to each button in the calendar
  for (let i = 0; i < saveButtons.length; i++) {
    saveButtons[i].addEventListener("click", handleSubmit);
  }

  //Adds listener to clear button
  clearButton.addEventListener("click", handleClear);
});
