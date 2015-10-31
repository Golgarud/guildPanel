/*!
 * Webogram v0.5.0 - messaging web application for MTProto
 * https://github.com/zhukov/webogram
 * Copyright (C) 2014 Igor Zhukov <igor.beatle@gmail.com>
 * https://github.com/zhukov/webogram/blob/master/LICENSE
 */

'use strict';

/* EmojiHelper */

(function (global, emojis, categories, spritesheets) {


  var emojis = {};
  var shortcuts = {};
  var spritesheetPositions = {};
  var index = false;

  var popular = 'joy,kissing_heart,heart,heart_eyes,blush,grin,+1,relaxed,pensive,smile,sob,kiss,unamused,flushed,stuck_out_tongue_winking_eye,see_no_evil,wink,smiley,cry,stuck_out_tongue_closed_eyes,scream,rage,smirk,disappointed,sweat_smile,kissing_closed_eyes,speak_no_evil,relieved,grinning,yum,laughing,ok_hand,neutral_face,confused'.split(',');

  var i, j, code, shortcut, emoji, row, column, totalColumns;
  var len1, len2;

  for (i = 0, len1 = categories.length; i < len1; i++) {
    totalColumns = spritesheets[i][1];
    for (j = 0, len2 = categories[i].length; j < len2; j++) {
      code = categories[i][j];
      emoji = Config.Emoji[code];
      shortcut = emoji[1][0];
      emojis[code] = [emoji[0], shortcut];
      shortcuts[shortcut] = code;
      spritesheetPositions[code] = [i, j, Math.floor(j / totalColumns), j % totalColumns];
    }
  }

  function getPopularEmoji (callback) {
    ConfigStorage.get('emojis_popular', function (popEmojis) {
      var result = [];
      if (popEmojis && popEmojis.length) {
        for (var i = 0, len = popEmojis.length; i < len; i++) {
          result.push({code: popEmojis[i][0], rate: popEmojis[i][1]});
        }
        callback(result);
        return;
      };
      ConfigStorage.get('emojis_recent', function (recentEmojis) {
        recentEmojis = recentEmojis || popular || [];
        var shortcut, code;
        for (var i = 0, len = recentEmojis.length; i < len; i++) {
          shortcut = recentEmojis[i];
          if (Array.isArray(shortcut)) {
            shortcut = shortcut[0];
          }
          if (shortcut && typeof shortcut === 'string') {
            if (shortcut.charAt(0) == ':') {
              shortcut = shortcut.substr(1, shortcut.length - 2);
            }
            if (code = shortcuts[shortcut]) {
              result.push({code: code, rate: 1});
            }
          }
        }
        callback(result);
      });
    });
  }

  function pushPopularEmoji (code) {
    getPopularEmoji(function (popularEmoji) {
      var exists = false;
      var count = popularEmoji.length;
      var result = [];
      for (var i = 0; i < count; i++) {
        if (popularEmoji[i].code == code) {
          exists = true;
          popularEmoji[i].rate++;
        }
        result.push([popularEmoji[i].code, popularEmoji[i].rate]);
      }
      if (exists) {
        result.sort(function (a, b) {
          return b[1] - a[1];
        });
      } else {
        if (result.length > 41) {
          result = result.slice(0, 41);
        }
        result.push([code, 1]);
      }
      ConfigStorage.set({emojis_popular: result});
    });
  }

  function indexEmojis () {
    if (index === false) {
      index = SearchIndexManager.createIndex();
      var shortcut;
      for (shortcut in shortcuts) {
        if (shortcuts.hasOwnProperty(shortcut)) {
          SearchIndexManager.indexObject(shortcuts[shortcut], shortcut, index);
        }
      }
    }
  }

  function searchEmojis (q) {
    indexEmojis();
    var foundObject = SearchIndexManager.search(q, index);
    var foundCodes = [];
    var code;
    for (code in foundObject) {
      if (foundObject.hasOwnProperty(code)) {
        foundCodes.push(code);
      }
    }
    return foundCodes;
  }

  global.EmojiHelper = {
    emojis: emojis,
    shortcuts: shortcuts,
    spritesheetPositions: spritesheetPositions,
    getPopularEmoji: getPopularEmoji,
    pushPopularEmoji: pushPopularEmoji,
    indexEmojis: indexEmojis,
    searchEmojis: searchEmojis
  };

})(window, Config.Emoji, Config.EmojiCategories, Config.EmojiCategorySpritesheetDimens);


function EmojiTooltip (btnEl, options) {
  options = options || {};
  var self = this;

  this.btnEl = $(btnEl);
  this.onEmojiSelected = options.onEmojiSelected;
  this.onStickerSelected = options.onStickerSelected;
  this.getStickers = options.getStickers;
  this.getStickerImage = options.getStickerImage;
  this.onStickersetSelected = options.onStickersetSelected;
  this.langpack = options.langpack || {};

  if (!Config.Navigator.touch) {
    $(this.btnEl).on('mouseenter mouseleave', function (e) {
      self.isOverBtn = e.type == 'mouseenter';
      self.createTooltip();

      if (self.isOverBtn) {
        self.onMouseEnter(true);
      } else {
        self.onMouseLeave(true);
      }
    });
  }
  $(this.btnEl).on('mousedown', function (e) {
    if (!self.shown) {
      clearTimeout(self.showTimeout);
      delete self.showTimeout;
      self.createTooltip();
      self.show();
    } else {
      clearTimeout(self.hideTimeout);
      delete self.hideTimeout;
      self.hide();
    }
    return cancelEvent(e);
  });
  $(document).on('mousedown', function (e) {
    if (self.shown) {
      self.hide();
    }
  });
}

EmojiTooltip.prototype.onMouseEnter = function (triggerShow) {
  if (this.hideTimeout) {
    clearTimeout(this.hideTimeout);
    delete this.hideTimeout;
  }
  else if (triggerShow && !this.showTimeout) {
    this.showTimeout = setTimeout(this.show.bind(this), 100);
  }
};

EmojiTooltip.prototype.onMouseLeave = function (triggerUnshow) {
  if (!this.hideTimeout) {
    var self = this;
    this.hideTimeout = setTimeout(function () {
      self.hide();
    }, 600);
  }
  else if (triggerUnshow && this.showTimeout) {
    clearTimeout(this.showTimeout);
    delete this.showTimeout;
  }
};



