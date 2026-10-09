//数据存储模块

// 读取所有信息
function getAll() {
  return JSON.parse(localStorage.getItem('items') || '[]');
}

// 保存所有信息
function saveAll(items) {
  localStorage.setItem('items', JSON.stringify(items));
}

// 添加一条信息
function addItem(item) {
  const items = getAll();
  item.id = Date.now(); // 用时间戳当唯一 id
  item.status = item.status || '进行中'; // 默认状态
  items.push(item);
  saveAll(items);
  return item;
}

// 根据 id 查找一条信息
function getItemById(id) {
  return getAll().find(item => item.id == id);
}

// 根据 id 更新一条信息
function updateItem(id, updates) {
  const items = getAll();
  const index = items.findIndex(item => item.id == id);
  if (index !== -1) {
    items[index] = Object.assign({}, items[index], updates);
    saveAll(items);
    return true;
  }
  return false;
}

// 根据 id 删除一条信息
function deleteItem(id) {
  const items = getAll().filter(item => item.id != id);
  saveAll(items);
}

// 按物品名称搜索
function searchItems(keyword) {
  const items = getAll();
  if (!keyword) return items;
  const kw = keyword.trim().toLowerCase();
  return items.filter(item =>
    item.name && item.name.toLowerCase().includes(kw)
  );
}

// 按类型筛选（全部 / 寻物 / 招领）
function filterByType(type) {
  const items = getAll();
  if (!type || type === '全部') return items;
  return items.filter(item => item.type === type);
}