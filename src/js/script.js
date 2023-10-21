jQuery(function ($) {
    // この中であればWordpressでも「$」が使用可能になる

    // スクロールイベント
    $(window).on("scroll", function () {
        let scrollHeight = $(document).height();
        let scrollPosition = $(window).height() + $(window).scrollTop();
        let footHeight = $(".footer").innerHeight();

        if (scrollHeight - scrollPosition <= footHeight) {
            $(".page-top").css({
                position: "absolute",
                bottom: footHeight + "px", // ここでfooterの高さを使って位置を調整
                top: "auto",
            });
        } else {
            $(".page-top").css({
                position: "fixed",
                bottom: "0px",
                top: "auto",
            });
        }
    });

    $(window).on("scroll", function () {
        let scrollPosition = $(window).scrollTop();

        if (scrollPosition > 200) {
            // 200pxより下にスクロールされたら
            $(".page-top").fadeIn(); // ボタンを表示（フェードイン）
        } else {
            $(".page-top").fadeOut(); // ボタンを非表示（フェードアウト）
        }
    });

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
                // クラスを削除
                $(".js-header").removeClass("is-current");
                $(".js-drawer").fadeOut(500, function () {
                    $(this).removeClass("is-current");
                });
                $(".js-hamburger").removeClass("is-current");
            } else {
                // クラスを追加
                $(".js-header").addClass("is-current");
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
                $(".js-header").addClass("is-headerColorScroll");
            } else {
                $(".js-header").removeClass("is-headerColorScroll");
            }
        });
    });

    // const mvSwiper = new Swiper(".js-mv-swiper", {
    //     loop: true, // ループさせる
    //     effect: "fade", // フェードのエフェクト
    //     autoplay: {
    //         delay: 3000, // 3秒後に次の画像へ
    //         disableOnInteraction: false, // ユーザー操作後に自動再生を再開する
    //     },
    //     speed: 2000, // ２秒かけながら次の画像へ移動
    //     allowTouchMove: false, // マウスでのスワイプを禁止
    // });

    //画面幅に応じたカード型レイアウトスライダー
    var cardSwiper = new Swiper(".js-card-swiper", {
        autoplay: true,
        speed: 2000,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
    function updateSwiper() {
        var width = window.innerWidth;
        var slidesPerView;
        var spaceBetween;
        if (width <= 375) {
            slidesPerView = 1.26;
            spaceBetween = 24;
        } else if (width >= 1280) {
            slidesPerView = 3.49;
            spaceBetween = 40;
        } else {
            // 375px〜1280pxの範囲で線形補間
            var t = (width - 375) / (1280 - 375);
            slidesPerView = 1.26 + (3.49 - 1.26) * t;
            spaceBetween = 20 + (40 - 20) * t;
        }
        cardSwiper.params.slidesPerView = slidesPerView;
        cardSwiper.params.spaceBetween = spaceBetween;
        cardSwiper.update();
    }
    // 最初に一度呼び出す
    updateSwiper();
    // 画面サイズが変わった時に再度呼び出す
    window.addEventListener("resize", updateSwiper);

    // gsapアニメーション
    const windowWidth = window.innerWidth; // 画面の幅を取得
    const windowHeight = window.innerHeight; // 画面の高さを取得
    const startHeight = windowHeight * 1; // 画面の高さの100%を開始位置とする
    if (windowWidth > 768) {
        const openingTL = gsap.timeline();
        openingTL
            .to(".opening-mv__mask", {
                duration: 4,
                autoAlpha: 0,
                ease: "power4.inOut",
            })
            .fromTo(
                ".opening-mv__mv-left",
                {
                    y: startHeight,
                },
                {
                    y: 0,
                    duration: 3,
                    ease: "power4.inOut",
                },
                "-=2.7"
            )
            .fromTo(
                ".opening-mv__mv-right",
                {
                    y: startHeight,
                },
                {
                    y: 0,
                    duration: 3,
                    ease: "power4.inOut",
                },
                "-=2.8"
            )
            .fromTo(
                ".top-mv__swiper",
                {
                    autoAlpha: 0,
                },
                {
                    duration: 3,
                    autoAlpha: 1,
                    ease: "power4.inOut",
                },
                "-=1.5"
            )
            .fromTo(
                ".top-mv__title-content",
                {
                    autoAlpha: 0,
                },
                {
                    duration: 2.5,
                    autoAlpha: 1,
                    ease: "power4.inOut",
                },
                "-=2.2"
            )
            .fromTo(
                ".js-header",
                {
                    y: -90,
                },
                {
                    y: 0,
                    duration: 0.3,
                    ease: "power4.inOut", // ここが 'in0ut' になってたから修正したよ
                },
                "-=2"
            );
    }

    $(document).ready(function () {
        // 要素の取得とスピードの設定
        var box = $(".js-colorbox"),
            speed = 700;

        // .colorboxの付いた全ての要素に対して下記の処理を行う
        box.each(function () {
            $(this).append('<div class="color"></div>');
            var color = $(this).find($(".color")),
                image = $(this).find("img");
            var counter = 0;

            image.css("opacity", "0");
            color.css("width", "0%");

            // スクロールイベントで背景色が画面に現れたかどうかチェック
            $(window).on("scroll", function () {
                var windowBottom = $(window).scrollTop() + $(window).height();
                var colorTop = color.offset().top;

                if (windowBottom > colorTop && counter == 0) {
                    color.delay(200).animate({ width: "100%" }, speed, function () {
                        image.css("opacity", "1");
                        $(this).css({ left: "0", right: "auto" });
                        $(this).animate({ width: "0%" }, speed);
                    });
                    counter = 1;
                }
            });
        });
    });
});
