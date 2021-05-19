Vue.component("v-autocompleter", {
    // <div>isActive: {{ isActive }}</div>
    // <div>focused : {{ focused }}</div>
    // <div>filteredCities : {{ filteredCities.length }}</div>
    // <div>inFocus : {{ inFocus }}</div>
    // <div>value: {{ value }}</div>
    template: `
    <div class="v-autocompleter">
        <input
        class="wpis"
        :value="value"
        @input="$emit('input', $event.target.value)"
        type="search"
        minlength="2048"
        maxlength="2048"
        title="Szukaj"
        v-on:click="ustaw()"
        ref="first"
        @focus="focused=true"
        @keyup.down="down()"
        @keyup.up="up()"
        @keyup.enter="enter()"/>
        
        <div class="auto">
            <div id="autocomplete"
                :class="[ value.length !== 0 && focused && filteredCities.length !== 0 ? \'autocompleter\' : \'bez\']">
                <ul class="wyniki">
                    <li
                        class="pojedynczy"
                        :class="{active: inFocus === index}"
                        v-for="(city, index) in filteredCities"
                        v-on:click="zmiana(city.name)">
                        <img class="lupaaa" src="magnifier_2.png">
                        <div class="kazdy" v-html="pogrubienie(city.name)"></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>`,
    
    props: [
        'options',
        'value'
    ],

    data: function() {
        return {
            cities: window.cities,
            isActive: 0,
            control: 0,
    
            filteredCities:"",
            update_filteredCities:true,
            focused: false,
            change: false,
            inFocus: -1,
            searchedInput:''
        }
    },
    updated() {
        this.$nextTick(() => {
            if (this.value.length > 0) {        
                this.$el.focus();
            }
        });
    },
    watch:{
        inFocus: function(newValue) {
            if (newValue < 0) {
                return;
            }
            this.update_filteredCities = false;

            this.$emit('input', this.filteredCities[this.inFocus].name);
        },
        value: function() {
            this.createFilteredCities(this.update_filteredCities);
            this.update_filteredCities = true;
            this.focused = true;
            console.log(this.filteredCities);

            if(this.inFocus == -1) {
                this.searchedInput = this.value;
            }
        }
    },
    methods:{
        zmiana: function(a){
            if(this.isActive == 0) {
                this.isActive = 1;
                this.$emit('input', a);
                el2 = document.getElementById("autocom");
                el2.blur();
                this.control = 0;
            }
        },
        pogrubienie: function(a)
        {
            wyszukaj = this.value;
            var pom = a.split(wyszukaj);
            for(i = 0; i < pom.length; i++)
            {
                a = a.replace(pom[i], pom[i].bold());
            }
            return a;
        },
        ustaw: function() {
            this.control = 1;
        },
        enter: function() {
            this.update_filteredCities = true;
            this.change = true;
            this.focused = false;
            this.inFocus = -1;
            this.$emit('enter', this.value);
        },
        down: function(){
            if(this.inFocus < this.filteredCities.length - 1) {
                this.inFocus++; 
            } else if(this.inFocus == this.filteredCities.length-1)  {
                this.inFocus = 0; 
            }
        },
        up: function(){
            if(this.inFocus > 0) {
                this.inFocus--; 
            } else if(this.inFocus == 0) {
                this.inFocus = this.filteredCities.length-1;
            }
        },
        createFilteredCities: function(yes){
            if(yes) {
                let result = this.cities.filter(city => city.name.includes(this.value));
                if(result.length > 10)
                {
                    this.filteredCities = result.slice(1, 11);
                }
                else
                {
                    this.filteredCities = result;
                }
                this.inFocus = -1;
            }   
        }
    }
});