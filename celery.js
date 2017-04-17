(function celery(doc){
  doc.querySelectorAll('*').forEach(function(element){
    element.oncontextmenu = element.ondragstart = element.onselectstart = element.onselect = element.oncopy = element.onbeforecopy = element.onmouseup = null;
    try {
      element.contentDocument && celery(element.contentDocument)
    } catch(e){}
  });
  var style = doc.createElement('style');
  style.innerHTML = '*{-webkit-user-select:text!important;-moz-user-select:text!important;user-select:text!important;}';
  doc.body.appendChild(style);
}(document));