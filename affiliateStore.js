( async () => {
    
    const debug = true;
    const KEYS = "affiliate";
    const VERSION = "2.1.0";
    const DEFAULT_VALUES = 
    {
        tel: "+27 (0) 21 480 9860",
        email: "orders@oroafrica.com",
        home: "https://www.j-online.co.za",
        logo: "https://www.oroafrica.com/images/logos/1/OA_elongated_logo.png",
        banner:"https://www.j-online.co.za/images/logos/211/J_Online_logo-1.png"
    };
    const log = (msg)=>(debug) ? console.log("DEBUG MODE: ", msg) : null;

    const domainFromUrl=()=> 
    {
        const url = "https://www.j-online.co.za/kara/"; //window.location.pathname;
        let lastPathSegment = url.split('/').filter(Boolean).pop() || '';
        lastPathSegment = lastPathSegment.replace(/\.html$/, '');
        const _affiliate = lastPathSegment;
        const domain = "https://www.j-online.co.za/";
        return domain.concat(`${_affiliate}/`); 
    }
    const processStore = async () => 
    {
        const payload = {"script":`${KEYS}`,"version":`${VERSION}`,"default":`${JSON.stringify(DEFAULT_VALUES)}`};

        log(JSON.stringify(payload, null, 2));
        //collect data from local storage
        const storage = JSON.parse(window.localStorage.getItem(KEYS));

        if (storage && typeof storage === "object") 
        {
            const elements = 
            {
                tel: document.querySelector(".__cf_tel__"),
                email: document.querySelector(".__cf_email__"),
                home: document.querySelector(".__cf_home__"),
                logo: document.querySelector(".__cf_logo__"),
                feature: document.querySelector(".ty-logo-container__image")
            };

            elements.tel.textContent = (elements) && storage.payload["tel"] || DEFAULT_VALUES["tel"]; 
            elements.email.textContent = (elements) && storage.payload["email"] || DEFAULT_VALUES["email"]; 
            elements.home.href = (elements) && storage.payload["home"] || DEFAULT_VALUES["home"]; 
            elements.logo.src = (elements) && storage.payload["logo"] || DEFAULT_VALUES["logo"]; 
            elements.feature.src = (elements) && storage.payload["banner"] || DEFAULT_VALUES["banner"]; 
           
            log(JSON.stringify(storage, null, 2));
        } 
        else if(true)
        {
            log("Attempt to scrape affiliate details!");
            //get host
            const host = domainFromUrl();
            const _csrf = document.querySelector('input[name="security_hash"][type="hidden"]');
            log(host)
            await fetch(host, { method: 'GET',"content-type": "text/html","mode": "no-cors",headers:{"X-CSRF-Token":_csrf} })
            .then(d => d.text())
            .then(data => 
                {
                    const parser = new DOMParser();
                    const document = parser.parseFromString(data, 'text/html');
                    const elements = 
                    {
                        tel: document.querySelector(".__cf_tel__")?.textContent,
                        email: document.querySelector(".__cf_email__")?.textContent.replace(/\[at\]/g, '@').replace(/\[dot\]/g, '.'),
                        home: document.querySelector(".__cf_home__")?.href,
                        logo: document.querySelector(".__cf_logo__")?.src,
                        feature: document.querySelector(".ty-logo-container__image")?.src,
                        csrf: document.querySelector('input[name="security_hash"][type="hidden"]').value
                    };
                    window.localStorage.setItem("api", JSON.stringify({elements}));
                });
        }
    };
    

    document.addEventListener('DOMContentLoaded', processStore);
    window.addEventListener('hashchange', processStore);

    window.addEventListener('popstate', processStore);
    window.addEventListener('pushstate', processStore);
    window.addEventListener('replacestate', processStore);
})();