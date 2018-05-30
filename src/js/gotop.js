define(["jquery"], function($) {
  function GoTop($page) {
    this.$page = $page
    this.start()
  }

  GoTop.prototype = {
    start: function() {
      this.addButton()
      this.bindEvent()
    },

    addButton: function() {
      var $button = $("<button class='gotop'>back to top </button>")
      this.$page.append($button)
      $button.css({
        display: "none"
      })
      this.isShow = false
    },

    bindEvent: function() {
      var _this = this
      var $button = this.$page.find(".gotop")
      
      $button.on("click", function() {
        $("body, html").animate({
          scrollTop: 0
        }, 1000)
      })

      $(window).on("scroll", function() {
        var scrollTop = $(window).scrollTop()
        var windowHeight = $(window).height()
        if (scrollTop > windowHeight + 100 && !_this.isShow) {
          $button.css({
            display: "inline-block"
          })
          _this.isShow = true
          console.log(_this.isShow)
        }
        if (scrollTop < windowHeight + 100 && _this.isShow) {
          $button.css({
            display: "none"
          })
          _this.isShow = false
          console.log(_this.isShow)
        }
      })
    }
  }
  return {
    init: function($page) {
      new GoTop($page)
    }
  }
})
