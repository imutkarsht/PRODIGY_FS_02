const rooms = [
    "Chit-Chat",
    "Gaming",
    "Tech Nerds",
    "Movies and Shows",
    "Sports",
    "Books"
];

const roomSelect = document.getElementById('roomSelect');

rooms.forEach(room => {
    let option = document.createElement('option');
    option.value = room;
    option.textContent = room;
    roomSelect.appendChild(option);
});