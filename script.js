// ===== 从 data.json 加载学生数据 =====
let students = [];

async function loadData() {
    try {
        const resp = await fetch('data/students.json');
        students = await resp.json();
    } catch (e) {
        console.error('Failed to load students data:', e);
        students = [];
    }
}

// ===== 渲染学生卡片 =====
function renderCards(filter = 'all') {
    const grid = document.getElementById('charGrid');
    grid.innerHTML = '';

    const filtered = filter === 'all' ? students : students.filter(s => s.grade === filter);

    filtered.forEach((student, index) => {
        const card = document.createElement('div');
        card.className = 'char-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'fadeInUp 0.6s ease both';
        card.innerHTML = `
            <div class="char-card-top" style="background: linear-gradient(135deg, ${student.color}22, ${student.color}11)">
                <div class="char-avatar" style="background: linear-gradient(135deg, ${student.color}, ${student.color}aa)">${student.initial}</div>
            </div>
            <div class="char-card-body">
                <div class="char-card-name">${student.name}</div>
                <div class="char-card-title">${student.title}</div>
                <div class="char-card-desc">${student.desc}</div>
                <div class="char-card-tags">
                    ${student.tags.map(t => `<span class="char-tag">${t}</span>`).join('')}
                </div>
            </div>
        `;
        card.addEventListener('click', () => openModal(student));
        grid.appendChild(card);
    });
}

// ===== 模态框 =====
function openModal(student) {
    const modal = document.getElementById('charModal');

    document.getElementById('modalPortrait').style.background = `linear-gradient(135deg, ${student.color}, ${student.color}aa)`;
    document.getElementById('modalPortrait').textContent = student.initial;
    document.getElementById('modalName').textContent = student.name;
    document.getElementById('modalTitle').textContent = student.title;
    document.getElementById('modalDesc').textContent = student.desc;

    document.getElementById('modalTags').innerHTML = student.tags.map(t =>
        `<span class="char-tag">${t}</span>`
    ).join('');

    document.getElementById('modalInfo').innerHTML = Object.entries(student.info).map(([k, v]) =>
        `<div class="info-item"><span class="info-label">${k}</span><span class="info-value">${v}</span></div>`
    ).join('');

    document.getElementById('modalStory').innerHTML = student.story.map(entry =>
        `<div class="story-entry">
            <div class="story-date">${entry.date}</div>
            <div class="story-text">${entry.text}</div>
        </div>`
    ).join('');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Scroll modal to top
    document.querySelector('.story-modal').scrollTop = 0;
}

function closeModal() {
    document.getElementById('charModal').classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('charModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ===== 筛选 =====
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCards(btn.dataset.filter);
    });
});

// ===== 粒子背景 =====
function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const count = 50;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < count; i++) {
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
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 165, 116, ${p.alpha})`;
            ctx.fill();
        });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(212, 165, 116, ${0.06 * (1 - dist / 150)})`;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
}

// ===== 导航滚动 =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    const sections = ['home', 'students', 'reflections', 'about'];
    let current = '';
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.offsetTop - 200 <= window.scrollY) current = id;
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});

// ===== 数字动画 =====
function animateNumbers() {
    document.querySelectorAll('.stat-num').forEach(el => {
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const start = performance.now();
        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(target * ease);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

// ===== 滚动显示 =====
function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    renderCards();
    initParticles();
    animateNumbers();
    initReveal();
});
