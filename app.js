/* ═══════════════════════════════════════
   ЭКОМАТ 3.0 — app.js (v11)
   Роли: Vendor · Distributor · Merchant
   ═══════════════════════════════════════ */

const CAP = 40, MY_DIST = 'АкваДист КЗ', MY_M = 'ТОО Чистота';
const CN = { 'CH-001': 'Шампунь Pro', 'CH-002': 'Кондиционер X', 'CH-003': 'Воск Elite', 'CH-004': 'Автошампунь Z', 'CH-005': 'Полироль S' };
const photoStore = {};

/* ── ДАННЫЕ ── */
let devs = [
  { id: 'ECO-001', st: 'online',  dist: 'АкваДист КЗ', mer: 'ТОО Чистота', addr: 'ул. Абая 12, Алматы',        temp: '38°C', err: 0, note: '', ad: 'AD-01', tara: 47, ch: [{ c: 'CH-001', l: 28.8, a: true  }, { c: 'CH-002', l: 18.0, a: true  }, { c: '', l: 0, a: false }, { c: '', l: 0, a: false }] },
  { id: 'ECO-002', st: 'offline', dist: 'АкваДист КЗ', mer: 'ИП Сервис+',  addr: 'пр. Достык 89, Алматы',      temp: '—',    err: 2, note: '', ad: 'AD-02', tara: 5,  ch: [{ c: 'CH-001', l: 12.0, a: true  }, { c: 'CH-003', l: 24.0, a: false }, { c: '', l: 0, a: false }, { c: '', l: 0, a: false }] },
  { id: 'ECO-003', st: 'online',  dist: 'ЭкоСнаб',     mer: 'ТОО АвтоСпа', addr: 'ул. Байтурсынова 5, Астана', temp: '41°C', err: 0, note: '', ad: 'AD-01', tara: 22, ch: [{ c: 'CH-004', l: 38.0, a: true  }, { c: 'CH-005', l: 31.2, a: true  }, { c: 'CH-001', l: 22.0, a: true }, { c: 'CH-002', l: 16.0, a: true }] },
  { id: 'ECO-004', st: 'online',  dist: 'ЭкоСнаб',     mer: 'ИП Блеск',    addr: 'ул. Момышулы 22, Астана',    temp: '36°C', err: 1, note: '', ad: 'AD-02', tara: 8,  ch: [{ c: 'CH-001', l: 20.0, a: true  }, { c: 'CH-002', l: 0,    a: false }, { c: '', l: 0, a: false }, { c: '', l: 0, a: false }] },
  { id: 'ECO-005', st: 'new',     dist: '',             mer: '',             addr: '—',                          temp: '—',    err: 0, note: '', ad: '',      tara: 0,  ch: [{ c: '', l: 0, a: false }, { c: '', l: 0, a: false }, { c: '', l: 0, a: false }, { c: '', l: 0, a: false }] },
];

let dists = [
  { id: 1, name: 'АкваДист КЗ', email: 'info@akva.kz',  devs: ['ECO-001', 'ECO-002'], st: 'paid',   rate: 21000 },
  { id: 2, name: 'ЭкоСнаб',    email: 'eco@snab.kz',   devs: ['ECO-003', 'ECO-004'], st: 'paid',   rate: 21000 },
  { id: 3, name: 'ХимТрейд',   email: 'chem@trade.kz', devs: [],                     st: 'frozen', rate: 21000 },
];
let nDist = 4;

let mercs = [
  { id: 1, name: 'ТОО Чистота', email: 'clean@clean.kz', devs: ['ECO-001'], st: 'paid',   stm: true,  rate: 15000 },
  { id: 2, name: 'ИП Сервис+',  email: 'serv@mail.kz',   devs: ['ECO-002'], st: 'frozen', stm: false, rate: 15000 },
];
let nMerc = 3;

let stmM = [
  { id: 1, name: 'ТОО Чистота', stocks: [{ c: 'CH-001', r: 85 }, { c: 'CH-002', r: 32 }], hist: [{ date: '2025-05-10', c: 'CH-001', v: 50, wb: 'WB-20250510-01' }, { date: '2025-05-01', c: 'CH-002', v: 40, wb: 'WB-20250501-01' }] },
  { id: 2, name: 'ИП Сервис+',  stocks: [{ c: 'CH-001', r: 18 }, { c: 'CH-003', r: 55 }], hist: [{ date: '2025-05-12', c: 'CH-001', v: 30, wb: 'WB-20250512-02' }] },
];

let mStock = [
  { id: 'CH-001', name: 'Шампунь Pro',    ship: [{ v: 10, d: '2025-05-01' }, { v: 20, d: '2025-05-02' }] },
  { id: 'CH-002', name: 'Кондиционер X',  ship: [{ v: 40, d: '2025-05-01' }] },
  { id: 'CH-004', name: 'Автошампунь Z',  ship: [{ v: 30, d: '2025-05-12' }] },
];
const used = { 'CH-001': 11.2, 'CH-002': 22.0, 'CH-004': 17.5 };

let chems = [
  { id: 'CH-001', name: 'Шампунь Pro',   price: 450, cal: 1.02, comment: 'Базовый шампунь',     updatedAt: '2025-05-10' },
  { id: 'CH-002', name: 'Кондиционер X', price: 680, cal: 1.00, comment: 'После мойки',          updatedAt: '2025-05-08' },
  { id: 'CH-003', name: 'Воск Elite',    price: 990, cal: 0.98, comment: 'Полировочный воск',    updatedAt: '2025-04-22' },
  { id: 'CH-004', name: 'Автошампунь Z', price: 520, cal: 1.05, comment: 'Усиленный',            updatedAt: '2025-05-01' },
  { id: 'CH-005', name: 'Полироль S',    price: 750, cal: 1.01, comment: 'Финишная полировка',   updatedAt: '2025-04-15' },
];
let adsList = [
  { id: 'AD-01', name: 'Летняя акция',  comment: 'Скидка 20%', updatedAt: '2025-05-14' },
  { id: 'AD-02', name: 'Базовый пакет', comment: 'Стандарт',   updatedAt: '2025-04-30' },
  { id: 'AD-03', name: 'Зимняя акция',  comment: 'Антилёд',    updatedAt: '2025-03-22' },
];
let nextChem = 6, nextAd = 4;

const txns = [
  { id: 'TXN-8821', dist: 'АкваДист КЗ', mer: 'ТОО Чистота', dev: 'ECO-001', date: '2025-05-16', amt: 4500, c: 'CH-001', vol: 1000, tara: 1, bal: 0 },
  { id: 'TXN-8820', dist: 'АкваДист КЗ', mer: 'ТОО Чистота', dev: 'ECO-001', date: '2025-05-15', amt: 9000, c: 'CH-002', vol: 1500, tara: 0, bal: 500 },
  { id: 'TXN-8819', dist: 'ЭкоСнаб',     mer: 'ТОО АвтоСпа', dev: 'ECO-003', date: '2025-05-15', amt: 6800, c: 'CH-004', vol: 1300, tara: 2, bal: 0 },
  { id: 'TXN-8818', dist: 'ЭкоСнаб',     mer: 'ИП Блеск',    dev: 'ECO-004', date: '2025-05-14', amt: 3200, c: 'CH-001', vol: 700,  tara: 0, bal: 800 },
  { id: 'TXN-8817', dist: 'АкваДист КЗ', mer: 'ИП Сервис+',  dev: 'ECO-002', date: '2025-05-13', amt: 5100, c: 'CH-003', vol: 550,  tara: 1, bal: 0 },
  { id: 'TXN-8815', dist: 'АкваДист КЗ', mer: 'ТОО Чистота', dev: 'ECO-001', date: '2025-05-11', amt: 3800, c: 'CH-001', vol: 840,  tara: 2, bal: 0 },
];

/* ── НАВИГАЦИЯ ── */
const NAV = {
  vendor: [
    { id: 'v-d',   ic: 'ti-truck',         l: 'Дистрибьюторы' },
    { id: 'v-dev', ic: 'ti-device-laptop',  l: 'Устройства' },
    { id: 'v-fin', ic: 'ti-chart-bar',      l: 'Финансы' },
  ],
  dist: [
    { id: 'd-dev', ic: 'ti-device-laptop',     l: 'Мои устройства' },
    { id: 'd-mer', ic: 'ti-users',              l: 'Мерчанты' },
    { id: 'd-ass', ic: 'ti-flask',              l: 'Ассортимент' },
    { id: 'd-adv', ic: 'ti-photo',              l: 'Реклама' },
    { id: 'd-stm', ic: 'ti-tags',               l: 'СТМ' },
    { id: 'd-fin', ic: 'ti-chart-bar',          l: 'Финансы' },
  ],
  merch: [
    { id: 'm-dev', ic: 'ti-device-laptop',      l: 'Мои устройства' },
    { id: 'm-stk', ic: 'ti-building-warehouse', l: 'Склад СТМ' },
    { id: 'm-fin', ic: 'ti-chart-bar',          l: 'Финансы' },
  ],
};
const WIDE = ['v-dev', 'v-fin', 'd-dev', 'd-fin', 'm-dev', 'm-fin'];

let role = 'vendor', pg = 'v-d';
let exDist = null, exMer = null, exS = null;
let vfD = '', vfM = '', vfDv = '', vfC = '', vfF = '2025-05-01', vfT = '2025-05-16';
let dfM = '', dfDv = '', dfC = '', dfF = '2025-05-01', dfT = '2025-05-16';
let mfDv = '', mfC = '', mfF = '2025-05-01', mfT = '2025-05-16';
let dFSt = '', dFM = '';
let sLines = [{ c: '', v: '' }];

/* ── РОУТИНГ ── */
function sR(r) { role = r; ['vendor', 'dist', 'merch'].forEach((x, i) => document.querySelectorAll('.rt button')[i].classList.toggle('active', x === r)); pg = NAV[r][0].id; exDist = null; exMer = null; exS = null; renderSB(); render(); }
function go(p) { pg = p; renderSB(); render(); }
function renderSB() { document.getElementById('sb').innerHTML = NAV[role].map(n => `<div class="ni${pg === n.id ? ' a' : ''}" onclick="go('${n.id}')"><i class="ti ${n.ic}"></i>${n.l}</div>`).join(''); }
function setW(w) { const m = document.getElementById('main'); m.style.overflow = w ? 'hidden' : 'auto'; m.style.display = 'flex'; m.style.flexDirection = 'column'; }
function render() { setW(WIDE.includes(pg)); const P = { 'v-d': pVDist, 'v-dev': pVDev, 'v-fin': pVFin, 'd-dev': pDDev, 'd-mer': pDMer, 'd-ass': pDAss, 'd-adv': pDAdv, 'd-stm': pDStm, 'd-fin': pDFin, 'm-dev': pMDev, 'm-stk': pMStk, 'm-fin': pMFin }; document.getElementById('main').innerHTML = (P[pg] || pEmpty)(); }

