/**
 * 
 */
//**** THE jQuery Code implemented at index.html file ****//
/**
 * 
 */

 /********** to do
  * 
  * make all field required
  */
 //$('.form-control:required').parent().append('<span>*</span>');
function log (msg){
    console.log(msg);
}

$(document).ready(function (){
// space = 32 keyCode


$('select').click(function(){

    $(this).next('label').css({top: '-18px',fontSize: '18px',left:'0px'})

});

$('input').click(function(){

    $(this).next('label').css({top: '-18px',fontSize: '18px',left:'0px'})

});



let tagsToServer=[],                                // array that travel to the server
country = $('#country'),                            // country input field
city = $('#city'),                                  // city input field
dateOfBirth = $('#date_of_birth'),                  // date of birth field
maleCheckbox = $('#male'),                          // Male Radio Button
femaleCheckbox = $('#female'),                      // female Radio Button
maleQues = $('#male_question').val(),                     // male question
femaleQues = $('#female_question').val();                 // female question

    // datepicker at dateOfBirth Input Field
    dateOfBirth.datepicker({
        dateFormat: "yy-mm-dd"
      });

   // list countries in options

   $.getJSON('https://medicoapitask.herokuapp.com/getCountries', function(countries){

        for (let i = 0; i < countries.length; i++) {
            country.append(`<option value='${countries[i].id}'>${countries[i].name}</option>`);            
        }
    });

    $('#country').click(function(){
        if ( $(this).val() == 1 ){
             // list cities depend on country
           $.getJSON(`https://medicoapitask.herokuapp.com/getCities/${$(this).val()}`, function(cities){
            log(cities);
            for (let i = 0; i < cities.length; i++) {
                city.append(`<option value='${cities[i].id}'>${cities[i].name}</option>`);
            }
        });
        }
    })
   


    $('#gender').click(function(){
    if( $('#male').is(':checked') ){
        $('#male-question').css({display: 'flex'})
        $('#female-question').css({display: 'none'})
    }else if($('#female').is(':checked')){
        $('#male-question').css({ display: 'none'})
        $('#female-question').css({ display: 'flex'})
    }
});


    $("#button").click(function(e){ // ajax post method on button

      // to prevent its default behaviour (submit)
    
     
        function gender(){
            if( $('#male:checked').length > 0 ){
                return 'Male'
            } else if( $('#female:checked').length > 0) {
                return 'Female'
            }
        }
        
        function getmaleQues(){
            let condition = $('#male_question').val() ? true : false;
            if(condition){
                return $('#male_question').val()
            } else{
                return null
            }
        }
        function getfemaleQues(){
            let condition = $('#female_question').val() ? true : false;
            if(condition){
                return $('#female_question').val()
            } else{
                return null
            }
        }

        // required fields validation
        if($('#name').val() == "" || country.val() == "" || city.val() == "" || dateOfBirth.val() == "" ){
            return alert('complete the required fields')
        }
        

        let data = {
            name: $('#name').val(),
            country_id: country.val(),
            city_id: city.val(),
            date_of_birth: dateOfBirth.val(), 
            gender: gender(), 
            male_question: getmaleQues(),
            female_question: getfemaleQues()
            };

            log(data)
    
        $.ajax({ // ajax POST method calling the server an post data
            type:"POST",
            url:"https://medicoapitask.herokuapp.com/submitPatient",
            data: JSON.stringify(data),
            contentType:'application/json',
            dataType:"json",
            success: function(result){ // if the post success this function will append the whole result that posted to the user
                log( result)
                $('.data').append(`
                 <section>
                    <div>
                        <label>title: </label>
                        <span>${result.name}</span>
                    </div>
                    <div>
                        <label>author: </label>
                        <span>${result.country_id}</span>
                    </div>
                    <div>
                        <label>tags: </label>
                        <span>${result.city_id}</span>
                    </div>
                    <div>
                    <label>price: </label>
                        <span>${result.date_of_birth}</span>
                        </div>
                    <div>
                        <label>isPublished: </label>
                        <span>${result.gender}</span>
                    </div>
                 </section>
                `);
                
            },
            error: function(err){ // if there's an error this function will excute
                console.log(err);
                
            }
            
        });
        
        function clearvalues(){ // after submitting data this function will clear all input fields
            $('#male_question').val('');
            $('#female_question').val('');
            $('#name').val('');
            $('#date_of_birth').val('');
        }
        clearvalues();
       
    });




});

