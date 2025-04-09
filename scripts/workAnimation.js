(function() {
    const timeline = gsap.timeline({ 
        paused: true,
        defaults: {
        ease: "power1.inOut",
        duration: 0.75 
        }
    });

    timeline
            .to('.post-it-sticky', {rotation:10},0)
            .to('.back', {height:90, top:110},0)
            .to('.back .post-it', {marginTop:-50},0)
            .to('.front', {height:70, boxShadow: '0 -60px 10px -60px rgba(0,0,0,.1)' },0)
            .to('.front .post-it', {marginTop:-90, backgroundColor:'#e2d439', backgroundPosition: '0 100px'},0)
            .to('h4', {delay:.3, duration:.05, autoAlpha:0, ease:'none'},0);

    document.querySelector('#post-it-area').addEventListener('mouseenter', function(event) {
        timeline.play();             
    });
   
    document.querySelector('#post-it-area').addEventListener('mouseleave', function(event) {
        timeline.reverse();
    });

})();