/* ── HELPERS ── */
function nb() { const n = new Date(); return new Date(n.getFullYear(), n.getMonth() + 1, 1).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }); }
function bc(l) { const p = l / CAP; if (p <= 0) return 'var(--color-border-tertiary)'; if (p < .25) return '#E24B4A'; if (p < .5) return '#EF9F27'; return '#185FA5'; }
function sbc(r, t) { const p = t > 0 ? r / t : 0; if (p < .2) return '#E24B4A'; if (p < .5) return '#EF9F27'; return '#185FA5'; }
function td() { return new Date().toISOString().slice(0, 10); }
function fmtDate(s) { const [y, m, d] = s.split('-'); return `${d}.${m}.${y}`; }
function csvX(rows, fn) { const b = new Blob(['\uFEFF' + rows.map(r => r.join(',')).join('\n')], { type: 'text/csv;charset=utf-8' }); const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = fn; a.click(); URL.revokeObjectURL(u); }
function stats(items) { return `<div style="display:flex;gap:5px;flex-wrap:wrap">${items.map(i => `<div class="isc"><span class="il">${i[0]}</span><span class="iv"${i[2] ? ` style="color:${i[2]}"` : ''}>${i[1]}</span></div>`).join('')}</div>`; }
function hdr(t, btn = '') { return `<div style="padding:.625rem 1rem .5rem;flex-shrink:0;background:var(--color-background-primary);border-bottom:0.5px solid var(--color-border-tertiary);display:flex;align-items:center;justify-content:space-between"><div style="font-size:15px;font-weight:500">${t}</div>${btn}</div>`; }
function ftb(rows) { return `<div style="padding:.4rem 1rem;background:var(--color-background-primary);border-bottom:0.5px solid var(--color-border-tertiary);flex-shrink:0;display:flex;flex-direction:column;gap:5px">${rows}</div>`; }
function frow(c) { return `<div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap">${c}</div>`; }

function stBadge(st) {
  if (st === 'paid')   return `<span class="badge bpaid">Оплачено</span><div class="auto-b"><i class="ti ti-refresh" style="font-size:10px"></i>авто</div>`;
  if (st === 'frozen') return `<span class="badge bfrz"><i class="ti ti-snowflake" style="font-size:10px"></i> Заморожен</span><div class="frz-b"><i class="ti ti-snowflake" style="font-size:10px"></i>заморожен</div>`;
  return `<span class="badge bpend">Ожидание</span><div class="auto-b"><i class="ti ti-refresh" style="font-size:10px"></i>авто</div>`;
}

function cCell(ch) {
  if (!ch.c) return `<div class="cc2 emp"><span class="cid dim">—</span><div class="cbar"><div class="cbf"></div></div><span class="clit" style="color:var(--color-text-tertiary)">—</span><span class="cst uns">Не назначен</span></div>`;
  const p = Math.min(Math.round(ch.l / CAP * 100), 100), col = bc(ch.l), e = ch.l === 0, cl = !ch.a ? 'inact' : e ? 'emp' : 'act', lb = !ch.a ? 'Неактивен' : e ? 'Пустой' : 'Активен';
  return `<div class="cc2 ${cl}"><span class="cid${!ch.a ? ' dim' : ''}">${ch.c}</span><div class="cbar"><div class="cbf" style="width:${p}%;background:${ch.a && !e ? col : 'var(--color-border-tertiary)'}"></div></div><span class="clit" style="color:${ch.a && !e ? col : 'var(--color-text-tertiary)'}">${ch.l > 0 ? ch.l.toFixed(1) + ' л' : '0 л'}</span><span class="cst ${cl}">${lb}</span></div>`;
}

/* ════════════════════════════════
   VENDOR PAGES
   ════════════════════════════════ */
function pVDist() {
  return `<div class="pad">
  <div class="ph"><h2>Дистрибьюторы</h2></div>
  <div class="sg s4">
    <div class="sc"><div class="l">Всего</div><div class="v">${dists.length}</div></div>
    <div class="sc"><div class="l">Оплачено</div><div class="v" style="color:#27500A">${dists.filter(d => d.st === 'paid').length}</div></div>
    <div class="sc"><div class="l">Ожидание</div><div class="v" style="color:#854F0B">${dists.filter(d => d.st === 'pending').length}</div></div>
    <div class="sc"><div class="l">Заморожено</div><div class="v" style="color:#5B2D8E">${dists.filter(d => d.st === 'frozen').length}</div></div>
  </div>
  <div class="card">
    <div class="ch"><span class="ct">Список</span><button class="btn bp" onclick="openDistAdd()"><i class="ti ti-plus"></i> Добавить</button></div>
    <div class="tw"><table class="s">
      <colgroup><col style="width:22%"><col style="width:22%"><col style="width:10%"><col style="width:22%"><col style="width:14%"><col style="width:10%"></colgroup>
      <thead><tr><th>Наименование</th><th>E-mail</th><th>Устройств</th><th>SaaS статус</th><th>Сумма/мес</th><th></th></tr></thead>
      <tbody>${dists.map(d => {
        const amt = d.devs.length * d.rate, exp = exDist === d.id;
        return `<tr class="dr2" onclick="exDist=exDist===${d.id}?null:${d.id};render()">
          <td style="font-weight:500">${d.name}</td>
          <td style="color:var(--color-text-secondary);font-size:11px">${d.email}</td>
          <td><span class="badge bbl">${d.devs.length} шт</span></td>
          <td>${stBadge(d.st)}</td>
          <td style="font-weight:500;color:${amt > 0 && d.st !== 'frozen' ? '#185FA5' : 'var(--color-text-tertiary)'}">${amt > 0 ? amt.toLocaleString('ru-KZ') + ' ₸' : '—'}</td>
          <td><div style="display:flex;gap:3px" onclick="event.stopPropagation()">
            <button class="btn" onclick="openDistEdit(${d.id})"><i class="ti ti-edit" style="font-size:11px"></i></button>
            <button class="btn bd" onclick="openDistDel(${d.id})"><i class="ti ti-trash" style="font-size:11px"></i></button>
          </div></td>
        </tr>
        <tr style="display:${exp ? 'table-row' : 'none'}"><td colspan="6" style="padding:0;border-bottom:0.5px solid var(--color-border-tertiary)">
          <div class="ei">
            <div><div class="sl">Устройства</div><div style="display:flex;flex-wrap:wrap;gap:2px">
              ${d.devs.length === 0 ? '<span style="font-size:11px;color:var(--color-text-tertiary)">Нет</span>' : d.devs.map(id => { const dv = devs.find(x => x.id === id); return `<span class="dpill"><span class="dot ${dv && dv.st === 'online' ? 'dg' : 'dr'}"></span>${id}</span>`; }).join('')}
            </div></div>
            <div><div class="sl">SaaS</div>
              <div class="sr"><span class="sk">Ставка</span><span class="sv">${d.rate.toLocaleString('ru-KZ')} ₸</span></div>
              <div class="stot"><span>Итого/мес</span><span>${amt > 0 ? amt.toLocaleString('ru-KZ') + ' ₸' : '—'}</span></div>
              ${d.st === 'frozen' ? `<div style="display:flex;align-items:center;gap:5px;font-size:11px;color:#5B2D8E;background:#E8E4F5;padding:5px 8px;border-radius:var(--border-radius-md);margin-top:6px"><i class="ti ti-snowflake" style="font-size:12px"></i>Аккаунт заморожен. Платежи остановлены.</div>` : d.devs.length > 0 ? `<div class="ntc"><i class="ti ti-calendar-event" style="font-size:12px;flex-shrink:0"></i>Платёж с ${nb()}</div>` : ''}
            </div>
          </div>
        </td></tr>`;
      }).join('')}</tbody>
    </table></div>
  </div></div>`;
}

function pVDev() {
  const fD = window._vd || '', fS = window._vs || '';
  const list = devs.filter(d => { if (fD && d.dist !== fD) return false; if (fS) { if (fS === 'new' && d.st !== 'new') return false; if (fS !== 'new' && d.st !== fS.toLowerCase()) return false; } return true; });
  const hasF = fD || fS;
  return hdr('Устройства') +
    ftb(frow(`<select class="tsel" onchange="window._vd=this.value;render()"><option value="">Все дистрибьюторы</option>${dists.map(d => `<option${fD === d.name ? ' selected' : ''}>${d.name}</option>`).join('')}</select>
    <select class="tsel" onchange="window._vs=this.value;render()"><option value="">Все статусы</option><option${fS === 'Online' ? ' selected' : ''}>Online</option><option${fS === 'Offline' ? ' selected' : ''}>Offline</option><option value="new"${fS === 'new' ? ' selected' : ''}>Новые</option></select>
    ${hasF ? `<button class="btn bg_" onclick="window._vd='';window._vs='';render()"><i class="ti ti-x" style="font-size:11px"></i> Сбросить</button>` : ''}
    <div style="margin-left:auto">${stats([['Всего', list.length], ['Online', list.filter(d => d.st === 'online').length, '#27500A'], ['Offline', list.filter(d => d.st === 'offline').length, '#A32D2D'], ['Новые', list.filter(d => d.st === 'new').length, '#185FA5']])}</div>`)) +
    `<div style="flex:1;overflow-x:auto;overflow-y:auto"><table class="w">
      <thead><tr><th>ID</th><th>Статус</th><th>Дистрибьютор</th><th>Мерчант</th><th>Адрес</th><th>Темп.</th><th class="cc">К1</th><th class="cc">К2</th><th class="cc">К3</th><th class="cc">К4</th></tr></thead>
      <tbody>${list.map(d => {
        const isNew = d.st === 'new';
        return `<tr>
          <td><strong style="font-family:var(--font-mono)">${d.id}</strong></td>
          <td>${isNew ? '<span class="badge bbl"><i class="ti ti-sparkles" style="font-size:10px"></i> Новый</span>' : `<span class="badge ${d.st === 'online' ? 'bon' : 'boff'}"><span class="dot ${d.st === 'online' ? 'dg' : 'dr'}"></span>${d.st === 'online' ? 'Online' : 'Offline'}</span>`}</td>
          <td>${d.dist || '<span style="color:var(--color-text-tertiary)">—</span>'}</td>
          <td>${d.mer || '<span style="color:var(--color-text-tertiary)">—</span>'}</td>
          <td style="color:var(--color-text-secondary);max-width:130px;overflow:hidden;text-overflow:ellipsis">${d.addr}</td>
          <td>${d.temp}</td>
          ${d.ch.map(c => `<td style="text-align:center">${cCell(c)}</td>`).join('')}
        </tr>`;
      }).join('')}</tbody>
    </table></div>`;
}

