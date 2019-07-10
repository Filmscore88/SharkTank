
$(function() {
    activateListener();
});


// JS model object to use for JSON data manipulation
class Invention {
  constructor(id, name, description) {
    this.id = id;
    this.name= name;
    this.description= description;
  }
}


// Method for model object prototype to append HTML to DOM
Invention.prototype.addHTML= function(){
  return(
    `<ul>
      <li>Invention Name: ${this.name}</li>
      <li>Description: ${this.description}</li>
    </ul>`
  )
}
function activateListener(){
$('#more_invention_data').on('click', function(e) {
   e.preventDefault();
   getInventions();
 });
}
function getInventions(){
  $.ajax({
    url: "http://localhost:3000/inventions",
    method: "get",
    dataType: "json"

  }).done(function (data){
    data.forEach(function(obj){

      var invention= new Invention(obj.id, obj.name, obj.description);
      var html= invention.addHTML();
      $('#ajax_invention_data').append(html)
    });
  });
}
