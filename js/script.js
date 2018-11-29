(function () {

'use strict';

    let timer;
    let helloTimer;
    let index;

    $(function() {
        helloTimer = setInterval(createHellos, 2200);
        $(window).resize(resetAll);
        $('#reset').click(resetAll);
        $('h2').animate({ opacity: 1}, 2000);
        $('img').animate({ opacity: 1}, 2000);
        $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('#back-to-top').tooltip();
                $('#back-to-top').fadeIn();
            } else {
                $('#back-to-top').fadeOut();
                $('#back-to-top').tooltip('hide');
            }
        })    
        $('.navbar-nav').find('a').on('click', function(e){
            if ($(window).width() < 767 || screen.width < 767) {
                $('.navbar-toggler').trigger('click');
            }
        });
        let word = " I'm Jonathan Cady";
        index = 0;
        timer = setInterval(function() {
            addLetters(word);
        },  100);
    });    

    function addLetters(word) {
        if (index < word.length) {
            $('#me').get(0).innerText = $('#me')[0].innerHTML + word.charAt(index);
            index = index + 1;
        } else {
            clearTimeout(timer);
        }
    }  

    /*
     * This function randomly spawns text that appears throughout the div
     */
     function createHellos() {
        if ($('.word').length == 20) {
            clearInterval(helloTimer);
        }
        let width = $('header').get(0).offsetWidth;
        let height = $('header').get(0).offsetHeight;
        addHello(width, height); 
    }

    /*
     * Randomly generates hellos to populate the hello module
     */
    function addHello (width, height) {
        let randomWord = hellos[Math.floor(Math.random() * hellos.length)];
        let randomX = produceRandom(width);
        let randomY = produceRandom(height);
        while (conditions(randomX, randomY, width, height)) {
            randomX = produceRandom(width);
            randomY = produceRandom(height);
        }
        let word = document.createElement('div');
        word.classList.add('word');
        word.style.position = 'absolute';
        word.innerText = randomWord;
        word.style.top = randomY + 'px';
        word.style.left = randomX + 'px';
        $('#header').append(word);
        $('.word').animate({ opacity: 0.4}, 1000);
    }

    function conditions(xVal, yVal, width, height) {
        // checks if word would be generated too close to upper and lower boundaries
        if (yVal > (height - 10)) {
            return true;
        // checks if word would be generated too close to side
        } else if (xVal < 10 || xVal > (width - 30)) {
            return true;
        } else {
            return false;
        }   
    }

    /*
     * Resets all 'hellos' in the module
     */
    function resetAll () {
        clearInterval(helloTimer);
        $('.word').animate({ opacity: 0 }, 300, function () {
            $('.word').remove();
        });
        helloTimer = setInterval(createHellos, 1000);
    }

    function produceRandom(value) {
        return Math.floor(Math.random() * value);
    }

})();