EmojiTooltip.prototype.createTooltip = function () {
  if (this.tooltipEl) {
    return false;
  }

  var html =
'<div class="composer_emoji_tooltip noselect">\
  <div class="composer_emoji_tooltip_tabs">\
    <div class="composer_emoji_tooltip_tab composer_emoji_tooltip_tab_emoji">' +this.langpack.im_emoji_tab + '</div>\
    <div class="composer_emoji_tooltip_tab composer_emoji_tooltip_tab_stickers">' +this.langpack.im_stickers_tab + '</div>\
    <div class="composer_emoji_tooltip_tab_shadow"></div>\
  </div>\
  <div class="composer_emoji_tooltip_tabs_wrap">\
    <div class="composer_emoji_tooltip_tabs_contents clearfix">\
      <div class="composer_emoji_tooltip_tab_emoji_content">\
        <div class="composer_emoji_tooltip_content_wrap">\
          <div class="composer_emoji_tooltip_content composer_emoji_tooltip_content_emoji clearfix"></div>\
        </div>\
        <div class="composer_emoji_tooltip_categories">\
          <a class="composer_emoji_tooltip_category active" data-category="0"><i class="composer_emoji_tooltip_category_recent"></i></a>\
          <a class="composer_emoji_tooltip_category" data-category="1"><i class="composer_emoji_tooltip_category_smile"></i></a>\
          <a class="composer_emoji_tooltip_category" data-category="2"><i class="composer_emoji_tooltip_category_flower"></i></a>\
          <a class="composer_emoji_tooltip_category" data-category="3"><i class="composer_emoji_tooltip_category_bell"></i></a>\
          <a class="composer_emoji_tooltip_category" data-category="4"><i class="composer_emoji_tooltip_category_car"></i></a>\
          <a class="composer_emoji_tooltip_category" data-category="5"><i class="composer_emoji_tooltip_category_grid"></i></a>\
        </div>\
      </div>\
      <div class="composer_emoji_tooltip_tab_stickers_content">\
        <div class="composer_emoji_tooltip_content_wrap">\
            <div class="composer_emoji_tooltip_content composer_emoji_tooltip_content_stickers clearfix"></div>\
          </div>\
          <div class="composer_emoji_tooltip_categories"></div>\
      </div>\
    </div>\
  </div>\
  <div class="composer_emoji_tooltip_tail"><i class="icon icon-tooltip-tail"></i></div>\
</div>';

  html = html.replace(/>\s+</g, '><');

  var self = this;
  this.tooltipEl = $(html).appendTo(document.body);

  this.tabsEl = $('.composer_emoji_tooltip_tabs', this.tooltipEl);
  this.categoriesEl = $('.composer_emoji_tooltip_categories', this.tooltipEl);
  this.stickersCategoriesEl = $('.composer_emoji_tooltip_tab_stickers_content .composer_emoji_tooltip_categories', this.tooltipEl);

  this.contentEl = $('.composer_emoji_tooltip_content', this.tooltipEl);
  this.emojiContentEl = $('.composer_emoji_tooltip_content_emoji', this.tooltipEl);
  this.stickersContentEl = $('.composer_emoji_tooltip_content_stickers', this.tooltipEl);

  // Tabs
  angular.forEach(['emoji', 'stickers'], function (tabName, tabIndex) {
    var tab = $('.composer_emoji_tooltip_tab_' + tabName, self.tabsEl)
      .on('mousedown', function (e) {
        self.selectTab(tabIndex);
        return cancelEvent(e);
      });

    if (!Config.Navigator.touch) {
      tab.on('mouseenter mouseleave', function (e) {
        clearTimeout(self.selectTabTimeout);
        if (e.type == 'mouseenter') {
          self.selectTabTimeout = setTimeout(function () {
            self.selectTab(tabIndex);
          }, 300);
        }
      });
    }
  });

  // Categories
  var handleEvents = 'mousedown';
  if (!Config.Navigator.touch) {
    handleEvents += ' mouseover mouseout';
  }
  this.categoriesEl.on(handleEvents, function (e) {
    e = e.originalEvent || e;
    var target = e.target;
    if (target.tagName != 'A') {
      target = target.parentNode;
    }
    if (target.tagName != 'A') {
      return;
    }
    var catIndex = parseInt(target.getAttribute('data-category'));
    if (e.type == 'mousedown') {
      self.selectCategory(catIndex);
      return cancelEvent(e);
    }
    if (self.tab) {
      return;
    }
    var isOver = e.type == 'mouseover';
    if (isOver && self.selectCategoryIndex == catIndex) {
      return;
    }
    clearTimeout(self.selectCategoryTimeout);
    delete self.selectCategoryTimeout;
    if (isOver) {
      self.selectCategoryIndex = catIndex;
      self.selectCategoryTimeout = setTimeout(function () {
        delete self.selectCategoryIndex;
        delete self.selectCategoryTimeout;
        self.selectCategory(catIndex);
      }, 300);
    } else {
      delete self.selectCategoryIndex;
    }
  });

  this.emojiScroller = new Scroller(this.emojiContentEl, {classPrefix: 'composer_emoji_tooltip'});
  this.stickersScroller = new Scroller(this.stickersContentEl, {classPrefix: 'composer_emoji_tooltip'});
  this.stickersScroller.onScroll(function (el, st) {
    self.onStickersScroll(el, st);
  });

  this.contentEl.on('mousedown', function (e) {
    e = e.originalEvent || e;
    var target = $(e.target), code, sticker, stickerset;
    if (target[0].tagName != 'A') {
      target = $(target[0].parentNode);
    }
    if (code = target.attr('data-code')) {
      if (self.onEmojiSelected) {
        self.onEmojiSelected(code);
      }
      EmojiHelper.pushPopularEmoji(code);
    }
    if (sticker = target.attr('data-sticker')) {
      if (self.onStickerSelected) {
        self.onStickerSelected(sticker);
      }
      if (Config.Mobile) {
        self.hide();
      }
    }
    if (stickerset = target.attr('data-stickerset')) {
      if (self.onStickersetSelected) {
        self.onStickersetSelected(stickerset);
      }
      self.hide();
    }
    return cancelEvent(e);
  });

  if (!Config.Navigator.touch) {
    this.tooltipEl.on('mouseenter mouseleave', function (e) {
      if (e.type == 'mouseenter') {
        self.onMouseEnter();
      } else {
        self.onMouseLeave();
      }
    });
  }

  this.selectTab(0);

  $(window).on('resize', this.updatePosition.bind(this));

  return true;
}


EmojiTooltip.prototype.selectCategory = function (cat, force) {
  if (this.cat === cat && !force) {
    return false;
  }
  $('.active', this.categoriesEl).removeClass('active');
  this.cat = cat;

  if (this.tab) {
    this.activateStickerCategory();
    this.updateStickersContents(force);
  } else {
    $(this.categoriesEl[this.tab].childNodes[cat]).addClass('active');
    this.updateEmojiContents();
  }
};

