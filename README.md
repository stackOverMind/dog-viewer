# dog-viewer
wilddog data viewer and editor

## 依赖安装

```
npm install
bower install

```

## 调试

```
gulp serve

```

## 压缩

```
gulp build

```

## Example

```html

<!DOCTYPE html>
<html>
<head>
	<title>Dog Viewer</title>
	<link rel="stylesheet" type="text/css" href="/assets/dog-viewer.css">
</head>
<body>
<div class="editor"><div>
<script type="text/javascript" src="https://cdn.wilddog.com/js/client/current/wilddog.js"></script>
<script type="text/javascript" src="/src/dog-viewer.js"></script>
<script type="text/javascript">
	var ref = new Wilddog('https://test123.wilddogio.com');
	var viewController = new DomView(document.querySelector(".editor"),function(url,rmCallback){
		var res = window.confirm("sure to delete :"+ url + " ?");
		if(res)
			rmCallback(url);
	});
	var dogView = new DogViewer(ref,viewController);
	dogView.init();
</script>

</body>
</html>


```

