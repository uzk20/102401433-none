// ========== 发布页逻辑 ==========

let selectedType = '寻物'; // 默认类型

// 类型切换
document.querySelectorAll('.type-btn').forEach(btn => {
  btn.onclick = function () {
    document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    selectedType = this.dataset.type;
  };
});

// 点击发布
document.getElementById('publishBtn').onclick = function () {
  const name = document.getElementById('name').value.trim();
  const place = document.getElementById('place').value.trim();
  const contact = document.getElementById('contact').value.trim();
  const desc = document.getElementById('desc').value.trim();
  const time = document.getElementById('time').value.trim();

  // 校验必填项
  if (!name) {
    alert('请填写物品名称');
    return;
  }
  if (!place) {
    alert('请填写地点');
    return;
  }
  if (!contact) {
    alert('请填写联系方式');
    return;
  }

  // 保存数据
  addItem({
    type: selectedType,
    name: name,
    desc: desc,
    place: place,
    time: time || new Date().toLocaleString('zh-CN', { hour12: false }),
    contact: contact,
    status: '进行中'
  });

  alert('发布成功');
  location.href = 'index.html';
};