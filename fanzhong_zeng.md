## Description

* What API(s) are you using?
https://developer.riotgames.com/api/methods
https://developer.riotgames.com/docs/static-data

* What information will you gather from them?
Champion Data (Winrate, How often it's used, how often it's banned), Champion Image, North america champion data (they also have data on EU, KR, etc, im only using NA)

* Is there information beyond what is available in the API? How are you collecting it?
https://www.freesound.org/people/guitarguy1985/sounds/54047/

* What data will you use for visualization?
Champion Image, winrate, often used

* Describe your visualization.
You'll see an image collection of all the champion's portrait. It is organized based off how often the champion is used. It'll be in order where first is in the top left corner of the screen, and it goes from left to right and up to down. The size of the image depends on the ratio of the data. If the win rate of the champion is greater than a certain amount (let's say 60% for now), the image will be a bigger size than champions between 40-60%, and 0-40%.

* How does your visualization make it easier/quicker to consume data than the API?
You can easily figure out how many people are playing which characters, what champions have higher win rate. I will be using data from 2016-2017 for now, however, I intend to allow the user to select the timeline in the future. 

* What data will you use for sound?
champion stats AD (Attack Damage, physical damage), AP (Ability Power, magical damage), and one sound for AD, another sound for AP.

* Describe the audio component of your presentation.
It'll look into the AD ratio and AP ratio of a champion, compare them to each other and replay the sound in respect to the AD/AP ratio. For someone who is completely on one side, you can only hear 1 sound.

* How does your visualization make it easier/quicker to consume data than the API?
It'll show you how often a champion is used and the win rate of a champion.

* Describe how the sound adds NEW (non-redundant) information to your presentation. 
It'll tell you the AD scaling and AP scaling of the champion.

## API documention URLs
https://developer.riotgames.com/api/methods
https://developer.riotgames.com/docs/static-data

##  Sonification data sources

https://www.freesound.org/people/guitarguy1985/sounds/54047/

## Visualization data sources

data= $.ajax({url: 'https://na.api.pvp.net/api/lol/na/v1.2/champion',type: 'GET',dataType: 'json',data: {'api_key':'RGAPI-54e675e5-f6d0-41f7-9930-bf88da6e53cc'}});

var data_static= $.ajax({url: 'https://na.api.pvp.net/api/lol/static-data/na/v1.2/realm', 
	type: 'GET',dataType: 'json',data: {'api_key':'RGAPI-54e675e5-f6d0-41f7-9930-bf88da6e53cc'}});

$.ajax({url: 'http://ddragon.leagueoflegends.com/cdn/7.4.1/data/en_US/champion.json'