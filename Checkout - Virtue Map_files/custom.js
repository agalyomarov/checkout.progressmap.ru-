jQuery(document).ready(function ($) {

	if (snaptr && typeof snapchat_purchase != 'undefined') {
		const obj_snapchat_purchase = JSON.parse(snapchat_purchase);
		snaptr('track', 'PURCHASE', obj_snapchat_purchase);
	}

	if (snaptr && typeof snapchat_start_checkout != 'undefined') {
		snaptr('track', 'START_CHECKOUT');
	}

	if (typeof showFunnelsModal !== 'undefined' && showFunnelsModal) {
		$('.wfacp_modal_overlay').removeClass("wfacp_display_none");
		$('.wfacp_modal_outerwrap').fadeIn(300);
	}






	function wfacp_scroll() {
		$('html,body').animate({
			scrollTop: $('#wfacp-e-form').offset().top
		}, 1000);

	}

	$('body').on('click', '.wfacp_modal_open a[data-product_id]', function (e) {
		e.preventDefault();
		let productID = $(this).attr('data-product_id');
		let targetProduct = $('body .wfacp_product_switcher_container > fieldset[data-id=' + productID + '] input.wfacp_switcher_checkbox');
		let targetProductPriceText = $('body .wfacp_product_switcher_container > fieldset[data-id=' + productID + '] .woocommerce-Price-amount').text();
		let targetProductPrice = targetProductPriceText.replace(/[^\d.-]/g, '');
		targetProduct.click();

		let formInPageID = $('#wfacp_embed_form_page_id').val();
		if (formInPageID && productID.length) {
			targetValue = productID;
			cookieName = formInPageID + '_selected_product';
			setCookie(cookieName, targetValue); //allways set new value
		}

		if (snaptr) {
			let snapchat_add_cart = {
				'currency': 'USD',
				'price': targetProductPrice,
				'item_ids': [productID],
			}
			snaptr('track', 'ADD_CART', snapchat_add_cart);
		}

	});

	$(window).load(function () {
		$('.posf').hide();
	});

	random_percent();
	function random_percent() {
		let target = $('.ran-value');
		if (target.length) {
			target.each(function (index) {
				targetID = $(this).attr('id');
				targetText = $(this).text();
				if (!getCookie(targetID)) {
					setCookie(targetID, targetText);
				}
			});
		}
	}
	// random_icons();
	function random_icons() {
		let target = $('.random-icons');
		if (target.length) {
			targetValue = target.data('rand-keys');
			cookieName = 'rand_icons';
			if (!getCookie(cookieName)) {
				setCookie(cookieName, targetValue);
			}
		}
	}

	function setCookie(cname, cvalue, exdays) {
		const d = new Date();
		// d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000)); // use for exdays
		let seconds = (typeof cookieTime != 'undefined') ? cookieTime : 3600;
		d.setTime(d.getTime() + (seconds * 1000));
		let expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	function getCookie(cname) {
		let name = cname + "=";
		let ca = document.cookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

});

jQuery(document.body).on('added_to_cart', function () {
	var targetButton = jQuery('#elementor-menu-cart__toggle_button');
	if (targetButton.length) {
		targetButton.trigger('click');
	}
});
//email >>>>
const emailInput = document.querySelector('input[type="email"]#form-field-email');
const suggestDiv = document.querySelector(".elementor-field-type-email");
if (typeof emailInput !== 'undefined' && emailInput !== null) {
	emailInput.addEventListener('input', (event) => {
		const suggestDivElem = document.getElementById("suggestEmail");
		Mailcheck.run({
			email: emailInput.value,
			suggested: function (suggestion) {
				if (validateEmail(emailInput.value)) {
					let textvalue = '';
					if (jQuery('body #suggestEmail').length) {
						textvalue = suggestion.full;
						jQuery('body #suggestEmail').html(textvalue);
					} else {
						let textvalue = '<div class="suggestWrap">Did you mean <span id="suggestEmail">' + suggestion.full + '</span> ?</div>';
						jQuery('.elementor-field-type-email').append(textvalue);

					}
				}

			},
			empty: function () {
				// callback code
				if (typeof suggestDivElem !== 'undefined' && suggestDivElem !== null) {
					jQuery('body .suggestWrap').remove();
				}

			}
		});
	});
}

document.addEventListener('click', function (e) {
	if (e.target && e.target.id == 'suggestEmail') {
		emailInput.value = suggestEmail.innerHTML;
		jQuery('body .suggestWrap').remove();
	}
});

function validateEmail(email) {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};
// <<<<email



let qq = document.querySelectorAll('._sec');
let qqq = qq.textContent;
let aa = document.querySelectorAll('._min');
let aaa = aa.textContent;
console.log(qqq)
let qw = 30
let as = 14

setInterval(() => {
	for (let index = 0; index < qq.length; index++) {
		const element = qq[index];
		qq[index].innerHTML = qw

		aa[index].innerHTML = as


	}
	qw--
	if (qw == 0) {
		as--
		qw = 59
	}

}, 1000);