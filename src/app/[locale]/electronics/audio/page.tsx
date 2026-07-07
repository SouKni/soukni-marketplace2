export default function AudioPage() {

  const featuredListings = [
    { id: 1, badge: "diamond", title: "Beosound A9 5th Gen", price: "28,500 MAD", condition: "New", location: "Rabat, Agdal", img: "https://lh3.googleusercontent.com/aida/AP1WRLvQvytGgt-0LrDZYTJq4vaW11JLYO8tOCJsRhz_pCRmwGPZx0XgbqegcBHeQ_4Qoic33v50EtWUZGKg02lGUxl-TcvUgtGfioASk7E-dkojlc_5hztUsiqOWmQoXR-EBB9dnHf6Em5O8slzeiBgVQWviRUCxivRmZDMiUY6zb7ay1cAN9UItmQB9Db044_mN-Plbd2_oF77A5jOA09OzPHeWzOyKL0XuDw4rr4HSqoWtWbdWNifQped" },
    { id: 2, badge: "pro", title: "Phantom I 108 dB Gold", price: "34,200 MAD", condition: "In Stock", location: "Rabat, Souissi", img: "https://lh3.googleusercontent.com/aida/AP1WRLu351srtHYU1W6iJN3zQ8tg5k28eFK-IW9My4xMu-y4m-3n7U8odu7N34ER8gQCiz6k0lP4aHa-OxSOsuYmRJ_Xi_mRxAWE3eiosANALXPbm5eseDgyuAFZH8C2-OS7kE_ekW9Ryhn0vQZTQj-8tk6lt0ErAdKet8ddG8Kl0aAZ-zcS7aE-kp-vjbAHEvnglkyKrJXPNCkF3fPWx5WdvMx9q1m_hBafc8nny5UH3ZPEgfXlTB5PknmkLw" },
    { id: 3, badge: "diamond", title: "LS60 Wireless Royal Blue", price: "48,900 MAD", condition: "New", location: "Rabat Center", img: "https://lh3.googleusercontent.com/aida/AP1WRLshfjKWLINwS3nGr6rPLprZ68BaPpnWgIDINBE3TLbvtAVYVwt3rK3thlPSNeH74yZiHP-9AhTsjZ4KvnPlPzqyDW5zWrICz_0_MY6fwpoM3rF5qR1sWrzuh4ebpN5cF3Tp8pN2bVcBHLJpkLaH-tkdaj1oEuyqD09crCMoMmqIQvNypohBA_iVMi158JKauc7MXKQRyJDthOOO8empcD5AxQ-IGb1NEjgl1CjrBV9kju79UIi_5ISx" },
    { id: 4, badge: "verified", title: "Mu-so 2nd Gen Wood", price: "15,400 MAD", condition: "New Arrival", location: "Rabat, Hay Riad", img: "https://lh3.googleusercontent.com/aida/AP1WRLvPEnjjm2NC71nVIoehGZnjOdWYbtLgPtjEd_L8nQBGhHCWiR084qRdVheFzVmapIGsXOoI7Cv719vlnRkJsw0PE1Gn1j1TTHLeV27eLigibYupy-NzHJOjXSEerqCPBEBaTLyd0oL9-BiQzendTH8kRMhWQCYW-2DNsTIggiUuAuJMGsfgrc0yjsfiHxqH6u6sMalcgX4d7T82txtsXq3lede9qDq6YsM5FPj1JUE53ar44NXPhesrvQ" },
  ]

  const latestRow1 = [
    { id: 5,  label: "New",            title: "Sonos Arc Premium Soundbar",   location: "Rabat, Souissi",  price: "8,900 MAD",  img: "https://lh3.googleusercontent.com/aida/AP1WRLvEta3meSCI0Wsau0pUS8K-TRmVdRVEmz_aljC8-gCxLpNICNjnlL_C1Yc5ltKXSjwauuIZm_cP3T3IKtYkJjBqpLQ3nniQb749Bb_MajvWa2zpKtsbRqPT4ZYJg-xz9sHx-iA-Z6ZDfRUwASN5u8V3VPn_jTpbTEkZl5E0bo3snatAUAca_QWIc-2vR6lj7DrkBMZOkGyaHp9TN6F0svcIXsnISenaObCpA6g_4-ruBP9xAZqbeJFjjA", labelRed: false },
    { id: 6,  label: "-15% OFF",       title: "Vintage Hi-Fi Floor Speakers", location: "Rabat, Hassan",   price: "4,500 MAD",  img: "https://lh3.googleusercontent.com/aida/AP1WRLuvnJW24L7P74cJUviy7TYJsiKgSecvThBUyLtwsRLvDtnXnorKcpwDHKxLlN-2ffmFnEIUze6NNMhSyp8sGOLAwhXr-TiKqfMUXM8lhLakPgyY6caj_NpUv-iwXJDbymC9qlEVWw3krNOmjWkvzdz2JuuSJo-CgQA_t-NA51wQo8mNGPJ6-A4JKPm6lIG60ANmHfZiAvt5U-49s0ZS8up0KokBCRgm1QhWVqAV-FVRY9TTHxz29em5UQ", labelRed: true },
    { id: 7,  label: "Excellent",      title: "Bose SoundLink Revolve+ II",   location: "Rabat, Agdal",    price: "2,200 MAD",  img: "https://lh3.googleusercontent.com/aida/AP1WRLuX0Q7-N3CiMo7b_YFIlCgaPTl2DJ59M4ipG5mpcA29x-vrTqiN8FoITuV3vufldkyz-Ql6PTlphtNBXltXPHaKqZY2EdtLfCgZv2si4nVUBw-Bei7CQ-FxJf5ngd8-rLRIWdn3Ry0ww6wizRs4G7OLs9k3QqvmllRtvM73W_rv622yRrgliAmbmjmhShemnpFqpwfnulhmoOw6RZoZVRqk8Tu96y6II4_Qry28CImgwXe1uxdcUMgOBw", labelRed: false },
  ]

  const latestRow2 = [
    { id: 8,  label: "NEW",            title: "Sonos Arc Premium Soundbar",   location: "Rabat, Souissi",  price: "8,900 MAD",  img: "https://lh3.googleusercontent.com/aida/AP1WRLvEta3meSCI0Wsau0pUS8K-TRmVdRVEmz_aljC8-gCxLpNICNjnlL_C1Yc5ltKXSjwauuIZm_cP3T3IKtYkJjBqpLQ3nniQb749Bb_MajvWa2zpKtsbRqPT4ZYJg-xz9sHx-iA-Z6ZDfRUwASN5u8V3VPn_jTpbTEkZl5E0bo3snatAUAca_QWIc-2vR6lj7DrkBMZOkGyaHp9TN6F0svcIXsnISenaObCpA6g_4-ruBP9xAZqbeJFjjA", labelRed: false },
    { id: 9,  label: "PRICE DROP (-15%)", title: "Yamaha HS8 Studio Monitors", location: "Rabat, Hassan",  price: "5,400 MAD",  img: "https://lh3.googleusercontent.com/aida/AP1WRLuvnJW24L7P74cJUviy7TYJsiKgSecvThBUyLtwsRLvDtnXnorKcpwDHKxLlN-2ffmFnEIUze6NNMhSyp8sGOLAwhXr-TiKqfMUXM8lhLakPgyY6caj_NpUv-iwXJDbymC9qlEVWw3krNOmjWkvzdz2JuuSJo-CgQA_t-NA51wQo8mNGPJ6-A4JKPm6lIG60ANmHfZiAvt5U-49s0ZS8up0KokBCRgm1QhWVqAV-FVRY9TTHxz29em5UQ", labelRed: true },
    { id: 10, label: "USED - LIKE NEW", title: "Shure SM7B Vocal Mic",        location: "Rabat, Agdal",    price: "3,800 MAD",  img: "https://lh3.googleusercontent.com/aida/AP1WRLuX0Q7-N3CiMo7b_YFIlCgaPTl2DJ59M4ipG5mpcA29x-vrTqiN8FoITuV3vufldkyz-Ql6PTlphtNBXltXPHaKqZY2EdtLfCgZv2si4nVUBw-Bei7CQ-FxJf5ngd8-rLRIWdn3Ry0ww6wizRs4G7OLs9k3QqvmllRtvM73W_rv622yRrgliAmbmjmhShemnpFqpwfnulhmoOw6RZoZVRqk8Tu96y6II4_Qry28CImgwXe1uxdcUMgOBw", labelRed: false },
  ]

  const latestRow3 = [
    { id: 11, label: "NEW",      title: "Pioneer XDJ-XZ DJ System",   location: "Rabat, Souissi",  price: "18,200 MAD", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6WMauF6vkz4rKeVGtInyH47HHVZNCDYVWfot8vpWBaueQSK2z4M_Zp938Qg46EDBflOEFfnB4cChWzqL5-MdA4yGhYg0gA9qKuGdce9vD6JCvmwCdjgUyBe9NTuCQ5meHq6gp2arpdVyAvG8KCy0bM6o9KoJx-W1KLyeG81Or8gxC5_fQIHtj6kLMA52TEgewLA5fZoFMw-VgDlu9ESpySt6tUFVQIZf02gCoEILLqMEGQZmYCtxbB-tpz38q-beqDtuQ4vhgMA", labelRed: false },
    { id: 12, label: "VERIFIED", title: "Roland V-Drums TD-27KV2",   location: "Rabat, Hassan",   price: "32,000 MAD", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDP2BNnoXt0OHLKUSmB5zsXHeLL2nnDCO5dkvH8ZtkKG0-lzVOZmcysrDf0kYlsBShHOPx_y1W1lSZLxPhgnZRxkXm32ECDC0IkAb8wUqnRrPmKyDdnHltXpwbn4dP-wApxSaLohzUabmDRY2avF9M_XfnlCcJDac4XweAmPRMg-9nbiz1muyVc8DdcMPebgkPdxYc3jAsldAPEhKpJI7fMspXF0vqymlt4k82iLQDmS2xKWWcEA1QmI8yvSTXyjvf2l4ILO5-aJg", labelRed: false },
    { id: 13, label: "NEW",      title: "Akai MPC Live II",           location: "Rabat, Agdal",    price: "12,500 MAD", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAy99GlOzwDTmsrw08FI0Ec04x9wJMGo4ek9c0GlKuuMhqgynsT9N3ilwjrB2Con1kek30Qs8k1xH9zDfTUXlxadCNNHndbNhiSR38NO_Pb8onvd5O2CbQ6NKQAsnNkxr8H92xv8VC8InTxZpmOC3V2F2fRcP8aqpXg10zf4pqQ2eHGRE_k4oQca9gyGjZk6KYOelYNQGnrBhKHhB7leV1N22BwDIysujqby6O4kruwd8GiCopi-X1sLwCJG7H4YSRi8fxTSDTMzA", labelRed: false },
    { id: 14, label: "VERIFIED", title: "Focusrite Scarlett 18i20",   location: "Rabat Center",    price: "4,200 MAD",  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtMJjAisswrsAptVM4hXhBzjUF8B9WsTK1tGtt2m1iZrunzWFeV7TxFP8kx7nmTPab6yH62exPr3QOYTp88ahwYOWCgJwfqdCWAIqJ-hZu4Uk5J1eP5UHMpeAzmBDrGwZyz578P21PtXQZn3tSm_GrDxEX0lYiXvgThYjSHqYQuEg9y5n06G8kESlQha982KQtqH0XTp_-1O4OvetvR0N3Y7M9S_3JZvadeHOy-29LwybzrKGJhsKVdytOVxeZFR-OMGCBSR4_YQ", labelRed: false },
  ]

  const latestRow4 = [
    { id: 15, label: "VINTAGE",        title: "Marshall JCM800 Stack",      location: "Rabat, Souissi",  price: "22,000 MAD", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvXVCS44FuH8dYVYg5htffeZEIqkMNQuWyD3eybPvfp_reH8JD0NHQ5C36j6nxTtLrY-7roSQUnMogMh_7GHn_G8qQXjYS4Dwk83kORTvItc6D2SN_poQnjVj73giW0KmVhMuG-nICGq-Y8NiV8AInSu26QidlYnsz-SCEAxf26Ci54Cn6cNXt299XZt5NIGmLL_BduP1aCNNYmUFcFggV8N4muLDweBm2ZEv9OW7tRUR2TwhxL9SNmg_mleYciMDjCBd_d6gY1A", labelRed: false },
    { id: 16, label: "DIAMOND MEMBER", title: "Nord Stage 4 88-Key",        location: "Rabat, Hassan",   price: "45,000 MAD", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDj3u-seSPwmP5QNtc0d03MLlhtaVnLKP6Ca7QcLbXlncey2J281A-NJiZAg75ptlV1rXI0I_YT-uVPJE8wO_lOdKWb0UunOAdVm3VFetYA3c05tIIlcthz2RMxepq6q9sNZhQotPhmTk5fhh7GmnvOdqYgIwIHTyORFnJYjh9C1CTCVkdlCJFi54mVmEspo8jBe3XlCnePYAtwO2ytbhdTWgt3NC7Wj0Sm6UzBNJ2gu1l_duUX2J-NpBUvA8ABvFEAPIp5Exfiyg", labelRed: false, isDiamond: true },
    { id: 17, label: "PRO RIG",        title: "Shotgun Mic with Zeppelin",  location: "Rabat, Agdal",    price: "6,800 MAD",  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4ns_8LxlqVA1TFIPjl4ntP2_vlfsDFEwbXAKn30FcUqshgf325XeLoIofWr-07GDLM5o5JoB6xO_ZNGjIT6i_YnxXLWUa-OsKUcqcdOYzkU3VwbDByN3MNMWvHR2giK-KC0ZIttrE4RQUBydBrN-dJmjpxQWVjtVbNkATw-7dFIVd65mmXB8pJAy7AeC5LHxyexljqouZiLmTf24naiGH1iQK8f1MTlB8yW9gIGpGBtjl8g-mEaNdnZL0dtIGUjfrdr5Wsuy60A", labelRed: false },
    { id: 18, label: "NEW",            title: "KRK Rokit 7 G5",             location: "Rabat Center",    price: "5,400 MAD",  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAj3I9UnPHTyWTM0y5ELCanW4qwck2cBHSgq0BUmFoU6f7xA2BRqAQqKQDxZLqYFC_fiGtontQgwW75WAiaLV9jifmYag9OA4luo42uxQ9UJ3dP_q-B6lUr7oztJTBtoss9nyugndqGFTRUNWNZ93nAmgQwaXowoYOF9JDeL8Hb9ePXiW3Fx62PIyvyXTuPoVjgHcIIfa4z6BpDy2ctb6zvBiqrf2M4L6nFw9GYV7FF-XBdcmeWlc1vjnusXZhTouchwtJ0DOXIQ", labelRed: false },
  ]

  const showcaseRow1 = [
    { id: 19, label: "NEW",      title: "Phantom I 108 dB Gold",   location: "Rabat, Souissi",  price: "34,200 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLu351srtHYU1W6iJN3zQ8tg5k28eFK-IW9My4xMu-y4m-3n7U8odu7N34ER8gQCiz6k0lP4aHa-OxSOsuYmRJ_Xi_mRxAWE3eiosANALXPbm5eseDgyuAFZH8C2-OS7kE_ekW9Ryhn0vQZTQj-8tk6lt0ErAdKet8ddG8Kl0aAZ-zcS7aE-kp-vjbAHEvnglkyKrJXPNCkF3fPWx5WdvMx9q1m_hBafc8nny5UH3ZPEgfXlTB5PknmkLw" },
    { id: 20, label: "VERIFIED", title: "Beosound A9 5th Gen",     location: "Rabat, Agdal",    price: "28,500 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLvQvytGgt-0LrDZYTJq4vaW11JLYO8tOCJsRhz_pCRmwGPZx0XgbqegcBHeQ_4Qoic33v50EtWUZGKg02lGUxl-TcvUgtGfioASk7E-dkojlc_5hztUsiqOWmQoXR-EBB9dnHf6Em5O8slzeiBgVQWviRUCxivRmZDMiUY6zb7ay1cAN9UItmQB9Db044_mN-Plbd2_oF77A5jOA09OzPHeWzOyKL0XuDw4rr4HSqoWtWbdWNifQped" },
    { id: 21, label: "NEW",      title: "Naim Mu-so 2nd Gen",      location: "Rabat, Hay Riad", price: "15,400 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLvPEnjjm2NC71nVIoehGZnjOdWYbtLgPtjEd_L8nQBGhHCWiR084qRdVheFzVmapIGsXOoI7Cv719vlnRkJsw0PE1Gn1j1TTHLeV27eLigibYupy-NzHJOjXSEerqCPBEBaTLyd0oL9-BiQzendTH8kRMhWQCYW-2DNsTIggiUuAuJMGsfgrc0yjsfiHxqH6u6sMalcgX4d7T82txtsXq3lede9qDq6YsM5FPj1JUE53ar44NXPhesrvQ" },
    { id: 22, label: "DIAMOND",  title: "KEF LS60 Wireless",       location: "Rabat Center",    price: "48,900 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLshfjKWLINwS3nGr6rPLprZ68BaPpnWgIDINBE3TLbvtAVYVwt3rK3thlPSNeH74yZiHP-9AhTsjZ4KvnPlPzqyDW5zWrICz_0_MY6fwpoM3rF5qR1sWrzuh4ebpN5cF3Tp8pN2bVcBHLJpkLaH-tkdaj1oEuyqD09crCMoMmqIQvNypohBA_iVMi158JKauc7MXKQRyJDthOOO8empcD5AxQ-IGb1NEjgl1CjrBV9kju79UIi_5ISx" },
  ]

  const showcaseRow2 = [
    { id: 23, label: "NEW",      title: "Pioneer XDJ-XZ System",  location: "Rabat, Souissi",  price: "18,200 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLvyJRJGBbCHDvOBms6M5emjJAWYrL0fuvzKyrSDRvt6oWLClDl36NFUgL3aU4Wfc8w1Szxq8jiS_PuUgGk2rsdPPTaRqzDvpzcPdxIVZUKPJtdjie-wED7ypUQlP--bUGGKu_Q09ACj5BQgW3yIrbLaK7D8oBiqoP7bg3oWg5kE0fwTM3K3GhMgALQGNZMj6VgFF1IcgTHcAYeC8q-uKHhE9_QwBlpsovKgbcw-Bv8mhAy7PQlLGi-UFQ" },
    { id: 24, label: "VERIFIED", title: "Roland V-Drums TD-27KV2",location: "Rabat, Hassan",   price: "32,000 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLsv58-HXZW3HS9fD0eRRC93ubfQ-BTDtxqGsyqQY7_XL9qb8r_RSS_Id88YmlwSAlR_PlwDgGba_2snL9Pt7T6dZFwWRQyULVpL9apcqNS0-lQX0jlVWfQysZFF8FQAqV0z59a6AdGr6SNRtonOguMjYIEdiNNq_1W17AQndV5B3KrPPx5GyMqpiwMNe0cgYLf9ZO_21I9Rmg0yvq__uSjnWTwR7DdG5w3fhLUZ-4vRtnMoZ5LO5wneuA" },
    { id: 25, label: "VINTAGE",  title: "Marshall JCM800 Stack",  location: "Rabat, Souissi",  price: "22,000 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLuWhRrZvEKZZq4L8NUB9q4YWL4i4odJvifDC3CSzhmkDUj_wYrzrcQOmf6f3-JRm_evH0-Hc3ILs2MK5zydVaV-svd1SfzE1Gm1EtD_AXHQTGx-rqwDlZBCL9G6nFYV_8KcI3bvoO_U5rpPGvKMAcJ3O-yackpZZ33EQ5B2Z-pcW4SgzuJwSm8QROcllHjaIz5f_KmpdjQrzLte2JUVapcrhzkBtcK77QIPbynw0ALhX_1Lyc7CWAkqng" },
    { id: 26, label: "NEW",      title: "Nord Stage 4 88-Key",    location: "Rabat, Hassan",   price: "45,000 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLvD-0puLgME4Ywa35M7D14rtH0mkjMQc52VM1Fmyct49NEeQuHPljqIoY0FMcv1Bb5DqJeDyw-dw5OBauEq7E-RzHVmhdSLUtxoHob1EmFA0PwxecHoX8PlMB0YbXnRHMk2mEr9soD6ylemfI2oZmndvBTe1-k-Fqw8RZ_UKnuvg18bEC_Zv5Ua_ViDwYnS0X-rzcYiLI9SsNuXFqPpilE9tcCNWKGLZ1cODzxNPFOfR4tfG0z3sTorbA" },
  ]

  const brands = ["Devialet","Bang & Olufsen","Naim","Sonos","Bose","Sony","JBL"]

  const DiamondTrustCard = ({ msg, btn }: { msg: string, btn: string }) => (
    <div style={{ borderRadius:"2.5rem", padding:"32px", display:"flex", flexDirection:"column", justifyContent:"space-between", color:"white", boxShadow:"0 8px 32px rgba(0,107,95,.3)", position:"relative", overflow:"hidden", background:"linear-gradient(135deg,#2dd4bf 0%,#2dd4bf 100%)" }}>
      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC5_BmVjN_s1-KhCBF5L_MFrifBCpc3gvBnN0kLhO7h1Ju6Hia1eSCXmDYbenu7ylw4Iazlhgb8ofav1RQTXRATchtjFKRqfGQ8hRKXHAnQo53kKMeZXLeKK3O1BCwVmuWPOFwBcYHsoWmCOaT2wSRXSd8TYUAm0Hdkd5yq2N2oF_SOFPQSKB6UZ0R7_GISWisHOcnsWqmKhnsUjGjQBK-HMHq43JZ9bX0FiZOAfuJvrVqCQPTIKiWviuLrWlWaJNRNgwdfd9xFg" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.1 }} />
      <div style={{ position:"relative", zIndex:1 }}>
        <div style={{ fontSize:"32px", marginBottom:"16px" }}>◆</div>
        <h3 style={{ fontSize:"22px", fontWeight:700, marginBottom:"12px", lineHeight:1.3 }}>{msg}</h3>
        <p style={{ fontSize:"13px", opacity:.9 }}>Verified ID, Secure Payments &amp; Local Pickup Guarantee in Rabat.</p>
      </div>
      <button style={{ position:"relative", zIndex:1, width:"100%", background:"white", color:"#2dd4bf", fontWeight:700, padding:"16px", borderRadius:"16px", marginTop:"24px", border:"none", cursor:"pointer", fontSize:"13px", textTransform:"uppercase" }}>{btn}</button>
    </div>
  )

  const DiscCard = ({ item }: { item: typeof latestRow1[0] & { isDiamond?: boolean } }) => (
    <article className="card glass img-zoom2" style={{ borderRadius:"2.5rem", overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 2px 12px rgba(0,0,0,.06)", border:"1px solid rgba(186,202,197,.5)" }}>
      <div style={{ position:"relative", aspectRatio:"1/1", overflow:"hidden", background:"#d4dcd9" }}>
        <img src={item.img} alt={item.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        <div style={{ position:"absolute", bottom:"8px", left:"8px", padding:"2px 8px", borderRadius:"6px", fontSize:"10px", fontWeight:700, textTransform:"uppercase", background: item.labelRed ? "rgba(186,26,26,.8)" : item.isDiamond ? "#2dd4bf" : "rgba(255,255,255,.85)", backdropFilter:"blur(4px)", color: item.labelRed || item.isDiamond ? "white" : "#2dd4bf" }}>{item.label}</div>
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
        .img-zoom2 img{transition:transform .5s;}.img-zoom2:hover img{transform:scale(1.05);}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        .bounce{animation:bounce 1s infinite;}
      `}</style>

      {/* HERO */}
      <section style={{ position:"relative", height:"400px", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0 }}>
          <img src="https://lh3.googleusercontent.com/aida/AP1WRLsPKGhjLG_VjGzH3uznSdcdpc0x8DVANhr5KSTsHlvfKcBzOH-b7_QfqC23g4e5KRL6J7S_IjcYmp60TP8rDanTcmciks_YpsTGqAMMSSsxyy1XgQLrfeHesSMXSYo9Pcabc33MMUZvfjkhHXqMZoLgmhJCzeOHVrD4PRBZ9V7jcobkn4kP7g5tYWA8Gc4RnaZD4aHbcaS1N7f5e6IUSTfgBp-MMmpj36CUDtnHl1faIDs4_gWdYW5u" alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(0,0,0,.4),transparent,#f4fbf8)" }}></div>
        </div>
        <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:"896px", margin:"0 auto", padding:"0 20px", display:"flex", flexDirection:"column", alignItems:"center" }}>
          <h1 style={{ fontSize:"48px", fontWeight:900, color:"white", marginBottom:"32px", textAlign:"center", lineHeight:1.1, letterSpacing:"-0.02em", textShadow:"0 4px 16px rgba(0,0,0,.5)" }}>Discover Your Best Sound in Rabat</h1>
          <div style={{ width:"100%", display:"flex", gap:"8px", padding:"8px", borderRadius:"3rem", background:"rgba(255,255,255,.1)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,.3)" }}>
            <div style={{ flex:1, display:"flex", alignItems:"center", borderRadius:"9999px", padding:"12px 20px", background:"rgba(244,251,248,.5)" }}>
              <span className="ms" style={{ color:"#3c4a46", marginRight:"12px" }}>search</span>
              <input style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:"16px" }} placeholder="Search premium speakers, hi-fi, soundbars..." />
            </div>
            <div style={{ flex:1, display:"flex", alignItems:"center", borderRadius:"9999px", padding:"12px 20px", background:"rgba(244,251,248,.5)" }}>
              <span className="ms" style={{ color:"#3c4a46", marginRight:"12px" }}>location_on</span>
              <select style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:"16px", appearance:"none" }}>
                <option>Rabat</option><option>Casablanca</option>
              </select>
            </div>
            <button style={{ background:"#2dd4bf", color:"white", border:"none", borderRadius:"9999px", padding:"0 40px", fontWeight:700, fontSize:"15px", cursor:"pointer", display:"flex", alignItems:"center", gap:"8px" }}>
              <span className="ms">manage_search</span> SEARCH
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
              <input style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:"16px" }} placeholder="Hi-Fi, Sonos, Floor Speakers..." />
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
          <span style={{ fontWeight:700, color:"#161d1b" }}>Home Audio</span>
        </nav>
      </div>

      {/* TITLE + CONTROLS */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 32px", padding:"0 40px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"16px" }}>
          <div>
            <h1 style={{ fontSize:"24px", fontWeight:700, color:"#161d1b", marginBottom:"4px" }}>New and Used Home Audio &amp; Speakers in Rabat</h1>
            <p style={{ fontSize:"16px", color:"#3c4a46", textTransform:"uppercase", letterSpacing:".05em" }}>4,874 ADS IN RABAT DISTRICT</p>
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
              <span style={{ fontSize:"13px", fontWeight:600, color:"#3c4a46" }}>Show Diamond Certified First</span>
              <div style={{ width:"36px", height:"20px", background:"#2dd4bf", borderRadius:"9999px", display:"flex", alignItems:"center", padding:"0 3px", cursor:"pointer", justifyContent:"flex-end" }}>
                <div style={{ width:"14px", height:"14px", background:"white", borderRadius:"9999px" }}></div>
              </div>
            </div>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"8px" }}>
            <div style={{ display:"flex", background:"#e8efec", borderRadius:"9999px", padding:"4px", border:"1px solid rgba(186,202,197,.3)" }}>
              <button style={{ padding:"8px 24px", borderRadius:"9999px", background:"white", boxShadow:"0 2px 8px rgba(0,0,0,.08)", fontSize:"13px", fontWeight:700, color:"#2dd4bf", border:"none", cursor:"pointer" }}>All Sellers (4,874)</button>
              <button style={{ padding:"8px 24px", fontSize:"13px", fontWeight:600, color:"#3c4a46", background:"none", border:"none", cursor:"pointer" }}>SouKni Members (3,120)</button>
              <button style={{ padding:"8px 24px", fontSize:"13px", fontWeight:600, color:"#3c4a46", background:"none", border:"none", cursor:"pointer" }}>SouKni Pro (1,754)</button>
            </div>
            <div style={{ marginLeft:"auto", display:"flex", gap:"12px" }}>
              <button style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 20px", borderRadius:"9999px", background:"#eef5f2", border:"1px solid rgba(186,202,197,.3)", fontSize:"13px", fontWeight:700, cursor:"pointer" }}><span className="ms" style={{ fontSize:"18px" }}>sort</span> Sort: Featured</button>
              <button style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 16px", borderRadius:"9999px", background:"#eef5f2", border:"1px solid rgba(186,202,197,.3)", fontSize:"13px", fontWeight:700, cursor:"pointer" }}><span className="ms" style={{ fontSize:"18px" }}>grid_view</span></button>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED PREMIUM ROW */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 48px", padding:"0 40px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
          <h2 style={{ fontSize:"24px", fontWeight:700, color:"#2dd4bf" }}>Featured Premium Audio &amp; Speakers</h2>
          <a href="#" style={{ display:"flex", alignItems:"center", gap:"4px", color:"#2dd4bf", fontWeight:700, fontSize:"13px", textDecoration:"none" }}>View all Featured <span className="ms" style={{ fontSize:"18px" }}>chevron_right</span></a>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px" }}>
          {featuredListings.map(item=>(
            <article key={item.id} className="card glass img-zoom" style={{ borderRadius:"2.5rem", overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 4px 24px rgba(0,0,0,.08)", border:"1px solid rgba(186,202,197,.5)" }}>
              <div style={{ position:"relative", aspectRatio:"4/5", overflow:"hidden", background:"#d4dcd9" }}>
                <div style={{ position:"absolute", top:"12px", left:"12px", zIndex:10 }}>
                  {item.badge==="diamond" && <span style={{ background:"#2dd4bf", color:"white", fontSize:"10px", fontWeight:900, padding:"4px 10px", borderRadius:"9999px", display:"flex", alignItems:"center", gap:"4px", textTransform:"uppercase" }}>◆ DIAMOND MEMBER</span>}
                  {item.badge==="pro" && <span style={{ background:"#62fae3", color:"#00201c", fontSize:"10px", fontWeight:700, padding:"4px 10px", borderRadius:"9999px", display:"flex", alignItems:"center", gap:"4px" }}>✓ PRO SELLER</span>}
                  {item.badge==="verified" && <span style={{ background:"#dde4e1", color:"#3c4a46", fontSize:"10px", fontWeight:700, padding:"4px 10px", borderRadius:"9999px", display:"flex", alignItems:"center", gap:"4px" }}>✓ VERIFIED</span>}
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
                  <button style={{ flex:1, padding:"10px", borderRadius:"12px", background:"#e8efec", border:"none", fontSize:"13px", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px" }}><span className="ms" style={{ fontSize:"18px" }}>chat_bubble</span> Message</button>
                  <button style={{ flex:1, padding:"10px", borderRadius:"12px", background:"rgba(37,211,102,.1)", color:"#25D366", border:"none", fontSize:"13px", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px" }}><span className="ms" style={{ fontSize:"18px" }}>call</span> WhatsApp</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* INTERSTITIAL */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 64px", padding:"0 40px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
          <div style={{ borderRadius:"2.5rem", padding:"40px", minHeight:"300px", display:"flex", flexDirection:"column", justifyContent:"center", background:"#2dd4bf", color:"white", boxShadow:"0 8px 32px rgba(0,107,95,.3)", position:"relative", overflow:"hidden" }}>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqomfAJG38WMnUEKsnJZ8i9ULkYGDMrZGsC8dng9UxrExKsNVgzctPW3dbZEZdsved9ogGEDa650x_hPR6ivNNj5ZQsNVTha93xZLsp9za8vv81zbfPBGnj6KmGU76iEVidbKkZhpZVJzxUn-1SFJRQiw0OyfdS46DJlef7WAF2csClmeGBs_4eSrPHWeDkq8iL9AD2ROA7By9yAz5sEwcr74YrliV6eC9jkP6CE-d_sTjqdotQ60BdWwyuGhrDdwt-uQVk5i2Yg" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.3 }} />
            <div style={{ position:"relative", zIndex:1, maxWidth:"400px" }}>
              <h2 style={{ fontSize:"36px", fontWeight:900, marginBottom:"16px", lineHeight:1.2 }}>Join the SouKni Family</h2>
              <p style={{ fontSize:"18px", marginBottom:"32px", opacity:.9, lineHeight:1.6 }}>Start selling your audio gear today for free and reach millions of music enthusiasts in Morocco.</p>
              <button style={{ background:"white", color:"#2dd4bf", padding:"16px 32px", borderRadius:"9999px", fontWeight:900, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", width:"fit-content" }}>Register today for free</button>
            </div>
          </div>
          <div style={{ borderRadius:"2.5rem", padding:"40px", minHeight:"300px", display:"flex", flexDirection:"column", justifyContent:"center", background:"#dde4e1", border:"2px solid rgba(0,107,95,.2)", boxShadow:"0 8px 32px rgba(0,0,0,.06)", position:"relative", overflow:"hidden" }}>
            <img src="https://lh3.googleusercontent.com/aida/AP1WRLsPKGhjLG_VjGzH3uznSdcdpc0x8DVANhr5KSTsHlvfKcBzOH-b7_QfqC23g4e5KRL6J7S_IjcYmp60TP8rDanTcmciks_YpsTGqAMMSSsxyy1XgQLrfeHesSMXSYo9Pcabc33MMUZvfjkhHXqMZoLgmhJCzeOHVrD4PRBZ9V7jcobkn4kP7g5tYWA8Gc4RnaZD4aHbcaS1N7f5e6IUSTfgBp-MMmpj36CUDtnHl1faIDs4_gWdYW5u" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.2 }} />
            <div style={{ position:"relative", zIndex:1, maxWidth:"400px" }}>
              <p style={{ fontSize:"12px", fontWeight:900, color:"#2dd4bf", textTransform:"uppercase", letterSpacing:".2em", marginBottom:"16px" }}>Solutions for agents</p>
              <h2 style={{ fontSize:"36px", fontWeight:900, color:"#161d1b", marginBottom:"16px", lineHeight:1.2 }}>SouKni Immo Pro</h2>
              <p style={{ fontSize:"18px", color:"#3c4a46", marginBottom:"32px", lineHeight:1.6 }}>Boost your audio business visibility with our premium listing dashboard and professional analytics.</p>
              <button style={{ background:"#2dd4bf", color:"white", padding:"16px 32px", borderRadius:"9999px", fontWeight:900, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", width:"fit-content" }}>Discover Pro Tools</button>
            </div>
          </div>
        </div>
      </div>

      {/* LATEST LISTINGS */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 64px", padding:"0 40px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
          <h2 style={{ fontSize:"24px", fontWeight:700, color:"#161d1b" }}>Latest Listings in Rabat</h2>
          <a href="#" style={{ display:"flex", alignItems:"center", gap:"4px", color:"#2dd4bf", fontWeight:700, fontSize:"13px", textDecoration:"none" }}>View All Listings <span className="ms" style={{ fontSize:"18px" }}>arrow_forward</span></a>
        </div>
        {/* Row 1: 3 cards + Diamond Trust card */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"16px" }}>
          {latestRow1.map(item=><DiscCard key={item.id} item={item} />)}
          <DiamondTrustCard msg="Trust Diamond Certified Sellers" btn="Learn More" />
        </div>
        {/* Row 2: 3 cards + Diamond Trust card */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"16px" }}>
          {latestRow2.map(item=><DiscCard key={item.id} item={item} />)}
          <DiamondTrustCard msg="Create Your Member Account Today 100% FREE! 0,00MAD" btn="Become a Member today" />
        </div>
        {/* Row 3: 4 cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"16px" }}>
          {latestRow3.map(item=><DiscCard key={item.id} item={item} />)}
        </div>
        {/* Row 4: 4 cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px" }}>
          {latestRow4.map(item=><DiscCard key={item.id} item={{ ...item, isDiamond: item.label==="DIAMOND MEMBER" }} />)}
        </div>
      </div>

      {/* DIAMOND BANNER */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 16px", padding:"0 40px" }}>
        <div style={{ borderRadius:"2.5rem", padding:"48px", textAlign:"center", color:"white", background:"linear-gradient(135deg,#2dd4bf 0%,#2dd4bf 100%)", boxShadow:"0 8px 40px rgba(0,107,95,.3)", position:"relative", overflow:"hidden" }}>
          <img src="https://lh3.googleusercontent.com/aida/AP1WRLu4en38XfBWOH4KcwnR_rbO70i78dYWigs2LJumqb6g3mdqwzouaOdsE7k2RcP71FpINyDQHgmJJQr6o9q7DGYfvsedFXCZRdHG0rBdiCKqWLhF1XIiNTyngLggmfT60Du9gwVQ48zxy4ZbE_y1CX5RIIi_NPP_ew1b02a1K5XDfwXQOy1zrUJwSIjj2ntZ-RY195aEu8dXIQp7GBVrShGEt1RWdGNJtfPim7Pm_DnwOXO0-KGadFDKyw" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.2 }} />
          <div style={{ position:"relative", zIndex:1 }}>
            <h2 style={{ fontSize:"40px", fontWeight:900, marginBottom:"16px" }}>Become a Diamond Member</h2>
            <p style={{ fontSize:"18px", opacity:.9, maxWidth:"600px", margin:"0 auto 32px", lineHeight:1.6 }}>Enjoy zero listing fees, unlimited highlighted ads, and a dedicated account manager for your audio business.</p>
            <button style={{ background:"white", color:"#2dd4bf", padding:"16px 40px", borderRadius:"9999px", fontWeight:900, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", letterSpacing:".1em" }}>Upgrade to Diamond</button>
          </div>
        </div>
      </div>

      {/* ELECTRO PRO BANNER */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 64px", padding:"0 40px" }}>
        <div style={{ position:"relative", height:"320px", borderRadius:"2.5rem", overflow:"hidden", boxShadow:"0 8px 32px rgba(0,0,0,.15)" }}>
          <img src="https://lh3.googleusercontent.com/aida/AP1WRLsPKGhjLG_VjGzH3uznSdcdpc0x8DVANhr5KSTsHlvfKcBzOH-b7_QfqC23g4e5KRL6J7S_IjcYmp60TP8rDanTcmciks_YpsTGqAMMSSsxyy1XgQLrfeHesSMXSYo9Pcabc33MMUZvfjkhHXqMZoLgmhJCzeOHVrD4PRBZ9V7jcobkn4kP7g5tYWA8Gc4RnaZD4aHbcaS1N7f5e6IUSTfgBp-MMmpj36CUDtnHl1faIDs4_gWdYW5u" alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(0,0,0,.75),rgba(0,0,0,.4),transparent)" }}></div>
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 64px" }}>
            <div>
              <p style={{ color:"#3cddc7", fontWeight:900, fontSize:"12px", textTransform:"uppercase", letterSpacing:".2em", marginBottom:"16px" }}>Premier Partnership</p>
              <h2 style={{ color:"white", fontSize:"48px", fontWeight:900, marginBottom:"8px", lineHeight:1.1, letterSpacing:"-0.02em" }}>SouKni Electro Pro</h2>
              <p style={{ color:"rgba(255,255,255,.9)", fontSize:"18px", lineHeight:1.6 }}>The Gold Standard for Premium Electronics & Tech Solutions in Rabat.</p>
            </div>
            <button style={{ background:"#2dd4bf", color:"#2dd4bf", padding:"16px 40px", borderRadius:"9999px", fontWeight:700, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", whiteSpace:"nowrap" }}>BECOME A PRO SELLER</button>
          </div>
        </div>
      </div>

      {/* PREMIUM SHOWCASE */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 64px", padding:"0 40px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
          <h2 style={{ fontSize:"24px", fontWeight:700, color:"#161d1b" }}>Latest Listings in Rabat</h2>
          <a href="#" style={{ display:"flex", alignItems:"center", gap:"4px", color:"#2dd4bf", fontWeight:700, fontSize:"13px", textDecoration:"none" }}>View All Listings <span className="ms" style={{ fontSize:"18px" }}>arrow_forward</span></a>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"16px" }}>
          {showcaseRow1.slice(0,3).map(item=><DiscCard key={item.id} item={{ ...item, labelRed:false }} />)}
          <DiamondTrustCard msg="Trust Diamond Certified Sellers" btn="LEARN MORE" />
        </div>
      </div>

      {/* PREMIUM AUDIO SHOWCASE */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 64px", padding:"0 40px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
          <h2 style={{ fontSize:"24px", fontWeight:700, color:"#161d1b" }}>Premium Audio Showcase</h2>
          <a href="#" style={{ display:"flex", alignItems:"center", gap:"4px", color:"#2dd4bf", fontWeight:700, fontSize:"13px", textDecoration:"none" }}>View All <span className="ms" style={{ fontSize:"18px" }}>arrow_forward</span></a>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"16px" }}>
          {showcaseRow1.map(item=><DiscCard key={item.id} item={{ ...item, labelRed:false }} />)}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px" }}>
          {showcaseRow2.map(item=><DiscCard key={item.id} item={{ ...item, labelRed:false }} />)}
        </div>
      </div>

      {/* PAGINATION */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 64px", padding:"0 40px", display:"flex", justifyContent:"center", alignItems:"center", gap:"8px" }}>
        {["1","2","3","...","42","chevron_right"].map((p,i)=>(
          <button key={i} style={{ width:"40px", height:"40px", borderRadius:"9999px", border:p==="1"?"none":"1px solid rgba(186,202,197,.3)", background:p==="1"?"#2dd4bf":"none", color:p==="1"?"#2dd4bf":"#161d1b", fontWeight:700, fontSize:"14px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {p==="chevron_right"?<span className="ms">{p}</span>:p}
          </button>
        ))}
      </div>

      {/* STAY IN THE SOUND LOOP */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 64px", padding:"0 40px" }}>
        <div style={{ background:"#dde4e1", borderRadius:"2.5rem", padding:"64px", textAlign:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ maxWidth:"600px", margin:"0 auto", position:"relative", zIndex:1 }}>
            <h3 style={{ fontSize:"48px", fontWeight:900, color:"#161d1b", marginBottom:"24px", letterSpacing:"-0.02em" }}>Stay in the Sound Loop</h3>
            <p style={{ fontSize:"18px", color:"#3c4a46", marginBottom:"40px", lineHeight:1.6 }}>Join the SouKni Audio community. Get weekly updates on rare vintage finds and new premium speaker arrivals in Rabat.</p>
            <div style={{ display:"flex", gap:"16px", justifyContent:"center" }}>
              <input style={{ width:"320px", padding:"20px 32px", borderRadius:"9999px", border:"none", fontSize:"16px", boxShadow:"0 2px 8px rgba(0,0,0,.08)", outline:"none" }} placeholder="Your email address" type="email" />
              <button style={{ background:"#161d1b", color:"white", padding:"20px 48px", borderRadius:"9999px", fontWeight:700, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", letterSpacing:".1em", whiteSpace:"nowrap" }}>SUBSCRIBE</button>
            </div>
          </div>
          {/* Animated sound bars */}
          <div style={{ position:"absolute", bottom:0, left:0, width:"100%", height:"96px", display:"flex", alignItems:"flex-end", justifyContent:"center", gap:"4px", opacity:.15 }}>
            {[48,80,64,96,56,80,48,64,96,56,80,48].map((h,i)=>(
              <div key={i} className="bounce" style={{ width:"8px", height:`${h}px`, background:"#2dd4bf", borderRadius:"9999px", animationDelay:`${i*0.1}s` }}></div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
    </div>
  )
}
