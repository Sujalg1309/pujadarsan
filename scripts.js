let events = [];

function logTime(eventName) {
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
    const logEntry = { date: dateString, timeAndName: `${timeString} - ${eventName}` };
    
    events.push(logEntry);
    localStorage.setItem('events', JSON.stringify(events));
    
    document.getElementById('hamburger-icon').style.display = 'block';
}

function logText(eventName, elementId, inputId) {
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
    const value = document.getElementById(inputId).value;
    const logEntry = { date: dateString, timeAndName: `${timeString} - ${eventName}: ${value}` };
    
    events.push(logEntry);
    localStorage.setItem('events', JSON.stringify(events));

    document.getElementById(inputId).value = '';  // Clear the input field
}

function toggleMenu() {
    const menu = document.getElementById('hamburger-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

window.onload = function () {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
        events = JSON.parse(storedEvents);
    }
};

function showEvents() {
    document.getElementById('button-container').style.display = 'none';
    document.getElementById('events-log').style.display = 'block';
    document.getElementById('view-events').style.display = 'none';
    document.getElementById('log-events').style.display = 'block';

    const eventsLog = document.getElementById('event-entries');
    eventsLog.innerHTML = '';  // Clear previous logs
    
    if (events.length) {
        let currentDate = '';
        events.forEach(event => {
            if (event.date !== currentDate) {
                const dateElement = document.createElement('h3');
                dateElement.textContent = event.date;  // Display date
                eventsLog.appendChild(dateElement);
                currentDate = event.date;
            }
            const logEntry = document.createElement('p');
            logEntry.textContent = event.timeAndName;  // Display time and name
            eventsLog.appendChild(logEntry);
        });
    } else {
        eventsLog.textContent = 'No events logged yet.';
    }
}

function showLogEvents() {
    document.getElementById('button-container').style.display = 'block';
    document.getElementById('events-log').style.display = 'none';
    document.getElementById('view-events').style.display = 'block';
    document.getElementById('log-events').style.display = 'none';
}

function exportToExcel() {
    // Create a new Excel workbook
    var workbook = new ExcelJS.Workbook();

    // Add a worksheet
    var worksheet = workbook.addWorksheet('Events');

    // Add header row
    worksheet.addRow(['Date', 'Time', 'Event']);

    // Add data from events array
    events.forEach(event => {
        const { date, timeAndName } = event;
        const [time, eventName] = timeAndName.split(' - ');
        worksheet.addRow([date, time, eventName]);
    });

    // Save the workbook
    workbook.xlsx.writeBuffer().then(function(buffer) {
        // Convert buffer to Blob
        var blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

        // Create download link
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'events.xlsx';
        link.click();
    });
}
