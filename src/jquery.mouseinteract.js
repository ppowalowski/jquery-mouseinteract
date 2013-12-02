

/*################
	MouseInteract - gives Classes on Mouse interaction
#############*/

jQuery.fn.mouseInteract = function(options){
	var self = this;
	this.options = {
		'mouseOverClass':'over',
		'mouseDownClass':'pressed',
		'onMouseOver':function(){},
		'onMouseDown':function(){},
		'onMouseUp':function(){},
		'onMouseOut':function(){},
		'delegation':false,
		'delegationParentSelector':'body'
	};
	this.initialize = function(options){
		if (options)
			jQuery.extend(true, this.options, options);
		this.$elements = jQuery(this);
		this.selector = this.selector;
		if(this.options.delegation)
			this.delegateEvents();
		else
			this.initElements();
		return this;
	};
	this.EventHandler = {
		'mouseOver':function(e){
			jQuery(this).addClass(self.options.mouseOverClass);
			self.options.onMouseOver.apply(this,[e,jQuery(this)]);
		},
		'mouseOut':function(e){
			jQuery(this).removeClass(self.options.mouseOverClass);
			jQuery(this).removeClass(self.options.mouseDownClass);
			self.options.onMouseOut.apply(this,[e,jQuery(this)]);
		},
		'mouseDown':function(e){
			jQuery(this).addClass(self.options.mouseDownClass);
			self.options.onMouseDown.apply(this,[e,jQuery(this)]);
		},
		'mouseUp':function(e){
			jQuery(this).removeClass(self.options.mouseDownClass);
			self.options.onMouseUp.apply(this,[e,jQuery(this)]);
		}
	};
	this.delegateEvents = function(){
		jQuery(this.options.delegationParentSelector).on(
			{
				'mouseover.mouseInteract':this.EventHandler.mouseOver,
				'mouseout.mouseInteract':this.EventHandler.mouseOut,
				'mousedown.mouseInteract':this.EventHandler.mouseDown,
				'mouseup.mouseInteract':this.EventHandler.mouseUp
			},this.selector
		)
	};
	this.initElements = function(){
		var self = this;
		this.$elements.each(function(index,element){
			var $element = jQuery(element);
			self.attachEvents($element);
		});
	};
	this.attachEvents = function($element){
		var self = this;
		var $element = $element;
		$element.bind('mouseover.mouseInteract',this.EventHandler.mouseOver);
		$element.bind('mouseout.mouseInteract',this.EventHandler.mouseOut);
		$element.bind('mousedown.mouseInteract',this.EventHandler.mouseDown);
		$element.bind('mouseup.mouseInteract',this.EventHandler.mouseUp);
	};
	this.initialize(options);
};
//Has initial CSS Issue on delegation
jQuery.fn.mouseoverFader = function(options){
	this.options = {
		'css':{
			'opacity':0.7
		},
		'cssTarget':{
			'opacity':1
		},
		'duration':160,
		'mouseOverClass':'over',
		'mouseDownClass':'pressed',
		'onMouseOver':function(){},
		'onMouseDown':function(){},
		'onMouseUp':function(){},
		'onMouseOut':function(){},
		'delegation':false,
		'delegationParentSelector':'body'
	};

	this.initialize = function(options){
		if (options)
			jQuery.extend(true, this.options, options);
		this.selector = selector();
		this.$elements = jQuery(this);
		this.initElements();
		return this;
	};
	this.initElements = function(){
		var self = this;
		this.$elements.each(function(index,element){
			var $element = jQuery(element);
			self.setCSS($element);
		});
		self.attachEvents($elements);
	};
	this.attachEvents = function($elements){
		var self = this;
		this.mouseInteract = jQuery(this.selector).mouseInteract({
			'delegation':this.options.delegation,
			'delegationParentSelector':this.options.delegationParentSelector,
			'onMouseOver':function(e){
				this.animate(self.options.cssTarget,self.options.duration);
				self.options.onMouseOver();
			},
			'onMouseOut':function(e){
				self.options.onMouseOut()
				this.animate(self.options.css,self.options.duration);
			},
		});
	};
	this.setCSS = function($element){
		$element.css(this.options.css);
	};
	this.initialize(options);
};