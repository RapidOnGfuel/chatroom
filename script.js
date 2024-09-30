// Get the input fields and the button
const usernameInput = document.getElementById('username');
const roomInput = document.getElementById('room');
const joinBtn = document.getElementById('join-btn');

// When the user wants to join the chat
joinBtn.addEventListener('click', function() {
    const userName = usernameInput.value;
    const roomCode = roomInput.value;

    // Use Socket.io to connect and join the room
    const socket = io();
    socket.emit('joinRoom', {userName, roomCode});

    // Add event listener for receiving a message
    socket.on('chat message', function(msg){
        const timeStamp = new Date().toLocaleTimeString();
        // Append to message container
        document.getElementById('message-container').append(`
            ${userName} ${timeStamp} 
            ${msg.text}
        `);
    });

    // Add event listener for sending a message
    document.getElementById('send-button').addEventListener('click', function() {
        const message = document.getElementById('message-input').value;
        socket.emit('chat message', {text: message, userName, roomCode});
    })
});
