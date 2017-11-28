function getProducts(id) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/api/products' + (id ? '/' + id : ''), true);
	xhr.onload = function (e) {
	  if (xhr.readyState === 4) {
		if (xhr.status === 200) {
		  var response = JSON.parse(xhr.responseText);
			
			$('#results').html(tree(response));
		} else {
			console.log('Error');
		  console.error(xhr.statusText);
		}
	  }
	};
	xhr.onerror = function (e) {
		console.log('Error');
	  console.error(xhr.statusText);
	};
	
	xhr.send(null);
	
	return false;
}

function tree(data) {    
    if (typeof(data) == 'object') {        
        var ul = $('<ul>');
        for (var i in data) {            
            ul.append($('<li>').text(i).append(tree(data[i])));         
        }        
        return ul;
    } else {       
        var textNode = document.createTextNode(' => ' + data);
        return textNode;
    }
}