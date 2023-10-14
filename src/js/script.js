jQuery(function ($) {
    // この中であればWordpressでも「$」が使用可能になる
    $(window).resize(function () {
        if ($(window).width() >= 768) {
            if ($(".js-drawer").hasClass("is-current")) {
                $(".js-drawer").fadeOut(500, function () {
                    $(this).removeClass("is-current");
                });
                $(".js-hamburger").removeClass("is-current");
            }
        }
    });
    // ハンバーガーメニュー
    $(function () {
        $(".js-hamburger,.js-drawer,.js-drawer a").click(function () {
            if ($(".js-drawer").hasClass("is-current")) {
                $(".js-drawer").fadeOut(500, function () {
                    $(this).removeClass("is-current");
                });
                $(".js-hamburger").removeClass("is-current");
            } else {
                $(".js-drawer").hide().addClass("is-current").fadeIn(500);
                $(".js-hamburger").addClass("is-current");
            }
        });
    });

    // スクロールするとロゴの色変更
    $(function () {
        $(window).on("scroll", function () {
            var sliderHeight = $(".js-top-mv").height();
            if (sliderHeight - 30 < $(this).scrollTop()) {
                $(".js-header").addClass("headerColorScroll");
            } else {
                $(".js-header").removeClass("headerColorScroll");
            }
        });
    });

    // const swiper = new Swiper(".js-swiper", {
    //     loop: true, // ループさせる
    //     effect: "fade", // フェードのエフェクト
    //     autoplay: {
    //         delay: 2000, // ４秒後に次の画像へ
    //         disableOnInteraction: false, // ユーザー操作後に自動再生を再開する
    //     },
    //     speed: 2000, // ２秒かけながら次の画像へ移動
    //     allowTouchMove: false, // マウスでのスワイプを禁止
    // });
});
