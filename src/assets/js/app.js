// Smooth scroll placeholder -- change later, maybe don't use jquery
$(document).ready(function(){
  $("a").on('click', function(event) {

    if (this.hash !== "") {
      event.preventDefault();

      let hash = this.hash;

      // jQuery:: animate used here
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        window.location.hash = hash;
      });
    } // end if
  });
});

///////////////////////////////////////////
///////////////////////////////////////////
const speed = 'fast';

$('html, body').hide();

$(document).ready(function() {
    $('html, body').fadeIn(speed, function() {
        $('a[href], button[href]').click(function(event) {
            var url = $(this).attr('href');
            if (url.indexOf('#') == 0 || url.indexOf('javascript:') == 0) return;
            event.preventDefault();
            $('html, body').fadeOut(speed, function() {
                window.location = url;
            });
        });
    });
});