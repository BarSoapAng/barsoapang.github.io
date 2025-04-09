let appContent = {};

fetch('content.json')
   .then(response => response.json())
   .then(data => {appContent = data});


function openApp(appId) {
    event.stopPropagation();
    let windowsContainer = document.getElementById('windows-container');
    let existingWindow = document.getElementById(appId);
    let taskbarIcon = document.getElementById('taskbar-' + appId);

    if (appId === 'word') {
        window.open("misc/resume.pdf");
    }
    if (!existingWindow) {
        let newWindow = document.createElement('div');
        newWindow.classList.add('window');
        newWindow.id = appId;
        newWindow.innerHTML = `
            <div class="window-header">
                <span>${appContent[appId]?.title}</span>
                <div>
                    <button onclick="minimizeApp('${appId}')">-</button>
                    <button onclick="maximizeApp('${appId}')">□</button>
                    <button onclick="closeApp('${appId}')">x</button>
                </div>
            </div>
            <div class="window-body" style="padding: 10px; background: url('${appContent[appId].background}')">
                <div class="window-content">
                    ${appContent[appId]?.content}
                </div>
            </div>
        `;
        newWindow.style.top = '100px';
        newWindow.style.left = '100px';
        newWindow.style.display = 'block';
        windowsContainer.appendChild(newWindow);
        makeDraggable(newWindow);
        activateApp(newWindow);
        appContent[appId].open = true;
        if (appId === 'outlook') {
            setTimeout(() => {
                document.getElementById('contact').style.display = 'block';
                document.getElementById('message').style.display = 'none';
            }, 1); // Give time for DOM to render
        }
    } else {
        if (appContent[appId].open) {
            console.log('Already open');
            minimizeApp(appId);
            taskbarIcon.classList.add('open');
            return;
        }
        existingWindow.style.display = 'block';
        activateApp(existingWindow);
        appContent[appId].open = true;
    }
    taskbarIcon.classList.add('active');
}

function closeApp(appId) {
    event.stopPropagation();
    let window = document.getElementById(appId);
    document.getElementById('taskbar-' + appId).classList.remove('open');
    document.getElementById('taskbar-' + appId).classList.remove('active');
    window.remove();
    appContent[appId].open = false;
}

function minimizeApp(appId) {
    document.getElementById(appId).style.display = 'none';
    document.getElementById('taskbar-' + appId).classList.remove('active');
    document.getElementById('taskbar-' + appId).classList.add('open');
    appContent[appId].open = false;
}

function maximizeApp(appId) {
    
    if(appId === "outlook") {
        // cannotMaximizeMessage(appId);
        return;
    }

    let appWindow = document.getElementById(appId);
    
    if (appWindow.style.width === '100vw' && appWindow.style.height === (window.innerHeight - 60) + 'px') {
        appWindow.style.width = '600px';
        appWindow.style.height = '400px';
        appWindow.classList.remove('fullscreen');
    } else {
        appWindow.classList.add('fullscreen');
        appWindow.style.width = '100vw'
        appWindow.style.height = (window.innerHeight - 60) + 'px';
        appWindow.style.top = '0';
        appWindow.style.left = '0';
    }
}

// Function to enable dragging
function makeDraggable(element) {
    let offsetX, offsetY, isDragging = false;
    let header = element.querySelector('.window-header');

    header.addEventListener('mousedown', (event) => {
        isDragging = true;
        offsetX = event.clientX - element.getBoundingClientRect().left;
        offsetY = event.clientY - element.getBoundingClientRect().top;
        
        document.addEventListener('mousemove', moveWindow);
        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.removeEventListener('mousemove', moveWindow);
        });
    });

    function moveWindow(event) {
        if (!isDragging) return;

        let maxX = window.innerWidth - element.offsetWidth;
        let maxY = window.innerHeight - element.offsetHeight - 60; // Prevent covering taskbar

        let newX = event.clientX - offsetX;
        let newY = event.clientY - offsetY;

        // Ensure window stays within bounds
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        element.style.left = newX + 'px';
        element.style.top = newY + 'px';
    }
}

// Close the website (simulate shutdown)
function closeWebsite() {
    window.close();
}

function cannotMaximizeMessage(appId){
    alert(`Sorry you can't make ${appId} window bigger :(`);
}

function activateApp(window) {
    
    let allWindows = document.querySelectorAll(".window");
    if (window) {
        // Bring clicked window to the front
        zCount++; // Increase z-index counter
        window.style.zIndex = zCount; // Set new z-index

        // Make the clicked window active
        for(let win of allWindows) {
            win.classList.remove("active");
            document.getElementById('taskbar-' + win.id).classList.remove('active');
            document.getElementById('taskbar-' +  win.id).classList.add('open');
            appContent[win.id].open = false;
        }
        window.classList.add("active");
        appContent[window.id].open = true;
        document.getElementById('taskbar-' + window.id).classList.add('active');
        if(window.id !== "outlook"){
            newWindow.style.resize = 'both';
        }
    } else {
        // If clicked outside any window, remove active state from all windows
        for(let win of allWindows) {
            win.classList.remove("active");
            document.getElementById('taskbar-' + win.id).classList.remove('active');
            document.getElementById('taskbar-' +  win.id).classList.add('open');
        }
    }
}

function formLoading() {
    const submitBtn = document.getElementById('submit');

    submitBtn.disabled = true;
    submitBtn.style.color = 'rgb(134, 9, 9)';
    return true;
}

function formSubmitted() {
    const form = document.getElementById('contact');
    const msg = document.getElementById('message');
    const submitBtn = document.getElementById('submit');

    form.style.display = 'none';
    msg.style.display = 'block';
    submitBtn.disabled = false;
    
}

let zCount = 10;
document.addEventListener("mousedown", (event) => {
    let clickedWindow = event.target.closest(".window");
    activateApp(clickedWindow);
});


document.querySelectorAll(".icon").forEach(window => {
    window.addEventListener("dblclick", () => {
        console.log("Double click");
        let appId = window.getAttribute("data-app"); // Get appId from data attribute
        openApp(appId);
    });
});