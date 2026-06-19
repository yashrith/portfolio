document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Mobile Menu / Burger Button
  // ==========================================
  const burgerBtn = document.getElementById('burger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      burgerBtn.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Sticky Header scroll styling
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  // ==========================================
  // 2. Typewriter Effect
  // ==========================================
  const typedText = document.getElementById('typed-text');
  const phrases = [
    "I build production-ready ML & data systems.",
    "I design end-to-end ETL/ELT pipelines.",
    "I develop RAG and semantic search systems.",
    "I construct robust cloud data architectures."
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIdx];
    
    if (isDeleting) {
      typedText.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50;
    } else {
      typedText.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  if (typedText) {
    type();
  }


  // ==========================================
  // 3. Interactive Terminal Shell Engine
  // ==========================================
  const terminalBody = document.getElementById('terminal-body');
  const tabs = document.querySelectorAll('.terminal-tab');
  const quickCmdBtns = document.querySelectorAll('.terminal-quick-btn');
  
  const files = {
    'profile.sh': `#!/bin/bash
<span class="terminal-output comment"># Yashrith Chittoor Hari Krishna - Profile Information</span>
echo "NAME:     Yashrith Chittoor Hari Krishna"
echo "ROLE:     Data Engineer, Analyst & AI Developer"
echo "LOCATION: Montreal, QC"
echo "EMAIL:    yashrithchittoor@gmail.com"
echo "GITHUB:   github.com/yashrith"
echo "LINKEDIN: linkedin.com/in/yashrith"
echo "STATUS:   Seeking internships & entry-level roles in Canada"`,

    'skills.yml': `<span class="terminal-output comment"># Technical Competency matrix</span>
<span class="terminal-output purple">Data Engineering:</span>
  - SQL, Python, dbt, Apache Airflow
  - Databricks, Spark, AWS Glue, AWS Athena
<span class="terminal-output purple">Data Modeling & Governance:</span>
  - Dimensional Modeling, Star Schema, ERD
  - Data Lineage, Metadata Management, Data Governance
<span class="terminal-output purple">AI & Ingestion Workflows:</span>
  - Ingestion APIs, Schema Validation
  - GCP Vertex AI, Vector Search, JSON Schema
<span class="terminal-output purple">Tools & Practices:</span>
  - Git, Docker, GCP Compute Engine, AWS S3
  - Technical Documentation, Agile Delivery`,

    'contact.log': `<span class="terminal-output comment"># Log instructions for transaction insert</span>
[SYSTEM] Database console ready in contact section.
[EXEC] Run SQL commands or type in form inputs below.
[LINKS] LinkedIn: https://www.linkedin.com/in/yashrith/
[LINKS] GitHub:   https://github.com/yashrith
[LINKS] Email:    yashrithchittoor@gmail.com`
  };

  let currentTab = 'profile.sh';

  function displayFileContent(filename) {
    if (!terminalBody) return;
    
    terminalBody.innerHTML = `
      <div class="terminal-line">
        <span class="terminal-prompt">yashrith@terminal:~$</span>
        <span class="terminal-cmd">cat ${filename}</span>
      </div>
      <div class="terminal-output">${files[filename]}</div>
      <div class="terminal-line" id="terminal-input-line">
        <span class="terminal-prompt">yashrith@terminal:~$</span>
        <span class="terminal-cursor"></span>
      </div>
    `;
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filename = tab.getAttribute('data-file');
      currentTab = filename;
      displayFileContent(filename);
    });
  });

  quickCmdBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmdText = btn.getAttribute('data-cmd');
      executeTerminalCommand(cmdText);
    });
  });

  function executeTerminalCommand(cmd) {
    if (!terminalBody) return;
    
    const inputLine = document.getElementById('terminal-input-line');
    if (inputLine) inputLine.remove();

    let output = '';
    const cleanCmd = cmd.trim().toLowerCase();

    if (cleanCmd === 'clear') {
      terminalBody.innerHTML = `
        <div class="terminal-line" id="terminal-input-line">
          <span class="terminal-prompt">yashrith@terminal:~$</span>
          <span class="terminal-cursor"></span>
        </div>
      `;
      return;
    } else if (cleanCmd === 'profile') {
      output = `<div class="terminal-output">${files['profile.sh']}</div>`;
    } else if (cleanCmd === 'skills') {
      output = `<div class="terminal-output">${files['skills.yml']}</div>`;
    } else if (cleanCmd.startsWith('cat ')) {
      const file = cleanCmd.substring(4);
      if (files[file]) {
        output = `<div class="terminal-output">${files[file]}</div>`;
      } else {
        output = `<span class="terminal-output error">cat: ${file}: No such file in workspace</span>`;
      }
    } else {
      output = `<span class="terminal-output error">bash: ${cmd}: command not recognized. Try "profile" or "skills"</span>`;
    }

    terminalBody.innerHTML += `
      <div class="terminal-line">
        <span class="terminal-prompt">yashrith@terminal:~$</span>
        <span class="terminal-cmd">${cmd}</span>
      </div>
      <div class="terminal-output">${output}</div>
      <div class="terminal-line" id="terminal-input-line">
        <span class="terminal-prompt">yashrith@terminal:~$</span>
        <span class="terminal-cursor"></span>
      </div>
    `;
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  displayFileContent(currentTab);


  // ==========================================
  // 4. Experience & Education Timelines
  // ==========================================
  const timelineNodes = document.querySelectorAll('.timeline-node');

  timelineNodes.forEach(node => {
    const card = node.querySelector('.commit-card');
    const dot = node.querySelector('.commit-dot');
    const nodeId = node.getAttribute('data-node');
    const diffContainer = document.getElementById(`diff-${nodeId}`);

    const toggleNode = () => {
      const isExpanded = diffContainer.classList.contains('expanded');
      
      // Close all other diffs *within the same timeline only*
      const parentTimeline = node.closest('.git-tree-timeline');
      parentTimeline.querySelectorAll('.timeline-node').forEach(n => {
        n.classList.remove('active');
        const diff = n.querySelector('.git-diff-container');
        if (diff) diff.classList.remove('expanded');
      });

      if (!isExpanded) {
        node.classList.add('active');
        diffContainer.classList.add('expanded');
      }
    };

    if (card) card.addEventListener('click', toggleNode);
    if (dot) dot.addEventListener('click', toggleNode);
  });


  // ==========================================
  // 5. Interactive Particle Canvas Background
  // ==========================================
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const maxParticles = 60;
    
    // Resize canvas
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class definition
    class Particle {
      constructor(x, y, isClick = false) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * (isClick ? 4 : 0.8);
        this.vy = (Math.random() - 0.5) * (isClick ? 4 : 0.8);
        this.alpha = 1.0;
        this.decay = Math.random() * 0.01 + (isClick ? 0.015 : 0.005);
        this.size = Math.random() * 10 + (isClick ? 12 : 7);
        this.char = Math.random() > 0.5 ? '1' : '0';
        this.color = Math.random() > 0.6 ? '0, 240, 255' : '189, 0, 255'; // Cyan or Purple
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.font = `${this.size}px var(--font-mono)`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.color}, 0.5)`;
        ctx.fillText(this.char, this.x, this.y);
        ctx.restore();
      }
    }

    // Spawn initial floating background particles
    function initFloatingParticles() {
      for (let i = 0; i < maxParticles / 2; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y, false));
      }
    }
    initFloatingParticles();

    // Spawns a cluster of particles on click/touch
    function triggerRipple(x, y) {
      const count = Math.min(Math.floor(Math.random() * 8) + 8, 15);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y, true));
      }
    }

    // Click & Touch Event Listeners on Document
    document.addEventListener('click', (e) => {
      // Do not trigger if clicking an interactive element to prevent interfering with links/buttons
      if (e.target.closest('a, button, input, textarea, .commit-card, .commit-dot, .terminal-tab, .skill-chip')) {
        return;
      }
      triggerRipple(e.clientX, e.clientY);
    });

    document.addEventListener('touchmove', (e) => {
      // Spawn trail of particles when dragging on mobile
      if (Math.random() > 0.6 && e.touches.length > 0) {
        const touch = e.touches[0];
        if (!e.target.closest('a, button, input, textarea, .commit-card, .commit-dot, .terminal-tab, .skill-chip')) {
          particles.push(new Particle(touch.clientX, touch.clientY, false));
        }
      }
    });

    // Drawing loops and connecting circuits lines
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Maintain a steady flow of background particles
      if (particles.filter(p => p.vx * p.vx + p.vy * p.vy < 2).length < maxParticles / 2) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, false));
      }

      particles.forEach((p, idx) => {
        p.update();
        if (p.alpha <= 0) {
          particles.splice(idx, 1);
        } else {
          p.draw();
        }
      });

      // Draw connecting orthogonal circuit lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const minAlpha = Math.min(particles[i].alpha, particles[j].alpha);
            ctx.save();
            ctx.globalAlpha = minAlpha * (1 - dist / 130) * 0.35;
            ctx.strokeStyle = `rgba(0, 240, 255, ${minAlpha})`;
            ctx.lineWidth = 0.65;
            
            // Choose route (horizontal-first vs vertical-first) based on stable index sum
            const routeHorizontalFirst = (i + j) % 2 === 0;
            const turnX = routeHorizontalFirst ? particles[j].x : particles[i].x;
            const turnY = routeHorizontalFirst ? particles[i].y : particles[j].y;
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(turnX, turnY);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            
            // Draw a tiny via node (junction dot) at the corner bend
            ctx.beginPath();
            ctx.arc(turnX, turnY, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 240, 255, ${minAlpha * 0.8})`;
            ctx.fill();
            
            ctx.restore();
          }
        }
      }

      requestAnimationFrame(animate);
    }
    animate();
  }


  // ==========================================
  // 7. Scroll Reveal IntersectionObserver Fallback
  // ==========================================
  if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once visible, we can unobserve
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      revealObserver.observe(el);
    });
  }

});
