// ===== 数据 =====
let studentsData = [];
let publicData = {};
let parentsData = {};
let fullData = {};

let currentStudentId = null;
let currentChapterSlug = null;
let currentVersion = 'public';
let unlockedVersions = new Set(['public']);

const VERSIONS = {
    public: { label: '公开版', password: null },
    parent: { label: '家长版', password: 'parent2026' },
    full:   { label: '完整版', password: 'teacher2026' }
};

// ===== 加载 =====
async function loadData() {
    try {
        var [s, p, pa, f] = await Promise.all([
            fetch('data/students.json').then(function(r) { return r.json(); }),
            fetch('data/public.json').then(function(r) { return r.json(); }),
            fetch('data/parents.json').then(function(r) { return r.json(); }),
            fetch('data/full.json').then(function(r) { return r.json(); })
        ]);
        studentsData = s;
        publicData = p;
        parentsData = pa;
        fullData = f;
    } catch (e) {
        console.error('Load failed:', e);
    }
}

// ===== 路由 =====
function getHash() {
    var h = window.location.hash || '#/';
    return h.substring(1);
}

function route() {
    var path = getHash();
    closeAllPages();

    if (path === '/' || path === '') {
        showSections(['home', 'students', 'about']);
        setActiveNav('home');
    } else if (path === '/students') {
        showSections(['home', 'students', 'about']);
        setActiveNav('students');
        document.getElementById('students').scrollIntoView({ behavior: 'smooth' });
    } else if (path.startsWith('/student/')) {
        var parts = path.split('/');
        var sid = parts[2];
        var chslug = parts[3];
        if (chslug) {
            showChapterPage(sid, chslug);
        } else {
            showSections(['students']);
            showStudentPage(sid);
        }
    } else if (path === '/about') {
        showSections(['about']);
        setActiveNav('about');
    }
}

function showSections(ids) {
    ['home', 'students', 'about'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.style.display = ids.indexOf(id) >= 0 ? '' : 'none';
    });
}

function closeAllPages() {
    document.getElementById('studentPage').style.display = 'none';
    document.getElementById('chapterPage').style.display = 'none';
}

function setActiveNav(name) {
    document.querySelectorAll('.nav-link').forEach(function(l) {
        l.classList.toggle('active', l.dataset.nav === name);
    });
}

// ===== 渲染卡片 =====
function renderCards(filter) {
    filter = filter || 'all';
    var grid = document.getElementById('charGrid');
    grid.innerHTML = '';
    var filtered = filter === 'all' ? studentsData : studentsData.filter(function(s) { return s.grade === filter; });
    filtered.forEach(function(student, i) {
        var chapters = publicData[student.id] || [];
        var chapterCount = chapters.length;
        var card = document.createElement('div');
        card.className = 'char-card';
        card.style.animationDelay = (i * 0.08) + 's';
        card.style.animation = 'fadeInUp 0.6s ease both';
        card.innerHTML =
            '<div class="char-card-top" style="background:linear-gradient(135deg,' + student.color + '22,' + student.color + '11)">' +
                '<div class="char-avatar" style="background:linear-gradient(135deg,' + student.color + ',' + student.color + 'aa)">' + student.initial + '</div>' +
                '<div style="color:var(--text-muted);font-size:0.75rem">' + chapterCount + ' 章</div>' +
            '</div>' +
            '<div class="char-card-body">' +
                '<div class="char-card-name">' + student.name + '</div>' +
                '<div class="char-card-title">' + student.title + '</div>' +
                '<div class="char-card-desc">' + student.desc + '</div>' +
                '<div class="char-card-tags">' +
                    student.tags.map(function(t) { return '<span class="char-tag">' + t + '</span>'; }).join('') +
                '</div>' +
            '</div>';
        card.addEventListener('click', function() {
            window.location.hash = '#/student/' + student.id;
        });
        grid.appendChild(card);
    });
}

// ===== 学生详情页 =====
function showStudentPage(sid) {
    var student = studentsData.find(function(s) { return s.id === sid; });
    if (!student) return;
    currentStudentId = sid;

    document.getElementById('spPortrait').style.background = 'linear-gradient(135deg,' + student.color + ',' + student.color + 'aa)';
    document.getElementById('spPortrait').textContent = student.initial;
    document.getElementById('spName').textContent = student.name;
    document.getElementById('spTitle').textContent = student.title;
    document.getElementById('spDesc').textContent = student.desc;
    document.getElementById('spTags').innerHTML = student.tags.map(function(t) { return '<span class="char-tag">' + t + '</span>'; }).join('');

    var chapters = publicData[sid] || [];
    var list = document.getElementById('chapterList');
    list.innerHTML = '';

    if (chapters.length === 0) {
        list.innerHTML = '<div class="chapter-empty">故事正在书写中……</div>';
    } else {
        chapters.forEach(function(ch) {
            var item = document.createElement('div');
            item.className = 'chapter-item';
            item.innerHTML =
                '<div class="chapter-item-info">' +
                    '<div class="chapter-item-title">' + ch.title + '</div>' +
                    (ch.summary ? '<div class="chapter-item-summary">' + ch.summary + '</div>' : '') +
                '</div>' +
                '<div class="chapter-item-date">' + (ch.date || '') + '</div>' +
                '<div class="chapter-item-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></div>';
            item.addEventListener('click', function() {
                window.location.hash = '#/student/' + sid + '/' + ch.slug;
            });
            list.appendChild(item);
        });
    }

    document.getElementById('studentPage').style.display = '';
    document.getElementById('studentPage').scrollTop = 0;
    setActiveNav('students');
}

