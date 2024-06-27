( async () => {
    
    const debug = true;
    const KEYS = "affiliate";

    const log = (msg)=>(debug) ? console.log("DEV: ", msg) : null;

    log("loading orosource: https://oroafrica.github.io/utm/affiliateStore.js v2.0.0");

    const processStore = () => {
        const payload = {
            script: "affiliateStore.js",
            version: "1.0.0",
            affiliate: window.location.pathname.split('/').pop().replace(/\.html$/, '') || '',
            home: window.location.href,
            params: Object.fromEntries(new URLSearchParams(window.location.search))
        };
    
        // window.localStorage.setItem(KEYS, JSON.stringify({ payload }));
    
        const storage = JSON.parse(window.localStorage.getItem(KEYS));
        if (storage && typeof storage === "object") {
            const telElement = document.querySelector(".__cf_tel__");
            const emailElement = document.querySelector(".__cf_email__");
            
            if (telElement) telElement.textContent = storage.payload.tel || "+27 (0) 21 480 9860";
            if (emailElement) emailElement.textContent = storage.payload.email || "orders@oroafrica.com";
            
            log(JSON.stringify(storage.email, null, 2));
            log(JSON.stringify(storage.payload.email, null, 2));
        } else {
            log("Error on localStorage!");
        }
    };
    

    document.addEventListener('DOMContentLoaded', processStore);
    window.addEventListener('hashchange', processStore);

    window.addEventListener('popstate', processStore);
    window.addEventListener('pushstate', processStore);
    window.addEventListener('replacestate', processStore);
})();