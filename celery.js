(function celery(doc) {
  // uglify 优化
  var parentNode = 'parentNode';
  var replaceChild = 'replaceChild';
  var innerHTML = 'innerHTML';
  var documentElement = 'documentElement';
  var createElement = 'createElement';
  var forEach = 'forEach';
  var _script = 'script';
  var events = 'contextmenu dragstart selectstart select copy beforecopy mouseup mousedown'.split(' ');

  function noop() {}

  function remove(element) {
    element[parentNode].removeChild(element);
  }

  function query(selecter) {
    return [].slice.call(doc.querySelectorAll(selecter));
  }

  function strip(element) {
    events[forEach](function (event) {
      // 移除 DOM 0 事件
      element['on' + event] = null;
    });
    var done;

    function deep() {
      _setTimeout(function () {
        if (!done) {
          try {
            var contentDocument = element.contentDocument;
            if (contentDocument.body.childNodes.length) {
              done = 1;
              celery(contentDocument);
            }
          } catch (e) {
            done = 0;
          };
        }
      }, 100);
    }

    deep();
    element.onload = deep;
  }

  // 清空所有定时器
  for (var i = setTimeout(noop, 0); i >= 0; i--) {
    clearTimeout(i);
  };
  for (i = setInterval(noop, 1e8); i >= 0; i--) {
    clearInterval(i);
  };

  var _setTimeout = setTimeout;

  // 覆盖掉延时方法
  setTimeout = setInterval = noop;

  // 通过替换 DOM 的方式移除节点上的监听事件
  query(_script)[forEach](remove);

  // frame 不能通过 innerHTML 完全重建，缓存起来
  var frames = [];
  query('iframe,frame')[forEach](function (frame) {
    frames.push(frame);
    frame[parentNode][replaceChild](doc[createElement](_script), frame);
  })

  var old = doc[documentElement][innerHTML];
  doc.open();
  doc.write('<!DOCTYPE html>');
  doc.close();
  doc[documentElement][innerHTML] = old;

  // 替换回 frame
  query(_script)[forEach](function (script) {
    frames.length && script[parentNode][replaceChild](frames.shift(), script);
  })

  query('*')[forEach](strip);
  strip(doc);

  events[forEach](function (event) {
    // 阻止事件传播
    doc.addEventListener(event, function (e) {
      e.stopPropagation();
    }, true);
  });

  // 移除通过样式禁用选择
  var style = doc[createElement]('style');
  style[innerHTML] = '*{-webkit-user-select:text!important;-moz-user-select:text!important;user-select:text!important;}';
  doc.body.appendChild(style);
}(document));