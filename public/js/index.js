$(document).ready(function(){
    $('.navbar-toggler').click(function(){
        $('.navbar-toggler').toggleClass('change')
    })
});



const form=document.querySelector('#form');
const inputName=document.querySelector('#name');
const inputLastName=document.querySelector('#lastName');
const inputMessage=document.querySelector('#message')
const inputEmail=document.querySelector('#email');





form.addEventListener('submit', submit)


function submit(e){
    e.preventDefault()

    {
        inputName.value='';
        inputLastName.value='';
        inputMessage.value='';
        inputEmail.value='';
      
    }
}