/* Vendor Финансы — с полными фильтрами */
function pVFin() {
  const list = txns.filter(t => { if (vfD && t.dist !== vfD) return false; if (vfM && t.mer !== vfM) return false; if (vfDv && t.dev !== vfDv) return false; if (vfC && t.c !== vfC) return false; if (vfF && t.date < vfF) return false; if (vfT && t.date > vfT) return false; return true; });
  const tA = list.reduce((a, t) => a + t.amt, 0), tV = list.reduce((a, t) => a + t.vol, 0), tB = list.reduce((a, t) => a + t.bal, 0);
  const hasF = vfD || vfM || vfDv || vfC;
  const allMs = [...new Set(txns.map(t => t.mer))], allDs = [...new Set(txns.map(t => t.dev))];
  return hdr('Финансы', `<button class="btn bp" onclick="csvX([['ID','Дата','Дистрибьютор','Мерчант','Устройство','Химия','Объём','Тара','Сумма','Остаток'],...list.map(t=>[t.id,t.date,t.dist,t.mer,t.dev,t.c,t.vol,t.tara,t.amt,t.bal])],'vendor_fin.csv')"><i class="ti ti-download" style="font-size:12px"></i> Экспорт CSV</button>`) +
    ftb(frow(`<span style="font-size:11px;color:var(--color-text-tertiary);font-weight:500">Период:</span><input type="date" class="tdate" value="${vfF}" onchange="vfF=this.value;render()"><span style="font-size:11px;color:var(--color-text-tertiary)">—</span><input type="date" class="tdate" value="${vfT}" onchange="vfT=this.value;render()">`) +
      frow(`<span style="font-size:11px;color:var(--color-text-tertiary);font-weight:500">Фильтры:</span>
      <select class="tsel" onchange="vfD=this.value;render()"><option value="">Все дистрибьюторы</option>${dists.map(d => `<option${vfD === d.name ? ' selected' : ''}>${d.name}</option>`).join('')}</select>
      <select class="tsel" onchange="vfM=this.value;render()"><option value="">Все мерчанты</option>${allMs.map(m => `<option${vfM === m ? ' selected' : ''}>${m}</option>`).join('')}</select>
      <select class="tsel" onchange="vfDv=this.value;render()"><option value="">Все устройства</option>${allDs.map(d => `<option${vfDv === d ? ' selected' : ''}>${d}</option>`).join('')}</select>
      <select class="tsel" onchange="vfC=this.value;render()"><option value="">Вся химия</option>${chems.map(c => `<option value="${c.id}"${vfC === c.id ? ' selected' : ''}>${c.id} ${c.name}</option>`).join('')}</select>
      ${hasF ? `<button class="btn bg_" onclick="vfD='';vfM='';vfDv='';vfC='';render()"><i class="ti ti-x" style="font-size:11px"></i> Сбросить</button>` : ''}
      <div style="margin-left:auto">${stats([['Транзакций', list.length], ['Оборот', tA.toLocaleString('ru-KZ') + ' ₸'], ['Объём', tV.toLocaleString('ru-KZ') + ' мл'], ['Нереализовано', tB.toLocaleString('ru-KZ') + ' ₸', tB > 0 ? '#A32D2D' : undefined]])}</div>`)) +
    `<div style="flex:1;overflow-x:auto;overflow-y:auto"><table class="w">
      <thead><tr><th>ID транзакции</th><th>Дата</th><th>Дистрибьютор</th><th>Мерчант</th><th>Устройство</th><th>Химия</th><th>Объём</th><th>Тара</th><th>Сумма</th><th>Остаток</th></tr></thead>
      <tbody>${list.length === 0 ? `<tr><td colspan="10" style="text-align:center;padding:2rem;color:var(--color-text-tertiary)">Нет данных</td></tr>` : list.map(t => `<tr>
        <td style="font-family:var(--font-mono);font-size:11px;font-weight:500">${t.id}</td>
        <td style="color:var(--color-text-secondary)">${t.date}</td>
        <td>${t.dist}</td><td style="font-weight:500">${t.mer}</td>
        <td style="font-family:var(--font-mono)">${t.dev}</td>
        <td><div class="cp"><span class="cp-id">${t.c}</span><span>${CN[t.c] || t.c}</span></div></td>
        <td>${t.vol.toLocaleString('ru-KZ')} мл</td>
        <td>${t.tara > 0 ? `<span class="badge bbl">${t.tara} шт</span>` : '—'}</td>
        <td style="font-weight:500">${t.amt.toLocaleString('ru-KZ')} ₸</td>
        <td>${t.bal > 0 ? `<span style="color:#A32D2D;font-weight:500">${t.bal.toLocaleString('ru-KZ')} ₸</span>` : '—'}</td>
      </tr>`).join('')}</tbody>
    </table></div>`;
}

/* ════════════════════════════════
   DISTRIBUTOR PAGES
   ════════════════════════════════ */
function pDDev() {
  const my = devs.filter(d => d.dist === MY_DIST);
  const list = my.filter(d => { if (dFSt && d.st !== dFSt) return false; if (dFM && d.mer !== dFM) return false; return true; });
  const on = list.filter(d => d.st === 'online').length, hasF = dFSt || dFM;
  const adL = id => { const a = adsList.find(x => x.id === id); return a ? `${a.id} ${a.name}` : '—'; };
  return hdr('Мои устройства') +
    ftb(frow(`<select class="tsel" onchange="dFSt=this.value;render()"><option value="">Все статусы</option><option value="online"${dFSt === 'online' ? ' selected' : ''}>Online</option><option value="offline"${dFSt === 'offline' ? ' selected' : ''}>Offline</option></select>
    <select class="tsel" onchange="dFM=this.value;render()"><option value="">Все мерчанты</option>${[...new Set(my.map(d => d.mer))].map(m => `<option${dFM === m ? ' selected' : ''}>${m}</option>`).join('')}</select>
    ${hasF ? `<button class="btn bg_" onclick="dFSt='';dFM='';render()"><i class="ti ti-x" style="font-size:11px"></i> Сбросить</button>` : ''}
    <div style="margin-left:auto">${stats([['Всего', list.length], ['Online', on, '#27500A'], ['Offline', list.length - on, '#A32D2D']])}</div>`)) +
    `<div style="flex:1;overflow-x:auto;overflow-y:auto"><table class="w">
      <thead><tr><th>ID</th><th>Статус</th><th>Адрес</th><th>Мерчант</th><th>Реклама</th><th class="cc">К1</th><th class="cc">К2</th><th class="cc">К3</th><th class="cc">К4</th><th>Действия</th></tr></thead>
      <tbody>${list.length === 0 ? `<tr><td colspan="10" style="text-align:center;padding:2rem;color:var(--color-text-tertiary)">Нет устройств</td></tr>` : list.map(d => `<tr>
        <td><strong style="font-family:var(--font-mono)">${d.id}</strong></td>
        <td><span class="badge ${d.st === 'online' ? 'bon' : 'boff'}"><span class="dot ${d.st === 'online' ? 'dg' : 'dr'}"></span>${d.st === 'online' ? 'Online' : 'Offline'}</span></td>
        <td style="max-width:130px;overflow:hidden;text-overflow:ellipsis;color:var(--color-text-secondary)">${d.addr}</td>
        <td style="font-weight:500">${d.mer}</td>
        <td style="font-size:11px;color:var(--color-text-secondary)">${adL(d.ad)}</td>
        ${d.ch.map(c => `<td style="text-align:center">${cCell(c)}</td>`).join('')}
        <td><div style="display:flex;flex-direction:column;gap:3px">
          <button class="btn" onclick="openDE('${d.id}')"><i class="ti ti-edit" style="font-size:11px"></i> Изменить</button>
          <button class="btn bw" onclick="openOff('${d.id}')"><i class="ti ti-power" style="font-size:11px"></i> Откл.</button>
        </div></td>
      </tr>`).join('')}</tbody>
    </table></div>`;
}

function pDMer() {
  const withStm = mercs.filter(m => m.stm).length, frz = mercs.filter(m => m.st === 'frozen').length;
  return `<div class="pad"><div class="ph"><h2>Мерчанты</h2></div>
  <div class="sg s5">
    <div class="sc"><div class="l">Всего</div><div class="v">${mercs.length}</div></div>
    <div class="sc"><div class="l">Оплачено</div><div class="v" style="color:#27500A">${mercs.filter(m => m.st === 'paid').length}</div></div>
    <div class="sc"><div class="l">Ожидание</div><div class="v" style="color:#854F0B">${mercs.filter(m => m.st === 'pending').length}</div></div>
    <div class="sc"><div class="l">Заморожено</div><div class="v" style="color:#5B2D8E">${frz}</div></div>
    <div class="sc"><div class="l">СТМ</div><div class="v" style="color:#5B2D8E">${withStm} / ${mercs.length}</div></div>
  </div>
  <div class="card"><div class="ch"><span class="ct">Мерчанты</span><button class="btn bp" onclick="openAddMer()"><i class="ti ti-plus"></i> Добавить</button></div>
  <div class="tw"><table class="s">
    <colgroup><col style="width:22%"><col style="width:18%"><col style="width:10%"><col style="width:9%"><col style="width:18%"><col style="width:10%"><col style="width:13%"></colgroup>
    <thead><tr><th>Наименование</th><th>E-mail</th><th>Устройств</th><th>СТМ</th><th>Статус</th><th>Сумма/мес</th><th></th></tr></thead>
    <tbody>${mercs.map(m => {
      const amt = m.devs.length * m.rate, exp = exMer === m.id;
      return `<tr class="dr2" onclick="exMer=exMer===${m.id}?null:${m.id};render()">
        <td style="font-weight:500">${m.name}</td>
        <td style="color:var(--color-text-secondary);font-size:11px">${m.email}</td>
        <td><span class="badge bbl">${m.devs.length} шт</span></td>
        <td>${m.stm ? '<span class="badge bstm">СТМ</span>' : '—'}</td>
        <td>${stBadge(m.st)}</td>
        <td style="font-weight:500;color:${amt > 0 && m.st !== 'frozen' ? '#185FA5' : 'var(--color-text-tertiary)'}">${amt > 0 ? amt.toLocaleString('ru-KZ') + ' ₸' : '—'}</td>
        <td><div style="display:flex;gap:3px" onclick="event.stopPropagation()">
          <button class="btn" onclick="openEditMer(${m.id})"><i class="ti ti-edit" style="font-size:11px"></i></button>
          <button class="btn bd" onclick="openDelMer(${m.id})"><i class="ti ti-trash" style="font-size:11px"></i></button>
        </div></td>
      </tr>
      <tr style="display:${exp ? 'table-row' : 'none'}"><td colspan="7" style="padding:0;border-bottom:0.5px solid var(--color-border-tertiary)">
        <div class="ei">
          <div><div class="sl">Устройства</div><div style="display:flex;flex-wrap:wrap;gap:2px">
            ${m.devs.length === 0 ? '<span style="font-size:11px;color:var(--color-text-tertiary)">Нет</span>' : m.devs.map(id => { const dv = devs.find(x => x.id === id); return `<span class="dpill"><span class="dot ${dv && dv.st === 'online' ? 'dg' : 'dr'}"></span>${id}</span>`; }).join('')}
          </div>${m.stm ? `<div style="margin-top:6px"><span class="badge bstm"><i class="ti ti-tags" style="font-size:10px"></i> СТМ активен</span></div>` : ''}</div>
          <div><div class="sl">SaaS</div>
            <div class="sr"><span class="sk">Ставка</span><span class="sv">${m.rate.toLocaleString('ru-KZ')} ₸</span></div>
            <div class="stot"><span>Итого/мес</span><span>${amt > 0 ? amt.toLocaleString('ru-KZ') + ' ₸' : '—'}</span></div>
            ${m.st === 'frozen' ? `<div style="display:flex;align-items:center;gap:5px;font-size:11px;color:#5B2D8E;background:#E8E4F5;padding:5px 8px;border-radius:var(--border-radius-md);margin-top:6px"><i class="ti ti-snowflake" style="font-size:12px"></i>Аккаунт заморожен.</div>` : m.devs.length > 0 ? `<div class="ntc"><i class="ti ti-calendar-event" style="font-size:12px;flex-shrink:0"></i>Платёж с ${nb()}</div>` : ''}
          </div>
        </div>
      </td></tr>`;
    }).join('')}</tbody>
  </table></div></div></div>`;
}

