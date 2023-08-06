"use strict";

const submitBtn = document.querySelector(".submit");
const inputForm = document.querySelector("#inputForm");
const error1 = document.querySelector("#error1")
const error2 = document.querySelector("#error2")
// var error1 = false;
// var error2 = false;

// function checkInput(name, pass) {
//
//   // checkdb if name is existing in the database; return 1
//   // checkdb if password is field with the same entry is incorrect; return 2
//   // if no error; return 0
//   
//   return 0;
// }

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // alert("test");
  var uName = document.getElementById("uName").value;
  var uPass = document.getElementById("uPass").value;
  const uInput = {};
  uInput['username'] = uName;
  uInput['password'] = uPass;

  var jsonCreds = JSON.stringify(uInput)

  console.log(jsonCreds);
  // fetch("/loginUser", {
  //   method: 'POST',
  //   body: jsonCreds,
  //   // follow stauts code 301~308
  //   redirect: 'follow',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // }).then((res) => {
  //     if(res.status >= 200 && res.status < 300) {
  //       console.log(`Server responded: ${res}`);
  //       // location.replace('/');
  //     }
  //   });
  fetch("/loginUser", {
    method: 'POST',
    body: jsonCreds,
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
      if (res.status == 200) {
        console.log(`Server responded: ${res}`);
        location.assign(res.url)
      }
      else if (res.status == 300 || res.status == 301) {
        // error1.innerHTML = 
        res.json().then(data => {
          if (!data.success) {
            console.log('not success is called')
            error1.innerHTML = data.error1;
            error2.innerHTML = data.error2;
          }
        });
        // console.log(`error: ${res}`);
      }
      // else if (res.status == 301) {
      //   console.log(`error: ${res}`)
      // }
    }).catch((err) => {
      console.error(err)
    });

});

// https://stackoverflow.com/questions/19610357/activating-next-input-field-in-form-on-enter

inputForm.addEventListener('keydown',  event => {
  if (event.keyCode == 13) {
    event.preventDefault();

    var target = event.target
    var index = parseFloat(target.getAttribute('data-index'))
    // $('[data-index="' + (index + 1).toString() + '"]').focus();
    var inputElements = document.querySelectorAll('#inputForm input')
    if (index == 1) {
      var uName = document.getElementById("uName").value;
      var uPass = document.getElementById("uPass").value;
      const uInput = {};
      uInput['username'] = uName;
      uInput['password'] = uPass;

      var jsonCreds = JSON.stringify(uInput)
      fetch("/loginUser", {
        method: 'POST',
        body: jsonCreds,
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
          if (res.status == 200) {
            console.log(`Server responded: ${res}`);
            location.assign(res.url)
          }
          else if (res.status == 300 || res.status == 301) {
            // error1.innerHTML = 
            res.json().then(data => {
              if (!data.success) {
                console.log('not success is called')
                error1.innerHTML = data.error1;
                error2.innerHTML = data.error2;
              }
            });
            // console.log(`error: ${res}`);
          }
          // else if (res.status == 301) {
          //   console.log(`error: ${res}`)
          // }
        }).catch((err) => {
          console.error(err)
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
