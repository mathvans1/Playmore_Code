(function(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB5YaVmykw99QDZL2gj5pU-i5VZ2ZkrD6c",
        authDomain: "playmore-8cdea.firebaseapp.com",
        databaseURL: "https://playmore-8cdea.firebaseio.com",
        storageBucket: "playmore-8cdea.appspot.com",
        messagingSenderId: "750872628689"
    };
    firebase.initializeApp(config);

    //Get all elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');

    //Add login event
    btnLogin.addEventListener('click', e =>  {
       //get email and pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        /*window.location.assign(href="index.html");*/

        //sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));

    });

    //Add signup event
    btnSignUp.addEventListener('click', e => {
        //get email and pass
        //TODO: check for real email
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        //sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });


    btnLogout.addEventListener('click', e => {
       firebase.auth().signOut();
    });

    //Add realtime listner
    firebase.auth().onAuthStateChanged(firebaseUser => {
       if(firebaseUser){
           console.log(firebaseUser.email);
           btnLogout.classList.remove('hide');
       } else {
           console.log('not logged in');
           btnLogout.classList.add('hide');
        }
    var showName = document.getElementById("showname");
    showName.innerHTML(firebaseUser.email);
    });






}());