$(document).ready( function(){

var fb = firebase.database().ref();
document.getElementById("upload").addEventListener('change', handleFileSelect, false);

 firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    alert(" User is signed in.");
	window.location = 'index.html#Main';
	}else
		{alert(" User has signed out.");
			window.location = 'index.html#home';
		}  
	});
 
	
	$("#btnLogin").on('click', function(){
		var email = $("#txtEmail").val();	
		var password = $("#txtPassword").val();	
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		alert(error.message);				
			});
	
		});
	
	
	$("#btnSignup").on('click', function(){
		var email = $("#txtEmail").val();
		var password = $("#txtPassword").val();
	
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
 
 // Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
		alert(errorMessage);
		});
	});
	
	
	$("#btnLogout").on('click', function(){
	firebase.auth().signOut().then(function() {
}, function(error) {
  alert(error);
		});
	});
})	
	
function handleFileSelect(event) {
	$(".upload-group").show();
	selectedFile = event.target.files[0];
};
	
	function confirmUpload() {
	const storageService = firebase.storage();
	const storagRef = storageService.ref();
    var fb = new Firebase("https://vinylking-70e3e.firebaseio.com"),
		fbMessages = fb.child("/Vinyls");
		nameElement = document.getElementById('vinyl-name'),
		genreElement = document.getElementById('vinyl-genre'),
		ConditionElement = document.getElementById('Condition'),
		PostTypeElement = document.getElementById('PostType'),
		priceElement = document.getElementById('vinyl-price'),
		imgfilepathElement = document.getElementById('imgfilepath'),
		imgElement = document.getElementById('#blah')
   
	var name = nameElement.value,
			genre = genreElement.value,
			Condition = ConditionElement.value,
			PostType = PostTypeElement.value,
			price = priceElement.value;

					
	if(name && genre && Condition && PostType && price) {
	}else{
		alert("Please fill in all details on the vinyl");
	}
	genreElement.value = "";
        
	
	var metadata = {
		contentType: 'image',
		customMetadata: {
			'title': $("#imgTitle").val()
		},
	};
	
	

	var uploadTask = firebase.storage().ref().child('dogImages/' + selectedFile.name).put(selectedFile, metadata);
	// Register three observers:
	// 1. 'state_changed' observer, called any time the state changes
	// 2. Error observer, called on failure
	// 3. Completion observer, called on successful completion
	uploadTask.on('state_changed', function(snapshot){
				//var downloadURL = snapshot.ref.getDownloadURL();
				//console.log(downloadURL);
				//console.log(snapshot.metadata.fullPath);

  		// Observe state change events such as progress, pause, and resume
  		// See below for more detail

	}, function(error) {
  		// Handle unsuccessful uploads
	}, function() {
  		// Handle successful uploads on complete
		uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
		console.log('File available at', downloadURL);
		fbMessages.push({
			name: name,
		genre: genre,
		Condition: Condition,
		PostType: PostType,
		price: price,
		timestamp: Firebase.ServerValue.TIMESTAMP,
		albumart: 'dogImages/' + selectedFile.name,
		albumartURL: downloadURL});
		});
		


  		$(".upload-group")[0].before("Success!");
  		$(".upload-group").hide();
		alert("upload successful!");



	});
	

			
	}
		



	
	  
		
	
		