URL.prototype._child=function(e){var t=this.toString();return"/"==this.pathname?t+=e:t=t+"/"+e,new URL(t)},URL.prototype._parent=function(e){var t=this.toString();if("/"==this.pathname)return null;var n=t.lastIndexOf("/");return t=t.substring(0,n),""==t&&(t="/"),new URL(t)};var DomView=function(e,t){this.rootDom=e,this.prx=""+Math.floor(1e4*Math.random()),this.showConfirmFunc=t,this.globleEditing=!1,this.init()};DomView.prototype.init=function(){this.rootDom.innerHTML='<div class="jstree jstree-forcused jstree-default"><ul></ul></div>',this.rootDom=this.rootDom.querySelector("ul"),this.hasRoot=!1},DomView.Templates={leaf:'<li><div><ins class="jstree-icon">&nbsp;</ins><span class="tree-content"><span><a class="name" ></a><span class="valueContainer">:<input type="text"  class="valueedit valueedit-hover"  disabled="disabled"></span><a href="#" class="spriteBtn addBtn">&nbsp;</a><a href="#" class="spriteBtn removeBtn">&nbsp;</a></span></span></div><ul>  </ul></li>',editor:'<li class="jstree-leaf adding"><div><ins class="jstree-icon">&nbsp;</ins><span class="tree-content"><span><span class="nameLabel">name:</span><input type="text" class="nameInput" placeholder="Name"><span><span class="valueLabel">value:</span><input type="text" class="valueInput" placeholder="Value"></span></span><a href="#" class="spriteBtn addBtn">&nbsp;</a><a href="#" class="spriteBtn removeBtn">&nbsp;</a></span></div><ul></ul></li>',confirm:'<li class="confirm"><ins>&nbsp;</ins><a href="#" class="spriteBtn cancelBtn" id="cancelBtn"></a><a href="#" class="spriteBtn confirmBtn" id="confirmBtn"></a></li>'},DomView.prototype._getValueFromEditor=function(e){var t=e.querySelector(".nameInput").value;if("string"!=typeof t||t.length<1)return null;var n=e.querySelector("ul"),o=null;if(n.hasChildNodes()){o={};for(var r=n.children,i=0;i<r.length;i++){var a=r[i],l=this._getValueFromEditor(a);if(null==l)return null;var s=l.key,d=l.value;o[s]=d}}else{o=e.querySelector(".valueInput").value;try{o=JSON.parse(o)}catch(c){}}return{key:t,value:o}},DomView.prototype._newConfirm=function(e,t){var n=(new DOMParser).parseFromString(DomView.Templates.confirm,"text/html"),o=n.body.firstChild;return o.querySelector(".confirmBtn").onclick=function(t){e()},o.querySelector(".cancelBtn").onclick=function(e){t()},o},DomView.prototype._newEditNode=function(e){var t=this,n=(new DOMParser).parseFromString(DomView.Templates.editor,"text/html"),o=n.body.firstChild,r=o.querySelector("ul"),i=o.querySelector(".valueLabel").parentNode;return o.querySelector(".addBtn").onclick=function(){i.innerHTML="",r.appendChild(t._newEditNode(function(e){r.removeChild(e),r.hasChildNodes()||(i.innerHTML='<span class="valueLabel">value:</span><input type="text" class="valueInput" placeholder="Value">')}))},o.querySelector(".removeBtn").onclick=function(){e(o)},o},DomView.prototype._initNodeEvent=function(e,t){var n=e.querySelector("a.name").href,o=this,r=e.querySelector(".tree-content");r.addEventListener("mouseenter",function(i){r.className="tree-content tree-content-hover",r.querySelector(".removeBtn").onclick=function(e){var t=e.target.parentNode.querySelector("a").href;o.showConfirmFunc&&o.showConfirmFunc(t,o.onRemoveCallback)};var a=r.querySelector(".addBtn");a&&(a.onclick=function(t){if(!o.globleEditing){o.globleEditing=!0;var n=t.target.parentNode.querySelector("a").href,r=o._newEditNode(function(e){r.parentNode.removeChild(r),o.globleEditing=!1}),i=o._newConfirm(function(){var e=o._getValueFromEditor(r);null!=e&&(o.onSetCallback(new URL(n)._child(e.key),e.value),o.globleEditing=!1,r.parentNode.removeChild(r))},function(){o.globleEditing=!1,r.parentNode.removeChild(r)}),a=e.querySelector("ul"),l=a.firstChild;r.appendChild(i),null==l?a.insertBefore(r,l):a.appendChild(r)}});var l=r.querySelector(".valueedit");if(l&&!o.globleEditing){var s=l.value;l.disabled=!1,l.addEventListener("focus",function(e){e.target.removeEventListener(e.type,arguments.callee),o.globleEditing=!0,l.onkeydown=function(e){if("Enter"==e.keyIdentifier){e.target.removeEventListener(e.type,arguments.callee);var t=e.target.value;try{t=JSON.parse(t)}catch(e){}o.onSetCallback(n,t),e.target.disabled=!0,o.globleEditing=!1}},l.addEventListener("focusout",function(e){e.target.removeEventListener(e.type,arguments.callee),o.globleEditing&&(l.value=s,o.globleEditing=!1)})})}var d=e.querySelector(".jstree-icon"),c=!1;d.onclick=function(e){var n=dom.className;n.indexOf("jstree-closed")>=0?(dom.className=n.replace("jstree-closed","jstree-open"),t&&!c&&(c=!0,onQueryCallback())):dom.className=n.replace("jstree-open","jstree-closed")}}),r.addEventListener("mouseleave",function(e){r.className="tree-content tree-content";var t=r.querySelector(".valueedit");t&&!o.globleEditing&&(t.disabled=!0)})},DomView.prototype._newNode=function(e,t,n){var o=(new DOMParser).parseFromString(DomView.Templates.leaf,"text/html"),r=o.body.firstChild,i=e.pathname;r.id=this.prx+i;var a=r.querySelector("a.name");if(a.href=e,"/"==i)a.innerText=e.host;else{var l=i.split("/"),s=l[l.length-1];a.innerText=s}if("object"!=typeof t&&1!=n){var d=r.querySelector("input.valueedit"),c=JSON.stringify(t);d.title=c,d.value=c,r.className="jstree-leaf";var u=r.querySelector(".addBtn");u.parentNode.removeChild(u)}else r.querySelector(".valueContainer").innerHTML="",r.appendChild(document.createElement("ul")),r.className="jstree-closed";return this.hasRoot||(this.hasRoot=!0,r.className=r.className+" root"),this._initNodeEvent(r,n),r},DomView.prototype._updateNodeValue=function(e,t){if("object"!=typeof t){var n=e.querySelector("input.valueedit");if(null==n){e.querySelector(".valueContainer").innerHTML=':<input type="text"  class="valueedit valueedit-hover"  disabled="disabled"></span>',e.className="jstree-closed",n=e.querySelector("input.valueedit");var o=e.querySelector(".addBtn");o.parentNode.removeChild(o)}var r=JSON.stringify(t);n.title=r,n.value=r}},DomView.prototype._insertAfter=function(e,t,n){if(null==t)return void(null==e.firstChild?e.appendChild(n):e.insertBefore(n,e.firstChild));var o=t.pathname,r=this.prx+o,i=document.getElementById(r);i==e.lastChild?e.appendChild(n):e.insertBefore(n,i.nextSibling)},DomView.prototype.remoteChangeNode=function(e,t){var n=this.prx+e.pathname,o=document.getElementById(n);null!=o&&"object"!=typeof t&&this._updateNodeValue(o,t),o.querySelector(".tree-content").className="tree-content changed",setTimeout(function(){null!=o&&(o.querySelector(".tree-content").className="tree-content")},1e3)},DomView.prototype.remoteAddNode=function(e,t,n,o){var r=this.rootDom;"/"!=e.pathname&&(r=document.getElementById(this.prx+e._parent().pathname).querySelector("ul"));var i=this._newNode(e,n,o);null==t?this._insertAfter(r,null,i):this._insertAfter(r,e._parent()._child(t),i),i.querySelector(".tree-content").className="tree-content added",setTimeout(function(){null!=i&&(i.querySelector(".tree-content").className="tree-content")},1e3)},DomView.prototype.remoteRemoveNode=function(e){var t=this.prx+e.pathname,n=document.getElementById(t);n.id="removed:"+n.id,n.querySelector(".tree-content").className="tree-content removed",setTimeout(function(){null!=n&&null!=n.parentNode&&n.parentNode.removeChild(n)},1e3)},DomView.prototype.remoteMoveNode=function(e,t){var n=this.prx+e.pathname,o=document.getElementById(n),r=o.parentNode;o=r.removeChild(o),null==t?this._insertAfter(r,null,o):this._insertAfter(r,e._parent()._child(t),o),o.querySelector(".tree-content").className="tree-content moved",setTimeout(function(){null!=o&&(o.querySelector(".tree-content").className="tree-content")},1e3)},DomView.prototype.onSet=function(e){this.onSetCallback=e},DomView.prototype.onRemove=function(e){this.onRemoveCallback=e},DomView.prototype.onQuery=function(e){this.onQueryCallback=e};var DogViewer=function(e,t){this.ref=e,this.url=new URL(this.ref.toString()),this.rootPath=this.url.pathname,this.view=t,this.inited=!1,this.forceRest=!1,this.auth=e.getAuth()};DogViewer.prototype.init=function(){var e=this;this.forceRest?(e.mode=1,e.inited=!0,this.initWithRest(ref)):this.ref.on("value",function(t){e.mode=0,e.inited||(e.inited=!0,e._addRoot(e.ref,t.val()))},function(t){e.mode=1,e.inited=!0,this.initWithRest(ref)}),this.view.onSet(function(t,n){e.ref.child(new URL(t).pathname).set(n),1==e.mode&&(this.view.remoteRemoveNode(new URL(t).toString()),this.view.remoteAddNode(new URL(t).toString(),null,n))}),this.view.onRemove(function(t){e.ref.child(new URL(t).pathname).remove(),1==e.mode&&this.view.remoteRemoveNode(new URL(t).toString())})},DogViewer.prototype.setForceRest=function(){this.forceRest=!0},DogViewer.prototype._initEventListener=function(e){var t=new URL(e.toString()),n=(t.pathname,this);e.orderByPriority().on("child_added",function(t,o){var r=t.key(),i=t.val();n._addNode(e,r,o,i)}),e.orderByPriority().on("child_removed",function(t,o){var r=t.key();n._removeNode(e,r)}),e.orderByPriority().on("child_moved",function(t,o){var r=t.key();n._moveNode(e,r,o)}),e.orderByPriority().on("child_changed",function(t,o){var r=t.key(),i=t.val();n._changeNode(e,r,o,i)})},DogViewer.prototype._destroyEventListener=function(e){{var t=new URL(e.toString());t.pathname}e.orderByPriority().off()},DogViewer.prototype._addRoot=function(e,t){this.view.remoteAddNode(new URL(e.toString()),null,t)},DogViewer.prototype._addNode=function(e,t,n,o){this.view.remoteAddNode(new URL(e.child(t).toString()),n,o),this._initEventListener(e.child(t))},DogViewer.prototype._changeNode=function(e,t,n,o){this.view.remoteChangeNode(new URL(e.child(t).toString()),o)},DogViewer.prototype._removeNode=function(e,t){this.view.remoteRemoveNode(new URL(e.child(t).toString())),this._destroyEventListener(e.child(t))},DogViewer.prototype._moveNode=function(e,t,n){this.view.remoteMoveNode(new URL(e.child(t).toString()),n)},DogViewer.prototype.initWithRest=function(e){e.toString();this._addNodeWithRest(e)},DogViewer.prototype._addNodeWithRest=function(e){this._getDataWithRest(e.toString(),function(t){if("object"==typeof t)for(key in t)this.view.remoteAddNode(new URL(e.toString())._child(key),null,!0,!0);else this.view.remoteChangeNode(new URL(e.toString()),null,t)})},DogViewer.prototype._getDataWithRest=function(e,t){var n=new XMLHttpRequest,o=e+".json?shallow=true";null!=this.auth&&(o=o+"&auth ="+this.auth),n.open("GET",o,!0),n.send(null),n.onreadystatechange=function(){if(4==n.readyState){var e=n.responseText;t(JSON.parse(e))}}};