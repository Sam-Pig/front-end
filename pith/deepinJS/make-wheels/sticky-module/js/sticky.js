class Sticky{
	constructor(selector,y){
		this.elements = $(selector);
		this.offset = y || 0;
		this.addPlaceholder();
		this.cacheOffsets();
		this.listenToScoll();
	}

	addPlaceholder(){
		this.elements.each((index, element)=> {
			$(element).wrap('<div class="placeholder"></div>');
			$(element).parent().height($(element).height());
		});
	}
	cacheOffsets(){
		this.offsets = [];
		this.elements.each((index, element)=> {
			this.offsets[index] = $(element).offset();
		});
	}
	listenToScoll(){
		$(window).on('scroll', ()=> {
			var scollY = window.scrollY;
			this.elements.each((index, element)=> {
				if(scollY + this.offset > this.offsets[index].top){
					$(element).addClass('sticky')
							  .css({top: this.offset});
				}else{
					$(element).removeClass('sticky');
				}
			})
		});
	}
}

new Sticky('#topbar');
new Sticky('button', 60);