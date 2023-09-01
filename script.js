$(document).ready(function() {
    const inputCep = document.querySelector("#cep");
    const inputRua = document.querySelector("#logradouro");
    const inputBairro = document.querySelector("#bairro");
    const inputCidade = document.querySelector("#cidade");
    const inputEstado = document.querySelector("#uf");
    const inputConcordo = document.querySelector("#concordo");
    let allInputs = document.querySelectorAll("input");   

    // Mask Campos obrigatório 
    $('#telefone').mask('(00) 0000-0000');
    $('#celular').mask('(00) 0 0000-0000');
    $('#cep').mask('00000-000');
    
    // Requisição API via Cep 
    inputCep.addEventListener("blur", ()=> {
        let cepNumero = cep.value;
        const options = {
            method: "GET",
            mode: "cors",
            cache: "default"
        }

        fetch(`https://viacep.com.br/ws/${cepNumero}/json/`, options)
        .then((response)=> {
            return response.json();
        })
        .then((data)=> {
            completar(data);
        })
        .catch((error)=> {
            $("#errorModal").modal("show");
            console.log(error);
            
            inputRua.value = "";
            inputBairro.value = "";
            inputCidade.value = "";
            inputEstado.value = "";

            inputRua.disabled = true;
            inputCidade.disabled = true;
            inputEstado.disabled = true;
        })
    })

    // Completar os campos com as infos da API 
    function completar(data) {
        const rua = data.logradouro;
        const bairro = data.bairro;
        const cidade = data.localidade;
        const estado = data.uf;
        const inputRua = document.querySelector("#logradouro");
        const inputBairro = document.querySelector("#bairro");
        const inputCidade = document.querySelector("#cidade");
        const inputEstado = document.querySelector("#uf");
        inputRua.disabled = false;
        inputCidade.disabled = false;
        inputEstado.disabled = false;
        inputRua.value = rua;
        inputBairro.value = bairro;
        inputCidade.value = cidade;
        inputEstado.value = estado;
    }

    // Confirmação de envio 
    let formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", confirmSubmit);
    function confirmSubmit(e) {
        e.preventDefault();
        if(allInputs[0].value, 
                allInputs[1].value,
                allInputs[2].value, 
                allInputs[4].value, 
                allInputs[5].value, 
                allInputs[6].value, 
                allInputs[7].value, 
                allInputs[8].value, 
                allInputs[9].value, 
                allInputs[10].value !== "" && inputConcordo.checked == true
            ) {
                $("#submitModal").modal("show");
                console.log("Todas infos ok");
                for(let i=0; i<allInputs.length; i++) {
                    allInputs[i].value = "";
                }
            }
    }

});

