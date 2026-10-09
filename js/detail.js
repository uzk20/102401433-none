// ========== 详情页逻辑 ==========

// 从 URL 取 id
const params = new URLSearchParams(location.search);
const id = params.get('id');

const detailBox = document.getElementById('detail');

// 找不到 id
if (!id) {
  detailBox.innerHTML = '<p class="empty">参数错误，未指定物品</p>';
} else {
  const item = getItemById(id);

  if (!item) {
    detailBox.innerHTML = '<p class="empty">未找到该物品信息</p>';
  } else {
    renderDetail(item);
  }
}

// 渲染详情
function renderDetail(item) {
  const isDone = item.status === '已找到' || item.status === '已归还';
  const doneText = item.type === '寻物' ? '已找到' : '已归还';

  detailBox.innerHTML = `
    <div class="detail-card">
      <div class="detail-header">
        <h2>${item.name}</h2>
        <span class="card-type ${item.type === '寻物' ? 'type-lost' : 'type-found'}">${item.type}</span>
      </div>

      <div class="detail-row">
        <span class="detail-label">描述</span>
        <span>${item.desc || '暂无描述'}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">地点</span>
        <span>${item.place || '未填写'}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">时间</span>
        <span>${item.time || '未填写'}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">联系方式</span>
        <span id="contactText">${item.contact || '未填写'}</span>
        <button class="copy-btn" onclick="copyContact('${item.contact || ''}')">复制</button>
      </div>
      <div class="detail-row">
        <span class="detail-label">状态</span>
        <span class="status-text ${isDone ? 'status-done' : ''}">${item.status}</span>
      </div>

      <button id="markBtn" class="submit-btn" ${isDone ? 'disabled' : ''}>
        ${isDone ? '已完成' : '标记为' + doneText}
      </button>
    </div>
  `;

  // 绑定标记按钮
  const markBtn = document.getElementById('markBtn');
  if (markBtn && !isDone) {
    markBtn.onclick = function () {
      const newStatus = item.type === '寻物' ? '已找到' : '已归还';
      updateItem(item.id, { status: newStatus });
      alert('状态已更新为：' + newStatus);
      location.reload();
    };
  }
}

// 复制联系方式
function copyContact(text) {
  if (!text) {
    alert('暂无联系方式');
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    alert('已复制：' + text);
  }).catch(() => {
    // 兼容旧浏览器
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    alert('已复制：' + text);
  });
}