function pDAss() { return `<div class="pad"><div class="ph"><h2>Ассортимент</h2></div><div class="card"><div class="ch"><span class="ct">Химии</span><button class="btn bp" onclick="openAddChem()"><i class="ti ti-plus"></i> Добавить</button></div><div class="tw"><table class="s"><colgroup><col style="width:12%"><col style="width:22%"><col style="width:14%"><col style="width:11%"><col style="width:24%"><col style="width:10%"><col style="width:7%"></colgroup><thead><tr><th>ID</th><th>Наименование</th><th>Цена /100мл</th><th>Калибровка</th><th>Комментарий</th><th>Изменён</th><th></th></tr></thead><tbody>${chems.map(c => `<tr><td style="font-family:var(--font-mono);font-size:11px;font-weight:500">${c.id}</td><td style="font-weight:500">${c.name}</td><td>${c.price} ₸</td><td style="color:var(--color-text-secondary)">${c.cal}</td><td style="color:var(--color-text-secondary);font-size:11px">${c.comment}</td><td style="color:var(--color-text-secondary);font-size:11px">${fmtDate(c.updatedAt)}</td><td><button class="btn" onclick="openEditChem('${c.id}')"><i class="ti ti-edit" style="font-size:11px"></i></button></td></tr>`).join('')}</tbody></table></div></div></div>`; }

function pDAdv() { return `<div class="pad"><div class="ph"><h2>Реклама</h2></div><div class="card"><div class="ch"><span class="ct">Макеты</span><button class="btn bp" onclick="openAddAd()"><i class="ti ti-plus"></i> Добавить</button></div><div class="tw"><table class="s"><colgroup><col style="width:13%"><col style="width:28%"><col style="width:32%"><col style="width:12%"><col style="width:7%"></colgroup><thead><tr><th>ID</th><th>Название</th><th>Комментарий</th><th>Изменён</th><th></th></tr></thead><tbody>${adsList.map(a => `<tr><td style="font-family:var(--font-mono);font-size:11px">${a.id}</td><td style="font-weight:500">${a.name}</td><td style="color:var(--color-text-secondary);font-size:11px">${a.comment}</td><td style="color:var(--color-text-secondary);font-size:11px">${fmtDate(a.updatedAt)}</td><td><button class="btn" onclick="openEditAd('${a.id}')"><i class="ti ti-edit" style="font-size:11px"></i></button></td></tr>`).join('')}</tbody></table></div></div></div>`; }

function pDStm() {
  return `<div class="pad"><div class="ph"><h2>СТМ</h2><button class="btn bp" onclick="openShip()"><i class="ti ti-truck"></i> Отгрузка</button></div>
  ${stmM.map(m => {
    const open = exS === m.id;
    return `<div class="mc" onclick="exS=exS===${m.id}?null:${m.id};render()">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div><div style="font-size:13px;font-weight:500">${m.name}</div><div style="font-size:11px;color:var(--color-text-secondary);margin-top:2px">${m.stocks.length} позиций · ${m.hist.length} отгрузок</div></div>
        <div style="display:flex;align-items:center;gap:7px">
          <button class="btn bp" onclick="event.stopPropagation();openShip(${m.id})"><i class="ti ti-truck" style="font-size:11px"></i> Отгрузить</button>
          <i class="ti ti-chevron-${open ? 'up' : 'down'}" style="font-size:14px;color:var(--color-text-tertiary)"></i>
        </div>
      </div>
      <div class="md${open ? ' open' : ''}">
        <div style="font-size:10px;font-weight:500;color:var(--color-text-tertiary);text-transform:uppercase;letter-spacing:.04em;margin-bottom:7px;margin-top:2px">Остатки</div>
        ${m.stocks.map(s => `<div class="cr"><span style="font-family:var(--font-mono);font-size:11px;color:var(--color-text-secondary);width:56px;flex-shrink:0">${s.c}</span><span style="font-size:12px;font-weight:500;flex:1">${CN[s.c] || s.c}</span><div style="width:80px;height:5px;background:var(--color-border-tertiary);border-radius:3px;overflow:hidden;flex-shrink:0"><div style="height:100%;border-radius:3px;width:${Math.min(s.r, 100)}%;background:${s.r < 20 ? '#E24B4A' : s.r < 50 ? '#EF9F27' : '#185FA5'}"></div></div><span style="font-size:11px;font-weight:500;width:46px;text-align:right;color:${s.r < 20 ? '#A32D2D' : 'var(--color-text-primary)'}">${s.r} л</span>${s.r < 20 ? '<span class="badge bwa" style="margin-left:3px">Мало</span>' : ''}</div>`).join('')}
        <div style="font-size:10px;font-weight:500;color:var(--color-text-tertiary);text-transform:uppercase;letter-spacing:.04em;margin:8px 0 5px">История</div>
        <table class="ht"><thead><tr><th>Дата</th><th>Химия</th><th>Объём</th><th>Накладная</th><th></th></tr></thead>
        <tbody>${m.hist.map(h => `<tr><td style="color:var(--color-text-secondary)">${h.date}</td><td><span style="font-family:var(--font-mono);font-size:10px;color:var(--color-text-secondary)">${h.c}</span> ${CN[h.c] || h.c}</td><td style="font-weight:500">${h.v} л</td><td style="font-family:var(--font-mono);font-size:10px;color:var(--color-text-secondary)">${h.wb}</td><td><button class="btn" style="padding:2px 6px" onclick="event.stopPropagation();alert('Печать ${h.wb}')"><i class="ti ti-printer" style="font-size:11px"></i></button></td></tr>`).join('')}
        </tbody></table>
      </div>
    </div>`;
  }).join('')}</div>`;
}

function pDFin() {
  const myT = txns.filter(t => t.dist === MY_DIST);
  const list = myT.filter(t => { if (dfM && t.mer !== dfM) return false; if (dfDv && t.dev !== dfDv) return false; if (dfC && t.c !== dfC) return false; if (dfF && t.date < dfF) return false; if (dfT && t.date > dfT) return false; return true; });
  const tA = list.reduce((a, t) => a + t.amt, 0), tV = list.reduce((a, t) => a + t.vol, 0), tB = list.reduce((a, t) => a + t.bal, 0);
  const hasF = dfM || dfDv || dfC;
  const myMs = [...new Set(myT.map(t => t.mer))], myDs = [...new Set(myT.map(t => t.dev))];
  return hdr('Финансы', `<button class="btn bp" onclick="csvX([['ID','Дата','Мерчант','Устройство','Химия','Объём','Тара','Сумма','Остаток'],...list.map(t=>[t.id,t.date,t.mer,t.dev,t.c,t.vol,t.tara,t.amt,t.bal])],'dist_fin.csv')"><i class="ti ti-download" style="font-size:12px"></i> Экспорт CSV</button>`) +
    ftb(frow(`<span style="font-size:11px;color:var(--color-text-tertiary);font-weight:500">Период:</span><input type="date" class="tdate" value="${dfF}" onchange="dfF=this.value;render()"><span style="font-size:11px;color:var(--color-text-tertiary)">—</span><input type="date" class="tdate" value="${dfT}" onchange="dfT=this.value;render()">`) +
      frow(`<span style="font-size:11px;color:var(--color-text-tertiary);font-weight:500">Фильтры:</span>
      <select class="tsel" onchange="dfM=this.value;render()"><option value="">Все мерчанты</option>${myMs.map(m => `<option${dfM === m ? ' selected' : ''}>${m}</option>`).join('')}</select>
      <select class="tsel" onchange="dfDv=this.value;render()"><option value="">Все устройства</option>${myDs.map(d => `<option${dfDv === d ? ' selected' : ''}>${d}</option>`).join('')}</select>
      <select class="tsel" onchange="dfC=this.value;render()"><option value="">Вся химия</option>${chems.map(c => `<option value="${c.id}"${dfC === c.id ? ' selected' : ''}>${c.id} ${c.name}</option>`).join('')}</select>
      ${hasF ? `<button class="btn bg_" onclick="dfM='';dfDv='';dfC='';render()"><i class="ti ti-x" style="font-size:11px"></i> Сбросить</button>` : ''}
      <div style="margin-left:auto">${stats([['Транзакций', list.length], ['Оборот', tA.toLocaleString('ru-KZ') + ' ₸'], ['Объём', tV.toLocaleString('ru-KZ') + ' мл'], ['Нереализовано', tB.toLocaleString('ru-KZ') + ' ₸', tB > 0 ? '#A32D2D' : undefined]])}</div>`)) +
    `<div style="flex:1;overflow-x:auto;overflow-y:auto"><table class="w">
      <thead><tr><th>ID транзакции</th><th>Дата</th><th>Мерчант</th><th>Устройство</th><th>Химия</th><th>Объём</th><th>Тара</th><th>Сумма</th><th>Остаток</th></tr></thead>
      <tbody>${list.length === 0 ? `<tr><td colspan="9" style="text-align:center;padding:2rem;color:var(--color-text-tertiary)">Нет данных</td></tr>` : list.map(t => `<tr>
        <td style="font-family:var(--font-mono);font-size:11px;font-weight:500">${t.id}</td>
        <td style="color:var(--color-text-secondary)">${t.date}</td>
        <td style="font-weight:500">${t.mer}</td>
        <td style="font-family:var(--font-mono)">${t.dev}</td>
        <td><div class="cp"><span class="cp-id">${t.c}</span><span>${CN[t.c] || t.c}</span></div></td>
        <td>${t.vol.toLocaleString('ru-KZ')} мл</td>
        <td>${t.tara > 0 ? `<span class="badge bbl">${t.tara} шт</span>` : '—'}</td>
        <td style="font-weight:500">${t.amt.toLocaleString('ru-KZ')} ₸</td>
        <td>${t.bal > 0 ? `<span style="color:#A32D2D;font-weight:500">${t.bal.toLocaleString('ru-KZ')} ₸</span>` : '—'}</td>
      </tr>`).join('')}</tbody>
    </table></div>`;
}

/* ════════════════════════════════
   MERCHANT PAGES
   ════════════════════════════════ */
function pMDev() {
  const my = devs.filter(d => d.mer === MY_M);
  const on = my.filter(d => d.st === 'online').length;
  return hdr('Мои устройства', `<div style="display:flex;gap:5px">${stats([['Online', on, '#27500A'], ['Offline', my.length - on, '#A32D2D']])}</div>`) +
    `<div style="flex:1;overflow-x:auto;overflow-y:auto"><table class="w">
      <thead><tr><th>ID</th><th>Статус</th><th>Адрес</th><th>Темп.</th><th>Тара (шт)</th><th class="cc">К1</th><th class="cc">К2</th><th class="cc">К3</th><th class="cc">К4</th><th>Действия</th></tr></thead>
      <tbody>${my.map(d => `<tr>
        <td><strong style="font-family:var(--font-mono)">${d.id}</strong></td>
        <td><span class="badge ${d.st === 'online' ? 'bon' : 'boff'}"><span class="dot ${d.st === 'online' ? 'dg' : 'dr'}"></span>${d.st === 'online' ? 'Online' : 'Offline'}</span></td>
        <td style="max-width:140px;overflow:hidden;text-overflow:ellipsis;color:var(--color-text-secondary)">${d.addr}</td>
        <td>${d.temp}</td>
        <td><span style="font-size:14px;font-weight:600">${d.tara}</span> <span style="font-size:10px;color:var(--color-text-tertiary)">шт</span></td>
        ${d.ch.map(c => `<td style="text-align:center">${cCell(c)}</td>`).join('')}
        <td><div style="display:flex;flex-direction:column;gap:3px">
          <button class="btn" onclick="openME('${d.id}')"><i class="ti ti-edit" style="font-size:11px"></i> Изменить</button>
          <button class="btn bw" onclick="openRef('${d.id}')"><i class="ti ti-droplet" style="font-size:11px"></i> Заправка</button>
          <button class="btn bd" onclick="openOff('${d.id}')"><i class="ti ti-power" style="font-size:11px"></i> Откл.</button>
        </div></td>
      </tr>`).join('')}</tbody>
    </table></div>`;
}

