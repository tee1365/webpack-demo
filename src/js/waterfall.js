define(["jquery"], function($) {
  function Waterfall($container, loadmoreFlag) {
    this.$container = $container
    this.loadmoreFlag = loadmoreFlag
    this.start()
  }

  Waterfall.prototype = {
    start: function() {
      this.setImage()
      if (this.loadmoreFlag) {
        this.addButton()
      }
      this.bindEvent()
    },

    setImage: function() {
      var _this = this
      this.containerWidth = this.$container.width()
      this.waterfallItem = this.$container.find(".waterfall-item")
      this.contentWidth = this.waterfallItem.outerWidth(true)
      var rowLength = parseInt(this.containerWidth / this.contentWidth)
      var arr = []
      for (let i = 0; i < rowLength; i++) {
        arr[i] = 0
      }
      this.waterfallItem.each(function() {
        var minHeight = Math.min.apply(null, arr)
        var minIndex = arr.indexOf(minHeight)
        $(this).css({
          top: minHeight,
          left: _this.contentWidth * minIndex
        })

        arr[minIndex] += $(this).outerHeight(true)
      })
      var maxHeight = Math.max.apply(null, arr)
      this.$container.height(maxHeight + 200)
    },

    bindEvent: function() {
      var _this = this

      $(window).on("resize", function() {
        _this.setImage()
      })

      var $button = this.$container.find(".waterfall-loadmore")
      $button.on("click", function() {
        _this.loadmore(10)
      })
    },

    loadmore: function(number) {
      var _this = this
      for (let i = 0; i < number; i++) {
        var randomIndex = Math.floor(Math.random() * 4)
        var newNode = $(_this.waterfallItem[randomIndex]).clone()
        this.$container.append(newNode)
      }
      this.setImage()
    },

    addButton: function() {
      var $button = $("<button class='waterfall-loadmore'>loadmore</button>")
      this.$container.append($button)
    },
  }

  return {
    init: function($container, loadmoreFlag) {
      new Waterfall($container, loadmoreFlag)
    }
  }
})

// Waterfall.init($(".waterfall-container"), true)
