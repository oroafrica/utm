(async () => {
    const { log, error } = console;

    log("loading orosource: https://oroafrica.github.io/utm/orosource.js v1.00");

    const processLocation = () => 
    {
        const searchParams = new URLSearchParams(window.location.search);
        let params = {};
        searchParams.forEach((value, key) => { params[key] = decodeURIComponent(value); });
        window.localStorage.setItem("params", JSON.stringify({params}));

        const affiliate = (key)=> 
        {
            let obj= [
            {name:"ntombi",email:"ntombi@ntombijewels.net",phone:"+27 (0)21 930 5897",
                profile:"https://www.oroafrica.com/images/companies/48/NY%20image_Page_04.jpg?1709727266390"},
            {name:"kara",email:"kara@sparkles.com",phone:"+27 (0)31 521 3978",
                profile:"https://www.oroafrica.com/images/companies/48/NY%20image_Page_01.jpg?1709728387620"
            }];
 
            return obj.filter(n=> n.name == key)[0];
        };

        let _email = document.querySelector(".utm_email");
        let _phone = document.querySelector(".utm_phone");
        let _profile = document.querySelector(".utm_profile");

        _email.innerText = affiliate(params.utm_source).email;
        _phone.innerText = affiliate(params.utm_source).phone;
        _profile.src = affiliate(params.utm_source).profile;
    };

    document.addEventListener('DOMContentLoaded', processLocation);
})();