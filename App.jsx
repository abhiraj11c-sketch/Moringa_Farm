
import { useState, useEffect } from "react";

const style = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --dg:#1a2e1a;--lg:#2d5a27;--sg:#7a9e6b;--ol:#6b7c3a;
  --cr:#f5f0e8;--wb:#ede5d0;--eb:#8b6f47;--go:#c9a84c;--sg2:#e8d5a3;
}
html{scroll-behavior:smooth;}
body{font-family:'DM Sans',sans-serif;background:var(--cr);color:var(--dg);overflow-x:hidden;}
.serif{font-family:'Cormorant Garamond',serif;}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:20px 60px;display:flex;align-items:center;justify-content:space-between;transition:all .5s ease;}
.nav.sc{background:rgba(245,240,232,.94);backdrop-filter:blur(20px);padding:14px 60px;border-bottom:1px solid rgba(122,158,107,.2);box-shadow:0 4px 40px rgba(26,46,26,.06);}
.nav-logo{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:600;color:var(--cr);letter-spacing:.05em;display:flex;align-items:center;gap:10px;}
.nav.sc .nav-logo{color:var(--dg);}
.logo-dot{width:8px;height:8px;background:var(--go);border-radius:50%;}
.nav-links{display:flex;gap:36px;list-style:none;}
.nav-links a{font-size:.82rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(245,240,232,.7);text-decoration:none;transition:color .3s;}
.nav.sc .nav-links a{color:rgba(26,46,26,.65);}
.nav-links a:hover{color:var(--go);}
.nav.sc .nav-links a:hover{color:var(--lg);}
.nav-cta{background:var(--go);color:var(--dg);padding:10px 28px;border:none;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:.82rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:all .3s;}
.nav-cta:hover{background:var(--sg2);transform:translateY(-1px);}

/* HERO */
.hero{min-height:100vh;position:relative;overflow:hidden;display:flex;align-items:center;
  background:linear-gradient(160deg,#0a1408 0%,#1a2e1a 35%,#2d4a20 65%,#3a5824 100%);}
.h-overlay{position:absolute;inset:0;
  background:radial-gradient(ellipse 70% 55% at 72% 42%,rgba(201,168,76,.14) 0%,transparent 60%),
             radial-gradient(ellipse 45% 70% at 18% 80%,rgba(45,90,39,.45) 0%,transparent 60%);}
.h-grain{position:absolute;inset:0;opacity:.04;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:200px;}
.h-content{position:relative;z-index:10;padding:0 60px;max-width:660px;margin-top:80px;animation:fadeUp 1.4s cubic-bezier(.16,1,.3,1) both;}
.h-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(201,168,76,.14);border:1px solid rgba(201,168,76,.35);color:var(--sg2);padding:6px 16px;border-radius:50px;font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;margin-bottom:28px;animation:fadeUp 1.4s .2s cubic-bezier(.16,1,.3,1) both;}
.h1{font-family:'Cormorant Garamond',serif;font-size:clamp(3rem,5.8vw,5.4rem);font-weight:300;line-height:1.07;color:var(--cr);margin-bottom:24px;letter-spacing:-.02em;animation:fadeUp 1.4s .3s cubic-bezier(.16,1,.3,1) both;}
.h1 em{font-style:italic;color:var(--sg2);}
.h-sub{font-size:1rem;line-height:1.75;color:rgba(245,240,232,.68);max-width:460px;margin-bottom:44px;font-weight:300;animation:fadeUp 1.4s .45s cubic-bezier(.16,1,.3,1) both;}
.h-btns{display:flex;gap:16px;align-items:center;animation:fadeUp 1.4s .6s cubic-bezier(.16,1,.3,1) both;}
.btn-p{background:var(--go);color:var(--dg);padding:16px 40px;border:none;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:500;letter-spacing:.08em;cursor:pointer;transition:all .35s;text-transform:uppercase;}
.btn-p:hover{background:var(--sg2);transform:translateY(-2px);box-shadow:0 12px 40px rgba(201,168,76,.4);}
.btn-g{background:transparent;color:var(--cr);padding:16px 40px;border:1px solid rgba(245,240,232,.3);border-radius:50px;font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:300;letter-spacing:.08em;cursor:pointer;transition:all .35s;text-transform:uppercase;}
.btn-g:hover{border-color:rgba(245,240,232,.6);background:rgba(245,240,232,.08);}
.h-stats{display:flex;gap:36px;margin-top:56px;animation:fadeUp 1.4s .75s cubic-bezier(.16,1,.3,1) both;}
.stat-num{font-family:'Cormorant Garamond',serif;font-size:1.8rem;color:var(--sg2);font-weight:500;}
.stat-lbl{font-size:.7rem;color:rgba(245,240,232,.4);letter-spacing:.15em;text-transform:uppercase;}

/* HERO PRODUCT */
.h-right{position:absolute;right:0;top:0;bottom:0;width:52%;display:flex;align-items:center;justify-content:center;z-index:2;}
.h-circle{position:relative;width:560px;height:560px;}
.h-glow{position:absolute;inset:-60px;background:radial-gradient(ellipse at center,rgba(201,168,76,.18) 0%,transparent 65%);animation:pulse 4s ease-in-out infinite;}
.h-ring1{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(201,168,76,.25);animation:spin 25s linear infinite;}
.h-ring2{position:absolute;inset:40px;border-radius:50%;border:1px dashed rgba(122,158,107,.3);animation:spin 18s linear infinite reverse;}
.h-jar-wrap{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);animation:float 6s ease-in-out infinite;}
.h-jar{width:200px;height:244px;background:linear-gradient(145deg,rgba(45,90,39,.85),rgba(26,46,26,.95));border-radius:24px 24px 20px 20px;border:1px solid rgba(201,168,76,.4);position:relative;overflow:hidden;box-shadow:0 40px 80px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.1);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;}
.j-cap{position:absolute;top:-12px;left:50%;transform:translateX(-50%);width:120px;height:28px;background:linear-gradient(180deg,rgba(201,168,76,.75),rgba(139,111,71,.85));border-radius:6px 6px 4px 4px;}
.j-shine{position:absolute;top:0;left:0;right:0;height:50%;background:linear-gradient(180deg,rgba(255,255,255,.07),transparent);}
.j-co{font-family:'Cormorant Garamond',serif;font-size:.62rem;color:var(--sg2);letter-spacing:.28em;text-transform:uppercase;}
.j-div{width:50px;height:1px;background:linear-gradient(90deg,transparent,var(--go),transparent);margin:8px auto;}
.j-name{font-family:'Cormorant Garamond',serif;font-size:1.55rem;font-weight:600;color:var(--cr);line-height:1.1;}
.j-sub{font-size:.58rem;color:rgba(245,240,232,.5);letter-spacing:.18em;text-transform:uppercase;margin-top:6px;}
.orb-dot{position:absolute;width:10px;height:10px;background:rgba(201,168,76,.5);border-radius:50%;}
.float-tag{position:absolute;background:rgba(201,168,76,.14);border:1px solid rgba(201,168,76,.35);border-radius:50px;padding:4px 12px;font-size:.64rem;color:var(--sg2);letter-spacing:.1em;white-space:nowrap;}

