function solution(a, b) {
  var answer = "";
  var day_select = ["THU", "FRI", "SAT", "SUN", "MON", "TUE", "WED"];
  var month = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var count_day = 0;
  for (var i = 0; i < a - 1; i++) {
    count_day += month[i];
  }
  count_day += b;
  answer = day_select[count_day % 7];
  return answer;
}
