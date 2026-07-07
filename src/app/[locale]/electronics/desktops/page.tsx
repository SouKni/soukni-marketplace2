export default function DesktopsPage() {

  const featuredTop = [
    { id: 1, badge: "diamond", extra: "Featured", title: "2024 Apple Mac Studio", price: "24,500 MAD", condition: "New", location: "Rabat, Agdal", img: "https://lh3.googleusercontent.com/aida/AP1WRLscAyyagQNoPy2ON3DvJTGQ9z3UU6i7QUMxQV12iuyosrilawG0mZp1dyd3_jAINfQiWRu5ZG2Ml_6B37URgspLSUvfounSVApWf0rOP6NntIng3JG-4QvOUYxkFx2Xp_6Ikd09HC58JpieK7lRXpkWcmS539mlRkD5GbVkWWnMpVn4ljJ3x64kNmZWBJZIblzIwl5I80Pq6bRjSFNM9ETg1FapfAqr783lAsivBCE9OZgWSWV4UpzWEg" },
    { id: 2, badge: "pro", title: "Ultimate Liquid Cooled Gaming Rig", price: "32,000 MAD", condition: "Custom", location: "Rabat, Souissi", img: "https://lh3.googleusercontent.com/aida/AP1WRLsFKhYHSXcf0My1-8SOuQS85yboNoTM0X8jLsPei99klD13vrdR46ya23u1cuv_sX235QEnOfxbDM8JO9Al-1U0dZyWYbRw8kCf1xnU8JRWtn-7olrGd_iHt0RKlsmXL1F-9UrF25RyM28wsz4m0aohpvV7v4z_n62d3RuCWivSwCL6K27q2lH-G5Jgoj4D5TzLSSPApmEFNMjnSTo2GaWfHdAMIx35r2NExtZFca0NR5bZ5K9LwZcj" },
    { id: 3, title: "Alienware Aurora R16", price: "18,900 MAD", condition: "New", location: "Rabat, Hassan", img: "https://lh3.googleusercontent.com/aida/AP1WRLsxEg1cOhKvoz2s0xVXd4Y8rp7Xm5YplrWd6uqr-XZOiJIa3B9WiDQDym-DlOMISJNwb47eyQrrQXy27Wa0VLX-8KPepgyN_nrch8fygQbKYr9t8ErLDLOevxWI3VdQT_AipmiIJjTOs7vgsiHDbiCjL8aFVEI9dBtB8PtMn5EGADHmKgaDTGTvfBnQ2ts9qDV6eaTP_dqEVMUeg-5pl-4EILjVxDri-Pd2x15X5FltJLKE0NAeHWt94g" },
    { id: 4, title: '27" Pro All-in-One PC', price: "14,200 MAD", condition: "New", location: "Rabat, Hay Riad", img: "https://lh3.googleusercontent.com/aida/AP1WRLvaN0renZ_8Fxq4gFbtdljzCMhtr_zAsaCD2HyPLzGziZ-JsDX_aWvRMQi2gQPyRXUrVIjHefrl9Kg510zKFnJgxrrONasfSQlJNG4kd_7wZH70LYzmbHpLtPNWad33Lkyqw7bSPjAn9MzRZ0GKbERpBzJOYDR_rHmmXG51MfflMkxmdwATAMk0fGaIlscwbvPhVEE-Cobizym_FG2XgiKdsoGH_xu8aiGDO4s2kvqjHb9iBM8Ln-qlDA" },
  ]

  const featuredPremium = [
    { id: 5, badge: "new", spec: "M2 Ultra • 64GB RAM • 1TB SSD", title: "2024 Apple Mac Studio", price: "28,500 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLscAyyagQNoPy2ON3DvJTGQ9z3UU6i7QUMxQV12iuyosrilawG0mZp1dyd3_jAINfQiWRu5ZG2Ml_6B37URgspLSUvfounSVApWf0rOP6NntIng3JG-4QvOUYxkFx2Xp_6Ikd09HC58JpieK7lRXpkWcmS539mlRkD5GbVkWWnMpVn4ljJ3x64kNmZWBJZIblzIwl5I80Pq6bRjSFNM9ETg1FapfAqr783lAsivBCE9OZgWSWV4UpzWEg" },
    { id: 6, badge: "diamond", spec: "RTX 4090 • i9-14900K • Custom", title: "Ultimate Liquid Gaming Rig", price: "35,000 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLsFKhYHSXcf0My1-8SOuQS85yboNoTM0X8jLsPei99klD13vrdR46ya23u1cuv_sX235QEnOfxbDM8JO9Al-1U0dZyWYbRw8kCf1xnU8JRWtn-7olrGd_iHt0RKlsmXL1F-9UrF25RyM28wsz4m0aohpvV7v4z_n62d3RuCWivSwCL6K27q2lH-G5Jgoj4D5TzLSSPApmEFNMjnSTo2GaWfHdAMIx35r2NExtZFca0NR5bZ5K9LwZcj" },
    { id: 7, spec: "Lunar Light • RTX 4080 • 32GB", title: "Alienware Aurora R16", price: "24,000 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLsxEg1cOhKvoz2s0xVXd4Y8rp7Xm5YplrWd6uqr-XZOiJIa3B9WiDQDym-DlOMISJNwb47eyQrrQXy27Wa0VLX-8KPepgyN_nrch8fygQbKYr9t8ErLDLOevxWI3VdQT_AipmiIJjTOs7vgsiHDbiCjL8aFVEI9dBtB8PtMn5EGADHmKgaDTGTvfBnQ2ts9qDV6eaTP_dqEVMUeg-5pl-4EILjVxDri-Pd2x15X5FltJLKE0NAeHWt94g" },
    { id: 8, badge: "hot", spec: "4K Display • Core i7 • 32GB", title: '27" Pro All-in-One PC', price: "18,500 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLvaN0renZ_8Fxq4gFbtdljzCMhtr_zAsaCD2HyPLzGziZ-JsDX_aWvRMQi2gQPyRXUrVIjHefrl9Kg510zKFnJgxrrONasfSQlJNG4kd_7wZH70LYzmbHpLtPNWad33Lkyqw7bSPjAn9MzRZ0GKbERpBzJOYDR_rHmmXG51MfflMkxmdwATAMk0fGaIlscwbvPhVEE-Cobizym_FG2XgiKdsoGH_xu8aiGDO4s2kvqjHb9iBM8Ln-qlDA" },
  ]

  const discoveryListings = [
    { id: 9,  badge: null,      title: "Professional Workstation Tower", spec: "Rabat Center",          price: "12,500 MAD", condition: "New",      img: "https://lh3.googleusercontent.com/aida/AP1WRLtIs_Ivm7JJtJUCCdmbtSz1llr-WBlk4-dVJMS6lK7-35lU0sXyTLtfQSZckSnPpXdbm2Zx4Fl_ye5X4QjX_kmJpKoufRjGAvqZgApGG5k686qlq9n0LiqOTEsEmLmt7sSihNANqyLpoRNMIxSfNGHzb24HORm_OLqRGI2fsPnx57BqYDkeakT38R-rvs2K-oyzY1p6Pp3vVgRP0rao-GGaVMNeVqhfhh7SZCjsai_jGvxtHK_MnomJzQ" },
    { id: 10, badge: null,      title: "Compact Mini PC",               spec: "Témara",                price: "4,200 MAD",  condition: "Like New", img: "https://lh3.googleusercontent.com/aida/AP1WRLvUuKJPF6EOkmSXIPur2t5dwoz-6OvPbhdstw1bM9VlNKySBO6UPLWu0ACVEU1KQJAkf9tgCPjZ6NmzRKGZSmGUPqC6IfyvBzL527eELKQz4mFk68pQpjF9ssugjOBWHQ3OjmcFYGPnH6zRWcpav-ZZvUlKOOmjQVjwB72higfoqskCumvXhiKeNrMTtkUufXvUSUl0CxdgmItU-GmfWnrDTV4jbu75qn5CpV88Ns_MFoknHSnERJU_Og" },
    { id: 11, badge: null,      title: "Custom Designer Build",         spec: "Rabat, Agdal",          price: "21,000 MAD", condition: "Custom",   img: "https://lh3.googleusercontent.com/aida/AP1WRLv9xjEwKzs-HWrZuA54X825RDhJbu-0eaG_wYfAGH3ypQLJFXGPF7-U0Ie0Mge-QV285gtDfwe8jV3D0mm20FFM8by4x4x5EWOGtZGyqWadAVl57plRYJgJTZhtr-45WvOPLD_U6OEn-c5fxozm7MvXS7J0E1s2jwsXzpoxVSqrCMi4XtZvNusMi1-a8GmN9cxltgIOXRB5PfvLi80L6j3BhPX3y56wCSQLnP6xTN2JRRLkfS4EUeVCCw" },
    { id: 12, badge: "diamond", title: "Mac Studio M2 Ultra",           spec: "128GB RAM • 2TB SSD",   price: "45,000 MAD", condition: "New",      img: "https://lh3.googleusercontent.com/aida/AP1WRLscAyyagQNoPy2ON3DvJTGQ9z3UU6i7QUMxQV12iuyosrilawG0mZp1dyd3_jAINfQiWRu5ZG2Ml_6B37URgspLSUvfounSVApWf0rOP6NntIng3JG-4QvOUYxkFx2Xp_6Ikd09HC58JpieK7lRXpkWcmS539mlRkD5GbVkWWnMpVn4ljJ3x64kNmZWBJZIblzIwl5I80Pq6bRjSFNM9ETg1FapfAqr783lAsivBCE9OZgWSWV4UpzWEg" },
    { id: 13, badge: "pro",     title: "RTX 4090 Gaming Beast",         spec: "i9-14900K • 64GB DDR5", price: "38,500 MAD", condition: "New",      img: "https://lh3.googleusercontent.com/aida/AP1WRLsFKhYHSXcf0My1-8SOuQS85yboNoTM0X8jLsPei99klD13vrdR46ya23u1cuv_sX235QEnOfxbDM8JO9Al-1U0dZyWYbRw8kCf1xnU8JRWtn-7olrGd_iHt0RKlsmXL1F-9UrF25RyM28wsz4m0aohpvV7v4z_n62d3RuCWivSwCL6K27q2lH-G5Jgoj4D5TzLSSPApmEFNMjnSTo2GaWfHdAMIx35r2NExtZFca0NR5bZ5K9LwZcj" },
    { id: 14, badge: "verified",title: "Alienware Aurora R16",          spec: "RTX 4080 • 32GB RAM",   price: "26,900 MAD", condition: "New",      img: "https://lh3.googleusercontent.com/aida/AP1WRLsxEg1cOhKvoz2s0xVXd4Y8rp7Xm5YplrWd6uqr-XZOiJIa3B9WiDQDym-DlOMISJNwb47eyQrrQXy27Wa0VLX-8KPepgyN_nrch8fygQbKYr9t8ErLDLOevxWI3VdQT_AipmiIJjTOs7vgsiHDbiCjL8aFVEI9dBtB8PtMn5EGADHmKgaDTGTvfBnQ2ts9qDV6eaTP_dqEVMUeg-5pl-4EILjVxDri-Pd2x15X5FltJLKE0NAeHWt94g" },
    { id: 15, badge: "hot",     title: "HP Z8 Workstation",            spec: "Dual Xeon • 256GB RAM", price: "52,000 MAD", condition: "New",      img: "https://lh3.googleusercontent.com/aida/AP1WRLvaN0renZ_8Fxq4gFbtdljzCMhtr_zAsaCD2HyPLzGziZ-JsDX_aWvRMQi2gQPyRXUrVIjHefrl9Kg510zKFnJgxrrONasfSQlJNG4kd_7wZH70LYzmbHpLtPNWad33Lkyqw7bSPjAn9MzRZ0GKbERpBzJOYDR_rHmmXG51MfflMkxmdwATAMk0fGaIlscwbvPhVEE-Cobizym_FG2XgiKdsoGH_xu8aiGDO4s2kvqjHb9iBM8Ln-qlDA" },
    { id: 16, badge: "diamond", title: "Precision 7960 Tower",          spec: "Xeon W-2400 • 128GB RAM",price: "41,500 MAD",condition: "New",      img: "https://lh3.googleusercontent.com/aida/AP1WRLtIs_Ivm7JJtJUCCdmbtSz1llr-WBlk4-dVJMS6lK7-35lU0sXyTLtfQSZckSnPpXdbm2Zx4Fl_ye5X4QjX_kmJpKoufRjGAvqZgApGG5k686qlq9n0LiqOTEsEmLmt7sSihNANqyLpoRNMIxSfNGHzb24HORm_OLqRGI2fsPnx57BqYDkeakT38R-rvs2K-oyzY1p6Pp3vVgRP0rao-GGaVMNeVqhfhh7SZCjsai_jGvxtHK_MnomJzQ" },
    { id: 17, badge: "pro",     title: "Custom Mini ITX Build",         spec: "RTX 4070 Ti • 32GB RAM",price: "19,800 MAD", condition: "Custom",   img: "https://lh3.googleusercontent.com/aida/AP1WRLvUuKJPF6EOkmSXIPur2t5dwoz-6OvPbhdstw1bM9VlNKySBO6UPLWu0ACVEU1KQJAkf9tgCPjZ6NmzRKGZSmGUPqC6IfyvBzL527eELKQz4mFk68pQpjF9ssugjOBWHQ3OjmcFYGPnH6zRWcpav-ZZvUlKOOmjQVjwB72higfoqskCumvXhiKeNrMTtkUufXvUSUl0CxdgmItU-GmfWnrDTV4jbu75qn5CpV88Ns_MFoknHSnERJU_Og" },
    { id: 18, badge: "verified",title: "Designer Workstation",          spec: "Threadripper • 128GB RAM",price: "65,000 MAD",condition: "New",     img: "https://lh3.googleusercontent.com/aida/AP1WRLv9xjEwKzs-HWrZuA54X825RDhJbu-0eaG_wYfAGH3ypQLJFXGPF7-U0Ie0Mge-QV285gtDfwe8jV3D0mm20FFM8by4x4x5EWOGtZGyqWadAVl57plRYJgJTZhtr-45WvOPLD_U6OEn-c5fxozm7MvXS7J0E1s2jwsXzpoxVSqrCMi4XtZvNusMi1-a8GmN9cxltgIOXRB5PfvLi80L6j3BhPX3y56wCSQLnP6xTN2JRRLkfS4EUeVCCw" },
    { id: 19, badge: "diamond", title: "ThinkStation P620",             spec: "64-Core • 256GB RAM",   price: "78,000 MAD", condition: "New",      img: "https://lh3.googleusercontent.com/aida/AP1WRLte3T4jAlSSr_19KmztIwAOuMomYBX371H5SvypnAcC-dCwNUH96XVDrGN71dmKnJoCAiEhAhdRdIYSHYSdTV6C2C6ri6B5B1J6qC-owzK7-ULfEqiwvenK8X0VKGFkVwbpCzZGXyLI0hDHwxCw_cQN4N5rmyLy_L11FGTVlroKku6Nwfdy1vSNMWGcXj18jmEHAEhZ-QaiALhK3Y6u0uCQrkiqJsQ0ZbAeiH5tfy75cjiCtAuEH55WPA" },
    { id: 20, badge: "pro",     title: "Mac Studio M1 Ultra",           spec: "64GB RAM • 1TB SSD",    price: "22,500 MAD", condition: "New",      img: "https://lh3.googleusercontent.com/aida/AP1WRLscAyyagQNoPy2ON3DvJTGQ9z3UU6i7QUMxQV12iuyosrilawG0mZp1dyd3_jAINfQiWRu5ZG2Ml_6B37URgspLSUvfounSVApWf0rOP6NntIng3JG-4QvOUYxkFx2Xp_6Ikd09HC58JpieK7lRXpkWcmS539mlRkD5GbVkWWnMpVn4ljJ3x64kNmZWBJZIblzIwl5I80Pq6bRjSFNM9ETg1FapfAqr783lAsivBCE9OZgWSWV4UpzWEg" },
    { id: 21, badge: "verified",title: "Custom Watercooled PC",         spec: "RTX 4090 • i9-13900K",  price: "34,000 MAD", condition: "Custom",   img: "https://lh3.googleusercontent.com/aida/AP1WRLsFKhYHSXcf0My1-8SOuQS85yboNoTM0X8jLsPei99klD13vrdR46ya23u1cuv_sX235QEnOfxbDM8JO9Al-1U0dZyWYbRw8kCf1xnU8JRWtn-7olrGd_iHt0RKlsmXL1F-9UrF25RyM28wsz4m0aohpvV7v4z_n62d3RuCWivSwCL6K27q2lH-G5Jgoj4D5TzLSSPApmEFNMjnSTo2GaWfHdAMIx35r2NExtZFca0NR5bZ5K9LwZcj" },
    { id: 22, badge: "diamond", title: "Alienware Aurora R15",          spec: "RTX 3090 • 64GB RAM",   price: "18,500 MAD", condition: "Used",     img: "https://lh3.googleusercontent.com/aida/AP1WRLsxEg1cOhKvoz2s0xVXd4Y8rp7Xm5YplrWd6uqr-XZOiJIa3B9WiDQDym-DlOMISJNwb47eyQrrQXy27Wa0VLX-8KPepgyN_nrch8fygQbKYr9t8ErLDLOevxWI3VdQT_AipmiIJjTOs7vgsiHDbiCjL8aFVEI9dBtB8PtMn5EGADHmKgaDTGTvfBnQ2ts9qDV6eaTP_dqEVMUeg-5pl-4EILjVxDri-Pd2x15X5FltJLKE0NAeHWt94g" },
    { id: 23, badge: "pro",     title: 'iMac 24" M3 Chip',             spec: "16GB RAM • 512GB SSD",  price: "16,200 MAD", condition: "New",      img: "https://lh3.googleusercontent.com/aida/AP1WRLvaN0renZ_8Fxq4gFbtdljzCMhtr_zAsaCD2HyPLzGziZ-JsDX_aWvRMQi2gQPyRXUrVIjHefrl9Kg510zKFnJgxrrONasfSQlJNG4kd_7wZH70LYzmbHpLtPNWad33Lkyqw7bSPjAn9MzRZ0GKbERpBzJOYDR_rHmmXG51MfflMkxmdwATAMk0fGaIlscwbvPhVEE-Cobizym_FG2XgiKdsoGH_xu8aiGDO4s2kvqjHb9iBM8Ln-qlDA" },
    { id: 24, badge: null,      title: "HP EliteDesk 800 G9",          spec: "Core i7 • 32GB • 512GB", price: "8,900 MAD",  condition: "New",      img: "https://lh3.googleusercontent.com/aida/AP1WRLtIs_Ivm7JJtJUCCdmbtSz1llr-WBlk4-dVJMS6lK7-35lU0sXyTLtfQSZckSnPpXdbm2Zx4Fl_ye5X4QjX_kmJpKoufRjGAvqZgApGG5k686qlq9n0LiqOTEsEmLmt7sSihNANqyLpoRNMIxSfNGHzb24HORm_OLqRGI2fsPnx57BqYDkeakT38R-rvs2K-oyzY1p6Pp3vVgRP0rao-GGaVMNeVqhfhh7SZCjsai_jGvxtHK_MnomJzQ" },
    { id: 25, badge: null,      title: "Lenovo IdeaCentre AIO 5i",     spec: "27\" 4K • Core i9",     price: "13,200 MAD", condition: "New",      img: "https://lh3.googleusercontent.com/aida/AP1WRLvUuKJPF6EOkmSXIPur2t5dwoz-6OvPbhdstw1bM9VlNKySBO6UPLWu0ACVEU1KQJAkf9tgCPjZ6NmzRKGZSmGUPqC6IfyvBzL527eELKQz4mFk68pQpjF9ssugjOBWHQ3OjmcFYGPnH6zRWcpav-ZZvUlKOOmjQVjwB72higfoqskCumvXhiKeNrMTtkUufXvUSUl0CxdgmItU-GmfWnrDTV4jbu75qn5CpV88Ns_MFoknHSnERJU_Og" },
  ]

  const brands = ["Apple","Dell","HP","Lenovo","Alienware","MSI","ASUS","Microsoft"]

  const BadgeTop = ({ badge }: { badge?: string }) => {
    if (badge === "diamond") return <span style={{ background:"#2dd4bf", color:"white", fontSize:"10px", fontWeight:900, padding:"4px 10px", borderRadius:"9999px", display:"flex", alignItems:"center", gap:"4px", textTransform:"uppercase" }}>◆ DIAMOND MEMBER</span>
    if (badge === "pro") return <span style={{ background:"#62fae3", color:"#00201c", fontSize:"10px", fontWeight:700, padding:"4px 10px", borderRadius:"9999px", display:"flex", alignItems:"center", gap:"4px" }}>✓ PRO SELLER</span>
    return null
  }

  const BadgeDisc = ({ badge, condition }: { badge?: string | null, condition: string }) => {
    if (badge === "diamond") return <div style={{ position:"absolute", top:"8px", left:"8px", background:"#2dd4bf", color:"white", padding:"2px 8px", borderRadius:"6px", fontSize:"10px", fontWeight:700, textTransform:"uppercase" }}>DIAMOND MEMBER</div>
    if (badge === "pro") return <div style={{ position:"absolute", top:"8px", left:"8px", background:"#62fae3", color:"#00201c", padding:"2px 8px", borderRadius:"6px", fontSize:"10px", fontWeight:700, textTransform:"uppercase" }}>PRO SELLER</div>
    if (badge === "verified") return <div style={{ position:"absolute", top:"8px", left:"8px", background:"rgba(255,255,255,0.85)", backdropFilter:"blur(4px)", color:"#2dd4bf", padding:"2px 8px", borderRadius:"6px", fontSize:"10px", fontWeight:700, textTransform:"uppercase" }}>VERIFIED</div>
    if (badge === "hot") return <div style={{ position:"absolute", top:"8px", left:"8px", background:"#ba1a1a", color:"white", padding:"2px 8px", borderRadius:"6px", fontSize:"10px", fontWeight:700, textTransform:"uppercase" }}>HOT DEAL</div>
    return <div style={{ position:"absolute", bottom:"8px", left:"8px", background:"rgba(255,255,255,0.85)", backdropFilter:"blur(4px)", padding:"2px 8px", borderRadius:"6px", fontSize:"10px", fontWeight:700, color:"#2dd4bf", textTransform:"uppercase" }}>{condition}</div>
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
      `}</style>

      {/* HERO */}
      <section style={{ position:"relative", height:"400px", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0 }}>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxPgsKJ4CfDmgn_O18MTDfI6rsUvtcNpVM5hu4wUQPxpvbhoiMNMk-C38Lcqi95wN93EpubwAMlfRgN0nAF_iVbRltbqKJuTt_VUECsqqgcJlzPTaTfy9PsfMvDQvFKmwZDGxlqJx3xhWK8wutsQTSJkoEQloBAJ3VGpI7O3_6cRGgv5fccJcihBaZ5ONz8koANaHodX2uRP12okHTl5WzMClnaRWe1tsHXlDj6jQnYU0-htai5pck6yBuVH5YDTrpmHpRHNzvHQ" alt="" style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.6 }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,transparent,rgba(244,251,248,.4),#f4fbf8)" }}></div>
        </div>
        <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:"896px", margin:"0 auto", padding:"0 20px", display:"flex", flexDirection:"column", alignItems:"center" }}>
          <h1 style={{ fontSize:"48px", fontWeight:900, color:"white", marginBottom:"32px", textAlign:"center", lineHeight:1.1, letterSpacing:"-0.02em", textShadow:"0 2px 8px rgba(0,0,0,.3)" }}>Discover Your Next Desktop in Rabat</h1>
          <div style={{ width:"100%", display:"flex", gap:"8px", padding:"8px", borderRadius:"3rem", background:"rgba(255,255,255,.1)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,.3)" }}>
            <div style={{ flex:1, display:"flex", alignItems:"center", borderRadius:"9999px", padding:"12px 20px", background:"rgba(244,251,248,.5)" }}>
              <span className="ms" style={{ color:"#3c4a46", marginRight:"12px" }}>search</span>
              <input style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:"16px" }} placeholder="Search Mac Studio, Gaming PC, Alienware..." />
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
              <input style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:"16px" }} placeholder="Mac Studio, RTX 4090, Alienware..." />
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
          <span style={{ fontWeight:700, color:"#161d1b" }}>Desktops</span>
        </nav>
      </div>

      {/* TITLE + CONTROLS */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 32px", padding:"0 40px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"16px" }}>
          <div>
            <h1 style={{ fontSize:"24px", fontWeight:700, color:"#161d1b", marginBottom:"4px" }}>New and Used Desktop Computers in Rabat</h1>
            <p style={{ fontSize:"16px", color:"#3c4a46" }}>5,876 Ads in Rabat District</p>
          </div>
          <div style={{ display:"flex", gap:"12px" }}>
            {[["sort","Sort: Default"],["notifications_active","Save Search"]].map(([icon,label])=>(
              <button key={label} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"10px 20px", borderRadius:"12px", background:"#eef5f2", border:"1px solid rgba(186,202,197,.3)", fontSize:"13px", fontWeight:700, cursor:"pointer" }}>
                <span className="ms" style={{ fontSize:"18px" }}>{icon}</span>{label}
              </button>
            ))}
          </div>
        </div>

        {/* BRAND PILLS */}
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
            <button style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 20px", borderRadius:"9999px", background:"rgba(45,212,191,.15)", border:"1px solid rgba(0,107,95,.2)", fontSize:"13px", fontWeight:700, color:"#005047", cursor:"pointer" }}><span className="ms" style={{ fontSize:"18px" }}>groups</span> All Sellers (5,876)</button>
            <button style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 20px", borderRadius:"9999px", background:"#e8efec", border:"1px solid rgba(186,202,197,.3)", fontSize:"13px", fontWeight:700, cursor:"pointer" }}><span className="ms" style={{ fontSize:"18px" }}>person</span> SouKni Members (4,102)</button>
            <button style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 20px", borderRadius:"9999px", background:"#e8efec", border:"1px solid rgba(186,202,197,.3)", fontSize:"13px", fontWeight:700, cursor:"pointer" }}><span className="ms" style={{ fontSize:"18px" }}>verified_user</span> SouKni Pro (1,774)</button>
            <div style={{ marginLeft:"auto", display:"flex", gap:"12px" }}>
              <button style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 20px", borderRadius:"9999px", background:"#eef5f2", border:"1px solid rgba(186,202,197,.3)", fontSize:"13px", fontWeight:700, cursor:"pointer" }}><span className="ms" style={{ fontSize:"18px" }}>sort</span> Sort: Featured</button>
              <button style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 20px", borderRadius:"9999px", background:"#eef5f2", border:"1px solid rgba(186,202,197,.3)", fontSize:"13px", fontWeight:700, cursor:"pointer" }}><span className="ms" style={{ fontSize:"18px" }}>notifications_active</span> Save Search</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:"1440px", margin:"0 auto", padding:"0 40px" }}>

        {/* TOP FEATURED GRID — 4/5 portrait */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"64px" }}>
          {featuredTop.map(item=>(
            <article key={item.id} className="card glass img-zoom" style={{ borderRadius:"2.5rem", overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 4px 24px rgba(0,0,0,.08)", border:"1px solid rgba(186,202,197,.5)" }}>
              <div style={{ position:"relative", aspectRatio:"4/5", overflow:"hidden", background:"#d4dcd9" }}>
                <div style={{ position:"absolute", top:"12px", left:"12px", zIndex:10, display:"flex", flexDirection:"column", gap:"8px" }}>
                  <BadgeTop badge={item.badge} />
                  {item.extra && <span style={{ background:"rgba(255,255,255,.9)", color:"#2dd4bf", fontSize:"10px", fontWeight:900, padding:"4px 10px", borderRadius:"9999px", textTransform:"uppercase", border:"1px solid rgba(0,107,95,.2)" }}>{item.extra}</span>}
                </div>
                <button style={{ position:"absolute", top:"12px", right:"12px", zIndex:10, width:"40px", height:"40px", borderRadius:"9999px", background:"rgba(255,255,255,.8)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span className="ms" style={{ fontSize:"20px" }}>favorite</span>
                </button>
                <img src={item.img} alt={item.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              </div>
              <div style={{ padding:"20px", display:"flex", flexDirection:"column", flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" }}>
                  <span style={{ fontSize:"13px", fontWeight:700, color:"#2dd4bf" }}>{item.condition}</span>
                  <span style={{ width:"4px", height:"4px", background:"#6b7a76", borderRadius:"9999px" }}></span>
                  <span style={{ fontSize:"13px", color:"#3c4a46" }}>{item.location}</span>
                </div>
                <h3 style={{ fontSize:"18px", fontWeight:700, color:"#161d1b", marginBottom:"8px", lineHeight:1.3 }}>{item.title}</h3>
                <p style={{ fontSize:"22px", fontWeight:900, color:"#2dd4bf", marginBottom:"16px" }}>{item.price}</p>
                <div style={{ marginTop:"auto", paddingTop:"16px", borderTop:"1px solid rgba(186,202,197,.15)", display:"flex", gap:"8px" }}>
                  <button style={{ flex:1, padding:"10px", borderRadius:"12px", background:"#e8efec", border:"none", fontSize:"13px", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}>Message</button>
                  <button style={{ flex:1, padding:"10px", borderRadius:"12px", background:"rgba(37,211,102,.1)", color:"#25D366", border:"none", fontSize:"13px", fontWeight:700, cursor:"pointer" }}>WhatsApp</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* FEATURED PREMIUM SECTION */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
          <h2 style={{ fontSize:"24px", fontWeight:700, color:"#161d1b" }}>Featured Premium Desktops</h2>
          <a href="#" style={{ display:"flex", alignItems:"center", gap:"4px", color:"#2dd4bf", fontWeight:700, fontSize:"13px", textDecoration:"none" }}>View all Premium <span className="ms" style={{ fontSize:"18px" }}>arrow_forward</span></a>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"64px" }}>
          {featuredPremium.map(item=>(
            <article key={item.id} className="card glass img-zoom" style={{ borderRadius:"2.5rem", overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 4px 24px rgba(0,0,0,.08)", border:"1px solid rgba(186,202,197,.5)" }}>
              <div style={{ position:"relative", aspectRatio:"4/5", overflow:"hidden", background:"#d4dcd9" }}>
                <div style={{ position:"absolute", top:"12px", left:"12px", zIndex:10 }}>
                  {item.badge==="new" && <span style={{ background:"#2dd4bf", color:"white", fontSize:"10px", fontWeight:900, padding:"4px 10px", borderRadius:"9999px", textTransform:"uppercase" }}>NEW</span>}
                  {item.badge==="diamond" && <span style={{ background:"#2dd4bf", color:"white", fontSize:"10px", fontWeight:900, padding:"4px 10px", borderRadius:"9999px", display:"flex", alignItems:"center", gap:"4px", textTransform:"uppercase" }}>◆ DIAMOND VERIFIED</span>}
                  {item.badge==="hot" && <span style={{ background:"#ba1a1a", color:"white", fontSize:"10px", fontWeight:900, padding:"4px 10px", borderRadius:"9999px", textTransform:"uppercase" }}>HOT DEAL</span>}
                </div>
                <button style={{ position:"absolute", top:"12px", right:"12px", zIndex:10, width:"40px", height:"40px", borderRadius:"9999px", background:"rgba(255,255,255,.8)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span className="ms" style={{ fontSize:"20px" }}>favorite</span>
                </button>
                <img src={item.img} alt={item.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              </div>
              <div style={{ padding:"20px", display:"flex", flexDirection:"column", flex:1 }}>
                <p style={{ fontSize:"13px", color:"#3c4a46", marginBottom:"8px" }}>{item.spec}</p>
                <h3 style={{ fontSize:"18px", fontWeight:700, color:"#161d1b", marginBottom:"8px", lineHeight:1.3 }}>{item.title}</h3>
                <p style={{ fontSize:"22px", fontWeight:900, color:"#2dd4bf", marginBottom:"16px" }}>{item.price}</p>
                <div style={{ marginTop:"auto", paddingTop:"16px", borderTop:"1px solid rgba(186,202,197,.15)", display:"flex", gap:"8px" }}>
                  <button style={{ flex:1, padding:"10px", borderRadius:"12px", background:"#e8efec", border:"none", fontSize:"13px", fontWeight:700, cursor:"pointer" }}>Message</button>
                  <button style={{ flex:1, padding:"10px", borderRadius:"12px", background:"#25D366", color:"white", border:"none", fontSize:"13px", fontWeight:700, cursor:"pointer" }}>WhatsApp</button>
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
          <div style={{ borderRadius:"2.5rem", padding:"40px", minHeight:"300px", display:"flex", flexDirection:"column", justifyContent:"center", background:"#dde4e1", border:"2px solid rgba(0,107,95,.2)", boxShadow:"0 8px 32px rgba(0,0,0,.06)" }}>
            <p style={{ fontSize:"12px", fontWeight:900, color:"#2dd4bf", textTransform:"uppercase", letterSpacing:".2em", marginBottom:"16px" }}>Solutions for agents</p>
            <h2 style={{ fontSize:"36px", fontWeight:900, color:"#161d1b", marginBottom:"16px", lineHeight:1.2 }}>SouKni Immo Pro</h2>
            <p style={{ fontSize:"18px", color:"#3c4a46", marginBottom:"32px", lineHeight:1.6 }}>Boost your real estate agency visibility with our premium listing dashboard and analytics.</p>
            <button style={{ background:"#2dd4bf", color:"white", padding:"16px 32px", borderRadius:"9999px", fontWeight:900, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", width:"fit-content" }}>Discover Pro Tools</button>
          </div>
        </div>

        {/* DISCOVERY GRID — square */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"64px" }}>
          {discoveryListings.map(item=>(
            <article key={item.id} className="card glass img-zoom" style={{ borderRadius:"2.5rem", overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 2px 12px rgba(0,0,0,.06)", border:"1px solid rgba(186,202,197,.5)" }}>
              <div style={{ position:"relative", aspectRatio:"1/1", overflow:"hidden", background:"#d4dcd9" }}>
                <img src={item.img} alt={item.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                <BadgeDisc badge={item.badge} condition={item.condition} />
                <button style={{ position:"absolute", top:"8px", right:"8px", width:"32px", height:"32px", borderRadius:"9999px", background:"rgba(255,255,255,.85)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span className="ms" style={{ fontSize:"18px" }}>favorite</span>
                </button>
              </div>
              <div style={{ padding:"20px", display:"flex", flexDirection:"column", flex:1 }}>
                <h4 style={{ fontSize:"16px", fontWeight:700, color:"#161d1b", marginBottom:"4px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.title}</h4>
                <p style={{ fontSize:"13px", color:"#3c4a46", marginBottom:"12px" }}>{item.spec}</p>
                <p style={{ fontSize:"18px", fontWeight:900, color:"#2dd4bf", marginBottom:"12px" }}>{item.price}</p>
                <div style={{ marginTop:"auto", display:"flex", gap:"8px" }}>
                  <button style={{ flex:1, padding:"8px", borderRadius:"12px", border:"1px solid rgba(186,202,197,.5)", background:"none", fontSize:"12px", fontWeight:700, cursor:"pointer" }}>Message</button>
                  <button style={{ flex:1, padding:"8px", borderRadius:"12px", background:"rgba(37,211,102,.1)", color:"#25D366", border:"none", fontSize:"12px", fontWeight:700, cursor:"pointer" }}>WhatsApp</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* PAGINATION */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", marginBottom:"64px" }}>
          {["chevron_left","1","2","3","...","49","chevron_right"].map((p,i)=>(
            <button key={i} style={{ width:"40px", height:"40px", borderRadius:"9999px", border:p==="1"?"none":"1px solid rgba(186,202,197,.3)", background:p==="1"?"#2dd4bf":"none", color:p==="1"?"white":"#161d1b", fontWeight:700, fontSize:"14px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {p==="chevron_left"||p==="chevron_right"?<span className="ms">{p}</span>:p}
            </button>
          ))}
        </div>

        {/* DIAMOND BANNER */}
        <div style={{ borderRadius:"2.5rem", padding:"48px", textAlign:"center", color:"white", marginBottom:"16px", background:"linear-gradient(135deg,#2dd4bf 0%,#2dd4bf 100%)", boxShadow:"0 8px 40px rgba(0,107,95,.3)" }}>
          <h2 style={{ fontSize:"40px", fontWeight:900, marginBottom:"16px", letterSpacing:"-0.02em" }}>Become a Diamond Member</h2>
          <p style={{ fontSize:"18px", opacity:.9, maxWidth:"600px", margin:"0 auto 32px", lineHeight:1.6 }}>Enjoy zero listing fees, unlimited highlighted ads, and a dedicated account manager for your tech business.</p>
          <button style={{ background:"white", color:"#2dd4bf", padding:"16px 40px", borderRadius:"9999px", fontWeight:900, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", letterSpacing:".1em" }}>Upgrade to Diamond</button>
        </div>

        {/* ELECTRO PRO BANNER */}
        <div style={{ position:"relative", height:"320px", borderRadius:"2.5rem", overflow:"hidden", marginBottom:"64px", boxShadow:"0 8px 32px rgba(0,0,0,.15)" }}>
          <img src="https://lh3.googleusercontent.com/aida/AP1WRLte3T4jAlSSr_19KmztIwAOuMomYBX371H5SvypnAcC-dCwNUH96XVDrGN71dmKnJoCAiEhAhdRdIYSHYSdTV6C2C6ri6B5B1J6qC-owzK7-ULfEqiwvenK8X0VKGFkVwbpCzZGXyLI0hDHwxCw_cQN4N5rmyLy_L11FGTVlroKku6Nwfdy1vSNMWGcXj18jmEHAEhZ-QaiALhK3Y6u0uCQrkiqJsQ0ZbAeiH5tfy75cjiCtAuEH55WPA" alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
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