EmojiTooltip.prototype.selectTab = function (tab, force) {
  if (this.tab === tab && !force) {
    return false;
  }

  this.tab = tab;
  this.selectCategory(0, true);

  var self = this;
  setTimeout(function () {
    $(self.tooltipEl).toggleClass('composer_emoji_tooltip_tabs_stickers_active', tab == 1);
  }, 0);
};

EmojiTooltip.prototype.updateEmojiContents = function () {
  var html = [];
  var self = this;
  var iconSize = 26;

  var renderContent = function () {
    self.emojiContentEl.html(html.join(''));
    self.emojiScroller.reinit();
  }

  if (this.cat > 0) {
    var categoryIndex = this.cat - 1;
    var emoticonCodes = Config.EmojiCategories[categoryIndex];
    var totalColumns = Config.EmojiCategorySpritesheetDimens[categoryIndex][1];
    var count = emoticonCodes.length;
    var emoticonCode, emoticonData, i, x, y;

    for (i = 0; i < count; i++) {
      emoticonCode = emoticonCodes[i];
      emoticonData = Config.Emoji[emoticonCode];
      x = iconSize * (i % totalColumns);
      y = iconSize * Math.floor(i / totalColumns);
      html.push('<a class="composer_emoji_btn" title=":' + encodeEntities(emoticonData[1][0]) + ':" data-code="' + encodeEntities(emoticonCode) + '"><i class="emoji emoji-w' + iconSize + ' emoji-spritesheet-' + categoryIndex + '" style="background-position: -' + x + 'px -' + y + 'px;"></i></a>');
    }
    renderContent();
  }
  else {
    EmojiHelper.getPopularEmoji(function (popularEmoji) {
      var emoticonCode, emoticonData, spritesheet, pos, categoryIndex;
      var count = popularEmoji.length;
      var i, x, y;

      for (i = 0; i < count; i++) {
        emoticonCode = popularEmoji[i].code;
        if (emoticonData = Config.Emoji[emoticonCode]) {
          spritesheet = EmojiHelper.spritesheetPositions[emoticonCode];
          categoryIndex = spritesheet[0];
          pos = spritesheet[1];
          x = iconSize * spritesheet[3];
          y = iconSize * spritesheet[2];
          html.push('<a class="composer_emoji_btn" title=":' + encodeEntities(emoticonData[1][0]) + ':" data-code="' + encodeEntities(emoticonCode) + '"><i class="emoji emoji-w' + iconSize + ' emoji-spritesheet-' + categoryIndex + '" style="background-position: -' + x + 'px -' + y + 'px;"></i></a>');
        }
      }
      renderContent();
    });
  }
};

EmojiTooltip.prototype.updateStickersContents = function (force) {
  var html = [];
  var categoriesHtml = [];
  var self = this;
  var iconSize = 26;

  var scrollStickers = function () {
    var scrollTop = self.cat ? self.stickersetPositions[self.cat][0] : 0;
    self.stickersScroller.scrollTo(scrollTop, force ? 0 : 200);
  }

  if (!force && self.stickersetPositions.length) {
    scrollStickers();
    return;
  }

  var renderStickers = function (stickersets) {
    var set, docID, i, j, len1, len2;
    for (i = 0, len1 = stickersets.length; i < len1; i++) {
      set = stickersets[i];
      if (!set.docIDs.length) {
        continue;
      }
      html.push('<div class="composer_stickerset_wrap clearfix">');
      if (set.title) {
        html.push(
          '<a class="composer_stickerset_title',
          set.id ? '' : ' disabled',
          '" data-stickerset="',
          encodeEntities(set.short_name),
          '">',
          encodeEntities(set.title),
          '</a>'
        );
      }
      if (!set.id) {
        categoriesHtml.push('<a class="composer_emoji_tooltip_category active" data-category="0"><i class="composer_emoji_tooltip_category_recent"></i></a>');
      } else {
        categoriesHtml.push('<a class="composer_sticker_btn" data-sticker="' + set.docIDs[0] + '" data-category="' + i + '"></a>');
      }
      for (j = 0, len2 = set.docIDs.length; j < len2; j++) {
        docID = set.docIDs[j];
        html.push('<a class="composer_sticker_btn" data-sticker="' + docID + '"></a>');
      }
      html.push('</div>');
    }

    self.stickersContentEl.html(html.join(''));
    self.stickersCategoriesEl.html(categoriesHtml.join(''));
    self.stickersScroller.reinit();

    var scrollPositions = [];
    $('.composer_stickerset_wrap', self.stickersContentEl).each(function (k, stickerSetEl) {
      var height = stickerSetEl.offsetHeight;
      var top = stickerSetEl.offsetTop;
      scrollPositions.push([top, height]);
    });
    self.stickersetPositions = scrollPositions;
    scrollStickers();

    var preload = [];
    self.contentEl.find('.composer_sticker_btn').each(function (k, element) {
      if (k < 12) {
        self.replaceStickerImage(element);
      } else {
        preload.push([element.offsetTop, element]);
      }
    });
    self.stickersPreload = preload;

    self.stickersCategoriesEl.find('.composer_sticker_btn').each(function (k, element) {
      self.replaceStickerImage(element);
    });
  };
  this.getStickers(renderStickers);
};

EmojiTooltip.prototype.replaceStickerImage = function (element) {
  element = $(element);
  this.getStickerImage(element, element.attr('data-sticker'));
}

EmojiTooltip.prototype.onStickersScroll = function (scrollable, scrollTop) {
  var ch = scrollable.clientHeight;
  var sh = scrollable.scrollHeight;
  var len = this.stickersetPositions.length;
  var currentCat = false;
  var currentPos, i;

  if (scrollTop < 20) {
    currentCat = 0;
  } else if (scrollTop > sh - ch - 20) {
    currentCat = len - 1;
  } else {
    for (i = 0; i < len; i++) {
      currentPos = this.stickersetPositions[i];
      if (scrollTop >= currentPos[0] &&
          scrollTop < (currentPos[0] + currentPos[1])) {
        currentCat = i;
        break;
      }
    }
  }
  var len = this.stickersPreload.length;
  if (len) {
    for (i = 0; i < len; i++) {
      currentPos = this.stickersPreload[i];
      if (currentPos[0] >= scrollTop && currentPos[0] <= scrollTop + ch) {
        // console.log('replace', currentPos[1], i);
        this.replaceStickerImage(currentPos[1]);
        this.stickersPreload.splice(i, 1);
        i--;
        len--;
      }
    }
  }
  // console.log('on sticker scroll', scrollTop, ch, sh, currentCat, this.stickersetPositions);
  if (this.cat === currentCat || currentCat === false) {
    return;
  }
  $('.active', this.categoriesEl).removeClass('active');
  this.cat = currentCat;
  this.activateStickerCategory();
};

