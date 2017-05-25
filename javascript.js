$(document).ready(function(){

console.log("ready!");

//seat geek client id: NzY1OTcwOHwxNDk1NjQ4MzM0Ljk0

//seat geek app secret: a44eefef28620b890494943cf09df0f1cee710ab733dd772d47b947311f5be58

//btn click that begins our ajax call
	
$('.btn').on('click', function() {

$('#return').html('');

//concerts 1, sports 2, theater 3, comedy 4
var images = ['', 'images/music.jpg', 'images/sports.jpg', 'images/theater.jpg', 'images/comedy.jpg'];
var image = 0;

        var queryURL = "";
      
		//ajax call to seat geek api, searching city of austin
        //sets the query url based on "type," concerts/ sports/ theater/ comedy/ all
        if ($(this).attr('id')==="concertsBtn")
        {
            queryURL = "https://api.seatgeek.com/2/events?venue.city=Austin&taxonomies.name=concert&client_id=NzY1OTcwOHwxNDk1NjQ4MzM0Ljk0";
        }
        if ($(this).attr('id')==="sportsBtn")
        {
            queryURL = "https://api.seatgeek.com/2/events?venue.city=Austin&taxonomies.name=sports&client_id=NzY1OTcwOHwxNDk1NjQ4MzM0Ljk0";
        }
        if ($(this).attr('id')==="theaterBtn")
        {         
            queryURL = "https://api.seatgeek.com/2/events?venue.city=Austin&taxonomies.name=theater&client_id=NzY1OTcwOHwxNDk1NjQ4MzM0Ljk0";
        }
         if ($(this).attr('id')==="comedyBtn")
        {         
            queryURL = "https://api.seatgeek.com/2/events?venue.city=Austin&taxonomies.name=comedy&client_id=NzY1OTcwOHwxNDk1NjQ4MzM0Ljk0";
        }
        if ($(this).attr('id')==="allBtn")
        {         
            queryURL = "https://api.seatgeek.com/2/events?venue.city=Austin&client_id=NzY1OTcwOHwxNDk1NjQ4MzM0Ljk0";
        }


        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

        	console.log(response);

        	for (var i=0;i<6;i++)
        	{
        		for (var j=0;j<response.events[i].performers.length;j++)
        		{
                    var type = "";
        			//checks if the event performer has a saved image,
        			//if it doesn't, print a default pic


                    // everything prints to a pre-existing div with an id "return",
                    // although it would be possible to append all of these to a new div if necessary

                        //name
                        $('#return').append("<b>"+response.events[i].performers[j].name+"</b><br>");
                        //type
                        $('#return').append("<b>"+response.events[i].type+"</b><br>");
                        //date and time
                        $('#return').append("<b>"+response.events[i].datetime_local+"</b><br>");
                        //address
                        $('#return').append("<b>"+response.events[i].venue.address+" "+response.events[i].venue.extended_address+"</b><br>");
                        //url
                        $('#return').append("<a href='"+response.events[i].url+"' target='_blank'>Here's a link to the event page!</a><br>");

                        //sets placeholder image
                        if (response.events[i].type === 'concert')
                        {
                            image = 1;
                        }
                        if (response.events[i].type === 'sports')
                        {
                            image = 2;
                        }
                        if (response.events[i].type === 'theater')
                        {
                            image = 3;
                        }
                        if (response.events[i].type === 'comedy')
                        {
                            image = 4;
                        }

                     //checks if performer has a picture

        			if (response.events[i].performers[j].image===null)
        			{
                        //placeholder image
        				$('#return').append("<img src='"+images[image]+"'><br><br>");
        			}
        			else
        			{
                        //performer image
        				$('#return').append("<img src='"+response.events[i].performers[j].image+"'><br><br><br>");
        			}
        		}
        	}


        	
        });

      

});


});