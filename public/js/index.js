// https://stackoverflow.com/questions/20998541/get-the-value-of-input-text-when-enter-key-pressed
const searchBar = document.querySelector('#searchQ');
const signout = document.querySelector('#signout');

// const showButton = document.getElementById('showButton');
const showButton = document.querySelector('#showButton');
const textBoxContainer = document.querySelector('#textBoxContainer');
// const textBoxContainer = document.getElementById('textBoxContainer');

const postForm = document.querySelector('#textBox');

const upvote = document.querySelector('#upvote');
const downvote = document.querySelector('#downvote');
const submitBtn = document.querySelector('#submitButton');

function search(ele) {
  if (event.key === 'Enter') {
    if (searchBar.value().trim() != "") {
      fetch("/searchQuery", {
        method: "POST",
        body: searchBar.value().trim(),
        headers: {
          'Content-Type': 'text/plain'
        }
      }).then((res) => {
          console.log(`Server responded: ${res}`);
          if (res.status === 200) {

          }
        })
    }
  }
}

postForm.addEventListener('keydown', event => {
  if (event.keyCode === 13) {
    console.log('enter is pressed');
    const message = postForm.value;
    const uInput = {}
    uInput['message'] = message;
    // uInput['datecreated'] = new Date();

    var jsonCreds = JSON.stringify(uInput);
    fetch('/postText', {
      method: 'POST',
      body: jsonCreds,
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
        if (res.status == 200) {
          console.log('Server responded');
          postForm.value = '';
          location.reload();
        }
      }).catch(error => {
        console.error(error);
      })
  }
});

showButton.addEventListener('click', e => {
  e.preventDefault();
  if (textBoxContainer.style.display === 'none' || textBoxContainer.style.display === '') {
    textBoxContainer.style.display = 'block';
  } else {
    textBoxContainer.style.display = 'none';
  }
});

function upVote(btn) {
  alert('button clicked');
  if (btn.value == 'OFF') {

  }
  if (btn.value == 'ON') {

  }
  console.log(btn.parentNode.parentNode.parentNode);
}

function downVote(btn) {
  // alert
  console.log(btn.parentNode.parentNode.parentNode);
}

submitBtn.addEventListener('click', e => {
  e.preventDefault();
    const message = postForm.value;
    const uInput = {}
    uInput['message'] = message;
    // uInput['datecreated'] = new Date();

    var jsonCreds = JSON.stringify(uInput);
    fetch('/postText', {
      method: 'POST',
      body: jsonCreds,
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
        if (res.status == 200) {
          console.log('Server responded');
          postForm.value = '';
          location.reload();
        }
      }).catch(error => {
        console.error(error);
      });
})

// signout.addEventListener('click', e => {
//   e.preventDefault();
//   fetch('/signout').then((res) => {
//     console.log(res);
//   })
// })
