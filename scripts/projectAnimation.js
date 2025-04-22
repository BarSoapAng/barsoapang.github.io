
    $('.project-container').scroll(function() {
        console.log("Scroll event triggered!"); 
        var scroll = $(this).scrollTop();
        var containerHeight = $(this).height();

        // $('.project').each(function() {
        //     var projectPosition = $(this).offset().top - $(this).parent().offset().top;
        //     var distanceFromTop = projectPosition - scroll;

        //     var opacity = (projectPosition - containerHeight) / containerHeight;

        //     opacity = Math.min(Math.max(opacity, 0), 1);

        //     console.log(opacity);

        //     $(this).css({'opacity': opacity});
        // });
    });