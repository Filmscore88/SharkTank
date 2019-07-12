
$(function() {
    activateListeners();
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

//Method for prototype to add relation data objects as HTML
Invention.prototype.inventionsHTML= function(){


}
// Listener functions to be run on document ready
function activateListeners(){
  $('#html_format').html('')
  showInvestments();
  moreInventionData();
}

// Listeners
function moreInventionData(){
$('#more_invention_data').on('click', function(e) {
   history.pushState(null, null, "inventions")
   e.preventDefault();
   getInventions();
 });
}

function showInvestments(){
  $('#get_investments_data').on('click', function(e){
    e.preventDefault();
    getInvestments();
  })

}

// ajax request funcitons
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



function getInvestments(){
  $.get(`/users/${id}/inventions/${id}.json`, function(json) {


});
}
