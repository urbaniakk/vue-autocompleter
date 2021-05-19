var app = new Vue({
    el: "#app",
    data: {
        googleSearch: '',
        cities: window.cities,

        isInResults : false
    },
    methods : {
        autocompleterSubmit(value) {
            console.log('submit!', value);
        }
    }
});