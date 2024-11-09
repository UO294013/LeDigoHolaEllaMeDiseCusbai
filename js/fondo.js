class Fondo {

    // Constructor base
    constructor(nombre_pais, nombre_capital, nombre_circuito) {
        this.pais = nombre_pais;
        this.capital = nombre_capital;
        this.circuito = nombre_circuito;
        this.getFondo();
    }

    // Método para realizar la consulta AJAX
    getFondo() {
        var apiKey = "b3737c055ec0d9530fc521281d50264e";
        const url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1";

        $.ajax({
            url: url,
            dataType: "json",
            data: {
                api_key: apiKey,
                text: this.circuito,
                tags: "F1,2024,Spa",
                per_page: 1,
                page: 1
            },
            success: (data) => {
                if (data.photos && data.photos.photo && data.photos.photo.length > 0) {
                    var photo = data.photos.photo[0];
                    var photoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

                    $("body").css("background-image", `url(${photoUrl})`);
                    $("body").css("background-size", "cover");
                } else {
                    console.log("No se encontraron imágenes para el circuito: ", this.circuito);
                }
            },
            error: (error) => {
                console.error("Error en la consulta a la API de Flickr: ", error);
            }
        });
    }
}