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
        
export default {
    data() {
        return {
            store: useTodoStore()
        }
    },
    computed: {
        ...mapStores(useTodoStore)
    }
}
</script>

<template>
    <nav>        
        <button @click="store.filterFavs">Toggle Favs</button>
    </nav>

    <p>You have {{ store.totalTodos }} left to do.</p>

    <div>
        <input type="text" @keyup.enter="store.addTodo" placeholder="buy groceries" v-model="store.todoInput">
        <button class="green-btn" @click="store.addTodo">Add Todo</button>
    </div>

    <div v-if="store.todos.length" class="todo-container" @drop="onDrop(todoIndex)" @dragenter.prevent @dragover.prevent>
        <div v-for="todo, todoIndex in store.todos" :class="[
            todo.tag + '-tag',
            { todo }
        ]" draggable="true" @dragstart="startDrag($event, todoIndex)" :key="'todo' + todoIndex">
            <label :class="{ 'completed': todo.completed }">
                <input type="checkbox" v-model="todo.completed">
                {{ todo.name }}
            </label>

            <div class="icons">
                <i class="material-icons" :class="{'fav': todo.isFavorite}" @click="store.toggleFav(todoIndex)">star</i>

                <div class="tag-container">
                    <div v-if="todo.showTagOptions">
                        <input v-model="todo.tag" type="radio" value="white">
                        <label>White</label>
                        <input v-model="todo.tag" type="radio" value="red">
                        <label>Red</label>
                        <input v-model="todo.tag" type="radio" value="blue">
                        <label>Blue</label>
                        <input v-model="todo.tag" type="radio" value="green">
                        <label>Green</label>
                        <input v-model="todo.tag" type="radio" value="purple">
                        <label>Purple</label>
                        <input v-model="todo.tag" type="radio" value="orange">
                        <label>Orange</label>
                    </div>
                    <i class="material-icons" @click="store.toggleTagTodo(todoIndex)">label</i>                    
                </div>
                
                <i class="material-icons" @click="store.deleteTodo(todoIndex)">delete</i>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* GENERIC OVERRIDES */
input[type='text'] {
    padding: 10px;
    text-align: center;
}

button {
    margin-left: 1em;
}

label {
    font-size: 1.2em;
    margin-bottom: .7em;
}

label>input {
    margin-right: 1em;
}

input[type='checkbox'], input[type='radio'] {
    height: 20px;
    width: 20px;
}

/* CLASSES */
.completed {
    text-decoration: line-through;
}

.delete-btn {
    background-color: rgb(129, 46, 46);
}

.green-btn {
    background-color: rgb(31, 161, 101);
}

.todo {
    padding: 1em;
    border-radius: 10px 10px 10px 10px;
    margin-top: .8em;
    display: flex;
    width: 1000px;
    border: solid black 1px;
    color: black;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.todo-container {
    margin-top: 1em;
    background-color: gray;
    padding: 1em;
}

.todo label,
.todo .icons {
    display: inline-block;
}

.todo .icons {
    text-align: right;
}

.todo i {
    font-size: 1.7em;
    margin-left: 10px;
    cursor: pointer;
    color: #bbb;
}

.todo .fav {
    color: orange;
}

.white-tag {
    background-color: white;
}

.red-tag {
    background-color: #f48698;
    color: white;
}

.blue-tag {
    background-color: #86cef4;
    color: white;
}

.green-tag {
    background-color: #7ed779;
    color: white
}

.purple-tag {
    background-color: #d38ffe;
    color: white;
}

.orange-tag {
    background-color: #ffc066;
    color: black;
}

.tag-container {
    display: inline-flex;
}
</style>