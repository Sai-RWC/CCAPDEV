"use strict";

const submitBtn = document.querySelector(".submit");
// const error1 = false;
// const error2 = false;
const error1 = document.querySelector('#error1');
const error2 = document.querySelector('#error2');
const inputForm = document.querySelector("#inputForm");

// TODO:
// function isNameTaken(name) {
//
// }

function checkInput(name, pass) {

  // checkdb if name is existing in the database; return 1
  // checkdb if password is field with the same entry is incorrect; return 2
  // if no error; return 0

  return 0;
}

// https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
// const validateEmail = (email) => {
//   return String(email)
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     );
// };

// const validate = (email) => {
//
// }

submitBtn.addEventListener("click", e => {
  e.preventDefault();
  // alert("test");
  var uName = document.getElementById("userName").value;
  var uPass = document.getElementById("userPass").value;
  var uInput = {};
  uInput['username'] = uName;
  uInput['password'] = uPass;

  var jsonCreds = JSON.stringify(uInput)

  console.log(jsonCreds)

  fetch("/createAccount", {
    method: "POST",
    body: jsonCreds,
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
      console.log(`Server responded: ${res}`);
      if (res.status === 200) {
        console.log(`status(302): ${res.url}`)
        // alert("Account successfully created");
        location.assign(res.url);
        // location.replace('/login');
      }
      else {
        res.json().then(data => {
          if (!data.success) {
            error1.innerHTML = data.error1
            error2.innerHTML = data.error2
          }
        });
      }
    }).catch(err => {
      var err1 = document.getElementById("error1");
      err1.innerHTML = "Username is Already Taken";
      console.error(err);
    });

  // alert("test");
  // if(res = checkInput(uName.trim(), uPass.trim())) {
  //   document.querySelector("#error"+res).style.visibility = "visibile";
  // }
  // alert(uName.split("@"));
  // switch(checkInput(uName.trim(), uPass.trim())) {
  //   case 1:
  //     document.querySelector("#error"+1).style.visibility = "visible";
  //     break;
  //   case 2:
  //   document.querySelector("#error"+2).style.visibility = "visible";
  // }
}); 

console.log(`inputform: ${inputForm}`);


inputForm.addEventListener('keydown', event => {
  console.log(inputForm);
  if (event.keyCode === 13) {
    event.preventDefault();

    var target = event.target;
    var index = parseFloat(target.getAttribute('data-index'));
    var inputElements = document.querySelectorAll('#inputForm input');
    if (index == 1) {
      var uName = document.getElementById("userName").value;
      var uPass = document.getElementById("userPass").value;
      var uInput = {};
      uInput['username'] = uName;
      uInput['password'] = uPass;

      var jsonCreds = JSON.stringify(uInput)

      console.log(jsonCreds)

      fetch("/createAccount", {
        method: "POST",
        body: jsonCreds,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
          console.log(`Server responded: ${res}`);
          if (res.status === 200) {
            // res.url
            alert("Account successfully created");
            location.assign(res.url);
            // location.replace('/login');
          }
          else {
            res.json().then(data => {
              if (!data.success) {
                error1.innerHTML = data.error1
                error2.innerHTML = data.error2
              }
            });
          }
        }).catch(err => {
          console.error(err);
        });
    }

    for (var i = 0; i < inputElements.length; i++) {
      if (parseFloat(inputElements[i].getAttribute('data-index')) === index + 1) {
        inputElements[i].focus();
        break;
      }
    }

  }

});
