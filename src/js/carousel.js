define(["jquery"], function($) {

  function Carousel($slideshow) {
    this.$slideshow = $slideshow
    this.start()
  }

  Carousel.prototype = {
    start: function() {
      this.$content = this.$slideshow.find(".carousel-content")
      this.$lis = this.$content.find("li")
      this.$imgs = this.$lis.find("img")
      this.$prebtn = this.$slideshow.find(".pre")
      this.$nextbtn = this.$slideshow.find(".next")
      this.$bullets = this.$slideshow.find(".carousel-bullet>li")
      this.isSliding = false
      this.currentPage = 0
      this.imgCount = this.$lis.length
      this.timer
      this.$lis.width(window.screen.width - 10)
      this.$lis.height($(window).height())
      // this.$lis.css("width", "1024px")
      // this.$lis.css("height", "100%")
      this.$content.append(this.$lis.first().clone())
      this.$content.prepend(this.$lis.last().clone())
      this.imgWidth = this.$lis.width()
      // console.log(this.imgWidth)
      this.$content.width(this.imgWidth * (this.imgCount + 2))
      this.$content.css({
        left: -this.imgWidth
      })

      this.bindEvent()
      this.autoSlide()
    },



    slidePre: function(index) {
      var _this = this
      if (_this.isSliding) {
        return
      }
      _this.isSliding = true
      var offsetLeft = parseInt(_this.$content.css("left"))
      _this.$content.animate({
        left: offsetLeft + _this.imgWidth * index
      }, function() {
        _this.currentPage -= index
        if (_this.currentPage < 0) {
          _this.currentPage = _this.imgCount - 1
          _this.$content.css({
            left: -_this.imgWidth * _this.imgCount
          })
        }
        _this.setBullet()
        _this.isSliding = false
      })
      window.clearInterval(this.timer)
      this.autoSlide()
    },



    slideNext: function(index) {
      var _this = this
      if (_this.isSliding) {
        return
      }
      _this.isSliding = true
      var offsetLeft = parseInt(_this.$content.css("left"))
      _this.$content.animate({
        left: offsetLeft - _this.imgWidth * index
      }, function() {
        _this.currentPage += index
        // console.log(_this.currentPage)
        if (_this.currentPage === _this.imgCount) {
          _this.currentPage = 0
          _this.$content.css({
            left: -_this.imgWidth
          })
        }
        _this.setBullet()
        _this.isSliding = false
      })
      window.clearInterval(this.timer)
      this.autoSlide()
    },



    setBullet: function() {
      this.$bullets.each(function() {
        $(this).removeClass("active")
      })
      this.$bullets.eq(this.currentPage).addClass("active")
    },



    autoSlide: function() {
      var _this = this
      this.timer = setInterval(function() {
        _this.slideNext(1)
      }, 3000)
    },



    bindEvent: function() {
      var _this = this
      _this.$prebtn.on("click", function(e) {
        e.preventDefault()
        _this.slidePre(1)
      })
      _this.$nextbtn.on("click", function(e) {
        e.preventDefault()
        _this.slideNext(1)
      })
      _this.$bullets.on("click", function() {
        var index = $(this).index()
        if (index > _this.currentPage) {
          _this.slideNext(index - _this.currentPage)
        } else if (index < _this.currentPage) {
          _this.slidePre(_this.currentPage - index)
        }
      })
    }
  }


  return {
    init: function($slideshow) {
      $slideshow.each(function(index, node) {
        new Carousel($(node))
      })
    }
  }
})


// Carousel.init($(".carousel"))
