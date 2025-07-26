// 모바일 메뉴 토글
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // 햄버거 메뉴 애니메이션
    const spans = mobileToggle.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg) translateY(8px)' 
        : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(-45deg) translateY(-8px)' 
        : 'none';
});

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // 모바일 메뉴 닫기
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// 스크롤 시 네비게이션 스타일 변경
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// 모달 관련 함수
const modal = document.getElementById('partnershipModal');

function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // 스크롤 방지
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // 스크롤 복원
}

// 모달 외부 클릭 시 닫기
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// 모달 폼 제출 처리
const modalForm = document.getElementById('modalForm');
modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 폼 데이터 수집
    const formData = {
        name: document.getElementById('modal-name').value,
        phone: document.getElementById('modal-phone').value,
        email: document.getElementById('modal-email').value,
        location: document.getElementById('modal-location').value,
        budget: document.getElementById('modal-budget').value,
        message: document.getElementById('modal-message').value,
        privacyAgree: document.getElementById('privacy-agree').checked
    };
    
    // 여기서 실제로는 서버로 데이터를 전송하겠지만, 
    // 지금은 알림만 표시
    alert(`무료 상담 신청이 완료되었습니다!\n\n${formData.name}님의 신청이 정상적으로 접수되었습니다.\n24시간 내에 전문 상담사가 연락드리겠습니다.\n\n감사합니다!`);
    
    // 폼 초기화 및 모달 닫기
    modalForm.reset();
    closeModal();
});

// 갤러리 이미지 클릭 효과
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const emoji = this.querySelector('.gallery-image').textContent;
        const name = this.querySelector('p').textContent;
        alert(`${emoji} ${name} - 더 자세한 정보는 준비 중입니다!`);
    });
});

// 페이지 로드 시 애니메이션
window.addEventListener('load', () => {
    // 히어로 섹션 애니메이션
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(30px)';
    heroSubtitle.style.opacity = '0';
    heroSubtitle.style.transform = 'translateY(30px)';
    heroButtons.style.opacity = '0';
    heroButtons.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        heroTitle.style.transition = 'all 0.6s ease';
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        heroSubtitle.style.transition = 'all 0.6s ease';
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
    }, 300);
    
    setTimeout(() => {
        heroButtons.style.transition = 'all 0.6s ease';
        heroButtons.style.opacity = '1';
        heroButtons.style.transform = 'translateY(0)';
    }, 500);
});

// Intersection Observer로 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 애니메이션을 적용할 요소들
document.querySelectorAll('.feature-card, .product-card, .info-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// 현재 연도 표시
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-content p');
footerText.textContent = footerText.textContent.replace('2024', currentYear);