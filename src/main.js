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
                             <check-filter v-for="genre in genres" v-bind:filterTitle="genre"></check-filter>
                        </div>
                     </div>`,
            components:{ // the checkbox component
                'check-filter':{
                    data(){
                        return{
                            checked:false
                        }
                    },
                    props:['filterTitle'],
                    // if checkbox is true we have to add active class and he depend of cheched
                    template:`<div v-bind:class="{'check-filter':true, active:checked}" v-on:click="checked = !checked">
                                <span class="checkbox"></span>
                                <span class="check-filter-title">{{filterTitle}}</span>
                            </div>`
                }
            }
       } 
    }

})