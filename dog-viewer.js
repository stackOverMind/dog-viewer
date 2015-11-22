
var DogViewer = function(ref,rootDom){
    this.ref = ref;
    this.rootDom = rootDom;
    this.prx = ""+Math.floor(Math.random()*10000)
    this.url =  new URL(this.ref.toString());
    this.rootPath=this.url.pathname;
    this.parser = new DOMParser();
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
        self._DomAddNode(self.ref,self.rootDom,self.rootPath,snap.key(),null,snap.val());
    },function(err){
        //init with rest
        self.mode= 1;

    })


}
DogViewer.Templates = {
    leaf:'<li class="jstree-leaf">'+
            '<div>'+
                '<ins class="jstree-icon">&nbsp;</ins>'+
                '<span class="tree-content">'+
                    '<span><a class="name" href="{{path}}">{{key}}</a>'+
                        '<span class="valueContainer">:<input type="text" title="{{value}}" class="valueedit valueedit-hover" value="{{value}}" disabled="disabled">'+
                        '</span>'+
                    '</span>'+
                '</span>'+
            '</div>'+
        '</li>',
    path:'<li class="jstree-close">'+
            '<div>'+
                '<ins class="jstree-icon">&nbsp;</ins>'+
                '<span class="tree-content">'+
                    '<span><a class="name" href="{{path}}">{{key}}</a>'+
                        '<span class="valueContainer">'+
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
        '</li>'

}

DogViewer.prototype._newNode = function(ref,value){
    var doc = this.parser.parseFromString(DogViewer.Templates.leaf,"text/html");
    var res = doc.body.firstChild;
    var url = ref.toString();
    var path = new URL(url).pathname;
    res.id = this.prx+path;
    var name = res.querySelector("a.name");
    name.href = url;
    if(path=="/"){
        name.innerText= this.url.host;
    }
    else{
        name.innerText = ref.key();    
    }
    if(typeof value != 'object'){
        var input = res.querySelector("input.valueedit")
        var jsonValue = JSON.stringify(value);
        input.title = jsonValue;
        input.value = jsonValue;        
    }
    else{
        res.querySelector(".valueContainer").innerHTML = '';
        res.appendChild(document.createElement("ul"));
    }
    return res;
}

DogViewer.prototype._initNodeEvent = function(ref,dom){

    var url = new URL(ref.toString());
    var path = url.pathname;
    var self=this;
    ref.orderByPriority().on('child_added',function(snap,prKey){
        var key = snap.key()
        var value = snap.val();
        self._DomAddNode(ref.child(key),dom,path,key,prKey,value);
    });
    ref.orderByPriority().on('child_removed',function(snap){


    });
    ref.orderByPriority().on('child_moved',function(){


    });
    ref.orderByPriority().on('child_changed',function(){

    });

}
//id: "{prx}:path"
DogViewer.prototype._insertAfter = function(parentDom,path,toInsert){
    if(path==null){
        parentDom.appendChild(toInsert);
        return;
    }
    var prDomId = this.prx + path;
    var prDom = document.getElementById(prDomId);
    if(prDom == parentDom.lastChild){
        parentDom.appendChild(toInsert);
    }
    else{
        parentDom.insertBefore(newElement, targetElement.nextSibling);
    }
}

DogViewer.prototype._DomAddEdtor = function(ref,parentDom,path){


}
DogViewer.prototype._DomAddNode = function (ref,parentDom,path,key,prKey,value){
    var node=this._newNode(ref,value);
    if(prKey==null){
         this._insertAfter(parentDom,null,node);       
    }
    else{
        this._insertAfter(parentDom,path+"/"+prKey,node);
    }
    setTimeout(function(){

    },1000)
    this._initNodeEvent(ref,node.querySelector("ul"));
}
DogViewer.prototype._DomChangeNode = function(ref,parentDom,path,key,prKey,value){
    //leaf->path
    //path->leaf

}
DogViewer.prototype._DomReoveNode = function(ref,parentDom,path,key){


}
DogViewer.prototype._DomMoveNode = function(ref,parentDom,path,key, prKey){


}


