console.log('first run webpack');
import './style.scss'
import Vue from 'vue'
import genres from './util/genres'

new Vue({
    el:'#app',
    methods:{
        checkFilter(category, titleCh, checked){
            console.log(category, titleCh, checked)
            console.log('8888')
        }
    },
    components:{ // register the components
       'movie-list':{
           template:`<div id="movie-list">
                       Movie list
                       <div v-for="movie in movies">{{movie}}</div>
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
                             <check-filter-comp 
                                v-for="genre in genres" 
                                v-bind:FilterTitle="genre" 
                                v-on:check-emit-name="checkFilter">
                             </check-filter-comp>
                        </div>
                     </div>`,
            methods:{
                 checkFilter(category,FilterTitle,checked){
                      this.$emit('check-emit-name',category,FilterTitle,checked)
                 }
            },
                    components:{ // the checkbox component
                        'check-filter-comp':{
                            data(){
                                return{
                                    checked:false
                                }
                            },
                            props:['FilterTitle'],
                            // if checkbox is true we have to add active class and he depend of cheched
                            template:`<div v-bind:class="{'check-filter':true, active:checked}" v-on:click="checkFilter">
                                        <span class="checkbox"></span>
                                        <span class="check-filter-title">{{FilterTitle}}</span>
                                    </div>`,
                            // emit event form checkbox component to parent movie filter
                            methods:{
                                checkFilter(){
                                    this.checked = !this.checked
                                    this.$emit('check-emit-name','genre', this.FilterTitle, this.checked) // (name of event, the category, the genre title , the state)
                                }
                            }
                        }
                    }
       } 
    }

})