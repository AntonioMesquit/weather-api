export class API {
    constructor() {
        this.loader = document.getElementById("loader");
        this.ApiKey = "dfe997131c9e8a2174e194d32f6cc25e";
        this.icons = document.querySelector(".icon");
        this.bandeira = document.querySelector(".bandeira");
        this.card = document.querySelector(".card");
        this.erro1 = document.querySelector(".erro1")
        this.erro2 = document.querySelector(".erro2")
        this.mostrar = this.mostrar.bind(this);
        this.header = document.querySelector("header")
        this.most = document.querySelector(".txt")
    }

    async chamarAPI(text) {
        this.loader.style.display = "block";

        try {
            const ApiLink = `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=${this.ApiKey}&lang=pt_br`;
            const apiLinks = await fetch(ApiLink);

            if (apiLinks.status === 200) {
                const data = await apiLinks.json();
                let temp = data.main.temp;
                let nameCountry = data.name;
                let descrip = data.weather[0].description;
                let icon = data.weather[0].icon;
                let country = data.sys.country;
                
                let grau = Math.floor(temp);
                this.card.classList.add("active");
                this.most.classList.remove("active")
                this.icons.classList.remove("hiden")
                document.querySelector(".local").innerHTML = nameCountry;
                document.querySelector(".temp").innerHTML = `${grau}°`;
                document.querySelector(".icon").innerHTML = icon;
                document.querySelector(".desc").innerHTML = descrip;
                this.header.classList.remove("erro")
                this.icons.setAttribute("src", `http://openweathermap.org/img/wn/${icon}.png`);
                this.bandeira.setAttribute("src", `https://flagsapi.com/${country}/flat/64.png`);
                this.erro1.innerHTML =""
                this.erro2.innerHTML =""
                console.log(country)
                console.log(descrip);
            } else {
                document.querySelector(".local").innerHTML = "";
                document.querySelector(".temp").innerHTML = "";
                document.querySelector(".icon").innerHTML = "";
                document.querySelector(".desc").innerHTML = "";
                this.erro1.innerHTML = "404"
                this.erro2.innerHTML = "Acho que voce digitou errado, tente novamente"
                this.icons.removeAttribute("src");
                this.bandeira.removeAttribute("src");
                this.header.classList.add("erro")
                this.icons.innerHTML = "";
                this.most.classList.add("active")
               
              
                
            }
        } catch (error) {
            console.error("Ocorreu um erro:", error);
        } finally {
            this.loader.style.display = "none"; 
        } 
    }

    input() {
        let submit = document.querySelector(".input-buton");

        submit.addEventListener('click', (e) => {
            e.preventDefault();
            let text = document.getElementById("input-text").value;
            this.mostrar(text);
        });
        

    }

    mostrar(text) {
        this.chamarAPI(text);
    }
}
