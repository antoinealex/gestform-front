$(document).ready(function() {
    var calendar = $('#calendar').fullCalendar({
        monthNames: ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
        monthNamesShort: ['Jan','Fev','Mar','Avr','Mai','Jun','Jui','Aoû','Sep','Oct','Nov','Déc'],
        dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
        dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
        editable:true,
        header:{
            left:'prev,next today',
            center:'title',
            right:'month,agendaWeek,agendaDay'
        },
        eventSources: [
            {
                url:"https://gestform.ei-bs.eu/user/getCurrentUser",
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('MyUniqueUserToken')
                }
            }
        ],
        selectable:true,
        selectHelper:true,
        select: function(start, end, allDay)
        {
            var title = prompt("Saisir le titre de votre evenement");
            var description = prompt("Saisir la description de votre event");
            if(title){
                var start = $.fullCalendar.formatDate(start, "Y-MM-DD HH:mm:ss");
                var end = $.fullCalendar.formatDate(end, "Y-MM-DD HH:mm:ss");
                $.ajax({
                    url:"https://gestform.ei-bs.eu/calendar/getCurrentUserEvents",
                    type:"POST",
                    headers:{
                        'Authorization': 'Bearer ' + localStorage.getItem('MyUniqueUserToken')
                    },
                    data:{title:title, start:start, end:end, description:description},
                    success:function()
                    {
                        calendar.fullCalendar('refetchEvents');
                        alert("evenement ajoute avec succes");
                    }
                });
            }
        },
        editable:true,
        eventResize:function(event)
        {
            var data = {};
            data['id'] = event.id;
            data['start'] = $.fullCalendar.formatDate(event.start, "Y-MM-DD HH:mm:ss");
            data['end'] = $.fullCalendar.formatDate(event.end, "Y-MM-DD HH:mm:ss");
            $.ajax({
                url:"https://gestform.ei-bs.eu/calendar/updateCurrentUserEvent",
                type:"PUT",
                dataType: 'json',
                preventData: false,
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('MyUniqueUserToken')
                },
                data: JSON.stringify(data),
                success:function(){
                    calendar.fullCalendar('refetchEvents');
                    alert('evenement mise a jour');
                }
            });
        },

        eventDrop:function(event)
        {
            var data = {};
            data['id'] = event.id;
            data['start'] = $.fullCalendar.formatDate(event.start, "Y-MM-DD HH:mm:ss");
            data['end'] = $.fullCalendar.formatDate(event.end, "Y-MM-DD HH:mm:ss");
            $.ajax({
                url:"https://gestform.ei-bs.eu/calendar/updateCurrentUserEvent",
                type:"PUT",
                dataType: 'json',
                preventData: false,
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('MyUniqueUserToken'),
                },
                data: JSON.stringify(data),
                success:function()
                {
                    calendar.fullCalendar('refetchEvents');
                    alert("evenement mise a jour");
                }
            });
        },

        eventClick:function(event)
        {
            if(confirm("Etes-vous sûr de vouloir supprimer cet evenement ?"))
            {
                var data = {};
                data['eventId'] = event.id;
                $.ajax({
                    url:"https://gestform.ei-bs.eu/calendar/deleteCurrentUserEvent",
                    type:"DELETE",
                    dataType: 'json',
                    preventData: false,
                    headers:{
                        'Authorization': 'Bearer ' + localStorage.getItem('MyUniqueUserToken') 
                    },
                    data: JSON.stringify(data),
                    success:function()
                    {
                        calendar.fullCalendar('refetchEvents');
                        alert("Evenement supprimé !");
                    }
                });
            }
        },
    });
});