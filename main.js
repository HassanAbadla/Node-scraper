
const startBtn = document.querySelector('.start');
startBtn.addEventListener('click', function() {

    $.get('data.csv', function getData(data) {
        let build = '<div class="grid grid-raws-3 gap-2 justify-center p-8">';
        // var head = data.split("\n");
        var head = data.split('\n');
        console.log(head);
        // var title = head.split('","');
        // console.log(title);
        
        for(let i=0; i<1; i++){
        build += '<div class="hidden" id="1">'+ head[i] + "</div>";
        
        for(let i=1; i<head.length ;i++){
        build += '<div class="bg-gray-100 p-4 rounded-lg border-gray-100" id="3">' + head[i].split('\n') + "</div>";
        }
        }
        build += "</div>";
        $('#wrap').append(build);
        });
    
});


    


