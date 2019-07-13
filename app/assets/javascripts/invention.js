
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
  let userId = $('ol')[0].id;
  return(
    `<ul>
      <li>Invention Name:<a href= inventions/${this.id} data-id= ${this.id} class= "show_link"> ${this.name}</a> </li>
    </ul>`
  )
}

//Method for prototype to add relation data objects as HTML
Invention.prototype.showHTML= function(){
  return(
  ` <h2>Name:${this.name}
    <h3>Description: ${this.description}</h3>`
  )
}
// Listener functions to be run on document ready
function activateListeners(){
  $('#html_format').html('')
  moreInventionData();

}

// Listeners
function moreInventionData(){
$('#more_invention_data').on('click', function(e) {

   history.replaceState(null, null, "/inventions");
   e.preventDefault();
   getInventions();
 });

  $(document).on('click', ".show_link", function(e){
    e.preventDefault();
    $('#html_format').html('')
    let id= $(this).attr('data-id')
    fetch(`inventions/${id}.json`)
    .then(res => res.json())
    .then(invention => {
      let newInvention= new Invention(invention)
      let inventionHTML= newInvention.showHTML()
      $('#html_format').append(inventionHTML)
    })
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
