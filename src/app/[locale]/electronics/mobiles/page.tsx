export default function MobilesPage() {

  const featuredPremium = [
    { id: 1, badge: "diamond", spec: "NEW",       location: "Rabat, Agdal",    title: "iPhone 15 Pro Max 256GB Titanium",      price: "12,850 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLtcwe_yn3xQG2cu7cX6mS9Zkt3M5mipHIvnRV130OBhNUBu94rrOD_achOd0g0aHHMsVe5XTJUuWN6lRk30tngWZzaBXNY0istauba2Ai--A8vQcdNjVbqJCE4wrdJCvEPvf0H9ru-jBBZZ4YPrKt9cJRhfy_E1Ly7JmQsh5rBWSiooZ33ixEwwLet7lB5sA0NOkoziKMCorXrnxOa88AMHTBfQEEAm6BnFnAypVG_k0_v0ZhyqwE0kYg" },
    { id: 2, badge: "pro",     spec: "NEW",       location: "Rabat, Souissi",  title: "Samsung Galaxy S24 Ultra 512GB",        price: "11,200 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLvaktLxk2aAjxOO5k9dT7TxLTda6V30ATybH9rTJwXCViX_5beU3_p0I0QrLfm_CZjFqzCuRrAYpzYhWPFIZWBXgOhmUfp6AHQvlyOcAqQjpw0-1JfmxODvK_YZzeHAPvDPuqXdhQIyFKSNGclFXYss60C1FkgcAtChOif-m8MxwwwYLzS9aS7JW13IhA4ej2RhR1YysyG7eI9tkIFELak9IF99lqhqhXRhN0IwCkeEveI1WQGG8lUNjQ" },
    { id: 3, badge: "diamond", spec: "IN STOCK",  location: "Rabat, Hassan",   title: "Google Pixel 8 Pro 128GB Obsidian",     price: "8,150 MAD",  img: "https://lh3.googleusercontent.com/aida/AP1WRLugRSaGggeoSN85zaabMpWOF00tUza48mwDj1o1JvJ2lvH-wya6BKzCcDJt7wN7O7rRKbpraIUT6gXT9_lR98GP2d6XotnxdnB7ncKHZhgR-3bij8CNmFOs6ubrg1zkTKzDadmytK4YRrlEUo4OMc98Tufjj09KXBIU0bZ_5gO6PaLBexHbBe_7_zt662c2cQUdjjmlsivDg8Tc3WoJp2eZFUnNHHU-p1yiFAZI0zkhuq8Sk8xemwRztA" },
    { id: 4, badge: "verified",spec: "TOP CHOICE",location: "Rabat, Hay Riad", title: "Xiaomi 14 Ultra Photography Kit",        price: "13,250 MAD", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnDrNWbVaQuwKe0Y4Y-4GW_pYLLjoQrudXAWA6PuK4J-PcJSHrPsUHnlQhQgRNxXsdg3E5HtVo9k72Tka1jQCNqIQSNNTYdjLFEyxIhDYMBydcW9dAGYnZjSKOqtfmhA-4zu39HuVTnOT5MEGhOUNSN2zQhntvlF942OKcpt_1rYsMdZK889dlLswwZfiM864uB6OUIoOQxOkZihNO8lqFTS95n_JvZyRPETNBRxtmYOtWDIPq4_7thZlkrAR6T8Vt1zN0ZA0QsA" },
  ]

  const moreDeals = [
    // Row 1
    { id: 5,  badge: "diamond", title: "iPhone 16 Pro Max 512GB Desert",         price: "16,400 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLtcwe_yn3xQG2cu7cX6mS9Zkt3M5mipHIvnRV130OBhNUBu94rrOD_achOd0g0aHHMsVe5XTJUuWN6lRk30tngWZzaBXNY0istauba2Ai--A8vQcdNjVbqJCE4wrdJCvEPvf0H9ru-jBBZZ4YPrKt9cJRhfy_E1Ly7JmQsh5rBWSiooZ33ixEwwLet7lB5sA0NOkoziKMCorXrnxOa88AMHTBfQEEAm6BnFnAypVG_k0_v0ZhyqwE0kYg" },
    { id: 6,  badge: "pro",     title: "Samsung Z Fold 6 1TB AI Enhanced",       price: "21,200 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLvaktLxk2aAjxOO5k9dT7TxLTda6V30ATybH9rTJwXCViX_5beU3_p0I0QrLfm_CZjFqzCuRrAYpzYhWPFIZWBXgOhmUfp6AHQvlyOcAqQjpw0-1JfmxODvK_YZzeHAPvDPuqXdhQIyFKSNGclFXYss60C1FkgcAtChOif-m8MxwwwYLzS9aS7JW13IhA4ej2RhR1YysyG7eI9tkIFELak9IF99lqhqhXRhN0IwCkeEveI1WQGG8lUNjQ" },
    { id: 7,  badge: "diamond", title: "Google Pixel 9 Pro Fold Porcelain",       price: "19,500 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLugRSaGggeoSN85zaabMpWOF00tUza48mwDj1o1JvJ2lvH-wya6BKzCcDJt7wN7O7rRKbpraIUT6gXT9_lR98GP2d6XotnxdnB7ncKHZhgR-3bij8CNmFOs6ubrg1zkTKzDadmytK4YRrlEUo4OMc98Tufjj09KXBIU0bZ_5gO6PaLBexHbBe_7_zt662c2cQUdjjmlsivDg8Tc3WoJp2eZFUnNHHU-p1yiFAZI0zkhuq8Sk8xemwRztA" },
    { id: 8,  badge: "verified",title: "Oppo Mobile phone 512 GO",                price: "11,800 MAD", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_aqj7Dd8z3o5uspcCdx-sYWlLvW2SN7s8Af3QznPuNQZx2aInO20A9r6PMTIeVCAezl3u0l9pLkdofbX91oVnUfNfwG5teEzkQEGD83YwZvTPWQUmip6xSH5j663YOMfErMaDjxy5IyPmXKMbg0AzQJJ4nqfrALb8nuAE2ERs-H8nDt2kzVTlzbGhM0eKDUMgaW0lEqI1dezMmcUCPPzxj6TO1PKTx4tglroRDZIuseAghTXNEwB-j2FYUh8V3PRdOroD3TNVKA" },
    // Row 2
    { id: 9,  badge: null,      title: "ASUS ROG Phone 8 Pro 16/512GB",           price: "10,450 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLvOboLZuiQFTNM7AWXA5RbvUGtCNK4ujfWIdmVfhxhNUNlbVJiZhYmjKqOogZc9Vs3Qq5QNICYDskoYOgFbX-pEC2yHWp7xgEkQvUQbHocDIzW_aCzyzdBmszAmmA5Kpa_brdXGhzgPc8A-3khbiU3vfnGql1ETl1xyZDaZZV2l2u8OX_jHzHwqcz-NVa44u1wrV4Tj1pPbG-VTzMNyuPnxH6bermEubtry3-IsNfy1aYBVZOlhMRto7Q" },
    { id: 10, badge: null,      title: "OnePlus 12 5G Silky Black 256GB",         price: "7,900 MAD",  img: "https://lh3.googleusercontent.com/aida/AP1WRLvF5npOe2ROayaYDzGt28JmV1vDcK8uLCCyF9wIvXvu_uro2AfBT-UpUohKmshl2MNazjO47T4LW-oSEml6kajlGQKk3NXesV4_BUeb-chdDd0wyPEbJzuecQ1g35GZKG1dcDu47XtlJo_b7YVMiIu83pKICVtY_OpxNKOJ3K04ehqCOUNBCjec98fzVEMgKHdVFeIhSCoLcU3vcdZ66Kf2StMpBWc1xGMUP6v1Sl2qb8FhTzHO2zQVFQ" },
    { id: 11, badge: null,      title: "Sony Xperia 1 TERRA VI Next-Gen AF",      price: "12,900 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLvL9BUCS-5QkBm5nXknpav4z0W6RBibh34X8GHw501GpdF8ZZEEdXKsBHalQ_mswN6lRv1DGtTIFhmJ4kOi-IG4hFvy4O8-orAF5eVSb1bSEzEHsk8VamDxgjtPE_BfLSEK_dObdnjDrfHDNnavGUerqVn7_--RCGRk0NRtGp-z_g-zgfqUk7uA_7kqgy5C4StQWR1VaxEyMeP4sspFO9JzuH6L2oSrhbvvTFWLgdAstsa-nhndrdt6tA" },
    { id: 12, badge: null,      title: "Xiaomi 14 Mobile Pro Leica Optics",       price: "8,250 MAD",  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnDrNWbVaQuwKe0Y4Y-4GW_pYLLjoQrudXAWA6PuK4J-PcJSHrPsUHnlQhQgRNxXsdg3E5HtVo9k72Tka1jQCNqIQSNNTYdjLFEyxIhDYMBydcW9dAGYnZjSKOqtfmhA-4zu39HuVTnOT5MEGhOUNSN2zQhntvlF942OKcpt_1rYsMdZK889dlLswwZfiM864uB6OUIoOQxOkZihNO8lqFTS95n_JvZyRPETNBRxtmYOtWDIPq4_7thZlkrAR6T8Vt1zN0ZA0QsA" },
    // Row 3
    { id: 13, badge: null,      title: "iPhone Pro Max 2024 USB-C Midnight",      price: "6,150 MAD",  img: "https://lh3.googleusercontent.com/aida/AP1WRLtcwe_yn3xQG2cu7cX6mS9Zkt3M5mipHIvnRV130OBhNUBu94rrOD_achOd0g0aHHMsVe5XTJUuWN6lRk30tngWZzaBXNY0istauba2Ai--A8vQcdNjVbqJCE4wrdJCvEPvf0H9ru-jBBZZ4YPrKt9cJRhfy_E1Ly7JmQsh5rBWSiooZ33ixEwwLet7lB5sA0NOkoziKMCorXrnxOa88AMHTBfQEEAm6BnFnAypVG_k0_v0ZhyqwE0kYg" },
    { id: 14, badge: null,      title: "Apple iPhone 15 Titanium",                price: "8,400 MAD",  img: "https://lh3.googleusercontent.com/aida/AP1WRLtoIxuCRjAaxOJpjqJKZIKRBZ2AEL0z9iyoVJlOQDY2q9BD1LC_9bLtGoagumoaGVTVZxpWl97Zf4RXswDy5sGJ9KPWuS6jD2A7G9--wXt-z1SJfmSUWl0njKZxnP64YhgN0NnXBd33k43cWa_tX-_CuUFR11GUq-jesYSOFOAHQ2NcinDrUM2qRp_6M9OafbAaK8MkYoxfndipIT2UDzfPDZAodjnOXyfwtMaiDAdnAGkS1qNh-rLfKA" },
    { id: 15, badge: null,      title: 'Galaxy S24 Ultra 14.6" 5G',               price: "12,500 MAD", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0ohJVuMbcHzW7Nwo7OJJzk7POV2CJgYISJIlg1rWPLr1POWinvOTtU7MfMup7SuBSL_j_iL8UhL8Y0-vGjOqN9fzqxrNbVqZ0iEXhWgOkFHLmh34fn59lUHU2NnP5JeFebGm-NfD4yollvw8bhVCCnLTOc7r7sN_fMLkBxOe-l_uLD5IfYWCHLyD0P489PZ-_eVVPj0ZBnOWNQdTnPDXOkVEYN01W0l5Tmy4jlLMBcciu8_hHsjdD2ggHOYZ52qEfleFB_L-gxA" },
    { id: 16, badge: null,      title: "iPhone 12 Mini 2020 256GB",               price: "7,200 MAD",  img: "https://lh3.googleusercontent.com/aida/AP1WRLvjTVcsqg9amFR70JtiiYaQM8XHiEGl2Rn456gd6IGYNwXni8zU4BEQEiPLUwaN9aVcA8_D6cbnvtgWu0ifGSAL3ycVMNfQWTVNGnsFxcq_-l8EeU5tFgxvLmGJ7-9vljK3EUhuQgJyJcimBC1EBo2QOl4asFxrw2Bg8oLTvD9xFOJpQnjQX1Ig6sRyPFMARTYpHfFVv6tj3Ddb_NaHaur1cVqbRnGYOqYoBj4leKzFfglKT2hjZdp9-Q" },
    // Row 4
    { id: 17, badge: null,      title: "Nothing Phone (2a) White 128GB",          price: "3,850 MAD",  img: "https://lh3.googleusercontent.com/aida/AP1WRLtuVZwdOoQBikcR_HajLTCdl0m0GNW_LbUwD6TO7VD5JYHB9NS9BbTS-gQ4_f-HqGFY4qUpt4RW6VTxqz1Ul9WDJytJtawaWn7W8z920eo58Z9YOND3xTJc4QBJ321X9f4yv6eeHuEcDSz2DS64FtUP-AxdY7HCnQ_EhLuOyzOYIfwjBmN64_egCXjTTkhOYrg73CoDQ4DsOWYIMJHEz8uxeM3_xRDm7W7wqlDn2PglF-rjWnc17XM2" },
    { id: 18, badge: null,      title: "Google Pixel 8a Obsidian Unlocked",       price: "4,950 MAD",  img: "https://lh3.googleusercontent.com/aida/AP1WRLuZdnFX4QTfkzOLV1mFtwIn5yEghLtV2PvYxjw74aV3ZNLEe5t4qLRdOZe2_LVUHWK9jd0wBZjFin0lTvcp0atxk9FXLpcft2GDv9NL0Ve-9aM4QTp48_nN1YEt7QxDrYyqSZoeBgp8N4VkvOfusM9DSOISVkySEguOxZFwuuca4Kh0jm0XV9BfP1hZLeWJ2U6TFrjAAKBGh7xaAArGJGkuHGi27D8Rt7D0EfVG9ic8nE5WuV3cgSkrZA" },
    { id: 19, badge: null,      title: "iPhone 14 Plus 128GB Blue",               price: "6,800 MAD",  img: "https://lh3.googleusercontent.com/aida/AP1WRLtcwe_yn3xQG2cu7cX6mS9Zkt3M5mipHIvnRV130OBhNUBu94rrOD_achOd0g0aHHMsVe5XTJUuWN6lRk30tngWZzaBXNY0istauba2Ai--A8vQcdNjVbqJCE4wrdJCvEPvf0H9ru-jBBZZ4YPrKt9cJRhfy_E1Ly7JmQsh5rBWSiooZ33ixEwwLet7lB5sA0NOkoziKMCorXrnxOa88AMHTBfQEEAm6BnFnAypVG_k0_v0ZhyqwE0kYg" },
    { id: 20, badge: null,      title: "Apple iPhone X 64 GB",                    price: "450 MAD",    img: "https://lh3.googleusercontent.com/aida/AP1WRLtcwe_yn3xQG2cu7cX6mS9Zkt3M5mipHIvnRV130OBhNUBu94rrOD_achOd0g0aHHMsVe5XTJUuWN6lRk30tngWZzaBXNY0istauba2Ai--A8vQcdNjVbqJCE4wrdJCvEPvf0H9ru-jBBZZ4YPrKt9cJRhfy_E1Ly7JmQsh5rBWSiooZ33ixEwwLet7lB5sA0NOkoziKMCorXrnxOa88AMHTBfQEEAm6BnFnAypVG_k0_v0ZhyqwE0kYg" },
  ]

  const brands = ["Apple","Samsung","Google","Nokia","Huawei","Xiaomi"]

  const FeatBadge = ({ badge }: { badge?: string | null }) => {
    if (badge === "diamond") return <span style={{ background:"#006b5f", color:"white", fontSize:"10px", fontWeight:900, padding:"6px 12px", borderRadius:"9999px", display:"flex", alignItems:"center", gap:"4px", textTransform:"uppercase", boxShadow:"0 4px 16px rgba(0,0,0,.3)" }}>◆ DIAMOND MEMBER</span>
    if (badge === "pro") return <span style={{ background:"#62fae3", color:"#00201c", fontSize:"10px", fontWeight:900, padding:"6px 12px", borderRadius:"9999px", display:"flex", alignItems:"center", gap:"4px", textTransform:"uppercase", boxShadow:"0 4px 16px rgba(0,0,0,.2)" }}>✓ PRO SELLER</span>
    if (badge === "verified") return <span style={{ background:"#dde4e1", color:"#3c4a46", fontSize:"10px", fontWeight:900, padding:"6px 12px", borderRadius:"9999px", display:"flex", alignItems:"center", gap:"4px", textTransform:"uppercase", border:"1px solid rgba(186,202,197,.3)" }}>✓ VERIFIED</span>
    if (badge === "diamond-sm") return <span style={{ background:"#006b5f", color:"white", fontSize:"10px", fontWeight:900, padding:"4px 10px", borderRadius:"9999px", display:"flex", alignItems:"center", gap:"4px", textTransform:"uppercase" }}>◆ DIAMOND</span>
    if (badge === "pro-sm") return <span style={{ background:"#62fae3", color:"#00201c", fontSize:"10px", fontWeight:900, padding:"4px 10px", borderRadius:"9999px", display:"flex", alignItems:"center", gap:"4px", textTransform:"uppercase" }}>✓ PRO</span>
    if (badge === "verified-sm") return <span style={{ background:"#dde4e1", color:"#3c4a46", fontSize:"10px", fontWeight:900, padding:"4px 10px", borderRadius:"9999px", display:"flex", alignItems:"center", gap:"4px", textTransform:"uppercase" }}>✓ VERIFIED</span>
    return null
  }

  return (
    <div style={{ fontFamily:"'Hanken Grotesk',sans-serif", backgroundColor:"#f4fbf8", minHeight:"100vh", color:"#161d1b" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .ms{font-family:'Material Symbols Outlined';font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;vertical-align:middle;display:inline-block;line-height:1;}
        .ms-fill{font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24;}
        .glass{background:rgba(255,255,255,0.7);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.4);}
        .no-scroll::-webkit-scrollbar{display:none;}.no-scroll{-ms-overflow-style:none;scrollbar-width:none;}
        .card-feat{transition:all .5s;}.card-feat:hover{transform:translateY(-8px);}
        .card-sm{transition:all .5s;}.card-sm:hover{transform:translateY(-8px);}
        .img-zoom img{transition:transform .7s;}.img-zoom:hover img{transform:scale(1.1);}
      `}</style>

      {/* HERO */}
      <section style={{ position:"relative", height:"450px", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0 }}>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUAm2hhVjd1MfggKhTWwUAc7A9P8BhkT0eqd5rjgS0Xn-gHLomPVpraBhUUacYCy4pjLdCyLnI_t_IlzY4WnGDg8pKsJ_R4m34gYzjczfSlVI-FDeoPeBRuJwhVaO5yiAmYci5oK8kFA-WPL6Sao4MniYMxWn3MUZFZxvX7i80GPSemx2A8gZsVogTFEra9Nvlx9p9Bi8B-25bTyMIymvAkfQnT2IhO5ccPjiUb_UPLZqr31hyki2g350yXc8T7vo-v2nzVeIlIw" alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(0,0,0,.4),rgba(244,251,248,.2),#f4fbf8)" }}></div>
        </div>
        <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:"896px", margin:"0 auto", padding:"0 20px", display:"flex", flexDirection:"column", alignItems:"center" }}>
          <h1 style={{ fontSize:"48px", fontWeight:900, color:"white", marginBottom:"32px", textAlign:"center", lineHeight:1.1, letterSpacing:"-0.02em", textShadow:"0 4px 24px rgba(0,0,0,.5)", textTransform:"uppercase" }}>Discover Your Next Mobile Device in Rabat</h1>
          <div style={{ width:"100%", display:"flex", gap:"8px", padding:"8px", borderRadius:"3rem", background:"rgba(255,255,255,.1)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,.3)", boxShadow:"0 20px 60px rgba(0,0,0,.2)" }}>
            <div style={{ flex:1, display:"flex", alignItems:"center", borderRadius:"9999px", padding:"14px 20px", background:"rgba(244,251,248,.9)" }}>
              <span className="ms" style={{ color:"#3c4a46", marginRight:"12px" }}>search</span>
              <input style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:"16px" }} placeholder="Search for iPhone 16 Pro, Samsung S24..." />
            </div>
            <div style={{ flex:1, display:"flex", alignItems:"center", borderRadius:"9999px", padding:"14px 20px", background:"rgba(244,251,248,.9)" }}>
              <span className="ms" style={{ color:"#3c4a46", marginRight:"12px" }}>location_on</span>
              <select style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:"16px", appearance:"none" }}>
                <option>Rabat</option><option>Casablanca</option>
              </select>
            </div>
            <button style={{ background:"#006b5f", color:"white", border:"none", borderRadius:"9999px", padding:"0 40px", fontWeight:900, fontSize:"14px", cursor:"pointer", display:"flex", alignItems:"center", gap:"8px", textTransform:"uppercase", letterSpacing:".05em", boxShadow:"0 4px 16px rgba(0,107,95,.4)" }}>
              <span className="ms">manage_search</span> Search
            </button>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div style={{ maxWidth:"1440px", margin:"-40px auto 32px", padding:"0 40px", position:"relative", zIndex:20 }}>
        <div style={{ display:"flex", alignItems:"center", padding:"8px", borderRadius:"9999px", background:"rgba(255,255,255,.95)", backdropFilter:"blur(16px)", border:"1px solid rgba(186,202,197,.3)", boxShadow:"0 8px 32px rgba(0,0,0,.1)" }}>
          {[["CITY","Rabat"],["CONDITION","Select Condition"],["PRICE (MAD)","Any Price"],["FILTERS","All Filters"]].map(([label,val],i)=>(
            <div key={label} style={{ flex:1, padding:"8px 16px", borderRight:i<3?"1px solid rgba(186,202,197,.2)":"none", cursor:"pointer" }}>
              <div style={{ fontSize:"9px", fontWeight:900, color:"#3c4a46", textTransform:"uppercase", letterSpacing:".15em" }}>{label}</div>
              <div style={{ fontSize:"16px", fontWeight:label==="FILTERS"?700:500, color:"#161d1b", display:"flex", alignItems:"center", gap:"4px" }}>{val}
                <span className="ms" style={{ fontSize:label==="FILTERS"?20:18, color:label==="FILTERS"?"#006b5f":"#3c4a46" }}>{label==="FILTERS"?"tune":"expand_more"}</span>
              </div>
            </div>
          ))}
          <div style={{ flex:2, padding:"8px 16px", borderRight:"1px solid rgba(186,202,197,.2)" }}>
            <div style={{ fontSize:"9px", fontWeight:900, color:"#3c4a46", textTransform:"uppercase", letterSpacing:".15em" }}>KEYWORD</div>
            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <input style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:"16px" }} placeholder="Model, Brand, Specs..." />
              <span className="ms" style={{ color:"#006b5f" }}>search</span>
            </div>
          </div>
        </div>
      </div>

      {/* BREADCRUMBS */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 24px", padding:"0 40px" }}>
        <nav style={{ display:"flex", alignItems:"center", gap:"8px", fontSize:"13px", fontWeight:600, color:"rgba(60,74,70,.7)" }}>
          {["Rabat","Vault","Electronics"].map(c=>(
            <span key={c} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <a href="#" style={{ textDecoration:"none", color:"inherit" }}>{c}</a>
              <span className="ms" style={{ fontSize:"16px" }}>chevron_right</span>
            </span>
          ))}
          <span style={{ fontWeight:900, color:"#161d1b" }}>Mobiles</span>
        </nav>
      </div>

      {/* TITLE + CONTROLS */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 32px", padding:"0 40px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"24px" }}>
          <div>
            <h1 style={{ fontSize:"24px", fontWeight:700, color:"#161d1b", marginBottom:"4px" }}>New and Used Mobile Phones in Rabat</h1>
            <p style={{ fontSize:"16px", color:"#3c4a46" }}>5,876 Ads found in Rabat District</p>
          </div>
          <div style={{ display:"flex", gap:"12px" }}>
            {[["sort","Sort: Default"],["notifications_active","Save Search"]].map(([icon,label])=>(
              <button key={label} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"10px 24px", borderRadius:"12px", background:"white", border:"1px solid rgba(186,202,197,.3)", fontSize:"13px", fontWeight:700, cursor:"pointer", boxShadow:"0 2px 8px rgba(0,0,0,.04)" }}>
                <span className="ms" style={{ fontSize:"18px" }}>{icon}</span>{label}
              </button>
            ))}
          </div>
        </div>

        {/* BRANDS */}
        <div className="no-scroll" style={{ display:"flex", gap:"12px", overflowX:"auto", padding:"8px 0", marginBottom:"24px" }}>
          <button style={{ whiteSpace:"nowrap", padding:"12px 32px", borderRadius:"9999px", background:"#006b5f", color:"white", fontSize:"13px", fontWeight:900, border:"none", cursor:"pointer", textTransform:"uppercase", boxShadow:"0 4px 14px rgba(0,107,95,.35)" }}>All Brands</button>
          {brands.map(b=><button key={b} style={{ whiteSpace:"nowrap", padding:"12px 32px", borderRadius:"9999px", background:"white", border:"1px solid rgba(186,202,197,.3)", fontSize:"13px", fontWeight:700, cursor:"pointer", textTransform:"uppercase" }}>{b}</button>)}
          <button style={{ whiteSpace:"nowrap", padding:"12px 24px", color:"#006b5f", fontWeight:900, fontSize:"13px", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:"4px", textTransform:"uppercase" }}>More <span className="ms">expand_more</span></button>
        </div>

        {/* UTILITY ROW */}
        <div style={{ display:"flex", flexDirection:"column", gap:"16px", padding:"24px 0", borderTop:"1px solid rgba(186,202,197,.2)", borderBottom:"1px solid rgba(186,202,197,.2)", marginBottom:"32px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"16px" }}>
            <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"16px" }}>
              <span style={{ display:"flex", alignItems:"center", gap:"8px", fontSize:"13px", fontWeight:900, color:"#006b5f", background:"rgba(45,212,191,.15)", padding:"6px 16px", borderRadius:"9999px", border:"1px solid rgba(0,107,95,.1)", textTransform:"uppercase" }}><span className="ms" style={{ fontSize:"18px" }}>bolt</span> NEW ARRIVALS</span>
              <span style={{ display:"flex", alignItems:"center", gap:"8px", fontSize:"13px", fontWeight:900, color:"#605e58", background:"rgba(96,94,88,.1)", padding:"6px 16px", borderRadius:"9999px", border:"1px solid rgba(96,94,88,.1)", textTransform:"uppercase" }}><span className="ms" style={{ fontSize:"18px" }}>trending_down</span> PRICE DROP</span>
              <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                <span style={{ fontSize:"13px", fontWeight:700, color:"#3c4a46", textTransform:"uppercase", letterSpacing:".05em" }}>Diamond Verified First</span>
                <div style={{ width:"44px", height:"24px", background:"#006b5f", borderRadius:"9999px", display:"flex", alignItems:"center", padding:"0 3px", cursor:"pointer", justifyContent:"flex-end" }}>
                  <div style={{ width:"18px", height:"18px", background:"white", borderRadius:"9999px" }}></div>
                </div>
              </div>
            </div>
            <div style={{ display:"flex", gap:"8px" }}>
              <button style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 20px", borderRadius:"9999px", background:"rgba(0,107,95,.1)", color:"#006b5f", border:"1px solid rgba(0,107,95,.2)", fontSize:"13px", fontWeight:900, cursor:"pointer", textTransform:"uppercase" }}><span className="ms" style={{ fontSize:"20px" }}>groups</span> ALL SELLERS (5,876)</button>
              <button style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 20px", borderRadius:"9999px", background:"#eef5f2", border:"1px solid rgba(186,202,197,.3)", fontSize:"13px", fontWeight:700, cursor:"pointer", textTransform:"uppercase" }}><span className="ms" style={{ fontSize:"20px" }}>verified_user</span> PRO ONLY</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:"1440px", margin:"0 auto", padding:"0 40px" }}>

        {/* FEATURED PREMIUM MOBILES */}
        <div style={{ marginBottom:"64px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"32px" }}>
            <h2 style={{ fontSize:"24px", fontWeight:900, color:"#006b5f", display:"flex", alignItems:"center", gap:"12px", textTransform:"uppercase", letterSpacing:"-.01em" }}>
              <span className="ms ms-fill" style={{ fontSize:"32px" }}>diamond</span> Featured Premium Mobiles
            </h2>
            <a href="#" style={{ display:"flex", alignItems:"center", gap:"4px", color:"#006b5f", fontWeight:900, fontSize:"13px", textDecoration:"none", textTransform:"uppercase" }}>View all Featured <span className="ms" style={{ fontSize:"20px" }}>chevron_right</span></a>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px" }}>
            {featuredPremium.map(item=>(
              <article key={item.id} className="card-feat glass img-zoom" style={{ borderRadius:"2.5rem", overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 8px 40px rgba(0,0,0,.1)", border:"1px solid rgba(186,202,197,.5)" }}>
                <div style={{ position:"relative", aspectRatio:"4/5", overflow:"hidden", background:"#d4dcd9" }}>
                  <div style={{ position:"absolute", top:"16px", left:"16px", zIndex:10 }}><FeatBadge badge={item.badge} /></div>
                  <button style={{ position:"absolute", top:"16px", right:"16px", zIndex:10, width:"44px", height:"44px", borderRadius:"9999px", background:"rgba(255,255,255,.9)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 12px rgba(0,0,0,.15)", transition:"all .2s" }}>
                    <span className="ms" style={{ fontSize:"22px" }}>favorite</span>
                  </button>
                  <img src={item.img} alt={item.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
                <div style={{ padding:"24px", display:"flex", flexDirection:"column", flex:1, background:"white" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"12px" }}>
                    <span style={{ fontSize:"13px", fontWeight:900, color:"#006b5f", textTransform:"uppercase", letterSpacing:"-.02em" }}>{item.spec}</span>
                    <span style={{ width:"6px", height:"6px", background:"rgba(186,202,197,.8)", borderRadius:"9999px" }}></span>
                    <span style={{ fontSize:"13px", fontWeight:500, color:"#3c4a46" }}>{item.location}</span>
                  </div>
                  <h3 style={{ fontSize:"20px", fontWeight:700, color:"#161d1b", marginBottom:"12px", lineHeight:1.3 }}>{item.title}</h3>
                  <p style={{ fontSize:"24px", fontWeight:900, color:"#006b5f", marginBottom:"24px" }}>{item.price}</p>
                  <div style={{ marginTop:"auto", paddingTop:"24px", borderTop:"1px solid rgba(186,202,197,.1)", display:"flex", gap:"8px" }}>
                    <button style={{ flex:1, padding:"12px", borderRadius:"16px", border:"2px solid rgba(186,202,197,.5)", background:"none", fontSize:"13px", fontWeight:900, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", textTransform:"uppercase" }}><span className="ms" style={{ fontSize:"20px" }}>chat_bubble</span> Message</button>
                    <button style={{ flex:1, padding:"12px", borderRadius:"16px", background:"#25D366", color:"white", border:"none", fontSize:"13px", fontWeight:900, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", textTransform:"uppercase", boxShadow:"0 4px 12px rgba(37,211,102,.3)" }}><span className="ms" style={{ fontSize:"20px" }}>call</span> WhatsApp</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* INTERSTITIAL */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"64px" }}>
          <div style={{ borderRadius:"2.5rem", padding:"48px", minHeight:"350px", display:"flex", flexDirection:"column", justifyContent:"center", background:"#006b5f", color:"white", boxShadow:"0 16px 48px rgba(0,107,95,.3)", position:"relative", overflow:"hidden" }}>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUAm2hhVjd1MfggKhTWwUAc7A9P8BhkT0eqd5rjgS0Xn-gHLomPVpraBhUUacYCy4pjLdCyLnI_t_IlzY4WnGDg8pKsJ_R4m34gYzjczfSlVI-FDeoPeBRuJwhVaO5yiAmYci5oK8kFA-WPL6Sao4MniYMxWn3MUZFZxvX7i80GPSemx2A8gZsVogTFEra9Nvlx9p9Bi8B-25bTyMIymvAkfQnT2IhO5ccPjiUb_UPLZqr31hyki2g350yXc8T7vo-v2nzVeIlIw" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.2 }} />
            <div style={{ position:"relative", zIndex:1, maxWidth:"450px" }}>
              <h2 style={{ fontSize:"42px", fontWeight:900, marginBottom:"24px", lineHeight:1.1, textTransform:"uppercase", letterSpacing:"-.02em" }}>JOIN THE SOUKNI FAMILY</h2>
              <p style={{ fontSize:"18px", marginBottom:"40px", opacity:.9, lineHeight:1.6, fontWeight:500 }}>Start selling your tech items today for free and reach millions of buyers across Morocco.</p>
              <button style={{ background:"white", color:"#006b5f", padding:"16px 40px", borderRadius:"9999px", fontWeight:900, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", letterSpacing:".15em", boxShadow:"0 8px 24px rgba(0,0,0,.2)" }}>Register as Individual</button>
            </div>
          </div>
          <div style={{ borderRadius:"2.5rem", padding:"48px", minHeight:"350px", display:"flex", flexDirection:"column", justifyContent:"center", background:"white", border:"2px solid rgba(0,107,95,.2)", boxShadow:"0 16px 48px rgba(0,0,0,.08)", position:"relative", overflow:"hidden" }}>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUAm2hhVjd1MfggKhTWwUAc7A9P8BhkT0eqd5rjgS0Xn-gHLomPVpraBhUUacYCy4pjLdCyLnI_t_IlzY4WnGDg8pKsJ_R4m34gYzjczfSlVI-FDeoPeBRuJwhVaO5yiAmYci5oK8kFA-WPL6Sao4MniYMxWn3MUZFZxvX7i80GPSemx2A8gZsVogTFEra9Nvlx9p9Bi8B-25bTyMIymvAkfQnT2IhO5ccPjiUb_UPLZqr31hyki2g350yXc8T7vo-v2nzVeIlIw" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.1 }} />
            <div style={{ position:"relative", zIndex:1, maxWidth:"450px" }}>
              <div style={{ display:"inline-flex", marginBottom:"16px" }}>
                <span style={{ fontSize:"12px", fontWeight:900, color:"#006b5f", textTransform:"uppercase", letterSpacing:".2em", background:"rgba(0,107,95,.1)", padding:"6px 16px", borderRadius:"9999px" }}>Solutions for agents</span>
              </div>
              <h2 style={{ fontSize:"42px", fontWeight:900, color:"#161d1b", marginBottom:"24px", lineHeight:1.1, textTransform:"uppercase", letterSpacing:"-.02em" }}>SouKni Electro Pro</h2>
              <p style={{ fontSize:"18px", color:"#3c4a46", marginBottom:"40px", lineHeight:1.6, fontWeight:500 }}>Boost your mobile store visibility with our premium listing dashboard, analytics, and CRM tools.</p>
              <button style={{ background:"#006b5f", color:"white", padding:"16px 40px", borderRadius:"9999px", fontWeight:900, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", letterSpacing:".15em", boxShadow:"0 8px 24px rgba(0,107,95,.3)" }}>Discover Pro Tools</button>
            </div>
          </div>
        </div>

        {/* MORE EXCEPTIONAL DEALS */}
        <div style={{ marginBottom:"64px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"32px" }}>
            <h2 style={{ fontSize:"24px", fontWeight:900, color:"#006b5f", textTransform:"uppercase", letterSpacing:"-.01em" }}>More Exceptional Deals in Rabat</h2>
            <a href="#" style={{ display:"flex", alignItems:"center", gap:"4px", color:"#006b5f", fontWeight:900, fontSize:"13px", textDecoration:"none", textTransform:"uppercase" }}>Explore All <span className="ms" style={{ fontSize:"20px" }}>chevron_right</span></a>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px" }}>
            {moreDeals.map(item=>{
              const smBadge = item.badge === "diamond" ? "diamond-sm" : item.badge === "pro" ? "pro-sm" : item.badge === "verified" ? "verified-sm" : null
              return (
                <article key={item.id} className="card-sm glass img-zoom" style={{ borderRadius:"2.5rem", overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 4px 24px rgba(0,0,0,.08)", border:"1px solid rgba(186,202,197,.5)" }}>
                  <div style={{ position:"relative", aspectRatio:"4/5", overflow:"hidden", background:"#d4dcd9" }}>
                    {smBadge && <div style={{ position:"absolute", top:"12px", left:"12px", zIndex:10 }}><FeatBadge badge={smBadge} /></div>}
                    <img src={item.img} alt={item.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  </div>
                  <div style={{ padding:"20px", display:"flex", flexDirection:"column", flex:1 }}>
                    <h3 style={{ fontSize:"18px", fontWeight:700, color:"#161d1b", marginBottom:"8px", lineHeight:1.3 }}>{item.title}</h3>
                    <p style={{ fontSize:"22px", fontWeight:900, color:"#006b5f", marginBottom:"16px" }}>{item.price}</p>
                    <div style={{ marginTop:"auto", display:"flex", gap:"8px" }}>
                      <button style={{ flex:1, padding:"10px", borderRadius:"12px", border:"1px solid rgba(186,202,197,.5)", background:"none", fontSize:"13px", fontWeight:900, cursor:"pointer", textTransform:"uppercase" }}>Message</button>
                      <button style={{ flex:1, padding:"10px", borderRadius:"12px", background:"#25D366", color:"white", border:"none", fontSize:"13px", fontWeight:900, cursor:"pointer", textTransform:"uppercase" }}>WhatsApp</button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        {/* PAGINATION */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", marginBottom:"64px" }}>
          {["chevron_left","1","2","3","...","48","chevron_right"].map((p,i)=>(
            <button key={i} style={{ width:"48px", height:"48px", borderRadius:"9999px", border:p==="1"?"none":"1px solid rgba(186,202,197,.3)", background:p==="1"?"#006b5f":"none", color:p==="1"?"white":"#161d1b", fontWeight:900, fontSize:"14px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:p==="1"?"0 4px 16px rgba(0,107,95,.3)":"0 2px 8px rgba(0,0,0,.04)" }}>
              {p==="chevron_left"||p==="chevron_right"?<span className="ms">{p}</span>:p}
            </button>
          ))}
        </div>

        {/* DIAMOND BANNER */}
        <div style={{ borderRadius:"2.5rem", padding:"64px", textAlign:"center", color:"white", marginBottom:"64px", background:"linear-gradient(135deg,#006b5f 0%,#2dd4bf 100%)", boxShadow:"0 16px 64px rgba(0,107,95,.4)", position:"relative", overflow:"hidden" }}>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUAm2hhVjd1MfggKhTWwUAc7A9P8BhkT0eqd5rjgS0Xn-gHLomPVpraBhUUacYCy4pjLdCyLnI_t_IlzY4WnGDg8pKsJ_R4m34gYzjczfSlVI-FDeoPeBRuJwhVaO5yiAmYci5oK8kFA-WPL6Sao4MniYMxWn3MUZFZxvX7i80GPSemx2A8gZsVogTFEra9Nvlx9p9Bi8B-25bTyMIymvAkfQnT2IhO5ccPjiUb_UPLZqr31hyki2g350yXc8T7vo-v2nzVeIlIw" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.1 }} />
          <div style={{ position:"relative", zIndex:1 }}>
            <h2 style={{ fontSize:"48px", fontWeight:900, marginBottom:"24px", textTransform:"uppercase", letterSpacing:"-.02em" }}>Become a Diamond Member</h2>
            <p style={{ fontSize:"18px", opacity:.9, maxWidth:"600px", margin:"0 auto 40px", lineHeight:1.6, fontWeight:500 }}>Enjoy zero listing fees, unlimited highlighted ads, and a dedicated account manager for your mobile business in Rabat and beyond.</p>
            <button style={{ background:"white", color:"#006b5f", padding:"20px 48px", borderRadius:"9999px", fontWeight:900, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", letterSpacing:".2em", boxShadow:"0 8px 32px rgba(0,0,0,.2)" }}>Upgrade to Diamond</button>
          </div>
        </div>

        {/* MOBILE PRO BANNER */}
        <div style={{ position:"relative", height:"400px", borderRadius:"2.5rem", overflow:"hidden", marginBottom:"64px", boxShadow:"0 16px 64px rgba(0,0,0,.2)" }}>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUAm2hhVjd1MfggKhTWwUAc7A9P8BhkT0eqd5rjgS0Xn-gHLomPVpraBhUUacYCy4pjLdCyLnI_t_IlzY4WnGDg8pKsJ_R4m34gYzjczfSlVI-FDeoPeBRuJwhVaO5yiAmYci5oK8kFA-WPL6Sao4MniYMxWn3MUZFZxvX7i80GPSemx2A8gZsVogTFEra9Nvlx9p9Bi8B-25bTyMIymvAkfQnT2IhO5ccPjiUb_UPLZqr31hyki2g350yXc8T7vo-v2nzVeIlIw" alt="" style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 1s" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(0,0,0,.8),rgba(0,0,0,.4),transparent)" }}></div>
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 80px" }}>
            <div style={{ maxWidth:"600px" }}>
              <span style={{ color:"#3cddc7", fontWeight:900, fontSize:"12px", textTransform:"uppercase", letterSpacing:".3em", marginBottom:"24px", display:"block", background:"rgba(0,107,95,.2)", backdropFilter:"blur(8px)", padding:"6px 16px", borderRadius:"9999px", width:"fit-content" }}>Premier Partnership</span>
              <h2 style={{ color:"white", fontSize:"56px", fontWeight:900, marginBottom:"16px", lineHeight:1.05, letterSpacing:"-.02em", textTransform:"uppercase" }}>SouKni Mobile Pro</h2>
              <p style={{ color:"rgba(255,255,255,.9)", fontSize:"18px", lineHeight:1.6, fontStyle:"italic", maxWidth:"450px", marginBottom:"32px" }}>The Gold Standard for Mobile Sales in Rabat. Verified Business Excellence.</p>
              <button style={{ background:"#2dd4bf", color:"#006b5f", padding:"20px 48px", borderRadius:"9999px", fontWeight:900, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", letterSpacing:".15em", boxShadow:"0 8px 32px rgba(45,212,191,.4)" }}>Discover Pro Benefits</button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background:"#7A7A7A", color:"rgba(255,255,255,.9)", paddingTop:"80px", paddingBottom:"40px" }}>
        <div style={{ maxWidth:"1440px", margin:"0 auto", padding:"0 40px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:"64px", marginBottom:"80px" }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"32px" }}>
                <div style={{ width:"48px", height:"48px", background:"#006b5f", borderRadius:"14px", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 16px rgba(0,107,95,.4)" }}>
                  <span style={{ color:"white", fontWeight:900, fontSize:"22px" }}>S</span>
                </div>
                <span style={{ fontSize:"28px", fontWeight:900, color:"white", letterSpacing:"-.02em" }}>SouKni</span>
              </div>
              <p style={{ fontSize:"18px", fontWeight:700, color:"rgba(255,255,255,.9)", fontStyle:"italic", marginBottom:"16px" }}>The Market in your Pocket</p>
              <p style={{ fontSize:"14px", color:"rgba(255,255,255,.7)", lineHeight:1.6, marginBottom:"32px" }}>Morocco's leading premium marketplace for high-tech mobiles, real estate, and unique lifestyle deals.</p>
              <div style={{ display:"flex", gap:"16px" }}>
                {["public","alternate_email"].map(icon=>(
                  <div key={icon} style={{ width:"48px", height:"48px", borderRadius:"9999px", background:"rgba(255,255,255,.1)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                    <span className="ms" style={{ color:"white", fontSize:"24px" }}>{icon}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ color:"white", fontWeight:900, marginBottom:"24px", textTransform:"uppercase", letterSpacing:".2em", fontSize:"14px" }}>Marketplace</h4>
              <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:"16px" }}>
                {["Motors","Property","Mobiles & Computers","The Vault"].map(l=>(
                  <li key={l}><a href="#" style={{ color:"rgba(255,255,255,.6)", textDecoration:"none", fontSize:"14px", fontWeight:700, display:"flex", alignItems:"center", gap:"8px" }}>{l} <span className="ms" style={{ fontSize:"14px" }}>arrow_outward</span></a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ color:"white", fontWeight:900, marginBottom:"24px", textTransform:"uppercase", letterSpacing:".2em", fontSize:"14px" }}>Support</h4>
              <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:"16px" }}>
                {["About Us","Help Center","Safety Tips","Terms of Service","Privacy Policy"].map(l=><li key={l}><a href="#" style={{ color:"rgba(255,255,255,.6)", textDecoration:"none", fontSize:"14px", fontWeight:700 }}>{l}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 style={{ color:"white", fontWeight:900, marginBottom:"24px", textTransform:"uppercase", letterSpacing:".2em", fontSize:"14px" }}>Get the App</h4>
              <p style={{ fontSize:"14px", color:"rgba(255,255,255,.6)", marginBottom:"24px", fontWeight:500 }}>Experience the hub on your mobile device for the fastest deals.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                {[["play_store","GET IT ON","Google Play"],["laptop_mac","DOWNLOAD ON THE","App Store"]].map(([icon,sub,name])=>(
                  <button key={name} style={{ background:"black", color:"white", borderRadius:"16px", padding:"16px", display:"flex", alignItems:"center", gap:"16px", border:"1px solid rgba(255,255,255,.1)", cursor:"pointer", boxShadow:"0 4px 16px rgba(0,0,0,.3)" }}>
                    <span className="ms" style={{ fontSize:"36px" }}>{icon}</span>
                    <div style={{ textAlign:"left" }}>
                      <div style={{ fontSize:"10px", fontWeight:900, textTransform:"uppercase", opacity:.6 }}>{sub}</div>
                      <div style={{ fontSize:"20px", fontWeight:900 }}>{name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ paddingTop:"40px", borderTop:"1px solid rgba(255,255,255,.1)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <p style={{ fontSize:"14px", fontWeight:700, color:"rgba(255,255,255,.4)" }}>© 2026 SouKni Marketplace. All rights reserved. Designed for Rabat Hub</p>
            <div style={{ display:"flex", gap:"40px", alignItems:"center" }}>
              {["Cookie Policy","Site Map"].map(l=><a key={l} href="#" style={{ color:"rgba(255,255,255,.4)", fontSize:"14px", fontWeight:700, textDecoration:"none" }}>{l}</a>)}
              <div style={{ display:"flex", alignItems:"center", gap:"12px", color:"rgba(255,255,255,.4)", fontSize:"10px", fontWeight:900, textTransform:"uppercase", letterSpacing:".15em" }}>
                <div style={{ width:"8px", height:"8px", borderRadius:"9999px", background:"#2dd4bf", animation:"pulse 2s infinite" }}></div>
                System Operational
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
