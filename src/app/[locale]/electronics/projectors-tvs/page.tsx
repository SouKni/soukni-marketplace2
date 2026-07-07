export default function ProjectorsTVsPage() {

  const featuredProjectors = [
    { id: 1, badge: "diamond", title: "LG CineBeam HU715QW", price: "24,500 MAD", condition: "New", spec: "New", location: "Rabat, Agdal", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBy_iYS88D-W888j0oTqtz9saK0hZeyWdD_TXm6iLqWDrvZM21pe-Y7mXvq3lcGjOoKUKH5hhBZbGSSQ9FIbZ0NxPOI0xnIsEIws7NS7-Lw_LkygMQkwzjESXHVeujJql-NuYWO4rNs41gBJa9KXwEC1mdI71UBgveYSzLahDLbnYYX8fxBZHhtFPyUWueEoPvUgT6nmjfhoxhbRTjg6ri8xpvOIUOyrbmfY5Y3D8Hf4-oMoNLBlImfRRmfnSDoJKxaYWbO-AStLw" },
    { id: 2, badge: "pro", title: "Epson LS12000 4K Laser", price: "31,000 MAD", condition: "In Stock", spec: "In Stock", location: "Rabat, Souissi", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcc8ZXgLo8VaNzoqUf8yJ-MjjnHqTQ1qzO40W6vLWjLgCThfzn47-BylCJeKQ-ROca5xbKuLPywMXxBsBXP0wZXJlFYjAIlSAjXBYFoK8-aHt-M_4DaTNk6N19Zz_R4CUZ0ZTN10kANjhEd2eIRom9wRyLfkgg5oK6hdSlMkdN8vOfWQqRNAwHJ3XZgSw3AxNSIEv8yunkuTlvnsPKaKDSA2fgXj3_Qs1H0ipvTNJpslsFFnYtivSOTKEFsr0MFky79tJMK2lU0g" },
    { id: 3, title: "Samsung The Freestyle Gen 2", price: "6,800 MAD", condition: "Excellent", spec: "Excellent", location: "Rabat Center", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3DPFU-Yw4RXDAWnvMvnxYIPX0alGjL2Su0MQap-0-f7YpDqE--9voiiL105km0BZq4SDiZ5hVXFCn2PdmtUBz0iiiYlHSHAKfnTTDRgjxUM5yvRTxBt_ZyCRu7qp0lONmudN7AXBPvakSfYWhoDl65JUthvdM3wto9r1-fM9K9QVtMP8flhpuxnDVSnsMZFWLixFHu8h9ph2VJgNzErqA47IKJHIINZYGZX1jBrpLrlp5egisxsKVd0Mclv9DwKuMxb4fwpnHkA" },
  ]

  const featuredTVs = [
    { id: 4, label: "Elite", title: 'Sony Bravia XR A95L 77"', price: "42,000 MAD", location: "Rabat, Hay Riad", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCs7d5qsLxfw96wbf3H8oo1rPExRFgsTVzMHQx-pyjaowNUBroSbzaXH4V4BLAB-cIgAlwbN0G6HI-P3jRYzVz0kQhdoYn0ZneOmn2OEgVgc6RBhGFPTdSL6XotvecdISp6o4TV5IDH4e5uwVaidi30-M1OcfG0c9y8mHFcsBqaw_viTWffvywN4aWXE22Zjd5JAY1dVfXsDQSquJBXoBZJsLYcRMcQvU0mIQfz5NdvBeIxYdf8WBv0iBA4pc1NKu7h44uBCc4Wvg", labelRed: false },
    { id: 5, label: "-10% DROP", title: "Samsung QN900C Neo QLED 8K", price: "55,000 MAD", location: "Rabat, Souissi", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4xLbyY5DqelgcSupnojV2feWfPXnDM3T5-wp9raa6EwuPoD8zziSTucOLwSEnh3jZD9yIDZ0UKRwGP3daZyAia80PEmpiZG3G0dgRsgYtIICFxJDjf-dTfzlObNmscXM6cZVaMEnuMuUmtA_qsZ1L4So_10tOLwMw6OayA-tFO8VimkzaUkxkF6aa_w-1fCS8Tu0Z8WNDw-rqjwnkF-ETsMPau8aDvnPcaROm6RVZ4maWvz4lS87tYfSM_vUNxkwcUJgFMNYNLA", labelRed: true },
    { id: 6, label: "New Arrival", title: 'LG G4 OLED EVO 65"', price: "28,900 MAD", location: "Rabat, Agdal", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsp-NVyf-s8gdlStyUZs19D9U_UXprQe8rWNhyFmxqP4ExAW3hD78nAhDku1Xpa9rQVAzwbTnj8S2J1sd2jFga86Ap7S8WLsOFYu-Ssc6CBDmpRWVKx8LX8F1JZ5b7avhWcQbdLdyy4Vv8ioNmeD9aOGrXGCc8YJVBJEz86UNq17PHiZZHg3k-Lr5BU3cDMfW0WPROooXgX3mw9Hcftu6joJDNgP8tvx5-IGm2X-ct68L-HpvfYRTY0h9pAHFxuiwTgJ-tp4UwMw", labelRed: false },
  ]

  const latestRow1 = [
    { id: 7,  badge: "diamond", spec: "120Hz OLED",    title: 'LG C3 4K OLED EVO 55"',      location: "Rabat, Agdal",   price: "16,400 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLuX0Q7-N3CiMo7b_YFIlCgaPTl2DJ59M4ipG5mpcA29x-vrTqiN8FoITuV3vufldkyz-Ql6PTlphtNBXltXPHaKqZY2EdtLfCgZv2si4nVUBw-Bei7CQ-FxJf5ngd8-rLRIWdn3Ry0ww6wizRs4G7OLs9k3QqvmllRtvM73W_rv622yRrgliAmbmjmhShemnpFqpwfnulhmoOw6RZoZVRqk8Tu96y6II4_Qry28CImgwXe1uxdcUMgOBw" },
    { id: 8,  badge: "verified", spec: "Laser TV",     title: "Hisense L9G TriChroma",       location: "Rabat, Souissi", price: "34,000 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLsbEo-O4aJmu38Nk0X4zOvML77-9Mu-jTQiLHtUhaeP2INN1BK3t2w8RJjks_wr53VhzTFEMuk21IBQjuCVe0E3LdqP9Yq-cvWAspbY7s5VA-QyUGNegHT_7NeE3J8R2UFenS7CrzvYE54OBYeHmB6ij3fvU11k2JHVX6oQexz5-bO6aBLolFRzMoKRJm8u44cbTxw6kFqGsfYxkj0UvkhGEHmhveb2TYY5p4NZVVnbPzK3hzkAqt6XOw" },
    { id: 9,  badge: "diamond", spec: "8K Quantum",    title: "Samsung QN900D 8K Neo",       location: "Rabat Center",   price: "68,500 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLs2rYOUuxiAYW9FaNpI_y6JYwVtysmxHVETqexTxYYPKKo740cBJ2qGEIIVk0no1mWlyK2Aqt0F-dwuph6o7ZedBChnpH8Hp-QsrlnCwDamR65lPxJSIYM8ZVcL6jm-ITvunAo4T4daVltRP5m4GNwQZRCX1R_LU7wFDX7Bn_kXY7_SMVf3Dor-tZtJ72h8MtSy9f6AO6HGBQSKOlvsL-5GcgH-T36ZK2rj1JC2DQrnG7gvXeR1hBHd" },
    { id: 10, badge: "verified", spec: "ATMOS Audio",  title: "Sony HT-A7000 Soundbar",      location: "Hay Riad",       price: "12,900 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLuC9H1ngZTvkjHpZEbK_b7EpI0c3ptEd_MdO6pw79PgizPWHCgqGIrqKvXvNgbNMFQFtB5BYcnGv2zzb0Gz6mAGIhRT0Gm1ZwOmR2_7F54TMfCm5hswuV4exUNz1-1uvtprzg2yaoe6RPhaPGzNI5bkG9OP6OqOtZLqKsfDjQVXsO04izP3bJZYP0wzaB_af8SB52YYiPbpKKiVI3Afx8AgOmI1QA9HCITm5jgYUhTsb0jo0IWlATLniw" },
  ]

  const latestRow2 = [
    { id: 11, badge: "diamond", spec: "UST Projector",    title: "Epson EB-810E Laser",          location: "Rabat Agdal",    price: "29,800 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLtQT_oxnO4SFV0iFFNjF595IJyysjEtIT7BulYf0zZvV82gw70ge6axxklMHInW0DHUknAkrjT3LYkUOqmwQD0IlfCDycepGMaNtdaOvPFR3YmhDJok4mAKpPWEGfo4n8Q289moVxHXteTC4ZAg_m7xL4CrNbJ2EXYNBaGyiYflGOrNdi7U5f_kAhmY7OJ3ZVrcMC_eLfOX0Vn9HEk9CSgsGWmBrrJHvcDRaiBkMscg28dDRHWaav6-TA" },
    { id: 12, badge: "verified", spec: "144Hz Gaming",    title: "Samsung Odyssey Neo G9",       location: "Rabat Souissi",  price: "21,000 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLvrmarydj0eKIiHtG0Tq4rQ4JKkq0XZ-uJtM6Lz2CI88jv6k3eCwMF-AR6iuYZVdPVSt-kJqVW_c08RjrIlpCkZ9B0bJCNkx9NkKCo_1dMxmJZrRv9v-T_aCTkGIcUorii8MwaOEFYYQ_RYYfznIi2QEYG-YujjkMs7o9hYYOxa7xqk_ZGSSUXNifUsA9zBowI-6R8PicmHrglm2jG2bBkFc4ed6wcapbYgJ9HMwGUgu5PNkoreBS9dVg" },
    { id: 13, badge: "diamond", spec: "Reference Studio", title: "Sony BVM-HX310 Master",        location: "Rabat Ocean",    price: "415,000 MAD",img: "https://lh3.googleusercontent.com/aida/AP1WRLtW8UEESp-s0G7QV0ha8U1ZpDxVlzUZcjcnddOX5O_lkmLdh0LgrxTPySdgA6-YVWCBLH1THATGcvucSzg3Uisip7WXq1CWRfzsnIa1NOpq54gy3bdnaghP0LlS5dcv2XdLAQwqS5ah0PDRlUehVOxDIN1_Xs1Ng8RE1EBpjnXHi558oypReFtihI2P00jpS_it8LoeHp8Y6ZXRYdFY94THz-p5ovNFYjhul0GG1LyHQ6EMdB4B2uFzUg" },
    { id: 14, badge: "verified", spec: "THX Certified",   title: "JVC DLA-NZ9 8K Laser",        location: "Rabat Hay Riad", price: "225,000 MAD",img: "https://lh3.googleusercontent.com/aida/AP1WRLvEta3meSCI0Wsau0pUS8K-TRmVdRVEmz_aljC8-gCxLpNICNjnlL_C1Yc5ltKXSjwauuIZm_cP3T3IKtYkJjBqpLQ3nniQb749Bb_MajvWa2zpKtsbRqPT4ZYJg-xz9sHx-iA-Z6ZDfRUwASN5u8V3VPn_jTpbTEkZl5E0bo3snatAUAca_QWIc-2vR6lj7DrkBMZOkGyaHp9TN6F0svcIXsnISenaObCpA6g_4-ruBP9xAZqbeJFjjA" },
  ]

  const latestRow3 = [
    { id: 15, badge: "diamond", spec: "Mini LED",      title: "TCL QM8 4K Mini-LED",          location: "Rabat Centre",   price: "15,500 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLsbXeBKx2UpRkliwryyp_t8ZGYC3qTtEW8eo-KwxpJgim9WupjIHcMVM7WweaKywxJJ-tm_3xQzJAJkVLX5KqWr2o_AULlpdCQWAJTK9pKPS4F-8xydjfV_do-qYNWqfWTeQgkWlbeQQ0XZWrD7m7DZ_u2EKTZkADWxUD-0Bgxsnv0lsywLymhIJWtupcLJ8qYbDXnwcXULVSnzsXu_zJyVFHvoOZ0TuWknynIDtLUKlPyynMM_FrW0sA" },
    { id: 16, badge: "verified", spec: "Laser Cinema", title: "ViewSonic X2000B-4K",           location: "Rabat Agdal",    price: "27,200 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLtD1jziOAomxio_C3spQaa8QiSf_wDe0nH6Md7O70QvK0UTpnCDn3SzjkAVvMXfcM2cZssHXQSnQYgpibZUalXbdq1DOkAN59brPayWLXeYH0EJBwDf8fHkF_OELyUDPAEOGo6O38Tgf_27tAgve59c5qVzKPcfetp62MN0-B6R7o2Di9-W4RTLRMcDBtUADIR7VKj5pq3VhZSl_rRmcGaqaLx0Zv-_Btw1W-dnQySbZAKjBt_nRsIq" },
    { id: 17, badge: "diamond", spec: "Pro Monitor",   title: "Apple Pro Display XDR",         location: "Rabat Souissi",  price: "52,000 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLvOboLZuiQFTNM7AWXA5RbvUGtCNK4ujfWIdmVfhxhNUNlbVJiZhYmjKqOogZc9Vs3Qq5QNICYDskoYOgFbX-pEC2yHWp7xgEkQvUQbHocDIzW_aCzyzdBmszAmmA5Kpa_brdXGhzgPc8A-3khbiU3vfnGql1ETl1xyZDaZZV2l2u8OX_jHzHwqcz-NVa44u1wrV4Tj1pPbG-VTzMNyuPnxH6bermEubtry3-IsNfy1aYBVZOlhMRto7Q" },
    { id: 18, badge: "verified", spec: "Hi-Fi Audio",  title: "Sonos Era 300 Stereo Pair",    location: "Rabat Agdal",    price: "11,500 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLvM_IP9AMKWwKvYf9JVY59TNYqGi_CEs_gq7RHcfHbPSwYAWUnXA-BZfMCg4Qd53u5bqu2lxP0ElbvooUqWVK90V3dqDWjAPPR-umKNzoP5leyl_nye_--CGoF-YdqDhwxxQ4THiJ9GrZcsgZIR32rjsEZTsyVNCGPaxPhiLxWhupElIsxU-1xYcVpusWPYGIlROl3z0v5MaRDXiIUq5mXQHITTswoRk8ej_vE5L5YBY_WVKuMG3tD5IQ" },
  ]

  const brands = ["LG","Samsung","Sony","Philips","TCL","Hisense","Xiaomi"]

  const FeatBadge = ({ badge }: { badge?: string }) => {
    if (badge === "diamond") return <span style={{ background:"#006b5f", color:"white", fontSize:"10px", fontWeight:900, padding:"4px 10px", borderRadius:"9999px", display:"flex", alignItems:"center", gap:"4px", textTransform:"uppercase" }}>◆ DIAMOND MEMBER</span>
    if (badge === "pro") return <span style={{ background:"#62fae3", color:"#00201c", fontSize:"10px", fontWeight:700, padding:"4px 10px", borderRadius:"9999px", display:"flex", alignItems:"center", gap:"4px" }}>✓ PRO SELLER</span>
    if (badge === "verified") return <span style={{ background:"#62fae3", color:"#00201c", fontSize:"10px", fontWeight:700, padding:"4px 10px", borderRadius:"9999px", display:"flex", alignItems:"center", gap:"4px" }}>✓ VERIFIED</span>
    return null
  }

  const PortraitCard = ({ item }: { item: typeof latestRow1[0] }) => (
    <article className="card glass img-zoom" style={{ borderRadius:"2.5rem", overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 4px 24px rgba(0,0,0,.08)", border:"1px solid rgba(186,202,197,.5)" }}>
      <div style={{ position:"relative", aspectRatio:"4/5", overflow:"hidden", background:"#d4dcd9" }}>
        <div style={{ position:"absolute", top:"12px", left:"12px", zIndex:10 }}>
          <FeatBadge badge={item.badge} />
        </div>
        <button style={{ position:"absolute", top:"12px", right:"12px", zIndex:10, width:"40px", height:"40px", borderRadius:"9999px", background:"rgba(255,255,255,.8)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span className="ms" style={{ fontSize:"20px" }}>favorite</span>
        </button>
        <img src={item.img} alt={item.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
      </div>
      <div style={{ padding:"20px", display:"flex", flexDirection:"column", flex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" }}>
          <span style={{ fontSize:"13px", fontWeight:700, color:"#006b5f" }}>{item.spec}</span>
          <span style={{ width:"4px", height:"4px", background:"#6b7a76", borderRadius:"9999px" }}></span>
          <span style={{ fontSize:"13px", color:"#3c4a46" }}>{item.location}</span>
        </div>
        <h3 style={{ fontSize:"18px", fontWeight:700, color:"#161d1b", marginBottom:"8px", lineHeight:1.3 }}>{item.title}</h3>
        <p style={{ fontSize:"22px", fontWeight:900, color:"#006b5f", marginBottom:"16px" }}>{item.price}</p>
        <div style={{ marginTop:"auto", paddingTop:"16px", borderTop:"1px solid rgba(186,202,197,.15)", display:"flex", gap:"8px" }}>
          <button style={{ flex:1, padding:"10px", borderRadius:"12px", border:"1px solid rgba(186,202,197,.5)", background:"none", fontSize:"13px", fontWeight:700, cursor:"pointer" }}>Message</button>
          <button style={{ flex:1, padding:"10px", borderRadius:"12px", background:"#006b5f", color:"white", border:"none", fontSize:"13px", fontWeight:700, cursor:"pointer" }}>WhatsApp</button>
        </div>
      </div>
    </article>
  )

  const DiamondTrustCard = ({ title, btn }: { title: string, btn: string }) => (
    <div style={{ borderRadius:"2.5rem", padding:"32px", display:"flex", flexDirection:"column", justifyContent:"space-between", color:"white", boxShadow:"0 8px 32px rgba(0,107,95,.3)", position:"relative", overflow:"hidden", background:"linear-gradient(135deg,#006b5f 0%,#2dd4bf 100%)" }}>
      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxEP_KMmrf0g-usL8MMN6NWYp12uq952BeCubx6tFQIgIaWMyesyQ0bFmugpeX-iBCfksUXUvogci9h-ZVq9IcO5BSiRBPqakzjHG2JJ4ul3zy6tlAT_pBNKa2T6udwS5s4J3ctAnXEFzJfACc3Ws2Md7lrAetkpbCp5wASizCkE_I7oqSiOQ98O02J6thaLa_zLh8ZHUf5pTjd27OaiNFSf8m8pBZsVEvxbwxW03qAIfU-TijnVhF7u-w5ZxYMWvm-du3YoxhwA" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.1 }} />
      <div style={{ position:"relative", zIndex:1 }}>
        <div style={{ fontSize:"32px", marginBottom:"16px" }}>◆</div>
        <h3 style={{ fontSize:"22px", fontWeight:700, marginBottom:"12px", lineHeight:1.3 }}>{title}</h3>
        <p style={{ fontSize:"13px", opacity:.9 }}>Verified ID, Phone Number, email &amp; Local Pickup Guarantee in Rabat.</p>
      </div>
      <button style={{ position:"relative", zIndex:1, width:"100%", background:"white", color:"#006b5f", fontWeight:700, padding:"16px", borderRadius:"16px", marginTop:"24px", border:"none", cursor:"pointer", fontSize:"13px", textTransform:"uppercase" }}>{btn}</button>
    </div>
  )

  return (
    <div style={{ fontFamily:"'Hanken Grotesk',sans-serif", backgroundColor:"#f4fbf8", minHeight:"100vh", color:"#161d1b" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .ms{font-family:'Material Symbols Outlined';font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;vertical-align:middle;display:inline-block;line-height:1;}
        .glass{background:rgba(255,255,255,0.7);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.4);}
        .no-scroll::-webkit-scrollbar{display:none;}.no-scroll{-ms-overflow-style:none;scrollbar-width:none;}
        .card{transition:transform .3s;}.card:hover{transform:translateY(-4px);}
        .img-zoom img{transition:transform .5s;}.img-zoom:hover img{transform:scale(1.1);}
      `}</style>

      {/* HERO */}
      <section style={{ position:"relative", height:"450px", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0 }}>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDoEeiH5zkAp0MUtpD7_HE8YLqN1KGpHx91IvIpZJWtsJF7y81Iq-H0P-9ocH4_WerCaVug9OJiz_kkf-oMu0aWJCvKEvYeAMWi1cLNqggixSPwd7seXNpqjhSCekkPabZCk9zmXXtRjX8qQuS-m2h-sYmWkSG7Z4U6xVr-aZeK3W83RNfPme7UqKpob6ODJs2wR8gah3CGHmwXtRyg7p9yWzOFCODPwWy9uhemflDAIx_Pyz7NoGZQklrnq7gmLgjFqIMNbEPFA" alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.5)" }}></div>
        </div>
        <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:"896px", margin:"0 auto", padding:"0 20px", display:"flex", flexDirection:"column", alignItems:"center" }}>
          <h1 style={{ fontSize:"48px", fontWeight:900, color:"white", marginBottom:"32px", textAlign:"center", lineHeight:1.1, letterSpacing:"-0.02em", textShadow:"0 4px 16px rgba(0,0,0,.5)" }}>Discover Your Next Cinematic Display in Rabat</h1>
          <div style={{ width:"100%", display:"flex", gap:"8px", padding:"8px", borderRadius:"3rem", background:"rgba(255,255,255,.1)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,.3)" }}>
            <div style={{ flex:1, display:"flex", alignItems:"center", borderRadius:"9999px", padding:"12px 20px", background:"rgba(244,251,248,.5)" }}>
              <span className="ms" style={{ color:"#3c4a46", marginRight:"12px" }}>search</span>
              <input style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:"16px" }} placeholder="Search OLED TVs, Projectors, 4K Home Cinema..." />
            </div>
            <div style={{ flex:1, display:"flex", alignItems:"center", borderRadius:"9999px", padding:"12px 20px", background:"rgba(244,251,248,.5)" }}>
              <span className="ms" style={{ color:"#3c4a46", marginRight:"12px" }}>location_on</span>
              <select style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:"16px", appearance:"none" }}>
                <option>Rabat</option><option>Casablanca</option>
              </select>
            </div>
            <button style={{ background:"#006b5f", color:"white", border:"none", borderRadius:"9999px", padding:"0 40px", fontWeight:700, fontSize:"15px", cursor:"pointer", display:"flex", alignItems:"center", gap:"8px" }}>
              <span className="ms">manage_search</span> SEARCH
            </button>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 32px", padding:"0 40px" }}>
        <div style={{ display:"flex", alignItems:"center", padding:"6px", borderRadius:"9999px", background:"rgba(255,255,255,.85)", backdropFilter:"blur(12px)", border:"1px solid rgba(186,202,197,.3)", boxShadow:"0 4px 24px rgba(0,0,0,.08)" }}>
          {[["CITY","Rabat"],["CONDITION","Any"],["PRICE (MAD)","Max Price"]].map(([label,val],i)=>(
            <div key={label} style={{ flex:1, padding:"8px 16px", borderRight:"1px solid rgba(186,202,197,.2)", cursor:"pointer" }}>
              <div style={{ fontSize:"10px", fontWeight:700, color:"#3c4a46", textTransform:"uppercase", letterSpacing:".1em" }}>{label}</div>
              <div style={{ fontSize:"16px", fontWeight:500, color:"#161d1b", display:"flex", alignItems:"center", gap:"4px" }}>{val}<span className="ms" style={{ fontSize:"18px", color:"#3c4a46" }}>expand_more</span></div>
            </div>
          ))}
          <div style={{ flex:2, padding:"8px 16px", borderRight:"1px solid rgba(186,202,197,.2)" }}>
            <div style={{ fontSize:"10px", fontWeight:700, color:"#3c4a46", textTransform:"uppercase", letterSpacing:".1em" }}>KEYWORD</div>
            <input style={{ background:"transparent", border:"none", outline:"none", fontSize:"16px", width:"100%" }} placeholder="LG CineBeam, 8K, Laser..." />
          </div>
          <div style={{ flex:1, padding:"8px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer" }}>
            <div>
              <div style={{ fontSize:"10px", fontWeight:700, color:"#3c4a46", textTransform:"uppercase", letterSpacing:".1em" }}>FILTERS</div>
              <div style={{ fontSize:"16px", color:"#161d1b" }}>All Filters</div>
            </div>
            <span className="ms" style={{ fontSize:"24px", color:"#006b5f" }}>tune</span>
          </div>
        </div>
      </div>

      {/* BREADCRUMBS + TITLE */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 32px", padding:"0 40px" }}>
        <nav style={{ display:"flex", alignItems:"center", gap:"8px", fontSize:"13px", fontWeight:600, color:"rgba(60,74,70,.7)", marginBottom:"24px" }}>
          {["Rabat","The Vault","Electronics"].map(c=>(
            <span key={c} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <a href="#" style={{ textDecoration:"none", color:"inherit" }}>{c}</a>
              <span className="ms" style={{ fontSize:"16px" }}>chevron_right</span>
            </span>
          ))}
          <span style={{ fontWeight:700, color:"#161d1b" }}>Projectors &amp; TVs</span>
        </nav>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"16px" }}>
          <div>
            <h1 style={{ fontSize:"24px", fontWeight:700, color:"#161d1b", marginBottom:"4px" }}>New and Used Projectors &amp; Televisions for sale in Rabat</h1>
            <p style={{ fontSize:"16px", color:"#3c4a46", textTransform:"uppercase", letterSpacing:".05em" }}>482 ADS IN RABAT DISTRICT</p>
          </div>
          <div style={{ display:"flex", gap:"12px" }}>
            {[["sort","Sort: Default"],["notifications_active","Save Search"]].map(([icon,label])=>(
              <button key={label} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"10px 20px", borderRadius:"12px", background:"#eef5f2", border:"1px solid rgba(186,202,197,.3)", fontSize:"13px", fontWeight:700, cursor:"pointer" }}>
                <span className="ms" style={{ fontSize:"18px" }}>{icon}</span>{label}
              </button>
            ))}
          </div>
        </div>

        {/* BRANDS */}
        <div className="no-scroll" style={{ display:"flex", gap:"12px", overflowX:"auto", padding:"16px 0" }}>
          <button style={{ whiteSpace:"nowrap", padding:"8px 24px", borderRadius:"9999px", background:"#006b5f", color:"white", fontSize:"13px", fontWeight:700, border:"none", cursor:"pointer" }}>All Brands</button>
          {brands.map(b=><button key={b} style={{ whiteSpace:"nowrap", padding:"8px 24px", borderRadius:"9999px", background:"#eef5f2", border:"1px solid rgba(186,202,197,.3)", fontSize:"13px", fontWeight:700, cursor:"pointer", color:"#3c4a46" }}>{b}</button>)}
          <button style={{ whiteSpace:"nowrap", padding:"8px 16px", color:"#006b5f", fontWeight:700, fontSize:"13px", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:"4px" }}>View More <span className="ms">expand_more</span></button>
        </div>

        {/* SELLER FILTER BAR */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:"rgba(255,255,255,.7)", backdropFilter:"blur(12px)", border:"1px solid rgba(186,202,197,.3)", borderRadius:"2.5rem", padding:"16px", marginTop:"16px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
            <button style={{ padding:"10px 24px", borderRadius:"9999px", background:"#006b5f", color:"white", fontSize:"13px", fontWeight:700, border:"none", cursor:"pointer" }}>All Sellers</button>
            <button style={{ padding:"10px 24px", borderRadius:"9999px", background:"#eef5f2", border:"1px solid rgba(186,202,197,.3)", fontSize:"13px", fontWeight:600, cursor:"pointer", color:"#3c4a46" }}>SouKni Members</button>
            <button style={{ padding:"10px 24px", borderRadius:"9999px", background:"#eef5f2", border:"1px solid rgba(186,202,197,.3)", fontSize:"13px", fontWeight:600, cursor:"pointer", color:"#3c4a46" }}>SouKni Pro</button>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
            <div style={{ position:"relative" }}>
              <select style={{ appearance:"none", background:"#eef5f2", border:"1px solid rgba(186,202,197,.3)", borderRadius:"9999px", padding:"10px 40px 10px 20px", fontSize:"13px", fontWeight:600, cursor:"pointer", color:"#3c4a46", outline:"none" }}>
                <option>Sort: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <span className="ms" style={{ position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)", fontSize:"18px", pointerEvents:"none", color:"#3c4a46" }}>expand_more</span>
            </div>
            <div style={{ display:"flex", background:"#eef5f2", border:"1px solid rgba(186,202,197,.3)", borderRadius:"9999px", padding:"4px" }}>
              <button style={{ width:"40px", height:"40px", borderRadius:"9999px", background:"#006b5f", color:"white", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span className="ms" style={{ fontSize:"20px" }}>grid_view</span>
              </button>
              <button style={{ width:"40px", height:"40px", borderRadius:"9999px", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#3c4a46" }}>
                <span className="ms" style={{ fontSize:"20px" }}>view_list</span>
              </button>
            </div>
          </div>
        </div>

        {/* DISCOVERY CONTROLS */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:"rgba(255,255,255,.7)", backdropFilter:"blur(12px)", border:"1px solid rgba(186,202,197,.3)", borderRadius:"2.5rem", padding:"16px", marginTop:"16px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
            <button style={{ display:"flex", alignItems:"center", gap:"8px", padding:"10px 20px", borderRadius:"9999px", background:"rgba(45,212,191,.1)", fontSize:"13px", fontWeight:700, color:"#005047", border:"none", cursor:"pointer" }}>
              <span className="ms" style={{ fontSize:"18px", color:"#006b5f" }}>auto_awesome</span> New Arrivals
            </button>
            <button style={{ display:"flex", alignItems:"center", gap:"8px", padding:"10px 20px", borderRadius:"9999px", background:"rgba(45,212,191,.1)", fontSize:"13px", fontWeight:700, color:"#005047", border:"none", cursor:"pointer" }}>
              <span className="ms" style={{ fontSize:"18px", color:"#006b5f" }}>trending_down</span> Price Drop Alert
            </button>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
            <span style={{ fontSize:"13px", fontWeight:600, color:"#3c4a46" }}>Show Diamond Certified First</span>
            <div style={{ width:"44px", height:"24px", background:"#d4dcd9", borderRadius:"9999px", position:"relative", cursor:"pointer" }}>
              <div style={{ width:"20px", height:"20px", background:"white", borderRadius:"9999px", position:"absolute", top:"2px", left:"2px", boxShadow:"0 1px 4px rgba(0,0,0,.2)" }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED PROJECTORS */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 48px", padding:"0 40px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
          <h2 style={{ fontSize:"24px", fontWeight:700, color:"#006b5f" }}>Featured Premium Projectors</h2>
          <a href="#" style={{ display:"flex", alignItems:"center", gap:"4px", color:"#006b5f", fontWeight:700, fontSize:"13px", textDecoration:"none" }}>View all <span className="ms" style={{ fontSize:"18px" }}>chevron_right</span></a>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px" }}>
          {featuredProjectors.map(item=>(
            <article key={item.id} className="card glass img-zoom" style={{ borderRadius:"2.5rem", overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 4px 24px rgba(0,0,0,.08)", border:"1px solid rgba(186,202,197,.5)" }}>
              <div style={{ position:"relative", aspectRatio:"4/5", overflow:"hidden", background:"#d4dcd9" }}>
                <div style={{ position:"absolute", top:"12px", left:"12px", zIndex:10 }}>
                  <FeatBadge badge={item.badge} />
                </div>
                <button style={{ position:"absolute", top:"12px", right:"12px", zIndex:10, width:"40px", height:"40px", borderRadius:"9999px", background:"rgba(255,255,255,.8)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span className="ms" style={{ fontSize:"20px" }}>favorite</span>
                </button>
                <img src={item.img} alt={item.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              </div>
              <div style={{ padding:"20px", display:"flex", flexDirection:"column", flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" }}>
                  <span style={{ fontSize:"13px", fontWeight:700, color:"#006b5f" }}>{item.condition}</span>
                  <span style={{ width:"4px", height:"4px", background:"#6b7a76", borderRadius:"9999px" }}></span>
                  <span style={{ fontSize:"13px", color:"#3c4a46" }}>{item.location}</span>
                </div>
                <h3 style={{ fontSize:"18px", fontWeight:700, color:"#161d1b", marginBottom:"8px", lineHeight:1.3 }}>{item.title}</h3>
                <p style={{ fontSize:"22px", fontWeight:900, color:"#006b5f", marginBottom:"16px" }}>{item.price}</p>
                <div style={{ marginTop:"auto", paddingTop:"16px", borderTop:"1px solid rgba(186,202,197,.15)", display:"flex", gap:"8px" }}>
                  <button style={{ flex:1, padding:"10px", borderRadius:"12px", background:"#e8efec", border:"none", fontSize:"13px", fontWeight:700, cursor:"pointer" }}>Message</button>
                  <button style={{ flex:1, padding:"10px", borderRadius:"12px", background:"rgba(37,211,102,.1)", color:"#25D366", border:"none", fontSize:"13px", fontWeight:700, cursor:"pointer" }}>WhatsApp</button>
                </div>
              </div>
            </article>
          ))}
          {/* Trust Card */}
          <DiamondTrustCard title="Trust Diamond Certified Sellers" btn="Learn More" />
        </div>
      </div>

      {/* INTERSTITIAL */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 64px", padding:"0 40px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
          <div style={{ borderRadius:"2.5rem", padding:"40px", minHeight:"300px", display:"flex", flexDirection:"column", justifyContent:"center", background:"#006b5f", color:"white", boxShadow:"0 8px 32px rgba(0,107,95,.3)", position:"relative", overflow:"hidden" }}>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9H6ENn2n-dQrIHzC7kzaysFngNoVfqqlU27nU0dqOytQ16bCTGuWmr1atgohq-pCbXckRtfQ7PE4Xha_7N19mHxIZDQZhrIOf2TTe_5bFffr_WbNCAHyiJoe53yKIrgMVvbgGida7dIWQOjc3xKjgvyI2iyHZDAXl74cvwTINfV2Q78tfBZXiJUkmFdw7iL8z3zQlTfFJ_KewKKOGqamsW6q9vr_-KoGDwT_wl14e0aoaMqjYokWXGMaOw-KxNkREGIut4_eUbw" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.3 }} />
            <div style={{ position:"relative", zIndex:1, maxWidth:"400px" }}>
              <h2 style={{ fontSize:"36px", fontWeight:900, marginBottom:"16px", lineHeight:1.2 }}>Join the SouKni Family</h2>
              <p style={{ fontSize:"18px", marginBottom:"32px", opacity:.9, lineHeight:1.6 }}>Start selling your premium displays today for free and reach tech enthusiasts in Morocco.</p>
              <button style={{ background:"white", color:"#006b5f", padding:"16px 32px", borderRadius:"9999px", fontWeight:900, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", width:"fit-content" }}>Register as Individual</button>
            </div>
          </div>
          <div style={{ borderRadius:"2.5rem", padding:"40px", minHeight:"300px", display:"flex", flexDirection:"column", justifyContent:"center", background:"#dde4e1", border:"2px solid rgba(0,107,95,.2)", boxShadow:"0 8px 32px rgba(0,0,0,.06)", position:"relative", overflow:"hidden" }}>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAf6NYaiEPF9l27d5_sNbWfoiABV1CXZaHyMUfDH-mluo-xlUZ4zV_El-ZTKuwcBzCyTPncPX2rlrYCk1JejGj0hkXPWY9ugqNND_wDJpZxgxYhn3De6Liak6xM6bU6pJLNGhdYi9E-hL5Mf9MC_gf7pQi9xtoIUHRcRE1JWKQlWq1Z_NA2k7fbEMA2tBi4x3oauzDxnGdBFUZpL_PQQQuaKJMcVQB3WayxLAhdgfAxgfsg9ruR0K8FhwSE_TsskzrtK6q_q3pWg" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.2 }} />
            <div style={{ position:"relative", zIndex:1, maxWidth:"400px" }}>
              <p style={{ fontSize:"12px", fontWeight:900, color:"#006b5f", textTransform:"uppercase", letterSpacing:".2em", marginBottom:"16px" }}>Solutions for agents</p>
              <h2 style={{ fontSize:"36px", fontWeight:900, color:"#161d1b", marginBottom:"16px", lineHeight:1.2 }}>SouKni Immo Pro</h2>
              <p style={{ fontSize:"18px", color:"#3c4a46", marginBottom:"32px", lineHeight:1.6 }}>Boost your tech business visibility with our premium listing dashboard and professional analytics.</p>
              <button style={{ background:"#006b5f", color:"white", padding:"16px 32px", borderRadius:"9999px", fontWeight:900, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", width:"fit-content" }}>Discover Pro Tools</button>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED ELITE TVs */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 48px", padding:"0 40px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
          <h2 style={{ fontSize:"24px", fontWeight:700, color:"#161d1b" }}>Featured Elite Televisions</h2>
          <a href="#" style={{ display:"flex", alignItems:"center", gap:"4px", color:"#006b5f", fontWeight:700, fontSize:"13px", textDecoration:"none" }}>View all <span className="ms" style={{ fontSize:"18px" }}>arrow_forward</span></a>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px" }}>
          {featuredTVs.map(item=>(
            <article key={item.id} className="card glass" style={{ borderRadius:"2.5rem", overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 2px 12px rgba(0,0,0,.06)", border:"1px solid rgba(186,202,197,.5)" }}>
              <div style={{ position:"relative", aspectRatio:"1/1", overflow:"hidden", background:"#d4dcd9" }}>
                <img src={item.img} alt={item.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                <div style={{ position:"absolute", bottom:"8px", left:"8px", padding:"2px 8px", borderRadius:"6px", fontSize:"10px", fontWeight:700, textTransform:"uppercase", background: item.labelRed ? "rgba(186,26,26,.8)" : "rgba(255,255,255,.85)", backdropFilter:"blur(4px)", color: item.labelRed ? "white" : "#006b5f" }}>{item.label}</div>
              </div>
              <div style={{ padding:"20px", display:"flex", flexDirection:"column", flex:1 }}>
                <h4 style={{ fontSize:"16px", fontWeight:700, color:"#161d1b", marginBottom:"4px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.title}</h4>
                <p style={{ fontSize:"13px", color:"#3c4a46", marginBottom:"12px" }}>{item.location}</p>
                <p style={{ fontSize:"18px", fontWeight:900, color:"#006b5f", marginBottom:"12px" }}>{item.price}</p>
                <div style={{ marginTop:"auto", display:"flex", gap:"8px" }}>
                  <button style={{ flex:1, padding:"8px", borderRadius:"12px", border:"1px solid rgba(186,202,197,.5)", background:"none", fontSize:"12px", fontWeight:700, cursor:"pointer" }}>Message</button>
                  <button style={{ flex:1, padding:"8px", borderRadius:"12px", background:"rgba(0,107,95,.1)", color:"#006b5f", border:"none", fontSize:"12px", fontWeight:700, cursor:"pointer" }}>Call</button>
                </div>
              </div>
            </article>
          ))}
          {/* Premium Calibration Card */}
          <div style={{ borderRadius:"2.5rem", padding:"32px", display:"flex", flexDirection:"column", justifyContent:"space-between", color:"white", background:"linear-gradient(135deg,#006b5f 0%,#2dd4bf 100%)", boxShadow:"0 8px 32px rgba(0,107,95,.3)" }}>
            <div>
              <h3 style={{ fontSize:"22px", fontWeight:700, marginBottom:"12px", lineHeight:1.3 }}>Premium Calibration Services</h3>
              <p style={{ fontSize:"13px", opacity:.9 }}>Get the most out of your display with professional setup &amp; calibration in Rabat.</p>
            </div>
            <button style={{ width:"100%", background:"white", color:"#006b5f", fontWeight:700, padding:"16px", borderRadius:"16px", marginTop:"24px", border:"none", cursor:"pointer", fontSize:"13px", textTransform:"uppercase" }}>Inquire Now</button>
          </div>
        </div>
      </div>

      {/* ELECTRO PRO BANNER */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 64px", padding:"0 40px" }}>
        <div style={{ position:"relative", height:"320px", borderRadius:"2.5rem", overflow:"hidden", boxShadow:"0 8px 32px rgba(0,0,0,.15)" }}>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWuEpwwWn8VBGFleJVamX3ZgeUa8fgYMKvxzhHlC0RaT7oQYtLVZ-ijtRVTTMrG4_xDTAsLDx0LDiFNmBTlTghMUZ-RG5fLmyF-Vp-HG1-Tnj3vkIsKnQ_btmojvGsqcTvNwDWLW1Pn24uifedAvYi1gqkhLlqwJ5EFxqutv7FiuYJ0jxY4zc37i3RPd6JsYy4tnl9CD8ceSXHoEymanW47e0FWnLsy12c-3r4laGxnTN1l3Ds-yF31u1V-DPTyedzdkJ-rIi9bA" alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(0,0,0,.75),rgba(0,0,0,.4),transparent)" }}></div>
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 64px" }}>
            <div>
              <p style={{ color:"#3cddc7", fontWeight:900, fontSize:"12px", textTransform:"uppercase", letterSpacing:".2em", marginBottom:"16px" }}>Premier Partnership</p>
              <h2 style={{ color:"white", fontSize:"48px", fontWeight:900, marginBottom:"8px", lineHeight:1.1, letterSpacing:"-0.02em" }}>SouKni Electro Pro</h2>
              <p style={{ color:"rgba(255,255,255,.9)", fontSize:"18px", lineHeight:1.6 }}>The Gold Standard for Premium Electronics & Tech Solutions in Rabat.</p>
            </div>
            <button style={{ background:"#2dd4bf", color:"#006b5f", padding:"16px 40px", borderRadius:"9999px", fontWeight:700, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", whiteSpace:"nowrap" }}>BECOME A PRO SELLER</button>
          </div>
        </div>
      </div>

      {/* LATEST PREMIUM TECH DEALS */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 32px", padding:"0 40px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
          <h2 style={{ fontSize:"24px", fontWeight:700, color:"#006b5f" }}>Latest Premium Tech Deals</h2>
          <a href="#" style={{ display:"flex", alignItems:"center", gap:"4px", color:"#006b5f", fontWeight:700, fontSize:"13px", textDecoration:"none" }}>View more listings <span className="ms" style={{ fontSize:"18px" }}>chevron_right</span></a>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"16px" }}>
          {latestRow1.map(item=><PortraitCard key={item.id} item={item} />)}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"16px" }}>
          {latestRow2.map(item=><PortraitCard key={item.id} item={item} />)}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px" }}>
          {latestRow3.map(item=><PortraitCard key={item.id} item={item} />)}
        </div>
      </div>

      {/* PAGINATION */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 64px", padding:"0 40px", display:"flex", justifyContent:"center" }}>
        <nav style={{ display:"flex", alignItems:"center", gap:"8px", background:"rgba(255,255,255,.7)", backdropFilter:"blur(12px)", border:"1px solid rgba(186,202,197,.3)", padding:"8px", borderRadius:"9999px", boxShadow:"0 2px 8px rgba(0,0,0,.06)" }}>
          <button style={{ width:"40px", height:"40px", borderRadius:"9999px", border:"none", background:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#3c4a46" }}>
            <span className="ms">chevron_left</span>
          </button>
          {["1","2","3"].map((p,i)=>(
            <button key={p} style={{ width:"40px", height:"40px", borderRadius:"9999px", border:"none", background:i===0?"#2dd4bf":"none", color:i===0?"#006b5f":"#3c4a46", fontWeight:700, fontSize:"14px", cursor:"pointer" }}>{p}</button>
          ))}
          <span style={{ padding:"0 8px", color:"rgba(60,74,70,.5)" }}>...</span>
          <button style={{ width:"40px", height:"40px", borderRadius:"9999px", border:"none", background:"none", cursor:"pointer", color:"#3c4a46", fontWeight:700, fontSize:"14px" }}>49</button>
          <button style={{ width:"40px", height:"40px", borderRadius:"9999px", border:"none", background:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#006b5f" }}>
            <span className="ms">chevron_right</span>
          </button>
        </nav>
      </div>

      {/* STAY IN THE TECH LOOP */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 64px", padding:"0 40px" }}>
        <div style={{ background:"#dde4e1", borderRadius:"2.5rem", padding:"64px", textAlign:"center" }}>
          <div style={{ maxWidth:"600px", margin:"0 auto" }}>
            <h3 style={{ fontSize:"48px", fontWeight:900, color:"#161d1b", marginBottom:"24px", letterSpacing:"-0.02em" }}>Stay in the Tech Loop</h3>
            <p style={{ fontSize:"18px", color:"#3c4a46", marginBottom:"40px", lineHeight:1.6 }}>Join the SouKni Tech community. Get weekly updates on rare finds and new premium display arrivals in Rabat.</p>
            <div style={{ display:"flex", gap:"16px", justifyContent:"center" }}>
              <input style={{ width:"320px", padding:"20px 32px", borderRadius:"9999px", border:"none", fontSize:"16px", boxShadow:"0 2px 8px rgba(0,0,0,.08)", outline:"none" }} placeholder="Your email address" type="email" />
              <button style={{ background:"#161d1b", color:"white", padding:"20px 48px", borderRadius:"9999px", fontWeight:700, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", letterSpacing:".1em", whiteSpace:"nowrap" }}>SUBSCRIBE</button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background:"#7A7A7A", color:"rgba(255,255,255,.6)", paddingTop:"64px", paddingBottom:"32px" }}>
        <div style={{ maxWidth:"1440px", margin:"0 auto", padding:"0 40px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:"48px", marginBottom:"64px" }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"16px" }}>
                <div style={{ width:"40px", height:"40px", background:"#006b5f", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ color:"white", fontWeight:700, fontSize:"20px" }}>S</span>
                </div>
                <span style={{ fontSize:"24px", fontWeight:700, color:"white" }}>SouKni</span>
              </div>
              <p style={{ fontSize:"14px", color:"rgba(255,255,255,.8)", fontStyle:"italic", marginBottom:"8px" }}>The Market in your Pocket</p>
              <p style={{ fontSize:"14px", color:"rgba(255,255,255,.6)", lineHeight:1.6, marginBottom:"24px" }}>The leading premium marketplace in Morocco for finding the best deals on new and used items.</p>
              <div style={{ display:"flex", gap:"12px" }}>
                {["public","alternate_email"].map(icon=>(
                  <div key={icon} style={{ width:"40px", height:"40px", borderRadius:"9999px", background:"rgba(255,255,255,.1)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                    <span className="ms" style={{ color:"white", fontSize:"20px" }}>{icon}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ color:"white", fontWeight:700, marginBottom:"16px", textTransform:"uppercase", letterSpacing:".1em", fontSize:"14px" }}>Marketplace</h4>
              <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:"12px" }}>
                {["Motors","Property","Electronics","The Vault"].map(l=><li key={l}><a href="#" style={{ color:"rgba(255,255,255,.6)", textDecoration:"none", fontSize:"14px" }}>{l}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 style={{ color:"white", fontWeight:700, marginBottom:"16px", textTransform:"uppercase", letterSpacing:".1em", fontSize:"14px" }}>Support</h4>
              <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:"12px" }}>
                {["About Us","Help Center","Safety Tips","Privacy Policy"].map(l=><li key={l}><a href="#" style={{ color:"rgba(255,255,255,.6)", textDecoration:"none", fontSize:"14px" }}>{l}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 style={{ color:"white", fontWeight:700, marginBottom:"16px", textTransform:"uppercase", letterSpacing:".1em", fontSize:"14px" }}>GET THE APP</h4>
              <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
                {[["play_store","GET IT ON","Google Play"],["laptop_mac","DOWNLOAD ON THE","App Store"]].map(([icon,sub,name])=>(
                  <button key={name} style={{ background:"black", color:"white", borderRadius:"12px", padding:"12px", display:"flex", alignItems:"center", gap:"12px", border:"1px solid rgba(255,255,255,.1)", cursor:"pointer" }}>
                    <span className="ms" style={{ fontSize:"32px" }}>{icon}</span>
                    <div style={{ textAlign:"left" }}>
                      <div style={{ fontSize:"10px", fontWeight:700, textTransform:"uppercase" }}>{sub}</div>
                      <div style={{ fontSize:"18px", fontWeight:700 }}>{name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ paddingTop:"32px", borderTop:"1px solid rgba(255,255,255,.1)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <p style={{ fontSize:"14px", color:"rgba(255,255,255,.4)" }}>© 2026 SouKni - soukni.com</p>
            <div style={{ display:"flex", gap:"32px", alignItems:"center" }}>
              {["Terms","Privacy","Cookies"].map(l=><a key={l} href="#" style={{ color:"rgba(255,255,255,.4)", fontSize:"14px", textDecoration:"none" }}>{l}</a>)}
              <div style={{ display:"flex", alignItems:"center", gap:"8px", color:"rgba(255,255,255,.4)", fontSize:"14px" }}>
                <div style={{ width:"6px", height:"6px", borderRadius:"9999px", background:"#62fae3" }}></div>
                System Operational
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
