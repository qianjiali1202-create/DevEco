(() => {
'use strict';
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)], D = window.RESEARCH;
const sections = ['overview','compare','components','lab','ide','sources'];
const fig = node => 'https://www.figma.com/design/3q89XhaMGImDOPJwvfEpd7/Int-UI-Kit--Community-?node-id='+node.replace(':','-');
function refs(ids) { return ids.map(id=>`<a href="#sources" data-source="${id}">${id} ↗</a>`).join(''); }
function renderProducts(){
 const items=D.products.filter(p=>!$('#verifiedOnly').checked||p.evidence==='quantified');
 $('#products').innerHTML=items.map(p=>`<tr><td><strong>${p.name}</strong><span class="evidence">${p.kind}</span><div class="source-links">${refs(p.refs)}</div></td><td>${p.ui}</td><td>${p.line}</td><td>${p.editor}</td><td>${p.row}</td><td>${p.control}</td></tr>`).join('');
 $('#productDetails').innerHTML=items.map(p=>`<details class="product-detail"><summary>${p.name} · 口径与限制</summary><p>${p.note}</p><div class="source-links">${refs(p.refs)}</div></details>`).join('');
 $('#resultCount').textContent=`显示 ${items.length} / 5 个产品`;
}
renderProducts();$('#verifiedOnly').addEventListener('change',renderProducts);
$('#componentRows').innerHTML=D.components.map(c=>`<tr><td><a href="${fig(c.node)}" target="_blank" rel="noopener">${c.name} ↗</a></td><td>${c.text}</td><td>${c.visible}</td><td>${c.outer}</td><td>${c.radius}</td><td>${c.detail}</td></tr>`).join('');
$('#sourceList').innerHTML=D.sources.map(s=>`<article class="source-item" id="source-${s.id}"><span class="source-code">${s.id}</span><div><h3><a href="${s.url}" target="_blank" rel="noopener">${s.title} ↗</a><small>${s.type}</small></h3><p>${s.note}</p></div></article>`).join('');
function route(scroll=false){let id=location.hash.slice(1);if(!sections.includes(id))id='overview';$$('.panel').forEach(p=>p.hidden=p.id!==id);$$('[data-nav]').forEach(a=>a.dataset.nav===id?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));$$('[data-tab]').forEach(b=>{b.setAttribute('aria-selected',b.dataset.tab===id);b.tabIndex=b.dataset.tab===id?0:-1;});if(scroll)window.scrollTo({top:0,behavior:'instant'});}
$$('[data-tab]').forEach(b=>b.addEventListener('click',()=>{history.pushState(null,'','#'+b.dataset.tab);route(true);}));
window.addEventListener('hashchange',()=>route(true));route();
document.addEventListener('click',e=>{const link=e.target.closest('[data-source]');if(link){e.preventDefault();history.pushState(null,'','#sources');route();$('#source-'+link.dataset.source).scrollIntoView({block:'center',behavior:'smooth'});}});
$$('[role=tablist]').forEach(list=>list.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;const ts=[...list.querySelectorAll('[role=tab]')];let i=ts.indexOf(document.activeElement);if(i<0)return;e.preventDefault();i=e.key==='Home'?0:e.key==='End'?ts.length-1:(i+(e.key==='ArrowRight'?1:-1)+ts.length)%ts.length;ts[i].focus();ts[i].click();}));
const sampleTexts=['General：默认 UI 文字为 13/16；所示页签使用库中无图标变体。','Appearance：基础控件 R4，较大弹窗 R8；不把圆角统一放大。','Editor：代码文字与 UI 文字分开设置，编辑器行高不套用到按钮。'];
$$('.sample-tabs button').forEach((b,i)=>b.addEventListener('click',()=>{$$('.sample-tabs button').forEach(x=>{x.setAttribute('aria-selected',x===b);x.tabIndex=x===b?0:-1;});$('#tabSampleText').textContent=sampleTexts[i];}));
$('#bounds').addEventListener('change',e=>$('#anatomy').classList.toggle('show-bounds',e.target.checked));
let toastTimer;function toast(s){$('#toast').textContent=s;$('#toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').hidden=true,3200);}
document.addEventListener('click',e=>{const b=e.target.closest('[data-toast]');if(b)toast(b.dataset.toast);});$('#sampleButton').addEventListener('click',()=>toast('可见按钮高 28 px；外层布局高 40 px。'));
const names=['Appearance / 外观与行为','Editor preferences / 编辑器偏好','Project structure / 项目结构','Code style / 代码格式','Version control / 版本控制','Build and execution / 构建与执行','Language support / 语言支持','Tools / 工具','Terminal / 终端','Plugins / 插件','Notifications / 通知','Accessibility / 无障碍','Settings sync / 设置同步','Advanced settings / 高级设置','LongProjectNameThatNeedsMoreHorizontalSpace / 长名称与截断验证','Keymap / 快捷键','Run configurations / 运行配置','Inspections / 代码检查'];
$('#liveList').innerHTML=names.map((n,i)=>`<div class="live-row ${i===2?'selected':''}"><span class="row-no">${String(i+1).padStart(2,'0')}</span><span title="${n}">${n}</span></div>`).join('');
const keys=['fontSize','lineHeight','rowHeight','controlHeight','radius'];
const presets={standard:[13,16,24,28,4],readable:[14,20,28,32,4],large:[16,24,32,36,4]};
let params=presets.standard.slice();
function syncParams(values,notice=''){
 params=values.slice();keys.forEach((k,i)=>$('#'+k).value=params[i]);
 const [f,l,r,c,a]=params,style=$('#liveSurface').style;
 [['font',f],['line',l],['row',r],['control',c],['radius',a]].forEach(([k,v])=>style.setProperty('--demo-'+k,v+'px'));
 const full=Math.floor(336/r),remain=336-full*r;
 $('#capacity').textContent=`完整显示 ${full} 行${remain?'，余 '+remain+' px':''}`;
 $('#densityMetrics').textContent=`${f}/${l} · 行 ${r} · 控件 ${c} · R${a}`;
 let matched=Object.keys(presets).find(k=>presets[k].every((v,i)=>v===params[i]));
 $$('[data-preset]').forEach(b=>{const active=b.dataset.preset===matched;b.classList.toggle('primary',active);b.setAttribute('aria-pressed',active);});
 $('#parameterNote').textContent=notice||`${matched==='standard'?'IJ 标准样本':'设计建议 / 自定义参数'}。文字行框上下各余 ${(r-l)/2} px；按钮内各余 ${(c-l)/2} px。`;
}
$$('[data-preset]').forEach(b=>b.addEventListener('click',()=>syncParams(presets[b.dataset.preset])));
$('#labControls').addEventListener('submit',e=>e.preventDefault());
keys.forEach(k=>$('#'+k).addEventListener('change',()=>{let adjusted=false;const arr=keys.map((key,i)=>{const input=$('#'+key),value=Number(input.value),v=Math.max(+input.min,Math.min(+input.max,Number.isFinite(value)&&input.value!==''?value:params[i]));if(v!==value)adjusted=true;return v;});if(arr[1]<arr[0]+2){arr[1]=arr[0]+2;adjusted=true;}if(arr[2]<arr[1]+4){arr[2]=arr[1]+4;adjusted=true;}if(arr[3]<arr[1]+8){arr[3]=arr[1]+8;adjusted=true;}syncParams(arr,adjusted?'已调整关联值，保留行框和控件的必要余量。':'');}));
$('#lineBounds').addEventListener('change',e=>$('#liveSurface').classList.toggle('bound-lines',e.target.checked));
$$('[data-radius]').forEach(b=>b.addEventListener('click',()=>{const next=params.slice();next[4]=+b.dataset.radius;syncParams(next);}));
function download(text,name,type){const url=URL.createObjectURL(new Blob([text],{type})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('#exportTokens').addEventListener('click',()=>{const[f,l,r,c,a]=params;download(`/* 钱佳丽 · IDE 密度研究 · 2026-10-19\n * 此文件为当前方案参数，不是全部产品的官方默认值。\n * Inter 中文需要系统字体回退。 */\n:root {\n  --ui-font-size: ${f}px;\n  --ui-line-height: ${l}px;\n  --list-row-height: ${r}px;\n  --control-height: ${c}px;\n  --control-radius: ${a}px;\n  --dialog-radius: 8px;\n}\n`,'ide-density-tokens.css','text/css');toast('已导出当前预览的 CSS 参数。');});syncParams(params);
let settingsSaved={size:13,comfort:false,custom:true};
function settingsValues(){const custom=$('#settingsCustom').checked,size=custom?Math.min(18,Math.max(12,Number($('#settingsSize').value)||13)):13,comfort=$('#settingsComfort').checked;return {size,comfort,custom,line:Math.max(16,size+3),row:Math.max(comfort?28:24,size+7)};}
function settingsUpdate(){const x=settingsValues();$('#settingsSize').disabled=!x.custom;$('#settingsPreview').style.setProperty('--set-font',x.size+'px');$('#settingsPreview').style.setProperty('--set-line',x.line+'px');$('#settingsPreview').style.setProperty('--set-row',x.row+'px');$('#settingsValues').textContent=`UI ${x.size} / ${x.line} · Row ${x.row} · Control 28 · Radius 4${x.size!==13||x.comfort?' · 方案参数':''}`;$('#settingsApply').disabled=x.size===settingsSaved.size&&x.comfort===settingsSaved.comfort&&x.custom===settingsSaved.custom;}
$('#settingsCustom').addEventListener('change',settingsUpdate);$('#settingsSize').addEventListener('input',settingsUpdate);$('#settingsSize').addEventListener('change',()=>{$('#settingsSize').value=settingsValues().size;settingsUpdate();});$('#settingsComfort').addEventListener('change',settingsUpdate);
function applySettings(){const x=settingsValues();settingsSaved={size:x.size,comfort:x.comfort,custom:x.custom};syncParams([x.size,x.line,Math.max(x.row,x.line+4),Math.max(28,x.line+8),4]);settingsUpdate();toast('已将字号和间距应用到「密度实验」，未修改真实 IDE。');}
$('#settingsApply').addEventListener('click',applySettings);$('#settingsReset').addEventListener('click',()=>{$('#settingsSize').value=13;$('#settingsComfort').checked=false;$('#settingsCustom').checked=true;settingsUpdate();});$('#settingsOK').addEventListener('click',()=>{applySettings();if($('#settingsModal').open)$('#settingsModal').close();else toast('已应用方案，可前往「密度实验」查看。');});
const stage=$('.dialog-stage'),dialog=$('#inlineDialog'),modal=$('#settingsModal');$('#openDialog').addEventListener('click',()=>{$('#modalContent').appendChild(dialog);modal.showModal();});modal.addEventListener('close',()=>stage.appendChild(dialog));$('#closeModal').addEventListener('click',()=>modal.close());$('.help-link').addEventListener('click',()=>{if(modal.open)modal.close();});
})();
