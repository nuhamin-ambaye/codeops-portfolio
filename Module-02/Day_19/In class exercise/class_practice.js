let heading1=document.querySelector("h1")
console.dir(heading1)

document.getElementById('h1').addEventListener('click', (e) => {alert('Hello world is clicked');});

const handleSubmit= (event) => {
    event.preventDefault();
    name= document.getElementById("name").value
    email= document.getElementById("email").value
    console.log(name)
    console.log(email)}

document.getElementById('submit').addEventListener('click', handleSubmit);