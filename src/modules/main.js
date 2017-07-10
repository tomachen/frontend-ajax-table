
$.getJSON("http://www.mocky.io/v2/55f748b33568195d044b3dc8", function(data) {
  var items = [];
  $.each( data, function(key, value) {
    items.push( "<tr>" )
    items.push( "<td>" + value.picture + "</td>")
    items.push( "<td>" + value.name.first + value.name.last + "</td>" )
    items.push( "<td>" + value.isActive + "</td>")
    items.push( "<td>" + value.about + "</td>")
    items.push( "<td>" + value.balance + "</td>" )
    items.push( "<td>" + value.age + "</td>")
    items.push( "<td>" + value.registered + "</td>")
    items.push( "<td>" + value.company + "</td>")
    items.push( "<td>" + value.email + "</td>")
    items.push( "<td>" + value.phone + "</td>")
    items.push( "<td>" + value.address + "</td>")
    items.push( "</tr>" )
  });
$("#table").append( items );
})
