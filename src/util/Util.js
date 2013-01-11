var contextMenu = {
	element : null,
	list : null,
	isShowing : false,
	att : {
		contentItem : "contentItem"
	},
	style : {
		element : {
			width:"170px",
			minHeight:"170px",
			position:"absolute",
			background:"#F1F1F1",
			border:"1px solid #e4e4e4",
			padding:"10px 20px 10px 20px",
			fontSize:"11px",
			top:"0px"
		},
		list : "",
		item : {
			padding:"4px 0px 4px 0px",
			borderBottom:"1px solid #e4e4e4"
		}
	},
	init : function() {
		this.build();
		if (document.attachEvent) {
			document.attachEvent("oncontextmenu",
					contextMenu.event.onRightClick);
			document.attachEvent("onmouseup", contextMenu.event.onClick);
		} else {
			document.addEventListener('contextmenu',
					contextMenu.event.onRightClick);
			document.addEventListener('mouseup', contextMenu.event.onClick);
		}

	},
	build : function() {
		this.element = document.createElement('div');

		this.list = document.createElement('ul');
		this.element.appendChild(this.list);
		
		this.addStyle(this.list,this.style.list);
		this.addStyle(this.element, this.style.element);
		
		this.addShadow();
	},
	addItem : function(value) {
		var item = document.createElement('li');
		item.textStyle = this.style.item;
		item.setAttribute(contextMenu.att.contentItem, "true");
		item.innerHTML = value;
		this.addStyle(item, this.style.item);
		this.list.appendChild(item);
	},
	addShadow:function()
	{
		this.element.style['-moz-box-shadow']=' 3px 3px 2px #333';
		this.element.style['-webkit-box-shadow']=' 3px 3px 2px #333';
		this.element.style['box-shadow']=' 3px 3px 2px #333';
	},
	addStyle:function(obj,styles)
	{
		for(var name in styles)
		{
			obj.style[name] =styles[name];
		}
	},
	event : {
		onRightClick : function(event) {
			if(contextMenu.isShowing)
				return null;
			contextMenu.isShowing = true;
			document.body.appendChild(contextMenu.element);
			contextMenu.element.style.top = contextMenu.mouseY(document.body,event)+"px";
			contextMenu.element.style.left = contextMenu.mouseX(document.body,event)+"px";
			event.preventDefault ? event.preventDefault(): event.returnValue = false;
			
			return false;
		},
		onClick : function(event) {
			var element =event.srcElement ||event.target;
			if (contextMenu.isShowing) {
				if(element!=contextMenu.element)
				{
					document.body.removeChild(contextMenu.element);
					contextMenu.isShowing = false;
				}
				
			}

		}
	},
	mouseX : function(elem, e) {
		var x;
		if(e.pageX) {
			x = e.pageX;
		} else {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;

		}
		x -= elem.offsetLeft;
		return x;
	},
	mouseY : function(elem, e) {
		var y;
		if(e.pageY) {
			y = e.pageY;
		} else {
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;

		}
		y -= elem.offsetTop;
		return y;
	},
}