EmojiTooltip.prototype.activateStickerCategory = function () {
  var categoriesEl = this.categoriesEl[1];
  var categoryEl = categoriesEl.childNodes[this.cat];
  if (!categoryEl) {
    return;
  }
  $(categoryEl).addClass('active');

  var left = categoryEl.offsetLeft;
  var width = categoryEl.offsetWidth;
  var viewportWidth = categoriesEl.clientWidth;

  // console.log('current cat el', categoryEl, left, width, viewportWidth);
  $(categoriesEl).animate({scrollLeft: left - (viewportWidth - width) / 2}, 200);
}


EmojiTooltip.prototype.updatePosition = function () {
  var offset = this.btnEl.offset();
  this.tooltipEl.css({top: offset.top, left: offset.left});
};

EmojiTooltip.prototype.show = function () {
  this.updatePosition();
  if (this.tab) {
    this.updateStickersContents(true);
  } else {
    this.updateEmojiContents();
  }
  this.tooltipEl.addClass('composer_emoji_tooltip_shown');
  this.btnEl.addClass('composer_emoji_insert_btn_on');
  delete this.showTimeout;
  this.shown = true;
};

EmojiTooltip.prototype.hide = function () {
  if (this.tooltipEl) {
    this.tooltipEl.removeClass('composer_emoji_tooltip_shown');
    this.btnEl.removeClass('composer_emoji_insert_btn_on');
  }
  delete this.hideTimeout;
  delete this.shown;
};




function EmojiPanel (containerEl, options) {
  options = options || {};
  var self = this;

  this.containerEl = $(containerEl);
  this.onEmojiSelected = options.onEmojiSelected;

  this.containerEl.on('mousedown', function (e) {
    e = e.originalEvent || e;
    var target = $(e.target), code;
    if (target[0].tagName != 'A') {
      target = $(target[0].parentNode);
    }
    if (code = target.attr('data-code')) {
      if (self.onEmojiSelected) {
        self.onEmojiSelected(code);
      }
      EmojiHelper.pushPopularEmoji(code);
    }
    return cancelEvent(e);
  });

  this.update();
}

EmojiPanel.prototype.update = function () {
  var html = [];
  var self = this;
  var iconSize = Config.Mobile ? 26 : 20;

  EmojiHelper.getPopularEmoji(function (popularEmoji) {
    var emoticonCode, emoticonData, spritesheet, pos, categoryIndex;
    var count = popularEmoji.length;
    var i, x, y;

    for (i = 0; i < count; i++) {
      emoticonCode = popularEmoji[i].code;
      if (emoticonData = Config.Emoji[emoticonCode]) {
        spritesheet = EmojiHelper.spritesheetPositions[emoticonCode];
        categoryIndex = spritesheet[0];
        pos = spritesheet[1];
        x = iconSize * spritesheet[3];
        y = iconSize * spritesheet[2];
        html.push('<a class="composer_emoji_btn" title=":' + encodeEntities(emoticonData[1][0]) + ':" data-code="' + encodeEntities(emoticonCode) + '"><i class="emoji emoji-w20 emoji-spritesheet-' + categoryIndex + '" style="background-position: -' + x + 'px -' + y + 'px;"></i></a>');
      }
    }
    self.containerEl.html(html.join(''));
  });
}





function MessageComposer (textarea, options) {
  this.textareaEl = $(textarea);

  this.setUpInput();

  this.autoCompleteWrapEl = $('<div class="composer_dropdown_wrap"></div>').appendTo(document.body);
  this.autoCompleteEl = $('<ul class="composer_dropdown dropdown-menu"></ul>').appendTo(this.autoCompleteWrapEl);

  this.scroller = new Scroller(this.autoCompleteEl, {maxHeight: 180});

  var self = this;
  this.autoCompleteEl.on('mousedown', function (e) {
    e = e.originalEvent || e;
    var target = $(e.target), mention, code, command;
    if (target[0].tagName != 'A') {
      target = $(target[0].parentNode);
    }
    if (code = target.attr('data-code')) {
      if (self.onEmojiSelected) {
        self.onEmojiSelected(code, true);
      }
      EmojiHelper.pushPopularEmoji(code);
    }
    if (mention = target.attr('data-mention')) {
      self.onMentionSelected(mention);
    }
    if (command = target.attr('data-command')) {
      if (self.onCommandSelected) {
        self.onCommandSelected(command);
      }
      self.hideSuggestions();
    }
    return cancelEvent(e);
  });

  this.isActive = false;

  this.onTyping = options.onTyping;
  this.onMessageSubmit = options.onMessageSubmit;
  this.getSendOnEnter = options.getSendOnEnter;
  this.onFilePaste = options.onFilePaste;
  this.mentions = options.mentions;
  this.commands = options.commands;
  this.getPeerImage = options.getPeerImage;
  this.onCommandSend = options.onCommandSend;
}

MessageComposer.autoCompleteRegEx = /(\s|^)(:|@|\/)([A-Za-z0-9\-\+\*@_]*)$/;


MessageComposer.prototype.setUpInput = function () {
  if ('contentEditable' in document.body) {
    this.setUpRich();
  } else {
    this.setUpPlaintext();
  }

  if (!Config.Mobile) {
    var sbWidth = getScrollWidth();
    if (sbWidth) {
      (this.richTextareaEl || this.textareaEl).css({marginRight: -sbWidth});
    }
  }
}

MessageComposer.prototype.setUpRich = function () {
  this.textareaEl.hide();
  this.richTextareaEl = $('<div class="composer_rich_textarea" contenteditable="true" dir="auto"></div>');

  this.textareaEl[0].parentNode.insertBefore(this.richTextareaEl[0], this.textareaEl[0]);

  this.richTextareaEl.on('keyup keydown', this.onKeyEvent.bind(this));
  this.richTextareaEl.on('focus blur', this.onFocusBlur.bind(this));
  this.richTextareaEl.on('paste', this.onRichPaste.bind(this));
  this.richTextareaEl.on('DOMNodeInserted', this.onRichPasteNode.bind(this));

  $(document.body).on('keydown', this.backupSelection.bind(this));
}

MessageComposer.prototype.setUpPlaintext = function () {
  this.textareaEl.on('keyup keydown', this.onKeyEvent.bind(this));
  this.textareaEl.on('focus blur', this.onFocusBlur.bind(this));
}

