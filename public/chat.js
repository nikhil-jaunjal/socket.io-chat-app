const socket = io.connect('http://localhost:4000');

window.onload = function () {

    const message = document.getElementById('message');
    const handle = document.getElementById('handle');
    const send = document.getElementById('send');
    const output = document.getElementById('output');
    const feedback = document.getElementById('feedback');
    const cardBody = document.getElementById('cardBody');

    //sending 
    send.addEventListener('click', () => {
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        });
    });

    message.addEventListener('keypress', () => {
        socket.emit('typing', handle.value);
    });


    // listing 
    socket.on('chat', (data) => {
        feedback.innerHTML = '';
        output.innerHTML += '<p><strong>' + data.handle + '</strong> - ' + data.message + ' </p>';
        cardBody.scrollTop = cardBody.scrollHeight + 100;
        message.value = '';
    });

    socket.on('typing', (data) => {
        feedback.innerHTML = '<p><em>' + data + ' is typing.. </em></p>';
    });



}