function isURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(str);
}

$(document).on('click', function(e) {
	// Classes we care about: _1qt4, _1qt5, _1ht6, _1htf
	setTimeout(function() { 
		var $this = $(e.target);
		if ($this.hasClass('_1htf') || $this.hasClass('_1ht6') || 
			$this.hasClass('_1qt5') || $this.hasClass('_1qt4')) {
			var msgs = $('._3oh-');
			msgs.each(function(idx, el) {
				var text = $(el).text();
				if (isURL(text)) {
					chrome.runtime.sendMessage({
						method: 'POST',
					    action: 'xhttp',
					    url: 'http://localhost:3000/msg',
					    data: text
					}, function (responseText) {
						console.log(responseText);
					});
				}
			});
		}
	}, 2000);
});

setTimeout(function () {
	var target = $('._4_j4').get(0);

	var observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
	    
	  });    
	});

	var config = { attributes: true, childList: true, characterData: true, subtree: true };

	observer.observe(target, config);
}, 5000);