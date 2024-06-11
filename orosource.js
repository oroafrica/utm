(async () => {
    const { log, error } = console;

    log("loading orosource: https://oroafrica.github.io/utm/orosource.js");

    const processLocation = () => {
        const searchParams = new URLSearchParams(window.location.search);
        let params = {};
        searchParams.forEach((value, key) => { params[key] = value; });
        log(JSON.stringify(params, null, 2));

        let urlParams = new URL(document.location).searchParams;
        let name = urlParams.get("utm_source");
        localStorage.setItem("params", name);
        log("target: ", name);
        log("host: ", searchParams);

        let _email = document.querySelector(".utm_email");
        let _phone = document.querySelector(".utm_phone");
        log(_email, " — ", _phone);
    };

    document.addEventListener('DOMContentLoaded', processLocation);
})();