export default function CarElectronicsPage() {

  const featuredPremium = [
    { id: 1, badge: "diamond", title: "Pioneer XDJ-XZ Professional Audio Hub", price: "24,500 MAD", spec: "New", location: "Rabat, Agdal", img: "https://lh3.googleusercontent.com/aida/AP1WRLvyJRJGBbCHDvOBms6M5emjJAWYrL0fuvzKyrSDRvt6oWLClDl36NFUgL3aU4Wfc8w1Szxq8jiS_PuUgGk2rsdPPTaRqzDvpzcPdxIVZUKPJtdjie-wED7ypUQlP--bUGGKu_Q09ACj5BQgW3yIrbLaK7D8oBiqoP7bg3oWg5kE0fwTM3K3GhMgALQGNZMj6VgFF1IcgTHcAYeC8q-uKHhE9_QwBlpsovKgbcw-Bv8mhAy7PQlLGi-UFQ" },
    { id: 2, badge: "pro", title: 'Android 13 Tesla Screen 12.1" For Toyota', price: "4,200 MAD", spec: "New Arrival", location: "Rabat, Souissi", img: "https://lh3.googleusercontent.com/aida/AP1WRLtdDFew66KaoJiJ21HFOlSlFIK6x-J2YVfyJ75BAyGs233Gc0oLRaToKXjOdBTweglGfIpTWIRh7pdtdAia7kx3eZl095OWZdDSeg5PDliFqWzI5-5DizoGdJCRDFr25SuPbEnrAk8s5DnqQL8QvFt9eWpFbL7yRk2P--4rjbTt8JEJI_FksF-TpeJz5_JcvK0VZRWMviVMODy8IPSx21GDSCfyY7BinaGQT29OyfUDlthr4Fu8aq93" },
    { id: 3, badge: "diamond", title: "4K Dual Dash Cam with Night Vision & Parking Pro", price: "2,150 MAD", spec: "Top Rated", location: "Rabat, Hassan", img: "https://lh3.googleusercontent.com/aida/AP1WRLtBERULHG4CBc6hujS2mLjZpmnwOZyFu0j_o1a6beyF7QGclQfqPFHPmbhFCpaEx4jDhgIxy5A9_sw-iJXX0pDQZczz66QLoy-cKtoFbeKilgfec-I_KfHLOZ9HG4gVJolJU-RrZa8JlWChgmIvLwoGdl-nNvqWwBdUWSVIM2CntXBKclFz4bh_4GzD5ddnmA5a0VD3BfNV0hLhrhMRZ6p-vXn0aDZ2ewPvQjDly4Hfzw3w9NdZYk4qeg" },
    { id: 4, badge: "verified", title: "Garmin Overlander GPS & Off-Road Nav", price: "6,800 MAD", spec: "Certified", location: "Rabat, Hay Riad", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDC6VEom5QpB13jkInfGe-lGn9LPmoklZaGhxP27zB_qZqvK5OjsRON77bPWJpCKrwxqQZaGZBmtHhZtpr0y8VSAd1ytsYWXA0tkdi4lSZ6152yKrDcl95z0kwwkXF0rMf4zziU9a8WFgd2ep-MihtAoOR_dqGGH2Z45Woeg1PTy-ajvQtuXgkXBsNYsHX5TlrEpe0FDx0TjPo2V3-cI8KFvzvU-GiUZQEenZnUGr-bTG4zK9-McxhEhydeRREwYdY6d4pSqV6y5g" },
  ]

  const discoveryRow1 = [
    { id: 5,  badge: "diamond",  spec: "Just Now",  title: "JBL Stage 3 Car Speakers",         location: "Rabat, Agdal",  price: "1,200 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLsFxS3NIhd29ocMIZUCAXMaGwW3FxfhAxBrfqB2xJezYzZ5q23QXJUr-lpx8JggRVcj7l4Cjy-wI2fSxwXZN6-hRlfipjh2hc6semgfaYsjBoqT4PvPy81DvEU1kMqHo-PWai86dwRQpYenOKCCLpTPiWJqAQLqvE-FiGGqROHyQrBvK0zIRIlwA6cjaD1siOZHAp847v4U6NEX2XZ3D7GNYRJKXce0LNo7XBCeFA3AEkhDJ_GMcYQgXw" },
    { id: 6,  badge: "verified", spec: "2h ago",    title: "HD Rear View Backup Camera",        location: "Rabat, Center", price: "450 MAD",   img: "https://lh3.googleusercontent.com/aida/AP1WRLv1Inedkv3G_eJBm8v6EoG3n4BzIbZDQ5UZzC9mACVu9af8sGrAHPbCL39Zuwj5CqyEkyXM21eajGhZUXcwUNAnVlSZQe-ccSKyy4DZzUgNosajT-mRpPR5vE2VkR-uzshpTQr0k1seoM1ZLtfbwJI1CM_RpQhibfB6s43BKvTo-ERvFlvJR7Q-WACHx6KcaXNY0QcdD2x3G8mf_NMytsTtQGFngmWrLAMUCDJDiX6r81AHDkgJjMBQ2g" },
    { id: 7,  badge: "diamond",  spec: "Promoted",  title: "Wireless CarPlay Adapter",          location: "Casablanca",    price: "650 MAD",   img: "https://lh3.googleusercontent.com/aida/AP1WRLta0GKhhQuHJ2hgqvjE_aTTzOJaUUlOpQDsOp8QbP-Qn_PtXNrFNKiVpV9fRDfvWo3QLFw5Bt9_LUC5Yev4ZZvxnrwGum-gI6yYfxelN2A6DQUzabWEFNAllLfPaYR5SkjaBGIJUZqSSkiKcFavfzrG6fgsKtS0wBN1-nUy6Uc9LaQqdczK1Ms2b27tzepybJIaqGWQXSgm6aOXi4fi12m5BC1rAqaEu9UMn9JkZ_2ulsUuLoqs5_eGWw" },
    { id: 8,  badge: "verified", spec: "New",       title: "Kenwood DMX-7709S Digital Receiver", location: "Rabat, Souissi",price: "3,800 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLt2tomUnoSTaJ1dvn69BCusKqzbv4EUlglkZmuCegWo2gZRROyHLHMtvLhuNKbKu6IOfggXTUYs-qMlLVQbWWhCxpk4p6mwvJVgf9uCKPX9c87jjLF9QiR6505C518-5XQg1GaVP7VV5g-afEjliPGAk9MsfTDROm51kaSYMp93lYzq6bbb_V8tsgwm75tCuBVongox7chW8UqxY_5tWM3GThbghU78m2UaUWvv5aMdn-M5tTDxRZki" },
  ]

  const discoveryRow2 = [
    { id: 9,  badge: "diamond",  spec: "Featured",  title: "Baseus 160W Fast Car Charger",      location: "Rabat, Hay Riad",price: "320 MAD",   img: "https://lh3.googleusercontent.com/aida/AP1WRLuYWXcaWUkCs3fgzJKSuUnft9b8M2V8z1FmaT8f2fUoveSRfQfBITI2PMtIk0Law41sDRa3RH4e3L1bXYddpG7o49gVh1pKnzYJZEm3Q1sGWi_uM2QEjJ604ppAq-uRLQDGnEyxpdB42DUKhdgMKeQfTH75kGqupzBWBIksj_zLBoMWe1iwnfOWgvJ4U3TxYCWGxKmNgMMwx5djrslqgOkr4Kq_ZK5gBR4pLsUXmbYQvRYPfiNaT9OUdA" },
    { id: 10, badge: "verified", spec: "Yesterday", title: 'Alpine S-W10D4 10-inch Subwoofer',  location: "Rabat, Center", price: "1,850 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLuKztYGbi8FRB3cUdiOI2no075xFCktAUlTiTK3UcZYt013jEFv4QbM1T-S4ysT-mdWnyKUgH3HAOJ5VWlWvh1mAKd-2YGjrcDmQ2W8WBUGIh0_WbL-70_ybn66IoMtVn5SIJKUZujk1AKVy1Vu6s6RKQjFOeojrlEcxrOkT4cF1HQ__rXK_jDD-Sfj60lc_mJmHbPg9tbK5c18QZwTRxcGXV6KUT4pN0HnpZb9ksYaJE64hbu3Of6Odw" },
    { id: 11, badge: "diamond",  spec: "Hot Deal",  title: "Modern OBD2 Diagnostic Scanner",   location: "Casablanca",    price: "350 MAD",   img: "https://lh3.googleusercontent.com/aida/AP1WRLtw9MGvIOpcc2y95HQ7XZRfIyi7tH3RYP7a2Cotj_EuSguGzxTzMtaewvTNti9SzVlXwElE0RsR-FHD4cUliFraRsdR85pQB-xd6ny-GZ1hCABUvIbNAJVgHDlNFHU2u7Xx2mopm1NesIAo30a09gbR3IoDrwYYKxVZcjW00ffzYEJac_PYqWDCh2gyzhKPEWfUkT-fifUgUn33mFmsIigE-Buf48PZb5Cj-nlh7DXddKQIcexMsqMl0g" },
    { id: 12, badge: "verified", spec: "3h ago",    title: "Dual-channel 4K Car Dash Cam",     location: "Rabat, Hassan", price: "2,150 MAD", img: "https://lh3.googleusercontent.com/aida/AP1WRLtBERULHG4CBc6hujS2mLjZpmnwOZyFu0j_o1a6beyF7QGclQfqPFHPmbhFCpaEx4jDhgIxy5A9_sw-iJXX0pDQZczz66QLoy-cKtoFbeKilgfec-I_KfHLOZ9HG4gVJolJU-RrZa8JlWChgmIvLwoGdl-nNvqWwBdUWSVIM2CntXBKclFz4bh_4GzD5ddnmA5a0VD3BfNV0hLhrhMRZ6p-vXn0aDZ2ewPvQjDly4Hfzw3w9NdZYk4qeg" },
  ]

  const squareGrid = [
    { id: 13, condition: "New",      title: "GPS Real-time Tracker 4G + Remote Cutoff",      location: "Rabat Center",   price: "850 MAD",   img: "https://lh3.googleusercontent.com/aida/AP1WRLvBRqBufM9Fit1okq30KlBIoMvWCMzwaiyGGwnDemPPm6BfeN-eCjlbxgEeQWbAxFaOwOCpwQDlrzdZOQXHHMvMr7W7QCQ9NseGQHVHFsWSk50jgVg34cpqwOwOA1mWkKZEoKbj04gWCcCnWBeyuLpVOoegX_jXxVnH9sNy_o5YfDbWfzHpIDsTD0SuqE7edHtgSQtfLJwHg6ARbgLAkmnac2jOIdH8HSC4_OeLSMAMR6Xzdv9SbX3FDw" },
    { id: 14, condition: "New",      title: "OBD2 Bluetooth Scanner v2.1 Pro Diagnostic",   location: "Témara",          price: "350 MAD",   img: "https://lh3.googleusercontent.com/aida/AP1WRLtw9MGvIOpcc2y95HQ7XZRfIyi7tH3RYP7a2Cotj_EuSguGzxTzMtaewvTNti9SzVlXwElE0RsR-FHD4cUliFraRsdR85pQB-xd6ny-GZ1hCABUvIbNAJVgHDlNFHU2u7Xx2mopm1NesIAo30a09gbR3IoDrwYYKxVZcjW00ffzYEJac_PYqWDCh2gyzhKPEWfUkT-fifUgUn33mFmsIigE-Buf48PZb5Cj-nlh7DXddKQIcexMsqMl0g" },
    { id: 15, condition: "New",      title: "JBL Stage 3 Premium Speakers (Set of 4)",       location: "Rabat, Agdal",   price: "1,200 MAD", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB__8vWpCvZztCol8YbEyR8jLvXJtxjqBuMjG7JB7qHNAXW0zUhqkcI--For5t2BFnEnP8RCvOWZIc7VZq7_F6WRv9T8nqjpnBNKA-zC5kbjwNeiisKSH0FRk2AO_sFm61O1xea-lxRhrqFPohvdIsXuUBESCM5fxQdL1Qm3W4LZgomcuGdlD0psJMdMghReotIXYZhJhDow5ICa8eE3W2TEh0WLydHEYWYeg164BxGQfmD9k8dR2l8XJqkz0AfacAewTOGtcxTGQ" },
    { id: 16, condition: "New",      title: "Rear View Backup Camera 170° Wide HD",          location: "Salé",            price: "450 MAD",   img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEkWaX8CS94Q3oDtQ_aG8vdPZF9PqugpRMckMT8ncH1uDMy-2xicE3LXnvgcgE7M5XjzCVcaoUyRFAlllcPfTlyNNXskMWAMeXRSgL6lGFJKGunXRYfYxoGY284S0zymcL-Rb4sGdOuxgRJqmPDH9jqFqQW2-HNHEcLTmLfrz2PCV0JxJ7_nmI7AtYWwQIKjD7ACqhp_X7G7BODWX3UT_49RbTSozYBlD06XmkxDjH5wpJaBHgQ9MkSJfs_4INtRQjf_sAyY_4MA" },
    { id: 17, condition: "Like New", title: "CarPlay Wireless Adapter for OEM Screens",      location: "Rabat Center",   price: "650 MAD",   img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEhL1TvUalmBpm7deHZgXtS4LTyE85dUCpQgR_NQ6Ji7Wo67CMAlHBjeU2cBgdqI3DWPA9Ga1LyqBWb1T3tkXQbtDvFm9TeFd10nLZSaxv50_pwUowU_WPeYWK7wftlqEIq7FkDoKVF-jQKnlocUT9F2tit50e4_RsABAJ5WJtklX9H5uSNHuJQGhwEj72HquiS4bMuvDotk2ryyyRwJ_g8SCfArDUtKIqC8fpAoHaiWOK8IiJ2mSljJxM6QmSpd7WKNzwF2p0kA" },
    { id: 18, condition: "Used",     title: "Kenwood DMX-7709S Digital Media Receiver",      location: "Rabat, Souissi", price: "3,800 MAD", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCC9-SUJLbpHWX6ckDFXfdxutv3tyWL9QQToOKnfquVmv4cOfLQrxBBVOaILJWxnSuZFIyLBbcJ93p0DCTMGVsDrTBM88WGUE04eymh_b7oMcmsPbIF_-4UPDAGn5VYnulARvxRqsFe0rQEcSLDsnJgkoe7lP525KeMJ2Rg09BawupJwePstnCqjbM19on7XYdtqc5JJJIjNPdoLEOIq4Xg70LZG2fQRdoNcysX1xZAcipve8urRoWQUvRhCEGoAQAaxgojiQRaxg" },
    { id: 19, condition: "New",      title: 'Alpine S-W10D4 10" Dual 4-Ohm Subwoofer',      location: "Rabat Center",   price: "1,850 MAD", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoWE4X7kSg2P--0tQlmZdUmMSdaPMIxCFI-LbKq4jJhpUJ9MaZM7DzZ5eOfj_FsqDwZD-2M_cYEtJBCDes5YVk5Eeerq6HoF6PVjpZQTz6_kFyogA0eI6A1vv4whp1YiCnseJKDiZPYDMhVqm4hRj2sesuVeq9TFYM9Hq0BI_sDhMa-QcyQ8naUocjCiV6KNkplNuk0B2Mh1Syerdx1oMBZFvi07O6WFqkCQroHxZIdQtKzBKzo6N6IkB51LeNteeU4lZrsKU5Lw" },
    { id: 20, condition: "New",      title: "Baseus 160W QC5.0 Fast Car Charger",            location: "Rabat, Hay Riad",price: "320 MAD",   img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4AjbuLp_R81PsAxC7e-WRZjV8_ZteJmyisCXODZaJ-wzv5qTLNnaHSAMp6_HowS54QxvDcB75slf5foB8zskU9xoJ5aGnDVZZmUedAkvFM1GoEomAyQd0dhOzJgoOsQaP9VlARC9_sA981Adnl3LPNQ5ojxAbgAV6GONKF_Ed4-yy491cdtEAxzwTMXSS0LWnl3J2HmDF5Hh_Ne7bgpnVNC1h-lF_ygblsHMjkxZJDOtDmFhXkKUXfQR3Ez-d4sos8nl3WS1vvA" },
  ]

  const extraRow1 = [
    { id: 21, badge: "verified", spec: "New", title: "Pioneer XDJ-XZ Professional Audio Hub", location: "Rabat Center",   price: "24,500 MAD", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOJ_HT9eZYbxXNp3GqaZVhcryndiDKR9JYDYZVHgEkvdffRurDHY0zA09V2BJAHHto9b3FDWYgbEdspib-eXz4_URPQPqqc_XEKtpWJiX9x59GNBaHjnU5aHul5ag-ux6vRvSJ8d1_FJBG0teBTLMkB0iTCIXb7J6QSXSlM9SQSSfY7R9pbib-FzSatnAFxsLE_pZzx5epLSTEBeIk-HaRC3zCh_fQxTGdoSfsr_k9yMPo6s6m-YMR3PTxh3LxmiK3qKFjtopaoQ" },
    { id: 22, badge: "verified", spec: "New", title: 'Alpine S-W10D4 10" Subwoofer',          location: "Rabat Center",   price: "1,850 MAD",  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3A0izUdVbL8d_Vsh5F13RDHTxn4IDA-dOJaPzqyZPcfgqTT804uNy4yXTAq3qpSSY6bx4T7lJanVSLog0n_ZNtAXBzUrEnTF5qSwUYJKDNzc9Pm-2X6C99OArbpIgx4DI0zCwHYJMclK1IjmEwkq3y-Rff1e-IT11CuiiMptwQCZDhPVcvDq6tBEgB8e07hR2Qwgb32KWNcPbCAYnlhEO4cMGnfA-PfZ6MjcQTqup5U310oFtXUKmIGuO37o3Lqkdxmr_QYx5ZA" },
    { id: 23, badge: "verified", spec: "New", title: "JBL Stage 3 Car Speakers",               location: "Rabat Center",   price: "1,200 MAD",  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLhWO2U3NEDWScZCHqi2EYhqAgszYyOlRKma2X5E3A-9uVUwIhjazajTEvG2EK4mQI7db2JFBN3-o6XhA4S7OxY_oWIma33qA1iTfmiwb2tyRiZBt6yN_LXwBKkwfugtPLex4tDuG8Xz_YFudQZTZHrY6HvtsLbFPQTP7KFwGBqkbo3KXcOIIk44eE55TQNT--goWjqpSrCK14_wr1-IRvjQh0iF9gdD3b2eU9HSn2Yr1B4AKnORiISW2yv5FvjrCCeOET-lY3zg" },
    { id: 24, badge: "verified", spec: "New", title: "4K Dual Dash Cam",                       location: "Rabat Center",   price: "2,150 MAD",  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5Wdl-sqiDHgYlK5NgXJDnAp8X5b39rjkP3HS2z5g-i9XESBrHS3rzufX_akDc__BjSUhSERGPy1RIROWND5m5dhDh5DzNA6KnZO-xxwpg3YDtuxD0S5lN-AlpPLpeJpDcXYAI3bitF4Hgc4pRdM8O-9o2mZm6WcAVsmcbIXmAMGTYJDdfgM-9TdY2bIfTDoNk3elMctJTO4oGW3pYHjCZDVuEORoAEUpQl-pisXx0FfzPNS3FN_0pp7ymYDNJOkZzeW_AmwkvVQ" },
  ]

  const extraRow2 = [
    { id: 25, badge: "verified", spec: "New", title: "170° HD Backup Camera",                  location: "Salé",           price: "450 MAD",    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCN7pkvM6a18DI3_m0XHAMPLAmt_77RBo5qTvTdLe8w8Rh-8bfvigTwBN5VRXb2w9VU6PY-zG7zjTpKDVcHW4uMOU9-8K01d70OkzugUpfpauOUZVfAB3OuXvcgnduEbWjStOw5XWnmvDcYOp8JoVsTWgfrBdPdelnYxQDsw4yQmr4iNodbgZU_pZuPNhr3bPbb7TlVjoTKA6FeLSk5QvQ43eubUDoZEEOZ1-P--0LM_FDIqaSpo6FlkA1S_0MEfG4LPQHFbEKPwQ" },
    { id: 26, badge: "verified", spec: "New", title: "Modern OBD2 Scanner",                    location: "Témara",          price: "350 MAD",    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwGvZ3XumQodfNYe-jCxBgMA4ZVr2UBX1J8NVVXphy_VJfkaKtmMaF3hTrCZ7Ngcw1qgeEAezAD50cXL2v7j3nCVXnBHgoy7CY_wNVvSgGQ27m-OiwxxnaP1sqNfi0PshRLlm8iieGJ1sHoTyniyWhVrVX-WtIIoecNgQIkBw-3UNAvaMc3FCbQQijFig5uB0WlcIhUyuheVSe5_3W3w7iHZw6GDQQET88F95ccONjEs2NJgXORKvgNpjPI4TsjML00YYVao7pAA" },
    { id: 27, badge: "verified", spec: "New", title: "Kenwood DMX-7709S Multimedia Player",    location: "Rabat, Souissi", price: "3,800 MAD",  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx9T3VEAUBT8EVSBWpRMDU3HS-WlzB6Ekv3ahKDLkaOj0KmjkyLAn8tL0iso1NKeqgCYy5OzBRwXxqk6IfIAJVKnsFf7_eBARIeKdBwUFgG5KQ7j6Pn4i2uFZrljVTr-1LIi50laC-w07hYC2U8VW8YQ3jxm_KbD40Z9O2nPZGdnEVNd74IosXWTeQvK4zbDPmudYEJYUZPBFPp4wnQpXrTFRefdGiLkqfR-Fc5O4OJjCm09Hx2rFblP7AsYrXMGo5-IvguBAPug" },
    { id: 28, badge: "verified", spec: "New", title: "Wireless CarPlay Adapter",               location: "Rabat Center",   price: "650 MAD",    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgT6I_CCGB-m8YJ4J-K7Ir8YGL2gSc85NYWK4iPOmH691B_MjnGWtUKIvjpdKNkx86akPMjXM68Mo4n_OBHtCkZEqKp6y9XGCT7oKpJPCXpKoe-qARITlyFwRaUad_sfscR_uCYc2ns7d9-hfZ2zNimDcLZPCNt5GLxNWBO-4i708PxfzWWL1J4IR6MJuQGGsDkElUJFqLPU-Qx4NLE5SOOClVB3Y174akyl3vQCkyfTqyUKUaMl1ygKwPG4gXQKQaxdr3Q65RwA" },
  ]

  const brands = ["Pioneer","Sony","Kenwood","JVC","Alpine","Garmin","Xiaomi","Baseus"]
  const categories = [
    { icon: "tablet_android", label: "Android Screens" },
    { icon: "videocam", label: "Dash Cams" },
    { icon: "surround_sound", label: "Audio & Speakers" },
    { icon: "explore", label: "Navigation" },
    { icon: "security", label: "Security Systems" },
  ]

  const FeatBadge = ({ badge }: { badge?: string }) => {
    if (badge === "diamond") return <span style={{ background:"#2dd4bf", color:"white", fontSize:"10px", fontWeight:900, padding:"4px 10px", borderRadius:"9999px", display:"flex", alignItems:"center", gap:"4px", textTransform:"uppercase" }}>◆ DIAMOND MEMBER</span>
    if (badge === "pro") return <span style={{ background:"#62fae3", color:"#00201c", fontSize:"10px", fontWeight:700, padding:"4px 10px", borderRadius:"9999px", display:"flex", alignItems:"center", gap:"4px" }}>✓ PRO SELLER</span>
    if (badge === "verified") return <span style={{ background:"#dde4e1", color:"#3c4a46", fontSize:"10px", fontWeight:700, padding:"4px 10px", borderRadius:"9999px", display:"flex", alignItems:"center", gap:"4px" }}>✓ VERIFIED</span>
    return null
  }

  const PortraitCard = ({ item }: { item: typeof discoveryRow1[0] }) => (
    <article className="card glass img-zoom" style={{ borderRadius:"2.5rem", overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 4px 24px rgba(0,0,0,.08)", border:"1px solid rgba(186,202,197,.5)" }}>
      <div style={{ position:"relative", aspectRatio:"4/5", overflow:"hidden", background:"#d4dcd9" }}>
        <div style={{ position:"absolute", top:"12px", left:"12px", zIndex:10 }}><FeatBadge badge={item.badge} /></div>
        <button style={{ position:"absolute", top:"12px", right:"12px", zIndex:10, width:"40px", height:"40px", borderRadius:"9999px", background:"rgba(255,255,255,.8)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span className="ms" style={{ fontSize:"20px" }}>favorite</span>
        </button>
        <img src={item.img} alt={item.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
      </div>
      <div style={{ padding:"20px", display:"flex", flexDirection:"column", flex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" }}>
          <span style={{ fontSize:"13px", fontWeight:700, color:"#2dd4bf" }}>{item.spec}</span>
          <span style={{ width:"4px", height:"4px", background:"#6b7a76", borderRadius:"9999px" }}></span>
          <span style={{ fontSize:"13px", color:"#3c4a46" }}>{item.location}</span>
        </div>
        <h3 style={{ fontSize:"18px", fontWeight:700, color:"#161d1b", marginBottom:"8px", lineHeight:1.3 }}>{item.title}</h3>
        <p style={{ fontSize:"22px", fontWeight:900, color:"#2dd4bf", marginBottom:"16px" }}>{item.price}</p>
        <div style={{ marginTop:"auto", paddingTop:"16px", borderTop:"1px solid rgba(186,202,197,.15)", display:"flex", gap:"8px" }}>
          <button style={{ flex:1, padding:"10px", borderRadius:"12px", border:"1px solid rgba(186,202,197,.5)", background:"none", fontSize:"13px", fontWeight:700, cursor:"pointer" }}>MESSAGE</button>
          <button style={{ flex:1, padding:"10px", borderRadius:"12px", background:"#25D366", color:"white", border:"none", fontSize:"13px", fontWeight:700, cursor:"pointer" }}>WhatsApp</button>
        </div>
      </div>
    </article>
  )

  const SquareCard = ({ item }: { item: typeof squareGrid[0] }) => (
    <article className="card glass img-zoom2" style={{ borderRadius:"2.5rem", overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 2px 12px rgba(0,0,0,.06)", border:"1px solid rgba(186,202,197,.5)" }}>
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
        .cat-card:hover{border-color:rgba(0,107,95,.4)!important;}
        .cat-card:hover .cat-icon{transform:scale(1.1);}
        .cat-icon{transition:transform .2s;}
      `}</style>

      {/* HERO */}
      <section style={{ position:"relative", height:"400px", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0 }}>
          <img src="https://lh3.googleusercontent.com/aida/AP1WRLuEjxF5RQD703_mU0BJemV-ZUVXTAs4AWfpzDQQsD3Pd_qYZ_xuS_99QwlFdCjrekGwvVIrcoFJdmxTJrt-I7FIALdzp-F7w1dmDaZdMA3g9tA2ilCZDqe-QHyfTkgm8y9VL8Byd2iJMawKWZc5SkuR6H0LXH6SN-9AfFfL7NOYncU-Y7XU6L149GASrz9N8uSUHEruTevZ0Rb9nsGa24lFrbWBy0664JLv4K1t4IXGD3mHqY0o0BoyVA" alt="" style={{ width:"100%", height:"100%", objectFit:"cover", opacity:.6 }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,transparent,rgba(244,251,248,.4),#f4fbf8)" }}></div>
        </div>
        <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:"896px", margin:"0 auto", padding:"0 20px", display:"flex", flexDirection:"column", alignItems:"center" }}>
          <h1 style={{ fontSize:"48px", fontWeight:900, color:"white", marginBottom:"32px", textAlign:"center", lineHeight:1.1, letterSpacing:"-0.02em", textShadow:"0 2px 8px rgba(0,0,0,.3)" }}>Discover the Best Car Electronics in Rabat</h1>
          <div style={{ width:"100%", display:"flex", gap:"8px", padding:"8px", borderRadius:"3rem", background:"rgba(255,255,255,.1)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,.3)" }}>
            <div style={{ flex:1, display:"flex", alignItems:"center", borderRadius:"9999px", padding:"12px 20px", background:"rgba(244,251,248,.5)" }}>
              <span className="ms" style={{ color:"#3c4a46", marginRight:"12px" }}>search</span>
              <input style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:"16px" }} placeholder="Search for Android screens, dash cams, speakers..." />
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
              <input style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:"16px" }} placeholder="Car Play, Subwoofer, GPS..." />
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
          <span style={{ fontWeight:700, color:"#161d1b" }}>Car Electronics</span>
        </nav>
      </div>

      {/* TITLE + CONTROLS */}
      <div style={{ maxWidth:"1440px", margin:"0 auto 32px", padding:"0 40px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"16px" }}>
          <div>
            <h1 style={{ fontSize:"24px", fontWeight:700, color:"#161d1b", marginBottom:"4px" }}>New and Used Car Electronics for sale in Rabat</h1>
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

        {/* CATEGORY HUB */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"16px", marginBottom:"32px" }}>
          {categories.map(cat=>(
            <a key={cat.label} href="#" className="cat-card" style={{ background:"white", padding:"24px", borderRadius:"2.5rem", display:"flex", flexDirection:"column", alignItems:"center", gap:"12px", boxShadow:"0 2px 8px rgba(0,0,0,.04)", border:"1px solid rgba(186,202,197,.2)", textDecoration:"none", transition:"border-color .2s" }}>
              <span className="ms cat-icon" style={{ fontSize:"40px", color:"#2dd4bf" }}>{cat.icon}</span>
              <span style={{ fontWeight:700, fontSize:"13px", color:"#161d1b", textAlign:"center" }}>{cat.label}</span>
            </a>
          ))}
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

        {/* FEATURED PREMIUM CAR TECH */}
        <div style={{ marginBottom:"48px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
            <h2 style={{ fontSize:"24px", fontWeight:700, color:"#2dd4bf" }}>Featured Premium Car Tech</h2>
            <a href="#" style={{ display:"flex", alignItems:"center", gap:"4px", color:"#2dd4bf", fontWeight:700, fontSize:"13px", textDecoration:"none" }}>View all Featured <span className="ms" style={{ fontSize:"18px" }}>chevron_right</span></a>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px" }}>
            {featuredPremium.map(item=>(
              <article key={item.id} className="card glass img-zoom" style={{ borderRadius:"2.5rem", overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 4px 24px rgba(0,0,0,.08)", border:"1px solid rgba(186,202,197,.5)" }}>
                <div style={{ position:"relative", aspectRatio:"4/5", overflow:"hidden", background:"#d4dcd9" }}>
                  <div style={{ position:"absolute", top:"12px", left:"12px", zIndex:10 }}><FeatBadge badge={item.badge} /></div>
                  <button style={{ position:"absolute", top:"12px", right:"12px", zIndex:10, width:"40px", height:"40px", borderRadius:"9999px", background:"rgba(255,255,255,.8)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span className="ms" style={{ fontSize:"20px" }}>favorite</span>
                  </button>
                  <img src={item.img} alt={item.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
                <div style={{ padding:"20px", display:"flex", flexDirection:"column", flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" }}>
                    <span style={{ fontSize:"13px", fontWeight:700, color:"#2dd4bf" }}>{item.spec}</span>
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

        {/* DISCOVERY ROW 1 — portrait 4/5 */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"16px" }}>
          {discoveryRow1.map(item=><PortraitCard key={item.id} item={item} />)}
        </div>

        {/* DISCOVERY ROW 2 — portrait 4/5 */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"64px" }}>
          {discoveryRow2.map(item=><PortraitCard key={item.id} item={item} />)}
        </div>

        {/* INTERSTITIAL */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"64px" }}>
          <div style={{ borderRadius:"2.5rem", padding:"40px", minHeight:"300px", display:"flex", flexDirection:"column", justifyContent:"center", background:"#2dd4bf", color:"white", boxShadow:"0 8px 32px rgba(0,107,95,.3)", position:"relative", overflow:"hidden" }}>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUAm2hhVjd1MfggKhTWwUAc7A9P8BhkT0eqd5rjgS0Xn-gHLomPVpraBhUUacYCy4pjLdCyLnI_t_IlzY4WnGDg8pKsJ_R4m34gYzjczfSlVI-FDeoPeBRuJwhVaO5yiAmYci5oK8kFA-WPL6Sao4MniYMxWn3MUZFZxvX7i80GPSemx2A8gZsVogTFEra9Nvlx9p9Bi8B-25bTyMIymvAkfQnT2IhO5ccPjiUb_UPLZqr31hyki2g350yXc8T7vo-v2nzVeIlIw" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.3 }} />
            <div style={{ position:"relative", zIndex:1, maxWidth:"400px" }}>
              <h2 style={{ fontSize:"36px", fontWeight:900, marginBottom:"16px", lineHeight:1.2 }}>Join the SouKni Family</h2>
              <p style={{ fontSize:"18px", marginBottom:"32px", opacity:.9, lineHeight:1.6 }}>Start selling your tech items today for free and reach millions of buyers in Morocco.</p>
              <button style={{ background:"white", color:"#2dd4bf", padding:"16px 32px", borderRadius:"9999px", fontWeight:900, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", width:"fit-content" }}>Register as Individual</button>
            </div>
          </div>
          <div style={{ borderRadius:"2.5rem", padding:"40px", minHeight:"300px", display:"flex", flexDirection:"column", justifyContent:"center", background:"#dde4e1", border:"2px solid rgba(0,107,95,.2)", boxShadow:"0 8px 32px rgba(0,0,0,.06)", position:"relative", overflow:"hidden" }}>
            <img src="https://lh3.googleusercontent.com/aida/AP1WRLs6vA9JUk-n5aYcYY4y-FsLQ-92HQvT5nMWbOb4-QajHPXrubhe3T0PlrUHu4fXupoL1nlUjt3DPcr1szHmiZOymL8wECExfmSYd6W-qHM4GdVSBzE_0t8SyvKnc2s8jFX-R0A7Vzvp-fFMFv-DpmZGK918lYKcvWHlPjYax-pWFyVlrtdAGSAjyHKVq8CojC2icjzOe3Ut1XzO18zGmi-ucOnViUNmYfSD-_Jh1CZZvP3YsmT7t391" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.2 }} />
            <div style={{ position:"relative", zIndex:1, maxWidth:"400px" }}>
              <p style={{ fontSize:"12px", fontWeight:900, color:"#2dd4bf", textTransform:"uppercase", letterSpacing:".2em", marginBottom:"16px" }}>Solutions for agents</p>
              <h2 style={{ fontSize:"36px", fontWeight:900, color:"#161d1b", marginBottom:"16px", lineHeight:1.2 }}>SouKni Immo Pro</h2>
              <p style={{ fontSize:"18px", color:"#3c4a46", marginBottom:"32px", lineHeight:1.6 }}>Boost your real estate agency visibility with our premium listing dashboard and analytics.</p>
              <button style={{ background:"#2dd4bf", color:"white", padding:"16px 32px", borderRadius:"9999px", fontWeight:900, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", width:"fit-content" }}>Discover Pro Tools</button>
            </div>
          </div>
        </div>

        {/* SQUARE GRID */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"64px" }}>
          {squareGrid.map(item=><SquareCard key={item.id} item={item} />)}
        </div>

        {/* EXTRA PORTRAIT ROWS */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"16px" }}>
          {extraRow1.map(item=><PortraitCard key={item.id} item={{ ...item, spec: item.spec }} />)}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"64px" }}>
          {extraRow2.map(item=><PortraitCard key={item.id} item={{ ...item, spec: item.spec }} />)}
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
            <h2 style={{ fontSize:"40px", fontWeight:900, marginBottom:"16px" }}>Become a Diamond Member</h2>
            <p style={{ fontSize:"18px", opacity:.9, maxWidth:"600px", margin:"0 auto 32px", lineHeight:1.6 }}>Enjoy zero listing fees, unlimited highlighted ads, and a dedicated account manager for your tech business.</p>
            <button style={{ background:"white", color:"#2dd4bf", padding:"16px 40px", borderRadius:"9999px", fontWeight:900, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", letterSpacing:".1em" }}>Upgrade to Diamond</button>
          </div>
        </div>

        {/* AUTO PRO BANNER */}
        <div style={{ position:"relative", height:"320px", borderRadius:"2.5rem", overflow:"hidden", marginBottom:"64px", boxShadow:"0 8px 32px rgba(0,0,0,.15)" }}>
          <img src="https://lh3.googleusercontent.com/aida/AP1WRLv8Z3Z2PWFdlBty3FuRLJqE_KcqvVrB2wZd_2BilKjeRUptAVwUZoKBAHQ0YI9mp0DONZfPBEs5r-UCwDsRZdpeaBmpMWV7QHrvMd731MbzShzPnWSyr54o3Ee8TROxdwN_PMclkYLkQ9hwZ5kfmZFiWkkOH8RQC-_yeJ1NhxagThrZXSUUlaqQk5bRFEjgMfvFIr8eMuKBZiOOy4FHIfJXqJEugOR8kO4s3nkrb4iELZ1UaZKIXscsSQ" alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(0,0,0,.75),rgba(0,0,0,.4),transparent)" }}></div>
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 64px" }}>
            <div>
              <p style={{ color:"#3cddc7", fontWeight:900, fontSize:"12px", textTransform:"uppercase", letterSpacing:".2em", marginBottom:"16px" }}>Premier Partnership</p>
              <h2 style={{ color:"white", fontSize:"48px", fontWeight:900, marginBottom:"8px", lineHeight:1.1, letterSpacing:"-0.02em" }}>SouKni Auto Pro</h2>
              <p style={{ color:"rgba(255,255,255,.9)", fontSize:"18px", lineHeight:1.6 }}>The Gold Standard for Car Electronics & Accessories in Rabat.</p>
            </div>
            <button style={{ background:"#2dd4bf", color:"#2dd4bf", padding:"16px 40px", borderRadius:"9999px", fontWeight:700, fontSize:"13px", border:"none", cursor:"pointer", textTransform:"uppercase", whiteSpace:"nowrap" }}>Discover Pro Benefits</button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
    </div>
  )
}
