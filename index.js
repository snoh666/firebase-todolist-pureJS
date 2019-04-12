document.addEventListener('DOMContentLoaded', function () {

  var database = firebase.database().ref('todos/');

  function getValues() {

    database.on('value', value => {
      let resBox = document.getElementById('resultList');
      resBox.innerHTML = " ";
      let listRes = Object.values(value.val());
      let ids = Object.keys(value.val());

      listRes.forEach((element, index) => {
        element = Object.entries(element);
        resBox.innerHTML += `<li id="${ids[index]}"> <p class="listElement">${element[0][1]}</p> </li>`;
      });

      document.querySelectorAll('ul > li').forEach(function (element){
        element.addEventListener('click', () => {
          database.child(element.id).remove();
        });
      });
    });

  }
  getValues();

  document.getElementById('newTask').addEventListener('click', function (){

    const box = document.getElementsByClassName('newTaskBox')[0];
    const closeBtn = document.querySelectorAll('span')[0];
    const close = () => {
      box.classList.add('display');
      closeBtn.removeEventListener('click', close);
    };

    if(box.classList.contains('display')) {
      box.classList.remove('display');
      closeBtn.addEventListener('click', close);
    } else {
      box.classList.add('display');
    }


  });
  document.getElementById('post').addEventListener('click', () => {

    const task = document.getElementById('taskValue');

    database.push({
      taskName: task.value
    });

    task.value = '';
  });

});