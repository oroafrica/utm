( async () => {
    
    const debug = true;
    const KEYS = "affiliate";
    const VERSION = "2.1.0";
    const log = (msg)=>(debug) ? console.log("DEBUG MODE: ", msg) : null;

    const processLocation = async () => 
    {
        const payload = {"script":`${KEYS}`,"version":`${VERSION}`};
        //scrape affiliate details: adding home here to dynamicly acquire the affiliate homepage     
        let lastPathSegment = window.location.pathname.split('/').filter(Boolean).pop() || '';
        lastPathSegment = lastPathSegment.replace(/\.html$/, '');
        payload.affiliate = lastPathSegment;
        payload.home = window.location.href
        payload.email = document.querySelector(".__cf_email__")?.textContent || "";
        payload.tel =  document.querySelector(".__cf_tel__")?.textContent || "";
        payload.logo =  document.querySelector(".__cf_logo__")?.src || "";
        payload.home =  document.querySelector(".__cf_home__")?.href || "";
        payload.feature =  document.querySelector(".ty-logo-container__image")?.src || "";
        payload.banner =  `https://oroafrica.github.io/utm/images/feature_${payload.affiliate}.svg`;
        payload.encrypt= false;

        //load to both storage providers to test persistence: ty-logo-container__image
        window.localStorage.setItem(KEYS, JSON.stringify({payload}));
        log(JSON.stringify(payload, null, 2));
    };

    document.addEventListener('DOMContentLoaded', processLocation);
    window.addEventListener('hashchange', processLocation);

    window.addEventListener('popstate', processLocation);
    window.addEventListener('pushstate', processLocation);
    window.addEventListener('replacestate', processLocation);
})();