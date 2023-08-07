// https://stackoverflow.com/questions/20998541/get-the-value-of-input-text-when-enter-key-pressed
const searchBar = document.querySelector('#searchQ');
const signout = document.querySelector('#signout');

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

// signout.addEventListener('click', e => {
//   e.preventDefault();
//   fetch('/signout').then((res) => {
//     console.log(res);
//   })
// })
