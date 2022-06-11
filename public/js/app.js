

let form = document.getElementById("myForm");

let inputValue = ""

function change(){
  inputValue = document.getElementById("hashtag-input").value 
}



document.getElementById("sumbitBtn").addEventListener("click", function() {
    //console.log("clicked")
    //console.log(`http://localhost:3000/tag/${inputValue}`)
    location.href = `tag/${inputValue}`

  });

  