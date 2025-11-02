# Electricity Usage Analyzer

A single-page web application for analyzing ActewAGL EvoEnergy electricity usage data.

## Features

- **ActewAGL EvoEnergy Saver Plan** rates (effective July 1, 2025)
- Peak/Off-Peak/Free Charging window analysis
- Interactive charts showing daily and hourly usage patterns
- Cost breakdown with savings calculator
- Automatic loading of sample data

## Quick Start

### Option 1: Using Node.js (Recommended)

```bash
npm start
```

Then open http://localhost:3000 in your browser.

### Option 2: Direct Node Execution

```bash
node server.js
```

### Option 3: Make Executable and Run

```bash
./server.js
```

## Rate Plan Details

**ActewAGL EvoEnergy Saver Plan (Effective from 1 July 2025)**

- **Peak Rate:** $0.301897/kWh (6:00 AM - 11:59 PM)
- **Off-Peak Rate:** $0.120000/kWh (12:00 AM - 5:59 AM)
- **Weekend Charging Window:** FREE (12:00 PM - 2:00 PM on weekends)
- **Daily Supply Charge:** $1.331000/day

## Usage

1. Start the server using one of the methods above
2. The app will automatically load `sample.csv` if present
3. You can also upload your own ActewAGL SUMMARY CSV files
4. Adjust rate plans if needed and click "Calculate Costs"

## File Format

The app expects ActewAGL SUMMARY CSV format with the following structure:

```
Account Number,9999771814
Start Date,24-Oct-2025
End Date,31-Oct-2025

NMI,Meter Serial Number,Stream,Suffix,Register Description,UOM,Reading Date,Reading Start Time,Reading End Time,Units,Read Type
70011623116,LG162332518,E1,E1,Peak,kWh,30/10/2025,23:55,00:00,0.032,Actual
...
```

## Technical Details

- Pure HTML/CSS/JavaScript (no build step required)
- Uses Chart.js for visualizations
- Node.js server for local development (no external dependencies)
- All data processing happens client-side
