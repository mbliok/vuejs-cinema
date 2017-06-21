console.log('first run webpack');
import './style.scss'
import Vue from 'vue'
import genres from './util/genres'

new Vue({
    el:'#app',
    data:{
       // msg:'asd'
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
                             <check-comp 
                                v-for="genre in genres" 
                                v-bind:filterTitle="genre" 
                                v-on:check-emit-name="checkFilter">
                             </check-comp>
                        </div>
                     </div>`,
            methods:{
                 checkFilter(){
                     console.log('check this')
                 }
            },
                    components:{ // the checkbox component
                        'check-comp':{
                            data(){
                                return{
                                    checked:false
                                }
                            },
                            props:['filterTitle'],
                            // if checkbox is true we have to add active class and he depend of cheched
                            template:`<div v-bind:class="{'check-filter':true, active:checked}" v-on:click="checkFilter">
                                        <span class="checkbox"></span>
                                        <span class="check-filter-title">{{filterTitle}}</span>
                                    </div>`,
                            // emit event form checkbox component to parent movie filter
                            methods:{
                                checkFilter(){
                                    this.checked = !this.checked
                                    this.$emit('check-emit-name')
                                }
                            }
                        }
                    }
       } 
    }

})