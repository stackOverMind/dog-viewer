

URL.prototype._child=function(key){
    var newUrl=this.toString();
    if(this.pathname=="/"){
        newUrl=newUrl+key;
    }
    else{
        newUrl=newUrl+"/"+key;
    }
    return new URL(newUrl);
}
URL.prototype._parent=function(key){
    var newUrl=this.toString();
    if(this.pathname=="/"){
        return null;
    }
    else{
        var lastIndex = newUrl.lastIndexOf("/");
        newUrl=newUrl.substring(0,lastIndex);
        if(newUrl==""){
            newUrl="/"
        }
    }
    return new URL(newUrl);
}
var DomView = function(rootDom,showConfirmFunc){
    this.rootDom = rootDom;
    this.prx = ""+Math.floor(Math.random()*10000);
    this.parser = new DOMParser();
    this.showConfirmFunc=showConfirmFunc;
    this.init();
}
DomView.prototype.init=function(){
    this.rootDom.innerHTML='<div class="jstree jstree-forcused jstree-default"><ul></ul></div>';
    this.rootDom=this.rootDom.querySelector("ul");
    this.hasRoot=false;
}
DomView.Templates = {
    leaf:'<li>'+
            '<div>'+
                '<ins class="jstree-icon">&nbsp;</ins>'+
                '<span class="tree-content">'+
                    '<span><a class="name" ></a>'+
                        '<span class="valueContainer">:<input type="text"  class="valueedit valueedit-hover"  disabled="disabled">'+
                        '</span>'+
                    '</span>'+
                '</span>'+
            '</div>'+
            '<ul>  '  +
            '</ul>'+
        '</li>',
    editor:'<li class="jstree-leaf adding">'+
            '<div>'+
                '<ins class="jstree-icon">&nbsp;</ins>'+
                '<span class="tree-content">'+
                    '<span>'+
                        '<span class="nameLabel">name:</span>'+
                        '<input type="text" class="nameInput" placeholder="Name">'+
                        '<span>'+
                            '<span class="valueLabel">value:</span>'+
                            '<input type="text" class="valueInput" placeholder="Value">'+
                        '</span>'+
                    '</span>'+
                    '<a href="#" class="spriteBtn addBtn">&nbsp;</a>'+
                    '<a href="#" class="spriteBtn removeBtn">&nbsp;</a>'+
                '</span>'+
            '</div>'+
        '</li>',
    rmButton: '<a href="#" class="spriteBtn removeBtn"></a>'

}
DomView.prototype._newRmButton = function(){
    var res = document.createElement('a');
    res.className="spriteBtn removeBtn"
    res.href="#";
    return res;
}
DomView.prototype._newNode = function(url,value){
    var self=this;
    var doc = this.parser.parseFromString(DomView.Templates.leaf,"text/html");
    var res = doc.body.firstChild;
    var path = url.pathname;
    res.id = this.prx+path;
    var name = res.querySelector("a.name");
    name.href = url;
    if(path == "/"){
        name.innerText= url.host;
    }
    else{
        var sp = path.split("/");
        var key = sp[sp.length-1];
        name.innerText = key;    
    }
    if(typeof value != 'object'){
        var input = res.querySelector("input.valueedit")
        var jsonValue = JSON.stringify(value);
        input.title = jsonValue;//TODO: xss risk
        input.value = jsonValue;
        res.className="jstree-leaf";        
    }
    else{
        res.querySelector(".valueContainer").innerHTML = '';
        res.appendChild(document.createElement("ul"));
        res.className="jstree-open"
    }
    if(!this.hasRoot){
        this.hasRoot=true;
        res.className =res.className+' '+'root'
    }
    //init listeners
    var span =res.querySelector(".tree-content");
    span.addEventListener('mouseenter',function(e){
        span.className="tree-content tree-content-hover";
        span.querySelector('span').appendChild(self._newRmButton())
        span.querySelector('.removeBtn').onclick = function(e){
            var url= e.target.parentNode.querySelector('a').href;
            console.log(url)
            if(self.showConfirmFunc)
                self.showConfirmFunc(url,self.onRemoveCallback);
        }
    });
    span.addEventListener('mouseleave',function(e){
        span.className="tree-content tree-content";
        span.querySelector('span').removeChild(span.querySelector('.removeBtn'))
    })


    return res;
}

