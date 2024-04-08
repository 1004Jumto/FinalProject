/*
# latex_expression = "\\frac{(y+1)}{\\frac{3}{x}+b} + (1111-9)\\times3"
# latex_expression = '\\sinx^2 + 2\\times 2 + \\sqrt{x+2} + {2\\div(1/1)}+\\frac{1}{x+1}'
# latex_expression = 'x^2+2x + 1'
# latex_expression = "\\frac{n!}{k!(n-k)!} = \\binom{n}{k} = _{n}\\mathrm{C}_{k}"
# latex_expression = "f^{\\prime}(x)=\lim_{h \\to 0}\\frac{f(x+h)-(x)}{h}"
# latex_expression = "x=\\frac{-b \\pm \\sqrt{b^2 -4ac}}{2a}"
# latex_expression = "\frac{1}{sin\left ( x+1 \right )+y}+1+y"
*/


function classifyChar(char){
    if(!isNaN(char)) return "N";                                        //number
    else if(char.match(/[a-zA-Z]/)) return "A";                         //alphabet
    else if(char == '\\') return "C";                                   //command
    else if(char == "{" || char == "(" || char == "[") return "BO";     //braketOpen
    else if(char == "}" || char == ")" || char == "]") return "BC";     //braketClose
    else if(char.match(/[+\-*=/]/)) return "O";                         //operator
    else return ;
}

let stack = new Array();        // 1차 분해 저장
let latexExpression = 'x=\\frac{-b \\pm \\sqrt{b^2 -4ac}}{2a}';

function Disassemble_first(latex_expression){
    latex_expression = latex_expression.replace(/ /g, '');    // 공백 제거
    var tempStack = new Array();
    var tempAtom = "";

    for (let i = 0; i < latex_expression.length; i++){
        const char =  latex_expression[i];
        tempAtom = tempAtom + char;

        switch(classifyChar(char)){
            case "BO":{
                tempStack.push(char);
                break;
            }
            case "BC":{
                tempStack.pop();
                break;
            }
            case "O":{
                if(tempStack.length == 0){
                    tempAtom = tempAtom.slice(0, -1);
                    stack.push(tempAtom); tempAtom="";
                    stack.push(char);
                    break;
                }
            }
            case "C":{

            }
            default:{
                break;
            }
        }  
    }

    if(tempAtom.length != 0) stack.push(tempAtom);
    
    //     if(classifyChar(char) == "BO") tempStack.push(char);
    //     else if(classifyChar(char)=="BC") tempStack.pop();
    //     else if(classifyChar(char) == "O" && tempStack.length == 0){
    //         tempAtom = tempAtom.slice(0, -1);
    //         stack.push(tempAtom); tempAtom="";
    //         stack.push(char);
    //     } 
    // }


    console.log("<1차 분해>"); 
    console.log(stack); 
}
 
Disassemble_first(latexExpression);
