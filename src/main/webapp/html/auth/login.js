if (window.localStorage.getItem('email')) {
  //document.querySelector('#email').value = localStorage.getItem('email')
  document.querySelector('#email').value = localStorage.email
}

document.querySelector('#login-btn').onclick = () => {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4 || xhr.status != 200)
      return;
    
    var data = JSON.parse(xhr.responseText);
    
    if (data.status == 'success') {
      location.href = "../index.html"
    } else if(data.status == 'stand-by'){
      window.localStorage.standby = $('#email').val();
      location.href = 'success.html';
      
      
    } else {
      M.toast({html: '아이디나 비밀번호가 틀렸습니다.',displayLength: '10000'})

    }
  };
  xhr.open('POST', '../../app/json/auth/login', true)
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
  var email = document.querySelector('#email').value;
  var password = document.querySelector('#password').value;
  
  if (document.querySelector('#saveEmail:checked') != null) {
    // 웹브라우저의 로컬 스토리지에 이메일을 저장한다.
    //window.localStorage.setItem("email", email);
    window.localStorage.email = email;
  } else {
    window.localStorage.removeItem("email");
  }
  
  var qs = 'email=' + email + '&password=' + password;
  xhr.send(qs);
};






