(function() {
    var f = window.AmCharts;
    f.AmRectangularChart = f.Class({
        inherits: f.AmCoordinateChart,
        construct: function(a) {
            f.AmRectangularChart.base.construct.call(this, a);
            this.theme = a;
            this.createEvents("zoomed", "changed");
            this.marginRight = this.marginBottom = this.marginTop = this.marginLeft = 20;
            this.depth3D = this.angle = 0;
            this.plotAreaFillColors = "#FFFFFF";
            this.plotAreaFillAlphas = 0;
            this.plotAreaBorderColor = "#000000";
            this.plotAreaBorderAlpha = 0;
            this.maxZoomFactor = 20;
            this.zoomOutButtonImageSize = 19;
            this.zoomOutButtonImage =
                "lens";
            this.zoomOutText = "Show all";
            this.zoomOutButtonColor = "#e5e5e5";
            this.zoomOutButtonAlpha = 0;
            this.zoomOutButtonRollOverAlpha = 1;
            this.zoomOutButtonPadding = 8;
            this.trendLines = [];
            this.autoMargins = !0;
            this.marginsUpdated = !1;
            this.autoMarginOffset = 10;
            f.applyTheme(this, a, "AmRectangularChart")
        },
        initChart: function() {
            f.AmRectangularChart.base.initChart.call(this);
            this.updateDxy();
            !this.marginsUpdated && this.autoMargins && (this.resetMargins(), this.drawGraphs = !1);
            this.processScrollbars();
            this.updateMargins();
            this.updatePlotArea();
            this.updateScrollbars();
            this.updateTrendLines();
            this.updateChartCursor();
            this.updateValueAxes();
            this.scrollbarOnly || this.updateGraphs()
        },
        drawChart: function() {
            f.AmRectangularChart.base.drawChart.call(this);
            this.drawPlotArea();
            if (f.ifArray(this.chartData)) {
                var a = this.chartCursor;
                a && a.draw()
            }
        },
        resetMargins: function() {
            var a = {},
                b;
            if ("xy" == this.type) {
                var c = this.xAxes,
                    d = this.yAxes;
                for (b = 0; b < c.length; b++) {
                    var g = c[b];
                    g.ignoreAxisWidth || (g.setOrientation(!0), g.fixAxisPosition(), a[g.position] = !0)
                }
                for (b = 0; b <
                    d.length; b++) c = d[b], c.ignoreAxisWidth || (c.setOrientation(!1), c.fixAxisPosition(), a[c.position] = !0)
            } else {
                d = this.valueAxes;
                for (b = 0; b < d.length; b++) c = d[b], c.ignoreAxisWidth || (c.setOrientation(this.rotate), c.fixAxisPosition(), a[c.position] = !0);
                (b = this.categoryAxis) && !b.ignoreAxisWidth && (b.setOrientation(!this.rotate), b.fixAxisPosition(), b.fixAxisPosition(), a[b.position] = !0)
            }
            a.left && (this.marginLeft = 0);
            a.right && (this.marginRight = 0);
            a.top && (this.marginTop = 0);
            a.bottom && (this.marginBottom = 0);
            this.fixMargins =
                a
        },
        measureMargins: function() {
            var a = this.valueAxes,
                b, c = this.autoMarginOffset,
                d = this.fixMargins,
                g = this.realWidth,
                h = this.realHeight,
                e = c,
                f = c,
                k = g;
            b = h;
            var m;
            for (m = 0; m < a.length; m++) a[m].handleSynchronization(), b = this.getAxisBounds(a[m], e, k, f, b), e = Math.round(b.l), k = Math.round(b.r), f = Math.round(b.t), b = Math.round(b.b);
            if (a = this.categoryAxis) b = this.getAxisBounds(a, e, k, f, b), e = Math.round(b.l), k = Math.round(b.r), f = Math.round(b.t), b = Math.round(b.b);
            d.left && e < c && (this.marginLeft = Math.round(-e + c), !isNaN(this.minMarginLeft) &&
                this.marginLeft < this.minMarginLeft && (this.marginLeft = this.minMarginLeft));
            d.right && k >= g - c && (this.marginRight = Math.round(k - g + c), !isNaN(this.minMarginRight) && this.marginRight < this.minMarginRight && (this.marginRight = this.minMarginRight));
            d.top && f < c + this.titleHeight && (this.marginTop = Math.round(this.marginTop - f + c + this.titleHeight), !isNaN(this.minMarginTop) && this.marginTop < this.minMarginTop && (this.marginTop = this.minMarginTop));
            d.bottom && b > h - c && (this.marginBottom = Math.round(this.marginBottom + b - h + c), !isNaN(this.minMarginBottom) &&
                this.marginBottom < this.minMarginBottom && (this.marginBottom = this.minMarginBottom));
            this.initChart()
        },
        getAxisBounds: function(a, b, c, d, g) {
            if (!a.ignoreAxisWidth) {
                var h = a.labelsSet,
                    e = a.tickLength;
                a.inside && (e = 0);
                if (h) switch (h = a.getBBox(), a.position) {
                    case "top":
                        a = h.y;
                        d > a && (d = a);
                        break;
                    case "bottom":
                        a = h.y + h.height;
                        g < a && (g = a);
                        break;
                    case "right":
                        a = h.x + h.width + e + 3;
                        c < a && (c = a);
                        break;
                    case "left":
                        a = h.x - e, b > a && (b = a)
                }
            }
            return {
                l: b,
                t: d,
                r: c,
                b: g
            }
        },
        drawZoomOutButton: function() {
            var a = this;
            if (!a.zbSet) {
                var b = a.container.set();
                a.zoomButtonSet.push(b);
                var c = a.color,
                    d = a.fontSize,
                    g = a.zoomOutButtonImageSize,
                    h = a.zoomOutButtonImage.replace(/\.[a-z]*$/i, ""),
                    e = a.langObj.zoomOutText || a.zoomOutText,
                    l = a.zoomOutButtonColor,
                    k = a.zoomOutButtonAlpha,
                    m = a.zoomOutButtonFontSize,
                    p = a.zoomOutButtonPadding;
                isNaN(m) || (d = m);
                (m = a.zoomOutButtonFontColor) && (c = m);
                var m = a.zoomOutButton,
                    n;
                m && (m.fontSize && (d = m.fontSize), m.color && (c = m.color), m.backgroundColor && (l = m.backgroundColor), isNaN(m.backgroundAlpha) || (a.zoomOutButtonRollOverAlpha = m.backgroundAlpha));
                var u = m = 0,
                    u = a.pathToImages;
                if (h) {
                    if (f.isAbsolute(h) || void 0 === u) u = "";
                    n = a.container.image(u + h + a.extension, 0, 0, g, g);
                    f.setCN(a, n, "zoom-out-image");
                    b.push(n);
                    n = n.getBBox();
                    m = n.width + 5
                }
                void 0 !== e && (c = f.text(a.container, e, c, a.fontFamily, d, "start"), f.setCN(a, c, "zoom-out-label"), d = c.getBBox(), u = n ? n.height / 2 - 3 : d.height / 2, c.translate(m, u), b.push(c));
                n = b.getBBox();
                c = 1;
                f.isModern || (c = 0);
                l = f.rect(a.container, n.width + 2 * p + 5, n.height + 2 * p - 2, l, 1, 1, l, c);
                l.setAttr("opacity", k);
                l.translate(-p, -p);
                f.setCN(a, l, "zoom-out-bg");
                b.push(l);
                l.toBack();
                a.zbBG = l;
                n = l.getBBox();
                b.translate(a.marginLeftReal + a.plotAreaWidth - n.width + p, a.marginTopReal + p);
                b.hide();
                b.mouseover(function() {
                    a.rollOverZB()
                }).mouseout(function() {
                    a.rollOutZB()
                }).click(function() {
                    a.clickZB()
                }).touchstart(function() {
                    a.rollOverZB()
                }).touchend(function() {
                    a.rollOutZB();
                    a.clickZB()
                });
                for (k = 0; k < b.length; k++) b[k].attr({
                    cursor: "pointer"
                });
                void 0 !== a.zoomOutButtonTabIndex && (b.setAttr("tabindex", a.zoomOutButtonTabIndex), b.setAttr("role", "menuitem"), b.keyup(function(b) {
                    13 ==
                        b.keyCode && a.clickZB()
                }));
                a.zbSet = b
            }
        },
        rollOverZB: function() {
            this.rolledOverZB = !0;
            this.zbBG.setAttr("opacity", this.zoomOutButtonRollOverAlpha)
        },
        rollOutZB: function() {
            this.rolledOverZB = !1;
            this.zbBG.setAttr("opacity", this.zoomOutButtonAlpha)
        },
        clickZB: function() {
            this.rolledOverZB = !1;
            this.zoomOut()
        },
        zoomOut: function() {
            this.zoomOutValueAxes()
        },
        drawPlotArea: function() {
            var a = this.dx,
                b = this.dy,
                c = this.marginLeftReal,
                d = this.marginTopReal,
                g = this.plotAreaWidth - 1,
                h = this.plotAreaHeight - 1,
                e = this.plotAreaFillColors,
                l = this.plotAreaFillAlphas,
                k = this.plotAreaBorderColor,
                m = this.plotAreaBorderAlpha;
            "object" == typeof l && (l = l[0]);
            e = f.polygon(this.container, [0, g, g, 0, 0], [0, 0, h, h, 0], e, l, 1, k, m, this.plotAreaGradientAngle);
            f.setCN(this, e, "plot-area");
            e.translate(c + a, d + b);
            this.set.push(e);
            0 !== a && 0 !== b && (e = this.plotAreaFillColors, "object" == typeof e && (e = e[0]), e = f.adjustLuminosity(e, -.15), g = f.polygon(this.container, [0, a, g + a, g, 0], [0, b, b, 0, 0], e, l, 1, k, m), f.setCN(this, g, "plot-area-bottom"), g.translate(c, d + h), this.set.push(g), a = f.polygon(this.container, [0, 0, a, a, 0], [0, h, h + b, b, 0], e, l, 1, k, m), f.setCN(this, a, "plot-area-left"), a.translate(c, d), this.set.push(a));
            (c = this.bbset) && this.scrollbarOnly && c.remove()
        },
        updatePlotArea: function() {
            var a = this.updateWidth(),
                b = this.updateHeight(),
                c = this.container;
            this.realWidth = a;
            this.realWidth = b;
            c && this.container.setSize(a, b);
            var c = this.marginLeftReal,
                d = this.marginTopReal,
                a = a - c - this.marginRightReal - this.dx,
                b = b - d - this.marginBottomReal;
            1 > a && (a = 1);
            1 > b && (b = 1);
            this.plotAreaWidth = Math.round(a);
            this.plotAreaHeight = Math.round(b);
            this.plotBalloonsSet.translate(c, d)
        },
        updateDxy: function() {
            this.dx = Math.round(this.depth3D * Math.cos(this.angle * Math.PI / 180));
            this.dy = Math.round(-this.depth3D * Math.sin(this.angle * Math.PI / 180));
            this.d3x = Math.round(this.columnSpacing3D * Math.cos(this.angle * Math.PI / 180));
            this.d3y = Math.round(-this.columnSpacing3D * Math.sin(this.angle * Math.PI / 180))
        },
        updateMargins: function() {
            var a = this.getTitleHeight();
            this.titleHeight = a;
            this.marginTopReal = this.marginTop - this.dy;
            this.fixMargins && !this.fixMargins.top && (this.marginTopReal +=
                a);
            this.marginBottomReal = this.marginBottom;
            this.marginLeftReal = this.marginLeft;
            this.marginRightReal = this.marginRight
        },
        updateValueAxes: function() {
            var a = this.valueAxes,
                b;
            for (b = 0; b < a.length; b++) {
                var c = a[b];
                this.setAxisRenderers(c);
                this.updateObjectSize(c)
            }
        },
        setAxisRenderers: function(a) {
            a.axisRenderer = f.RecAxis;
            a.guideFillRenderer = f.RecFill;
            a.axisItemRenderer = f.RecItem;
            a.marginsChanged = !0
        },
        updateGraphs: function() {
            var a = this.graphs,
                b;
            for (b = 0; b < a.length; b++) {
                var c = a[b];
                c.index = b;
                c.rotate = this.rotate;
                this.updateObjectSize(c)
            }
        },
        updateObjectSize: function(a) {
            a.width = this.plotAreaWidth - 1;
            a.height = this.plotAreaHeight - 1;
            a.x = this.marginLeftReal;
            a.y = this.marginTopReal;
            a.dx = this.dx;
            a.dy = this.dy
        },
        updateChartCursor: function() {
            var a = this.chartCursor;
            a && (a = f.processObject(a, f.ChartCursor, this.theme), this.updateObjectSize(a), this.addChartCursor(a), a.chart = this)
        },
        processScrollbars: function() {
            var a = this.chartScrollbar;
            a && (a = f.processObject(a, f.ChartScrollbar, this.theme), this.addChartScrollbar(a))
        },
        updateScrollbars: function() {},
        removeChartCursor: function() {
            f.callMethod("destroy", [this.chartCursor]);
            this.chartCursor = null
        },
        zoomTrendLines: function() {
            var a = this.trendLines,
                b;
            for (b = 0; b < a.length; b++) {
                var c = a[b];
                c.valueAxis.recalculateToPercents ? c.set && c.set.hide() : (c.x = this.marginLeftReal, c.y = this.marginTopReal, c.draw())
            }
        },
        handleCursorValueZoom: function() {},
        addTrendLine: function(a) {
            this.trendLines.push(a)
        },
        zoomOutValueAxes: function() {
            for (var a = this.valueAxes, b = 0; b < a.length; b++) a[b].zoomOut()
        },
        removeTrendLine: function(a) {
            var b = this.trendLines,
                c;
            for (c = b.length - 1; 0 <= c; c--) b[c] == a &&
                b.splice(c, 1)
        },
        adjustMargins: function(a, b) {
            var c = a.position,
                d = a.scrollbarHeight + a.offset;
            a.enabled && ("top" == c ? b ? this.marginLeftReal += d : this.marginTopReal += d : b ? this.marginRightReal += d : this.marginBottomReal += d)
        },
        getScrollbarPosition: function(a, b, c) {
            var d = "bottom",
                g = "top";
            a.oppositeAxis || (g = d, d = "top");
            a.position = b ? "bottom" == c || "left" == c ? d : g : "top" == c || "right" == c ? d : g
        },
        updateChartScrollbar: function(a, b) {
            if (a) {
                a.rotate = b;
                var c = this.marginTopReal,
                    d = this.marginLeftReal,
                    g = a.scrollbarHeight,
                    h = this.dx,
                    e = this.dy,
                    f = a.offset;
                "top" == a.position ? b ? (a.y = c, a.x = d - g - f) : (a.y = c - g + e - f, a.x = d + h) : b ? (a.y = c + e, a.x = d + this.plotAreaWidth + h + f) : (a.y = c + this.plotAreaHeight + f, a.x = this.marginLeftReal)
            }
        },
        showZB: function(a) {
            var b = this.zbSet;
            a && (b = this.zoomOutText, "" !== b && b && this.drawZoomOutButton());
            if (b = this.zbSet) this.zoomButtonSet.push(b), a ? b.show() : b.hide(), this.rollOutZB()
        },
        handleReleaseOutside: function(a) {
            f.AmRectangularChart.base.handleReleaseOutside.call(this, a);
            (a = this.chartCursor) && a.handleReleaseOutside && a.handleReleaseOutside()
        },
        handleMouseDown: function(a) {
            f.AmRectangularChart.base.handleMouseDown.call(this, a);
            var b = this.chartCursor;
            b && b.handleMouseDown && !this.rolledOverZB && b.handleMouseDown(a)
        },
        update: function() {
            f.AmRectangularChart.base.update.call(this);
            this.chartCursor && this.chartCursor.update && this.chartCursor.update()
        },
        handleScrollbarValueZoom: function(a) {
            this.relativeZoomValueAxes(a.target.valueAxes, a.relativeStart, a.relativeEnd);
            this.zoomAxesAndGraphs()
        },
        zoomValueScrollbar: function(a) {
            if (a && a.enabled) {
                var b = a.valueAxes[0],
                    c = b.relativeStart,
                    d = b.relativeEnd;
                b.reversed && (d = 1 - c, c = 1 - b.relativeEnd);
                a.percentZoom(c, d)
            }
        },
        zoomAxesAndGraphs: function() {
            if (!this.scrollbarOnly) {
                var a = this.valueAxes,
                    b;
                for (b = 0; b < a.length; b++) a[b].zoom(this.start, this.end);
                a = this.graphs;
                for (b = 0; b < a.length; b++) a[b].zoom(this.start, this.end);
                (b = this.chartCursor) && b.clearSelection();
                this.zoomTrendLines()
            }
        },
        handleValueAxisZoomReal: function(a, b) {
            var c = a.relativeStart,
                d = a.relativeEnd;
            if (c > d) var g = c,
                c = d,
                d = g;
            this.relativeZoomValueAxes(b, c, d);
            this.updateAfterValueZoom()
        },
        updateAfterValueZoom: function() {
            this.zoomAxesAndGraphs();
            this.zoomScrollbar()
        },
        relativeZoomValueAxes: function(a, b, c) {
            b = f.fitToBounds(b, 0, 1);
            c = f.fitToBounds(c, 0, 1);
            if (b > c) {
                var d = b;
                b = c;
                c = d
            }
            var d = 1 / this.maxZoomFactor,
                g = f.getDecimals(d) + 4;
            c - b < d && (c = b + (c - b) / 2, b = c - d / 2, c += d / 2);
            b = f.roundTo(b, g);
            c = f.roundTo(c, g);
            d = !1;
            if (a) {
                for (g = 0; g < a.length; g++) {
                    var h = a[g].zoomToRelativeValues(b, c, !0);
                    h && (d = h)
                }
                this.showZB()
            }
            return d
        },
        addChartCursor: function(a) {
            f.callMethod("destroy", [this.chartCursor]);
            a && (this.listenTo(a,
                "moved", this.handleCursorMove), this.listenTo(a, "zoomed", this.handleCursorZoom), this.listenTo(a, "zoomStarted", this.handleCursorZoomStarted), this.listenTo(a, "panning", this.handleCursorPanning), this.listenTo(a, "onHideCursor", this.handleCursorHide));
            this.chartCursor = a
        },
        handleCursorChange: function() {},
        handleCursorMove: function(a) {
            var b, c = this.valueAxes;
            for (b = 0; b < c.length; b++)
                if (!a.panning) {
                    var d = c[b];
                    d && d.showBalloon && d.showBalloon(a.x, a.y)
                }
        },
        handleCursorZoom: function(a) {
            if (this.skipZoomed) this.skipZoomed = !1;
            else {
                var b = this.startX0,
                    c = this.endX0,
                    d = this.endY0,
                    g = this.startY0,
                    h = a.startX,
                    e = a.endX,
                    f = a.startY,
                    k = a.endY;
                this.startX0 = this.endX0 = this.startY0 = this.endY0 = NaN;
                this.handleCursorZoomReal(b + h * (c - b), b + e * (c - b), g + f * (d - g), g + k * (d - g), a)
            }
        },
        handleCursorHide: function() {
            var a, b = this.valueAxes;
            for (a = 0; a < b.length; a++) b[a].hideBalloon();
            b = this.graphs;
            for (a = 0; a < b.length; a++) b[a].hideBalloonReal()
        }
    })
})();
(function() {
    var f = window.AmCharts;
    f.AmSerialChart = f.Class({
        inherits: f.AmRectangularChart,
        construct: function(a) {
            this.type = "serial";
            f.AmSerialChart.base.construct.call(this, a);
            this.cname = "AmSerialChart";
            this.theme = a;
            this.columnSpacing = 5;
            this.columnSpacing3D = 0;
            this.columnWidth = .8;
            var b = new f.CategoryAxis(a);
            b.chart = this;
            this.categoryAxis = b;
            this.zoomOutOnDataUpdate = !0;
            this.mouseWheelZoomEnabled = this.mouseWheelScrollEnabled = this.rotate = this.skipZoom = !1;
            this.minSelectedTime = 0;
            f.applyTheme(this, a, this.cname)
        },
        initChart: function() {
            f.AmSerialChart.base.initChart.call(this);
            this.updateCategoryAxis(this.categoryAxis, this.rotate, "categoryAxis");
            if (this.dataChanged) this.parseData();
            else this.onDataUpdated();
            this.drawGraphs = !0
        },
        onDataUpdated: function() {
            var a = this.countColumns(),
                b = this.chartData,
                c = this.graphs,
                d;
            for (d = 0; d < c.length; d++) {
                var g = c[d];
                g.data = b;
                g.columnCount = a
            }
            0 < b.length && (this.firstTime = this.getStartTime(b[0].time), this.lastTime = this.getEndTime(b[b.length - 1].time));
            this.drawChart();
            this.autoMargins &&
                !this.marginsUpdated ? (this.marginsUpdated = !0, this.measureMargins()) : this.dispDUpd()
        },
        syncGrid: function() {
            if (this.synchronizeGrid) {
                var a = this.valueAxes,
                    b, c;
                if (0 < a.length) {
                    var d = 0;
                    for (c = 0; c < a.length; c++) b = a[c], d < b.gridCountReal && (d = b.gridCountReal);
                    var g = !1;
                    for (c = 0; c < a.length; c++)
                        if (b = a[c], b.gridCountReal < d) {
                            var h = (d - b.gridCountReal) / 2,
                                e = g = h;
                            0 !== h - Math.round(h) && (g -= .5, e += .5);
                            0 <= b.min && 0 > b.min - g * b.step && (e += g, g = 0);
                            0 >= b.max && 0 < b.max + e * b.step && (g += e, e = 0);
                            h = f.getDecimals(b.step);
                            b.minimum = f.roundTo(b.min -
                                g * b.step, h);
                            b.maximum = f.roundTo(b.max + e * b.step, h);
                            b.setStep = b.step;
                            g = b.strictMinMax = !0
                        }
                    g && this.updateAfterValueZoom();
                    for (c = 0; c < a.length; c++) b = a[c], b.minimum = NaN, b.maximum = NaN, b.setStep = NaN, b.strictMinMax = !1
                }
            }
        },
        handleWheelReal: function(a, b) {
            if (!this.wheelBusy) {
                var c = this.categoryAxis,
                    d = c.parseDates,
                    g = c.minDuration(),
                    h = 1,
                    e = 1;
                this.mouseWheelZoomEnabled ? b || (h = -1) : b && (h = -1);
                var f = this.chartCursor;
                if (f) {
                    var k = f.mouseX,
                        f = f.mouseY;
                    h != e && (k = this.rotate ? f / this.plotAreaHeight : k / this.plotAreaWidth, h *= k, e *= 1 -
                        k);
                    k = .05 * (this.end - this.start);
                    d && (k = .05 * (this.endTime - this.startTime) / g);
                    1 > k && (k = 1);
                    h *= k;
                    e *= k;
                    if (!d || c.equalSpacing) h = Math.round(h), e = Math.round(e)
                }
                f = this.chartData.length;
                c = this.lastTime;
                k = this.firstTime;
                0 > a ? d ? (f = this.endTime - this.startTime, d = this.startTime + h * g, g = this.endTime + e * g, 0 < e && 0 < h && g >= c && (g = c, d = c - f), this.zoomToDates(new Date(d), new Date(g))) : (0 < e && 0 < h && this.end >= f - 1 && (h = e = 0), d = this.start + h, g = this.end + e, this.zoomToIndexes(d, g)) : d ? (f = this.endTime - this.startTime, d = this.startTime - h * g, g = this.endTime -
                    e * g, 0 < e && 0 < h && d <= k && (d = k, g = k + f), this.zoomToDates(new Date(d), new Date(g))) : (0 < e && 0 < h && 1 > this.start && (h = e = 0), d = this.start - h, g = this.end - e, this.zoomToIndexes(d, g))
            }
        },
        validateData: function(a) {
            this.marginsUpdated = !1;
            this.zoomOutOnDataUpdate && !a && (this.endTime = this.end = this.startTime = this.start = NaN);
            f.AmSerialChart.base.validateData.call(this)
        },
        drawChart: function() {
            if (0 < this.realWidth && 0 < this.realHeight) {
                f.AmSerialChart.base.drawChart.call(this);
                var a = this.chartData;
                if (f.ifArray(a)) {
                    var b = this.chartScrollbar;
                    !b || !this.marginsUpdated && this.autoMargins || b.draw();
                    (b = this.valueScrollbar) && b.draw();
                    var b = a.length - 1,
                        c, d;
                    c = this.categoryAxis;
                    if (c.parseDates && !c.equalSpacing) {
                        if (c = this.startTime, d = this.endTime, isNaN(c) || isNaN(d)) c = this.firstTime, d = this.lastTime
                    } else {
                        c = this.start;
                        d = this.end;
                        if (isNaN(c) || isNaN(d)) d = c = NaN;
                        isNaN(c) && (isNaN(this.startTime) || (c = this.getClosestIndex(a, "time", this.startTime, !0, 0, a.length)));
                        isNaN(d) && (isNaN(this.endTime) || (d = this.getClosestIndex(a, "time", this.endTime, !1, 0, a.length)));
                        if (isNaN(c) || isNaN(d)) c = 0, d = b
                    }
                    this.endTime = this.startTime = this.end = this.start = void 0;
                    this.zoom(c, d)
                }
            } else this.cleanChart()
        },
        cleanChart: function() {
            f.callMethod("destroy", [this.valueAxes, this.graphs, this.categoryAxis, this.chartScrollbar, this.chartCursor, this.valueScrollbar])
        },
        updateCategoryAxis: function(a, b, c) {
            a.chart = this;
            a.id = c;
            a.rotate = b;
            a.setOrientation(!this.rotate);
            a.init();
            this.setAxisRenderers(a);
            this.updateObjectSize(a)
        },
        updateValueAxes: function() {
            f.AmSerialChart.base.updateValueAxes.call(this);
            var a = this.valueAxes,
                b;
            for (b = 0; b < a.length; b++) {
                var c = a[b],
                    d = this.rotate;
                c.rotate = d;
                c.setOrientation(d);
                d = this.categoryAxis;
                if (!d.startOnAxis || d.parseDates) c.expandMinMax = !0
            }
        },
        getStartTime: function(a) {
            var b = this.categoryAxis;
            return f.resetDateToMin(new Date(a), b.minPeriod, 1, b.firstDayOfWeek).getTime()
        },
        getEndTime: function(a) {
            var b = f.extractPeriod(this.categoryAxis.minPeriod);
            return f.changeDate(new Date(a), b.period, b.count, !0).getTime() - 1
        },
        updateMargins: function() {
            f.AmSerialChart.base.updateMargins.call(this);
            var a = this.chartScrollbar;
            a && (this.getScrollbarPosition(a, this.rotate, this.categoryAxis.position), this.adjustMargins(a, this.rotate));
            if (a = this.valueScrollbar) this.getScrollbarPosition(a, !this.rotate, this.valueAxes[0].position), this.adjustMargins(a, !this.rotate)
        },
        updateScrollbars: function() {
            f.AmSerialChart.base.updateScrollbars.call(this);
            this.updateChartScrollbar(this.chartScrollbar, this.rotate);
            this.updateChartScrollbar(this.valueScrollbar, !this.rotate)
        },
        zoom: function(a, b) {
            var c = this.categoryAxis;
            c.parseDates && !c.equalSpacing ? this.timeZoom(a, b) : this.indexZoom(a, b);
            isNaN(a) && this.zoomOutValueAxes();
            (c = this.chartCursor) && (c.pan || c.hideCursorReal());
            this.updateLegendValues()
        },
        timeZoom: function(a, b) {
            var c = this.maxSelectedTime;
            isNaN(c) || (b != this.endTime && b - a > c && (a = b - c), a != this.startTime && b - a > c && (b = a + c));
            var d = this.minSelectedTime;
            if (0 < d && b - a < d) {
                var g = Math.round(a + (b - a) / 2),
                    d = Math.round(d / 2);
                a = g - d;
                b = g + d
            }
            d = this.chartData;
            g = this.categoryAxis;
            if (f.ifArray(d) && (a != this.startTime || b != this.endTime)) {
                var h =
                    g.minDuration(),
                    e = this.firstTime,
                    l = this.lastTime;
                a || (a = e, isNaN(c) || (a = l - c));
                b || (b = l);
                a > l && (a = l);
                b < e && (b = e);
                a < e && (a = e);
                b > l && (b = l);
                b < a && (b = a + h);
                b - a < h / 5 && (b < l ? b = a + h / 5 : a = b - h / 5);
                this.startTime = a;
                this.endTime = b;
                c = d.length - 1;
                h = this.getClosestIndex(d, "time", a, !0, 0, c);
                d = this.getClosestIndex(d, "time", b, !1, h, c);
                g.timeZoom(a, b);
                g.zoom(h, d);
                this.start = f.fitToBounds(h, 0, c);
                this.end = f.fitToBounds(d, 0, c);
                this.zoomAxesAndGraphs();
                this.zoomScrollbar();
                this.fixCursor();
                this.showZB();
                this.syncGrid();
                this.updateColumnsDepth();
                this.dispatchTimeZoomEvent()
            }
        },
        showZB: function() {
            var a, b = this.categoryAxis;
            b && b.parseDates && !b.equalSpacing && (this.startTime > this.firstTime && (a = !0), this.endTime < this.lastTime && (a = !0));
            0 < this.start && (a = !0);
            this.end < this.chartData.length - 1 && (a = !0);
            if (b = this.valueAxes) b = b[0], isNaN(b.relativeStart) || (0 !== f.roundTo(b.relativeStart, 3) && (a = !0), 1 != f.roundTo(b.relativeEnd, 3) && (a = !0));
            f.AmSerialChart.base.showZB.call(this, a)
        },
        updateAfterValueZoom: function() {
            f.AmSerialChart.base.updateAfterValueZoom.call(this);
            this.updateColumnsDepth()
        },
        indexZoom: function(a, b) {
            var c = this.maxSelectedSeries,
                d = !1;
            isNaN(c) || (b != this.end && b - a > c && (a = b - c, d = !0), a != this.start && b - a > c && (b = a + c, d = !0));
            if (d && (d = this.chartScrollbar) && d.dragger) {
                var g = d.dragger.getBBox();
                d.maxWidth = g.width;
                d.maxHeight = g.height
            }
            if (a != this.start || b != this.end) d = this.chartData.length - 1, isNaN(a) && (a = 0, isNaN(c) || (a = d - c)), isNaN(b) && (b = d), b < a && (b = a), b > d && (b = d), a > d && (a = d - 1), 0 > a && (a = 0), this.start = a, this.end = b, this.categoryAxis.zoom(a, b), this.zoomAxesAndGraphs(),
                this.zoomScrollbar(), this.fixCursor(), 0 !== a || b != this.chartData.length - 1 ? this.showZB(!0) : this.showZB(!1), this.syncGrid(), this.updateColumnsDepth(), this.dispatchIndexZoomEvent()
        },
        updateGraphs: function() {
            f.AmSerialChart.base.updateGraphs.call(this);
            var a = this.graphs,
                b;
            for (b = 0; b < a.length; b++) {
                var c = a[b];
                c.columnWidthReal = this.columnWidth;
                c.categoryAxis = this.categoryAxis;
                f.isString(c.fillToGraph) && (c.fillToGraph = this.graphsById[c.fillToGraph])
            }
        },
        zoomAxesAndGraphs: function() {
            f.AmSerialChart.base.zoomAxesAndGraphs.call(this);
            this.updateColumnsDepth()
        },
        updateColumnsDepth: function() {
            if (0 !== this.depth3D || 0 !== this.angle) {
                var a, b = this.graphs,
                    c;
                this.columnsArray = [];
                for (a = 0; a < b.length; a++) {
                    c = b[a];
                    var d = c.columnsArray;
                    if (d) {
                        var g;
                        for (g = 0; g < d.length; g++) this.columnsArray.push(d[g])
                    }
                }
                this.columnsArray.sort(this.compareDepth);
                b = this.columnsSet;
                if (0 < this.columnsArray.length) {
                    d = this.container.set();
                    this.columnSet.push(d);
                    for (a = 0; a < this.columnsArray.length; a++) d.push(this.columnsArray[a].column.set);
                    c && d.translate(c.x, c.y);
                    this.columnsSet =
                        d
                }
                f.remove(b)
            }
        },
        compareDepth: function(a, b) {
            return a.depth > b.depth ? 1 : -1
        },
        zoomScrollbar: function() {
            var a = this.chartScrollbar,
                b = this.categoryAxis;
            if (a) {
                if (!this.zoomedByScrollbar) {
                    var c = a.dragger;
                    c && c.stop()
                }
                this.zoomedByScrollbar = !1;
                b.parseDates && !b.equalSpacing ? a.timeZoom(this.startTime, this.endTime) : a.zoom(this.start, this.end)
            }
            this.zoomValueScrollbar(this.valueScrollbar)
        },
        updateTrendLines: function() {
            var a = this.trendLines,
                b;
            for (b = 0; b < a.length; b++) {
                var c = a[b],
                    c = f.processObject(c, f.TrendLine, this.theme);
                a[b] = c;
                c.chart = this;
                c.id || (c.id = "trendLineAuto" + b + "_" + (new Date).getTime());
                f.isString(c.valueAxis) && (c.valueAxis = this.getValueAxisById(c.valueAxis));
                c.valueAxis || (c.valueAxis = this.valueAxes[0]);
                c.categoryAxis = this.categoryAxis
            }
        },
        countColumns: function() {
            var a = 0,
                b = this.valueAxes.length,
                c = this.graphs.length,
                d, g, f = !1,
                e, l;
            for (l = 0; l < b; l++) {
                g = this.valueAxes[l];
                var k = g.stackType,
                    m = 0;
                if ("100%" == k || "regular" == k)
                    for (f = !1, e = 0; e < c; e++) d = this.graphs[e], d.tcc = 1, d.valueAxis == g && "column" == d.type && (!f && d.stackable &&
                        (a++, f = !0), (!d.stackable && d.clustered || d.newStack && 0 !== m) && a++, d.columnIndex = a - 1, d.clustered || (d.columnIndex = 0), m++);
                if ("none" == k || "3d" == k) {
                    f = !1;
                    for (e = 0; e < c; e++) d = this.graphs[e], d.valueAxis == g && "column" == d.type && (d.clustered ? (d.tcc = 1, d.newStack && (a = 0), d.hidden || (d.columnIndex = a, a++)) : d.hidden || (f = !0, d.tcc = 1, d.columnIndex = 0));
                    f && 0 === a && (a = 1)
                }
                if ("3d" == k) {
                    g = 1;
                    for (l = 0; l < c; l++) d = this.graphs[l], d.newStack && g++, d.depthCount = g, d.tcc = a;
                    a = g
                }
            }
            return a
        },
        parseData: function() {
            f.AmSerialChart.base.parseData.call(this);
            this.parseSerialData(this.dataProvider)
        },
        getCategoryIndexByValue: function(a) {
            var b = this.chartData,
                c;
            for (c = 0; c < b.length; c++)
                if (b[c].category == a) return c
        },
        handleScrollbarZoom: function(a) {
            this.zoomedByScrollbar = !0;
            this.zoom(a.start, a.end)
        },
        dispatchTimeZoomEvent: function() {
            if (this.drawGraphs && (this.prevStartTime != this.startTime || this.prevEndTime != this.endTime)) {
                var a = {
                    type: "zoomed"
                };
                a.startDate = new Date(this.startTime);
                a.endDate = new Date(this.endTime);
                a.startIndex = this.start;
                a.endIndex = this.end;
                this.startIndex =
                    this.start;
                this.endIndex = this.end;
                this.startDate = a.startDate;
                this.endDate = a.endDate;
                this.prevStartTime = this.startTime;
                this.prevEndTime = this.endTime;
                var b = this.categoryAxis,
                    c = f.extractPeriod(b.minPeriod).period,
                    b = b.dateFormatsObject[c];
                a.startValue = f.formatDate(a.startDate, b, this);
                a.endValue = f.formatDate(a.endDate, b, this);
                a.chart = this;
                a.target = this;
                this.fire(a)
            }
        },
        dispatchIndexZoomEvent: function() {
            if (this.drawGraphs && (this.prevStartIndex != this.start || this.prevEndIndex != this.end)) {
                this.startIndex = this.start;
                this.endIndex = this.end;
                var a = this.chartData;
                if (f.ifArray(a) && !isNaN(this.start) && !isNaN(this.end)) {
                    var b = {
                        chart: this,
                        target: this,
                        type: "zoomed"
                    };
                    b.startIndex = this.start;
                    b.endIndex = this.end;
                    b.startValue = a[this.start].category;
                    b.endValue = a[this.end].category;
                    this.categoryAxis.parseDates && (this.startTime = a[this.start].time, this.endTime = a[this.end].time, b.startDate = new Date(this.startTime), b.endDate = new Date(this.endTime));
                    this.prevStartIndex = this.start;
                    this.prevEndIndex = this.end;
                    this.fire(b)
                }
            }
        },
        updateLegendValues: function() {
            this.legend &&
                this.legend.updateValues()
        },
        getClosestIndex: function(a, b, c, d, g, f) {
            0 > g && (g = 0);
            f > a.length - 1 && (f = a.length - 1);
            var e = g + Math.round((f - g) / 2),
                l = a[e][b];
            return c == l ? e : 1 >= f - g ? d ? g : Math.abs(a[g][b] - c) < Math.abs(a[f][b] - c) ? g : f : c == l ? e : c < l ? this.getClosestIndex(a, b, c, d, g, e) : this.getClosestIndex(a, b, c, d, e, f)
        },
        zoomToIndexes: function(a, b) {
            var c = this.chartData;
            if (c) {
                var d = c.length;
                0 < d && (0 > a && (a = 0), b > d - 1 && (b = d - 1), d = this.categoryAxis, d.parseDates && !d.equalSpacing ? this.zoom(c[a].time, this.getEndTime(c[b].time)) : this.zoom(a,
                    b))
            }
        },
        zoomToDates: function(a, b) {
            var c = this.chartData;
            if (c)
                if (this.categoryAxis.equalSpacing) {
                    var d = this.getClosestIndex(c, "time", a.getTime(), !0, 0, c.length);
                    b = f.resetDateToMin(b, this.categoryAxis.minPeriod, 1);
                    c = this.getClosestIndex(c, "time", b.getTime(), !1, 0, c.length);
                    this.zoom(d, c)
                } else this.zoom(a.getTime(), b.getTime())
        },
        zoomToCategoryValues: function(a, b) {
            this.chartData && this.zoom(this.getCategoryIndexByValue(a), this.getCategoryIndexByValue(b))
        },
        formatPeriodString: function(a, b) {
            if (b) {
                b.periodDataItem = {};
                b.periodPercentDataItem = {};
                var c = ["value", "open", "low", "high", "close"],
                    d = "value open low high close average sum count".split(" "),
                    g = b.valueAxis,
                    h = this.chartData,
                    e = b.numberFormatter;
                e || (e = this.nf);
                for (var l = 0; l < c.length; l++) {
                    for (var k = c[l], m = 0, p = 0, n = 0, u = 0, v, x, E, t, r, B, q, w, y, C, F = this.start; F <= this.end; F++) {
                        var D = h[F];
                        if (D) {
                            var A = D.axes[g.id].graphs[b.id];
                            if (A) {
                                if (A.values) {
                                    var z = A.values[k],
                                        D = D.x.categoryAxis;
                                    if (this.rotate) {
                                        if (0 > D || D > A.graph.height) z = NaN
                                    } else if (0 > D || D > A.graph.width) z = NaN;
                                    if (!isNaN(z)) {
                                        isNaN(v) &&
                                            (v = z);
                                        x = z;
                                        if (isNaN(E) || E > z) E = z;
                                        if (isNaN(t) || t < z) t = z;
                                        r = f.getDecimals(m);
                                        D = f.getDecimals(z);
                                        m += z;
                                        m = f.roundTo(m, Math.max(r, D));
                                        p++;
                                        r = m / p
                                    }
                                }
                                if (A.percents && (A = A.percents[k], !isNaN(A))) {
                                    isNaN(B) && (B = A);
                                    q = A;
                                    if (isNaN(w) || w > A) w = A;
                                    if (isNaN(y) || y < A) y = A;
                                    C = f.getDecimals(n);
                                    z = f.getDecimals(A);
                                    n += A;
                                    n = f.roundTo(n, Math.max(C, z));
                                    u++;
                                    C = n / u
                                }
                            }
                        }
                    }
                    m = {
                        open: v,
                        close: x,
                        high: t,
                        low: E,
                        average: r,
                        sum: m,
                        count: p
                    };
                    n = {
                        open: B,
                        close: q,
                        high: y,
                        low: w,
                        average: C,
                        sum: n,
                        count: u
                    };
                    a = f.formatValue(a, m, d, e, k + "\\.", this.usePrefixes, this.prefixesOfSmallNumbers,
                        this.prefixesOfBigNumbers);
                    a = f.formatValue(a, n, d, this.pf, "percents\\." + k + "\\.");
                    b.periodDataItem[k] = m;
                    b.periodPercentDataItem[k] = n
                }
            }
            return a = f.cleanFromEmpty(a)
        },
        formatString: function(a, b, c) {
            if (b) {
                var d = b.graph;
                if (void 0 !== a) {
                    if (-1 != a.indexOf("[[category]]")) {
                        var g = b.serialDataItem.category;
                        if (this.categoryAxis.parseDates) {
                            var h = this.balloonDateFormat,
                                e = this.chartCursor;
                            e && e.categoryBalloonDateFormat && (h = e.categoryBalloonDateFormat);
                            h = f.formatDate(g, h, this); - 1 != h.indexOf("fff") && (h = f.formatMilliseconds(h,
                                g));
                            g = h
                        }
                        a = a.replace(/\[\[category\]\]/g, String(g.replace("$", "$$$")))
                    }
                    g = d.numberFormatter;
                    g || (g = this.nf);
                    h = b.graph.valueAxis;
                    (e = h.duration) && !isNaN(b.values.value) && (e = f.formatDuration(b.values.value, e, "", h.durationUnits, h.maxInterval, g), a = a.replace(RegExp("\\[\\[value\\]\\]", "g"), e));
                    "date" == h.type && (h = f.formatDate(new Date(b.values.value), d.dateFormat, this), e = RegExp("\\[\\[value\\]\\]", "g"), a = a.replace(e, h), h = f.formatDate(new Date(b.values.open), d.dateFormat, this), e = RegExp("\\[\\[open\\]\\]", "g"),
                        a = a.replace(e, h));
                    d = "value open low high close total".split(" ");
                    h = this.pf;
                    a = f.formatValue(a, b.percents, d, h, "percents\\.");
                    a = f.formatValue(a, b.values, d, g, "", this.usePrefixes, this.prefixesOfSmallNumbers, this.prefixesOfBigNumbers);
                    a = f.formatValue(a, b.values, ["percents"], h); - 1 != a.indexOf("[[") && (a = f.formatDataContextValue(a, b.dataContext)); - 1 != a.indexOf("[[") && b.graph.customData && (a = f.formatDataContextValue(a, b.graph.customData));
                    a = f.AmSerialChart.base.formatString.call(this, a, b, c)
                }
                return a
            }
        },
        updateChartCursor: function() {
            f.AmSerialChart.base.updateChartCursor.call(this);
            var a = this.chartCursor,
                b = this.categoryAxis;
            if (a) {
                var c = a.categoryBalloonAlpha,
                    d = a.categoryBalloonColor,
                    g = a.color;
                void 0 === d && (d = a.cursorColor);
                var h = a.valueZoomable,
                    e = a.zoomable,
                    l = a.valueLineEnabled;
                this.rotate ? (a.vLineEnabled = l, a.hZoomEnabled = h, a.vZoomEnabled = e) : (a.hLineEnabled = l, a.vZoomEnabled = h, a.hZoomEnabled = e);
                if (a.valueLineBalloonEnabled)
                    for (l = 0; l < this.valueAxes.length; l++) h = this.valueAxes[l], (e = h.balloon) || (e = {}), e = f.extend(e, this.balloon, !0), e.fillColor = d, e.balloonColor = d, e.fillAlpha = c, e.borderColor =
                        d, e.color = g, h.balloon = e;
                else
                    for (e = 0; e < this.valueAxes.length; e++) h = this.valueAxes[e], h.balloon && (h.balloon = null);
                b && (b.balloonTextFunction = a.categoryBalloonFunction, a.categoryLineAxis = b, b.balloonText = a.categoryBalloonText, a.categoryBalloonEnabled && ((e = b.balloon) || (e = {}), e = f.extend(e, this.balloon, !0), e.fillColor = d, e.balloonColor = d, e.fillAlpha = c, e.borderColor = d, e.color = g, b.balloon = e), b.balloon && (b.balloon.enabled = a.categoryBalloonEnabled))
            }
        },
        addChartScrollbar: function(a) {
            f.callMethod("destroy", [this.chartScrollbar]);
            a && (a.chart = this, this.listenTo(a, "zoomed", this.handleScrollbarZoom));
            this.rotate ? void 0 === a.width && (a.width = a.scrollbarHeight) : void 0 === a.height && (a.height = a.scrollbarHeight);
            a.gridAxis = this.categoryAxis;
            this.chartScrollbar = a
        },
        addValueScrollbar: function(a) {
            f.callMethod("destroy", [this.valueScrollbar]);
            a && (a.chart = this, this.listenTo(a, "zoomed", this.handleScrollbarValueZoom), this.listenTo(a, "zoomStarted", this.handleCursorZoomStarted));
            var b = a.scrollbarHeight;
            this.rotate ? void 0 === a.height && (a.height =
                b) : void 0 === a.width && (a.width = b);
            a.gridAxis || (a.gridAxis = this.valueAxes[0]);
            a.valueAxes = this.valueAxes;
            this.valueScrollbar = a
        },
        removeChartScrollbar: function() {
            f.callMethod("destroy", [this.chartScrollbar]);
            this.chartScrollbar = null
        },
        removeValueScrollbar: function() {
            f.callMethod("destroy", [this.valueScrollbar]);
            this.valueScrollbar = null
        },
        handleReleaseOutside: function(a) {
            f.AmSerialChart.base.handleReleaseOutside.call(this, a);
            f.callMethod("handleReleaseOutside", [this.chartScrollbar, this.valueScrollbar])
        },
        update: function() {
            f.AmSerialChart.base.update.call(this);
            this.chartScrollbar && this.chartScrollbar.update && this.chartScrollbar.update();
            this.valueScrollbar && this.valueScrollbar.update && this.valueScrollbar.update()
        },
        processScrollbars: function() {
            f.AmSerialChart.base.processScrollbars.call(this);
            var a = this.valueScrollbar;
            a && (a = f.processObject(a, f.ChartScrollbar, this.theme), a.id = "valueScrollbar", this.addValueScrollbar(a))
        },
        handleValueAxisZoom: function(a) {
            this.handleValueAxisZoomReal(a, this.valueAxes)
        },
        zoomOut: function() {
            f.AmSerialChart.base.zoomOut.call(this);
            this.zoom();
            this.syncGrid()
        },
        getNextItem: function(a) {
            var b = a.index,
                c = this.chartData,
                d = a.graph;
            if (b + 1 < c.length)
                for (b += 1; b < c.length; b++)
                    if (a = c[b])
                        if (a = a.axes[d.valueAxis.id].graphs[d.id], !isNaN(a.y)) return a
        },
        handleCursorZoomReal: function(a, b, c, d, g) {
            var f = g.target,
                e, l;
            this.rotate ? (isNaN(a) || isNaN(b) || this.relativeZoomValueAxes(this.valueAxes, a, b) && this.updateAfterValueZoom(), f.vZoomEnabled && (e = g.start, l = g.end)) : (isNaN(c) || isNaN(d) || this.relativeZoomValueAxes(this.valueAxes,
                c, d) && this.updateAfterValueZoom(), f.hZoomEnabled && (e = g.start, l = g.end));
            isNaN(e) || isNaN(l) || (a = this.categoryAxis, a.parseDates && !a.equalSpacing ? this.zoomToDates(new Date(e), new Date(l)) : this.zoomToIndexes(e, l))
        },
        handleCursorZoomStarted: function() {
            var a = this.valueAxes;
            if (a) {
                var a = a[0],
                    b = a.relativeStart,
                    c = a.relativeEnd;
                a.reversed && (b = 1 - a.relativeEnd, c = 1 - a.relativeStart);
                this.rotate ? (this.startX0 = b, this.endX0 = c) : (this.startY0 = b, this.endY0 = c)
            }
            this.categoryAxis && (this.start0 = this.start, this.end0 = this.end,
                this.startTime0 = this.startTime, this.endTime0 = this.endTime)
        },
        fixCursor: function() {
            this.chartCursor && this.chartCursor.fixPosition();
            this.prevCursorItem = null
        },
        handleCursorMove: function(a) {
            f.AmSerialChart.base.handleCursorMove.call(this, a);
            var b = a.target,
                c = this.categoryAxis;
            if (a.panning) this.handleCursorHide(a);
            else if (this.chartData && !b.isHidden) {
                var d = this.graphs;
                if (d) {
                    var g;
                    g = c.xToIndex(this.rotate ? a.y : a.x);
                    if (g = this.chartData[g]) {
                        var h, e, l, k;
                        if (b.oneBalloonOnly && b.valueBalloonsEnabled) {
                            var m = Infinity;
                            for (h = d.length - 1; 0 <= h; h--)
                                if (e = d[h], e.balloon.enabled && e.showBalloon && !e.hidden) {
                                    l = e.valueAxis.id;
                                    l = g.axes[l].graphs[e.id];
                                    if (b.showNextAvailable && isNaN(l.y) && (l = this.getNextItem(l), !l)) continue;
                                    l = l.y;
                                    "top" == e.showBalloonAt && (l = 0);
                                    "bottom" == e.showBalloonAt && (l = this.height);
                                    var p = b.mouseX,
                                        n = b.mouseY;
                                    l = this.rotate ? Math.abs(p - l) : Math.abs(n - l);
                                    l < m && (m = l, k = e)
                                }
                            b.mostCloseGraph = k
                        }
                        if (this.prevCursorItem != g || k != this.prevMostCloseGraph) {
                            m = [];
                            for (h = 0; h < d.length; h++) {
                                e = d[h];
                                l = e.valueAxis.id;
                                l = g.axes[l].graphs[e.id];
                                if (b.showNextAvailable && isNaN(l.y) && (l = this.getNextItem(l), !l && e.balloon)) {
                                    e.balloon.hide();
                                    continue
                                }
                                k && e != k ? (e.showGraphBalloon(l, b.pointer, !1, b.graphBulletSize, b.graphBulletAlpha), e.balloon.hide(0)) : b.valueBalloonsEnabled ? (e.balloon.showBullet = b.bulletsEnabled, e.balloon.bulletSize = b.bulletSize / 2, a.hideBalloons || (e.showGraphBalloon(l, b.pointer, !1, b.graphBulletSize, b.graphBulletAlpha), e.balloon.set && m.push({
                                    balloon: e.balloon,
                                    y: e.balloon.pointToY
                                }))) : (e.currentDataItem = l, e.resizeBullet(l, b.graphBulletSize,
                                    b.graphBulletAlpha))
                            }
                            b.avoidBalloonOverlapping && this.arrangeBalloons(m);
                            this.prevCursorItem = g
                        }
                        this.prevMostCloseGraph = k
                    }
                }
                c.showBalloon(a.x, a.y, b.categoryBalloonDateFormat, a.skip);
                this.updateLegendValues()
            }
        },
        handleCursorHide: function(a) {
            f.AmSerialChart.base.handleCursorHide.call(this, a);
            a = this.categoryAxis;
            this.prevCursorItem = null;
            this.updateLegendValues();
            a && a.hideBalloon();
            a = this.graphs;
            var b;
            for (b = 0; b < a.length; b++) a[b].currentDataItem = null
        },
        handleCursorPanning: function(a) {
            var b = a.target,
                c, d = a.deltaX,
                g = a.deltaY,
                h = a.delta2X,
                e = a.delta2Y;
            a = !1;
            if (this.rotate) {
                isNaN(h) && (h = d, a = !0);
                var l = this.endX0;
                c = this.startX0;
                var k = l - c,
                    l = l - k * h,
                    m = k;
                a || (m = 0);
                a = f.fitToBounds(c - k * d, 0, 1 - m)
            } else isNaN(e) && (e = g, a = !0), l = this.endY0, c = this.startY0, k = l - c, l += k * g, m = k, a || (m = 0), a = f.fitToBounds(c + k * e, 0, 1 - m);
            c = f.fitToBounds(l, m, 1);
            var p;
            b.valueZoomable && (p = this.relativeZoomValueAxes(this.valueAxes, a, c));
            var n;
            c = this.categoryAxis;
            this.rotate && (d = g, h = e);
            a = !1;
            isNaN(h) && (h = d, a = !0);
            if (b.zoomable && (0 < Math.abs(d) || 0 < Math.abs(h)))
                if (c.parseDates &&
                    !c.equalSpacing) {
                    if (e = this.startTime0, g = this.endTime0, c = g - e, h *= c, k = this.firstTime, l = this.lastTime, m = c, a || (m = 0), a = Math.round(f.fitToBounds(e - c * d, k, l - m)), h = Math.round(f.fitToBounds(g - h, k + m, l)), this.startTime != a || this.endTime != h) n = {
                        chart: this,
                        target: b,
                        type: "zoomed",
                        start: a,
                        end: h
                    }, this.skipZoomed = !0, b.fire(n), this.zoom(a, h), n = !0
                } else if (e = this.start0, g = this.end0, c = g - e, d = Math.round(c * d), h = Math.round(c * h), k = this.chartData.length - 1, a || (c = 0), a = f.fitToBounds(e - d, 0, k - c), c = f.fitToBounds(g - h, c, k), this.start !=
                a || this.end != c) this.skipZoomed = !0, b.fire({
                chart: this,
                target: b,
                type: "zoomed",
                start: a,
                end: c
            }), this.zoom(a, c), n = !0;
            !n && p && this.updateAfterValueZoom()
        },
        arrangeBalloons: function(a) {
            var b = this.plotAreaHeight;
            a.sort(this.compareY);
            var c, d, f, h = this.plotAreaWidth,
                e = a.length;
            for (c = 0; c < e; c++) d = a[c].balloon, d.setBounds(0, 0, h, b), d.restorePrevious(), d.draw(), b = d.yPos - 3;
            a.reverse();
            for (c = 0; c < e; c++) {
                d = a[c].balloon;
                var b = d.bottom,
                    l = d.bottom - d.yPos;
                0 < c && b - l < f + 3 && (d.setBounds(0, f + 3, h, f + l + 3), d.restorePrevious(), d.draw());
                d.set && d.set.show();
                f = d.bottom
            }
        },
        compareY: function(a, b) {
            return a.y < b.y ? 1 : -1
        }
    })
})();
(function() {
    var f = window.AmCharts;
    f.Cuboid = f.Class({
        construct: function(a, b, c, d, f, h, e, l, k, m, p, n, u, v, x, E, t) {
            this.set = a.set();
            this.container = a;
            this.h = Math.round(c);
            this.w = Math.round(b);
            this.dx = d;
            this.dy = f;
            this.colors = h;
            this.alpha = e;
            this.bwidth = l;
            this.bcolor = k;
            this.balpha = m;
            this.dashLength = v;
            this.topRadius = E;
            this.pattern = x;
            this.rotate = u;
            this.bcn = t;
            u ? 0 > b && 0 === p && (p = 180) : 0 > c && 270 == p && (p = 90);
            this.gradientRotation = p;
            0 === d && 0 === f && (this.cornerRadius = n);
            this.draw()
        },
        draw: function() {
            var a = this.set;
            a.clear();
            var b = this.container,
                c = b.chart,
                d = this.w,
                g = this.h,
                h = this.dx,
                e = this.dy,
                l = this.colors,
                k = this.alpha,
                m = this.bwidth,
                p = this.bcolor,
                n = this.balpha,
                u = this.gradientRotation,
                v = this.cornerRadius,
                x = this.dashLength,
                E = this.pattern,
                t = this.topRadius,
                r = this.bcn,
                B = l,
                q = l;
            "object" == typeof l && (B = l[0], q = l[l.length - 1]);
            var w, y, C, F, D, A, z, L, M, Q = k;
            E && (k = 0);
            var G, H, I, J, K = this.rotate;
            if (0 < Math.abs(h) || 0 < Math.abs(e))
                if (isNaN(t)) z = q, q = f.adjustLuminosity(B, -.2), q = f.adjustLuminosity(B, -.2), w = f.polygon(b, [0, h, d + h, d, 0], [0, e, e, 0, 0],
                    q, k, 1, p, 0, u), 0 < n && (M = f.line(b, [0, h, d + h], [0, e, e], p, n, m, x)), y = f.polygon(b, [0, 0, d, d, 0], [0, g, g, 0, 0], q, k, 1, p, 0, u), y.translate(h, e), 0 < n && (C = f.line(b, [h, h], [e, e + g], p, n, m, x)), F = f.polygon(b, [0, 0, h, h, 0], [0, g, g + e, e, 0], q, k, 1, p, 0, u), D = f.polygon(b, [d, d, d + h, d + h, d], [0, g, g + e, e, 0], q, k, 1, p, 0, u), 0 < n && (A = f.line(b, [d, d + h, d + h, d], [0, e, g + e, g], p, n, m, x)), q = f.adjustLuminosity(z, .2), z = f.polygon(b, [0, h, d + h, d, 0], [g, g + e, g + e, g, g], q, k, 1, p, 0, u), 0 < n && (L = f.line(b, [0, h, d + h], [g, g + e, g + e], p, n, m, x));
                else {
                    var N, O, P;
                    K ? (N = g / 2, q = h / 2, P = g / 2, O =
                        d + h / 2, H = Math.abs(g / 2), G = Math.abs(h / 2)) : (q = d / 2, N = e / 2, O = d / 2, P = g + e / 2 + 1, G = Math.abs(d / 2), H = Math.abs(e / 2));
                    I = G * t;
                    J = H * t;
                    .1 < G && .1 < G && (w = f.circle(b, G, B, k, m, p, n, !1, H), w.translate(q, N));
                    .1 < I && .1 < I && (z = f.circle(b, I, f.adjustLuminosity(B, .5), k, m, p, n, !1, J), z.translate(O, P))
                }
            k = Q;
            1 > Math.abs(g) && (g = 0);
            1 > Math.abs(d) && (d = 0);
            !isNaN(t) && (0 < Math.abs(h) || 0 < Math.abs(e)) ? (l = [B], l = {
                fill: l,
                stroke: p,
                "stroke-width": m,
                "stroke-opacity": n,
                "fill-opacity": k
            }, K ? (k = "M0,0 L" + d + "," + (g / 2 - g / 2 * t), m = " B", 0 < d && (m = " A"), f.VML ? (k += m + Math.round(d -
                I) + "," + Math.round(g / 2 - J) + "," + Math.round(d + I) + "," + Math.round(g / 2 + J) + "," + d + ",0," + d + "," + g, k = k + (" L0," + g) + (m + Math.round(-G) + "," + Math.round(g / 2 - H) + "," + Math.round(G) + "," + Math.round(g / 2 + H) + ",0," + g + ",0,0")) : (k += "A" + I + "," + J + ",0,0,0," + d + "," + (g - g / 2 * (1 - t)) + "L0," + g, k += "A" + G + "," + H + ",0,0,1,0,0"), G = 90) : (m = d / 2 - d / 2 * t, k = "M0,0 L" + m + "," + g, f.VML ? (k = "M0,0 L" + m + "," + g, m = " B", 0 > g && (m = " A"), k += m + Math.round(d / 2 - I) + "," + Math.round(g - J) + "," + Math.round(d / 2 + I) + "," + Math.round(g + J) + ",0," + g + "," + d + "," + g, k += " L" + d + ",0", k += m + Math.round(d /
                2 + G) + "," + Math.round(H) + "," + Math.round(d / 2 - G) + "," + Math.round(-H) + "," + d + ",0,0,0") : (k += "A" + I + "," + J + ",0,0,0," + (d - d / 2 * (1 - t)) + "," + g + "L" + d + ",0", k += "A" + G + "," + H + ",0,0,1,0,0"), G = 180), b = b.path(k).attr(l), b.gradient("linearGradient", [B, f.adjustLuminosity(B, -.3), f.adjustLuminosity(B, -.3), B], G), K ? b.translate(h / 2, 0) : b.translate(0, e / 2)) : b = 0 === g ? f.line(b, [0, d], [0, 0], p, n, m, x) : 0 === d ? f.line(b, [0, 0], [0, g], p, n, m, x) : 0 < v ? f.rect(b, d, g, l, k, m, p, n, v, u, x) : f.polygon(b, [0, 0, d, d, 0], [0, g, g, 0, 0], l, k, m, p, n, u, !1, x);
            d = isNaN(t) ? 0 > g ? [w,
                M, y, C, F, D, A, z, L, b
            ] : [z, L, y, C, F, D, w, M, A, b] : K ? 0 < d ? [w, b, z] : [z, b, w] : 0 > g ? [w, b, z] : [z, b, w];
            f.setCN(c, b, r + "front");
            f.setCN(c, y, r + "back");
            f.setCN(c, z, r + "top");
            f.setCN(c, w, r + "bottom");
            f.setCN(c, F, r + "left");
            f.setCN(c, D, r + "right");
            for (w = 0; w < d.length; w++)
                if (y = d[w]) a.push(y), f.setCN(c, y, r + "element");
            E && b.pattern(E, NaN, c.path)
        },
        width: function(a) {
            isNaN(a) && (a = 0);
            this.w = Math.round(a);
            this.draw()
        },
        height: function(a) {
            isNaN(a) && (a = 0);
            this.h = Math.round(a);
            this.draw()
        },
        animateHeight: function(a, b) {
            var c = this;
            c.animationFinished = !1;
            c.easing = b;
            c.totalFrames = a * f.updateRate;
            c.rh = c.h;
            c.frame = 0;
            c.height(1);
            setTimeout(function() {
                c.updateHeight.call(c)
            }, 1E3 / f.updateRate)
        },
        updateHeight: function() {
            var a = this;
            a.frame++;
            var b = a.totalFrames;
            a.frame <= b ? (b = a.easing(0, a.frame, 1, a.rh - 1, b), a.height(b), window.requestAnimationFrame ? window.requestAnimationFrame(function() {
                a.updateHeight.call(a)
            }) : setTimeout(function() {
                a.updateHeight.call(a)
            }, 1E3 / f.updateRate)) : (a.height(a.rh), a.animationFinished = !0)
        },
        animateWidth: function(a, b) {
            var c = this;
            c.animationFinished = !1;
            c.easing = b;
            c.totalFrames = a * f.updateRate;
            c.rw = c.w;
            c.frame = 0;
            c.width(1);
            setTimeout(function() {
                c.updateWidth.call(c)
            }, 1E3 / f.updateRate)
        },
        updateWidth: function() {
            var a = this;
            a.frame++;
            var b = a.totalFrames;
            a.frame <= b ? (b = a.easing(0, a.frame, 1, a.rw - 1, b), a.width(b), window.requestAnimationFrame ? window.requestAnimationFrame(function() {
                a.updateWidth.call(a)
            }) : setTimeout(function() {
                a.updateWidth.call(a)
            }, 1E3 / f.updateRate)) : (a.width(a.rw), a.animationFinished = !0)
        }
    })
})();
(function() {
    var f = window.AmCharts;
    f.CategoryAxis = f.Class({
        inherits: f.AxisBase,
        construct: function(a) {
            this.cname = "CategoryAxis";
            f.CategoryAxis.base.construct.call(this, a);
            this.minPeriod = "DD";
            this.equalSpacing = this.parseDates = !1;
            this.position = "bottom";
            this.startOnAxis = !1;
            this.gridPosition = "middle";
            this.safeDistance = 30;
            this.stickBalloonToCategory = !1;
            f.applyTheme(this, a, this.cname)
        },
        draw: function() {
            f.CategoryAxis.base.draw.call(this);
            this.generateDFObject();
            var a = this.chart.chartData;
            this.data = a;
            this.labelRotationR =
                this.labelRotation;
            this.type = null;
            if (f.ifArray(a)) {
                var b, c = this.chart;
                "scrollbar" != this.id ? (f.setCN(c, this.set, "category-axis"), f.setCN(c, this.labelsSet, "category-axis"), f.setCN(c, this.axisLine.axisSet, "category-axis")) : this.bcn = this.id + "-";
                var d = this.start,
                    g = this.labelFrequency,
                    h = 0,
                    e = this.end - d + 1,
                    l = this.gridCountR,
                    k = this.showFirstLabel,
                    m = this.showLastLabel,
                    p, n = "",
                    n = f.extractPeriod(this.minPeriod),
                    u = f.getPeriodDuration(n.period, n.count),
                    v, x, E, t, r, B = this.rotate,
                    q = this.firstDayOfWeek,
                    w = this.boldPeriodBeginning;
                b = f.resetDateToMin(new Date(a[a.length - 1].time + 1.05 * u), this.minPeriod, 1, q).getTime();
                this.firstTime = c.firstTime;
                this.endTime > b && (this.endTime = b);
                r = this.minorGridEnabled;
                x = this.gridAlpha;
                var y = 0,
                    C = 0;
                if (this.widthField)
                    for (b = this.start; b <= this.end; b++)
                        if (t = this.data[b]) {
                            var F = Number(this.data[b].dataContext[this.widthField]);
                            isNaN(F) || (y += F, t.widthValue = F)
                        }
                if (this.parseDates && !this.equalSpacing) this.lastTime = a[a.length - 1].time, this.maxTime = f.resetDateToMin(new Date(this.lastTime + 1.05 * u), this.minPeriod,
                    1, q).getTime(), this.timeDifference = this.endTime - this.startTime, this.parseDatesDraw();
                else if (!this.parseDates) {
                    if (this.cellWidth = this.getStepWidth(e), e < l && (l = e), h += this.start, this.stepWidth = this.getStepWidth(e), 0 < l)
                        for (q = Math.floor(e / l), t = this.chooseMinorFrequency(q), e = h, e / 2 == Math.round(e / 2) && e--, 0 > e && (e = 0), w = 0, this.widthField && (e = this.start), this.end - e + 1 >= this.autoRotateCount && (this.labelRotationR = this.autoRotateAngle), b = e; b <= this.end + 2; b++) {
                            l = !1;
                            0 <= b && b < this.data.length ? (v = this.data[b], n = v.category,
                                l = v.forceShow) : n = "";
                            if (r && !isNaN(t))
                                if (b / t == Math.round(b / t) || l) b / q == Math.round(b / q) || l || (this.gridAlpha = this.minorGridAlpha, n = void 0);
                                else continue;
                            else if (b / q != Math.round(b / q) && !l) continue;
                            e = this.getCoordinate(b - h);
                            l = 0;
                            "start" == this.gridPosition && (e -= this.cellWidth / 2, l = this.cellWidth / 2);
                            p = !0;
                            E = l;
                            "start" == this.tickPosition && (E = 0, p = !1, l = 0);
                            if (b == d && !k || b == this.end && !m) n = void 0;
                            Math.round(w / g) != w / g && (n = void 0);
                            w++;
                            a = this.cellWidth;
                            B && (a = NaN, this.ignoreAxisWidth || !c.autoMargins) && (a = "right" == this.position ?
                                c.marginRight : c.marginLeft, a -= this.tickLength + 10);
                            this.labelFunction && v && (n = this.labelFunction(n, v, this));
                            n = f.fixBrakes(n);
                            u = !1;
                            this.boldLabels && (u = !0);
                            b > this.end && "start" == this.tickPosition && (n = " ");
                            this.rotate && this.inside && (l -= 2);
                            isNaN(v.widthValue) || (v.percentWidthValue = v.widthValue / y * 100, a = this.rotate ? this.height * v.widthValue / y : this.width * v.widthValue / y, e = C, C += a, l = a / 2);
                            p = new this.axisItemRenderer(this, e, n, p, a, l, void 0, u, E, !1, v.labelColor, v.className);
                            p.serialDataItem = v;
                            this.pushAxisItem(p);
                            this.gridAlpha =
                                x
                        }
                } else if (this.parseDates && this.equalSpacing) {
                    h = this.start;
                    this.startTime = this.data[this.start].time;
                    this.endTime = this.data[this.end].time;
                    this.timeDifference = this.endTime - this.startTime;
                    b = this.choosePeriod(0);
                    g = b.period;
                    v = b.count;
                    b = f.getPeriodDuration(g, v);
                    b < u && (g = n.period, v = n.count, b = u);
                    x = g;
                    "WW" == x && (x = "DD");
                    this.currentDateFormat = this.dateFormatsObject[x];
                    this.stepWidth = this.getStepWidth(e);
                    l = Math.ceil(this.timeDifference / b) + 1;
                    n = f.resetDateToMin(new Date(this.startTime - b), g, v, q).getTime();
                    this.cellWidth =
                        this.getStepWidth(e);
                    e = Math.round(n / b);
                    d = -1;
                    e / 2 == Math.round(e / 2) && (d = -2, n -= b);
                    e = this.start;
                    e / 2 == Math.round(e / 2) && e--;
                    0 > e && (e = 0);
                    C = this.end + 2;
                    C >= this.data.length && (C = this.data.length);
                    a = !1;
                    a = !k;
                    this.previousPos = -1E3;
                    20 < this.labelRotationR && (this.safeDistance = 5);
                    F = e;
                    if (this.data[e].time != f.resetDateToMin(new Date(this.data[e].time), g, v, q).getTime()) {
                        var u = 0,
                            D = n;
                        for (b = e; b < C; b++) t = this.data[b].time, this.checkPeriodChange(g, v, t, D) && (u++, 2 <= u && (F = b, b = C), D = t)
                    }
                    r && 1 < v && (t = this.chooseMinorFrequency(v), f.getPeriodDuration(g,
                        t));
                    if (0 < this.gridCountR)
                        for (b = e; b < C; b++)
                            if (t = this.data[b].time, this.checkPeriodChange(g, v, t, n) && b >= F) {
                                e = this.getCoordinate(b - this.start);
                                r = !1;
                                this.nextPeriod[x] && (r = this.checkPeriodChange(this.nextPeriod[x], 1, t, n, x)) && f.resetDateToMin(new Date(t), this.nextPeriod[x], 1, q).getTime() != t && (r = !1);
                                u = !1;
                                r && this.markPeriodChange ? (r = this.dateFormatsObject[this.nextPeriod[x]], u = !0) : r = this.dateFormatsObject[x];
                                n = f.formatDate(new Date(t), r, c);
                                if (b == d && !k || b == l && !m) n = " ";
                                a ? a = !1 : (w || (u = !1), e - this.previousPos > this.safeDistance *
                                    Math.cos(this.labelRotationR * Math.PI / 180) && (this.labelFunction && (n = this.labelFunction(n, new Date(t), this, g, v, E)), this.boldLabels && (u = !0), p = new this.axisItemRenderer(this, e, n, void 0, void 0, void 0, void 0, u), r = p.graphics(), this.pushAxisItem(p), r = r.getBBox().width, f.isModern || (r -= e), this.previousPos = e + r));
                                E = n = t
                            }
                }
                for (b = k = 0; b < this.data.length; b++)
                    if (t = this.data[b]) this.parseDates && !this.equalSpacing ? (m = t.time, d = this.cellWidth, "MM" == this.minPeriod && (d = 864E5 * f.daysInMonth(new Date(m)) * this.stepWidth, t.cellWidth =
                        d), m = Math.round((m - this.startTime) * this.stepWidth + d / 2)) : m = this.getCoordinate(b - h), t.x[this.id] = m;
                if (this.widthField)
                    for (b = this.start; b <= this.end; b++) t = this.data[b], d = t.widthValue, t.percentWidthValue = d / y * 100, this.rotate ? (m = this.height * d / y / 2 + k, k = this.height * d / y + k) : (m = this.width * d / y / 2 + k, k = this.width * d / y + k), t.x[this.id] = m;
                y = this.guides.length;
                for (b = 0; b < y; b++)
                    if (k = this.guides[b], q = q = q = r = d = NaN, m = k.above, k.toCategory && (q = c.getCategoryIndexByValue(k.toCategory), isNaN(q) || (d = this.getCoordinate(q - h), k.expand &&
                            (d += this.cellWidth / 2), p = new this.axisItemRenderer(this, d, "", !0, NaN, NaN, k), this.pushAxisItem(p, m))), k.category && (q = c.getCategoryIndexByValue(k.category), isNaN(q) || (r = this.getCoordinate(q - h), k.expand && (r -= this.cellWidth / 2), q = (d - r) / 2, p = new this.axisItemRenderer(this, r, k.label, !0, NaN, q, k), this.pushAxisItem(p, m))), w = c.dataDateFormat, k.toDate && (!w || k.toDate instanceof Date || (k.toDate = k.toDate.toString() + " |"), k.toDate = f.getDate(k.toDate, w), this.equalSpacing ? (q = c.getClosestIndex(this.data, "time", k.toDate.getTime(), !1, 0, this.data.length - 1), isNaN(q) || (d = this.getCoordinate(q - h))) : d = (k.toDate.getTime() - this.startTime) * this.stepWidth, p = new this.axisItemRenderer(this, d, "", !0, NaN, NaN, k), this.pushAxisItem(p, m)), k.date && (!w || k.date instanceof Date || (k.date = k.date.toString() + " |"), k.date = f.getDate(k.date, w), this.equalSpacing ? (q = c.getClosestIndex(this.data, "time", k.date.getTime(), !1, 0, this.data.length - 1), isNaN(q) || (r = this.getCoordinate(q - h))) : r = (k.date.getTime() - this.startTime) * this.stepWidth, q = (d - r) / 2, p = !0, k.toDate &&
                            (p = !1), p = "H" == this.orientation ? new this.axisItemRenderer(this, r, k.label, p, 2 * q, NaN, k) : new this.axisItemRenderer(this, r, k.label, !1, NaN, q, k), this.pushAxisItem(p, m)), k.balloonText && p && (q = p.label) && this.addEventListeners(q, k), 0 < d || 0 < r) {
                        q = !1;
                        if (this.rotate) {
                            if (d < this.height || r < this.height) q = !0
                        } else if (d < this.width || r < this.width) q = !0;
                        q && (d = new this.guideFillRenderer(this, r, d, k), r = d.graphics(), this.pushAxisItem(d, m), k.graphics = r, r.index = b, k.balloonText && this.addEventListeners(r, k))
                    }
                if (c = c.chartCursor) B ? c.fixHeight(this.cellWidth) :
                    (c.fixWidth(this.cellWidth), c.fullWidth && this.balloon && (this.balloon.minWidth = this.cellWidth));
                this.previousHeight = A
            }
            this.axisCreated = !0;
            this.set.translate(this.x, this.y);
            this.labelsSet.translate(this.x, this.y);
            this.labelsSet.show();
            this.positionTitle();
            (B = this.axisLine.set) && B.toFront();
            var A = this.getBBox().height;
            2 < A - this.previousHeight && this.autoWrap && !this.parseDates && (this.axisCreated = this.chart.marginsUpdated = !1)
        },
        xToIndex: function(a) {
            var b = this.data,
                c = this.chart,
                d = c.rotate,
                g = this.stepWidth,
                h;
            if (this.parseDates && !this.equalSpacing) a = this.startTime + Math.round(a / g) - this.minDuration() / 2, h = c.getClosestIndex(b, "time", a, !1, this.start, this.end + 1);
            else if (this.widthField)
                for (c = Infinity, g = this.start; g <= this.end; g++) {
                    var e = this.data[g];
                    e && (e = Math.abs(e.x[this.id] - a), e < c && (c = e, h = g))
                } else this.startOnAxis || (a -= g / 2), h = this.start + Math.round(a / g);
            h = f.fitToBounds(h, 0, b.length - 1);
            var l;
            b[h] && (l = b[h].x[this.id]);
            d ? l > this.height + 1 && h-- : l > this.width + 1 && h--;
            0 > l && h++;
            return h = f.fitToBounds(h, 0, b.length - 1)
        },
        dateToCoordinate: function(a) {
            return this.parseDates && !this.equalSpacing ? (a.getTime() - this.startTime) * this.stepWidth : this.parseDates && this.equalSpacing ? (a = this.chart.getClosestIndex(this.data, "time", a.getTime(), !1, 0, this.data.length - 1), this.getCoordinate(a - this.start)) : NaN
        },
        categoryToCoordinate: function(a) {
            if (this.chart) {
                if (this.parseDates) return this.dateToCoordinate(new Date(a));
                a = this.chart.getCategoryIndexByValue(a);
                if (!isNaN(a)) return this.getCoordinate(a - this.start)
            } else return NaN
        },
        coordinateToDate: function(a) {
            return this.equalSpacing ?
                (a = this.xToIndex(a), new Date(this.data[a].time)) : new Date(this.startTime + a / this.stepWidth)
        },
        coordinateToValue: function(a) {
            a = this.xToIndex(a);
            if (a = this.data[a]) return this.parseDates ? a.time : a.category
        },
        getCoordinate: function(a) {
            a *= this.stepWidth;
            this.startOnAxis || (a += this.stepWidth / 2);
            return Math.round(a)
        },
        formatValue: function(a, b) {
            b || (b = this.currentDateFormat);
            this.parseDates && (a = f.formatDate(new Date(a), b, this.chart));
            return a
        },
        showBalloonAt: function(a, b) {
            void 0 === b && (b = this.parseDates ? this.dateToCoordinate(new Date(a)) :
                this.categoryToCoordinate(a));
            return this.adjustBalloonCoordinate(b)
        },
        formatBalloonText: function(a, b, c) {
            var d = "",
                g = "",
                h = this.chart,
                e = this.data[b];
            if (e)
                if (this.parseDates) d = f.formatDate(e.category, c, h), b = f.changeDate(new Date(e.category), this.minPeriod, 1), g = f.formatDate(b, c, h), -1 != d.indexOf("fff") && (d = f.formatMilliseconds(d, e.category), g = f.formatMilliseconds(g, b));
                else {
                    var l;
                    this.data[b + 1] && (l = this.data[b + 1]);
                    d = f.fixNewLines(e.category);
                    l && (g = f.fixNewLines(l.category))
                }
            a = a.replace(/\[\[category\]\]/g,
                String(d));
            return a = a.replace(/\[\[toCategory\]\]/g, String(g))
        },
        adjustBalloonCoordinate: function(a, b) {
            var c = this.xToIndex(a),
                d = this.chart.chartCursor;
            if (this.stickBalloonToCategory) {
                var f = this.data[c];
                f && (a = f.x[this.id]);
                this.stickBalloonToStart && (a -= this.cellWidth / 2);
                var h = 0;
                if (d) {
                    var e = d.limitToGraph;
                    if (e) {
                        var l = e.valueAxis.id;
                        e.hidden || (h = f.axes[l].graphs[e.id].y)
                    }
                    this.rotate ? ("left" == this.position ? (e && (h -= d.width), 0 < h && (h = 0)) : 0 > h && (h = 0), d.fixHLine(a, h)) : ("top" == this.position ? (e && (h -= d.height),
                        0 < h && (h = 0)) : 0 > h && (h = 0), d.fixVLine(a, h))
                }
            }
            d && !b && (d.setIndex(c), this.parseDates && d.setTimestamp(this.coordinateToDate(a).getTime()));
            return a
        }
    })
})();