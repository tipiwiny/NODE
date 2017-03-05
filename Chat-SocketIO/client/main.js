const socket = io.connect('http://192.168.1.55:8080',{'forceNew': true})

socket.on('messages', (data) => {
  console.log(data);
  render(data);
})

function render (data) {
  const html = data.map((message, index) => {
     return (`
       <div class ="message">
         <strong> ${message.nickname}</strong> dice:
          <p> ${message.text}</p>
       </div>`
     )
  }).join('');

  document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
  console.log('llega aqui')
   const message = {
     nickname: document.getElementById('nickname').value,
     text: document.getElementById('text').value
   };
   document.getElementById('text').style.display = 'none'
   socket.emit('add-message', message)
   return false;
}
