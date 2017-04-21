var leftpad = require('left-pad');
function print(arr) {
  var wol = arr.map((item, k)=>item === '狼' ? item : leftpad(k+1,2))
  var space = '                                                                '
  console.log('  '   + wol[5] + wol[6] + '  '    + space + '  '   + arr[5] + arr[6] + '  '    );
  console.log(wol[4] + '    '          + wol[7]  + space + arr[4] + '    '          + arr[7]  );
  console.log(wol[3] + '    '          + wol[8]  + space + arr[3] + '    '          + arr[8]  );
  console.log(wol[2] + '    '          + wol[9]  + space + arr[2] + '    '          + arr[9]  );
  console.log(wol[1] + '    '          + wol[10] + space + arr[1] + '    '          + arr[10] );
  console.log(wol[0] + '    '          + wol[11] + space + arr[0] + '    '          + arr[11] );
}

// var arr = [1,2,3,4,5,6,7,8,9,10,11,12]
var arr = ['狼','狼','狼','狼','民','民','民','民','预','女','猎','白'];
arr.sort(function(a,b){return Math.random()-0.5})
print(arr)
