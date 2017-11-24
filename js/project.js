$(document).ready(function() {
	$('.nav-item').click(function() {
		window.location.href = $(this).attr('data-href');
	});
	var currURL = $(location).attr('href');

	if (~currURL.indexOf("index.html")) {
		$('.nav-calendar').addClass('nav-item--active')
	}
	else if (~currURL.indexOf("stats.html")) {
		$('.nav-stats').addClass('nav-item--active')
	}
	else if (~currURL.indexOf("news.html")) {
		$('.nav-news').addClass('nav-item--active')
	}

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
		bootstrapGlyphicons: false,
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
			'<div class="event text-center"><img class="event-team-logo rounded-circle '+event.teams[0]+'" src="'+homeLogo+'" alt=""><img class="event-team-logo rounded-circle '+event.teams[1]+'" src="'+awayLogo+'" alt=""></div>';
			element.append(new_description);
		},
		header: {
			left:   'month basicWeek',
			center: '',
			right:  'prev title next'
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
			bars: [['Barneys', '07:00 PM', '7km'], ['Pub One', '07:00 PM', '8km'], ['Leos', '07:30 PM', '11km']],
			odds: [-155, +30]
		},{	
			id: 'event4',
			title: 'Event4',
			start: '2017/11/24 18:30:00',
			startt: '2017/11/24 18:30:00',
			place: 'Investers Group Field',
			teams: ['IND', 'LAC'],
			hRoster: ['Brook Lopez', 'Larry Nance Jr', 'Brandon Ingram', 'Kentavious Caldwell', 'Lonzo Ball'],
			aRoster: ['Kyle Lowry', 'DeMar DeRozan', 'Norman Powell', 'Serge Ibaka', 'Jonas Valanciunas'],
			cable: [],
			bars: [['Barneys', '07:00 PM', '7km'], ['Pub One', '07:00 PM', '8km'], ['Leos', '07:30 PM', '11km']],
			odds: [-12, +52]
		}
		,{	
			id: 'event5',
			title: 'Event5',
			start: '2017/11/29 22:00:00',
			startt: '2017/11/29 22:0:00',
			place: 'Investers Group Field',
			teams: ['TOR', 'ATL'],
			hRoster: ['Brook Lopez', 'Larry Nance Jr', 'Brandon Ingram', 'Kentavious Caldwell', 'Lonzo Ball'],
			aRoster: ['Kyle Lowry', 'DeMar DeRozan', 'Norman Powell', 'Serge Ibaka', 'Jonas Valanciunas'],
			cable: [],
			bars: [['Barneys', '07:00 PM', '7km'], ['Pub One', '07:00 PM', '8km'], ['Leos', '07:30 PM', '11km']],
			odds: [-20, +36]
		}
		],

		// populate modal
		eventClick: function(event) {
			$('#event-modal').modal();
			$('#event-modal').find('.place').html(event.place);
			$('#event-modal').find('.countdown').countdown(event.startt, function(event) {
				if(parseInt(event.strftime('%D')) == 0) {
					$(this).text(event.strftime('%H:%M:%S'));
				}
				else {
					$(this).text(event.strftime('%D days %H:%M:%S'));
				}
				
				$(this).on('finish.countdown', function() {
				    $(this).text("This game has ended");
				});
			})
			var calendarStatLink = 'index.html?home' + event.teams[0] + '&away' + event.teams[1]
			history.pushState(null, null, calendarStatLink);
			
			var statLink = 'stats.html?home=' + event.teams[0] + '&away=' + event.teams[1]
			$('.modal-stats').attr("href", statLink)
			
			// logos
			$('#event-modal').find('.home > .modal-team-logo').attr('src', teamLogo(event.teams[0]))
			$('#event-modal').find('.away > .modal-team-logo').attr('src', teamLogo(event.teams[1]))

			// odds 
			$('#event-modal').find('.home-odds').html(event.odds[0]);
			$('#event-modal').find('.away-odds').html('+' + event.odds[1]);
			
			// rosters
			// $hRoster = $('#event-modal').find('.home-roster > ul');
			// $.each(event.hRoster, function(i, player) {
			// 	$hRoster.append('<li>' + player + '</li>')
			// });

			teamRoster(event.teams[0], 'home')
			teamRoster(event.teams[1], 'away')
			
			// bars
			// $bars = $('#event-modal').find('.bar > table');
			// $.each(event.bars, function(i, bar) {
			// 	$bars.append('<tr>' + '<td><i class="fa fa-glass" aria-hidden="true"></i></td>' +'<td>'+bar[0]+'</td>' + '<td>' + bar[1] + '</td>' + '<td>' + bar[2] + '</td>' + '</tr>')
			// });
		}
	})

	// fav select
	var favSelect = `<select class="custom-select" id="fav-team">
						<option style="display: none;">Favorite Team</option>
						<option value="BOS">Celtics</option>
						<option value="TOR">Raptors</option>
						<option value="LAL">Lakers</option>
						<option value="ATL">Hawks</option>
					</select>`
	$('.fc-left').append(favSelect);

	// fav-footer display + highlight
	$('#fav-team').change(function() {
		favTeam = $('#fav-team :selected').text()
		favTeamTri = $('#fav-team :selected').val()
		favTeamTriClass = '.'+favTeamTri
		if ($('.fc-event-container').find(favTeamTriClass).length>0) {
			var dayNumber = $(favTeamTriClass).parents('.fc-event-container').index() + 1
			var rightChild = '.fc-bg td:nth-child('+dayNumber+')'
			
			var rightParent = $(favTeamTriClass).parents('.fc-row')
			$('.fc-bg').find('.fav-team--selected').removeClass('fav-team--selected')
			rightParent.find(rightChild).addClass('fav-team--selected')
		}
		else {
			$('.fc-bg').find('.fav-team--selected').removeClass('fav-team--selected')
		}
		
		if (favTeam == "Favorite Team") {
			$('.fav-footer').addClass('d-none');
			$('#calendar').fullCalendar('option', 'height', 700);
		}
		else {
			$('.fav-footer').addClass('d-flex animated')
			$('#calendar').fullCalendar('option', 'height', 580);
		}
		$('.fav-logo').html('<img class="rounded-circle" src="'+teamLogo(favTeamTri)+'" alt=""/>')
		$('.fav-record > span').html(Math.floor(Math.random()*10) + '-' + Math.floor(Math.random()*10))
		$('.fav-standing > span').html(Math.floor(Math.random()*10 + 1))
		var nextOp = ['Washington Wizards', 'Detroit Pistons', 'Atlanta Hawks', 'Orlando Magic', 'Miami Heat', 'Utah Jazz', 'Golden State Warriors']
		$('.fav-nextOp > span').html(nextOp[Math.floor(Math.random()*7)])
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
			url: 'https://stats.nba.com/stats/commonTeamRoster/?teamID='+teamID+'&Season=2017-18&format=jsonp',
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

	function playerPic(playerID, side) {

		$.ajax ({
			url: 'https://stats.nba.com/stats/commonplayerinfo/?playerid=' + playerID,
			dataType:"jsonp",
			success: function(response) {
				var stat = response.resultSets[0].rowSet[0];
				var name = stat[1]
				var lastName = stat[2]
				var tricode = stat[18]
				var pic = 'https://nba-players.herokuapp.com/players/'+lastName+'/'+name

				var styleRight = '<style>.stat-right .stat-player-info::after {background: url('+teamLogo(tricode)+') center center/100% no-repeat;}</style>'
				var styleLeft = '<style>.stat-left .stat-player-info::after {background: url('+teamLogo(tricode)+') center center/100% no-repeat;}</style>'

				if (side == 'left') {
					$('head').append(styleLeft)
					$('.stat-left .stat-player-info').prepend('<img src="'+pic+'" height="150px" width="auto" alt=""/>')
				}
				else {
					$('head').append(styleRight)
					$('.stat-right .stat-player-info').prepend('<img src="'+pic+'" height="150px" width="auto" alt=""/>')
				}

			}
		})
	}

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
		var name = '<h3 class="team-banner-name ml-2">'+triToName(tricode)+'</h3>'
		var logo = '<img class="team-banner-logo ml-2" src="'+teamLogo(tricode)+'" alt=""/>'
		var bannerInner =  logo + name
		var styleRight = '<style>.stat-right .team-banner::after {background: url('+teamLogo(tricode)+') center center/100% no-repeat;}</style>'
		var styleLeft = '<style>.stat-left .team-banner::after {background: url('+teamLogo(tricode)+') center center/100% no-repeat;}</style>'

		$.ajax ({
			url: 'https://stats.nba.com/stats/commonTeamRoster/?teamID=' + teamID + '&Season=2017-18&format=jsonp',
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
				if (side == 'left') {
					$('.stat-left tbody').append(rosterArray)
					$('.stat-left .team-banner').append(bannerInner)
					$('head').append(styleLeft)

				}
				else {
					$('.stat-right tbody').append(rosterArray)
					$('.stat-right .team-banner').append(bannerInner)
					$('head').append(styleRight)
				}
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
		var result = '<tr class="playerFound">'
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
		var loading = '<span class="loading position-absolute"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i> Loading...</span>'
		side == 'left' ? $('.stat-left').append(loading) : $('.stat-right').append(loading)

		$.ajax ({
			url: 'https://stats.nba.com/stats/playerprofilev2/?playerid=' + playerID + '&permode=Totals&format=jsonp',
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

				side == 'left' ? $('.stat-left').find('.loading').remove() : $('.stat-right').find('.loading').remove()
				side == 'left' ? $('.stat-left tbody').append(playerArray) : $('.stat-right tbody').append(playerArray)

				if ($('.stat-left').find('.playerFound').length > 0 && $('.stat-right').find('.playerFound').length > 0) {
					$('.stats-container > h4').after('<a class="btn btn-primary ml-3 mb-2 btn-sm" href="stats.html" role="button">Reset</a>')
				}
			}
		})
	}
	function dd(tricode, side) {
		var name = '<h3 class="team-banner-name ml-2">'+triToName(tricode)+'</h3>'
		var logo = '<img class="team-banner-logo ml-2" src="'+teamLogo(tricode)+'" alt=""/>'
		var advanced = '<button type="button" disabled class="btn btn-primary btn-sm ml-auto mr-3">Advanced Stats</button>'
		var bannerInner =  logo + name + advanced
		var styleRight = '<style>.stat-right .team-banner::after {background: url('+teamLogo(tricode)+') center center/100% no-repeat;}</style>'
		var styleLeft = '<style>.stat-left .team-banner::after {background: url('+teamLogo(tricode)+') center center/100% no-repeat;}</style>'

		var teamID = triToID(tricode);
		var teamStatArray = [];
		var loading = '<span class="loading position-absolute"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i> Loading...</span>'
		side == 'left' ? $('.stat-left').append(loading) : $('.stat-right').append(loading)

		$.ajax({
			url: 'https://stats.nba.com/stats/teamdashboardbygeneralsplits?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlusMinus=N&Rank=N&Season=2017-18&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&Split=general&VsConference=&VsDivision=&TeamID='+teamID,
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
				
				if (side == 'left') {
					$('.stat-left').find('.loading').remove()
					$('.stat-left tbody').append(teamStatArray)
					$('.stat-left .team-banner').append(bannerInner)
					$('head').append(styleLeft)
				}
				else {
					$('.stat-right').find('.loading').remove()
					$('.stat-right tbody').append(teamStatArray)
					$('.stat-right .team-banner').append(bannerInner)
					$('head').append(styleRight)
				}

				if ($('.stat-left').find('.playerFound').length > 0 && $('.stat-right').find('.playerFound').length > 0) {
					$('.stats-container > h4').after('<a class="btn btn-primary ml-3 mb-2 btn-sm" href="stats.html" role="button">Reset</a>')
				}
			}
		})
	}

	function highlight(statLeft, statRight) {
		for (var i = 0; i < statLeft.length; i++) {
			parseInt(statLeft[i][0].innerHTML) > parseInt(statRight[i][0].innerHTML) ? $(statLeft[i]).css('background-color', '#e3dcee') : $(statRight[i]).css('background-color', '#e3dcee')
		}
	}
	
	statConf = `<div class="d-flex w-50 justify-content-center align-items-center stat-conf stat-conf__w"><img class="conf-logo" src="./img/west.gif" alt="WesternLogo"/></div>
				<div class="d-flex w-50 justify-content-center align-items-center stat-conf stat-conf__e"><img class="conf-logo" src="./img/east.gif" alt="EasternLogo"/></div>`

	statTeams = '<div class="d-flex p-4 justify-content-around flex-wrap align-items-center stat-teams"></div>'

	statPlayerList = `<div class="w-100 stat-player-list">
						<div class="team-banner w-100 d-flex align-items-center"></div>
						<table class="table table-hover table-bordered mb-0 table-player">
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
					<div class="d-flex align-items-center stat-player-info">
						<h2 class="stat-player-name ml-3 mt-3"></h2>
						<button type="button" disabled class="btn btn-primary btn-sm ml-auto mr-3 mt-3">Advanced Stats</button>
					</div>
					<table class="table table-bordered w-100 float-right mb-0">
						<tbody>
						</tbody>
					</table>
				</div>`

	statTeam = `<div class="stat-team w-100">
					<div class="team-banner w-100 d-flex align-items-center"></div>
					<table class="table table-bordered w-100 float-right mb-0">
						<tbody>
						</tbody>
					</table>
				</div>`

	statButtons = `<div class="d-flex justify-content-around stat-buttons">
						<button class="btn btn-block mt-3 mx-2" disabled>Position</button>
						<button class="btn btn-block mt-3 mx-2" disabled>Position</button>
					</div>`
	
	$('.pot-player').click(function() {
		function playerSelect(side) {
			if (side == 'left') {
				$('.stat-left .stat-team-list-logo').click(function() {
					$('.left-bc .breadcrumb').append('<li class="breadcrumb-item active" aria-current="page">Player</li>')
					$('.stat-left').html(statPlayerList)
					bb($(this).attr('id'), side)
					displayPlayerStats(side)
				});
			}
			else {
				$('.stat-right .stat-team-list-logo').click(function() {
					$('.right-bc .breadcrumb').append('<li class="breadcrumb-item active" aria-current="page">Player</li>')
					$('.stat-right').html(statPlayerList)
					bb($(this).attr('id'), side)
					displayPlayerStats(side)
				});
			}
		}

		function displayPlayerStats(side) {
			if (side == 'left') {
				$('.stat-left tbody').on("click",".stat-t-player", function() {
					$('.stat-left').html(statPlayer)
					$('.stat-left .stat-player-name').html($(this).find('.stat-t-player-name').html())
					cc($(this).attr('id'), side)
					playerPic($(this).attr('id'), side)
				})
			}
			else {
				$('.stat-right tbody').on("click",".stat-t-player", function() {
					$('.stat-right').html(statPlayer)
					$('.stat-right .stat-player-name').html($(this).find('.stat-t-player-name').html())
					cc($(this).attr('id'), side)
					playerPic($(this).attr('id'), side)
				})
			}
		}
		
		$('.stats-container > h4').html('Compare players')
		$('.breadcrumb').append('<li class="breadcrumb-item active" aria-current="page">Conference</li>')
		$('.pot').remove();
		$('.stat-card').append(statConf)
		$('.stats-container').append(statButtons)

		$('.stat-left > .stat-conf__w').click(function() {
			$('.left-bc .breadcrumb').append('<li class="breadcrumb-item active" aria-current="page">Team</li>')
			$('.stat-left').html(statTeams)
			aa('left', 'west')
			$('.stat-buttons').remove();
			playerSelect('left')
		});
		$('.stat-left > .stat-conf__e').click(function() {
			$('.left-bc .breadcrumb').append('<li class="breadcrumb-item active" aria-current="page">Team</li>')
			$('.stat-left').html(statTeams)
			aa('left', 'east')
			$('.stat-buttons').remove();
			playerSelect('left')
		});
		$('.stat-right > .stat-conf__e').click(function() {
			$('.right-bc .breadcrumb').append('<li class="breadcrumb-item active" aria-current="page">Team</li>')
			$('.stat-right').html(statTeams)
			aa('right', 'east')
			$('.stat-buttons').remove();
			playerSelect('right')
		});
		$('.stat-right > .stat-conf__w').click(function() {
			$('.right-bc .breadcrumb').append('<li class="breadcrumb-item active" aria-current="page">Team</li>')
			$('.stat-right').html(statTeams)
			aa('right', 'west')
			$('.stat-buttons').remove();
			playerSelect('right')
		});
	});

	$('.pot-team').click(function() {
		function teamSelect(side) {
			if (side == 'left') {
				$('.stat-left .stat-team-list-logo').click(function() {
					var logoURL = teamLogo($(this).attr('id'))
					var teamName = triToName($(this).attr('id'))
					$('.stat-left').html(statTeam)
					$('.stat-left img').attr('src', logoURL);
					dd($(this).attr('id'), 'left')
				});
			}
			else {
				$('.stat-right .stat-team-list-logo').click(function() {
					var logoURL = teamLogo($(this).attr('id'))
					var teamName = triToName($(this).attr('id'))
					$('.stat-right').html(statTeam)
					$('.stat-right img').attr('src', logoURL);
					dd($(this).attr('id'), 'right')
				});
			}
		}
		
		$('.stats-container > h4').html('Compare players')
		$('.breadcrumb').append('<li class="breadcrumb-item active" aria-current="page">Conference</li>')
		$('.pot').remove();
		$('.stat-card').append(statConf)
		$('.stats-container').append(statButtons)

		$('.stat-left > .stat-conf__w').click(function() {
			$('.left-bc .breadcrumb').append('<li class="breadcrumb-item active" aria-current="page">Team</li>')
			$('.stat-left').html(statTeams)
			aa('left', 'west')
			$('.stat-buttons').remove();
			teamSelect('left');
		});
		$('.stat-left > .stat-conf__e').click(function() {
			$('.left-bc .breadcrumb').append('<li class="breadcrumb-item active" aria-current="page">Team</li>')
			$('.stat-left').html(statTeams)
			aa('left', 'east')
			$('.stat-buttons').remove();
			teamSelect('left');
		});
		$('.stat-right > .stat-conf__w').click(function() {
			$('.right-bc .breadcrumb').append('<li class="breadcrumb-item active" aria-current="page">Team</li>')
			$('.stat-right').html(statTeams)
			aa('right', 'west')
			$('.stat-buttons').remove();
			teamSelect('right');
		});
		$('.stat-right > .stat-conf__e').click(function() {
			$('.right-bc .breadcrumb').append('<li class="breadcrumb-item active" aria-current="page">Team</li>')
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
		$('.pot').remove();
		$('.stat-card').append(statTeam)
		var homeName = triToName(home)
		var awayName = triToName(away)
		$('.stat-left img').attr('src', teamLogo(home));
		$('.stat-right img').attr('src', teamLogo(away));
		dd(home, 'left')
		dd(away, 'right')
	}

	$('.odds').tooltip()

	//
	// ++++++++++++ NEWS ++++++++++++
	//

	var newsCard = `<div class="card news-card w-75 mb-3" id="" data-view="0" data-vote="" data-time="" data-src="" ">
					<img src="https://via.placeholder.com/600x250" alt="" class="card-img-top news-image">
					<div class="card-body">
						<h4 class="card-title">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus molestiae</h4>
						<p class="card-text d-inline card-time"><small class="text-muted">5 hours ago</small></p>
						<p class="card-text d-inline card-team-name float-right"><small class="text-muted text-capitalize">Celtics</small></p>
					</div>
					<div class="d-flex bg-light justify-content-between align-items-center py-1 px-3 card-actions">
						<div class="card-vote">
							<a class="vote-up" href="#"><span class="oi oi-plus"></span></a>
							<span class="mx-2 vote-count">250</span>
							<a class="vote-down" href="#"><span class="oi oi-minus"></span></a>
						</div>
						<p class="card-text card-source"><small>nbanews.com</small></p>
					</div>
				</div>`

	var youtubeCard = `<div class="card news-card card-youtube w-75 mb-3" id="" data-view="" data-vote="" data-time="" data-src="">
	<div class="card-yt-body d-flex">
		<img src="https://via.placeholder.com/250x150" alt="">
		<div class="mx-3 mt-3">
			<h5 class="mb-0">Lorem ipsum dolor sit amet, elitas Accusamus molestiae</h5>
			<p class="card-text d-inline mr-2 card-channel"><small class="text-muted">NBA</small></p>
			<p class="card-text d-inline mr-2 card-view"><small class="text-muted">25k views</small></p>
			<p class="card-text d-inline card-time"><small class="text-muted">20 hours ago</small></p>
			<p class="card-text card-desc"><small class="text-muted">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt...</small></p>
		</div>
	</div>
	<div class="d-flex bg-light justify-content-between align-items-center py-1 px-3 card-actions">
		<div class="card-vote">
			<a class="vote-up" href="#"><span class="oi oi-plus"></span></a>
			<span class="mx-2 vote-count">250</span>
			<a class="vote-down" href="#"><span class="oi oi-minus"></span></a>
		</div>
	</div>
</div>`


	var newsTeams = ['celtics', 'raptors', 'lakers', 'hawks']
	var newsSidebar = `<a class="btn btn-secondary btn-block btn-sm mt-2 source-button" data-toggle="collapse" href="" aria-expanded="false" aria-controls=""></a>
						<div class="collapse" id="">
							<div class="card">
								<div class="list-group list-group-flush"></div>
							</div>
						</div>`

	// newsSources = {
	// 	stats: {},
	// 	trade: {realgm: 'RealGM', sbnation: 'SBNation', si: 'Sports Illustrated', hoopshype: 'HoopsHype'}, 
	// 	injury: {rotoworld: 'Rotoworld', cbssports: 'CBS Sports', vegasinsider: 'Vegas Insider'},
	// 	gossip: {tmz: 'TMZ', yardbarker: 'Yardbarker', mirror: 'Mirror', theringer: 'The Ringer'},
	// 	author: {billsimmons: 'Bill Simmons', dannychau: 'Danny Chau', johngonzalez: 'John Gonzalez', adrianarowski: 'Adrianarowski'},
	// 	youtube: {},
	// 	highlights: {}
	// }
	var trade = ['realgm', 'sbnation', 'si', 'hoopshype']
	var injury = ['rotoworld', 'cbssports', 'vegasinsider']
	var gossip = ['tmz', 'yardbarker', 'mirror', 'theringer']
	var author = ['billsimmons', 'dannychau', 'johngonzalez', 'adrianarowski']
	var channel = ['nba', 'espn', 'xima', 'deo']
	var newsTexts = [
		'NBA players stuck on the sidelines with new format for World Cup qualifiers',
		'Evan Fournier: "Play Like It\'s a Playoff Game For Us"',
		'East’s early rise NBA surprise',
		'NBA: Heat snap Celtics\' unbeaten run, 4 other NBA win streaks whose end came as a surprise',
		'How Under Armour learned from mistakes to make the Curry 4'
	]


	for (var i = 0; i < 50; i++) {
		$('.news-cards').append(newsCard)
	}
	for (var i = 0; i < 10; i++) {
		$('.news-cards').append(youtubeCard)
	}

	$.each($('.news-card'), function(i, val) {
		imgSrc = './img/'+parseInt(i+1)+'.jpg'
		if (i < 5) {
			$(this).find('.news-image').attr('src', imgSrc)
			$(this).find('h4').html(newsTexts[i])
		}
	})

	$.each($('.news-card'), function(i, val) {
		if (i < 10) {
			$(this).addClass('card-stats')
			i++
		}
		else if (i >= 10 && i < 20) {
			$(this).addClass('card-trade')
			i++
		}
		else if (i >= 20 && i < 30) {
			$(this).addClass('card-injury')
			i++
		}
		else if (i >= 30 && i < 40) {
			$(this).addClass('card-gossip')
			i++
		}
		else if (i >= 40 && i < 50) {
			$(this).addClass('card-author')
			i++
		}
	});
	
	$.each($('.card-trade'), function() {
		var source = trade[Math.floor(Math.random()*trade.length)]
		$(this).addClass(source)
		$(this).find('small').html(source + '.com')
	});
	$.each($('.card-injury'), function() {
		var source = injury[Math.floor(Math.random()*injury.length)]
		$(this).addClass(source)
		$(this).find('small').html(source + '.com')
	});
	$.each($('.card-gossip'), function() {
		var source = gossip[Math.floor(Math.random()*gossip.length)]
		$(this).addClass(source)
		$(this).find('small').html(source + '.com')
	});
	$.each($('.card-author'), function() {
		$(this).addClass(author[Math.floor(Math.random()*author.length)])
	});
	$.each($('.card-youtube'), function() {
		var views = Math.floor(Math.random()*99)
		$(this).addClass(channel[Math.floor(Math.random()*channel.length)])
		$(this).find('.card-view .text-muted').html(views + 'k views')
		$(this).attr('data-view', views)
	});

	$('.vote-up').click(function() {
		event.preventDefault();
		if ($('.vote-down').hasClass('voted')) {
			$('.vote-down').removeClass('voted')
			$(this).next().html(function(i, val) {return +val+1})
		}
		if ($(this).hasClass('voted')) {
			$(this).removeClass('voted')
			$(this).next().html(function(i, val) {return +val-1})
		}
		else {
			$(this).next().html(function(i, val) {return +val+1})
			$(this).addClass('voted')
		}
	})
	$('.vote-down').click(function() {
		event.preventDefault();
		if ($('.vote-up').hasClass('voted')) {
			$('.vote-up').removeClass('voted')
			$(this).prev().html(function(i, val) {return +val-1})
		}
		if ($(this).hasClass('voted')) {
			$(this).removeClass('voted')
			$(this).prev().html(function(i, val) {return +val+1})
		}
		else {
			$(this).prev().html(function(i, val) {return +val-1})
			$(this).addClass('voted')
		}
	})

	$.each($('.news-card'), function() {
		var team = newsTeams[Math.floor(Math.random()*newsTeams.length)]
		$(this).addClass('card-team')
		$(this).find('.card-team-name > small').html(team)
		$(this).addClass(team)
	});

	$.each($('.news-card'), function() {
		var vote = Math.floor(Math.random()*1000)
		var time = Math.floor(Math.random()*23) + 1
		var timeAgo;
		time == 1 ? timeAgo = time + ' hour ago' : timeAgo = time + ' hours ago'
		$(this).attr('data-vote', vote)
		$(this).attr('data-time', time)
		$(this).find('.vote-count').html(vote)
		$(this).find('.card-time > small').html(timeAgo)
	});
	
	$grid = $('.news-cards').isotope({
	  itemSelector: '.news-card',
	  layoutMode: 'vertical',
	  getSortData: {
	  	vote: '[data-vote] parseInt',
	  	time: '[data-time] parseInt',
	  	view: '[data-view] parseInt'
	  },
	  sortAscending: {
	      vote: false,
	      view: false
	  }
	});

	$('.list-group').on('click', '.topic-select', function() {
		event.preventDefault();
		var filterVal = $(this).attr('data-filter')
		$grid.isotope({
			filter: filterVal
		});
	});
	$('.news-sidebar').on('click', '.btn', function() {
		var filterVal = '.' + $(this).attr('data-filter')
		$grid.isotope({
			filter: filterVal
		});
	});

	$('#card-sort').on('click', 'a', function() {
		event.preventDefault();
		var sortValue = $(this).attr('data-sort-value');
  		$grid.isotope({
  			sortBy: sortValue
  		});
	});
	
	$('.news-sidebar').on('click','a.btn', function() {
		$('.news-sidebar').find('.collapse.show').collapse('hide');
	});

	$('.news-sidebar').each( function(i, buttonGroup) {
		var $buttonGroup = $(buttonGroup);
		$buttonGroup.on( 'click', '.topic-select', function() {
			$buttonGroup.find('.primary-color-bg').removeClass('text-white primary-color-bg');
			$(this).addClass('text-white primary-color-bg');
		});
	});
	$('.news-sidebar').each(function(i, buttonGroup) {
		var $buttonGroup = $(buttonGroup);
		$buttonGroup.on('click', '.btn', function() {
			$buttonGroup.find('.btn').removeClass('primary-color-bg');
			$(this).addClass('primary-color-bg')

		});
	});

	$('#card-sort').each( function(i, buttonGroup) {
		var $buttonGroup = $(buttonGroup);
		$buttonGroup.on( 'click', '.dropdown-item', function() {
			$buttonGroup.find('.primary-color-bg').removeClass('text-white primary-color-bg');
			$(this).addClass('text-white primary-color-bg');
			var sortValue = 'Sorted by ' + $(this).text()
			$('.news-content-actions').find('.dropdown-toggle').html(sortValue)
		});
	});
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