MessageComposer.prototype.onKeyEvent = function (e) {
  var self = this;
  if (e.type == 'keyup') {
    this.checkAutocomplete();

    var length = false;
    if (this.richTextareaEl) {
      clearTimeout(this.updateValueTO);
      var now = tsNow();
      if (this.keyupStarted === undefined) {
        this.keyupStarted = now;
      }
      if (now - this.keyupStarted > 10000) {
        this.onChange();
      }
      else {
        length = this.richTextareaEl[0].textContent.length;
        if (this.wasEmpty != !length) {
          this.wasEmpty = !this.wasEmpty;
          this.onChange();
        } else {
          this.updateValueTO = setTimeout(this.onChange.bind(this), 1000);
        }
      }
    }

    if (this.onTyping) {
      var now = tsNow();
      if (now - this.lastTyping > 5000) {
        if (length === false) {
          length = (this.richTextareaEl ? this.richTextareaEl[0].textContent : this.textareaEl[0].value).length;
        }

        if (length != this.lastLength) {
          this.lastTyping = now;
          this.lastLength = length;
          this.onTyping();
        }
      }
    }
  }
  if (e.type == 'keydown') {
    var checkSubmit = !this.autocompleteShown;
    if (this.autocompleteShown) {
      if (e.keyCode == 38 || e.keyCode == 40) { // UP / DOWN
        var next = e.keyCode == 40;
        var currentSelected = $(this.autoCompleteEl).find('.composer_autocomplete_option_active');

        if (currentSelected.length) {
          var currentSelectedWrap = currentSelected[0].parentNode;
          var nextWrap = currentSelectedWrap[next ? 'nextSibling' : 'previousSibling'];
          currentSelected.removeClass('composer_autocomplete_option_active');
          if (nextWrap) {
            $(nextWrap).find('a').addClass('composer_autocomplete_option_active');
            this.scroller.scrollToNode(nextWrap);
            return cancelEvent(e);
          }
        }

        var childNodes = this.autoCompleteEl[0].childNodes;
        var nextWrap = childNodes[next ? 0 : childNodes.length - 1];
        this.scroller.scrollToNode(nextWrap);
        $(nextWrap).find('a').addClass('composer_autocomplete_option_active');

        return cancelEvent(e);
      }

      if (e.keyCode == 13 || e.keyCode == 9) { // Enter or Tab
        var currentSelected = $(this.autoCompleteEl).find('.composer_autocomplete_option_active');
        if (!currentSelected.length && e.keyCode == 9) {
          currentSelected = $(this.autoCompleteEl[0].childNodes[0]).find('a');
        }
        var code, mention, command;
        if (code = currentSelected.attr('data-code')) {
          this.onEmojiSelected(code, true);
          EmojiHelper.pushPopularEmoji(code);
          return cancelEvent(e);
        }
        if (mention = currentSelected.attr('data-mention')) {
          this.onMentionSelected(mention);
          return cancelEvent(e);
        }
        if (command = currentSelected.attr('data-command')) {
          if (this.onCommandSelected) {
            this.onCommandSelected(command, e.keyCode == 9);
          }
          return cancelEvent(e);
        }
        checkSubmit = true;
      }
    }

    if (checkSubmit && e.keyCode == 13) {
      var submit = false;
      var sendOnEnter = true;
      if (this.getSendOnEnter && !this.getSendOnEnter()) {
        sendOnEnter = false;
      }
      if (sendOnEnter && !e.shiftKey) {
        submit = true;
      } else if (!sendOnEnter && (e.ctrlKey || e.metaKey)) {
        submit = true;
      }

      if (submit) {
        this.onMessageSubmit(e);
        return cancelEvent(e);
      }
    }
  }
}

MessageComposer.prototype.backupSelection = function () {
  delete this.selection;

  if (!this.isActive) {
    return;
  }
  if (window.getSelection) {
    var sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      this.selection = sel.getRangeAt(0);
    }
  } else if (document.selection && document.selection.createRange) {
    this.selection = document.selection.createRange();
  }
}

MessageComposer.prototype.restoreSelection = function () {
  if (!this.selection) {
    return false;
  }
  var result = false;
  if (window.getSelection) {
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(this.selection);
    result = true;
  }
  else if (document.selection && this.selection.select) {
    this.selection.select();
    result = true;
  }
  delete this.selection;

  return result;
}



MessageComposer.prototype.checkAutocomplete = function (forceFull) {
  var pos, value;
  if (this.richTextareaEl) {
    var textarea = this.richTextareaEl[0];
    var valueCaret = getRichValueWithCaret(textarea);
    var value = valueCaret[0];
    var pos = valueCaret[1] >= 0 ? valueCaret[1] : value.length;

    if (!pos) {
      this.cleanRichTextarea(value, true);
    }
  } else {
    var textarea = this.textareaEl[0];
    var pos = getFieldSelection(textarea);
    var value = textarea.value;
  }

  if (!forceFull) {
    value = value.substr(0, pos);
  }

  var matches = value.match(MessageComposer.autoCompleteRegEx);
  if (matches) {
    if (this.previousQuery == matches[0]) {
      return;
    }
    this.previousQuery = matches[0];
    var query = SearchIndexManager.cleanSearchText(matches[3]);

    if (matches[2] == '@') { // mentions
      if (this.mentions && this.mentions.index) {
        if (query.length) {
          var foundObject = SearchIndexManager.search(query, this.mentions.index);
          var foundUsers = [];
          var user;
          for (var i = 0, length = this.mentions.users.length; i < length; i++) {
            user = this.mentions.users[i];
            if (foundObject[user.id]) {
              foundUsers.push(user);
            }
          }
        } else {
          var foundUsers = this.mentions.users;
        }
        if (foundUsers.length) {
          this.showMentionSuggestions(foundUsers);
        } else {
          this.hideSuggestions();
        }
      } else {
        this.hideSuggestions();
      }
    }
    else if (!matches[1] && matches[2] == '/') { // commands
      if (this.commands && this.commands.index) {
        if (query.length) {
          var foundObject = SearchIndexManager.search(query, this.commands.index);
          var foundCommands = [];
          var command;
          for (var i = 0, length = this.commands.list.length; i < length; i++) {
            command = this.commands.list[i];
            if (foundObject[command.value]) {
              foundCommands.push(command);
            }
          }
        } else {
          var foundCommands = this.commands.list;
        }
        if (foundCommands.length) {
          this.showCommandsSuggestions(foundCommands);
        } else {
          this.hideSuggestions();
        }
      } else {
        this.hideSuggestions();
      }
    }
    else if (matches[2] == ':') { // emoji
      EmojiHelper.getPopularEmoji((function (popular) {
        if (query.length) {
          var found = EmojiHelper.searchEmojis(query);
          if (found.length) {
            var popularFound = [],
                code, pos;
            for (var i = 0, len = popular.length; i < len; i++) {
              code = popular[i].code;
              pos = found.indexOf(code);
              if (pos >= 0) {
                popularFound.push(code);
                found.splice(pos, 1);
                if (!found.length) {
                  break;
                }
              }
            }
            this.showEmojiSuggestions(popularFound.concat(found));
          } else {
            this.hideSuggestions();
          }
        } else {
          this.showEmojiSuggestions(popular);
        }
      }).bind(this));
    }
  }
  else {
    delete this.previousQuery;
    this.hideSuggestions();
  }
}

