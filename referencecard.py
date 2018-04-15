import webbrowser

f = open('EVOCreferencecard.html','w')

message = """<html>
<style>
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}
</style>
<head></head>
<body>
<table>
  <tr>
    <th>Command</th>
    <th>Description</th>
    <th>Phrases</th>
  </tr>
  <tr>
    <td>Add Bookmarks</td>
    <td>This opens the Add Bookmark window to create a bookmark for the current page</td>
    <td>"add bookmark" "create bookmark" "make bookmark"</td>
  </tr>
  <tr>
    <td>Back Webpage</td>
    <td>This goes to the previous webpage</td>
    <td>"previous webpage" "previous page" "webpage back"</td>
  </tr>
  <tr>
    <td>Beginning of Document</td>
    <td>Jumps to the beginning of a Word Document</td>
    <td>"jump to beginning of doc" "jump to beginning"</td>
  </tr>
  <tr>
    <td>Beginning of Line</td>
    <td>Goes to the beginning of a line within Word.</td>
    <td>"go to beginning of line" "start of line"</td>
  </tr>
  <tr>
    <td>Bold</td>
    <td>Bolds text within Word</td>
    <td>"bold" "bold text"</td>
  </tr>
  <tr>
    <td>Center Text</td>
    <td>Centers text within Word</td>
    <td>"center paragraph" "center"</td>
  </tr>
  <tr>
    <td>Close All Tabs</td>
    <td>Closes all tabs in current window</td>
    <td>"close all" "close all tabs"</td>
  </tr>
  <tr>
    <td>Close Tab</td>
    <td>Closes current browser tab</td>
    <td>"close tab"</td>
  </tr>
  <tr>
    <td>Close Window</td>
    <td>Closes current window</td>
    <td>"close window"</td>
  </tr>
  <tr>
    <td>Close Word Document</td>
    <td>Closes current word document</td>
    <td>"close document" "close word document" "close doc" "close word doc"</td>
  </tr>
  <tr>
    <td>Decrease Font</td>
    <td>Decreases font size in Word</td>
    <td>"smaller font size" "smaller font" "decrease font size" "decrease font"</td>
  </tr>
  <tr>
    <td>Down Arrow</td>
    <td>Presses the down arrow key</td>
    <td>"arrow down"</td>
  </tr>
  <tr>
    <td>End of Document</td>
    <td>Jumps to the end of the document in Word</td>
    <td>"jump to end of doc" "jump to end"</td>
  </tr>
  <tr>
    <td>End of Line</td>
    <td>Goes to end of the line within Word</td>
    <td>"go to end of line" "jump to end of line"</td>
  </tr>
  <tr>
    <td>Enter</td>
    <td>Presses the Enter key</td>
    <td>"enter"</td>
  </tr>
  <tr>
    <td>Escape</td>
    <td>Presses the Escape key</td>
    <td>"escape"</td>
  </tr>
  <tr>
    <td>Find</td>
    <td>Emulates 'control find' keys</td>
    <td>"find" "control find"</td>
  </tr>
  <tr>
    <td>Forward Webpage</td>
    <td>This goes to the next webpage on the browser (the forward button)</td>
    <td>"next webpage" "next page" "webpage forward"</td>
  </tr>
  <tr>
    <td>Fullscreen</td>
    <td>Makes current window fullscreen</td>
    <td>"fullscreen" "show fullscreen"</td>
  </tr>
  <tr>
    <td>Goto Link</td>
    <td>When searching the web, use this command for quick access. Say a unique word in a search result to visit the link corresponding to the search result</td>
    <td>"go to {unique word}"</td>
  </tr>
  <tr>
    <td>Increase Font</td>
    <td>Increases font size in Word</td>
    <td>"larger font" "increase font" "bigger font" "bigger font size" "increase font size"</td>
  </tr>
  <tr>
    <td>Indent</td>
    <td>Indents text in Word</td>
    <td>"indent paragraph" "indent"</td>
  </tr>
  <tr>
    <td>Italic</td>
    <td>Italicizes text within Word</td>
    <td>"italicize" "make italic"</td>
  </tr>
  <tr>
    <td>Jump to Address Bar</td>
    <td>Moves cursor to the address bar for searching</td>
    <td>"type url" "search google" "jump to address bar"</td>
  </tr>
  <tr>
    <td>Next Paragraph</td>
    <td>Jumps to the next paragraph in Word</td>
    <td>"move to next paragraph" "paragraph" "go to next paragraph" "next paragraph"</td>
  </tr>
  <tr>
    <td>New Paragraph</td>
    <td>Creates a new document in Word</td>
    <td>"make new document" "make new doc" "create new doc" "create new document" "new document"</td>
  </tr>
  <tr>
    <td>Open Document</td>
    <td>Opens a word document</td>
    <td>"open doc" "open word document" "open document" "open word doc"</td>
  </tr>
  <tr>
    <td>Open New Window</td>
    <td>Opens a new window in browser</td>
    <td>"open new window" "new window"</td>
  </tr>
  <tr>
    <td>Open Tab</td>
    <td>Opens a new tab in browser</td>
    <td>"Open tab" "Open new tab" "New Tab"</td>
  </tr>
  <tr>
    <td>Open Web Browser</td>
    <td>Opens a web browser (Chrome)</td>
    <td>"open chrome" "open internet" "open internet browser" "open google"</td>
  </tr>
  <tr>
    <td>Page Back</td>
    <td>Goes back a page within Word</td>
    <td>"go back a page"</td>
  </tr>
  <tr>
    <td>Page Break</td>
    <td>Inserts a page break in Word</td>
    <td>"create page break" "page break" "insert page break"</td>
  </tr>
  <tr>
    <td>Page Forward</td>
    <td>Goes forward a page within Word</td>
    <td>"go a page forward"</td>
  </tr>
  <tr>
    <td>Previous Field</td>
    <td>This is equivalent of pressing shift tab to go to a previous field</td>
    <td>"previous tab" "tab back" "previous" "back"</td>
  </tr>
  <tr>
    <td>Print</td>
    <td>Opens print window for currrent document</td>
    <td>"print" "print page" "print document" "print doc"</td>
  </tr>
  <tr>
    <td>Redo</td>
    <td>Redoes previous action</td>
    <td>"redo"</td>
  </tr>
  <tr>
    <td>Refresh</td>
    <td>Refreshes current page</td>
    <td>"refresh" "refresh page" "refresh tab"</td>
  </tr>
  <tr>
    <td>Reopen Tab</td>
    <td>Reopens the most recent closed tab</td>
    <td>"reopen" "reopen closed tab" "reopen tab" "reopen last tab" "reopen last"</td>
  </tr>
  <tr>
    <td>Save</td>
    <td>Saves current document</td>
    <td>"save" "save doc" "save word doc" "save word document" "save document" "save page"</td>
  </tr>
  <tr>
    <td>Save As</td>
    <td>Saves a Word document with a custom name</td>
    <td>"save as {document name}"</td>
  </tr>
  <tr>
    <td>Scroll Down</td>
    <td>Scrolls page down</td>
    <td>"Scroll down" "down"</td>
  </tr>
  <tr>
    <td>Scroll Left</td>
    <td>Scrolls the page left</td>
    <td>"scroll left"</td>
  </tr>
  <tr>
    <td>Scroll Right</td>
    <td>Scrolls the page right</td>
    <td>"scroll right"</td>
  </tr>
  <tr>
    <td>Scroll Up</td>
    <td>Scrolls page up</td>
    <td>"scroll up" "up"</td>
  </tr>
  <tr>
    <td>Search</td>
    <td>Searches a custom query</td>
    <td>"search {search query}" "google {search query}"</td>
  </tr>
  <tr>
    <td>Select</td>
    <td>Once navigated to the correct link, select goes to that link</td>
    <td>"select" "choose"</td>
  </tr>
  <tr>
    <td>Show Bookmarks</td>
    <td>This shows the bookmarks on the top of the browser</td>
    <td>"bookmarks" "show bookmarks"</td>
  </tr>
  <tr>
    <td>Switch Tabs (Backward)</td>
    <td>This goes to the previous tab open on a browser from right to left</td>
    <td>"previous tab" "back tab"</td>
  </tr>
  <tr>
    <td>Switch Tabs (Forward)</td>
    <td>This goes to the next tab open on a browser from left to right</td>
    <td>"next tab"</td>
  </tr>
  <tr>
    <td>Switch to App</td>
    <td>Switches to an application you specify</td>
    <td>"switch to {application name}"</td>
  </tr>
  <tr>
    <td>Tab</td>
    <td>Presses the Tab key</td>
    <td>"tab" "press tab"</td>
  </tr>
  <tr>
    <td>Type</td>
    <td>Types whatever query you specify</td>
    <td>"type { query }"</td>
  </tr>
  <tr>
    <td>Underline</td>
    <td>Underlines text within Word</td>
    <td>"underline" "underline text" "underline word"</td>
  </tr>
  <tr>
    <td>Undo</td>
    <td>Undoes previous action</td>
    <td>"undo"</td>
  </tr>
  <tr>
    <td>Up Arrow</td>
    <td>Presses the up arrow key</td>
    <td>"up arrow"</td>
  </tr>
  <tr>
    <td>Zoom In</td>
    <td>Zooms into the screen</td>
    <td>"zoom in" "bigger"</td>
  </tr>
   <tr>
    <td>Zoom Out</td>
    <td>Zooms out on the screen</td>
    <td>"zoom out" "smaller"</td>
  </tr>
</table></body>
</html>"""

f.write(message)
f.close()

filename = 'file:///Users/lisam.valkevich/Desktop/' + 'EVOCreferencecard.html'
webbrowser.open_new_tab(filename)