function pMStk() {
  const low = mStock.filter(e => { const t = e.ship.reduce((a, s) => a + s.v, 0), r = Math.max(0, t - (used[e.id] || 0)); return t > 0 && r / t < 0.2; }).length;
  const rows = mStock.map(e => {
    const tot = e.ship.reduce((a, s) => a + s.v, 0), rem = Math.max(0, tot - (used[e.id] || 0)), p = tot > 0 ? Math.min(Math.round(rem / tot * 100), 100) : 0, col = sbc(rem, tot), isL = tot > 0 && rem / tot < 0.2;
    return `<div class="stk-row"><span style="font-family:var(--font-mono);font-size:10px;color:var(--color-text-tertiary);width:54px;flex-shrink:0">${e.id}</span><div style="flex:1"><div style="display:flex;align-items:center;gap:7px;margin-bottom:5px"><span style="font-size:13px;font-weight:500">${e.name}</span>${isL ? `<span class="badge bwa"><i class="ti ti-alert-triangle" style="font-size:10px"></i> Мало</span>` : ''}</div><div style="display:flex;align-items:center;gap:8px"><div class="stk-bw"><div class="stk-bf" style="width:${p}%;background:${col}"></div></div><span style="font-size:11px;color:var(--color-text-tertiary)">Поставок: ${e.ship.length} · Итого: ${tot} л</span></div></div><div style="text-align:right;flex-shrink:0"><span style="font-size:20px;font-weight:700;color:${col}">${rem.toFixed(1)}</span> <span style="font-size:11px;color:var(--color-text-secondary)">л</span><div style="font-size:10px;color:var(--color-text-tertiary)">${p}%</div></div></div>`;
  }).join('');
  const allH = mStock.flatMap(e => e.ship.map(s => ({ ...s, id: e.id, name: e.name }))).sort((a, b) => b.d.localeCompare(a.d));
  return `<div class="pad"><div class="ph"><h2>Склад СТМ</h2>${low > 0 ? `<span class="badge bwa"><i class="ti ti-alert-triangle" style="font-size:10px"></i> ${low} заканчивается</span>` : ''}</div><div class="card"><div style="font-size:13px;font-weight:500;margin-bottom:.75rem">Текущие остатки</div>${rows || '<div style="font-size:13px;color:var(--color-text-tertiary);text-align:center;padding:1rem">Склад пуст</div>'}</div><div class="card"><div style="font-size:13px;font-weight:500;margin-bottom:.625rem">История поставок</div><table class="s"><colgroup><col style="width:15%"><col style="width:13%"><col style="width:33%"><col style="width:39%"></colgroup><thead><tr><th>Дата</th><th>ID</th><th>Наименование</th><th>Объём</th></tr></thead><tbody>${allH.map(h => `<tr><td style="color:var(--color-text-secondary)">${h.d}</td><td style="font-family:var(--font-mono);font-size:10px;color:var(--color-text-secondary)">${h.id}</td><td style="font-weight:500">${h.name}</td><td style="font-weight:500;color:#185FA5">+${h.v} л</td></tr>`).join('')}</tbody></table></div></div>`;
}

function pMFin() {
  const myT = txns.filter(t => t.mer === MY_M);
  const list = myT.filter(t => { if (mfDv && t.dev !== mfDv) return false; if (mfC && t.c !== mfC) return false; if (mfF && t.date < mfF) return false; if (mfT && t.date > mfT) return false; return true; });
  const tA = list.reduce((a, t) => a + t.amt, 0), tV = list.reduce((a, t) => a + t.vol, 0), tB = list.reduce((a, t) => a + t.bal, 0), tTa = list.reduce((a, t) => a + t.tara, 0);
  const hasF = mfDv || mfC;
  const dIds = [...new Set(myT.map(t => t.dev))];
  return hdr('Финансы', `<button class="btn bp" onclick="csvX([['ID','Дата','Устройство','Химия','Объём','Тара','Сумма','Остаток'],...list.map(t=>[t.id,t.date,t.dev,t.c,t.vol,t.tara,t.amt,t.bal])],'merch_fin.csv')"><i class="ti ti-download" style="font-size:12px"></i> Экспорт CSV</button>`) +
    ftb(frow(`<span style="font-size:11px;color:var(--color-text-tertiary);font-weight:500">Период:</span><input type="date" class="tdate" value="${mfF}" onchange="mfF=this.value;render()"><span style="font-size:11px;color:var(--color-text-tertiary)">—</span><input type="date" class="tdate" value="${mfT}" onchange="mfT=this.value;render()">`) +
      frow(`<span style="font-size:11px;color:var(--color-text-tertiary);font-weight:500">Фильтры:</span>
      <select class="tsel" onchange="mfDv=this.value;render()"><option value="">Все устройства</option>${dIds.map(d => `<option${mfDv === d ? ' selected' : ''}>${d}</option>`).join('')}</select>
      <select class="tsel" onchange="mfC=this.value;render()"><option value="">Вся химия</option>${chems.map(c => `<option value="${c.id}"${mfC === c.id ? ' selected' : ''}>${c.id} ${c.name}</option>`).join('')}</select>
      ${hasF ? `<button class="btn bg_" onclick="mfDv='';mfC='';render()"><i class="ti ti-x" style="font-size:11px"></i> Сбросить</button>` : ''}
      <div style="margin-left:auto">${stats([['Транзакций', list.length], ['Оборот', tA.toLocaleString('ru-KZ') + ' ₸'], ['Объём', tV.toLocaleString('ru-KZ') + ' мл'], ['Тара', tTa + ' шт'], ['Нереализовано', tB.toLocaleString('ru-KZ') + ' ₸', tB > 0 ? '#A32D2D' : undefined]])}</div>`)) +
    `<div style="flex:1;overflow-x:auto;overflow-y:auto"><table class="w">
      <thead><tr><th>ID транзакции</th><th>Дата</th><th>Устройство</th><th>Химия</th><th>Объём</th><th>Тара</th><th>Сумма</th><th>Остаток (кред.)</th></tr></thead>
      <tbody>${list.length === 0 ? `<tr><td colspan="8" style="text-align:center;padding:2rem;color:var(--color-text-tertiary)">Нет транзакций</td></tr>` : list.map(t => `<tr>
        <td style="font-family:var(--font-mono);font-size:11px;font-weight:500">${t.id}</td>
        <td style="color:var(--color-text-secondary)">${t.date}</td>
        <td style="font-family:var(--font-mono)">${t.dev}</td>
        <td><div class="cp"><span class="cp-id">${t.c}</span><span>${CN[t.c] || t.c}</span></div></td>
        <td>${t.vol.toLocaleString('ru-KZ')} мл</td>
        <td>${t.tara > 0 ? `<span class="badge bbl">${t.tara} шт</span>` : '—'}</td>
        <td style="font-weight:500">${t.amt.toLocaleString('ru-KZ')} ₸</td>
        <td>${t.bal > 0 ? `<span style="color:#A32D2D;font-weight:500">${t.bal.toLocaleString('ru-KZ')} ₸</span>` : '—'}</td>
      </tr>`).join('')}</tbody>
    </table></div>`;
}

function pEmpty() { return `<div class="pad"><div style="text-align:center;padding:3rem;color:var(--color-text-tertiary)"><i class="ti ti-construction" style="font-size:28px;display:block;margin-bottom:8px"></i>В разработке</div></div>`; }

/* ════════════════════════════════
   MODALS
   ════════════════════════════════ */
function openM(html, sm) { const mb = document.getElementById('mb'); mb.className = 'modal' + (sm ? ' msm' : ''); mb.innerHTML = html; document.getElementById('mo').classList.add('open'); }
function closeM() { document.getElementById('mo').classList.remove('open'); }

function openOff(id) { const d = devs.find(x => x.id === id); openM(`<div class="mh"><span class="mt2" style="color:#854F0B">Отключить ${d.id}</span><button class="btn bg_" onclick="closeM()"><i class="ti ti-x"></i></button></div><div class="wb"><i class="ti ti-alert-triangle" style="font-size:17px;flex-shrink:0;margin-top:1px"></i><div><div style="font-weight:500;margin-bottom:2px">${d.id}</div><div>На экране — <strong>технический режим</strong>.</div></div></div><div class="mf"><button class="btn" onclick="closeM()">Отмена</button><button class="btn bw" onclick="devs.find(x=>x.id==='${id}').st='offline';closeM();render()"><i class="ti ti-power" style="font-size:11px"></i> Подтвердить</button></div>`, true); }

/* Distributor device edit — только назначить химию, без toggle */
function openDE(id) {
  const d = devs.find(x => x.id === id);
  const chR = d.ch.map((ch, i) => {
    const p = ch.l > 0 ? Math.min(Math.round(ch.l / CAP * 100), 100) : 0, col = bc(ch.l), e = ch.l === 0;
    return `<div class="cel">
      <span style="font-size:11px;color:var(--color-text-secondary);font-weight:500">Канал ${i + 1}</span>
      <div>
        <select id="cc${i}" style="width:100%">${['', 'CH-001', 'CH-002', 'CH-003', 'CH-004', 'CH-005'].map(c => `<option value="${c}"${c === ch.c ? ' selected' : ''}>${c ? c + ' · ' + CN[c] : '— не назначена —'}</option>`).join('')}</select>
        <div style="display:flex;align-items:center;gap:7px;margin-top:3px">
          <div class="tbr2" style="flex:1"><div class="tbf2" style="width:${p}%;background:${ch.c && !e ? col : 'var(--color-border-tertiary)'}"></div></div>
          <span style="font-size:10px;color:${ch.c && !e ? col : 'var(--color-text-tertiary)'}">${ch.l > 0 ? ch.l.toFixed(1) + ' л' : '—'}</span>
        </div>
      </div>
    </div>`;
  }).join('');
  openM(`<div class="mh"><span class="mt2">Редактировать — ${d.id}</span><button class="btn bg_" onclick="closeM()"><i class="ti ti-x"></i></button></div>
  <div class="fg" style="margin-bottom:4px">
    <div class="ff" style="margin-bottom:0"><label>Адрес</label><input type="text" id="ea" value="${d.addr}"></div>
    <div class="ff" style="margin-bottom:0"><label>Мерчант</label><select id="em">${mercs.map(m => `<option${m.name === d.mer ? ' selected' : ''}>${m.name}</option>`).join('')}</select></div>
    <div class="ff" style="margin-bottom:0"><label>Реклама</label><select id="ead">${adsList.map(a => `<option value="${a.id}"${a.id === d.ad ? ' selected' : ''}>${a.id} · ${a.name}</option>`).join('')}</select></div>
    <div class="ff" style="margin-bottom:0"><label>Комментарий</label><input type="text" id="eco" value="${d.note}"></div>
  </div>
  <div class="dvd"></div>
  <div style="font-size:10px;font-weight:500;color:var(--color-text-tertiary);text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px">Назначить химию по каналам</div>
  <div class="cch"><span>Канал</span><span>Химия</span></div>
  ${chR}
  <div style="font-size:10px;color:var(--color-text-tertiary);display:flex;align-items:center;gap:4px;margin-top:5px"><i class="ti ti-info-circle" style="font-size:11px"></i>Активацию каналов управляет мерчант на своём устройстве.</div>
  <div class="dvd"></div>
  <button class="btn bw" style="width:100%;justify-content:center" onclick="closeM();openOff('${id}')"><i class="ti ti-power" style="font-size:12px"></i> Отключить устройство</button>
  <div class="mf"><button class="btn" onclick="closeM()">Отмена</button><button class="btn bp" onclick="saveDE('${id}')"><i class="ti ti-check"></i> Сохранить</button></div>`);
}
function saveDE(id) {
  const d = devs.find(x => x.id === id);
  d.addr = document.getElementById('ea').value.trim() || d.addr;
  d.mer = document.getElementById('em').value;
  d.ad = document.getElementById('ead').value;
  d.note = document.getElementById('eco').value.trim();
  for (let i = 0; i < 4; i++) { const newC = document.getElementById('cc' + i).value; if (newC !== d.ch[i].c) { d.ch[i].c = newC; d.ch[i].a = !!newC; } }
  closeM(); render();
}