MessageComposer.prototype.onFocusBlur = function (e) {
  this.isActive = e.type == 'focus';

  if (!this.isActive) {
    this.cleanRichTextarea();
    this.hideSuggestions();
  } else {
    setTimeout(this.checkAutocomplete.bind(this), 100);
  }
  if (this.richTextareaEl) {
    document.execCommand('enableObjectResizing', !this.isActive, !this.isActive);
  }
}

MessageComposer.prototype.onRichPaste = function (e) {
  var cData = (e.originalEvent || e).clipboardData,
      items = cData && cData.items || [],
      i;
  for (i = 0; i < items.length; i++) {
    if (items[i].kind == 'file') {
      e.preventDefault();
      return true;
    }
  }

  try {
    var text = cData.getData('text/plain');
  } catch (e) {
    return true;
  }
  setZeroTimeout(this.onChange.bind(this), 0);
  if (text.length) {
    document.execCommand('insertText', false, text);
    return cancelEvent(e);
  }
  return true;
}

MessageComposer.prototype.cleanRichTextarea = function (value, focused) {
  if (value === undefined) {
    value = getRichValue(this.richTextareaEl[0]);
  }
  if (value.match(/^\s*$/) && this.richTextareaEl.html().length > 0) {
    this.richTextareaEl.html('');
    this.lastLength = 0;
    this.wasEmpty = true;

    if (focused) {
      var self = this;
      setZeroTimeout(function () {
        self.focus();
      });
    }
  }
}

MessageComposer.prototype.onRichPasteNode = function (e) {
  var element = (e.originalEvent || e).target,
      src = (element || {}).src || '',
      remove = false;

  if (src.substr(0, 5) == 'data:') {
    remove = true;
    var blob = dataUrlToBlob(src);
    this.onFilePaste(blob);
    setZeroTimeout(function () {
      element.parentNode.replaceChild(document.createTextNode('   '), element);
    })
  }
  else if (src && !src.match(/img\/blank\.gif/)) {
    var replacementNode = document.createTextNode(' ' + src + ' ');
    setTimeout(function () {
      element.parentNode.replaceChild(replacementNode, element);
    }, 100);
  }
}



MessageComposer.prototype.onEmojiSelected = function (code, autocomplete) {
  if (this.richTextareaEl) {
    var textarea = this.richTextareaEl[0];
    if (!this.isActive) {
      if (!this.restoreSelection()) {
        setRichFocus(textarea);
      }
    }
    if (autocomplete) {
      var valueCaret = getRichValueWithCaret(textarea);
      var fullValue = valueCaret[0];
      var pos = valueCaret[1] >= 0 ? valueCaret[1] : fullValue.length;
      var suffix = fullValue.substr(pos);
      var prefix = fullValue.substr(0, pos);
      var matches = prefix.match(/:([A-Za-z0-9\-\+\*_]*)$/);
      var emoji = EmojiHelper.emojis[code];

      var newValuePrefix;
      if (matches && matches[0]) {
        newValuePrefix = prefix.substr(0, matches.index) + ':' + emoji[1] + ':';
      } else {
        newValuePrefix = prefix + ':' + emoji[1] + ':';
      }
      textarea.value = newValue;

      var html;
      if (suffix.length) {
        this.selId = (this.selId || 0) + 1;
        html = this.getRichHtml(newValuePrefix) + '&nbsp;<span id="composer_sel' + this.selId + '"></span>' + this.getRichHtml(suffix);
        this.richTextareaEl.html(html);
        setRichFocus(textarea, $('#composer_sel' + this.selId)[0]);
      } else {
        html = this.getRichHtml(newValuePrefix) + '&nbsp;';
        this.richTextareaEl.html(html);
        setRichFocus(textarea);
      }
    } else {
      var html = this.getEmojiHtml(code);
      if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {

          var el = document.createElement('div');
          el.innerHTML = html;
          var node = el.firstChild;
          var range = sel.getRangeAt(0);
          range.deleteContents();
          range.insertNode(document.createTextNode(' '));
          range.insertNode(node);
          range.setStart(node, 0);

          setTimeout(function() {
            range = document.createRange();
            range.setStartAfter(node);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }, 0);
        }
      } else if (document.selection && document.selection.type != 'Control') {
        document.selection.createRange().pasteHTML(html);
      }
    }
  }
  else {
    var textarea = this.textareaEl[0];
    var fullValue = textarea.value;
    var pos = this.isActive ? getFieldSelection(textarea) : fullValue.length;
    var suffix = fullValue.substr(pos);
    var prefix = fullValue.substr(0, pos);
    var matches = autocomplete && prefix.match(/:([A-Za-z0-9\-\+\*_]*)$/);
    var emoji = EmojiHelper.emojis[code];

    if (matches && matches[0]) {
      var newValue = prefix.substr(0, matches.index) + ':' + emoji[1] + ': ' + suffix;
      var newPos = matches.index + emoji[1].length + 3;
    } else {
      var newValue = prefix + ':' + emoji[1] + ': ' + suffix;
      var newPos = prefix.length + emoji[1].length + 3;
    }
    textarea.value = newValue;
    setFieldSelection(textarea, newPos);
  }

  this.hideSuggestions();
  this.onChange();
}

MessageComposer.prototype.onMentionsUpdated = function (username) {
  delete this.previousQuery;
  if (this.isActive) {
    this.checkAutocomplete();
  }
}