// ===== 章节阅读页 =====
function showChapterPage(sid, slug) {
    var student = studentsData.find(function(s) { return s.id === sid; });
    if (!student) return;
    currentStudentId = sid;
    currentChapterSlug = slug;

    var chapters = publicData[sid] || [];
    var ch = chapters.find(function(c) { return c.slug === slug; });
    if (!ch) return;

    document.getElementById('chTitle').textContent = ch.title;
    document.getElementById('chDate').textContent = ch.date || '';

    currentVersion = 'public';
    unlockedVersions = new Set(['public']);
    renderVersionTabs();
    renderChapterContent();

    document.getElementById('chapterPage').style.display = '';
    document.getElementById('chapterPage').scrollTop = 0;
    document.getElementById('students').style.display = 'none';
}

function renderVersionTabs() {
    var container = document.getElementById('versionTabs');
    container.innerHTML = '';
    ['public', 'parent', 'full'].forEach(function(v) {
        var btn = document.createElement('button');
        btn.className = 'version-tab' + (currentVersion === v ? ' active' : '') + (!unlockedVersions.has(v) ? ' locked' : '');
        btn.textContent = VERSIONS[v].label + (!unlockedVersions.has(v) ? ' 🔒' : '');
        btn.addEventListener('click', function() { switchVersion(v); });
        container.appendChild(btn);
    });
}

function switchVersion(v) {
    if (!unlockedVersions.has(v)) {
        var pw = prompt('请输入' + VERSIONS[v].label + '密码：');
        if (!pw || pw !== VERSIONS[v].password) {
            if (pw !== null) alert('密码错误');
            return;
        }
        unlockedVersions.add(v);
    }
    currentVersion = v;
    renderVersionTabs();
    renderChapterContent();
}

function renderChapterContent() {
    var contentEl = document.getElementById('chContent');
    var data = {};
    if (currentVersion === 'public') data = publicData;
    else if (currentVersion === 'parent') data = parentsData;
    else data = fullData;

    var chapters = data[currentStudentId] || [];
    var ch = chapters.find(function(c) { return c.slug === currentChapterSlug; });
    var text = ch ? ch.content : '（暂无内容）';

    if (text === '（待写）' || text === '（暂无内容）') {
        contentEl.innerHTML = '<p class="placeholder">' + text + '</p>';
    } else {
        var html = text.split('\n').map(function(line) {
            if (line.trim() === '---') return '<hr>';
            if (line.trim() === '') return '';
            return '<p>' + line + '</p>';
        }).filter(function(l) { return l !== ''; }).join('');
        contentEl.innerHTML = html;
    }
}

// ===== 导出 =====
document.getElementById('exportBtn').addEventListener('click', function() {
    var data = currentVersion === 'public' ? publicData : (currentVersion === 'parent' ? parentsData : fullData);
    var chapters = data[currentStudentId] || [];
    var ch = chapters.find(function(c) { return c.slug === currentChapterSlug; });
    if (!ch) return;

    var title = ch.title;
    var text = ch.content.replace(/\n---\n/g, '\n\n');
    var full = title + '\n\n' + text;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(full).then(function() {
            var btn = document.getElementById('exportBtn');
            btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg><span>已复制</span>';
            setTimeout(function() {
                btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg><span>复制</span>';
            }, 2000);
        });
    }
});

// ===== 返回按钮 =====
document.getElementById('backToStudents').addEventListener('click', function() {
    window.location.hash = '#/students';
});
document.getElementById('backToStudent').addEventListener('click', function() {
    window.location.hash = '#/student/' + currentStudentId;
});

// ===== 筛选 =====
document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderCards(btn.dataset.filter);
    });
});

// ===== 粒子 =====
function initParticles() {
    var canvas = document.getElementById('particles');
    var ctx = canvas.getContext('2d');
    var particles = [];
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);
    for (var i = 0; i < 50; i++) {
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
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(212,165,116,' + p.alpha + ')';
            ctx.fill();
        });
        for (var i = 0; i < particles.length; i++) {
            for (var j = i + 1; j < particles.length; j++) {
                var dx = particles[i].x - particles[j].x;
                var dy = particles[i].y - particles[j].y;
                var dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = 'rgba(212,165,116,' + (0.06 * (1 - dist/150)) + ')';
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

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', function() {
    loadData().then(function() {
        renderCards();
        initParticles();
        animateNumbers();
        route();
    });
});

window.addEventListener('hashchange', route);