/* Merchant device edit — toggle активации каналов */
function openME(id) {
  const d = devs.find(x => x.id === id);
  const chRows = d.ch.map((ch, i) => {
    if (!ch.c) return `<div class="ch-toggle-row" style="opacity:.4"><label class="ch-toggle-switch"><input type="checkbox" disabled><span class="ch-toggle-slider"></span></label><span style="font-size:11px;color:var(--color-text-tertiary);flex:1">Канал ${i + 1} — химия не назначена</span></div>`;
    const p = Math.min(Math.round(ch.l / CAP * 100), 100), col = bc(ch.l), e = ch.l === 0;
    return `<div class="ch-toggle-row">
      <label class="ch-toggle-switch"><input type="checkbox" id="ct${i}" ${ch.a ? 'checked' : ''} onchange="updChTog(${i},'${id}')"><span class="ch-toggle-slider"></span></label>
      <div style="flex:1">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px">
          <span style="font-size:12px;font-weight:500;font-family:var(--font-mono)">${ch.c}</span>
          <span style="font-size:11px;font-weight:500;color:${ch.a && !e ? col : 'var(--color-text-tertiary)'}">${ch.l > 0 ? ch.l.toFixed(1) + ' л' : '0 л'}</span>
        </div>
        <div style="height:5px;background:var(--color-border-tertiary);border-radius:3px;overflow:hidden"><div style="height:100%;border-radius:3px;width:${p}%;background:${ch.a && !e ? col : 'var(--color-border-tertiary)'}"></div></div>
      </div>
      <span id="cst${i}" class="cst ${ch.a ? (!e ? 'act' : 'emp') : 'inact'}">${ch.a ? (!e ? 'Активен' : 'Пустой') : 'Выключен'}</span>
    </div>`;
  }).join('');
  openM(`<div class="mh"><span class="mt2">Устройство — ${d.id}</span><button class="btn bg_" onclick="closeM()"><i class="ti ti-x"></i></button></div>
  <div class="ff"><label>Комментарий</label><input type="text" id="mc" value="${d.note}"></div>
  <div class="dvd"></div>
  <div style="font-size:10px;font-weight:500;color:var(--color-text-tertiary);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Управление каналами химии</div>
  ${chRows}
  <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--color-text-tertiary);margin-top:7px"><i class="ti ti-info-circle" style="font-size:12px"></i>Назначение химии — дистрибьютор. Включение/выключение — мерчант.</div>
  <div class="mf"><button class="btn" onclick="closeM()">Отмена</button><button class="btn bp" onclick="saveME('${id}')"><i class="ti ti-check"></i> Сохранить</button></div>`);
}
function updChTog(i, id) {
  const d = devs.find(x => x.id === id);
  const el = document.getElementById('ct' + i);
  if (!el) return;
  d.ch[i].a = el.checked;
  const lbl = document.getElementById('cst' + i);
  if (lbl) { const ch = d.ch[i], e = ch.l === 0; lbl.className = 'cst ' + (el.checked ? (!e ? 'act' : 'emp') : 'inact'); lbl.textContent = el.checked ? (!e ? 'Активен' : 'Пустой') : 'Выключен'; }
}
function saveME(id) {
  const d = devs.find(x => x.id === id);
  d.note = document.getElementById('mc').value.trim();
  for (let i = 0; i < 4; i++) { const el = document.getElementById('ct' + i); if (el) d.ch[i].a = el.checked; }
  closeM(); render();
}

/* Merchant refill */
function openRef(id) {
  const d = devs.find(x => x.id === id), ach = d.ch.filter(c => c.c && c.a);
  openM(`<div class="mh"><span class="mt2">Заправка — ${id}</span><button class="btn bg_" onclick="closeM()"><i class="ti ti-x"></i></button></div>
  <div style="background:var(--color-background-secondary);border-radius:var(--border-radius-md);padding:11px;margin-bottom:9px">
    <div style="font-size:11px;color:var(--color-text-secondary);text-align:center">Тара в диспенсере сейчас</div>
    <div style="font-size:26px;font-weight:700;text-align:center;margin:4px 0">${d.tara} <span style="font-size:13px;font-weight:400;color:var(--color-text-secondary)">шт</span></div>
    <div style="font-size:11px;color:var(--color-text-secondary);text-align:center;margin-bottom:7px">Укажите текущее количество или сбросьте до нуля</div>
    <div style="display:flex;gap:7px;align-items:flex-end">
      <div class="ff" style="flex:1;margin-bottom:0"><label>Новое количество (шт)</label><input type="number" id="rt" value="${d.tara}" min="0"></div>
      <button class="btn bd" style="height:31px;flex-shrink:0" onclick="document.getElementById('rt').value=0"><i class="ti ti-refresh" style="font-size:12px"></i> До 0</button>
    </div>
  </div>
  ${ach.length > 0 ? `<div style="font-size:11px;font-weight:500;color:var(--color-text-secondary);text-transform:uppercase;letter-spacing:.04em;margin-bottom:7px">Химия (активные каналы)</div>${ach.map((c, i) => `<div class="ff"><label>${c.c} · ${CN[c.c] || ''} — остаток: <strong>${c.l.toFixed(1)} л</strong></label><input type="number" id="rc${i}" placeholder="Добавить л (макс. ${(CAP - c.l).toFixed(1)})" min="0" max="${(CAP - c.l).toFixed(1)}" step="0.1"></div>`).join('')}` : '<div style="font-size:12px;color:var(--color-text-tertiary);text-align:center;padding:7px">Нет активных каналов</div>'}
  <div class="mf"><button class="btn" onclick="closeM()">Отмена</button><button class="btn bp" onclick="saveRef('${id}')"><i class="ti ti-check"></i> Оформить</button></div>`);
}
function saveRef(id) { const d = devs.find(x => x.id === id); const t = parseInt(document.getElementById('rt').value); if (!isNaN(t) && t >= 0) d.tara = t; d.ch.filter(c => c.c && c.a).forEach((c, i) => { const el = document.getElementById('rc' + i); if (el) { const v = parseFloat(el.value) || 0; c.l = Math.min(c.l + v, CAP); } }); closeM(); render(); }

/* ── Freeze confirm ── */
function openFrz(type, id) {
  const obj = type === 'dist' ? dists.find(x => x.id === id) : mercs.find(x => x.id === id);
  openM(`<div class="mh"><span class="mt2" style="color:#5B2D8E"><i class="ti ti-snowflake"></i> Заморозить аккаунт</span><button class="btn bg_" onclick="closeM()"><i class="ti ti-x"></i></button></div>
  <div class="fzb"><i class="ti ti-snowflake" style="font-size:16px;flex-shrink:0;margin-top:1px"></i><div><div style="font-weight:500;margin-bottom:2px">«${obj.name}»</div><div>Доступ и платежи будут <strong>приостановлены</strong>. Устройства останутся активными.</div></div></div>
  <div class="mf"><button class="btn" onclick="closeM()">Отмена</button><button class="btn bf" onclick="${type === 'dist' ? 'dists' : 'mercs'}.find(x=>x.id===${id}).st='frozen';closeM();render()"><i class="ti ti-snowflake" style="font-size:11px"></i> Подтвердить</button></div>`, true);
}

