console.log('first run webpack');
import './style.scss'
import Vue from 'vue'
import genres from './util/genres'

new Vue({
    el:'#app',
    data: {
       genre:[], // this array have alays contain if filter is check
       time:[]   // and this
    },
    methods:{
        checkFilter(category, title, checked){
            console.log(category, title, checked)
            if(checked) {      // the logick is: if check - added to the array above
                console.log('5555')
                this[category].push(title)
                
            } else{
                // look in the array above and seen if alredy there and remove it
                let index = this[category].indexOf(title)
                 // and return -1 if is not in the array
                 if(index > -1){// if is in array 
                    this[category].splice(index, 1)   // we whant to splice/add the array at the point of that index

                 }
            }
        }
        
    },
    components:{ // register the components
       'movie-list':{
           template:`<div id="movie-list">
                     
                       <div v-for="movie in movies" class="movie">{{movie.title}}</div>
                     </div>`,
                     data:function(){
                         return{
                            movies:[
                                {title: 'title 1'},
                                {title: 'title 2'},
                                {title: 'title 3'}
                            ]
                         }
                         
                     }
       }, 
       'movie-filter':{
           data(){
             return{
                 genres
             }
           },
            template:`<div id="movie-filter">
                        <h2>Filter results</h2>
                        <div class="filter-group">
                             <check-filter 
                                v-for="genre in genres" 
                                :key="genre.index"
                                v-bind:title="genre" 
                                v-on:check-filter="checkFilter">
                             </check-filter>
                        </div>
                     </div>`,
            methods:{
               
                checkFilter(category, title, checked){
                    console.log('checkFilter emit')
                    this.$emit('check-filter',category, title, checked) 
                }
            },
            components:{ // the checkbox component
                'check-filter':{
                    data(){
                        return{
                            checked:false
                        }
                    },
                    props:['title'],
                    // if checkbox is true we have to add active class and he depend of cheched
                    template:`<div v-bind:class="{'check-filter':true, active:checked}" v-on:click="checkFilter">
                                <span class="checkbox"></span>
                                <span class="check-filter-title">{{title}}</span>
                            </div>`,
                    // emit event form checkbox component to parent movie filter
                    methods:{
                        checkFilter(){
                            this.checked = !this.checked
                            this.$emit('check-filter', 'genre', this.title,this.checked ) //  (name of event, the category, the genre title , the state)
                        }
                    }
                }
            }
       } 
    }

})