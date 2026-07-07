export default function WearablesPage() {

  const featuredListings = [
    { id: 1, badge: "diamond", title: "Apple Watch Ultra 2 (GPS + Cellular, 49mm)", price: "9,200 MAD", condition: "New", location: "Rabat, Agdal", img: "https://lh3.googleusercontent.com/aida/AP1WRLviaZwob5mRh8rXf3MxU5EL8AdDItCecLXbm4CVPMugHymhr_z10O2K-BVMQ1xA1wv5_dDALlyL09ZHXGVm_ikHUHSyuEXduuU-3vfEkHfQwSTyr3spGEdHaUlN38dQMDY7L9dsL57tjsNKuaPWrwXLaam8acF3xCqMSABSi0ArsYsTbGGe0uEJd53A1W1JMfcfHe-9hGHc6gG4Y_gS7ouHr1BFvAslUBD4PFxaBe2KZSTOpAFbIjTgWA" },
    { id: 2, badge: "pro", title: "Samsung Galaxy Watch Ultra 47mm LTE", price: "6,450 MAD", condition: "Open Box", location: "Rabat, Souissi", img: "https://lh3.googleusercontent.com/aida/AP1WRLsRDXBcEtZrQykNLbntaChqw8DjZxueCKsIibeXNsV3Xca4kWwfbDVt138UXimNCKbA9KjOH_HZ885o_D2g24h0j_CJ4S0oSrt4lzvwTrqndPGLA4uYxNrmQRr_FGz2D6mQj7FxUa6T_l-ZltiC3M0o0wyYQfFdKUYsCrBChKfIlLmPWybvi9zkgrD_9tQpFQyxKNKSo7mB51d_Os8fBxpce9B3pP0yLkW_p74sKxXL_Pmj3nHPNSlA" },
    { id: 3, badge: "diamond", title: "Garmin MARQ Athlete Gen 2 Luxury Tool Watch", price: "18,500 MAD", condition: "Used", location: "Rabat, Hassan", img: "https://lh3.googleusercontent.com/aida/AP1WRLtTh9joY3ndyye45OgPH2XpLTruF6SkoV8JwDa2dofZ_sb37wcT2FwlM_KmmQwb-jy3IU6y7vW061IgPyw-u7ZOVPBcdiaRrD-fYg52Qfn12qaiajRtp4iloZkF3IA0sUJG8cwNV6S0GXMwZ2sY5EcDx_xylb__6BvtlrrUmXAb1QBRLYe-Vz_2f7UK3Jv5C8KmwF0SyUTaXJ11KQHi9EP4ZgbAcOtGkFLY-a0lc4caE9BQuTHrmt9L9Q" },
    { id: 4, badge: "verified", title: "Google Pixel Watch 3 - 45mm Obsidian", price: "4,200 MAD", condition: "New", location: "Rabat, Hay Riad", img: "https://lh3.googleusercontent.com/aida/AP1WRLs_u_wNEgT__cjFwKALcJaWM9Mf19OK_uXXfrSqRElBW9cKvnWB2Mzb-LWX5DHUV_gk_OXkWZOwSvvVqCNrjT0K4vJHcKdXT0EWGKA5jIqfD0hXH54p0WyDF-8GuqVifiU14ls9kj2wMpE0d2iUZQZ42F2J3nSmkLNDolbJEkHtF-H6OntKaXoOPNGbyYB5Bgx9RxTNQ3EKkM350Mx2z2j0W8qTT8RgWva1XP4oDlc8fi9sWdI-K1j63w" },
  ]

  const secondFeatured = [
    { id: 5, badge: "diamond", extra: "Featured", title: "Apple Watch Ultra 2 (GPS + Cellular, 49mm)", price: "9,200 MAD", condition: "New", location: "Rabat, Agdal", img: "https://lh3.googleusercontent.com/aida/AP1WRLviaZwob5mRh8rXf3MxU5EL8AdDItCecLXbm4CVPMugHymhr_z10O2K-BVMQ1xA1wv5_dDALlyL09ZHXGVm_ikHUHSyuEXduuU-3vfEkHfQwSTyr3spGEdHaUlN38dQMDY7L9dsL57tjsNKuaPWrwXLaam8acF3xCqMSABSi0ArsYsTbGGe0uEJd53A1W1JMfcfHe-9hGHc6gG4Y_gS7ouHr1BFvAslUBD4PFxaBe2KZSTOpAFbIjTgWA" },
    { id: 6, badge: "pro", title: "Samsung Galaxy Watch Ultra 47mm LTE", price: "6,450 MAD", condition: "Open Box", location: "Rabat, Souissi", img: "https://lh3.googleusercontent.com/aida/AP1WRLsRDXBcEtZrQykNLbntaChqw8DjZxueCKsIibeXNsV3Xca4kWwfbDVt138UXimNCKbA9KjOH_HZ885o_D2g24h0j_CJ4S0oSrt4lzvwTrqndPGLA4uYxNrmQRr_FGz2D6mQj7FxUa6T_l-ZltiC3M0o0wyYQfFdKUYsCrBChKfIlLmPWybvi9zkgrD_9tQpFQyxKNKSo7mB51d_Os8fBxpce9B3pP0yLkW_p74sKxXL_Pmj3nHPNSlA" },
    { id: 7, title: "Garmin MARQ Athlete Gen 2 Luxury Tool Watch", price: "18,500 MAD", condition: "Used", location: "Rabat, Hassan", img: "https://lh3.googleusercontent.com/aida/AP1WRLtTh9joY3ndyye45OgPH2XpLTruF6SkoV8JwDa2dofZ_sb37wcT2FwlM_KmmQwb-jy3IU6y7vW061IgPyw-u7ZOVPBcdiaRrD-fYg52Qfn12qaiajRtp4iloZkF3IA0sUJG8cwNV6S0GXMwZ2sY5EcDx_xylb__6BvtlrrUmXAb1QBRLYe-Vz_2f7UK3Jv5C8KmwF0SyUTaXJ11KQHi9EP4ZgbAcOtGkFLY-a0lc4caE9BQuTHrmt9L9Q" },
    { id: 8, title: "Google Pixel Watch 3 - 45mm Obsidian", price: "4,200 MAD", condition: "New", location: "Rabat, Hay Riad", img: "https://lh3.googleusercontent.com/aida/AP1WRLs_u_wNEgT__cjFwKALcJaWM9Mf19OK_uXXfrSqRElBW9cKvnWB2Mzb-LWX5DHUV_gk_OXkWZOwSvvVqCNrjT0K4vJHcKdXT0EWGKA5jIqfD0hXH54p0WyDF-8GuqVifiU14ls9kj2wMpE0d2iUZQZ42F2J3nSmkLNDolbJEkHtF-H6OntKaXoOPNGbyYB5Bgx9RxTNQ3EKkM350Mx2z2j0W8qTT8RgWva1XP4oDlc8fi9sWdI-K1j63w" },
  ]

  const discoveryListings = [
    { id: 9,  condition: "Like New", title: "Audemars Piguet Royal Oak Offshore", location: "Rabat Center",    price: "320,000 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLv8viY-FssyF72RRAxc-_O9vn8_OqZB2HiexgaJA6nkuwXEWW_8pfXHbi7QxhmMKD6WiP3H21mqVBZSUTXbaUtllN4SmV28CAU7zJ86rqbo94MUfCi5-tzFB79fzC9Cyw2Eagg79r7i4jPabEDqkGzAuu9iKeqWgOAOuWtX3yp4AoBRZq4WGCqP-J4YlpwJd7gPi6OLmDY_8ktyGa3PRqpgD_ABw6d5uLM3K9yjCQWflO40obctY_x4" },
    { id: 10, condition: "Excellent", title: "Luxury Chronograph Edition",          location: "Témara",           price: "12,500 MAD",  img: "https://lh3.googleusercontent.com/aida/AP1WRLsZdg91AKwDE3e40SfxT7pExiT-10hogM7D4tNI6X6P2mCQsuV3LvcJqtauTPf7eFj_DTDERmV5ffqHTps0s7Afnp3BudhjFAzFaYQYYLMhBRjow_aQSOU5HTqX7p4qh35UCD_aG8Ln66QI-VSt0_0dxiW_hvlRWW9GEZjNR1aX8V6vP7htq9GIg9XmxnOGyhAqlDBqJ2KrsmPsXt0IV4l5Hmqb3LT_zuTDrQ4ypfT6-3wtpd752Ytnvw" },
    { id: 11, condition: "New",       title: "Designer Premium Watch",              location: "Rabat, Agdal",    price: "4,200 MAD",   img: "https://lh3.googleusercontent.com/aida/AP1WRLtNHae4qet1ojQdTCrUxE66RPZL-I3e_zxgLwu_28mJQpHLNZEOU4GBXEgsdejyjerSaZT0MwGyjn-rMSMwauBd7RiZ3pQO0aydgR_R0lHzc58mQbtCMEKbDlSlLudEts3DDWKGGl2PzQZMCBQUkFRnS4zMVoyAwLHU5ebzY-9xGFM2rjt1SCXznNmZbUlp_6ye2jbp8Dg7yEz4fpJ4SoQamv08e1EjhgNtpwoGpXsG8D43EyFLjfPuMA" },
    { id: 12, condition: "Vintage",   title: "Rolex Daytona Paul Newman",           location: "Salé",            price: "1,200,000 MAD",img: "https://lh3.googleusercontent.com/aida/AP1WRLv8Z3Z2PWFdlBty3FuRLJqE_KcqvVrB2wZd_2BilKjeRUptAVwUZoKBAHQ0YI9mp0DONZfPBEs5r-UCwDsRZdpeaBmpMWV7QHrvMd731MbzShzPnWSyr54o3Ee8TROxdwN_PMclkYLkQ9hwZ5kfmZFiWkkOH8RQC-_yeJ1NhxagThrZXSUUlaqQk5bRFEjgMfvFIr8eMuKBZiOOy4FHIfJXqJEugOR8kO4s3nkrb4iELZ1UaZKIXscsSQ" },
    { id: 13, condition: "New",       title: "Richard Mille RM 11-03 McLaren",      location: "Rabat, Hassan",   price: "2,450,000 MAD",img: "https://lh3.googleusercontent.com/aida/AP1WRLuEjxF5RQD703_mU0BJemV-ZUVXTAs4AWfpzDQQsD3Pd_qYZ_xuS_99QwlFdCjrekGwvVIrcoFJdmxTJrt-I7FIALdzp-F7w1dmDaZdMA3g9tA2ilCZDqe-QHyfTkgm8y9VL8Byd2iJMawKWZc5SkuR6H0LXH6SN-9AfFfL7NOYncU-Y7XU6L149GASrz9N8uSUHEruTevZ0Rb9nsGa24lFrbWBy0664JLv4K1t4IXGD3mHqY0o0BoyVA" },
    { id: 14, condition: "New",       title: "Insta360 X4 Action Cam",              location: "Rabat, Souissi",  price: "5,800 MAD",   img: "https://lh3.googleusercontent.com/aida/AP1WRLsCZ5zgDm5FT9KsInC1tc8ECg9QuzNraMnqLKhYk-ap5io33kusUBnanp4Re7aARqcqfcL6oNqYO_x2YeJ3BnbcZ1g71v-QHvwIfSYqKT75deLHzt2BCz32levkm8Kfjzjgi9E8CyvaV_ccVZGo__9y3yPRs9bBD6nY2nnlBrCG2yZ5XzleRt8acHpdbAgEuOWH7MMXCOfBagwtb5ZUcVOmkoM5IN-vfsPp-XaiWk2rlYG3cZhUlGpABA" },
    { id: 15, condition: "New",       title: "Hi-Fi Studio Headphones",             location: "Rabat, Hay Riad", price: "3,800 MAD",   img: "https://lh3.googleusercontent.com/aida/AP1WRLtoIxuCRjAaxOJpjqJKZIKRBZ2AEL0z9iyoVJlOQDY2q9BD1LC_9bLtGoagumoaGVTVZxpWl97Zf4RXswDy5sGJ9KPWuS6jD2A7G9--wXt-z1SJfmSUWl0njKZxnP64YhgN0NnXBd33k43cWa_tX-_CuUFR11GUq-jesYSOFOAHQ2NcinDrUM2qRp_6M9OafbAaK8MkYoxfndipIT2UDzfPDZAodjnOXyfwtMaiDAdnAGkS1qNh-rLfKA" },
    { id: 16, condition: "New",       title: "Bulgari Serpenti Seduttori",          location: "Rabat Center",    price: "185,000 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLs_u_wNEgT__cjFwKALcJaWM9Mf19OK_uXXfrSqRElBW9cKvnWB2Mzb-LWX5DHUV_gk_OXkWZOwSvvVqCNrjT0K4vJHcKdXT0EWGKA5jIqfD0hXH54p0WyDF-8GuqVifiU14ls9kj2wMpE0d2iUZQZ42F2J3nSmkLNDolbJEkHtF-H6OntKaXoOPNGbyYB5Bgx9RxTNQ3EKkM350Mx2z2j0W8qTT8RgWva1XP4oDlc8fi9sWdI-K1j63w" },
    { id: 17, condition: "Like New",  title: "Suunto Race Titanium",                location: "Salé Marina",     price: "5,200 MAD",   img: "https://lh3.googleusercontent.com/aida/AP1WRLuhGsjOXNcMQvhbKiXFggmAAfCNmw6zYawXH4ivE5qh7ZPpa_upLYn_CiQ4qumCWyWOr9SBMhiPGnM_rLk-casLg_qh1EQbaUbXuRCXGk_Pzyln7UVXZE6O0FrGititkAtwjw88eniULC4Cb7fUdMX0rpuVC7_Le80PZevv9dojSRF8Lesc1fUffrmfGQ3_NU4Q_PJDTRfW5SRCnFnmKBsYht_f9U8FEqHN7M_blDxz56eew-p4VM-nZw" },
    { id: 18, condition: "New",       title: "Whoop 4.0 + 12m Subscription",        location: "Rabat, Agdal",    price: "2,500 MAD",   img: "https://lh3.googleusercontent.com/aida/AP1WRLviaZwob5mRh8rXf3MxU5EL8AdDItCecLXbm4CVPMugHymhr_z10O2K-BVMQ1xA1wv5_dDALlyL09ZHXGVm_ikHUHSyuEXduuU-3vfEkHfQwSTyr3spGEdHaUlN38dQMDY7L9dsL57tjsNKuaPWrwXLaam8acF3xCqMSABSi0ArsYsTbGGe0uEJd53A1W1JMfcfHe-9hGHc6gG4Y_gS7ouHr1BFvAslUBD4PFxaBe2KZSTOpAFbIjTgWA" },
    { id: 19, condition: "Excellent", title: "Garmin Epix Gen 2 Pro",               location: "Témara",           price: "8,900 MAD",   img: "https://lh3.googleusercontent.com/aida/AP1WRLtTh9joY3ndyye45OgPH2XpLTruF6SkoV8JwDa2dofZ_sb37wcT2FwlM_KmmQwb-jy3IU6y7vW061IgPyw-u7ZOVPBcdiaRrD-fYg52Qfn12qaiajRtp4iloZkF3IA0sUJG8cwNV6S0GXMwZ2sY5EcDx_xylb__6BvtlrrUmXAb1QBRLYe-Vz_2f7UK3Jv5C8KmwF0SyUTaXJ11KQHi9EP4ZgbAcOtGkFLY-a0lc4caE9BQuTHrmt9L9Q" },
    { id: 20, condition: "Like New",  title: "Tag Heuer Connected Calibre E4",      location: "Rabat, Souissi",  price: "22,000 MAD",  img: "https://lh3.googleusercontent.com/aida/AP1WRLsLQF2_18UKGqhsx0LFUyMaWis105j1U2VtnQ7e-AfTx9Jcz_XqSuEIOFnkcsjlTckBzamt_0OLf1dzhF3cbrNWiQRAXAUihD8bg0FexPAsLD15pqol5ELtoY24eiCbPL-hlCZZS0VPCkXQ6qbab6rQaPok5jldPZkIPHaI8oWVLflUVbSRi-DZYG58P6la-66uSxDxPcZl90pgQSM2vT9TfvC1WNdVGEacEGLX2k971SK54vnYyAYjiA" },
  ]

  const brands = ["Apple","Samsung","Garmin","Huawei","Fitbit","Xiaomi","Google","Amazfit"]

  const FeaturedBadge = ({ badge }: { badge?: string }) => {
    if (badge === "diamond") return <span style={{ background:"#2dd4bf", color:"white", fontSize:"10px", fontWeight:900, padding:"4px 10px", borderRadius:"9999px", display:"flex", alignItems:"center", gap:"4px", textTransform:"uppercase" }}>◆ DIAMOND MEMBER</span>
    if (badge === "pro") return <span style={{ background:"#62fae3", color:"#00201c", fontSize:"10px", fontWeight:700, padding:"4px 10px", borderRadius:"9999px", display:"flex", alignItems:"center", gap:"4px" }}>✓ PRO SELLER</span>
    if (badge === "verified") return <span style={{ background:"#dde4e1", color:"#3c4a46", fontSize:"10px", fontWeight:700, padding:"4px 10px", borderRadius:"9999px", display:"flex", alignItems:"center", gap:"4px" }}>✓ VERIFIED</span>
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
        .card{transition:transform .3s;}.card:hover{transform:translateY(-4px);}
        .img-zoom img{transition:transform .5s;}.img-zoom:hover img{transform:scale(1.1);}
        .img-zoom2 img{transition:transform .5s;}.img-zoom2:hover img{transform:scale(1.05);}
      `}</style>

      {/* HERO */}
      <section style={{ position:"relative", height:"400px", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0 }}>
          <img src="https://lh3.googleusercontent.com/aida/AP1WRLuhGsjOXNcMQvhbKiXFggmAAfCNmw6zYawXH4ivE5qh7ZPpa_upLYn_CiQ4qumCWyWOr9SBMhiPGnM_rLk-casLg_qh1EQbaUbXuRCXGk_Pzyln7UVXZE6O0FrGititkAtwjw88eniULC4Cb7fUdMX0rpuVC7_Le80PZevv9dojSRF8Lesc1fUffrmfGQ3_NU4Q_PJDTRfW5SRCnFnmKBsYht_f9U8FEqHN7M_blDxz56eew-p4VM-nZw" alt="" style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.6 }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,transparent,rgba(244,251,248,.4),#f4fbf8)" }}></div>
        </div>
        <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:"896px", margin:"0 auto", padding:"0 20px", display:"flex", flexDirection:"column", alignItems:"center" }}>
          <h1 style={{ fontSize:"48px", fontWeight:900, color:"white", marginBottom:"32px", textAlign:"center", lineHeight:1.1, letterSpacing:"-0.02em", textShadow:"0 2px 8px rgba(0,0,0,.3)" }}>Discover Your Best Wearable in Rabat</h1>
          <div style={{ width:"100%", display:"flex", gap:"8px", padding:"8px", borderRadius:"3rem", background:"rgba(255,255,255,.1)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,.3)" }}>
            <div style={{ flex:1, display:"flex", alignItems:"center", borderRadius:"9999px", padding:"12px 20px", background:"rgba(244,251,248,.5)" }}>
              <span className="ms" style={{ color:"#3c4a46", marginRight:"12px" }}>search</span>
              <input style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:"16px" }} placeholder="Search for Apple Watch, Garmin, Galaxy Watch..." />
            </div>
            <div style={{ flex:1, display:"flex", alignItems:"center", borderRadius:"9999px", padding:"12px 20px", background:"rgba(244,251,248,.5)" }}>
              <span className="ms" style={{ color:"#3c4a46", marginRight:"12px" }}>location_on</span>
              <select style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:"16px", appearance:"none" }}>
                <option>Rabat</option><option>Casablanca</option>
              </select>
            </div>
            <button style={{ background:"#2dd4bf", color:"white", border:"none", borderRadius:"9999px", padding:"0 40px", fontWeight:700, fontSize:"15px", cursor:"pointer", display:"flex", alignItems:"center", gap:"8px" }}>
              <span className="ms">manage_search</span> Search
            </button>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div style={{ maxWidth:"1440px", margin:"-40px auto 32px", padding:"0 40px", position:"relative", zIndex:20 }}>
        <div style={{ display:"flex", alignItems:"center", padding:"6px", borderRadius:"9999px", background:"rgba(255,255,255,.85)", backdropFilter:"blur(12px)", border:"1px solid rgba(186,202,197,.3)", boxShadow:"0 4px 24px rgba(0,0,0,.08)" }}>
          {[["CITY","Rabat"],["CONDITION","Select"],["PRICE (MAD)","Select"],["FILTERS","All Filters"]].map(([label,val],i)=>(
            <div key={label} style={{ flex:1, padding:"8px 16px", borderRight:i<3?"1px solid rgba(186,202,197,.2)":"none", cursor:"pointer" }}>
              <div style={{ fontSize:"10px", fontWeight:700, color:"#3c4a46", textTransform:"uppercase", letterSpacing:".1em" }}>{label}</div>
              <div style={{ fontSize:"16px", fontWeight:500, color:"#161d1b", display:"flex", alignItems:"center", gap:"4px" }}>{val}<span className="ms" style={{ fontSize:"18px", color:"#3c4a46" }}>{label==="FILTERS"?"tune":"expand_more"}</span></div>
            </div>
          ))}
          <div style={{ flex:2, padding:"8px 16px", borderRight:"1px solid rgba(186,202,197,.2)" }}>
            <div style={{ fontSize:"10px", fontWeight:700, color:"#3c4a46", textTransform:"uppercase", letterSpacing:".1em" }}>KEYWORD</div>
            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <input style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:"16px" }} placeholder="Ultra 2, Garmin, Watch 7..." />
              <span className="ms" style={{ color:"#2dd4bf" }}>search</span>
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
          <span style={{ fontWeight:700, color:"#161d1b" }}>Wearables</span>
        </nav>
      </div>

      {/* TITLE + CONTROLS */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 32px", padding:"0 40px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"16px" }}>
          <div>
            <h1 style={{ fontSize:"24px", fontWeight:700, color:"#161d1b", marginBottom:"4px" }}>New and Used Wearable &amp; Smart Watches in Rabat</h1>
            <p style={{ fontSize:"16px", color:"#3c4a46" }}>2,415 Ads in Rabat District</p>
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
        <div className="no-scroll" style={{ display:"flex", gap:"12px", overflowX:"auto", padding:"16px 0", marginBottom:"8px" }}>
          <button style={{ whiteSpace:"nowrap", padding:"10px 24px", borderRadius:"9999px", background:"#2dd4bf", color:"white", fontSize:"13px", fontWeight:700, border:"none", cursor:"pointer" }}>All Brands</button>
          {brands.map(b=><button key={b} style={{ whiteSpace:"nowrap", padding:"10px 24px", borderRadius:"9999px", background:"#e8efec", border:"1px solid rgba(186,202,197,.3)", fontSize:"13px", fontWeight:700, cursor:"pointer" }}>{b}</button>)}
          <button style={{ whiteSpace:"nowrap", padding:"10px 16px", color:"#2dd4bf", fontWeight:700, fontSize:"13px", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:"4px" }}>View More <span className="ms">expand_more</span></button>
        </div>

        {/* UTILITY LINES */}
        <div style={{ paddingTop:"16px", borderTop:"1px solid rgba(186,202,197,.2)", display:"flex", flexDirection:"column", gap:"24px" }}>
          <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"16px" }}>
            <span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"13px", fontWeight:700, color:"#2dd4bf", background:"rgba(45,212,191,.15)", padding:"4px 12px", borderRadius:"9999px" }}><span className="ms" style={{ fontSize:"16px" }}>bolt</span> New Arrivals</span>
            <span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"13px", fontWeight:700, color:"#605e58", background:"rgba(96,94,88,.1)", padding:"4px 12px", borderRadius:"9999px" }}><span className="ms" style={{ fontSize:"16px" }}>trending_down</span> Price Drop Alert</span>
            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <span style={{ fontSize:"13px", fontWeight:600, color:"#3c4a46" }}>Show Diamond Verified First</span>
              <div style={{ width:"36px", height:"20px", background:"#2dd4bf", borderRadius:"9999px", display:"flex", alignItems:"center", padding:"0 3px", cursor:"pointer", justifyContent:"flex-end" }}>
                <div style={{ width:"14px", height:"14px", background:"white", borderRadius:"9999px" }}></div>
              </div>
            </div>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"12px" }}>
            <button style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 20px", borderRadius:"9999px", background:"rgba(45,212,191,.15)", border:"1px solid rgba(0,107,95,.2)", fontSize:"13px", fontWeight:700, color:"#005047", cursor:"pointer" }}><span className="ms" style={{ fontSize:"18px" }}>groups</span> All Sellers (2,415)</button>
            <button style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 20px", borderRadius:"9999px", background:"#e8efec", border:"1px solid rgba(186,202,197,.3)", fontSize:"13px", fontWeight:700, cursor:"pointer" }}><span className="ms" style={{ fontSize:"18px" }}>person</span> SouKni Members (1,510)</button>
            <button style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 20px", borderRadius:"9999px", background:"#e8efec", border:"1px solid rgba(186,202,197,.3)", fontSize:"13px", fontWeight:700, cursor:"pointer" }}><span className="ms" style={{ fontSize:"18px" }}>verified_user</span> SouKni Pro (905)</button>
            <div style={{ marginLeft:"auto", display:"flex", gap:"12px" }}>
              <button style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 20px", borderRadius:"9999px", background:"#eef5f2", border:"1px solid rgba(186,202,197,.3)", fontSize:"13px", fontWeight:700, cursor:"pointer" }}><span className="ms" style={{ fontSize:"18px" }}>sort</span> Sort: Featured</button>
              <button style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 20px", borderRadius:"9999px", background:"#eef5f2", border:"1px solid rgba(186,202,197,.3)", fontSize:"13px", fontWeight:700, cursor:"pointer" }}><span className="ms" style={{ fontSize:"18px" }}>notifications_active</span> Save Search</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:"1440px", margin:"0 auto", padding:"0 40px" }}>

        {/* SECTION 1: Featured Premium Smart Watches */}
        <div style={{ marginBottom:"48px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
            <h2 style={{ fontSize:"24px", fontWeight:700, color:"#2dd4bf" }}>Featured Premium Smart Watches</h2>
            <a href="#" style={{ display:"flex", alignItems:"center", gap:"4px", color:"#2dd4bf", fontWeight:700, fontSize:"13px", textDecoration:"none" }}>View all Featured <span className="ms" style={{ fontSize:"18px" }}>chevron_right</span></a>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px" }}>
            {featuredListings.map(item=>(
              <article key={item.id} className="card glass img-zoom" style={{ borderRadius:"2.5rem", overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 4px 24px rgba(0,0,0,.08)", border:"1px solid rgba(186,202,197,.5)" }}>
                <div style={{ position:"relative", aspectRatio:"4/5", overflow:"hidden", background:"#d4dcd9" }}>
                  <div style={{ position:"absolute", top:"12px", left:"12px", zIndex:10 }}>
                    <FeaturedBadge badge={item.badge} />
                  </div>
                  <button style={{ position:"absolute", top:"12px", right:"12px", zIndex:10, width:"40px", height:"40px", borderRadius:"9999px", background:"rgba(255,255,255,.8)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span className="ms" style={{ fontSize:"20px" }}>favorite</span>
                  </button>
                  <img src={item.img} alt={item.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
                <div style={{ padding:"20px", display:"flex", flexDirection:"column", flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" }}>
                    <span style={{ fontSize:"13px", fontWeight:700, color: item.condition==="New"||item.condition==="Open Box" ? "#2dd4bf" : "#605e58" }}>{item.condition}</span>
                    <span style={{ width:"4px", height:"4px", background:"#6b7a76", borderRadius:"9999px" }}></span>
                    <span style={{ fontSize:"13px", color:"#3c4a46" }}>{item.location}</span>
                  </div>
                  <h3 style={{ fontSize:"18px", fontWeight:700, color:"#161d1b", marginBottom:"8px", lineHeight:1.3 }}>{item.title}</h3>
                  <p style={{ fontSize:"22px", fontWeight:900, color:"#2dd4bf", marginBottom:"16px" }}>{item.price}</p>
                  <div style={{ marginTop:"auto", paddingTop:"16px", borderTop:"1px solid rgba(186,202,197,.15)", display:"flex", gap:"8px" }}>
                    <button style={{ flex:1, padding:"10px", borderRadius:"12px", background:"#e8efec", border:"none", fontSize:"13px", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px" }}><span className="ms" style={{ fontSize:"18px" }}>chat_bubble</span> Message</button>
                    <button style={{ flex:1, padding:"10px", borderRadius:"12px", background:"rgba(37,211,102,.1)", color:"#25D366", border:"none", fontSize:"13px", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px" }}><span className="ms" style={{ fontSize:"18px" }}>call</span> WhatsApp</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* SECTION 2: Second Featured Grid (4/5 portrait) */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"64px" }}>
          {secondFeatured.map(item=>(
            <article key={item.id} className="card glass img-zoom" style={{ borderRadius:"2.5rem", overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 4px 24px rgba(0,0,0,.08)", border:"1px solid rgba(186,202,197,.5)" }}>
              <div style={{ position:"relative", aspectRatio:"4/5", overflow:"hidden", background:"#d4dcd9" }}>
                <div style={{ position:"absolute", top:"12px", left:"12px", zIndex:10, display:"flex", flexDirection:"column", gap:"8px" }}>
                  <FeaturedBadge badge={item.badge} />
                  {item.extra && <span style={{ background:"rgba(255,255,255,.9)", color:"#2dd4bf", fontSize:"10px", fontWeight:900, padding:"4px 10px", borderRadius:"9999px", textTransform:"uppercase", border:"1px solid rgba(0,107,95,.2)" }}>{item.extra}</span>}
                </div>
                <button style={{ position:"absolute", top:"12px", right:"12px", zIndex:10, width:"40px", height:"40px", borderRadius:"9999px", background:"rgba(255,255,255,.8)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span className="ms" style={{ fontSize:"20px" }}>favorite</span>
                </button>
                <img src={item.img} alt={item.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              </div>
              <div style={{ padding:"20px", display:"flex", flexDirection:"column", flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" }}>
                  <span style={{ fontSize:"13px", fontWeight:700, color: item.condition==="New"||item.condition==="Open Box" ? "#2dd4bf" : "#605e58" }}>{item.condition}</span>
                  <span style={{ width:"4px", height:"4px", background:"#6b7a76", borderRadius:"9999px" }}></span>
                  <span style={{ fontSize:"13px", color:"#3c4a46" }}>{item.location}</span>
                </div>
                <h3 style={{ fontSize:"18px", fontWeight:700, color:"#161d1b", marginBottom:"8px", lineHeight:1.3 }}>{item.title}</h3>
                <p style={{ fontSize:"22px", fontWeight:900, color:"#2dd4bf", marginBottom:"16px" }}>{item.price}</p>
                <div style={{ marginTop:"auto", paddingTop:"16px", borderTop:"1px solid rgba(186,202,197,.15)", display:"flex", gap:"8px" }}>
                  <button style={{ flex:1, padding:"10px", borderRadius:"12px", background:"#e8efec", border:"none", fontSize:"13px", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px" }}><span className="ms" style={{ fontSize:"18px" }}>chat_bubble</span> Message</button>
                  <button style={{ flex:1, padding:"10px", borderRadius:"12px", background:"rgba(37,211,102,.1)", color:"#25D366", border:"none", fontSize:"13px", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px" }}><span className="ms" style={{ fontSize:"18px" }}>call</span> WhatsApp</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* INTERSTITIAL */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"64px" }}>
          <div style={{ borderRadius:"2.5rem", padding:"40px", minHeight:"300px", display:"flex", flexDirection:"column", justifyContent:"center", background:"#2dd4bf", color:"white", boxShadow:"0 8px 32px rgba(0,107,95,.3)" }}>
            <h2 style={{ fontSize:"36px", fontWeight:900, marginBottom:"16px", lineHeight:1.2 }}>Join the SouKni Family</h2>
            <p style={{ fontSize:"18px", marginBottom:"32px", opacity:.9, lineHeight:1.6 }}>Start selling your tech items today for free and reach millions of buyers in Morocco.</p>
            <button style={{ background:"white", color:"#2dd4bf", padding:"16px 32px", borderRadius:"9999px", fontWeight:900, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", width:"fit-content" }}>Register as Individual</button>
          </div>
          <div style={{ borderRadius:"2.5rem", padding:"40px", minHeight:"300px", display:"flex", flexDirection:"column", justifyContent:"center", background:"#dde4e1", border:"2px solid rgba(0,107,95,.2)", boxShadow:"0 8px 32px rgba(0,0,0,.06)", position:"relative", overflow:"hidden" }}>
            <img src="https://lh3.googleusercontent.com/aida/AP1WRLs6vA9JUk-n5aYcYY4y-FsLQ-92HQvT5nMWbOb4-QajHPXrubhe3T0PlrUHu4fXupoL1nlUjt3DPcr1szHmiZOymL8wECExfmSYd6W-qHM4GdVSBzE_0t8SyvKnc2s8jFX-R0A7Vzvp-fFMFv-DpmZGK918lYKcvWHlPjYax-pWFyVlrtdAGSAjyHKVq8CojC2icjzOe3Ut1XzO18zGmi-ucOnViUNmYfSD-_Jh1CZZvP3YsmT7t391" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.2 }} />
            <div style={{ position:"relative", zIndex:1 }}>
              <p style={{ fontSize:"12px", fontWeight:900, color:"#2dd4bf", textTransform:"uppercase", letterSpacing:".2em", marginBottom:"16px" }}>Solutions for agents</p>
              <h2 style={{ fontSize:"36px", fontWeight:900, color:"#161d1b", marginBottom:"16px", lineHeight:1.2 }}>SouKni Immo Pro</h2>
              <p style={{ fontSize:"18px", color:"#3c4a46", marginBottom:"32px", lineHeight:1.6 }}>Boost your real estate agency visibility with our premium listing dashboard and analytics.</p>
              <button style={{ background:"#2dd4bf", color:"white", padding:"16px 32px", borderRadius:"9999px", fontWeight:900, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", width:"fit-content" }}>Discover Pro Tools</button>
            </div>
          </div>
        </div>

        {/* DISCOVERY GRID — square */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"64px" }}>
          {discoveryListings.map(item=>(
            <article key={item.id} className="card glass img-zoom2" style={{ borderRadius:"2.5rem", overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 2px 12px rgba(0,0,0,.06)", border:"1px solid rgba(186,202,197,.5)" }}>
              <div style={{ position:"relative", aspectRatio:"1/1", overflow:"hidden", background:"#d4dcd9" }}>
                <img src={item.img} alt={item.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                <div style={{ position:"absolute", bottom:"8px", left:"8px", background:"rgba(255,255,255,.85)", backdropFilter:"blur(4px)", padding:"2px 8px", borderRadius:"6px", fontSize:"10px", fontWeight:700, color:"#2dd4bf", textTransform:"uppercase" }}>{item.condition}</div>
                <button style={{ position:"absolute", top:"8px", right:"8px", width:"32px", height:"32px", borderRadius:"9999px", background:"rgba(255,255,255,.85)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span className="ms" style={{ fontSize:"18px" }}>favorite</span>
                </button>
              </div>
              <div style={{ padding:"20px", display:"flex", flexDirection:"column", flex:1 }}>
                <h4 style={{ fontSize:"16px", fontWeight:700, color:"#161d1b", marginBottom:"4px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.title}</h4>
                <p style={{ fontSize:"13px", color:"#3c4a46", marginBottom:"12px" }}>{item.location}</p>
                <p style={{ fontSize:"18px", fontWeight:900, color:"#2dd4bf", marginBottom:"12px" }}>{item.price}</p>
                <div style={{ marginTop:"auto", display:"flex", gap:"8px" }}>
                  <button style={{ flex:1, padding:"8px", borderRadius:"12px", border:"1px solid rgba(186,202,197,.5)", background:"none", fontSize:"12px", fontWeight:700, cursor:"pointer" }}>Message</button>
                  <button style={{ flex:1, padding:"8px", borderRadius:"12px", background:"rgba(0,107,95,.1)", color:"#2dd4bf", border:"none", fontSize:"12px", fontWeight:700, cursor:"pointer" }}>Call</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* PAGINATION */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", marginBottom:"64px" }}>
          {["chevron_left","1","2","3","...","21","chevron_right"].map((p,i)=>(
            <button key={i} style={{ width:"40px", height:"40px", borderRadius:"9999px", border:p==="1"?"none":"1px solid rgba(186,202,197,.3)", background:p==="1"?"#2dd4bf":"none", color:p==="1"?"white":"#161d1b", fontWeight:700, fontSize:"14px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {p==="chevron_left"||p==="chevron_right"?<span className="ms">{p}</span>:p}
            </button>
          ))}
        </div>

        {/* DIAMOND BANNER */}
        <div style={{ borderRadius:"2.5rem", padding:"48px", textAlign:"center", color:"white", marginBottom:"16px", background:"linear-gradient(135deg,#2dd4bf 0%,#2dd4bf 100%)", boxShadow:"0 8px 40px rgba(0,107,95,.3)", position:"relative", overflow:"hidden" }}>
          <img src="https://lh3.googleusercontent.com/aida/AP1WRLu4en38XfBWOH4KcwnR_rbO70i78dYWigs2LJumqb6g3mdqwzouaOdsE7k2RcP71FpINyDQHgmJJQr6o9q7DGYfvsedFXCZRdHG0rBdiCKqWLhF1XIiNTyngLggmfT60Du9gwVQ48zxy4ZbE_y1CX5RIIi_NPP_ew1b02a1K5XDfwXQOy1zrUJwSIjj2ntZ-RY195aEu8dXIQp7GBVrShGEt1RWdGNJtfPim7Pm_DnwOXO0-KGadFDKyw" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.2 }} />
          <div style={{ position:"relative", zIndex:1 }}>
            <h2 style={{ fontSize:"40px", fontWeight:900, marginBottom:"16px", letterSpacing:"-0.02em" }}>Become a Diamond Member</h2>
            <p style={{ fontSize:"18px", opacity:.9, maxWidth:"600px", margin:"0 auto 32px", lineHeight:1.6 }}>Enjoy zero listing fees, unlimited highlighted ads, and a dedicated account manager for your tech business.</p>
            <button style={{ background:"white", color:"#2dd4bf", padding:"16px 40px", borderRadius:"9999px", fontWeight:900, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", letterSpacing:".1em" }}>Upgrade to Diamond</button>
          </div>
        </div>

        {/* ELECTRO PRO BANNER */}
        <div style={{ position:"relative", height:"320px", borderRadius:"2.5rem", overflow:"hidden", marginBottom:"64px", boxShadow:"0 8px 32px rgba(0,0,0,.15)" }}>
          <img src="https://lh3.googleusercontent.com/aida/AP1WRLsLQF2_18UKGqhsx0LFUyMaWis105j1U2VtnQ7e-AfTx9Jcz_XqSuEIOFnkcsjlTckBzamt_0OLf1dzhF3cbrNWiQRAXAUihD8bg0FexPAsLD15pqol5ELtoY24eiCbPL-hlCZZS0VPCkXQ6qbab6rQaPok5jldPZkIPHaI8oWVLflUVbSRi-DZYG58P6la-66uSxDxPcZl90pgQSM2vT9TfvC1WNdVGEacEGLX2k971SK54vnYyAYjiA" alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(0,0,0,.75),rgba(0,0,0,.4),transparent)" }}></div>
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 64px" }}>
            <div>
              <p style={{ color:"#3cddc7", fontWeight:900, fontSize:"12px", textTransform:"uppercase", letterSpacing:".2em", marginBottom:"16px" }}>Premier Partnership</p>
              <h2 style={{ color:"white", fontSize:"48px", fontWeight:900, marginBottom:"8px", lineHeight:1.1, letterSpacing:"-0.02em" }}>SouKni Electro Pro</h2>
              <p style={{ color:"rgba(255,255,255,.9)", fontSize:"18px", lineHeight:1.6 }}>The Gold Standard for Premium Electronics & Tech Solutions in Rabat.</p>
            </div>
            <button style={{ background:"#2dd4bf", color:"#2dd4bf", padding:"16px 40px", borderRadius:"9999px", fontWeight:700, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", whiteSpace:"nowrap" }}>Discover Pro Benefits</button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
    </div>
  )
}
