const socket = io()

socket.on('countupdated', ()=>{
    console.log('cont updated');
})
socket.on('countupdatednetwork', (obj)=>{
    console.log('cont updated network');
    console.log(obj);
})
