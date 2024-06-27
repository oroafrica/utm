( async () => {
    
    const debug = true;
    const KEYS = "affiliate";

    const log = (msg)=>(debug) ? console.log("DEV: ", msg) : null;

    log("loading orosource: https://oroafrica.github.io/utm/affiliateStore.js v2.0.0");

    const processStore = async () => 
    {
        const payload = {"script":"affiliateStore.js","version":"1.0.0"};

        let lastPathSegment = window.location.pathname.split('/').filter(Boolean).pop() || '';
        lastPathSegment = lastPathSegment.replace(/\.html$/, '');
        payload.affiliate = lastPathSegment;
        payload.home = window.location.href
        payload.tel = document.querySelector(".__cf_tel_client__").textContent;
        payload.email = document.querySelector(".__cf_email_client__").textContent;

        const searchParams = new URLSearchParams(window.location.search);
        let params = {};
        searchParams.forEach((value, key) => { params[key] = decodeURIComponent(value); });
        payload.params= params;
        window.localStorage.setItem(KEYS, JSON.stringify({payload}));


        const storage = JSON.parse(window.localStorage.getItem(KEYS));
        if(typeof storage === "object" || storage !== undefined)
        {
            document.querySelector(".__cf_tel__")?.textContent = (storage.tel !== undefined) ? storage.tel : "+27 (0) 21 480 9860";
            document.querySelector(".__cf_email__")?.textContent = (storage.email !== undefined) ? storage.email : "orders@oroafrica.com";
            log(JSON.stringify(payload, null, 2) , " :source data");
        }
        else 
        {
            log("Error on localStorage!");
        }
    };

    document.addEventListener('DOMContentLoaded', processStore);
    window.addEventListener('hashchange', processStore);

    window.addEventListener('popstate', processStore);
    window.addEventListener('pushstate', processStore);
    window.addEventListener('replacestate', processStore);
})();