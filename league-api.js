// Not used
// var data_original= $.ajax({url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/tonylil', 
// 	type: 'GET',dataType: 'json',data: {'api_key':'RGAPI-54e675e5-f6d0-41f7-9930-bf88da6e53cc'}, success: function(){
//     console.log("Got original data!");
//   }});
var champData;
var organize;

//Getting Sound File
var sound_ap = new Audio("ap.mp3");
var sound_ad = new Audio("ad.mp3");
//Sound start time
var ad_time = 0.3;
var ap_time = 0.6;
sound_ad.currentTime = ad_time;
sound_ap.currentTime = ap_time;

var data_static= $.ajax({url: 'https://na.api.pvp.net/api/lol/static-data/na/v1.2/realm', 
	type: 'GET',dataType: 'json',data: {'api_key':'RGAPI-54e675e5-f6d0-41f7-9930-bf88da6e53cc'},
	success: function(){
		version = data_static.responseJSON.v;
		console.log("League version: " + version);
		getChampionData();
	}});

function getChampionData()
{
  
	var data = $.ajax({url: 'https://ddragon.leagueoflegends.com/cdn/'+version+'/data/en_US/champion.json', 
	type: 'GET', 
	success: function(){
		//Successfully grab champion data
    console.log("Got Champion data?");
		champData = JSON.parse(data["responseText"]).data;
    organize_champion_alphabet();
	}});
}

function create_champion_DIV(list)
{
  console.log("Creating Div Tags")
  //Making a div for all champions
  $('#content').append('<div id="champions"></div>');

  testvar=list;
	for (var key in list) {
    
    //Finding the width of picture
    //Default is Alphabetically
    var  w = 100;
    //Finding the width of picture due to difficulty
    if (organize == "difficulty")
    {
      switch(list[key].info.difficulty)
      {
        case 10: case 9: case 8: //Hard
          w = 200; break;
        case 7: case 6: case 5: //Medium
          w = 100; break;
        case 4: case 3: case 2: case 1: //Easy
          w = 50; break;
        default: //Unknown
          w = 25;
      }
    }
    //Finding the width of picture due to attack damage
    if (organize == "ad")
    {
      switch(list[key].info.attack)
      {
        case 10: case 9: case 8: //Hard
          w = 200; break;
        case 7: case 6: case 5: //Medium
          w = 100; break;
        case 4: case 3: case 2: case 1: //Easy
          w = 50; break;
        default: //Unknown
          w = 25;
      }
    }
    //Finding the width of picture due to magic damage
    if (organize == "ap")
    {
      switch(list[key].info.magic)
      {
        case 10: case 9: case 8: //Hard
          w = 200; break;
        case 7: case 6: case 5: //Medium
          w = 100; break;
        case 4: case 3: case 2: case 1: //Easy
          w = 50; break;
        default: //Unknown
          w = 25;
      }
    }
      

    //console.log(list[key].id+" "+list[key].info.difficulty);

    //Creating div tag for every champion
    $('#champions').append('<div id="'+key+'" class="g" style="width: '+w+'px; height: '+w+'px;"></div>');

    //Creating Mouseover functions, for sounds
    $('#'+key)
    .mouseover(function() { //Play Sound based on each champion's base AD/AP
      sound_ap.volume = list[$(this).attr("id")].info.magic/10.0;
      sound_ap.play();

      sound_ad.volume = list[$(this).attr("id")].info.attack/10.0;
      sound_ad.play();

      //To find the correct CSS classNum, aka the correct size of box;
      //Organized by Alphabet is default
      var classNum = 2;

      //organized by difficulty
      if (organize == "difficulty")
      {
        switch(list[$(this).attr("id")].info.difficulty)
        {
          case 10: case 9: case 8: //Hard
            classNum = 3; break;
          case 7: case 6: case 5: //Medium
            classNum = 2; break;
          case 4: case 3: case 2: case 1: //Easy
            classNum = 1; break;
          default: //Unknown
            classNum = 0;
        }
      }

      //organized by physical
      else if (organize == "ad")
      {
        switch(list[$(this).attr("id")].info.attack)
        {
          case 10: case 9: case 8: //Hard
            classNum = 3; break;
          case 7: case 6: case 5: //Medium
            classNum = 2; break;
          case 4: case 3: case 2: case 1: //Easy
            classNum = 1; break;
          default: //Unknown
            classNum = 0;
        }
      }

      //organized by magical
      else if (organize == "ap")
      {
        switch(list[$(this).attr("id")].info.magic)
        {
          case 10: case 9: case 8: //Hard
            classNum = 3; break;
          case 7: case 6: case 5: //Medium
            classNum = 2; break;
          case 4: case 3: case 2: case 1: //Easy
            classNum = 1; break;
          default: //Unknown
            classNum = 0;
        }
      }

      //console.log($(this).attr(width));
      //add in text
      $(this).append("<p id=\"" + $(this).attr("id") + "text\" class= \"ad num"+classNum+"\">"+list[$(this).attr("id")].info.attack+"</p>");
      $(this).append("<p id=\"" + $(this).attr("id") + "text\" class= \"ap num"+classNum+"\">"+list[$(this).attr("id")].info.magic+"</p>");

      //console.log("IN " + $(this).attr("id"));
      //console.log(list[$(this).attr("id")].info.attack + " " +list[$(this).attr("id")].info.magic);
    })
    .mouseout(function() { //Pause sound and restart
      sound_ad.pause();
      sound_ad.currentTime = ad_time;
      sound_ap.pause();
      sound_ap.currentTime = ap_time;

      //remove text
      $('#'+$(this).attr("id")+"text").remove();
      $('#'+$(this).attr("id")+"text").remove();
      //console.log("OUT " + $(this).attr("id"));
    });

    //Getting the image url
		var url = 'http://ddragon.leagueoflegends.com/cdn/'+version+'/img/champion/';
		var src = list[key].image.full;

    //putting the image into the div tag
    $('#'+key).append('<img src="'+ url + src + '" height="'+w+'" width="'+w+'">')    
	}
}

