// ========== 首页逻辑 ==========

let currentType = '全部';   // 当前筛选类型
let currentKeyword = '';    // 当前搜索关键词

// 渲染列表
function render() {
  let items = getAll();

  // 按类型筛选
  if (currentType !== '全部') {
    items = items.filter(item => item.type === currentType);
  }

  // 按关键词搜索
  if (currentKeyword) {
    const kw = currentKeyword.trim().toLowerCase();
    items = items.filter(item =>
      item.name && item.name.toLowerCase().includes(kw)
    );
  }

  // 按时间倒序（最新的在前）
  items.sort((a, b) => b.id - a.id);

  const list = document.getElementById('list');

  // 空状态
  if (items.length === 0) {
    list.innerHTML = '<p class="empty">暂无信息</p>';
    return;
  }

  // 渲染卡片
  list.innerHTML = items.map(item => `
    <div class="card" onclick="goDetail(${item.id})">
      <div class="card-header">
        <span class="card-name">${item.name}</span>
        <span class="card-type ${item.type === '寻物' ? 'type-lost' : 'type-found'}">${item.type}</span>
      </div>
      <p class="card-info">地点：${item.place || '未填写'}</p>
      <p class="card-info">时间：${item.time || '未填写'}</p>
      <p class="card-status">状态：${item.status}</p>
    </div>
  `).join('');
}

// 跳转详情页
function goDetail(id) {
  location.href = 'detail.html?id=' + id;
}

// 搜索按钮
document.getElementById('searchBtn').onclick = function () {
  currentKeyword = document.getElementById('searchInput').value;
  render();
};

// 输入框回车也可以搜索
document.getElementById('searchInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    currentKeyword = this.value;
    render();
  }
});

// 分类标签点击
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.onclick = function () {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    currentType = this.dataset.type;
    render();
  };
});

// 页面加载时渲染
render();