(()=>
{
    const {log,error} = console;

    log("loading orosource: https://oroafrica.github.io/utm/orosource.js");
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.forEach((value, key) => { params[key] = value; });
    log(JSON.stringify(params,null,2));
    let params = new URL(document.location).searchParams;
    let name = params.get("utm_source")
    localStorage.setItem("params",name);
    log("target: ",name);
}
)()