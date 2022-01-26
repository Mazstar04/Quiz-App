const usernameInput = document.querySelector('#input');


const storeUsername = (e) => {
    localStorage.setItem('username', usernameInput.value);
    
}

usernameInput.addEventListener('keyup', storeUsername);