MessageComposer.prototype.onMentionSelected = function (username) {
  if (this.richTextareaEl) {
    var textarea = this.richTextareaEl[0];
    if (!this.isActive) {
      if (!this.restoreSelection()) {
        setRichFocus(textarea);
      }
    }
    var valueCaret = getRichValueWithCaret(textarea);
    var fullValue = valueCaret[0];
    var pos = valueCaret[1] >= 0 ? valueCaret[1] : fullValue.length;
    var suffix = fullValue.substr(pos);
    var prefix = fullValue.substr(0, pos);
    var matches = prefix.match(/@([A-Za-z0-9\-\+\*_]*)$/);

    var newValuePrefix;
    if (matches && matches[0]) {
      newValuePrefix = prefix.substr(0, matches.index) + '@' + username;
    } else {
      newValuePrefix = prefix + '@' + username;
    }
    textarea.value = newValue;

    var html;
    if (suffix.length) {
      this.selId = (this.selId || 0) + 1;
      html = this.getRichHtml(newValuePrefix) + '&nbsp;<span id="composer_sel' + this.selId + '"></span>' + this.getRichHtml(suffix);
      this.richTextareaEl.html(html);
      setRichFocus(textarea, $('#composer_sel' + this.selId)[0]);
    } else {
      html = this.getRichHtml(newValuePrefix) + '&nbsp;';
      this.richTextareaEl.html(html);
      setRichFocus(textarea);
    }
  }
  else {
    var textarea = this.textareaEl[0];
    var fullValue = textarea.value;
    var pos = this.isActive ? getFieldSelection(textarea) : fullValue.length;
    var suffix = fullValue.substr(pos);
    var prefix = fullValue.substr(0, pos);
    var matches = prefix.match(/@([A-Za-z0-9\-\+\*_]*)$/);

    if (matches && matches[0]) {
      var newValue = prefix.substr(0, matches.index) + '@' + username + ' ' + suffix;
      var newPos = matches.index + username.length + 2;
    } else {
      var newValue = prefix + ':' + username + ': ' + suffix;
      var newPos = prefix.length + username.length + 2;
    }
    textarea.value = newValue;
    setFieldSelection(textarea, newPos);
  }

  this.hideSuggestions();
  this.onChange();
}

MessageComposer.prototype.onCommandSelected = function (command, isTab) {
  if (isTab) {
    if (this.richTextareaEl) {
      this.richTextareaEl.html(encodeEntities(command) + '&nbsp;');
      setRichFocus(this.richTextareaEl[0]);
    }
    else {
      var textarea = this.textareaEl[0];
      textarea.value = command + ' ';
      setFieldSelection(textarea);
    }
  } else {
    this.onCommandSend(command);
  }

  this.hideSuggestions();
  this.onChange();
}

MessageComposer.prototype.onChange = function (e) {
  if (this.richTextareaEl) {
    delete this.keyupStarted;
    this.textareaEl.val(getRichValue(this.richTextareaEl[0])).trigger('change');
  }
}

MessageComposer.prototype.getEmojiHtml = function (code, emoji) {
  emoji = emoji || EmojiHelper.emojis[code];
  var iconSize = 20;
  var spritesheet = EmojiHelper.spritesheetPositions[code];
  var categoryIndex = spritesheet[0];
  var pos = spritesheet[1];
  var x = iconSize * spritesheet[3];
  var y = iconSize * spritesheet[2];

  return '<img src="img/blank.gif" alt=":' + encodeEntities(emoji[1]) + ':" data-code="' + encodeEntities(code) + '" class="emoji emoji-w20 emoji-spritesheet-' + categoryIndex + '" style="background-position: -' + x + 'px -' + y + 'px;" onresizestart="return false" />';
}

MessageComposer.prototype.setValue = function (text) {
  if (this.richTextareaEl) {
    this.richTextareaEl.html(this.getRichHtml(text));
    this.lastLength = text.length;
    this.wasEmpty = !text.length;
    this.onKeyEvent({type: 'keyup'});
  } else {
    this.textareaEl.val(text);
  }
}

MessageComposer.prototype.setFocusedValue = function (parts) {
  var prefix = parts[0];
  var selection = parts[1];
  var suffix = parts[2];

  if (this.richTextareaEl) {
    this.selId = (this.selId || 0) + 1;
    var html =
      this.getRichHtml(prefix) +
      '<span id="composer_sel' + this.selId + '">' +
        this.getRichHtml(selection) +
      '</span>' +
      this.getRichHtml(suffix);

    this.richTextareaEl.html(html);

    setRichFocus(this.richTextareaEl[0], $('#composer_sel' + this.selId)[0], true);
  } else {
    this.textareaEl.val(prefix + selection + suffix);
    setFieldSelection(this.textareaEl[0], prefix.length, prefix.length + selection.length);
  }
}



MessageComposer.prototype.getRichHtml = function (text) {
  return $('<div>').text(text).html().replace(/\n/g, '<br/>').replace(/:([A-Za-z0-9\-\+\*_]+?):/gi, (function (all, shortcut) {
    var code = EmojiHelper.shortcuts[shortcut];
    if (code !== undefined) {
      return this.getEmojiHtml(code);
    }
    return all;
  }).bind(this));
}


MessageComposer.prototype.focus = function () {
  if (this.richTextareaEl) {
    setZeroTimeout((function () {
      setRichFocus(this.richTextareaEl[0]);
    }).bind(this));
  } else {
    setFieldSelection(this.textareaEl[0]);
  }
}

MessageComposer.prototype.blur = function () {
  if (this.richTextareaEl) {
    this.richTextareaEl[0].blur();
  } else {
    this.textareaEl[0].blur();
  }
}

MessageComposer.prototype.renderSuggestions = function (html) {
  this.autoCompleteEl.html(html.join(''));
  this.autoCompleteWrapEl.show();
  this.scroller.reinit();
  this.updatePosition();
  this.autocompleteShown = true;
}

MessageComposer.prototype.showEmojiSuggestions = function (codes) {
  var html = [];
  var iconSize = Config.Mobile ? 26 : 20;

  var emoticonCode, emoticonData, spritesheet, pos, categoryIndex;
  var count = Math.min(5, codes.length);
  var i, x, y;

  for (i = 0; i < count; i++) {
    emoticonCode = codes[i];
    if (emoticonCode.code) {
      emoticonCode = emoticonCode.code;
    }
    if (emoticonData = Config.Emoji[emoticonCode]) {
      spritesheet = EmojiHelper.spritesheetPositions[emoticonCode];
      categoryIndex = spritesheet[0];
      pos = spritesheet[1];
      x = iconSize * spritesheet[3];
      y = iconSize * spritesheet[2];
      html.push('<li><a class="composer_emoji_option" data-code="' + encodeEntities(emoticonCode) + '"><i class="emoji emoji-w', iconSize, ' emoji-spritesheet-' + categoryIndex + '" style="background-position: -' + x + 'px -' + y + 'px;"></i><span class="composer_emoji_shortcut">:' + encodeEntities(emoticonData[1][0]) + ':</span></a></li>');
    }
  }

  this.renderSuggestions(html);
}

