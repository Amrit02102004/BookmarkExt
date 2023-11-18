// content.js
(function() {
    var openedFolders = [];
    var altKeyDownTime = 0;
    var altKeyTimeout;
  
    document.addEventListener('keydown', function(event) {
      if (event.altKey && !event.repeat) {
        altKeyDownTime = Date.now();
        altKeyTimeout = setTimeout(function() {
          showKeyAssignments();
        }, 2000); // Adjust the duration for holding Alt as needed
      }
    });
  
    document.addEventListener('keyup', function(event) {
      if (event.key === 'Alt') {
        clearTimeout(altKeyTimeout);
  
        // Check the duration of Alt key press
        var altKeyUpTime = Date.now();
        var altPressDuration = altKeyUpTime - altKeyDownTime;
  
        if (altPressDuration >= 2000) {
          showKeyAssignments();
        }
      }
    });
  
    // Helper function to handle folder items
    function handleFolderItems(folder) {
      // Retrieve items within the folder
      var folderItems = folder.querySelectorAll('.bookmark');
      
      // Display a prompt to select a sub-item
      var promptMessage = 'Select a sub-item:\n';
      for (var i = 0; i < folderItems.length; i++) {
        promptMessage += `${i + 1}. ${folderItems[i].innerText}\n`;
      }
  
      var subItemIndex = prompt(promptMessage);
  
      // Check if the selected sub-item index is valid
      if (isNumeric(subItemIndex) && subItemIndex > 0 && subItemIndex <= folderItems.length) {
        // Simulate a click on the selected sub-item
        folderItems[subItemIndex - 1].click();
      }
    }
  
    // Helper function to check if a string is numeric
    function isNumeric(str) {
      return /^\d+$/.test(str);
    }
  
    // Helper function to get the next key from the event
    function getNextKey(event) {
      var nextKeyIndex = event.location === 3 ? 2 : 0;
      return event.code.substring(nextKeyIndex, nextKeyIndex + 1);
    }
  
    // Helper function to show key assignments in a tooltip
    function showKeyAssignments() {
      var bookmarkItems = document.querySelectorAll('#bookmarkBar > .bookmark');
      
      // Display a tooltip with key assignments for each bookmark
      var tooltip = document.createElement('div');
      tooltip.style.position = 'fixed';
      tooltip.style.top = '10px';
      tooltip.style.left = '10px';
      tooltip.style.backgroundColor = '#fff';
      tooltip.style.padding = '10px';
      tooltip.style.border = '1px solid #ccc';
      tooltip.style.zIndex = '9999';
  
      for (var i = 0; i < bookmarkItems.length; i++) {
        var keyAssignment = document.createElement('div');
        keyAssignment.innerText = `${i + 1}. ${bookmarkItems[i].innerText}`;
        tooltip.appendChild(keyAssignment);
      }
  
      document.body.appendChild(tooltip);
  
      // Clear the tooltip after a delay
      setTimeout(function() {
        document.body.removeChild(tooltip);
      }, 5000); // Adjust the delay as needed
    }
  })();
  