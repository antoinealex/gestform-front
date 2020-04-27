















/*********************GET**************************/

/****************getAllTraining********************/
$(document).ready(function (){
    
    var courses = $('.courses')
    var token = localStorage.getItem('MyUniqueUserToken');

    $.ajax({
        url: 'https://gestform.ei-bs.eu/training/getAllTraining',
        type: 'GET',
        datatype: 'JSON',
        contentType: "application/json",
        headers: { Authorization: `Bearer ${ token }`},
        success: function(training){
            console.log("success GET")
            $.each(training, function(i, training){
                courses.append('\
                <li>\
                    <h3 name="sujet" class="course-title"><a href="#">' + training.subject + '</a></h3>\
                    <div class="course-meta">\
                    <span class="id">id n°:'+ training.id +'</span>\
                        <span class="date"><i class="icon-calendar"></i>'+ training.startTraining +'</span>\
                        <span class="time"><i class="icon-clock"></i>'+ training.endTraining +'</span>\
                        <button id='+ training.id +' type="button" class="btn btn-success">Afficher</button>\
                        <button id='+ training.id +' type="button" class="btn btn-primary">Editer</button>\
                        <button id='+ training.id + ' type="button" class="btn btn-danger">Supprimer</button>\
                </div>\
                </li>\
                ')
            })
        },
        error : function( jqXHR, textStatus, errorThrown ){
            alert( textStatus, errorThrown );
        },
        complete : function( jqXHR, textStatus ){
            console.log( textStatus );
        }
    });
});

/****************getTrainingById********************/
$(document).on('click',".btn-success", function (){
    var token = localStorage.getItem('MyUniqueUserToken');
    event.preventDefault();
    var id = $(this).attr('id');
    $.ajax({
        url: 'https://gestform.ei-bs.eu/training/getTrainingById?id=' + id,
        type: 'GET',
        datatype: 'JSON',
        contentType: "application/json",
        headers: { Authorization: `Bearer ${ token }`},
        
        success: function(training) {
            console.log(id);
            $('.modal-content').append('\
            <header>\
                <h2 class="entry-title">Détail du cours</h2>\
            </header>\
            <form class="editTraining">\
                <div class="field">\
                    <label for="date">training id n°:</label>\
                    <div class="control"><p>'+ training.id +'<\p></div>\
                </div>\
                <div class="field">\
                    <label for="id">Choisir un professeur</label>\
                    <div class="control"><p>'+ training.teacher +'<\p></div>\
                </div>\
                <div class="field">\
                    <label for="date">Date et heure de début</label>\
                    <div class="control"><p>'+ training.startTraining +'</p></div>\
                </div>\
                <div class="field">\
                    <label for="date">Date et heure de fin</label>\
                    <div class="control"><p>'+ training.endTraining +'</p></div>\
                </div>\
                <div class="field">\
                    <label for="text">Nombre d\'étudiants maximum</label>\
                    <div class="control"><p>'+ training.maxStudent +'<\p></div>\
                </div>\
                <div class="field">\
                    <label for="text">Prix par étudiant</label>\
                    <div class="control"><p>'+ training.pricePerStudent +'€<\p></div>\
                </div>\
                <div class="field">\
                    <label for="text">description du cours</label>\
                    <div class="control"><p>'+ training.trainingDescription +'<\p></input>\
                </div>\
                <div class="field">\
                    <label for="text">Sujet</label>\
                    <div class="control"><p>'+ training.subject +'<\p></input>\
                </div>\
                <span class="modal-close">fermer</span>\
            </form>\
            ')

        },
        error : function( jqXHR, textStatus, errorThrown ){
            alert( textStatus, errorThrown );
        },
        complete : function( jqXHR, textStatus ){
            console.log( textStatus );
        }
    });
});

    
/*********************POST**************************/

/****************addTraining********************/
$("form.newTraining").on('submit', function (){
    event.preventDefault();

    var token = localStorage.getItem('MyUniqueUserToken');

    data = {};
    
    $.ajax({
        url: 'https://gestform.ei-bs.eu/training/addTraining',
        type: 'POST',
        headers: { Authorization: `Bearer ${ token }`},
        data: {
            teacher_id: $("input[name = teacher]").val(),
            start_training: $("input[name = startTraining]").val(),
            end_training: $("input[name = endTraining]").val(),
            max_student: $("input[name = maxStudent]").val(),
            price_per_student: $("input[name = pricePerStudent]").val(),
            training_description: $("input[name = trainingDescription]").val(),
            subject: $("input[name = subject]").val()
        },
            success: function(response){
            location.reload(true);
            //$('.courses').load("../gestform-front/course.html .courses") //insert la page entiere dans la div

        },
        error : function( jqXHR, textStatus, errorThrown ){
            alert( textStatus, errorThrown );
        },
        complete : function( jqXHR, textStatus ){
            console.log( textStatus );
        }
    });
});

