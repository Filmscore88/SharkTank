
$(function() {
    activateListeners();
});


// JS model object to use for JSON data manipulation
class Invention {
  constructor(obj) {
    this.id = obj.id;
    this.name= obj.name;
    this.description= obj.description;
    this.invention_investments= obj.invention_investments;
    this.user_name= obj.user.name
  }
}


// Method for model object prototype to append HTML to DOM
Invention.prototype.addHTML= function(){
  return(
    `<ul>
      <li>Invention Name:<a href= inventions/${this.id} data-id= ${this.id} class= "show_link"> ${this.name}</a> </li>
    </ul>`
  )
}

//Method for prototype to add relation data objects as HTML
Invention.prototype.showHTML= function(){
  return(
  ` <h2>Name:${this.name}</h2>
    <h3>Inventor: ${this.user_name}</h3>
    <h3>Description: ${this.description}</h3>
    <h3>Investments total: $${this.invention_investments.sum("amount")}<h3>`

  )
}

// method for Invention ojbects invention_investments amount sum
Array.prototype.sum = function (prop) {
   var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
      total += this[i][prop]
    }
 return total
}
// Listener functions to be run on document ready
function activateListeners(){
  moreInventionData();
  invSubmit();
}

// Listeners
function moreInventionData(){
$('#get-inventions').on('click', function(e) {
  $('#html_format').html('')
   history.replaceState(null, null, "/inventions");
   e.preventDefault();
   getInventions();
 });

  $(document).on('click', ".show_link", function(e){
    e.preventDefault();
    $('#ajax_invention_data').html('')
    let id= $(this).attr('data-id')
    //history.pushState(null, null, /${id});
    fetch(`inventions/${id}.json`)
    .then(res => res.json())
    .then(invention => {
      let newInvention= new Invention(invention)
      let inventionHTML= newInvention.showHTML()
      $('#ajax_invention_data').append(inventionHTML)
    })
  })
}

  function invSubmit(){
    $("#newInv").on("submit", function(e){
      e.preventDefault();

      const values= $(this).serialize()

      $.post("/inventions", values).done(function(data){
        $("#app-container").html("");
        const newInv= new Invention(data)
        const html= newInv.showHTML()
        $("#app-container").append(html)
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
      var invention= new Invention(obj);
      var html= invention.addHTML();
      $('#ajax_invention_data').append(html)
    });
      $('#title-placement').append("<h1> Inventions</h1>")
  });
}
