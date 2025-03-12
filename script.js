// 스크롤 시 헤더 스타일 변경
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(0, 26, 10, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.backgroundColor = 'rgba(0, 26, 10, 0.9)';
            header.style.boxShadow = 'none';
        }
    });

    // 스크롤 애니메이션
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.stat-card, .feature-card, .benefit-card, .pricing-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = element.classList.contains('pricing-card') && element.classList.contains('featured') 
                    ? 'scale(1.05)' 
                    : 'translateY(0)';
            }
        });
    };

    // 초기 로드 시 요소 숨기기
    const elementsToAnimate = document.querySelectorAll('.stat-card, .feature-card, .benefit-card, .pricing-card');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // 스크롤 이벤트에 애니메이션 함수 연결
    window.addEventListener('scroll', animateOnScroll);
    
    // 초기 로드 시 한 번 실행
    animateOnScroll();

    // 스무스 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 카운터 애니메이션
    const startCounters = function() {
        const counters = document.querySelectorAll('.stat-card h3, .metric-highlight h3');
        
        counters.forEach(counter => {
            const target = parseInt(counter.innerText);
            const duration = 2000; // 2초
            const step = Math.ceil(target / (duration / 20)); // 20ms마다 업데이트
            let current = 0;
            
            const updateCounter = function() {
                current += step;
                if (current >= target) {
                    counter.innerText = target + (counter.innerText.includes('%') ? '%' : '+');
                    clearInterval(timer);
                } else {
                    counter.innerText = current + (counter.innerText.includes('%') ? '%' : '+');
                }
            };
            
            counter.innerText = '0';
            const timer = setInterval(updateCounter, 20);
        });
    };

    // 카운터 요소가 화면에 나타날 때 애니메이션 시작
    const observeCounters = function() {
        const counters = document.querySelectorAll('.stat-card h3, .metric-highlight h3');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });
        
        if (counters.length > 0) {
            observer.observe(counters[0].parentElement);
        }
    };
    
    observeCounters();

    // 배경 애니메이션 효과
    const createBubbles = function() {
        const bgAnimation = document.querySelector('.bg-animation');
        const bubbleCount = 10;
        
        // 기존 버블 제거
        while (bgAnimation.firstChild) {
            bgAnimation.removeChild(bgAnimation.firstChild);
        }
        
        // 새 버블 생성
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('span');
            const size = Math.random() * 60 + 20; // 20px ~ 80px
            const position = Math.random() * 100; // 0% ~ 100%
            const delay = Math.random() * 15; // 0s ~ 15s
            const duration = Math.random() * 15 + 10; // 10s ~ 25s
            
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${position}%`;
            bubble.style.animationDelay = `${delay}s`;
            bubble.style.animationDuration = `${duration}s`;
            
            bgAnimation.appendChild(bubble);
        }
    };
    
    createBubbles();
    
    // 윈도우 크기 변경 시 버블 재생성
    window.addEventListener('resize', createBubbles);

    // 히어로 섹션 슬로건 즉시 표시
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.style.opacity = '1';
        heroTitle.style.animation = 'none';
    }

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.animation = 'none';
    }

    // 버튼 호버 효과 강화
    const enhanceButtons = function() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-pricing, .btn-cta');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 179, 71, 0.3)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    };
    
    enhanceButtons();

    // 3D 카드 효과
    const add3DEffect = function() {
        const cards = document.querySelectorAll('.pricing-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left; // 마우스 X 위치
                const y = e.clientY - rect.top; // 마우스 Y 위치
                
                // 카드 중앙에서의 거리 계산 (-1 ~ 1 범위)
                const xRotation = ((y - rect.height / 2) / rect.height) * 10; // -5도 ~ 5도
                const yRotation = ((x - rect.width / 2) / rect.width) * -10; // -5도 ~ 5도
                
                this.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
                
                // 빛 효과
                const shine = document.createElement('div');
                shine.style.position = 'absolute';
                shine.style.top = '0';
                shine.style.left = '0';
                shine.style.right = '0';
                shine.style.bottom = '0';
                shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)`;
                shine.style.pointerEvents = 'none';
                
                // 기존 빛 효과 제거
                const existingShine = this.querySelector('.card-shine');
                if (existingShine) {
                    this.removeChild(existingShine);
                }
                
                shine.classList.add('card-shine');
                this.appendChild(shine);
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                
                // 빛 효과 제거
                const shine = this.querySelector('.card-shine');
                if (shine) {
                    this.removeChild(shine);
                }
            });
        });
    };
    
    add3DEffect();
}); 