window.addEventListener('offline', function(e) { 
    console.log('offline'); 
    alert("\n\n OFFLINE \nAll forms will be uploaded once network connection is found.\n" );
    }
    );

window.addEventListener('online', function(e) { 
    console.log('online'); 
    if ((localStorage.getItem("queue"))!=null){
        var queue = JSON.parse(localStorage.getItem("queue"));
        upload_form_to_db(queue);

        }
    });

function submit_form(){

    if ((localStorage.getItem("queue"))!=null){
        var queue = JSON.parse(localStorage.getItem("queue")); 
    }
    else{
        var queue = [];
        console.log("\nQUEUE CREATED");
    };
    console.log("\nREVIEW QUEUED")
    add_form_to_queue(queue);;
    }   

function add_form_to_queue(queue){

    var this_form = [];
    this_form[0] = document.getElementById("author_name").value;
    this_form[1] = document.getElementById("book_name").value;
    this_form[2]= (document.querySelector('input[type="radio"]:checked')).value;
    this_form[3] = document.getElementById("review").value;

    queue.push(this_form);
    localStorage.setItem("queue", JSON.stringify(queue));
    document.getElementById("book_review_form").reset(); 
    if (navigator.onLine){
        upload_form_to_db(queue);
    }
}

function upload_form_to_db(queue){

    var db = firebase.database();
    for (i=0; i< queue.length; i++){
        x = queue[i];
        var new_review = {
            Author: x[0],
            Book: x[1],
            Opinion: x[2],
            Review: x[3]}
        db.ref("reviews").push(new_review);
        console.log("\nREVIEW SUBMITTED:"+
                    "\nAuthor: "+ x[0]+
                    "\nBook: "+ x[1]+
                    "\nOpinion: "+ x[2]+
                    "\nReview: "+ x[3]+"\n"); 
    }
    localStorage.removeItem("queue");
    console.log("\nQUEUE CLEARED");
    alert("Form(s) Submitted!");
}