/*********************PUT**************************/

/****************updateTraining********************/

$(document).on('click',".btn-primary", function (){
    var token = localStorage.getItem('MyUniqueUserToken');
    event.preventDefault();
    var id = $(this).attr('id');

    $.ajax({
        url: 'https://gestform.ei-bs.eu/training/getTrainingById?id=' + id,
        type: 'GET',
        datatype: 'JSON',
        contentType: "application/json",
        headers: { Authorization: `Bearer ${ token }`},
        
        success: function(training) {
            console.log(id);
            $('.modal-content').append('\
            <header>\
                <h2 class="entry-title">Modifier un cours</h2>\
            </header>\
            <form class="editTraining">\
                <div class="field">\
                    <label for="id">id</label>\
                    <div class="control"><input type="text" id="trainingId" name="trainingId" value="'+ training.id +'"></div>\
                </div>\
                <div class="field">\
                    <label for="id">Choisir le professeur</label>\
                    <div class="control"><input type="text" id="teacherId" name="teacherId" value="'+ training.teacher +'"></div>\
                </div>\
                <div class="field">\
                    <label for="text">Date de début</label>\
                    <div class="control"><input type="datetime-local" id="startTraining" name="startTraining" value="'+ training.startTraining +'"></div>\
                </div>\
                <div class="field">\
                    <label for="text">Date de fin</label>\
                    <div class="control"><input type="datetime-local" id="endTraining" name="endTraining" value="'+ training.endTraining +'"></div>\
                </div>\
                <div class="field">\
                    <label for="text">Nombre d\'étudiants maximum</label>\
                    <div class="control"><input type="text" id="maxStudent" name="maxStudent" value="'+ training.maxStudent +'"></div>\
                </div>\
                <div class="field">\
                    <label for="text">Prix par étudiant</label>\
                    <div class="control"><input type="text" id="pricePerStudent" name="pricePerStudent" value="'+ training.pricePerStudent +'"><p>€</p></div>\
                </div>\
                <div class="field">\
                    <label for="text">description du cours</label>\
                    <div class="control"><input type="text" id="trainingDescription" name="trainingDescription" value="'+ training.trainingDescription +'"></input>\
                </div>\
                <div class="field">\
                    <label for="text">Sujet</label>\
                    <div class="control"><input type="text" id="subject" name="subject" value="'+ training.subject +'"></input>\
                </div>\
                <div class="field">\
                    <div class="control"><input type="submit" id="editTraining" value="Mettre à jour"></div>\
                </div>\
                <span class="modal-close">fermer</span>\
            </form>\
            ')

        },
        error : function( jqXHR, textStatus, errorThrown ){
            alert( textStatus, errorThrown );
        },
        complete : function( jqXHR, textStatus ){
            console.log( textStatus );
        }
    });
    $(document).on('click',"#editTraining", function (){
        var token = localStorage.getItem('MyUniqueUserToken');
        event.preventDefault();
        trainingData = {
            "id": $("#trainingId").val(),
            "teacher_id": $("#teacherId").val(),
            "startTraining": $("#startTraining").val(),
            "endTraining": $("#endTraining").val(),
            "max_student": $("#maxStudent").val(),
            "pricePerStudent": $("#pricePerStudent").val(),
            "trainingDescription": $("#trainingDescription").val(),
            "subject": $("#subject").val()
        };

        $.ajax({
            url: 'https://gestform.ei-bs.eu/admin/updateTraining',
            type: 'PUT',
            dataType: 'json', //text
            contentType: "application/json",
            processData: false,
            headers: { Authorization: `Bearer ${ token }`},
            data: JSON.stringify(trainingData),
                success: function(response){
                    console.log(response);
                //location.reload(true);
    
            },
            error : function( jqXHR, textStatus, errorThrown ){
                alert( textStatus, errorThrown );
            },
            complete : function( jqXHR, textStatus ){
                console.log( textStatus );
            }
        });
    });
});


/*********************DELETE**************************/

/****************deleteTraining********************/
    $(document).on('click',".btn-danger", function (){
        var token = localStorage.getItem('MyUniqueUserToken');
        event.preventDefault();
        
        $(this).text('Chargement');
        $.ajax({
            url: 'https://gestform.ei-bs.eu/admin/deleteTraining?id=' + $(this).attr('id'),
            type: 'DELETE',
            headers: { Authorization: `Bearer ${ token }`},
            
            success: function(response) {
                location.reload(true);
            },
            error : function( jqXHR, textStatus, errorThrown ){
                alert( textStatus, errorThrown );
            },
            complete : function( jqXHR, textStatus ){
                console.log( textStatus );
            }
        });
    });

