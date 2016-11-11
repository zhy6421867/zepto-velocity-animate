$(function(){
	var dpr = $('html').attr('data-dpr');
	var rootFont = $('html').css('font-size');
	var rootFontNum = '';
	var isFemale = true;
	for(i=0;i<rootFont.length;i++){
		if(rootFont[i] != 'p'){
			rootFontNum += rootFont[i];
		}else{
			break;
		}
	}
	var heightPx = $(window).height();
	$card_item = $('.card_item');
	$card_star = $('.card_star');
	$index_load = $('.index_load');
	$card_sm_list = $('.card_sm_list');
	$card_sm_li = $('.card_sm_list').find('ul li');
	$('.card_body').velocity({opacity: 1},1000);
	var ajaxData = {};
	ajaxData.cid = '';
	ajaxData.answer = '';
	ajaxData.version = '1.0.0';
	var answer1 = {};
	answer1.row1 = [];
	answer1.row2 = [];
	answer1.row3 = [];
	answer1.row4 = [];
	var headInfo = {};
	var index13 = function(){
		$('#z_index13').velocity({
			translateY: '-' + ( 100 / 750 * 20 ) + 'rem'
		}, 400, function(){
			index12();
		});
	}
	var index12 = function(){
		$('#z_index12').velocity({
			translateX: ( 117 / 750 * 20 ) + 'rem',
			translateY: '-' + ( 100 / 750 * 20 ) + 'rem'
		}, 400, function(){
			index11();
		});
	}
	var index11 = function(){
		$('#z_index11').velocity({
			translateX: '-' + ( 60 / 750 * 20 ) + 'rem',
			translateY: ( 90 / 750 * 20 ) + 'rem'
		}, 400, function(){
			index10();
		});
	}
	var index10 = function(){
		$('#z_index10').velocity({
			translateX: ( 60 / 750 * 20 ) + 'rem',
			translateY: ( 90 / 750 * 20 ) + 'rem'
		}, 400, function(){
			start();
		});
	}
	var start = function(){
		$card_star.addClass('flash');
		$('.z_start').velocity({
			opacity: 1
		}, 500);
		$card_item.on('click',function(){
			$card_item.off('click');
			var _this = $(this);
			_this.find('.card_forward').addClass('out');
			setTimeout(function(){
				_this.find('.card_back').addClass('in').removeClass('out');
				$index_load.hide();
				_this.siblings().velocity({
					opacity: 0
				}, 400, function(){
					_this.siblings().addClass('hide');
					showCardBack1(_this);
				});
			}, 500);
		});
	}
	var showCardBack1 = function(el){
		var middleTop = ( ( heightPx / rootFontNum ) - 13.6 ) / 3;
		el.velocity({
			translateX: '-' + ( 142 / 750 * 20 ) + 'rem',
			translateY: '-' + ( ( 300 / 750 * 20 ) - middleTop ) + 'rem'
		}, function(){
			showCardBack2(el);
		}, 100);
	}
	var showCardBack2 = function(el){
		el.velocity({
			width: '100%',
			height: '13.6rem'
		}, function(){
			loadFirst(el);
		}, 100);
	}
	var turnCardSm = function(isTrue, index){
		if(isTrue){
			document.getElementById('sm0' + index).setAttribute('src','img/female0' + index + '_sm.png');
			$card_sm_li.eq(index).find('.z_forward').addClass('out');
			setTimeout(function(){
				$card_sm_li.eq(index).find('.z_back').addClass('in').removeClass('out');
			}, 500);
		}else{
			document.getElementById('sm0' + index).setAttribute('src','img/man0' + index + '_sm.png');
			$card_sm_li.eq(index).find('.z_forward').addClass('out');
			setTimeout(function(){
				$card_sm_li.eq(index).find('.z_back').addClass('in').removeClass('out');
			}, 500);
		}
	}
	var openModal = function(){
		$('.z_modal').velocity({
			opacity: '1'
		}, 100);
		setTimeout(function(){
			$('.z_modal').velocity({
				opacity: '0'
			}, 100);
		}, 600);
	}
	var pushAnswer = function(el, isM, index){
		for(i = 0; i < el.length; i++){
			if(el.eq(i).hasClass('on')){
				var tempText = el.eq(i).attr('data-text');
				answer1['row' + index].push(tempText);
				if(!isM){
					break;
				}
			}
		}
	}
	var loadFirst = function(el){
		var answerSex = document.getElementById('answerSex').innerHTML;
		el.find('.card_back').html(answerSex);
		$card_sm_list.show().addClass('slideInUp');
		var isSelect = false;
		$('.z_skip').velocity({
			opacity: '1'
		}, 200, function(){
			$('.z_skip').on('click',function(){
				
			});
		});
		setTimeout(function(){
			el.find('.z_option').on('click',function(){
				el.find('.z_option').removeClass('on');
				$(this).addClass('on');
				if($(this).index() == 0){
					isFemale = false;
				}else{
					isFemale = true;
				}
				isSelect = true;
			});
			el.find('.answer_btn').on('click',function(){
				if(isSelect){
					turnCardSm(isFemale, 1);
					el.find('.card_back').removeClass('flip').addClass('animated slideOutRight');
					setTimeout(function(){
						el.find('.card_back').remove();
						$('.z_skip').velocity({
							opacity: '0'
						}, 200, function(){
							$('.z_skip').off('click');
						});
						loadSecond(el);
						if(isFemale){
							answer1.sex = '女';
						}else{
							answer1.sex = '男';
						}
					}, 1000);
				}else{
					openModal();
				}
			});
		}, 500)
	}
	var loadSecond = function(el){
		var answerLine = document.getElementById('answerLine').innerHTML;
		$(answerLine).appendTo(el.find('.card_box'));
		if(isFemale){
			el.find('.answer_img').removeClass('femaleHide');
		}else{
			el.find('.answer_img').removeClass('manHide');
		}
		setTimeout(function(){
			el.find('.z_option').on('click',function(){
				if(!$(this).hasClass('on')){
					$(this).addClass('on');				
				}else{
					$(this).removeClass('on');
				}
			});
			el.find('.answer_btn').on('click',function(){
				if(el.find('.z_option').hasClass('on')){
					turnCardSm(isFemale, 2);
					el.find('.card_back').addClass('slideOutRight');
					pushAnswer(el.find('.z_option'), true, 1);
					setTimeout(function(){
						el.find('.card_back').remove();
						loadThird(el);
					}, 1000);
				}else{
					openModal();
					
				}
			});
		}, 500)
	}
	var loadThird = function(el){
		var answerFour = document.getElementById('answerFour').innerHTML;
		$(answerFour).appendTo(el.find('.card_box'));
		var isSelect = false;
		if(isFemale){
			el.find('.answer_img').removeClass('femaleHide');
		}else{
			el.find('.answer_img').removeClass('manHide');
		}
		setTimeout(function(){
			el.find('.z_option').on('click',function(){
				el.find('.z_option').removeClass('on');
				$(this).addClass('on');
				isSelect = true;
			});
			el.find('.answer_btn').on('click',function(){
				if(isSelect){
					turnCardSm(isFemale, 3);
					el.find('.card_back').addClass('slideOutRight');
					pushAnswer(el.find('.z_option'), false, 2);
					setTimeout(function(){
						el.find('.card_back').remove();
						loadFourth(el);
					}, 1000);
				}else{
					openModal();
				}
			});
		}, 500)		
	}
	var loadFourth = function(el){
		var answerFive = document.getElementById('answerFive').innerHTML;
		$(answerFive).appendTo(el.find('.card_box'));
		var isSelect = false;
		setTimeout(function(){
			el.find('.z_option').on('click',function(){
				el.find('.z_option').removeClass('on');
				$(this).addClass('on');
				isSelect = true;
			});
			el.find('.answer_btn').on('click',function(){
				if(isSelect){
					turnCardSm(isFemale, 4);
					el.find('.card_back').addClass('slideOutRight');
					pushAnswer(el.find('.z_option'), false, 3);
					setTimeout(function(){
						el.find('.card_back').remove();
						loadFifth(el);
					}, 1000);
				}else{
					openModal();
				}
			});
		}, 500)		
	}
	var loadFifth = function(el){
		if(isFemale){
			var answerFinal = document.getElementById('answerExperienceFemale').innerHTML;
		}else{
			var answerFinal = document.getElementById('answerExperienceMan').innerHTML;
		}
		$(answerFinal).appendTo(el.find('.card_box'));
		el.find('.z_option').on('click',function(){
			if(!$(this).hasClass('on')){
				$(this).addClass('on');				
			}else{
				$(this).removeClass('on');
			}
		});
		el.find('.answer_btn_final').on('click',function(){
			if(el.find('.z_option').hasClass('on')){
				pushAnswer(el.find('.z_option'), true, 4);
				console.log(JSON.stringify(ajaxData));
				$('.z_success .z_btn').on('click',function(){
					$('body').addClass('zoomOut');
				});
				$('.z_success').velocity('fadeIn', {
					display: 'block'
				}, 300);
			}else{
				openModal();
			}
		});		
	}
	setTimeout(function(){
		$('.z_title').addClass('bounceInDown').show();
		$('#z_index14').velocity({
			translateX: '-' + ( 117 / 750 * 20 ) + 'rem',
			translateY: '-' + ( 100 / 750 * 20 ) + 'rem'
		}, 400, function(){
			index13();
		});
	}, 1500);
});