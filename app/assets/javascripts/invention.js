
$(function() {
    getInventions();
});


// JS model object to use for JSON data manipulation
class Invention {
  constructor(id, name, description, user_id) {
    this.id = id;
    this.name= name;
    this.description= description;
    this.user_id= user_id;
  }
}


// Method for model object prototype to append HTML to DOM
Invention.prototype.addHTML= function(){
  return(
    `<ul>
      <li>Name: ${this.name}</li>
      <li>Inventor: ${this.user.name}</li>
    </ul>`
  )
}

function getInventions(){
  $.ajax({
    url: "http://localhost:3000/inventions",
    method: "get",
    dataType: "json"

  }).done(function (data){
    console.log(data)
  })
}
