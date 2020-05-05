function showCalendar(){
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [ 'dayGrid', 'list', 'interaction', 'timeGrid', 'bootstrap' ],
        themeSystem: 'bootstrap',
        defaultView: 'timeGridWeek',
        titleFormat: {
            month: 'long',
            year: 'numeric',
            day: 'numeric',
            weekday: 'long'
        },
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        timeZone: 'local',
        locale: 'fr',
        buttonText: {
            today:    'Aujourd\'hui',
            month:    'Mois',
            week:     'Semaine',
            day:      'Jour',
            list:     'Liste'
        },
        firstDay: 1,
        eventSources:[
            {
                events: function (info, successCallback, failureCallback) {
                    $.ajax({
                        url: BACKEND_URL + "calendar/getCurrentUserEvents",
                        type: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('MonToken')
                        }, success: function (response) {
                            successCallback(response);
                        }
                    })
                },
            },
            {
                editable: false,
                selectable: false,
                selectHelper: false,
                events: function (info, successCallback, failureCallback) {
                    $.ajax({
                        url: BACKEND_URL + "training/getAllTrainingFC",
                        type: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('MonToken')
                        }, success: function (response) {
                            successCallback(response);
                        }
                    });
                },
            }
        ],
        editable: true,
        selectable:true,
        selectHelper:true,
        select: function(event)
        {
            var title = prompt("Saisir le titre de votre evenement");
            var description = prompt("Saisir la description de votre event");
            if(title){
                var start = calendar.formatIso(event.start);
                var end = calendar.formatIso(event.end);
                $.ajax({
                    url: BACKEND_URL + "calendar/newCurrentUserEvent",
                    type:"POST",
                    headers:{
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                    },
                    data:{title:title, start:start, end:end, description:description},
                    success:function()
                    {
                        var refetch = calendar.refetchEvents();
                        alert("evenement ajoute avec succes");
                    }
                });
            }
        },

        eventResize: function(info, event){
            var myURL;
            var data = {};
            data['id'] = info.event.id;
            data['start'] = calendar.formatIso(info.event.start);
            data['end'] = calendar.formatIso(info.event.end);
            var myURL = BACKEND_URL + "calendar/updateCurrentUserEventFC";
            $.ajax({
                url: myURL,
                type:"PUT",
                dataType: 'json',
                preventData: false,
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
                data: JSON.stringify(data),
                success:function(){
                    var refetch = calendar.refetchEvents();
                    alert('evenement mise a jour');
                }
            });
        },

        eventDrop:function(info)
        {
            var data = {};
            data['id'] = info.event.id;
            data['start'] = calendar.formatIso(info.event.start);
            data['end'] = calendar.formatIso(info.event.end);
            $.ajax({
                url: BACKEND_URL + "calendar/updateCurrentUserEventFC",
                type:"PUT",
                dataType: 'json',
                preventData: false,
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                },
                data: JSON.stringify(data),
                success:function()
                {
                    var refetch = calendar.refetchEvents();
                    alert("evenement mise a jour");
                }
            });
        },

        eventClick:function(info, jsEvent, view) {
            $('#modalTitle').html('<h1>Titre : </h1>' + info.event.title);
            $('#eventStart').html('Début : ' + info.event.start);
            $('#eventEnd').html('Fin : ' + info.event.end);
            $('#eventDescription').html(info.event.extendedProps.description);
            $('#calendarModal').modal();
        },

        windowResize: function(view) {
            alert('The calendar has adjusted to a window resize');
        }
    });
    calendar.render();
}

$(document).ready(showCalendar());