DomView.prototype._updateNodeValue = function(dom,value){
    if(typeof value != 'object'){
        var input = dom.querySelector("input.valueedit")
        var jsonValue = JSON.stringify(value);
        input.title = jsonValue;//TODO: xss risk
        input.value = jsonValue;
    }
    else{
        //do nothing
        //dom.querySelector(".valueContainer").innerHTML = '';
    }

}
DomView.prototype._insertAfter = function(parentDom,url,toInsert){

    if(url==null){
        if(parentDom.firstChild==null){
            parentDom.appendChild(toInsert);
        }
        else{
            parentDom.insertBefore(toInsert,parentDom.firstChild);
        }

        return;
    }
    var path=url.pathname;
    var prDomId = this.prx + path;
    var prDom = document.getElementById(prDomId);
    if(prDom == parentDom.lastChild){
        parentDom.appendChild(toInsert);
    }
    else{
        parentDom.insertBefore(toInsert, prDom.nextSibling);
    }
}
DomView.prototype.remoteChangeNode = function(url,value){
    var domId = this.prx+url.pathname;
    var node = document.getElementById(domId);
    if(node!=null){
        if(typeof value!='object'){
            this._updateNodeValue(node,value);
        }
    }
    //TODO: css class change
    node.querySelector(".tree-content").className="tree-content changed";
    setTimeout(function(){
        if(node!=null){
            node.querySelector(".tree-content").className="tree-content";
        }
    },1000);

}
DomView.prototype.remoteAddNode = function(url,prKey,value){
    var parentDom = this.rootDom;
    if(url.pathname!='/'){
        //not root
        parentDom = document.getElementById(this.prx+url._parent().pathname).querySelector('ul');
    }
    var node=this._newNode(url,value);
    if(prKey==null){
        this._insertAfter(parentDom,null,node);
    }
    else{
        this._insertAfter(parentDom,url._parent()._child(prKey),node);
    }
    node.querySelector(".tree-content").className="tree-content added";
    setTimeout(function(){
        if(node!=null){
            node.querySelector(".tree-content").className="tree-content";
        }
    },1000);
    //TODO: css class change
}
DomView.prototype.remoteRemoveNode = function(url){
    var domId = this.prx + url.pathname;
    var node = document.getElementById(domId);
    node.id="removed:"+node.id;
    //TODO css class remove
    node.querySelector(".tree-content").className="tree-content removed";
    setTimeout(function(){
        if(node!=null){
            if(node.parentNode!=null){
                node.parentNode.removeChild(node);
            }
        }
    },1000);

}
DomView.prototype.remoteMoveNode = function(url,prKey){
    var domId = this.prx + url.pathname;
    var node = document.getElementById(domId);
    var parentDom=node.parentNode;
    node = parentDom.removeChild(node);
    if(prKey==null){
        this._insertAfter(parentDom,null,node);
    }
    else{
        this._insertAfter(parentDom,url._parent()._child(prKey),node);
    }
    node.querySelector(".tree-content").className="tree-content moved";
    setTimeout(function(){
        if(node!=null){
            node.querySelector(".tree-content").className="tree-content";
        }
    },1000);
}
DomView.prototype.onAdd = function(callback){
    this.onAddCallback = callback;
}
DomView.prototype.onRemove = function(callback){
    this.onRemoveCallback = callback;
}
DomView.prototype.onChange = function(callback){
    this.onUpdateCallback = callback;
}
var DogViewer = function(ref,viewController){
    this.ref = ref;
    this.url =  new URL(this.ref.toString());
    this.rootPath=this.url.pathname;
    this.view = viewController;
    this.inited=false;
    this.init();
}

//dom node state: 1:null 2 leaf 3 parent
//null and leaf can be edited
//path can only be removed
//

DogViewer.prototype.init = function(){
    var self=this;
    this.ref.on('value',function(snap){
        //init with client
        //init root
        self.mode = 0;
        if(self.inited){
            //do nothing
        }
        else{
            self.inited = true ;
            self._addRoot(self.ref,snap.val());          
        }

    },function(err){
        //init with rest
        self.mode= 1;

    })
    this.view.onAdd(function(url,value){

        self.ref.child(new URL(url).pathname).set(value);
    });
    this.view.onRemove(function(url){
       self.ref.child(new URL(url).pathname).remove(); 
    });
}

DogViewer.prototype._initEventListener = function(ref){
    var url = new URL(ref.toString());
    var path = url.pathname;
    var self=this;
    ref.orderByPriority().on('child_added', function(snap,prKey){
        var key = snap.key()
        var value=snap.val();
        self._addNode(ref,key,prKey,value);

    });
    ref.orderByPriority().on('child_removed',function(snap,prKey){
        var key = snap.key()
        self._removeNode(ref,key);

    });
    ref.orderByPriority().on('child_moved',function(snap,prKey){
        var key = snap.key()
        self._moveNode(ref,key,prKey);

    });
    ref.orderByPriority().on('child_changed',function(snap,prKey){
        var key = snap.key()
        var value=snap.val();
        self._changeNode(ref,key,prKey,value);
    });
}
DogViewer.prototype._destroyEventListener = function(ref){
    var url = new URL(ref.toString());
    var path = url.pathname;
    var self=this;
    ref.orderByPriority().off();
}

DogViewer.prototype._addRoot = function(ref,value){
    this.view.remoteAddNode(new URL(ref.toString()),null,value);
    this._initEventListener(ref);
    
}
DogViewer.prototype._addNode = function (ref,key,prKey,value){

    this.view.remoteAddNode(new URL(ref.child(key).toString()),prKey,value);
    this._initEventListener(ref.child(key));

}
DogViewer.prototype._changeNode = function(ref,key,prKey,value){
    this.view.remoteChangeNode(new URL(ref.child(key).toString()),value);
}
DogViewer.prototype._removeNode = function(ref,key){
    this.view.remoteRemoveNode(new URL(ref.child(key).toString()))
    this._destroyEventListener(ref.child(key));
}
DogViewer.prototype._moveNode = function(ref,key,prKey){
    this.view.remoteMoveNode(new URL(ref.child(key).toString()),prKey);
}


