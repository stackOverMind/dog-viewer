
var DogViewer = function(ref,rootDom){
    this.ref = ref;
    this.rootDom = rootDom;
    this.prx = ""+Math.floor(Math.random()*10000)
    this.parser = new DOMParser();
    this.init();
}

//dom node state: 1:null 2 leaf 3 parent
//null and leaf can be edited
//path can only be removed
//

DogViewer.prototype.init = function(dom){
    this.ref.on('value',function(snap){},function(err){
        //init with rest
    })

}
DogViewer.Templates = {
    leaf:'<li class="jstree-leaf">
            <div>
                <ins class="jstree-icon">&nbsp;</ins>
                <span class="tree-content">
                    <span><a class="name" href="{{path}}">{{key}}</a>
                        <span class="valueContainer">:<input type="text" title="{{value}}" class="valueedit valueedit-hover" value="{{value}}" disabled="disabled">
                        </span>
                    </span>
                </span>
            </div>
        </li>',
    path:'<li class="jstree-close">
            <div>
                <ins class="jstree-icon">&nbsp;</ins>
                <span class="tree-content">
                    <span><a class="name" href="{{path}}">{{key}}</a>
                        <span class="valueContainer">
                        </span>
                    </span>
                </span>
            </div>
            <ul>    
            </ul>
        </li>'
    editor:'<li class="jstree-leaf adding">
            <div>
                <ins class="jstree-icon">&nbsp;</ins>
                <span class="tree-content">
                    <span>
                        <span class="nameLabel">name:</span>
                        <input type="text" class="nameInput" placeholder="Name">
                        <span>
                            <span class="valueLabel">value:</span>
                            <input type="text" class="valueInput" placeholder="Value">
                        </span>
                    </span>
                    <a href="#" class="spriteBtn addBtn">&nbsp;</a>
                    <a href="#" class="spriteBtn removeBtn">&nbsp;</a>
                </span>
            </div>
        </li>'

}

DogViewer.prototype._newNode = function(ref,value){
    var doc = this.parser.parseFromString(DogViewer.Templates.leaf,"text/xml");
    var res = doc.firstChild;
    var url = ref.toString();
    var path = new URL(url).pathname;
    res.id = this.prx+path;
    var name = res.querySelector("a.name");
    name.href = url;
    name.innerText = ref.key();
    if(typeof value != 'object'){
        var input = res.querySelector("input.valueedit")
        var jsonValue = JSON.stringify(value);
        input.title = jsonValue;
        input.value = jsonValue;        
    }
    else{
        res.querySelector(".valueContainer").innerHTML = '';
        res.appendChild("ul");
    }
    return res;
}

DogViewer.prototype._initNodeEvent = function(ref,dom){

    var url = new URL(ref.toString());
    var path = url.pathname;
	ref.on('child_added',function(snap,prKey){
        var key = snap.key()
        var value = snap.val();
        //TODO
    });
    ref.on('child_removed',function(snap){


    });
    ref.on('child_moved',function(){


    });
    ref.on('child_changed',function(){

    });

}
//id: "{prx}:path"
DogViewer.prototype._insertAfter = function(parentDom,path,toInsert){
    //risk?
    var prDomId = this.prx + path;
    var prDom = parentDom.querySelector("li#"+prDomId);
    if(prDom == parentDom.lastchild){
        parentDom.appendChild(toInsert);
    }
    else{
        parentDom.insertBefore(newElement, targetElement.nextSibling);
    }
}

DogViewer.prototype._DomAddEdtor = function(ref,parentDom,path){


}
DogViewer.prototype._DomAddNode = function (ref,parentDom,path,key,prKey,value){
    //path
    //leaf
    var node=this._newNode(ref,value);
    this._insertAfter(parentDom,path+"/"+key,node);
    this._initNodeEvent(node);
}
DogViewer.prototype._DomChangeNode = function(ref,parentDom,path,key,prKey,value){
    //leaf->path
    //path->leaf
}
DogViewer.prototype._DomReoveNode = function(ref,parentDom,path,key){


}
DogViewer.prototype._DomMoveNode = function(ref,parentDom,path,key, prKey){


}