/* SECTION COMMONS */
.s-lbl{display:inline-block;font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;color:var(--ol);margin-bottom:14px;}
.s-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2.2rem,3.8vw,3.6rem);font-weight:400;line-height:1.12;color:var(--dg);}
.s-title em{font-style:italic;color:var(--lg);}
.s-title.lt{color:var(--cr);}
.s-title.lt em{color:var(--sg2);}

/* BENEFITS */
.benefits{padding:120px 60px;background:linear-gradient(180deg,var(--dg) 0%,#1e3620 100%);position:relative;overflow:hidden;}
.b-bg{position:absolute;inset:0;background:radial-gradient(ellipse 60% 40% at 50% 0%,rgba(45,90,39,.4),transparent 60%);}
.b-hdr{text-align:center;margin-bottom:72px;position:relative;}
.b-hdr .s-lbl{color:var(--sg);}
.b-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;max-width:1100px;margin:0 auto;position:relative;}
.b-card{background:rgba(245,240,232,.04);border:1px solid rgba(122,158,107,.2);border-radius:20px;padding:36px 32px;transition:all .4s cubic-bezier(.16,1,.3,1);cursor:default;position:relative;overflow:hidden;}
.b-card::before{content:'';position:absolute;inset:0;border-radius:20px;background:linear-gradient(135deg,rgba(201,168,76,.06),transparent);opacity:0;transition:opacity .4s;}
.b-card:hover{transform:translateY(-6px);border-color:rgba(201,168,76,.35);box-shadow:0 24px 60px rgba(0,0,0,.3);}
.b-card:hover::before{opacity:1;}
.b-icon{width:52px;height:52px;border-radius:14px;background:rgba(122,158,107,.15);border:1px solid rgba(122,158,107,.25);display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:22px;transition:transform .4s;}
.b-card:hover .b-icon{transform:scale(1.1) rotate(-5deg);}
.b-ttl{font-family:'Cormorant Garamond',serif;font-size:1.28rem;color:var(--cr);margin-bottom:10px;font-weight:500;}
.b-dsc{font-size:.85rem;line-height:1.7;color:rgba(245,240,232,.55);font-weight:300;}

/* PRODUCT HERO */
.ph{padding:120px 60px;background:var(--cr);display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;max-width:1280px;margin:0 auto;}
.p-vis{position:relative;display:flex;align-items:center;justify-content:center;min-height:540px;}
.p-blob{position:absolute;width:480px;height:480px;border-radius:50%;background:radial-gradient(ellipse at center,rgba(122,158,107,.14),rgba(201,168,76,.05) 50%,transparent 70%);}
.big-jar{position:relative;z-index:2;width:250px;height:310px;background:linear-gradient(145deg,#2a5225,#1a2e1a);border-radius:28px 28px 24px 24px;border:1px solid rgba(201,168,76,.35);box-shadow:0 60px 120px rgba(26,46,26,.25),0 20px 40px rgba(26,46,26,.15);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;overflow:hidden;animation:float 7s ease-in-out infinite;}
.bj-cap{position:absolute;top:-16px;left:50%;transform:translateX(-50%);width:155px;height:35px;background:linear-gradient(180deg,#c9a84c,#8b6f47);border-radius:8px 8px 5px 5px;}
.bj-shine{position:absolute;top:0;left:0;right:0;height:45%;background:linear-gradient(180deg,rgba(255,255,255,.07),transparent);}
.bj-co{font-family:'Cormorant Garamond',serif;font-size:.68rem;color:var(--sg2);letter-spacing:.28em;text-transform:uppercase;}
.bj-div{width:56px;height:1px;background:linear-gradient(90deg,transparent,var(--go),transparent);margin:12px auto;}
.bj-name{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:600;color:var(--cr);line-height:1;}
.bj-wt{font-size:.64rem;color:rgba(245,240,232,.5);letter-spacing:.2em;margin-top:6px;}
.bj-tag{font-size:.6rem;color:var(--sg);letter-spacing:.18em;text-transform:uppercase;margin-top:6px;}
.p-powder{position:absolute;bottom:55px;width:190px;height:36px;background:radial-gradient(ellipse at center,rgba(122,158,107,.5) 0%,transparent 70%);filter:blur(10px);animation:powf 4s ease-in-out infinite;}
.p-info .s-lbl{color:var(--ol);}
.p-tagline{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.12rem;color:var(--sg);margin-bottom:30px;}
.p-desc{font-size:.9rem;line-height:1.82;color:rgba(26,46,26,.68);margin-bottom:34px;font-weight:300;max-width:440px;}
.n-pills{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:34px;}
.n-pill{background:rgba(122,158,107,.12);border:1px solid rgba(122,158,107,.25);color:var(--lg);padding:6px 16px;border-radius:50px;font-size:.75rem;letter-spacing:.08em;}
.price-row{display:flex;align-items:center;gap:20px;margin-bottom:26px;}
.price{font-family:'Cormorant Garamond',serif;font-size:2.2rem;color:var(--dg);}
.price-old{font-size:1rem;color:var(--sg);text-decoration:line-through;}
.p-badge{background:rgba(45,90,39,.1);color:var(--lg);padding:4px 12px;border-radius:50px;font-size:.72rem;font-weight:500;}
.add-btn{background:var(--lg);color:var(--cr);padding:17px 46px;border:none;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:.9rem;font-weight:500;letter-spacing:.08em;cursor:pointer;transition:all .35s;text-transform:uppercase;margin-right:12px;}
.add-btn:hover{background:var(--dg);transform:translateY(-2px);box-shadow:0 16px 48px rgba(26,46,26,.25);}
.wish-btn{background:transparent;color:var(--lg);padding:17px 22px;border:1px solid rgba(45,90,39,.3);border-radius:50px;font-size:1.1rem;cursor:pointer;transition:all .3s;}
.wish-btn:hover{border-color:var(--lg);background:rgba(45,90,39,.06);}
.p-perks{display:flex;gap:20px;margin-top:28px;padding-top:28px;border-top:1px solid rgba(122,158,107,.2);flex-wrap:wrap;}
.perk-item{font-size:.75rem;color:rgba(26,46,26,.5);}
.p-badge-float{position:absolute;background:rgba(122,158,107,.12);border:1px solid rgba(122,158,107,.25);border-radius:50px;padding:6px 14px;font-size:.7rem;color:var(--lg);letter-spacing:.08em;backdrop-filter:blur(8px);}

/* COLLECTION */
.coll{padding:120px 60px;background:var(--wb);}
.c-hdr{text-align:center;margin-bottom:72px;}
.tabs{display:flex;gap:8px;justify-content:center;margin-top:28px;flex-wrap:wrap;}
.tab{padding:10px 28px;border-radius:50px;font-size:.8rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;border:1px solid rgba(45,90,39,.25);background:transparent;color:var(--dg);transition:all .3s;font-family:'DM Sans',sans-serif;}
.tab.active,.tab:hover{background:var(--lg);color:var(--cr);border-color:var(--lg);}
.p-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;max-width:1200px;margin:0 auto;}
.p-card{background:var(--cr);border-radius:20px;overflow:hidden;border:1px solid rgba(122,158,107,.15);transition:all .4s cubic-bezier(.16,1,.3,1);cursor:pointer;}
.p-card:hover{transform:translateY(-8px);box-shadow:0 30px 60px rgba(26,46,26,.12);}
.c-vis{height:220px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;}
.c-vis.dg{background:linear-gradient(135deg,#1a3e15,#2d5a27);}
.c-vis.sg{background:linear-gradient(135deg,#3d5e28,#7a9e6b);}
.c-vis.ol{background:linear-gradient(135deg,#4a5a2a,#6b7c3a);}
.c-vis.eb{background:linear-gradient(135deg,#5a3e28,#8b6f47);}
.c-em{font-size:3.2rem;filter:drop-shadow(0 8px 24px rgba(0,0,0,.3));animation:float 5s ease-in-out infinite;}
.c-tag{position:absolute;top:14px;right:14px;background:rgba(201,168,76,.25);border:1px solid rgba(201,168,76,.4);color:var(--sg2);padding:4px 12px;border-radius:50px;font-size:.64rem;letter-spacing:.15em;text-transform:uppercase;}
.c-body{padding:22px 20px;}
.c-name{font-family:'Cormorant Garamond',serif;font-size:1.14rem;color:var(--dg);margin-bottom:6px;font-weight:500;}
.c-desc{font-size:.77rem;color:rgba(26,46,26,.55);line-height:1.6;margin-bottom:16px;}
.c-foot{display:flex;align-items:center;justify-content:space-between;}
.c-price{font-family:'Cormorant Garamond',serif;font-size:1.2rem;color:var(--lg);font-weight:500;}
.c-btn{width:36px;height:36px;border-radius:50%;background:var(--lg);color:var(--cr);border:none;font-size:1.1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .3s;}
.c-btn:hover{background:var(--dg);transform:scale(1.1);}

/* STORY */
.story{padding:130px 60px;background:linear-gradient(165deg,#0f1e0f 0%,#1e3620 50%,#152b12 100%);display:grid;grid-template-columns:1fr 1fr;gap:90px;align-items:center;position:relative;overflow:hidden;}
.st-glow{position:absolute;top:-80px;right:-80px;width:600px;height:600px;background:radial-gradient(ellipse at center,rgba(201,168,76,.1),transparent 65%);}
.st-text{position:relative;z-index:2;}
.st-text .s-lbl{color:var(--sg);}
.st-body{font-size:.94rem;line-height:1.95;color:rgba(245,240,232,.6);font-weight:300;margin-bottom:22px;}
.st-quote{border-left:2px solid var(--go);padding-left:24px;margin:34px 0;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.38rem;color:var(--sg2);line-height:1.42;}
.st-vis{position:relative;z-index:2;}
.st-cards{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.st-card{background:rgba(245,240,232,.05);border:1px solid rgba(122,158,107,.2);border-radius:16px;padding:28px 24px;transition:transform .4s;}
.st-card:hover{transform:scale(1.03);}
.st-num{font-family:'Cormorant Garamond',serif;font-size:2.4rem;color:rgba(201,168,76,.3);line-height:1;margin-bottom:8px;}
.st-ttl{font-family:'Cormorant Garamond',serif;font-size:1rem;color:var(--cr);margin-bottom:8px;}
.st-txt{font-size:.78rem;color:rgba(245,240,232,.44);line-height:1.6;}

/* EXPERIENCE */
.exp{padding:120px 60px;background:var(--cr);text-align:center;position:relative;overflow:hidden;}
.exp-bg{position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 100%,rgba(122,158,107,.1),transparent 65%);}
.exp .s-title{margin:12px auto 18px;max-width:700px;}
.exp-sub{max-width:510px;margin:0 auto 64px;font-size:.92rem;line-height:1.75;color:rgba(26,46,26,.58);}
.exp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;max-width:1000px;margin:0 auto;}
.exp-card{background:linear-gradient(145deg,rgba(122,158,107,.08),rgba(201,168,76,.05));border:1px solid rgba(122,158,107,.2);border-radius:20px;padding:48px 32px;text-align:center;transition:all .4s;}
.exp-card:hover{transform:translateY(-8px);box-shadow:0 24px 60px rgba(26,46,26,.1);border-color:rgba(201,168,76,.3);}
.exp-num{font-family:'Cormorant Garamond',serif;font-size:3rem;color:var(--sg);opacity:.5;margin-bottom:4px;}
.exp-ttl{font-family:'Cormorant Garamond',serif;font-size:1.2rem;color:var(--dg);margin-bottom:12px;}
.exp-txt{font-size:.82rem;color:rgba(26,46,26,.55);line-height:1.7;}

/* TESTIMONIALS */
.testi{padding:120px 60px;background:linear-gradient(180deg,#1a2e1a,#0f1e0f);position:relative;overflow:hidden;}
.t-hdr{text-align:center;margin-bottom:60px;}
.t-hdr .s-lbl{color:var(--sg);}
.t-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;max-width:1100px;margin:0 auto;}
.t-card{background:rgba(245,240,232,.05);backdrop-filter:blur(20px);border:1px solid rgba(122,158,107,.2);border-radius:20px;padding:36px 32px;transition:all .4s;}
.t-card:hover{transform:translateY(-6px);border-color:rgba(201,168,76,.3);}
.t-stars{color:var(--go);font-size:.9rem;margin-bottom:20px;letter-spacing:4px;}
.t-txt{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.04rem;line-height:1.72;color:rgba(245,240,232,.78);margin-bottom:24px;}
.t-auth{display:flex;align-items:center;gap:14px;}
.t-av{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.1rem;background:rgba(122,158,107,.2);border:1px solid rgba(122,158,107,.3);}
.t-name{font-size:.85rem;color:var(--cr);font-weight:500;}
.t-loc{font-size:.75rem;color:var(--sg);}

/* FAQ */
.faq{padding:120px 60px;background:var(--wb);}
.faq-in{max-width:720px;margin:0 auto;}
.faq-hdr{text-align:center;margin-bottom:60px;}
.faq-item{border-bottom:1px solid rgba(122,158,107,.25);overflow:hidden;}
.faq-q{width:100%;background:transparent;border:none;display:flex;justify-content:space-between;align-items:center;padding:24px 0;cursor:pointer;font-family:'Cormorant Garamond',serif;font-size:1.1rem;color:var(--dg);text-align:left;transition:color .3s;}
.faq-q:hover{color:var(--lg);}
.faq-arr{font-size:.82rem;color:var(--sg);transition:transform .4s;flex-shrink:0;}
.faq-arr.op{transform:rotate(180deg);}
.faq-a{max-height:0;overflow:hidden;transition:max-height .5s cubic-bezier(.16,1,.3,1);}
.faq-a.op{max-height:200px;}
.faq-ai{padding-bottom:24px;font-size:.88rem;line-height:1.8;color:rgba(26,46,26,.65);}

/* NEWSLETTER */
.nl{padding:130px 60px;text-align:center;background:linear-gradient(160deg,#0f1e0f,#1a2e1a 50%,#0f1e0f);position:relative;overflow:hidden;}
.nl-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:800px;height:380px;background:radial-gradient(ellipse at center,rgba(201,168,76,.12),transparent 65%);}
.nl .s-lbl{color:var(--sg);}
.nl .s-title{max-width:600px;margin:12px auto 18px;}
.nl-sub{font-size:.9rem;color:rgba(245,240,232,.52);margin-bottom:44px;}
.e-form{display:flex;max-width:476px;margin:0 auto;}
.e-inp{flex:1;padding:18px 24px;border-radius:50px 0 0 50px;border:1px solid rgba(122,158,107,.3);border-right:none;background:rgba(245,240,232,.07);color:var(--cr);font-family:'DM Sans',sans-serif;font-size:.9rem;outline:none;transition:border-color .3s;}
.e-inp::placeholder{color:rgba(245,240,232,.35);}
.e-inp:focus{border-color:rgba(201,168,76,.5);}
.e-btn{background:var(--go);color:var(--dg);padding:18px 30px;border:none;border-radius:0 50px 50px 0;font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:background .3s;white-space:nowrap;}
.e-btn:hover{background:var(--sg2);}
.nl-perks{display:flex;gap:28px;justify-content:center;margin-top:36px;flex-wrap:wrap;}
.nl-perk{font-size:.78rem;color:rgba(245,240,232,.44);}
.nl-perk span{color:var(--sg);}

/* FOOTER */
.footer{padding:80px 60px 40px;background:#080f08;border-top:1px solid rgba(122,158,107,.14);}
.f-top{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:60px;margin-bottom:60px;}
.f-logo{font-family:'Cormorant Garamond',serif;font-size:1.5rem;color:var(--cr);margin-bottom:14px;display:flex;align-items:center;gap:8px;}
.f-logo .dot{width:7px;height:7px;background:var(--go);border-radius:50%;}
.f-tag{font-size:.82rem;color:rgba(245,240,232,.38);line-height:1.7;max-width:255px;margin-bottom:24px;}
.socials{display:flex;gap:12px;}
.soc-btn{width:38px;height:38px;border-radius:50%;background:rgba(245,240,232,.07);border:1px solid rgba(122,158,107,.2);display:flex;align-items:center;justify-content:center;color:var(--sg);font-size:.85rem;cursor:pointer;transition:all .3s;text-decoration:none;}
.soc-btn:hover{background:rgba(122,158,107,.2);color:var(--cr);}
.f-col-ttl{font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--sg);margin-bottom:20px;}
.f-links{list-style:none;display:flex;flex-direction:column;gap:10px;}
.f-links a{font-size:.85rem;color:rgba(245,240,232,.42);text-decoration:none;transition:color .3s;}
.f-links a:hover{color:rgba(245,240,232,.78);}
.f-bot{border-top:1px solid rgba(122,158,107,.1);padding-top:32px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;}
.f-copy{font-size:.78rem;color:rgba(245,240,232,.22);}
.eco{display:flex;align-items:center;gap:8px;font-size:.75rem;color:rgba(122,158,107,.58);}

/* KEYFRAMES */
@keyframes fadeUp{from{opacity:0;transform:translateY(32px);}to{opacity:1;transform:translateY(0);}}
@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-18px);}}
@keyframes floatJar{0%,100%{transform:translate(-50%,-50%) translateY(0);}50%{transform:translate(-50%,-50%) translateY(-18px);}}
@keyframes pulse{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.05);opacity:.8;}}
@keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
@keyframes powf{0%,100%{opacity:.7;transform:scaleX(1);}50%{opacity:1;transform:scaleX(1.15);}}
@keyframes leafDrift{0%{opacity:0;transform:translateY(0) rotate(0deg);}10%{opacity:.8;}90%{opacity:.4;}100%{opacity:0;transform:translateY(-100vh) rotate(360deg) translateX(40px);}}
@keyframes particleFlt{0%{opacity:0;transform:translateY(0);}10%{opacity:1;}90%{opacity:.8;}100%{opacity:0;transform:translateY(-100vh);}}

/* FLOATING LEAVES */
.leaf{position:absolute;pointer-events:none;animation:leafDrift linear infinite;}
.particle{position:absolute;border-radius:50%;pointer-events:none;background:rgba(201,168,76,.5);animation:particleFlt linear infinite;}

/* SCROLL INDICATOR */
.scroll-ind{position:absolute;bottom:34px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;opacity:.38;z-index:10;}
.scroll-lbl{font-size:.64rem;color:var(--cr);letter-spacing:.2em;text-transform:uppercase;}
.scroll-line{width:1px;height:36px;background:linear-gradient(180deg,var(--cr),transparent);animation:pulse 2s ease-in-out infinite;}

/* RESPONSIVE */
@media(max-width:1100px){
  .nav{padding:18px 24px;}.nav.sc{padding:12px 24px;}
  .nav-links{display:none;}
  .h-content{padding:0 24px;}
  .h-right{display:none;}
  .b-grid{grid-template-columns:repeat(2,1fr);}
  .ph{grid-template-columns:1fr;padding:80px 24px;gap:40px;}
  .p-grid{grid-template-columns:repeat(2,1fr);}
  .story{grid-template-columns:1fr;padding:80px 24px;gap:60px;}
  .t-grid{grid-template-columns:1fr;}
  .exp-grid{grid-template-columns:1fr;}
  .f-top{grid-template-columns:1fr 1fr;gap:40px;}
  .benefits,.coll,.exp,.testi,.faq,.nl,.story{padding:80px 24px;}
}
`;

const BENEFITS = [
  { icon: "🌿", title: "9 Essential Amino Acids", desc: "Complete protein source with all essential amino acids your body cannot produce on its own." },
  { icon: "⚡", title: "Natural Energy Boost", desc: "Sustained clean energy without caffeine crash. Nourish your cells for lasting vitality." },
  { icon: "🛡️", title: "Supports Immunity", desc: "Rich in Vitamin C, zinc, and antioxidants to strengthen your body's natural defenses." },
  { icon: "🧠", title: "Focus & Clarity", desc: "Nootropic properties support mental clarity, concentration, and cognitive wellness." },
  { icon: "🌱", title: "Plant-Powered Nutrition", desc: "100% organic, cold-pressed moringa leaf powder. No fillers, no additives. Pure nature." },
  { icon: "✨", title: "Daily Vitality", desc: "One teaspoon daily transforms your wellness ritual with 90+ verified nutrients." },
];

const PRODUCTS = {
  teas: [
    { name: "Moringa + Lemon Tea", desc: "Bright citrus meets earthy moringa", price: "$18", tag: "Bestseller", cl: "dg", em: "🍋" },
    { name: "Moringa + Tulsi Tea", desc: "Sacred blend for inner peace", price: "$18", tag: "Organic", cl: "sg", em: "🌿" },
    { name: "Moringa + Matcha Tea", desc: "Dual-green energy awakening", price: "$22", tag: "Premium", cl: "ol", em: "🍵" },
    { name: "Moringa + Ginger Tea", desc: "Warming fire & earth elixir", price: "$18", tag: "Spiced", cl: "eb", em: "🫚" },
  ],
  drinks: [
    { name: "Focus Smoothie", desc: "Banana · Oat · Moringa · Milk", price: "$14", tag: "Clarity", cl: "dg", em: "🥤" },
    { name: "Gym Protein Smoothie", desc: "Banana · PB · Milk · Moringa", price: "$16", tag: "Protein", cl: "sg", em: "💪" },
    { name: "Detox Green Smoothie", desc: "Apple · Spinach · Moringa · Lemon", price: "$14", tag: "Cleanse", cl: "ol", em: "🥦" },
    { name: "Morning Glow Blend", desc: "Mango · Coconut · Moringa · Lime", price: "$14", tag: "Morning", cl: "eb", em: "🌅" },
  ],
  snacks: [
    { name: "Moringa Cookies", desc: "Soft-baked oat & moringa bites", price: "$12", tag: "Baked", cl: "eb", em: "🍪" },
    { name: "Energy Balls", desc: "Nuts, seeds & moringa protein", price: "$15", tag: "High Protein", cl: "ol", em: "🟢" },
    { name: "Moringa Granola", desc: "Crunchy clusters with golden honey", price: "$17", tag: "Crunchy", cl: "sg", em: "🌾" },
    { name: "Seed & Nut Bar", desc: "Ancient seeds + moringa boost", price: "$8", tag: "Raw", cl: "dg", em: "🌰" },
  ],
};

const FAQS = [
  { q: "What is Moringa Powder and how do I use it?", a: "Moringa powder is made from dried leaves of the Moringa oleifera tree, often called the 'tree of life.' Add 1 tsp to smoothies, teas, soups, or warm water daily for optimal wellness benefits." },
  { q: "How soon will I notice results?", a: "Most customers notice improved energy levels within the first week of consistent use. Deeper benefits — better sleep, clearer skin, enhanced focus — typically emerge within 2–4 weeks of daily ritual." },
  { q: "Is your Moringa organically sourced?", a: "Yes. Our moringa is 100% certified organic, single-origin, cold-pressed at low temperature to preserve all 90+ nutrients. No pesticides, fillers, or artificial additives — ever." },
  { q: "Can I take Moringa with other supplements?", a: "Moringa pairs beautifully with most supplements. However, we recommend consulting your healthcare provider if you're on blood pressure or thyroid medications, as moringa may interact with these." },
  { q: "What is your return policy?", a: "We offer a 30-day happiness guarantee. If you're not completely satisfied, return any unused portion for a full refund. No questions asked — your wellness journey is our commitment." },
];

const TESTIMONIALS = [
  { text: "I've been using this moringa powder for two months and my energy levels have completely transformed. I feel clear, focused, and alive in a way I haven't felt in years.", name: "Aria Chen", loc: "San Francisco, CA", av: "🌸", stars: "★★★★★" },
  { text: "The packaging alone is a work of art. But more importantly — this product actually works. My morning ritual now feels sacred, intentional, deeply nourishing.", name: "Sofia Reyes", loc: "Barcelona, Spain", av: "✨", stars: "★★★★★" },
  { text: "As a yoga instructor, I recommend this to all my students. Pure, clean, and potent. The moringa lattes we make are absolutely divine every morning.", name: "Meera Patel", loc: "London, UK", av: "🌿", stars: "★★★★★" },
];

function Leaves({ dark = false }) {
  const ls = Array.from({ length: 8 }, (_, i) => ({
    id: i, left: `${8 + i * 11}%`,
    delay: `${i * 1.3}s`, dur: `${13 + i * 1.8}s`,
    sz: 18 + (i % 3) * 14, op: 0.1 + (i % 4) * 0.06,
  }));
  const col = dark ? "#7a9e6b" : "#2d5a27";
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {ls.map(l => (
        <div key={l.id} className="leaf" style={{
          bottom: '-60px', left: l.left,
          animationDuration: l.dur, animationDelay: l.delay,
        }}>
          <svg width={l.sz} height={l.sz} viewBox="0 0 40 40" style={{ opacity: l.op, transform: `rotate(${l.id * 45}deg)` }}>
            <path d="M20 5 C30 8,38 18,36 30 C34 38,24 40,20 35 C16 40,6 38,4 30 C2 18,10 8,20 5Z" fill={col} />
            <path d="M20 5 L20 35" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" fill="none" />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default function MoringaSite() {
  const [scrolled, setScrolled] = useState(false);
  const [tab, setTab] = useState("teas");
  const [faq, setFaq] = useState(null);
  const [cart, setCart] = useState(0);
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const addCart = () => setCart(c => c + 1);

  const orbDots = [0, 72, 144, 216, 288].map(deg => {
    const r = (deg * Math.PI) / 180;
    return { top: `calc(50% + ${Math.sin(r) * 275}px)`, left: `calc(50% + ${Math.cos(r) * 275}px)` };
  });

  const floatTags = [
    { label: "Vitamin C", top: "14%", right: "6%" },
    { label: "Iron · Calcium", bottom: "26%", right: "2%" },
    { label: "Omega-3", top: "44%", left: "2%" },
  ];

  return (
    <>
      <style>{style}</style>

      {/* NAV */}
      <nav className={`nav${scrolled ? ' sc' : ''}`}>
        <div className="nav-logo"><div className="logo-dot" />Moringa & Co.</div>
        <ul className="nav-links">
          {["Shop","Benefits","Our Story","Wellness","Journal"].map(l => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: '.8rem', color: scrolled ? 'var(--dg)' : 'var(--cr)', opacity: .65 }}>🛒 {cart}</span>
          <button className="nav-cta" onClick={addCart}>Shop Now</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="h-overlay" />
        <div className="h-grain" />
        <Leaves dark />
        {Array.from({length:12}).map((_,i) => (
          <div key={i} className="particle" style={{
            width: 3+(i%3)*2, height: 3+(i%3)*2,
            left: `${i*8+4}%`, bottom: '-10px',
            animationDuration: `${9+i*1.4}s`, animationDelay: `${i*.65}s`,
          }} />
        ))}

        <div className="h-content">
          <div className="h-badge">✦ 100% Organic · Cold-Pressed · Pure Plant Power</div>
          <h1 className="h1 serif">Nature's <em>Complete</em><br />Nutrition.</h1>
          <p className="h-sub">Moringa powered wellness with all 9 essential nutrients for energy, focus, immunity, and daily balance.</p>
          <div className="h-btns">
            <button className="btn-p" onClick={addCart}>Shop Now</button>
            <button className="btn-g">Explore Wellness</button>
          </div>
          <div className="h-stats">
            {[["90+","Nutrients"],["100%","Organic"],["50k+","Customers"]].map(([n,l]) => (
              <div key={l}><div className="stat-num serif">{n}</div><div className="stat-lbl">{l}</div></div>
            ))}
          </div>
        </div>

        {/* Hero jar */}
        <div className="h-right">
          <div className="h-circle">
            <div className="h-glow" />
            <div className="h-ring1" />
            <div className="h-ring2" />
            {orbDots.map((pos, i) => (
              <div key={i} className="orb-dot" style={{ ...pos, transform: 'translate(-50%,-50%)' }} />
            ))}
            <div className="h-jar-wrap" style={{ position: 'absolute', top: '50%', left: '50%' }}>
              <div className="h-jar">
                <div className="j-cap" />
                <div className="j-shine" />
                <div className="j-co">Moringa & Co.</div>
                <div className="j-div" />
                <div className="j-name serif">Moringa<br />Powder</div>
                <div className="j-sub">Pure · Organic · Raw</div>
              </div>
            </div>
            {floatTags.map(({ label, ...pos }) => (
              <div key={label} className="float-tag" style={pos}>{label}</div>
            ))}
          </div>
        </div>

        <div className="scroll-ind">
          <span className="scroll-lbl">Discover</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* BENEFITS */}
      <section className="benefits">
        <div className="b-bg" />
        <Leaves dark />
        <div className="b-hdr">
          <div className="s-lbl">Why Moringa</div>
          <h2 className="s-title lt serif">Powered by <em>all 9</em><br />essential nutrients.</h2>
        </div>
        <div className="b-grid">
          {BENEFITS.map(b => (
            <div className="b-card" key={b.title}>
              <div className="b-icon">{b.icon}</div>
              <div className="b-ttl serif">{b.title}</div>
              <div className="b-dsc">{b.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT HERO */}
      <section style={{ background: 'var(--cr)' }}>
        <div className="ph">
          <div className="p-vis">
            <div className="p-blob" />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(122,158,107,.15)', position: 'absolute' }} />
              <div style={{ width: 290, height: 290, borderRadius: '50%', border: '1px dashed rgba(201,168,76,.15)', position: 'absolute', animation: 'spin 30s linear infinite' }} />
            </div>
            <div className="big-jar">
              <div className="bj-cap" />
              <div className="bj-shine" />
              <div className="bj-co">Moringa & Co.</div>
              <div className="bj-div" />
              <div className="bj-name serif">Moringa<br />Powder</div>
              <div className="bj-wt">200g · Premium Grade</div>
              <div className="bj-div" />
              <div className="bj-tag">100% Pure · Cold-Pressed</div>
            </div>
            <div className="p-powder" />
            {[
              { text: "USDA Organic", style: { top: '10%', right: '4%' } },
              { text: "Vegan ✓", style: { bottom: '22%', right: '2%' } },
              { text: "Lab Tested", style: { top: '42%', left: '2%' } },
            ].map(({ text, style: s }) => (
              <div key={text} className="p-badge-float" style={s}>{text}</div>
            ))}
          </div>

          <div className="p-info">
            <div className="s-lbl">Hero Product</div>
            <h2 className="s-title serif" style={{ marginBottom: 18 }}>Premium Moringa <em>Powder</em></h2>
            <p className="p-tagline serif">"Ancient superfood. Modern ritual."</p>
            <p className="p-desc">Sourced from the sunlit Moringa forests of South Asia, our cold-pressed powder preserves 90+ bioavailable nutrients. Seven times more vitamin C than oranges. Four times more calcium than milk. Pure plant wisdom, bottled for your daily ritual.</p>
            <div className="n-pills">
              {["Protein 25%","Iron 32%","Vit C 47%","Calcium 28%","Antioxidants","Omega-3"].map(n => (
                <span className="n-pill" key={n}>{n}</span>
              ))}
            </div>
            <div className="price-row">
              <span className="price serif">$34.00</span>
              <span className="price-old">$42.00</span>
              <span className="p-badge">Save 19%</span>
            </div>
            <div>
              <button className="add-btn" onClick={addCart}>Add to Cart</button>
              <button className="wish-btn">♡</button>
            </div>
            <div className="p-perks">
              {["🚚 Free shipping $50+","🌿 Certified Organic","↩️ 30-Day Guarantee"].map(p => (
                <span className="perk-item" key={p}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="coll">
        <div className="c-hdr">
          <div className="s-lbl">The Collection</div>
          <h2 className="s-title serif">Moringa <em>Reimagined</em></h2>
          <div className="tabs">
            {[["teas","Moringa Teas"],["drinks","Energy Drinks"],["snacks","Snacks"]].map(([k,v]) => (
              <button key={k} className={`tab${tab===k?' active':''}`} onClick={() => setTab(k)}>{v}</button>
            ))}
          </div>
        </div>
        <div className="p-grid">
          {PRODUCTS[tab].map(p => (
            <div className="p-card" key={p.name}>
              <div className={`c-vis ${p.cl}`}>
                <div className="c-em">{p.em}</div>
                <div className="c-tag">{p.tag}</div>
              </div>
              <div className="c-body">
                <div className="c-name serif">{p.name}</div>
                <div className="c-desc">{p.desc}</div>
                <div className="c-foot">
                  <div className="c-price serif">{p.price}</div>
                  <button className="c-btn" onClick={addCart}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="story">
        <div className="st-glow" />
        <Leaves dark />
        <div className="st-text">
          <div className="s-lbl">Our Story</div>
          <h2 className="s-title lt serif" style={{ marginBottom: 28 }}>Rooted in <em>ancient</em><br />plant wisdom.</h2>
          <p className="st-body">For thousands of years, the Moringa tree — called the "tree of life" — has nourished communities across tropical forests. In Ayurvedic texts dating back 5,000 years, its leaves were described as medicine for the body, mind, and spirit.</p>
          <blockquote className="st-quote serif">"Every leaf holds the memory of sunlight, soil, and rain."</blockquote>
          <p className="st-body">We source our moringa from small family farms where trees grow without chemicals, harvested by hand at peak potency, dried at low temperature to preserve every nutrient. From ancient earth to your morning ritual.</p>
        </div>
        <div className="st-vis">
          <div className="st-cards">
            {[
              { n: "01", t: "Single-Origin", d: "Hand-harvested from certified organic family farms in South Asia" },
              { n: "02", t: "Cold-Pressed", d: "Low-temperature processing preserves all 90+ bioactive nutrients" },
              { n: "03", t: "Third-Party Tested", d: "Every batch lab-verified for purity, potency, and safety" },
              { n: "04", t: "Carbon Neutral", d: "We plant 10 trees for every product sold. Nature gives, we return." },
            ].map(c => (
              <div className="st-card" key={c.n}>
                <div className="st-num serif">{c.n}</div>
                <div className="st-ttl serif">{c.t}</div>
                <div className="st-txt">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="exp">
        <div className="exp-bg" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="s-lbl">The Ritual</div>
          <h2 className="s-title serif exp">Feel energy <em>the natural way.</em></h2>
          <p className="exp-sub">One teaspoon. Morning ritual. A thousand years of plant wisdom working in harmony with your body.</p>
          <div className="exp-grid">
            {[
              { n: "I", t: "Morning Ritual", d: "Stir one teaspoon into warm water or your morning smoothie. Begin with intention." },
              { n: "II", t: "Midday Balance", d: "Add to your lunch bowl or afternoon tea. Sustain your energy without stimulants." },
              { n: "III", t: "Evening Restore", d: "Blend into a golden milk or evening soup. Let your body absorb and restore overnight." },
            ].map(e => (
              <div className="exp-card" key={e.n}>
                <div className="exp-num serif">{e.n}</div>
                <div className="exp-ttl serif">{e.t}</div>
                <div className="exp-txt">{e.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testi">
        <Leaves dark />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="t-hdr">
            <div className="s-lbl">Testimonials</div>
            <h2 className="s-title lt serif">Wellness <em>stories</em></h2>
          </div>
          <div className="t-grid">
            {TESTIMONIALS.map(t => (
              <div className="t-card" key={t.name}>
                <div className="t-stars">{t.stars}</div>
                <p className="t-txt serif">"{t.text}"</p>
                <div className="t-auth">
                  <div className="t-av">{t.av}</div>
                  <div>
                    <div className="t-name">{t.name}</div>
                    <div className="t-loc">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="faq-in">
          <div className="faq-hdr">
            <div className="s-lbl">Questions</div>
            <h2 className="s-title serif">Your <em>curiosity</em>,<br />answered.</h2>
          </div>
          {FAQS.map((f, i) => (
            <div className="faq-item" key={i}>
              <button className="faq-q serif" onClick={() => setFaq(faq === i ? null : i)}>
                {f.q}
                <span className={`faq-arr${faq===i?' op':''}`}>▼</span>
              </button>
              <div className={`faq-a${faq===i?' op':''}`}>
                <div className="faq-ai">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="nl">
        <div className="nl-glow" />
        <Leaves dark />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="s-lbl">Stay Connected</div>
          <h2 className="s-title lt serif">Begin Your <em>Wellness</em><br />Ritual.</h2>
          <p className="nl-sub">Join 50,000+ conscious souls. Weekly recipes, rituals, and roots.</p>
          {subbed ? (
            <div style={{ color: 'var(--sg2)', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontStyle: 'italic' }}>
              ✦ Welcome to the ritual, dear soul.
            </div>
          ) : (
            <div className="e-form">
              <input className="e-inp" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
              <button className="e-btn" onClick={() => email && setSubbed(true)}>Subscribe</button>
            </div>
          )}
          <div className="nl-perks">
            {[["✦","Free Wellness Guide"],["✦","10% Off First Order"],["✦","No Spam. Ever."]].map(([s,t]) => (
              <div className="nl-perk" key={t}><span>{s}</span> {t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="f-top">
          <div>
            <div className="f-logo"><div className="dot" />Moringa & Co.</div>
            <p className="f-tag">Ancient plant wisdom for the modern wellness journey. Pure. Organic. Intentional.</p>
            <div className="socials">
              {["𝕏","📷","f","▶"].map((s,i) => <a key={i} href="#" className="soc-btn">{s}</a>)}
            </div>
          </div>
          {[
            { t: "Shop", ls: ["Moringa Powder","Teas Collection","Energy Drinks","Snacks","Bundles"] },
            { t: "Wellness", ls: ["Our Story","Benefits","Recipes","Journal","Research"] },
            { t: "Support", ls: ["FAQ","Shipping","Returns","Contact Us","Wholesale"] },
          ].map(c => (
            <div key={c.t}>
              <div className="f-col-ttl">{c.t}</div>
              <ul className="f-links">{c.ls.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="f-bot">
          <div className="f-copy">© 2025 Moringa & Co. All rights reserved.</div>
          <div className="eco">🌱 <span>Carbon Neutral Brand · 10 Trees Per Order</span></div>
        </div>
      </footer>
    </>
  );
}
