( async () => {
    
    const debug = true;
    const KEYS = "affiliate";
    const VERSION = "2.0.1";
    const DEFAULT_VALUES = 
    {
        tel: "+27 (0) 21 480 9860",
        email: "orders@oroafrica.com",
        home: "https://www.j-online.co.za",
        logo: "https://www.oroafrica.com/images/logos/1/OA_elongated_logo.png"
    };
    const log = (msg)=>(debug) ? console.log("DEBUG MODE: ", msg) : null;

    const processStore = () => 
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
                logo: document.querySelector(".__cf_logo__")
            };

            Object.entries(elements).forEach(([key, element]) => 
            {
                if (element) 
                { 
                    if(element.tagName === "a")
                    {
                        element.href = storage.payload[key] || DEFAULT_VALUES[key]; 
                        element.textContent = "home"; 
                        log(`setting anchor: ${element.textContent} ${element.href}`)
                    }
                    else
                    {
                        element.textContent = storage.payload[key] || DEFAULT_VALUES[key];     
                    }
                }
            });
           
            log(JSON.stringify(storage, null, 2));
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