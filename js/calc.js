$(document).ready(function(){
    var equation = "";
    var display = "";
    console.log("connected");

    $("button").click(function(){
        console.log("Value clicked: "+$(this).val());
        console.log("Equation: "+equation);
        console.log("type: "+typeof equation);
        var split = equation.replace(/~/g, "");
        console.log("split: "+split);
        

        if(split.length < 13 || equation.length === 0 
            || $(this).val() === "ac" || $(this).val() === "="){
            switch ($(this).val()){
                case "ac": equation = ""; display = "";
                break;
                case "*": if(equation.charAt(equation.length-1) !== '~' &&
                equation.charAt(equation.length-1) !== '.' && 
                equation.length !== 0){equation += '~*~'; display += '&times'};
                break;
                case "/": if(equation.charAt(equation.length-1) !== '~' &&
                equation.charAt(equation.length-1) !== '.' && 
                equation.length !== 0){equation += '~/~'; display += '&divide'};
                break;
                case "+": if(equation.charAt(equation.length-1) !== '~' &&
                equation.charAt(equation.length-1) !== '.' &&
                equation.length !== 0){equation += '~+~'; display += '+'};
                break;
                case "-": if(equation.charAt(equation.length-1) !== '~' &&
                equation.charAt(equation.length-1) !== '.' &&
                equation.length !== 0){equation += '~-~'; display += '-'};
                break;
                case ".": if(equation.charAt(equation.length-1) !== '~' &&
                equation.charAt(equation.length-1) !== '.' &&
                equation.length !== 0){equation += '.'; display += '.'};
                break;
                case "=": calculate();
                break;
                default: equation += $(this).val(); display += $(this).val();
            }
            $("#screen").html(display);
        }        
    });

    function calculate(){

        var elements = equation.split("~");
        
        function orderOperations(op1, op2){
            var i = 0;
            while(elements.includes(op1) || elements.includes(op2)){                
                if(elements[i] === op1 && op1 === "*" || elements[i] === op2 && op2 === "/"){
                    switch (elements[i]){
                        case op1: elements[i] = (elements[i-1] * elements[i+1]).toString();
                        elements.splice(i-1, 1);
                        elements.splice(i, 1);
                        console.log(elements);
                        i=0;
                        break;
                        case op2: elements[i]= (elements[i-1] / elements[i+1]).toString();
                        elements.splice(i-1, 1);
                        elements.splice(i, 1);
                        console.log(elements);
                        i=0;                      
                        break;
                    }
                }else if(elements[i] === op1 && op1 === "+" || elements[i] === op2 && op2 === "-"){
                    switch (elements[i]){                        
                        case op1: elements[i] = (parseFloat(elements[i-1]) + parseFloat(elements[i+1])).toString();
                        elements.splice(i-1, 1);
                        elements.splice(i, 1);
                        console.log(elements);
                        i=0;
                        break;
                        case op2: elements[i]= (parseFloat(elements[i-1]) - parseFloat(elements[i+1])).toString();
                        elements.splice(i-1, 1);
                        elements.splice(i, 1);
                        console.log(elements);
                        i=0                     
                        break;
                    }
                }
                i++;
                if(i>elements.length){
                    i=0;
                }
            }
        }
        orderOperations("*", "/");
        orderOperations("+", "-");
        //debugger;
        if(elements[0].toString().length > 14){
            display = elements[0].slice(0, 10);
            equation = elements[0].slice(0, 10);
            //console.log("here: "+ typeof equation);
        }else{
            display = elements[0];        
            equation = elements[0];
        }
        
    }
});
