function showCalendar() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [ 'dayGrid', 'list', 'interaction', 'timeGrid', 'bootstrap' ],
        
        defaultView: 'timeGridWeek',
        themeSysthem: true,
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
        
        eventResize: function(info, event){
            var myURL;
            var data = {};
            data['id'] = info.event.id;
            data['start'] = calendar.formatIso(info.event.start);
            data['end'] = calendar.formatIso(info.event.end);
            if(info.event.extendedProps.type == "dateEvent"){
                var myURL = BACKEND_URL +  "calendar/updateCurrentUserEventFC";
            }else if(info.event.extendedProps.type == "training"){
                var myURL = BACKEND_URL +  "training/updateTrainingFC";
            }
            $.ajax({
                url: myURL,
                type:"PUT",
                dataType: 'json',
                preventData: false,
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('MonToken')
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
                    'Authorization': 'Bearer ' + localStorage.getItem('MonToken'),
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
            $('#modalTitle').html(info.event.title );
            $('#eventStart').html('<strong>Début</strong> : ' + new Date(info.event.start).toLocaleString());
            $('#eventEnd').html('<strong>Fin</strong> : ' + new Date(info.event.end).toLocaleString());
            $('#eventDescription').html('<strong>Description</strong> : ' + info.event.extendedProps.description);
            $('#calendarModal').modal();
        }
    });
    calendar.render();
}

$(document).ready(showCalendar());