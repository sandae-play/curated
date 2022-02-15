// 
// Your previous JavaScript content is preserved below:
// 
// /*
// Review the following operations:
// 
// addition(p1,p2) - takes two arguments and returns the sum of the two arguments.
// subtraction(p1,p2) - takes two arguments and returns the difference of the two arguments.
// multiplication(p1,p2) - takes two arguments and returns the result from multiplying the two arguments.
// absoluteValue(p1) - takes one argument and returns its absolute value.
// 
// An argument (p) can be an integer or another expression.
// 
// For example:
// calculate("multiplication(13, 5)") returns 65
// calculate("subtraction(addition(23, 1), multiplication(2, 4))") returns 16
// calculate("absoluteValue(addition(addition(16296,78),subtraction(multiplication(-1,5263),40)))") returns 11071
// 
// Note:
// "multiplication(13, 5)"
// and "subtraction(addition(23, 1), multiplication(2, 4))"
// and "absoluteValue(addition(addition(16296,78),subtraction(multiplication(-1,5263),40)))"
// are all STRINGS
// 
// Implement the calculate function.
// The result of the calculate function will be an integer.
// Do not use Javascript's eval() or any Node Libraries
// 
// Please do all your work here
// */
// 
// 
// 
// 

/////// MATH
function addition(...params: number[]) {
  return params.reduce((total, num) => total + num, 0);
}

function subtraction(...params: number[]) {
  return params.reduce((total, num) => total - num);
}

function multiplication(...params: number[]) {
  return params.reduce((total, num) => total * num);  
}

function absoluteValue(num: number) {
  return Math.abs(num);
}
/////// END MATH


/////// LIB

const REGEX = /(addition|multiplication|subtraction)\(\s*([-]?\d+)\s*,\s*([-]?\d+)\s*\)/s;
const MONO_REGEX = /(absoluteValue)\(\s*([-]?\d+)\s*\)/s;

const funcMapping: { [k: string]: Function } = {
  addition: addition,
  subtraction: subtraction,
  multiplication: multiplication
};

const dualFuncMapping: { [k: string]: Function } = {
  addition: addition,
  subtraction: subtraction,
  multiplication: multiplication
};

const monoFuncMapping: { [k: string]: Function } = {
  absoluteValue: absoluteValue
}

function isMono(str: string): boolean {
  const response = str.match(MONO_REGEX);
  
  return (response?.length === 3);
}

function isDual(str: string): boolean {
  const response = str.match(REGEX);
  
  return (response?.length === 4);
}

function match(str: string): boolean {
  return isDual(str) || isMono(str);
}

interface ParsedResult {
  type: string;
  pattern: string;
  operation: Function;
}

interface MonoParsedResult extends ParsedResult {
  operand: number;
}

interface DualParsedResult extends ParsedResult {
  operand1: number;
  operand2: number;
}

function isMonoResult(res: ParsedResult): res is MonoParsedResult {
  return res.type === 'mono';
}

function isDualResult(res: ParsedResult): res is DualParsedResult {
  return res.type === 'dual';  
}

function parseMono(str: string): MonoParsedResult {
  const result = str.match(MONO_REGEX);
  
  if (result === null) throw new Error('Invalid operation');
  
  const pattern: string = result.shift() || '';
  const operation: string = result.shift() || '';
  const operand: number = parseInt(result.shift() || '0');
  
  if (operation === '') throw new Error("Invalid operation"); 
  if (pattern === '') throw new Error("Invalid pattern");
  
  return {
    type: 'mono',
    pattern,
    operation: monoFuncMapping[operation],
    operand
  }
}

function parseDual(str: string): DualParsedResult {
  const result = str.match(REGEX);
  
  if (result === null) throw new Error('Invalid operation');
  
  const pattern: string = result.shift() || '';
  const operation: string = result.shift() || '';
  const operand1: number = parseInt(result.shift() || '0');
  const operand2: number = parseInt(result.shift() || '0');
  
  if (operation === '') throw new Error("Invalid operation"); 
  if (pattern === '') throw new Error("Invalid pattern");
  
  return {
    type: 'dual',
    pattern,
    operation: dualFuncMapping[operation],
    operand1,
    operand2
  }
}

function parse(str: string): DualParsedResult | MonoParsedResult {
  if (isDual(str)) {
    return parseDual(str);
  }
  
  if (isMono(str)) {
    return parseMono(str);
  }
  
  throw new Error("Parsing failed");
}

function doOperation<T extends ParsedResult>(parsed: T) {
  if (isMonoResult(parsed)) return parsed.operation.call(null, parsed.operand);
  if (isDualResult(parsed)) return parsed.operation.call(null, parsed.operand1, parsed.operand2);
  
  throw new Error("Unknown operation");
}

////// END LIB

function calculate(str: string): number {
   if (match(str)) {
     const parsed = parse(str);
     return calculate(str.replace(parsed.pattern, doOperation(parsed)));
   } else {
     return parseInt(str);
   }
   
 }

console.log(calculate("multiplication(13, 5)"));
console.log(calculate("subtraction(addition(23, 1), multiplication(2, 4))"));
console.log(calculate("absoluteValue(addition(addition(16296,78),subtraction(multiplication(-1,5263),40)))"));
