export default function LaptopsPage() {

  const featuredListings = [
    { id: 1, badge: "diamond", badgeLabel: "DIAMOND MEMBER", extraBadge: "Featured", title: 'MacBook Pro M4 Max 16" (Space Black) 64GB RAM', price: "45,000 MAD", condition: "New", location: "Rabat, Agdal", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWyyzkjA-WIDksnDe_pPQg391Bpov59DjNGmhAIG64GEfcAwCoJ0fwmVpK5ZUytBr5IsqZB1nLbhl4q4Cyr3jM_hWg8qImDX4L1vRc06IOIbxBaZWolCNHJAXwNLRxOSG7IGVhtfgPiJl4djNGDysC3PgCwd3hVklX0rydiHpH-UT4FmBVi6oOth0udPgquygjRMySMsMm2sSnlJ7g3I8HfPYVsK_xwm7YIVY34jbVuCT5n9VKkzaHJ-Zzzdy2DRAuP4tfBOQmJA" },
    { id: 2, badge: "pro", badgeLabel: "PRO SELLER", title: "Razer Blade 16 (2024) RTX 4090 OLED 240Hz", price: "38,000 MAD", condition: "New", location: "Rabat, Souissi", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTZe0a0Y2B6gO2OCdZypdIBK-X3l1rkXAJDRlg_Cda4Z0XRI3M-gOJV07rfD7UgwWzI_QVZAXzuJvYIkSlERsLxzl976NWpsBJ1BP8Ga-H4i5QprWMf4LALqlzgEnXhjL66H9HdkyPfT8WhCeD56XfR0oMJ7fpDykpZjacycQAGZMjKI64VASkpnCyAb-UqJHa-DZjPDDLKLfE_JOW564q7lovIA5BB86FafW3Ms0G7xGbHPsdaoeNusBSo0VqnLBdmN9k3Z3rvQ" },
    { id: 3, title: "ASUS ROG Zephyrus G16 (2024) Core Ultra 9", price: "28,500 MAD", condition: "Like New", location: "Rabat, Hassan", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUidOIQQ-WwSTOAMyq-Q7lO0nBCGoHiBwLfrGwr8cHKrn-A4mrKkRGw4e0pwFT1_PkEXkE9trGXz6J_iByn3hr7hxx4_6tv2ZeZA1oZ2Lqu4aMF7ZfT2C48V1T2Ia5V8hCcWeNdkmW2QPtiahZe9tBX5L-8xdsiKVd1-tYceJVwGU1kVfQPoZQUvAHOKHSefUBYLBI0iLTwEhXkrxEYkxU-KIG56wGyXTUPx8loO_ZxxO9---Wf7uPnlISfXfO5XjFvCWm5MjlUQ" },
    { id: 4, title: 'Dell XPS 15 (9530) i9-13900H 32GB 1TB', price: "24,000 MAD", condition: "New", location: "Rabat, Hay Riad", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAH4bPloi5wbJ210Ya2_4Zc5d-4PIhu1mZg1V9Y0UOxHnWD9bZRfbENJRP7F9ZRJPCnVsleFMDeERz94JGtG05uWSrlvYgdEKBGzcQqILgu3iikv422cZUnCf9kekywFdLhv7WE7QiHSpbFxEH6lnzjSHKh9JiPEhEgT9jylUhPZXZBOkoPABJUEzAJRb4v4aevowUkP6IVj3fbTn81iVIhSb0eJ8jR8V_y26VuK4rykYP_KtDTW3fj42-0lg1L3rT26By46nv9nw" },
  ]

  const discoveryListings = [
    { id: 5, title: 'HP Spectre x360 14" OLED Touch', price: "18,500 MAD", condition: "New", location: "Rabat, Agdal", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTrII4q98va28OgS53T2xlrN0AZgCdOj3WG2JDKVBeUjC1ZgduYK_TKRPAkGrrQE2E4ZJX5AVE53eFSqDNBOWoyLiyRTv7QX2mxQzfJwhq6xdDVnYVI5IgPOvXMOavndcl14Z5p-Tf3TLpJe-mW6UfQ4BSXpPl87x_E3agdvI9sNOAiOr7FspioA4j1EDoa33xoAzfzr_yaSSCIY4xrZDIPcyGpN8s8qNKh_XloXXRtuXP6ETtt3-gsEakso24HtCGBTlguIvXYQ" },
    { id: 6, title: "ThinkPad X1 Carbon Gen 12", price: "19,800 MAD", condition: "Excellent", location: "Rabat Center", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwtetkbnJCAOxdOxY_8_9xDGcTJcXTT4wXu5WRQh44ugt9zcCLuhSJ_e_f8yRpUBaQBcZAIYjkGaHb_4OWBUgN-6P-I2VBIdTqd1qeCO8TXFOBkRD46nUmRvF1lsydM6D4mwYDYf9BlFdR6-m2fiG1uEPqEKitevqTLkuu_dkO0MQfDZvQX5dy6FmM2aZ5A-_MX9z03WxLXtFz9DD07bXfe3LcdB9t2XGolr8K3V5roMoz-d_8xhIzKkcmw5i5sHbLMXIx0TWxqg" },
    { id: 7, title: "Microsoft Surface Laptop 7", price: "16,500 MAD", condition: "New", location: "Rabat, Souissi", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoc_ff0me1FKtQnUGffdocZNx_6FqP7fsklG4OTQMwQv6RubDA-Zv6_D7lMcr7uDeSDLlVrQP3JntvKm_fBHOa2NlROQMIHTxrEbL-94y25VwEoYMjUQZtf6XR-PiMOc--UBw51DShoMYG3eKgpOy0mWJqXLi_zRcQIxjB7bJIT50fECgLVT-MuhlSwwMfEAOJtQYOD3y5r62_5MWU-itgsoKPnYT7RL8vTkigTWY_HmCdvQzvv6VLYAN5ZvEyulKpciav9NzGvA" },
    { id: 8, title: "MSI Titan 18 HX Core i9", price: "55,000 MAD", condition: "New", location: "Sale Marina", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCP-4VEIG65LymEfed6YxNN0Nwkq20Qh7-aajtypSRRQG_hQNCOr8w4rLbnmtlrD16Ma3yqsd4EFwgCHbPIwuG0X-vSjZOBRCiOKPGc_tpsnTdOEynd1BbUVVnrSSG4zOneMpfHKjqoauKLHwLGvZHBRzIWf2uq92kt5eHLpPtfEWPKJLrneprb4qVLZsY-JnJqAAqX1-8l5BLDnukaO_O_RD38RbLTYiML1LQYXRfcDgf-Wx5iPbmri3t7lE1q6VvbCh8xCQPDdQ" },
    { id: 9, title: 'MacBook Pro 14" M3 Pro', price: "21,000 MAD", condition: "Used", location: "Rabat, Hassan", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWyyzkjA-WIDksnDe_pPQg391Bpov59DjNGmhAIG64GEfcAwCoJ0fwmVpK5ZUytBr5IsqZB1nLbhl4q4Cyr3jM_hWg8qImDX4L1vRc06IOIbxBaZWolCNHJAXwNLRxOSG7IGVhtfgPiJl4djNGDysC3PgCwd3hVklX0rydiHpH-UT4FmBVi6oOth0udPgquygjRMySMsMm2sSnlJ7g3I8HfPYVsK_xwm7YIVY34jbVuCT5n9VKkzaHJ-Zzzdy2DRAuP4tfBOQmJA" },
    { id: 10, title: 'HP Envy 16" RTX 4060', price: "14,200 MAD", condition: "Open Box", location: "Temara", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTrII4q98va28OgS53T2xlrN0AZgCdOj3WG2JDKVBeUjC1ZgduYK_TKRPAkGrrQE2E4ZJX5AVE53eFSqDNBOWoyLiyRTv7QX2mxQzfJwhq6xdDVnYVI5IgPOvXMOavndcl14Z5p-Tf3TLpJe-mW6UfQ4BSXpPl87x_E3agdvI9sNOAiOr7FspioA4j1EDoa33xoAzfzr_yaSSCIY4xrZDIPcyGpN8s8qNKh_XloXXRtuXP6ETtt3-gsEakso24HtCGBTlguIvXYQ" },
    { id: 11, title: "ASUS TUF Gaming F15", price: "11,500 MAD", condition: "New", location: "Rabat, Hay Riad", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUidOIQQ-WwSTOAMyq-Q7lO0nBCGoHiBwLfrGwr8cHKrn-A4mrKkRGw4e0pwFT1_PkEXkE9trGXz6J_iByn3hr7hxx4_6tv2ZeZA1oZ2Lqu4aMF7ZfT2C48V1T2Ia5V8hCcWeNdkmW2QPtiahZe9tBX5L-8xdsiKVd1-tYceJVwGU1kVfQPoZQUvAHOKHSefUBYLBI0iLTwEhXkrxEYkxU-KIG56wGyXTUPx8loO_ZxxO9---Wf7uPnlISfXfO5XjFvCWm5MjlUQ" },
    { id: 12, title: "Lenovo Legion Pro 5i", price: "17,800 MAD", condition: "Used", location: "Sale", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwtetkbnJCAOxdOxY_8_9xDGcTJcXTT4wXu5WRQh44ugt9zcCLuhSJ_e_f8yRpUBaQBcZAIYjkGaHb_4OWBUgN-6P-I2VBIdTqd1qeCO8TXFOBkRD46nUmRvF1lsydM6D4mwYDYf9BlFdR6-m2fiG1uEPqEKitevqTLkuu_dkO0MQfDZvQX5dy6FmM2aZ5A-_MX9z03WxLXtFz9DD07bXfe3LcdB9t2XGolr8K3V5roMoz-d_8xhIzKkcmw5i5sHbLMXIx0TWxqg" },
  ]

  const brands = ["Apple","HP","Lenovo","Dell","ASUS","MSI","Razer","Microsoft"]

  return (
    <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", backgroundColor: "#f4fbf8", minHeight: "100vh", color: "#161d1b" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .ms { font-family: 'Material Symbols Outlined'; font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; vertical-align: middle; display: inline-block; line-height: 1; }
        .ms-fill { font-variation-settings: 'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24; }
        .glass { background: rgba(255,255,255,0.7); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.4); }
        .no-scroll::-webkit-scrollbar { display: none; }
        .no-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .card:hover { transform: translateY(-4px); }
        .card { transition: transform 0.3s; }
        .img-zoom:hover img { transform: scale(1.1); }
        .img-zoom img { transition: transform 0.5s; }
      `}</style>

      {/* HERO */}
      <section style={{ position: "relative", height: "400px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxPgsKJ4CfDmgn_O18MTDfI6rsUvtcNpVM5hu4wUQPxpvbhoiMNMk-C38Lcqi95wN93EpubwAMlfRgN0nAF_iVbRltbqKJuTt_VUECsqqgcJlzPTaTfy9PsfMvDQvFKmwZDGxlqJx3xhWK8wutsQTSJkoEQloBAJ3VGpI7O3_6cRGgv5fccJcihBaZ5ONz8koANaHodX2uRP12okHTl5WzMClnaRWe1tsHXlDj6jQnYU0-htai5pck6yBuVH5YDTrpmHpRHNzvHQ" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent, rgba(244,251,248,0.4), #f4fbf8)" }}></div>
        </div>
        <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "896px", margin: "0 auto", padding: "0 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 style={{ fontSize: "48px", fontWeight: 900, color: "white", marginBottom: "32px", textAlign: "center", lineHeight: 1.1, letterSpacing: "-0.02em", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>Discover Your Next Laptop in Rabat</h1>
          <div style={{ width: "100%", display: "flex", gap: "8px", padding: "8px", borderRadius: "3rem", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.3)" }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", borderRadius: "9999px", padding: "12px 20px", background: "rgba(244,251,248,0.5)" }}>
              <span className="ms" style={{ color: "#3c4a46", marginRight: "12px" }}>search</span>
              <input style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "16px", color: "#161d1b" }} placeholder="Search for MacBook Pro, Gaming PC, ASUS..." />
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", borderRadius: "9999px", padding: "12px 20px", background: "rgba(244,251,248,0.5)" }}>
              <span className="ms" style={{ color: "#3c4a46", marginRight: "12px" }}>location_on</span>
              <select style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "16px", appearance: "none" }}>
                <option>Rabat</option><option>Casablanca</option>
              </select>
            </div>
            <button style={{ background: "#2dd4bf", color: "white", border: "none", borderRadius: "9999px", padding: "0 40px", fontWeight: 700, fontSize: "15px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="ms">manage_search</span> Search
            </button>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div style={{ maxWidth: "1440px", margin: "-40px auto 32px", padding: "0 40px", position: "relative", zIndex: 20 }}>
        <div style={{ display: "flex", alignItems: "center", padding: "6px", borderRadius: "9999px", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(186,202,197,0.3)", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          {[["CITY","Rabat"],["CONDITION","Select"],["PRICE (MAD)","Select"],["FILTERS","All Filters"]].map(([label,val],i) => (
            <div key={label} style={{ flex: 1, padding: "0 16px", borderRight: i < 3 ? "1px solid rgba(186,202,197,0.2)" : "none", cursor: "pointer" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#3c4a46", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
              <div style={{ fontSize: "16px", fontWeight: 500, color: "#161d1b", display: "flex", alignItems: "center", gap: "4px" }}>{val} <span className="ms" style={{ fontSize: "18px", color: "#3c4a46" }}>{label === "FILTERS" ? "tune" : "expand_more"}</span></div>
            </div>
          ))}
          <div style={{ flex: 2, padding: "0 16px", borderRight: "1px solid rgba(186,202,197,0.2)" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "#3c4a46", textTransform: "uppercase", letterSpacing: "0.1em" }}>KEYWORD</div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "16px", color: "#161d1b" }} placeholder="MacBook Pro, RTX 4080..." />
              <span className="ms" style={{ color: "#2dd4bf" }}>search</span>
            </div>
          </div>
        </div>
      </div>

      {/* BREADCRUMBS */}
      <div style={{ maxWidth: "1440px", margin: "0 auto 24px", padding: "0 40px" }}>
        <nav style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600, color: "rgba(60,74,70,0.7)" }}>
          {["Rabat","Vault","Electronics"].map(c => (
            <span key={c} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <a href="#" style={{ textDecoration: "none", color: "inherit" }}>{c}</a>
              <span className="ms" style={{ fontSize: "16px" }}>chevron_right</span>
            </span>
          ))}
          <span style={{ fontWeight: 700, color: "#161d1b" }}>Laptops</span>
        </nav>
      </div>

      {/* TITLE + CONTROLS */}
      <div style={{ maxWidth: "1440px", margin: "0 auto 32px", padding: "0 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "16px" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#161d1b", marginBottom: "4px" }}>New and Used Laptop Computers in Rabat</h1>
            <p style={{ fontSize: "16px", color: "#3c4a46" }}>3,412 Ads in Rabat District</p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            {["sort:Sort: Default","notifications_active:Save Search"].map(s => {
              const [icon,label] = s.split(":")
              return <button key={label} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "12px", background: "#eef5f2", border: "1px solid rgba(186,202,197,0.3)", fontSize: "13px", fontWeight: 700, cursor: "pointer", color: "#161d1b" }}><span className="ms" style={{ fontSize: "18px" }}>{icon}</span>{label}</button>
            })}
          </div>
        </div>

        {/* BRAND PILLS */}
        <div className="no-scroll" style={{ display: "flex", gap: "12px", overflowX: "auto", padding: "16px 0", marginBottom: "8px" }}>
          <button style={{ whiteSpace: "nowrap", padding: "10px 24px", borderRadius: "9999px", background: "#2dd4bf", color: "white", fontSize: "13px", fontWeight: 700, border: "none", cursor: "pointer" }}>All Brands</button>
          {brands.map(b => <button key={b} style={{ whiteSpace: "nowrap", padding: "10px 24px", borderRadius: "9999px", background: "#e8efec", border: "1px solid rgba(186,202,197,0.3)", fontSize: "13px", fontWeight: 700, cursor: "pointer", color: "#161d1b" }}>{b}</button>)}
          <button style={{ whiteSpace: "nowrap", padding: "10px 16px", color: "#2dd4bf", fontWeight: 700, fontSize: "13px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>View More <span className="ms">expand_more</span></button>
        </div>

        {/* UTILITY LINES */}
        <div style={{ paddingTop: "16px", borderTop: "1px solid rgba(186,202,197,0.2)", display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", fontWeight: 700, color: "#2dd4bf", background: "rgba(45,212,191,0.15)", padding: "4px 12px", borderRadius: "9999px" }}><span className="ms" style={{ fontSize: "16px" }}>bolt</span> New Arrivals</span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", fontWeight: 700, color: "#605e58", background: "rgba(96,94,88,0.1)", padding: "4px 12px", borderRadius: "9999px" }}><span className="ms" style={{ fontSize: "16px" }}>trending_down</span> Price Drop Alert</span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#3c4a46" }}>Show Diamond Verified First</span>
              <div style={{ width: "36px", height: "20px", background: "#2dd4bf", borderRadius: "9999px", display: "flex", alignItems: "center", padding: "0 3px", cursor: "pointer", justifyContent: "flex-end" }}>
                <div style={{ width: "14px", height: "14px", background: "white", borderRadius: "9999px" }}></div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
            <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 20px", borderRadius: "9999px", background: "rgba(45,212,191,0.15)", border: "1px solid rgba(0,107,95,0.2)", fontSize: "13px", fontWeight: 700, color: "#005047", cursor: "pointer" }}><span className="ms" style={{ fontSize: "18px" }}>groups</span> All Sellers (3,412)</button>
            <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 20px", borderRadius: "9999px", background: "#e8efec", border: "1px solid rgba(186,202,197,0.3)", fontSize: "13px", fontWeight: 700, color: "#161d1b", cursor: "pointer" }}><span className="ms" style={{ fontSize: "18px" }}>person</span> SouKni Members (2,102)</button>
            <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 20px", borderRadius: "9999px", background: "#e8efec", border: "1px solid rgba(186,202,197,0.3)", fontSize: "13px", fontWeight: 700, color: "#161d1b", cursor: "pointer" }}><span className="ms" style={{ fontSize: "18px" }}>verified_user</span> SouKni Pro (1,310)</button>
            <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
              <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 20px", borderRadius: "9999px", background: "#eef5f2", border: "1px solid rgba(186,202,197,0.3)", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}><span className="ms" style={{ fontSize: "18px" }}>sort</span> Sort: Featured</button>
              <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 20px", borderRadius: "9999px", background: "#eef5f2", border: "1px solid rgba(186,202,197,0.3)", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}><span className="ms" style={{ fontSize: "18px" }}>notifications_active</span> Save Search</button>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED GRID */}
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#161d1b" }}>Featured Premium Laptops</h2>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: "4px", color: "#2dd4bf", fontWeight: 700, fontSize: "13px", textDecoration: "none" }}>View more Featured <span className="ms" style={{ fontSize: "18px" }}>chevron_right</span></a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginBottom: "64px" }}>
          {featuredListings.map(item => (
            <article key={item.id} className="card glass img-zoom" style={{ borderRadius: "2.5rem", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid rgba(186,202,197,0.5)" }}>
              <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", background: "#d4dcd9" }}>
                <div style={{ position: "absolute", top: "12px", left: "12px", zIndex: 10, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {item.badge === "diamond" && <span style={{ background: "#2dd4bf", color: "white", fontSize: "10px", fontWeight: 900, padding: "4px 10px", borderRadius: "9999px", display: "flex", alignItems: "center", gap: "4px", textTransform: "uppercase" }}><span className="ms ms-fill" style={{ fontSize: "12px" }}>diamond</span> DIAMOND MEMBER</span>}
                  {item.badge === "pro" && <span style={{ background: "#62fae3", color: "#00201c", fontSize: "10px", fontWeight: 700, padding: "4px 10px", borderRadius: "9999px", display: "flex", alignItems: "center", gap: "4px" }}><span className="ms ms-fill" style={{ fontSize: "12px" }}>verified</span> PRO SELLER</span>}
                  {item.extraBadge && <span style={{ background: "rgba(255,255,255,0.9)", color: "#2dd4bf", fontSize: "10px", fontWeight: 900, padding: "4px 10px", borderRadius: "9999px", textTransform: "uppercase", border: "1px solid rgba(0,107,95,0.2)" }}>{item.extraBadge}</span>}
                </div>
                <button style={{ position: "absolute", top: "12px", right: "12px", zIndex: 10, width: "40px", height: "40px", borderRadius: "9999px", background: "rgba(255,255,255,0.8)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="ms" style={{ fontSize: "20px" }}>favorite</span>
                </button>
                <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: item.condition === "New" ? "#2dd4bf" : "#605e58" }}>{item.condition}</span>
                  <span style={{ width: "4px", height: "4px", background: "#6b7a76", borderRadius: "9999px" }}></span>
                  <span style={{ fontSize: "13px", color: "#3c4a46" }}>{item.location}</span>
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#161d1b", marginBottom: "8px", lineHeight: 1.3 }}>{item.title}</h3>
                <p style={{ fontSize: "22px", fontWeight: 900, color: "#2dd4bf", marginBottom: "16px" }}>{item.price}</p>
                <div style={{ marginTop: "auto", paddingTop: "16px", borderTop: "1px solid rgba(186,202,197,0.15)", display: "flex", gap: "8px" }}>
                  <button style={{ flex: 1, padding: "10px", borderRadius: "12px", background: "#e8efec", border: "none", fontSize: "13px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}><span className="ms" style={{ fontSize: "18px" }}>chat_bubble</span> Message</button>
                  <button style={{ flex: 1, padding: "10px", borderRadius: "12px", background: "rgba(37,211,102,0.1)", color: "#25D366", border: "none", fontSize: "13px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}><span className="ms" style={{ fontSize: "18px" }}>call</span> WhatsApp</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* INTERSTITIAL */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "64px" }}>
          <div style={{ borderRadius: "2.5rem", padding: "40px", minHeight: "300px", display: "flex", flexDirection: "column", justifyContent: "center", background: "#2dd4bf", color: "white", boxShadow: "0 8px 32px rgba(0,107,95,0.3)" }}>
            <h2 style={{ fontSize: "36px", fontWeight: 900, marginBottom: "16px", lineHeight: 1.2 }}>Join the SouKni Family</h2>
            <p style={{ fontSize: "18px", marginBottom: "32px", opacity: 0.9, lineHeight: 1.6 }}>Start selling your tech items today for free and reach millions of buyers in Morocco.</p>
            <button style={{ background: "white", color: "#2dd4bf", padding: "16px 32px", borderRadius: "9999px", fontWeight: 900, fontSize: "13px", border: "none", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.05em", width: "fit-content" }}>Register as Individual</button>
          </div>
          <div style={{ borderRadius: "2.5rem", padding: "40px", minHeight: "300px", display: "flex", flexDirection: "column", justifyContent: "center", background: "#dde4e1", border: "2px solid rgba(0,107,95,0.2)", boxShadow: "0 8px 32px rgba(0,0,0,0.06)" }}>
            <p style={{ fontSize: "12px", fontWeight: 900, color: "#2dd4bf", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "16px" }}>Solutions for agents</p>
            <h2 style={{ fontSize: "36px", fontWeight: 900, color: "#161d1b", marginBottom: "16px", lineHeight: 1.2 }}>SouKni Immo Pro</h2>
            <p style={{ fontSize: "18px", color: "#3c4a46", marginBottom: "32px", lineHeight: 1.6 }}>Boost your real estate agency visibility with our premium listing dashboard and analytics.</p>
            <button style={{ background: "#2dd4bf", color: "white", padding: "16px 32px", borderRadius: "9999px", fontWeight: 900, fontSize: "13px", border: "none", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.05em", width: "fit-content" }}>Discover Pro Tools</button>
          </div>
        </div>

        {/* DISCOVERY GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginBottom: "64px" }}>
          {discoveryListings.map(item => (
            <article key={item.id} className="card glass img-zoom" style={{ borderRadius: "2.5rem", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid rgba(186,202,197,0.5)" }}>
              <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", background: "#d4dcd9" }}>
                <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: "8px", left: "8px", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(4px)", padding: "2px 8px", borderRadius: "6px", fontSize: "10px", fontWeight: 700, color: "#2dd4bf", textTransform: "uppercase" }}>{item.condition}</div>
                <button style={{ position: "absolute", top: "8px", right: "8px", width: "32px", height: "32px", borderRadius: "9999px", background: "rgba(255,255,255,0.85)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><span className="ms" style={{ fontSize: "18px" }}>favorite</span></button>
              </div>
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#161d1b", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</h4>
                <p style={{ fontSize: "13px", color: "#3c4a46", marginBottom: "12px" }}>{item.location}</p>
                <p style={{ fontSize: "18px", fontWeight: 900, color: "#2dd4bf", marginBottom: "12px" }}>{item.price}</p>
                <div style={{ marginTop: "auto", display: "flex", gap: "8px" }}>
                  <button style={{ flex: 1, padding: "8px", borderRadius: "12px", border: "1px solid rgba(186,202,197,0.5)", background: "none", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>Message</button>
                  <button style={{ flex: 1, padding: "8px", borderRadius: "12px", background: "rgba(0,107,95,0.1)", color: "#2dd4bf", border: "none", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>Call</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* PAGINATION */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "64px" }}>
          {["chevron_left","1","2","3","...","42","chevron_right"].map((p,i) => (
            <button key={i} style={{ width: "40px", height: "40px", borderRadius: "9999px", border: p === "1" ? "none" : "1px solid rgba(186,202,197,0.3)", background: p === "1" ? "#2dd4bf" : "none", color: p === "1" ? "white" : "#161d1b", fontWeight: 700, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {p === "chevron_left" || p === "chevron_right" ? <span className="ms">{p}</span> : p}
            </button>
          ))}
        </div>

        {/* DIAMOND BANNER */}
        <div style={{ borderRadius: "2.5rem", padding: "48px", textAlign: "center", color: "white", marginBottom: "16px", background: "linear-gradient(135deg, #2dd4bf 0%, #2dd4bf 100%)", boxShadow: "0 8px 40px rgba(0,107,95,0.3)" }}>
          <h2 style={{ fontSize: "40px", fontWeight: 900, marginBottom: "16px", letterSpacing: "-0.02em" }}>Become a Diamond Member</h2>
          <p style={{ fontSize: "18px", marginBottom: "32px", opacity: 0.9, maxWidth: "600px", margin: "0 auto 32px", lineHeight: 1.6 }}>Enjoy zero listing fees, unlimited highlighted ads, and a dedicated account manager for your tech business.</p>
          <button style={{ background: "white", color: "#2dd4bf", padding: "16px 40px", borderRadius: "9999px", fontWeight: 900, fontSize: "13px", border: "none", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.1em", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>Upgrade to Diamond</button>
        </div>

        {/* ELECTRO PRO BANNER */}
        <div style={{ position: "relative", height: "320px", borderRadius: "2.5rem", overflow: "hidden", marginBottom: "64px", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
          <img src="https://lh3.googleusercontent.com/aida/AP1WRLte3T4jAlSSr_19KmztIwAOuMomYBX371H5SvypnAcC-dCwNUH96XVDrGN71dmKnJoCAiEhAhdRdIYSHYSdTV6C2C6ri6B5B1J6qC-owzK7-ULfEqiwvenK8X0VKGFkVwbpCzZGXyLI0hDHwxCw_cQN4N5rmyLy_L11FGTVlroKku6Nwfdy1vSNMWGcXj18jmEHAEhZ-QaiALhK3Y6u0uCQrkiqJsQ0ZbAeiH5tfy75cjiCtAuEH55WPA" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.4), transparent)" }}></div>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 64px" }}>
            <div>
              <p style={{ color: "#3cddc7", fontWeight: 900, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "16px" }}>Premier Partnership</p>
              <h2 style={{ color: "white", fontSize: "48px", fontWeight: 900, marginBottom: "8px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>SouKni Electro Pro</h2>
              <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "18px", lineHeight: 1.6 }}>The Gold Standard for Premium Electronics & Tech Solutions in Rabat.</p>
            </div>
            <button style={{ background: "#2dd4bf", color: "#2dd4bf", padding: "16px 40px", borderRadius: "9999px", fontWeight: 700, fontSize: "13px", border: "none", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(45,212,191,0.4)" }}>Discover Pro Benefits</button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
    </div>
  )
}