MessageComposer.prototype.showMentionSuggestions = function (users) {
  var html = [];
  var user;
  var count = users.length;
  var i;

  for (i = 0; i < count; i++) {
    user = users[i];
    html.push('<li><a class="composer_mention_option" data-mention="' + user.username + '"><span class="composer_user_photo" data-user-id="' + user.id + '"></span><span class="composer_user_name">' + user.rFullName + '</span><span class="composer_user_mention">@' + user.username + '</span></a></li>');
  }

  this.renderSuggestions(html);
  var self = this;
  this.autoCompleteEl.find('.composer_user_photo').each(function (k, element) {
    self.getPeerImage($(element), element.getAttribute('data-user-id'));
  });
}

MessageComposer.prototype.showCommandsSuggestions = function (commands) {
  var html = [];
  var command;
  var count = Math.min(200, commands.length);
  var i;

  for (i = 0; i < count; i++) {
    command = commands[i];
    html.push('<li><a class="composer_command_option" data-command="' + encodeEntities(command.value) + '"><span class="composer_user_photo" data-user-id="' + command.botID + '"></span><span class="composer_command_value">' + encodeEntities(command.value) + '</span><span class="composer_command_desc">' + command.rDescription + '</span></a></li>');
  }

  this.renderSuggestions(html);

  var self = this;
  var usedImages = {};
  this.autoCompleteEl.find('.composer_user_photo').each(function (k, element) {
    var noReplace = true;
    var botID = element.getAttribute('data-user-id');
    if (!usedImages[botID]) {
      usedImages[botID] = true;
      noReplace = false;
    }
    self.getPeerImage($(element), botID, noReplace);
  });
}

MessageComposer.prototype.updatePosition = function () {
  var offset = (this.richTextareaEl || this.textareaEl).offset();
  var height = this.scroller.updateHeight();
  var width = $((this.richTextareaEl || this.textareaEl)[0].parentNode).outerWidth();
  this.autoCompleteWrapEl.css({
    top: offset.top - height,
    left: Config.Mobile ? 0 : offset.left,
    width: Config.Mobile ? '100%' : width - 2
  });
  this.scroller.update();
}

MessageComposer.prototype.hideSuggestions = function () {
  this.autoCompleteWrapEl.hide();
  delete this.autocompleteShown;
}

MessageComposer.prototype.resetTyping = function () {
  this.lastTyping = 0;
  this.lastLength = 0;
}

MessageComposer.prototype.setPlaceholder = function (newPlaceholder) {
  (this.richTextareaEl || this.textareaEl).attr('placeholder', newPlaceholder);
}




function Scroller(content, options) {
  options = options || {};
  var classPrefix = options.classPrefix || 'scroller';

  this.content = $(content);
  this.useNano = options.nano !== undefined ? options.nano : !Config.Mobile;
  this.maxHeight = options.maxHeight;
  this.minHeight = options.minHeight;

  if (this.useNano) {
    this.setUpNano();
  } else {
    this.setUpNative();
  }
  this.updateHeight();
}
Scroller.prototype.setUpNano = function () {
  this.content.wrap('<div class="scroller_scrollable_container"><div class="scroller_scrollable_wrap nano"><div class="scroller_scrollable nano-content "></div></div></div>');

  this.scrollable = $(this.content[0].parentNode);
  this.scroller = $(this.scrollable[0].parentNode);
  this.wrap = $(this.scroller[0].parentNode);

  this.scroller.nanoScroller({preventPageScrolling: true, tabIndex: -1});
}

Scroller.prototype.setUpNative = function () {
  this.content.wrap('<div class="scroller_native_scrollable"></div>');
  this.scrollable = $(this.content[0].parentNode);

  this.scrollable.css({overflow: 'auto'});
  if (this.maxHeight) {
    this.scrollable.css({maxHeight: this.maxHeight});
  }
  if (this.minHeight) {
    this.scrollable.css({minHeight: this.minHeight});
  }
}

Scroller.prototype.onScroll = function (cb) {
  var self = this;
  var scrollable = this.scrollable[0];
  this.scrollable.on('scroll', function (e) {
    if (self.isAnimatedScroll) {
      return;
    }
    cb(scrollable, scrollable.scrollTop);
  })

}

Scroller.prototype.update = function () {
  if (this.useNano) {
    $(this.scroller).nanoScroller();
  }
}

Scroller.prototype.reinit = function () {
  this.scrollTo(0);
  if (this.useNano) {
    setTimeout((function () {
      this.updateHeight();
    }).bind(this), 100)
  }
}

Scroller.prototype.updateHeight = function () {
  var height;
  if (this.useNano) {
    if (this.maxHeight || this.minHeight) {
      height = this.content[0].offsetHeight;
      if (this.maxHeight && height > this.maxHeight) {
        height = this.maxHeight;
      }
      if (this.minHeight && height < this.minHeight) {
        height = this.minHeight;
      }
      this.wrap.css({height: height});
    } else {
      height = this.scroller[0].offsetHeight;
    }
    $(this.scroller).nanoScroller();
  } else {
    height = this.scrollable[0].offsetHeight;
  }
  return height;
}


Scroller.prototype.scrollTo = function (scrollTop, animation, cb) {
  if (animation > 0) {
    var self = this;
    this.isAnimatedScroll = true;
    this.scrollable.animate({scrollTop: scrollTop}, animation, function () {
      delete self.isAnimatedScroll;
      if (self.useNano) {
        $(self.scroller).nanoScroller({flash: true});
      }
      self.scrollable.trigger('scroll');
      if (cb) {
        cb();
      }
    });
  } else {
    this.scrollable[0].scrollTop = scrollTop;
    if (this.useNano) {
      $(this.scroller).nanoScroller({flash: true});
    }
    if (cb) {
      cb();
    }
  }
}

Scroller.prototype.scrollToNode = function (node) {
  node = node[0] || node;
  var elTop = node.offsetTop - 15,
      elHeight = node.offsetHeight + 30,
      scrollTop = this.scrollable[0].scrollTop,
      viewportHeight = this.scrollable[0].clientHeight;

  if (scrollTop > elTop) { // we are below the node to scroll
    this.scrollTo(elTop);
  }
  else if (scrollTop < elTop + elHeight - viewportHeight) { // we are over the node to scroll
    this.scrollTo(elTop + elHeight - viewportHeight);
  }
}


