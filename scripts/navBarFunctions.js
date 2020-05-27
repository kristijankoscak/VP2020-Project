$('.navbar li').click(function() {
    years = $('.navbar li')
    for(var i = 0;i<years.length;i++){
        $(years[i]).removeClass("active")
    }
    $(this).addClass("active");

    // funkcija za dohvacanje podataka..
    // TO DO
});