/* ── Distributor CRUD ── */
function dDC(sel, pfx) { return devs.map(d => `<label class="dc"><input type="checkbox" value="${d.id}" ${sel.includes(d.id) ? 'checked' : ''} onchange="dPrev('${pfx}')"><span class="dot ${d.st === 'online' ? 'dg' : 'dr'}"></span><span style="font-family:var(--font-mono);font-size:11px">${d.id}</span></label>`).join(''); }
function dGC(pfx) { return [...document.querySelectorAll(`#${pfx}-dv input:checked`)].map(c => c.value); }
function dPrev(pfx) { const cnt = dGC(pfx).length, rate = parseInt(document.getElementById(pfx + '-rt').value) || 0; document.getElementById(pfx + '-sc').textContent = cnt + ' шт'; document.getElementById(pfx + '-st').textContent = cnt * rate > 0 ? (cnt * rate).toLocaleString('ru-KZ') + ' ₸' : '—'; }
function dForm(d, pfx) {
  const name = d ? d.name : '', email = d ? d.email : '', rate = d ? d.rate : 21000, dv = d ? d.devs : [], cnt = dv.length, tot = cnt * rate;
  return `${d ? `<div class="ff"><label>Наименование</label><input type="text" id="${pfx}-nm" value="${name}"></div><div style="font-size:12px;background:var(--color-background-secondary);padding:5px 8px;border-radius:var(--border-radius-md);margin-bottom:7px;color:var(--color-text-secondary)">E-mail: <strong>${email}</strong></div>` : `<div class="fg"><div class="ff"><label>Наименование</label><input type="text" id="${pfx}-nm" value="${name}" placeholder="ООО Пример"></div><div class="ff"><label>E-mail</label><input type="email" id="${pfx}-em" value="${email}" placeholder="info@example.kz"></div></div>`}
  <div class="ff"><label>Ставка SaaS (₸/устройство/мес)</label><input type="number" id="${pfx}-rt" value="${rate}" min="0" step="1000" oninput="dPrev('${pfx}')"></div>
  <div class="ff"><label>Устройства</label><div class="dcl" id="${pfx}-dv">${dDC(dv, pfx)}</div></div>
  <div class="sp"><div class="sp-r"><span>Устройств</span><span id="${pfx}-sc">${cnt} шт</span></div><div class="sp-t"><span>SaaS/мес</span><span id="${pfx}-st">${tot > 0 ? tot.toLocaleString('ru-KZ') + ' ₸' : '—'}</span></div>${cnt > 0 ? `<div class="sp-n"><i class="ti ti-calendar-event" style="font-size:11px;flex-shrink:0"></i><span>Оплата с <strong>${nb()}</strong></span></div>` : ''}</div>`;
}
function openDistAdd() { openM(`<div class="mh"><span class="mt2">Добавить дистрибьютора</span><button class="btn bg_" onclick="closeM()"><i class="ti ti-x"></i></button></div>${dForm(null, 'da')}<div class="mf"><button class="btn" onclick="closeM()">Отмена</button><button class="btn bp" onclick="sDA()"><i class="ti ti-check"></i> Добавить</button></div>`); }
function openDistEdit(id) {
  const d = dists.find(x => x.id === id), isFrz = d.st === 'frozen';
  openM(`<div class="mh"><span class="mt2">Редактировать — ${d.name}</span><button class="btn bg_" onclick="closeM()"><i class="ti ti-x"></i></button></div>
  ${isFrz ? `<div class="fzb"><i class="ti ti-snowflake" style="font-size:16px;flex-shrink:0;margin-top:1px"></i><div><div style="font-weight:500;margin-bottom:2px">Аккаунт заморожен</div><div>Платежи и доступ приостановлены.</div></div></div>` : ''}
  ${dForm(d, 'de')}
  <div class="dvd"></div>
  <div style="display:flex;gap:7px;flex-wrap:wrap">
    <button class="btn" onclick="alert('Ссылка для сброса пароля отправлена на ${d.email}')"><i class="ti ti-key" style="font-size:12px"></i> Сбросить пароль</button>
    ${isFrz ? `<button class="btn" style="color:#27500A;border-color:#A3D68A" onclick="dists.find(x=>x.id===${id}).st='paid';closeM();render()"><i class="ti ti-snowflake" style="font-size:12px"></i> Разморозить</button>` : `<button class="btn bf" onclick="openFrz('dist',${id})"><i class="ti ti-snowflake" style="font-size:12px"></i> Заморозить</button>`}
    <button class="btn bd" onclick="closeM();openDistDel(${id})"><i class="ti ti-trash" style="font-size:11px"></i> Удалить</button>
  </div>
  <div class="mf"><button class="btn" onclick="closeM()">Отмена</button><button class="btn bp" onclick="sDE(${id})"><i class="ti ti-check"></i> Сохранить</button></div>`);
}
function openDistDel(id) { const d = dists.find(x => x.id === id); openM(`<div class="mh"><span class="mt2" style="color:#A32D2D">Удалить дистрибьютора</span><button class="btn bg_" onclick="closeM()"><i class="ti ti-x"></i></button></div><div class="dw"><i class="ti ti-alert-triangle" style="font-size:17px;flex-shrink:0;margin-top:1px"></i><div><div style="font-weight:500;margin-bottom:2px">«${d.name}»</div><div>${d.devs.length} устройств станут свободными.</div></div></div><div class="ff"><input type="text" id="di" placeholder="${d.name}" oninput="document.getElementById('dok').disabled=this.value!=='${d.name}'"></div><div class="mf"><button class="btn" onclick="closeM()">Отмена</button><button class="btn bds" id="dok" disabled onclick="dists=dists.filter(x=>x.id!==${id});closeM();render()"><i class="ti ti-trash" style="font-size:11px"></i> Удалить</button></div>`, true); }
function sDA() { const name = document.getElementById('da-nm').value.trim(), email = document.getElementById('da-em').value.trim(); if (!name || !email) { alert('Заполните поля'); return; } dists.push({ id: nDist++, name, email, devs: dGC('da'), st: 'pending', rate: parseInt(document.getElementById('da-rt').value) || 0 }); closeM(); render(); }
function sDE(id) { const d = dists.find(x => x.id === id); d.name = document.getElementById('de-nm').value.trim() || d.name; d.rate = parseInt(document.getElementById('de-rt').value) || d.rate; d.devs = dGC('de'); closeM(); render(); }

/* ── Merch CRUD ── */
function mDC(sel, pfx) { return devs.filter(d => d.dist === MY_DIST).map(d => `<label class="dc"><input type="checkbox" value="${d.id}" ${sel.includes(d.id) ? 'checked' : ''} onchange="mPrev('${pfx}')"><span class="dot ${d.st === 'online' ? 'dg' : 'dr'}"></span><span style="font-family:var(--font-mono);font-size:11px">${d.id}</span></label>`).join(''); }
function mGC(pfx) { return [...document.querySelectorAll(`#${pfx}-dv input:checked`)].map(c => c.value); }
function mPrev(pfx) { const cnt = mGC(pfx).length, rate = parseInt(document.getElementById(pfx + '-rt').value) || 0; document.getElementById(pfx + '-sc').textContent = cnt + ' шт'; document.getElementById(pfx + '-st').textContent = cnt * rate > 0 ? (cnt * rate).toLocaleString('ru-KZ') + ' ₸' : '—'; }
function mForm(m, pfx, se) {
  const name = m ? m.name : '', email = m ? m.email : '', rate = m ? m.rate : 15000, dv = m ? m.devs : [], stm = m ? m.stm : false, cnt = dv.length, tot = cnt * rate;
  return `${se ? `<div class="fg"><div class="ff"><label>Наименование</label><input type="text" id="${pfx}-nm" value="${name}" placeholder="ТОО Пример"></div><div class="ff"><label>E-mail</label><input type="email" id="${pfx}-em" value="${email}" placeholder="info@example.kz"></div></div>` : `<div class="ff"><label>Наименование</label><input type="text" id="${pfx}-nm" value="${name}"></div><div style="font-size:12px;background:var(--color-background-secondary);padding:5px 8px;border-radius:var(--border-radius-md);margin-bottom:7px;color:var(--color-text-secondary)">E-mail: <strong>${email}</strong></div>`}
  <div class="ff"><label>Ставка SaaS (₸/устройство/мес)</label><input type="number" id="${pfx}-rt" value="${rate}" min="0" step="1000" oninput="mPrev('${pfx}')"></div>
  <div class="ff"><label>Устройства</label><div class="dcl" id="${pfx}-dv">${mDC(dv, pfx)}</div></div>
  <div class="sp"><div class="sp-r"><span>Устройств</span><span id="${pfx}-sc">${cnt} шт</span></div><div class="sp-t"><span>SaaS/мес</span><span id="${pfx}-st">${tot > 0 ? tot.toLocaleString('ru-KZ') + ' ₸' : '—'}</span></div>${cnt > 0 ? `<div class="sp-n"><i class="ti ti-calendar-event" style="font-size:11px;flex-shrink:0"></i><span>Оплата с <strong>${nb()}</strong></span></div>` : ''}</div>
  <div class="dvd"></div>
  <label class="stg"><input type="checkbox" id="${pfx}-stm" ${stm ? 'checked' : ''}><div><span style="font-size:12px;font-weight:500;display:block">СТМ</span></div></label>`;
}
function openAddMer() { openM(`<div class="mh"><span class="mt2">Добавить мерчанта</span><button class="btn bg_" onclick="closeM()"><i class="ti ti-x"></i></button></div>${mForm(null, 'am', true)}<div class="mf"><button class="btn" onclick="closeM()">Отмена</button><button class="btn bp" onclick="sAM()"><i class="ti ti-check"></i> Добавить</button></div>`); }
function openEditMer(id) {
  const m = mercs.find(x => x.id === id), isFrz = m.st === 'frozen';
  openM(`<div class="mh"><span class="mt2">Редактировать — ${m.name}</span><button class="btn bg_" onclick="closeM()"><i class="ti ti-x"></i></button></div>
  ${isFrz ? `<div class="fzb"><i class="ti ti-snowflake" style="font-size:16px;flex-shrink:0;margin-top:1px"></i><div><div style="font-weight:500;margin-bottom:2px">Аккаунт заморожен</div><div>Платежи и доступ приостановлены.</div></div></div>` : ''}
  ${mForm(m, 'em', false)}
  <div class="dvd"></div>
  <div style="display:flex;gap:7px;flex-wrap:wrap">
    <button class="btn" onclick="alert('Пароль сброшен для ${m.email}')"><i class="ti ti-key" style="font-size:12px"></i> Сбросить пароль</button>
    ${isFrz ? `<button class="btn" style="color:#27500A;border-color:#A3D68A" onclick="mercs.find(x=>x.id===${id}).st='paid';closeM();render()"><i class="ti ti-snowflake" style="font-size:12px"></i> Разморозить</button>` : `<button class="btn bf" onclick="openFrz('merch',${id})"><i class="ti ti-snowflake" style="font-size:12px"></i> Заморозить</button>`}
    <button class="btn bd" onclick="closeM();openDelMer(${id})"><i class="ti ti-trash" style="font-size:11px"></i> Удалить</button>
  </div>
  <div class="mf"><button class="btn" onclick="closeM()">Отмена</button><button class="btn bp" onclick="sEM(${id})"><i class="ti ti-check"></i> Сохранить</button></div>`);
}
function openDelMer(id) { const m = mercs.find(x => x.id === id); openM(`<div class="mh"><span class="mt2" style="color:#A32D2D">Удалить мерчанта</span><button class="btn bg_" onclick="closeM()"><i class="ti ti-x"></i></button></div><div class="dw"><i class="ti ti-alert-triangle" style="font-size:17px;flex-shrink:0;margin-top:1px"></i><div><div style="font-weight:500;margin-bottom:2px">«${m.name}»</div><div>${m.devs.length} устройств станут свободными.</div></div></div><div class="ff"><input type="text" id="di" placeholder="${m.name}" oninput="document.getElementById('dok').disabled=this.value!=='${m.name}'"></div><div class="mf"><button class="btn" onclick="closeM()">Отмена</button><button class="btn bds" id="dok" disabled onclick="mercs=mercs.filter(x=>x.id!==${id});closeM();render()"><i class="ti ti-trash" style="font-size:11px"></i> Удалить</button></div>`, true); }
function sAM() { const name = document.getElementById('am-nm').value.trim(), email = document.getElementById('am-em').value.trim(); if (!name || !email) { alert('Заполните поля'); return; } mercs.push({ id: nMerc++, name, email, devs: mGC('am'), st: 'pending', stm: document.getElementById('am-stm').checked, rate: parseInt(document.getElementById('am-rt').value) || 0 }); closeM(); render(); }
function sEM(id) { const m = mercs.find(x => x.id === id); m.name = document.getElementById('em-nm').value.trim() || m.name; m.rate = parseInt(document.getElementById('em-rt').value) || m.rate; m.devs = mGC('em'); m.stm = document.getElementById('em-stm').checked; closeM(); render(); }

/* ── Photo grid ── */
function pGrid(pfx, pid) { return `<div class="photo-grid">${[0, 1, 2, 3, 4].map(i => { const key = `${pid}_${i}`, stored = photoStore[key]; return `<div class="pslot${stored ? ' has' : ''}" id="${pfx}-ps${i}"><span class="snum">Слайд ${i + 1}</span><i class="ti ti-image" style="font-size:20px;color:var(--color-text-tertiary);margin-bottom:3px;position:relative;z-index:1"></i><span class="slbl">Изображение ${i + 1}</span>${stored ? `<img src="${stored}" alt="">` : ''}<button class="xcl" onclick="event.stopPropagation();clearPh('${pfx}',${i},'${pid}')">✕</button><input type="file" accept="image/*" onchange="loadPh(event,'${pfx}',${i},'${pid}')"></div>`; }).join('')}</div>`; }
function loadPh(ev, pfx, i, pid) { const f = ev.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = e => { const k = `${pid}_${i}`; photoStore[k] = e.target.result; const sl = document.getElementById(`${pfx}-ps${i}`); let img = sl.querySelector('img'); if (!img) { img = document.createElement('img'); sl.appendChild(img); } img.src = e.target.result; sl.classList.add('has'); }; r.readAsDataURL(f); }
function clearPh(pfx, i, pid) { event.stopPropagation(); delete photoStore[`${pid}_${i}`]; const sl = document.getElementById(`${pfx}-ps${i}`); const img = sl.querySelector('img'); if (img) img.remove(); sl.classList.remove('has'); }

