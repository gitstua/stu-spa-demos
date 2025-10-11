# stu-spa-demos

## Description
This repository contains various single-page application (SPA) demos to showcase different functionalities. Below are the current demos included in this repository:

1. **IP Address Viewer**: Displays the user's IP address and allows them to copy it to the clipboard.
2. **Pomodoro Timer**: A simple Pomodoro timer to help manage work sessions and breaks.
3. **Downtime SLA Calculator**: Calculates downtime based on a given SLA percentage.
4. **Paint Application**: A simple paint application to draw and save images.
5. **PDF JavaScript Scanner**: Analyzes PDF files and extracts content.
6. **Time Display**: Displays the current time and updates every second for multiple timezones.
7. **Bingo**: An interactive 5x5 bingo card where:
   - Click cells to mark them as complete
   - Card state is stored in the URL for easy sharing
   - Works with browser navigation history
   - Responsive grid layout
8. **MTB Trails**: Allows users to select a location on the map and view the trails they want to do. Users can save their favorite trails and view them in the side pane. The application stores data in the URL fragment, ensuring that favorites are preserved across sessions.
9. **Jigsaw Puzzle Maker**: An interactive jigsaw puzzle application that allows users to upload images or choose from sample images, then split them into puzzle pieces with realistic interlocking tabs. Users can drag and drop pieces to solve the puzzle.

## Demos

### IP Address Viewer
This demo fetches and displays your IP address using the [ipify API](https://www.ipify.org). Clicking on the displayed IP address copies it to your clipboard.

#### Usage
1. Open `ip.html` in your browser.
2. Your IP address will be displayed.
3. Click on the IP address to copy it to the clipboard.

### Pomodoro Timer
A Pomodoro timer that allows you to set and manage work and break intervals.

#### Usage
1. Open `tomato.html` in your browser.
2. Set your desired minutes and seconds.
3. Click "Set Time", "Start", "Stop", or "Reset" to control the timer.
4. An alarm will sound when the timer reaches zero.

### Downtime SLA Calculator
Calculates the amount of downtime based on a specified Service Level Agreement (SLA) percentage.

#### Usage
1. Open `uptime.html` in your browser.
2. Enter the desired SLA percentage.
3. Click "Calculate" to see the downtime in seconds per day, and minutes per week, month, and year.

### Paint Application
A simple paint application that allows you to draw and save images.

#### Usage
1. Open `paint.html` in your browser.
2. Use the drawing tools to create your artwork.

### PDF JavaScript Scanner
Analyzes PDF files and content using PDF.js. Might be useful to identify dodgy PDF files.

#### Usage
1. Open `pdf.html` in your browser.
2. Select a PDF file using the file input.
3. The  PDF will be analyzed and some info displayed.

### Time Display
Displays the current time and updates every second in multiple timezones.

#### Usage
1. Open `time.html` in your browser.
2. The current time will be displayed and updated every second.

### Bingo
An interactive 5x5 bingo card `bingo.html` where:
- Click cells to mark them as complete
- Card state is stored in the URL for easy sharing
- Works with browser navigation history
- Responsive grid layout

### OpenHASP Plate Editor
Located at `/stu-openHASP-plate-ui.html`, this is a visual editor for designing user interfaces for [openHASP](https://www.openhasp.com) plates. 

** Experimental - not tested with a broad range of json lines **

It allows you to:
- Create and edit UI components using JSON format
- Preview components in real-time
- Organize components across multiple pages
- Design labels, buttons, and dropdowns with custom styling

### MTB Trails
The MTB Trails SPA allows users to select a location on the map and view the trails they want to do. Users can save their favorite trails and view them in the side pane. The application stores data in the URL fragment, ensuring that favorites are preserved across sessions.

#### Features

- Interactive map to select trail locations
- Save favorite trails with names
- Edit and delete favorite trails
- View saved trails in the side pane
- Data persistence using URL fragments

#### Usage

1. Click on the map to add a new trail.
2. Enter the trail name when prompted.
3. View and manage your favorite trails in the side pane.
4. Click on a favorite trail to center the map on its location.

#### Links

- [MTB Trails](mtb.html) - View and manage your favorite MTB trails.

### Jigsaw Puzzle Maker
An interactive jigsaw puzzle application that creates realistic puzzle pieces from uploaded images or sample images.

#### Features

- Upload custom images or choose from 6 sample images (Mountain, Forest, Ocean, City, Space, Flowers)
- Customizable puzzle difficulty (2-8 rows and columns)
- Realistic jigsaw pieces with interlocking tabs and slots
- Drag and drop functionality for both mouse and touch devices
- Smart piece snapping when placed near correct positions
- Progress tracking showing pieces placed vs total pieces
- Completion celebration animation
- Responsive design for desktop and mobile

#### Usage

1. Open `jigsaw.html` in your browser
2. Either upload your own image using "Choose Image" or click one of the sample image buttons
3. Adjust the rows and columns sliders to set puzzle difficulty
4. Click "Generate Puzzle" to create the jigsaw pieces
5. Drag pieces around to solve the puzzle
6. Pieces will snap into place when dragged near their correct positions
7. Celebrate when you complete the puzzle!

#### Technical Details

- Uses HTML5 Canvas for creating jigsaw piece shapes
- Implements proper CORS handling for external sample images
- Touch and mouse event handling for mobile compatibility
- Canvas-based image masking for realistic piece shapes

#### Links

- [Jigsaw Puzzle Maker](jigsaw.html) - Create and solve interactive jigsaw puzzles.

#### Footer

The footer of the application includes a floating message: "Made with ❤️ by Stu at [github.com/gitstua/stu-spa-demos](https://github.com/gitstua/stu-spa-demos) using GitHub Copilot - Version 11".

## Installation
To run these demos locally, you can simply clone the repository and open the HTML files in your browser.

```sh
git clone https://github.com/gitstua/stu-spa-demos.git
cd stu-spa-demos