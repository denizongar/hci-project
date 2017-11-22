$(document).ready(function() {
	function teamLogo(tricode) {
		return 'https://stats.nba.com/media/img/teams/logos/' + tricode + '_logo.svg'
	}

	var getUrlParameter = function getUrlParameter(sParam) {
	    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
	    }
	};
	var home = getUrlParameter('home')
	var away = getUrlParameter('away')

	// fullCalendar
	$('#calendar').fullCalendar({
		height: 700,
		eventBackgroundColor: 'rgba(0,0,0,0)',
		eventBorderColor: 'rgba(0,0,0,0)',
		views: {
			month: {
				eventLimit: 2
			}
		},
		// eventLimitClick: function(cellInfo) {
		// 	alert("heyhey")
		// 	test = cellInfo.segs
		// },
		themeSystem: 'bootstrap3',

		// customize events
		eventRender: function(event, element) {
			element.find(".fc-title").remove();
			element.find(".fc-time").remove();
			homeLogo = teamLogo(event.teams[0]);
			awayLogo = teamLogo(event.teams[1]);
			var new_description =
			'<div class="event text-center"><img class="event-team-logo rounded-circle" src="'+homeLogo+'" alt=""><img class="event-team-logo rounded-circle" src="'+awayLogo+'" alt=""></div>';
			element.append(new_description);
		},
		header: {
			left:   'month basicWeek',
			center: '',
			right:  'title'
		},
		events: [
		{	
			id: 'event1',
			title: 'Event1',
			start: '2017/11/8 18:30:00',
			startt: '2017/11/8 18:30:00',
			place: 'Investers Group Field',
			teams: ['LAL', 'TOR'],
			hRoster: ['Brook Lopez', 'Larry Nance Jr', 'Brandon Ingram', 'Kentavious Caldwell', 'Lonzo Ball'],
			aRoster: ['Kyle Lowry', 'DeMar DeRozan', 'Norman Powell', 'Serge Ibaka', 'Jonas Valanciunas'],
			cable: [],
			bars: [['Barneys', '07:00PM', '7km'], ['Pub One', '07:00PM', '8km'], ['Leos', '07:30PM', '11km']],
			odds: [-155, 30]
		},
		{	
			id: 'event2',
			title: 'Event2',
			start: '2017/11/8 18:30:00',
			startt: '2017/11/8 18:30:00',
			place: 'Investers Group Field',
			teams: ['BOS', 'WAS'],
			hRoster: ['Brook Lopez', 'Larry Nance Jr', 'Brandon Ingram', 'Kentavious Caldwell-Pope', 'Lonzo Ball'],
			aRoster: ['Kyle Lowry', 'DeMar DeRozan', 'Norman Powell', 'Serge Ibaka', 'Jonas Valanciunas'],
			cable: [],
			bars: [['Barneys', '07:00PM', '7km'], ['Pub One', '07:00PM', '8km'], ['Leos', '07:30PM', '11km']],
			odds: [-155, 30]
		},{	
			id: 'event3',
			title: 'Event3',
			start: '2017/11/8 18:30:00',
			startt: '2017/11/8 18:30:00',
			place: 'Investers Group Field',
			teams: ['DAL', 'SAC'],
			hRoster: ['Brook Lopez', 'Larry Nance Jr', 'Brandon Ingram', 'Kentavious Caldwell-Pope', 'Lonzo Ball'],
			aRoster: ['Kyle Lowry', 'DeMar DeRozan', 'Norman Powell', 'Serge Ibaka', 'Jonas Valanciunas'],
			cable: [],
			bars: [['Barneys', '07:00PM', '7km'], ['Pub One', '07:00PM', '8km'], ['Leos', '07:30PM', '11km']],
			odds: [-155, 30]
		}
		],

		// populate modal
		eventClick: function(event) {
			$('#event-modal').modal();
			$('#event-modal').find('.place').html(event.place);
			$('#event-modal').find('.countdown').countdown(event.startt, function(event) {
				$(this).text(
					event.strftime('%H:%M:%S')
					);
			});
			var calendarStatLink = 'index.html?home' + event.teams[0] + '&away' + event.teams[1]
			history.pushState(null, null, calendarStatLink);
			
			var statLink = 'stats.html?home=' + event.teams[0] + '&away=' + event.teams[1]
			$('.modal-stats').attr("href", statLink)
			
			// logos
			$('#event-modal').find('.home > .modal-team-logo').attr('src', teamLogo(event.teams[0]))
			$('#event-modal').find('.away > .modal-team-logo').attr('src', teamLogo(event.teams[1]))

			// odds 
			$('#event-modal').find('.home-odds').html(event.odds[0]);
			$('#event-modal').find('.away-odds').html(event.odds[1]);
			
			// rosters
			// $hRoster = $('#event-modal').find('.home-roster > ul');
			// $.each(event.hRoster, function(i, player) {
			// 	$hRoster.append('<li>' + player + '</li>')
			// });

			teamRoster(event.teams[0], 'home')
			teamRoster(event.teams[1], 'away')
			
			// bars
			$bars = $('#event-modal').find('.bar > table');
			$.each(event.bars, function(i, bar) {
				$bars.append('<tr>' + '<td>'+bar[0]+'</td>' + '<td>' + bar[1] + '</td>' + '<td>' + bar[2] + '</td>' + '</tr>')
			});
		}
	})

	// fav select
	$('.fc-left').append('<select class="custom-select" id="fav-team"><option selected>Favorite Team</option><option value="BOS">Celtics</option><option value="TOR">Raptors</option><option value="LAL">Lakers</option><option value="ATL">Hawks</option></select>');

	// fav-footer display
	$('#fav-team').change(function() {
		favTeam = $('#fav-team :selected').text()
		favTeamTri = $('#fav-team :selected').val()
		if (favTeam == "Favorite Team") {
			$('.fav-footer').css('visibility', 'hidden');
		}
		else $('.fav-footer').css('visibility', 'visible');
		$('.fav-logo').html('<img class="rounded-circle" src="'+teamLogo(favTeamTri)+'" alt=""/>')
		$('.fav-record > span').html(Math.floor(Math.random()*10) + '-' + Math.floor(Math.random()*10))
		$('.fav-standing > span').html(Math.floor(Math.random()*10 + 1))
		$('.fav-nextOp > span').html('Team Name')
	})

	// remove hidden modal elements
	$('#event-modal').on('hide.bs.modal', function() {
		$('#event-modal').find('.roster > ul > li').remove();
		$('#event-modal').find('.bar > table > tr').remove();
	})

	// booststrapify calendar buttons
	$('.fc-month-button').toggleClass('btn-default btn-secondary')
	$('.fc-basicWeek-button').toggleClass('btn-default btn-secondary')

	// Team tricode to TeamID
	// ex: LAL --> 1610612747
	function triToID(tricode) {
		var teamID;
		$.each(json.teams, function(i, val) {
			if (tricode == val.tricode) {
				teamID = val.teamId;
			}
		});
		return teamID;
	}
	function triToName(tricode) {
		var name;
		$.each(json.teams, function(i, val) {
			if (tricode == val.tricode) {
				name = val.fullName;
			}
		});
		return name;
	}

	function teamRoster(tricode, loc) {
		var teamID = triToID(tricode);
		var rosterArray = [];
		$.ajax ({
			url: 'http://stats.nba.com/stats/commonTeamRoster/?teamID='+teamID+'&Season=2017-18&format=jsonp',
			dataType:"jsonp",
			success: function(response) {
			// rosterFive = response.resultSets[0].rowSet.slice(0, 5);
			$.each(response.resultSets[0].rowSet.slice(0, 5), function(i, val) {
				rosterArray += '<li>'
				+ val[3]
				+ '</li>'
			});
			loc == 'home' ? $('.home-roster ul').append(rosterArray) : $('.away-roster ul').append(rosterArray)
		}
	})
	}
	
	//
	// ++++++++++++ STATS ++++++++++++
	//

	// function aa(conf) {
	// 	if (conf == 'left') {
	// 		var index = 0
	// 		var size = 15
	// 	}
	// 	else {
	// 		var index = 15
	// 		var size = 30
	// 	}
	// 	var hello = [];
	// 	for (var i = index; i < size; i++) {
	// 		hello += '<img src="' 
	// 		+ teamLogo((json.teams[i].tricode)) +'" alt="teamLogo" height="90px" width="90px" class="rounded-circle p-2 stat-team-list-logo" id="'
	// 		+ json.teams[i].tricode
	// 		+ '">'
	// 	}
	// 	return hello		
	// }
	function aa(side, conf) {
		teamList = [];
		$.each(json.teams, function(i, team) {
			if (conf == team.confName.toLowerCase()) {
				teamList += '<img src="' 
				+ teamLogo(team.tricode)
				+ '" alt="teamLogo" height="90px" width="90px" class="rounded-circle p-2 stat-team-list-logo" id="'
				+ json.teams[i].tricode
				+ '">'
				side == 'left' ? $('.stat-left .stat-teams').html(teamList) : $('.stat-right .stat-teams').html(teamList)
			}
		})
	}

	function bb(tricode, side) {
		var teamID = triToID(tricode);
		var rosterArray = [];

		$.ajax ({
			url: 'http://stats.nba.com/stats/commonTeamRoster/?teamID=' + teamID + '&Season=2017-18&format=jsonp',
			dataType:"jsonp",
			success: function(response) {

				$.each(response.resultSets[0].rowSet.slice(0,8), function(i, player) {
					rosterArray += '<tr class="stat-t-player" id="'+ player[12]+ '">'
					+ '<th class="stat-t-player-number" scope="row">'+ player[4] +'</th>'
					+ '<td class="stat-t-player-name">'+ player[3].slice(0,15) +'</td>'
					+ '<td class="stat-t-player-pos">'+ player[5] +'</td>'
					+ '<td class="stat-t-player-height">'+ player[6] +'</td>'
					+ '<td class="stat-t-player-bd">'+ player[8] +'</td>'
					+ '<td class="stat-t-player-age">'+ player[9] +'</td>'
					+ '</tr>'
				});
				side == 'left' ? $('.stat-left tbody').append(rosterArray) : $('.stat-right tbody').append(rosterArray)
			}
		})
		
	}

	function rowish(side){
		var s = side;
		if (s == 'left') {var textA = 'right'}
		else {var texA = 'left'}
		return function(header, data){
		var headerColumn = '<th class="text-'+s+'" scope="row">'+header+'</th>'
		var dataColumn = '<td class="stat-cell text-'+ textA +'">'+ data +'</td>'
		var result = '<tr>'
		if(s == 'left') {
			result = result + headerColumn+dataColumn
		} else{
			result = result + dataColumn + headerColumn
		}
		result += '</tr>'
		return result 
		}
	}


	function cc(playerID, side) {
		var playerArray = [];

		$.ajax ({
			url: 'http://stats.nba.com/stats/playerprofilev2/?playerid=' + playerID + '&permode=Totals&format=jsonp',
			dataType:"jsonp",
			success: function(response) {
				var stat = response.resultSets[0].rowSet[0]; 
				var rowFunction = rowish(side);  
					
					playerArray += 
					rowFunction('Age', stat[5])+
					rowFunction('PTS', stat[26])+
					rowFunction('PER', Math.round((Math.random() * 30)))+
					rowFunction('FG%', stat[11] )+
					rowFunction('FG3%', stat[14])+
					rowFunction('FT%', stat[17])+
					rowFunction('AST', stat[21])+
					rowFunction('REB', stat[20])+
					rowFunction('BLK', stat[23])+
					rowFunction('STL', stat[22])+
					rowFunction('TOV', stat[24])
				
				side == 'left' ? $('.stat-left tbody').append(playerArray) : $('.stat-right tbody').append(playerArray)
			}
		})
	}
	function dd(tricode, side) {
		var teamID = triToID(tricode);
		var teamStatArray = [];
		$.ajax({
			url: 'http://stats.nba.com/stats/teamdashboardbygeneralsplits?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlusMinus=N&Rank=N&Season=2017-18&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&Split=general&VsConference=&VsDivision=&TeamID='+teamID,
			dataType:"jsonp",
			success: function(response) {
				var stat = response.resultSets[0].rowSet[0];
				var rowFunction = rowish(side);

				teamStatArray +=
				rowFunction('GP', stat[3])+
				rowFunction('PTS', stat[27])+
				rowFunction('W', stat[4])+
				rowFunction('L', stat[5])+
				rowFunction('FG%', stat[10])+
				rowFunction('FG3%', stat[13])+
				rowFunction('FT%', stat[16])+
				rowFunction('REB', stat[19])+
				rowFunction('AST', stat[20])+
				rowFunction('STL', stat[22])+
				rowFunction('BLK', stat[23])

				side == 'left' ? $('.stat-left tbody').append(teamStatArray) : $('.stat-right tbody').append(teamStatArray)
			}
		})
	}

	function highlight(statLeft, statRight) {
		for (var i = 0; i < statLeft.length; i++) {
			console.log("hello")
			statLeft[i][0].innerHTML > statRight[i][0].innerHTML ? $(statLeft[i]).css('color', 'red') : $(statRight[i]).css('color', 'red')
		}
	}

	statConf = `<div class="d-flex w-50 justify-content-center align-items-center stat-conf stat-conf__w">West</div>
				<div class="d-flex w-50 justify-content-center align-items-center stat-conf stat-conf__e">East</div>`

	statTeams = '<div class="d-flex p-4 justify-content-around flex-wrap align-items-center stat-teams"></div>'

	statPlayerList = `<div class="w-100 stat-player-list">
						<img src="http://via.placeholder.com/500x75" class="w-100 mb-3" alt="">
						<table class="table table-hover table-bordered mb-0">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Name</th>
									<th scope="col">Position</th>
									<th scope="col">Height</th>
									<th scope="col">Birthday</th>
									<th scope="col">Age</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>`

	statPlayer = `<div class="stat-player w-100">
					<div class="d-flex flex-column align-items-center mr-5 stat-player-info">
						<img src="http://via.placeholder.com/150x150" alt="" class="rounded-circle">
						<span class="stat-player-name"></span>
					</div>
					<table class="table table-bordered w-100 float-right">
						<tbody>
						</tbody>
					</table>
				</div>`

	statTeam = `<div class="stat-team w-100">
					<div class="d-flex flex-column align-items-center mr-5 stat-team-info">
						<img src="http://via.placeholder.com/150x150" alt="" class="rounded-circle">
						<span class="stat-team-name"></span>
					</div>
					<table class="table table-bordered w-100 float-right">
						<tbody>
						</tbody>
					</table>
				</div>`

	statButtons = `<div class="d-flex justify-content-around stat-buttons">
						<button class="btn btn-block mt-3 mx-2">Position</button>
						<button class="btn btn-block mt-3 mx-2">Position</button>
					</div>`
	
	$('.pot-player').click(function() {
		function playerSelect(side) {
			$('.stat-team-list-logo').click(function() {
				side == 'left' ? $('.stat-left').html(statPlayerList) : $('.stat-right').html(statPlayerList)
				bb($(this).attr('id'), side)
				displayPlayerStats(side)
			});
		}

		function displayPlayerStats(side) {
			$('tbody').on("click",".stat-t-player", function() {
				if (side == 'left') {
					$('.stat-left').html(statPlayer)
					$('.stat-left .stat-player-name').html($(this).find('.stat-t-player-name').html())
				}
				else {
					$('.stat-right').html(statPlayer)
					$('.stat-right .stat-player-name').html($(this).find('.stat-t-player-name').html())
				}
				cc($(this).attr('id'), side)
			})
		}
		
		
		$('.pot').remove();
		$('.stat-card').append(statConf)
		$('.container').append(statButtons)

		$('.stat-left > .stat-conf__w').click(function() {
			$('.stat-left').html(statTeams)
			aa('left', 'west')
			$('.stat-buttons').remove();
			playerSelect('left')
		});
		$('.stat-left > .stat-conf__e').click(function() {
			$('.stat-left').html(statTeams)
			aa('left', 'east')
			$('.stat-buttons').remove();
			playerSelect('left')
		});
		$('.stat-right > .stat-conf__e').click(function() {
			$('.stat-right').html(statTeams)
			aa('right', 'east')
			$('.stat-buttons').remove();
			playerSelect('right')
		});
		$('.stat-right > .stat-conf__w').click(function() {
			$('.stat-right').html(statTeams)
			aa('right', 'west')
			$('.stat-buttons').remove();
			playerSelect('right')
		});
	});

	$('.pot-team').click(function() {
		function teamSelect(side) {
			$('.stat-team-list-logo').click(function() {
				if (side == 'left') {
					$('.stat-left').html(statTeam)
					var teamName = triToName($(this).attr('id'))
					$('.stat-left .stat-team-name').html(teamName);
				}
				else {
					$('.stat-right').html(statTeam)
					var teamName = triToName($(this).attr('id'))
					$('.stat-right .stat-team-name').html(teamName);
				}
				dd($(this).attr('id'), side)
			});
		}

		$('.pot').remove();
		$('.stat-card').append(statConf)
		$('.container').append(statButtons)

		$('.stat-left > .stat-conf__w').click(function() {
			$('.stat-left').html(statTeams)
			aa('left', 'west')
			$('.stat-buttons').remove();
			teamSelect('left');
		});
		$('.stat-left > .stat-conf__e').click(function() {
			$('.stat-left').html(statTeams)
			aa('left', 'east')
			$('.stat-buttons').remove();
			teamSelect('left');
		});
		$('.stat-right > .stat-conf__w').click(function() {
			$('.stat-right').html(statTeams)
			aa('right', 'west')
			$('.stat-buttons').remove();
			teamSelect('right');
		});
		$('.stat-right > .stat-conf__e').click(function() {
			$('.stat-right').html(statTeams)
			aa('right', 'east')
			$('.stat-buttons').remove();
			teamSelect('right');
		});
	})

	statLeft = []
	statRight = []
	$('.stat-left').arrive(".stat-cell", function() {
		statLeft.push($(this))
		if (statRight.length != 0 && statLeft.length == 11) {
			highlight(statLeft, statRight)
		}
	})
	$('.stat-right').arrive(".stat-cell", function() {
		statRight.push($(this))
		if (statLeft.length != 0 && statRight.length == 11) {
			highlight(statLeft, statRight)
		}
	})

	if (typeof home != 'undefined') {
		var calendarLink = 'index.html?home=' + home + '&away=' + away

		// $('.container').prepend('<a href="'+calendarLink+'" class="btn btn-secondary ">Back to calendar</a>')
		$('.pot').remove();
		$('.stat-card').append(statTeam)
		var homeName = triToName(home)
		var awayName = triToName(away)
		$('.stat-left .stat-team-name').html(homeName);
		$('.stat-right .stat-team-name').html(awayName);
		dd(home, 'left')
		dd(away, 'right')
	}
});

