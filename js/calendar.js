$(document).ready(function() {
    var token = localStorage.getItem('MonToken');
    var calendar = $('#calendar').fullCalendar({
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
        editable:true,
        header:{
            left:'prev,next today',
            center:'title',
            right:'month,agendaWeek,agendaDay'
        },
        eventSources: [
            {
                url:"https://gestform.ei-bs.eu/calendar/getCurrentUserEvents",
                headers:{
                    //'Authorization': 'Bearer ' + localStorage.getItem('MonToken')
                    Authorization:  `Bearer ${ token }`
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
                    url:"https://gestform.ei-bs.eu/calendar/newUserEvent",
                    type:"POST",
                    headers:{
                        //'Authorization': 'Bearer ' + localStorage.getItem('MonToken')
                        Authorization:  `Bearer ${ token }` 
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
                url:"https://gestform.ei-bs.eu/calendar/updateCurrentUserEventFC",
                type:"PUT",
                dataType: 'json',
                preventData: false,
                headers:{
                    //'Authorization': 'Bearer ' + localStorage.getItem('MonToken')
                    Authorization:  `Bearer ${ token }` 
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
                url:"https://gestform.ei-bs.eu/calendar/updateCurrentUserEventFC",
                type:"PUT",
                dataType: 'json',
                preventData: false,
                headers:{
                    //'Authorization': 'Bearer ' + localStorage.getItem('MonToken'),
                    Authorization:  `Bearer ${ token }` 
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
                    url:"https://gestform.ei-bs.eu/calendar/deleteCurrentUserEventFC",
                    type:"DELETE",
                    dataType: 'json',
                    preventData: false,
                    headers:{
                        Authorization:  `Bearer ${ token }` 
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