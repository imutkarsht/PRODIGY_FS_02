window.addEventListener('load', () => {
    const msgbox = document.getElementById('msgbox');
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');

    if (message) {
        let displayMessage = decodeURIComponent(message);
        let msgClass = '';

        if (displayMessage.endsWith('-f')) {
            msgClass = 'text-red-500';
            displayMessage = displayMessage.slice(0, -2); 
        } else if (displayMessage.endsWith('-s')) {
            msgClass = 'text-green-500';
            displayMessage = displayMessage.slice(0, -2); 
        }

        msgbox.innerHTML = displayMessage;
        msgbox.classList.add(msgClass);
        setTimeout(() => {
            msgbox.innerHTML = '';
            msgbox.classList.remove(msgClass);
        }, 1500);
    }
});