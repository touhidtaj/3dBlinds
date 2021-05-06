window.flux = {
        version: "1.4.4"
    },
    function(i) {
        flux.slider = function(t, e) {
            flux.browser.init(), flux.browser.supportsTransitions || window.console && window.console.error && console.error("Flux Slider requires a browser that supports CSS3 transitions");
            var n = this;
            for (var s in this.element = i(t), this.transitions = [], flux.transitions) this.transitions.push(s);
            this.options = i.extend({
                autoplay: !0,
                transitions: this.transitions,
                delay: 3e3,
                pagination: !0,
                controls: !1,
                captions: !1,
                width: null,
                height: null,
                onTransitionEnd: null
            }, e), this.height = this.options.height ? this.options.height : null, this.width = this.options.width ? this.options.width : null;
            var o = [];
            i(this.options.transitions).each(function(i, t) {
                var e = new flux.transitions[t](this),
                    n = !0;
                e.options.requires3d && !flux.browser.supports3d && (n = !1), e.options.compatibilityCheck && (n = e.options.compatibilityCheck()), n && o.push(t)
            }), this.options.transitions = o, this.images = new Array, this.imageLoadedCount = 0, this.currentImageIndex = 0, this.nextImageIndex = 1, this.playing = !1, this.container = i('<div class="fluxslider"></div>').appendTo(this.element), this.surface = i('<div class="surface" style="position: relative"></div>').appendTo(this.container), this.container.bind("click", function(t) {
                i(t.target).hasClass("hasLink") && (window.location = i(t.target).data("href"))
            }), this.imageContainer = i('<div class="images loading"></div>').css({
                position: "relative",
                overflow: "hidden",
                "min-height": "100px"
            }).appendTo(this.surface), this.width && this.height && this.imageContainer.css({
                width: "300px",
                height: "250px"
            }), this.image1 = i('<div class="image1" style="height: 100%; width: 100%"></div>').appendTo(this.imageContainer), this.image2 = i('<div class="image2" style="height: 100%; width: 100%"></div>').appendTo(this.imageContainer), i(this.image1).add(this.image2).css({
                position: "absolute",
                top: "0px",
                left: "0px"
            }), this.element.find("img, a img").each(function(t, e) {
                var s = e.cloneNode(!1),
                    o = i(e).parent();
                o.is("a") && i(s).data("href", o.attr("href")), n.images.push(s), i(e).remove()
            });
            for (var r = 0; r < this.images.length; r++) {
                var a = new Image;
                a.onload = function() {
                    n.imageLoadedCount++, n.width = n.width ? n.width : this.width, n.height = n.height ? n.height : this.height, n.imageLoadedCount >= n.images.length && (n.finishedLoading(), n.setupImages())
                }, a.src = this.images[r].src
            }
            this.element.bind("fluxTransitionEnd", function(i, t) {
                n.options.onTransitionEnd && (i.preventDefault(), n.options.onTransitionEnd(t))
            }), this.options.autoplay && this.start(), this.element.bind("swipeLeft", function(i) {
                n.next(null, {
                    direction: "left"
                })
            }).bind("swipeRight", function(i) {
                n.prev(null, {
                    direction: "right"
                })
            }), setTimeout(function() {
                i(window).focus(function() {
                    n.isPlaying() && n.next()
                })
            }, 100)
        };
        var t = 0;
        flux.slider.prototype = {
            constructor: flux.slider,
            playing: !1,
            start: function() {
                var e = this;
                this.playing = !0, this.interval = setInterval(function() {
                    console.log("play"), i(document).click(function() {
                        tasteCreator(t)
                    }), e.transition(), t < 4 ? t++ : t = 0
                }, this.options.delay)
            },
            stop: function() {
                this.playing = !1, clearInterval(this.interval), this.interval = null
            },
            isPlaying: function() {
                return this.playing
            },
            next: function(i, t) {
                (t = t || {}).direction = "left", this.showImage(this.currentImageIndex + 1, i, t)
            },
            prev: function(i, t) {
                (t = t || {}).direction = "right", this.showImage(this.currentImageIndex - 1, i, t)
            },
            showImage: function(i, t, e) {
                this.setNextIndex(i), this.setupImages(), this.transition(t, e)
            },
            finishedLoading: function() {
                var t = this;
                if (this.container.css({
                        width: this.width + "px",
                        height: this.height + "px"
                    }), this.imageContainer.removeClass("loading"), this.options.pagination && (this.pagination = i('<ul class="pagination"></ul>').css({
                        margin: "0px",
                        padding: "0px",
                        "text-align": "center"
                    }), this.pagination.bind("click", function(e) {
                        e.preventDefault(), t.showImage(i(e.target).data("index"))
                    }), i(this.images).each(function(e, n) {
                        var s = i('<li data-index="' + e + '">' + (e + 1) + "</li>").css({
                            display: "inline-block",
                            "margin-left": "0.5em",
                            cursor: "pointer"
                        }).appendTo(t.pagination);
                        0 == e && s.css("margin-left", 0).addClass("current")
                    }), this.container.append(this.pagination)), i(this.imageContainer).css({
                        width: this.width + "px",
                        height: this.height + "px"
                    }), i(this.image1).css({
                        width: this.width + "px",
                        height: this.height + "px"
                    }), i(this.image2).css({
                        width: this.width + "px",
                        height: this.height + "px"
                    }), this.container.css({
                        width: this.width + "px",
                        height: this.height + (this.options.pagination ? this.pagination.height() : 0) + "px"
                    }), this.options.controls) {
                    var e = {
                        padding: "4px 10px 10px",
                        "font-size": "60px",
                        "font-family": "arial, sans-serif",
                        "line-height": "1em",
                        "font-weight": "bold",
                        color: "#FFF",
                        "text-decoration": "none",
                        background: "rgba(0,0,0,0.5)",
                        position: "absolute",
                        "z-index": 2e3
                    };
                    this.nextButton = i('<a href="#">»</a>').css(e).css3({
                        "border-radius": "4px"
                    }).appendTo(this.surface).bind("click", function(i) {
                        i.preventDefault(), t.next()
                    }), this.prevButton = i('<a href="#">«</a>').css(e).css3({
                        "border-radius": "4px"
                    }).appendTo(this.surface).bind("click", function(i) {
                        i.preventDefault(), t.prev()
                    });
                    var n = (this.height - this.nextButton.height()) / 2;
                    this.nextButton.css({
                        top: n + "px",
                        right: "10px"
                    }), this.prevButton.css({
                        top: n + "px",
                        left: "10px"
                    })
                }
                this.options.captions && (this.captionBar = i('<div class="caption"></div>').css({
                    background: "rgba(0,0,0,0.6)",
                    color: "#FFF",
                    "font-size": "16px",
                    "font-family": "helvetica, arial, sans-serif",
                    "text-decoration": "none",
                    "font-weight": "bold",
                    padding: "1.5em 1em",
                    opacity: 0,
                    position: "absolute",
                    "z-index": 110,
                    width: "100%",
                    bottom: 0
                }).css3({
                    "transition-property": "opacity",
                    "transition-duration": "800ms",
                    "box-sizing": "border-box"
                }).prependTo(this.surface)), this.updateCaption()
            },
            setupImages: function() {
                var t = this.getImage(this.currentImageIndex),
                    e = {
                        "background-image": 'url("' + t.src + '")',
                        "z-index": 101,
                        cursor: "pointer"
                    };
                i(t).data("href") ? (e.cursor = "pointer", this.image1.addClass("hasLink"), this.image1.data("href", i(t).data("href"))) : (this.image1.removeClass("hasLink"), this.image1.data("href", null)), this.image1.css(e).children().remove(), this.image2.css({
                    "background-image": 'url("' + this.getImage(this.nextImageIndex).src + '")',
                    "z-index": 100
                }).show(), this.options.pagination && this.pagination && (this.pagination.find("li.current").removeClass("current"), i(this.pagination.find("li")[this.currentImageIndex]).addClass("current"))
            },
            transition: function(t, e) {
                if (null == t || !flux.transitions[t]) {
                    var n = Math.floor(Math.random() * this.options.transitions.length);
                    t = this.options.transitions[n]
                }
                var s = null;
                try {
                    s = new flux.transitions[t](this, i.extend(this.options[t] ? this.options[t] : {}, e))
                } catch (i) {
                    s = new flux.transition(this, {
                        fallback: !0
                    })
                }
                s.run(), this.currentImageIndex = this.nextImageIndex, this.setNextIndex(this.currentImageIndex + 1), this.updateCaption()
            },
            updateCaption: function() {
                var t = i(this.getImage(this.currentImageIndex)).attr("title");
                this.options.captions && this.captionBar && ("" !== t && this.captionBar.html(t), this.captionBar.css("opacity", "" === t ? 0 : 1))
            },
            getImage: function(i) {
                return i %= this.images.length, this.images[i]
            },
            setNextIndex: function(i) {
                null == i && (i = this.currentImageIndex + 1), this.nextImageIndex = i, this.nextImageIndex > this.images.length - 1 && (this.nextImageIndex = 0), this.nextImageIndex < 0 && (this.nextImageIndex = this.images.length - 1)
            },
            increment: function() {
                this.currentImageIndex++, this.currentImageIndex > this.images.length - 1 && (this.currentImageIndex = 0)
            }
        }
    }(window.jQuery || window.Zepto),
    function(i) {
        flux.browser = {
            init: function() {
                if (void 0 === flux.browser.supportsTransitions) {
                    document.createElement("div");
                    if (window.Modernizr && void 0 !== Modernizr.csstransitions ? flux.browser.supportsTransitions = Modernizr.csstransitions : flux.browser.supportsTransitions = this.supportsCSSProperty("Transition"), window.Modernizr && void 0 !== Modernizr.csstransforms3d) flux.browser.supports3d = Modernizr.csstransforms3d;
                    else if (flux.browser.supports3d = this.supportsCSSProperty("Perspective"), flux.browser.supports3d && "webkitPerspective" in i("body").get(0).style) {
                        var t = i('<div id="csstransform3d"></div>'),
                            e = i('<style media="(transform-3d), (' + ["-webkit", "-moz", "-o", "-ms"].join("-transform-3d),(") + '-transform-3d)">div#csstransform3d { position: absolute; left: 9px }</style>');
                        i("body").append(t), i("head").append(e), flux.browser.supports3d = 9 == t.get(0).offsetLeft, t.remove(), e.remove()
                    }
                }
            },
            supportsCSSProperty: function(i) {
                for (var t = document.createElement("div"), e = ["Webkit", "Moz", "O", "Ms"], n = !1, s = 0; s < e.length; s++) e[s] + i in t.style && (n = n || !0);
                return n
            },
            translate: function(i, t, e) {
                return i = null != i ? i : 0, t = null != t ? t : 0, e = null != e ? e : 0, "translate" + (flux.browser.supports3d ? "3d(" : "(") + i + "px," + t + (flux.browser.supports3d ? "px," + e + "px)" : "px)")
            },
            rotateX: function(i) {
                return flux.browser.rotate("x", i)
            },
            rotateY: function(i) {
                return flux.browser.rotate("y", i)
            },
            rotateZ: function(i) {
                return flux.browser.rotate("z", i)
            },
            rotate: function(i, t) {
                return !i in {
                    x: "",
                    y: "",
                    z: ""
                } && (i = "z"), t = null != t ? t : 0, flux.browser.supports3d ? "rotate3d(" + ("x" == i ? "1" : "0") + ", " + ("y" == i ? "1" : "0") + ", " + ("z" == i ? "1" : "0") + ", " + t + "deg)" : "z" == i ? "rotate(" + t + "deg)" : ""
            }
        }, i(function() {
            flux.browser.init()
        })
    }(window.jQuery || window.Zepto),
    function(i) {
        i.fn.css3 = function(i) {
            var t = {},
                e = ["webkit", "moz", "ms", "o"];
            for (var n in i) {
                for (var s = 0; s < e.length; s++) t["-" + e[s] + "-" + n] = i[n];
                t[n] = i[n]
            }
            return this.css(t), this
        }, i.fn.transitionEnd = function(t) {
            for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd"], n = 0; n < e.length; n++) this.bind(e[n], function(n) {
                for (var s = 0; s < e.length; s++) i(this).unbind(e[s]);
                t && t.call(this, n)
            });
            return this
        }, flux.transition = function(t, e) {
            if (this.options = i.extend({
                    requires3d: !1,
                    after: function() {}
                }, e), this.slider = t, this.options.requires3d && !flux.browser.supports3d || !flux.browser.supportsTransitions || !0 === this.options.fallback) {
                var n = this;
                this.options.after = void 0, this.options.setup = function() {
                    n.fallbackSetup()
                }, this.options.execute = function() {
                    n.fallbackExecute()
                }
            }
        }, flux.transition.prototype = {
            constructor: flux.transition,
            hasFinished: !1,
            run: function() {
                var i = this;
                void 0 !== this.options.setup && this.options.setup.call(this), this.slider.image1.css({
                    "background-image": "none"
                }), this.slider.imageContainer.css("overflow", this.options.requires3d ? "visible" : "hidden"), setTimeout(function() {
                    void 0 !== i.options.execute && i.options.execute.call(i)
                }, 5)
            },
            finished: function() {
                this.hasFinished || (this.hasFinished = !0, this.options.after && this.options.after.call(this), this.slider.imageContainer.css("overflow", "hidden"), this.slider.setupImages(), this.slider.element.trigger("fluxTransitionEnd", {
                    currentImage: this.slider.getImage(this.slider.currentImageIndex)
                }))
            },
            fallbackSetup: function() {},
            fallbackExecute: function() {
                this.finished()
            }
        }, flux.transitions = {}, flux.transition_grid = function(t, e) {
            return new flux.transition(t, i.extend({
                columns: 6,
                rows: 6,
                forceSquare: !1,
                setup: function() {
                    var t = this.slider.image1.width(),
                        e = this.slider.image1.height(),
                        n = Math.floor(t / this.options.columns),
                        s = Math.floor(e / this.options.rows);
                    this.options.forceSquare && (s = n, this.options.rows = Math.floor(e / s));
                    for (var o = t - this.options.columns * n, r = Math.ceil(o / this.options.columns), a = e - this.options.rows * s, d = Math.ceil(a / this.options.rows), c = (this.slider.image1.height(), 0), l = 0, h = document.createDocumentFragment(), u = 0; u < this.options.columns; u++) {
                        var p = n;
                        l = 0;
                        if (o > 0) p += g = o >= r ? r : o, o -= g;
                        for (var f = 0; f < this.options.rows; f++) {
                            var g, m = s,
                                x = a;
                            if (x > 0) m += g = x >= d ? d : x, x -= g;
                            var w = i('<div class="tile tile-' + u + "-" + f + '"></div>').css({
                                width: p + "px",
                                height: m + "px",
                                position: "absolute",
                                top: l + "px",
                                left: c + "px"
                            });
                            this.options.renderTile.call(this, w, u, f, p, m, c, l), h.appendChild(w.get(0)), l += m
                        }
                        c += p
                    }
                    this.slider.image1.get(0).appendChild(h)
                },
                execute: function() {
                    var i = this,
                        t = this.slider.image1.height(),
                        e = this.slider.image1.find("div.barcontainer");
                    this.slider.image2.hide(), e.last().transitionEnd(function(t) {
                        i.slider.image2.show(), i.finished()
                    }), e.css3({
                        transform: flux.browser.rotateX(-90) + " " + flux.browser.translate(0, t / 2, t / 2)
                    })
                },
                renderTile: function(i, t, e, n, s, o, r) {}
            }, e))
        }
    }(window.jQuery || window.Zepto),
    function(i) {
        flux.transitions.bars = function(t, e) {
            return new flux.transition_grid(t, i.extend({
                columns: 10,
                rows: 1,
                delayBetweenBars: 40,
                renderTile: function(t, e, n, s, o, r, a) {
                    i(t).css({
                        "background-image": this.slider.image1.css("background-image"),
                        "background-position": "-" + r + "px 0px"
                    }).css3({
                        "transition-duration": "400ms",
                        "transition-timing-function": "ease-in",
                        "transition-property": "all",
                        "transition-delay": e * this.options.delayBetweenBars + "ms"
                    })
                },
                execute: function() {
                    var t = this,
                        e = this.slider.image1.height(),
                        n = this.slider.image1.find("div.tile");
                    i(n[n.length - 1]).transitionEnd(function() {
                        t.finished()
                    }), setTimeout(function() {
                        n.css({
                            opacity: "0.5"
                        }).css3({
                            transform: flux.browser.translate(0, e)
                        })
                    }, 50)
                }
            }, e))
        }
    }(window.jQuery || window.Zepto),
    function(i) {
        flux.transitions.bars3d = function(t, e) {
            return new flux.transition_grid(t, i.extend({
                requires3d: !0,
                columns: 7,
                rows: 1,
                delayBetweenBars: 150,
                perspective: 1e3,
                renderTile: function(t, e, n, s, o, r, a) {
                    var d = i('<div class="bar-' + e + '"></div>').css({
                            width: s + "px",
                            height: "100%",
                            position: "absolute",
                            top: "0px",
                            left: "0px",
                            "z-index": 200,
                            "background-image": this.slider.image1.css("background-image"),
                            "background-position": "-" + r + "px 0px",
                            "background-repeat": "no-repeat"
                        }).css3({
                            "backface-visibility": "hidden"
                        }),
                        c = i(d.get(0).cloneNode(!1)).css({
                            "background-image": this.slider.image2.css("background-image")
                        }).css3({
                            transform: flux.browser.rotateX(90) + " " + flux.browser.translate(0, -o / 2, o / 2)
                        }),
                        l = i('<div class="side bar-' + e + '"></div>').css({
                            width: o + "px",
                            height: o + "px",
                            position: "absolute",
                            top: "0px",
                            left: "0px",
                            background: "#222",
                            "z-index": 190
                        }).css3({
                            transform: flux.browser.rotateY(90) + " " + flux.browser.translate(o / 2, 0, -o / 2) + " " + flux.browser.rotateY(180),
                            "backface-visibility": "hidden"
                        }),
                        h = i(l.get(0).cloneNode(!1)).css3({
                            transform: flux.browser.rotateY(90) + " " + flux.browser.translate(o / 2, 0, s - o / 2)
                        });
                    i(t).css({
                        width: s + "px",
                        height: "100%",
                        position: "absolute",
                        top: "0px",
                        left: r + "px",
                        "z-index": e > this.options.columns / 2 ? 1e3 - e : 1e3
                    }).css3({
                        "transition-duration": "800ms",
                        "transition-timing-function": "linear",
                        "transition-property": "all",
                        "transition-delay": e * this.options.delayBetweenBars + "ms",
                        "transform-style": "preserve-3d"
                    }).append(d).append(c).append(l).append(h)
                },
                execute: function() {
                    this.slider.image1.css3({
                        perspective: this.options.perspective,
                        "perspective-origin": "50% 50%"
                    }).css({
                        "-moz-transform": "perspective(" + this.options.perspective + "px)",
                        "-moz-perspective": "none",
                        "-moz-transform-style": "preserve-3d"
                    });
                    var i = this,
                        t = this.slider.image1.height(),
                        e = this.slider.image1.find("div.tile");
                    this.slider.image2.hide(), e.last().transitionEnd(function(t) {
                        i.slider.image1.css3({
                            "transform-style": "flat"
                        }), i.slider.image2.show(), i.finished()
                    }), setTimeout(function() {
                        e.css3({
                            transform: flux.browser.rotateX(-90) + " " + flux.browser.translate(0, t / 2, t / 2)
                        })
                    }, 50)
                }
            }, e))
        }
    }(window.jQuery || window.Zepto),
    function(i) {
        flux.transitions.blinds = function(t, e) {
            return new flux.transitions.bars(t, i.extend({
                execute: function() {
                    var t = this,
                        e = (this.slider.image1.height(), this.slider.image1.find("div.tile"));
                    i(e[e.length - 1]).transitionEnd(function() {
                        t.finished()
                    }), setTimeout(function() {
                        e.css({
                            opacity: "0.5"
                        }).css3({
                            transform: "scalex(0.0001)"
                        })
                    }, 50)
                }
            }, e))
        }
    }(window.jQuery || window.Zepto),
    function(i) {
        flux.transitions.blinds3d = function(t, e) {
            return new flux.transitions.tiles3d(t, i.extend({
                forceSquare: !1,
                rows: 1,
                columns: 6
            }, e))
        }
    }(window.jQuery || window.Zepto),
    function(i) {
        flux.transitions.zip = function(t, e) {
            return new flux.transitions.bars(t, i.extend({
                execute: function() {
                    var t = this,
                        e = this.slider.image1.height(),
                        n = this.slider.image1.find("div.tile");
                    i(n[n.length - 1]).transitionEnd(function() {
                        t.finished()
                    }), setTimeout(function() {
                        n.each(function(t, n) {
                            i(n).css({
                                opacity: "0.3"
                            }).css3({
                                transform: flux.browser.translate(0, t % 2 ? "-" + 2 * e : e)
                            })
                        })
                    }, 20)
                }
            }, e))
        }
    }(window.jQuery || window.Zepto),
    function(i) {
        flux.transitions.blocks = function(t, e) {
            return new flux.transition_grid(t, i.extend({
                forceSquare: !0,
                delayBetweenBars: 100,
                renderTile: function(t, e, n, s, o, r, a) {
                    var d = Math.floor(10 * Math.random() * this.options.delayBetweenBars);
                    i(t).css({
                        "background-image": this.slider.image1.css("background-image"),
                        "background-position": "-" + r + "px -" + a + "px"
                    }).css3({
                        "transition-duration": "350ms",
                        "transition-timing-function": "ease-in",
                        "transition-property": "all",
                        "transition-delay": d + "ms"
                    }), void 0 === this.maxDelay && (this.maxDelay = 0), d > this.maxDelay && (this.maxDelay = d, this.maxDelayTile = t)
                },
                execute: function() {
                    var t = this,
                        e = this.slider.image1.find("div.tile");
                    this.maxDelayTile.transitionEnd(function() {
                        t.finished()
                    }), setTimeout(function() {
                        e.each(function(t, e) {
                            i(e).css({
                                opacity: "0"
                            }).css3({
                                transform: "scale(0.8)"
                            })
                        })
                    }, 50)
                }
            }, e))
        }
    }(window.jQuery || window.Zepto),
    function(i) {
        flux.transitions.blocks2 = function(t, e) {
            return new flux.transition_grid(t, i.extend({
                cols: 12,
                forceSquare: !0,
                delayBetweenDiagnols: 150,
                renderTile: function(t, e, n, s, o, r, a) {
                    Math.floor(10 * Math.random() * this.options.delayBetweenBars);
                    i(t).css({
                        "background-image": this.slider.image1.css("background-image"),
                        "background-position": "-" + r + "px -" + a + "px"
                    }).css3({
                        "transition-duration": "350ms",
                        "transition-timing-function": "ease-in",
                        "transition-property": "all",
                        "transition-delay": (e + n) * this.options.delayBetweenDiagnols + "ms",
                        "backface-visibility": "hidden"
                    })
                },
                execute: function() {
                    var t = this,
                        e = this.slider.image1.find("div.tile");
                    e.last().transitionEnd(function() {
                        t.finished()
                    }), setTimeout(function() {
                        e.each(function(t, e) {
                            i(e).css({
                                opacity: "0"
                            }).css3({
                                transform: "scale(0.8)"
                            })
                        })
                    }, 50)
                }
            }, e))
        }
    }(window.jQuery || window.Zepto),
    function(i) {
        flux.transitions.concentric = function(t, e) {
            return new flux.transition(t, i.extend({
                blockSize: 60,
                delay: 150,
                alternate: !1,
                setup: function() {
                    for (var t = this.slider.image1.width(), e = this.slider.image1.height(), n = Math.sqrt(t * t + e * e), s = Math.ceil((n - this.options.blockSize) / 2 / this.options.blockSize) + 1, o = document.createDocumentFragment(), r = 0; r < s; r++) {
                        var a = 2 * r * this.options.blockSize + this.options.blockSize,
                            d = i("<div></div>").attr("class", "block block-" + r).css({
                                width: a + "px",
                                height: a + "px",
                                position: "absolute",
                                top: (e - a) / 2 + "px",
                                left: (t - a) / 2 + "px",
                                "z-index": s - r + 100,
                                "background-image": this.slider.image1.css("background-image"),
                                "background-position": "center center"
                            }).css3({
                                "border-radius": a + "px",
                                "transition-duration": "800ms",
                                "transition-timing-function": "linear",
                                "transition-property": "all",
                                "transition-delay": (s - r) * this.options.delay + "ms"
                            });
                        o.appendChild(d.get(0))
                    }
                    this.slider.image1.get(0).appendChild(o)
                },
                execute: function() {
                    var t = this,
                        e = this.slider.image1.find("div.block");
                    i(e[0]).transitionEnd(function() {
                        t.finished()
                    }), setTimeout(function() {
                        e.each(function(e, n) {
                            i(n).css({
                                opacity: "0"
                            }).css3({
                                transform: flux.browser.rotateZ((!t.options.alternate || e % 2 ? "" : "-") + "90")
                            })
                        })
                    }, 50)
                }
            }, e))
        }
    }(window.jQuery || window.Zepto),
    function(i) {
        flux.transitions.warp = function(t, e) {
            return new flux.transitions.concentric(t, i.extend({
                delay: 30,
                alternate: !0
            }, e))
        }
    }(window.jQuery || window.Zepto),
    function(i) {
        flux.transitions.cube = function(t, e) {
            return new flux.transition(t, i.extend({
                requires3d: !0,
                barWidth: 100,
                direction: "left",
                perspective: 1e3,
                setup: function() {
                    var t = this.slider.image1.width(),
                        e = this.slider.image1.height();
                    this.slider.image1.css3({
                        perspective: this.options.perspective,
                        "perspective-origin": "50% 50%"
                    }), this.cubeContainer = i('<div class="cube"></div>').css({
                        width: t + "px",
                        height: e + "px",
                        position: "relative"
                    }).css3({
                        "transition-duration": "800ms",
                        "transition-timing-function": "linear",
                        "transition-property": "all",
                        "transform-style": "preserve-3d"
                    });
                    var n = {
                            height: "100%",
                            width: "100%",
                            position: "absolute",
                            top: "0px",
                            left: "0px"
                        },
                        s = i('<div class="face current"></div>').css(i.extend(n, {
                            background: this.slider.image1.css("background-image")
                        })).css3({
                            "backface-visibility": "hidden"
                        });
                    this.cubeContainer.append(s);
                    var o = i('<div class="face next"></div>').css(i.extend(n, {
                        background: this.slider.image2.css("background-image")
                    })).css3({
                        transform: this.options.transitionStrings.call(this, this.options.direction, "nextFace"),
                        "backface-visibility": "hidden"
                    });
                    this.cubeContainer.append(o), this.slider.image1.append(this.cubeContainer)
                },
                execute: function() {
                    var i = this;
                    this.slider.image1.width(), this.slider.image1.height();
                    this.slider.image2.hide(), this.cubeContainer.transitionEnd(function() {
                        i.slider.image2.show(), i.finished()
                    }), setTimeout(function() {
                        i.cubeContainer.css3({
                            transform: i.options.transitionStrings.call(i, i.options.direction, "container")
                        })
                    }, 50)
                },
                transitionStrings: function(i, t) {
                    var e = this.slider.image1.width(),
                        n = this.slider.image1.height(),
                        s = {
                            up: {
                                nextFace: flux.browser.rotateX(-90) + " " + flux.browser.translate(0, n / 2, n / 2),
                                container: flux.browser.rotateX(90) + " " + flux.browser.translate(0, -n / 2, n / 2)
                            },
                            down: {
                                nextFace: flux.browser.rotateX(90) + " " + flux.browser.translate(0, -n / 2, n / 2),
                                container: flux.browser.rotateX(-90) + " " + flux.browser.translate(0, n / 2, n / 2)
                            },
                            left: {
                                nextFace: flux.browser.rotateY(90) + " " + flux.browser.translate(e / 2, 0, e / 2),
                                container: flux.browser.rotateY(-90) + " " + flux.browser.translate(-e / 2, 0, e / 2)
                            },
                            right: {
                                nextFace: flux.browser.rotateY(-90) + " " + flux.browser.translate(-e / 2, 0, e / 2),
                                container: flux.browser.rotateY(90) + " " + flux.browser.translate(e / 2, 0, e / 2)
                            }
                        };
                    return !(!s[i] || !s[i][t]) && s[i][t]
                }
            }, e))
        }
    }(window.jQuery || window.Zepto),
    function(i) {
        flux.transitions.tiles3d = function(t, e) {
            return new flux.transition_grid(t, i.extend({
                requires3d: !0,
                forceSquare: !0,
                columns: 5,
                perspective: 600,
                delayBetweenBarsX: 200,
                delayBetweenBarsY: 150,
                renderTile: function(t, e, n, s, o, r, a) {
                    var d = i("<div></div>").css({
                            width: s + "px",
                            height: o + "px",
                            position: "absolute",
                            top: "0px",
                            left: "0px",
                            "background-image": this.slider.image1.css("background-image"),
                            "background-position": "-" + r + "px -" + a + "px",
                            "background-repeat": "no-repeat",
                            "-moz-transform": "translateZ(1px)"
                        }).css3({
                            "backface-visibility": "hidden"
                        }),
                        c = i(d.get(0).cloneNode(!1)).css({
                            "background-image": this.slider.image2.css("background-image")
                        }).css3({
                            transform: flux.browser.rotateY(180),
                            "backface-visibility": "hidden"
                        });
                    i(t).css({
                        "z-index": (e > this.options.columns / 2 ? 500 - e : 500) + (n > this.options.rows / 2 ? 500 - n : 500)
                    }).css3({
                        "transition-duration": "800ms",
                        "transition-timing-function": "ease-out",
                        "transition-property": "all",
                        "transition-delay": e * this.options.delayBetweenBarsX + n * this.options.delayBetweenBarsY + "ms",
                        "transform-style": "preserve-3d"
                    }).append(d).append(c)
                },
                execute: function() {
                    this.slider.image1.css3({
                        perspective: this.options.perspective,
                        "perspective-origin": "50% 50%"
                    });
                    var i = this,
                        t = this.slider.image1.find("div.tile");
                    this.slider.image2.hide(), t.last().transitionEnd(function(t) {
                        i.slider.image2.show(), i.finished()
                    }), setTimeout(function() {
                        t.css3({
                            transform: flux.browser.rotateY(180)
                        })
                    }, 50)
                }
            }, e))
        }
    }(window.jQuery || window.Zepto),
    function(i) {
        flux.transitions.turn = function(t, e) {
            return new flux.transition(t, i.extend({
                requires3d: !0,
                perspective: 1300,
                direction: "left",
                setup: function() {
                    var t = i('<div class="tab"></div>').css({
                            width: "50%",
                            height: "100%",
                            position: "absolute",
                            top: "0px",
                            left: "left" == this.options.direction ? "50%" : "0%",
                            "z-index": 101
                        }).css3({
                            "transform-style": "preserve-3d",
                            "transition-duration": "1000ms",
                            "transition-timing-function": "ease-out",
                            "transition-property": "all",
                            "transform-origin": "left" == this.options.direction ? "left center" : "right center"
                        }),
                        e = (i("<div></div>").appendTo(t).css({
                            "background-image": this.slider.image1.css("background-image"),
                            "background-position": ("left" == this.options.direction ? "-" + this.slider.image1.width() / 2 : 0) + "px 0",
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: "0",
                            left: "0",
                            "-moz-transform": "translateZ(1px)"
                        }).css3({
                            "backface-visibility": "hidden"
                        }), i("<div></div>").appendTo(t).css({
                            "background-image": this.slider.image2.css("background-image"),
                            "background-position": ("left" == this.options.direction ? 0 : "-" + this.slider.image1.width() / 2) + "px 0",
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: "0",
                            left: "0"
                        }).css3({
                            transform: flux.browser.rotateY(180),
                            "backface-visibility": "hidden"
                        }), i("<div></div>").css({
                            position: "absolute",
                            top: "0",
                            left: "left" == this.options.direction ? "0" : "50%",
                            width: "50%",
                            height: "100%",
                            "background-image": this.slider.image1.css("background-image"),
                            "background-position": ("left" == this.options.direction ? 0 : "-" + this.slider.image1.width() / 2) + "px 0",
                            "z-index": 100
                        })),
                        n = i('<div class="overlay"></div>').css({
                            position: "absolute",
                            top: "0",
                            left: "left" == this.options.direction ? "50%" : "0",
                            width: "50%",
                            height: "100%",
                            background: "#000",
                            opacity: 1
                        }).css3({
                            "transition-duration": "800ms",
                            "transition-timing-function": "linear",
                            "transition-property": "opacity"
                        }),
                        s = i("<div></div>").css3({
                            width: "100%",
                            height: "100%"
                        }).css3({
                            perspective: this.options.perspective,
                            "perspective-origin": "50% 50%"
                        }).append(t).append(e).append(n);
                    this.slider.image1.append(s)
                },
                execute: function() {
                    var i = this;
                    this.slider.image1.find("div.tab").first().transitionEnd(function() {
                        i.finished()
                    }), setTimeout(function() {
                        i.slider.image1.find("div.tab").css3({
                            transform: flux.browser.rotateY("left" == i.options.direction ? -179 : 179)
                        }), i.slider.image1.find("div.overlay").css({
                            opacity: 0
                        })
                    }, 50)
                }
            }, e))
        }
    }(window.jQuery || window.Zepto),
    function(i) {
        flux.transitions.slide = function(t, e) {
            return new flux.transition(t, i.extend({
                direction: "left",
                setup: function() {
                    var t = this.slider.image1.width(),
                        e = this.slider.image1.height(),
                        n = i('<div class="current"></div>').css({
                            height: e + "px",
                            width: t + "px",
                            position: "absolute",
                            top: "0px",
                            left: "0px",
                            background: this.slider["left" == this.options.direction ? "image1" : "image2"].css("background-image")
                        }).css3({
                            "backface-visibility": "hidden"
                        }),
                        s = i('<div class="next"></div>').css({
                            height: e + "px",
                            width: t + "px",
                            position: "absolute",
                            top: "0px",
                            left: t + "px",
                            background: this.slider["left" == this.options.direction ? "image2" : "image1"].css("background-image")
                        }).css3({
                            "backface-visibility": "hidden"
                        });
                    this.slideContainer = i('<div class="slide"></div>').css({
                        width: 2 * t + "px",
                        height: e + "px",
                        position: "relative",
                        left: "left" == this.options.direction ? "0px" : -t + "px",
                        "z-index": 101
                    }).css3({
                        "transition-duration": "600ms",
                        "transition-timing-function": "ease-in",
                        "transition-property": "all"
                    }), this.slideContainer.append(n).append(s), this.slider.image1.append(this.slideContainer)
                },
                execute: function() {
                    var i = this,
                        t = this.slider.image1.width();
                    "left" == this.options.direction && (t = -t), this.slideContainer.transitionEnd(function() {
                        i.finished()
                    }), setTimeout(function() {
                        i.slideContainer.css3({
                            transform: flux.browser.translate(t)
                        })
                    }, 50)
                }
            }, e))
        }
    }(window.jQuery || window.Zepto),
    function(i) {
        flux.transitions.swipe = function(t, e) {
            return new flux.transition(t, i.extend({
                setup: function() {
                    var t = i("<div></div>").css({
                        width: "100%",
                        height: "100%",
                        "background-image": this.slider.image1.css("background-image")
                    }).css3({
                        "transition-duration": "1600ms",
                        "transition-timing-function": "ease-in",
                        "transition-property": "all",
                        "mask-image": "-webkit-linear-gradient(left, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 48%, rgba(0,0,0,1) 52%, rgba(0,0,0,1) 100%)",
                        "mask-position": "70%",
                        "mask-size": "400%"
                    });
                    this.slider.image1.append(t)
                },
                execute: function() {
                    var t = this,
                        e = this.slider.image1.find("div");
                    i(e).transitionEnd(function() {
                        t.finished()
                    }), setTimeout(function() {
                        i(e).css3({
                            "mask-position": "30%"
                        })
                    }, 50)
                },
                compatibilityCheck: function() {
                    return flux.browser.supportsCSSProperty("MaskImage")
                }
            }, e))
        }
    }(window.jQuery || window.Zepto),
    function(i) {
        flux.transitions.dissolve = function(t, e) {
            return new flux.transition(t, i.extend({
                setup: function() {
                    var t = i('<div class="image"></div>').css({
                        width: "100%",
                        height: "100%",
                        "background-image": this.slider.image1.css("background-image")
                    }).css3({
                        "transition-duration": "600ms",
                        "transition-timing-function": "ease-in",
                        "transition-property": "opacity"
                    });
                    this.slider.image1.append(t)
                },
                execute: function() {
                    var t = this,
                        e = this.slider.image1.find("div.image");
                    i(e).transitionEnd(function() {
                        t.finished()
                    }), setTimeout(function() {
                        i(e).css({
                            opacity: "0.0"
                        })
                    }, 50)
                }
            }, e))
        }
    }(window.jQuery || window.Zepto);



function tasteCreator(i) {}

