// ===== 学生数据 =====
const students = [
    {
        id: 'luo-yuhan',
        name: '小罗',
        title: '想要主动权的少年',
        grade: 'grade10',
        gradeLabel: '高一',
        color: '#c45c5c',
        initial: '罗',
        tags: ['高一', '一对一', '红旗班'],
        desc: '一个聪明的、在跟家庭控制系统做持续对抗的孩子。他偷买了手机被抓，从头到尾不认为自己错了——"所有主动权掌握在自己手上不一样"。',
        info: {
            '学校': '南昌某重点班',
            '班型': '一对一',
            '科目': '语文',
            '上课时间': '周六晚'
        },
        story: [
            {
                date: '2026年4月12日',
                text: '他花540块压岁钱偷偷买了一部手机，通过同学帮忙下单。快递盒没扔，妈妈看到盒子上写"8+256"加同学名字，冲进房间抓现行。他手忙脚乱想塞被子里，没塞成。'
            },
            {
                date: '那天晚上',
                text: '他坐下来跟我说这件事。一开始他说"我感觉我一点错都没有"。后来他说了实话——他想要的不是手机，是"所有主动权掌握在自己手上"。他不是在跟妈妈对着干，他是在跟那个游戏协议较劲。他觉得那个协议是不平等条约。'
            },
            {
                date: '然后他哭了',
                text: '不是被我骂哭的。我跟他说，"我给你解释了半天这件事，你如果还是这个态度，我们两个师生关系要走到尽头了。"他一下子就转泪了。他哭，不是因为觉得自己错了，是因为他在意的是关系，不是规则。'
            },
            {
                date: '期中考试',
                text: '语文88，数学115，英语106，物理46，化学26，生物51。总分432，全班第50名。化学26不是学不懂，是根本没在学。他这半个月的精力全花在手机那件事上了。'
            },
            {
                date: '未完待续',
                text: '他答应了我，不再用自己臆想的方案。我打算跟他妈妈谈——争取像另一个学生那样，给他一部受控的手机。如果谈不通，我自己买给他，锁在我手里。如果被发现，我退全部课时费，一拍两散。'
            }
        ]
    },
    {
        id: 'yang-ziling',
        name: '小泠',
        title: '安静地退出参与的孩子',
        grade: 'grade8',
        gradeLabel: '八年级',
        color: '#5ca0a0',
        initial: '泠',
        tags: ['八年级', '一对一', '语文'],
        desc: '她不打架不顶嘴，只是安静地退出了参与。她写杀手题材的OC故事，对主流叙事嗤之以鼻。不是叛逆，是失望。',
        info: {
            '学校': '南昌某中学',
            '班型': '一对一',
            '科目': '语文',
            '上课时间': '周六上午'
        },
        story: [
            {
                date: '最初的印象',
                text: '她外冷内热，有主见，敏感。上课的时候教了不接，逼了应付，怎么都走进不了内心。她不是学不会，是不想学给你看。'
            },
            {
                date: 'OC创作',
                text: '她写杀手题材的原创角色故事，主角叫洛蔷薇、柳泉、沈江。这些故事不是消遣——这是她的世界。在那个世界里，她得到的反馈是真实的，不像大人只会说好听的话。'
            },
            {
                date: '妈妈的温柔',
                text: '她的妈妈对外发光、对内缺位。朋友圈发千叟素宴"温柔暖洪城""德孝传家"，但女儿每天微信2.5小时没人管。妈妈的温柔是"给所有人的"，不是只给她的。所以她退回到自己的世界。'
            },
            {
                date: '《刺猬》',
                text: '我给她写了一篇阅读理解材料，叫《刺猬》。写的是一个画画的同学，安静、敏感、有自己不被理解的世界。围绕这篇文章出了5道题——环境描写、词语赏析、人物分析、标题分析、句意理解。她读进去了。'
            },
            {
                date: '未完待续',
                text: '我不知道她会不会打开那扇门。但我知道她读《刺猬》的时候，那一刻她是投入的。那就够了。'
            }
        ]
    },
    {
        id: 'wang-yinuo',
        name: '小渃',
        title: '在重点班失去坐标的少年',
        grade: 'grade10',
        gradeLabel: '高一',
        color: '#7a6ad4',
        initial: '渃',
        tags: ['高一', '一对二', '语文'],
        desc: '他从普通班考进重点班，然后垫底了。曾经的成绩是他的坐标，现在坐标没了，他不知道自己是谁。',
        info: {
            '学校': '南昌某重点班',
            '班型': '一对二',
            '科目': '语文',
            '上课时间': '周日上午'
        },
        story: [
            {
                date: '播音主持事件',
                text: '他报了学校的播音主持，被选上了。妈妈很紧张，觉得他不务正业。但我觉得，他在播音里找到了重点班给不了他的东西——存在感。他不是想当主持人，他是想在一个地方被看见。'
            },
            {
                date: '妈妈的消息',
                text: '妈妈发来消息说："好一点的大学和普通高校差别确实大。他如果是没有能力，我也就不焦虑。但是，现在是他没有去奋斗。"她说得有道理，但她不知道的是——他不是不想奋斗，是找不到奋斗的理由。'
            },
            {
                date: '未完待续',
                text: '长期目标是高三全托。现在做的一切是存信任。不要提成绩，重点班中失去成就感是根本原因。'
            }
        ]
    },
    {
        id: 'huang-hansong',
        name: '小松',
        title: '缺答题术语的理科生',
        grade: 'grade9',
        gradeLabel: '九年级',
        color: '#c4a050',
        initial: '松',
        tags: ['九年级', '一对一', '一模'],
        desc: '他知道答案，但写不出专业术语。理科优先策略下，语文从口语到考试语言的转化是他的提分路径。',
        info: {
            '学校': '南昌某中学',
            '班型': '一对一',
            '科目': '语文·道法·历史',
            '上课时间': '周六下午'
        },
        story: [
            {
                date: '一模前诊断',
                text: '我现场诊断了几个问题：他对文科有信心但不踏实，默写的时候不确定的会偷看但不承认，爸爸给他定了B加的目标。他自己说缺答题术语——这很关键，一个学生能说出自己缺什么，说明他在认真想。'
            },
            {
                date: '爸爸的目标',
                text: '爸爸给他定了阶梯目标：B减→B加→A级。务实，不画饼。这种家庭出来的孩子，通常不会太差，但也不会太快乐。'
            },
            {
                date: '未完待续',
                text: '一模4月15日。等成绩出来，用数据做杠杆。'
            }
        ]
    },
    {
        id: 'huang-yilang',
        name: '小朗',
        title: '有主见的高中生',
        grade: 'grade10',
        gradeLabel: '高一',
        color: '#d4a574',
        initial: '朗',
        tags: ['高一', '一对一'],
        desc: '之前被定性为"社会功能退缩"，后来发现根本不是——他只是有主见，不轻易表达。上课以聊天建信任为主。',
        info: {
            '学校': '南昌某中学',
            '班型': '一对一',
            '科目': '语文',
            '上课时间': '周六下午'
        },
        story: [
            {
                date: '档案修正',
                text: '之前的档案说他"社会功能退缩"、"控制欲极强的家庭"。后来发现这些都是错的。他不是退缩，是有主见不轻易表达。爸爸慢性子，有生活情调，陪他看了21部电影。妈妈急性子，喜欢黑泽明。这是一个有品质的家庭。'
            },
            {
                date: '期中成绩',
                text: '总分420/750。他最想提的是物理和生物，不是语文。所以语文课上，我不逼他，以聊天建信任为主。等他信任我了，语文自然会上来。'
            }
        ]
    },
    {
        id: 'liu-shengting',
        name: '小廷',
        title: '理科塌方但不转文科',
        grade: 'grade10',
        gradeLabel: '高一',
        color: '#6a9fd4',
        initial: '廷',
        tags: ['高一', '一对二', '语文'],
        desc: '物理E(26)、数学E(55)，但拒绝转文科。在补一对一但还在跌。需要诊断补课效果。',
        info: {
            '学校': '南昌某中学',
            '班型': '一对二',
            '科目': '语文',
            '上课时间': '周日上午'
        },
        story: [
            {
                date: '成绩',
                text: '物理26分，数学55分。两个都是E等级。他在外面补一对一，但成绩还在跌。我需要问三个问题来诊断补课到底有没有用。'
            },
            {
                date: '手机方案',
                text: '他是我最早做手机方案的学生。我帮他妈妈选了三档手机，她选了小米13。装了管控软件，限定时间。花了2-3个月才跟家长磨通。现在他的状态很平稳，配合度算比较高的。'
            }
        ]
    },
    {
        id: 'xiong-chengze',
        name: '小泽',
        title: '在课上打游戏的少年',
        grade: 'grade10',
        gradeLabel: '高一',
        color: '#8bc45c',
        initial: '泽',
        tags: ['高一', '一对一'],
        desc: '上周日在课上打了一节课游戏。家长不知道。月考89分，作文39/60，说"一点都不头疼"但成绩说明一切。',
        info: {
            '学校': '南昌某中学',
            '班型': '一对一',
            '科目': '语文',
            '上课时间': '周日下午'
        },
        story: [
            {
                date: '打游戏',
                text: '上周日他来上课，打了一节课游戏。他妈妈不知道。我觉得给他上课没有用。但这件事我不能装作没发生——如果被家长发现，就是骗家长钱的问题。'
            },
            {
                date: '未完待续',
                text: '我还没决定怎么处理。主动跟家长说？把游戏变教学手段？还是继续隐瞒？最后一种是最差选项。'
            }
        ]
    },
    {
        id: 'long-qile',
        name: '小乐',
        title: '九年级备考中',
        grade: 'grade9',
        gradeLabel: '九年级',
        color: '#c45ca0',
        initial: '乐',
        tags: ['九年级', '一对二', '一模'],
        desc: '九年级备考学生，档案待更新。',
        info: {
            '学校': '南昌某中学',
            '班型': '一对二',
            '科目': '语文·道法·历史',
            '上课时间': '周日下午'
        },
        story: [
            {
                date: '待续',
                text: '故事正在书写中……'
            }
        ]
    },
    {
        id: 'yang-zuojunhao',
        name: '小浩',
        title: '九年级备考中',
        grade: 'grade9',
        gradeLabel: '九年级',
        color: '#a08c5c',
        initial: '浩',
        tags: ['九年级', '一对二', '一模'],
        desc: '九年级备考学生，档案待更新。',
        info: {
            '学校': '南昌某中学',
            '班型': '一对二',
            '科目': '语文·道法·历史',
            '上课时间': '周日下午'
        },
        story: [
            {
                date: '待续',
                text: '故事正在书写中……'
            }
        ]
    }
];

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

    // Tags
    document.getElementById('modalTags').innerHTML = student.tags.map(t =>
        `<span class="char-tag">${t}</span>`
    ).join('');

    // Info
    document.getElementById('modalInfo').innerHTML = Object.entries(student.info).map(([k, v]) =>
        `<div class="info-item"><span class="info-label">${k}</span><span class="info-value">${v}</span></div>`
    ).join('');

    // Story timeline
    document.getElementById('modalStory').innerHTML = student.story.map(entry =>
        `<div class="story-entry">
            <div class="story-date">${entry.date}</div>
            <div class="story-text">${entry.text}</div>
        </div>`
    ).join('');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
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

        // Lines
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

    // Update active nav link
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
document.addEventListener('DOMContentLoaded', () => {
    renderCards();
    initParticles();
    animateNumbers();
    initReveal();
});