//organizing champion list
function organize_champion_difficulty()
{
  console.log("Organizing by Difficulty");
  organize = "difficulty";
  delete_champion();

  var list = {};

  for (var i=10; i>=1; i--)
  {
    for (key in champData)
    {
      if (i == champData[key].info.difficulty)
      {
        list[key] = champData[key];
      }
    }
  }

  create_champion_DIV(list);
}

function organize_champion_alphabet()
{
  console.log("Organizing Alphabetically");
  organize = "alphabet";
  delete_champion();
  
  //Push the keys into an array
  var list = [];
  for (var key in champData)
  {
    list.push(key);
  }
  //Then Sort the array
  list.sort();

  //Now put the data back into the hash
  var list_hash = {};
  list.forEach(function(x){
    list_hash[x] = champData[x];
  })
  
  //Push into the div tag
  create_champion_DIV(list_hash);
}

function organize_champion_physical()
{
  console.log("Organizing Physically");
  organize = "ad";
  delete_champion();

  var list = {};

  for (var i=10; i>=1; i--)
  {
    for (key in champData)
    {
      if (i == champData[key].info.attack)
      {
        list[key] = champData[key];
      }
    }
  }

  create_champion_DIV(list);
}

function organize_champion_magical()
{
  console.log("Organizing Magical");
  organize = "ap";
  delete_champion();

  var list = {};

  for (var i=10; i>=1; i--)
  {
    for (key in champData)
    {
      if (i == champData[key].info.magic)
      {
        list[key] = champData[key];
      }
    }
  }

  create_champion_DIV(list);
}

function delete_champion()
{
  console.log("Deleting Div Tags")
  var div = document.getElementById("champions");
  if (div != null)
    div.parentNode.removeChild(div);
}
