<script>
import { mapStores } from 'pinia';
import { useTodoStore } from '../stores/TodoStore';

// ~~1. add whatever is in the input to the todolist~~
// ~~2. do the same thing when hitting enter or the button~~
// ~~3. show todos in list on the screen~~
// ~~4. todos have state uncompleted|completed( completed will be greyed out and crossed through)~~
// ~~5. todo can be deleted, removed from the todolist~~
// 6. you can add a due date to a todo
// ~~7. you can tag a todo with a color~~
// ~~8. make todos draggable/change order~~
// ~~9. don't allow duplicates~~
// ~~10. add todo to favs~~
// ~~11. toggle show favs~~
// ~~12. add pinia~~
// ~~13. convert app to use pinia store pattern)~~
// 14. when item is completed, it should go to the bottom of the list
// ~~15. use localstorage~~

export default {
    data() {
        return {
            store: useTodoStore()
        }
    },
    computed: {
        ...mapStores(useTodoStore)
    },
    created() {
        // run pinia action to load localstorage into state  
        const todoStore = useTodoStore();
        todoStore.getLocalStoredTodos();
        todoStore.checkTheme();
    }
}
</script>

<template>
    <nav>
        <button class="dark-btn" @click="store.filterFavs">Toggle Favs</button>
        <button v-if="store.darkmode" class="darkmode dark-btn" @click="store.toggleDarkmode">☀️</button>
        <button v-else class="lightmode dark-btn" @click="store.toggleDarkmode">🌙</button>
    </nav>

    <!-- loading -->
    <div class="loading" v-if="store.isLoading">Loading todos....</div>

    <div class="header">
        <img class="header-img" alt="vue logo" src="../assets/vue-logo.svg"/>

        <p>You have {{ store.totalTodos }} left to do.</p>

        <div class="input-container">
            <input type="text" @keyup.enter="store.addTodo" placeholder="add todos..." v-model="store.todoInput">
            <button class="green-btn" @click="store.addTodo">Add Todo</button>
        </div>
    </div>


    <div class="todo-container" v-if="store.todos.length" @drop="store.onDrop(todoIndex)" @dragenter.prevent
        @dragover.prevent>
        <div v-for="todo, todoIndex in store.todos" :class="[
            todo.tag + '-tag',
            { todo }
        ]" draggable="true" @dragstart="store.startDrag($event, todoIndex)" :key="'todo' + todoIndex">
            <label :class="{ 'completed': todo.completed }">
                <input type="checkbox" v-model="todo.completed" @change="store.markTodoDone($event)">
                {{ todo.name }}
            </label>

            <div class="icons">
                <i class="material-icons" :class="{ 'fav': todo.isFavorite }" @click="store.toggleFav(todoIndex)">star</i>

                <div class="tag-container">
                    <div v-if="todo.showTagOptions">
                        <input @change="store.tagTodo()" v-model="todo.tag" type="radio" value="white">
                        <label>White</label>
                        <input @change="store.tagTodo()" v-model="todo.tag" type="radio" value="red">
                        <label>Red</label>
                        <input @change="store.tagTodo()" v-model="todo.tag" type="radio" value="blue">
                        <label>Blue</label>
                        <input @change="store.tagTodo()" v-model="todo.tag" type="radio" value="green">
                        <label>Green</label>
                        <input @change="store.tagTodo()" v-model="todo.tag" type="radio" value="purple">
                        <label>Purple</label>
                        <input @change="store.tagTodo()" v-model="todo.tag" type="radio" value="yellow">
                        <label>Yellow</label>
                    </div>
                    <i class="material-icons" @click="store.toggleTagTodo(todoIndex)">label</i>
                </div>

                <i class="material-icons" @click="store.deleteTodo(todoIndex)">delete</i>
            </div>
        </div>
    </div>
</template>

<style scoped>
    input[type='checkbox'] {
        height: 1.2rem;
        width: 1.2rem;
    }

    button {
        transition: 0.3s;
        cursor: pointer;
    }

    button:hover {
        box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
    }

    nav {
        display: flex;
        justify-content: flex-end;
    }

    p {
        font-size: 1.5rem;
    }

    .dark-btn {
        background-color: #18232c;
        padding: .8em;
        text-transform: uppercase;
        margin: 1rem;
        cursor: pointer;
        color: #ffffff;
    }

    .dark-btn:hover {
        background-color: #465f78;
    }

    .green-btn {
        background-color: rgb(31, 161, 101);
        color: #ffffff;
        margin-left: 1rem;
        padding: 1rem;
    }

    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .header-img {
        height: 100px;
    }

    .completed {
        text-decoration: line-through;
    }

    .todo-container {
        margin-top: 1em;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .todo {
        padding: 1em;
        border-radius: 10px 10px 10px 10px;
        margin-top: .8em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 70vw;
        box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
    }

    .todo label,
    .todo .icons {
        display: inline-block;
        cursor: pointer;
        color: #343446;
    }

    label {
        font-size: 1.25rem;
    }

    .todo .icons {
        text-align: right;
    }

    .todo i {
        font-size: 1.7em;
        margin-left: 10px;
    }

    .todo .fav {
        color: orange;
    }

    .white-tag {
        background-color: #ffffff;
    }

    .red-tag {
        background-color: #f47aa2;
    }

    .blue-tag {
        background-color: #a7cbff;
    }

    .green-tag {
        background-color: #7bc3bf;
    }

    .purple-tag {
        background-color: #ab6edd;
    }

    .yellow-tag {
        background-color: #f7db60;
    }

    .tag-container {
        display: inline-flex;
    }
</style>