/* ── Chem CRUD ── */
function openAddChem() { openM(`<div class="mh"><span class="mt2">Добавить химию</span><button class="btn bg_" onclick="closeM()"><i class="ti ti-x"></i></button></div><div class="fg"><div class="ff"><label>Наименование</label><input type="text" id="cn" placeholder="Название"></div><div class="ff"><label>Цена за 100 мл (₸)</label><input type="number" id="cp" min="0" placeholder="500"></div></div><div class="fg"><div class="ff"><label>Калибровочное значение</label><input type="number" id="cc" value="1.00" min="0.5" max="2" step="0.01"></div><div class="ff"><label>Комментарий</label><textarea id="cco" rows="2" placeholder="Описание..."></textarea></div></div><div class="dvd"></div><div style="font-size:10px;font-weight:500;color:var(--color-text-tertiary);text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px">Изображения (5 экранов)</div>${pGrid('ac', 'CHNEW')}<div class="mf"><button class="btn" onclick="closeM()">Отмена</button><button class="btn bp" onclick="saveAddChem()"><i class="ti ti-check"></i> Добавить</button></div>`); }
function saveAddChem() { const name = document.getElementById('cn').value.trim(), price = parseFloat(document.getElementById('cp').value) || 0; if (!name || !price) { alert('Заполните наименование и цену'); return; } const id = 'CH-00' + nextChem++; const cal = parseFloat(document.getElementById('cc').value) || 1.00, comment = document.getElementById('cco').value.trim(); [0, 1, 2, 3, 4].forEach(i => { const k = `CHNEW_${i}`; if (photoStore[k]) { photoStore[`${id}_${i}`] = photoStore[k]; delete photoStore[k]; } }); chems.push({ id, name, price, cal, comment, updatedAt: td() }); closeM(); render(); }
function openEditChem(id) { const c = chems.find(x => x.id === id); openM(`<div class="mh"><span class="mt2">Редактировать — ${c.name}</span><button class="btn bg_" onclick="closeM()"><i class="ti ti-x"></i></button></div><div class="fg"><div class="ff"><label>Наименование</label><input type="text" id="cn" value="${c.name}"></div><div class="ff"><label>Цена за 100 мл (₸)</label><input type="number" id="cp" value="${c.price}" min="0"></div></div><div class="fg"><div class="ff"><label>Калибровочное значение</label><input type="number" id="cc" value="${c.cal}" min="0.5" max="2" step="0.01"></div><div class="ff"><label>Комментарий</label><textarea id="cco" rows="2">${c.comment}</textarea></div></div><div class="dvd"></div><div style="font-size:10px;font-weight:500;color:var(--color-text-tertiary);text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px">Изображения (5 экранов)</div>${pGrid('ec', id)}<div class="dvd"></div><button class="btn bd" style="width:100%;justify-content:center" onclick="openDelChem('${id}')"><i class="ti ti-trash" style="font-size:12px"></i> Удалить ассортимент</button><div class="mf"><button class="btn" onclick="closeM()">Отмена</button><button class="btn bp" onclick="saveEditChem('${id}')"><i class="ti ti-check"></i> Сохранить</button></div>`); }
function saveEditChem(id) { const c = chems.find(x => x.id === id); c.name = document.getElementById('cn').value.trim() || c.name; c.price = parseFloat(document.getElementById('cp').value) || c.price; c.cal = parseFloat(document.getElementById('cc').value) || c.cal; c.comment = document.getElementById('cco').value.trim(); c.updatedAt = td(); closeM(); render(); }
function openDelChem(id) { const c = chems.find(x => x.id === id); openM(`<div class="mh"><span class="mt2" style="color:#A32D2D">Удалить химию</span><button class="btn bg_" onclick="closeM()"><i class="ti ti-x"></i></button></div><div class="dw"><i class="ti ti-alert-triangle" style="font-size:17px;flex-shrink:0;margin-top:1px"></i><div><div style="font-weight:500;margin-bottom:2px">«${c.name}»</div><div>Необратимо.</div></div></div><div class="mf"><button class="btn" onclick="closeM()">Отмена</button><button class="btn bds" onclick="chems=chems.filter(x=>x.id!=='${id}');closeM();render()"><i class="ti ti-trash" style="font-size:11px"></i> Удалить</button></div>`, true); }

/* ── Ad CRUD ── */
function openAddAd() { openM(`<div class="mh"><span class="mt2">Добавить макет</span><button class="btn bg_" onclick="closeM()"><i class="ti ti-x"></i></button></div><div class="ff"><label>Название макета</label><input type="text" id="an" placeholder="Летняя акция 2025"></div><div class="ff"><label>Комментарий</label><textarea id="ac" rows="2" placeholder="Описание..."></textarea></div><div class="dvd"></div><div style="font-size:10px;font-weight:500;color:var(--color-text-tertiary);text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px">Изображения (5 слайдов)</div>${pGrid('aa', 'ADNEW')}<div class="mf"><button class="btn" onclick="closeM()">Отмена</button><button class="btn bp" onclick="saveAddAd()"><i class="ti ti-check"></i> Добавить</button></div>`); }
function saveAddAd() { const name = document.getElementById('an').value.trim(); if (!name) { alert('Введите название'); return; } const id = 'AD-0' + nextAd++; const comment = document.getElementById('ac').value.trim(); [0, 1, 2, 3, 4].forEach(i => { const k = `ADNEW_${i}`; if (photoStore[k]) { photoStore[`ad_${id}_${i}`] = photoStore[k]; delete photoStore[k]; } }); adsList.push({ id, name, comment, updatedAt: td() }); closeM(); render(); }
function openEditAd(id) { const a = adsList.find(x => x.id === id); openM(`<div class="mh"><span class="mt2">Редактировать — ${a.name}</span><button class="btn bg_" onclick="closeM()"><i class="ti ti-x"></i></button></div><div class="ff"><label>Название макета</label><input type="text" id="an" value="${a.name}"></div><div class="ff"><label>Комментарий</label><textarea id="ac" rows="2">${a.comment}</textarea></div><div class="dvd"></div><div style="font-size:10px;font-weight:500;color:var(--color-text-tertiary);text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px">Изображения (5 слайдов)</div>${pGrid('ea', 'ad_' + id)}<div class="dvd"></div><button class="btn bd" style="width:100%;justify-content:center" onclick="openDelAd('${id}')"><i class="ti ti-trash" style="font-size:12px"></i> Удалить рекламный макет</button><div class="mf"><button class="btn" onclick="closeM()">Отмена</button><button class="btn bp" onclick="saveEditAd('${id}')"><i class="ti ti-check"></i> Сохранить</button></div>`); }
function saveEditAd(id) { const a = adsList.find(x => x.id === id); a.name = document.getElementById('an').value.trim() || a.name; a.comment = document.getElementById('ac').value.trim(); a.updatedAt = td(); closeM(); render(); }
function openDelAd(id) { const a = adsList.find(x => x.id === id); openM(`<div class="mh"><span class="mt2" style="color:#A32D2D">Удалить макет</span><button class="btn bg_" onclick="closeM()"><i class="ti ti-x"></i></button></div><div class="dw"><i class="ti ti-alert-triangle" style="font-size:17px;flex-shrink:0;margin-top:1px"></i><div><div style="font-weight:500;margin-bottom:2px">«${a.name}»</div><div>Необратимо.</div></div></div><div class="mf"><button class="btn" onclick="closeM()">Отмена</button><button class="btn bds" onclick="adsList=adsList.filter(x=>x.id!=='${id}');closeM();render()"><i class="ti ti-trash" style="font-size:11px"></i> Удалить</button></div>`, true); }

/* ── STM Shipment ── */
function openShip(preId) {
  sLines = [{ c: '', v: '' }];
  openM(`<div class="mh"><span class="mt2">Оформить отгрузку</span><button class="btn bg_" onclick="closeM()"><i class="ti ti-x"></i></button></div>
  <div class="ff"><label>Мерчант</label><select id="sm">${stmM.map(m => `<option value="${m.id}"${m.id === preId ? ' selected' : ''}>${m.name}</option>`).join('')}</select></div>
  <div class="dvd"></div><div style="font-size:10px;font-weight:500;color:var(--color-text-tertiary);text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px">Химии (до 4 позиций)</div>
  <div id="slns">${rSL()}</div>
  <button style="display:inline-flex;align-items:center;gap:5px;font-size:12px;color:#185FA5;background:none;border:none;cursor:pointer;margin-top:4px" onclick="addSL()"><i class="ti ti-plus" style="font-size:12px"></i> Добавить химию</button>
  <div class="dvd"></div>
  <div style="font-size:12px;color:var(--color-text-secondary);display:flex;align-items:center;gap:5px;margin-bottom:7px"><i class="ti ti-info-circle" style="font-size:12px"></i>После сохранения формируется товарная накладная.</div>
  <div class="mf"><button class="btn" onclick="closeM()">Отмена</button><button class="btn" onclick="doShip(true)"><i class="ti ti-printer" style="font-size:12px"></i> Распечатать</button><button class="btn bp" onclick="doShip(false)"><i class="ti ti-check"></i> Сохранить</button></div>`);
}
function rSL() { return sLines.map((l, i) => `<div class="sl2" id="sl${i}"><div class="ff"><label>Химия ${i + 1}</label><select id="sc${i}" onchange="sLines[${i}].c=this.value"><option value="">— выбрать —</option>${Object.entries(CN).map(([id, n]) => `<option value="${id}"${l.c === id ? ' selected' : ''}>${id} · ${n}</option>`).join('')}</select></div><div class="ff"><label>Объём (л)</label><input type="number" id="sv${i}" value="${l.v}" min="1" placeholder="0" oninput="sLines[${i}].v=this.value"></div>${sLines.length > 1 ? `<button class="btn bg_" style="align-self:flex-end;height:30px;border:0.5px solid var(--color-border-secondary)" onclick="sLines.splice(${i},1);document.getElementById('slns').innerHTML=rSL()"><i class="ti ti-x" style="font-size:12px"></i></button>` : '<div></div>'}</div>`).join(''); }
function addSL() { if (sLines.length >= 4) return; sLines.push({ c: '', v: '' }); document.getElementById('slns').innerHTML = rSL(); }
function doShip(print) { const mId = parseInt(document.getElementById('sm').value); const lines = []; for (let i = 0; i < sLines.length; i++) { const c = document.getElementById('sc' + i)?.value, v = parseFloat(document.getElementById('sv' + i)?.value) || 0; if (c && v > 0) lines.push({ c, v }); } if (!lines.length) { alert('Добавьте позицию с объёмом'); return; } const m = stmM.find(x => x.id === mId); const wb = 'WB-' + td().replace(/-/g, '').slice(2) + '-' + String(Math.floor(Math.random() * 90) + 10); lines.forEach(l => { const s = m.stocks.find(x => x.c === l.c); if (s) s.r += l.v; else m.stocks.push({ c: l.c, r: l.v }); m.hist.unshift({ date: td(), c: l.c, v: l.v, wb }); }); closeM(); render(); if (print) alert('Накладная ' + wb + ' отправлена на печать'); else alert('Отгрузка оформлена. Накладная: ' + wb); }

/* ── INIT ── */
renderSB();
render();
