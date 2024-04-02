// Dictionary : \명령어에 따른 정규표현식 데이터 저장
var commandDict = {}
dictObject['\\frac'] = '';




























// JavaScript에서는 정규 표현식 리터럴을 사용합니다.
const simplePattern = /[+\-=!()\[\]\/\}_^]/;
const digitPattern = /\d/;
const wordPattern = /[a-zA-Z]/;

// 한글 변환 데이터 (파이썬의 data 객체를 하드코딩)
const koreanData = {
    operator: {
        "+": "플러스",
        "-": "마이너스",
        "=": "은",
        "!": "낫?부정?느낌표",
        "/": "나누기",
        "(": "괄호 열고",
        ")": "괄호 닫고",
        "[": "대괄호 열고",
        "]": "대괄호 닫고",
        "\\pm": "플러스마이너스",
        "\\div": "나누기",
        "\\times": "곱하기",
        "\\sqrt{": "루트 시작",
        "\\frac{": "분수 시작",
        "\\sin": "싸인",
        "\\right(": "괄호 시작"
    },
    word: {
        "a": "에이",
        "b": "비",
        "c": "씨",
        "x": "엑스",
        "y": "와이",
        "A": "대문자 에이",
        "B": "대문자 비",
        "C": "대문자 씨"
    }
};




function isOperatorOnly(char) {
    const zeroOperandPattern = /\\(?:sum|log|sin|cos|tan|ln|exp|min|max|times|div|pm)\b/;
    const singleOperandPattern = /\\(?:sqrt|_|^|left|right|frac){\b|_\{.*?\}|\^\{.*?\}/;
    return simplePattern.test(char) || zeroOperandPattern.test(char) || singleOperandPattern.test(char);
}

function isContainedOperand(formula) {
    return simplePattern.test(formula) && digitPattern.test(formula) && wordPattern.test(formula);
}

// 문자열을 한글로 변환하는 함수
function convertToKorean(element) {
    if (koreanData.operator[element]) {
        return koreanData.operator[element];
    } else if (koreanData.word[element]) {
        return koreanData.word[element];
    } else {
        return element;
    }
}


function Convert(){
    // LaTeX 표현식
    let latexExpression = '\\sinx^2+2\\times2+\\sqrt{x+2}+{2\\div(1/1)}+\\frac{1}{x+1}';
    latexExpression = latexExpression.replace(/ /g, ''); // 공백 제거

    let checkIsDigit = false;
    let checkWord = false;
    let formula = []; // 연산자 구분
    let tempFor = "";

    for (let i = 0; i < latexExpression.length; i++) {
        const char = latexExpression[i];

        if (checkIsDigit && !/\d/.test(char)) {
            formula.push(tempFor);
            tempFor = ""; 
        }

        tempFor += char;
        if (isContainedOperand(tempFor)) {
            checkIsDigit = false;
            const match = tempFor.match(/([+\-=!()\[\]\/\}_^])/);
            formula.push(tempFor.split(match[1])[0]);
            formula.push(match[1]);
            tempFor = "";
        } else if (isOperatorOnly(tempFor)) {
            checkIsDigit = false;
            formula.push(tempFor);
            tempFor = "";
        } else if (/\d/.test(tempFor)) {
            checkIsDigit = true;
        } else {
            checkIsDigit = false;
        }
    }

    if (tempFor.length !== 0) {
        formula.push(tempFor);
    }
    console.log(formula);
    // 변환된 요소를 저장할 배열
    const koreanFormulaList = formula.map(convertToKorean);

    console.log(koreanFormulaList);
    document.getElementById("output").value = koreanFormulaList;
}