json = {
	"teams":[
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Atlanta",
		"altCityName":"Atlanta",
		"fullName":"Atlanta Hawks",
		"tricode":"ATL",
		"teamId":"1610612737",
		"nickname":"Hawks",
		"urlName":"hawks",
		"confName":"East",
		"divName":"Southeast"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Boston",
		"altCityName":"Boston",
		"fullName":"Boston Celtics",
		"tricode":"BOS",
		"teamId":"1610612738",
		"nickname":"Celtics",
		"urlName":"celtics",
		"confName":"East",
		"divName":"Atlantic"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Brooklyn",
		"altCityName":"Brooklyn",
		"fullName":"Brooklyn Nets",
		"tricode":"BKN",
		"teamId":"1610612751",
		"nickname":"Nets",
		"urlName":"nets",
		"confName":"East",
		"divName":"Atlantic"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Charlotte",
		"altCityName":"Charlotte",
		"fullName":"Charlotte Hornets",
		"tricode":"CHA",
		"teamId":"1610612766",
		"nickname":"Hornets",
		"urlName":"hornets",
		"confName":"East",
		"divName":"Southeast"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Chicago",
		"altCityName":"Chicago",
		"fullName":"Chicago Bulls",
		"tricode":"CHI",
		"teamId":"1610612741",
		"nickname":"Bulls",
		"urlName":"bulls",
		"confName":"East",
		"divName":"Central"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Cleveland",
		"altCityName":"Cleveland",
		"fullName":"Cleveland Cavaliers",
		"tricode":"CLE",
		"teamId":"1610612739",
		"nickname":"Cavaliers",
		"urlName":"cavaliers",
		"confName":"East",
		"divName":"Central"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Dallas",
		"altCityName":"Dallas",
		"fullName":"Dallas Mavericks",
		"tricode":"DAL",
		"teamId":"1610612742",
		"nickname":"Mavericks",
		"urlName":"mavericks",
		"confName":"West",
		"divName":"Southwest"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Denver",
		"altCityName":"Denver",
		"fullName":"Denver Nuggets",
		"tricode":"DEN",
		"teamId":"1610612743",
		"nickname":"Nuggets",
		"urlName":"nuggets",
		"confName":"West",
		"divName":"Northwest"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Detroit",
		"altCityName":"Detroit",
		"fullName":"Detroit Pistons",
		"tricode":"DET",
		"teamId":"1610612765",
		"nickname":"Pistons",
		"urlName":"pistons",
		"confName":"East",
		"divName":"Central"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Golden State",
		"altCityName":"Golden State",
		"fullName":"Golden State Warriors",
		"tricode":"GSW",
		"teamId":"1610612744",
		"nickname":"Warriors",
		"urlName":"warriors",
		"confName":"West",
		"divName":"Pacific"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Houston",
		"altCityName":"Houston",
		"fullName":"Houston Rockets",
		"tricode":"HOU",
		"teamId":"1610612745",
		"nickname":"Rockets",
		"urlName":"rockets",
		"confName":"West",
		"divName":"Southwest"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Indiana",
		"altCityName":"Indiana",
		"fullName":"Indiana Pacers",
		"tricode":"IND",
		"teamId":"1610612754",
		"nickname":"Pacers",
		"urlName":"pacers",
		"confName":"East",
		"divName":"Central"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"LA",
		"altCityName":"LA Clippers",
		"fullName":"LA Clippers",
		"tricode":"LAC",
		"teamId":"1610612746",
		"nickname":"Clippers",
		"urlName":"clippers",
		"confName":"West",
		"divName":"Pacific"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Los Angeles",
		"altCityName":"Los Angeles Lakers",
		"fullName":"Los Angeles Lakers",
		"tricode":"LAL",
		"teamId":"1610612747",
		"nickname":"Lakers",
		"urlName":"lakers",
		"confName":"West",
		"divName":"Pacific"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Memphis",
		"altCityName":"Memphis",
		"fullName":"Memphis Grizzlies",
		"tricode":"MEM",
		"teamId":"1610612763",
		"nickname":"Grizzlies",
		"urlName":"grizzlies",
		"confName":"West",
		"divName":"Southwest"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Miami",
		"altCityName":"Miami",
		"fullName":"Miami Heat",
		"tricode":"MIA",
		"teamId":"1610612748",
		"nickname":"Heat",
		"urlName":"heat",
		"confName":"East",
		"divName":"Southeast"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Milwaukee",
		"altCityName":"Milwaukee",
		"fullName":"Milwaukee Bucks",
		"tricode":"MIL",
		"teamId":"1610612749",
		"nickname":"Bucks",
		"urlName":"bucks",
		"confName":"East",
		"divName":"Central"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Minnesota",
		"altCityName":"Minnesota",
		"fullName":"Minnesota Timberwolves",
		"tricode":"MIN",
		"teamId":"1610612750",
		"nickname":"Timberwolves",
		"urlName":"timberwolves",
		"confName":"West",
		"divName":"Northwest"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"New Orleans",
		"altCityName":"New Orleans",
		"fullName":"New Orleans Pelicans",
		"tricode":"NOP",
		"teamId":"1610612740",
		"nickname":"Pelicans",
		"urlName":"pelicans",
		"confName":"West",
		"divName":"Southwest"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"New York",
		"altCityName":"New York",
		"fullName":"New York Knicks",
		"tricode":"NYK",
		"teamId":"1610612752",
		"nickname":"Knicks",
		"urlName":"knicks",
		"confName":"East",
		"divName":"Atlantic"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Oklahoma City",
		"altCityName":"Oklahoma City",
		"fullName":"Oklahoma City Thunder",
		"tricode":"OKC",
		"teamId":"1610612760",
		"nickname":"Thunder",
		"urlName":"thunder",
		"confName":"West",
		"divName":"Northwest"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Orlando",
		"altCityName":"Orlando",
		"fullName":"Orlando Magic",
		"tricode":"ORL",
		"teamId":"1610612753",
		"nickname":"Magic",
		"urlName":"magic",
		"confName":"East",
		"divName":"Southeast"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Philadelphia",
		"altCityName":"Philadelphia",
		"fullName":"Philadelphia 76ers",
		"tricode":"PHI",
		"teamId":"1610612755",
		"nickname":"76ers",
		"urlName":"sixers",
		"confName":"East",
		"divName":"Atlantic"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Phoenix",
		"altCityName":"Phoenix",
		"fullName":"Phoenix Suns",
		"tricode":"PHX",
		"teamId":"1610612756",
		"nickname":"Suns",
		"urlName":"suns",
		"confName":"West",
		"divName":"Pacific"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Portland",
		"altCityName":"Portland",
		"fullName":"Portland Trail Blazers",
		"tricode":"POR",
		"teamId":"1610612757",
		"nickname":"Trail Blazers",
		"urlName":"blazers",
		"confName":"West",
		"divName":"Northwest"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Sacramento",
		"altCityName":"Sacramento",
		"fullName":"Sacramento Kings",
		"tricode":"SAC",
		"teamId":"1610612758",
		"nickname":"Kings",
		"urlName":"kings",
		"confName":"West",
		"divName":"Pacific"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"San Antonio",
		"altCityName":"San Antonio",
		"fullName":"San Antonio Spurs",
		"tricode":"SAS",
		"teamId":"1610612759",
		"nickname":"Spurs",
		"urlName":"spurs",
		"confName":"West",
		"divName":"Southwest"
	},
	{
		"isNBAFranchise":false,
		"isAllStar":false,
		"city":"Shanghai",
		"altCityName":"Shanghai",
		"fullName":"Shanghai Sharks",
		"tricode":"SDS",
		"teamId":"12329",
		"nickname":"Shanghai Sharks",
		"urlName":"shanghai_sharks",
		"confName":"Intl",
		"divName":""
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Toronto",
		"altCityName":"Toronto",
		"fullName":"Toronto Raptors",
		"tricode":"TOR",
		"teamId":"1610612761",
		"nickname":"Raptors",
		"urlName":"raptors",
		"confName":"East",
		"divName":"Atlantic"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Utah",
		"altCityName":"Utah",
		"fullName":"Utah Jazz",
		"tricode":"UTA",
		"teamId":"1610612762",
		"nickname":"Jazz",
		"urlName":"jazz",
		"confName":"West",
		"divName":"Northwest"
	},
	{
		"isNBAFranchise":true,
		"isAllStar":false,
		"city":"Washington",
		"altCityName":"Washington",
		"fullName":"Washington Wizards",
		"tricode":"WAS",
		"teamId":"1610612764",
		"nickname":"Wizards",
		"urlName":"wizards",
		"confName":"East",
		"divName":"Southeast"
	}
	]
}