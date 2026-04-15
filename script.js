// ===== 版本控制 =====
const VERSIONS = {
    public: { label: '公开版', data: null },
    parent: { label: '家长版', data: null, password: 'parent2026' },
    full:   { label: '完整版', data: null, password: 'teacher2026' }
};

let currentVersion = 'public';
let unlockedVersions = new Set(['public']);

let students = [];
let currentStudent = null;

// ===== 加载数据 =====
async function loadData() {
    try {
        const [publicResp, parentResp, fullResp] = await Promise.all([
            fetch('data/students.json'),
            fetch('data/parents.json'),
            fetch('data/full.json')
        ]);
        VERSIONS.public.data = await publicResp.json();
        VERSIONS.parent.data = await parentResp.json();
        VERSIONS.full.data = await fullResp.json();
        students = VERSIONS.public.data;
    } catch (e) {
        console.error('Failed to load data:', e);
        students = [];
    }
}

// ===== 渲染学生卡片 =====
function renderCards(filter) {
    filter = filter || 'all';
    const grid = document.getElementById('charGrid');
    grid.innerHTML = '';
    const filtered = filter === 'all' ? students : students.filter(function(s) { return s.grade === filter; });
    filtered.forEach(function(student, index) {
        var card = document.createElement('div');
        card.className = 'char-card';
        card.style.animationDelay = (index * 0.1) + 's';
        card.style.animation = 'fadeInUp 0.6s ease both';
        card.innerHTML =
            '<div class="char-card-top" style="background: linear-gradient(135deg, ' + student.color + '22, ' + student.color + '11)">' +
                '<div class="char-avatar" style="background: linear-gradient(135deg, ' + student.color + ', ' + student.color + 'aa)">' + student.initial + '</div>' +
            '</div>' +
            '<div class="char-card-body">' +
                '<div class="char-card-name">' + student.name + '</div>' +
                '<div class="char-card-title">' + student.title + '</div>' +
                '<div class="char-card-desc">' + student.desc + '</div>' +
                '<div class="char-card-tags">' +
                    student.tags.map(function(t) { return '<span class="char-tag">' + t + '</span>'; }).join('') +
                '</div>' +
            '</div>';
        card.addEventListener('click', function() { openModal(student); });
        grid.appendChild(card);
    });
}

// ===== 模态框 =====
function openModal(student) {
    currentStudent = student;
    var modal = document.getElementById('charModal');
    document.getElementById('modalPortrait').style.background = 'linear-gradient(135deg, ' + student.color + ', ' + student.color + 'aa)';
    document.getElementById('modalPortrait').textContent = student.initial;
    document.getElementById('modalName').textContent = student.name;
    document.getElementById('modalTitle').textContent = student.title;
    document.getElementById('modalDesc').textContent = student.desc;
    document.getElementById('modalTags').innerHTML = student.tags.map(function(t) { return '<span class="char-tag">' + t + '</span>'; }).join('');
    document.getElementById('modalInfo').innerHTML = Object.entries(student.info).map(function(entry) {
        return '<div class="info-item"><span class="info-label">' + entry[0] + '</span><span class="info-value">' + entry[1] + '</span></div>';
    }).join('');

    // Render version tabs
    renderVersionTabs();
    renderStory(student);

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.querySelector('.story-modal').scrollTop = 0;
}

function renderVersionTabs() {
    var tabsContainer = document.getElementById('versionTabs');
    tabsContainer.innerHTML = '';
    ['public', 'parent', 'full'].forEach(function(v) {
        var btn = document.createElement('button');
        btn.className = 'version-tab' + (currentVersion === v ? ' active' : '');
        btn.textContent = VERSIONS[v].label;
        if (!unlockedVersions.has(v)) {
            btn.classList.add('locked');
            btn.textContent = VERSIONS[v].label + ' 🔒';
        }
        btn.addEventListener('click', function() { switchVersion(v); });
        tabsContainer.appendChild(btn);
    });
}

function switchVersion(version) {
    if (!unlockedVersions.has(version)) {
        var pw = prompt('请输入' + VERSIONS[version].label + '密码：');
        if (pw !== VERSIONS[version].password) {
            if (pw !== null) alert('密码错误');
            return;
        }
        unlockedVersions.add(version);
    }
    currentVersion = version;

    // Switch data source
    var data = VERSIONS[version].data;
    if (data && currentStudent) {
        var found = data.find(function(s) { return s.id === currentStudent.id; });
        if (found) {
            currentStudent = found;
            document.getElementById('modalDesc').textContent = found.desc;
            renderStory(found);
        }
    }

    renderVersionTabs();
}

function renderStory(student) {
    document.getElementById('modalStory').innerHTML = student.story.map(function(entry) {
        return '<div class="story-entry">' +
            '<div class="story-date">' + entry.date + '</div>' +
            '<div class="story-text">' + entry.text + '</div>' +
        '</div>';
    }).join('');
}

function closeModal() {
    document.getElementById('charModal').classList.remove('active');
    document.body.style.overflow = '';
    currentStudent = null;
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('charModal').addEventListener('click', function(e) {
    if (e.target === e.currentTarget) closeModal();
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
});

// ===== 筛选 =====
document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderCards(btn.dataset.filter);
    });
});

// ===== 粒子背景 =====
function initParticles() {
    var canvas = document.getElementById('particles');
    var ctx = canvas.getContext('2d');
    var particles = [];
    var count = 50;
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    for (var i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.4 + 0.1
        });
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function(p) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(212, 165, 116, ' + p.alpha + ')';
            ctx.fill();
        });
        for (var i = 0; i < particles.length; i++) {
            for (var j = i + 1; j < particles.length; j++) {
                var dx = particles[i].x - particles[j].x;
                var dy = particles[i].y - particles[j].y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = 'rgba(212, 165, 116, ' + (0.06 * (1 - dist / 150)) + ')';
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
}

// ===== 导航滚动 =====
window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    var sections = ['home', 'students', 'reflections', 'about'];
    var current = '';
    sections.forEach(function(id) {
        var el = document.getElementById(id);
        if (el && el.offsetTop - 200 <= window.scrollY) current = id;
    });
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
});

// ===== 数字动画 =====
function animateNumbers() {
    document.querySelectorAll('.stat-num').forEach(function(el) {
        var target = parseInt(el.dataset.target);
        var duration = 2000;
        var start = performance.now();
        function update(now) {
            var progress = Math.min((now - start) / duration, 1);
            var ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(target * ease);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

// ===== 滚动显示 =====
function initReveal() {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('[data-reveal]').forEach(function(el) { observer.observe(el); });
}

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', function() {
    loadData().then(function() {
        renderCards();
        initParticles();
        animateNumbers();
        initReveal();
    });
});
