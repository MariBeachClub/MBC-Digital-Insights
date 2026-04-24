const fetchStr = "https://script.google.com/macros/s/AKfycbzz2UV_EPrpFUKlxIyQ71KaVlKihSxXrgAOPbnGPLhn__0LPDier3lEH4z0KoAtiqLnog/exec?platform=gsc&startDate=2024-03-24&endDate=2024-04-23";
fetch(fetchStr).then(r => r.text()).then(t => console.log("GSC:", t.substring(0, 500))).catch(console.error);

const fetchStr2 = "https://script.google.com/macros/s/AKfycbzz2UV_EPrpFUKlxIyQ71KaVlKihSxXrgAOPbnGPLhn__0LPDier3lEH4z0KoAtiqLnog/exec?platform=youtube&startDate=2024-03-24&endDate=2024-04-23";
fetch(fetchStr2).then(r => r.text()).then(t => console.log("YT:", t.substring(0, 500))).catch(console.error);
