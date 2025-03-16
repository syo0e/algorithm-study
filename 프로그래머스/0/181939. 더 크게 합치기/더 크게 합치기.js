function solution(a, b) {
   return String(a) + String(b) > String(b) + String(a) ? Number(String(a) + String(b)) : Number(String(b) + String(a)); 
}