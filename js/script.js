"use strict";

(function () {

    var timer;
    var helloTimer;
    var index;

    $(function() {
        helloTimer = setInterval(createHellos, 2200);
        $(window).resize(resetAll);
        $("#reset").click(resetAll);
        $("#hello-button").click(function () {
            displayMessage(this);
        })
        $("h2").animate({ opacity: 1}, 2000);
        $("img").animate({ opacity: 1}, 2000);
        var word = " I'm Jonathan Cady";
        index = 0;
        timer = setInterval(function() {
            addLetters(word);
        },  100);
    });    

    function addLetters(word) {
        if (index < word.length) {
            $("#me")[0].innerText = $("#me")[0].innerHTML + word.charAt(index);
            index = index + 1;
        }
        else {
            clearTimeout(timer);
        }
    }  

    // This function randomly spawns text that appears throughout the div
    function createHellos() {
        if ($(".word").length == 20) {
            clearInterval(helloTimer);
        }
        var width = $("header")[0].offsetWidth;
        var height = $("header")[0].offsetHeight;
        addHello(width, height) 
    }

    function addHello (width, height) {
        var randomWord = hellos[Math.floor(Math.random() * hellos.length)];
        var randomX = produceRandom(width);
        var randomY = produceRandom(height);
        while (conditions(randomX, randomY, width, height)) {
            randomX = produceRandom(width);
            randomY = produceRandom(height);
        }
        var word = document.createElement("div");
        word.classList.add("word");
        word.style.position = "absolute";
        word.innerText = randomWord;
        word.style.top = randomY + "px";
        word.style.left = randomX + "px";
        $("header")[0].appendChild(word);
        $(".word").animate({ opacity: 0.4}, 1000);
    }

    function conditions(xVal, yVal, width, height) {
        // not in the middle
        var middleX = Math.floor(width / 2);
        var middleY = Math.floor(height / 2);
        // checks if word would be generated inside welcome text (horizontal)
        if (xVal > (middleX - 80) && xVal < (middleX + 80)) {
            return true;
        // checks if word would be generated inside welcome text (vertical)    
        } else if (yVal > (middleY - 50) && yVal < (middleY + 50)) {
            return true;
        // checks if word would be generated too close to upper and lower boundaries
        } else if (yVal < 30 || yVal > (height - 50)) {
            return true;
        // checks if word would be generated too close to side
        } else if (xVal < 30 || xVal > (width - 80)) {
            return true;
        } else {
            return false;
        }   
    }

    function displayMessage (el) {
        var paragraph = $("#about-hello")[0];
        if (paragraph.classList.contains("hidden")) {
            paragraph.classList.remove("hidden");
            el.innerText = "hide";
        } else {
            paragraph.classList.add("hidden");
            el.innerText = "about hellos";
        }
    }

    function resetAll () {
        clearInterval(helloTimer);
        $(".word").animate({ opacity: 0 }, 800, function () {
            $(".word").remove();
        });
        helloTimer = setInterval(createHellos, 1000);
    }

    function produceRandom(value) {
        return Math.floor(Math.random() * value);
    }
})();