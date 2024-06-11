(()=>
{
    const {log,error} = console;

    log("loading orosource");
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.forEach((value, key) => { params[key] = value; });
    log(JSON.stringify(params,null,2));
}
)()
