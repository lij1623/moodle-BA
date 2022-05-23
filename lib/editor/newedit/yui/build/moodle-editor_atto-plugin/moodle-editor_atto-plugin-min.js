YUI.add("moodle-editor_newedit-plugin",function(r,s){var i,o,n,u,l,h;function t(){t.superclass.constructor.apply(this,arguments)}function e(){}function a(){}i="_group",r.extend(t,r.Base,{name:null,editor:null,toolbar:null,initializer:function(t){this.name=t.name,this.toolbar=t.toolbar,this.editor=t.editor,this.buttons={},this.buttonNames=[],this.buttonStates={},this.menus={},this._primaryKeyboardShortcut=[],this._buttonHandlers=[],this._menuHideHandlers=[],this._highlightQueue={}},markUpdated:function(){return this.get("host").saveSelection(),this.get("host").updateOriginal()}},{NAME:"editorPlugin",ATTRS:{host:{writeOnce:!0},group:{writeOnce:!0,getter:function(t){var e=this.toolbar.one(".newedit_group."+t+i);return e||(e=r.Node.create('<div class="newedit_group '+t+i+'"></div>'),this.toolbar.append(e)),e}}}}),r.namespace("M.editor_newedit").EditorPlugin=t,o="disabled",n="highlight",u=".editor_newedit_content",l=".editor_newedit_menu_icon",h=".editor_newedit_menu_expand",e.ATTRS={},e.prototype={buttons:null,buttonNames:null,buttonStates:null,menus:null,DISABLED:0,ENABLED:1,_buttonHandlers:null,_menuHideHandlers:null,_primaryKeyboardShortcut:null,_highlightQueue:null,addButton:function(e){var i,n,t=this.get("group"),o=this.name,a="newedit_"+o+"_button",s=this.get("host");return e.exec&&(a=a+"_"+e.exec),e.buttonName?a=a+"_"+e.buttonName:e.buttonName=e.exec||o,e.buttonClass=a,(e=this._normalizeIcon(e)).title||(e.title="pluginname"),o=M.util.get_string(e.title,"newedit_"+o),(i=r.Node.create('<button type="button" class="'+a+'"tabindex="-1"></button>')).setAttribute("title",o),i.setAttribute("aria-label",o),window.require(["core/templates"],function(t){t.renderPix(e.icon,e.iconComponent,"").then(function(t){i.append(t)})}),t.append(i),this.toolbar.getAttribute("aria-activedescendant")||(i.setAttribute("tabindex","0"),this.toolbar.setAttribute("aria-activedescendant",i.generateID()),this.get("host")._tabFocus=i),e=this._normalizeCallback(e),this._buttonHandlers.push(this.toolbar.delegate("click",e.callback,"."+a,this)),e.keys&&("undefined"!=typeof e.keyDescription&&(this._primaryKeyboardShortcut[a]=e.keyDescription),this._addKeyboardListener(e.callback,e.keys,a),this._primaryKeyboardShortcut[a]&&(o=M.util.get_string("plugin_title_shortcut","editor_newedit",{title:o,shortcut:this._primaryKeyboardShortcut[a]}),i.setAttribute("title",o),i.setAttribute("aria-label",o))),e.tags&&(n=!0,"boolean"==typeof e.tagMatchRequiresAll&&(n=e.tagMatchRequiresAll),this._buttonHandlers.push(s.on(["newedit:selectionchanged","change"],function(t){"undefined"!=typeof this._highlightQueue[e.buttonName]&&this._highlightQueue[e.buttonName].cancel(),this._highlightQueue[e.buttonName]=r.soon(r.bind(function(t){s.selectionFilterMatches(e.tags,t.selectedNodes,n)?this.highlightButtons(e.buttonName):this.unHighlightButtons(e.buttonName)},this,t))},this))),this.buttonNames.push(e.buttonName),this.buttons[e.buttonName]=i,this.buttonStates[e.buttonName]=this.ENABLED,i},addBasicButton:function(t){return t.exec?(t.icon||(t.icon="e/"+t.exec),t.callback=function(){document.execCommand(t.exec,!1,null),this.markUpdated()},this.addButton(t)):null},addToolbarMenu:function(e){var i,t,n,o=this.get("group"),a=this.name,s="newedit_"+a+"_button";return e.buttonName?s=s+"_"+e.buttonName:e.buttonName=a,e.buttonClass=s,(e=this._normalizeIcon(e)).title||(e.title="pluginname"),t=M.util.get_string(e.title,"newedit_"+a),e.menuColor||(e.menuColor="transparent"),a="newedit_"+a+"_menubutton_"+r.stamp(this),n=r.Handlebars.compile('<button class="{{buttonClass}} newedit_hasmenu" id="{{id}}" tabindex="-1" title="{{title}}" aria-label="{{title}}" type="button" aria-haspopup="true" aria-controls="{{id}}_menu"><span class="editor_newedit_menu_icon"></span><span class="editor_newedit_menu_expand"></span></button>'),i=r.Node.create(n({buttonClass:s,config:e,title:t,id:a})),e.buttonId=a,window.require(["core/templates"],function(t){t.renderPix(e.icon,e.iconComponent,"").then(function(t){i.one(l).append(t)}),t.renderPix("t/expanded","core","").then(function(t){i.one(h).append(t)})}),o.append(i),o.append(r.Node.create('<div class="menuplaceholder" id="'+a+'_menu"></div>')),e.attachmentPoint="#"+a+"_menu",this.toolbar.getAttribute("aria-activedescendant")||(i.setAttribute("tabindex","0"),this.toolbar.setAttribute("aria-activedescendant",i.generateID())),this._buttonHandlers.push(this.toolbar.delegate("click",this._showToolbarMenu,"."+s,this,e),this.toolbar.delegate("key",this._showToolbarMenuAndFocus,"40, 32, enter","."+s,this,e)),this.buttonNames.push(e.buttonName),this.buttons[e.buttonName]=i,this.buttonStates[e.buttonName]=this.ENABLED,i},_showToolbarMenu:function(t,e){var i,n;t.preventDefault(),this.isEnabled()&&((t=t.currentTarget.ancestor("button",!0)).hasAttribute(o)||(this.menus[e.buttonClass]||(e.overlayWidth||(e.overlayWidth="14"),e.innerOverlayWidth||(e.innerOverlayWidth=parseInt(e.overlayWidth,10)-2+"em"),e.overlayWidth=parseInt(e.overlayWidth,10)+"em",this.menus[e.buttonClass]=new r.M.editor_newedit.Menu(e),this.menus[e.buttonClass].get("contentBox").delegate("click",this._chooseMenuItem,".newedit_menuentry a",this,e)),r.Array.each(this.get("host").openMenus,function(t){t.set("focusAfterHide",null)}),(n=this.buttons[e.buttonName]).focus(),this.get("host")._setTabFocus(n),(i=this.menus[e.buttonClass]).set("focusAfterHide",n),i.show(),t.setAttribute("aria-expanded",!0),i.align(this.buttons[e.buttonName],[r.WidgetPositionAlign.TL,r.WidgetPositionAlign.BL]),this.get("host").openMenus=[i]))},_showToolbarMenuAndFocus:function(t,e){this._showToolbarMenu(t,e),this.menus[e.buttonClass].get("boundingBox").one("a").focus()},_chooseMenuItem:function(t,e,i){var n=t.target.ancestor("a",!0).getData("index"),n=this._normalizeCallback(e.items[n],e.globalItemConfig);(i=this.menus[e.buttonClass]).set("preventHideMenu",!0),n.callback(t,n._callback,n.callbackArgs),i.set("preventHideMenu",!1),i.set("focusAfterHide",this.get("host").editor),i.hide(t)},_normalizeCallback:function(i,t){return i._callbackNormalized||(t=t||{},
i.inlineFormat=i.inlineFormat||t.inlineFormat,i._inlineCallback=i.callback||t.callback,i._callback=i.callback||t.callback,i.inlineFormat&&"function"==typeof i._inlineCallback&&(i._callback=function(t,e){this.get("host").applyFormat(t,i._inlineCallback,this,e)}),i.callback=r.rbind(this._callbackWrapper,this,i._callback,i.callbackArgs),i._callbackNormalized=!0),i},_normalizeIcon:function(t){return t.iconurl||(t.iconComponent&&"moodle"!=t.iconComponent||(t.iconComponent="core"),t.iconurl=M.util.image_url(t.icon,t.iconComponent)),t},_callbackWrapper:function(t,e,i){var n;if(t.preventDefault(),this.isEnabled()&&(!(n=t.currentTarget.ancestor("button",!0))||!n.hasAttribute(o)))return YUI.Env.UA.android||this.get("host").isActive()||this.get("host").focus(),this.get("host").saveSelection(),n&&this.get("host")._setTabFocus(n),n=[t,i],this.get("host").restoreSelection(),e.apply(this,n)},_addKeyboardListener:function(i,t,e){var n,o,a="key",s=u;if(r.Lang.isArray(t))return r.Array.each(t,function(t){this._addKeyboardListener(i,t)},this),this;e="object"==typeof t?(t.eventtype&&(a=t.eventtype),t.container&&(s=t.container),n=t.keyCodes,i):(o=this._getDefaultMetaKey(),n=this._getKeyEvent()+t+"+"+o,"undefined"==typeof this._primaryKeyboardShortcut[e]&&(this._primaryKeyboardShortcut[e]=this._getDefaultMetaKeyDescription(t)),r.bind(function(t,e){this._eventUsesExactKeyModifiers(t,e)&&i.apply(this,[e])},this,[o])),this._buttonHandlers.push(this.editor.delegate(a,e,n,s,this))},_eventUsesExactKeyModifiers:function(t,e){var i,n;return"key"===e.type&&(n=-1<r.Array.indexOf(t,"alt"),i=e.altKey&&n||!e.altKey&&!n,n=-1<r.Array.indexOf(t,"ctrl"),i=i&&(e.ctrlKey&&n||!e.ctrlKey&&!n),n=-1<r.Array.indexOf(t,"meta"),i=i&&(e.metaKey&&n||!e.metaKey&&!n),n=-1<r.Array.indexOf(t,"shift"),i&&(e.shiftKey&&n||!e.shiftKey&&!n))},isEnabled:function(){return r.Object.some(this.buttonStates,function(t){return t===this.ENABLED},this)},disableButtons:function(t){return this._setButtonState(!1,t)},enableButtons:function(t){return this._setButtonState(!0,t)},_setButtonState:function(e,t){var i=e?"removeAttribute":"setAttribute";return t?this.buttons[t]&&(this.buttons[t][i](o,o),this.buttonStates[t]=e?this.ENABLED:this.DISABLED):r.Array.each(this.buttonNames,function(t){this.buttons[t][i](o,o),this.buttonStates[t]=e?this.ENABLED:this.DISABLED},this),this.get("host").checkTabFocus(),this},highlightButtons:function(t){return this._changeButtonHighlight(!0,t)},unHighlightButtons:function(t){return this._changeButtonHighlight(!1,t)},_changeButtonHighlight:function(e,t){var i=e?"addClass":"removeClass";return t?this.buttons[t]&&(this.buttons[t][i](n),this.buttons[t].setAttribute("aria-pressed",e?"true":"false"),this._buttonHighlightToggled(t,e)):r.Object.each(this.buttons,function(t){t[i](n),t.setAttribute("aria-pressed",e?"true":"false"),this._buttonHighlightToggled(t,e)},this),this},_buttonHighlightToggled:function(e,i){var n=this.buttons[e];n&&require(["editor_newedit/events"],function(t){t.notifyButtonHighlightToggled(n.getDOMNode(),e,i)})},_getDefaultMetaKey:function(){return"macintosh"===r.UA.os?"meta":"ctrl"},_getDefaultMetaKeyDescription:function(t){return"macintosh"===r.UA.os?M.util.get_string("editor_command_keycode","editor_newedit",String.fromCharCode(t).toLowerCase()):M.util.get_string("editor_control_keycode","editor_newedit",String.fromCharCode(t).toLowerCase())},_getKeyEvent:function(){return"down:"}},r.Base.mix(r.M.editor_newedit.EditorPlugin,[e]),a.ATTRS={},a.prototype={_dialogue:null,getDialogue:function(t){var e=!1;return(t=t||{}).focusAfterHide&&(e=t.focusAfterHide,delete t.focusAfterHide),this._dialogue||(t=r.merge({visible:!1,modal:!0,close:!0,draggable:!0},t),this._dialogue=new M.core.dialogue(t)),!1!==e&&(!0===e?this._dialogue.set("focusAfterHide",this.buttons[this.buttonNames[0]]):"string"==typeof e?this._dialogue.set("focusAfterHide",this.buttons[e]):this._dialogue.set("focusAfterHide",e)),this._dialogue}},r.Base.mix(r.M.editor_newedit.EditorPlugin,[a])},"@VERSION@",{requires:["node","base","escape","event","event-outside","handlebars","event-custom","timers","moodle-editor_newedit-menu"]});