( async () => {
    
    const debug = true;
    const KEYS = "affiliate";

    const log = (msg)=>(debug) ? console.log("DEV: ", msg) : null;

    log("loading orosource: https://oroafrica.github.io/utm/affiliate.js v1.0.1");

    const processLocation = async () => 
    {
        const payload = {"script":"affiliate.js","version":"1.0.1"};

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

        log(JSON.stringify(payload, null, 2));
    };

    document.addEventListener('DOMContentLoaded', processLocation);
    window.addEventListener('hashchange', processLocation);

    window.addEventListener('popstate', processLocation);
    window.addEventListener('pushstate', processLocation);
    window.addEventListener('replacestate', processLocation);
})();