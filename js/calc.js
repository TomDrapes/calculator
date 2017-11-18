$(document).ready(function(){
    var equation = "";
    var display = "";
    console.log("connected");

    $("button").click(function(){
        console.log($(this).val());
        switch ($(this).val()){
            case "ac": equation = ""; display = "";
            break;
            case "*": equation += '~&times~'; display += '&times';
            break;
            case "/": equation += '~&divide~'; display += '&divide';
            break;
            case "+": equation += '~+~'; display += '+';
            break;
            case "-": equation += '~-~'; display += '-';
            break;
            case ".": equation += '.'; display += '.';
            break;
            case "=": calculate();
            break;
            default: equation += $(this).val(); display += $(this).val();
        }
        $("#screen").html(display);
    });

    function calculate(){
        console.log("calculating...");
        var elements = equation.split("~");
        console.log(elements);

        //for(var i=0; i<elements.length; i++){
        var i = 0;
        while(elements.includes("&times") || elements.includes("&divide")){
            //debugger;
            if(elements[i] === "&times" || elements[i] === "&divide"){
                switch (elements[i]){
                    case "&times": elements[i] = elements[i-1] * elements[i+1];
                    elements.splice(i-1, 1);
                    elements.splice(i, 1);
                    console.log(elements);
                    break;
                    case "&divide": elements[i]= elements[i-1] / elements[i+1];
                    elements.splice(i-1, 1);
                    elements.splice(i, 1);
                    console.log(elements);
                    break;

                }
            }
            i++;
            if(i>elements.length){
                i=0;
            }
        }
        display = elements[0];
    }
});
