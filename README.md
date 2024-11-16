# stu-spa-demos

## Description
This repository contains various single-page application (SPA) demos to showcase different functionalities. Below are the current demos included in this repository:

1. **IP Address Viewer**: Displays the user's IP address and allows them to copy it to the clipboard.
2. **Pomodoro Timer**: A simple Pomodoro timer to help manage work sessions and breaks.
3. **Downtime SLA Calculator**: Calculates downtime based on a given SLA percentage.
4. **Paint Application**: A simple paint application to draw and save images.
5. **PDF JavaScript Scanner**: Analyzes PDF files and extracts content.
6. **Time Display**: Displays the current time and updates every second for multiple timezones.

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

## Installation
To run these demos locally, you can simply clone the repository and open the HTML files in your browser.

```sh
git clone https://github.com/gitstua/stu-spa-demos.git
cd stu-spa-demos