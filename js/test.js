//单元测试
//保证测试环境干净
localStorage.removeItem('items');

let passCount = 0;
let failCount = 0;
const results = [];

// 断言函数
function assert(condition, msg) {
  if (condition) {
    passCount++;
    results.push({ pass: true, msg: msg });
  } else {
    failCount++;
    results.push({ pass: false, msg: msg });
  }
}

//测试用例

// 用例1：添加信息后能读取到
(function test1() {
  addItem({ name: '测试雨伞', type: '寻物', place: '图书馆', contact: '123' });
  const items = getAll();
  assert(items.length === 1, '用例1：添加一条信息后，getAll() 应返回长度为1的数组');
})();

// 用例2：按名称搜索能命中
(function test2() {
  const result = searchItems('雨伞');
  assert(result.length === 1, '用例2：搜索"雨伞"应返回1条结果');
})();

// 用例3：搜索不存在的关键词返回空数组
(function test3() {
  const result = searchItems('木棍木棍');
  assert(result.length === 0, '用例3：搜索不存在的关键词应返回空数组');
})();

// 用例4：按 id 查找能查到
(function test4() {
  const all = getAll();
  const target = all[0];
  const found = getItemById(target.id);
  assert(found && found.name === '测试雨伞', '用例4：按 id 应能查到对应信息');
})();

// 用例5：更新状态后能读到新状态
(function test5() {
  const all = getAll();
  const target = all[0];
  updateItem(target.id, { status: '已找到' });
  const updated = getItemById(target.id);
  assert(updated.status === '已找到', '用例5：更新状态后，应能读到新状态"已找到"');
})();

// 用例6：删除后查不到
(function test6() {
  const all = getAll();
  const target = all[0];
  deleteItem(target.id);
  const found = getItemById(target.id);
  assert(found === undefined, '用例6：删除后按 id 应查不到该信息');
})();

// 用例7：空关键词搜索返回全部
(function test7() {
  addItem({ name: '钥匙', type: '招领', place: '食堂', contact: '456' });
  addItem({ name: '水杯', type: '寻物', place: '教室', contact: '789' });
  const result = searchItems('');
  assert(result.length === 2, '用例7：空关键词搜索应返回全部信息');
})();

// 用例8：按类型筛选
(function test8() {
  const result = filterByType('招领');
  assert(result.length === 1 && result[0].name === '钥匙', '用例8：按"招领"筛选应只返回招领信息');
})();

// 用例9：新增信息默认状态为“进行中”
(function test9() {
  const item = addItem({ name: '校园卡', type: '招领', place: '食堂', contact: '999' });
  assert(item.status === '进行中', '用例9：新增信息未指定状态时，应默认为"进行中"');
})();

// 用例10：更新不存在的 id 应返回 false
(function test10() {
  const result = updateItem(999999999, { status: '已找到' });
  assert(result === false, '用例10：更新不存在的 id 时，updateItem 应返回 false');
})();

// ========== 显示结果 ==========

const resultBox = document.getElementById('result');

let html = '';
results.forEach(r => {
  html += `<div class="test-item ${r.pass ? 'test-pass' : 'test-fail'}">
    ${r.pass ? '✅ 通过' : '❌ 失败'} — ${r.msg}
  </div>`;
});

html += `<div class="test-summary">
  测试完成：通过 ${passCount} 个，失败 ${failCount} 个
</div>`;

resultBox.innerHTML = html;

console.log('测试完成：通过 ' + passCount + ' 个，失败 ' + failCount + ' 个');