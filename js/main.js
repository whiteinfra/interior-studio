'use strict';


var header = document.getElementById('header');
window.addEventListener('scroll', function () {
  header.classList.toggle('scrolled', window.scrollY > 60);
});


var burger = document.getElementById('burger');
var nav    = document.getElementById('nav');
if (burger && nav) {
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('.nav__link').forEach(function (l) {
    l.addEventListener('click', function () {
      nav.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
      nav.classList.remove('open');
      burger.classList.remove('open');
    }
  });
}


var page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link').forEach(function (l) {
  var h = l.getAttribute('href');
  l.classList.toggle('active', h === page || (page === '' && h === 'index.html'));
});


document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var id = this.getAttribute('href');
    if (id === '#') return;
    var el = document.getElementById(id.slice(1));
    if (el) {
      e.preventDefault();
      var top = el.getBoundingClientRect().top + window.pageYOffset - (header ? header.offsetHeight : 0) - 20;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});


var pfBtns  = document.querySelectorAll('.pf-btn');
var pfItems = document.querySelectorAll('.pf-item');
pfBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    pfBtns.forEach(function (b) { b.classList.remove('active'); });
    this.classList.add('active');
    var f = this.getAttribute('data-filter');
    pfItems.forEach(function (item) {
      item.style.display = (f === 'all' || item.getAttribute('data-cat') === f) ? 'block' : 'none';
    });
  });
});


function notEmpty(v, n) { return v.trim().length >= (n || 1); }
function validEmail(v)  { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }
function validPhone(v)  { return v.replace(/\D/g, '').length >= 10; }

function showErr(field, errEl, msg) {
  field.classList.remove('ok'); field.classList.add('err');
  if (errEl) { errEl.textContent = msg; errEl.classList.add('show'); }
}
function showOk(field, errEl) {
  field.classList.remove('err'); field.classList.add('ok');
  if (errEl) errEl.classList.remove('show');
}
function clearState(field, errEl) {
  field.classList.remove('err', 'ok');
  if (errEl) errEl.classList.remove('show');
}


var contactForm = document.getElementById('contact-form');
var fields = [
  { id: 'f-name',    errId: 'e-name',
    check: function (v) { return !notEmpty(v,2) ? "Вкажіть ваше ім'я (мін. 2 символи)" : null; } },
  { id: 'f-email',   errId: 'e-email',
    check: function (v) { return !validEmail(v) ? "Некоректний формат email-адреси" : null; } },
  { id: 'f-phone',   errId: 'e-phone',
    check: function (v) { return !validPhone(v) ? "Введіть щонайменше 10 цифр" : null; } },
  { id: 'f-service', errId: 'e-service',
    check: function (v) { return !v ? "Оберіть тип послуги" : null; } },
  { id: 'f-message', errId: 'e-message',
    check: function (v) { return !notEmpty(v,10) ? "Мінімум 10 символів" : null; } }
];

if (contactForm) {

  fields.forEach(function (cfg) {
    var f = document.getElementById(cfg.id);
    var e = document.getElementById(cfg.errId);
    if (!f) return;
    f.addEventListener(f.tagName === 'SELECT' ? 'change' : 'input', function () {
      var msg = cfg.check(this.value);
      if (msg) showErr(f, e, msg); else showOk(f, e);
    });
  });

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    fields.forEach(function (cfg) {
      var f = document.getElementById(cfg.id);
      var err = document.getElementById(cfg.errId);
      if (!f) return;
      var msg = cfg.check(f.value);
      if (msg) { showErr(f, err, msg); ok = false; } else showOk(f, err);
    });
    var box = document.getElementById('f-agree');
    var boxErr = document.getElementById('e-agree');
    if (box && !box.checked) { ok = false; if (boxErr) boxErr.classList.add('show'); }
    else if (box && boxErr) boxErr.classList.remove('show');

    if (ok) {
      openModal();
      contactForm.reset();
      fields.forEach(function (cfg) {
        var f = document.getElementById(cfg.id);
        var err = document.getElementById(cfg.errId);
        if (f) clearState(f, err);
      });
      var cnt = document.getElementById('char-count');
      if (cnt) { cnt.textContent = '0 символів'; cnt.style.color = ''; }
    } else {
      var first = contactForm.querySelector('.err');
      if (first) { first.scrollIntoView({ behavior: 'smooth', block: 'center' }); first.focus(); }
    }
  });

  var agreeBox = document.getElementById('f-agree');
  var agreeErr = document.getElementById('e-agree');
  if (agreeBox && agreeErr) agreeBox.addEventListener('change', function () { if (this.checked) agreeErr.classList.remove('show'); });
}


var msgArea   = document.getElementById('f-message');
var charCount = document.getElementById('char-count');
if (msgArea && charCount) {
  msgArea.addEventListener('input', function () {
    var n = this.value.length;
    charCount.textContent = n + ' символів';
    charCount.style.color = n < 10 ? '#D44' : '#4A4';
  });
}


var modalEl    = document.getElementById('modal');
var modalClose = document.getElementById('modal-close');
function openModal()  { if (modalEl) { modalEl.classList.add('open'); document.body.style.overflow = 'hidden'; } }
function closeModal() { if (modalEl) { modalEl.classList.remove('open'); document.body.style.overflow = ''; } }
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalEl) modalEl.addEventListener('click', function (e) { if (e.target === modalEl) closeModal(); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });


var animEls = document.querySelectorAll('.svc-card, .pf-item, .review, .about__img-wrap, .cinfo, .svc-block__img');
if ('IntersectionObserver' in window && animEls.length) {
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.style.opacity = '1'; en.target.style.transform = 'translateY(0)'; obs.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  animEls.forEach(function (el) {
    el.style.opacity = '0'; el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .55s ease, transform .55s ease';
    obs.observe(el);
  });
}
