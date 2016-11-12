//file1.js
(function() {
	var tree = 'oak';

		console.log('Дерево: ' + tree)  /*RemoveLogging:skip*/; 

tree += 3;

alert(tree);

//confirm();

$(window.document).ready(function () {
$('.content').append(tree);
}

);

} ());		